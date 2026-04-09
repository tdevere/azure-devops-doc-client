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

// Tests requested in issue #5
testBlock('issue #5: requested API tests', () => {
  it('services.accounts.accounts.list', async () => {
    const response = await getClient().invoke('services.accounts.accounts.list');
    expectSuccess(response);
  });

  it('services.dashboard.dashboards.get', async () => {
    const response = await getClient().invoke('services.dashboard.dashboards.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.dashboard.dashboards.list', async () => {
    const response = await getClient().invoke('services.dashboard.dashboards.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.dashboard.widget-types.get-widget-metadata', async () => {
    const response = await getClient().invoke('services.dashboard.widget-types.get-widget-metadata', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.dashboard.widget-types.get-widget-types', async () => {
    const response = await getClient().invoke('services.dashboard.widget-types.get-widget-types', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.dashboard.widgets.get-widget', async () => {
    const response = await getClient().invoke('services.dashboard.widgets.get-widget', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.dashboard.widgets.get-widgets', async () => {
    const response = await getClient().invoke('services.dashboard.widgets.get-widgets', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.identities.identities.read-identities', async () => {
    const response = await getClient().invoke('services.identities.identities.read-identities');
    expectSuccess(response);
  });

  it('services.notification.diagnostic-logs.list', async () => {
    const response = await getClient().invoke('services.notification.diagnostic-logs.list');
    expectSuccess(response);
  });

  it('services.notification.diagnostics.get', async () => {
    const response = await getClient().invoke('services.notification.diagnostics.get');
    expectSuccess(response);
  });

  it('services.notification.event-types.get', async () => {
    const response = await getClient().invoke('services.notification.event-types.get');
    expectSuccess(response);
  });

  it('services.notification.event-types.list', async () => {
    const response = await getClient().invoke('services.notification.event-types.list');
    expectSuccess(response);
  });

  it('services.notification.settings.get', async () => {
    const response = await getClient().invoke('services.notification.settings.get');
    expectSuccess(response);
  });

  it('services.notification.subscribers.get', async () => {
    const response = await getClient().invoke('services.notification.subscribers.get');
    expectSuccess(response);
  });

  it('services.notification.subscriptions.get', async () => {
    const response = await getClient().invoke('services.notification.subscriptions.get');
    expectSuccess(response);
  });

  it('services.notification.subscriptions.get-subscription-templates', async () => {
    const response = await getClient().invoke('services.notification.subscriptions.get-subscription-templates');
    expectSuccess(response);
  });

  it('services.notification.subscriptions.list', async () => {
    const response = await getClient().invoke('services.notification.subscriptions.list');
    expectSuccess(response);
  });

  it('services.operations.operations.get', async () => {
    const response = await getClient().invoke('services.operations.operations.get');
    expectSuccess(response);
  });

  it('services.profile.profiles.get', async () => {
    const response = await getClient().invoke('services.profile.profiles.get');
    expectSuccess(response);
  });

  it('services.security.access-control-lists.query', async () => {
    const response = await getClient().invoke('services.security.access-control-lists.query');
    expectSuccess(response);
  });

}, 60_000);
