// cody — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh cody

/* ---------- COMPANIES ----------
 * NYC board for profile 'cody'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-09-08) and matched the
 * profile's title + location filters (profiles/cody.json).
 * URLs link directly to the posting (not aggregators).
 *
 * Regenerate with:
 *   python3 scripts/refresh-companies.py --profile cody
 * or run the whole pipeline:
 *   scripts/pipeline.sh cody
 *
 * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],
 *           totalRoles, notes, jobs[{ title, url, level, posted, added }] }
 *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).
 */
const COMPANIES_VERIFIED_AT = '2026-09-08';
const COMPANIES = [
  { id:"affirm", name:"Affirm", vertical:"fintech",
    sub:"BNPL / consumer credit",
    stage:"Public", raised:"(NASDAQ: AFRM)", lead:"NASDAQ",
    badges:["NASDAQ"],
    totalRoles:1,
    notes:"NYC office. Consumer fintech infra.",
    jobs:[
      { title:"Administrative Assistant IV", url:"https://job-boards.greenhouse.io/affirm/jobs/7850544003", level:"entry", pay:{"min":18.0,"max":26.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"alphasense", name:"AlphaSense", vertical:"ai",
    sub:"AI market intelligence",
    stage:"Series F", raised:"$650M+", lead:"BDT",
    badges:["BDT", "Viking", "Goldman"],
    totalRoles:1,
    notes:"NYC enterprise AI search over financial docs. Retrieval + integrations.",
    jobs:[
      { title:"Marketing Operations Specialist", url:"https://job-boards.greenhouse.io/alphasense/jobs/8742424002", level:"entry", pay:{"min":68000.0,"max":85000.0,"interval":"year"}, paySource:"posted", years:1 }
    ] },
  { id:"amplify", name:"Amplify", vertical:"consumer",
    sub:"K-12 curriculum (NYC)",
    stage:"Private", raised:"$200M+", lead:"\u2014",
    badges:["EdTech"],
    totalRoles:1,
    notes:"NYC edtech publisher with a real in-house illustration pipeline.",
    jobs:[
      { title:"Billing Operations Specialist", url:"https://jobs.ashbyhq.com/amplify/60159d35-fed5-444d-ae93-b86fe37e51a2", level:"entry", pay:{"min":60000.0,"max":68000.0,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"camber", name:"Camber", vertical:"ai",
    sub:"AI medical billing + RCM",
    stage:"Series A", raised:"$30M", lead:"Andreessen Horowitz",
    badges:["a16z", "Foundry"],
    totalRoles:2,
    notes:"AI revenue-cycle / claims-processing platform for healthcare clinics. Claims automation, denial prediction; behavioral-health roots, expanding verticals.",
    jobs:[
      { title:"ERA/EFT Enrollment Specialist", url:"https://jobs.ashbyhq.com/camber/0d507013-a20e-4e9b-874a-4519c58bd371", level:"entry", pay:{"min":18.0,"max":20.0,"interval":"hour"}, paySource:"posted" },
      { title:"Medical Billing Specialist (ABA)", url:"https://jobs.ashbyhq.com/camber/2249febd-aeec-4de6-8b10-09922b8ab631", level:"entry", pay:{"min":20.0,"max":22.0,"interval":"hour"}, paySource:"posted" }
    ] },
  { id:"databento", name:"Databento", vertical:"fintech",
    sub:"Market data infra for quants",
    stage:"Series A", raised:"$34M", lead:"Point72 Ventures",
    badges:["Point72", "USV"],
    totalRoles:1,
    notes:"NYC office. Low-latency financial data APIs.",
    jobs:[
      { title:"Billing Support Specialist", url:"https://job-boards.greenhouse.io/databento/jobs/8167433", level:"entry", pay:{"min":18.0,"max":26.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"deepgram", name:"Deepgram", vertical:"ai",
    sub:"Speech AI / STT",
    stage:"Series C", raised:"$86M", lead:"Madrona",
    badges:["Madrona", "Tiger", "Wing"],
    totalRoles:1,
    notes:"Real-time speech recognition. Streaming protocols, audio pipelines, AI eval.",
    jobs:[
      { title:"Executive Assistant, Marketing", url:"https://jobs.ashbyhq.com/deepgram/b74b4d59-5b3e-46ac-9928-a5c8f6b7d321", level:"entry", pay:{"min":127000.0,"max":160000.0,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"drw", name:"DRW", vertical:"fintech",
    sub:"Principal trading firm",
    stage:"Private", raised:"Self-funded", lead:"\u2014",
    badges:["Privately held"],
    totalRoles:1,
    notes:"NYC/Chicago quant trading. Low-latency systems, market data, analytics \u2014 C++/Python heavy.",
    jobs:[
      { title:"Crypto Wallet Operations Specialist", url:"https://job-boards.greenhouse.io/drweng/jobs/7983658", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"ethoslife", name:"Ethos Life", vertical:"insurance",
    sub:"Ethos Life",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Insurance operations \u2014 claims intake, policy servicing and document processing.",
    jobs:[
      { title:"People Operations Specialist (Temporary)", url:"https://job-boards.greenhouse.io/ethoslife/jobs/8709322002", level:"entry", pay:{"min":65000.0,"max":114000.0,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"hasbro", name:"Hasbro", vertical:"consumer",
    sub:"Wizards of the Coast / D&D / Magic",
    stage:"Public", raised:"NASDAQ: HAS", lead:"\u2014",
    badges:["NASDAQ: HAS"],
    totalRoles:1,
    notes:"WotC concept + card art is one of the largest illustration commissions pipelines in the industry.",
    jobs:[
      { title:"Content Specialist - D&D Beyond (Contract/Temporary)", url:"https://job-boards.greenhouse.io/hasbro/jobs/4342863009", level:"entry", pay:{"min":35.0,"max":40.0,"interval":"hour"}, paySource:"posted" }
    ] },
  { id:"inovalon", name:"Inovalon", vertical:"health",
    sub:"Inovalon",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Healthcare revenue-cycle work \u2014 claims, coding and records processing at volume.",
    jobs:[
      { title:"Executive Assistant to the CFO", url:"https://www.inovalon.com/careers/job/?gh_jid=7986383003", level:"entry", pay:{"min":36.92,"max":55.28,"interval":"hour"}, paySource:"posted" }
    ] },
  { id:"insurify", name:"Insurify", vertical:"insurance",
    sub:"Insurify",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Insurance operations \u2014 claims intake, policy servicing and document processing.",
    jobs:[
      { title:"Customer Service Representative", url:"https://job-boards.greenhouse.io/insurify/jobs/5976839004", level:"entry", pay:{"min":17.0,"max":25.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"junction", name:"Junction Bioscience", vertical:"health",
    sub:"AI hypothesis engine for molecular discovery",
    stage:"Seed", raised:"YC", lead:"Y Combinator",
    badges:["YC"],
    totalRoles:1,
    notes:"YC W24. NYC + wet lab.",
    jobs:[
      { title:"Operations Associate (Test Kit)", url:"https://jobs.ashbyhq.com/junction/22a94673-4605-4e0e-8979-3b81a59f4e67", level:"entry", pay:{"min":80000.0,"max":95000.0,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"maven-clinic", name:"Maven Clinic", vertical:"health",
    sub:"Family-care telehealth",
    stage:"Series F", raised:"$425M", lead:"General Catalyst",
    badges:["GC", "Lux", "Sequoia"],
    totalRoles:1,
    notes:"Women's + family health network. Provider matching, telehealth.",
    jobs:[
      { title:"Payment Operations Associate", url:"https://job-boards.greenhouse.io/mavenclinic/jobs/8777165002", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate", years:2 }
    ] },
  { id:"mercury", name:"Mercury", vertical:"fintech",
    sub:"Banking for startups",
    stage:"Series C", raised:"$152M", lead:"CRV",
    badges:["CRV", "a16z", "Coatue"],
    totalRoles:2,
    notes:"Banking UX + ops. Compliance, money movement.",
    jobs:[
      { title:"Customer Support Specialist", url:"https://job-boards.greenhouse.io/mercury/jobs/6163570004", level:"entry", pay:{"min":48100.0,"max":58400.0,"interval":"year"}, paySource:"posted", years:2 },
      { title:"Payroll Operations Specialist", url:"https://job-boards.greenhouse.io/mercury/jobs/6122010004", level:"entry", pay:{"min":85500.0,"max":96200.0,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"runway", name:"Runway", vertical:"ai",
    sub:"Generative video / film AI",
    stage:"Series D", raised:"$536M", lead:"General Atlantic",
    badges:["General Atlantic", "Founders Fund", "Coatue"],
    totalRoles:3,
    notes:"Generative video. Heavy multimodal eval, long-running GPU jobs, customer-facing studio UX.",
    jobs:[
      { title:"Consumer Support Specialist - US", url:"https://jobs.ashbyhq.com/runway-ml/9f6d216d-2f54-4970-84d7-43ab0a2b4852", level:"entry", pay:{"min":75000.0,"max":90000.0,"interval":"year"}, paySource:"posted" },
      { title:"Creative Support Specialist, Enterprise", url:"https://jobs.ashbyhq.com/runway-ml/f6e8f3fa-0440-484e-92f7-6ae2e67f1d07", level:"entry", pay:{"min":100000.0,"max":145000.0,"interval":"year"}, paySource:"posted" },
      { title:"Executive Assistant to Executive Team", url:"https://jobs.ashbyhq.com/runway-ml/1c757b83-d669-4100-9ccd-5d50d7a68986", level:"entry", pay:{"min":100000.0,"max":150000.0,"interval":"year"}, paySource:"posted" }
    ] },
  { id:"rushstreetinteractive", name:"Rush Street Interactive", vertical:"igaming",
    sub:"BetRivers casino + sportsbook",
    stage:"Public", raised:"NYSE: RSI", lead:"\u2014",
    badges:["NYSE: RSI"],
    totalRoles:1,
    notes:"Online casino operator; in-house game studio work sits alongside the sportsbook.",
    jobs:[
      { title:"Omnichannel Operations Specialist", url:"https://job-boards.greenhouse.io/rushstreetinteractive/jobs/6122813004", level:"entry", pay:{"min":55000.0,"max":75000.0,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"smarterdx", name:"SmarterDx", vertical:"health",
    sub:"SmarterDx",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Healthcare revenue-cycle work \u2014 claims, coding and records processing at volume.",
    jobs:[
      { title:"Clinical Operations Specialist", url:"https://job-boards.greenhouse.io/smarterdx/jobs/4168611007", level:"entry", pay:{"min":100000.0,"max":125000.0,"interval":"year"}, paySource:"posted", years:2 }
    ] },
  { id:"squarespace", name:"Squarespace", vertical:"saas",
    sub:"Website builder + payments",
    stage:"Take-private", raised:"$278M pre-IPO", lead:"Permira",
    badges:["Permira", "General Atlantic"],
    totalRoles:1,
    notes:"Hosting, builder, payments at scale.",
    jobs:[
      { title:"Customer Support Associate (Remote)", url:"https://www.squarespace.com/about/careers?gh_jid=8139231", level:"entry", pay:{"min":17.0,"max":25.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"stripe", name:"Stripe", vertical:"fintech",
    sub:"Payments + financial infra",
    stage:"Late stage", raised:"$8.7B", lead:"Sequoia",
    badges:["Sequoia", "a16z", "General Catalyst"],
    totalRoles:1,
    notes:"Payments at planet scale. Distributed systems, idempotency, money.",
    jobs:[
      { title:"Global Filing Specialist, Tax", url:"https://stripe.com/jobs/search?gh_jid=7997545", level:"entry", pay:{"min":17.0,"max":25.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"talkspace", name:"Talkspace", vertical:"health",
    sub:"Online therapy (NASDAQ)",
    stage:"Public", raised:"$110M pre-IPO", lead:"Norwest",
    badges:["NASDAQ", "Norwest"],
    totalRoles:1,
    notes:"Telehealth platform \u2014 therapy networks, intake, claims.",
    jobs:[
      { title:"Network Strategic Operations Coordinator", url:"https://www.talkspace.com/careers/job?gh_jid=6162085004", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate" }
    ] },
  { id:"wealthfront", name:"Wealthfront", vertical:"fintech",
    sub:"Robo-advisor + cash mgmt (NASDAQ: WLTH)",
    stage:"Public", raised:"$205M", lead:"Greylock",
    badges:["Greylock", "Index"],
    totalRoles:1,
    notes:"Public co since Dec 2025. Robo-advisor + banking at $88B+ AUM. Algorithms + compliance + UX.",
    jobs:[
      { title:"Mortgage Operations - Loan Processor", url:"https://jobs.lever.co/wealthfront/7b2730f5-dd6e-4458-b42f-c8d8937c0e25", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate" }
    ] },
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  runway:'runwayml.com', deepgram:'deepgram.com', stripe:'stripe.com',
  mercury:'mercury.com', squarespace:'squarespace.com', talkspace:'talkspace.com',
  'maven-clinic':'mavenclinic.com', wealthfront:'wealthfront.com', camber:'camber.com',
  drw:'drw.com', databento:'databento.com', affirm:'affirm.com',
  junction:'junction.bio', amplify:'amplify.com', hasbro:'hasbro.com',
  rushstreetinteractive:'rushstreetinteractive.com',
};

window.CODY_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
