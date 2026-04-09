import { describe, expect, it, vi } from 'vitest';

import {
  buildRequestUrl,
  createAuthorizationHeader,
  executeOperation,
} from '../src/index.js';
import type {
  AzureDevOpsClientOptions,
  OperationCatalogEntry,
} from '../src/index.js';

function makeOperation(overrides: Partial<OperationCatalogEntry> = {}): OperationCatalogEntry {
  return {
    id: 'services.test.items.list',
    flavor: 'services',
    service: 'Test',
    serviceKey: 'test',
    group: 'Items',
    groupKey: 'items',
    action: 'List',
    actionKey: 'list',
    apiVersion: '7.1',
    page: 1,
    isPreview: false,
    requestTemplates: [
      {
        method: 'GET',
        urlTemplate:
          'https://dev.azure.com/{organization}/{project}/_apis/test/items?api-version=7.1',
        placeholders: ['organization', 'project'],
      },
    ],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// createAuthorizationHeader
// ---------------------------------------------------------------------------

describe('createAuthorizationHeader', () => {
  it('returns Bearer token when accessToken is provided', () => {
    const header = createAuthorizationHeader({ accessToken: 'my-token' });
    expect(header).toBe('Bearer my-token');
  });

  it('returns Basic auth when pat is provided', () => {
    const header = createAuthorizationHeader({ pat: 'my-pat' });
    const expected = `Basic ${Buffer.from(':my-pat').toString('base64')}`;
    expect(header).toBe(expected);
  });

  it('returns undefined when neither pat nor accessToken is provided', () => {
    const header = createAuthorizationHeader({});
    expect(header).toBeUndefined();
  });

  // NOTE: the implementation checks accessToken first, so Bearer takes
  // precedence when both are supplied.
  it('accessToken (Bearer) takes precedence over pat', () => {
    const header = createAuthorizationHeader({
      accessToken: 'bearer-tok',
      pat: 'pat-tok',
    });
    expect(header).toBe('Bearer bearer-tok');
  });
});

// ---------------------------------------------------------------------------
// buildRequestUrl
// ---------------------------------------------------------------------------

describe('buildRequestUrl', () => {
  it('throws when a required placeholder is missing', () => {
    const op = makeOperation();

    expect(() =>
      buildRequestUrl(op, { organization: 'myorg' }, {}),
    ).toThrowError(/missing required path values.*project/i);
  });

  it('leaves no unreplaced placeholders when all values are provided', () => {
    const op = makeOperation();
    const { url } = buildRequestUrl(
      op,
      { organization: 'myorg', project: 'myproj' },
      {},
    );
    expect(url).not.toContain('{');
    expect(url).toContain('myorg');
    expect(url).toContain('myproj');
  });

  it('appends array query parameters as multiple entries', () => {
    const op = makeOperation();
    const { url } = buildRequestUrl(
      op,
      { organization: 'myorg', project: 'myproj' },
      { query: { status: ['active', 'closed'] } },
    );

    const parsed = new URL(url);
    const statuses = parsed.searchParams.getAll('status');
    expect(statuses).toEqual(['active', 'closed']);
  });

  it('sets scalar query values', () => {
    const op = makeOperation();
    const { url } = buildRequestUrl(
      op,
      { organization: 'myorg', project: 'myproj' },
      { query: { top: 50 } },
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get('top')).toBe('50');
  });
});

// ---------------------------------------------------------------------------
// executeOperation – retry behaviour
// ---------------------------------------------------------------------------

describe('executeOperation retries', () => {
  it('retries on 429 and succeeds on second attempt', async () => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response('throttled', { status: 429, statusText: 'Too Many Requests' }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      );

    const op = makeOperation();
    const opts: AzureDevOpsClientOptions = {
      accessToken: 'tok',
      defaults: { organization: 'org', project: 'proj' },
      fetch: mockFetch,
      retryCount: 2,
      retryDelayMs: 1,
    };

    const result = await executeOperation(op, opts);
    expect(result.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('retries on 503 and succeeds on second attempt', async () => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response('unavailable', { status: 503, statusText: 'Service Unavailable' }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      );

    const op = makeOperation();
    const opts: AzureDevOpsClientOptions = {
      accessToken: 'tok',
      defaults: { organization: 'org', project: 'proj' },
      fetch: mockFetch,
      retryCount: 2,
      retryDelayMs: 1,
    };

    const result = await executeOperation(op, opts);
    expect(result.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('throws AzureDevOpsApiError when retries are exhausted', async () => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockImplementation(async () =>
        new Response('unavailable', { status: 503, statusText: 'Service Unavailable' }),
      );

    const op = makeOperation();
    const opts: AzureDevOpsClientOptions = {
      accessToken: 'tok',
      defaults: { organization: 'org', project: 'proj' },
      fetch: mockFetch,
      retryCount: 1,
      retryDelayMs: 1,
    };

    await expect(executeOperation(op, opts)).rejects.toThrow(/503/);
    // initial attempt + 1 retry = 2 calls
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('returns parsed JSON data on success', async () => {
    const payload = { count: 3, value: [1, 2, 3] };
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(JSON.stringify(payload), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      );

    const op = makeOperation();
    const opts: AzureDevOpsClientOptions = {
      accessToken: 'tok',
      defaults: { organization: 'org', project: 'proj' },
      fetch: mockFetch,
      retryDelayMs: 1,
    };

    const result = await executeOperation(op, opts);
    expect(result.data).toEqual(payload);
  });
});
