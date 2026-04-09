import { describe, expect, it } from 'vitest';

import { AzureDevOpsClient, loadAzureDevOpsClientOptionsFromEnv } from '../src/index.js';
import type { AzureDevOpsResponse } from '../src/index.js';

const shouldRun = process.env.RUN_LIVE_AZDO_TESTS === 'true';
const testBlock = shouldRun ? describe : describe.skip;

// Shared client — reused across all tests to avoid re-parsing env on every call.
let client: AzureDevOpsClient;

function getClient(): AzureDevOpsClient {
  if (!client) {
    client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());
  }
  return client;
}

/** Assert a successful JSON response with an optional value array check. */
function expectSuccess(response: AzureDevOpsResponse): void {
  expect(response.status).toBeGreaterThanOrEqual(200);
  expect(response.status).toBeLessThan(300);
}

// ---------------------------------------------------------------------------
// Phase 1 — Org-level (no project needed)
// These only require AZDO_ORGANIZATION and a valid PAT.
// ---------------------------------------------------------------------------

testBlock('phase 1: org-level APIs', () => {
  it('core.projects.list', async () => {
    const response = await getClient().invoke('services.core.projects.list');
    expectSuccess(response);
    expect(response.data).toHaveProperty('count');
  });

  it('core.processes.list', async () => {
    const response = await getClient().invoke('services.core.processes.list');
    expectSuccess(response);
  });

  it('core.teams.get-all-teams', async () => {
    const response = await getClient().invoke('services.core.teams.get-all-teams', {
      query: { $top: 10 },
    });
    expectSuccess(response);
  });

  it('service-hooks.publishers.list', async () => {
    const response = await getClient().invoke('services.service-hooks.publishers.list');
    expectSuccess(response);
  });

  it('service-hooks.consumers.list', async () => {
    const response = await getClient().invoke('services.service-hooks.consumers.list');
    expectSuccess(response);
  });
}, 30_000);

// ---------------------------------------------------------------------------
// Phase 2 — Project-level (requires AZDO_PROJECT or discovered project)
// These read project resources. Non-destructive GET operations only.
// ---------------------------------------------------------------------------

testBlock('phase 2: project-level APIs', () => {
  let projectName: string;

  it('discovers a project to test against', async () => {
    const response = await getClient().invoke('services.core.projects.list');
    expectSuccess(response);
    const data = response.data as { count: number; value: Array<{ name: string }> };
    expect(data.value.length).toBeGreaterThan(0);
    projectName = data.value[0].name;
  });

  it('core.teams.get-teams', async () => {
    const response = await getClient().invoke('services.core.teams.get-teams', {
      path: { projectId: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('build.definitions.list', async () => {
    const response = await getClient().invoke('services.build.definitions.list', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('build.builds.list', async () => {
    const response = await getClient().invoke('services.build.builds.list', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('git.repositories.list', async () => {
    const response = await getClient().invoke('services.git.repositories.list', {
      path: { project: projectName },
    });
    expectSuccess(response);
  });

  it('git.pull-requests.get-pull-requests-by-project', async () => {
    const response = await getClient().invoke('services.git.pull-requests.get-pull-requests-by-project', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('release.definitions.list', async () => {
    const response = await getClient().invoke('services.release.definitions.list', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('release.releases.list', async () => {
    const response = await getClient().invoke('services.release.releases.list', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('test.runs.list', async () => {
    const response = await getClient().invoke('services.test.runs.list', {
      path: { project: projectName },
      query: { $top: 5 },
    });
    expectSuccess(response);
  });

  it('distributed-task.queues.get-agent-queues', async () => {
    const response = await getClient().invoke('services.distributed-task.queues.get-agent-queues', {
      path: { project: projectName },
    });
    expectSuccess(response);
  });

  it('artifacts.feed-management.get-feeds', async () => {
    const response = await getClient().invoke('services.artifacts.feed-management.get-feeds', {
      path: { project: projectName },
    });
    expectSuccess(response);
  });
}, 60_000);

// ---------------------------------------------------------------------------
// Phase 3 — Deep resource reads (requires resources to exist in the project)
// Each test discovers a resource from a list call, then reads its details.
// ---------------------------------------------------------------------------

testBlock('phase 3: resource detail APIs', () => {
  let projectName: string;

  it('discovers a project', async () => {
    const response = await getClient().invoke('services.core.projects.list');
    expectSuccess(response);
    const data = response.data as { value: Array<{ name: string }> };
    projectName = data.value[0].name;
  });

  it('git.repositories.get-repository (first repo)', async () => {
    const repos = await getClient().invoke('services.git.repositories.list', {
      path: { project: projectName },
    });
    expectSuccess(repos);
    const repoList = (repos.data as { value: Array<{ id: string }> }).value;
    if (repoList.length === 0) return; // skip if no repos

    const detail = await getClient().invoke('services.git.repositories.get-repository', {
      path: { project: projectName, repositoryId: repoList[0].id },
    });
    expectSuccess(detail);
  });

  it('git.commits.get-commits (first repo)', async () => {
    const repos = await getClient().invoke('services.git.repositories.list', {
      path: { project: projectName },
    });
    const repoList = (repos.data as { value: Array<{ id: string }> }).value;
    if (repoList.length === 0) return;

    const commits = await getClient().invoke('services.git.commits.get-commits', {
      path: { project: projectName, repositoryId: repoList[0].id },
      query: { 'searchCriteria.$top': 5 },
    });
    expectSuccess(commits);
  });

  it('git.refs.list (branches for first repo)', async () => {
    const repos = await getClient().invoke('services.git.repositories.list', {
      path: { project: projectName },
    });
    const repoList = (repos.data as { value: Array<{ id: string }> }).value;
    if (repoList.length === 0) return;

    const refs = await getClient().invoke('services.git.refs.list', {
      path: { project: projectName, repositoryId: repoList[0].id },
    });
    expectSuccess(refs);
  });

  it('build.builds.get (first build)', async () => {
    const builds = await getClient().invoke('services.build.builds.list', {
      path: { project: projectName },
      query: { $top: 1 },
    });
    expectSuccess(builds);
    const buildList = (builds.data as { value: Array<{ id: number }> }).value;
    if (buildList.length === 0) return;

    const detail = await getClient().invoke('services.build.builds.get', {
      path: { project: projectName, buildId: String(buildList[0].id) },
    });
    expectSuccess(detail);
  });

  it('build.artifacts.list (first build artifacts)', async () => {
    const builds = await getClient().invoke('services.build.builds.list', {
      path: { project: projectName },
      query: { $top: 1 },
    });
    const buildList = (builds.data as { value: Array<{ id: number }> }).value;
    if (buildList.length === 0) return;

    const artifacts = await getClient().invoke('services.build.artifacts.list', {
      path: { project: projectName, buildId: String(buildList[0].id) },
    });
    expectSuccess(artifacts);
  });
}, 90_000);