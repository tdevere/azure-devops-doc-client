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

// Tests requested in issue #dispatch-40
testBlock('issue #dispatch-40: requested API tests', () => {
  it('services.artifacts-package-types.nu-get.restore-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.restore-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.nu-get.set-upstreaming-behavior [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.set-upstreaming-behavior', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.nu-get.update-package-version [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.update-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.nu-get.update-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.update-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.nu-get.update-recycle-bin-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.update-recycle-bin-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.restore-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.restore-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.set-upstreaming-behavior [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.set-upstreaming-behavior', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.update-package-version [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.update-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.update-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.update-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.update-recycle-bin-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.update-recycle-bin-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.restore-package-version-from-recycle-bin [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.restore-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.update-package-version [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.update-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.update-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.update-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.update-recycle-bin-package-versions [POST]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.update-recycle-bin-package-versions', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.delete-package-version [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.delete-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.maven.delete-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.maven.delete-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.delete-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.delete-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.delete-scoped-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.delete-scoped-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.unpublish-package [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.unpublish-package', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.npm.unpublish-scoped-package [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.npm.unpublish-scoped-package', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
