import { describe, expect, it } from 'vitest';

import { AzureDevOpsClient, catalogMetadata, operationCatalog } from '../src/index.js';

describe('generated catalog', () => {
  it('contains the documented operation inventory', () => {
    expect(catalogMetadata.totalOperations).toBe(operationCatalog.length);
    expect(operationCatalog.length).toBeGreaterThan(1500);
  });

  it('uses unique operation ids', () => {
    const ids = new Set(operationCatalog.map((operation) => operation.id));
    expect(ids.size).toBe(operationCatalog.length);
  });

  it('exposes at least one request template for every operation', () => {
    for (const operation of operationCatalog) {
      expect(operation.requestTemplates.length, operation.id).toBeGreaterThan(0);
    }
  });

  it('creates namespaces for every generated operation', () => {
    const client = new AzureDevOpsClient();

    for (const operation of operationCatalog) {
      const flavorRoot = operation.flavor === 'services' ? client.services : client.server;
      const serviceNamespace = flavorRoot[operation.serviceKey];
      expect(serviceNamespace, operation.id).toBeTruthy();
      expect(typeof serviceNamespace).toBe('object');

      const groupNamespace = (serviceNamespace as Record<string, unknown>)[operation.groupKey];
      expect(groupNamespace, operation.id).toBeTruthy();
      expect(typeof groupNamespace).toBe('object');

      const actionHandler = (groupNamespace as Record<string, unknown>)[operation.actionKey];
      expect(typeof actionHandler, operation.id).toBe('function');
    }
  });
});
