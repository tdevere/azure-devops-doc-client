export { AzureDevOpsClient } from './client.js';
export { catalogMetadata, getCatalogMetadata, getOperationById, listOperations, operationCatalog } from './core/catalog.js';
export { loadAzureDevOpsClientOptionsFromEnv } from './core/env.js';
export { AzureDevOpsApiError, AzureDevOpsClientError } from './core/errors.js';
export { buildRequestUrl, createAuthorizationHeader, executeOperation } from './core/http.js';
export type {
  ApiFlavor,
  AzureDevOpsClientOptions,
  AzureDevOpsResponse,
  CatalogMetadata,
  DefaultPathValues,
  HttpMethod,
  OperationCatalogEntry,
  OperationHandler,
  OperationInvocationInput,
  OperationNamespace,
  OperationTemplate,
  QueryValue,
} from './types.js';
