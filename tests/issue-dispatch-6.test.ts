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

// Tests requested in issue #dispatch-6
testBlock('issue #dispatch-6: requested API tests', () => {
  it('services.work.backlogconfiguration.get', async () => {
    const response = await getClient().invoke('services.work.backlogconfiguration.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.backlogs.get-backlog', async () => {
    const response = await getClient().invoke('services.work.backlogs.get-backlog', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.backlogs.get-backlog-level-work-items', async () => {
    const response = await getClient().invoke('services.work.backlogs.get-backlog-level-work-items', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.backlogs.list', async () => {
    const response = await getClient().invoke('services.work.backlogs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boardcolumns.list', async () => {
    const response = await getClient().invoke('services.work.boardcolumns.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boardparents.list', async () => {
    const response = await getClient().invoke('services.work.boardparents.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boardrows.list', async () => {
    const response = await getClient().invoke('services.work.boardrows.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boards.get', async () => {
    const response = await getClient().invoke('services.work.boards.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boards.list', async () => {
    const response = await getClient().invoke('services.work.boards.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.boardusersettings.get', async () => {
    const response = await getClient().invoke('services.work.boardusersettings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.capacities.get-capacities-with-identity-ref-and-totals', async () => {
    const response = await getClient().invoke('services.work.capacities.get-capacities-with-identity-ref-and-totals', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.capacities.get-capacity-with-identity-ref', async () => {
    const response = await getClient().invoke('services.work.capacities.get-capacity-with-identity-ref', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.cardrulesettings.get', async () => {
    const response = await getClient().invoke('services.work.cardrulesettings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.cardsettings.get', async () => {
    const response = await getClient().invoke('services.work.cardsettings.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.chartimages.get-board-chart-image', async () => {
    const response = await getClient().invoke('services.work.chartimages.get-board-chart-image', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.chartimages.get-iteration-chart-image', async () => {
    const response = await getClient().invoke('services.work.chartimages.get-iteration-chart-image', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.chartimages.get-iterations-chart-image', async () => {
    const response = await getClient().invoke('services.work.chartimages.get-iterations-chart-image', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.charts.get', async () => {
    const response = await getClient().invoke('services.work.charts.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.charts.list', async () => {
    const response = await getClient().invoke('services.work.charts.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work.columns.list', async () => {
    const response = await getClient().invoke('services.work.columns.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
