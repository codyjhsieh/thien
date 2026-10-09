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
const COMPANIES_VERIFIED_AT = '2026-10-09';
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
      { title:"Safeguards Enforcement Analyst, Conventional Weapons", url:"https://job-boards.greenhouse.io/anthropic/jobs/5410006008", level:"mid", added:"2026-09-02", posted:"2026-09-01" },
      { title:"Procurement Operations Business Partner, R&D Operations", url:"https://job-boards.greenhouse.io/anthropic/jobs/5357933008", level:"mid", added:"2026-09-05", posted:"2026-09-04" },
      { title:"Business Systems Analyst, New Product Introduction", url:"https://job-boards.greenhouse.io/anthropic/jobs/5416829008", level:"mid", added:"2026-09-19", posted:"2026-09-08", pay:{"min":270000,"max":315000,"interval":"year"}, paySource:"posted" },
      { title:"GTM Strategy & Operations - AMER Enterprise Tech", url:"https://job-boards.greenhouse.io/anthropic/jobs/5390956008", level:"mid", added:"2026-09-19", posted:"2026-09-10", pay:{"min":270000,"max":310000,"interval":"year"}, paySource:"posted", years:10 },
      { title:"Strategy & Operations, Office of the CCO", url:"https://job-boards.greenhouse.io/anthropic/jobs/5432995008", level:"mid", added:"2026-09-24", posted:"2026-09-23", pay:{"min":190000,"max":270000,"interval":"year"}, paySource:"posted", years:4 },
      { title:"Marketing Analytics Lead, Enterprise Marketing", url:"https://job-boards.greenhouse.io/anthropic/jobs/5434145008", level:"mid", added:"2026-09-26", posted:"2026-09-25", pay:{"min":255000,"max":320000,"interval":"year"}, paySource:"posted" },
      { title:"Business Systems Analyst, GTM Systems", url:"https://job-boards.greenhouse.io/anthropic/jobs/5436196008", level:"mid", added:"2026-09-30", posted:"2026-09-29", pay:{"min":270000,"max":315000,"interval":"year"}, paySource:"posted", years:5 },
      { title:"Strategy & Operations, FDE", url:"https://job-boards.greenhouse.io/anthropic/jobs/5427938008", level:"mid", added:"2026-10-01", posted:"2026-09-30", pay:{"min":270000,"max":310000,"interval":"year"}, paySource:"posted" }
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
    totalRoles:1,
    notes:"AI code editor. Frontier model integration, latency, UX.",
    jobs:[
      { title:"Deal Desk Analyst - Americas", url:"https://jobs.ashbyhq.com/cursor/4a1f9223-627b-4582-a038-0d7005d7a31d", level:"mid", added:"2026-09-19", posted:"2026-09-14", years:5 }
    ] },
  { id:"baseten", name:"Baseten", vertical:"ai",
    sub:"ML model deployment",
    stage:"Series C", raised:"$135M", lead:"IVP",
    badges:["IVP","Spark","Greylock"],
    totalRoles:1,
    notes:"Model deployment infra. Inference engineering, autoscaling GPU.",
    jobs:[
      { title:"Revenue Analyst", url:"https://jobs.ashbyhq.com/baseten/bdc52dc9-2401-4b67-80cf-5bc7656034a6", level:"mid", added:"2026-10-07", posted:"2026-10-07", pay:{"min":185000,"max":240000,"interval":"year"}, paySource:"posted", years:5 }
    ] },
  { id:"stripe", name:"Stripe", vertical:"fintech",
    sub:"Payments + financial infra",
    stage:"Late stage", raised:"$8.7B", lead:"Sequoia",
    badges:["Sequoia","a16z","General Catalyst"],
    totalRoles:11,
    notes:"Payments at planet scale. Distributed systems, idempotency, money.",
    jobs:[
      { title:"Strategy and Operations Lead, Deal Pricing", url:"https://stripe.com/jobs/search?gh_jid=8044391", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Business Partner Analyst", url:"https://stripe.com/jobs/search?gh_jid=8079783", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"GTM Strategy & Operations Analyst", url:"https://stripe.com/jobs/search?gh_jid=8145119", level:"mid", added:"2026-08-26", posted:"2026-08-20" },
      { title:"Sales Strategy & Operations Business Partner", url:"https://stripe.com/jobs/search?gh_jid=8089882", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Product Strategy & Operations - Global Product", url:"https://stripe.com/jobs/search?gh_jid=8177640", level:"mid", added:"2026-09-04", posted:"2026-09-03" },
      { title:"Data Analyst, NYC", url:"https://stripe.com/jobs/search?gh_jid=8189909", level:"mid", added:"2026-09-19", posted:"2026-09-10", years:6 },
      { title:"GTM Strategy & Operations Analyst", url:"https://stripe.com/jobs/search?gh_jid=8201680", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:7 },
      { title:"Finance & Strategy Analyst", url:"https://stripe.com/jobs/search?gh_jid=8231575", level:"mid", added:"2026-09-26", posted:"2026-09-25", years:4 },
      { title:"Strategy & Operations Business Partner, Solution Architecture", url:"https://stripe.com/jobs/search?gh_jid=8214620", level:"mid", added:"2026-09-30", posted:"2026-09-29", years:2 },
      { title:"Comms Strategy & Operations Associate", url:"https://stripe.com/jobs/search?gh_jid=8241857", level:"entry", added:"2026-10-03", posted:"2026-10-02", years:3 },
      { title:"Finance & Strategy, Corporate Finance Analyst", url:"https://stripe.com/jobs/search?gh_jid=8249865", level:"mid", added:"2026-10-03", posted:"2026-10-02", pay:{"min":122400,"max":183600,"interval":"year"}, paySource:"posted", years:4 }
    ] },
  { id:"ramp", name:"Ramp", vertical:"fintech",
    sub:"Corporate cards + finance ops",
    stage:"Series E", raised:"$1.3B", lead:"Founders Fund",
    badges:["Founders Fund","Sequoia","Stripe"],
    totalRoles:3,
    notes:"Ledger, fraud, integrations at scale. High autonomy bar.",
    jobs:[
      { title:"GTM Business Systems Analyst – Post Sales", url:"https://jobs.ashbyhq.com/ramp/196e4e25-c452-430d-8b2f-36a40f88a2ae", level:"mid", added:"2026-09-05", posted:"2026-09-04" },
      { title:"HRIS Analyst", url:"https://jobs.ashbyhq.com/ramp/a11f7720-f3a8-4e86-9cc6-562bb11420b2", level:"mid", added:"2026-09-19", posted:"2026-09-17", pay:{"min":110000,"max":155000,"interval":"year"}, paySource:"posted", years:3 },
      { title:"Product Operations Specialist | Procurement", url:"https://jobs.ashbyhq.com/ramp/871d2fc8-def8-4837-a9b0-7cc4fe126c2b", level:"mid", added:"2026-09-23", posted:"2026-09-23", pay:{"min":128000,"max":180000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"brex", name:"Brex", vertical:"fintech",
    sub:"Corporate cards + spend mgmt (acq. by Capital One Apr 2026)",
    stage:"Series D", raised:"$1.5B", lead:"DST",
    badges:["YC","DST","Greenoaks"],
    totalRoles:1,
    notes:"Cards, banking, expense. Now part of Capital One; still hiring under Brex brand. PCI, ledger, large eng org.",
    jobs:[
      { title:"Data Analyst II", url:"https://www.brex.com/careers/8463702002?gh_jid=8463702002", level:"mid", added:"2026-08-26", posted:"2026-06-10" }
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
    totalRoles:5,
    notes:"Public co. Time-series infra, alerting, observability depth.",
    jobs:[
      { title:"Sales Revenue Analyst - NYC", url:"https://careers.datadoghq.com/detail/8132294/?gh_jid=8132294", level:"mid", added:"2026-09-19", posted:"2026-09-18", pay:{"min":79000,"max":105000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Legal Operations Analyst", url:"https://careers.datadoghq.com/detail/8202086/?gh_jid=8202086", level:"mid", added:"2026-09-22", posted:"2026-09-21", pay:{"min":70000,"max":93000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"FP&A Analyst", url:"https://careers.datadoghq.com/detail/8204554/?gh_jid=8204554", level:"mid", added:"2026-09-23", posted:"2026-09-22", pay:{"min":99000,"max":132000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Accounts Payable Analyst", url:"https://careers.datadoghq.com/detail/8257324/?gh_jid=8257324", level:"mid", added:"2026-10-07", posted:"2026-10-06", pay:{"min":59000,"max":79000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Strategic Finance Analyst", url:"https://careers.datadoghq.com/detail/8257306/?gh_jid=8257306", level:"mid", added:"2026-10-07", posted:"2026-10-06", pay:{"min":99000,"max":132000,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"oscar", name:"Oscar Health", vertical:"health",
    sub:"Tech-driven health insurance (NYSE)",
    stage:"Public", raised:"$1.6B pre-IPO", lead:"Founders Fund",
    badges:["NYSE","Founders Fund","General Catalyst"],
    totalRoles:3,
    notes:"Public co. Insurance platform with member-facing tech.",
    jobs:[
      { title:"Associate, Strategic Finance (FP&A)", url:"https://job-boards.greenhouse.io/oscar/jobs/8129152", level:"entry", added:"2026-09-19", posted:"2026-09-14", pay:{"min":87188,"max":114434,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Workday Reporting & Analytics Lead, People Analytics", url:"https://job-boards.greenhouse.io/oscar/jobs/8056691", level:"mid", added:"2026-09-19", posted:"2026-09-14", pay:{"min":101844,"max":133670,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Sr. Analyst, Authorization Services Design & Configuration", url:"https://job-boards.greenhouse.io/oscar/jobs/8258729", level:"mid", added:"2026-10-07", posted:"2026-10-06", pay:{"min":67813,"max":89005,"interval":"year"}, paySource:"posted", years:1 }
    ] },
  { id:"figma", name:"Figma", vertical:"saas",
    sub:"Collaborative design",
    stage:"Pre-IPO", raised:"$333M", lead:"Index",
    badges:["Index","Sequoia","Greylock"],
    totalRoles:2,
    notes:"Multiplayer collaboration at scale. CRDT, real-time infra, design tooling depth.",
    jobs:[
      { title:"HRIS Analyst", url:"https://boards.greenhouse.io/figma/jobs/6201385004?gh_jid=6201385004", level:"mid", added:"2026-09-23", posted:"2026-09-22", pay:{"min":140000,"max":202000,"interval":"year"}, paySource:"posted", years:4 },
      { title:"Business Systems Analyst", url:"https://boards.greenhouse.io/figma/jobs/6215865004?gh_jid=6215865004", level:"mid", added:"2026-10-08", posted:"2026-10-07", pay:{"min":105000,"max":245000,"interval":"year"}, paySource:"posted", years:3 }
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
    totalRoles:1,
    notes:"Decentralized prediction markets. On-chain settlement + UX.",
    jobs:[
      { title:"Customer Marketing Analyst", url:"https://jobs.ashbyhq.com/polymarket/54122c9f-f0fb-4ef9-9226-f3bea247502a", level:"mid", added:"2026-08-26", posted:"2026-08-18" }
    ] },
  { id:"the-trade-desk", name:"The Trade Desk", vertical:"saas",
    sub:"DSP for digital advertising (NASDAQ)",
    stage:"Public", raised:"$26M pre-IPO", lead:"IA Ventures",
    badges:["NASDAQ","IA Ventures"],
    totalRoles:1,
    notes:"Public co. Real-time bidding + ad tech at scale.",
    jobs:[
      { title:"Financial Analyst, Product Finance", url:"https://job-boards.greenhouse.io/thetradedesk/jobs/5182494007", level:"mid", added:"2026-08-26", posted:"2026-07-23" }
    ] },
  { id:"lyft", name:"Lyft", vertical:"consumer",
    sub:"Rideshare + mobility (NASDAQ)",
    stage:"Public", raised:"$5B pre-IPO", lead:"Andreessen Horowitz",
    badges:["NASDAQ","a16z","Founders Fund"],
    totalRoles:1,
    notes:"Public co. Mobility platform \u2014 matching, payments, mapping.",
    jobs:[
      { title:"Analytics Lead, Decisions & Insights", url:"https://app.careerpuck.com/job-board/lyft/job/8868958002?gh_jid=8868958002", level:"mid", added:"2026-10-06", posted:"2026-10-05", years:5 }
    ] },
  { id:"jane-street", name:"Jane Street", vertical:"fintech",
    sub:"Quant trading firm",
    stage:"Private", raised:"Self-funded", lead:"Private",
    badges:["Private"],
    totalRoles:8,
    notes:"Quant trading. Strong on functional programming (OCaml), CS fundamentals.",
    jobs:[
      { title:"Fundamental Research Analyst", url:"https://www.janestreet.com/join-jane-street/apply/8347286002?gh_jid=8347286002", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"Grains and Oilseeds Analyst", url:"https://www.janestreet.com/join-jane-street/apply/8180726002?gh_jid=8180726002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
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
    totalRoles:8,
    notes:"Steve Cohen's quant firm. Trading systems + ML + low-latency infra.",
    jobs:[
      { title:"Credit Research Analyst, Global Macro", url:"https://boards.greenhouse.io/point72/jobs/7605647002?gh_jid=7605647002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Identity & Privileged Governance Analyst", url:"https://boards.greenhouse.io/point72/jobs/8488737002?gh_jid=8488737002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Point72 Fund Flow Analyst", url:"https://boards.greenhouse.io/point72/jobs/8003977002?gh_jid=8003977002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Quantitative Portfolio Analyst – 2026 Grad", url:"https://boards.greenhouse.io/point72/jobs/8169967002?gh_jid=8169967002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Sector Analyst, MI-Data", url:"https://boards.greenhouse.io/point72/jobs/7820104002?gh_jid=7820104002", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Procurement Specialist", url:"https://boards.greenhouse.io/point72/jobs/8755415002?gh_jid=8755415002", level:"mid", added:"2026-09-01", posted:"2026-08-31" },
      { title:"Macro Analyst, Market Intelligence, US", url:"https://boards.greenhouse.io/point72/jobs/8785996002?gh_jid=8785996002", level:"mid", added:"2026-09-24", posted:"2026-09-23" },
      { title:"Technical Business Analyst", url:"https://boards.greenhouse.io/point72/jobs/8877421002?gh_jid=8877421002", level:"mid", added:"2026-10-08", posted:"2026-10-07" }
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
      { title:"Strategic Finance Analyst", url:"https://coreweave.com/careers/job?4718134006&board=coreweave&gh_jid=4718134006", level:"mid", added:"2026-10-02", posted:"2026-10-01", years:2 }
    ] },
  { id:"blackrock", name:"BlackRock", vertical:"fintech",
    sub:"World's largest asset manager (NYSE: BLK)",
    stage:"Public", raised:"$2.6B pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:3,
    notes:"NYC HQ. Aladdin platform \u2014 risk + portfolio mgmt. Heavy systems / data eng.",
    jobs:[
      { title:"Associate, Business Intelligence Developer/Business Analyst - PFS", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Business-Intelligence-Developer-Business-Analyst---PFS_R265901", level:"entry", added:"2026-08-26" },
      { title:"Analytics Specialist, Associate, Portfolio Analytics Group (PAG)", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Analytics-Specialist--Associate--Portfolio-Analytics-Group--PAG-_R266280", level:"entry", added:"2026-08-27" },
      { title:"Associate, Liquid Credit Portfolio Analytics & Reporting, PFS - New York", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Associate--Liquid-Credit-Portfolio-Analytics---Reporting--PFS---New-York_R265407", level:"entry", added:"2026-09-23" }
    ] },
  { id:"etsy", name:"Etsy", vertical:"marketplace",
    sub:"Marketplace for handmade + vintage (NASDAQ: ETSY)",
    stage:"Public", raised:"$307M pre-IPO", lead:"NASDAQ",
    badges:["NASDAQ","S&P MidCap"],
    totalRoles:1,
    notes:"Brooklyn HQ. Recommendations, search, payments, ML \u2014 strong Python culture.",
    jobs:[
      { title:"Market Research Analyst III", url:"https://etsy.wd5.myworkdayjobs.com/en-US/Etsy_Careers/job/Brooklyn-New-York/Market-Research-Analyst-III_JR5819-1", level:"mid", added:"2026-08-28" }
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
    totalRoles:1,
    notes:"Empire State Building NYC office. Sr enterprise systems eng roles.",
    jobs:[
      { title:"Sales Strategy and Operations Associate", url:"https://jobs.smartrecruiters.com/LinkedIn3/744000153272899", level:"entry", added:"2026-10-03", posted:"2026-10-02", years:2 }
    ] },
  { id:"equinox", name:"Equinox Group", vertical:"consumer",
    sub:"Luxury fitness / hospitality",
    stage:"PE-backed", raised:"$1B+", lead:"L Catterton",
    badges:["L Catterton","Related Cos"],
    totalRoles:1,
    notes:"HQ Hudson Yards NYC. Sr Data Engineer + site-testing eng roles.",
    jobs:[
      { title:"AP, Real Estate Analyst", url:"https://jobs.smartrecruiters.com/Equinox/744000154122188", level:"mid", added:"2026-10-08", posted:"2026-10-07", years:2 }
    ] },
  { id:"nyc-gov", name:"City of New York", vertical:"saas",
    sub:"Public sector (dept of tech)",
    stage:"Public sector", raised:"$110B budget", lead:"\u2014",
    badges:["Public sector"],
    totalRoles:67,
    notes:"NYC gov. Sr SWE GeoSupport, .NET, City Environmental Quality Review roles.",
    jobs:[
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013315337", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013314887", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Analyst - DOHMH", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014532571", level:"mid", added:"2026-08-26", posted:"2026-08-11" },
      { title:"Analyst - Sandy Grant Management & Insurance", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014736471", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Budget Research Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014614266", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Forensic Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014555616", level:"mid", added:"2026-08-26", posted:"2026-08-12" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014888956", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Counter Terrorism Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014864116", level:"mid", added:"2026-08-27", posted:"2026-08-26" },
      { title:"Analyst - Youth and Community Development (DYCD) / Aging (DFTA) / Veterans’ Services (DVS)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014937676", level:"mid", added:"2026-08-30", posted:"2026-08-29" },
      { title:"Analyst - Data and Systems", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371451", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Analyst - Department of Citywide Administrative Services (DCAS)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015258191", level:"mid", added:"2026-09-19", posted:"2026-09-15" },
      { title:"Analyst - FEMA Revenue Accountability and Reporting", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015224321", level:"mid", added:"2026-09-19", posted:"2026-09-12" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015168342", level:"mid", added:"2026-09-19", posted:"2026-09-10" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015133276", level:"mid", added:"2026-09-19", posted:"2026-09-09" },
      { title:"Capital Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371546", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Capital Analyst Division of Capital Planning", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371431", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Collections Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015335656", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Community Coordinator- Central Admin. Analyst - Office of OFA for the Division of Fiscal Affairs/Central Administration", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015296126", level:"mid", added:"2026-09-19", posted:"2026-09-16" },
      { title:"Data Engagement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015371126", level:"mid", added:"2026-09-19", posted:"2026-09-18" },
      { title:"Data Quality Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015224376", level:"mid", added:"2026-09-19", posted:"2026-09-12" },
      { title:"HOME-ARP Adjustment Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015296036", level:"mid", added:"2026-09-19", posted:"2026-09-16" },
      { title:"Investigative Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015199906", level:"mid", added:"2026-09-19", posted:"2026-09-11", years:4 },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015168477", level:"mid", added:"2026-09-19", posted:"2026-09-10" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015552196", level:"mid", added:"2026-09-22", posted:"2026-09-22" },
      { title:"Junior Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015552167", level:"entry", added:"2026-09-23", posted:"2026-09-22" },
      { title:"Ideation Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015594965", level:"mid", added:"2026-09-23", posted:"2026-09-23" },
      { title:"Administrative Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015633956", level:"mid", added:"2026-09-24", posted:"2026-09-24" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015633506", level:"mid", added:"2026-09-24", posted:"2026-09-24" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015633866", level:"mid", added:"2026-09-24", posted:"2026-09-24" },
      { title:"Economic Crimes Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015634326", level:"mid", added:"2026-09-25", posted:"2026-09-24" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705361", level:"mid", added:"2026-09-26", posted:"2026-09-26" },
      { title:"Cell Site Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705216", level:"mid", added:"2026-09-26", posted:"2026-09-26" },
      { title:"SW - PROJECT ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705246", level:"mid", added:"2026-09-26", posted:"2026-09-26" },
      { title:"Timekeeper Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015671696", level:"mid", added:"2026-09-26", posted:"2026-09-25" },
      { title:"Analyst - Department of Social Services (DSS) / Department of Homeless Services (DHS)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705846", level:"mid", added:"2026-09-27", posted:"2026-09-26" },
      { title:"Analyst - Program Reporting and Evaluation", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705801", level:"mid", added:"2026-09-27", posted:"2026-09-26" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015705721", level:"mid", added:"2026-09-27", posted:"2026-09-26" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015759228", level:"mid", added:"2026-09-29", posted:"2026-09-29" },
      { title:"Body-Worn Camera Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015759956", level:"mid", added:"2026-09-30", posted:"2026-09-29" },
      { title:"JR. ASSET MANAGEMENT ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015820766", level:"entry", added:"2026-10-01", posted:"2026-10-01" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015821076", level:"mid", added:"2026-10-01", posted:"2026-10-01" },
      { title:"Research and Media Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015792946", level:"mid", added:"2026-10-01", posted:"2026-09-30", years:2 },
      { title:"Analyst - Miscellaneous Budget", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015821336", level:"mid", added:"2026-10-02", posted:"2026-10-01" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015852899", level:"mid", added:"2026-10-02", posted:"2026-10-02" },
      { title:"Data Analyst for the Division of Housing Opportunity", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015853046", level:"mid", added:"2026-10-02", posted:"2026-10-02" },
      { title:"Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015879576", level:"mid", added:"2026-10-03", posted:"2026-10-03" },
      { title:"BOB- Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015879566", level:"mid", added:"2026-10-03", posted:"2026-10-03" },
      { title:"Data Visualization Analyst Level I", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015879786", level:"mid", added:"2026-10-03", posted:"2026-10-03" },
      { title:"LOGISTICS - COLLEGE AIDE", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015879426", level:"mid", added:"2026-10-03", posted:"2026-10-03" },
      { title:"Mainframe Programmer Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015879721", level:"mid", added:"2026-10-03", posted:"2026-10-03" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015911436", level:"mid", added:"2026-10-06", posted:"2026-10-06" },
      { title:"BOB- Procurement Analyst II", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015911356", level:"mid", added:"2026-10-06", posted:"2026-10-06" },
      { title:"Strategic Performance Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015911056", level:"mid", added:"2026-10-06", posted:"2026-10-06" },
      { title:"BOB- Procurement Analyst I", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015947176", level:"entry", added:"2026-10-07", posted:"2026-10-07" },
      { title:"Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015946806", level:"mid", added:"2026-10-07", posted:"2026-10-07" },
      { title:"Operations Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015946881", level:"mid", added:"2026-10-07", posted:"2026-10-07" },
      { title:"PROCUREMENT ANALYST II", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015911031", level:"mid", added:"2026-10-07", posted:"2026-10-06" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015981556", level:"mid", added:"2026-10-08", posted:"2026-10-08" },
      { title:"BOB-Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015982436", level:"mid", added:"2026-10-08", posted:"2026-10-08" },
      { title:"BOB-Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015982416", level:"mid", added:"2026-10-08", posted:"2026-10-08" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015947516", level:"mid", added:"2026-10-08", posted:"2026-10-07" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015982396", level:"mid", added:"2026-10-08", posted:"2026-10-08" },
      { title:"Investigative Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015947387", level:"mid", added:"2026-10-08", posted:"2026-10-07" },
      { title:"PEOPLE DATA & STRATEGY ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015981606", level:"mid", added:"2026-10-08", posted:"2026-10-08" },
      { title:"Analyst, Talent and Organizational Development", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990015982481", level:"mid", added:"2026-10-09", posted:"2026-10-08" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990016013156", level:"mid", added:"2026-10-09", posted:"2026-10-09" },
      { title:"Research Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990016013456", level:"mid", added:"2026-10-09", posted:"2026-10-09" }
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
    totalRoles:2,
    notes:"SF HQ, NYC hires. Marketplace ops + BI.",
    jobs:[
      { title:"Brand Operations Lead, Fulfillment", url:"https://boards.greenhouse.io/faire/jobs/8845058002?gh_jid=8845058002", level:"mid", added:"2026-09-26", posted:"2026-09-25" },
      { title:"Strategy & Analytics Lead - Multiple Openings", url:"https://boards.greenhouse.io/faire/jobs/8623235002?gh_jid=8623235002", level:"mid", added:"2026-09-26", posted:"2026-09-25", years:5 }
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
    totalRoles:2,
    notes:"YC W24. NYC. Trucks, machinery, equipment.",
    jobs:[
      { title:"People Strategy & Operations", url:"https://jobs.ashbyhq.com/garage/57ff110d-1c9c-412f-b176-fd1fb0bb8449", level:"mid", added:"2026-09-01", posted:"2026-07-21" },
      { title:"Business Operations", url:"https://jobs.ashbyhq.com/garage/5dc4ff9d-c7fc-453f-b189-0fa7bd9588a3", level:"mid", added:"2026-10-02", posted:"2026-10-01", pay:{"min":90000,"max":130000,"interval":"year"}, paySource:"posted", years:2 }
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
    totalRoles:1,
    notes:"Public co. Cross-channel CRM messaging at scale.",
    jobs:[
      { title:"Financial Analyst II, FP&A", url:"https://job-boards.greenhouse.io/braze/jobs/8196046", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:3 }
    ] },
  { id:"gusto", name:"Gusto", vertical:"fintech",
    sub:"Payroll / HR for SMBs",
    stage:"Series E", raised:"$716M", lead:"Generation",
    badges:["Generation","Kleiner","YC"],
    totalRoles:4,
    notes:"Payroll engine + benefits. Compliance, money movement, multi-state tax.",
    jobs:[
      { title:"Health Insurance Sales Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8075901", level:"mid", added:"2026-09-19", posted:"2026-09-17" },
      { title:"Payment Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8180461", level:"mid", added:"2026-09-19", posted:"2026-09-18", years:3 },
      { title:"WFM Resource Management & Analytics", url:"https://job-boards.greenhouse.io/gusto/jobs/8104224", level:"mid", added:"2026-09-23", posted:"2026-09-22", years:7 },
      { title:"Sr. Sales Operations Analyst", url:"https://job-boards.greenhouse.io/gusto/jobs/8212233", level:"mid", added:"2026-10-02", posted:"2026-10-01" }
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
      { title:"Compliance Operations Analyst", url:"https://jobs.ashbyhq.com/meow/4b25c424-8034-4ee9-8555-a5a0f14d9ffd", level:"mid", added:"2026-09-26", posted:"2026-09-25" }
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
      { title:"Analyst, Account Management", url:"https://mastercard.wd1.myworkdayjobs.com/en-US/CorporateCareers/job/New-York-City-New-York/Analyst--Account-Management_R-291149", level:"mid", added:"2026-09-24" }
    ] },
  { id:"ridgeline", name:"Ridgeline", vertical:"saas",
    sub:"Cloud OS for investment mgmt",
    stage:"Series C", raised:"$278M", lead:"Wellington",
    badges:["Wellington","Sequoia"],
    totalRoles:2,
    notes:"Modern investment-management platform. Vertical SaaS at scale.",
    jobs:[
      { title:"Financial Systems Analyst", url:"https://boards.greenhouse.io/ridgeline/jobs/7994584003?gh_jid=7994584003", level:"mid", added:"2026-09-24", posted:"2026-09-23", years:3 },
      { title:"Investment Operations Analyst - Reconciliation Specialist (US Start of Day)", url:"https://boards.greenhouse.io/ridgeline/jobs/8003676003?gh_jid=8003676003", level:"mid", added:"2026-09-24", posted:"2026-09-23", years:3 }
    ] },
  { id:"hellofresh", name:"HelloFresh", vertical:"consumer",
    sub:"Meal kits",
    stage:"Public", raised:"(FSE: HFG)", lead:"FSE",
    badges:["FSE"],
    totalRoles:1,
    notes:"NYC + Berlin offices.",
    jobs:[
      { title:"Procurement Buyer", url:"https://careers.hellofresh.com/global/en/job/8202780?gh_jid=8202780", level:"mid", added:"2026-09-26", posted:"2026-09-25", pay:{"min":64800,"max":75600,"interval":"year"}, paySource:"posted", years:1 }
    ] },
  { id:"taboola", name:"Taboola", vertical:"saas",
    sub:"Content + ad tech",
    stage:"Public", raised:"(NASDAQ: TBLA)", lead:"NASDAQ",
    badges:["NASDAQ"],
    totalRoles:1,
    notes:"NYC major office. Recommendation engine, big data pipelines.",
    jobs:[
      { title:"Salesforce and GenAI System Analyst", url:"https://www.taboola.com/careers/job/8173563?gh_jid=8173563", level:"mid", added:"2026-10-06", posted:"2026-10-06", pay:{"min":100000,"max":123000,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"blackstone", name:"Blackstone", vertical:"fintech",
    sub:"Alt asset manager (NYSE: BX)",
    stage:"Public", raised:"(NYSE: BX)", lead:"NYSE",
    badges:["NYSE"],
    totalRoles:1,
    notes:"NYC HQ.",
    jobs:[
      { title:"Data Analyst, Associate - Private Equity Technology", url:"https://blackstone.wd1.myworkdayjobs.com/en-US/Blackstone_Careers/job/New-York/Data-Analyst--Associate---Private-Equity-Technology_43933-2", level:"entry", added:"2026-10-01" }
    ] },
  { id:"drw", name:"DRW", vertical:"fintech",
    sub:"Principal trading firm",
    stage:"Private", raised:"Self-funded", lead:"\u2014",
    badges:["Privately held"],
    totalRoles:1,
    notes:"NYC/Chicago quant trading. Low-latency systems, market data, analytics \u2014 C++/Python heavy.",
    jobs:[
      { title:"Risk Product Analyst", url:"https://job-boards.greenhouse.io/drweng/jobs/8238021", level:"mid", added:"2026-09-30", posted:"2026-09-29" }
    ] },
  { id:"modern-treasury", name:"Modern Treasury", vertical:"fintech",
    sub:"Payment operations",
    stage:"Series C", raised:"$183M", lead:"Altimeter",
    badges:["Altimeter","Benchmark"],
    totalRoles:1,
    notes:"Money movement infra. Bank integrations, ledger, ops UX.",
    jobs:[
      { title:"Revenue Operations Systems Admin", url:"https://jobs.ashbyhq.com/moderntreasury/25d2d97f-c2b4-4ab5-ae26-4b68be93e03c", level:"mid", added:"2026-09-30", posted:"2026-07-27", pay:{"min":130000,"max":170000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"clear", name:"CLEAR", vertical:"security",
    sub:"Identity verification (NYSE: YOU)",
    stage:"Public", raised:"$700M+", lead:"NYSE",
    badges:["NYSE","T. Rowe Price"],
    totalRoles:1,
    notes:"NYC identity platform. Biometric verification at airports + healthcare; backend + data eng.",
    jobs:[
      { title:"Threat Detection Analyst III", url:"https://job-boards.greenhouse.io/clear/jobs/8245151", level:"mid", added:"2026-10-01", posted:"2026-09-30", years:8 }
    ] },
  { id:"squarespace", name:"Squarespace", vertical:"saas",
    sub:"Website builder + payments",
    stage:"Take-private", raised:"$278M pre-IPO", lead:"Permira",
    badges:["Permira","General Atlantic"],
    totalRoles:1,
    notes:"Hosting, builder, payments at scale.",
    jobs:[
      { title:"GRC Analyst", url:"https://www.squarespace.com/about/careers?gh_jid=8223803", level:"mid", added:"2026-10-01", posted:"2026-09-30", years:3 }
    ] },
  { id:"dashlane", name:"Dashlane", vertical:"security",
    sub:"Password manager / identity",
    stage:"Series D", raised:"$200M+", lead:"Sequoia",
    badges:["Sequoia","Bessemer"],
    totalRoles:1,
    notes:"NYC HQ. Snyk-adjacent security, mature eng org.",
    jobs:[
      { title:"Revenue Operations Associate, Marketing", url:"https://job-boards.greenhouse.io/dashlane/jobs/8244059", level:"entry", added:"2026-10-02", posted:"2026-10-01", years:2 }
    ] },
  { id:"reddit", name:"Reddit", vertical:"media",
    sub:"Social discussion platform (NYSE)",
    stage:"Public", raised:"$1.3B pre-IPO", lead:"Advance",
    badges:["NYSE","Advance","Tencent"],
    totalRoles:1,
    notes:"Public co. Massive social platform with rich data + recs.",
    jobs:[
      { title:"Revenue Strategy & Operations Partner", url:"https://job-boards.greenhouse.io/reddit/jobs/8239905", level:"mid", added:"2026-10-02", posted:"2026-10-01", pay:{"min":180200,"max":252300,"interval":"year"}, paySource:"posted", years:5 }
    ] },
  { id:"ripple", name:"Ripple", vertical:"fintech",
    sub:"Crypto payments + cross-border",
    stage:"Late stage", raised:"$15B val", lead:"Andreessen Horowitz",
    badges:["a16z","Founders Fund"],
    totalRoles:1,
    notes:"NYC office. RippleNet + XRP infra.",
    jobs:[
      { title:"Product Operations, Analyst", url:"https://ripple.com/careers/all-jobs/job/8230821?gh_jid=8230821", level:"mid", added:"2026-10-02", posted:"2026-10-01", pay:{"min":92000,"max":110000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"talkspace", name:"Talkspace", vertical:"health",
    sub:"Online therapy (NASDAQ)",
    stage:"Public", raised:"$110M pre-IPO", lead:"Norwest",
    badges:["NASDAQ","Norwest"],
    totalRoles:2,
    notes:"Telehealth platform \u2014 therapy networks, intake, claims.",
    jobs:[
      { title:"Data Analyst", url:"https://www.talkspace.com/careers/job?gh_jid=6214066004", level:"mid", added:"2026-10-02", posted:"2026-10-01", years:3 },
      { title:"Network Planning Analyst", url:"https://www.talkspace.com/careers/job?gh_jid=6215751004", level:"mid", added:"2026-10-08", posted:"2026-10-07", years:3 }
    ] },
  { id:"sonymusic", name:"Sony Music Entertainment", vertical:"media",
    sub:"Global record label (Sony subsidiary)",
    stage:"Public", raised:"(Sony subsidiary)", lead:"Sony",
    badges:["Sony"],
    totalRoles:2,
    notes:"NYC HQ. Includes The Orchard, Alamo, Columbia. 3 NYC eng today (Data Privacy, Emerging Tech, Sr PM D2C).",
    jobs:[
      { title:"Analyst, A&R Admin - Santa Anna", url:"https://job-boards.greenhouse.io/sonymusicentertainment/jobs/8853439002", level:"mid", added:"2026-10-03", posted:"2026-10-02", pay:{"min":66300,"max":75000,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Analyst, Marketing Financial Planning", url:"https://job-boards.greenhouse.io/sonymusicentertainment/jobs/8871782002", level:"mid", added:"2026-10-08", posted:"2026-10-07", pay:{"min":61000,"max":66000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"pointone", name:"PointOne", vertical:"ai",
    sub:"AI legal timekeeping",
    stage:"Seed", raised:"$10M+", lead:"Khosla",
    badges:["Khosla","YC"],
    totalRoles:1,
    notes:"YC W24. NYC. Automated time entry for BigLaw.",
    jobs:[
      { title:"Strategy & Operations", url:"https://jobs.ashbyhq.com/pointone/f47e0530-6054-49be-a2e9-6a2b461faaba", level:"mid", added:"2026-10-05", posted:"2026-10-04" }
    ] },
  { id:"databricks", name:"Databricks", vertical:"devtools",
    sub:"Data + AI platform (private)",
    stage:"Late stage", raised:"$10B+", lead:"T. Rowe Price",
    badges:["T. Rowe Price","Fidelity"],
    totalRoles:1,
    notes:"SF HQ, NYC hires. $62B valuation. Field ops + revenue analyst + BI hires.",
    jobs:[
      { title:"Sr. AI Operations Specialist \u2014 Sales Operations", url:"https://databricks.com/company/careers/open-positions/job?gh_jid=8821953002", level:"mid", added:"2026-10-06", posted:"2026-10-06", pay:{"min":125000,"max":171950,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"octus", name:"Octus", vertical:"fintech",
    sub:"Legal + credit intelligence SaaS",
    stage:"Late stage", raised:"$200M+", lead:"Warburg Pincus",
    badges:["Warburg Pincus"],
    totalRoles:1,
    notes:"NYC HQ. LLM workflows on legal docs (fka Reorg).",
    jobs:[
      { title:"Credit Operations Analyst", url:"https://job-boards.greenhouse.io/octus/jobs/5193252007", level:"mid", added:"2026-10-07", posted:"2026-10-06", years:1 }
    ] },
  { id:"pagaya", name:"Pagaya", vertical:"fintech",
    sub:"AI lending platform (NASDAQ)",
    stage:"Public", raised:"$500M+ pre-IPO", lead:"Israel Growth Partners",
    badges:["NASDAQ","Aflac","Viola"],
    totalRoles:1,
    notes:"NYC AI-lending. ML credit + capital-markets plumbing.",
    jobs:[
      { title:"Analyst, Treasury", url:"https://job-boards.greenhouse.io/pagaya/jobs/8014453003", level:"mid", added:"2026-10-07", posted:"2026-10-06", pay:{"min":85000,"max":100000,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"crusoe", name:"Crusoe", vertical:"climate",
    sub:"Flare-gas + clean-energy AI datacenters",
    stage:"Series C", raised:"$1.4B+", lead:"G2 Venture Partners",
    badges:["G2 VP","Founders Fund"],
    totalRoles:1,
    notes:"NYC office. Novel energy-transition compute.",
    jobs:[
      { title:"Analyst/Associate, Investor Relations", url:"https://jobs.ashbyhq.com/crusoe/f77006c7-a8cd-49b5-9216-8a661962afbc", level:"entry", added:"2026-10-09", posted:"2026-10-08", years:1 }
    ] },
  { id:"okta", name:"Okta", vertical:"saas",
    sub:"Identity (NASDAQ: OKTA)",
    stage:"Public", raised:"$229M pre-IPO", lead:"Andreessen Horowitz",
    badges:["NASDAQ","a16z"],
    totalRoles:1,
    notes:"SF HQ, NYC hires.",
    jobs:[
      { title:"Sr. Analyst, Renewals Strategy & Operations", url:"https://www.okta.com/company/careers/opportunity/8246071?gh_jid=8246071", level:"mid", added:"2026-10-09", posted:"2026-10-06", pay:{"min":104000,"max":160600,"interval":"year"}, paySource:"posted" }
    ] }
];

/* ---------- COMPANY DOMAINS (for Clearbit public logo CDN) ---------- */
const COMPANY_DOMAINS = {
  alchemy:"alchemy.com", alphasense:"alphasense.com", anthropic:"anthropic.com",
  baseten:"baseten.co", blackrock:"blackrock.com", blackstone:"blackstone.com",
  box:"box.com", braze:"braze.com", brex:"brex.com",
  capco:"capco.com", clear:"clearme.com", "cockroach-labs":"cockroachlabs.com",
  "codes-health":"codeshealth.co", cohere:"cohere.com", coreweave:"coreweave.com",
  crusoe:"crusoe.ai", cursor:"cursor.com", dashlane:"dashlane.com",
  databricks:"databricks.com", datadog:"datadoghq.com", decagon:"decagon.ai",
  drw:"drw.com", elevenlabs:"elevenlabs.io", equinox:"equinox.com",
  etsy:"etsy.com", faire:"faire.com", fanduel:"fanduel.com",
  figma:"figma.com", flexport:"flexport.com", "flow-traders":"flowtraders.com",
  garage:"garage.com", gemini:"gemini.com", gusto:"gusto.com",
  hang:"hang.xyz", harvey:"harvey.ai", hellofresh:"careers.hellofresh.com",
  hopper:"hopper.com", "jane-street":"janestreet.com", justworks:"justworks.com",
  kalshi:"kalshi.com", linkedin:"linkedin.com", lithic:"lithic.com",
  lovable:"lovable.dev", lyft:"lyft.com", meow:"meow.com",
  metropolis:"metropolis.io", middesk:"middesk.com", modal:"modal.com",
  "modern-treasury":"moderntreasury.com", mongodb:"mongodb.com", navan:"navan.com",
  "nyc-gov":"nyc.gov", octus:"octus.com", okta:"okta.com",
  openai:"openai.com", oscar:"hioscar.com", pagaya:"pagaya.com",
  palantir:"palantir.com", partiful:"partiful.com", perplexity:"perplexity.ai",
  pinterest:"pinterest.com", plaid:"plaid.com", point72:"point72.com",
  pointone:"pointone.ai", polymarket:"polymarket.com", ramp:"ramp.com",
  reddit:"reddit.com", rho:"rho.co", ridgeline:"ridgelineapps.com",
  rilla:"rillavoice.com", ripple:"ripple.com", scaleai:"scale.com",
  seatgeek:"seatgeek.com", sisense:"sisense.com", sofi:"sofi.com",
  sonder:"sonder.com", sonymusic:"sonymusic.com", spotify:"spotify.com",
  squarespace:"squarespace.com", stripe:"stripe.com", taboola:"taboola.com",
  talkspace:"talkspace.com", "the-trade-desk":"thetradedesk.com", turing:"turing.com",
  vercel:"vercel.com", vestwell:"vestwell.com", warp:"warp.dev",
  zocdoc:"zocdoc.com",
};

window.DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
