import { AzureDevOpsApiError, AzureDevOpsClientError, headersToObject } from './errors.js';
import type {
  AzureDevOpsClientOptions,
  AzureDevOpsResponse,
  DefaultPathValues,
  OperationCatalogEntry,
  OperationInvocationInput,
  OperationTemplate,
  QueryValue,
} from '../types.js';

const retryableStatuses = new Set([408, 409, 429, 500, 502, 503, 504]);

export async function executeOperation<T>(
  operation: OperationCatalogEntry,
  clientOptions: AzureDevOpsClientOptions,
  input: OperationInvocationInput = {},
): Promise<AzureDevOpsResponse<T>> {
  const request = buildRequestUrl(operation, clientOptions.defaults ?? {}, input);
  const fetchImpl = clientOptions.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new AzureDevOpsClientError('No fetch implementation is available. Use Node 20+ or provide options.fetch.');
  }

  const headers = new Headers(clientOptions.headers);
  mergeHeaders(headers, input.headers);

  const authorization = createAuthorizationHeader(clientOptions);
  if (authorization) {
    headers.set('authorization', authorization);
  }

  headers.set('accept', 'application/json');

  if (clientOptions.userAgent) {
    headers.set('user-agent', clientOptions.userAgent);
  }

  const body = serializeBody(input.body, headers);
  const retryCount = clientOptions.retryCount ?? 2;
  const retryDelayMs = clientOptions.retryDelayMs ?? 750;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const controller = new AbortController();
    const timeout = clientOptions.timeoutMs
      ? setTimeout(() => controller.abort(new Error('Request timeout exceeded.')), clientOptions.timeoutMs)
      : undefined;

    const signal = mergeSignals(controller.signal, input.signal);

    try {
      const response = await fetchImpl(request.url, {
        body,
        headers,
        method: request.template.method,
        signal,
      });

      if (!response.ok) {
        const responseText = await response.text();
        const responseHeaders = headersToObject(response.headers);

        if (attempt < retryCount && retryableStatuses.has(response.status)) {
          await delay(getRetryDelay(response, retryDelayMs, attempt));
          continue;
        }

        throw new AzureDevOpsApiError({
          operation,
          requestUrl: request.url,
          responseHeaders,
          responseText,
          status: response.status,
          statusText: response.statusText,
        });
      }

      const data = await parseResponseBody<T>(response, request.template.method);

      return {
        data,
        headers: headersToObject(response.headers),
        operation,
        requestUrl: request.url,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      if (error instanceof AzureDevOpsApiError) {
        throw error;
      }

      if (attempt >= retryCount) {
        throw new AzureDevOpsClientError(`Request failed for ${operation.id}`, { cause: error });
      }

      await delay(retryDelayMs * (attempt + 1));
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }

  throw new AzureDevOpsClientError(`Request failed for ${operation.id}`, { code: 'UNREACHABLE' });
}

export function buildRequestUrl(
  operation: OperationCatalogEntry,
  defaults: DefaultPathValues,
  input: OperationInvocationInput = {},
): { template: OperationTemplate; url: string } {
  const pathValues = { ...defaults, ...input.path };
  const templates = [...operation.requestTemplates].sort(
    (left, right) => right.placeholders.length - left.placeholders.length,
  );

  const template = templates.find((candidate) =>
    candidate.placeholders.every((placeholder) => hasValue(pathValues[placeholder])),
  );

  if (!template) {
    const requiredPlaceholders = [...new Set(templates.flatMap((candidate) => candidate.placeholders))];
    const missing = requiredPlaceholders.filter((placeholder) => !hasValue(pathValues[placeholder]));

    throw new AzureDevOpsClientError(
      `Operation ${operation.id} is missing required path values: ${missing.join(', ')}`,
      { code: 'MISSING_PATH_VALUES' },
    );
  }

  const replaced = template.urlTemplate.replace(/\{([^}]+)\}/g, (_, placeholder: string) => {
    const value = pathValues[placeholder];

    if (!hasValue(value)) {
      throw new AzureDevOpsClientError(`Missing value for path placeholder ${placeholder}`, {
        code: 'MISSING_PATH_VALUE',
      });
    }

    return encodeURIComponent(String(value));
  });

  const url = new URL(replaced);

  if (!url.searchParams.has('api-version')) {
    url.searchParams.set('api-version', input.apiVersion ?? operation.apiVersion);
  } else if (input.apiVersion) {
    url.searchParams.set('api-version', input.apiVersion);
  }

  appendQueryValues(url, input.query);

  return { template, url: url.toString() };
}

export function createAuthorizationHeader(options: AzureDevOpsClientOptions): string | undefined {
  if (options.accessToken) {
    return `Bearer ${options.accessToken}`;
  }

  if (options.pat) {
    return `Basic ${Buffer.from(`:${options.pat}`).toString('base64')}`;
  }

  return undefined;
}

function appendQueryValues(url: URL, query: Record<string, QueryValue> | undefined): void {
  if (!query) {
    return;
  }

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.delete(key);

    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, String(item));
      }

      continue;
    }

    url.searchParams.set(key, String(value));
  }
}

function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

function mergeHeaders(target: Headers, source: HeadersInit | undefined): void {
  if (!source) {
    return;
  }

  const headers = new Headers(source);
  headers.forEach((value, key) => target.set(key, value));
}

function serializeBody(body: OperationInvocationInput['body'], headers: Headers): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (
    typeof body === 'string' ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    body instanceof URLSearchParams ||
    body instanceof ReadableStream
  ) {
    return body;
  }

  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  return JSON.stringify(body);
}

async function parseResponseBody<T>(response: Response, method: string): Promise<T> {
  if (method === 'HEAD' || response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json') || contentType.includes('+json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

function getRetryDelay(response: Response, retryDelayMs: number, attempt: number): number {
  const retryAfter = response.headers.get('retry-after');
  const parsed = retryAfter ? Number.parseInt(retryAfter, 10) : Number.NaN;

  if (Number.isFinite(parsed)) {
    return parsed * 1000;
  }

  return retryDelayMs * (attempt + 1);
}

function mergeSignals(primary: AbortSignal, secondary: AbortSignal | undefined): AbortSignal {
  if (!secondary) {
    return primary;
  }

  if (secondary.aborted) {
    primary.throwIfAborted();
  }

  const controller = new AbortController();

  const onAbort = () => controller.abort();
  primary.addEventListener('abort', onAbort, { once: true });
  secondary.addEventListener('abort', onAbort, { once: true });

  return controller.signal;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
