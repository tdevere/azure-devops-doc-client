#!/usr/bin/env node
// Pick the next batch of untested GET operations for a test-request issue.
// Usage: node scripts/pick-next-batch.mjs [count]

import { listOperations } from '../dist/index.js';

const count = parseInt(process.argv[2] || '20', 10);
const ops = listOperations('services');

// Already tested (from PR #3, smoke tests, etc.)
const tested = new Set([
  'services.core.projects.list','services.core.projects.get','services.core.teams.get-teams',
  'services.core.teams.get-all-teams','services.core.processes.list','services.core.project-properties.get',
  'services.git.repositories.list','services.git.refs.list','services.git.commits.get-commits',
  'services.git.pull-requests.get-pull-requests-by-project','services.git.items.get',
  'services.git.stats.get','services.git.pushes.get-pushes','services.git.repositories.get-repository',
  'services.build.builds.list','services.build.builds.get','services.build.definitions.list',
  'services.build.artifacts.list','services.build.builds.get-build-log','services.build.timeline.get',
  'services.build.options.list','services.build.latest.get-latest-build','services.build.settings.get',
  'services.build.general-settings.get','services.build.controllers.list','services.build.definitions.get-definition',
  'services.pipelines.pipelines.list','services.pipelines.runs.list',
  'services.release.definitions.list','services.release.releases.list',
  'services.release.releases.get-release','services.release.approvals.get-approvals',
  'services.work-item-tracking.wiql.query-by-wiql','services.work-item-tracking.work-items.get-work-item',
  'services.work-item-tracking.fields.list','services.work-item-tracking.queries.list',
  'services.work-item-tracking.classification-nodes.get-root-nodes',
  'services.work-item-tracking.tags.list','services.work-item-tracking.work-item-types.list',
  'services.work-item-tracking.recycle-bin.get-deleted-work-items',
  'services.test.runs.list','services.wiki.wikis.list',
  'services.distributed-task.queues.get-agent-queues','services.distributed-task.pools.get-agent-pools',
  'services.distributed-task.agents.list','services.distributed-task.deploymentgroups.list',
  'services.distributed-task.variablegroups.get-variable-groups',
  'services.artifacts.feed-management.get-feeds','services.policy.configurations.list',
  'services.policy.types.list',
  'services.audit.audit-log.query','services.audit.actions.list',
  'services.graph.users.list','services.graph.groups.list','services.graph.memberships.list',
  'services.member-entitlement-management.user-entitlements.search-user-entitlements',
  'services.service-hooks.subscriptions.list','services.service-hooks.publishers.list',
  'services.service-hooks.consumers.list',
  'services.tfvc.changesets.get-changesets','services.tfvc.items.list','services.tfvc.labels.list',
]);

// Priority: 0% services first, then large-gap services
const zeroPriority = new Set([
  'artifacts-package-types','notification','dashboard','security',
  'security-roles','tokens','accounts','identities','operations','profile','status',
  'work-item-tracking-process-template','token-admin',
]);
const expandPriority = new Set([
  'git','build','work-item-tracking','distributed-task','test-results',
  'work','test-plan','artifacts','release','graph','test',
  'member-entitlement-management','service-endpoint','search',
  'wiki','approvals-and-checks','symbol','favorite','extension-management',
  'permissions-report','core','pipelines',
]);

const picks = [];

// Pass 1: 0% services
for (const op of ops) {
  if (picks.length >= count) break;
  if (tested.has(op.id)) continue;
  const isGet = op.requestTemplates?.some(t => t.method === 'GET');
  if (!isGet) continue;
  if (zeroPriority.has(op.serviceKey)) picks.push(op.id);
}

// Pass 2: expand coverage in large services
for (const op of ops) {
  if (picks.length >= count) break;
  if (tested.has(op.id) || picks.includes(op.id)) continue;
  const isGet = op.requestTemplates?.some(t => t.method === 'GET');
  if (!isGet) continue;
  if (expandPriority.has(op.serviceKey)) picks.push(op.id);
}

picks.forEach(p => console.log(p));
