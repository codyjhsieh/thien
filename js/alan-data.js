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
      { title:"Senior Special Servicing Asset Manager", url:"https://arbor.com/jobs?gh_jid=7850005003", level:"senior", years:5, summary:"The Senior Special Servicing Asset Manager is responsible for managing the Special Servicing of a portfolio of Agency (Freddie Mac and/or Fannie Mae) loans, which are in default or…" }
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
  { id:"blackrock", name:"BlackRock", vertical:"fintech",
    sub:"World's largest asset manager (NYSE: BLK)",
    stage:"Public", raised:"$2.6B pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:2,
    notes:"NYC HQ. Aladdin platform \u2014 risk + portfolio mgmt. Heavy systems / data eng.",
    jobs:[
      { title:"GIP Capital Formation - Associate, Product Specialist - Infrastructure Credit", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/GIP-Capital-Formation---Associate--Product-Specialist---Infrastructure-Credit_R266573", level:"associate" },
      { title:"Director, Aladdin Product Management, Private Credit", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Director--Aladdin-Product-Management--Private-Credit_R264597", level:"senior" }
    ] },
  { id:"blackstone", name:"Blackstone", vertical:"assetmgr",
    sub:"BREP / BREIT / BREDS",
    stage:"Public", raised:"\u2014", lead:"\u2014",
    badges:["NYSE"],
    totalRoles:1,
    notes:"The largest owner of commercial real estate in the world; the real-estate groups hire associates in New York.",
    jobs:[
      { title:"Blackstone Private Wealth - Product Specialist (Credit), Vice President", url:"https://blackstone.wd1.myworkdayjobs.com/en-US/Blackstone_Careers/job/New-York/Blackstone-Private-Wealth---Product-Specialist--Credit---Vice-President_44112", level:"senior" }
    ] },
  { id:"carlylegroup", name:"Carlyle Group", vertical:"assetmgr",
    sub:"Carlyle Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Institutional investor or bank with a real-estate investment arm \u2014 acquisitions, portfolio and capital-markets work.",
    jobs:[
      { title:"Product Manager, Global Credit Trading & Operations", url:"https://carlyle.wd1.myworkdayjobs.com/en-US/Carlyle/job/New-York-NY/Product-Manager--Global-Credit-Portfolio-Management_R-00307", level:"associate" }
    ] },
  { id:"compstak", name:"CompStak", vertical:"proptech",
    sub:"CompStak",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Senior Product Manager", url:"https://jobs.lever.co/compstak/1ddc2801-2011-42b1-b027-6f786065b828", level:"senior", pay:{"min":140000,"max":185000,"interval":"year"}, paySource:"posted", summary:"CompStak envisions a commercial real estate industry in which accurate and transparent data leads to better, faster deals for everyone." }
    ] },
  { id:"dealpath", name:"Dealpath", vertical:"proptech",
    sub:"Dealpath",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Implementation Manager", url:"https://www.dealpath.com/job-post/?gh_jid=7844544", level:"associate", summary:"Dealpath is looking for a self-motivated Implementation Manager to join our growing team! As an Implementation Manager you will play a critical role in collecting and analyzing new customer…" },
      { title:"Senior Product Manager, Strategic Accounts", url:"https://www.dealpath.com/job-post/?gh_jid=8160857", level:"senior", years:6, summary:"Senior Product Manager, Strategic Accounts San Francisco, CA or New York, NY Product management at Dealpath looks different than it did even a year ago." }
    ] },
  { id:"eliseai", name:"EliseAI", vertical:"proptech",
    sub:"EliseAI",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Rental, payments or e-commerce-funnel platform \u2014 application, deposit and order records.",
    jobs:[
      { title:"Senior Product Manager | Housing", url:"https://jobs.ashbyhq.com/eliseai/6d805fdd-a66d-49c8-a061-c41e066d76e6", level:"senior", years:4, summary:"Housing is one of the most operationally complex industries in the world. Every day, property teams manage high volumes of resident communication, leasing operations, maintenance, payments…" }
    ] },
  { id:"mercury", name:"Mercury", vertical:"fintech",
    sub:"Banking for startups",
    stage:"Series C", raised:"$152M", lead:"CRV",
    badges:["CRV","a16z","Coatue"],
    totalRoles:1,
    notes:"Banking UX + ops. Compliance, money movement.",
    jobs:[
      { title:"Senior Product Manager - Business Lending", url:"https://job-boards.greenhouse.io/mercury/jobs/6098827004", level:"senior", pay:{"min":200700,"max":250900,"interval":"year"}, paySource:"posted", years:7, summary:"Own the vision, strategy, and roadmap for Mercury's business lending product suite Drive the end-to-end customer journey \u2014 eligibility and discovery, application, underwriting and…" }
    ] },
  { id:"oaknorth", name:"OakNorth", vertical:"fintech",
    sub:"OakNorth",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Fintech, banking or wealth platform \u2014 application review and account servicing.",
    jobs:[
      { title:"Associate, Debt Finance Support  (Real Estate)", url:"https://jobs.ashbyhq.com/oaknorth/f1d8efcf-9755-4f23-9311-cfcb4e68b874", level:"associate", pay:{"min":100000,"max":150000,"interval":"year"}, paySource:"posted", summary:"As an Associate, you’ll work closely with senior leaders in the Debt Finance team, playing a crucial role in dealing with closing points such as liaising with internal and external…" }
    ] },
  { id:"plaid", name:"Plaid", vertical:"fintech",
    sub:"Banking API + financial data",
    stage:"Series D", raised:"$734M", lead:"Altimeter",
    badges:["Altimeter","a16z","Index"],
    totalRoles:1,
    notes:"Bank-data connectivity infra. Integration breadth, reliability.",
    jobs:[
      { title:"Staff Product Manager, Credit", url:"https://jobs.ashbyhq.com/plaid/59875bcd-9dbc-41f1-9cb2-905940d205d6", level:"associate", pay:{"min":207600,"max":306600,"interval":"year"}, paySource:"posted", years:5, summary:"Own and accelerate the growth and health of our CRA network - Drive credit initiatives across the broader Plaid network - Own consumer consent UX experience including conversion and…" }
    ] },
  { id:"roofstock", name:"Roofstock", vertical:"proptech",
    sub:"Roofstock",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate operations \u2014 title, escrow and listing data processing.",
    jobs:[
      { title:"Senior Product Manager, Leasing", url:"https://job-boards.greenhouse.io/roofstock/jobs/8761411002", level:"senior", summary:"The Senior Product Manager, Leasing is the dedicated product leader for Leasing on the Leasing & Resident Experience team." }
    ] },
  { id:"rxr", name:"RXR", vertical:"repe",
    sub:"RXR",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate investment manager, NYC owner-developer or real-estate credit shop \u2014 acquisitions, asset management and development.",
    jobs:[
      { title:"Vice President, Assistant Portfolio Manager", url:"https://job-boards.greenhouse.io/rxr/jobs/5405777008", level:"senior", pay:{"min":190000,"max":200000,"interval":"year"}, paySource:"posted", years:7, summary:"The Vice President, Assistant Portfolio Manager plays a critical leadership role across RXR’s existing and new real estate private equity and debt funds." }
    ] },
  { id:"serhant", name:"Serhant", vertical:"brokerage",
    sub:"Serhant",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Senior Product Manager, AI Creative Products", url:"https://job-boards.greenhouse.io/serhant/jobs/4406990009", level:"senior", years:5, summary:"SERHANT. is seeking a Senior Product Manager to define and build a new generation of AI-powered creative products for SERHANT. ID Lab and SERHANT. Studios." }
    ] },
  { id:"situsamc", name:"Situs AMC", vertical:"lender",
    sub:"Situs AMC",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:5,
    notes:"Commercial real-estate credit, agency lending, CMBS or loan servicing \u2014 underwriting, originations and asset management.",
    jobs:[
      { title:"AVP, CRE Loan Administration", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/AVP--Loan-Administrator_JR01410", level:"associate" },
      { title:"AVP, Warehouse Asset Management", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/AVP--Warehouse-Asset-Management_JR03050", level:"associate" },
      { title:"CRE Loan Closer-JD Required", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/CRE-Loan-Closer-JD-Required_JR03217", level:"associate" },
      { title:"Senior Analyst, (CRE) Credit Distribution & Loan Syndication", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/Senior-Analyst_JR03195", level:"senior" },
      { title:"Vice President, CMBS Underwriter", url:"https://situsamc.wd1.myworkdayjobs.com/en-US/Situsamc/job/New-York-NY/Vice-President_JR03206", level:"senior" }
    ] },
  { id:"stepstonegroup", name:"StepStone Group", vertical:"fintech",
    sub:"StepStone Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Investment or private-markets firm \u2014 deal, cap-table and fund administration.",
    jobs:[
      { title:"Analyst, Asset Management - Real Estate", url:"https://www.stepstonegroup.com/current-opportunities/?gh_jid=8031349", level:"analyst", pay:{"min":95000,"max":110000,"interval":"year"}, paySource:"posted", summary:"The Asset Management Analyst will be based in San Francisco, Chicago or New York and will play a critical role in managing, monitoring, and reporting on StepStone’s real estate investments." }
    ] },
  { id:"trepp", name:"Trepp", vertical:"proptech",
    sub:"Trepp",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Product Management Analyst", url:"https://www.trepp.com/joining-trepp?gh_jid=8187266", level:"analyst", years:1, summary:"Trepp is a leading provider of innovative data and analytics solutions for CRE, CMBS, CLO, and Lending markets." },
      { title:"Associate Product Manager – Platform & Data", url:"https://www.trepp.com/joining-trepp?gh_jid=8186632", level:"associate", years:2, summary:"Shape products from idea to impact: Own initiatives across the full lifecycle, from discovery and requirements gathering through testing, release, and post-launch evaluation." }
    ] },
  { id:"trimont", name:"Trimont", vertical:"lender",
    sub:"Trimont",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Commercial real-estate credit, agency lending, CMBS or loan servicing \u2014 underwriting, originations and asset management.",
    jobs:[
      { title:"Associate Transaction & Processing", url:"https://trimont.pinpointhq.com/en/postings/79c5fda4-1643-428d-a668-aece25b0dfa4", level:"associate", summary:"Performs operational accounting activities related to account reconcilement and maintenance. Duties may include: providing operational accounting support to internal business groups and/or…" },
      { title:"Director-Credit and Asset Management", url:"https://trimont.pinpointhq.com/en/postings/3224ab77-e72d-4dcd-8db3-84c64e92ceb1", level:"senior", summary:"We are looking for a dedicated Customer Service Representative to join our team. You will be the first point of contact for customers, providing assistance with inquiries, complaints, and…" }
    ] },
  { id:"vts", name:"VTS", vertical:"proptech",
    sub:"VTS",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:3,
    notes:"Real-estate technology, brokerage or data provider \u2014 underwriting, transactions and market data.",
    jobs:[
      { title:"Associate Implementation Manager", url:"https://job-boards.greenhouse.io/vts/jobs/4723555005", level:"associate", summary:"Drive Efficiency with AI - Approach every task with an AI-first mindset. Look for opportunities to leverage AI & Automation Tools to automate data collection, streamline workflows, and…" },
      { title:"Senior Manager, Solutions Consultant - Activate", url:"https://job-boards.greenhouse.io/vts/jobs/4713181005", level:"senior", summary:"VTS is seeking a Senior Manager, Solutions Consultant - Activate to assist and translate new business opportunity into a successful deployment plan across VTS Activate - the platform that…" },
      { title:"Senior Technical Solutions Consultant", url:"https://job-boards.greenhouse.io/vts/jobs/4704260005", level:"senior", years:3, summary:"As a Senior Technical Solutions Consultant , you will be the principal technical liaison between our product, sales, and customer success teams." }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  mercury:'mercury.com', plaid:'plaid.com',
};

window.ALAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
