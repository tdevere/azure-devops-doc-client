import { catalogMetadata, operationCatalog } from '../generated/catalog.js';
import type { CatalogMetadata, OperationCatalogEntry } from '../types.js';

const operationLookup = new Map(operationCatalog.map((operation) => [operation.id, operation]));

export { catalogMetadata, operationCatalog };

export function getCatalogMetadata(): CatalogMetadata {
  return catalogMetadata;
}

export function getOperationById(operationId: string): OperationCatalogEntry {
  const operation = operationLookup.get(operationId);

  if (!operation) {
    throw new Error(`Unknown Azure DevOps operation: ${operationId}`);
  }

  return operation;
}

export function listOperations(flavor?: OperationCatalogEntry['flavor']): OperationCatalogEntry[] {
  if (!flavor) {
    return [...operationCatalog];
  }

  return operationCatalog.filter((operation) => operation.flavor === flavor);
}
