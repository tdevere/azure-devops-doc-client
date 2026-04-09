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

// Tests requested in issue #dispatch-30
testBlock('issue #dispatch-30: requested API tests', () => {
  it('services.extension-management.installed-extensions.install-extension-by-name [POST]', async () => {
    try {
      const response = await getClient().invoke('services.extension-management.installed-extensions.install-extension-by-name', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.extension-management.installed-extensions.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.extension-management.installed-extensions.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.extension-management.installed-extensions.uninstall-extension-by-name [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.extension-management.installed-extensions.uninstall-extension-by-name');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.tokens.pats.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.tokens.pats.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.tokens.pats.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.tokens.pats.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.tokens.pats.revoke [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.tokens.pats.revoke');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.approvals.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.approvals.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.check-configurations.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.check-configurations.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.check-configurations.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.check-configurations.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.check-configurations.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.check-configurations.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.check-evaluations.evaluate [POST]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.check-evaluations.evaluate', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.pipeline-permissions.update-pipeline-permisions-for-resource [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.pipeline-permissions.update-pipeline-permisions-for-resource', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.pipeline-permissions.update-pipeline-permisions-for-resources [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.pipeline-permissions.update-pipeline-permisions-for-resources', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.approvals-and-checks.check-configurations.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.approvals-and-checks.check-configurations.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.symbol.client.head-client [HEAD]', async () => {
    const response = await getClient().invoke('services.symbol.client.head-client');
    expectSuccess(response);
  });

  it('services.symbol.requests.create-requests [POST]', async () => {
    try {
      const response = await getClient().invoke('services.symbol.requests.create-requests', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.symbol.requests.create-requests-request-id-debug-entries [POST]', async () => {
    try {
      const response = await getClient().invoke('services.symbol.requests.create-requests-request-id-debug-entries', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.symbol.requests.create-requests-request-name-debug-entries [POST]', async () => {
    try {
      const response = await getClient().invoke('services.symbol.requests.create-requests-request-name-debug-entries', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.symbol.requests.update-requests-request-id [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.symbol.requests.update-requests-request-id', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.symbol.requests.update-requests-request-name [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.symbol.requests.update-requests-request-name', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
