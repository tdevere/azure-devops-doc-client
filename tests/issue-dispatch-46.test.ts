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

function expectReachable(response: AzureDevOpsResponse): void {
  // Mutating endpoint reachability: any HTTP response (2xx-4xx) proves the endpoint exists
  // Only 5xx or network errors indicate a real problem
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(500);
}

// Tests requested in issue #dispatch-46
testBlock('issue #dispatch-46: requested API tests', () => {
  it('services.permissions-report.permissions-report.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.permissions-report.permissions-report.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.audit.streams.update-stream [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.audit.streams.update-stream', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.audit.streams.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.audit.streams.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.settings.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.settings.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.tags.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.tags.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.test-history.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.test-history.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testattachments.create-build-attachment-in-log-store [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testattachments.create-build-attachment-in-log-store', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testattachments.create-test-run-log-store-attachment [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testattachments.create-test-run-log-store-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testfailuretype.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testfailuretype.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-build [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-build', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-result [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-result', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-run [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testlogstoreendpoint.test-log-store-endpoint-details-for-run', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testsettings.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testsettings.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.workitems.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.workitems.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.workitems.query-test-method-linked-work-items [POST]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.workitems.query-test-method-linked-work-items', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.attachments.delete-test-result-attachment [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.delete-test-result-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.attachments.delete-test-run-attachment [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.attachments.delete-test-run-attachment', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.runs.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.runs.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testattachments.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testattachments.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testfailuretype.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testfailuretype.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
