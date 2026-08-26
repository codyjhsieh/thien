// Shared job-board renderer — one file, many boards.
// Reads window.BOARD_PROFILE (js/<id>-profile.js) + the data global it names,
// then renders the Companies + Individual Roles views for that profile.
// Applied-state persists to localStorage under the profile's storageKey.

'use strict';

// IIFE so our `const COMPANIES` destructuring doesn't collide with the
// same-named top-level const already declared by data.js in the shared
// classic-script scope (which throws SyntaxError and blanks the page).
(function () {

// Every board in this repo is the same renderer pointed at a different
// profile: js/<id>-profile.js sets window.BOARD_PROFILE (generated from
// profiles/<id>.json), and the data file it names supplies the postings.
const P = window.BOARD_PROFILE;
if (!P) throw new Error('board.js: no window.BOARD_PROFILE — load js/<id>-profile.js first');
const DATA = window[P.dataGlobal || 'DATA'];
if (!DATA) throw new Error(`board.js: window.${P.dataGlobal} is missing — load the data file first`);
const { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT } = DATA;

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
// Profile patterns arrive as strings so one regex source can drive both the
// Python fetch stage and this renderer. Compile each pattern once.
const _reCache = new Map();
function rx(src) {
  let r = _reCache.get(src);
  if (!r) { r = new RegExp(src, 'i'); _reCache.set(src, r); }
  return r;
}

/* --------------------------------------------------------------------
 * Vertical labelling (profile-supplied)
 * ------------------------------------------------------------------ */
const verticalPill  = (P.verticals && P.verticals.pills)  || {};
const verticalLabel = (P.verticals && P.verticals.labels) || {};

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
 * Fit scoring — every table below comes from the profile, so tuning a
 * board means editing profiles/<id>.json, never this file.
 *
 *   fit = coolness × P(reply) × P(bar-pass) × penalties
 *
 * then percentile-mapped across the board's own role pool onto 0.5-10.0.
 * ------------------------------------------------------------------ */
const S = P.scoring || {};
const GROUPS = {};
for (const [name, ids] of Object.entries(S.groups || {})) GROUPS[name] = new Set(ids);
function inGroup(name, id) {
  const g = GROUPS[name];
  return !!g && g.has(id);
}

function _coolness(c) {
  const cool = S.coolness || {};
  if (cool.map && c.id in cool.map) return cool.map[c.id];
  const byV = cool.byVertical || {};
  if (c.vertical in byV) return byV[c.vertical];
  return cool.default != null ? cool.default : 5;
}

function _clamp(v, range, lo, hi) {
  const [a, b] = range || [lo, hi];
  return Math.max(a, Math.min(b, v));
}

function _candidateMult(c) {
  const cfg = S.candidateMult || {};
  let m = 1.0;
  const stage = (c.stage || '').toLowerCase();
  for (const [pat, mult] of cfg.stageBoost || []) {
    if (rx(pat).test(stage)) m *= mult;
  }
  for (const [group, mult] of Object.entries(cfg.groupMult || {})) {
    if (inGroup(group, c.id)) m *= mult;
  }
  return _clamp(m, cfg.clamp, 0.2, 1.4);
}

function _replyProb(c) {
  const cfg = S.replyProb || {};
  let p = cfg.base != null ? cfg.base : 0.14;
  const stage = (c.stage || '').toLowerCase();
  // First matching row wins — the table is ordered seed -> late.
  for (const [pat, val] of cfg.stageTable || []) {
    if (rx(pat).test(stage)) { p = val; break; }
  }
  for (const [group, mult] of Object.entries(cfg.groupMult || {})) {
    if (inGroup(group, c.id)) p *= mult;
  }
  const roles = (c.jobs || []).length;
  for (const [threshold, mult] of cfg.roleCountPenalty || []) {
    if (roles > threshold) { p *= mult; break; }
  }
  p *= _candidateMult(c);
  return _clamp(p, cfg.clamp, 0.03, 0.45);
}

function _passProb(c, j) {
  const cfg = S.passProb || {};
  const t = ((j && j.title) || '').toLowerCase();
  let p = cfg.base != null ? cfg.base : 0.35;
  for (const [pat, delta] of cfg.titleRules || []) {
    if (rx(pat).test(t)) p += delta;
  }
  const bonus = cfg.levelBonus || {};
  if (j && j.level && j.level in bonus) p += bonus[j.level];
  return _clamp(p, cfg.clamp, 0.05, 0.7);
}

// Taste penalties — multiplicative on raw fit BEFORE percentile normalization.
function _penalties(c, j) {
  let m = 1.0;
  for (const rule of S.penalties || []) {
    if (rule.ids && rule.ids.includes(c.id)) { m *= rule.mult; continue; }
    if (rule.titleMatch && j && rx(rule.titleMatch).test(j.title || '')) m *= rule.mult;
  }
  return m;
}

/* --------------------------------------------------------------------
 * Percentile-normalized fit score (0.5 - 10.0 on display)
 * ------------------------------------------------------------------ */
let _fitPool = null;
function _rawFit(c, j) {
  return (_coolness(c) / 10) * _replyProb(c) * _passProb(c, j) * _penalties(c, j);
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
const TIERS = S.tiers || [
  { min: 8,  label: 'Goldilocks',   cls: 'fit-strong' },
  { min: 5,  label: 'Worth trying', cls: 'fit-worth'  },
  { min: 2,  label: 'Long shot',    cls: 'fit-long'   },
  { min: -1, label: 'Tough bar',    cls: 'fit-tough'  },
];
function fitTier(score) {
  for (const t of TIERS) if (score >= t.min) return t;
  return TIERS[TIERS.length - 1];
}
function fitBadgeHTML(score) {
  const tier = fitTier(score);
  const shown = score >= 10 ? '10' : score.toFixed(1);
  return `<span class="fit-badge ${tier.cls}" title="${esc(tier.label)} · ${shown}/10">
    <span class="fit-num">${shown}</span>
  </span>`;
}

/* --------------------------------------------------------------------
 * Level + category tables (profile-supplied)
 * ------------------------------------------------------------------ */
const LEVELS = P.levels || [
  { key: 'all', label: 'All levels' }, { key: 'entry', label: 'Entry' }, { key: 'mid', label: 'Mid' },
];
const LEVEL_LABEL = {};
for (const l of LEVELS) if (l.key !== 'all') LEVEL_LABEL[l.key] = l.label;
const LEVEL_PILL = P.levelPills || { entry: 'pill-both', mid: 'pill-dev', senior: 'pill-ai' };
const DEFAULT_LEVEL = P.defaultLevel || 'mid';
const CATEGORIES = P.categories || [{ key: 'all', label: 'All' }];
// First matching category wins; anything unmatched lands in the fallback so a
// role can never disappear from every filtered view.
function roleCategory(title) {
  const t = (title || '').toLowerCase();
  for (const c of CATEGORIES) {
    if (c.key === 'all' || !c.match) continue;
    if (rx(c.match).test(t)) return c.key;
  }
  return P.categoryFallback || (CATEGORIES[1] && CATEGORIES[1].key) || 'all';
}

function makeRoleKey(company, job) {
  const u = (job && job.url) || '';
  return `${company.id}::${u}`;
}

/* --------------------------------------------------------------------
 * Applied-state — persisted to localStorage as a JSON array of keys
 * ------------------------------------------------------------------ */
const APPLIED_KEY = P.storageKey || 'board_applied';
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
  const levelTabs = LEVELS
    .map(l => `<div class="tab${l.key === 'all' ? ' active' : ''}" data-lfilter="${esc(l.key)}">${esc(l.label)}</div>`)
    .join('');
  const categoryTabs = CATEGORIES
    .map(c => `<div class="tab${c.key === 'all' ? ' active' : ''}" data-catfilter="${esc(c.key)}">${esc(c.label)}</div>`)
    .join('');

  container.innerHTML = `
    <header class="text-center mb-2">
      <h1 class="font-display text-3xl sm:text-4xl font-semibold tracking-tight">${esc(P.boardTitle || 'Job Board')}</h1>
    </header>
    <div>
      <h2 class="font-display text-xl sm:text-2xl font-semibold">${esc(P.headline || 'Companies')}</h2>
      <p class="muted text-sm mt-1">${LIVE.length} companies, ${totalJobs} ${esc(P.blurb || 'live postings.')} Verified ${esc(verifiedAt || 'recently')}.</p>
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
    const jobsHTML = previewJobs.filter(Boolean).map(j => {
      const lvl = j.level || DEFAULT_LEVEL;
      const lvlDot = lvl === 'entry'
        ? '<span class="role-dot" style="background:#0EA371"></span>'
        : '<span class="role-dot" style="background:#94A3B8"></span>';
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
      const lvl = r.level || DEFAULT_LEVEL;
      const lvlClass = LEVEL_PILL[lvl] || 'pill-dev';
      const lvlLabel = LEVEL_LABEL[lvl] || lvl;
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
  if (P.docTitle) document.title = P.docTitle;
  const root = document.getElementById('root');
  if (root) renderCompanies(root);
});

})();
