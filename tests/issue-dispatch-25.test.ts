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

// Tests requested in issue #dispatch-25
testBlock('issue #dispatch-25: requested API tests', () => {
  it('services.build.source-providers.list-webhooks', async () => {
    const response = await getClient().invoke('services.build.source-providers.list-webhooks', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.status.get', async () => {
    const response = await getClient().invoke('services.build.status.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.tags.get-build-tags', async () => {
    const response = await getClient().invoke('services.build.tags.get-build-tags', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.tags.get-definition-tags', async () => {
    const response = await getClient().invoke('services.build.tags.get-definition-tags', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.tags.get-tags', async () => {
    const response = await getClient().invoke('services.build.tags.get-tags', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.templates.get', async () => {
    const response = await getClient().invoke('services.build.templates.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.templates.list', async () => {
    const response = await getClient().invoke('services.build.templates.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.timeline.get', async () => {
    const response = await getClient().invoke('services.build.timeline.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.build.yaml.get', async () => {
    const response = await getClient().invoke('services.build.yaml.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.reverts.get-revert-for-ref-name', async () => {
    const response = await getClient().invoke('services.git.reverts.get-revert-for-ref-name', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.stats.get', async () => {
    const response = await getClient().invoke('services.git.stats.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.statuses.list', async () => {
    const response = await getClient().invoke('services.git.statuses.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.suggestions.list', async () => {
    const response = await getClient().invoke('services.git.suggestions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.trees.get', async () => {
    const response = await getClient().invoke('services.git.trees.get', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test.test-suites.list', async () => {
    const response = await getClient().invoke('services.test.test-suites.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
