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

// Tests requested in issue #dispatch-19
testBlock('issue #dispatch-19: requested API tests', () => {
  it('services.core.categorized-teams.get', async () => {
    const response = await getClient().invoke('services.core.categorized-teams.get', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.core.processes.get', async () => {
    const response = await getClient().invoke('services.core.processes.get');
    expectSuccess(response);
  });

  it('services.core.projects.get', async () => {
    const response = await getClient().invoke('services.core.projects.get', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.core.teams.get', async () => {
    const response = await getClient().invoke('services.core.teams.get', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.core.teams.get-team-members-with-extended-properties', async () => {
    const response = await getClient().invoke('services.core.teams.get-team-members-with-extended-properties', {
      path: { projectId: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.graph.service-principals.get', async () => {
    const response = await getClient().invoke('services.graph.service-principals.get');
    expectSuccess(response);
  });

  it('services.graph.service-principals.list', async () => {
    const response = await getClient().invoke('services.graph.service-principals.list');
    expectSuccess(response);
  });

  it('services.graph.storage-keys.get', async () => {
    const response = await getClient().invoke('services.graph.storage-keys.get');
    expectSuccess(response);
  });

  it('services.graph.users.get', async () => {
    const response = await getClient().invoke('services.graph.users.get');
    expectSuccess(response);
  });

  it('services.graph.users.list', async () => {
    const response = await getClient().invoke('services.graph.users.list');
    expectSuccess(response);
  });

  it('services.release.definitions.get-release-definition-history', async () => {
    const response = await getClient().invoke('services.release.definitions.get-release-definition-history', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.deployments.list', async () => {
    const response = await getClient().invoke('services.release.deployments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.folders.list', async () => {
    const response = await getClient().invoke('services.release.folders.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.manual-interventions.get', async () => {
    const response = await getClient().invoke('services.release.manual-interventions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.manual-interventions.list', async () => {
    const response = await getClient().invoke('services.release.manual-interventions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.get-logs', async () => {
    const response = await getClient().invoke('services.release.releases.get-logs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.get-release', async () => {
    const response = await getClient().invoke('services.release.releases.get-release', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.get-release-environment', async () => {
    const response = await getClient().invoke('services.release.releases.get-release-environment', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.get-release-revision', async () => {
    const response = await getClient().invoke('services.release.releases.get-release-revision', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.releases.get-task-log', async () => {
    const response = await getClient().invoke('services.release.releases.get-task-log', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
