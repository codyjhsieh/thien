#!/usr/bin/env python3
"""
refresh-companies.py — probe every candidate company's public ATS board,
keep the postings that match a *profile*, and emit them as JSON (or splice
them straight into that profile's data file).

This is the fetch stage of the pipeline. It is profile-driven, shardable and
internally parallel, which is what lets `.claude/skills/job-pipeline` fan the
work out across several agents at once:

    # one shard of four, 16 concurrent ATS probes, JSON out
    python3 scripts/refresh-companies.py --profile sean \\
        --shard 1/4 --jobs 16 --emit-json /tmp/sean.1.json

    # shards recombine with a plain JSON union
    python3 scripts/merge-shards.py /tmp/sean.*.json -o /tmp/sean.json

    # additive merge into the profile's data file
    node scripts/merge-additive.js --profile sean /tmp/sean.json

A profile (profiles/<id>.json) owns everything that used to be hardcoded here:
the geo regex, the title include/exclude regexes, the entry-level regexes, the
candidate company list(s), and the destination data file. Adding a candidate is
a JSON edit — no code change — which is what makes the discovery half of the
pipeline (`.claude/skills/job-scout`) safe to automate.

Supported ATS backends: Ashby, Greenhouse, Lever, Workable, Workday,
Teamtailor, SmartRecruiters, Recruitee, Personio, BambooHR, Breezy,
Pinpoint and Rippling — thirteen in all. Every one reads a public JSON
endpoint; none needs a key.
"""

from __future__ import annotations
import argparse, datetime, json, re, subprocess, sys, threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PROFILE_DIR = REPO_ROOT / "profiles"


# ── Profile ──────────────────────────────────────────────────────────────
class Profile:
  """profiles/<id>.json, with the regexes precompiled."""

  def __init__(self, pid: str):
    self.id = pid
    self.path = PROFILE_DIR / f"{pid}.json"
    if not self.path.exists():
      sys.exit(f"no such profile: {self.path.relative_to(REPO_ROOT)}")
    self.raw = json.loads(self.path.read_text())
    f = self.raw.get("filters", {})
    self.geo = re.compile(f["geoInclude"], re.I)
    # Optional second geography: a role a candidate in this city could take
    # without moving. Kept separate from geoInclude so the board can tell the
    # two apart rather than quietly calling a Vancouver job a New York one.
    self.geo_remote = (
      re.compile(f["geoRemote"], re.I) if f.get("geoRemote") else None
    )
    self.geo_remote_home = (
      re.compile(f["geoRemoteHome"], re.I) if f.get("geoRemoteHome") else None
    )
    self.geo_remote_foreign = (
      re.compile(f["geoRemoteForeign"], re.I) if f.get("geoRemoteForeign") else None
    )
    self.title_city_exclude = (
      re.compile(f["titleCityExclude"], re.I) if f.get("titleCityExclude") else None
    )
    self.title_include = re.compile(f["titleInclude"], re.I)
    # titleInclude has to stand on its own everywhere, so it only matches
    # titles that name the work itself. At companies that do nothing but this
    # work, the title no longer has to say so — "Environment Artist" at a game
    # studio is unambiguous — so titleIncludeBroad widens the net, but only for
    # the verticals in broadVerticals.
    self.title_include_broad = (
      re.compile(f["titleIncludeBroad"], re.I) if f.get("titleIncludeBroad") else None
    )
    self.broad_verticals = set(f.get("broadVerticals", []))
    # Drop postings that state a requirement above this many years.
    # None disables the check entirely.
    self.max_years = f.get("maxYearsExperience")
    self.screen_fraud = bool(f.get("screenFraud"))
    self.screen_credentials = bool(f.get("screenCredentials"))
    # Refuse a posting whose description cannot be read at all: unread is
    # unscreened, and this board's promise is about what the posting requires.
    self.require_description = bool(f.get("requireDescription"))
    self.title_exclude = (
      re.compile(f["titleExclude"], re.I) if f.get("titleExclude") else None
    )
    # levelRules are evaluated in order, first match wins, so a profile can
    # put "senior" ahead of "associate" and have "Senior Associate" land right.
    self.level_rules = [(r["key"], re.compile(r["match"], re.I))
                        for r in f.get("levelRules", [])]
    self.level_default = f.get("levelDefault", "mid")
    self.data_file = REPO_ROOT / self.raw["dataFile"]
    self.companies = self._load_companies()

  def _load_companies(self):
    """Union of every companies file the profile points at, first-wins on id."""
    refs = self.raw.get("companies") or []
    if isinstance(refs, str):
      refs = [refs]
    out, seen = [], set()
    for ref in refs:
      rows = json.loads((REPO_ROOT / ref).read_text())
      for r in rows:
        if r["id"] in seen:
          continue
        seen.add(r["id"])
        out.append(r)
    return out

  def domains(self):
    return {c["id"]: c["domain"] for c in self.companies if c.get("domain")}

  def estimate_pay(self, title: str, level: str):
    """A market estimate for a title the posting left blank.

    Returns None unless the profile supplies payEstimate. The result is tagged
    source='estimate' downstream and rendered differently, because a guess
    shown as an employer's number is worse than no number at all."""
    cfg = self.raw.get("payEstimate")
    if not cfg:
      return None
    t = title.lower()
    band = None
    for rule in cfg.get("titleBands", []):
      if re.search(rule["match"], t, re.I):
        band = rule
        break
    band = band or cfg.get("default")
    if not band:
      return None
    lo, hi = float(band["min"]), float(band["max"])
    mult = (cfg.get("levelMultiplier") or {}).get(level)
    if mult:
      lo, hi = lo * mult, hi * mult
    return {"min": round(lo, 2), "max": round(hi, 2),
            "interval": band.get("interval", cfg.get("interval", "hour"))}

  def level(self, title: str) -> str:
    """First matching levelRule wins; else the profile's default level."""
    for key, pat in self.level_rules:
      if pat.search(title):
        return key
    return self.level_default


# ── HTTP ─────────────────────────────────────────────────────────────────
def curl_json(url, timeout=15, method="GET", body=None, referer=None):
  args = ["curl", "-sS", "-L", "--max-time", str(timeout)]
  if method == "POST":
    args += ["-X", "POST", "-H", "Content-Type: application/json", "-H", "Accept: application/json"]
    if body is not None:
      args += ["-d", body]
  if referer:
    args += ["-H", f"Referer: {referer}"]
  args.append(url)
  try:
    r = subprocess.run(args, capture_output=True, timeout=timeout + 3, text=True)
    return json.loads(r.stdout) if r.returncode == 0 and r.stdout else None
  except Exception:
    return None


def fetch(ats, slug):
  if ats == "ashby":
    d = curl_json(f"https://api.ashbyhq.com/posting-api/job-board/{slug}?includeCompensation=true")
    return d.get("jobs", []) if d else []
  if ats == "greenhouse":
    d = curl_json(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs")
    return d.get("jobs", []) if d else []
  if ats == "lever":
    d = curl_json(f"https://api.lever.co/v0/postings/{slug}?mode=json")
    return d if isinstance(d, list) else []
  if ats == "workable":
    # Workable's v3 search endpoint — POST with empty body returns all
    # published jobs. The public v3/accounts/{slug}/jobs GET 404s; the
    # POST variant is what their SPA uses internally.
    url = f"https://apply.workable.com/api/v3/accounts/{slug}/jobs"
    body = '{"query":"","department":[],"location":[]}'
    d = curl_json(url, method="POST", body=body)
    return d.get("results", []) if d else []
  if ats == "teamtailor":
    # Teamtailor exposes a JSONFeed at {subdomain}.teamtailor.com/jobs.json.
    # If the slug contains a dot, treat it as a full host (custom domain like
    # careers.marginedge.com); otherwise prepend .teamtailor.com.
    host = slug if "." in slug else f"{slug}.teamtailor.com"
    d = curl_json(f"https://{host}/jobs.json")
    return d.get("items", []) if d else []
  if ats == "smartrecruiters":
    # SmartRecruiters public postings API — pages of 100 (API cap).
    all_postings = []
    offset = 0
    while True:
      d = curl_json(f"https://api.smartrecruiters.com/v1/companies/{slug}/postings?limit=100&offset={offset}")
      if not d or "content" not in d: break
      page = d.get("content", []) or []
      all_postings.extend(page)
      total = d.get("totalFound") or 0
      offset += 100
      if offset >= total or not page: break
      if offset > 5000: break  # safety
    return all_postings
  if ats == "recruitee":
    # {slug}.recruitee.com — public offers feed, no key needed.
    d = curl_json(f"https://{slug}.recruitee.com/api/offers/")
    return d.get("offers", []) if d else []
  if ats == "personio":
    # search.json is what their careers SPA calls. Tenants live on either the
    # .de or the .com host depending on when they signed up, and the wrong one
    # 404s silently — try both. Returns a bare array; no posting URL or date,
    # so both are derived in normalize().
    for tld in ("de", "com"):
      d = curl_json(f"https://{slug}.jobs.personio.{tld}/search.json?language=en")
      if isinstance(d, list) and d:
        for row in d:
          row["_tld"] = tld
        return d
    return []
  if ats == "bamboohr":
    d = curl_json(f"https://{slug}.bamboohr.com/careers/list")
    return (d or {}).get("result", []) or []
  if ats == "breezy":
    d = curl_json(f"https://{slug}.breezy.hr/json")
    return d if isinstance(d, list) else []
  if ats == "pinpoint":
    # Pinpoint wraps its list in {data:[...]} on some tenants and returns a
    # bare array on others.
    d = curl_json(f"https://{slug}.pinpointhq.com/postings.json")
    if isinstance(d, list): return d
    return (d or {}).get("data", []) or []
  if ats == "rippling":
    d = curl_json(f"https://api.rippling.com/platform/api/ats/v1/board/{slug}/jobs")
    return d if isinstance(d, list) else []
  if ats == "workday":
    # Slug encodes the 3-tuple: "tenant/wdN/site"
    # e.g. "cityblockhealth/wd1/CityblockExternalCareerSite"
    try:
      tenant, wdn, site = slug.split("/", 2)
    except ValueError:
      return []
    url = f"https://{tenant}.{wdn}.myworkdayjobs.com/wday/cxs/{tenant}/{site}/jobs"
    referer = f"https://{tenant}.{wdn}.myworkdayjobs.com/en-US/{site}"
    # Workday caps limit at 20 — page through with offset until exhausted.
    all_postings = []
    offset = 0
    while True:
      body = json.dumps({"appliedFacets": {}, "limit": 20, "offset": offset, "searchText": ""})
      d = curl_json(url, method="POST", body=body, referer=referer)
      if not d or not isinstance(d, dict): break
      page = d.get("jobPostings", []) or []
      all_postings.extend(page)
      total = d.get("total") or 0
      offset += 20
      if offset >= total or not page: break
      if offset > 500: break  # safety
    return all_postings
  return []


# ── Filtering ────────────────────────────────────────────────────────────
def _date10(v):
  """Normalize an ATS posting date to YYYY-MM-DD ('' if unparseable).
  Accepts ISO strings (Ashby/Greenhouse/Workable) and epoch-ms ints (Lever)."""
  if not v: return ""
  if isinstance(v, (int, float)):
    try:
      return datetime.datetime.utcfromtimestamp(v / 1000).date().isoformat()
    except Exception:
      return ""
  s = str(v)
  return s[:10] if len(s) >= 10 and s[4] == "-" and s[7] == "-" else ""


# ── Compensation ─────────────────────────────────────────────────────────
# Some ATSs publish a real range; most do not. Everything below only reports
# what a posting actually states. Estimating is a separate, clearly-labelled
# step in the profile — the two must never be confused on a card, because a
# guess presented as an employer's number is the kind of wrong that costs
# somebody an afternoon.
_MONEY = re.compile(r"\$\s?([\d,]+(?:\.\d+)?)\s*([KkMm])?")
_HOURLY_HINT = re.compile(r"\b(?:per\s+hour|/\s?hour|/\s?hr|hourly|an\s+hour)\b", re.I)
_PAY_WORD = re.compile(r"\b(?:salary|compensation|pay|base|rate|wage|hiring\s+range|"
                       r"pay\s+range|salary\s+range)\b", re.I)
# An explicit "$A to $B" range — the only shape trusted from free text.
_RANGE = re.compile(r"\$\s?([\d,]+(?:\.\d+)?)\s*([KkMm])?\s*(?:-|–|—|to|through)\s*"
                    r"\$?\s?([\d,]+(?:\.\d+)?)\s*([KkMm])?")


def _money(tok, suffix):
  try:
    v = float(tok.replace(",", ""))
  except ValueError:
    return None
  if suffix and suffix.lower() == "k":
    v *= 1_000
  elif suffix and suffix.lower() == "m":
    v *= 1_000_000
  return v


def _interval_for(lo, hi, hint=""):
  """hour or year. A stated interval wins; otherwise magnitude decides, since
  nobody is paid $37/year and nobody is paid $55,000/hour. Greenhouse's
  structured ranges often omit the interval, which is how two hourly rates
  once shipped labelled as salaries."""
  h = (hint or "").lower()
  if "hour" in h or "hr" in h:
    return "hour"
  if "year" in h or "annual" in h or "salary" in h:
    return "year"
  return "hour" if max(lo, hi or lo) < 400 else "year"


def _pay_from_text(text):
  """Pull a pay range out of free text — conservatively.

  Job descriptions are full of dollar amounts that are not pay: funding
  raised, revenue, customer savings, discounts. Taking min and max across all
  of them produced ranges like "$1.30/yr" and "$425,000,000". So this only
  accepts an *explicit two-number range* whose endpoints agree on magnitude,
  and returns None otherwise — a missing figure falls through to a labelled
  estimate, which is far better than a confident wrong one.
  """
  if not text:
    return None
  flat = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text))
  best = None
  for m in _RANGE.finditer(flat):
    lo = _money(m.group(1), m.group(2))
    hi = _money(m.group(3), m.group(4))
    if not lo or not hi or hi < lo:
      continue
    window = flat[max(0, m.start() - 90):m.end() + 90]
    hourly = bool(_HOURLY_HINT.search(window))
    # Endpoints must describe the same kind of number. A "$20 - $150,000"
    # match is two unrelated figures that happen to sit near a dash.
    if hourly or (lo < 400 and hi < 400):
      if not (5 <= lo <= 400 and 5 <= hi <= 400):
        continue
      cand = {"min": round(lo, 2), "max": round(hi, 2), "interval": "hour"}
    else:
      if not (10_000 <= lo <= 2_000_000 and 10_000 <= hi <= 2_000_000):
        continue
      cand = {"min": round(lo, 2), "max": round(hi, 2), "interval": "year"}
    # A range stated next to explicit pay wording beats one that merely looks
    # like a range, so prefer the first that has it.
    if _PAY_WORD.search(window):
      return cand
    best = best or cand
  return best


def pay_of(ats, j):
  """The compensation a posting states, or None. Never an estimate."""
  if ats == "ashby":
    c = j.get("compensation") or {}
    txt = c.get("scrapeableCompensationSalarySummary") or c.get("compensationTierSummary")
    # Prefer the structured components when present — they carry the interval.
    for tier in (c.get("compensationTiers") or []):
      for comp in (tier.get("components") or []):
        if comp.get("compensationType") == "Salary" and comp.get("minValue"):
          lo = float(comp["minValue"])
          hi = float(comp.get("maxValue") or comp["minValue"])
          return {"min": lo, "max": hi,
                  "interval": _interval_for(lo, hi, comp.get("interval"))}
    return _pay_from_text(txt)
  if ats == "lever":
    r = j.get("salaryRange") or {}
    if r.get("min"):
      lo, hi = float(r["min"]), float(r.get("max") or r["min"])
      return {"min": lo, "max": hi, "interval": _interval_for(lo, hi, r.get("interval"))}
    return None
  if ats == "smartrecruiters":
    r = (j.get("typicalRange") or {})
    if r.get("minValue"):
      lo, hi = float(r["minValue"]), float(r.get("maxValue") or r["minValue"])
      return {"min": lo, "max": hi, "interval": _interval_for(lo, hi, str(r.get("interval", "")))}
    return None
  return None


def _pay_from_greenhouse_detail(d):
  """Pay out of an already-fetched Greenhouse job body."""
  if not d:
    return None
  for r in (d.get("pay_input_ranges") or []):
    lo, hi = r.get("min_cents"), r.get("max_cents")
    if lo:
      lo_d, hi_d = round(lo / 100, 2), round((hi or lo) / 100, 2)
      return {"min": lo_d, "max": hi_d,
              "interval": _interval_for(lo_d, hi_d, r.get("title"))}
  # Failing that, many boards state the range in the posting body.
  return _pay_from_text(re.sub(r"<[^>]+>", " ", d.get("content") or "")[:4000])


# ── Experience requirement ───────────────────────────────────────────────
# "Entry level" is a claim a title cannot make on its own: plenty of postings
# titled "Data Entry Clerk" ask for five years. Where the ATS gives us the
# description cheaply, read the requirement out of it rather than guessing.
# "3-5 years of relevant administrative experience" — the gap between the
# number and the word "experience" is prose, so it needs room and has to allow
# punctuation. A 24-character word-only window missed most real postings.
_YEARS = re.compile(
  r"\b(\d{1,2})\s*(?:\+|plus)?\s*(?:[-–—]|to)?\s*(\d{1,2})?\s*\+?\s*"
  r"(?:years?|yrs?)\b[\s\w,()/&+.'’-]{0,60}?(?:experience|exp\b|background|"
  r"working|hands[\s-]on)", re.I)
_NO_EXP = re.compile(
  r"no\s+(?:prior\s+|previous\s+|work\s+|relevant\s+)?experience\s+(?:is\s+)?"
  r"(?:required|necessary|needed)|no\s+experience\s+necessary|"
  r"experience\s+is\s+not\s+required|entry[\s-]level\s+(?:role|position|opportunity)",
  re.I)


def years_required(text):
  """Smallest number of years the posting asks for.

  0 means it says none is needed; None means it did not say, which is not the
  same thing. A stated requirement always wins over an "entry-level" phrase
  elsewhere in the text: postings routinely describe themselves as entry-level
  in one paragraph and ask for five years in the next, and taking the friendly
  sentence at face value put exactly those roles on an no-experience board."""
  if not text:
    return None
  t = re.sub(r"<[^>]+>", " ", _unescape(text))
  t = re.sub(r"\s+", " ", t)[:20000]     # requirements often sit far down
  hits = []
  for m in _YEARS.finditer(t):
    lo = int(m.group(1))
    if 0 <= lo <= 20:
      hits.append(lo)
  if hits:
    # The lowest figure is the real bar: "2+ years, 5 preferred" will
    # interview someone with two.
    return min(hits)
  return 0 if _NO_EXP.search(t) else None



def _unescape(t):
  import html as _html
  return _html.unescape(t or "")


# Where a posting stops describing itself and starts describing the work.
_ROLE_SECTION = re.compile(
  r"\b(?:what\s+you(?:'|’)?ll\s+(?:do|be\s+doing)|what\s+you\s+will\s+do|"
  r"in\s+this\s+role|the\s+role|your\s+role|responsibilities|"
  r"day[\s-]to[\s-]day|what\s+the\s+job\s+(?:is|involves)|about\s+the\s+role|"
  r"position\s+overview|job\s+summary)\b[:\s-]*", re.I)

_BOILER = re.compile(
  r"^(about\s+(?:us|the\s+(?:role|team|company|job|position))|who\s+we\s+are|"
  r"the\s+(?:role|opportunity|position)|job\s+(?:description|summary)|overview|"
  r"description|summary|position\s+summary)\b[:\s-]*", re.I)


def summary_of(text, limit=190):
  """A short, readable opener for the posting.

  On a phone the title alone does not say what the job is, and the full
  description is far too long, so keep the first couple of sentences. Entities
  are decoded BEFORE tags are stripped — the other order leaves "<div>" in
  every summary. Leading boilerplate headers are dropped, and the cut lands on
  a sentence or word boundary rather than mid-word."""
  if not text:
    return None
  t = _unescape(text)
  t = re.sub(r"<[^>]+>", " ", t)
  t = _unescape(t)                        # entities nested inside text nodes
  t = re.sub(r"\s+", " ", t).strip()
  # Prefer the part that describes the job over the company blurb it opens
  # with: "Affirm is reinventing credit" tells a reader nothing about the role.
  m = _ROLE_SECTION.search(t)
  if m and len(t) - m.end() > 80:
    tail = t[m.end():].strip(" :–-")
    # Only take the tail if it starts a sentence; otherwise the heading matched
    # inside prose and the cut would begin mid-clause.
    if tail[:1].isupper():
      t = tail
  for _ in range(3):                      # headers often stack
    stripped = _BOILER.sub("", t).strip()
    if stripped == t:
      break
    t = stripped
  if len(t) < 30:
    return None
  if len(t) <= limit:
    return t
  cut = t[:limit]
  end = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
  if end > limit * 0.5:
    return cut[:end + 1]
  sp = cut.rfind(" ")
  return (cut[:sp] if sp > 0 else cut).rstrip(" ,;:-") + "…"



def description_of(ats, j):
  """Description text carried in the board listing itself, or None.

  This was quietly wrong for most backends: Ashby, Teamtailor and Personio all
  publish the full description in the list payload and none of them were read,
  so on those boards every requirement screen silently passed. Anything that
  returns None here falls through to fetch_description() below."""
  def first(*keys):
    for k in keys:
      v = j.get(k)
      if isinstance(v, str) and len(v) > 120:
        return v
      if isinstance(v, dict):                       # Personio: {lang: html}
        joined = " ".join(str(x) for x in v.values())
        if len(joined) > 120:
          return joined
      if isinstance(v, list):                       # Personio: [{name, value}]
        joined = " ".join(str(x.get("value", x)) for x in v if x)
        if len(joined) > 120:
          return joined
    return None

  if ats == "ashby":
    return first("descriptionPlain", "descriptionHtml")
  if ats == "lever":
    return " ".join(filter(None, [j.get("descriptionPlain"), j.get("additionalPlain")])) or None
  if ats == "teamtailor":
    return first("content_html", "content_text", "content", "summary")
  if ats == "personio":
    return first("description", "jobDescriptions", "job_descriptions")
  if ats == "recruitee":
    return first("description", "requirements", "full_description")
  if ats in ("workable", "breezy", "pinpoint"):
    return first("description", "full_description", "body")
  if ats == "smartrecruiters":
    ad = j.get("jobAd")
    return json.dumps(ad) if ad else None
  return None


def fetch_description(ats, slug, j):
  """One request for a posting whose listing carried no description.

  Only ever called for a posting that already passed the title and location
  filters, so this is a handful of requests per run rather than thousands."""
  jid = j.get("id") or j.get("shortcode")
  if not jid:
    return None
  if ats == "greenhouse":
    d = curl_json(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs/{jid}?pay_transparency=true")
    return (d or {}).get("content")
  if ats == "bamboohr":
    d = curl_json(f"https://{slug}.bamboohr.com/careers/{jid}/detail")
    r = (d or {}).get("result") or {}
    return r.get("jobOpeningShareUrlDescription") or r.get("description")
  if ats == "breezy":
    d = curl_json(f"https://{slug}.breezy.hr/json/position/{jid}")
    return (d or {}).get("description")
  if ats == "smartrecruiters":
    d = curl_json(f"https://api.smartrecruiters.com/v1/companies/{slug}/postings/{jid}")
    return json.dumps((d or {}).get("jobAd") or "") if d else None
  if ats == "workable":
    d = curl_json(f"https://apply.workable.com/api/v3/accounts/{slug}/jobs/{jid}")
    return (d or {}).get("description")
  return None


# ── Fraud screening ──────────────────────────────────────────────────────
# Remote data entry is the single most impersonated job category there is. The
# structural protection is already in place — every posting here comes from a
# company's own ATS, never an aggregator — but a compromised or careless
# posting can still carry the classic markers, so refuse rather than display.
# A false positive costs one listing; a false negative costs somebody their
# bank details.

# Off-platform contact only counts near hiring language. Aircall and Twilio
# integrate with WhatsApp for a living; "interview over WhatsApp" is the tell,
# the word alone is not. This distinction cost two legitimate Aircall listings
# before it existed.
OFF_PLATFORM = re.compile(
  r"(?:\b(?:interview|screening|onboard\w*|hiring|recruit\w*|contact\s+(?:us|me)|"
  r"reach\s+(?:us|me)|apply|chat\s+with)\b[^.]{0,70}?"
  r"\b(?:telegram|whatsapp|signal\s+app|google\s+hangouts|skype)\b"
  r"|\b(?:telegram|whatsapp|signal\s+app|google\s+hangouts|skype)\b[^.]{0,70}?"
  r"\b(?:interview|screening|onboard\w*|hiring|recruiter|to\s+apply|for\s+details)\b)",
  re.I)

# Markers that are damning on their own, wherever they appear.
SCAM_MARKERS = re.compile(
  r"(?:"
  r"\bgift\s+cards?\b|\bwire\s+transfer\b|\bmoneygram\b|\bwestern\s+union\b|"
  r"\bcashier(?:'|’)?s\s+check\b|\bcheck\s+will\s+be\s+(?:mailed|sent)\b|"
  r"\bzelle\b|\bcash\s?app\b|\bvenmo\b|"
  r"(?:purchase|buy|pay\s+for)\s+(?:your\s+own\s+)?(?:equipment|software|laptop|starter\s+kit)|"
  r"\bequipment\s+fee\b|\btraining\s+fee\b|\bregistration\s+fee\b|\bapplication\s+fee\b|"
  r"\bstartup\s+cost\b|\bupfront\s+(?:payment|cost|fee)\b|"
  r"\bno\s+interview\s+(?:required|needed)\b|\bhired\s+immediately\b|\binstant\s+hire\b|"
  r"\bpersonal\s+(?:bank\s+)?account\b.{0,40}\b(?:deposit|transfer|process)\b|"
  r"\b(?:process|receive|forward|deposit)\s+(?:payments?|funds?|checks?)\b.{0,50}"
  r"\bpersonal\s+(?:bank\s+)?account\b|"
  r"\bmoney\s+mule\b|\bpackage\s+(?:reshipping|forwarding)\b)", re.I)

# Pay that is not plausible for this kind of work is itself a marker.
IMPLAUSIBLE_HOURLY = 150.0


def fraud_flags(title, text, pay=None):
  """Reasons to refuse a posting. Empty list means nothing tripped."""
  flags = []
  blob = f"{title} {_unescape(text or '')}"
  for m in SCAM_MARKERS.finditer(blob):
    flags.append(m.group(0).strip().lower()[:40])
  for m in OFF_PLATFORM.finditer(blob):
    flags.append("off-platform contact: " + re.sub(r"\s+", " ", m.group(0)).strip().lower()[:50])
  if pay and pay.get("interval") == "hour" and pay.get("min", 0) > IMPLAUSIBLE_HOURLY:
    flags.append(f"implausible hourly rate {pay['min']}")
  return sorted(set(flags))


# ── Qualification screening ──────────────────────────────────────────────
# "Entry level" in a title says nothing about the licence, certification or
# degree buried in the requirements. A candidate coming from an unrelated
# field cannot get past those, so a board built for them should not list them.
CREDENTIALS = re.compile(
  r"\b(?:cpc|ccs|rhia|rhit|cca|cpb|cpma|ahima|aapc)\b|"
  r"\b(?:notary\s+public|notary\s+commission)\b|"
  r"\b(?:insurance|adjuster|producer|real\s+estate|title|escrow|"
  r"mortgage\s+loan\s+originator|nmls|series\s+(?:6|7|63|65|66)|finra)\s*"
  r"(?:licen[cs]e[ds]?|certifica\w+)\b|"
  r"\blicen[cs]ed\s+(?:\w+\s+){0,2}(?:practical\s+nurse|vocational\s+nurse|nurse|"
  r"pharmacy\s+technician|social\s+worker|therapist|adjuster|agent|producer|"
  r"broker|appraiser)\b|"
  r"\b(?:rn|lpn|lvn|cna|cma|emt|paramedic|cdl)\s+(?:licen[cs]e|certifica\w+|required)\b|"
  r"\bactive\s+(?:licen[cs]e|certification)\b|"
  r"\b(?:security\s+clearance|ts/sci|top\s+secret|public\s+trust)\b|"
  r"\bbachelor(?:'|’)?s?\s+degree\s+(?:is\s+)?required\b|"
  r"\b(?:requires?|must\s+have)\s+(?:a\s+)?(?:bachelor|master|associate)(?:'|’)?s?\s+degree\b|"
  r"\bcertifi\w+\s+(?:is\s+)?required\b", re.I)


def credential_flags(title, text):
  blob = f"{title} {_unescape(text or '')}"
  return sorted({m.group(0).strip().lower()[:40] for m in CREDENTIALS.finditer(blob)})



def normalize(ats, j, slug=""):
  """One ATS posting -> {title, url, loc, posted} or None if unusable."""
  if ats == "ashby":
    if j.get("isListed", True) is False: return None
    title = (j.get("title") or "").strip()
    primary = j.get("location", "") or ""
    secs = [s.get("location", "") for s in (j.get("secondaryLocations") or [])]
    loc = primary + " " + " ".join(secs)
    url = j.get("jobUrl") or j.get("applyUrl")
    posted = _date10(j.get("publishedDate") or j.get("publishedAt") or j.get("updatedAt"))
  elif ats == "greenhouse":
    title = (j.get("title") or "").strip()
    loc = (j.get("location") or {}).get("name", "") or ""
    url = j.get("absolute_url")
    posted = _date10(j.get("updated_at") or j.get("first_published") or j.get("created_at"))
  elif ats == "lever":
    title = (j.get("text") or "").strip()
    cat = j.get("categories") or {}
    all_locs = cat.get("allLocations") or []
    loc = (cat.get("location", "") or "") + " " + " ".join(all_locs if isinstance(all_locs, list) else [])
    url = j.get("hostedUrl") or j.get("applyUrl")
    posted = _date10(j.get("createdAt"))
  elif ats == "workable":
    # Workable: state=published only, location is a nested object with
    # city/region/country plus a `locations` array for multi-location roles.
    if j.get("state") and j.get("state") != "published": return None
    title = (j.get("title") or "").strip()
    primary = j.get("location") or {}
    others = j.get("locations") or []
    loc = ((primary.get("city") or "") + " " + (primary.get("region") or "") + " " +
           " ".join(((l.get("city") or "") + " " + (l.get("region") or ""))
                    for l in others if isinstance(l, dict)))
    url = f"https://apply.workable.com/{slug}/j/{j.get('shortcode','')}"
    posted = _date10(j.get("published_on") or j.get("created_at"))
  elif ats == "teamtailor":
    # Teamtailor JSONFeed item. Title + url are top-level; location is in
    # _jobposting.jobLocation[].address.{addressLocality,addressRegion}.
    title = (j.get("title") or "").strip()
    url = j.get("url") or ""
    locs = (j.get("_jobposting") or {}).get("jobLocation") or []
    if isinstance(locs, dict): locs = [locs]
    parts = []
    for L in locs:
      a = (L or {}).get("address") or {}
      parts.append(f"{a.get('addressLocality','')} {a.get('addressRegion','')}")
    loc = " ".join(parts)
    posted = _date10(j.get("date_published"))
  elif ats == "smartrecruiters":
    # SmartRecruiters posting. Title = name; location = {city, region,
    # fullLocation, remote, hybrid}; URL constructed from company + id.
    title = (j.get("name") or "").strip()
    L = j.get("location") or {}
    loc = f"{L.get('city','')} {L.get('region','')} {L.get('fullLocation','')}"
    url = f"https://jobs.smartrecruiters.com/{slug}/{j.get('id','')}"
    posted = _date10(j.get("releasedDate"))
  elif ats == "recruitee":
    title = (j.get("title") or "").strip()
    loc = " ".join(str(j.get(k) or "") for k in ("location", "city", "country"))
    url = j.get("careers_url") or j.get("careers_apply_url")
    posted = _date10(j.get("published_at") or j.get("created_at"))
  elif ats == "personio":
    # No url and no date in the feed — the posting URL is derivable from the
    # id, and recency simply is not available from this backend.
    title = (j.get("name") or "").strip()
    offices = j.get("offices") or []
    loc = (j.get("office") or "") + " " + " ".join(
      o.get("name", "") if isinstance(o, dict) else str(o) for o in offices)
    tld = j.get("_tld", "de")
    url = f"https://{slug}.jobs.personio.{tld}/job/{j.get('id','')}?display=en" if j.get("id") else ""
    posted = ""
  elif ats == "bamboohr":
    title = (j.get("jobOpeningName") or "").strip()
    def _flat(v):
      # BambooHR returns location and atsLocation as nested objects on some
      # tenants and plain strings on others.
      if isinstance(v, dict):
        return " ".join(_flat(x) for x in v.values())
      return "" if v is None else str(v)
    loc = _flat(j.get("location")) + " " + _flat(j.get("atsLocation"))
    if j.get("isRemote"): loc += " Remote"
    url = f"https://{slug}.bamboohr.com/careers/{j.get('id','')}" if j.get("id") else ""
    posted = ""
  elif ats == "breezy":
    title = (j.get("name") or "").strip()
    def _bz(L):
      if not isinstance(L, dict): return str(L or "")
      city = L.get("city") or ""
      st = (L.get("state") or {}).get("name", "") if isinstance(L.get("state"), dict) else (L.get("state") or "")
      co = (L.get("country") or {}).get("name", "") if isinstance(L.get("country"), dict) else (L.get("country") or "")
      return f"{city} {st} {co}"
    loc = _bz(j.get("location")) + " " + " ".join(_bz(x) for x in (j.get("locations") or []))
    url = j.get("url") or ""
    posted = _date10(j.get("published_date"))
  elif ats == "pinpoint":
    title = (j.get("title") or "").strip()
    L = j.get("location") or {}
    loc = " ".join(str(L.get(k) or "") for k in ("name", "city", "province")) if isinstance(L, dict) else str(L)
    url = j.get("url") or (f"https://{slug}.pinpointhq.com{j.get('path','')}" if j.get("path") else "")
    posted = _date10(j.get("published_at") or j.get("created_at"))
  elif ats == "rippling":
    title = (j.get("name") or "").strip()
    W = j.get("workLocation")
    if isinstance(W, dict):
      loc = " ".join(str(W.get(k) or "") for k in ("city", "state", "country", "label", "name"))
    else:
      loc = str(W or "")
    url = j.get("url") or ""
    posted = ""
  elif ats == "workday":
    # Workday: locationsText is a free-form string (e.g. "NY - New York"
    # or "MI - Detroit"). externalPath is relative — prefix with the
    # tenant URL we know from slug.
    title = (j.get("title") or "").strip()
    loc = j.get("locationsText") or ""
    try:
      tenant, wdn, site = slug.split("/", 2)
      url = f"https://{tenant}.{wdn}.myworkdayjobs.com/en-US/{site}{j.get('externalPath','')}"
    except ValueError:
      url = ""
    posted = _date10(j.get("startDate"))
  else:
    return None
  _desc = description_of(ats, j)
  # Some ATS rows come back with an http:// absolute_url (Greenhouse does this
  # for custom career domains). Every one of these hosts serves https, and a
  # board full of http links is a board full of mixed-content warnings.
  if url and url.startswith("http://"):
    url = "https://" + url[len("http://"):]
  return {"title": title, "url": url, "loc": loc, "posted": posted,
          "pay": pay_of(ats, j), "id": j.get("id"), "_desc": _desc,
          "years": years_required(_desc), "summary": summary_of(_desc)}


def filter_jobs(profile: Profile, ats, raw, slug="", vertical=""):
  out = []
  for j in raw:
    n = normalize(ats, j, slug)
    if not n or not n["title"] or not n["url"]:
      continue
    title, loc = n["title"], n["loc"]
    remote = False
    # Foreign screening applies to whichever lane matched. A board whose
    # primary geography is itself "remote" still has to reject Manila and
    # Bengaluru, and that check used to live only in the secondary lane.
    if profile.geo_remote_foreign and profile.geo_remote_foreign.search(loc) \
       and not (profile.geo_remote_home and profile.geo_remote_home.search(loc)):
      continue
    if not profile.geo.search(loc):
      # Remote lane: "Remote - US" is takeable from the target city; "Remote -
      # Canada" is not. A listing naming any home-country location counts even
      # if it also names foreign ones, since one of the options is takeable.
      if not (profile.geo_remote and profile.geo_remote.search(loc)):
        continue
      at_home = bool(profile.geo_remote_home and profile.geo_remote_home.search(loc))
      foreign = bool(profile.geo_remote_foreign and profile.geo_remote_foreign.search(loc))
      if not at_home and foreign:
        continue
      remote = True
    # Title-authoritative city override: if the title explicitly names a
    # non-NYC city, drop even if the ATS location field said "New York"
    # (common in multi-location listings where NYC was just one of several).
    if (profile.title_city_exclude and profile.title_city_exclude.search(title)
        and not profile.geo.search(title)):
      continue
    if profile.title_exclude and profile.title_exclude.search(title): continue
    if not profile.title_include.search(title):
      if not (profile.title_include_broad
              and vertical in profile.broad_verticals
              and profile.title_include_broad.search(title)):
        continue
    # ── The posting itself ────────────────────────────────────────────
    # Everything above judged a title and a location string. The requirements
    # live in the description, so read it — from the listing where the ATS
    # includes it, otherwise with one request now that this posting has
    # actually matched. Screening a title alone is how roles demanding five
    # years and a CPC certification ended up on an entry-level board.
    level = profile.level(title)
    desc = n.get("_desc")
    detail = None
    if not desc or len(desc) < 120:
      if ats == "greenhouse" and n.get("id"):
        detail = curl_json(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs/{n['id']}?pay_transparency=true")
        desc = (detail or {}).get("content") or desc
      else:
        desc = fetch_description(ats, slug, j) or desc

    readable = bool(desc and len(desc) >= 120)
    if profile.require_description and not readable:
      # Unread is unscreened. On a board whose whole promise is "no
      # requirements", showing a posting nobody checked is worse than showing
      # one fewer posting.
      _refused.append((slug, title, "unreadable", ["no description available"]))
      continue

    pay = n.get("pay")
    if not pay and detail:
      pay = _pay_from_greenhouse_detail(detail)

    years = years_required(desc)
    if profile.max_years is not None and years is not None and years > profile.max_years:
      _refused.append((slug, title, "experience", [f"{years} years required"]))
      continue
    # Paranoid by design: refuse rather than display. Every posting here comes
    # from a company's own ATS, but that is a reason to be careful, not a
    # reason to stop checking.
    if profile.screen_fraud:
      ff = fraud_flags(title, desc, pay)
      if ff:
        _refused.append((slug, title, "fraud", ff))
        continue
    if profile.screen_credentials:
      cf = credential_flags(title, desc)
      if cf:
        _refused.append((slug, title, "credential", cf))
        continue

    job = {"title": title, "url": n["url"], "level": level, "posted": n["posted"]}
    if years is not None:
      job["years"] = years
    if profile.raw.get("captureSummary"):
      sm = summary_of(desc)
      if sm:
        job["summary"] = sm
    if pay:
      job["pay"] = pay
      job["paySource"] = "posted"
    else:
      est = profile.estimate_pay(title, level)
      if est:
        job["pay"] = est
        job["paySource"] = "estimate"
    if remote:
      job["remote"] = True
      job["loc"] = n["loc"].strip()[:60]
    out.append(job)
  # Sort by the profile's own level order (entry-first for early-career
  # boards, entry > mid > senior where a profile keeps senior roles).
  order = profile.raw.get("levelOrder") or ["entry", "mid", "senior"]
  rank = {k: i for i, k in enumerate(order)}
  out.sort(key=lambda j: (rank.get(j["level"], len(order)), j["title"].lower()))
  return out


# ── Codegen ──────────────────────────────────────────────────────────────
def emit_companies_block(profile: Profile, rows, today):
  lines = [
    "/* ---------- COMPANIES ----------",
    f" * NYC board for profile '{profile.id}'. Every posting below was live on",
    f" * the company's public ATS JSON when verified ({today}) and matched the",
    f" * profile's title + location filters (profiles/{profile.id}.json).",
    " * URLs link directly to the posting (not aggregators).",
    " *",
    " * Regenerate with:",
    f" *   python3 scripts/refresh-companies.py --profile {profile.id}",
    " * or run the whole pipeline:",
    f" *   scripts/pipeline.sh {profile.id}",
    " *",
    " * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],",
    " *           totalRoles, notes, jobs[{ title, url, level, posted, added }] }",
    " *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).",
    " */",
    f"const COMPANIES_VERIFIED_AT = '{today}';",
    "const COMPANIES = [",
  ]
  for c in rows:
    jobs_inner = ",\n      ".join(
      "{ title:" + json.dumps(j["title"]) + ", url:" + json.dumps(j["url"]) +
      ", level:" + json.dumps(j["level"]) +
      (", remote:true" if j.get("remote") else "") +
      (", loc:" + json.dumps(j["loc"]) if j.get("loc") else "") +
      (", pay:" + json.dumps(j["pay"], separators=(",", ":")) if j.get("pay") else "") +
      (", paySource:" + json.dumps(j["paySource"]) if j.get("paySource") else "") +
      (", years:" + str(j["years"]) if j.get("years") is not None else "") +
      (", summary:" + json.dumps(j["summary"]) if j.get("summary") else "") + " }"
      for j in c["jobs"]
    )
    badges_inner = ", ".join(json.dumps(b) for b in c["badges"])
    lines.append("  { id:" + json.dumps(c["id"]) +
                 ", name:" + json.dumps(c["name"]) +
                 ", vertical:" + json.dumps(c["vertical"]) + ",")
    lines.append("    sub:" + json.dumps(c["sub"]) + ",")
    lines.append("    stage:" + json.dumps(c["stage"]) +
                 ", raised:" + json.dumps(c["raised"]) +
                 ", lead:" + json.dumps(c["lead"]) + ",")
    lines.append("    badges:[" + badges_inner + "],")
    lines.append(f"    totalRoles:{c['totalRoles']},")
    lines.append("    notes:" + json.dumps(c["notes"]) + ",")
    lines.append("    jobs:[")
    lines.append("      " + jobs_inner)
    lines.append("    ] },")
  lines.append("];")
  return "\n".join(lines) + "\n"


def emit_domains_block(profile: Profile, ids_present):
  rows, buf = [], []
  for cid, dom in profile.domains().items():
    if cid not in ids_present: continue
    key = repr(cid) if "-" in cid else cid
    buf.append(f"{key}:{repr(dom)}")
    if len(buf) == 3:
      rows.append(", ".join(buf) + ",")
      buf = []
  if buf:
    rows.append(", ".join(buf) + ",")
  return (
    "/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */\n"
    "const COMPANY_DOMAINS = {\n  " + "\n  ".join(rows) + "\n};"
  )


def splice(src, marker_start_substr, block, end_marker="\n];\n"):
  s = src.index(marker_start_substr)
  e = src.index(end_marker, s) + len(end_marker)
  return src[:s] + block + "\n" + src[e:]


def write_data_file(profile: Profile, rows, today):
  """Rewrite (or create) the profile's data file from `rows`."""
  ids_present = {r["id"] for r in rows}
  companies_block = emit_companies_block(profile, rows, today)
  domains_block = emit_domains_block(profile, ids_present)
  if profile.data_file.exists():
    src = profile.data_file.read_text()
    src = splice(src, "/* ---------- COMPANIES ----------", companies_block)
    pat = re.compile(r"/\* ---------- COMPANY DOMAINS.*?\nconst COMPANY_DOMAINS = \{[^}]*\};", re.DOTALL)
    src, n = pat.subn(domains_block, src, count=1)
    assert n == 1, "Could not locate COMPANY_DOMAINS block to replace"
  else:
    src = "\n".join([
      f"// {profile.id} — job board data (generated; do not hand-edit)",
      f"// Regenerate: scripts/pipeline.sh {profile.id}",
      "",
      companies_block,
      domains_block,
      "",
      f"window.{profile.raw.get('dataGlobal', 'DATA')} = "
      "{ COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };",
      "",
    ])
  profile.data_file.parent.mkdir(parents=True, exist_ok=True)
  profile.data_file.write_text(src)


# ── Entrypoint ───────────────────────────────────────────────────────────
_print_lock = threading.Lock()
# Postings the screens refused, reported at the end of a run. A screen nobody
# can see is a screen nobody can correct.
_refused = []


def probe(profile: Profile, cand, verbose=False):
  """Fetch + filter one candidate. Returns a row dict, or None on no match."""
  raw = fetch(cand["ats"], cand["slug"])
  matches = filter_jobs(profile, cand["ats"], raw, cand["slug"], cand.get("vertical", ""))
  if not matches:
    if verbose:
      with _print_lock:
        print(f"[no-match] {cand['name']} ({cand['ats']}:{cand['slug']}) "
              f"— {len(raw)} posting(s) on board", file=sys.stderr)
    return None
  with _print_lock:
    print(f"[ok] {cand['name'][:26]:26s} {len(matches):3d} role(s)", file=sys.stderr)
  return {
    "id": cand["id"], "name": cand["name"], "vertical": cand["vertical"],
    "sub": cand["sub"], "stage": cand["stage"], "raised": cand["raised"],
    "lead": cand["lead"], "badges": cand.get("badges", []),
    "totalRoles": len(matches), "notes": cand.get("notes", ""), "jobs": matches,
  }


def parse_shard(spec):
  """'2/4' -> (1, 4) zero-indexed. '' -> (0, 1)."""
  if not spec:
    return 0, 1
  try:
    i, n = spec.split("/")
    i, n = int(i), int(n)
  except ValueError:
    sys.exit(f"--shard wants i/n (e.g. 2/4), got {spec!r}")
  if not (1 <= i <= n):
    sys.exit(f"--shard index out of range: {spec}")
  return i - 1, n


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("--profile", default="thien", help="profile id under profiles/ (default: thien)")
  ap.add_argument("-v", "--verbose", action="store_true", help="print no-match diagnostics")
  ap.add_argument("--only", default="", help="comma-separated candidate ids to probe (default: all)")
  ap.add_argument("--shard", default="", help="probe only shard i of n, e.g. 2/4 (for parallel agents)")
  ap.add_argument("--jobs", type=int, default=12, help="concurrent ATS probes (default: 12)")
  ap.add_argument("--emit-json", default="", help="write fetched rows to this JSON path and DO NOT touch the "
                                                  "data file (feed it to scripts/merge-additive.js)")
  ap.add_argument("--from-json", default="", help="skip fetching: write the data file straight from a merged "
                                                  "shard payload (used to bootstrap a brand-new board)")
  args = ap.parse_args()

  profile = Profile(args.profile)

  # Bootstrap path: the shards already did the fetching, so just render them.
  if args.from_json:
    payload = json.loads(Path(args.from_json).read_text())
    if payload.get("profile") not in (None, profile.id):
      sys.exit(f"{args.from_json} is for profile {payload['profile']!r}, not {profile.id!r}")
    rows = payload.get("rows", [])
    today = payload.get("verified") or datetime.date.today().isoformat()
    write_data_file(profile, rows, today)
    print(f"Wrote {profile.data_file.relative_to(REPO_ROOT)} from {args.from_json} — "
          f"{len(rows)} companies, {sum(len(r['jobs']) for r in rows)} roles (verified {today})",
          file=sys.stderr)
    return

  only = {x.strip() for x in args.only.split(",") if x.strip()}
  shard_i, shard_n = parse_shard(args.shard)
  today = datetime.date.today().isoformat()

  cands = [c for c in profile.companies if not only or c["id"] in only]
  if shard_n > 1:
    cands = [c for k, c in enumerate(cands) if k % shard_n == shard_i]
  label = f"{args.profile}" + (f" shard {shard_i+1}/{shard_n}" if shard_n > 1 else "")
  print(f"probing {len(cands)} candidate(s) [{label}] with {args.jobs} workers…", file=sys.stderr)

  with ThreadPoolExecutor(max_workers=max(1, args.jobs)) as pool:
    results = list(pool.map(lambda c: probe(profile, c, args.verbose), cands))
  rows = [r for r in results if r]
  # Deterministic order regardless of thread completion order.
  rows.sort(key=lambda r: r["id"])
  no_match = [c["name"] for c, r in zip(cands, results) if not r]

  print(f"\n{len(rows)} companies survived (of {len(cands)} probed)", file=sys.stderr)
  if _refused:
    by_kind = {}
    for slug, title, kind, flags in _refused:
      by_kind.setdefault(kind, []).append(f"{slug}: {title} [{', '.join(flags)}]")
    for kind, items in sorted(by_kind.items()):
      print(f"\nrefused {len(items)} posting(s) — {kind}:", file=sys.stderr)
      for it in items[:20]:
        print(f"  · {it}", file=sys.stderr)
  if no_match and args.verbose:
    print(f"{len(no_match)} dropped:", *no_match, sep="\n  ", file=sys.stderr)

  if args.emit_json:
    payload = {"profile": profile.id, "verified": today, "shard": args.shard or "1/1", "rows": rows}
    p = Path(args.emit_json)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(payload, indent=2))
    print(f"\nWrote {sum(len(r['jobs']) for r in rows)} live URLs across {len(rows)} companies "
          f"-> {args.emit_json} (verified {today}).", file=sys.stderr)
    return

  write_data_file(profile, rows, today)
  print(f"\nRewrote {profile.data_file.relative_to(REPO_ROOT)} — verified {today}", file=sys.stderr)
  print(f"Total live URLs: {sum(len(r['jobs']) for r in rows)}", file=sys.stderr)


if __name__ == "__main__":
  main()
