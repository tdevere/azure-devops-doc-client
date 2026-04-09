#!/usr/bin/env node

/**
 * API Coverage Report — Shows which operations are tested vs untested.
 *
 * Usage:
 *   node scripts/api-coverage.mjs                     # full summary
 *   node scripts/api-coverage.mjs --service git        # filter by service
 *   node scripts/api-coverage.mjs --untested           # list only untested operations
 *   node scripts/api-coverage.mjs --json               # machine-readable output
 *
 * Reads test results from tmp/api-test-results.json if available.
 * Also parses integration.smoke.test.ts to find operations covered by vitest.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';

const { operationCatalog } = await import('../dist/index.js');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const jsonOutput = flags.has('--json');
const untestedOnly = flags.has('--untested');

function flagValue(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const flavorFilter = flagValue('--flavor') ?? 'services';
const serviceFilter = flagValue('--service');

// 1. Gather operations covered by the vitest integration smoke tests
const vitestCovered = new Set();
const smokeFile = 'tests/integration.smoke.test.ts';
if (existsSync(smokeFile)) {
  const content = readFileSync(smokeFile, 'utf-8');
  const invokePattern = /invoke\(['"]([^'"]+)['"]/g;
  let match;
  while ((match = invokePattern.exec(content)) !== null) {
    vitestCovered.add(match[1]);
  }
}

// 1b. Scan ALL test files for operation IDs (issue-dispatch-*.test.ts, etc.)
const testFileCovered = new Set();
const opIdRe = /(services|server)\.[a-z0-9._-]+\.[a-z0-9._-]+\.[a-z0-9._-]+/gi;
try {
  const testFiles = readdirSync('tests').filter(f => f.endsWith('.test.ts') && f !== 'integration.smoke.test.ts');
  for (const f of testFiles) {
    const content = readFileSync(`tests/${f}`, 'utf-8');
    let m;
    while ((m = opIdRe.exec(content)) !== null) testFileCovered.add(m[0]);
  }
} catch { /* no tests dir */ }

// 1c. Read known-failures (documented, counted as covered)
const knownFailures = new Set();
const knownFile = 'src/known-failures.json';
if (existsSync(knownFile)) {
  try {
    const known = JSON.parse(readFileSync(knownFile, 'utf-8'));
    for (const id of Object.keys(known)) knownFailures.add(id);
  } catch { /* bad json */ }
}

// 2. Gather operations covered by the API test runner (last run results)
const runnerCovered = new Map(); // id -> status
const resultsFile = 'tmp/api-test-results.json';
if (existsSync(resultsFile)) {
  try {
    const data = JSON.parse(readFileSync(resultsFile, 'utf-8'));
    for (const r of data.results) {
      runnerCovered.set(r.id, r.status);
    }
  } catch {
    // Ignore parse errors
  }
}

// 3. Build coverage map
let operations = operationCatalog.filter((op) => op.flavor === flavorFilter);
if (serviceFilter) {
  const lc = serviceFilter.toLowerCase();
  operations = operations.filter((op) => op.serviceKey.toLowerCase().includes(lc));
}

const coverageData = [];

for (const op of operations) {
  const inVitest = vitestCovered.has(op.id);
  const inTestFiles = testFileCovered.has(op.id);
  const inKnownFailures = knownFailures.has(op.id);
  const runnerResult = runnerCovered.get(op.id) ?? null;
  const tested = inVitest || inTestFiles || inKnownFailures || runnerResult === 'pass';

  coverageData.push({
    id: op.id,
    service: op.service,
    group: op.group,
    action: op.action,
    method: op.requestTemplates[0]?.method ?? '?',
    preview: op.isPreview,
    vitestCovered: inVitest,
    testFileCovered: inTestFiles,
    knownFailure: inKnownFailures,
    runnerResult,
    tested,
  });
}

const testedCount = coverageData.filter((c) => c.tested).length;
const total = coverageData.length;
const pct = total > 0 ? ((testedCount / total) * 100).toFixed(1) : '0.0';

// 4. Aggregate by service
const byService = new Map();
for (const c of coverageData) {
  if (!byService.has(c.service)) {
    byService.set(c.service, { total: 0, tested: 0, operations: [] });
  }
  const entry = byService.get(c.service);
  entry.total++;
  if (c.tested) entry.tested++;
  entry.operations.push(c);
}

if (jsonOutput) {
  console.log(
    JSON.stringify({
      flavor: flavorFilter,
      total,
      tested: testedCount,
      untested: total - testedCount,
      percentage: parseFloat(pct),
      byService: Object.fromEntries(
        [...byService.entries()].map(([k, v]) => [
          k,
          { total: v.total, tested: v.tested, percentage: parseFloat(((v.tested / v.total) * 100).toFixed(1)) },
        ]),
      ),
      operations: untestedOnly ? coverageData.filter((c) => !c.tested) : coverageData,
    }, null, 2),
  );
  process.exit(0);
}

// Human-readable output
console.log(`\n📊 API Coverage Report — ${flavorFilter}`);
console.log(`${'─'.repeat(50)}`);
console.log(`Total operations : ${total}`);
console.log(`Tested           : ${testedCount} (${pct}%)`);
console.log(`Untested         : ${total - testedCount}`);
console.log(`From vitest      : ${vitestCovered.size} operations`);
console.log(`From test files  : ${testFileCovered.size} operations`);
console.log(`Known failures   : ${knownFailures.size} operations`);
console.log(`From runner      : ${[...runnerCovered.values()].filter((v) => v === 'pass').length} operations`);
console.log();

// Service breakdown table
console.log('Coverage by service:');
console.log(`${'─'.repeat(60)}`);
console.log(`${'Service'.padEnd(35)} ${'Tested'.padStart(6)} ${'Total'.padStart(6)} ${'%'.padStart(6)}`);
console.log(`${'─'.repeat(60)}`);

const sorted = [...byService.entries()].sort((a, b) => b[1].total - a[1].total);
for (const [service, data] of sorted) {
  const servicePct = ((data.tested / data.total) * 100).toFixed(0);
  const bar = data.tested > 0 ? '█'.repeat(Math.max(1, Math.floor(data.tested / data.total * 10))) : '░';
  console.log(
    `${service.padEnd(35)} ${String(data.tested).padStart(6)} ${String(data.total).padStart(6)} ${(servicePct + '%').padStart(5)} ${bar}`,
  );
}

if (untestedOnly) {
  console.log(`\nUntested operations:`);
  console.log(`${'─'.repeat(60)}`);
  for (const c of coverageData.filter((c) => !c.tested)) {
    console.log(`  ${c.method.padEnd(6)} ${c.id}${c.preview ? ' (preview)' : ''}`);
  }
}
