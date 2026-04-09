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

// Tests requested in issue #dispatch-14
testBlock('issue #dispatch-14: requested API tests', () => {
  it('services.policy.configurations.get', async () => {
    const response = await getClient().invoke('services.policy.configurations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.evaluations.get', async () => {
    const response = await getClient().invoke('services.policy.evaluations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.evaluations.list', async () => {
    const response = await getClient().invoke('services.policy.evaluations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.revisions.get', async () => {
    const response = await getClient().invoke('services.policy.revisions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.revisions.list', async () => {
    const response = await getClient().invoke('services.policy.revisions.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.types.get', async () => {
    const response = await getClient().invoke('services.policy.types.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.policy.types.list', async () => {
    const response = await getClient().invoke('services.policy.types.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-hooks.consumers.get', async () => {
    const response = await getClient().invoke('services.service-hooks.consumers.get');
    expectSuccess(response);
  });

  it('services.service-hooks.consumers.get-consumer-action', async () => {
    const response = await getClient().invoke('services.service-hooks.consumers.get-consumer-action');
    expectSuccess(response);
  });

  it('services.service-hooks.consumers.list-consumer-actions', async () => {
    const response = await getClient().invoke('services.service-hooks.consumers.list-consumer-actions');
    expectSuccess(response);
  });

  it('services.service-hooks.diagnostics.get', async () => {
    const response = await getClient().invoke('services.service-hooks.diagnostics.get');
    expectSuccess(response);
  });

  it('services.service-hooks.notifications.get', async () => {
    const response = await getClient().invoke('services.service-hooks.notifications.get');
    expectSuccess(response);
  });

  it('services.service-hooks.notifications.list', async () => {
    const response = await getClient().invoke('services.service-hooks.notifications.list');
    expectSuccess(response);
  });

  it('services.service-hooks.publishers.get', async () => {
    const response = await getClient().invoke('services.service-hooks.publishers.get');
    expectSuccess(response);
  });

  it('services.service-hooks.publishers.get-event-type', async () => {
    const response = await getClient().invoke('services.service-hooks.publishers.get-event-type');
    expectSuccess(response);
  });

  it('services.service-hooks.publishers.list-event-types', async () => {
    const response = await getClient().invoke('services.service-hooks.publishers.list-event-types');
    expectSuccess(response);
  });

  it('services.service-hooks.subscriptions.get', async () => {
    const response = await getClient().invoke('services.service-hooks.subscriptions.get');
    expectSuccess(response);
  });

  it('services.service-hooks.subscriptions.list', async () => {
    const response = await getClient().invoke('services.service-hooks.subscriptions.list');
    expectSuccess(response);
  });

  it('services.release.attachments.get-release-task-attachment-content', async () => {
    const response = await getClient().invoke('services.release.attachments.get-release-task-attachment-content', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.attachments.get-release-task-attachments', async () => {
    const response = await getClient().invoke('services.release.attachments.get-release-task-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
