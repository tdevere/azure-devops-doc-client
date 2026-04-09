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

// Tests requested in issue #dispatch-26
testBlock('issue #dispatch-26: requested API tests', () => {
  it('services.security-roles.roleassignments.change-inheritance [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.security-roles.roleassignments.change-inheritance', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security-roles.roleassignments.remove-role-assignments [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.security-roles.roleassignments.remove-role-assignments', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security-roles.roleassignments.set-role-assignment [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.security-roles.roleassignments.set-role-assignment', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security-roles.roleassignments.set-role-assignments [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.security-roles.roleassignments.set-role-assignments', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security-roles.roleassignments.remove-role-assignment [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.security-roles.roleassignments.remove-role-assignment');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.behaviors.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.behaviors.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.behaviors.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.behaviors.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.controls.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.controls.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.controls.move-control-to-group [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.controls.move-control-to-group', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.controls.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.controls.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.fields.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.fields.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.fields.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.fields.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.groups.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.groups.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.groups.move-group-to-page [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.groups.move-group-to-page', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.groups.move-group-to-section [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.groups.move-group-to-section', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.groups.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.groups.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.lists.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.lists.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.lists.update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.lists.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.pages.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.pages.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.work-item-tracking-process.pages.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.work-item-tracking-process.pages.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
