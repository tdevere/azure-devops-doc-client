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

// Tests requested in issue #dispatch-18
testBlock('issue #dispatch-18: requested API tests', () => {
  it('services.pipelines.artifacts.get', async () => {
    const response = await getClient().invoke('services.pipelines.artifacts.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.logs.get', async () => {
    const response = await getClient().invoke('services.pipelines.logs.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.logs.list', async () => {
    const response = await getClient().invoke('services.pipelines.logs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.pipelines.get', async () => {
    const response = await getClient().invoke('services.pipelines.pipelines.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.pipelines.runs.get', async () => {
    const response = await getClient().invoke('services.pipelines.runs.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.recyclebin.get-deleted-work-items', async () => {
    const response = await getClient().invoke('services.work-item-tracking.recyclebin.get-deleted-work-items', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.reporting-work-item-links.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.reporting-work-item-links.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.reporting-work-item-revisions.read-reporting-revisions-get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.reporting-work-item-revisions.read-reporting-revisions-get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.revisions.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.revisions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.revisions.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.revisions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.tags.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.tags.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.tags.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.tags.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.templates.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.templates.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.templates.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.templates.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.updates.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.updates.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.updates.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.updates.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.wiql.query-by-id', async () => {
    const response = await getClient().invoke('services.work-item-tracking.wiql.query-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-icons.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-icons.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-icons.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-icons.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking.work-item-relation-types.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.work-item-relation-types.get');
    expectSuccess(response);
  });

}, 60_000);
