#!/usr/bin/env python3
"""
scout-workday.py — resolve Workday slugs, the one backend scout.py cannot guess.

    python3 scripts/scout-workday.py names.txt --profile alan \
        --vertical repe --note "…" -o new.json [--append]

Every other backend takes a bare subdomain, so scout.py can guess it from the
company name. Workday's slug is a three-part tuple — `tenant/wdN/site` — and the
site segment is bespoke per customer: "Blackstone_Careers", "BlackRock_Professional",
"Join_Sonder", "CityblockExternalCareerSite". job-scout's advice used to be to
read it off a careers page by hand, which meant Workday was effectively skipped.

That is fine for a board of venture-backed startups and useless for one of
institutional employers. Real-estate investment firms resolved at 5% on the
guessable backends and 28% here: Blackstone, Brookfield, Carlyle, Oaktree, Blue
Owl, TIAA, BlackRock and PJT Partners are all Workday-only.

Three stages:

  1. tenant + datacenter — POST /{tenant}/sites answers "Requested page not
     found /{tenant}/sites" when the tenant exists in that datacenter and
     "Internal Server Error" when it does not. That narrows wdN without knowing
     the site.
  2. site — try the shapes Workday customers actually use against the real jobs
     endpoint. A 200 with a posting count is proof the triple is live.
  3. identity — hand the triple to scout.validate, which reads
     hiringOrganization off a job detail. This stage is not optional: a tenant
     guessed as "western" for Western Alliance Bancorporation is Western
     Colorado University, and "prudential" is Prudential Assurance Singapore,
     not Prudential Financial. Both serve hundreds of real postings.
"""

from __future__ import annotations
import argparse, importlib.util, json, re, subprocess, sys, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location("scout", ROOT / "scripts" / "scout.py")
sc = importlib.util.module_from_spec(_spec)
_argv, sys.argv = sys.argv, ["scout"]
_spec.loader.exec_module(sc)
sys.argv = _argv

# Workday spreads customers across numbered datacenters; these are the ones that
# actually appear in the wild.
WDNS = ["wd1", "wd2", "wd3", "wd5", "wd10", "wd12", "wd101", "wd103", "wd105"]
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# Words that belong to a legal name but never to a tenant.
DROP = {"the", "inc", "llc", "ltd", "limited", "corp", "corporation", "company",
        "companies", "group", "holdings", "partners", "capital", "management",
        "properties", "realty", "real", "estate", "trust", "investment",
        "investments", "financial", "advisors", "international", "worldwide"}


def post(url: str, body: str = "{}", referer: str | None = None, timeout: int = 12) -> str:
  args = ["curl", "-sS", "--max-time", str(timeout), "-X", "POST",
          "-H", "Content-Type: application/json", "-H", "Accept: application/json",
          "-H", f"User-Agent: {UA}"]
  if referer:
    args += ["-H", f"Referer: {referer}"]
  args += ["-d", body, url]
  try:
    return subprocess.run(args, capture_output=True, timeout=timeout + 4,
                          text=True).stdout or ""
  except Exception:
    return ""


def tenant_guesses(name: str, limit: int = 3) -> list[str]:
  words = re.sub(r"[^a-z0-9 ]", " ", unicodedata.normalize("NFKD", name)
                 .encode("ascii", "ignore").decode().lower()).split()
  out = ["".join(words)]
  trimmed = [w for w in words if w not in DROP]
  if trimmed and trimmed != words:
    out.append("".join(trimmed))
    out.append(trimmed[0])
  elif words:
    out.append(words[0])
  return list(dict.fromkeys(w for w in out if len(w) >= 3))[:limit]


def datacenters(tenant: str) -> list[str]:
  """Which wdN this tenant lives in, per the /sites error text."""
  return [wdn for wdn in WDNS
          if "Requested page not found" in post(
              f"https://{tenant}.{wdn}.myworkdayjobs.com/{tenant}/sites")]


def site_guesses(tenant: str, name: str, limit: int = 28) -> list[str]:
  words = re.sub(r"[^A-Za-z0-9 ]", " ", name).split()
  cap = "".join(w.capitalize() for w in words)
  first = words[0].capitalize() if words else tenant.capitalize()
  t, T = tenant, tenant.capitalize()
  return list(dict.fromkeys([
    "External", "Careers", "careers", "external", "Global", "Search",
    "External_Career_Site", "ExternalCareerSite", "External_Careers",
    f"{T}_Careers", f"{T}Careers", f"{T}_External", f"{T}External",
    f"{T}ExternalCareerSite", f"{T}_Professional", f"{T}_Careers_External",
    f"{first}_Careers", f"{first}Careers", f"{first}ExternalCareerSite",
    f"{cap}Careers", f"{cap}_Careers", f"Join_{T}", f"Join{T}", T, t, cap,
    "CareerSite", "Career_Site", "Professional", "Experienced",
  ]))[:limit]


def posting_count(tenant: str, wdn: str, site: str) -> int | None:
  url = f"https://{tenant}.{wdn}.myworkdayjobs.com/wday/cxs/{tenant}/{site}/jobs"
  ref = f"https://{tenant}.{wdn}.myworkdayjobs.com/en-US/{site}"
  body = post(url, '{"appliedFacets":{},"limit":1,"offset":0,"searchText":""}', ref)
  if not body.startswith("{"):
    return None
  try:
    total = json.loads(body).get("total")
  except Exception:
    return None
  return total if isinstance(total, int) and total > 0 else None


def resolve(name: str) -> tuple[str, str, str, int] | None:
  """Best live triple for one name, or None. Identity is checked separately."""
  for tenant in tenant_guesses(name):
    for wdn in datacenters(tenant):
      sites = site_guesses(tenant, name)
      with ThreadPoolExecutor(max_workers=8) as p:
        totals = list(p.map(lambda s: posting_count(tenant, wdn, s), sites))
      best = max(((s, t) for s, t in zip(sites, totals) if t),
                 key=lambda x: x[1], default=None)
      if best:
        return name, "workday", f"{tenant}/{wdn}/{best[0]}", best[1]
  return None


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("names")
  ap.add_argument("--profile", default="alan")
  ap.add_argument("--vertical", required=True)
  ap.add_argument("--note", default="")
  ap.add_argument("--stage", default="—")
  ap.add_argument("-o", "--out", default="")
  ap.add_argument("--append", action="store_true")
  ap.add_argument("--jobs", type=int, default=6,
                  help="companies resolved at once (each fans out internally)")
  args = ap.parse_args()

  names = [n.strip() for n in Path(args.names).read_text().splitlines()
           if n.strip() and not n.startswith("#")]
  print(f"── resolving {len(names)} name(s) against {len(WDNS)} Workday datacenters",
        file=sys.stderr)
  with ThreadPoolExecutor(max_workers=args.jobs) as p:
    hits = [h for h in p.map(resolve, names) if h]
  print(f"   {len(hits)} resolved to a live board; checking identity", file=sys.stderr)

  with ThreadPoolExecutor(max_workers=8) as p:
    checked = list(p.map(sc.validate, hits))

  kept = []
  for name, ats, slug, n, verdict, why in sorted(checked, key=lambda r: r[4]):
    if verdict.startswith("OK"):
      kept.append({"id": sc.norm(name)[:28], "name": name, "ats": ats,
                   "slug": slug, "vertical": args.vertical, "sub": name,
                   "stage": args.stage, "raised": "—", "lead": "—",
                   "badges": [], "notes": args.note})
      print(f"   ok   {name[:30]:30s} {slug:48s} {n:5d}  {why}", file=sys.stderr)
    else:
      print(f"   {verdict:20s} {name[:30]:30s} {slug:48s} {why}", file=sys.stderr)
  print(f"── kept {len(kept)} of {len(hits)}", file=sys.stderr)

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
