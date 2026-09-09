#!/usr/bin/env node
/* Round-trip test for the COMPANIES serializer.
 *
 * The bug this exists to prevent: a job field the fetch stage writes, the
 * merge preserves, and the prune silently drops — because the two had separate
 * copies of the serializer. Thirteen remote roles shipped labelled New York
 * that way. Any new field must survive a write/read cycle here. */
'use strict';
const fs = require('fs');
const { emitCompaniesBlock } = require('./lib-emit');

const company = {
  id: 'acme', name: 'Acme', vertical: 'bpo', sub: 'Test', stage: 'Private',
  raised: '—', lead: '—', badges: ['X'], totalRoles: 2, notes: 'Note',
  jobs: [
    { title: 'Data Entry Clerk', url: 'https://example.com/1', level: 'entry',
      added: '2026-01-01', posted: '2026-01-01', remote: true, loc: 'Remote, US',
      pay: { min: 18, max: 24, interval: 'hour' }, paySource: 'posted', years: 0,
      summary: 'Enter and verify records in our internal tools. Training provided.' },
    { title: 'Admin Assistant', url: 'https://example.com/2', level: 'mid' },
  ],
};

const src = emitCompaniesBlock([company]);
// eslint-disable-next-line no-eval
const back = eval('(' + src.slice(src.indexOf('['), src.lastIndexOf(']') + 1) + ')');

const errs = [];
const a = company.jobs[0], b = back[0].jobs[0];
for (const k of Object.keys(a)) {
  if (JSON.stringify(b[k]) !== JSON.stringify(a[k])) {
    errs.push(`job field '${k}' did not survive: ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`);
  }
}
for (const k of Object.keys(company)) {
  if (k === 'jobs') continue;
  if (JSON.stringify(back[0][k]) !== JSON.stringify(company[k])) {
    errs.push(`company field '${k}' did not survive`);
  }
}
// A job with only the required fields must not gain phantom ones.
for (const k of ['remote', 'pay', 'paySource', 'years', 'loc', 'summary']) {
  if (k in back[0].jobs[1]) errs.push(`absent field '${k}' was invented on the second job`);
}

if (errs.length) {
  errs.forEach((e) => console.error('  ✗ ' + e));
  process.exit(1);
}
console.log(`   ✓ serializer: every field round-trips (${Object.keys(a).length} job fields)`);

/* Both pruners rewrite the COMPANIES statement in place, and the arithmetic is
 * easy to get subtly wrong — splicing at the opening bracket instead of at the
 * declaration produces "const COMPANIES = const COMPANIES = [", which parses
 * fine as text and breaks the board on load. Prove the rewritten file still
 * evaluates and still exposes what the renderer reads. */
const { pruneDeadUrls } = require('./lib-emit');
const file =
  `const COMPANIES_VERIFIED_AT = '2026-01-01';\n` +
  emitCompaniesBlock([company]) +
  `\nconst COMPANY_DOMAINS = {};\n` +
  `window.DEMO = { COMPANIES, COMPANY_DOMAINS, COMPANIES_VERIFIED_AT };\n`;

const spliceErrs = [];
// Prune the second job. The first survives, so the company stays.
const one = pruneDeadUrls(file, [JSON.parse(JSON.stringify(company))],
                          [company.jobs[1].url]);
if ((one.src.match(/const COMPANIES = \[/g) || []).length !== 1) {
  spliceErrs.push('rewritten file declares COMPANIES more than once');
}
if (one.emptied !== 0) spliceErrs.push(`pruning one of two jobs emptied ${one.emptied} companies`);

const tmp = require('path').join(require('os').tmpdir(), `emit-splice-${process.pid}.js`);
fs.writeFileSync(tmp, one.src);
try {
  global.window = {};
  require(tmp);
  const got = global.window.DEMO;
  if (!got) spliceErrs.push('rewritten file did not set its global');
  else if (got.COMPANIES.length !== 1 || got.COMPANIES[0].jobs.length !== 1) {
    spliceErrs.push(`rewritten file holds ${got.COMPANIES.length} companies / ` +
                    `${got.COMPANIES[0] ? got.COMPANIES[0].jobs.length : '?'} jobs, wanted 1/1`);
  } else if (got.COMPANIES[0].totalRoles !== 1) {
    spliceErrs.push(`totalRoles is ${got.COMPANIES[0].totalRoles} after pruning, wanted 1`);
  } else if (got.COMPANIES_VERIFIED_AT !== '2026-01-01') {
    spliceErrs.push('the rewrite clobbered a constant outside the COMPANIES block');
  }
} catch (e) {
  spliceErrs.push(`rewritten file does not parse: ${e.message.split('\n')[0]}`);
} finally {
  fs.unlinkSync(tmp);
}

// Prune every job. The company has nothing left to render, so it must go —
// verify-board.py rejects an empty shell.
const all = pruneDeadUrls(file, [JSON.parse(JSON.stringify(company))],
                          company.jobs.map((j) => j.url));
if (all.kept.length !== 0) spliceErrs.push('a company with every posting dead was kept');
if (all.emptied !== 1) spliceErrs.push(`emptied count is ${all.emptied}, wanted 1`);

if (spliceErrs.length) {
  spliceErrs.forEach((e) => console.error('  ✗ ' + e));
  process.exit(1);
}
console.log('   ✓ prune: file still parses, totalRoles follows, emptied companies drop');
