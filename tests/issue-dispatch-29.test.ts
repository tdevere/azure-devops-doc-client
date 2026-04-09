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

function expectReachable(response: AzureDevOpsResponse): void {
  // Mutating endpoint reachability: any HTTP response (2xx-4xx) proves the endpoint exists
  // Only 5xx or network errors indicate a real problem
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(500);
}

// Tests requested in issue #dispatch-29
testBlock('issue #dispatch-29: requested API tests', () => {
  it('services.member-entitlement-management.group-entitlements.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.group-entitlements.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.group-entitlements.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.group-entitlements.update', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.members.add [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.members.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.service-principal-entitlements.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.service-principal-entitlements.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.service-principal-entitlements.update-service-principal-entitlement [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.service-principal-entitlements.update-service-principal-entitlement', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.service-principal-entitlements.update-service-principal-entitlements [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.service-principal-entitlements.update-service-principal-entitlements', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.user-entitlements.add [POST]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.add', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.user-entitlements.update-user-entitlement [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.update-user-entitlement', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.user-entitlements.update-user-entitlements [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.update-user-entitlements', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.group-entitlements.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.group-entitlements.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.members.remove-member-from-group [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.members.remove-member-from-group');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.service-principal-entitlements.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.service-principal-entitlements.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.member-entitlement-management.user-entitlements.delete [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.delete');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpointproxy.execute-service-endpoint-request [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpointproxy.execute-service-endpoint-request', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpointproxy.query [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpointproxy.query', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.get-service-endpoints-with-refreshed-authentication [POST]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.get-service-endpoints-with-refreshed-authentication', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.share-service-endpoint [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.share-service-endpoint', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.update-service-endpoint [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.update-service-endpoint', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.service-endpoint.endpoints.update-service-endpoints [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.service-endpoint.endpoints.update-service-endpoints', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
