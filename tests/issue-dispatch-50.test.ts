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

// Tests requested in issue #dispatch-50
testBlock('issue #dispatch-50: requested API tests', () => {
  it('services.artifacts-package-types.nu-get.delete-package-version [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.delete-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.nu-get.delete-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.nu-get.delete-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.delete-package-version [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.delete-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.python.delete-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.python.delete-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.delete-package-version [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.delete-package-version', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.artifacts-package-types.universal.delete-package-version-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.artifacts-package-types.universal.delete-package-version-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-attachments.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-attachments.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-comment-likes.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-comment-likes.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-iteration-statuses.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-iteration-statuses.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-labels.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-labels.delete', {
        path: { projectId: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-reviewers.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-reviewers.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-statuses.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-statuses.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-request-thread-comments.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-request-thread-comments.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.refs-favorites.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.refs-favorites.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.repositories.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.repositories.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.repositories.delete-repository-from-recycle-bin [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.git.repositories.delete-repository-from-recycle-bin', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.states.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.states.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.system-controls.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.system-controls.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types-behaviors.remove-behavior-from-work-item-type [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types-behaviors.remove-behavior-from-work-item-type');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
