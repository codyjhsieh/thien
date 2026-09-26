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

Slugs are published, so **research them rather than guessing**: a company on a
hosted ATS links to its board from its own careers page. `scripts/scout-research.py`
follows that link. The guessing tools still exist for triaging a long list, and
what they cost is measured below.

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

### Research the slug; do not guess it

A slug is published. Every company on a hosted ATS links to it from its own
careers page, so the answer exists — it just is not the company's name. Look it
up:

```bash
# From names: derives the website, verifies it belongs to the company, then
# follows careers links (across hosts) until it finds the ATS.
python3 scripts/scout-research.py names.txt --profile alan --vertical repe \
    --note "…" -o /tmp/found.json --report /tmp/report.json

# From URLs you researched yourself — one per line, Name<TAB>url. Use this
# whenever you have web search: it is the difference between a 25% miss rate
# and none.
python3 scripts/scout-research.py sites.tsv --urls --profile alan --vertical repe
```

This returns one of three things per company, and two of them are answers:

- **found** — the exact slug, including the bespoke Workday triples that
  guessing cannot reach
- **unsupported-ats** — the company is on iCIMS, Taleo, ADP, Paycom or JazzHR,
  which publish no machine-readable board. There is no slug to find. This is
  recorded in `data/unfetchable.json` and `scout.py` skips those names
  from then on.
- **not-found / no-site** — still unknown, and left that way rather than turned
  into a wrong guess. `no-site` means the crawler could not identify the
  company's website; that is the case to re-run with `--urls`.

**Your job when the verdict is `no-site` or `not-found`:** search the web for
"<company> careers", open the page, and feed the URL back through `--urls`.
That is the one step the script cannot do for itself, and it is where an agent
is worth more than a crawler.

### The guessing tools, and why they are second choice

`scripts/scout.py` expands a name into plausible slugs and probes all ten
guessable backends. It is fast and it is right often enough to be useful for a
first pass over a large list:

```bash
python3 scripts/scout.py names.txt --profile cody \
    --vertical health --note "Health system — records and intake work." \
    -o /tmp/health.json
```

`scripts/scout-workday.py` does the same for Workday, whose slug is a
three-part tuple: it finds the tenant's datacenter from a public error message
and then tries the site-name shapes customers use.

Know what they cost. **A wrong guess is silent and a missed guess is silent**,
and the two look identical from outside. Auditing this repo's pools with the
research tool found 58 of 66 Workday entries returning zero postings —
Goldman Sachs, JPMorgan, Google, Meta, the NBA — guesses that had never
resolved and that nothing ever reported. Blackstone's dead slug sat in Thien's
pool while `Blackstone_Careers` served 172 postings.

So: research first for anything you care about getting right, guess only to
triage a long list, and re-check guessed entries with

```bash
python3 scripts/scout-research.py <names> --report /tmp/r.json
```

### Identity is checked either way

Both paths end at the same validator, because a live board is not proof it is
the right company's board. About 40% of slugs that return postings belong to
somebody else: `greenhouse/bethesda` is a physical-therapy practice,
`ashby/phantom` is a crypto wallet, a Workday tenant guessed as `western` is
Western Colorado University. It compares the name the board declares
(Greenhouse, Teamtailor and Workday all publish one) or, failing that, requires
the slug to match the company name exactly.

Read the rejections — the validator is deliberately conservative and will
refuse real companies that rebranded (`greenhouse/gradle` declares
"Develocity"). Adding those back by hand is fine; loosening the rule is not.

Add `--append` to write straight into the profile's candidates file. It refuses
anything already reachable from that profile — several boards read several
pools, and two entries on one ATS board render as two cards for one company
with every posting doubled.

If a careers page is custom and the tooling cannot see through it, open it and
look at where the "Apply" links point:
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
