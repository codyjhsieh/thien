// alan — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh alan

/* ---------- COMPANIES ----------
 * NYC board for profile 'alan'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-09-28) and matched the
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
const COMPANIES_VERIFIED_AT = '2026-10-09';
const COMPANIES = [
  { id:"altusgroup", name:"Altus Group", vertical:"brokerage",
    sub:"Altus Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Listed REIT, owner-operator, brokerage or real-estate service firm \u2014 acquisitions, asset management and underwriting.",
    jobs:[
      { title:"Real Estate Valuation Consultant, Advisory", url:"https://altusgroup.wd3.myworkdayjobs.com/en-US/Altusgroup/job/835----New-York/Sr-Consultant--Advisory_R0013790", level:"associate", added:"2026-09-28", summary:"Compensation Range: $65,000 - $95,000 Compensation Disclaimer: The salary range listed reflects the base pay for this role at Altus Group and is provided where required by local…" }
    ] },
  { id:"arborrealtytrust", name:"Arbor Realty Trust", vertical:"lender",
    sub:"Arbor Realty Trust",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate debt, mortgage REIT or capital-markets shop \u2014 originations, underwriting and credit.",
    jobs:[
      { title:"Senior Special Servicing Asset Manager", url:"https://arbor.com/jobs?gh_jid=7850005003", level:"senior", added:"2026-09-28", posted:"2026-09-22", years:5, summary:"The Senior Special Servicing Asset Manager is responsible for managing the Special Servicing of a portfolio of Agency (Freddie Mac and/or Fannie Mae) loans, which are in default or…" }
    ] },
  { id:"blackrock", name:"BlackRock", vertical:"fintech",
    sub:"World's largest asset manager (NYSE: BLK)",
    stage:"Public", raised:"$2.6B pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:1,
    notes:"NYC HQ. Aladdin platform \u2014 risk + portfolio mgmt. Heavy systems / data eng.",
    jobs:[
      { title:"Director, Aladdin Product Management, Private Credit", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Director--Aladdin-Product-Management--Private-Credit_R264597", level:"senior", added:"2026-09-28", years:15, summary:"We are seeking a strategic and execution-focused leader for our Aladdin Product Management Private Credit technology team." }
    ] },
  { id:"carlylegroup", name:"Carlyle Group", vertical:"assetmgr",
    sub:"Carlyle Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Institutional investor or bank with a real-estate investment arm \u2014 acquisitions, portfolio and capital-markets work.",
    jobs:[
      { title:"Product Manager, Global Credit Trading & Operations", url:"https://carlyle.wd1.myworkdayjobs.com/en-US/Carlyle/job/New-York-NY/Product-Manager--Global-Credit-Portfolio-Management_R-00307", level:"associate", added:"2026-09-28", years:6, summary:"Strategy & Vision – 25% · Partner with senior leaders in Private Credit, ABF, Real Assets, and Cross-Platform funds to translate business strategy into actionable domain initiatives." }
    ] },
  { id:"dealpath", name:"Dealpath", vertical:"proptech",
    sub:"Dealpath",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Implementation Manager", url:"https://www.dealpath.com/job-post/?gh_jid=7844544", level:"associate", added:"2026-09-28", posted:"2026-07-24", summary:"Dealpath is looking for a self-motivated Implementation Manager to join our growing team! As an Implementation Manager you will play a critical role in collecting and analyzing new customer…" },
      { title:"Senior Product Manager, Strategic Accounts", url:"https://www.dealpath.com/job-post/?gh_jid=8259758", level:"senior", added:"2026-10-07", posted:"2026-10-06", years:6, summary:"Senior Product Manager, Strategic Accounts San Francisco, CA or New York, NY Product management at Dealpath looks different than it did even a year ago." }
    ] },
  { id:"eliseai", name:"EliseAI", vertical:"proptech",
    sub:"EliseAI",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Rental, payments or e-commerce-funnel platform \u2014 application, deposit and order records.",
    jobs:[
      { title:"Senior Product Manager | Housing", url:"https://jobs.ashbyhq.com/eliseai/6d805fdd-a66d-49c8-a061-c41e066d76e6", level:"senior", added:"2026-09-28", posted:"2026-05-25", years:4, summary:"Housing is one of the most operationally complex industries in the world. Every day, property teams manage high volumes of resident communication, leasing operations, maintenance, payments…" },
      { title:"Associate Product Manager | Housing", url:"https://jobs.ashbyhq.com/eliseai/f0c8d0af-8021-4a04-b0f9-de1baff48ee4", level:"associate", added:"2026-09-29", posted:"2026-09-28", summary:"EliseAI is rapidly expanding into new product lines serving large, sophisticated customers. As an Associate Product Manager, you will partner closely with Product and Engineering to…" }
    ] },
  { id:"mercury", name:"Mercury", vertical:"fintech",
    sub:"Banking for startups",
    stage:"Series C", raised:"$152M", lead:"CRV",
    badges:["CRV","a16z","Coatue"],
    totalRoles:1,
    notes:"Banking UX + ops. Compliance, money movement.",
    jobs:[
      { title:"Senior Product Manager - Business Lending", url:"https://job-boards.greenhouse.io/mercury/jobs/6098827004", level:"senior", added:"2026-09-28", posted:"2026-08-21", pay:{"min":200700,"max":250900,"interval":"year"}, paySource:"posted", years:7, summary:"Own the vision, strategy, and roadmap for Mercury's business lending product suite Drive the end-to-end customer journey \u2014 eligibility and discovery, application, underwriting and…" }
    ] },
  { id:"oaknorth", name:"OakNorth", vertical:"fintech",
    sub:"OakNorth",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Fintech, banking or wealth platform \u2014 application review and account servicing.",
    jobs:[
      { title:"Associate, Debt Finance Support  (Real Estate)", url:"https://jobs.ashbyhq.com/oaknorth/f1d8efcf-9755-4f23-9311-cfcb4e68b874", level:"associate", added:"2026-09-28", posted:"2026-08-28", pay:{"min":100000,"max":150000,"interval":"year"}, paySource:"posted", summary:"As an Associate, you’ll work closely with senior leaders in the Debt Finance team, playing a crucial role in dealing with closing points such as liaising with internal and external…" }
    ] },
  { id:"plaid", name:"Plaid", vertical:"fintech",
    sub:"Banking API + financial data",
    stage:"Series D", raised:"$734M", lead:"Altimeter",
    badges:["Altimeter","a16z","Index"],
    totalRoles:1,
    notes:"Bank-data connectivity infra. Integration breadth, reliability.",
    jobs:[
      { title:"Staff Product Manager, Credit", url:"https://jobs.ashbyhq.com/plaid/59875bcd-9dbc-41f1-9cb2-905940d205d6", level:"associate", added:"2026-09-28", posted:"2026-09-04", pay:{"min":207600,"max":306600,"interval":"year"}, paySource:"posted", years:5, summary:"Own and accelerate the growth and health of our CRA network - Drive credit initiatives across the broader Plaid network - Own consumer consent UX experience including conversion and…" }
    ] },
  { id:"rxr", name:"RXR", vertical:"repe",
    sub:"RXR",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate investment manager, NYC owner-developer or real-estate credit shop \u2014 acquisitions, asset management and development.",
    jobs:[
      { title:"Vice President, Assistant Portfolio Manager", url:"https://job-boards.greenhouse.io/rxr/jobs/5405777008", level:"senior", added:"2026-09-28", posted:"2026-08-26", pay:{"min":190000,"max":200000,"interval":"year"}, paySource:"posted", years:7, summary:"The Vice President, Assistant Portfolio Manager plays a critical leadership role across RXR’s existing and new real estate private equity and debt funds." }
    ] },
  { id:"situsamc", name:"Situs AMC", vertical:"lender",
    sub:"Situs AMC",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:4,
    notes:"Commercial real-estate credit, agency lending, CMBS or loan servicing \u2014 underwriting, originations and asset management.",
    jobs:[
      { title:"AVP, CRE Loan Administration", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/AVP--Loan-Administrator_JR01410", level:"associate", added:"2026-09-28", years:2, summary:"SitusAMC is where the best and most passionate people come to transform our client’s businesses and their own careers." },
      { title:"AVP, Warehouse Asset Management", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/AVP--Warehouse-Asset-Management_JR03050", level:"associate", added:"2026-09-28", years:5, summary:"SitusAMC is where the best and most passionate people come to transform our client’s businesses and their own careers." },
      { title:"Senior Analyst, (CRE) Credit Distribution & Loan Syndication", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/Senior-Analyst_JR03195", level:"senior", added:"2026-09-28", years:2, summary:"The Commercial Real Estate (CRE) Credit Distribution & Loan Syndication team is seeking a Senior Analyst / Associate to support the origination, structuring, and distribution of CRE credit…" },
      { title:"Vice President, CMBS Underwriter", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/Vice-President_JR03206", level:"senior", added:"2026-09-28", years:7, summary:"We are looking for a Vice President to support a leading originator and their team in screening, sizing, structuring, underwriting and documentation of potential CMBS Conduit CRE loan…" }
    ] },
  { id:"stepstonegroup", name:"StepStone Group", vertical:"fintech",
    sub:"StepStone Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Investment or private-markets firm \u2014 deal, cap-table and fund administration.",
    jobs:[
      { title:"Analyst, Asset Management - Real Estate", url:"https://www.stepstonegroup.com/current-opportunities/?gh_jid=8031349", level:"analyst", added:"2026-09-28", posted:"2026-09-25", pay:{"min":95000,"max":110000,"interval":"year"}, paySource:"posted", summary:"The Asset Management Analyst will be based in San Francisco, Chicago or New York and will play a critical role in managing, monitoring, and reporting on StepStone’s real estate investments." }
    ] },
  { id:"trepp", name:"Trepp", vertical:"proptech",
    sub:"Trepp",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Product Management Analyst", url:"https://www.trepp.com/joining-trepp?gh_jid=8187266", level:"analyst", added:"2026-09-28", posted:"2026-09-18", years:1, summary:"Trepp is a leading provider of innovative data and analytics solutions for CRE, CMBS, CLO, and Lending markets." },
      { title:"Associate Product Manager – Platform & Data", url:"https://www.trepp.com/joining-trepp?gh_jid=8186632", level:"associate", added:"2026-09-28", posted:"2026-09-08", years:2, summary:"Shape products from idea to impact: Own initiatives across the full lifecycle, from discovery and requirements gathering through testing, release, and post-launch evaluation." }
    ] },
  { id:"trimont", name:"Trimont", vertical:"lender",
    sub:"Trimont",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Commercial real-estate credit, agency lending, CMBS or loan servicing \u2014 underwriting, originations and asset management.",
    jobs:[
      { title:"Associate Transaction & Processing", url:"https://trimont.pinpointhq.com/en/postings/79c5fda4-1643-428d-a668-aece25b0dfa4", level:"associate", added:"2026-09-28", summary:"Performs operational accounting activities related to account reconcilement and maintenance. Duties may include: providing operational accounting support to internal business groups and/or…" }
    ] },
  { id:"vts", name:"VTS", vertical:"proptech",
    sub:"VTS",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:3,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Associate Implementation Manager", url:"https://job-boards.greenhouse.io/vts/jobs/4723555005", level:"associate", added:"2026-09-28", posted:"2026-09-24", summary:"Drive Efficiency with AI - Approach every task with an AI-first mindset. Look for opportunities to leverage AI & Automation Tools to automate data collection, streamline workflows, and…" },
      { title:"Senior Manager, Solutions Consultant - Activate", url:"https://job-boards.greenhouse.io/vts/jobs/4713181005", level:"senior", added:"2026-09-28", posted:"2026-07-08", summary:"VTS is seeking a Senior Manager, Solutions Consultant - Activate to assist and translate new business opportunity into a successful deployment plan across VTS Activate - the platform that…" },
      { title:"Senior Technical Solutions Consultant", url:"https://job-boards.greenhouse.io/vts/jobs/4704260005", level:"senior", added:"2026-09-28", posted:"2026-08-27", years:3, summary:"As a Senior Technical Solutions Consultant , you will be the principal technical liaison between our product, sales, and customer success teams." }
    ] },
  { id:"wellingtonmanagement", name:"Wellington Management", vertical:"assetmgr",
    sub:"Wellington Management",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Alternative asset manager or private-credit fund \u2014 investment, portfolio and credit roles, real estate among them.",
    jobs:[
      { title:"Portfolio Manager, Commercial Real Estate Debt", url:"https://wellington.wd5.myworkdayjobs.com/en-US/External/job/New-York-NY-United-States/Portfolio-Manager--Commercial-Real-Estate-Debt_R94919-1", level:"associate", added:"2026-09-28", years:12, summary:"As part of the continued expansion of our Private Investing capabilities, we are seeking to recruit an experienced investor for our new Commercial Real Estate (CRE) Debt Team." }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  altusgroup:"altusgroup.com", arborrealtytrust:"arbor.com", blackrock:"blackrock.com",
  carlylegroup:"carlyle.com", compstak:"compstak.com", dealpath:"dealpath.com",
  eliseai:"eliseai.com", mercury:"mercury.com", oaknorth:"oaknorth.com",
  plaid:"plaid.com", rxr:"rxr.com", situsamc:"situsamc.com",
  stepstonegroup:"stepstonegroup.com", trepp:"trepp.com", trimont:"trimont.com",
  vts:"vts.com",
};

window.ALAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
