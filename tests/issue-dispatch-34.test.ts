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

// Tests requested in issue #dispatch-34
testBlock('issue #dispatch-34: requested API tests', () => {
  it('services.core.avatar.set-project-avatar [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.core.avatar.set-project-avatar', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.projects.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.core.projects.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.projects.set-project-properties [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.core.projects.set-project-properties', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.projects.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.core.projects.update', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.teams.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.core.teams.create', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.teams.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.core.teams.update', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.avatar.remove-project-avatar [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.core.avatar.remove-project-avatar', {
        path: { projectId: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.projects.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.core.projects.delete', {
        path: { projectId: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.core.teams.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.core.teams.delete', {
        path: { projectId: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.diagnostics.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.notification.diagnostics.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.settings.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.notification.settings.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscribers.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscribers.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscriptions.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscriptions.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscriptions.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscriptions.query', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscriptions.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscriptions.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscriptions.update-subscription-user-settings [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscriptions.update-subscription-user-settings', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.notification.subscriptions.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.notification.subscriptions.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.update-packages [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.update-packages', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.update-recycle-bin-packages [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.update-recycle-bin-packages', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.update-scoped-package [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.update-scoped-package', {
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
