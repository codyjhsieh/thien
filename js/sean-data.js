// sean — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh sean

/* ---------- COMPANIES ----------
 * NYC board for profile 'sean'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-08-26) and matched the
 * profile's title + location filters (profiles/sean.json).
 * URLs link directly to the posting (not aggregators).
 *
 * Regenerate with:
 *   python3 scripts/refresh-companies.py --profile sean
 * or run the whole pipeline:
 *   scripts/pipeline.sh sean
 *
 * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],
 *           totalRoles, notes, jobs[{ title, url, level, posted, added }] }
 *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).
 */
const COMPANIES_VERIFIED_AT = '2026-08-27';
const COMPANIES = [

];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {

};

window.SEAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
