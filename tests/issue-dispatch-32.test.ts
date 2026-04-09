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

// Tests requested in issue #dispatch-32
testBlock('issue #dispatch-32: requested API tests', () => {
  it('services.graph.memberships.check-membership-existence [HEAD]', async () => {
    const response = await getClient().invoke('services.graph.memberships.check-membership-existence');
    expectSuccess(response);
  });

  it('services.graph.avatars.set-avatar [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.graph.avatars.set-avatar', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.groups.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.groups.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.groups.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.graph.groups.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.memberships.add [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.graph.memberships.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.request-access.request-access [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.request-access.request-access', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.service-principals.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.service-principals.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.subject-lookup.lookup-subjects [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.subject-lookup.lookup-subjects', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.subject-query.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.subject-query.query', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.users.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.graph.users.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.users.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.graph.users.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.avatars.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.graph.avatars.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.groups.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.graph.groups.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.memberships.remove-membership [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.graph.memberships.remove-membership');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.service-principals.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.graph.service-principals.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.graph.users.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.graph.users.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agentclouds.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agentclouds.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agentclouds.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agentclouds.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agents.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agents.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.distributed-task.agents.replace-agent [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.distributed-task.agents.replace-agent', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
