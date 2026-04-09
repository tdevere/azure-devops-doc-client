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

// Tests requested in issue #dispatch-22
testBlock('issue #dispatch-22: requested API tests', () => {
  it('services.work.deliverytimeline.get', async () => {
    const response = await getClient().invoke('services.work.deliverytimeline.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.iterationcapacities.get', async () => {
    const response = await getClient().invoke('services.work.iterationcapacities.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.iterations.get', async () => {
    const response = await getClient().invoke('services.work.iterations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.iterations.get-iteration-work-items', async () => {
    const response = await getClient().invoke('services.work.iterations.get-iteration-work-items', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.iterations.list', async () => {
    const response = await getClient().invoke('services.work.iterations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.plans.get', async () => {
    const response = await getClient().invoke('services.work.plans.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.plans.list', async () => {
    const response = await getClient().invoke('services.work.plans.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.processconfiguration.get', async () => {
    const response = await getClient().invoke('services.work.processconfiguration.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.rows.list', async () => {
    const response = await getClient().invoke('services.work.rows.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.taskboard-columns.get', async () => {
    const response = await getClient().invoke('services.work.taskboard-columns.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.taskboard-work-items.list', async () => {
    const response = await getClient().invoke('services.work.taskboard-work-items.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.teamdaysoff.get', async () => {
    const response = await getClient().invoke('services.work.teamdaysoff.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.teamfieldvalues.get', async () => {
    const response = await getClient().invoke('services.work.teamfieldvalues.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.teamsettings.get', async () => {
    const response = await getClient().invoke('services.work.teamsettings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-statuses.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-statuses.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-statuses.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-statuses.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-thread-comments.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-thread-comments.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-thread-comments.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-thread-comments.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-threads.get', async () => {
    const response = await getClient().invoke('services.git.pull-request-threads.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.git.pull-request-threads.list', async () => {
    const response = await getClient().invoke('services.git.pull-request-threads.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
