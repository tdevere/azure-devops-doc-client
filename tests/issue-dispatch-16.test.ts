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

// Tests requested in issue #dispatch-16
testBlock('issue #dispatch-16: requested API tests', () => {
  it('services.security.permissions.has-permissions', async () => {
    const response = await getClient().invoke('services.security.permissions.has-permissions');
    expectSuccess(response);
  });

  it('services.security.security-namespaces.query', async () => {
    const response = await getClient().invoke('services.security.security-namespaces.query');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.processes.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.processes.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.rules.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.rules.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.rules.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.rules.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.states.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.states.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.states.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.states.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.system-controls.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.system-controls.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.work-item-types-behaviors.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.work-item-types-behaviors.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.work-item-types-behaviors.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.work-item-types-behaviors.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.work-item-types.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.work-item-types.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.work-item-types.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.work-item-types.list');
    expectSuccess(response);
  });

  it('services.symbol.contents.get', async () => {
    const response = await getClient().invoke('services.symbol.contents.get');
    expectSuccess(response);
  });

  it('services.symbol.requests.get-requests-request-id', async () => {
    const response = await getClient().invoke('services.symbol.requests.get-requests-request-id');
    expectSuccess(response);
  });

  it('services.symbol.requests.get-requests-request-name', async () => {
    const response = await getClient().invoke('services.symbol.requests.get-requests-request-name');
    expectSuccess(response);
  });

  it('services.symbol.symsrv.get', async () => {
    const response = await getClient().invoke('services.symbol.symsrv.get');
    expectSuccess(response);
  });

  it('services.release.attachments.get-task-attachment-content', async () => {
    const response = await getClient().invoke('services.release.attachments.get-task-attachment-content', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.attachments.get-task-attachments', async () => {
    const response = await getClient().invoke('services.release.attachments.get-task-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.definitions.get', async () => {
    const response = await getClient().invoke('services.release.definitions.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.release.definitions.get-definition-revision', async () => {
    const response = await getClient().invoke('services.release.definitions.get-definition-revision', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
