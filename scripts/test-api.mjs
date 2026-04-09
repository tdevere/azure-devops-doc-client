#!/usr/bin/env node

/**
 * API Test Runner — Programmatic test execution for any cataloged operation.
 *
 * Usage:
 *   node scripts/test-api.mjs                          # test all GET services operations
 *   node scripts/test-api.mjs "services.git.*"         # test all git operations
 *   node scripts/test-api.mjs "services.core.projects.list"  # test one specific operation
 *   node scripts/test-api.mjs --filter "GET" --flavor services --service git
 *   node scripts/test-api.mjs --json                   # output JSON results
 *   node scripts/test-api.mjs --dry-run                # list matching operations without calling them
 *
 * Environment:
 *   AZDO_PAT            — Personal access token
 *   AZDO_ORGANIZATION   — Azure DevOps organization name
 *   AZDO_PROJECT        — (optional) Default project for project-scoped APIs
 *   AZDO_INSTANCE        — (optional) Server instance for Server-flavor APIs
 *   AZDO_COLLECTION      — (optional) Collection for Server-flavor APIs
 */

import { config as loadDotEnv } from 'dotenv';

loadDotEnv();

// Import from source (not the published package) so this works in the repo itself.
const { AzureDevOpsClient, operationCatalog, loadAzureDevOpsClientOptionsFromEnv } = await import('../dist/index.js');

const args = process.argv.slice(2);

// Parse --flag value pairs
function flagValue(name) {
  const idx = args.indexOf(name);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

// Collect flag names and their consumed value indices
const flagsWithValues = new Set(['--flavor', '--service', '--group', '--method', '--concurrency']);
const consumedIndices = new Set();
const flags = new Set();

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    flags.add(args[i]);
    if (flagsWithValues.has(args[i]) && i + 1 < args.length) {
      consumedIndices.add(i);
      consumedIndices.add(i + 1);
      i++; // skip value
    } else {
      consumedIndices.add(i);
    }
  }
}

const positional = args.filter((_, i) => !consumedIndices.has(i));

const jsonOutput = flags.has('--json');
const dryRun = flags.has('--dry-run');
const verbose = flags.has('--verbose');
const getOnly = !flags.has('--all-methods');

const flavorFilter = flagValue('--flavor');
const serviceFilter = flagValue('--service');
const groupFilter = flagValue('--group');
const methodFilter = flagValue('--method');
const concurrency = parseInt(flagValue('--concurrency') ?? '5', 10);
const pattern = positional[0] ?? null;

// Build the list of operations to test
let operations = [...operationCatalog];

// Filter by flavor
if (flavorFilter) {
  operations = operations.filter((op) => op.flavor === flavorFilter);
} else {
  // Default to services (most common)
  operations = operations.filter((op) => op.flavor === 'services');
}

// Filter by service
if (serviceFilter) {
  const lc = serviceFilter.toLowerCase();
  operations = operations.filter((op) => op.serviceKey.toLowerCase().includes(lc));
}

// Filter by group
if (groupFilter) {
  const lc = groupFilter.toLowerCase();
  operations = operations.filter((op) => op.groupKey.toLowerCase().includes(lc));
}

// Filter by HTTP method — default to GET only (safe, read-only)
if (getOnly && !methodFilter) {
  operations = operations.filter((op) =>
    op.requestTemplates.some((t) => t.method === 'GET'),
  );
} else if (methodFilter) {
  const m = methodFilter.toUpperCase();
  operations = operations.filter((op) =>
    op.requestTemplates.some((t) => t.method === m),
  );
}

// Filter by glob pattern (e.g., "services.git.*" or "*.projects.list")
if (pattern) {
  const regex = new RegExp(
    '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$',
    'i',
  );
  operations = operations.filter((op) => regex.test(op.id));
}

if (operations.length === 0) {
  console.error('No operations matched the given filters.');
  process.exit(1);
}

if (dryRun) {
  console.log(`Matched ${operations.length} operations:\n`);
  for (const op of operations) {
    const methods = [...new Set(op.requestTemplates.map((t) => t.method))].join(',');
    const placeholders = [...new Set(op.requestTemplates.flatMap((t) => t.placeholders))];
    console.log(
      `  ${op.id}  [${methods}]  placeholders: ${placeholders.join(', ') || '(none)'}${op.isPreview ? '  (preview)' : ''}`,
    );
  }
  process.exit(0);
}

// Initialize client
const clientOptions = loadAzureDevOpsClientOptionsFromEnv();
const client = new AzureDevOpsClient(clientOptions);

// Discover a project if we don't have one — many endpoints need it.
let discoveredProject = clientOptions.defaults?.project;
if (!discoveredProject) {
  try {
    const projResp = await client.invoke('services.core.projects.list');
    const projects = projResp.data?.value;
    if (projects?.length) {
      discoveredProject = projects[0].name;
      if (!jsonOutput) console.log(`Auto-discovered project: ${discoveredProject}\n`);
    }
  } catch {
    // Could not discover, some tests will fail with MISSING_PATH_VALUES
  }
}

// Discover a repo if we have a project — detail endpoints need it.
let discoveredRepoId;
if (discoveredProject) {
  try {
    const repoResp = await client.invoke('services.git.repositories.list', {
      path: { project: discoveredProject },
    });
    const repos = repoResp.data?.value;
    if (repos?.length) {
      discoveredRepoId = repos[0].id;
    }
  } catch {
    // Fine — repo-scoped tests will fail gracefully
  }
}

/** Build best-effort path values for an operation. */
function buildPathDefaults(op) {
  const allPlaceholders = [...new Set(op.requestTemplates.flatMap((t) => t.placeholders))];
  const path = {};

  for (const p of allPlaceholders) {
    if (p === 'organization' && clientOptions.defaults?.organization) {
      path.organization = clientOptions.defaults.organization;
    } else if (p === 'project' && discoveredProject) {
      path.project = discoveredProject;
    } else if (p === 'projectId' && discoveredProject) {
      path.projectId = discoveredProject;
    } else if (p === 'repositoryId' && discoveredRepoId) {
      path.repositoryId = discoveredRepoId;
    } else if (p === 'team' && clientOptions.defaults?.team) {
      path.team = clientOptions.defaults.team;
    } else if (p === 'instance' && clientOptions.defaults?.instance) {
      path.instance = clientOptions.defaults.instance;
    } else if (p === 'collection' && clientOptions.defaults?.collection) {
      path.collection = clientOptions.defaults.collection;
    }
    // Other placeholders (specific resource IDs) are left unset — the template
    // matcher will fall back to a simpler template or throw MISSING_PATH_VALUES.
  }

  return path;
}

// Load known failures — documented ops are skipped rather than counted as failures
let knownFailures = {};
try {
  const knownRaw = await import('node:fs').then(fs =>
    fs.readFileSync(new URL('../src/known-failures.json', import.meta.url), 'utf-8'),
  );
  knownFailures = JSON.parse(knownRaw);
} catch {
  // No known-failures file — treat everything as new
}

// Results accumulator
const results = [];

/** Test a single operation. Returns a result object. */
async function testOperation(op) {
  // Skip ops with documented failures (needs-resource-id, server-error, etc.)
  const knownEntry = knownFailures[op.id];
  if (knownEntry && knownEntry.reason !== 'unexpected') {
    return {
      id: op.id,
      status: 'documented-skip',
      detail: `Known: ${knownEntry.reason} — ${knownEntry.detail}`,
      preview: op.isPreview,
      durationMs: 0,
    };
  }

  const startMs = Date.now();
  const path = buildPathDefaults(op);

  try {
    const response = await client.invoke(op.id, {
      path,
      query: { $top: 1 },
    });

    const durationMs = Date.now() - startMs;
    const result = {
      id: op.id,
      status: 'pass',
      httpStatus: response.status,
      durationMs,
      preview: op.isPreview,
    };

    if (!jsonOutput && verbose) {
      console.log(`  ✅ ${op.id} — ${response.status} (${durationMs}ms)`);
    }

    return result;
  } catch (error) {
    const durationMs = Date.now() - startMs;

    // Classify the failure
    let status = 'fail';
    let detail = error.message;

    if (error.code === 'MISSING_PATH_VALUES') {
      status = 'skip';
      detail = 'Missing required path values (resource ID needed)';
    } else if (error.status === 401 || error.status === 403) {
      status = 'auth';
      detail = `${error.status} — check PAT scope`;
    } else if (error.status === 404) {
      status = 'not-found';
      detail = `404 — resource may not exist in test org`;
    } else if (error.status >= 500) {
      status = 'server-error';
    }

    const result = {
      id: op.id,
      status,
      httpStatus: error.status ?? null,
      durationMs,
      detail,
      preview: op.isPreview,
      troubleshooting: error.troubleshooting ?? [],
    };

    if (!jsonOutput && verbose) {
      const icon = status === 'skip' ? '⏭️' : status === 'auth' ? '🔒' : '❌';
      console.log(`  ${icon} ${op.id} — ${detail} (${durationMs}ms)`);
    }

    return result;
  }
}

// Run tests with concurrency control
if (!jsonOutput) {
  console.log(`Testing ${operations.length} operations (concurrency: ${concurrency})...\n`);
}

// Chunk-based concurrency
for (let i = 0; i < operations.length; i += concurrency) {
  const chunk = operations.slice(i, i + concurrency);
  const chunkResults = await Promise.all(chunk.map(testOperation));
  results.push(...chunkResults);

  // Progress indicator
  if (!jsonOutput && !verbose) {
    const done = Math.min(i + concurrency, operations.length);
    process.stdout.write(`\r  Progress: ${done}/${operations.length}`);
  }
}

if (!jsonOutput && !verbose) {
  process.stdout.write('\n\n');
}

// Summarize
const pass = results.filter((r) => r.status === 'pass');
const fail = results.filter((r) => r.status === 'fail');
const auth = results.filter((r) => r.status === 'auth');
const notFound = results.filter((r) => r.status === 'not-found');
const skip = results.filter((r) => r.status === 'skip');
const serverError = results.filter((r) => r.status === 'server-error');
const docSkip = results.filter((r) => r.status === 'documented-skip');

if (jsonOutput) {
  const summary = {
    timestamp: new Date().toISOString(),
    totalTested: results.length,
    pass: pass.length,
    fail: fail.length,
    auth: auth.length,
    notFound: notFound.length,
    skip: skip.length,
    documentedSkip: docSkip.length,
    serverError: serverError.length,
    results,
  };
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log('┌──────────────────────────────────────┐');
  console.log('│         API Test Summary              │');
  console.log('├──────────────────────────────────────┤');
  console.log(`│  Total tested : ${String(results.length).padStart(6)}               │`);
  console.log(`│  ✅ Pass      : ${String(pass.length).padStart(6)}               │`);
  console.log(`│  ❌ Fail      : ${String(fail.length).padStart(6)}               │`);
  console.log(`│  🔒 Auth      : ${String(auth.length).padStart(6)}               │`);
  console.log(`│  🔍 Not Found : ${String(notFound.length).padStart(6)}               │`);
  console.log(`│  ⏭️  Skipped   : ${String(skip.length).padStart(6)}               │`);
  console.log(`│  � Documented: ${String(docSkip.length).padStart(6)}               │`);
  console.log(`│  �💥 Server Err: ${String(serverError.length).padStart(6)}               │`);
  console.log('└──────────────────────────────────────┘');

  if (fail.length > 0) {
    console.log('\n❌ Failed operations:');
    for (const r of fail) {
      console.log(`  ${r.id} — ${r.detail}`);
    }
  }

  if (serverError.length > 0) {
    console.log('\n💥 Server errors:');
    for (const r of serverError) {
      console.log(`  ${r.id} — ${r.detail}`);
    }
  }

  if (auth.length > 0) {
    console.log(`\n🔒 ${auth.length} operations returned 401/403 — consider expanding PAT scope.`);
  }
}

// Write results to tmp for downstream consumption (CI workflows, issue filing)
import { writeFileSync, mkdirSync } from 'node:fs';
mkdirSync('tmp', { recursive: true });
writeFileSync(
  'tmp/api-test-results.json',
  JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      totalTested: results.length,
      pass: pass.length,
      fail: fail.length,
      auth: auth.length,
      notFound: notFound.length,
      skip: skip.length,
      documentedSkip: docSkip.length,
      serverError: serverError.length,
      results,
    },
    null,
    2,
  ),
);

if (!jsonOutput) {
  console.log('\nResults written to tmp/api-test-results.json');
}

// Exit with error if there are real failures
if (fail.length > 0 || serverError.length > 0) {
  process.exit(1);
}
