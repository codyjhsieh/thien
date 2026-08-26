#!/usr/bin/env bash
# pipeline.sh — end-to-end refresh for one board, no agent required.
#
#   scripts/pipeline.sh sean            # fetch -> merge -> prune -> build
#   scripts/pipeline.sh sean thien      # several profiles, in sequence
#   SHARDS=8 JOBS=16 scripts/pipeline.sh sean
#   SKIP_DEAD=1 scripts/pipeline.sh sean          # skip the dead-link pass
#
# Stages, in order:
#   1. fetch   — SHARDS parallel `refresh-companies.py --shard i/n` processes,
#                each with JOBS concurrent ATS probes
#   2. merge   — union the shard JSON, then additively merge into the data file
#                (existing postings are never dropped by this step)
#   3. prune   — remove postings the ATS no longer lists at all
#   4. build   — recompile profiles/<id>.json into js/<id>-profile.js
#   5. verify  — assert the data file parses and every invariant holds
#
# Stage 0 runs the offline filter cases first: a regex that is slightly too
# greedy or too tight both read as "the market is quiet" once the data lands,
# so it is worth two seconds to catch before a 680-company sweep.
#
# `.claude/skills/job-pipeline` runs the same stages but fans stage 1 across
# subagents instead of subshells; this script is the deterministic path used by
# CI and by anyone who just wants the boards refreshed.
set -euo pipefail

cd "$(dirname "$0")/.."

SHARDS="${SHARDS:-6}"
JOBS="${JOBS:-14}"
TMP="${TMP:-.tmp}"
PROFILES=("$@")

if [ ${#PROFILES[@]} -eq 0 ]; then
  echo "usage: scripts/pipeline.sh <profile-id>… (e.g. sean thien)" >&2
  exit 1
fi

mkdir -p "$TMP"

for id in "${PROFILES[@]}"; do
  if [ ! -f "profiles/$id.json" ]; then
    echo "!! no such profile: profiles/$id.json" >&2
    exit 1
  fi

  echo "══ $id ══════════════════════════════════════════════"
  echo "── 0/5 filter cases"
  python3 scripts/test-filters.py "$id"

  echo "── 1/5 fetch (${SHARDS} shards × ${JOBS} probes)"
  rm -f "$TMP/$id".[0-9]*.json
  pids=()
  for i in $(seq 1 "$SHARDS"); do
    python3 scripts/refresh-companies.py --profile "$id" \
      --shard "$i/$SHARDS" --jobs "$JOBS" \
      --emit-json "$TMP/$id.$i.json" > "$TMP/$id.$i.log" 2>&1 &
    pids+=($!)
  done
  # Fail loudly if any shard died — a silently-missing shard looks exactly like
  # "those companies stopped hiring", which would then get merged as truth.
  failed=0
  for p in "${pids[@]}"; do wait "$p" || failed=1; done
  if [ "$failed" -ne 0 ]; then
    echo "!! a fetch shard failed; logs in $TMP/$id.*.log" >&2
    exit 1
  fi
  # `|| true`: grep exits 1 on no matches, and under `pipefail` that would abort
  # the run — a board with nothing live today is a normal outcome, not an error.
  { grep -h '^\[ok\]' "$TMP/$id".[0-9]*.log || true; } | wc -l \
    | xargs printf '   %s companies with matches\n'

  echo "── 2/5 merge"
  python3 scripts/merge-shards.py "$TMP/$id".[0-9]*.json -o "$TMP/$id.json"
  data_file=$(python3 -c "import json;print(json.load(open('profiles/$id.json'))['dataFile'])")
  if [ -f "$data_file" ]; then
    node scripts/merge-additive.js --profile "$id" "$TMP/$id.json"
  else
    echo "   $data_file missing — bootstrapping it from this run's shards"
    python3 scripts/refresh-companies.py --profile "$id" --from-json "$TMP/$id.json"
  fi

  echo "── 3/5 prune dead links"
  if [ "${SKIP_DEAD:-0}" = "1" ]; then
    echo "   skipped (SKIP_DEAD=1)"
  else
    node scripts/check-dead.js --profile "$id" --prune
  fi

  echo "── 4/5 build profile script"
  node scripts/build-profile.js "$id"

  echo "── 5/5 verify"
  python3 scripts/verify-board.py "$id"
done

echo
echo "done — $(git status --porcelain -- js profiles | wc -l | tr -d ' ') file(s) changed"
