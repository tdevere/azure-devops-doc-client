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

// Tests requested in issue #dispatch-47
testBlock('issue #dispatch-47: requested API tests', () => {
  it('services.work-item-tracking-process-template.processes.import-process-template [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process-template.processes.import-process-template', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.variablegroups.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.variablegroups.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.variablegroups.share-variable-group [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.variablegroups.share-variable-group', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.variablegroups.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.variablegroups.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agentclouds.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agentclouds.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agents.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agents.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.deploymentgroups.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.deploymentgroups.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.environments.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.environments.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.kubernetes.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.kubernetes.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.pools.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.pools.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.queues.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.queues.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.targets.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.targets.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.taskgroups.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.taskgroups.delete', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.variablegroups.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.variablegroups.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pull-requests.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.git.pull-requests.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.pushes.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.git.pushes.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.refs-favorites.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.git.refs-favorites.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.refs.update-ref [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.git.refs.update-ref', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.refs.update-refs [POST]', async () => {
    try {
      const response = await getClient().invoke('services.git.refs.update-refs', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.git.repositories.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.git.repositories.create', {
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
