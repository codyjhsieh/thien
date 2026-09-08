#!/usr/bin/env node
/* Round-trip test for the COMPANIES serializer.
 *
 * The bug this exists to prevent: a job field the fetch stage writes, the
 * merge preserves, and the prune silently drops — because the two had separate
 * copies of the serializer. Thirteen remote roles shipped labelled New York
 * that way. Any new field must survive a write/read cycle here. */
'use strict';
const { emitCompaniesBlock } = require('./lib-emit');

const company = {
  id: 'acme', name: 'Acme', vertical: 'bpo', sub: 'Test', stage: 'Private',
  raised: '—', lead: '—', badges: ['X'], totalRoles: 2, notes: 'Note',
  jobs: [
    { title: 'Data Entry Clerk', url: 'https://example.com/1', level: 'entry',
      added: '2026-01-01', posted: '2026-01-01', remote: true, loc: 'Remote, US',
      pay: { min: 18, max: 24, interval: 'hour' }, paySource: 'posted', years: 0 },
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
for (const k of ['remote', 'pay', 'paySource', 'years', 'loc']) {
  if (k in back[0].jobs[1]) errs.push(`absent field '${k}' was invented on the second job`);
}

if (errs.length) {
  errs.forEach((e) => console.error('  ✗ ' + e));
  process.exit(1);
}
console.log(`   ✓ serializer: every field round-trips (${Object.keys(a).length} job fields)`);
