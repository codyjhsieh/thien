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
const COMPANIES_VERIFIED_AT = '2026-10-09';
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
    ] },
  { id:"alcumusgroup", name:"Alcumus Group", vertical:"climate",
    sub:"Alcumus Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Carbon accounting, EHS or commodity-data company \u2014 emissions, audit and supplier records.",
    jobs:[
      { title:"Customer Support Representative", url:"https://alcumus.pinpointhq.com/en/postings/c9054b4f-8b53-4b6f-9743-5929980a3e62", level:"entry", added:"2026-09-09", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", summary:"At Veriforce, we help companies in high-risk industries keep their people, worksites, and supply chains safe and compliant." }
    ] },
  { id:"osano", name:"Osano", vertical:"security",
    sub:"Osano",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Israeli security, privacy or analytics company \u2014 alert triage and account administration.",
    jobs:[
      { title:"Customer Experience Operations Specialist", url:"https://job-boards.greenhouse.io/osano/jobs/5418379008", level:"entry", added:"2026-09-09", posted:"2026-09-08", pay:{"min":19,"max":28,"interval":"hour"}, paySource:"estimate", summary:"As a Customer Experience Operations Specialist, you'll help improve and scale Osano's self-service customer experience by understanding how customers engage with our product, identifying…" }
    ] },
  { id:"midihealth", name:"Midi Health", vertical:"health",
    sub:"Midi Health",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Digital health or diagnostics operator \u2014 intake, records and claims work.",
    jobs:[
      { title:"Operations & Customer Support Associate, Pharmacy", url:"https://job-boards.greenhouse.io/midihealth/jobs/4668052005", level:"entry", added:"2026-09-23", posted:"2026-09-22", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", years:1, summary:"Operations & Customer Support Associate, Pharmacy: 💊📋 📍 Remote, US-Based Reports to: Operations Manager, E-Commerce The Operations & Customer Support Associate, Pharmacy will play a key…" }
    ] },
  { id:"bloomerang", name:"Bloomerang", vertical:"health",
    sub:"Bloomerang",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Health system, payer or digital-health operator \u2014 high-volume records, intake and claims work.",
    jobs:[
      { title:"Customer Support Specialist (CST/MST/PST)", url:"https://job-boards.greenhouse.io/bloomerang/jobs/4640022005", level:"entry", added:"2026-09-24", posted:"2026-09-23", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", summary:"As a Customer Support Specialist, you will provide excellent customer service and day-to-day support for all of Bloomerang’s customers by answering their Bloomerang questions via email…" }
    ] },
  { id:"medrio", name:"Medrio", vertical:"health",
    sub:"Medrio",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Payer, CRO or health-data company \u2014 claims, trial and patient-record administration.",
    jobs:[
      { title:"Technical Customer Support Representative", url:"https://job-boards.greenhouse.io/medrio/jobs/8854042002", level:"entry", added:"2026-09-29", posted:"2026-09-28", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", years:0, summary:"At Medrio, our purpose is to save 1,000,000 lives by providing clinical researchers with the software tools necessary to chase the next breakthrough in public health." }
    ] },
  { id:"openloophealth", name:"OpenLoop Health", vertical:"health",
    sub:"OpenLoop Health",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Behavioral and telehealth provider \u2014 intake, scheduling and claims work.",
    jobs:[
      { title:"Provider Support Specialist", url:"https://jobs.ashbyhq.com/openloophealth/dc044261-6879-4db0-b8ce-85697382bef0", level:"entry", added:"2026-09-29", posted:"2026-09-28", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", years:0, summary:"OpenLoop is seeking a Provider Support Specialist to join our Medical Operations team. In this role, you will answer incoming questions from our contracted provider network and make sure…" }
    ] },
  { id:"enginegroup", name:"Engine Group", vertical:"adtech",
    sub:"Engine Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Agency or digital-services firm \u2014 trafficking, reporting and account coordination.",
    jobs:[
      { title:"Executive Assistant", url:"https://job-boards.greenhouse.io/engine/jobs/8007106003", level:"entry", added:"2026-09-30", posted:"2026-09-29", pay:{"min":88400,"max":122300,"interval":"year"}, paySource:"posted", summary:"We are expanding our Senior Leadership Team and looking for a proactive, highly adaptable Executive Assistant to join our team." }
    ] },
  { id:"sitecore", name:"Sitecore", vertical:"saas",
    sub:"Sitecore",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Commerce, CMS or hosting platform \u2014 account, catalogue and support operations.",
    jobs:[
      { title:"Executive Assistant", url:"https://jobs.ashbyhq.com/sitecore/030a64b5-1f89-4ecf-9853-e7cd1693e91a", level:"entry", added:"2026-09-30", posted:"2026-09-29", pay:{"min":22,"max":34,"interval":"hour"}, paySource:"estimate", summary:"This is not a calendar-and-travel-only role. You’ll be the operational backbone for the founders - anticipating needs, creating systems, removing friction, and making sure nothing slips…" }
    ] },
  { id:"connectwise", name:"ConnectWise", vertical:"accounting",
    sub:"ConnectWise",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Tax, accounting or document-management software \u2014 ledger, filing and AP work.",
    jobs:[
      { title:"Software Support Specialist II", url:"https://job-boards.greenhouse.io/connectwise/jobs/4739286005", level:"mid", added:"2026-10-01", posted:"2026-09-30", pay:{"min":19.55,"max":28.75,"interval":"hour"}, paySource:"estimate", summary:"Provides support to partners with a high attention to detail Researches, analyzes, and documents findings May influence others within the Services & Support team through the explanation of…" }
    ] },
  { id:"handshake", name:"Handshake", vertical:"saas",
    sub:"Early-career hiring marketplace",
    stage:"Series F", raised:"$434M", lead:"Kleiner Perkins",
    badges:["Kleiner","Coatue","Valor"],
    totalRoles:1,
    notes:"NYC office. Marketplace at scale.",
    jobs:[
      { title:"Support Specialist, Contract", url:"https://jobs.ashbyhq.com/handshake/f79143ce-152a-49ac-a7f2-c99ad903cea2", level:"entry", added:"2026-10-02", posted:"2026-10-01", pay:{"min":25,"max":25,"interval":"hour"}, paySource:"posted", summary:"Handshake is looking to bring on a Support Specialist, Contractor to provide support to our employer, student, and career services users." }
    ] },
  { id:"hummingbirdregtech", name:"Hummingbird RegTech", vertical:"fintech",
    sub:"Hummingbird RegTech",
    stage:"Private", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Fintech and verification operations \u2014 document review and KYC queues.",
    jobs:[
      { title:"Support Specialist", url:"https://job-boards.greenhouse.io/hummingbirdregtech/jobs/6214398004", level:"entry", added:"2026-10-02", posted:"2026-10-01", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", summary:"Hummingbird is a remote-first, fully distributed team united by the shared mission of helping fight financial crime." }
    ] },
  { id:"accessgroup", name:"Access Group", vertical:"staffing",
    sub:"Access Group",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"HR, payroll or employer-of-record platform \u2014 onboarding and payroll data entry.",
    jobs:[
      { title:"Procurement and Contracting Administrative Specialist", url:"https://jobs.ashbyhq.com/access/2aae8214-f75c-47f0-81dd-d56ab2215698", level:"entry", added:"2026-10-06", posted:"2026-10-05", pay:{"min":18,"max":26,"interval":"hour"}, paySource:"estimate", years:0, summary:"DATA MANAGEMENT - Maintain accurate and up-to-date information across supplier accounts in Salesforce. - Update client contracting information to ensure data integrity and completeness." }
    ] },
  { id:"ro", name:"Ro", vertical:"health",
    sub:"D2C telehealth + pharmacy",
    stage:"Series E", raised:"$1B+", lead:"General Catalyst",
    badges:["General Catalyst","Founders Fund","TPG"],
    totalRoles:1,
    notes:"NYC telehealth. Care plans + fulfillment + identity.",
    jobs:[
      { title:"Seasonal, Virtual Patient Support Specialist", url:"https://jobs.lever.co/ro/ed451f08-1070-4ed2-b059-d529190cf53a", level:"entry", added:"2026-10-06", posted:"2026-09-29", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", summary:"Ro is a direct-to-patient healthcare company with a mission of helping patients achieve their health goals by delivering the easiest, most effective care possible." }
    ] },
  { id:"bazaarvoice", name:"Bazaarvoice", vertical:"hospitality",
    sub:"Bazaarvoice",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Food service or restaurant technology \u2014 order, menu and vendor data.",
    jobs:[
      { title:"Content Moderator, Bilingual English/Spanish", url:"https://jobs.lever.co/bazaarvoice/6f6bad0a-07c4-48e2-940a-60c4f2e5e7df", level:"entry", added:"2026-10-08", posted:"2025-05-27", pay:{"min":16,"max":18,"interval":"hour"}, paySource:"posted", summary:"About Bazaarvoice At Bazaarvoice, we create smart shopping experiences. Through our expansive global network, product-passionate community & enterprise technology, we connect thousands of…" }
    ] },
  { id:"vanta", name:"Vanta", vertical:"security",
    sub:"Vanta",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Compliance, security-training or executive-search firm \u2014 evidence, case and candidate records.",
    jobs:[
      { title:"AI Agent Operations Specialist, Support", url:"https://jobs.ashbyhq.com/vanta/f987d41a-d0e1-4260-9129-f64aee6122ae", level:"entry", added:"2026-10-08", posted:"2026-10-07", pay:{"min":129000,"max":152000,"interval":"year"}, paySource:"posted", summary:"At Vanta, our mission is to help businesses earn and prove trust. We believe that security should be monitored and verified continuously, and we empower companies to practice better…" }
    ] },
  { id:"cleargov", name:"ClearGov", vertical:"nonprofit",
    sub:"ClearGov",
    stage:"\u2014", raised:"\u2014", lead:"\u2014",
    badges:[],
    totalRoles:1,
    notes:"Government, civic or public-sector software vendor \u2014 permit, case and constituent records.",
    jobs:[
      { title:"Client Support Specialist", url:"https://job-boards.greenhouse.io/cleargov/jobs/4439086009", level:"entry", added:"2026-10-09", posted:"2026-10-08", pay:{"min":17,"max":25,"interval":"hour"}, paySource:"estimate", summary:"Master ClearGov's Software: Learn, in detail, how client financial data flows through our products; stay current as new features and products launch." }
    ] },
  { id:"talkspace", name:"Talkspace", vertical:"health",
    sub:"Online therapy (NASDAQ)",
    stage:"Public", raised:"$110M pre-IPO", lead:"Norwest",
    badges:["NASDAQ","Norwest"],
    totalRoles:1,
    notes:"Telehealth platform \u2014 therapy networks, intake, claims.",
    jobs:[
      { title:"Network Strategic Operations Specialist", url:"https://www.talkspace.com/careers/job?gh_jid=6162085004", level:"entry", added:"2026-10-09", posted:"2026-10-08", pay:{"min":19,"max":28,"interval":"hour"}, paySource:"estimate", summary:"At Talkspace, we are committed to fostering a diverse, equitable, inclusive, and belonging-centered workplace where everyone can thrive while making a difference in mental health." }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  accessgroup:"accessgroup.com", alcumusgroup:"alcumusgroup.com", bazaarvoice:"bazaarvoice.com",
  bloomerang:"bloomerang.com", camber:"camber.com", cleargov:"cleargov.com",
  connectwise:"connectwise.com", deepgram:"deepgram.com", enginegroup:"engine.com",
  greatminds:"greatminds.io", handshake:"joinhandshake.com", lightspeedsystems:"lightspeedsystems.com",
  medrio:"medrio.com", openloophealth:"openloophealth.com", osano:"osano.com",
  sanabenefits:"sanabenefits.com", sitecore:"sitecore.com", smiledigitalhealth:"smiledigitalhealth.com",
  talkspace:"talkspace.com", vanta:"vanta.com", wealthfront:"wealthfront.com",
};

window.CODY_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
