// sean — job board data (generated; do not hand-edit)
// Regenerate: scripts/pipeline.sh sean

/* ---------- COMPANIES ----------
 * NYC board for profile 'sean'. Every posting below was live on
 * the company's public ATS JSON when verified (2026-09-08) and matched the
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
const COMPANIES_VERIFIED_AT = '2026-09-26';
const COMPANIES = [
  { id:"believer", name:"Believer Entertainment", vertical:"gaming",
    sub:"The Prodigal \u2014 new IP",
    stage:"Series B", raised:"$55M", lead:"Lightspeed",
    badges:["Lightspeed","Griffin Gaming"],
    totalRoles:2,
    notes:"New AAA studio; the VFX and UX art seats are on the game itself.",
    jobs:[
      { title:"Staff VFX Artist", url:"https://jobs.ashbyhq.com/believer/fadae54c-240b-428f-a51f-c31a0fe28126", level:"senior", added:"2026-09-19", posted:"2026-08-26", remote:true, loc:"Remote" },
      { title:"Environment Art Lead", url:"https://jobs.ashbyhq.com/believer/f031cf45-a4dd-40c5-8c00-b26c1c431dd8", level:"senior", added:"2026-09-23", posted:"2026-09-22", remote:true, loc:"Remote", years:6 }
    ] },
  { id:"insomniac", name:"Insomniac Games", vertical:"gaming",
    sub:"Marvel's Spider-Man / Ratchet & Clank",
    stage:"Public (Sony)", raised:"NYSE: SONY", lead:"\u2014",
    badges:["Sony"],
    totalRoles:6,
    notes:"Sony first-party with a large in-house art org and a fast shipping cadence.",
    jobs:[
      { title:"Senior Cinematic Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6164402004", level:"senior", added:"2026-09-19", posted:"2026-09-11", remote:true, loc:"United States, Remote" },
      { title:"Senior Cinematic Facial Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6164736004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" },
      { title:"Senior Facial Character TD (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6143980004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" },
      { title:"Senior Gameplay Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6138863004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" },
      { title:"Senior Gameplay Programmer (CONTRACT)", url:"https://job-boards.greenhouse.io/insomniac/jobs/6173051004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" },
      { title:"VFX Artist", url:"https://job-boards.greenhouse.io/insomniac/jobs/6192046004", level:"mid", added:"2026-09-23", posted:"2026-09-22", remote:true, loc:"United States, Remote", pay:{"min":75,"max":85,"interval":"hour"}, paySource:"posted" }
    ] },
  { id:"neteasegames", name:"NetEase Games", vertical:"gaming",
    sub:"Marvel Rivals / Naraka",
    stage:"Public", raised:"NASDAQ: NTES", lead:"\u2014",
    badges:["NASDAQ: NTES"],
    totalRoles:3,
    notes:"Global studios under one board; character and performance animation roles surface regularly.",
    jobs:[
      { title:"Character Performance Animator", url:"https://job-boards.greenhouse.io/neteasegames/jobs/5166671007", level:"mid", added:"2026-09-19", posted:"2026-09-15", remote:true, loc:"Canada-Remote; United Kingdom - Guildford Onsite; United Sta" },
      { title:"FPS 1P View Gameplay Animator", url:"https://job-boards.greenhouse.io/neteasegames/jobs/5166658007", level:"mid", added:"2026-09-19", posted:"2026-09-15", remote:true, loc:"Canada-Remote; Spain-Remote; United Kingdom - Guildford Onsi" },
      { title:"Senior/Lead Gameplay Animator - 3C & FPS", url:"https://job-boards.greenhouse.io/neteasegames/jobs/5241774007", level:"senior", added:"2026-09-23", posted:"2026-09-23", remote:true, loc:"Canada-Remote; France-Remote; Guangzhou Office; Hangzhou Off" }
    ] },
  { id:"playstation", name:"PlayStation", vertical:"gaming",
    sub:"Sony Interactive Entertainment",
    stage:"Public (Sony)", raised:"NYSE: SONY", lead:"\u2014",
    badges:["Sony"],
    totalRoles:3,
    notes:"Global first-party art org. Big board, so worth scanning even though NYC reqs are occasional.",
    jobs:[
      { title:"Senior Cinematic Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/sonyinteractiveentertainmentglobal/jobs/6164400004", level:"senior", added:"2026-09-19", posted:"2026-09-11", remote:true, loc:"United States, Remote" },
      { title:"Senior Cinematic Facial Animator (CONTRACT)", url:"https://job-boards.greenhouse.io/sonyinteractiveentertainmentglobal/jobs/6164734004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" },
      { title:"Senior Gameplay Animator", url:"https://job-boards.greenhouse.io/sonyinteractiveentertainmentglobal/jobs/6138861004", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"United States, Remote" }
    ] },
  { id:"thatgamecompany", name:"thatgamecompany", vertical:"gaming",
    sub:"Journey / Sky: Children of the Light",
    stage:"Series B", raised:"$160M", lead:"Sequoia China",
    badges:["Sequoia","TPG"],
    totalRoles:2,
    notes:"Small art-led team; character and environment craft is the whole product.",
    jobs:[
      { title:"Technical Game Designer", url:"https://jobs.ashbyhq.com/thatgamecompany/22deed1d-6098-45eb-a04d-41634b23ec30", level:"mid", added:"2026-09-19", posted:"2026-07-07", remote:true, loc:"Remote - US" },
      { title:"3D Character Artist (Mid-Senior)", url:"https://jobs.ashbyhq.com/thatgamecompany/36e101a4-c7ba-4884-8999-cd04abb979ee", level:"senior", added:"2026-09-19", posted:"2026-09-02", remote:true, loc:"Remote - US" }
    ] },
  { id:"seconddinner", name:"Second Dinner", vertical:"gaming",
    sub:"Marvel Snap",
    stage:"Series B", raised:"$100M", lead:"Griffin Gaming",
    badges:["Griffin Gaming","NetEase"],
    totalRoles:1,
    notes:"Card-game art at Marvel scale; heavy illustration commissioning.",
    jobs:[
      { title:"Contract | Senior UI Artist (MARVEL SNAP)", url:"https://jobs.ashbyhq.com/seconddinner/709697fb-a74a-4747-9ef1-f95dcbfb89c6", level:"senior", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"Second Dinner (US Remote)", pay:{"min":79,"max":89,"interval":"hour"}, paySource:"posted", years:10 }
    ] },
  { id:"thatsnomoonentertainment", name:"That's No Moon", vertical:"gaming",
    sub:"Unannounced narrative action game",
    stage:"Series A", raised:"$100M", lead:"Smilegate",
    badges:["Smilegate"],
    totalRoles:1,
    notes:"Veteran-heavy new studio staffing a AAA narrative title from zero.",
    jobs:[
      { title:"Senior Narrative Gameplay Animator (Project Hire)", url:"https://job-boards.greenhouse.io/thatsnomoonentertainment/jobs/6186777004", level:"senior", added:"2026-09-19", posted:"2026-09-16", remote:true, loc:"Los Angeles or Remote (United States)" }
    ] },
  { id:"vrchat", name:"VRChat", vertical:"immersive",
    sub:"Social VR worlds",
    stage:"Series D", raised:"$100M", lead:"Anthos Capital",
    badges:["Anthos","Makers Fund"],
    totalRoles:1,
    notes:"Avatar + world art for a user-generated 3D platform.",
    jobs:[
      { title:"Unity Technical Artist, Event Pipeline", url:"https://jobs.lever.co/vrchat/e9aecc1d-9e3f-4232-95ea-01fff6dfe222", level:"mid", added:"2026-09-19", posted:"2026-09-10", remote:true, loc:"Anywhere Anywhere" }
    ] }
];

/* ---------- COMPANY DOMAINS (favicon CDN lookup) ---------- */
const COMPANY_DOMAINS = {
  believer:"believer.com", insomniac:"insomniacgames.com", neteasegames:"neteasegames.com",
  playstation:"playstation.com", seconddinner:"seconddinner.com", thatgamecompany:"thatgamecompany.com",
  thatsnomoonentertainment:"thatsnomoon.com", vrchat:"vrchat.com",
};

window.SEAN_DATA = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };
