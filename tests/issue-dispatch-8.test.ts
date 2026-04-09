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

// Tests requested in issue #dispatch-8
testBlock('issue #dispatch-8: requested API tests', () => {
  it('services.work-item-tracking.account-my-work-recent-activity.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.account-my-work-recent-activity.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking.artifact-link-types.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.artifact-link-types.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking.attachments.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.attachments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.classification-nodes.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.classification-nodes.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.classification-nodes.get-classification-nodes', async () => {
    const response = await getClient().invoke('services.work-item-tracking.classification-nodes.get-classification-nodes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.classification-nodes.get-root-nodes', async () => {
    const response = await getClient().invoke('services.work-item-tracking.classification-nodes.get-root-nodes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comment-reactions-engaged-users.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comment-reactions-engaged-users.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments-reactions.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments-reactions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments-versions.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments-versions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments-versions.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments-versions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments.get-comment', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments.get-comment', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments.get-comments', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments.get-comments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.comments.get-comments-batch', async () => {
    const response = await getClient().invoke('services.work-item-tracking.comments.get-comments-batch', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.fields.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.fields.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.fields.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.fields.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.queries.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.queries.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.queries.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking.queries.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.queries.search-queries', async () => {
    const response = await getClient().invoke('services.work-item-tracking.queries.search-queries', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.recyclebin.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking.recyclebin.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking.recyclebin.get-deleted-work-item-shallow-references', async () => {
    const response = await getClient().invoke('services.work-item-tracking.recyclebin.get-deleted-work-item-shallow-references', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
