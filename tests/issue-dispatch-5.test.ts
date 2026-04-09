import { describe, expect, it } from 'vitest';
import { AzureDevOpsClient, loadAzureDevOpsClientOptionsFromEnv } from '../src/index.js';
import type { AzureDevOpsResponse } from '../src/index.js';

const shouldRun = process.env.RUN_LIVE_AZDO_TESTS === 'true';
const testBlock = shouldRun ? describe : describe.skip;

let client: AzureDevOpsClient;
function getClient(): AzureDevOpsClient {
  if (!client) client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());
  return client;
}

function expectSuccess(response: AzureDevOpsResponse): void {
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(300);
}

// Tests requested in issue #dispatch-5
testBlock('issue #dispatch-5: requested API tests', () => {
  it('services.test-plan.configurations.get', async () => {
    const response = await getClient().invoke('services.test-plan.configurations.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.configurations.list', async () => {
    const response = await getClient().invoke('services.test-plan.configurations.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.suite-test-case.get-test-case', async () => {
    const response = await getClient().invoke('services.test-plan.suite-test-case.get-test-case', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.suite-test-case.get-test-case-list', async () => {
    const response = await getClient().invoke('services.test-plan.suite-test-case.get-test-case-list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-case-clone.get', async () => {
    const response = await getClient().invoke('services.test-plan.test-case-clone.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-plan-clone.get', async () => {
    const response = await getClient().invoke('services.test-plan.test-plan-clone.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-plans.get', async () => {
    const response = await getClient().invoke('services.test-plan.test-plans.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-plans.list', async () => {
    const response = await getClient().invoke('services.test-plan.test-plans.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-point.get-points', async () => {
    const response = await getClient().invoke('services.test-plan.test-point.get-points', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-point.get-points-list', async () => {
    const response = await getClient().invoke('services.test-plan.test-point.get-points-list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-suite-clone.get', async () => {
    const response = await getClient().invoke('services.test-plan.test-suite-clone.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-suite-entry.list', async () => {
    const response = await getClient().invoke('services.test-plan.test-suite-entry.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-suites.get', async () => {
    const response = await getClient().invoke('services.test-plan.test-suites.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.test-suites.get-suites-by-test-case-id', async () => {
    const response = await getClient().invoke('services.test-plan.test-suites.get-suites-by-test-case-id');
    expectSuccess(response);
  });

  it('services.test-plan.test-suites.get-test-suites-for-plan', async () => {
    const response = await getClient().invoke('services.test-plan.test-suites.get-test-suites-for-plan', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.variables.get', async () => {
    const response = await getClient().invoke('services.test-plan.variables.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-plan.variables.list', async () => {
    const response = await getClient().invoke('services.test-plan.variables.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.behaviors.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.behaviors.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.behaviors.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.behaviors.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process.fields.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process.fields.get');
    expectSuccess(response);
  });

}, 60_000);
