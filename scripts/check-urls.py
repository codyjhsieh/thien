#!/usr/bin/env python3
"""
check-urls.py — fetch every posting URL on a board and report the dead ones.

    python3 scripts/check-urls.py --all
    python3 scripts/check-urls.py cody --prune

check-dead.js asks a different question: is this job id still on its company's
ATS board? That catches a closed req but not a *wrong link* — a posting the
fetcher found in JSON but whose public URL we assembled incorrectly. Those
render as a normal card and 404 when somebody clicks it, which is the worst
failure this board has: it costs a person a click and their trust.

A URL is DEAD only on an unambiguous 404/410 — reproduced on a second request,
because ATS front ends occasionally 404 a live posting under load. Timeouts,
403s (bot walls) and 5xx are reported as UNKNOWN and never pruned: we cannot
tell a blocked request from a missing page, and pruning on a bot wall would
empty the board.
"""

from __future__ import annotations
import argparse, json, re, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (compatible; job-board-linkcheck/1.0)"

# Several ATSs answer 200 with a "no longer accepting applications" shell
# instead of a 404. A 200 that says the posting is gone is a 404 with better
# manners, so it is treated as one. Kept narrow on purpose: a page that merely
# contains the words "no longer" in the job text must not match.
GONE = re.compile(
  r"(?:this\s+)?(?:job|position|posting|role|opening|requisition)\s+"
  r"(?:is\s+|has\s+)?(?:no longer (?:available|open|accepting|active)|"
  r"not found|been (?:closed|filled|removed))"
  r"|no longer accepting applications"
  r"|(?:job|position|posting) (?:you (?:are|were) looking for )?"
  r"(?:does not|doesn't) exist", re.I)


def load_data(path: Path, global_name: str):
  script = ("global.window = {};"
            f"require({json.dumps(str(path))});"
            f"process.stdout.write(JSON.stringify(window[{json.dumps(global_name)}]));")
  r = subprocess.run(["node", "-e", script], capture_output=True, text=True)
  if r.returncode != 0:
    raise SystemExit(f"could not load {path}: {r.stderr.strip()}")
  return json.loads(r.stdout)


def status(url: str, timeout: float = 20.0) -> tuple[int | None, str]:
  """(http status, note). None status = we could not reach a verdict."""
  req = Request(url, headers={"User-Agent": UA,
                              "Accept": "text/html,application/json;q=0.9"})
  try:
    with urlopen(req, timeout=timeout) as r:
      body = r.read(60000).decode("utf-8", "replace")
      # Several ATSs answer 200 with a "no longer accepting applications" or
      # "job not found" shell. A 200 that says the posting is gone is a 404
      # with better manners.
      if GONE.search(body):
        return 404, "200 body says the posting is gone"
      return r.status, ""
  except HTTPError as e:
    return e.code, ""
  except (URLError, TimeoutError, OSError) as e:
    return None, str(e)[:80]


def check(url: str) -> tuple[str, int | None, str]:
  code, note = status(url)
  if code in (404, 410):        # confirm before believing it
    time.sleep(1.5)
    code2, note2 = status(url)
    if code2 not in (404, 410):
      return "live", code2, f"404 then {code2} — transient"
    return "dead", code, note or note2
  if code is None or code >= 500 or code in (403, 429):
    return "unknown", code, note
  return "live", code, note


def run(pid: str, prune: bool, jobs: int) -> int:
  prof = json.loads((ROOT / "profiles" / f"{pid}.json").read_text())
  dpath = ROOT / prof["dataFile"]
  data = load_data(dpath, prof.get("dataGlobal", "DATA"))
  targets = [(c["id"], j["url"], j.get("title", "")) 
             for c in data.get("COMPANIES", []) for j in c.get("jobs", [])]
  if not targets:
    print(f"   · {pid}: no postings to check")
    return 0

  with ThreadPoolExecutor(max_workers=jobs) as ex:
    results = list(ex.map(lambda t: check(t[1]), targets))

  dead, unknown = [], []
  for (cid, url, title), (verdict, code, note) in zip(targets, results):
    if verdict == "dead":
      dead.append((cid, url, title, code))
    elif verdict == "unknown":
      unknown.append((cid, url, title, code, note))

  print(f"   {'✗' if dead else '✓'} {pid}: {len(targets)} urls — "
        f"{len(targets) - len(dead) - len(unknown)} live, {len(dead)} dead, "
        f"{len(unknown)} unverifiable")
  for cid, url, title, code in dead:
    print(f"      DEAD {code} {cid} — {title}\n           {url}")
  for cid, url, title, code, note in unknown:
    print(f"      ?    {code or 'err'} {cid} — {title} ({note})")

  if dead and prune:
    gone = {u for _, u, _, _ in dead}
    src = dpath.read_text()
    kept = []
    for c in data["COMPANIES"]:
      c["jobs"] = [j for j in c["jobs"] if j["url"] not in gone]
      c["totalRoles"] = len(c["jobs"])
      if c["jobs"]:
        kept.append(c)
    emit = subprocess.run(
      ["node", "-e",
       "const {emitCompaniesBlock}=require('./scripts/lib-emit');"
       "process.stdout.write(emitCompaniesBlock(JSON.parse(process.argv[1])));",
       json.dumps(kept)], capture_output=True, text=True, cwd=ROOT)
    if emit.returncode != 0:
      raise SystemExit(f"emit failed: {emit.stderr.strip()}")
    a = src.index("[", src.index("const COMPANIES = ["))
    e = src.index("\n];", a)
    dpath.write_text(src[:a] + emit.stdout.strip() + src[e + 2:])
    print(f"      pruned {len(dead)} dead posting(s) from {prof['dataFile']}")
  return len(dead)


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("profiles", nargs="*")
  ap.add_argument("--all", action="store_true")
  ap.add_argument("--prune", action="store_true",
                  help="remove confirmed-dead postings from the data file")
  ap.add_argument("--jobs", type=int, default=12)
  args = ap.parse_args()
  ids = args.profiles
  if args.all or not ids:
    ids = sorted(p.stem for p in (ROOT / "profiles").glob("*.json")
                 if not p.name.endswith(".companies.json"))
  bad = sum(run(i, args.prune, args.jobs) for i in ids)
  sys.exit(1 if (bad and not args.prune) else 0)


if __name__ == "__main__":
  main()
