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

// Tests requested in issue #dispatch-10
testBlock('issue #dispatch-10: requested API tests', () => {
  it('services.tfvc.branches.get', async () => {
    const response = await getClient().invoke('services.tfvc.branches.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.branches.get-branch-refs', async () => {
    const response = await getClient().invoke('services.tfvc.branches.get-branch-refs', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.branches.get-branches', async () => {
    const response = await getClient().invoke('services.tfvc.branches.get-branches', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.changesets.get', async () => {
    const response = await getClient().invoke('services.tfvc.changesets.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.changesets.get-changeset-changes', async () => {
    const response = await getClient().invoke('services.tfvc.changesets.get-changeset-changes');
    expectSuccess(response);
  });

  it('services.tfvc.changesets.get-changeset-work-items', async () => {
    const response = await getClient().invoke('services.tfvc.changesets.get-changeset-work-items');
    expectSuccess(response);
  });

  it('services.tfvc.changesets.get-changesets', async () => {
    const response = await getClient().invoke('services.tfvc.changesets.get-changesets', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.items.get', async () => {
    const response = await getClient().invoke('services.tfvc.items.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.labels.get', async () => {
    const response = await getClient().invoke('services.tfvc.labels.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.labels.get-label-items', async () => {
    const response = await getClient().invoke('services.tfvc.labels.get-label-items');
    expectSuccess(response);
  });

  it('services.tfvc.labels.list', async () => {
    const response = await getClient().invoke('services.tfvc.labels.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.tfvc.shelvesets.get', async () => {
    const response = await getClient().invoke('services.tfvc.shelvesets.get');
    expectSuccess(response);
  });

  it('services.tfvc.shelvesets.get-shelveset-changes', async () => {
    const response = await getClient().invoke('services.tfvc.shelvesets.get-shelveset-changes');
    expectSuccess(response);
  });

  it('services.tfvc.shelvesets.get-shelveset-work-items', async () => {
    const response = await getClient().invoke('services.tfvc.shelvesets.get-shelveset-work-items');
    expectSuccess(response);
  });

  it('services.tfvc.shelvesets.list', async () => {
    const response = await getClient().invoke('services.tfvc.shelvesets.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.fields.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.fields.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.layout.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.layout.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.lists.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.lists.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.lists.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.lists.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.processes.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.processes.get');
    expectSuccess(response);
  });

}, 60_000);
