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
  if (j.summary) s += `, summary:"${esc(j.summary)}"`;
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

/* Swap the COMPANIES block in a data file for a new one.
 *
 * Both pruners rewrite the same statement, and both got the index arithmetic
 * wrong once: emitCompaniesBlock returns "const COMPANIES = [ … ];" including
 * the declaration, so splicing it in at the opening bracket writes
 * "const COMPANIES = const COMPANIES = [" and the file stops parsing. One
 * implementation, one test. */
function replaceCompaniesBlock(src, companies) {
  const a = src.indexOf('const COMPANIES = [');
  if (a < 0) throw new Error('no `const COMPANIES = [` in the data file');
  const e = src.indexOf('\n];', a);
  if (e < 0) throw new Error('COMPANIES block is not terminated by `\\n];`');
  return src.slice(0, a) + emitCompaniesBlock(companies) + src.slice(e + 3);
}

/* Drop a set of posting urls from a data file and hand back the new source.
 *
 * Both pruners had their own copy of this and neither was exercised: the branch
 * only runs when something is actually dead, so check-dead.js shipped a
 * `ReferenceError: kept is not defined` for as long as the branch existed and
 * nobody saw it until a Recruitee board finally retired a posting. One
 * function, one test that runs on every pipeline invocation. */
function pruneDeadUrls(src, companies, deadUrls) {
  const gone = deadUrls instanceof Set ? deadUrls : new Set(deadUrls);
  for (const c of companies) {
    c.jobs = (c.jobs || []).filter((j) => !gone.has(j.url));
    c.totalRoles = c.jobs.length;
  }
  // A company whose last posting just died is dropped rather than left as an
  // empty card: verify-board.py rejects those and the board cannot render one.
  const kept = companies.filter((c) => c.jobs.length);
  return { src: replaceCompaniesBlock(src, kept), kept, emptied: companies.length - kept.length };
}

module.exports = { esc, emitJob, emitCompany, emitCompaniesBlock, replaceCompaniesBlock, pruneDeadUrls };
