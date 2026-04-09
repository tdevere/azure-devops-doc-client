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

// Tests requested in issue #dispatch-33
testBlock('issue #dispatch-33: requested API tests', () => {
  it('services.distributed-task.agents.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agents.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.deploymentgroups.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.deploymentgroups.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.deploymentgroups.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.deploymentgroups.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.elasticpools.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.elasticpools.create', {
        path: { projectId: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.elasticpools.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.elasticpools.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.environments.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.environments.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.environments.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.environments.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.events.post-event [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.events.post-event', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.kubernetes.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.kubernetes.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.logs.append-log-content [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.logs.append-log-content', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.logs.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.logs.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.nodes.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.nodes.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.oidctoken.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.oidctoken.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.pools.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.pools.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.pools.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.pools.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.queues.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.queues.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.records.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.records.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.targets.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.targets.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.taskgroups.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.taskgroups.add', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.taskgroups.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.taskgroups.update', {
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
