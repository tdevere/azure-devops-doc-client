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

// Tests requested in issue #dispatch-7
testBlock('issue #dispatch-7: requested API tests', () => {
  it('services.distributed-task.agentclouds.get', async () => {
    const response = await getClient().invoke('services.distributed-task.agentclouds.get');
    expectSuccess(response);
  });

  it('services.distributed-task.agentclouds.list', async () => {
    const response = await getClient().invoke('services.distributed-task.agentclouds.list');
    expectSuccess(response);
  });

  it('services.distributed-task.agentcloudtypes.list', async () => {
    const response = await getClient().invoke('services.distributed-task.agentcloudtypes.list');
    expectSuccess(response);
  });

  it('services.distributed-task.agents.get-agent', async () => {
    const response = await getClient().invoke('services.distributed-task.agents.get-agent');
    expectSuccess(response);
  });

  it('services.distributed-task.agents.get-pool-permission', async () => {
    const response = await getClient().invoke('services.distributed-task.agents.get-pool-permission');
    expectSuccess(response);
  });

  it('services.distributed-task.agents.list', async () => {
    const response = await getClient().invoke('services.distributed-task.agents.list');
    expectSuccess(response);
  });

  it('services.distributed-task.deploymentgroups.get', async () => {
    const response = await getClient().invoke('services.distributed-task.deploymentgroups.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.deploymentgroups.list', async () => {
    const response = await getClient().invoke('services.distributed-task.deploymentgroups.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.elasticpoollogs.list', async () => {
    const response = await getClient().invoke('services.distributed-task.elasticpoollogs.list');
    expectSuccess(response);
  });

  it('services.distributed-task.elasticpools.get', async () => {
    const response = await getClient().invoke('services.distributed-task.elasticpools.get');
    expectSuccess(response);
  });

  it('services.distributed-task.elasticpools.list', async () => {
    const response = await getClient().invoke('services.distributed-task.elasticpools.list');
    expectSuccess(response);
  });

  it('services.distributed-task.environmentdeployment-records.list', async () => {
    const response = await getClient().invoke('services.distributed-task.environmentdeployment-records.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.environments.get', async () => {
    const response = await getClient().invoke('services.distributed-task.environments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.environments.list', async () => {
    const response = await getClient().invoke('services.distributed-task.environments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.kubernetes.get', async () => {
    const response = await getClient().invoke('services.distributed-task.kubernetes.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.nodes.list', async () => {
    const response = await getClient().invoke('services.distributed-task.nodes.list');
    expectSuccess(response);
  });

  it('services.distributed-task.pools.get', async () => {
    const response = await getClient().invoke('services.distributed-task.pools.get');
    expectSuccess(response);
  });

  it('services.distributed-task.pools.get-agent-pools', async () => {
    const response = await getClient().invoke('services.distributed-task.pools.get-agent-pools');
    expectSuccess(response);
  });

  it('services.distributed-task.pools.get-agent-pools-by-ids', async () => {
    const response = await getClient().invoke('services.distributed-task.pools.get-agent-pools-by-ids');
    expectSuccess(response);
  });

  it('services.distributed-task.queues.get', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
