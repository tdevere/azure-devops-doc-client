import { describe, expect, it } from 'vitest';

import { AzureDevOpsClient, loadAzureDevOpsClientOptionsFromEnv, operationCatalog } from '../src/index.js';

const shouldRun = process.env.RUN_LIVE_AZDO_TESTS === 'true';
const testBlock = shouldRun ? describe : describe.skip;

testBlock('live smoke', () => {
  it('calls the documented projects list endpoint for Azure DevOps Services', async () => {
    const operation = operationCatalog.find((entry) => entry.id === 'services.core.projects.list');

    expect(operation).toBeTruthy();

    const client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());
    const response = await client.invoke(operation!.id);

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  it('lists processes via invoke API', async () => {
    const client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());
    const response = await client.invoke('services.core.processes.list');

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    expect(response.data).toBeTruthy();
  });
}, { timeout: 30_000 });