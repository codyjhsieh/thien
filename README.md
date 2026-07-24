# thien

NYC analyst job board for Thien Nguyen. Filters live public ATS postings
across ~250 NYC companies down to the four role families that match his
data/ops/BI transition:

- **Strategic Analyst** — Corporate + business strategy, S&O
- **Operations Analyst** — BizOps, RevOps, supply chain, procurement, logistics
- **Data Analyst** — Analytics, reporting, marketing/product/growth analyst
- **Business Intelligence Analyst** — BI analyst + BI developer

Ranked by a per-role fit score tuned for his profile (SQL, Python pandas,
Excel, Power BI; ex-supply-chain / procurement; Six Sigma; early-career).
Sports and fitness companies are prestige-boosted since he's a sports fan.

Apply-tracking persists to `localStorage` under `thien_applied`.

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
