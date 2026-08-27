#!/usr/bin/env python3
"""
verify-board.py — assert a board's profile and generated data are coherent.

    python3 scripts/verify-board.py sean
    python3 scripts/verify-board.py --all

This is the gate at the end of the pipeline and the gate an agent has to pass
before committing. The pipeline's fetch stage is the only thing that touches
the network, so every failure here is a config or codegen bug, never a flake.

Checks:
  · every profile regex compiles, in Python AND in JavaScript
  · categoryFallback names a real category; every level key is declared
  · the data file parses, exposes its declared global, and holds no duplicate
    company ids or duplicate job urls within a company
  · totalRoles matches the actual job count
  · the data file declares nothing beyond the three constants the board reads
  · every job has a title, an https url and a level the profile declares
  · the generated js/<id>-profile.js is in step with profiles/<id>.json
"""

from __future__ import annotations
import argparse, json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FETCH_ONLY = {"companies", "filters", "levelOrder"}


def fail(msgs):
  for m in msgs:
    print(f"  ✗ {m}", file=sys.stderr)
  return len(msgs)


def js_regex_ok(patterns):
  """Compile each pattern in Node too — Python accepts constructs V8 rejects."""
  script = (
    "const pats = JSON.parse(process.argv[1]);"
    "const bad = [];"
    "for (const [k, p] of pats) { try { new RegExp(p, 'i'); } catch (e) { bad.push(k + ': ' + e.message); } }"
    "console.log(JSON.stringify(bad));"
  )
  r = subprocess.run(["node", "-e", script, json.dumps(patterns)],
                     capture_output=True, text=True)
  if r.returncode != 0:
    return [f"node failed to check regexes: {r.stderr.strip()}"]
  return json.loads(r.stdout or "[]")


def load_data(path: Path, global_name: str):
  """Evaluate the generated data file in Node and hand back its contents."""
  script = (
    "global.window = {};"
    f"require({json.dumps(str(path))});"
    f"const d = window[{json.dumps(global_name)}];"
    "if (!d) { console.error('global missing'); process.exit(2); }"
    "process.stdout.write(JSON.stringify(d));"
  )
  r = subprocess.run(["node", "-e", script], capture_output=True, text=True)
  if r.returncode != 0:
    raise SystemExit(f"  ✗ {path.name}: {r.stderr.strip() or 'failed to load'}")
  return json.loads(r.stdout)


def summarize(pid: str) -> str:
  """`<id> <companies> cos/<roles> roles` — for commit messages and CI logs."""
  prof = json.loads((ROOT / "profiles" / f"{pid}.json").read_text())
  dpath = ROOT / prof["dataFile"]
  if not dpath.exists():
    return f"{pid} (not generated)"
  data = load_data(dpath, prof.get("dataGlobal", "DATA"))
  cos = data.get("COMPANIES", [])
  return f"{pid} {len(cos)} cos/{sum(len(c.get('jobs', [])) for c in cos)} roles"


def verify(pid: str) -> int:
  errs = []
  ppath = ROOT / "profiles" / f"{pid}.json"
  if not ppath.exists():
    return fail([f"profiles/{pid}.json does not exist"])
  prof = json.loads(ppath.read_text())
  f = prof.get("filters", {})

  # ── regexes ────────────────────────────────────────────────────────────
  pats = []
  for key in ("geoInclude", "titleCityExclude", "titleInclude",
              "titleIncludeBroad", "titleExclude"):
    if f.get(key):
      pats.append((f"filters.{key}", f[key]))
  for i, r in enumerate(f.get("levelRules", [])):
    pats.append((f"filters.levelRules[{i}]", r["match"]))
  for c in prof.get("categories", []):
    if c.get("match"):
      pats.append((f"categories.{c['key']}", c["match"]))
  sc = prof.get("scoring", {})
  for i, (pat, _) in enumerate(sc.get("passProb", {}).get("titleRules", [])):
    pats.append((f"passProb.titleRules[{i}]", pat))
  for i, (pat, _) in enumerate(sc.get("replyProb", {}).get("stageTable", [])):
    pats.append((f"replyProb.stageTable[{i}]", pat))
  for i, (pat, _) in enumerate(sc.get("candidateMult", {}).get("stageBoost", [])):
    pats.append((f"candidateMult.stageBoost[{i}]", pat))

  for key, pat in pats:
    try:
      re.compile(pat, re.I)
    except re.error as e:
      errs.append(f"{key}: invalid Python regex — {e}")
  errs += js_regex_ok(pats)

  # ── category + level coherence ─────────────────────────────────────────
  cat_keys = {c["key"] for c in prof.get("categories", [])}
  if prof.get("categoryFallback") and prof["categoryFallback"] not in cat_keys:
    errs.append(f"categoryFallback '{prof['categoryFallback']}' is not a category key")
  level_keys = {l["key"] for l in prof.get("levels", []) if l["key"] != "all"}
  declared = {r["key"] for r in f.get("levelRules", [])} | {f.get("levelDefault", "mid")}
  for k in declared:
    if k not in level_keys:
      errs.append(f"level '{k}' is produced by the filters but has no tab in levels[]")

  # ── candidate files ────────────────────────────────────────────────────
  refs = prof.get("companies") or []
  if isinstance(refs, str):
    refs = [refs]
  ATS = {"ashby", "greenhouse", "lever", "workable", "teamtailor",
         "smartrecruiters", "workday", "recruitee", "personio", "bamboohr",
         "breezy", "pinpoint", "rippling"}
  vlabels = set((prof.get("verticals") or {}).get("labels", {}))
  seen_ids, seen_boards = set(), {}
  for ref in refs:
    cpath = ROOT / ref
    if not cpath.exists():
      errs.append(f"companies file missing: {ref}")
      continue
    for c in json.loads(cpath.read_text()):
      cid = c.get("id", "?")
      for key in ("id", "name", "ats", "slug", "vertical"):
        if not c.get(key):
          errs.append(f"{ref}: {cid} is missing '{key}'")
      if c.get("ats") and c["ats"] not in ATS:
        errs.append(f"{ref}: {cid} has unknown ats '{c['ats']}'")
      if vlabels and c.get("vertical") and c["vertical"] not in vlabels:
        errs.append(f"{ref}: {cid} vertical '{c['vertical']}' has no label in verticals.labels")
      # Two ids on one board = two cards for one company, every posting doubled.
      board = (c.get("ats"), c.get("slug"))
      if board in seen_boards and seen_boards[board] != cid:
        errs.append(f"{ref}: {cid} and {seen_boards[board]} both point at {board[0]}:{board[1]}")
      else:
        seen_boards[board] = cid
      seen_ids.add(c.get("id"))

  # ── generated profile script is in step ────────────────────────────────
  gen = ROOT / prof.get("profileScript", f"js/{pid}-profile.js")
  if not gen.exists():
    errs.append(f"{gen.name} not built — run node scripts/build-profile.js {pid}")
  else:
    want = {k: v for k, v in prof.items() if k not in FETCH_ONLY}
    m = re.search(r"window\.BOARD_PROFILE = (\{.*\});\s*$", gen.read_text(), re.S)
    if not m:
      errs.append(f"{gen.name}: no window.BOARD_PROFILE assignment")
    elif json.loads(m.group(1)) != want:
      errs.append(f"{gen.name} is stale — rerun node scripts/build-profile.js {pid}")

  # ── data file ──────────────────────────────────────────────────────────
  dpath = ROOT / prof["dataFile"]
  if not dpath.exists():
    errs.append(f"{prof['dataFile']} not generated yet")
    return fail(errs)
  data = load_data(dpath, prof.get("dataGlobal", "DATA"))
  companies = data.get("COMPANIES", [])
  ids, jobs_total = set(), 0
  for c in companies:
    if c["id"] in ids:
      errs.append(f"duplicate company id in data: {c['id']}")
    ids.add(c["id"])
    jobs = c.get("jobs", [])
    jobs_total += len(jobs)
    if not jobs:
      errs.append(f"{c['id']}: no jobs — an empty shell the board cannot render")
    if c.get("totalRoles") != len(jobs):
      errs.append(f"{c['id']}: totalRoles={c.get('totalRoles')} but {len(jobs)} jobs")
    urls = set()
    for j in jobs:
      if not j.get("title"):
        errs.append(f"{c['id']}: a job has no title")
      u = j.get("url", "")
      if not u.startswith("https://"):
        errs.append(f"{c['id']}: non-https url {u!r}")
      if u in urls:
        errs.append(f"{c['id']}: duplicate url {u}")
      urls.add(u)
      if j.get("level") and j["level"] not in level_keys:
        errs.append(f"{c['id']}: job level '{j['level']}' has no tab in levels[]")
  if not data.get("COMPANIES_VERIFIED_AT"):
    errs.append("COMPANIES_VERIFIED_AT is empty")
  # The data file is generated and must hold nothing else. js/data.js had
  # carried ~560 lines of unreferenced flashcard and quiz data since the board
  # was extracted from another app, shipped to every visitor.
  declared = set(re.findall(r"^const (\w+)", dpath.read_text(), re.M))
  extra = declared - {"COMPANIES", "COMPANY_DOMAINS", "COMPANIES_VERIFIED_AT"}
  if extra:
    errs.append(f"{prof['dataFile']} declares unused constants: {', '.join(sorted(extra))}")

  if errs:
    print(f"{pid}: {len(errs)} problem(s)", file=sys.stderr)
    return fail(errs)
  print(f"   ✓ {pid}: {len(companies)} companies, {jobs_total} roles, "
        f"verified {data['COMPANIES_VERIFIED_AT']}")
  return 0


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("profiles", nargs="*", help="profile ids to verify")
  ap.add_argument("--all", action="store_true", help="verify every profile")
  ap.add_argument("--summary", action="store_true",
                  help="print a one-line count per profile instead of verifying")
  args = ap.parse_args()
  ids = args.profiles
  if args.all or not ids:
    ids = sorted(p.stem for p in (ROOT / "profiles").glob("*.json")
                 if not p.name.endswith(".companies.json"))
  if args.summary:
    print("; ".join(summarize(i) for i in ids))
    return
  bad = sum(verify(i) for i in ids)
  sys.exit(1 if bad else 0)


if __name__ == "__main__":
  main()
