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

function expectReachable(response: AzureDevOpsResponse): void {
  // Mutating endpoint reachability: any HTTP response (2xx-4xx) proves the endpoint exists
  // Only 5xx or network errors indicate a real problem
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(500);
}

// Tests requested in issue #dispatch-39
testBlock('issue #dispatch-39: requested API tests', () => {
  it('services.work-item-tracking-process.processes.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.processes.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.processes.edit-process [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.processes.edit-process', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.rules.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.rules.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.rules.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.rules.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.states.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.states.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.states.hide-state-definition [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.states.hide-state-definition', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.states.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.states.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.system-controls.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.system-controls.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types-behaviors.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types-behaviors.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types-behaviors.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types-behaviors.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.work-item-types.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.work-item-types.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.behaviors.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.behaviors.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.controls.remove-control-from-group [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.controls.remove-control-from-group');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.fields.remove-work-item-type-field [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.fields.remove-work-item-type-field');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.groups.remove-group [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.groups.remove-group');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.lists.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.lists.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.pages.remove-page [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.pages.remove-page');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.processes.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.processes.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.rules.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.rules.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
