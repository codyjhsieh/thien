#!/usr/bin/env bash
# run-cody.sh — refresh Cody's board, and nothing else.
#
#   scripts/run-cody.sh              # fetch, screen, merge, verify
#   scripts/run-cody.sh --serve      # …then open it on http://localhost:8000
#
# This is scripts/pipeline.sh cody with the arguments filled in. Cody's board
# does not depend on the other two: it reads their candidate files as extra
# employers to probe, but nothing it writes touches their data.
set -euo pipefail
cd "$(dirname "$0")/.."

SHARDS="${SHARDS:-6}" JOBS="${JOBS:-12}" scripts/pipeline.sh cody

echo
python3 scripts/verify-board.py --summary | sed 's/^/   /'

if [ "${1:-}" = "--serve" ]; then
  echo
  echo "serving on http://localhost:8000/cody.html  (ctrl-c to stop)"
  python3 -m http.server 8000
fi
