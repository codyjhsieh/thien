// alan — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh alan

/* ---------- COMPANIES ----------
 * NYC board for profile 'alan'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-09-26) and matched the
 * profile's title + location filters (profiles/alan.json).
 * URLs link directly to the posting (not aggregators).
 *
 * Regenerate with:
 *   python3 scripts/refresh-companies.py --profile alan
 * or run the whole pipeline:
 *   scripts/pipeline.sh alan
 *
 * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],
 *           totalRoles, notes, jobs[{ title, url, level, posted, added }] }
 *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).
 */
const COMPANIES_VERIFIED_AT = '2026-09-26';
const COMPANIES = [
  { id:"altusgroup", name:"Altus Group", vertical:"brokerage",
    sub:"Altus Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Listed REIT, owner-operator, brokerage or real-estate service firm \u2014 acquisitions, asset management and underwriting.",
    jobs:[
      { title:"Real Estate Valuation Consultant, Advisory", url:"https://altusgroup.wd3.myworkdayjobs.com/en-US/Altusgroup/job/835----New-York/Sr-Consultant--Advisory_R0013790", level:"associate" }
    ] },
  { id:"arborrealtytrust", name:"Arbor Realty Trust", vertical:"lender",
    sub:"Arbor Realty Trust",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate debt, mortgage REIT or capital-markets shop \u2014 originations, underwriting and credit.",
    jobs:[
      { title:"Senior Special Servicing Asset Manager", url:"https://arbor.com/jobs?gh_jid=7850005003", level:"senior", years:5, summary:"The Senior Special Servicing Asset Manager is responsible for managing the Special Servicing of a portfolio of Agency (Freddie Mac and/or Fannie Mae) loans, which are in default or\u2026" }
    ] },
  { id:"barings", name:"Barings", vertical:"assetmgr",
    sub:"Barings",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate investment manager, NYC owner-developer or real-estate credit shop \u2014 acquisitions, asset management and development.",
    jobs:[
      { title:"Analyst Program - Real Estate Debt", url:"https://barings.wd1.myworkdayjobs.com/en-US/Barings/job/New-York-NY-United-States/Analyst-Program---Real-Estate-Debt_JR_006669-1", level:"analyst" }
    ] },
  { id:"stepstonegroup", name:"StepStone Group", vertical:"fintech",
    sub:"StepStone Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Investment or private-markets firm \u2014 deal, cap-table and fund administration.",
    jobs:[
      { title:"Analyst, Asset Management - Real Estate", url:"https://www.stepstonegroup.com/current-opportunities/?gh_jid=8031349", level:"analyst", pay:{"min":95000.0,"max":110000.0,"interval":"year"}, paySource:"posted", summary:"The Asset Management Analyst will be based in San Francisco, Chicago or New York and will play a critical role in managing, monitoring, and reporting on StepStone\u2019s real estate investments." }
    ] },
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  
};

window.ALAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
