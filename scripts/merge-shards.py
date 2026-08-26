#!/usr/bin/env python3
"""
merge-shards.py — recombine the JSON emitted by parallel `refresh-companies.py
--shard i/n` runs into a single payload.

    python3 scripts/merge-shards.py .tmp/sean.*.json -o .tmp/sean.json

Shards partition the candidate list by index, so a company appears in exactly
one shard and the union is a plain concatenation. We still de-dupe by company
id (and by job url within a company) so a re-run with overlapping shards, or a
shard list that mixes a full run with a partial one, stays safe.

Fails loudly if the shards disagree about which profile they came from — that
mistake is otherwise invisible until the merged board looks wrong.
"""

from __future__ import annotations
import argparse, glob, json, sys
from pathlib import Path


def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("shards", nargs="+", help="shard JSON paths (globs allowed)")
  ap.add_argument("-o", "--out", required=True, help="merged JSON path")
  args = ap.parse_args()

  paths = []
  for spec in args.shards:
    hits = sorted(glob.glob(spec))
    paths.extend(hits if hits else [spec])
  if not paths:
    sys.exit("no shard files matched")

  profile, verified, by_id = None, "", {}
  for p in paths:
    d = json.loads(Path(p).read_text())
    if profile is None:
      profile = d.get("profile")
    elif d.get("profile") != profile:
      sys.exit(f"shard profile mismatch: {profile!r} vs {d.get('profile')!r} in {p}")
    verified = max(verified, d.get("verified", ""))
    for row in d.get("rows", []):
      cur = by_id.get(row["id"])
      if not cur:
        by_id[row["id"]] = row
        continue
      seen = {j["url"] for j in cur["jobs"]}
      for j in row["jobs"]:
        if j["url"] not in seen:
          seen.add(j["url"])
          cur["jobs"].append(j)
      cur["totalRoles"] = len(cur["jobs"])

  rows = sorted(by_id.values(), key=lambda r: r["id"])
  out = {"profile": profile, "verified": verified, "shard": "merged", "rows": rows}
  Path(args.out).parent.mkdir(parents=True, exist_ok=True)
  Path(args.out).write_text(json.dumps(out, indent=2))
  print(f"merged {len(paths)} shard(s) -> {args.out}: "
        f"{len(rows)} companies, {sum(len(r['jobs']) for r in rows)} roles", file=sys.stderr)


if __name__ == "__main__":
  main()
