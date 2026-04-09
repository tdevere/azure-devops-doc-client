export type ApiFlavor = 'services' | 'server';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type Primitive = string | number | boolean;
export type QueryValue = Primitive | null | undefined | Primitive[];

export interface DefaultPathValues {
  organization?: string;
  project?: string;
  team?: string;
  instance?: string;
  collection?: string;
  [key: string]: Primitive | undefined;
}

export interface OperationTemplate {
  method: HttpMethod;
  urlTemplate: string;
  placeholders: string[];
}

export interface OperationCatalogEntry {
  id: string;
  flavor: ApiFlavor;
  service: string;
  serviceKey: string;
  group: string;
  groupKey: string;
  action: string;
  actionKey: string;
  apiVersion: string;
  page: number;
  isPreview: boolean;
  requestTemplates: OperationTemplate[];
}

export interface CatalogMetadata {
  generatedAt: string;
  totalOperations: number;
  servicesOperations: number;
  serverOperations: number;
  uniqueServices: number;
  uniqueGroups: number;
  previewOperations: number;
}

export interface OperationInvocationInput {
  path?: Record<string, Primitive>;
  query?: Record<string, QueryValue>;
  body?: BodyInit | Record<string, unknown> | unknown[];
  headers?: HeadersInit;
  signal?: AbortSignal;
  apiVersion?: string;
}

export interface AzureDevOpsClientOptions {
  accessToken?: string;
  pat?: string;
  defaults?: DefaultPathValues;
  headers?: HeadersInit;
  fetch?: typeof fetch;
  retryCount?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  userAgent?: string;
}

export interface AzureDevOpsResponse<T = unknown> {
  data: T;
  headers: Record<string, string>;
  operation: OperationCatalogEntry;
  requestUrl: string;
  status: number;
  statusText: string;
}

export type OperationHandler = <T = unknown>(input?: OperationInvocationInput) => Promise<AzureDevOpsResponse<T>>;
export interface OperationNamespace {
  [key: string]: OperationHandler | OperationNamespace;
}
