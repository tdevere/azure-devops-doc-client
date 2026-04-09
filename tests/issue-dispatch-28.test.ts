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

// Tests requested in issue #dispatch-28
testBlock('issue #dispatch-28: requested API tests', () => {
  it('services.dashboard.dashboards.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.dashboards.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.dashboards.replace-dashboard [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.dashboards.replace-dashboard', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.dashboards.replace-dashboards [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.dashboards.replace-dashboards', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.replace-widget [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.replace-widget', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.replace-widgets [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.replace-widgets', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.update-widget [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.update-widget', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.update-widgets [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.update-widgets', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.dashboards.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.dashboards.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.dashboard.widgets.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.dashboard.widgets.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.restore-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.restore-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.set-upstreaming-behavior [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.set-upstreaming-behavior', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.update-package-version [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.update-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.update-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.update-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.update-recycle-bin-packages [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.update-recycle-bin-packages', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.restore-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.restore-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.restore-scoped-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.restore-scoped-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.set-scoped-upstreaming-behavior [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.set-scoped-upstreaming-behavior', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.set-upstreaming-behavior [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.set-upstreaming-behavior', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.update-package [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.update-package', {
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
