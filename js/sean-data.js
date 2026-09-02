// sean — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh sean

/* ---------- COMPANIES ----------
 * NYC board for profile 'sean'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-08-27) and matched the
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
const COMPANIES_VERIFIED_AT = '2026-09-02';
const COMPANIES = [
  { id:"believer", name:"Believer Entertainment", vertical:"gaming",
    sub:"The Prodigal \u2014 new IP",
    stage:"Series B", raised:"$55M", lead:"Lightspeed",
    badges:["Lightspeed","Griffin Gaming"],
    totalRoles:1,
    notes:"New AAA studio; the VFX and UX art seats are on the game itself.",
    jobs:[
      { title:"Staff VFX Artist", url:"https://jobs.ashbyhq.com/believer/fadae54c-240b-428f-a51f-c31a0fe28126", level:"senior", added:"2026-08-27", posted:"2026-08-26", remote:true, loc:"Remote" }
    ] },
  { id:"disney", name:"The Walt Disney Company", vertical:"media",
    sub:"Streaming + studios + parks (NYSE: DIS)",
    stage:"Public", raised:"$1B+ pre-IPO", lead:"NYSE",
    badges:["NYSE","S&P 500"],
    totalRoles:1,
    notes:"NYC tech: ABC News, Hulu, ESPN+, Disney+. Streaming infra + content systems.",
    jobs:[
      { title:"Senior Concept Artist", url:"https://disney.wd5.myworkdayjobs.com/en-US/disneycareer/job/Remote-Worker-Location-USA/Senior-Concept-Artist_10157163-1", level:"senior", added:"2026-08-27", remote:true, loc:"Remote Worker Location, USA" }
    ] },
  { id:"insomniac", name:"Insomniac Games", vertical:"gaming",
    sub:"Marvel's Spider-Man / Ratchet & Clank",
    stage:"Public (Sony)", raised:"NYSE: SONY", lead:"\u2014",
    badges:["Sony"],
    totalRoles:5,
    notes:"Sony first-party with a large in-house art org and a fast shipping cadence.",
    jobs:[
      { title:"Senior Facial Character TD (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6143980004", level:"senior", added:"2026-08-27", posted:"2026-08-27", remote:true, loc:"United States, Remote" },
      { title:"Senior Gameplay Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6138863004", level:"senior", added:"2026-08-27", posted:"2026-08-27", remote:true, loc:"United States, Remote" },
      { title:"Senior Gameplay Programmer (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6173051004", level:"senior", added:"2026-08-29", posted:"2026-08-28", remote:true, loc:"United States, Remote" },
      { title:"Senior Cinematic Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6164402004", level:"senior", added:"2026-09-02", posted:"2026-09-01", remote:true, loc:"United States, Remote" },
      { title:"Senior Cinematic Facial Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6164736004", level:"senior", added:"2026-09-02", posted:"2026-09-01", remote:true, loc:"United States, Remote" }
    ] },
  { id:"neteasegames", name:"NetEase Games", vertical:"gaming",
    sub:"Marvel Rivals / Naraka",
    stage:"Public", raised:"NASDAQ: NTES", lead:"\u2014",
    badges:["NASDAQ: NTES"],
    totalRoles:2,
    notes:"Global studios under one board; character and performance animation roles surface regularly.",
    jobs:[
      { title:"Character Performance Animator", url:"https://job-boards.greenhouse.io/neteasegames/jobs/5166671007", level:"mid", added:"2026-08-27", posted:"2026-08-24", remote:true, loc:"Canada-Remote; United Kingdom - Guildford Onsite; United Sta" },
      { title:"FPS 1P View Gameplay Animator", url:"https://job-boards.greenhouse.io/neteasegames/jobs/5166658007", level:"mid", added:"2026-08-27", posted:"2026-08-24", remote:true, loc:"Canada-Remote; Spain-Remote; United Kingdom - Guildford Onsi" }
    ] },
  { id:"thatgamecompany", name:"thatgamecompany", vertical:"gaming",
    sub:"Journey / Sky: Children of the Light",
    stage:"Series B", raised:"$160M", lead:"Sequoia China",
    badges:["Sequoia","TPG"],
    totalRoles:2,
    notes:"Small art-led team; character and environment craft is the whole product.",
    jobs:[
      { title:"Technical Game Designer", url:"https://jobs.ashbyhq.com/thatgamecompany/22deed1d-6098-45eb-a04d-41634b23ec30", level:"mid", added:"2026-08-27", posted:"2026-07-07", remote:true, loc:"Remote - US" },
      { title:"3D Character Artist (Mid-Senior)", url:"https://jobs.ashbyhq.com/thatgamecompany/36e101a4-c7ba-4884-8999-cd04abb979ee", level:"senior", added:"2026-08-27", posted:"2026-05-08", remote:true, loc:"Remote - US" }
    ] },
  { id:"playstation", name:"PlayStation", vertical:"gaming",
    sub:"Sony Interactive Entertainment",
    stage:"Public (Sony)", raised:"NYSE: SONY", lead:"\u2014",
    badges:["Sony"],
    totalRoles:2,
    notes:"Global first-party art org. Big board, so worth scanning even though NYC reqs are occasional.",
    jobs:[
      { title:"Senior Cinematic Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/sonyinteractiveentertainmentglobal/jobs/6164400004", level:"senior", added:"2026-09-02", posted:"2026-09-01", remote:true, loc:"United States, Remote" },
      { title:"Senior Cinematic Facial Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/sonyinteractiveentertainmentglobal/jobs/6164734004", level:"senior", added:"2026-09-02", posted:"2026-09-01", remote:true, loc:"United States, Remote" }
    ] },
  { id:"tripledot", name:"Tripledot Studios", vertical:"gaming",
    sub:"Mobile puzzle + casual games",
    stage:"Series B", raised:"$116M", lead:"Access Industries",
    badges:["Access Industries","Eldridge"],
    totalRoles:1,
    notes:"Mobile casual at scale \u2014 2D/UI art and ad-creative motion work.",
    jobs:[
      { title:"Game Designer - Lion Studios", url:"https://job-boards.eu.greenhouse.io/tripledotstudios/jobs/4965778101", level:"mid", added:"2026-09-02", posted:"2026-09-01", remote:true, loc:"Remote" }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  believer:"believer.com", insomniac:"insomniacgames.com", neteasegames:"neteasegames.com",
  playstation:"playstation.com", thatgamecompany:"thatgamecompany.com", tripledot:"tripledotstudios.com",
};

window.SEAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
