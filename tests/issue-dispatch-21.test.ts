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

// Tests requested in issue #dispatch-21
testBlock('issue #dispatch-21: requested API tests', () => {
  it('services.distributed-task.queues.get-agent-queues-by-ids', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get-agent-queues-by-ids', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.queues.get-agent-queues-by-names', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get-agent-queues-by-names', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.queues.get-agent-queues-for-pools', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get-agent-queues-for-pools', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.requests.list', async () => {
    const response = await getClient().invoke('services.distributed-task.requests.list');
    expectSuccess(response);
  });

  it('services.distributed-task.targets.get', async () => {
    const response = await getClient().invoke('services.distributed-task.targets.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.targets.list', async () => {
    const response = await getClient().invoke('services.distributed-task.targets.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.taskgroups.list', async () => {
    const response = await getClient().invoke('services.distributed-task.taskgroups.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.variablegroups.get', async () => {
    const response = await getClient().invoke('services.distributed-task.variablegroups.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.variablegroups.get-variable-groups', async () => {
    const response = await getClient().invoke('services.distributed-task.variablegroups.get-variable-groups', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.variablegroups.get-variable-groups-by-id', async () => {
    const response = await getClient().invoke('services.distributed-task.variablegroups.get-variable-groups-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.yamlschema.get', async () => {
    const response = await getClient().invoke('services.distributed-task.yamlschema.get');
    expectSuccess(response);
  });

  it('services.artifacts-package-types.python.get-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.python.get-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.python.get-upstreaming-behavior', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.python.get-upstreaming-behavior', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.universal.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.universal.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.universal.get-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.universal.get-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.settings.get', async () => {
    const response = await getClient().invoke('services.test-results.settings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.similar-test-results.list', async () => {
    const response = await getClient().invoke('services.test-results.similar-test-results.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.statistics.get', async () => {
    const response = await getClient().invoke('services.test-results.statistics.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.status.get', async () => {
    const response = await getClient().invoke('services.test-results.status.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.tags.get-test-tags-for-build', async () => {
    const response = await getClient().invoke('services.test-results.tags.get-test-tags-for-build', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
