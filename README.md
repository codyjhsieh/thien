# thien

Standalone NYC-engineering job board. Extracted from the InterviewPrep tracker
(the sibling repo) into a minimal single-page app: **just the Companies +
Individual Roles view**, no gamification / lessons / flashcards / quizzes.

## What it is

- 234 companies, ~1160 live NYC engineering postings
- Ranked by a per-role fit score (percentile-normalized across the full pool)
- Role filters: vertical / level / role-family (AI/ML, Backend, Infra, FDE/SE, Frontend)
- Apply-tracking persisted to `localStorage` under `thien_applied`

## Running locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

No build step. Vanilla JS + one static CSS file.

## Refreshing the job data

The three scripts under `scripts/` re-probe every candidate's public ATS
board (Ashby / Greenhouse / Lever / Workable / Workday / Teamtailor /
SmartRecruiters) and update `js/data.js` in place.

**Full refresh + additive merge** (adds new jobs, doesn't remove existing):

```sh
python3 scripts/refresh-companies.py --emit-json /tmp/refresh.json
node scripts/merge-additive.js js/data.js /tmp/refresh.json
```

**Check for dead links + prune** (removes confirmed-dead postings):

```sh
node scripts/check-dead.js           # report only
node scripts/check-dead.js --prune   # also strip dead links from data.js
```

## Adding a candidate

Edit `CANDIDATES` and `DOMAINS` in `scripts/refresh-companies.py`, then run
the refresh pipeline above. New companies with matching NYC engineering
roles surface automatically.

## Fit scoring

`fit = coolness × P(reply) × P(bar-pass) × cryptoPenalty × frontendPenalty`

Then percentile-mapped across the full role pool onto 0.5-10.0 for display.
Tuning tables in `js/board.js`:

- `COOLNESS` — hand-scored 1-10 tier per company
- `FRONTIER` — set of frontier AI labs (harder reply, harder pass)
- `QUANT_GATED` — quant firms (structural mismatch for non-quant candidates)
- `CRYPTO_IDS` — crypto companies get a 0.4× penalty
- `FRONTEND_TITLE` — frontend-titled roles get a 0.5× penalty
