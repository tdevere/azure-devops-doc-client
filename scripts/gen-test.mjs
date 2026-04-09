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
lines.push(`function expectSuccess(response: AzureDevOpsResponse): void {`);
lines.push(`  expect(response.status).toBeGreaterThanOrEqual(200);`);
lines.push(`  expect(response.status).toBeLessThan(300);`);
lines.push(`}`);
lines.push(``);
lines.push(`// Tests requested in issue #${issueNumber}`);
lines.push(`testBlock('issue #${issueNumber}: requested API tests', () => {`);

for (const opId of operationIds) {
  try {
    const op = getOperationById(opId);
    const placeholders = [...new Set(op.requestTemplates.flatMap((t) => t.placeholders))];
    const needsProject = placeholders.includes('project') || placeholders.includes('projectId');

    if (needsProject) {
      lines.push(`  it('${opId}', async () => {`);
      lines.push(`    const response = await getClient().invoke('${opId}', {`);
      lines.push(`      path: { ${placeholders.includes('projectId') ? 'projectId' : 'project'}: 'DISCOVERED_PROJECT' },`);
      lines.push(`      query: { $top: 5 },`);
      lines.push(`    });`);
      lines.push(`    expectSuccess(response);`);
      lines.push(`  });`);
    } else {
      lines.push(`  it('${opId}', async () => {`);
      lines.push(`    const response = await getClient().invoke('${opId}');`);
      lines.push(`    expectSuccess(response);`);
      lines.push(`  });`);
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
