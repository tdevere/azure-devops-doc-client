---
description: "Explore the Azure DevOps API catalog. Use when: find operations, list APIs, what operations exist, search catalog, browse APIs, what can I call, discover endpoints"
agent: "agent"
argument-hint: "What are you looking for? (e.g., 'wiki APIs', 'work item operations', 'all POST endpoints')"
tools: ["run_in_terminal", "read_file"]
---

Search and explore the 2,004-operation Azure DevOps API catalog.

## Steps

1. Use the test runner's dry-run mode to find matching operations:
   - By service: `node scripts/test-api.mjs --dry-run --service <name>`
   - By pattern: `node scripts/test-api.mjs --dry-run "services.<pattern>.*"`
   - By method: `node scripts/test-api.mjs --dry-run --all-methods --method POST`
   - All operations: `node scripts/test-api.mjs --dry-run --all-methods`
2. For a list of all available services:
   ```
   node -e "import { operationCatalog } from './dist/index.js'; console.log([...new Set(operationCatalog.filter(o => o.flavor === 'services').map(o => o.service))].sort().join('\n'))"
   ```
3. Present results organized by group, noting:
   - HTTP method (GET, POST, PUT, PATCH, DELETE)
   - Required path placeholders
   - Whether the operation is preview
4. If the user wants to test something they found, suggest using `/test-api`

## Service key examples

`git`, `build`, `core`, `release`, `pipelines`, `work` (work items), `wiki`, `artifacts`, `test`, `distributedTask` (agents/queues), `graph` (identity/groups)
