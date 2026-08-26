---
name: job-pipeline
description: Refresh the job boards in this repo end to end - probe every company's public ATS, filter to one profile's roles, merge, prune dead links, rebuild and verify. Use when asked to refresh, update, re-scrape or re-verify a board (Thien's analyst board or Sean's game-art board), when postings look stale, or when a profile's filters or scoring were edited and the board needs regenerating. Fans the fetch stage across parallel subagents.
---

# job-pipeline

Refreshes one or more boards from live ATS data and leaves the repo in a
committable state.

Every board here is the same machine pointed at a different profile:

```
profiles/<id>.json ──┬─→ refresh-companies.py ─→ shard JSON ─┐
  filters, candidates │   (fetch + filter)                    ├─→ merge ─→ prune ─→ js/<id>-data.js
  scoring, labels    └─→ build-profile.js ────→ js/<id>-profile.js ──────────────→ <page>.html
```

Profiles that exist today: `thien` (NYC analyst roles), `sean` (NYC game-art
roles). `ls profiles/*.json` is authoritative — never assume the list.

## Decide the shape first

Run `scripts/pipeline.sh <id>` and stop when **all** of these hold:

- one or two profiles
- nothing about the filters or the company pool is in question
- you just want current data

That path is deterministic, takes a couple of minutes, and needs no agents.

Fan out across subagents when any of these hold:

- three or more profiles, or a pool above ~1500 companies
- the run is exploratory — you are tuning filters and want to see per-shard
  diagnostics before anything touches a data file
- a previous run left shards half-finished and you are re-running only some
- discovery is part of the job (then read `job-scout` too, and run it first)

## Fan-out protocol

The fetch stage is the only slow stage and the only one that touches the
network. It is also the only stage that is safe to parallelize: shards
partition the candidate list by index, so two shards never probe the same
company and never write the same file.

Every other stage is a whole-dataset operation. **Run stages 2-5 yourself, in
the main thread, once.** Two agents merging into the same data file will
interleave writes and corrupt it.

1. **Plan the shards.** Count the pool:

   ```bash
   python3 -c "import json,sys; p=json.load(open('profiles/sean.json')); \
     refs=p['companies'] if isinstance(p['companies'],list) else [p['companies']]; \
     print(sum(len(json.load(open(r))) for r in refs))"
   ```

   Use 4 shards under 800 companies, 8 under 2000, 12 above that. More shards
   than that buys nothing — each shard already runs 14 concurrent probes, and
   Greenhouse and Ashby rate-limit past roughly 100 in flight.

2. **Spawn one subagent per shard, all in a single message** so they actually
   run concurrently. Give each agent exactly this task, substituting `i`, `n`
   and the profile id:

   > Run `python3 scripts/refresh-companies.py --profile <id> --shard <i>/<n>
   > --jobs 14 --emit-json .tmp/<id>.<i>.json` from the repo root. Do not edit
   > any file. Do not run any other command. Report the last three lines of
   > stderr and the number of companies that matched.

   The constraint matters: a shard agent that "helpfully" merges its own
   results into the data file will lose the other shards' work.

3. **Check every shard landed.** `.tmp/<id>.<i>.json` must exist for every `i`,
   and each must parse. A missing shard is not a small loss — it looks exactly
   like "those companies stopped hiring", and the merge will write that down as
   truth. Re-run any shard that failed before continuing.

4. **Merge, prune, build, verify — once, yourself:**

   ```bash
   python3 scripts/merge-shards.py '.tmp/<id>.[0-9]*.json' -o .tmp/<id>.json
   node scripts/merge-additive.js --profile <id> .tmp/<id>.json
   node scripts/check-dead.js --profile <id> --prune
   node scripts/build-profile.js <id>
   python3 scripts/verify-board.py <id>
   ```

   `merge-additive.js` only ever adds; `check-dead.js --prune` is the only step
   that removes a posting, and only after confirming the company's board
   fetched successfully and the posting is absent from it.

## Verify before you commit

`python3 scripts/verify-board.py --all` must exit 0. It checks that every
profile regex compiles in both Python and V8, that `categoryFallback` and every
job's level name a real tab, that the generated `js/<id>-profile.js` is in step
with its JSON, and that no company id or job url is duplicated.

Then load the page and look at it — the verifier cannot see a blank board:

```bash
python3 -m http.server 8000    # open sean.html / index.html
```

A board that renders zero roles after a refresh is a filter bug far more often
than an empty market. Before concluding the market is quiet, re-run one company
with `--only <id> -v` and read the titles the filter rejected.

## Reading a thin result

Sean's board is small by nature — NYC-located game-art postings on public ATS
number in the low tens at any moment. A drop from 17 roles to 12 is ordinary
churn. A drop to 0, or a jump past 100, is a bug: check `filters.titleInclude`
and `filters.titleExclude` in the profile, and remember that
`titleIncludeAdjacent` only applies at companies whose vertical is listed in
`filters.adjacentVerticals`.

## Commit

Stage `js/`, `profiles/` and the pages; never `.tmp/`. Say in the message how
many companies were probed and how many roles landed, per profile — that line
is what makes the next refresh's diff readable.
