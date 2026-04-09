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

// Tests requested in issue #dispatch-17
testBlock('issue #dispatch-17: requested API tests', () => {
  it('services.git.import-requests.query', async () => {
    const response = await getClient().invoke('services.git.import-requests.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.items.get', async () => {
    const response = await getClient().invoke('services.git.items.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.merge-bases.list', async () => {
    const response = await getClient().invoke('services.git.merge-bases.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.merges.get', async () => {
    const response = await getClient().invoke('services.git.merges.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.policy-configurations.get', async () => {
    const response = await getClient().invoke('services.git.policy-configurations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-attachments.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-attachments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-attachments.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-attachments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-comment-likes.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-comment-likes.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-commits.get-pull-request-commits', async () => {
    const response = await getClient().invoke('services.git.pull-request-commits.get-pull-request-commits', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-commits.get-pull-request-iteration-commits', async () => {
    const response = await getClient().invoke('services.git.pull-request-commits.get-pull-request-iteration-commits', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-iteration-changes.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-iteration-changes.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-iteration-statuses.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-iteration-statuses.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-iteration-statuses.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-iteration-statuses.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-iterations.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-iterations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-iterations.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-iterations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-labels.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-labels.get', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-labels.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-labels.list', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-properties.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-properties.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-reviewers.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-reviewers.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-reviewers.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-reviewers.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
