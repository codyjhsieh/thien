#!/usr/bin/env python3
"""
scout.py — turn a list of company names into verified candidate-pool entries.

    python3 scripts/scout.py names.txt --profile cody --vertical health \
        --note "Health system — records and intake work." -o new.json
    python3 scripts/scout.py names.txt --profile cody ... --append

Three stages, all parallel:

  1. guess   — expand each name into plausible slugs (lowercased, hyphenated,
               with filler words like "inc"/"group" dropped)
  2. probe   — call every (ats, slug) pair for real; keep the ones that return
               postings, preferring the board with the most
  3. validate — prove the board belongs to the company we named

Stage 3 is the point of this script. About 40% of slugs that return postings
belong to somebody else entirely: greenhouse/bethesda is a physical-therapy
practice, greenhouse/peak is Peak Physical Therapy, ashby/phantom is a crypto
wallet. Those all look like healthy boards, and a pool full of them quietly
fills a board with the wrong company's jobs. So a hit is kept only when the
board declares a matching name (Greenhouse and Teamtailor publish one) or the
slug and the name reduce to the same string. Everything else is reported and
dropped — a rejected real company costs one line in a name file next time, a
kept wrong one costs the board's credibility.

The weak spot that remains is a company whose board is on an ATS that declares
no name, under a slug that matches exactly, and whose content belongs to
somebody else with the same name — personio/kettler is exactly "Kettler", and
serves German bicycle-mechanic roles for the sports brand, not the Virginia
multifamily developer. Nothing cheap separates those. Slug-only matches (Lever,
Ashby, Personio, BambooHR, Breezy and Pinpoint publish no board name) stay the
least trustworthy entries here, so read a sample of their postings before a
large append.

Nothing is written to profiles/ unless --append is passed.
"""

from __future__ import annotations
import argparse, importlib.util, json, re, sys, unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("rc", ROOT / "scripts" / "refresh-companies.py")
rc = importlib.util.module_from_spec(spec)
_argv, sys.argv = sys.argv, ["rc"]
spec.loader.exec_module(rc)
sys.argv = _argv

# Backends with a public, keyless, guessable-by-subdomain endpoint. Workday is
# absent on purpose: its slug is a tenant/site triple, not a name, so guessing
# it is hopeless and it has to be read off a careers page by hand.
ATS = ["greenhouse", "ashby", "lever", "workable", "teamtailor",
       "recruitee", "personio", "bamboohr", "breezy", "pinpoint"]

# Words that show up in legal names but rarely in slugs.
FILLER = ("inc", "llc", "ltd", "limited", "corp", "corporation", "company",
          "the", "of", "group", "holdings", "international", "worldwide")

# A tenant serving the ATS's own sample content proves nothing about ownership.
PLACEHOLDER = re.compile(r"^(test job|sample|example|employee\s*#|open position|"
                         r"position title|screening call|job title|your job|new job)", re.I)

# Demo tenants do not announce themselves — pinpoint/zendesk and
# pinpoint/greystone both declare a matching company name and serve four
# plausible-looking postings. What gives them away is that they serve the SAME
# four, and so do bamboohr/whalerockcapital and bamboohr/beachpointcapital: one
# sample dataset seeded into every sales sandbox on that ATS.
#
# Matched as whole sets, not as a pooled vocabulary. "Software Engineer" and
# "General Application" are ordinary titles, so a board is only a sandbox when
# everything on it sits inside ONE of these known sets — a real three-person
# board that happens to share two titles with a demo is not evidence of
# anything. Add a set whenever another shared corpus turns up.
DEMO_CORPORA = [
  # Pinpoint
  {"customer service rep", "head of dei - uk", "marketing manager",
   "marketing executive"},
  {"senior data engineer, embedded"},
  # BambooHR
  {"financial analyst", "general application", "it security engineer",
   "marketing manager", "software engineer"},
]
# A sandbox is small; a real employer sharing a title set with one by chance is
# likelier the bigger the board, so the check only applies below this.
DEMO_MAX_POSTINGS = 8


# Ignored when comparing a company name to a board's declared name: they carry
# no identifying information, so matching on them alone means nothing.
STOP = {"inc", "llc", "ltd", "limited", "lp", "plc", "corp", "corporation", "company",
        "companies", "co", "group", "global", "the", "of", "and", "services",
        "solutions", "technologies", "technology", "systems", "holdings",
        "holdco", "international", "com", "io", "ai", "labs",
        # Industry suffixes. A declared name is usually the legal entity doing
        # the hiring, and it swaps one of these for another: Regions Financial
        # hires as "Regions Bank", PNC Financial Services as "PNC Bank", Truist
        # Securities as "Truist Bank". Treating them as filler recovers those
        # without letting a different industry through — "Western Alliance
        # Bancorporation" still will not match "Western Colorado University",
        # because "university" is not on this list and "alliance" is not in it.
        "financial", "finance", "bank", "banking", "bancorp", "bancorporation",
        "bancshares", "securities", "capital", "management", "mgmt", "advisors",
        "advisers", "associates", "partners", "asset", "assets", "investment",
        "investments", "insurance", "assurance", "mortgage", "trust", "realty",
        "properties", "property", "estate", "real"}

# Acronyms are how a lot of finance identifies itself, and a three-letter core
# is too short to match by containment: "JLL" hires as "*US AMR-JLL", CIBC as
# "Canadian Imperial Bank of Commerce". Below this length the comparison changes
# shape rather than getting looser.
ACRONYM_MAX = 4


def norm(x: str) -> str:
  x = unicodedata.normalize("NFKD", x).encode("ascii", "ignore").decode()
  return re.sub(r"[^a-z0-9]", "", x.lower())


def core(name: str) -> str:
  """The distinctive part of a name, normalised: filler words dropped."""
  return "".join(w for w in re.sub(r"[^a-z0-9 ]", " ", name.lower()).split()
                 if w not in STOP)


def same_company(name: str, declared: str) -> bool:
  """Does the board's declared name describe the company we asked for?

  Containment either way on the distinctive core, with two escapes for the ways
  finance names itself. The word-overlap test this replaces accepted any single
  shared word, which is not identification: a Workday tenant guessed as
  "western" declares "Western Colorado University" and shares the word
  "Western" with Western Alliance Bancorporation.
  """
  # What this cannot do: separate two real companies whose names differ only by
  # an industry suffix. "Heartland Financial" (Iowa) and "Heartland Bank
  # Limited" (New Zealand) both reduce to "Heartland", as do Prudential
  # Financial and Prudential Assurance. Those pass, and the geography filter is
  # what stops them reaching a board — a pool entry that never yields a posting
  # is noise, where a wrong company on the board is a lie.
  a, b = core(name), core(declared)
  if not a or not b:
    return False
  # Short core: treat it as an acronym. It counts if it appears as its own token
  # in the declared name, or if the declared name's initials spell it.
  if len(a) <= ACRONYM_MAX or len(b) <= ACRONYM_MAX:
    short, long_raw = (a, declared) if len(a) <= len(b) else (b, name)
    tokens = re.sub(r"[^a-z0-9]+", " ", long_raw.lower()).split()
    if short in tokens:
      return True
    # Initials the way people actually abbreviate: every word counts except the
    # joining ones. CIBC is Canadian Imperial Bank of Commerce, so "bank" has to
    # contribute its B even though it is filler for containment.
    initials = "".join(t[0] for t in tokens if t not in {"of", "and", "the", "for"})
    return short == initials or norm(name) == norm(declared)
  return a in b or b in a


def variants(name: str, limit=7) -> list[str]:
  words = re.sub(r"[^a-z0-9 ]", " ", name.lower()).split()
  out = []
  def add(ws):
    if ws:
      out.append("".join(ws))
      out.append("-".join(ws))
  add(words)
  trimmed = [w for w in words if w not in FILLER]
  if trimmed != words:
    add(trimmed)
  return list(dict.fromkeys(out))[:limit]


def probe(name: str, jobs: int) -> tuple[str, str, str, int] | None:
  """Best (ats, slug) for one name — the board with the most postings."""
  pairs = [(a, s) for s in variants(name) for a in ATS]
  best = None
  with ThreadPoolExecutor(max_workers=jobs) as p:
    for (ats, slug), n in zip(pairs, p.map(lambda t: len(rc.fetch(*t) or []), pairs)):
      if n and (best is None or n > best[3]):
        best = (name, ats, slug, n)
  return best


def declared_name(ats: str, slug: str) -> str:
  """The name the board publishes for itself, where the ATS exposes one."""
  if ats == "greenhouse":
    d = rc.curl_json(f"https://boards-api.greenhouse.io/v1/boards/{slug}")
    return (d or {}).get("name") or ""
  if ats == "teamtailor":
    host = slug if "." in slug else f"{slug}.teamtailor.com"
    return (rc.curl_json(f"https://{host}/jobs.json") or {}).get("title") or ""
  if ats == "workday":
    # Workday publishes no board name, but every job detail carries
    # hiringOrganization — the legal entity doing the hiring. It costs one
    # extra request and it is the only thing standing between a guessed tenant
    # and somebody else's board, so it is worth the request.
    try:
      tenant, wdn, site = slug.split("/", 2)
    except ValueError:
      return ""
    base = f"https://{tenant}.{wdn}.myworkdayjobs.com/wday/cxs/{tenant}/{site}"
    listing = rc.curl_json(f"{base}/jobs", method="POST",
                           body=json.dumps({"appliedFacets": {}, "limit": 1,
                                            "offset": 0, "searchText": ""}),
                           referer=f"https://{tenant}.{wdn}.myworkdayjobs.com/en-US/{site}")
    posts = (listing or {}).get("jobPostings") or []
    if not posts:
      return ""
    d = rc.curl_json(f"{base}{posts[0].get('externalPath', '')}")
    return ((d or {}).get("hiringOrganization") or {}).get("name") or ""
  return ""


def validate(hit) -> tuple[str, str, str, int, str, str]:
  name, ats, slug, n = hit
  raw = rc.fetch(ats, slug)
  if not raw:
    return name, ats, slug, n, "EMPTY", "board went empty between probe and check"

  titles = [t["title"] for t in (rc.normalize(ats, j, slug) for j in raw[:200]) if t]
  if titles and all(PLACEHOLDER.match(t.strip()) for t in titles):
    return name, ats, slug, n, "REJECT-placeholder", " / ".join(titles[:3])
  # A two- or three-posting board listing the same title over and over is a
  # sandbox, not an employer — pinpoint/shopify serves "Senior Data Engineer,
  # Embedded" twice and nothing else. Kept deliberately tight: a real small
  # board does repeat a title across two cities, so this only fires when the
  # whole board is one title.
  if 1 < len(titles) <= 3 and len(set(titles)) == 1:
    return name, ats, slug, n, "REJECT-sandbox", f"{len(titles)}x {titles[0]!r} and nothing else"
  lowered = {t.strip().lower() for t in titles}
  if lowered and len(titles) <= DEMO_MAX_POSTINGS:
    for corpus in DEMO_CORPORA:
      if lowered <= corpus:
        return name, ats, slug, n, "REJECT-sandbox", \
               "whole board is shared demo content: " + " / ".join(sorted(lowered))

  d = declared_name(ats, slug)
  if d:
    ok = norm(d) == norm(name) or same_company(name, d)
    return name, ats, slug, n, ("OK-name" if ok else "REJECT-wrongco"), f"declared {d!r}"

  # No declared name to go on, so the slug has to carry the identity alone, and
  # it has to carry all of it: exact match after normalising. The prefix rule
  # this replaces is where every wrong-company error clustered — ashby/level
  # for "Level Group" is a game studio in Austin, pinpoint/continuum for
  # "Continuum Company" is a firm in Jersey. Dropping a word off the end of a
  # company name and calling the remainder a match is not identification.
  # Workday's slug is "tenant/wdN/site"; only the tenant carries identity, so
  # comparing the whole triple to a company name always fails. This path is the
  # fallback for when the hiringOrganization lookup came back empty.
  ident = slug.split("/", 1)[0] if ats == "workday" else slug
  a, b = norm(name), norm(ident)
  if a == b and len(b) >= 3:
    return name, ats, slug, n, "OK-slug", f"slug == name ({b})"
  return name, ats, slug, n, "REJECT-weakslug", \
         f"{ident!r} is not exactly {name!r} and this board declares no name"


def append_to_pool(entries, profile_id, pool_path: Path):
  """Write entries into the pool, refusing anything already reachable.

  A board's profile can read several candidate files (Cody's reads all three),
  and two entries on one ATS board render as two cards for one company with
  every posting doubled. verify-board.py rejects that; better to never write it.
  """
  prof = json.loads((ROOT / "profiles" / f"{profile_id}.json").read_text())
  refs = prof["companies"] if isinstance(prof["companies"], list) else [prof["companies"]]
  ids, boards, names = set(), set(), set()
  for ref in refs:
    for c in json.loads((ROOT / ref).read_text()):
      ids.add(c["id"]); boards.add((c["ats"], c["slug"])); names.add(norm(c["name"]))

  pool = json.loads(pool_path.read_text()) if pool_path.exists() else []
  added, skipped = [], {"dupe-board": 0, "dupe-name": 0}
  for e in entries:
    if (e["ats"], e["slug"]) in boards:
      skipped["dupe-board"] += 1; continue
    if norm(e["name"]) in names:
      skipped["dupe-name"] += 1; continue
    cid, k = e["id"], 2
    while cid in ids:
      cid = f"{e['id']}{k}"; k += 1
    e = dict(e, id=cid)
    ids.add(cid); boards.add((e["ats"], e["slug"])); names.add(norm(e["name"]))
    added.append(e)
  pool_path.write_text(json.dumps(pool + added, indent=1, ensure_ascii=False) + "\n")
  return added, skipped


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("names", help="file of company names, one per line (# comments ok)")
  ap.add_argument("--profile", default="cody", help="profile whose pool to dedupe against")
  ap.add_argument("--vertical", required=True, help="vertical key for every entry")
  ap.add_argument("--note", default="", help="the one-sentence note shown on each card")
  # Default to unknown, not "Private". stage is rendered on the card and feeds
  # replyProb.stageTable, and a bulk sweep has no idea whether Marriott is
  # venture-backed. An unmatched stage falls through to the table's base rate,
  # which is the right answer for "nobody looked this up".
  ap.add_argument("--stage", default="—",
                  help='funding stage if you actually know it (default: unknown)')
  ap.add_argument("-o", "--out", default="", help="write candidate JSON here")
  ap.add_argument("--append", action="store_true",
                  help="append to the profile's own candidates file")
  ap.add_argument("--jobs", type=int, default=16, help="concurrent probes")
  args = ap.parse_args()

  names = [n.strip() for n in Path(args.names).read_text().splitlines()
           if n.strip() and not n.startswith("#")]
  # scout-research.py proves some companies are on an ATS with no public board.
  # Re-probing 30 slug shapes for them every sweep is pure waste, and worse, a
  # miss looks identical to "we have not looked yet".
  known = ROOT / "data" / "unfetchable.json"
  if known.exists():
    skip = json.loads(known.read_text())
    before = len(names)
    names = [n for n in names if n not in skip]
    if before != len(names):
      print(f"── skipping {before - len(names)} name(s) already proven to be on "
            f"an ATS with no public board", file=sys.stderr)
  print(f"── probing {len(names)} name(s) across {len(ATS)} backends", file=sys.stderr)
  with ThreadPoolExecutor(max_workers=max(1, args.jobs // 4)) as p:
    hits = [h for h in p.map(lambda n: probe(n, 4), names) if h]
  print(f"   {len(hits)} name(s) resolved to a live board", file=sys.stderr)

  with ThreadPoolExecutor(max_workers=args.jobs) as p:
    checked = list(p.map(validate, hits))

  kept = []
  for name, ats, slug, n, verdict, why in sorted(checked, key=lambda r: r[4]):
    if verdict.startswith("OK"):
      kept.append({"id": norm(name)[:28], "name": name, "ats": ats, "slug": slug,
                   "vertical": args.vertical, "sub": name, "stage": args.stage,
                   "raised": "—", "lead": "—", "badges": [], "notes": args.note})
    else:
      print(f"   {verdict:20s} {name[:28]:28s} {ats}:{slug} — {why}", file=sys.stderr)
  print(f"── kept {len(kept)} of {len(hits)}", file=sys.stderr)

  if args.out:
    Path(args.out).write_text(json.dumps(kept, indent=1, ensure_ascii=False) + "\n")
    print(f"   wrote {args.out}", file=sys.stderr)
  if args.append:
    pool = ROOT / "profiles" / f"{args.profile}.companies.json"
    added, skipped = append_to_pool(kept, args.profile, pool)
    print(f"   appended {len(added)} to {pool.name}; skipped {skipped}", file=sys.stderr)
  if not args.out and not args.append:
    json.dump(kept, sys.stdout, indent=1, ensure_ascii=False)


if __name__ == "__main__":
  main()
