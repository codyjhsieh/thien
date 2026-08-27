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
    d = curl_json(f"https://api.ashbyhq.com/posting-api/job-board/{slug}?includeCompensation=false")
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
    # {slug}.jobs.personio.de — search.json is what their careers SPA calls.
    # Returns a bare array; no posting URL or date, so both are derived below.
    d = curl_json(f"https://{slug}.jobs.personio.de/search.json?language=en")
    return d if isinstance(d, list) else []
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
    url = f"https://{slug}.jobs.personio.de/job/{j.get('id','')}?display=en" if j.get("id") else ""
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
  # Some ATS rows come back with an http:// absolute_url (Greenhouse does this
  # for custom career domains). Every one of these hosts serves https, and a
  # board full of http links is a board full of mixed-content warnings.
  if url and url.startswith("http://"):
    url = "https://" + url[len("http://"):]
  return {"title": title, "url": url, "loc": loc, "posted": posted}


def filter_jobs(profile: Profile, ats, raw, slug="", vertical=""):
  out = []
  for j in raw:
    n = normalize(ats, j, slug)
    if not n or not n["title"] or not n["url"]:
      continue
    title, loc = n["title"], n["loc"]
    if not profile.geo.search(loc): continue
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
    out.append({"title": title, "url": n["url"], "level": profile.level(title),
                "posted": n["posted"]})
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
      ", level:" + json.dumps(j["level"]) + " }"
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
