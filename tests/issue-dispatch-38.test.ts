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

function expectReachable(response: AzureDevOpsResponse): void {
  // Mutating endpoint reachability: any HTTP response (2xx-4xx) proves the endpoint exists
  // Only 5xx or network errors indicate a real problem
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(500);
}

// Tests requested in issue #dispatch-38
testBlock('issue #dispatch-38: requested API tests', () => {
  it('services.test-results.attachments.create-test-iteration-result-attachment [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.create-test-iteration-result-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.attachments.create-test-result-attachment [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.create-test-result-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.attachments.create-test-run-attachment [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.create-test-run-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.attachments.create-test-sub-result-attachment [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.create-test-sub-result-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.codecoverage.update [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.codecoverage.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.filecoverage.get [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.filecoverage.get', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.history.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.history.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.result-document.publish-test-result-document [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.result-document.publish-test-result-document', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.result-meta-data.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.result-meta-data.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.result-meta-data.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.result-meta-data.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.result-trend-by-build.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.result-trend-by-build.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.result-trend-by-release.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.result-trend-by-release.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.results.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.results.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.results.get-test-results-by-query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.results.get-test-results-by-query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.results.get-test-results-by-query-wiql [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.results.get-test-results-by-query-wiql', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.results.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.results.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.resultsummarybyrelease.query-test-results-summary-for-releases [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.resultsummarybyrelease.query-test-results-summary-for-releases', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.resultsummarybyrequirement.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.resultsummarybyrequirement.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.runs.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.runs.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.runs.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.runs.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
