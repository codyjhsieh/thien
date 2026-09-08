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

The weak spot that remains is a *sandbox* tenant: pinpoint/zendesk declares
itself "Zendesk Inc" and serves four plausible-looking postings that the real
Zendesk never wrote. A demo board that claims a matching name is not
distinguishable from a small real employer by anything cheap, so slug-only
matches (Lever and Pinpoint publish no board name) are the least trustworthy
entries here. Spot-check those before a large append.

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

# Ignored when comparing a company name to a board's declared name: they carry
# no identifying information, so matching on them alone means nothing.
STOP = {"inc", "llc", "ltd", "corp", "corporation", "company", "co", "group",
        "global", "the", "of", "and", "services", "solutions", "technologies",
        "technology", "systems", "holdings", "international", "com", "io",
        "ai", "labs"}


def norm(x: str) -> str:
  x = unicodedata.normalize("NFKD", x).encode("ascii", "ignore").decode()
  return re.sub(r"[^a-z0-9]", "", x.lower())


def core(name: str) -> set[str]:
  return {w for w in re.sub(r"[^a-z0-9 ]", " ", name.lower()).split() if w not in STOP}


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

  d = declared_name(ats, slug)
  if d:
    ok = norm(d) == norm(name) or bool(core(name) & core(d))
    return name, ats, slug, n, ("OK-name" if ok else "REJECT-wrongco"), f"declared {d!r}"

  # No declared name to go on, so the slug has to carry the identity. An exact
  # match is strong at any length (ashby/miro is Miro); a prefix match needs
  # length, or a common word could claim somebody else's board.
  a, b = norm(name), norm(slug)
  if a == b and len(b) >= 3:
    return name, ats, slug, n, "OK-slug", f"slug == name ({b})"
  if (a.startswith(b) or b.startswith(a)) and len(b) >= 5:
    return name, ats, slug, n, "OK-slug", f"slug ~ name ({b})"
  return name, ats, slug, n, "REJECT-weakslug", f"slug {slug!r} does not track {name!r}"


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
