import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AzureDevOpsApiError,
  AzureDevOpsClient,
  buildRequestUrl,
  createAuthorizationHeader,
  executeOperation,
  operationCatalog,
} from '../src/index.js';
import type { OperationCatalogEntry } from '../src/index.js';

describe('client runtime', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a PAT authorization header', () => {
    expect(createAuthorizationHeader({ pat: 'abc123' })).toMatch(/^Basic\s+/);
  });

  it('applies defaults and path values when building a request url', () => {
    const operation: OperationCatalogEntry = {
      id: 'services.sample.projects.get',
      flavor: 'services',
      service: 'Sample',
      serviceKey: 'sample',
      group: 'Projects',
      groupKey: 'projects',
      action: 'Get',
      actionKey: 'get',
      apiVersion: '7.1',
      page: 1,
      isPreview: false,
      requestTemplates: [
        {
          method: 'GET',
          urlTemplate: 'https://dev.azure.com/{organization}/{project}/_apis/projects/{projectId}?api-version=7.1',
          placeholders: ['organization', 'project', 'projectId'],
        },
      ],
    };

    const request = buildRequestUrl(
      operation,
      { organization: 'sample-org', project: 'sample-project' },
      { path: { projectId: '123' }, query: { includeCapabilities: true } },
    );

    expect(request.url).toContain('sample-org');
    expect(request.url).toContain('sample-project');
    expect(request.url).toContain('/projects/123');
    expect(request.url).toContain('includeCapabilities=true');
  });

  it('invokes a generated namespace operation', async () => {
    const operation = operationCatalog[0];
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const client = new AzureDevOpsClient({
      fetch: fetchMock as typeof fetch,
      defaults: buildPathDefaults(operation),
    });

    const flavorRoot = operation.flavor === 'services' ? client.services : client.server;
    const serviceNamespace = flavorRoot[operation.serviceKey] as Record<string, unknown>;
    const groupNamespace = serviceNamespace[operation.groupKey] as Record<string, unknown>;
    const handler = groupNamespace[operation.actionKey] as (input?: unknown) => Promise<unknown>;

    const response = (await handler()) as { data: { ok: boolean } };
    expect(response.data.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('raises AzureDevOpsApiError for non-success responses', async () => {
    const operation = operationCatalog.find((entry) => entry.requestTemplates.length > 0);
    expect(operation).toBeTruthy();

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'denied' }), {
        status: 403,
        statusText: 'Forbidden',
        headers: { 'content-type': 'application/json', 'x-vss-e2eid': 'abc' },
      }),
    );

    await expect(
      executeOperation(operation!, { fetch: fetchMock as typeof fetch, defaults: buildPathDefaults(operation!) }),
    ).rejects.toBeInstanceOf(AzureDevOpsApiError);
  });
});

function buildPathDefaults(operation: OperationCatalogEntry): Record<string, string> {
  const defaults: Record<string, string> = {};
  const placeholderValues: Record<string, string> = {
    organization: 'sample-org',
    project: 'sample-project',
    team: 'sample-team',
    instance: 'server.example.com',
    collection: 'DefaultCollection',
  };

  const placeholders = new Set(operation.requestTemplates.flatMap((template) => template.placeholders));

  for (const placeholder of placeholders) {
    defaults[placeholder] = placeholderValues[placeholder] ?? `${placeholder}-value`;
  }

  return defaults;
}
