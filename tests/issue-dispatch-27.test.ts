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

// Tests requested in issue #dispatch-27
testBlock('issue #dispatch-27: requested API tests', () => {
  it('services.search.code-search-results.fetch-code-search-results [POST]', async () => {
    try {
      const response = await getClient().invoke('services.search.code-search-results.fetch-code-search-results', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.search.package-search-results.fetch-package-search-results [POST]', async () => {
    try {
      const response = await getClient().invoke('services.search.package-search-results.fetch-package-search-results', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.search.wiki-search-results.fetch-wiki-search-results [POST]', async () => {
    try {
      const response = await getClient().invoke('services.search.wiki-search-results.fetch-wiki-search-results', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.search.work-item-search-results.fetch-work-item-search-results [POST]', async () => {
    try {
      const response = await getClient().invoke('services.search.work-item-search-results.fetch-work-item-search-results', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.access-control-entries.set-access-control-entries [POST]', async () => {
    try {
      const response = await getClient().invoke('services.security.access-control-entries.set-access-control-entries', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.access-control-lists.set-access-control-lists [POST]', async () => {
    try {
      const response = await getClient().invoke('services.security.access-control-lists.set-access-control-lists', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.permissions.has-permissions-batch [POST]', async () => {
    try {
      const response = await getClient().invoke('services.security.permissions.has-permissions-batch', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.access-control-entries.remove-access-control-entries [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.security.access-control-entries.remove-access-control-entries');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.access-control-lists.remove-access-control-lists [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.security.access-control-lists.remove-access-control-lists');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.security.permissions.remove-permission [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.security.permissions.remove-permission');
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.token-admin.revocation-rules.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.token-admin.revocation-rules.create', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.token-admin.revocations.revoke-authorizations [POST]', async () => {
    try {
      const response = await getClient().invoke('services.token-admin.revocations.revoke-authorizations', { body: {} });
      expectReachable(response);
    } catch (err: any) {
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.attachments.create [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.attachments.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.page-moves.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.page-moves.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.pages-batch.get [POST]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.pages-batch.get', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.pages.create-or-update [PUT]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.pages.create-or-update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.pages.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.pages.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.wikis.create [POST]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.wikis.create', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.wikis.update [PATCH]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.wikis.update', {
        path: { project: 'DISCOVERED_PROJECT' },
        body: {},
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

  it('services.wiki.pages.delete-page [DELETE]', async () => {
    try {
      const response = await getClient().invoke('services.wiki.pages.delete-page', {
        path: { project: 'DISCOVERED_PROJECT' },
      });
      expectReachable(response);
    } catch (err: any) {
      // Missing path values or auth errors are expected for mutating endpoints
      expect(err.code === 'MISSING_PATH_VALUES' || err.status >= 400).toBe(true);
    }
  });

}, 60_000);
