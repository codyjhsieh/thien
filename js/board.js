// thien — job board (standalone extract from InterviewPrep)
// Single-file rendering + scoring for the Companies + Individual Roles views.
// Applied-state is persisted to localStorage under `thien_applied`.

'use strict';

// IIFE so our `const COMPANIES` destructuring doesn't collide with the
// same-named top-level const already declared by data.js in the shared
// classic-script scope (which throws SyntaxError and blanks the page).
(function () {

const { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT } = window.DATA;

/* --------------------------------------------------------------------
 * Tiny DOM helpers
 * ------------------------------------------------------------------ */
function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* --------------------------------------------------------------------
 * Company + role classification tables
 * ------------------------------------------------------------------ */
const verticalPill = {
  ai: 'pill-ai', hospitality: 'pill-hosp', marketplace: 'pill-mkt',
  devtools: 'pill-dev', fintech: 'pill-both',
  saas: 'pill-dev', infra: 'pill-dev', health: 'pill-hosp',
};
const verticalLabel = {
  ai:'AI', hospitality:'Hospitality', marketplace:'Marketplace',
  devtools:'Dev Tools', fintech:'Fintech',
  saas:'SaaS', infra:'Infra', health:'Health',
};

/* --------------------------------------------------------------------
 * Date helpers
 * ------------------------------------------------------------------ */
function jobRecency(j) {
  return (j && (j.posted || j.added)) || '';
}
function companyRecency(c) {
  const dates = (c.jobs || []).map(jobRecency).filter(Boolean);
  return dates.length ? dates.reduce((a, b) => (a > b ? a : b), '') : '';
}
const _MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(s) {
  if (!s || s.length < 10) return '';
  const y = +s.slice(0, 4), mo = +s.slice(5, 7), d = +s.slice(8, 10);
  if (!y || !mo || !d) return '';
  return `${_MON[mo - 1]} ${d}`;
}
function isNewJob(j) {
  const d = jobRecency(j);
  if (!d) return false;
  const today = new Date();
  const then = new Date(d);
  const diff = (today - then) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

/* --------------------------------------------------------------------
 * COOLNESS lookup — hand-scored 1-10 tier per company
 * ------------------------------------------------------------------ */
const COOLNESS = {
  // Tier 10 — peak LES-cool
  partiful:10, dorsia:10, suno:10, flora:10, udio:10,
  // Tier 9
  substack:9, plot:9, qloo:9, slate:9, patreon:9, hang:9, beacons:9,
  'aura-frames':9, output:9, runway:9, hedra:9,
  // Tier 8
  ideogram:8, 'hume-ai':8, lovable:8, warp:8, cursor:8, etsy:8, nyt:8, reddit:8,
  // Tier 7
  seatgeek:7, 'opus-training':7, glossgenius:7, bombas:7, resortpass:7,
  spotify:7, huggingface:7, perplexity:7, notion:7, linear:7, figma:7,
  elevenlabs:7, 'mighty-networks':7, crosby:7,
  // Tier 6
  vercel:6, replit:6, airtable:6, glide:6, blockworks:6, kalshi:6,
  polymarket:6, whatnot:6, ro:6, hopper:6, lyft:6, bilt:6, mirage:6,
  'sesame-ai':6, 'black-forest-labs':6,
  // Tier 5 — neutral
  navan:5, metropolis:5, via:5, cityblock:5, propel:5, loopai:5, blee:5,
  sequence:5, headway:5, 'maven-clinic':5, 'spring-health':5, talkspace:5,
  'k-health':5, camber:5, abridge:5, squarespace:5, mercury:5, stripe:5,
  robinhood:5, block:5, 'reflex-robotics':5, cartesia:5, 'clay-labs':5,
  // Tier 4
  commure:4, oscar:4, zocdoc:4, lemonade:4, rho:4, brigit:4, stash:4,
  chime:4, betterment:4, airgoods:4, hebbia:4, openai:4, anthropic:4,
  mistral:4, cognition:4, modal:4, 'normal-computing':4, stainless:4,
  hex:4, watershed:4, ramp:4, disney:4, mercor:4,
  // Tier 3
  sofi:3, wealthfront:3, affirm:3, doordash:3, alphasense:3, 'snorkel-ai':3,
  cohere:3, harvey:3, writer:3, decagon:3, sierra:3, unify:3, kustomer:3,
  attentive:3, iterable:3, braze:3, knock:3, plaid:3, alchemy:3,
  'galaxy-digital':3, brex:3, tavily:3, langchain:3, baseten:3, deepgram:3,
  assemblyai:3, poolside:3, fireworks:3, pinecone:3, braintrust:3, arize:3,
  logrocket:3, 'general-context':3, sola:3, gusto:3,
  // Tier 2
  yext:2, 'the-trade-desk':2, doubleverify:2, asana:2, mongodb:2, datadog:2,
  'cockroach-labs':2, neon:2, 'monte-carlo':2, carta:2, 'modern-treasury':2,
  alloy:2, middesk:2, pinwheel:2, sandbar:2, fireblocks:2, gemini:2,
  'jane-street':2, 'two-sigma':2, justworks:2, distyl:2, glean:2, rilla:2,
  credal:2, clear:2, scaleai:2, coreweave:2, 'sigma-computing':2,
  nbcuniversal:2,
  // Tier 1 — anti-LES
  drata:1, secureframe:1, ridgeline:1, salesforce:1, forge:1, blackrock:1,
  'goldman-sachs':1, 'de-shaw':1, worldquant:1, point72:1, 'jump-trading':1,
  virtu:1,
  // 2026-07-21 batch — expansion candidates
  ideo:8, hugeinc:6, metalab:6, instrument:6, akqa:5, codeandtheory:5,
  kettle:5, dept:4, nearform:4, thoughtworks:4, vsapartners:4,
  palantir:5, factory:6, openevidence:6, vannevarlabs:5, andela:3,
  turing:3, toptal:3, pariveda:3, capco:2,
  ultra:6, 'tuesday-labs':6, offdeal:5, clarion:4, spur:4, ryvn:4,
  pointone:4, ambral:3, 'codes-health':3, greenboard:3,
  diligencesquared:3, fleetline:3,
  piramidalinc:6, tennr:5, 'fortuna-health':5, junction:5, garage:5,
  loula:4, 'prosper-ai':4, finny:4, careswift:4, atg:4,
  avallon:3, solva:3, 'claim-health':3,
  a24:9, aimeleondore:8, splice:6, sonymusic:6, goop:5, livenation:4, honestco:3,
  // 2026-07-21 additions
  ganni:9, rockstargames:9, duolingo:8, blackbird:8, bdg:8,
  'farmers-dog':7, soundcloud:7, uniswap:6, attio:6, graphite:6, browserbase:6, fanduel:6,
  handshake:5, midpage:5, semgrep:5,
  peloton:4, equinox:4, materialize:4, knotapi:4, extend:4, ripple:4, databento:4,
  numeric:3, numeral:3, socure:3, imprint:3, nayya:3,
  dailypay:2, mosaic:2, octus:2, 'nyc-gov':2,
  drw:1, imc:1, 'flow-traders':1, 'old-mission':1, socotec:1,
};

const FRONTIER = new Set([
  'openai','anthropic','cohere','mistral','perplexity','huggingface',
  'cursor','cognition','glean','sierra','scaleai','harvey','runway',
  'black-forest-labs',
]);

function _coolness(c) {
  if (c.id in COOLNESS) return COOLNESS[c.id];
  if (c.vertical === 'ai') return 4;
  if (c.vertical === 'devtools' || c.vertical === 'infra') return 4;
  if (c.vertical === 'media' || c.vertical === 'consumer') return 5;
  return 3;
}

const QUANT_GATED = new Set([
  'de-shaw','two-sigma','jane-street','point72','worldquant',
  'jump-trading','virtu','drw','imc','flow-traders','old-mission',
  'goldman-sachs','blackrock',
]);

function _candidateMult(c) {
  let m = 1.0;
  const stage = (c.stage || '').toLowerCase();
  if (/series [fghij]\b|public|late|take/.test(stage)) m *= 0.55;
  else if (/series e\b/.test(stage)) m *= 0.7;
  else if (/series d\b/.test(stage)) m *= 0.85;
  if (FRONTIER.has(c.id)) m *= 0.6;
  if (QUANT_GATED.has(c.id)) m *= 0.3;
  if (/seed/.test(stage) || /series a\b/.test(stage)) {
    if ((c.jobs || []).some(j => j.level === 'founding')) m *= 1.3;
    else m *= 1.15;
  }
  return Math.max(0.2, Math.min(1.4, m));
}

function _replyProb(c) {
  let p = 0.10;
  const stage = (c.stage || '').toLowerCase();
  if (/seed/.test(stage))                       p = 0.30;
  else if (/series a\b/.test(stage))            p = 0.25;
  else if (/series b\b/.test(stage))            p = 0.18;
  else if (/series c\b/.test(stage))            p = 0.12;
  else if (/series d\b/.test(stage))            p = 0.08;
  else if (/series e\b/.test(stage))            p = 0.06;
  else if (/series [fghij]\b|public|late|take/.test(stage)) p = 0.05;
  if (FRONTIER.has(c.id)) p *= 0.4;
  if ((c.jobs || []).some(j => j.level === 'founding')) p *= 1.4;
  const roles = (c.jobs || []).length;
  if (roles > 15)      p *= 0.7;
  else if (roles > 10) p *= 0.85;
  p *= _candidateMult(c);
  return Math.max(0.02, Math.min(0.45, p));
}

function _passProb(c, j) {
  const t = ((j && j.title) || '').toLowerCase();
  let p = 0.30;
  if (/forward[\s-]deployed|\bfde\b/.test(t))           p += 0.20;
  if (/applied ai|ai engineer/.test(t))                 p += 0.15;
  if (/ml engineer|machine[\s-]learning/.test(t))       p += 0.10;
  if (/full[\s-]stack|backend/.test(t))                 p += 0.05;
  if (/c\+\+|low.?latency|hft|quant developer/.test(t)) p -= 0.20;
  if (/researcher|phd/.test(t))                         p -= 0.10;
  if (j && j.level === 'senior')   p += 0.05;
  if (j && j.level === 'founding') p += 0.08;
  if (j && j.level === 'mid')      p -= 0.05;
  return Math.max(0.05, Math.min(0.70, p));
}

// Taste penalties — multiplicative on raw fit BEFORE percentile normalization.
const CRYPTO_IDS = new Set([
  'alchemy','blockworks','chainalysis','elliptic','fireblocks','galaxy-digital',
  'gemini','ledger','notabene','ondofinance','paxos','polymarket','ripple',
  'trm-labs','uniswap',
]);
const FRONTEND_TITLE = /\bfront[\s-]?end\b|\bfrontend\b|\bui\s+engineer\b|\bfe\s+engineer\b/i;
function _cryptoPenalty(c) { return CRYPTO_IDS.has(c.id) ? 0.4 : 1.0; }
function _frontendPenalty(j) {
  return (j && FRONTEND_TITLE.test(j.title || '')) ? 0.5 : 1.0;
}

/* --------------------------------------------------------------------
 * Percentile-normalized fit score (0.5 - 10.0 on display)
 * ------------------------------------------------------------------ */
let _fitPool = null;
function _rawFit(c, j) {
  return (_coolness(c) / 10) * _replyProb(c) * _passProb(c, j)
    * _cryptoPenalty(c) * _frontendPenalty(j);
}
function _computeFitPool() {
  const scores = [];
  for (const c of COMPANIES) {
    for (const j of (c.jobs || [])) scores.push(_rawFit(c, j));
  }
  scores.sort((a, b) => a - b);
  _fitPool = scores;
}
function _normalize(raw) {
  if (!_fitPool) _computeFitPool();
  const n = _fitPool.length;
  if (!n) return 5;
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (_fitPool[mid] < raw) lo = mid + 1; else hi = mid;
  }
  const pct = lo / n;
  return Math.max(0.5, Math.min(10, 0.5 + pct * 9.5));
}
function companyFitScore(c)   { return _normalize(_rawFit(c, null)); }
function roleFitScore(c, j)   { return _normalize(_rawFit(c, j)); }
function fitTier(score) {
  if (score >= 8)   return { label: 'Goldilocks',   cls: 'fit-strong' };
  if (score >= 5)   return { label: 'Worth trying', cls: 'fit-worth'  };
  if (score >= 2)   return { label: 'Long shot',    cls: 'fit-long'   };
  return                   { label: 'Tough bar',    cls: 'fit-tough'  };
}
function fitBadgeHTML(score) {
  const tier = fitTier(score);
  const shown = score >= 10 ? '10' : score.toFixed(1);
  return `<span class="fit-badge ${tier.cls}" title="${esc(tier.label)} · ${shown}/10">
    <span class="fit-num">${shown}</span>
  </span>`;
}

function makeRoleKey(company, job) {
  const u = (job && job.url) || '';
  return `${company.id}::${u}`;
}

/* --------------------------------------------------------------------
 * Applied-state — persisted to localStorage as a JSON array of keys
 * ------------------------------------------------------------------ */
const APPLIED_KEY = 'thien_applied';
function loadApplied() {
  try { return new Set(JSON.parse(localStorage.getItem(APPLIED_KEY) || '[]')); }
  catch { return new Set(); }
}
function saveApplied(set) {
  try { localStorage.setItem(APPLIED_KEY, JSON.stringify([...set])); }
  catch {}
}
let appliedSet = loadApplied();
function isApplied(key) { return appliedSet.has(key); }
function toggleApplied(key) {
  if (appliedSet.has(key)) appliedSet.delete(key); else appliedSet.add(key);
  saveApplied(appliedSet);
}

function bindApplyToggles(container) {
  container.addEventListener('click', (e) => {
    const cb = e.target.closest('[data-apply-toggle]');
    if (!cb) return;
    e.preventDefault(); e.stopPropagation();
    const row = cb.closest('[data-role-row]');
    if (!row) return;
    const key = row.getAttribute('data-role-key');
    if (!key) return;
    toggleApplied(key);
    const nowApplied = isApplied(key);
    cb.setAttribute('data-checked', nowApplied ? '1' : '0');
    cb.setAttribute('aria-checked', nowApplied ? 'true' : 'false');
    // Reorder — applied rows slide to bottom of siblings.
    const parent = row.parentElement;
    if (parent && parent.children.length > 1) {
      if (nowApplied) parent.appendChild(row);
      else parent.insertBefore(row, parent.firstElementChild);
    }
  });
}

/* --------------------------------------------------------------------
 * Companies + Roles view
 * ------------------------------------------------------------------ */
const _coCardCacheModule = new Map();

function renderCompanies(hub) {
  const container = el('div', 'fade-in space-y-4');
  const verifiedAt = COMPANIES_VERIFIED_AT;
  const LIVE = COMPANIES.filter(c => (c.jobs || []).length > 0);
  const totalJobs = LIVE.reduce((s, c) => s + (c.jobs ? c.jobs.length : 0), 0);
  const verticals = Array.from(new Set(LIVE.map(c => c.vertical)));
  const verticalTabs = ['all', ...verticals]
    .map(v => `<div class="tab${v==='all' ? ' active' : ''}" data-vfilter="${esc(v)}">${v === 'all' ? 'All' : esc(verticalLabel[v] || v)}</div>`)
    .join('');
  const levelTabs = `
    <div class="tab active" data-lfilter="all">All levels</div>
    <div class="tab" data-lfilter="founding">Founding</div>
    <div class="tab" data-lfilter="senior">Senior</div>
    <div class="tab" data-lfilter="mid">Mid</div>`;
  const CAT_LABELS = [
    ['all', 'All'], ['ai-ml', 'AI/ML'], ['backend', 'Backend'],
    ['infra', 'Infra'], ['fde-sales', 'FDE/SE'], ['frontend', 'Frontend'],
  ];
  const categoryTabs = CAT_LABELS
    .map(([v, l]) => `<div class="tab${v==='all' ? ' active' : ''}" data-catfilter="${esc(v)}">${esc(l)}</div>`)
    .join('');

  container.innerHTML = `
    <div>
      <h1 class="font-display text-2xl sm:text-3xl font-semibold">Companies</h1>
      <p class="muted text-sm mt-1">${LIVE.length} startups, ${totalJobs} live NYC engineering postings. Verified ${esc(verifiedAt || 'recently')}. Ranked by fit for your background — sorted highest first.</p>
    </div>

    <div class="flex justify-center">
      <div class="tabs tabs-primary" id="co-mode">
        <span class="tab-thumb" aria-hidden="true"></span>
        <button type="button" class="tab active" data-mode="companies">Companies <span class="ml-1 muted text-[10px] font-mono">${LIVE.length}</span></button>
        <button type="button" class="tab" data-mode="roles">Individual roles <span class="ml-1 muted text-[10px] font-mono">${totalJobs}</span></button>
      </div>
    </div>

    <div class="filter-bar">
      <input id="co-search" type="search" placeholder="Search companies, roles, or investors…" class="search-glass"/>
      <div class="tabs" id="co-filters">
        ${verticalTabs}
        <span class="filter-divider" data-level-only aria-hidden="true"></span>
        ${levelTabs}
      </div>
      <div class="tabs" id="co-cat-filters">
        ${categoryTabs}
      </div>
      <div class="flex items-center gap-2 mt-2">
        <span class="text-[11px] muted">Sort</span>
        <div class="tabs" id="co-sort">
          <div class="tab active" data-co-sort="fit">Top fit</div>
          <div class="tab" data-co-sort="new">Newest</div>
        </div>
      </div>
    </div>

    <div id="co-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    <div id="co-rolelist" class="hidden space-y-1.5"></div>
  `;
  hub.appendChild(container);

  const grid       = container.querySelector('#co-grid');
  const rolelist   = container.querySelector('#co-rolelist');
  const filterBar  = container.querySelector('#co-filters');
  const catBar     = container.querySelector('#co-cat-filters');
  function syncLevelVis() {
    filterBar.classList.toggle('hide-levels', curMode === 'companies');
    if (catBar) catBar.style.display = curMode === 'companies' ? 'none' : '';
  }
  let curMode      = 'companies';
  let curVFilter   = 'all';
  let curLFilter   = 'all';
  let curCatFilter = 'all';
  let curQuery     = '';
  let curSort      = 'fit';
  let _lastCoSort  = null;
  const ROLES_PAGE = 250;
  let   rolesShown = ROLES_PAGE;

  const scoredCos = LIVE.map(c => ({ ...c, _fit: companyFitScore(c), _rec: companyRecency(c) }))
    .sort((a, b) => b._fit - a._fit);
  const scoredRoles = [];
  LIVE.forEach(c => (c.jobs || []).forEach(j => {
    scoredRoles.push({ ...j, _company: c, _fit: roleFitScore(c, j), _rec: jobRecency(j) });
  }));
  scoredRoles.sort((a, b) => b._fit - a._fit);
  const recCos = [...scoredCos].sort((a, b) =>
    (b._rec || '').localeCompare(a._rec || '') || b._fit - a._fit);
  const recRoles = [...scoredRoles].sort((a, b) =>
    (b._rec || '').localeCompare(a._rec || '') || b._fit - a._fit);
  let coOrder = scoredCos;

  function _buildCompanyCard(c) {
    const cardEl = el('div', 'card card-glow block');
    const domain = COMPANY_DOMAINS[c.id];
    const logo = domain
      ? `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" alt="${esc(c.name)} logo" loading="lazy" decoding="async" width="32" height="32" onerror="this.style.display='none';this.parentElement.textContent='${esc(c.name[0])}'" />`
      : esc(c.name[0]);
    const badges = (c.badges || []).slice(0, 3)
      .map(b => `<span class="chip chip-funding">${esc(b)}</span>`).join('');
    const newCount = (c.jobs || []).filter(isNewJob).length;
    const newChip = newCount > 0
      ? `<span class="pill pill-ai" style="font-size:9px;padding:1px 6px">${newCount} new</span>` : '';
    const previewJobs = [...(c.jobs || [])]
      .sort((a, b) => (jobRecency(b) || '').localeCompare(jobRecency(a) || ''))
      .slice(0, 3);
    const total = (c.jobs || []).length;
    const jobsHTML = previewJobs.map(j => {
      const lvl = j.level || 'mid';
      const lvlDot = lvl === 'founding'
        ? '<span class="role-dot" style="background:#7849E0"></span>'
        : (lvl === 'senior'
          ? '<span class="role-dot" style="background:#0EA371"></span>'
          : '<span class="role-dot" style="background:#94A3B8"></span>');
      return `
        <a href="${esc(j.url)}" target="_blank" rel="noopener noreferrer"
           class="role-pill flex items-center gap-2 text-[12px]" title="${esc(j.title)}">
          ${lvlDot}<span class="truncate flex-1 min-w-0">${esc(j.title)}</span>
          <span class="role-arrow muted">↗</span>
        </a>`;
    }).join('');
    const fullCount = c.totalRoles || total;
    const extras = Math.max(0, fullCount - previewJobs.length);
    const overflowLabel = extras > 0
      ? `<div class="text-[11px] mt-1.5 flex items-center justify-between"><span class="muted">+${extras} more open NYC role${extras === 1 ? '' : 's'}</span></div>`
      : '';
    cardEl.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="co-logo">${logo}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 justify-between flex-wrap">
            <div class="font-display font-semibold text-lg truncate">${esc(c.name)} ${newChip}</div>
            ${fitBadgeHTML(c._fit)}
          </div>
          <div class="text-xs muted mt-0.5 truncate">${esc(c.sub)}</div>
          <div class="text-[11px] mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span class="pill ${verticalPill[c.vertical] || 'pill-dev'}" style="font-size:10px;padding:1px 6px">${esc(verticalLabel[c.vertical] || c.vertical)}</span>
            <span class="font-mono tabular-nums" style="color:var(--accent)">${esc(c.raised || '')}</span>
            <span class="dim">·</span>
            <span class="muted">${esc(c.stage || '')}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-1 mt-2.5">${badges}</div>
      <div class="mt-3 pt-3 border-t border-[color:var(--hairline)] space-y-1.5">${jobsHTML}</div>
      ${overflowLabel}
    `;
    return cardEl;
  }

  const _coCardCache = _coCardCacheModule;
  function _getOrBuildCard(scored) {
    let entry = _coCardCache.get(scored.id);
    if (!entry) {
      entry = { el: _buildCompanyCard(scored), scored };
      _coCardCache.set(scored.id, entry);
    }
    return entry.el;
  }

  function _coHay(c) {
    return (c.name+' '+c.sub+' '+(c.notes||'')+' '+(c.badges||[]).join(' ')+' '+(c.lead||'')+' '+(c.jobs||[]).map(j=>j.title).join(' ')).toLowerCase();
  }

  function paintCompanies() {
    const q = curQuery.trim().toLowerCase();
    const matches = new Set();
    for (const c of coOrder) {
      if (curVFilter !== 'all' && c.vertical !== curVFilter) continue;
      if (q && !_coHay(c).includes(q)) continue;
      matches.add(c.id);
    }
    if (grid.childElementCount === 0) {
      const visible = coOrder.filter(c => matches.has(c.id));
      const INITIAL = 18, CHUNK = 8;
      const frag1 = document.createDocumentFragment();
      for (let i = 0; i < Math.min(INITIAL, visible.length); i++) {
        frag1.appendChild(_getOrBuildCard(visible[i]));
      }
      grid.appendChild(frag1);
      let cursor = INITIAL;
      const paintNext = () => {
        if (cursor >= visible.length) return;
        const end = Math.min(cursor + CHUNK, visible.length);
        const f = document.createDocumentFragment();
        for (let i = cursor; i < end; i++) f.appendChild(_getOrBuildCard(visible[i]));
        grid.appendChild(f);
        cursor = end;
        if (cursor < visible.length) requestAnimationFrame(paintNext);
      };
      if (visible.length > INITIAL) requestAnimationFrame(paintNext);
      return;
    }
    const f = document.createDocumentFragment();
    for (const c of coOrder) {
      let entry = _coCardCache.get(c.id);
      if (matches.has(c.id)) {
        const node = entry ? entry.el : _getOrBuildCard(c);
        node.style.display = '';
        f.appendChild(node);
      } else if (entry) {
        entry.el.style.display = 'none';
      }
    }
    grid.appendChild(f);
  }

  function roleCategory(title) {
    const t = (title || '').toLowerCase();
    if (/\b(forward[\s-]deployed|\bfde\b|solutions?\s+engineer|sales\s+engineer|presales\s+engineer)\b/.test(t)) return 'fde-sales';
    if (/\b(ai[/]?ml|machine[\s-]learning|genai|\bllm\b|agentic?|agents?\b|research\s+engineer|mlops|applied\s+ai|\bai\s+engineer|\bml\s+engineer)\b/.test(t)
      || /,\s*(ai|ml|agents?|agentic|research|genai|llm|mlops)\b/.test(t)) return 'ai-ml';
    if (/\b(frontend|front[\s-]end|ui\s+engineer|fe\s+engineer|ios|android|mobile)\b/.test(t)
      || /,\s*(frontend|front[\s-]end|ui|ios|android|mobile)\b/.test(t)) return 'frontend';
    if (/\b(security|devops|\bsre\b|site\s+reliability|infrastructure|platform\s+engineer|cloud\s+engineer|reliability\s+engineer|production\s+engineer|data\s+(engineer|platform))\b/.test(t)
      || /,\s*(security|platform|infrastructure|infra|cloud|devops|production\s+engineering|developer\s+platform|developer\s+productivity|developer\s+experience|data)\b/.test(t)) return 'infra';
    return 'backend';
  }

  function paintRoles() {
    rolelist.innerHTML = '';
    const q = curQuery.trim().toLowerCase();
    const base = curSort === 'new' ? recRoles : scoredRoles;
    const filtered = base.filter(r => {
      if (curVFilter !== 'all' && r._company.vertical !== curVFilter) return false;
      if (curLFilter !== 'all' && r.level !== curLFilter) return false;
      if (curCatFilter !== 'all' && roleCategory(r.title) !== curCatFilter) return false;
      if (!q) return true;
      const hay = (r.title + ' ' + r._company.name + ' ' + r._company.sub + ' ' + (r._company.badges||[]).join(' ')).toLowerCase();
      return hay.includes(q);
    });
    // Push already-applied rows to the bottom (preserves the primary
    // sort within each group).
    {
      const open = [], done = [];
      for (const r of filtered) {
        (isApplied(makeRoleKey(r._company, r)) ? done : open).push(r);
      }
      filtered.length = 0;
      for (const r of open) filtered.push(r);
      for (const r of done) filtered.push(r);
    }
    if (filtered.length === 0) {
      rolelist.innerHTML = '<div class="muted text-sm py-6 text-center">No roles match your filters.</div>';
      return;
    }
    const cap = Math.min(rolesShown, filtered.length);
    const remaining = Math.max(0, filtered.length - cap);
    const head = `<div class="text-[11px] muted">${filtered.length} role${filtered.length===1?'':'s'} matched, sorted by ${curSort === 'new' ? 'newest' : 'fit'}${remaining>0?` · showing top ${cap}`:''}</div>`;
    const rows = filtered.slice(0, cap).map(r => {
      const c = r._company;
      const roleKey = makeRoleKey(c, r);
      const checked = isApplied(roleKey);
      const domain = COMPANY_DOMAINS[c.id];
      const logoMini = domain
        ? `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" alt="${esc(c.name)}" loading="lazy" decoding="async" width="28" height="28" style="width:28px;height:28px;border-radius:7px;flex-shrink:0;object-fit:cover" onerror="this.style.display='none'"/>`
        : `<div class="role-row-letter">${esc(c.name[0])}</div>`;
      const lvl = r.level || 'mid';
      const lvlClass = lvl === 'founding' ? 'pill-ai' : (lvl === 'senior' ? 'pill-both' : 'pill-dev');
      const lvlLabel = lvl === 'founding' ? 'Founding' : (lvl === 'senior' ? 'Senior' : 'Mid');
      const dateStr = fmtDate(r.posted || r.added);
      const newTag = isNewJob(r) ? '<span class="pill pill-ai" style="font-size:9px;padding:1px 5px">New</span>' : '';
      return `
        <div class="role-row" data-role-row data-role-key="${esc(roleKey)}" data-role-url="${esc(r.url)}"
             data-co-id="${esc(c.id)}" data-co-name="${esc(c.name)}" data-role-title="${esc(r.title)}">
          <span class="applied-cb" data-apply-toggle data-checked="${checked ? '1' : '0'}"
                role="checkbox" aria-checked="${checked ? 'true' : 'false'}"
                aria-label="Mark as applied"></span>
          ${logoMini}
          <div class="role-row-text">
            <div class="role-row-title truncate">${esc(r.title)} ${newTag}</div>
            <div class="role-row-co truncate">
              <span class="font-medium">${esc(c.name)}</span>
              <span class="dim mx-1">·</span>
              <span class="muted">${esc(verticalLabel[c.vertical] || c.vertical)}</span>
              <span class="dim mx-1">·</span>
              <span class="muted">${esc(c.stage || '')}</span>
              <span class="dim mx-1">·</span>
              <span style="color:var(--accent)" class="font-mono">${esc(c.raised || '')}</span>
              ${dateStr ? `<span class="dim mx-1">·</span><span class="muted">${esc(dateStr)}</span>` : ''}
            </div>
          </div>
          <span class="pill ${lvlClass}" style="font-size:10px">${lvlLabel}</span>
          ${fitBadgeHTML(r._fit)}
          <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"
             onclick="event.stopPropagation()"
             style="color:var(--accent); text-decoration:none; padding:4px 6px;">↗</a>
        </div>`;
    }).join('');
    const loadMore = remaining > 0
      ? `<div class="text-center mt-4"><button class="btn btn-ghost text-[12.5px]" data-roles-load-more>Load ${Math.min(ROLES_PAGE, remaining)} more <span class="muted ml-1">(${remaining} remaining)</span></button></div>`
      : '';
    rolelist.innerHTML = head + '<div class="space-y-1.5 mt-2">' + rows + '</div>' + loadMore;
    const btn = rolelist.querySelector('[data-roles-load-more]');
    if (btn) {
      btn.addEventListener('click', () => {
        rolesShown += ROLES_PAGE;
        paintRoles();
      });
    }
  }

  function paint() {
    syncLevelVis();
    coOrder = curSort === 'new' ? recCos : scoredCos;
    if (curMode === 'companies') {
      grid.classList.remove('hidden');
      rolelist.classList.add('hidden');
      if (_lastCoSort !== null && _lastCoSort !== curSort) grid.innerHTML = '';
      _lastCoSort = curSort;
      paintCompanies();
    } else {
      grid.classList.add('hidden');
      rolelist.classList.remove('hidden');
      paintRoles();
    }
  }
  paint();
  bindApplyToggles(rolelist);

  function syncThumb() {
    const modeEl = container.querySelector('#co-mode');
    if (!modeEl) return;
    const active = modeEl.querySelector('.tab.active');
    if (!active) return;
    const parentRect = modeEl.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    modeEl.style.setProperty('--thumb-x', (r.left - parentRect.left) + 'px');
    modeEl.style.setProperty('--thumb-w', r.width + 'px');
  }
  requestAnimationFrame(syncThumb);
  window.addEventListener('resize', syncThumb, { passive: true });

  container.querySelectorAll('#co-mode .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('#co-mode .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      curMode = tab.dataset.mode;
      syncThumb();
      paint();
    });
  });
  container.querySelectorAll('#co-filters .tab, #co-cat-filters .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.vfilter) {
        container.querySelectorAll('#co-filters .tab[data-vfilter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        curVFilter = tab.dataset.vfilter;
      } else if (tab.dataset.lfilter) {
        container.querySelectorAll('#co-filters .tab[data-lfilter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        curLFilter = tab.dataset.lfilter;
      } else if (tab.dataset.catfilter) {
        container.querySelectorAll('#co-cat-filters .tab[data-catfilter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        curCatFilter = tab.dataset.catfilter;
      }
      rolesShown = ROLES_PAGE;
      paint();
    });
  });
  container.querySelectorAll('#co-sort .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.coSort === curSort) return;
      container.querySelectorAll('#co-sort .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      curSort = tab.dataset.coSort;
      rolesShown = ROLES_PAGE;
      paint();
    });
  });
  const search = container.querySelector('#co-search');
  let _searchDebounce = 0;
  search.addEventListener('input', e => {
    curQuery = e.target.value;
    rolesShown = ROLES_PAGE;
    clearTimeout(_searchDebounce);
    _searchDebounce = setTimeout(paint, 150);
  });
  search.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      search.value = ''; curQuery = '';
      clearTimeout(_searchDebounce);
      paint();
      search.blur();
    }
  });
}

/* --------------------------------------------------------------------
 * Bootstrap
 * ------------------------------------------------------------------ */
window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) renderCompanies(root);
});

})();
