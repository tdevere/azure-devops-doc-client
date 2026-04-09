import { getOperationById, listOperations, operationCatalog } from './core/catalog.js';
import { executeOperation } from './core/http.js';
import type {
  ApiFlavor,
  AzureDevOpsClientOptions,
  AzureDevOpsResponse,
  OperationCatalogEntry,
  OperationHandler,
  OperationInvocationInput,
  OperationNamespace,
} from './types.js';

export class AzureDevOpsClient {
  readonly options: AzureDevOpsClientOptions;
  readonly services: OperationNamespace;
  readonly server: OperationNamespace;

  constructor(options: AzureDevOpsClientOptions = {}) {
    this.options = options;
    this.services = buildNamespace('services', this);
    this.server = buildNamespace('server', this);
  }

  async invoke<T = unknown>(operationId: string, input: OperationInvocationInput = {}): Promise<AzureDevOpsResponse<T>> {
    const operation = getOperationById(operationId);
    return executeOperation<T>(operation, this.options, input);
  }

  listOperations(flavor?: ApiFlavor): OperationCatalogEntry[] {
    return listOperations(flavor);
  }
}

function buildNamespace(flavor: ApiFlavor, client: AzureDevOpsClient): OperationNamespace {
  const root: OperationNamespace = {};

  for (const operation of operationCatalog.filter((entry) => entry.flavor === flavor)) {
    const serviceBucket = ensureNamespace(root, operation.serviceKey);
    const groupBucket = ensureNamespace(serviceBucket, operation.groupKey);
    groupBucket[operation.actionKey] = createOperationHandler(client, operation.id);
  }

  return root;
}

function ensureNamespace(root: OperationNamespace, key: string): OperationNamespace {
  const existing = root[key];

  if (existing && typeof existing === 'object') {
    return existing;
  }

  const namespace: OperationNamespace = {};
  root[key] = namespace;
  return namespace;
}

function createOperationHandler(client: AzureDevOpsClient, operationId: string): OperationHandler {
  return async <T = unknown>(input: OperationInvocationInput = {}): Promise<AzureDevOpsResponse<T>> =>
    client.invoke<T>(operationId, input);
}
