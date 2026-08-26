#!/usr/bin/env node
/* build-profile.js — compile profiles/<id>.json into js/<id>-profile.js, the
 * config the browser board reads.
 *
 *   node scripts/build-profile.js sean
 *   node scripts/build-profile.js --all
 *
 * One source of truth: the same JSON drives the fetch stage (regexes, candidate
 * companies) and the render stage (labels, categories, scoring tables). The
 * fetch-only keys are dropped here so the browser doesn't download a candidate
 * list it never looks at. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const ids = args.includes('--all')
  ? fs.readdirSync(path.join(ROOT, 'profiles'))
      .filter((f) => f.endsWith('.json') && !f.endsWith('.companies.json'))
      .map((f) => f.replace(/\.json$/, ''))
  : args;

if (!ids.length) {
  console.error('usage: node scripts/build-profile.js <id>… | --all');
  process.exit(1);
}

// Keys the fetch stage owns; the page never reads them.
const FETCH_ONLY = new Set(['companies', 'filters', 'levelOrder']);

for (const id of ids) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'profiles', `${id}.json`), 'utf8'));
  const out = {};
  for (const [k, v] of Object.entries(src)) if (!FETCH_ONLY.has(k)) out[k] = v;
  // categoryFallback must name a real category, or roles silently vanish from
  // every filtered view.
  const keys = new Set((out.categories || []).map((c) => c.key));
  if (out.categoryFallback && !keys.has(out.categoryFallback)) {
    console.error(`${id}: categoryFallback "${out.categoryFallback}" is not a category key`);
    process.exit(1);
  }
  const dest = path.join(ROOT, src.profileScript || `js/${id}-profile.js`);
  const body = [
    `// ${id} — board profile (generated from profiles/${id}.json; do not hand-edit)`,
    `// Rebuild: node scripts/build-profile.js ${id}`,
    `window.BOARD_PROFILE = ${JSON.stringify(out, null, 2)};`,
    '',
  ].join('\n');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body);
  console.log(`${id} -> ${path.relative(ROOT, dest)} (${(body.length / 1024).toFixed(1)} KB)`);
}
