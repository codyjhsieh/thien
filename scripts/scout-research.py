#!/usr/bin/env python3
"""
scout-research.py — find a company's ATS by reading its careers page.

    # research from names, deriving and verifying the website
    python3 scripts/scout-research.py names.txt --profile alan --vertical repe

    # research from URLs an agent already found (one per line: Name<TAB>url)
    python3 scripts/scout-research.py sites.tsv --urls --profile alan --vertical repe

scout.py and scout-workday.py both *guess*: they expand a company name into
plausible slugs and see which ones answer. That works when the slug is the
company name and fails silently otherwise, which is most of the time —
58 of 66 Workday entries already in this repo's pools were guesses that never
resolved, and nothing ever reported it.

This script looks the answer up instead. Every company that uses a hosted ATS
links to it from its own careers page, so the slug is published; it just is not
in the company's name. Following that link gives three outcomes, and two of
them are answers:

  · a supported backend and its exact slug — no guessing, including the
    bespoke Workday triples (`tenant/wdN/site`) that guessing cannot reach
  · an unsupported backend by name — iCIMS, Taleo, Jobvite, Phenom, Avature.
    Related Companies is on iCIMS, so no slug exists to find, and recording
    that is worth as much as a hit: it stops the next sweep re-probing them.
  · nothing found, which stays "unknown" rather than becoming a wrong guess.

The crawl follows careers links across hosts, because careers sites routinely
live on their own domain (related.com -> related.jobs -> iCIMS). It reads
same-origin script bundles too: a board embedded by JavaScript still carries
its slug as a literal string in the bundle.

Identity is still checked by scout.validate — a published link is strong
evidence, but the pool's rule is that nothing enters unvalidated.
"""

from __future__ import annotations
import argparse, html, importlib.util, json, re, subprocess, sys, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location("scout", ROOT / "scripts" / "scout.py")
sc = importlib.util.module_from_spec(_spec)
_argv, sys.argv = sys.argv, ["scout"]
_spec.loader.exec_module(sc)
sys.argv = _argv

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# Backends the pipeline can actually fetch. Order matters only for reporting.
SUPPORTED = {
  "greenhouse":     r"(?:job-boards|boards)\.(?:eu\.)?greenhouse\.io/([A-Za-z0-9_-]+)",
  "greenhouse_emb": r"boards-api\.greenhouse\.io/v1/boards/([A-Za-z0-9_-]+)",
  "ashby":          r"jobs\.ashbyhq\.com/([A-Za-z0-9_-]+)",
  "ashby_api":      r"api\.ashbyhq\.com/posting-api/job-board/([A-Za-z0-9_-]+)",
  "lever":          r"jobs(?:\.eu)?\.lever\.co/([A-Za-z0-9_-]+)",
  "lever_api":      r"api\.lever\.co/v0/postings/([A-Za-z0-9_-]+)",
  "workable":       r"apply\.workable\.com/([A-Za-z0-9_-]+)",
  "teamtailor":     r"([A-Za-z0-9_-]+)\.teamtailor\.com",
  "smartrecruiters": r"(?:jobs|careers)\.smartrecruiters\.com/([A-Za-z0-9_-]+)",
  "recruitee":      r"([A-Za-z0-9_-]+)\.recruitee\.com",
  "personio":       r"([A-Za-z0-9_-]+)\.jobs\.personio\.[a-z]+",
  "bamboohr":       r"([A-Za-z0-9_-]+)\.bamboohr\.com",
  "breezy":         r"([A-Za-z0-9_-]+)\.breezy\.hr",
  "pinpoint":       r"([A-Za-z0-9_-]+)\.pinpointhq\.com",
  "rippling":       r"ats\.rippling\.com/([A-Za-z0-9_-]+)",
}
# Workday needs all three parts, so it gets its own pattern.
WORKDAY = re.compile(
  r"([A-Za-z0-9_-]+)\.(wd\d+)\.myworkdayjobs\.com/(?:wday/cxs/[A-Za-z0-9_-]+/)?"
  r"(?:[a-z]{2}-[A-Z]{2}/)?([A-Za-z0-9_-]+)", re.I)

# Real ATSs with no public JSON board. Finding one is a definite answer.
UNSUPPORTED = ("icims.com", "taleo.net", "jobvite.com", "paylocity.com",
               "phenompeople.com", "avature.net", "successfactors",
               "oraclecloud.com", "dayforcehcm.com", "ultipro.com",
               "adp.com", "silkroad.com", "jazzhr.com", "clearcompany.com",
               "paycomonline.net", "applicantpro.com", "workforcenow")

CAREERS_HINT = re.compile(
  r"career|job|opening|opportunit|vacanc|position|join[\s-]?us|work[\s-]?(?:with|for|at)|"
  r"employment|hiring|recruit|apply", re.I)
# Paths that look like careers but never carry a board.
CAREERS_NOISE = re.compile(
  r"privacy|cookie|legal|terms|scam|fraud|login|signin|blog/|news/|press/|"
  r"\.(?:css|png|jpe?g|svg|gif|webp|pdf|ico|woff2?)(?:\?|$)", re.I)


def fetch(url: str, timeout: int = 20) -> str:
  try:
    r = subprocess.run(
      ["curl", "-sS", "-L", "--max-time", str(timeout), "-A", UA, url],
      capture_output=True, timeout=timeout + 5, text=True, errors="replace")
    return r.stdout or ""
  except Exception:
    return ""


def ats_from_text(text: str) -> tuple[str, str] | None:
  """First supported (ats, slug) the text mentions."""
  m = WORKDAY.search(text)
  if m:
    tenant, wdn, site = m.group(1), m.group(2).lower(), m.group(3)
    # A wday/cxs URL repeats the tenant before the site; the bare careers URL
    # does not. Either way the third group is the site unless it is a locale.
    if site.lower() not in ("en-us", "job", "jobs", "wday", "cxs"):
      return "workday", f"{tenant}/{wdn}/{site}"
  for name, pat in SUPPORTED.items():
    m = re.search(pat, text, re.I)
    if m:
      return name.split("_")[0], m.group(1)
  return None


def unsupported_in(text: str) -> str | None:
  low = text.lower()
  for u in UNSUPPORTED:
    if u in low:
      return u
  return None


def script_urls(page_url: str, body: str, limit: int = 12) -> list[str]:
  """Same-origin JS bundles — an embedded board keeps its slug in one."""
  host = urlparse(page_url).netloc
  out = []
  for m in re.finditer(r'<script[^>]+src=["\']([^"\']+\.js[^"\']*)["\']', body, re.I):
    u = urljoin(page_url, html.unescape(m.group(1)))
    if urlparse(u).netloc == host:
      out.append(u)
  return out[:limit]


def careers_links(page_url: str, body: str, limit: int = 8) -> list[str]:
  out = []
  for m in re.finditer(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
                       body, re.I | re.S):
    href = html.unescape(m.group(1))
    label = re.sub(r"<[^>]+>", " ", m.group(2))
    if not CAREERS_HINT.search(href + " " + label):
      continue
    u = urljoin(page_url, href)
    if not u.startswith("http") or CAREERS_NOISE.search(u):
      continue
    out.append(u)
  # Prefer the deeper, more specific links: /careers/open-positions beats /careers.
  out.sort(key=lambda u: -len(urlparse(u).path))
  return list(dict.fromkeys(out))[:limit]


def research(name: str, start: str, max_pages: int = 10) -> dict:
  """Crawl from `start` until an ATS turns up. Returns a verdict dict."""
  queue, seen, unsupported = [start], set(), None
  pages = 0
  while queue and pages < max_pages:
    url = queue.pop(0)
    if url in seen:
      continue
    seen.add(url)
    body = fetch(url)
    pages += 1
    if not body:
      continue
    hit = ats_from_text(body)
    if hit:
      return {"name": name, "ats": hit[0], "slug": hit[1], "via": url,
              "verdict": "found"}
    for js in script_urls(url, body):
      hit = ats_from_text(fetch(js, timeout=12))
      if hit:
        return {"name": name, "ats": hit[0], "slug": hit[1], "via": js,
                "verdict": "found"}
    unsupported = unsupported or unsupported_in(body)
    queue.extend(careers_links(url, body))
  if unsupported:
    return {"name": name, "verdict": "unsupported-ats", "via": start,
            "detail": unsupported}
  return {"name": name, "verdict": "not-found", "via": start,
          "detail": f"read {pages} page(s), no ATS link"}


def domain_candidates(name: str) -> list[str]:
  words = re.sub(r"[^a-z0-9 ]", " ", unicodedata.normalize("NFKD", name)
                 .encode("ascii", "ignore").decode().lower()).split()
  drop = {"the", "inc", "llc", "ltd", "corp", "corporation", "company",
          "companies", "group", "holdings", "partners"}
  core = [w for w in words if w not in drop] or words
  bases = list(dict.fromkeys(["".join(words), "".join(core),
                              "".join(core[:2]), core[0] if core else ""]))
  return [f"https://www.{b}.com" for b in bases if len(b) >= 3][:4]


def site_is(name: str, url: str) -> bool:
  """Does this site actually belong to the company? Check what it calls itself."""
  body = fetch(url, timeout=15)
  if not body:
    return False
  m = re.search(r"<title[^>]*>(.*?)</title>", body, re.I | re.S)
  og = re.search(r'property=["\']og:site_name["\'][^>]*content=["\']([^"\']+)',
                 body, re.I)
  declared = " ".join(filter(None, [m.group(1) if m else "", og.group(1) if og else ""]))
  return bool(declared) and sc.same_company(name, re.sub(r"<[^>]+>", " ", declared))


def find_site(name: str) -> str | None:
  for u in domain_candidates(name):
    if site_is(name, u):
      return u
  return None


def handle(entry: tuple[str, str | None]) -> dict:
  name, url = entry
  if not url:
    url = find_site(name)
    if not url:
      return {"name": name, "verdict": "no-site",
              "detail": "no verified website; pass one with --urls"}
  return research(name, url)


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("input", help="company names, or Name<TAB>url with --urls")
  ap.add_argument("--urls", action="store_true",
                  help="input is Name<TAB>url — use when an agent researched the URLs")
  ap.add_argument("--profile", default="alan")
  ap.add_argument("--vertical", required=True)
  ap.add_argument("--note", default="")
  ap.add_argument("--stage", default="—")
  ap.add_argument("-o", "--out", default="")
  ap.add_argument("--report", default="", help="write every verdict here as JSON")
  ap.add_argument("--append", action="store_true")
  ap.add_argument("--jobs", type=int, default=6)
  ap.add_argument("--record-unfetchable", default="data/unfetchable.json",
                  help="merge companies proven to be on an unsupported ATS into "
                       "this file so later sweeps skip them (empty string to skip). "
                       "Deliberately outside profiles/, which is globbed as the "
                       "profile namespace by four different tools.")
  args = ap.parse_args()

  entries = []
  for line in Path(args.input).read_text().splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
      continue
    if args.urls and ("\t" in line or " http" in line):
      n, u = re.split(r"\t| (?=https?://)", line, 1)
      entries.append((n.strip(), u.strip()))
    else:
      entries.append((line, None))

  print(f"── researching {len(entries)} compan(ies) from their own careers pages",
        file=sys.stderr)
  with ThreadPoolExecutor(max_workers=args.jobs) as p:
    results = list(p.map(handle, entries))

  found = [r for r in results if r["verdict"] == "found"]
  with ThreadPoolExecutor(max_workers=8) as p:
    checked = list(p.map(sc.validate,
                         [(r["name"], r["ats"], r["slug"], 0) for r in found]))

  kept, by = [], {r["name"]: r for r in found}
  for name, ats, slug, n, verdict, why in checked:
    if verdict.startswith("OK"):
      kept.append({"id": sc.norm(name)[:28], "name": name, "ats": ats,
                   "slug": slug, "vertical": args.vertical, "sub": name,
                   "stage": args.stage, "raised": "—", "lead": "—",
                   "badges": [], "notes": args.note})
      print(f"   found  {name[:28]:28s} {ats}:{slug}", file=sys.stderr)
      print(f"          via {by[name]['via'][:96]}", file=sys.stderr)
    else:
      print(f"   {verdict:18s} {name[:28]:28s} {ats}:{slug} — {why[:60]}",
            file=sys.stderr)
      by[name]["verdict"] = verdict

  for r in results:
    if r["verdict"] != "found":
      print(f"   {r['verdict']:18s} {r['name'][:28]:28s} {r.get('detail','')[:60]}",
            file=sys.stderr)

  tally = {}
  for r in results:
    tally[r["verdict"]] = tally.get(r["verdict"], 0) + 1
  print(f"── {len(kept)} validated; {tally}", file=sys.stderr)

  # A company proven to be on ADP, Paycom or iCIMS has no slug to find, ever.
  # Writing that down is the difference between research and guessing: the next
  # sweep skips it instead of re-probing 30 slug shapes and reporting nothing.
  if args.record_unfetchable:
    path = ROOT / args.record_unfetchable
    known = json.loads(path.read_text()) if path.exists() else {}
    for r in results:
      if r["verdict"] == "unsupported-ats":
        known[r["name"]] = {"ats": r["detail"], "seen": r["via"]}
    path.write_text(json.dumps(dict(sorted(known.items())), indent=1,
                               ensure_ascii=False) + "\n")
    print(f"   {len(known)} compan(ies) now recorded as unfetchable", file=sys.stderr)

  if args.report:
    Path(args.report).write_text(json.dumps(results, indent=1) + "\n")
  if args.out:
    Path(args.out).write_text(json.dumps(kept, indent=1, ensure_ascii=False) + "\n")
  if args.append:
    pool = ROOT / "profiles" / f"{args.profile}.companies.json"
    added, skipped = sc.append_to_pool(kept, args.profile, pool)
    print(f"   appended {len(added)} to {pool.name}; skipped {skipped}", file=sys.stderr)
  if not args.out and not args.append:
    json.dump(kept, sys.stdout, indent=1, ensure_ascii=False)


if __name__ == "__main__":
  main()
