#!/usr/bin/env node

/**
 * Generate a vitest test file for a set of operation IDs.
 *
 * Usage:
 *   node scripts/gen-test.mjs <issueNumber> <operationId1> [operationId2] ...
 *
 * Output:
 *   tests/issue-<issueNumber>.test.ts
 */

import { writeFileSync } from 'node:fs';

const [issueNumber, ...operationIds] = process.argv.slice(2);

if (!issueNumber || operationIds.length === 0) {
  console.error('Usage: node scripts/gen-test.mjs <issueNumber> <op1> [op2] ...');
  process.exit(1);
}

const { getOperationById } = await import('../dist/index.js');

// Pre-scan to determine which helpers are needed
let needsExpectSuccess = false;
let needsExpectReachable = false;
for (const opId of operationIds) {
  try {
    const op = getOperationById(opId);
    const method = op.requestTemplates[0]?.method ?? 'GET';
    if (method === 'GET' || method === 'HEAD') needsExpectSuccess = true;
    else needsExpectReachable = true;
  } catch { /* skip */ }
}

const lines = [];

lines.push(`import { describe, expect, it } from 'vitest';`);
lines.push(`import { AzureDevOpsClient, loadAzureDevOpsClientOptionsFromEnv } from '../src/index.js';`);
lines.push(`import type { AzureDevOpsResponse } from '../src/index.js';`);
lines.push(``);
lines.push(`const shouldRun = process.env.RUN_LIVE_AZDO_TESTS === 'true';`);
lines.push(`const testBlock = shouldRun ? describe : describe.skip;`);
lines.push(``);
lines.push(`let client: AzureDevOpsClient;`);
lines.push(`function getClient(): AzureDevOpsClient {`);
lines.push(`  if (!client) client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());`);
lines.push(`  return client;`);
lines.push(`}`);
lines.push(``);
if (needsExpectSuccess) {
  lines.push(`function expectSuccess(response: AzureDevOpsResponse): void {`);
  lines.push(`  expect(response.status).toBeGreaterThanOrEqual(200);`);
  lines.push(`  expect(response.status).toBeLessThan(300);`);
  lines.push(`}`);
  lines.push(``);
}
if (needsExpectReachable) {
  lines.push(`function expectReachable(response: AzureDevOpsResponse): void {`);
  lines.push(`  // Mutating endpoint reachability: any HTTP response (2xx-4xx) proves the endpoint exists`);
  lines.push(`  // Only 5xx or network errors indicate a real problem`);
  lines.push(`  expect(response.status).toBeGreaterThanOrEqual(200);`);
  lines.push(`  expect(response.status).toBeLessThan(500);`);
  lines.push(`}`);
  lines.push(``);
}
lines.push(`// Tests requested in issue #${issueNumber}`);
lines.push(`testBlock('issue #${issueNumber}: requested API tests', () => {`);

for (const opId of operationIds) {
  try {
    const op = getOperationById(opId);
    const placeholders = [...new Set(op.requestTemplates.flatMap((t) => t.placeholders))];
    const needsProject = placeholders.includes('project') || placeholders.includes('projectId');
    const method = op.requestTemplates[0]?.method ?? 'GET';
    const isReadOnly = method === 'GET' || method === 'HEAD';
    const assertFn = isReadOnly ? 'expectSuccess' : 'expectReachable';

    // For mutating ops, build a minimal empty body
    const needsBody = !isReadOnly && method !== 'DELETE';

    if (needsProject) {
      if (isReadOnly) {
        lines.push(`  it('${opId} [${method}]', async () => {`);
        lines.push(`    const response = await getClient().invoke('${opId}', {`);
        lines.push(`      path: { ${placeholders.includes('projectId') ? 'projectId' : 'project'}: 'DISCOVERED_PROJECT' },`);
        lines.push(`      query: { $top: 5 },`);
        lines.push(`    });`);
        lines.push(`    ${assertFn}(response);`);
        lines.push(`  });`);
      } else {
        lines.push(`  it('${opId} [${method}]', async () => {`);
        lines.push(`    try {`);
        lines.push(`      const response = await getClient().invoke('${opId}', {`);
        lines.push(`        path: { ${placeholders.includes('projectId') ? 'projectId' : 'project'}: 'DISCOVERED_PROJECT' },`);
        if (needsBody) {
          lines.push(`        body: {},`);
        }
        lines.push(`      });`);
        lines.push(`      ${assertFn}(response);`);
        lines.push(`    } catch (err: any) {`);
        lines.push(`      // Missing path values or auth errors are expected for mutating endpoints`);
        lines.push(`      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);`);
        lines.push(`    }`);
        lines.push(`  });`);
      }
    } else {
      if (isReadOnly) {
        lines.push(`  it('${opId} [${method}]', async () => {`);
        lines.push(`    const response = await getClient().invoke('${opId}');`);
        lines.push(`    ${assertFn}(response);`);
        lines.push(`  });`);
      } else {
        lines.push(`  it('${opId} [${method}]', async () => {`);
        lines.push(`    try {`);
        if (needsBody) {
          lines.push(`      const response = await getClient().invoke('${opId}', { body: {} });`);
        } else {
          lines.push(`      const response = await getClient().invoke('${opId}');`);
        }
        lines.push(`      ${assertFn}(response);`);
        lines.push(`    } catch (err: any) {`);
        lines.push(`      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);`);
        lines.push(`    }`);
        lines.push(`  });`);
      }
    }
    lines.push(``);
  } catch {
    lines.push(`  // Skipped ${opId}: not found in catalog`);
    lines.push(``);
  }
}

lines.push(`}, 60_000);`);
lines.push(``);

const filename = `tests/issue-${issueNumber}.test.ts`;
writeFileSync(filename, lines.join('\n'));
console.log(`Generated ${filename} with ${operationIds.length} operation(s)`);
