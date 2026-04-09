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

// Tests requested in issue #dispatch-4
testBlock('issue #dispatch-4: requested API tests', () => {
  it('services.member-entitlement-management.group-entitlements.get', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.group-entitlements.get');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.group-entitlements.list', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.group-entitlements.list');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.member-entitlements.search-member-entitlements', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.member-entitlements.search-member-entitlements');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.members.get', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.members.get');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.service-principal-entitlements.get', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.service-principal-entitlements.get');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.user-entitlement-summary.get', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.user-entitlement-summary.get');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.user-entitlements.get', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.get');
    expectSuccess(response);
  });

  it('services.member-entitlement-management.user-entitlements.search-user-entitlements', async () => {
    const response = await getClient().invoke('services.member-entitlement-management.user-entitlements.search-user-entitlements');
    expectSuccess(response);
  });

  it('services.permissions-report.permissions-report-download.download', async () => {
    const response = await getClient().invoke('services.permissions-report.permissions-report-download.download');
    expectSuccess(response);
  });

  it('services.permissions-report.permissions-report.get', async () => {
    const response = await getClient().invoke('services.permissions-report.permissions-report.get');
    expectSuccess(response);
  });

  it('services.permissions-report.permissions-report.list', async () => {
    const response = await getClient().invoke('services.permissions-report.permissions-report.list');
    expectSuccess(response);
  });

  it('services.search.repositories.get', async () => {
    const response = await getClient().invoke('services.search.repositories.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.search.tfvc.get', async () => {
    const response = await getClient().invoke('services.search.tfvc.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-endpoint.endpoints.get', async () => {
    const response = await getClient().invoke('services.service-endpoint.endpoints.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-endpoint.endpoints.get-service-endpoints', async () => {
    const response = await getClient().invoke('services.service-endpoint.endpoints.get-service-endpoints', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-endpoint.endpoints.get-service-endpoints-by-names', async () => {
    const response = await getClient().invoke('services.service-endpoint.endpoints.get-service-endpoints-by-names', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-endpoint.executionhistory.list', async () => {
    const response = await getClient().invoke('services.service-endpoint.executionhistory.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.service-endpoint.types.list', async () => {
    const response = await getClient().invoke('services.service-endpoint.types.list');
    expectSuccess(response);
  });

  it('services.symbol.availability.check-availability', async () => {
    const response = await getClient().invoke('services.symbol.availability.check-availability');
    expectSuccess(response);
  });

  it('services.symbol.client.get', async () => {
    const response = await getClient().invoke('services.symbol.client.get');
    expectSuccess(response);
  });

}, 60_000);
