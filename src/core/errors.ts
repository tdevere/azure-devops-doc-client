import type { OperationCatalogEntry } from '../types.js';

export class AzureDevOpsClientError extends Error {
  readonly code?: string;

  constructor(message: string, options?: { cause?: unknown; code?: string }) {
    super(message, options);
    this.name = 'AzureDevOpsClientError';
    this.code = options?.code;
  }
}

export class AzureDevOpsApiError extends AzureDevOpsClientError {
  readonly operation: OperationCatalogEntry;
  readonly requestUrl: string;
  readonly responseHeaders: Record<string, string>;
  readonly responseText: string;
  readonly status: number;
  readonly statusText: string;
  readonly troubleshooting: string[];

  constructor(params: {
    operation: OperationCatalogEntry;
    requestUrl: string;
    responseHeaders: Record<string, string>;
    responseText: string;
    status: number;
    statusText: string;
  }) {
    super(`${params.operation.id} failed with ${params.status} ${params.statusText}`, {
      code: `HTTP_${params.status}`,
    });

    this.name = 'AzureDevOpsApiError';
    this.operation = params.operation;
    this.requestUrl = params.requestUrl;
    this.responseHeaders = params.responseHeaders;
    this.responseText = params.responseText;
    this.status = params.status;
    this.statusText = params.statusText;
    this.troubleshooting = buildTroubleshootingHints(params.status, params.responseHeaders);
  }
}

export function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};

  headers.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

function buildTroubleshootingHints(status: number, headers: Record<string, string>): string[] {
  const hints: string[] = [];

  if (status === 401 || status === 403) {
    hints.push('Verify PAT or bearer token scope for the target API.');
  }

  if (status === 404) {
    hints.push('Confirm all required path placeholders were provided and resolve to existing resources.');
  }

  if (status === 429) {
    hints.push('The request was throttled. Inspect Retry-After and reduce concurrency if retries continue to fail.');
  }

  if (status >= 500) {
    hints.push('Transient service failures are retried automatically. Capture x-vss-e2eid or x-tfs-session for escalation if failures persist.');
  }

  if (headers['x-vss-e2eid']) {
    hints.push(`x-vss-e2eid: ${headers['x-vss-e2eid']}`);
  }

  if (headers['x-tfs-session']) {
    hints.push(`x-tfs-session: ${headers['x-tfs-session']}`);
  }

  if (headers['request-context']) {
    hints.push(`request-context: ${headers['request-context']}`);
  }

  return hints;
}
