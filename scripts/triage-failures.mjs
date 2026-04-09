#!/usr/bin/env node

/**
 * Triage API test failures — classify 400/500 errors and update known-failures.json.
 *
 * Usage:
 *   node scripts/triage-failures.mjs                    # reads tmp/api-test-results.json
 *   node scripts/triage-failures.mjs --issue <number>   # reads failures from a GitHub issue body
 *
 * Output:
 *   Updates src/known-failures.json with classified failures.
 *   Prints summary to stdout.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { getOperationById } from '../dist/index.js';

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const issueFlag = args.indexOf('--issue');
const issueNumber = issueFlag !== -1 ? args[issueFlag + 1] : null;

// ---------------------------------------------------------------------------
// Load failures from results JSON or issue body
// ---------------------------------------------------------------------------
let failures = [];

if (issueNumber) {
  // Parse from issue body via gh CLI
  const { execSync } = await import('node:child_process');
  const body = execSync(`gh issue view ${issueNumber} --json body --jq .body`, {
    encoding: 'utf-8',
  });
  // Extract: `services.xxx.yyy.zzz` — status: detail
  const re =
    /`((?:services|server)\.[a-z0-9._-]+\.[a-z0-9._-]+\.[a-z0-9._-]+)`\s*[—–-]\s*(fail|server-error):\s*(.+)/gi;
  let m;
  while ((m = re.exec(body)) !== null) {
    failures.push({ id: m[1], status: m[2], detail: m[3].trim() });
  }
} else {
  // Read from results file
  const raw = JSON.parse(readFileSync('tmp/api-test-results.json', 'utf-8'));
  failures = raw.results.filter(
    (r) => r.status === 'fail' || r.status === 'server-error',
  );
}

if (failures.length === 0) {
  console.log('No failures to triage.');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Load existing known-failures
// ---------------------------------------------------------------------------
let known = {};
try {
  known = JSON.parse(readFileSync('src/known-failures.json', 'utf-8'));
} catch {
  // Start fresh
}

// ---------------------------------------------------------------------------
// Classify each failure
// ---------------------------------------------------------------------------
// Params the runner can auto-discover
const autoParams = new Set([
  'organization',
  'project',
  'projectId',
  'repositoryId',
  'team',
  'instance',
  'collection',
]);

let added = 0;
let alreadyKnown = 0;

for (const f of failures) {
  if (known[f.id]) {
    alreadyKnown++;
    continue;
  }

  let reason = 'unknown';
  let detail = f.detail;

  // Try to classify from the catalog
  try {
    const op = getOperationById(f.id);
    const allPlaceholders = [
      ...new Set(op.requestTemplates.flatMap((t) => t.placeholders)),
    ];
    const needsResourceId = allPlaceholders.some((p) => !autoParams.has(p));

    if (f.status === 'server-error') {
      reason = 'server-error';
      detail = 'Server returned 5xx — not a client issue';
    } else if (needsResourceId) {
      const missing = allPlaceholders.filter((p) => !autoParams.has(p));
      reason = 'needs-resource-id';
      detail = `Requires: ${missing.join(', ')}`;
    } else if (f.detail?.includes('400')) {
      // Has all path params but still 400 → likely needs specific query params
      reason = 'needs-query-params';
      detail = 'All path params available but API returned 400 — likely requires specific query parameters';
    } else {
      reason = 'unexpected';
      detail = f.detail;
    }
  } catch {
    reason = 'not-in-catalog';
    detail = 'Operation not found in catalog';
  }

  known[f.id] = {
    reason,
    detail,
    httpStatus: f.httpStatus ?? null,
    firstSeen: new Date().toISOString().split('T')[0],
  };
  added++;
}

// ---------------------------------------------------------------------------
// Write updated known-failures
// ---------------------------------------------------------------------------
// Sort keys for deterministic output
const sorted = Object.keys(known)
  .sort()
  .reduce((acc, k) => {
    acc[k] = known[k];
    return acc;
  }, {});

writeFileSync('src/known-failures.json', JSON.stringify(sorted, null, 2) + '\n');

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
const byReason = {};
for (const v of Object.values(sorted)) {
  byReason[v.reason] = (byReason[v.reason] || 0) + 1;
}

console.log(`\nTriage summary:`);
console.log(`  Total failures analyzed: ${failures.length}`);
console.log(`  Already known:           ${alreadyKnown}`);
console.log(`  Newly classified:        ${added}`);
console.log(`\nKnown failures by reason:`);
for (const [reason, count] of Object.entries(byReason).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${reason}: ${count}`);
}
console.log(`\nTotal in known-failures.json: ${Object.keys(sorted).length}`);
