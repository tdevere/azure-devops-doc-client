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

// Tests requested in issue #dispatch-1
testBlock('issue #dispatch-1: requested API tests', () => {
  it('services.security-roles.roleassignments.list', async () => {
    const response = await getClient().invoke('services.security-roles.roleassignments.list');
    expectSuccess(response);
  });

  it('services.security-roles.roledefinitions.list', async () => {
    const response = await getClient().invoke('services.security-roles.roledefinitions.list');
    expectSuccess(response);
  });

  it('services.status.health.get', async () => {
    const response = await getClient().invoke('services.status.health.get');
    expectSuccess(response);
  });

  it('services.token-admin.personal-access-tokens.list', async () => {
    const response = await getClient().invoke('services.token-admin.personal-access-tokens.list');
    expectSuccess(response);
  });

  it('services.tokens.pats.get', async () => {
    const response = await getClient().invoke('services.tokens.pats.get');
    expectSuccess(response);
  });

  it('services.tokens.pats.list', async () => {
    const response = await getClient().invoke('services.tokens.pats.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process-template.behaviors.get', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process-template.behaviors.get');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process-template.behaviors.list', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process-template.behaviors.list');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process-template.processes.export-process-template', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process-template.processes.export-process-template');
    expectSuccess(response);
  });

  it('services.work-item-tracking-process-template.processes.import-process-template-status', async () => {
    const response = await getClient().invoke('services.work-item-tracking-process-template.processes.import-process-template-status');
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-iteration-attachment-zip', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-iteration-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-result-attachment-zip', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-result-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-result-attachments', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-result-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-run-attachment-zip', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-run-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-run-attachments', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-run-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-sub-result-attachment-zip', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-sub-result-attachment-zip', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.attachments.get-test-sub-result-attachments', async () => {
    const response = await getClient().invoke('services.test-results.attachments.get-test-sub-result-attachments', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.bugs.list', async () => {
    const response = await getClient().invoke('services.test-results.bugs.list', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.codecoverage.get', async () => {
    const response = await getClient().invoke('services.test-results.codecoverage.get', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.test-results.codecoverage.get-build-code-coverage', async () => {
    const response = await getClient().invoke('services.test-results.codecoverage.get-build-code-coverage', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
