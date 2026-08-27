---
name: job-scout
description: Grow a board's candidate company pool - find employers that hire for a profile's roles, resolve each one's public ATS slug, verify it returns live postings, and append it to profiles/<id>.companies.json. Use when a board looks thin, when asked to add companies or studios to a board, when a role type is under-covered, or before a refresh that should widen coverage. Verifies every slug against the live API before writing.
---

# job-scout

Adds companies to a board's candidate pool. The pool is the ceiling on
everything downstream — the filters can only find roles at companies the
pipeline actually probes — so widening it is usually the highest-leverage fix
for a thin board.

Never guess a slug into the JSON. A wrong slug is silent: the board fetches an
empty list forever and nothing ever reports an error. Every entry you add must
have returned real postings from a real API call in this session.

## What a candidate looks like

`profiles/<id>.companies.json` is a flat array. One entry:

```json
{
  "id": "avalanchestudios",
  "name": "Avalanche Studios",
  "ats": "lever",
  "slug": "avalanchestudios",
  "vertical": "gaming",
  "sub": "Just Cause / Contraband — NYC studio",
  "stage": "Private",
  "raised": "—",
  "lead": "Nordisk Games",
  "badges": ["Nordisk Games"],
  "notes": "Open-world studio with a real New York office; art reqs land in NYC as well as Stockholm.",
  "domain": "avalanchestudios.com"
}
```

- `id` — stable, lowercase, hyphenated. It keys applied-state in the browser
  and dedupes across profiles, so **never rename an existing one**.
- `ats` + `slug` — one of `ashby`, `greenhouse`, `lever`, `workable`,
  `teamtailor`, `smartrecruiters`, `workday`, `recruitee`, `personio`,
  `bamboohr`, `breezy`, `pinpoint`, `rippling`. Workday's slug is the triple
  `tenant/wdN/site`; every other backend takes the bare subdomain. The full
  endpoint table is in the README.
- `vertical` — must already have a label in the profile's `verticals.labels`,
  or the card renders a raw key. Add the label and a `verticals.pills` class in
  the same edit if the vertical is new.
- `stage` — feeds reply-rate scoring via `scoring.replyProb.stageTable`; keep
  the wording that table matches (`Seed`, `Series A`…, `Public`, `Acquired`).
- `notes` — one honest sentence about the work there, not marketing copy. It
  shows on the card.

## Finding candidates

Start from what the board is short on. `js/<id>-data.js` shows which verticals
are already represented; the gaps are the brief. Work from the profile's own
language — Sean's board wants studios and shops whose *output is visual work*,
because `filters.titleIncludeBroad` only widens the net at the verticals listed
in `filters.broadVerticals`.

Then, per company, resolve the slug by trying the obvious forms against the
live API. Most slugs are the name lowercased with spaces removed, or
hyphenated, or with "studios"/"games" dropped or added.

```bash
# Try several (ats, slug) guesses at once and keep the ones that return jobs.
python3 - <<'PY'
import importlib.util, sys
spec = importlib.util.spec_from_file_location("rc", "scripts/refresh-companies.py")
rc = importlib.util.module_from_spec(spec); sys.argv = ["rc"]; spec.loader.exec_module(rc)
from concurrent.futures import ThreadPoolExecutor

ATS = ["greenhouse", "ashby", "lever", "workable", "teamtailor",
       "recruitee", "personio", "bamboohr", "breezy", "pinpoint"]
GUESSES = [(a, s) for a in ATS for s in ("arkadium", "arkadium-games")]
with ThreadPoolExecutor(max_workers=16) as p:
    for g, n in p.map(lambda g: (g, len(rc.fetch(*g))), GUESSES):
        print(f"{g[0]:16s} {g[1]:24s} {n} posting(s)")
PY
```

`0 posting(s)` means the slug is wrong or the board is empty — either way, do
not add it. A slug is confirmed only when the call returns postings.

If a company's careers page is custom, open it and look at where the "Apply"
links point: `job-boards.greenhouse.io/<slug>`, `jobs.ashbyhq.com/<slug>`,
`jobs.lever.co/<slug>`, `apply.workable.com/<slug>`, `<slug>.teamtailor.com`,
`jobs.smartrecruiters.com/<slug>`, `<tenant>.wdN.myworkdayjobs.com/…/<site>`,
`<slug>.recruitee.com`, `<slug>.jobs.personio.de`, `<slug>.bamboohr.com`,
`<slug>.breezy.hr`, `<slug>.pinpointhq.com`, `ats.rippling.com/<slug>`.
That link contains the slug, exactly. Companies on iCIMS, Taleo, Jobvite,
Paylocity or a bespoke board have no public JSON here — skip them rather than
inventing an entry.

## Check the yield before committing to the entry

A live board is not the same as a board with roles for this profile. Confirm
what the profile's own filters make of it:

```bash
python3 scripts/refresh-companies.py --profile sean --only arkadium -v
```

`-v` prints how many postings were on the board when none matched, which tells
you whether the company is a dead end or the filters are too tight. Adding a
company with zero matching roles today is still right if it genuinely hires for
these roles in this city — the pool is a standing watchlist, not a snapshot.

## Fan out for a large sweep

Resolving slugs for more than ~30 companies is worth splitting. Give each
subagent a disjoint slice of the name list and this instruction:

> For each company below, find its public ATS and slug by probing candidate
> (ats, slug) pairs with the snippet in `.claude/skills/job-scout/SKILL.md`.
> Report one line per company: `name | ats | slug | posting count`, or
> `name | NONE` if nothing resolved. Do not edit any file.

Collect their reports and do all the JSON writing yourself, in one edit. Two
agents appending to the same array will clobber each other.

## Before you finish

```bash
python3 scripts/verify-board.py <id>
```

catches a missing required field, an undeclared vertical and — importantly —
two entries pointing at the same `(ats, slug)`, which would otherwise render as
two cards for one company with every posting doubled.

Then hand the widened pool to `job-pipeline` to actually fetch it. Adding a
company changes nothing on the board until a refresh runs.
