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

// Tests requested in issue #dispatch-23
testBlock('issue #dispatch-23: requested API tests', () => {
  it('services.test-results.tags.get-test-tags-for-release', async () => {
    const response = await getClient().invoke('services.test-results.tags.get-test-tags-for-release', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.tagsummary.get-test-tag-summary-for-build', async () => {
    const response = await getClient().invoke('services.test-results.tagsummary.get-test-tag-summary-for-build', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.tagsummary.get-test-tag-summary-for-release', async () => {
    const response = await getClient().invoke('services.test-results.tagsummary.get-test-tag-summary-for-release', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testattachments.get', async () => {
    const response = await getClient().invoke('services.test-results.testattachments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testattachments.list', async () => {
    const response = await getClient().invoke('services.test-results.testattachments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testfailuretype.list', async () => {
    const response = await getClient().invoke('services.test-results.testfailuretype.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlog.get-test-logs-for-build', async () => {
    const response = await getClient().invoke('services.test-results.testlog.get-test-logs-for-build', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlog.get-test-result-logs', async () => {
    const response = await getClient().invoke('services.test-results.testlog.get-test-result-logs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlog.get-test-run-logs', async () => {
    const response = await getClient().invoke('services.test-results.testlog.get-test-run-logs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlog.get-test-sub-result-logs', async () => {
    const response = await getClient().invoke('services.test-results.testlog.get-test-sub-result-logs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-build-log', async () => {
    const response = await getClient().invoke('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-build-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-result-log', async () => {
    const response = await getClient().invoke('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-result-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-run-log', async () => {
    const response = await getClient().invoke('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-run-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-sub-result-log', async () => {
    const response = await getClient().invoke('services.test-results.testlogstoreendpoint.get-test-log-store-endpoint-details-for-sub-result-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.testsettings.get', async () => {
    const response = await getClient().invoke('services.test-results.testsettings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.workitems.list', async () => {
    const response = await getClient().invoke('services.test-results.workitems.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.workitems.query-test-result-work-items', async () => {
    const response = await getClient().invoke('services.test-results.workitems.query-test-result-work-items', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-work-items.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-work-items.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-requests.get-pull-request', async () => {
    const response = await getClient().invoke('services.git.pull-requests.get-pull-request', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-requests.get-pull-request-by-id', async () => {
    const response = await getClient().invoke('services.git.pull-requests.get-pull-request-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
