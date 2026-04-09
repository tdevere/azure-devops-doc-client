#!/usr/bin/env node

/**
 * Pick the next batch of untested GET operations for a test-request issue.
 *
 * Dynamically discovers what's already tested by scanning:
 *   - tests/issue-*.test.ts files for operation IDs
 *   - tests/integration.smoke.test.ts for operation IDs
 *   - tmp/api-test-results.json for pass/documented-skip results
 *   - src/known-failures.json for documented failures
 *
 * Usage:
 *   node scripts/pick-next-batch.mjs [count]      # default 20
 *   node scripts/pick-next-batch.mjs --json        # output as JSON array
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { listOperations } from '../dist/index.js';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const count = parseInt(args.find(a => /^\d+$/.test(a)) || '20', 10);

const ops = listOperations('services');

// ---------------------------------------------------------------------------
// Build the "already covered" set dynamically
// ---------------------------------------------------------------------------
const covered = new Set();

// 1. Scan test files for operation IDs
const opIdRe = /(services|server)\.[a-z0-9._-]+\.[a-z0-9._-]+\.[a-z0-9._-]+/gi;

try {
  const testFiles = readdirSync('tests').filter(f => f.endsWith('.test.ts'));
  for (const f of testFiles) {
    const content = readFileSync(`tests/${f}`, 'utf-8');
    let m;
    while ((m = opIdRe.exec(content)) !== null) covered.add(m[0]);
  }
} catch { /* no tests dir */ }

// 2. Read runner results (pass = tested, documented-skip = known)
if (existsSync('tmp/api-test-results.json')) {
  try {
    const results = JSON.parse(readFileSync('tmp/api-test-results.json', 'utf-8'));
    for (const r of results.results || []) {
      if (r.status === 'pass' || r.status === 'documented-skip') covered.add(r.id);
    }
  } catch { /* corrupt file */ }
}

// 3. Read known-failures (documented, don't re-test)
if (existsSync('src/known-failures.json')) {
  try {
    const known = JSON.parse(readFileSync('src/known-failures.json', 'utf-8'));
    for (const id of Object.keys(known)) covered.add(id);
  } catch { /* bad json */ }
}

// ---------------------------------------------------------------------------
// Build per-service coverage stats for prioritization
// ---------------------------------------------------------------------------
const svcStats = {};
for (const op of ops) {
  const svc = op.serviceKey;
  if (!svcStats[svc]) svcStats[svc] = { total: 0, covered: 0 };
  svcStats[svc].total++;
  if (covered.has(op.id)) svcStats[svc].covered++;
}

// Sort services by coverage % ascending (prioritize least-covered)
const svcPriority = Object.entries(svcStats)
  .map(([svc, s]) => ({ svc, pct: s.total > 0 ? s.covered / s.total : 1 }))
  .sort((a, b) => a.pct - b.pct)
  .map(s => s.svc);

// ---------------------------------------------------------------------------
// Pick operations: lowest-coverage services first, all methods
// ---------------------------------------------------------------------------
const picks = [];

// Method priority: GET/HEAD first (read-only), then POST/PATCH/PUT, DELETE last
const methodPriority = { GET: 0, HEAD: 0, POST: 1, PATCH: 1, PUT: 1, DELETE: 2 };

for (const svc of svcPriority) {
  if (picks.length >= count) break;
  const svcOps = ops
    .filter(op => op.serviceKey === svc && !covered.has(op.id))
    .sort((a, b) => {
      const ma = a.requestTemplates?.[0]?.method ?? 'POST';
      const mb = b.requestTemplates?.[0]?.method ?? 'POST';
      return (methodPriority[ma] ?? 1) - (methodPriority[mb] ?? 1);
    });
  for (const op of svcOps) {
    if (picks.length >= count) break;
    picks.push(op.id);
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
if (jsonMode) {
  console.log(JSON.stringify(picks));
} else {
  picks.forEach(p => console.log(p));
}

if (!jsonMode) {
  console.error(`\nPicked ${picks.length} ops (${covered.size} already covered out of ${ops.length} total)`);
}
