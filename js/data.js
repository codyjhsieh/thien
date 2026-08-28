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
const COMPANIES_VERIFIED_AT = '2026-08-28';
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
      { title:"Safeguards Enforcement Analyst, Ban Evasion & Recidivism", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319592008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Bio Harms", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319696008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Chem & Explosives Harms", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319700008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Child Safety", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311237008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Cyber Harm", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311159008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Fraud & Scams", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319554008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Integrity & Authenticity", url:"https://job-boards.greenhouse.io/anthropic/jobs/5311149008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Radiological & Nuclear Harms", url:"https://job-boards.greenhouse.io/anthropic/jobs/5319702008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Safety Evaluations", url:"https://job-boards.greenhouse.io/anthropic/jobs/5137183008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, Violence & Extremism", url:"https://job-boards.greenhouse.io/anthropic/jobs/5343907008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Business Systems Analyst", url:"https://job-boards.greenhouse.io/anthropic/jobs/5394958008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Safeguards Enforcement Analyst, User Well-being", url:"https://job-boards.greenhouse.io/anthropic/jobs/5374778008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Strategy & Operations Lead, Enterprise Marketing", url:"https://job-boards.greenhouse.io/anthropic/jobs/5389945008", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Strategy & Operations, Applied AI - AMER", url:"https://job-boards.greenhouse.io/anthropic/jobs/5284500008", level:"mid", added:"2026-08-26", posted:"2026-08-21" }
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
      { title:"Full Stack Analyst, GTM", url:"https://jobs.ashbyhq.com/cursor/7bc441a4-9bb6-45cb-a9e0-5ae1b9c7ac5b", level:"mid", added:"2026-08-26", posted:"2026-07-15" }
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
    totalRoles:8,
    notes:"Payments at planet scale. Distributed systems, idempotency, money.",
    jobs:[
      { title:"Data Analyst, Financial Data Engineering", url:"https://stripe.com/jobs/search?gh_jid=8070572", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Finance & Strategy Analyst", url:"https://stripe.com/jobs/search?gh_jid=7985368", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Strategy and Operations Lead, Deal Pricing", url:"https://stripe.com/jobs/search?gh_jid=8044391", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Business Partner Analyst", url:"https://stripe.com/jobs/search?gh_jid=8079783", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Business Value Scale Analyst", url:"https://stripe.com/jobs/search?gh_jid=8097047", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"GTM Strategy & Operations Analyst", url:"https://stripe.com/jobs/search?gh_jid=8145119", level:"mid", added:"2026-08-26", posted:"2026-08-20" },
      { title:"Sales Strategy & Operations Business Partner", url:"https://stripe.com/jobs/search?gh_jid=8089882", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Treasury Finance AI and Quantitative Analytics, Americas", url:"https://stripe.com/jobs/search?gh_jid=8079132", level:"mid", added:"2026-08-26", posted:"2026-08-18" }
    ] },
  { id:"ramp", name:"Ramp", vertical:"fintech",
    sub:"Corporate cards + finance ops",
    stage:"Series E", raised:"$1.3B", lead:"Founders Fund",
    badges:["Founders Fund","Sequoia","Stripe"],
    totalRoles:1,
    notes:"Ledger, fraud, integrations at scale. High autonomy bar.",
    jobs:[
      { title:"Business Operations Lead, Compensation & Equity", url:"https://jobs.ashbyhq.com/ramp/ea9f6e2d-8981-417a-ac96-87d421ccbf4c", level:"mid", added:"2026-08-26", posted:"2026-07-28" }
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
    totalRoles:2,
    notes:"Bank-data connectivity infra. Integration breadth, reliability.",
    jobs:[
      { title:"GTM Strategy & Operations", url:"https://jobs.ashbyhq.com/plaid/33379e81-e111-4bb8-8c6b-9e64d4fa51c5", level:"mid", added:"2026-08-26", posted:"2026-06-05" },
      { title:"Business Operations", url:"https://jobs.ashbyhq.com/plaid/bf4450b7-6ed5-49ec-a2ad-a1e0ffbcbe50", level:"mid", added:"2026-08-26", posted:"2026-07-27" }
    ] },
  { id:"gemini", name:"Gemini", vertical:"fintech",
    sub:"Crypto exchange + prediction markets (NASDAQ: GEMI)",
    stage:"Public", raised:"$400M", lead:"Morgan Creek",
    badges:["Morgan Creek"],
    totalRoles:1,
    notes:"Public co (GEMI) since Sept 2025. Winklevoss-led; US-focused after intl exit. Exchange + CFTC-regulated derivatives.",
    jobs:[
      { title:"Analyst, Compliance (Investigations)", url:"https://boards.greenhouse.io/embed/job_app?for=gemini&token=8065112&gh_jid=8065112", level:"mid", added:"2026-08-26", posted:"2026-07-30" }
    ] },
  { id:"datadog", name:"Datadog", vertical:"devtools",
    sub:"Cloud monitoring (NASDAQ)",
    stage:"Public", raised:"$148M pre-IPO", lead:"Index",
    badges:["NASDAQ","Index","OpenView"],
    totalRoles:4,
    notes:"Public co. Time-series infra, alerting, observability depth.",
    jobs:[
      { title:"Deal Desk Analyst - NYC", url:"https://careers.datadoghq.com/detail/7993638/?gh_jid=7993638", level:"mid", added:"2026-08-26", posted:"2026-08-24" },
      { title:"FP&A Analyst - Data Insights", url:"https://careers.datadoghq.com/detail/7964916/?gh_jid=7964916", level:"mid", added:"2026-08-26", posted:"2026-08-24" },
      { title:"Sales Revenue Analyst - NYC", url:"https://careers.datadoghq.com/detail/8132294/?gh_jid=8132294", level:"mid", added:"2026-08-26", posted:"2026-08-24" },
      { title:"GTM Strategy and Operations Associate", url:"https://careers.datadoghq.com/detail/7843331/?gh_jid=7843331", level:"entry", added:"2026-08-28", posted:"2026-08-27" }
    ] },
  { id:"oscar", name:"Oscar Health", vertical:"health",
    sub:"Tech-driven health insurance (NYSE)",
    stage:"Public", raised:"$1.6B pre-IPO", lead:"Founders Fund",
    badges:["NYSE","Founders Fund","General Catalyst"],
    totalRoles:3,
    notes:"Public co. Insurance platform with member-facing tech.",
    jobs:[
      { title:"Analyst, Regulatory Affairs", url:"https://www.hioscar.com/careers/7983436?gh_jid=7983436", level:"mid", added:"2026-08-26", posted:"2026-07-28" },
      { title:"Associate, Strategic Finance (FP&A)", url:"https://www.hioscar.com/careers/8129152?gh_jid=8129152", level:"entry", added:"2026-08-26", posted:"2026-08-24" },
      { title:"Workday Reporting & Analytics Lead, People Analytics", url:"https://www.hioscar.com/careers/8056691?gh_jid=8056691", level:"mid", added:"2026-08-28", posted:"2026-08-27" }
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
    totalRoles:3,
    notes:"Public co. Mobility platform \u2014 matching, payments, mapping.",
    jobs:[
      { title:"Data Analyst - Global Growth Luxury Strategy", url:"https://app.careerpuck.com/job-board/lyft/job/8514400002?gh_jid=8514400002", level:"mid", added:"2026-08-26", posted:"2026-08-13" },
      { title:"Data Analyst, Operations Planning", url:"https://app.careerpuck.com/job-board/lyft/job/8568512002?gh_jid=8568512002", level:"mid", added:"2026-08-26", posted:"2026-07-06" },
      { title:"Data Analyst, Go-To-Market Sales Insights", url:"https://app.careerpuck.com/job-board/lyft/job/8697679002?gh_jid=8697679002", level:"mid", added:"2026-08-26", posted:"2026-08-11" }
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
      { title:"Indirect Procurement Specialist", url:"https://www.janestreet.com/join-jane-street/apply/8442082002?gh_jid=8442082002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"IT Logistics and Warehouse Specialist", url:"https://www.janestreet.com/join-jane-street/apply/8589762002?gh_jid=8589762002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Oil and Refined Products Analyst/Trader", url:"https://www.janestreet.com/join-jane-street/apply/8413554002?gh_jid=8413554002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Power Analyst/Trader", url:"https://www.janestreet.com/join-jane-street/apply/7950706002?gh_jid=7950706002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Procurement Specialist, IT Hardware", url:"https://www.janestreet.com/join-jane-street/apply/7419820002?gh_jid=7419820002", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Procurement Specialist, IT Services", url:"https://www.janestreet.com/join-jane-street/apply/7419948002?gh_jid=7419948002", level:"mid", added:"2026-08-26", posted:"2026-07-30" }
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
      { title:"Systems Analyst, Workday HCM/Payroll", url:"https://boards.greenhouse.io/point72/jobs/8128613002?gh_jid=8128613002", level:"mid", added:"2026-08-26", posted:"2026-08-21" }
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
    totalRoles:5,
    notes:"Legal AI for top law firms; $11B valuation (Mar 2026). FDE-style deploys, document workflows, reasoning eval.",
    jobs:[
      { title:"Analyst, Customer Trust", url:"https://jobs.ashbyhq.com/harvey/1cf585c3-27e2-4813-ade9-dc8c53c2d5b0", level:"mid", added:"2026-08-26", posted:"2026-07-22" },
      { title:"IT Operations Analyst", url:"https://jobs.ashbyhq.com/harvey/203e2d3b-6aeb-4d13-8e2f-62f7526658df", level:"mid", added:"2026-08-26", posted:"2026-06-23" },
      { title:"Support Operations Data Analyst", url:"https://jobs.ashbyhq.com/harvey/f8857e81-4062-4669-a7e3-7b73b114979b", level:"mid", added:"2026-08-26", posted:"2026-06-15" },
      { title:"Technology Enablement Analyst", url:"https://jobs.ashbyhq.com/harvey/5960be42-443f-42f2-a771-266810e3d263", level:"mid", added:"2026-08-26", posted:"2026-07-23" },
      { title:"IT Operations Analyst", url:"https://jobs.ashbyhq.com/harvey/88905094-1b46-41e1-a88a-cae239431b04", level:"mid", added:"2026-08-26", posted:"2026-08-13" }
    ] },
  { id:"coreweave", name:"CoreWeave", vertical:"infra",
    sub:"Specialized GPU cloud (NASDAQ: CRWV)",
    stage:"Public", raised:"$1.5B IPO ($14B+ pre-IPO)", lead:"NASDAQ",
    badges:["NASDAQ","Coatue","NVIDIA","Blackstone"],
    totalRoles:3,
    notes:"GPU cloud powering AI labs; IPO\\'d Mar 2025. Bare-metal infra + scheduling.",
    jobs:[
      { title:"Finance Analyst, Capacity Finance", url:"https://coreweave.com/careers/job?4692714006&board=coreweave&gh_jid=4692714006", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Operations Enablement Analyst, Data Center Operations", url:"https://coreweave.com/careers/job?4698084006&board=coreweave&gh_jid=4698084006", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Data Center Operations Cost Analyst", url:"https://coreweave.com/careers/job?4702795006&board=coreweave&gh_jid=4702795006", level:"mid", added:"2026-08-26", posted:"2026-08-21" }
    ] },
  { id:"blackrock", name:"BlackRock", vertical:"fintech",
    sub:"World's largest asset manager (NYSE: BLK)",
    stage:"Public", raised:"$2.6B pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:6,
    notes:"NYC HQ. Aladdin platform \u2014 risk + portfolio mgmt. Heavy systems / data eng.",
    jobs:[
      { title:"Associate, Business Intelligence Developer/Business Analyst - PFS", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Business-Intelligence-Developer-Business-Analyst---PFS_R265901", level:"entry", added:"2026-08-26" },
      { title:"Associate, Liquid Credit Portfolio Analytics & Reporting, PFS - New York", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Associate--Liquid-Credit-Portfolio-Analytics---Reporting--PFS---New-York_R265407", level:"entry", added:"2026-08-26" },
      { title:"AI, Data Analytics/Data Management/Data Science – Aladdin", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/AI--Data-Analytics-Data-Management-Data-Science---Aladdin_R265427", level:"mid", added:"2026-08-26" },
      { title:"Analyst, Portfolio Analytics & Reporting Private Credit", url:"https://blackrock.wd1.myworkdayjobs.com/en-US/BlackRock_Professional/job/New-York-NY/Analyst--Portfolio-Analytics---Reporting-Private-Credit_R265361", level:"mid", added:"2026-08-26" },
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
      { title:"Quantitative UX Research Analyst II", url:"https://etsy.wd5.myworkdayjobs.com/en-US/Etsy_Careers/job/Brooklyn-New-York/Quantitative-UX-Research-Analyst-II_JR5713-2", level:"mid", added:"2026-08-26" },
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
      { title:"Associate, Sales Operations", url:"https://job-boards.greenhouse.io/vestwell/jobs/7800389003", level:"entry", added:"2026-08-26", posted:"2026-08-14" }
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
      { title:"Marketing Science Strategic Analyst, Marketing Science and Technology", url:"https://jobs.smartrecruiters.com/LinkedIn3/744000143176479", level:"mid", added:"2026-08-26", posted:"2026-08-12" }
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
    totalRoles:73,
    notes:"NYC gov. Sr SWE GeoSupport, .NET, City Environmental Quality Review roles.",
    jobs:[
      { title:"Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014163861", level:"mid", added:"2026-08-26", posted:"2026-07-18" },
      { title:"Analyst -  Transportation", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014047616", level:"mid", added:"2026-08-26", posted:"2026-07-11" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014264196", level:"mid", added:"2026-08-26", posted:"2026-07-24" },
      { title:"Analyst, Procurement Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014218196", level:"mid", added:"2026-08-26", posted:"2026-07-22" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014144071", level:"mid", added:"2026-08-26", posted:"2026-07-17" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014047286", level:"mid", added:"2026-08-26", posted:"2026-07-11" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013315337", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013314887", level:"mid", added:"2026-08-26", posted:"2026-05-27" },
      { title:"Data & Metrics Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013851921", level:"mid", added:"2026-08-26", posted:"2026-06-30" },
      { title:"Research Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014025676", level:"mid", added:"2026-08-26", posted:"2026-07-10" },
      { title:"Systems Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014217241", level:"mid", added:"2026-08-26", posted:"2026-07-22" },
      { title:"Timekeeping Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990013899124", level:"mid", added:"2026-08-26", posted:"2026-07-02" },
      { title:"Data Content Analyst I", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014421941", level:"entry", added:"2026-08-26", posted:"2026-08-04" },
      { title:"Junior Project Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014641716", level:"entry", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014466771", level:"mid", added:"2026-08-26", posted:"2026-08-06" },
      { title:"Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014466886", level:"mid", added:"2026-08-26", posted:"2026-08-06" },
      { title:"Analyst -  Property and Aggregate Revenue", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283241", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - Administration & Process", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283416", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - DOHMH", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014532571", level:"mid", added:"2026-08-26", posted:"2026-08-11" },
      { title:"Analyst - Project Development and Management", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283406", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Analyst - Sandy Grant Management & Insurance", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014736471", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Analyst - Sustainability Policy", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014532596", level:"mid", added:"2026-08-26", posted:"2026-08-11" },
      { title:"Analyst - Technology Budget & Managementn", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014283151", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"APU Payment Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014578466", level:"mid", added:"2026-08-26", posted:"2026-08-13" },
      { title:"Assistant Transportation Analyst – TEP", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863806", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Assistant Transportation Analyst – TEP", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863796", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014736396", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014445616", level:"mid", added:"2026-08-26", posted:"2026-08-05" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014380306", level:"mid", added:"2026-08-26", posted:"2026-07-31" },
      { title:"Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014311716", level:"mid", added:"2026-08-26", posted:"2026-07-28" },
      { title:"Budget Research Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014614266", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014398866", level:"mid", added:"2026-08-26", posted:"2026-08-01" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014831126", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"College Aide - Procurement and Contracts (2 positions)", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014399136", level:"mid", added:"2026-08-26", posted:"2026-08-01" },
      { title:"Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014506446", level:"mid", added:"2026-08-26", posted:"2026-08-08" },
      { title:"Data Analytics Specialist", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014614031", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Data Content Analyst II", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014422006", level:"mid", added:"2026-08-26", posted:"2026-08-04" },
      { title:"Data Engagement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863676", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"EEO Program Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014642051", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"EMPLOYMENT PROGRAM PAYMENT ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014380406", level:"mid", added:"2026-08-26", posted:"2026-07-31" },
      { title:"EPMO DATA  ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863086", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Fleet & Sign Procurement Coordinator", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014736756", level:"mid", added:"2026-08-26", posted:"2026-08-21" },
      { title:"Forensic Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014555616", level:"mid", added:"2026-08-26", posted:"2026-08-12" },
      { title:"Grant Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863659", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Grant Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863666", level:"mid", added:"2026-08-26", posted:"2026-08-26" },
      { title:"Grant Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014830766", level:"mid", added:"2026-08-26", posted:"2026-08-25" },
      { title:"HEALTH AND SAFETY ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014282696", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Mainframe Programmer Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014282592", level:"mid", added:"2026-08-26", posted:"2026-07-25" },
      { title:"Management Audit and Data Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014466966", level:"mid", added:"2026-08-26", posted:"2026-08-06" },
      { title:"NYCAPS Business Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014421996", level:"mid", added:"2026-08-26", posted:"2026-08-04" },
      { title:"PEOPLE DATA & STRATEGY ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014667491", level:"mid", added:"2026-08-26", posted:"2026-08-19" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014668086", level:"mid", added:"2026-08-26", posted:"2026-08-19" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613956", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613931", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613936", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613831", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014578316", level:"mid", added:"2026-08-26", posted:"2026-08-13" },
      { title:"Procurement Analyst Level I NM", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014696151", level:"mid", added:"2026-08-26", posted:"2026-08-20" },
      { title:"Procurement Generalist", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014667646", level:"mid", added:"2026-08-26", posted:"2026-08-19" },
      { title:"Records Analyst-Trainer", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014358931", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"Strategic Performance Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014613821", level:"mid", added:"2026-08-26", posted:"2026-08-15" },
      { title:"SYSTEMS PROGRAMMER ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014358276", level:"mid", added:"2026-08-26", posted:"2026-07-30" },
      { title:"TESTER/ANALYST", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014380461", level:"mid", added:"2026-08-26", posted:"2026-07-31" },
      { title:"Transit Planner, Bus Priority Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014641721", level:"mid", added:"2026-08-26", posted:"2026-08-18" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014888956", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Analyst, Service Desk Operations", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014888946", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014864036", level:"mid", added:"2026-08-27", posted:"2026-08-26" },
      { title:"Capital Budget Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014863911", level:"mid", added:"2026-08-27", posted:"2026-08-26" },
      { title:"Counter Terrorism Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014864116", level:"mid", added:"2026-08-27", posted:"2026-08-26" },
      { title:"Risk and Integrity Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014889332", level:"mid", added:"2026-08-27", posted:"2026-08-27" },
      { title:"Operations Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014914568", level:"mid", added:"2026-08-28", posted:"2026-08-28" },
      { title:"Procurement Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014914526", level:"mid", added:"2026-08-28", posted:"2026-08-28" },
      { title:"Transit Planner, Bus Priority Analyst", url:"https://jobs.smartrecruiters.com/CityOfNewYork/3743990014914671", level:"mid", added:"2026-08-28", posted:"2026-08-28" }
    ] },
  { id:"palantir", name:"Palantir", vertical:"saas",
    sub:"Elite FDE consultancy (NYSE: PLTR)",
    stage:"Public", raised:"(NYSE: PLTR)", lead:"NYSE",
    badges:["NYSE"],
    totalRoles:3,
    notes:"NYC major eng hub. Original FDE model. 33 NYC eng roles today.",
    jobs:[
      { title:"Operations Analyst - US Government Security", url:"https://jobs.lever.co/palantir/2df67493-ffb3-4b34-bf3b-88b6750c3ea7", level:"mid", added:"2026-08-26", posted:"2026-06-09" },
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
  { id:"sonymusic", name:"Sony Music Entertainment", vertical:"media",
    sub:"Global record label (Sony subsidiary)",
    stage:"Public", raised:"(Sony subsidiary)", lead:"Sony",
    badges:["Sony"],
    totalRoles:1,
    notes:"NYC HQ. Includes The Orchard, Alamo, Columbia. 3 NYC eng today (Data Privacy, Emerging Tech, Sr PM D2C).",
    jobs:[
      { title:"Data Strategy & Analytics Rotation Trainee 2026-2027", url:"https://job-boards.greenhouse.io/sonymusicentertainment/jobs/8654146002", level:"mid", added:"2026-08-26", posted:"2026-08-26" }
    ] },
  { id:"pinterest", name:"Pinterest", vertical:"consumer",
    sub:"Visual discovery (NYSE: PINS)",
    stage:"Public", raised:"$1.5B pre-IPO", lead:"Bessemer",
    badges:["NYSE","Bessemer","Andreessen Horowitz"],
    totalRoles:2,
    notes:"SF HQ, NYC office. Analyst + product analytics roles across ads + monetization.",
    jobs:[
      { title:"Sales Strategy & Operations Lead, Agency Deal Ops", url:"https://www.pinterestcareers.com/jobs/?gh_jid=7678715", level:"mid", added:"2026-08-26", posted:"2026-08-20" },
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
  { id:"disney", name:"The Walt Disney Company", vertical:"media",
    sub:"Streaming + studios + parks (NYSE: DIS)",
    stage:"Public", raised:"$1B+ pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:1,
    notes:"NYC tech: ABC News, Hulu, ESPN+, Disney+. Streaming infra + content systems.",
    jobs:[
      { title:"Analyst, Subscriber Planning (Project Hire)", url:"https://disney.wd5.myworkdayjobs.com/en-US/disneycareer/job/New-York-CA-USA/Senior-Analyst--Subscriber-Planning--PH-_10152840", level:"mid", added:"2026-08-28" }
    ] },
  { id:"warp", name:"Warp", vertical:"ai",
    sub:"AI-native terminal",
    stage:"Series B", raised:"$73M", lead:"Sequoia",
    badges:["Sequoia","GV"],
    totalRoles:1,
    notes:"Reimagined terminal with AI. Heavy on developer experience, latency, prompt design for code.",
    jobs:[
      { title:"Revenue Operations Specialist", url:"https://jobs.ashbyhq.com/warp/6b4c450d-ab42-426e-afef-32396b9560a6", level:"mid", added:"2026-08-28", posted:"2026-08-27" }
    ] }
];

/* ---------- COMPANY DOMAINS (for Clearbit public logo CDN) ---------- */
const COMPANY_DOMAINS = {
  anthropic:"anthropic.com", baseten:"baseten.co", box:"box.com",
  brex:"brex.com", capco:"capco.com", "cockroach-labs":"cockroachlabs.com",
  "codes-health":"codeshealth.co", cohere:"cohere.com", crusoe:"crusoe.ai",
  cursor:"cursor.com", dashlane:"dashlane.com", datadog:"datadoghq.com",
  elevenlabs:"elevenlabs.io", equinox:"equinox.com", etsy:"etsy.com",
  fanduel:"fanduel.com", figma:"figma.com", flexport:"flexport.com",
  "flow-traders":"flowtraders.com", gemini:"gemini.com", gusto:"gusto.com",
  hang:"hang.xyz", hopper:"hopper.com", "jane-street":"janestreet.com",
  justworks:"justworks.com", kalshi:"kalshi.com", linkedin:"linkedin.com",
  lovable:"lovable.dev", lyft:"lyft.com", metropolis:"metropolis.io",
  middesk:"middesk.com", modal:"modal.com", "nyc-gov":"nyc.gov",
  openai:"openai.com", oscar:"hioscar.com", palantir:"palantir.com",
  partiful:"partiful.com", perplexity:"perplexity.ai", pinterest:"pinterest.com",
  plaid:"plaid.com", point72:"point72.com", polymarket:"polymarket.com",
  ramp:"ramp.com", reddit:"reddit.com", ridgeline:"ridgelineapps.com",
  rilla:"rillavoice.com", scaleai:"scale.com", sisense:"sisense.com",
  sofi:"sofi.com", sonder:"sonder.com", sonymusic:"sonymusic.com",
  spotify:"spotify.com", stripe:"stripe.com", taboola:"taboola.com",
  "the-trade-desk":"thetradedesk.com", turing:"turing.com", vercel:"vercel.com",
  vestwell:"vestwell.com", warp:"warp.dev", zocdoc:"zocdoc.com",
};

window.DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
