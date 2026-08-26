// sean — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh sean

/* ---------- COMPANIES ----------
 * NYC board for profile 'sean'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-08-26) and matched the
 * profile's title + location filters (profiles/sean.json).
 * URLs link directly to the posting (not aggregators).
 *
 * Regenerate with:
 *   python3 scripts/refresh-companies.py --profile sean
 * or run the whole pipeline:
 *   scripts/pipeline.sh sean
 *
 * Schema: { id, name, vertical, sub, stage, raised, lead, badges[],
 *           totalRoles, notes, jobs[{ title, url, level, posted, added }] }
 *  - totalRoles == jobs.length (full set; the card slices to 3 for preview).
 */
const COMPANIES_VERIFIED_AT = '2026-08-26';
const COMPANIES = [
  { id:"baseten", name:"Baseten", vertical:"ai",
    sub:"ML model deployment",
    stage:"Series C", raised:"$135M", lead:"IVP",
    badges:["IVP", "Spark", "Greylock"],
    totalRoles:1,
    notes:"Model deployment infra. Inference engineering, autoscaling GPU.",
    jobs:[
      { title:"Brand Designer", url:"https://jobs.ashbyhq.com/baseten/c2f8fe4f-07c1-4d43-ae5c-05f057842e57", level:"mid" }
    ] },
  { id:"duolingo", name:"Duolingo", vertical:"consumer",
    sub:"Edtech language learning",
    stage:"Public", raised:"(NASDAQ: DUOL)", lead:"NASDAQ",
    badges:["NASDAQ"],
    totalRoles:1,
    notes:"NYC eng office. Massive consumer ML/gamification org.",
    jobs:[
      { title:"Creative Director, Marketing", url:"https://careers.duolingo.com/jobs/8442932002?gh_jid=8442932002", level:"senior" }
    ] },
  { id:"figma", name:"Figma", vertical:"saas",
    sub:"Collaborative design",
    stage:"Pre-IPO", raised:"$333M", lead:"Index",
    badges:["Index", "Sequoia", "Greylock"],
    totalRoles:1,
    notes:"Multiplayer collaboration at scale. CRDT, real-time infra, design tooling depth.",
    jobs:[
      { title:"Motion Designer", url:"https://boards.greenhouse.io/figma/jobs/6117563004?gh_jid=6117563004", level:"mid" }
    ] },
  { id:"glossier", name:"Glossier", vertical:"consumer",
    sub:"Beauty DTC",
    stage:"Series E", raised:"$266M", lead:"Sequoia",
    badges:["Sequoia"],
    totalRoles:1,
    notes:"NYC HQ. Growth + BI + supply chain analyst.",
    jobs:[
      { title:"Art Director (Contractor)", url:"https://boards.greenhouse.io/glossier/jobs/8155568?gh_jid=8155568", level:"senior" }
    ] },
  { id:"hellofresh", name:"HelloFresh", vertical:"consumer",
    sub:"Meal kits",
    stage:"Public", raised:"(FSE: HFG)", lead:"FSE",
    badges:["FSE"],
    totalRoles:1,
    notes:"NYC + Berlin offices.",
    jobs:[
      { title:"Senior Art Director, Performance Innovation", url:"https://careers.hellofresh.com/global/en/job/8135998?gh_jid=8135998", level:"senior" }
    ] },
  { id:"lovable", name:"Lovable", vertical:"ai",
    sub:"AI app generator",
    stage:"Series A", raised:"$15M", lead:"Creandum",
    badges:["Creandum", "byFounders"],
    totalRoles:1,
    notes:"AI builder for apps. Frontier model integration + product engineering.",
    jobs:[
      { title:"Brand Designer, Web", url:"https://jobs.ashbyhq.com/lovable/76f4a64e-b343-4c0e-b5f1-ea7686001346", level:"mid" }
    ] },
  { id:"misfits-market", name:"Misfits Market", vertical:"marketplace",
    sub:"Ugly-produce grocery + Imperfect Foods",
    stage:"Late stage", raised:"$525M+", lead:"SoftBank",
    badges:["SoftBank", "D1", "Valor"],
    totalRoles:1,
    notes:"NJ/NYC online grocery \u2014 merged with Imperfect Foods; large eng org, logistics-heavy.",
    jobs:[
      { title:"Creative Director", url:"https://job-boards.greenhouse.io/misfitsmarket/jobs/7807462003", level:"senior" }
    ] },
  { id:"ogilvy", name:"Ogilvy", vertical:"media",
    sub:"Global creative agency (NYC)",
    stage:"Public (WPP)", raised:"LSE: WPP", lead:"\u2014",
    badges:["WPP"],
    totalRoles:2,
    notes:"Largest NYC agency board on this list \u2014 art director and design roles post steadily.",
    jobs:[
      { title:"Associate Creative Director, Art Director", url:"https://www.ogilvy.com/careers/4621504005?gh_jid=4621504005", level:"senior" },
      { title:"Senior Art Director", url:"https://www.ogilvy.com/careers/4662589005?gh_jid=4662589005", level:"senior" }
    ] },
  { id:"rilla", name:"Rilla", vertical:"ai",
    sub:"AI for field-sales coaching",
    stage:"Series A", raised:"$24M", lead:"Sequoia",
    badges:["Sequoia"],
    totalRoles:2,
    notes:"Speech AI for outside sales. ASR, summarization, ranking.",
    jobs:[
      { title:"Brand/Graphic Designer", url:"https://jobs.ashbyhq.com/rilla/29fbbb85-ed6c-4458-b076-8d20ae8210a4", level:"mid" },
      { title:"Rive Motion Designer and Animator (Contract-to-Hire)", url:"https://jobs.ashbyhq.com/rilla/911f512f-cabc-4e4d-b238-906825d5e49d", level:"mid" }
    ] },
  { id:"skydance", name:"Skydance", vertical:"animation",
    sub:"Skydance Animation + Interactive",
    stage:"Private", raised:"$1B+", lead:"RedBird",
    badges:["RedBird", "Tencent"],
    totalRoles:1,
    notes:"Feature animation plus a games arm; 2D/3D and character design roles.",
    jobs:[
      { title:"2D Effects Artist (Temporary/Freelance)", url:"https://jobs.lever.co/skydance/53d76f8f-f886-472e-b526-331056e7c87a", level:"mid" }
    ] },
  { id:"suno", name:"Suno", vertical:"ai",
    sub:"AI music generation",
    stage:"Series B", raised:"$125M", lead:"Lightspeed",
    badges:["Lightspeed", "Founder Collective", "Nat Friedman"],
    totalRoles:3,
    notes:"Generative music at scale. Audio pipelines, copyright/moderation, eval on subjective quality.",
    jobs:[
      { title:"Creative Director, Marketing Campaigns", url:"https://jobs.ashbyhq.com/suno/4c4563b4-7e53-44cf-a261-7515fe575337", level:"senior" },
      { title:"Senior Designer, Creative Studio", url:"https://jobs.ashbyhq.com/suno/b01a7dae-95ed-4357-a46e-5f65041dcb38", level:"senior" },
      { title:"Senior Designer, Creative Studio & Brand Campaigns (Contract)", url:"https://jobs.ashbyhq.com/suno/38e2a0ea-302b-4059-8e86-8b36ef08b352", level:"senior" }
    ] },
  { id:"voxmedia", name:"Vox Media", vertical:"media",
    sub:"Digital media network",
    stage:"Late stage", raised:"$590M+", lead:"NBCUniversal",
    badges:["NBCU", "Comcast", "General Atlantic"],
    totalRoles:1,
    notes:"NYC media (Vox, The Verge, NY Mag, Eater). CMS + ad tech.",
    jobs:[
      { title:"Executive Creative Director (Temporary)", url:"https://boards.greenhouse.io/voxmedia/jobs/8095172?gh_jid=8095172", level:"senior" }
    ] },
  { id:"warp", name:"Warp", vertical:"ai",
    sub:"AI-native terminal",
    stage:"Series B", raised:"$73M", lead:"Sequoia",
    badges:["Sequoia", "GV"],
    totalRoles:1,
    notes:"Reimagined terminal with AI. Heavy on developer experience, latency, prompt design for code.",
    jobs:[
      { title:"Brand Designer", url:"https://jobs.ashbyhq.com/warp/300d33a7-fc93-4f4a-828e-f3482edd5f89", level:"mid" }
    ] },
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  ogilvy:'ogilvy.com', skydance:'skydance.com', rilla:'rillavoice.com',
  baseten:'baseten.co', figma:'figma.com', lovable:'lovable.dev',
  suno:'suno.com', warp:'warp.dev', voxmedia:'voxmedia.com',
  'misfits-market':'misfitsmarket.com', duolingo:'duolingo.com',
};

window.SEAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
