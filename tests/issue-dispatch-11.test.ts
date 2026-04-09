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

// Tests requested in issue #dispatch-11
testBlock('issue #dispatch-11: requested API tests', () => {
  it('services.artifacts.artifact-details.get-badge', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-badge', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.artifact-details.get-package', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.artifact-details.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.artifact-details.get-package-version-provenance', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-package-version-provenance', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.artifact-details.get-package-versions', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-package-versions', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.artifact-details.get-packages', async () => {
    const response = await getClient().invoke('services.artifacts.artifact-details.get-packages', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.change-tracking.get-feed-change', async () => {
    const response = await getClient().invoke('services.artifacts.change-tracking.get-feed-change', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.change-tracking.get-feed-changes', async () => {
    const response = await getClient().invoke('services.artifacts.change-tracking.get-feed-changes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.change-tracking.get-package-changes', async () => {
    const response = await getClient().invoke('services.artifacts.change-tracking.get-package-changes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.feed-management.get-feed', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feed', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.feed-management.get-feed-permissions', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feed-permissions', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.feed-management.get-feed-view', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feed-view', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.feed-management.get-feed-views', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feed-views', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.recycle-bin.get-recycle-bin-package', async () => {
    const response = await getClient().invoke('services.artifacts.recycle-bin.get-recycle-bin-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.recycle-bin.get-recycle-bin-package-version', async () => {
    const response = await getClient().invoke('services.artifacts.recycle-bin.get-recycle-bin-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.recycle-bin.get-recycle-bin-package-versions', async () => {
    const response = await getClient().invoke('services.artifacts.recycle-bin.get-recycle-bin-package-versions', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.recycle-bin.get-recycle-bin-packages', async () => {
    const response = await getClient().invoke('services.artifacts.recycle-bin.get-recycle-bin-packages', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.retention-policies.get-retention-policy', async () => {
    const response = await getClient().invoke('services.artifacts.retention-policies.get-retention-policy', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts.service-settings.get-global-permissions', async () => {
    const response = await getClient().invoke('services.artifacts.service-settings.get-global-permissions');
    expectSuccess(response);
  });

  it('services.release.approvals.list', async () => {
    const response = await getClient().invoke('services.release.approvals.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
