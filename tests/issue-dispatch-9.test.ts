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

// Tests requested in issue #dispatch-9
testBlock('issue #dispatch-9: requested API tests', () => {
  it('services.test.attachments.get-test-result-attachment-zip', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-result-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.attachments.get-test-result-attachments', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-result-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.attachments.get-test-run-attachment-zip', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-run-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.attachments.get-test-run-attachments', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-run-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.attachments.get-test-sub-result-attachment-zip', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-sub-result-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.attachments.get-test-sub-result-attachments', async () => {
    const response = await getClient().invoke('services.test.attachments.get-test-sub-result-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.code-coverage.get-build-code-coverage', async () => {
    const response = await getClient().invoke('services.test.code-coverage.get-build-code-coverage', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.code-coverage.get-test-run-code-coverage', async () => {
    const response = await getClient().invoke('services.test.code-coverage.get-test-run-code-coverage', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.iterations.get', async () => {
    const response = await getClient().invoke('services.test.iterations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.iterations.list', async () => {
    const response = await getClient().invoke('services.test.iterations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.points.get-point', async () => {
    const response = await getClient().invoke('services.test.points.get-point', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.points.list', async () => {
    const response = await getClient().invoke('services.test.points.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.result-retention-settings.get', async () => {
    const response = await getClient().invoke('services.test.result-retention-settings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.results.get', async () => {
    const response = await getClient().invoke('services.test.results.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.results.list', async () => {
    const response = await getClient().invoke('services.test.results.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.runs.get-test-run-by-id', async () => {
    const response = await getClient().invoke('services.test.runs.get-test-run-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.runs.get-test-run-statistics', async () => {
    const response = await getClient().invoke('services.test.runs.get-test-run-statistics', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.runs.query', async () => {
    const response = await getClient().invoke('services.test.runs.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.session.list', async () => {
    const response = await getClient().invoke('services.test.session.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.test-suites.get', async () => {
    const response = await getClient().invoke('services.test.test-suites.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
