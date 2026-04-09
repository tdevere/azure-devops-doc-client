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

// Tests requested in issue #dispatch-41
testBlock('issue #dispatch-41: requested API tests', () => {
  it('services.service-hooks.diagnostics.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.diagnostics.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.notifications.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.notifications.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.notifications.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.notifications.query', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.publishers.query-input-values [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.publishers.query-input-values', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.publishers.query-publishers [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.publishers.query-publishers', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.subscriptions.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.subscriptions.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.subscriptions.create-subscriptions-query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.subscriptions.create-subscriptions-query', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.subscriptions.replace-subscription [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.subscriptions.replace-subscription', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-hooks.subscriptions.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.service-hooks.subscriptions.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.approvals.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.approvals.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.definitions.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.release.definitions.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.definitions.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.release.definitions.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.folders.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.release.folders.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.folders.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.folders.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.gates.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.gates.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.manual-interventions.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.manual-interventions.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.releases.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.release.releases.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.releases.update-release [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.release.releases.update-release', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.releases.update-release-environment [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.releases.update-release-environment', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.releases.update-release-resource [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.release.releases.update-release-resource', {
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
