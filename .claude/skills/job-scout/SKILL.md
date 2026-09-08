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

Then hand the names to `scripts/scout.py`, which does the whole resolve-and-
verify loop in parallel:

```bash
# One sector at a time — the vertical and note apply to every name in the file.
python3 scripts/scout.py names.txt --profile cody \
    --vertical health --note "Health system — records and intake work." \
    -o /tmp/health.json
```

It expands each name into plausible slugs, probes all ten public backends,
keeps the board with the most postings, and then **proves the board belongs to
that company** before keeping it. That last step is the one that matters: about
40% of slugs that return postings belong to somebody else. `greenhouse/bethesda`
is a physical-therapy practice, `greenhouse/peak` is Peak Physical Therapy,
`ashby/phantom` is a crypto wallet. Every one of them looks like a healthy
board.

Rejections are printed with a reason, so read them — the script is deliberately
conservative and will refuse real companies that rebranded (`greenhouse/gradle`
declares "Develocity"). Adding those back by hand is fine; loosening the rule
to catch them is not.

Add `--append` to write straight into the profile's candidates file. It refuses
anything already reachable from that profile — Cody's board reads all three
pools, and two entries on one ATS board render as two cards for one company
with every posting doubled.

If a company's careers page is custom, open it and look at where the "Apply"
links point:
`job-boards.greenhouse.io/<slug>`, `jobs.ashbyhq.com/<slug>`,
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

`scout.py` is already parallel inside one file, so a sweep of a few hundred
names is one invocation. Past that, the win is *sector breadth*, not more
threads: split the names into one file per sector and run the files
concurrently, each with its own `--vertical`, `--note` and `-o`.

```bash
for f in health.txt logistics.txt legal.txt; do
  python3 scripts/scout.py "$f" --profile cody --vertical "${f%.txt}" \
      --note "…" -o "/tmp/${f%.txt}.json" &
done
wait
```

Expect roughly one live board per five names, and about 95% of those to survive
identity checking — so a 500-company target is a ~3,000-name list, not a
500-name one. Most employers publish no machine-readable board at all; that is
the real ceiling, not the script.

Do every `--append` yourself, one at a time, after reading the rejects. Two
processes appending to the same array will clobber each other.

## Before you finish

```bash
python3 scripts/verify-board.py <id>
```

catches a missing required field, an undeclared vertical and — importantly —
two entries pointing at the same `(ats, slug)`, which would otherwise render as
two cards for one company with every posting doubled.

Then hand the widened pool to `job-pipeline` to actually fetch it. Adding a
company changes nothing on the board until a refresh runs.
