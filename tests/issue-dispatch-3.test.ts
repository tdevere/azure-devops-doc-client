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

// Tests requested in issue #dispatch-3
testBlock('issue #dispatch-3: requested API tests', () => {
  it('services.audit.actions.list', async () => {
    const response = await getClient().invoke('services.audit.actions.list');
    expectSuccess(response);
  });

  it('services.audit.audit-log.query', async () => {
    const response = await getClient().invoke('services.audit.audit-log.query');
    expectSuccess(response);
  });

  it('services.audit.download-log.download-log', async () => {
    const response = await getClient().invoke('services.audit.download-log.download-log');
    expectSuccess(response);
  });

  it('services.audit.streams.query-all-streams', async () => {
    const response = await getClient().invoke('services.audit.streams.query-all-streams');
    expectSuccess(response);
  });

  it('services.audit.streams.query-stream-by-id', async () => {
    const response = await getClient().invoke('services.audit.streams.query-stream-by-id');
    expectSuccess(response);
  });

  it('services.extension-management.installed-extensions.get', async () => {
    const response = await getClient().invoke('services.extension-management.installed-extensions.get');
    expectSuccess(response);
  });

  it('services.extension-management.installed-extensions.list', async () => {
    const response = await getClient().invoke('services.extension-management.installed-extensions.list');
    expectSuccess(response);
  });

  it('services.favorite.favorites.get-favorite-by-artifact', async () => {
    const response = await getClient().invoke('services.favorite.favorites.get-favorite-by-artifact');
    expectSuccess(response);
  });

  it('services.favorite.favorites.get-favorite-by-id', async () => {
    const response = await getClient().invoke('services.favorite.favorites.get-favorite-by-id');
    expectSuccess(response);
  });

  it('services.favorite.favorites.get-favorite-of-owner-by-id', async () => {
    const response = await getClient().invoke('services.favorite.favorites.get-favorite-of-owner-by-id');
    expectSuccess(response);
  });

  it('services.favorite.favorites.get-favorites', async () => {
    const response = await getClient().invoke('services.favorite.favorites.get-favorites');
    expectSuccess(response);
  });

  it('services.favorite.favorites.get-favorites-of-owner', async () => {
    const response = await getClient().invoke('services.favorite.favorites.get-favorites-of-owner');
    expectSuccess(response);
  });

  it('services.graph.avatars.get', async () => {
    const response = await getClient().invoke('services.graph.avatars.get');
    expectSuccess(response);
  });

  it('services.graph.descriptors.get', async () => {
    const response = await getClient().invoke('services.graph.descriptors.get');
    expectSuccess(response);
  });

  it('services.graph.groups.get', async () => {
    const response = await getClient().invoke('services.graph.groups.get');
    expectSuccess(response);
  });

  it('services.graph.groups.list', async () => {
    const response = await getClient().invoke('services.graph.groups.list');
    expectSuccess(response);
  });

  it('services.graph.membership-states.get', async () => {
    const response = await getClient().invoke('services.graph.membership-states.get');
    expectSuccess(response);
  });

  it('services.graph.memberships.get', async () => {
    const response = await getClient().invoke('services.graph.memberships.get');
    expectSuccess(response);
  });

  it('services.graph.memberships.list', async () => {
    const response = await getClient().invoke('services.graph.memberships.list');
    expectSuccess(response);
  });

  it('services.graph.provider-info.get', async () => {
    const response = await getClient().invoke('services.graph.provider-info.get');
    expectSuccess(response);
  });

}, 60_000);
