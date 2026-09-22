// thien — job board data
// Generated from InterviewPrep tracker. Refresh via scripts/refresh-companies.py.
// Contains the COMPANIES + COMPANY_DOMAINS + COMPANIES_VERIFIED_AT constants
// only; other data structures (games, quizzes, flashcards, curriculum) are
// stripped since the job board doesn't use them.

/* ---------- COMPANIES ----------
 * NYC-hiring board: companies with $5M+ disclosed VC/accelerator funding
 * that have at least one ACTIVE engineering posting located in New York
 * (HQ doesn't have to be NYC — only the posting). Verified 2026-07-24
 * against each company's live Ashby / Greenhouse public ATS JSON.
 * URLs link directly to the posting (not aggregators).
 *
 * To refresh: run `python3 scripts/refresh-companies.py` from the repo
 * root. The script re-probes every candidate ATS, filters for live NYC
 * engineering postings, and rewrites this block in place.
 *
 * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],
 *           totalRoles, notes, jobs[{ title, url, level }] }
 *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).
 *  - jobs are sorted: founding > senior > mid.
 */
const COMPANIES_VERIFIED_AT = '2026-09-22';
const COMPANIES = [
  { id:"anthropic", name:"Anthropic", vertical:"ai",
    sub:"Claude \u2014 AI safety lab",
    stage:"Series F", raised:"$18B+", lead:"Amazon",
    badges:["Amazon","Google","Spark"],
    totalRoles:17,
    notes:"Heavy values screen; expect ethical-dilemma and downside-risk questions. Applied-AI eng roles are FDE-flavored.",
    jobs:[
      { title:"Safeguards Enforcement Analyst, Access Controls & Identity", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319626008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Account Takeover & Credential Abuse", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319624008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Age-Appropriate Design", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311234008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Bio Harms", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319696008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Chem & Explosives Harms", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319700008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Child Safety", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311237008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Cyber Harm", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311159008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Integrity & Authenticity", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311149008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Safety Evaluations", url:"https://job-boards.greenhouse.io/anthropic/jobs/5137183008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Business Systems Analyst", url:"https://job-boards.greenhouse.io/anthropic/jobs/5394958008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, User Well-being", url:"https://job-boards.greenhouse.io/anthropic/jobs/5374778008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Strategy & Operations, Applied AI - AMER", url:"https://job-boards.greenhouse.io/anthropic/jobs/5284500008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Conventional Weapons", url:"https://job-boards.greenhouse.io/anthropic/jobs/5410006008", level:"mid", added:"2026-09-02", posted:"2026-09-01" },
      { title:"Procurement Operations Business Partner, R&D Operations", url:"https://job-boards.greenhouse.io/anthropic/jobs/5357933008", level:"mid", added:"2026-09-05", posted:"2026-09-04" },
      { title:"Business Systems Analyst, New Product Introduction", url:"https://job-boards.greenhouse.io/anthropic/jobs/5416829008", level:"mid", added:"2026-09-19", posted:"2026-09-08", pay:{"min":270000,"max":315000,"interval":"year"}, paySource:"posted" },
      { title:"GTM Strategy & Operations - AMER Enterprise Tech", url:"https://job-boards.greenhouse.io/anthropic/jobs/5390956008", level:"mid", added:"2026-09-19", posted:"2026-09-10", pay:{"min":270000,"max":310000,"interval":"year"}, paySource:"posted", years:10 },
      { title:"Strategic Pursuits Lead, RevOps", url:"https://job-boards.greenhouse.io/anthropic/jobs/5390935008", level:"mid", added:"2026-09-19", posted:"2026-09-18", pay:{"min":300000,"max":400000,"interval":"year"}, paySource:"posted", years:15 }
    ] },
  { id:"rilla", name:"Rilla", vertical:"ai",
    sub:"AI for field-sales coaching",
    stage:"Series A", raised:"$24M", lead:"Sequoia",
    badges:["Sequoia"],
    totalRoles:1,
    notes:"Speech AI for outside sales. ASR, summarization, ranking.",
    jobs:[
      { title:"Business Operations", url:"https://jobs.ashbyhq.com/rilla/8ac44792-e79b-49cb-9c6e-18ddd6875fa8", level:"mid", added:"2026-08-26", posted:"2026-03-22" }
    ] },
  { id:"cursor", name:"Cursor", vertical:"ai",
    sub:"AI-first code editor",
    stage:"Series B", raised:"$170M", lead:"Andreessen Horowitz",
    badges:["a16z","Thrive","OpenAI"],
    totalRoles:2,
    notes:"AI code editor. Frontier model integration, latency, UX.",
    jobs:[
      { title:"Full Stack Analyst, GTM", url:"https://jobs.ashbyhq.com/cursor/7bc441a4-9bb6-45cb-a9e0-5ae1b9c7ac5b", level:"mid", added:"2026-08-26", posted:"2026-07-15" },
      { title:"Deal Desk Analyst - Americas", url:"https://jobs.ashbyhq.com/cursor/4a1f9223-627b-4582-a038-0d7005d7a31d", level:"mid", added:"2026-09-19", posted:"2026-09-14", years:5 }
    ] },
  { id:"baseten", name:"Baseten", vertical:"ai",
    sub:"ML model deployment",
    stage:"Series C", raised:"$135M", lead:"IVP",
    badges:["IVP","Spark","Greylock"],
    totalRoles:1,
    notes:"Model deployment infra. Inference engineering, autoscaling GPU.",
    jobs:[
      { title:"Revenue Strategy & Operations", url:"https://jobs.ashbyhq.com/baseten/6d32aa11-ac93-4f90-8f62-bdeb79214ee5", level:"mid", added:"2026-08-26", posted:"2026-06-23" }
    ] },
  { id:"stripe", name:"Stripe", vertical:"fintech",
    sub:"Payments + financial infra",
    stage:"Late stage", raised:"$8.7B", lead:"Sequoia",
    badges:["Sequoia","a16z","General Catalyst"],
    totalRoles:9,
    notes:"Payments at planet scale. Distributed systems, idempotency, money.",
    jobs:[
      { title:"Strategy and Operations Lead, Deal Pricing", url:"https://stripe.com/jobs/search?gh_jid=8044391", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Business Partner Analyst", url:"https://stripe.com/jobs/search?gh_jid=8079783", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"GTM Strategy & Operations Analyst", url:"https://stripe.com/jobs/search?gh_jid=8145119", level:"mid", added:"2026-08-26", posted:"2026-08-20" },
      { title:"Sales Strategy & Operations Business Partner", url:"https://stripe.com/jobs/search?gh_jid=8089882", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Treasury Finance AI and Quantitative Analytics, Americas", url:"https://stripe.com/jobs/search?gh_jid=8079132", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Product Strategy & Operations - Global Product", url:"https://stripe.com/jobs/search?gh_jid=8177640", level:"mid", added:"2026-09-04", posted:"2026-09-03" },
      { title:"Data Analyst, NYC", url:"https://stripe.com/jobs/search?gh_jid=8189909", level:"mid", added:"2026-09-19", posted:"2026-09-10", years:6 },
      { title:"Finance and Strategy Analyst", url:"https://stripe.com/jobs/search?gh_jid=7473983", level:"mid", added:"2026-09-19", posted:"2026-09-16", years:4 },
      { title:"GTM Strategy & Operations Analyst", url:"https://stripe.com/jobs/search?gh_jid=8201680", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:7 }
    ] },
  { id:"ramp", name:"Ramp", vertical:"fintech",
    sub:"Corporate cards + finance ops",
    stage:"Series E", raised:"$1.3B", lead:"Founders Fund",
    badges:["Founders Fund","Sequoia","Stripe"],
    totalRoles:2,
    notes:"Ledger, fraud, integrations at scale. High autonomy bar.",
    jobs:[
      { title:"GTM Business Systems Analyst – Post Sales", url:"https://jobs.ashbyhq.com/ramp/196e4e25-c452-430d-8b2f-36a40f88a2ae", level:"mid", added:"2026-09-05", posted:"2026-09-04" },
      { title:"HRIS Analyst", url:"https://jobs.ashbyhq.com/ramp/a11f7720-f3a8-4e86-9cc6-562bb11420b2", level:"mid", added:"2026-09-19", posted:"2026-09-17", pay:{"min":110000,"max":155000,"interval":"year"}, paySource:"posted", years:3 }
    ] },
  { id:"brex", name:"Brex", vertical:"fintech",
    sub:"Corporate cards + spend mgmt (acq. by Capital One Apr 2026)",
    stage:"Series D", raised:"$1.5B", lead:"DST",
    badges:["YC","DST","Greenoaks"],
    totalRoles:2,
    notes:"Cards, banking, expense. Now part of Capital One; still hiring under Brex brand. PCI, ledger, large eng org.",
    jobs:[
      { title:"Data Analyst II", url:"https://www.brex.com/careers/8463702002?gh_jid=8463702002", level:"mid", added:"2026-08-26", posted:"2026-06-10" },
      { title:"Systems Analyst II", url:"https://www.brex.com/careers/8641732002?gh_jid=8641732002", level:"mid", added:"2026-08-26", posted:"2026-08-17" }
    ] },
  { id:"plaid", name:"Plaid", vertical:"fintech",
    sub:"Banking API + financial data",
    stage:"Series D", raised:"$734M", lead:"Altimeter",
    badges:["Altimeter","a16z","Index"],
    totalRoles:1,
    notes:"Bank-data connectivity infra. Integration breadth, reliability.",
    jobs:[
      { title:"Business Operations", url:"https://jobs.ashbyhq.com/plaid/bf4450b7-6ed5-49ec-a2ad-a1e0ffbcbe50", level:"mid", added:"2026-08-26", posted:"2026-07-27" }
    ] },
  { id:"datadog", name:"Datadog", vertical:"devtools",
    sub:"Cloud monitoring (NASDAQ)",
    stage:"Public", raised:"$148M pre-IPO", lead:"Index",
    badges:["NASDAQ","Index","OpenView"],
    totalRoles:3,
    notes:"Public co. Time-series infra, alerting, observability depth.",
    jobs:[
      { title:"GTM Strategy and Operations Associate", url:"https://careers.datadoghq.com/detail/7843331/?gh_jid=7843331", level:"entry", added:"2026-08-28", posted:"2026-08-27" },
      { title:"Sales Revenue Analyst - NYC", url:"https://careers.datadoghq.com/detail/8132294/?gh_jid=8132294", level:"mid", added:"2026-09-19", posted:"2026-09-18", pay:{"min":79000,"max":105000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Legal Operations Analyst", url:"https://careers.datadoghq.com/detail/8202086/?gh_jid=8202086", level:"mid", added:"2026-09-22", posted:"2026-09-21", pay:{"min":70000,"max":93000,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"oscar", name:"Oscar Health", vertical:"health",
    sub:"Tech-driven health insurance (NYSE)",
    stage:"Public", raised:"$1.6B pre-IPO", lead:"Founders Fund",
    badges:["NYSE","Founders Fund","General Catalyst"],
    totalRoles:2,
    notes:"Public co. Insurance platform with member-facing tech.",
    jobs:[
      { title:"Associate, Strategic Finance (FP&A)", url:"https://job-boards.greenhouse.io/oscar/jobs/8129152", level:"entry", added:"2026-09-19", posted:"2026-09-14", pay:{"min":87188,"max":114434,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Workday Reporting & Analytics Lead, People Analytics", url:"https://job-boards.greenhouse.io/oscar/jobs/8056691", level:"mid", added:"2026-09-19", posted:"2026-09-14", pay:{"min":101844,"max":133670,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"figma", name:"Figma", vertical:"saas",
    sub:"Collaborative design",
    stage:"Pre-IPO", raised:"$333M", lead:"Index",
    badges:["Index","Sequoia","Greylock"],
    totalRoles:1,
    notes:"Multiplayer collaboration at scale. CRDT, real-time infra, design tooling depth.",
    jobs:[
      { title:"Business Operations", url:"https://boards.greenhouse.io/figma/jobs/6119180004?gh_jid=6119180004", level:"mid", added:"2026-08-26", posted:"2026-08-05" }
    ] },
  { id:"justworks", name:"Justworks", vertical:"saas",
    sub:"HR / payroll / benefits",
    stage:"Late stage", raised:"$143M", lead:"Bain Capital",
    badges:["Bain","Index"],
    totalRoles:1,
    notes:"PEO platform. Multi-tenant, integrations with payroll + carriers.",
    jobs:[
      { title:"Financial Analyst", url:"https://boards.greenhouse.io/justworks/jobs/7980174?gh_jid=7980174", level:"mid", added:"2026-08-26", posted:"2026-08-03" }
    ] },
  { id:"kalshi", name:"Kalshi", vertical:"fintech",
    sub:"Regulated event-contracts exchange",
    stage:"Series C", raised:"$185M", lead:"Sequoia",
    badges:["Sequoia","Charles Schwab"],
    totalRoles:2,
    notes:"CFTC-regulated prediction market. Markets infra, compliance.",
    jobs:[
      { title:"Surveillance Analyst", url:"https://jobs.ashbyhq.com/kalshi/72111d46-0815-47bf-bad2-152cf530b010", level:"mid", added:"2026-08-26", posted:"2026-06-30" },
      { title:"Tax, Strategy & Operations", url:"https://jobs.ashbyhq.com/kalshi/dc97326c-e0fa-473a-b405-b7033fbc2859", level:"mid", added:"2026-08-26", posted:"2026-08-14" }
    ] },
  { id:"polymarket", name:"Polymarket", vertical:"fintech",
    sub:"Crypto prediction markets",
    stage:"Series B", raised:"$70M", lead:"Founders Fund",
    badges:["Founders Fund","Peter Thiel"],
    totalRoles:2,
    notes:"Decentralized prediction markets. On-chain settlement + UX.",
    jobs:[
      { title:"Trade Surveillance Analyst", url:"https://jobs.ashbyhq.com/polymarket/82d6403d-a0a0-4032-a666-2bdf4e694687", level:"mid", added:"2026-08-26", posted:"2026-06-29" },
      { title:"Customer Marketing Analyst", url:"https://jobs.ashbyhq.com/polymarket/54122c9f-f0fb-4ef9-9226-f3bea247502a", level:"mid", added:"2026-08-26", posted:"2026-08-18" }
    ] },
  { id:"the-trade-desk", name:"The Trade Desk", vertical:"saas",
    sub:"DSP for digital advertising (NASDAQ)",
    stage:"Public", raised:"$26M pre-IPO", lead:"IA Ventures",
    badges:["NASDAQ","IA Ventures"],
    totalRoles:2,
    notes:"Public co. Real-time bidding + ad tech at scale.",
    jobs:[
      { title:"Financial Analyst, Product Finance", url:"https://job-boards.greenhouse.io/thetradedesk/jobs/5182494007", level:"mid", added:"2026-08-26", posted:"2026-07-23" },
      { title:"IT Services Analyst", url:"https://job-boards.greenhouse.io/thetradedesk/jobs/5205675007", level:"mid", added:"2026-08-26", posted:"2026-08-25" }
    ] },
  { id:"lyft", name:"Lyft", vertical:"consumer",
    sub:"Rideshare + mobility (NASDAQ)",
    stage:"Public", raised:"$5B pre-IPO", lead:"Andreessen Horowitz",
    badges:["NASDAQ","a16z","Founders Fund"],
    totalRoles:1,
    notes:"Public co. Mobility platform \u2014 matching, payments, mapping.",
    jobs:[
      { title:"Data Analyst, Go-To-Market Sales Insights", url:"https://app.careerpuck.com/job-board/lyft/job/8697679002?gh_jid=8697679002", level:"mid", added:"2026-08-26", posted:"2026-08-11" }
    ] },
  { id:"jane-street", name:"Jane Street", vertical:"fintech",
    sub:"Quant trading firm",
    stage:"Private", raised:"Self-funded", lead:"Private",
    badges:["Private"],
    totalRoles:9,
    notes:"Quant trading. Strong on functional programming (OCaml), CS fundamentals.",
    jobs:[
      { title:"Fundamental Research Analyst", url:"https://www.janestreet.com/join-jane-street/apply/8347286002?gh_jid=8347286002", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"Grains and Oilseeds Analyst", url:"https://www.janestreet.com/join-jane-street/apply/8180726002?gh_jid=8180726002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Indirect Procurement Specialist", url:"https://www.janestreet.com/join-jane-street/apply/8442082002?gh_jid=8442082002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"IT Logistics and Warehouse Specialist", url:"https://www.janestreet.com/join-jane-street/apply/8589762002?gh_jid=8589762002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Oil and Refined Products Analyst/Trader", url:"https://www.janestreet.com/join-jane-street/apply/8413554002?gh_jid=8413554002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Power Analyst/Trader", url:"https://www.janestreet.com/join-jane-street/apply/7950706002?gh_jid=7950706002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Procurement Specialist, IT Hardware", url:"https://www.janestreet.com/join-jane-street/apply/7419820002?gh_jid=7419820002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Procurement Specialist, IT Services", url:"https://www.janestreet.com/join-jane-street/apply/7419948002?gh_jid=7419948002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Procurement Specialist", url:"https://www.janestreet.com/join-jane-street/apply/8675914002?gh_jid=8675914002", level:"mid", added:"2026-09-03", posted:"2026-09-02" }
    ] },
  { id:"middesk", name:"Middesk", vertical:"fintech",
    sub:"KYB / business identity infra",
    stage:"Series B", raised:"$57M", lead:"Sequoia",
    badges:["Sequoia","Accel"],
    totalRoles:1,
    notes:"Business identity verification for fintech. Identity graph + compliance.",
    jobs:[
      { title:"Operations Analyst (Temporary)", url:"https://jobs.ashbyhq.com/middesk/63d737cf-47b8-44b6-80f0-1b6f57a7c9b3", level:"mid", added:"2026-08-26", posted:"2026-08-18" }
    ] },
  { id:"point72", name:"Point72", vertical:"fintech",
    sub:"Quant + multi-strat hedge fund",
    stage:"Private", raised:"Self-funded", lead:"Private",
    badges:["Private"],
    totalRoles:7,
    notes:"Steve Cohen's quant firm. Trading systems + ML + low-latency infra.",
    jobs:[
      { title:"Business Analyst, Equities Technology", url:"https://boards.greenhouse.io/point72/jobs/8409245002?gh_jid=8409245002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Credit Research Analyst, Global Macro", url:"https://boards.greenhouse.io/point72/jobs/7605647002?gh_jid=7605647002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Identity & Privileged Governance Analyst", url:"https://boards.greenhouse.io/point72/jobs/8488737002?gh_jid=8488737002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Point72 Fund Flow Analyst", url:"https://boards.greenhouse.io/point72/jobs/8003977002?gh_jid=8003977002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Quantitative Portfolio Analyst – 2026 Grad", url:"https://boards.greenhouse.io/point72/jobs/8169967002?gh_jid=8169967002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Sector Analyst, MI-Data", url:"https://boards.greenhouse.io/point72/jobs/7820104002?gh_jid=7820104002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Procurement Specialist", url:"https://boards.greenhouse.io/point72/jobs/8755415002?gh_jid=8755415002", level:"mid", added:"2026-09-01", posted:"2026-08-31" }
    ] },
  { id:"hang", name:"Hang", vertical:"hospitality",
    sub:"Autonomous marketing system for brands",
    stage:"Series A", raised:"$32M", lead:"Paradigm",
    badges:["Paradigm","a16z"],
    totalRoles:1,
    notes:"AI-driven marketing + CDP + loyalty stack for restaurants/retailers (Ulta, ASICS, Cinemark). Identity resolution, segmentation, gamified engagement.",
    jobs:[
      { title:"Business Operations & Strategy", url:"https://jobs.ashbyhq.com/hang/36a6254d-b093-4eee-8c91-c0193ab17c69", level:"mid", added:"2026-08-26", posted:"2025-01-23" }
    ] },
  { id:"metropolis", name:"Metropolis", vertical:"ai",
    sub:"AI computer-vision parking",
    stage:"Series C", raised:"$1.7B", lead:"Eldridge",
    badges:["Eldridge","RXR","3L"],
    totalRoles:1,
    notes:"Computer-vision parking platform (acquired SP Plus). Edge AI, payments, infrastructure.",
    jobs:[
      { title:"Revenue Economics Analyst", url:"https://job-boards.greenhouse.io/metropolis/jobs/7785694003", level:"mid", added:"2026-08-26", posted:"2026-07-08" }
    ] },
  { id:"partiful", name:"Partiful", vertical:"consumer",
    sub:"Modern event-invite app",
    stage:"Series A", raised:"$20M", lead:"Andreessen Horowitz",
    badges:["a16z","FirstMark"],
    totalRoles:1,
    notes:"Mobile event invites + RSVPs. Social graph, mobile UX, identity.",
    jobs:[
      { title:"Business Operations Associate", url:"https://jobs.ashbyhq.com/partiful/65c09a92-084e-4930-b171-05cc7ecb8a15", level:"entry", added:"2026-08-26", posted:"2026-06-14" }
    ] },
  { id:"harvey", name:"Harvey", vertical:"ai",
    sub:"Legal AI for major firms",
    stage:"Series F+", raised:"$806M+", lead:"Andreessen Horowitz",
    badges:["a16z","Kleiner","Coatue","Sequoia","GIC"],
    totalRoles:2,
    notes:"Legal AI for top law firms; $11B valuation (Mar 2026). FDE-style deploys, document workflows, reasoning eval.",
    jobs:[
      { title:"Analyst, Customer Trust", url:"https://jobs.ashbyhq.com/harvey/1cf585c3-27e2-4813-ade9-dc8c53c2d5b0", level:"mid", added:"2026-08-26", posted:"2026-07-22" },
      { title:"Support Operations Data Analyst", url:"https://jobs.ashbyhq.com/harvey/f8857e81-4062-4669-a7e3-7b73b114979b", level:"mid", added:"2026-08-26", posted:"2026-06-15" }
    ] },
  { id:"coreweave", name:"CoreWeave", vertical:"infra",
    sub:"Specialized GPU cloud (NASDAQ: CRWV)",
    stage:"Public", raised:"$1.5B IPO ($14B+ pre-IPO)", lead:"NASDAQ",
    badges:["NASDAQ","Coatue","NVIDIA","Blackstone"],
    totalRoles:1,
    notes:"GPU cloud powering AI labs; IPO\\'d Mar 2025. Bare-metal infra + scheduling.",
    jobs:[
      { title:"Data Center Operations Cost Analyst", url:"https://coreweave.com/careers/job?4702795006&board=coreweave&gh_jid=4702795006", level:"mid", added:"2026-08-26", posted:"2026-08-21" }
    ] },
  { id:"blackrock", name:"BlackRock", vertical:"fintech",
    sub:"World's largest asset manager (NYSE: BLK)",
    stage:"Public", raised:"$2.6B pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:3,
    notes:"NYC HQ. Aladdin platform \u2014 risk + portfolio mgmt. Heavy systems / data eng.",
    jobs:[
      { title:"Associate, Business Intelligence Developer/Business Analyst - PFS", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Business-Intelligence-Developer-Business-Analyst---PFS_R265901", level:"entry", added:"2026-08-26" },
      { title:"Analyst, Real Estate Portfolio Analytics & Reporting, PFS", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Analyst--Real-Estate-Portfolio-Analytics---Reporting--PFS_R265359", level:"mid", added:"2026-08-26" },
      { title:"Analytics Specialist, Associate, Portfolio Analytics Group (PAG)", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Analytics-Specialist--Associate--Portfolio-Analytics-Group--PAG-_R266280", level:"entry", added:"2026-08-27" }
    ] },
  { id:"etsy", name:"Etsy", vertical:"marketplace",
    sub:"Marketplace for handmade + vintage (NASDAQ: ETSY)",
    stage:"Public", raised:"$307M pre-IPO", lead:"NASDAQ",
    badges:["NASDAQ","S&P MidCap"],
    totalRoles:2,
    notes:"Brooklyn HQ. Recommendations, search, payments, ML \u2014 strong Python culture.",
    jobs:[
      { title:"Market Research Analyst III", url:"https://etsy.wd5.myworkdayjobs.com/en-US/Etsy_Careers/job/Brooklyn-New-York/Market-Research-Analyst-III_JR5819-1", level:"mid", added:"2026-08-28" },
      { title:"Market Research Analyst II", url:"https://etsy.wd5.myworkdayjobs.com/en-US/Etsy_Careers/job/Brooklyn-New-York/Market-Research-Analyst-II_JR5818", level:"mid", added:"2026-09-19" }
    ] },
  { id:"nbcuniversal", name:"Comcast (NBCUniversal)", vertical:"media",
    sub:"Media + telecom (NASDAQ: CMCSA)",
    stage:"Public", raised:"$1.1B pre-IPO", lead:"NASDAQ",
    badges:["NASDAQ","S&P 500"],
    totalRoles:2,
    notes:"NBCU + Peacock streaming. NYC: ad tech + media engineering.",
    jobs:[
      { title:"Activation Operations Analyst, FreeWheel", url:"https://comcast.wd5.myworkdayjobs.com/en-US/Comcast_Careers/job/NY---New-York-1407-Broadway-Floor-12/Activation-Operations-Analyst--FreeWheel_R440422", level:"mid", added:"2026-08-26" },
      { title:"Analyst, Revenue Finance (FP&A)", url:"https://comcast.wd5.myworkdayjobs.com/en-US/Comcast_Careers/job/NY---New-York-1407-Broadway-Floor-12/Analyst--Revenue-Finance--FP-A-_R441319", level:"mid", added:"2026-08-26" }
    ] },
  { id:"sonder", name:"Sonder", vertical:"hospitality",
    sub:"Tech-enabled hotels + short-stay (NASDAQ: SOND)",
    stage:"Public", raised:"$425M+ pre-IPO", lead:"Greenoaks",
    badges:["NASDAQ","Greenoaks","Founders Fund"],
    totalRoles:1,
    notes:"Tech-enabled hotel + short-stay operator. Inventory mgmt + booking + ops automation.",
    jobs:[
      { title:"Revenue Management Analyst", url:"https://sonder.wd1.myworkdayjobs.com/en-US/Join_Sonder/job/New-York/Revenue-Management-Analyst_JR103503", level:"mid", added:"2026-08-26" }
    ] },
  { id:"vestwell", name:"Vestwell", vertical:"fintech",
    sub:"Retirement / 401k infra",
    stage:"Series D", raised:"$227M", lead:"Wellington",
    badges:["Wellington","Fin Capital"],
    totalRoles:1,
    notes:"NYC HQ. White-label recordkeeping API.",
    jobs:[
      { title:"Associate, Go-to-Market Sales Strategy & Analytics", url:"https://job-boards.greenhouse.io/vestwell/jobs/7992906003", level:"entry", added:"2026-09-19", posted:"2026-09-11", years:2 }
    ] },
  { id:"sisense", name:"Sisense", vertical:"saas",
    sub:"Embedded analytics + BI",
    stage:"Series F", raised:"$200M+", lead:"Insight",
    badges:["Insight"],
    totalRoles:1,
    notes:"NYC HQ. Embedded analytics.",
    jobs:[
      { title:"Sales Enablement Analyst", url:"https://www.sisense.com/about/careers/7918419?gh_jid=7918419", level:"mid", added:"2026-08-26", posted:"2026-05-12" }
    ] },
  { id:"fanduel", name:"FanDuel", vertical:"consumer",
    sub:"Sports betting / gaming",
    stage:"Public", raised:"(Flutter subsidiary)", lead:"Flutter",
    badges:["Flutter","LSE"],
    totalRoles:2,
    notes:"NYC HQ. Leading US sportsbook, real-time betting infra.",
    jobs:[
      { title:"Campaign Analytics, Data Analyst", url:"https://www.fanduel.careers/open-positions?gh_jid=8055746", level:"mid", added:"2026-08-26", posted:"2026-08-12" },
      { title:"Commercial Analyst - Casino", url:"https://www.fanduel.careers/open-positions?gh_jid=8142362", level:"mid", added:"2026-08-26", posted:"2026-08-19" }
    ] },
  { id:"flexport", name:"Flexport", vertical:"saas",
    sub:"Freight + logistics tech",
    stage:"Series E", raised:"$2.3B+", lead:"Founders Fund",
    badges:["Founders Fund","SoftBank"],
    totalRoles:1,
    notes:"NYC office. Logistics + supply-chain ML.",
    jobs:[
      { title:"Analyst, Transportation & Supply Chain Strategy", url:"https://job-boards.greenhouse.io/flexport/jobs/8011615", level:"mid", added:"2026-08-26", posted:"2026-07-09" }
    ] },
  { id:"linkedin", name:"LinkedIn", vertical:"saas",
    sub:"Professional social / SaaS",
    stage:"Public", raised:"(Microsoft: MSFT)", lead:"Microsoft",
    badges:["Microsoft","NASDAQ"],
    totalRoles:2,
    notes:"Empire State Building NYC office. Sr enterprise systems eng roles.",
    jobs:[
      { title:"Marketing Science Strategic Analyst, Marketing Science and Technology", url:"https://jobs.smartrecruiters.com/LinkedIn3/744000143176479", level:"mid", added:"2026-08-26", posted:"2026-08-12" },
      { title:"Sales Strategy and Operations Associate", url:"https://jobs.smartrecruiters.com/LinkedIn3/744000149940196", level:"entry", added:"2026-09-19", posted:"2026-09-16", years:2 }
    ] },
  { id:"equinox", name:"Equinox Group", vertical:"consumer",
    sub:"Luxury fitness / hospitality",
    stage:"PE-backed", raised:"$1B+", lead:"L Catterton",
    badges:["L Catterton","Related Cos"],
    totalRoles:1,
    notes:"HQ Hudson Yards NYC. Sr Data Engineer + site-testing eng roles.",
    jobs:[
      { title:"Strategic Finance Analyst (Hybrid – OnSite / Remote)", url:"https://jobs.smartrecruiters.com/Equinox/744000143120749", level:"mid", added:"2026-08-26", posted:"2026-08-12" }
    ] },
  { id:"nyc-gov", name:"City of New York", vertical:"saas",
    sub:"Public sector (dept of tech)",
    stage:"Public sector", raised:"$110B budget", lead:"\u2014",
    badges:["Public sector"],
    totalRoles:74,
    notes:"NYC gov. Sr SWE GeoSupport, .NET, City Environmental Quality Review roles.",
    jobs:[
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014264196", level:"mid", added:"2026-08-26", posted:"2026-07-24" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013315337", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013314887", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Systems Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014217241", level:"mid", added:"2026-08-26", posted:"2026-07-22" },
      { title:"Data Content Analyst I", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014421941", level:"entry", added:"2026-08-26", posted:"2026-08-04" },
      { title:"Analyst -  Property and Aggregate Revenue", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283241", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - Administration & Process", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283416", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - DOHMH", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014532571", level:"mid", added:"2026-08-26", posted:"2026-08-11" },
      { title:"Analyst - Project Development and Management", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283406", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - Sandy Grant Management & Insurance", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014736471", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Analyst - Sustainability Policy", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014532596", level:"mid", added:"2026-08-26", posted:"2026-08-11" },
      { title:"Analyst - Technology Budget & Managementn", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283151", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Assistant Transportation Analyst – TEP", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863806", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Assistant Transportation Analyst – TEP", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863796", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Budget Research Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014614266", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014831126", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"College Aide - Procurement and Contracts (2 positions)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014399136", level:"mid", added:"2026-08-26", posted:"2026-08-01" },
      { title:"Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014506446", level:"mid", added:"2026-08-26", posted:"2026-08-08" },
      { title:"Data Content Analyst II", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014422006", level:"mid", added:"2026-08-26", posted:"2026-08-04" },
      { title:"EMPLOYMENT PROGRAM PAYMENT ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014380406", level:"mid", added:"2026-08-26", posted:"2026-07-31" },
      { title:"EPMO DATA  ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863086", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Forensic Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014555616", level:"mid", added:"2026-08-26", posted:"2026-08-12" },
      { title:"HEALTH AND SAFETY ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014282696", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Mainframe Programmer Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014282592", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Management Audit and Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014466966", level:"mid", added:"2026-08-26", posted:"2026-08-06" },
      { title:"NYCAPS Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014421996", level:"mid", added:"2026-08-26", posted:"2026-08-04" },
      { title:"PEOPLE DATA & STRATEGY ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014667491", level:"mid", added:"2026-08-26", posted:"2026-08-19" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014578316", level:"mid", added:"2026-08-26", posted:"2026-08-13" },
      { title:"Procurement Generalist", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014667646", level:"mid", added:"2026-08-26", posted:"2026-08-19" },
      { title:"Records Analyst-Trainer", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014358931", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Strategic Performance Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613821", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"SYSTEMS PROGRAMMER ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014358276", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"TESTER/ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014380461", level:"mid", added:"2026-08-26", posted:"2026-07-31" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014888956", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014888946", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Counter Terrorism Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014864116", level:"mid", added:"2026-08-27", posted:"2026-08-26" },
      { title:"Risk and Integrity Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014889332", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Operations Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014914568", level:"mid", added:"2026-08-28", posted:"2026-08-28" },
      { title:"Transit Planner, Bus Priority Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014914671", level:"mid", added:"2026-08-28", posted:"2026-08-28" },
      { title:"Contract Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937056", level:"mid", added:"2026-08-29", posted:"2026-08-29" },
      { title:"Transit Planner, Bus Priority Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937266", level:"mid", added:"2026-08-29", posted:"2026-08-29" },
      { title:"JR. ASSET MANAGEMENT ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937506", level:"entry", added:"2026-08-30", posted:"2026-08-29" },
      { title:"Analyst - Youth and Community Development (DYCD) / Aging (DFTA) / Veterans’ Services (DVS)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937676", level:"mid", added:"2026-08-30", posted:"2026-08-29" },
      { title:"BUDGET ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937501", level:"mid", added:"2026-08-30", posted:"2026-08-29" },
      { title:"Hiring Plan Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015041526", level:"mid", added:"2026-09-04", posted:"2026-09-03" },
      { title:"Administrative Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371136", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Analyst - Data and Systems", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371451", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Analyst - Department of Citywide Administrative Services (DCAS)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015258191", level:"mid", added:"2026-09-19", posted:"2026-09-15" },
      { title:"Analyst - FEMA Revenue Accountability and Reporting", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015224321", level:"mid", added:"2026-09-19", posted:"2026-09-12" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015429366", level:"mid", added:"2026-09-19", posted:"2026-09-19" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015168342", level:"mid", added:"2026-09-19", posted:"2026-09-10" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015133276", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Business Intelligence Developer", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015335572", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Capital Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371546", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Capital Analyst Division of Capital Planning", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371431", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Collections Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015335656", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Community Coordinator- Central Admin. Analyst - Office of OFA for the Division of Fiscal Affairs/Central Administration", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015296126", level:"mid", added:"2026-09-19", posted:"2026-09-16" },
      { title:"Community Coordinator- Temporary Housing Payment Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015133266", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Contract Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015199806", level:"mid", added:"2026-09-19", posted:"2026-09-11" },
      { title:"Data & Project Management Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015133036", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Data Analyst for the Division of Housing Opportunity", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015335846", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Data Analytics Specialist", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015335316", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Data Engagement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371126", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Data Quality Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015224376", level:"mid", added:"2026-09-19", posted:"2026-09-12" },
      { title:"HOME-ARP Adjustment Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015296036", level:"mid", added:"2026-09-19", posted:"2026-09-16" },
      { title:"Investigative Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015199906", level:"mid", added:"2026-09-19", posted:"2026-09-11", years:4 },
      { title:"LOGISTICS - COLLEGE AIDE", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015132841", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015168477", level:"mid", added:"2026-09-19", posted:"2026-09-10" },
      { title:"Supervising Major Case Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015133196", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015429691", level:"mid", added:"2026-09-20", posted:"2026-09-19" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015552076", level:"mid", added:"2026-09-22", posted:"2026-09-22" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015552196", level:"mid", added:"2026-09-22", posted:"2026-09-22" },
      { title:"Ideation Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015551886", level:"mid", added:"2026-09-22", posted:"2026-09-22" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015552406", level:"mid", added:"2026-09-22", posted:"2026-09-22" }
    ] },
  { id:"palantir", name:"Palantir", vertical:"saas",
    sub:"Elite FDE consultancy (NYSE: PLTR)",
    stage:"Public", raised:"(NYSE: PLTR)", lead:"NYSE",
    badges:["NYSE"],
    totalRoles:2,
    notes:"NYC major eng hub. Original FDE model. 33 NYC eng roles today.",
    jobs:[
      { title:"Site Reliability Operations Analyst - Commercial", url:"https://jobs.lever.co/palantir/5174e95b-2e0a-46f8-8db7-e2c837a0ac94", level:"mid", added:"2026-08-26", posted:"2023-11-28" },
      { title:"Site Reliability Operations Analyst - US Government", url:"https://jobs.lever.co/palantir/7d91ca36-1e23-4603-b0f1-82a835e27d3f", level:"mid", added:"2026-08-26", posted:"2020-04-13" }
    ] },
  { id:"turing", name:"Turing", vertical:"ai",
    sub:"AI dev marketplace + staff",
    stage:"Late stage", raised:"$140M+", lead:"WestBridge",
    badges:["WestBridge","Foundation"],
    totalRoles:1,
    notes:"NYC HQ. Elite talent network with staff engineers.",
    jobs:[
      { title:"Technical Business Analyst", url:"https://job-boards.greenhouse.io/turing/jobs/6114235004", level:"mid", added:"2026-08-26", posted:"2026-08-13" }
    ] },
  { id:"capco", name:"Capco", vertical:"saas",
    sub:"Financial-services dev consultancy",
    stage:"Acquired", raised:"(Wipro subsidiary)", lead:"Wipro",
    badges:["Wipro"],
    totalRoles:1,
    notes:"NYC office. Elite banking tech consultancy.",
    jobs:[
      { title:"Business Analyst - Retail Energy", url:"https://job-boards.greenhouse.io/capco/jobs/8059556", level:"mid", added:"2026-08-26", posted:"2026-07-17" }
    ] },
  { id:"pinterest", name:"Pinterest", vertical:"consumer",
    sub:"Visual discovery (NYSE: PINS)",
    stage:"Public", raised:"$1.5B pre-IPO", lead:"Bessemer",
    badges:["NYSE","Bessemer","Andreessen Horowitz"],
    totalRoles:1,
    notes:"SF HQ, NYC office. Analyst + product analytics roles across ads + monetization.",
    jobs:[
      { title:"Sales Strategy & Operations Lead, JBP Development", url:"https://www.pinterestcareers.com/jobs/?gh_jid=7983334", level:"mid", added:"2026-08-26", posted:"2026-08-20" }
    ] },
  { id:"box", name:"Box", vertical:"saas",
    sub:"Cloud content (NYSE: BOX)",
    stage:"Public", raised:"$562M pre-IPO", lead:"DFJ",
    badges:["NYSE","DFJ"],
    totalRoles:1,
    notes:"Redwood City HQ, NYC office. Enterprise-scale analyst pipeline.",
    jobs:[
      { title:"Business Systems Analyst III (Marketing)", url:"https://job-boards.greenhouse.io/boxinc/jobs/8068833", level:"mid", added:"2026-08-26", posted:"2026-08-21" }
    ] },
  { id:"cockroach-labs", name:"Cockroach Labs", vertical:"devtools",
    sub:"Distributed SQL database",
    stage:"Series F", raised:"$633M", lead:"Greenoaks",
    badges:["Greenoaks","Benchmark","Index"],
    totalRoles:1,
    notes:"Distributed SQL. Consensus, MVCC, query planning.",
    jobs:[
      { title:"Sr. Financial Analyst, GTM", url:"https://www.cockroachlabs.com/careers/job/?gh_jid=8070069", level:"mid", added:"2026-08-26", posted:"2026-08-19" }
    ] },
  { id:"codes-health", name:"Codes Health", vertical:"health",
    sub:"AI medical record retrieval",
    stage:"Seed", raised:"YC", lead:"Y Combinator",
    badges:["YC"],
    totalRoles:1,
    notes:"YC S24. NYC. Cross-EHR chart abstraction.",
    jobs:[
      { title:"Strategy & Operations", url:"https://jobs.ashbyhq.com/codes-health/bdbdf014-3be4-449a-be77-fa6faaed3de8", level:"mid", added:"2026-08-26", posted:"2025-12-17" }
    ] },
  { id:"elevenlabs", name:"ElevenLabs", vertical:"ai",
    sub:"Voice AI / TTS",
    stage:"Series C", raised:"$281M", lead:"Andreessen Horowitz",
    badges:["a16z","Sequoia","Nat Friedman"],
    totalRoles:1,
    notes:"Voice synthesis API. Audio infra, real-time streaming.",
    jobs:[
      { title:"Revenue Strategy & Operations - North America", url:"https://jobs.ashbyhq.com/elevenlabs/b28719ff-833d-49b4-8286-f59082732186", level:"mid", added:"2026-08-26", posted:"2026-08-25" }
    ] },
  { id:"faire", name:"Faire", vertical:"marketplace",
    sub:"Wholesale marketplace",
    stage:"Series G", raised:"$1.7B", lead:"Sequoia",
    badges:["Sequoia","Founders Fund"],
    totalRoles:1,
    notes:"SF HQ, NYC hires. Marketplace ops + BI.",
    jobs:[
      { title:"Strategic Finance Lead, Fulfillment", url:"https://boards.greenhouse.io/faire/jobs/8547681002?gh_jid=8547681002", level:"mid", added:"2026-08-26", posted:"2026-07-24" }
    ] },
  { id:"modal", name:"Modal Labs", vertical:"infra",
    sub:"Serverless cloud for AI",
    stage:"Series A", raised:"$23M", lead:"Redpoint",
    badges:["Redpoint","Lux"],
    totalRoles:1,
    notes:"Container runtime, serverless GPU. Systems-heavy.",
    jobs:[
      { title:"Revenue Operations", url:"https://jobs.ashbyhq.com/modal/a5d0e0e2-8d15-491d-9169-64be23f62034", level:"mid", added:"2026-08-26", posted:"2026-07-30" }
    ] },
  { id:"perplexity", name:"Perplexity", vertical:"ai",
    sub:"AI answer engine",
    stage:"Series C", raised:"$165M", lead:"IVP",
    badges:["IVP","NEA","NVIDIA"],
    totalRoles:1,
    notes:"Conversational answer engine with citations. Retrieval + ranking + UX.",
    jobs:[
      { title:"Revenue Operations Analyst", url:"https://jobs.ashbyhq.com/perplexity/03f8f956-1cb3-4945-81d1-73b7ff048d4e", level:"mid", added:"2026-08-26", posted:"2026-08-06" }
    ] },
  { id:"scaleai", name:"Scale AI", vertical:"ai",
    sub:"AI data + evals + RLHF",
    stage:"Series F", raised:"$1.6B", lead:"Accel",
    badges:["Accel","Index","Founders Fund"],
    totalRoles:1,
    notes:"Data pipelines for AI labs + DoD. FDE work for enterprise deploys; long async eval workflows.",
    jobs:[
      { title:"Enterprise Deal Desk & Pricing Analyst", url:"https://job-boards.greenhouse.io/scaleai/jobs/4725451005", level:"mid", added:"2026-08-26", posted:"2026-08-19" }
    ] },
  { id:"lithic", name:"Lithic", vertical:"fintech",
    sub:"Card-issuing API",
    stage:"Series C", raised:"$110M", lead:"Stripes",
    badges:["Stripes","Index","Bessemer","Tusk"],
    totalRoles:1,
    notes:"NYC card-issuing platform (Privacy.com lineage). Payments + compliance + APIs.",
    jobs:[
      { title:"Business Operations Associate, Program Management", url:"https://job-boards.greenhouse.io/lithic/jobs/6164377004", level:"entry", added:"2026-08-27", posted:"2026-08-26" }
    ] },
  { id:"vercel", name:"Vercel", vertical:"devtools",
    sub:"Frontend cloud / Next.js",
    stage:"Series E", raised:"$563M", lead:"Accel",
    badges:["Accel","GV","Bedrock"],
    totalRoles:1,
    notes:"Edge platform + Next.js. CDN, build, runtime.",
    jobs:[
      { title:"GRC Analyst", url:"https://job-boards.greenhouse.io/vercel/jobs/6102654004", level:"mid", added:"2026-08-27", posted:"2026-08-26" }
    ] },
  { id:"warp", name:"Warp", vertical:"ai",
    sub:"AI-native terminal",
    stage:"Series B", raised:"$73M", lead:"Sequoia",
    badges:["Sequoia","GV"],
    totalRoles:1,
    notes:"Reimagined terminal with AI. Heavy on developer experience, latency, prompt design for code.",
    jobs:[
      { title:"Revenue Operations Specialist", url:"https://jobs.ashbyhq.com/warp/6b4c450d-ab42-426e-afef-32396b9560a6", level:"mid", added:"2026-08-28", posted:"2026-08-27" }
    ] },
  { id:"alphasense", name:"AlphaSense", vertical:"ai",
    sub:"AI market intelligence",
    stage:"Series F", raised:"$650M+", lead:"BDT",
    badges:["BDT","Viking","Goldman"],
    totalRoles:1,
    notes:"NYC enterprise AI search over financial docs. Retrieval + integrations.",
    jobs:[
      { title:"Research Quality Analyst", url:"https://job-boards.greenhouse.io/alphasense/jobs/8692344002", level:"mid", added:"2026-08-29", posted:"2026-08-28" }
    ] },
  { id:"decagon", name:"Decagon", vertical:"ai",
    sub:"AI customer-support agents",
    stage:"Series C", raised:"$240M", lead:"Bain Capital Ventures",
    badges:["Bain","a16z","Accel"],
    totalRoles:2,
    notes:"Enterprise AI agents. FDE-heavy: deploy alongside customer success.",
    jobs:[
      { title:"BizOps & Strategy, Pricing", url:"https://jobs.ashbyhq.com/decagon/80e62efe-c1e1-4f00-a9cb-2a75d8cbb577", level:"mid", added:"2026-08-30", posted:"2026-02-20" },
      { title:"Business Operations, Growth", url:"https://jobs.ashbyhq.com/decagon/aed35522-81dd-466f-aa98-6dbe8fda413a", level:"mid", added:"2026-09-19", posted:"2026-09-18", pay:{"min":160000,"max":200000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"garage", name:"Garage", vertical:"marketplace",
    sub:"Marketplace for industrial assets",
    stage:"Seed", raised:"YC + Founders Fund", lead:"Founders Fund",
    badges:["Founders Fund","YC"],
    totalRoles:1,
    notes:"YC W24. NYC. Trucks, machinery, equipment.",
    jobs:[
      { title:"People Strategy & Operations", url:"https://jobs.ashbyhq.com/garage/57ff110d-1c9c-412f-b176-fd1fb0bb8449", level:"mid", added:"2026-09-01", posted:"2026-07-21" }
    ] },
  { id:"alchemy", name:"Alchemy", vertical:"fintech",
    sub:"Web3 dev platform",
    stage:"Series C", raised:"$535M", lead:"Lightspeed",
    badges:["Lightspeed","Silver Lake","Coatue"],
    totalRoles:1,
    notes:"Web3 infra. RPC, indexing, SDKs.",
    jobs:[
      { title:"Data Systems Analyst", url:"https://jobs.ashbyhq.com/alchemy/75e6dd36-4916-4e72-a596-037945fd741f", level:"mid", added:"2026-09-04", posted:"2026-04-01" }
    ] },
  { id:"braze", name:"Braze", vertical:"saas",
    sub:"Customer engagement (NASDAQ)",
    stage:"Public", raised:"$175M pre-IPO", lead:"ICONIQ",
    badges:["NASDAQ","ICONIQ","Battery"],
    totalRoles:2,
    notes:"Public co. Cross-channel CRM messaging at scale.",
    jobs:[
      { title:"People Data Analyst", url:"https://job-boards.greenhouse.io/braze/jobs/8177766", level:"mid", added:"2026-09-04", posted:"2026-09-03" },
      { title:"Financial Analyst II, FP&A", url:"https://job-boards.greenhouse.io/braze/jobs/8196046", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:3 }
    ] },
  { id:"gusto", name:"Gusto", vertical:"fintech",
    sub:"Payroll / HR for SMBs",
    stage:"Series E", raised:"$716M", lead:"Generation",
    badges:["Generation","Kleiner","YC"],
    totalRoles:3,
    notes:"Payroll engine + benefits. Compliance, money movement, multi-state tax.",
    jobs:[
      { title:"Health Insurance Sales Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8075901", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Payment Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8180461", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:3 },
      { title:"Sales Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8105993", level:"mid", added:"2026-09-19", posted:"2026-09-15" }
    ] },
  { id:"seatgeek", name:"SeatGeek", vertical:"marketplace",
    sub:"Live-events ticketing",
    stage:"Series E", raised:"$338M", lead:"Wellington",
    badges:["Wellington","Accel","Causeway"],
    totalRoles:1,
    notes:"Tickets marketplace + primary-issuer platform. Marketplace ranking, payments, integrations.",
    jobs:[
      { title:"Paid Social & Programmatic Analyst", url:"https://seatgeek.com/jobs/8180508?gh_jid=8180508", level:"mid", added:"2026-09-05", posted:"2026-09-04" }
    ] },
  { id:"meow", name:"Meow", vertical:"fintech",
    sub:"SMB treasury + business banking",
    stage:"Series A", raised:"$27M", lead:"Tiger",
    badges:["Tiger","a16z"],
    totalRoles:1,
    notes:"NYC HQ. T-bill yield for startups.",
    jobs:[
      { title:"Compliance Operations Analyst", url:"https://jobs.ashbyhq.com/meow/2b4b7b81-ade5-4e46-8b75-1faab789e104", level:"mid", added:"2026-09-22", posted:"2026-09-21" }
    ] },
  { id:"mongodb", name:"MongoDB", vertical:"devtools",
    sub:"Document database (NASDAQ)",
    stage:"Public", raised:"$311M pre-IPO", lead:"Sequoia",
    badges:["NASDAQ","Sequoia","Union Square"],
    totalRoles:1,
    notes:"Public co. Database internals, distributed systems.",
    jobs:[
      { title:"Strategic Finance Analyst", url:"https://www.mongodb.com/careers/job/?gh_jid=8192216", level:"mid", added:"2026-09-19", posted:"2026-09-17", pay:{"min":64000,"max":127000,"interval":"year"}, paySource:"posted", years:1 }
    ] },
  { id:"navan", name:"Navan", vertical:"saas",
    sub:"Business travel + expense",
    stage:"Series G", raised:"$2B", lead:"Andreessen Horowitz",
    badges:["a16z","Lightspeed","Greenoaks"],
    totalRoles:1,
    notes:"Modern T&E platform (formerly TripActions). Travel inventory, expense, payments.",
    jobs:[
      { title:"Sr. Analyst, GTM Strategy & Operations", url:"https://navan.com/careers/openings?gh_jid=8014105", level:"mid", added:"2026-09-19", posted:"2026-09-09", pay:{"min":86250,"max":145000,"interval":"year"}, paySource:"posted", years:3 }
    ] },
  { id:"rho", name:"Rho", vertical:"fintech",
    sub:"Business banking + spend mgmt",
    stage:"Series B", raised:"$200M", lead:"Dragoneer",
    badges:["Dragoneer","DFJ Growth"],
    totalRoles:1,
    notes:"NYC fintech. Corporate cards + treasury; payments systems.",
    jobs:[
      { title:"Financial Crime Analyst", url:"https://jobs.ashbyhq.com/rho/7a06d695-a489-4f9f-bed3-cbf647a7a6eb", level:"mid", added:"2026-09-19", posted:"2026-09-09", years:2 }
    ] },
  { id:"ro", name:"Ro", vertical:"health",
    sub:"D2C telehealth + pharmacy",
    stage:"Series E", raised:"$1B+", lead:"General Catalyst",
    badges:["General Catalyst","Founders Fund","TPG"],
    totalRoles:1,
    notes:"NYC telehealth. Care plans + fulfillment + identity.",
    jobs:[
      { title:"Inventory Allocation Analyst", url:"https://jobs.lever.co/ro/ba3037b9-9e7a-4381-8cb9-7ea866609ada", level:"mid", added:"2026-09-19", posted:"2026-09-17" }
    ] },
  { id:"mastercard", name:"Mastercard", vertical:"fintech",
    sub:"Card network (NYSE: MA)",
    stage:"Public", raised:"(NYSE: MA)", lead:"NYSE",
    badges:["NYSE"],
    totalRoles:1,
    notes:"Purchase NY HQ.",
    jobs:[
      { title:"Analyst, Media Planning", url:"https://mastercard.wd1.myworkdayjobs.com/en-US/CorporateCareers/job/Purchase-New-York/Analyst--Media-Planning_R-291052", level:"mid", added:"2026-09-22" }
    ] }
];

/* ---------- COMPANY DOMAINS (for Clearbit public logo CDN) ---------- */
const COMPANY_DOMAINS = {
  alchemy:"alchemy.com", anthropic:"anthropic.com", baseten:"baseten.co",
  box:"box.com", braze:"braze.com", brex:"brex.com",
  capco:"capco.com", "cockroach-labs":"cockroachlabs.com", "codes-health":"codeshealth.co",
  cohere:"cohere.com", crusoe:"crusoe.ai", cursor:"cursor.com",
  dashlane:"dashlane.com", datadog:"datadoghq.com", decagon:"decagon.ai",
  elevenlabs:"elevenlabs.io", equinox:"equinox.com", etsy:"etsy.com",
  fanduel:"fanduel.com", figma:"figma.com", flexport:"flexport.com",
  "flow-traders":"flowtraders.com", garage:"garage.com", gemini:"gemini.com",
  gusto:"gusto.com", hang:"hang.xyz", hopper:"hopper.com",
  "jane-street":"janestreet.com", justworks:"justworks.com", kalshi:"kalshi.com",
  linkedin:"linkedin.com", lovable:"lovable.dev", lyft:"lyft.com",
  meow:"meow.com", metropolis:"metropolis.io", middesk:"middesk.com",
  modal:"modal.com", mongodb:"mongodb.com", navan:"navan.com",
  "nyc-gov":"nyc.gov", openai:"openai.com", oscar:"hioscar.com",
  palantir:"palantir.com", partiful:"partiful.com", perplexity:"perplexity.ai",
  pinterest:"pinterest.com", plaid:"plaid.com", point72:"point72.com",
  polymarket:"polymarket.com", ramp:"ramp.com", reddit:"reddit.com",
  rho:"rho.co", ridgeline:"ridgelineapps.com", rilla:"rillavoice.com",
  scaleai:"scale.com", seatgeek:"seatgeek.com", sisense:"sisense.com",
  sofi:"sofi.com", sonder:"sonder.com", sonymusic:"sonymusic.com",
  spotify:"spotify.com", stripe:"stripe.com", taboola:"taboola.com",
  "the-trade-desk":"thetradedesk.com", turing:"turing.com", vercel:"vercel.com",
  vestwell:"vestwell.com", warp:"warp.dev", zocdoc:"zocdoc.com",
};

window.DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
