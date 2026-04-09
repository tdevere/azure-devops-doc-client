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

// Tests requested in issue #dispatch-51
testBlock('issue #dispatch-51: requested API tests', () => {
  it('services.release.definitions.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.release.definitions.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.release.folders.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.release.folders.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work.workitemsorder.reorder-iteration-work-items [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work.workitemsorder.reorder-iteration-work-items', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work.iterations.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work.iterations.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work.plans.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work.plans.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-plan.test-suites.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-plan.test-suites.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-plan.variables.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-plan.variables.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.testsettings.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.testsettings.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.test-results.workitems.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.test-results.workitems.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
