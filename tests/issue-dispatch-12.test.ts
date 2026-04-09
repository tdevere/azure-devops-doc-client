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

// Tests requested in issue #dispatch-12
testBlock('issue #dispatch-12: requested API tests', () => {
  it('services.build.artifacts.get-artifact', async () => {
    const response = await getClient().invoke('services.build.artifacts.get-artifact', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.artifacts.get-file', async () => {
    const response = await getClient().invoke('services.build.artifacts.get-file', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.attachments.get', async () => {
    const response = await getClient().invoke('services.build.attachments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.attachments.list', async () => {
    const response = await getClient().invoke('services.build.attachments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.authorizedresources.list', async () => {
    const response = await getClient().invoke('services.build.authorizedresources.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.badge.get', async () => {
    const response = await getClient().invoke('services.build.badge.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.badge.get-build-badge-data', async () => {
    const response = await getClient().invoke('services.build.badge.get-build-badge-data', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-build-changes', async () => {
    const response = await getClient().invoke('services.build.builds.get-build-changes', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-build-log', async () => {
    const response = await getClient().invoke('services.build.builds.get-build-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-build-logs', async () => {
    const response = await getClient().invoke('services.build.builds.get-build-logs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-build-work-items-refs', async () => {
    const response = await getClient().invoke('services.build.builds.get-build-work-items-refs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-retention-leases-for-build', async () => {
    const response = await getClient().invoke('services.build.builds.get-retention-leases-for-build', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.builds.get-work-items-between-builds', async () => {
    const response = await getClient().invoke('services.build.builds.get-work-items-between-builds', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.controllers.get', async () => {
    const response = await getClient().invoke('services.build.controllers.get');
    expectSuccess(response);
  });

  it('services.build.controllers.list', async () => {
    const response = await getClient().invoke('services.build.controllers.list');
    expectSuccess(response);
  });

  it('services.build.definitions.get', async () => {
    const response = await getClient().invoke('services.build.definitions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.definitions.get-definition-revisions', async () => {
    const response = await getClient().invoke('services.build.definitions.get-definition-revisions', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.folders.list', async () => {
    const response = await getClient().invoke('services.build.folders.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.general-settings.get', async () => {
    const response = await getClient().invoke('services.build.general-settings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.history.get', async () => {
    const response = await getClient().invoke('services.build.history.get');
    expectSuccess(response);
  });

}, 60_000);
