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

// Tests requested in issue #dispatch-20
testBlock('issue #dispatch-20: requested API tests', () => {
  it('services.build.latest.get', async () => {
    const response = await getClient().invoke('services.build.latest.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.leases.get', async () => {
    const response = await getClient().invoke('services.build.leases.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.leases.get-retention-leases-by-minimal-retention-leases', async () => {
    const response = await getClient().invoke('services.build.leases.get-retention-leases-by-minimal-retention-leases', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.leases.get-retention-leases-by-user-id', async () => {
    const response = await getClient().invoke('services.build.leases.get-retention-leases-by-user-id', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.metrics.get-definition-metrics', async () => {
    const response = await getClient().invoke('services.build.metrics.get-definition-metrics', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.metrics.get-project-metrics', async () => {
    const response = await getClient().invoke('services.build.metrics.get-project-metrics', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.options.list', async () => {
    const response = await getClient().invoke('services.build.options.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.properties.get-build-properties', async () => {
    const response = await getClient().invoke('services.build.properties.get-build-properties', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.properties.get-definition-properties', async () => {
    const response = await getClient().invoke('services.build.properties.get-definition-properties', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.report.get', async () => {
    const response = await getClient().invoke('services.build.report.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.resource-usage.get', async () => {
    const response = await getClient().invoke('services.build.resource-usage.get');
    expectSuccess(response);
  });

  it('services.build.resources.list', async () => {
    const response = await getClient().invoke('services.build.resources.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.retention.get', async () => {
    const response = await getClient().invoke('services.build.retention.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.settings.get', async () => {
    const response = await getClient().invoke('services.build.settings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.get-file-contents', async () => {
    const response = await getClient().invoke('services.build.source-providers.get-file-contents', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.get-path-contents', async () => {
    const response = await getClient().invoke('services.build.source-providers.get-path-contents', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.get-pull-request', async () => {
    const response = await getClient().invoke('services.build.source-providers.get-pull-request', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.list', async () => {
    const response = await getClient().invoke('services.build.source-providers.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.list-branches', async () => {
    const response = await getClient().invoke('services.build.source-providers.list-branches', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.source-providers.list-repositories', async () => {
    const response = await getClient().invoke('services.build.source-providers.list-repositories', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
