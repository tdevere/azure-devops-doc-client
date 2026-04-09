import { describe, expect, it } from 'vitest';
import { AzureDevOpsClient, loadAzureDevOpsClientOptionsFromEnv } from '../src/index.js';
import type { AzureDevOpsResponse } from '../src/index.js';

const shouldRun = process.env.RUN_LIVE_AZDO_TESTS === 'true';
const testBlock = shouldRun ? describe : describe.skip;

let client: AzureDevOpsClient;
function getClient(): AzureDevOpsClient {
  if (!client) client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());
  return client;
}

function expectSuccess(response: AzureDevOpsResponse): void {
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(300);
}

// Tests requested in issue #dispatch-15
testBlock('issue #dispatch-15: requested API tests', () => {
  it('services.test-results.codecoverage.get-test-run-code-coverage', async () => {
    const response = await getClient().invoke('services.test-results.codecoverage.get-test-run-code-coverage', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.message-logs.list', async () => {
    const response = await getClient().invoke('services.test-results.message-logs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.metrics.get', async () => {
    const response = await getClient().invoke('services.test-results.metrics.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultdetailsbybuild.get', async () => {
    const response = await getClient().invoke('services.test-results.resultdetailsbybuild.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultdetailsbyrelease.get', async () => {
    const response = await getClient().invoke('services.test-results.resultdetailsbyrelease.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultgroupsbybuild.list', async () => {
    const response = await getClient().invoke('services.test-results.resultgroupsbybuild.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultgroupsbyrelease.list', async () => {
    const response = await getClient().invoke('services.test-results.resultgroupsbyrelease.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.results.get-test-result-by-id', async () => {
    const response = await getClient().invoke('services.test-results.results.get-test-result-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.results.get-test-results', async () => {
    const response = await getClient().invoke('services.test-results.results.get-test-results', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsbybuild.list', async () => {
    const response = await getClient().invoke('services.test-results.resultsbybuild.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsbypipeline.list', async () => {
    const response = await getClient().invoke('services.test-results.resultsbypipeline.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsbyrelease.list', async () => {
    const response = await getClient().invoke('services.test-results.resultsbyrelease.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsgroup-details.test-results-group-details', async () => {
    const response = await getClient().invoke('services.test-results.resultsgroup-details.test-results-group-details', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsummarybybuild.query', async () => {
    const response = await getClient().invoke('services.test-results.resultsummarybybuild.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsummarybypipeline.query', async () => {
    const response = await getClient().invoke('services.test-results.resultsummarybypipeline.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.resultsummarybyrelease.query-test-results-report-for-release', async () => {
    const response = await getClient().invoke('services.test-results.resultsummarybyrelease.query-test-results-report-for-release', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.runs.get', async () => {
    const response = await getClient().invoke('services.test-results.runs.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.runs.list', async () => {
    const response = await getClient().invoke('services.test-results.runs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.runs.query', async () => {
    const response = await getClient().invoke('services.test-results.runs.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.runsummary.get', async () => {
    const response = await getClient().invoke('services.test-results.runsummary.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
