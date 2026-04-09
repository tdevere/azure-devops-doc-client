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

// Tests requested in issue #dispatch-2
testBlock('issue #dispatch-2: requested API tests', () => {
  it('services.artifacts-package-types.maven.download-package', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.maven.download-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.maven.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.maven.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.maven.get-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.maven.get-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.maven.get-upstreaming-behavior', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.maven.get-upstreaming-behavior', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.download-package', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.download-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.download-scoped-package', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.download-scoped-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-package-readme', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-package-readme', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-package-upstreaming-behavior', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-package-upstreaming-behavior', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-scoped-package-readme', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-scoped-package-readme', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-scoped-package-upstreaming-behavior', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-scoped-package-upstreaming-behavior', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-scoped-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-scoped-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.npm.get-scoped-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.npm.get-scoped-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.nu-get.download-package', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.nu-get.download-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.nu-get.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.nu-get.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.nu-get.get-package-version-from-recycle-bin', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.nu-get.get-package-version-from-recycle-bin', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.nu-get.get-upstreaming-behavior', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.nu-get.get-upstreaming-behavior', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.python.download-package', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.python.download-package', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('services.artifacts-package-types.python.get-package-version', async () => {
    const response = await getClient().invoke('services.artifacts-package-types.python.get-package-version', {
      path: { project: 'DISCOVERED_PROJECT' },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

}, 60_000);
