/* Shared serializer for the COMPANIES block.
 *
 * There were two copies of this — one in merge-additive.js, one in
 * check-dead.js — and they drifted: when `remote`, `loc`, `pay`, `paySource`
 * and `years` were added, only the merge side learned about them. Every prune
 * then silently stripped those fields, which is how thirteen remote roles came
 * to be labelled New York on Sean's board. One copy, imported by both. */
'use strict';

const esc = (s) => JSON.stringify(String(s)).slice(1, -1).replace(/—/g, '\\u2014');

// Order matters only for diff readability; every optional field is emitted
// when present. Adding a job field means adding it HERE and nowhere else.
function emitJob(j) {
  let s = `      { title:"${esc(j.title)}", url:"${esc(j.url)}"`;
  if (j.level) s += `, level:"${esc(j.level)}"`;
  if (j.added) s += `, added:"${esc(j.added)}"`;
  if (j.posted) s += `, posted:"${esc(j.posted)}"`;
  if (j.remote) s += ', remote:true';
  if (j.loc) s += `, loc:"${esc(j.loc)}"`;
  if (j.pay) s += `, pay:${JSON.stringify(j.pay)}`;
  if (j.paySource) s += `, paySource:"${esc(j.paySource)}"`;
  if (j.years !== undefined && j.years !== null) s += `, years:${j.years}`;
  return s + ' }';
}

function emitCompany(c) {
  const L = [];
  L.push(`  { id:${JSON.stringify(c.id)}, name:"${esc(c.name)}", vertical:${JSON.stringify(c.vertical)},`);
  if (c.sub !== undefined) L.push(`    sub:"${esc(c.sub)}",`);
  const meta = [];
  if (c.stage !== undefined) meta.push(`stage:"${esc(c.stage)}"`);
  if (c.raised !== undefined) meta.push(`raised:"${esc(c.raised)}"`);
  if (c.lead !== undefined) meta.push(`lead:"${esc(c.lead)}"`);
  if (meta.length) L.push('    ' + meta.join(', ') + ',');
  if (c.badges !== undefined) L.push(`    badges:${JSON.stringify(c.badges)},`);
  if (c.totalRoles !== undefined) L.push(`    totalRoles:${c.totalRoles},`);
  if (c.notes !== undefined) L.push(`    notes:"${esc(c.notes)}",`);
  L.push('    jobs:[');
  L.push((c.jobs || []).map(emitJob).join(',\n'));
  L.push('    ] }');
  return L.join('\n');
}

function emitCompaniesBlock(companies) {
  return 'const COMPANIES = [\n' + companies.map(emitCompany).join(',\n') + '\n];';
}

module.exports = { esc, emitJob, emitCompany, emitCompaniesBlock };
