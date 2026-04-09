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

// Tests requested in issue #1
testBlock('issue #1: requested API tests', () => {
  it('services.artifacts.feed-management.get-feeds', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feeds', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.artifacts.list', async () => {
    const response = await getClient().invoke('services.build.artifacts.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get', async () => {
    const response = await getClient().invoke('services.build.builds.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.list', async () => {
    const response = await getClient().invoke('services.build.builds.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.definitions.list', async () => {
    const response = await getClient().invoke('services.build.definitions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.distributed-task.queues.get-agent-queues', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get-agent-queues', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.commits.get-commits', async () => {
    const response = await getClient().invoke('services.git.commits.get-commits', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-requests.get-pull-requests-by-project', async () => {
    const response = await getClient().invoke('services.git.pull-requests.get-pull-requests-by-project', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.refs.list', async () => {
    const response = await getClient().invoke('services.git.refs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.repositories.list', async () => {
    const response = await getClient().invoke('services.git.repositories.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.pipelines.list', async () => {
    const response = await getClient().invoke('services.pipelines.pipelines.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.runs.list', async () => {
    const response = await getClient().invoke('services.pipelines.runs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.configurations.list', async () => {
    const response = await getClient().invoke('services.policy.configurations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.definitions.list', async () => {
    const response = await getClient().invoke('services.release.definitions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.list', async () => {
    const response = await getClient().invoke('services.release.releases.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.runs.list', async () => {
    const response = await getClient().invoke('services.test.runs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.wiki.wikis.list', async () => {
    const response = await getClient().invoke('services.wiki.wikis.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.wiql.query-by-wiql', async () => {
    const response = await getClient().invoke('services.work-item-tracking.wiql.query-by-wiql', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-items.get-work-item', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-items.get-work-item', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
