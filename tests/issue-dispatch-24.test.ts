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

// Tests requested in issue #dispatch-24
testBlock('issue #dispatch-24: requested API tests', () => {
  it('services.work-item-tracking.work-item-relation-types.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-relation-types.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-revisions-discussions.read-reporting-discussions', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-revisions-discussions.read-reporting-discussions', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-transitions.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-transitions.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-type-categories.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-type-categories.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-type-categories.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-type-categories.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-type-states.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-type-states.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-types-field.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-types-field.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-types-field.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-types-field.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-types.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-types.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-types.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-types.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-items.get-work-item-template', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-items.get-work-item-template', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-items.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-items.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-requests.get-pull-requests', async () => {
    const response = await getClient().invoke('services.git.pull-requests.get-pull-requests', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pushes.get', async () => {
    const response = await getClient().invoke('services.git.pushes.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pushes.list', async () => {
    const response = await getClient().invoke('services.git.pushes.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.refs-favorites.get', async () => {
    const response = await getClient().invoke('services.git.refs-favorites.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.repositories.get-deleted-repositories', async () => {
    const response = await getClient().invoke('services.git.repositories.get-deleted-repositories', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.repositories.get-recycle-bin-repositories', async () => {
    const response = await getClient().invoke('services.git.repositories.get-recycle-bin-repositories', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.repositories.get-repository-with-parent', async () => {
    const response = await getClient().invoke('services.git.repositories.get-repository-with-parent', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.reverts.get-revert', async () => {
    const response = await getClient().invoke('services.git.reverts.get-revert', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
