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
  { id:"aircall", name:"Aircall", vertical:"saas",
    sub:"Aircall",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:2,
    notes:"Customer-support software; its own support and operations queues hire at entry level.",
    jobs:[
      { title:"Billing Specialist", url:"https://jobs.lever.co/aircall/f2454ab5-2610-4a39-8d53-ddf8a0198188", level:"entry", pay:{"min":18.0,"max":26.0,"interval":"hour"}, paySource:"estimate", summary:"Within our Finance team, the Billing team manages incoming billing and payment-related inquiries." },
      { title:"Number Operations Specialist", url:"https://jobs.lever.co/aircall/79c2bd37-9a22-4a97-8376-bcf50a5a576d", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate", summary:"Aircall is a unicorn, AI-powered customer communications platform used by 22,000+ companies worldwide to drive revenue, resolve issues faster, and scale customer-facing teams." }
    ] },
  { id:"camber", name:"Camber", vertical:"ai",
    sub:"AI medical billing + RCM",
    stage:"Series A", raised:"$30M", lead:"Andreessen Horowitz",
    badges:["a16z", "Foundry"],
    totalRoles:1,
    notes:"AI revenue-cycle / claims-processing platform for healthcare clinics. Claims automation, denial prediction; behavioral-health roots, expanding verticals.",
    jobs:[
      { title:"ERA/EFT Enrollment Specialist", url:"https://jobs.ashbyhq.com/camber/0d507013-a20e-4e9b-874a-4519c58bd371", level:"entry", pay:{"min":18.0,"max":20.0,"interval":"hour"}, paySource:"posted", summary:"We're looking for an ERA/EFT Enrollment Specialist who will be responsible for managing the automated receipt of payments and Explanations of Benefits (EOBs) from payers." }
    ] },
  { id:"deepgram", name:"Deepgram", vertical:"ai",
    sub:"Speech AI / STT",
    stage:"Series C", raised:"$86M", lead:"Madrona",
    badges:["Madrona", "Tiger", "Wing"],
    totalRoles:1,
    notes:"Real-time speech recognition. Streaming protocols, audio pipelines, AI eval.",
    jobs:[
      { title:"Executive Assistant, Marketing", url:"https://jobs.ashbyhq.com/deepgram/b74b4d59-5b3e-46ac-9928-a5c8f6b7d321", level:"entry", pay:{"min":127000.0,"max":160000.0,"interval":"year"}, paySource:"posted", summary:"COMPANY OVERVIEW Deepgram is the leading platform underpinning the emerging trillion-dollar Voice AI economy, providing real-time APIs for speech-to-text (STT), text-to-speech (TTS), and\u2026" }
    ] },
  { id:"wealthfront", name:"Wealthfront", vertical:"fintech",
    sub:"Robo-advisor + cash mgmt (NASDAQ: WLTH)",
    stage:"Public", raised:"$205M", lead:"Greylock",
    badges:["Greylock", "Index"],
    totalRoles:1,
    notes:"Public co since Dec 2025. Robo-advisor + banking at $88B+ AUM. Algorithms + compliance + UX.",
    jobs:[
      { title:"Mortgage Operations - Loan Processor", url:"https://jobs.lever.co/wealthfront/7b2730f5-dd6e-4458-b42f-c8d8937c0e25", level:"entry", pay:{"min":19.0,"max":28.0,"interval":"hour"}, paySource:"estimate", summary:"About Wealthfront Mortgage Operations (MOps) Wealthfront MOps is built around efficiency, critical problem-solving, and modernizing the lending experience." }
    ] },
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  deepgram:'deepgram.com', wealthfront:'wealthfront.com', camber:'camber.com',
};

window.CODY_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
