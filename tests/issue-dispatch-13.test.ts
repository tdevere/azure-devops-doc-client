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

// Tests requested in issue #dispatch-13
testBlock('issue #dispatch-13: requested API tests', () => {
  it('services.wiki.page-stats.get', async () => {
    const response = await getClient().invoke('services.wiki.page-stats.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.wiki.pages.get-page', async () => {
    const response = await getClient().invoke('services.wiki.pages.get-page', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.wiki.pages.get-page-by-id', async () => {
    const response = await getClient().invoke('services.wiki.pages.get-page-by-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.wiki.wikis.get', async () => {
    const response = await getClient().invoke('services.wiki.wikis.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.approvals-and-checks.approvals.get', async () => {
    const response = await getClient().invoke('services.approvals-and-checks.approvals.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.approvals-and-checks.approvals.query', async () => {
    const response = await getClient().invoke('services.approvals-and-checks.approvals.query', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.approvals-and-checks.check-configurations.get', async () => {
    const response = await getClient().invoke('services.approvals-and-checks.check-configurations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.approvals-and-checks.check-evaluations.get', async () => {
    const response = await getClient().invoke('services.approvals-and-checks.check-evaluations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.approvals-and-checks.pipeline-permissions.get', async () => {
    const response = await getClient().invoke('services.approvals-and-checks.pipeline-permissions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.annotated-tags.get', async () => {
    const response = await getClient().invoke('services.git.annotated-tags.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.blobs.get-blob', async () => {
    const response = await getClient().invoke('services.git.blobs.get-blob', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.cherry-picks.get-cherry-pick', async () => {
    const response = await getClient().invoke('services.git.cherry-picks.get-cherry-pick', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.cherry-picks.get-cherry-pick-for-ref-name', async () => {
    const response = await getClient().invoke('services.git.cherry-picks.get-cherry-pick-for-ref-name', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.commits.get', async () => {
    const response = await getClient().invoke('services.git.commits.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.commits.get-changes', async () => {
    const response = await getClient().invoke('services.git.commits.get-changes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.commits.get-push-commits', async () => {
    const response = await getClient().invoke('services.git.commits.get-push-commits', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.forks.get-fork-sync-request', async () => {
    const response = await getClient().invoke('services.git.forks.get-fork-sync-request', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.forks.get-fork-sync-requests', async () => {
    const response = await getClient().invoke('services.git.forks.get-fork-sync-requests', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.forks.list', async () => {
    const response = await getClient().invoke('services.git.forks.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.import-requests.get', async () => {
    const response = await getClient().invoke('services.git.import-requests.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
