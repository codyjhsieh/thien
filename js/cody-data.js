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
  { id:"camber", name:"Camber", vertical:"ai",
    sub:"AI medical billing + RCM",
    stage:"Series A", raised:"$30M", lead:"Andreessen Horowitz",
    badges:["a16z","Foundry"],
    totalRoles:1,
    notes:"AI revenue-cycle / claims-processing platform for healthcare clinics. Claims automation, denial prediction; behavioral-health roots, expanding verticals.",
    jobs:[
      { title:"ERA/EFT Enrollment Specialist", url:"https://jobs.ashbyhq.com/camber/0d507013-a20e-4e9b-874a-4519c58bd371", level:"entry", added:"2026-09-08", posted:"2025-07-09", pay:{"min":18,"max":20,"interval":"hour"}, paySource:"posted", summary:"We're looking for an ERA/EFT Enrollment Specialist who will be responsible for managing the automated receipt of payments and Explanations of Benefits (EOBs) from payers." }
    ] },
  { id:"deepgram", name:"Deepgram", vertical:"ai",
    sub:"Speech AI / STT",
    stage:"Series C", raised:"$86M", lead:"Madrona",
    badges:["Madrona","Tiger","Wing"],
    totalRoles:1,
    notes:"Real-time speech recognition. Streaming protocols, audio pipelines, AI eval.",
    jobs:[
      { title:"Executive Assistant, Marketing", url:"https://jobs.ashbyhq.com/deepgram/b74b4d59-5b3e-46ac-9928-a5c8f6b7d321", level:"entry", added:"2026-09-08", posted:"2026-08-18", pay:{"min":127000,"max":160000,"interval":"year"}, paySource:"posted", summary:"COMPANY OVERVIEW Deepgram is the leading platform underpinning the emerging trillion-dollar Voice AI economy, providing real-time APIs for speech-to-text (STT), text-to-speech (TTS), and…" }
    ] },
  { id:"wealthfront", name:"Wealthfront", vertical:"fintech",
    sub:"Robo-advisor + cash mgmt (NASDAQ: WLTH)",
    stage:"Public", raised:"$205M", lead:"Greylock",
    badges:["Greylock","Index"],
    totalRoles:1,
    notes:"Public co since Dec 2025. Robo-advisor + banking at $88B+ AUM. Algorithms + compliance + UX.",
    jobs:[
      { title:"Mortgage Operations - Loan Processor", url:"https://jobs.lever.co/wealthfront/7b2730f5-dd6e-4458-b42f-c8d8937c0e25", level:"entry", added:"2026-09-08", posted:"2025-07-30", pay:{"min":19,"max":28,"interval":"hour"}, paySource:"estimate", summary:"About Wealthfront Mortgage Operations (MOps) Wealthfront MOps is built around efficiency, critical problem-solving, and modernizing the lending experience." }
    ] },
  { id:"lightspeedsystems", name:"Lightspeed Systems", vertical:"education",
    sub:"Lightspeed Systems",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Education platform \u2014 course, roster and content administration.",
    jobs:[
      { title:"Student Safety Specialist (Content Reviewer) \u2014 Part-Time / On-Call", url:"https://job-boards.greenhouse.io/lightspeedsystems/jobs/7792692003", level:"entry", added:"2026-09-08", posted:"2026-07-02", pay:{"min":16,"max":24,"interval":"hour"}, paySource:"estimate", summary:"Lightspeed’s web filtering and safety monitoring solutions utilize Artificial Intelligence, machine learning, and client input to accurately categorize and analyze internet content and…" }
    ] },
  { id:"sanabenefits", name:"Sana Benefits", vertical:"staffing",
    sub:"Sana Benefits",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"HR, payroll or employer-of-record platform \u2014 onboarding and payroll data entry.",
    jobs:[
      { title:"Claims Processor", url:"https://jobs.lever.co/sanabenefits/4ed6f9b2-a118-4413-a8e1-b9b202838730", level:"entry", added:"2026-09-08", posted:"2026-08-21", pay:{"min":43000,"max":59000,"interval":"year"}, paySource:"posted", summary:"Sana’s vision is to make healthcare easy. All of us can agree healthcare is simply too hard in the US. And our members feel that pain day in and day out." }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  camber:"camber.com", deepgram:"deepgram.com", wealthfront:"wealthfront.com",
};

window.CODY_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
