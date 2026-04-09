---
description: "File a GitHub issue to request API tests for specific operations. Use when: request test, file test request, I want to test these operations, add tests for, test request issue"
agent: "agent"
argument-hint: "Operation IDs or service areas to test (e.g., 'wiki, pipelines')"
tools: ["run_in_terminal", "read_file"]
---

Create a GitHub issue labeled `test-request` that triggers automated test generation and PR creation.

## Steps

1. Determine what operations the user wants tested:
   - If they name **specific operations** (e.g., `services.wiki.wikis.list`), use those directly
   - If they name a **service area** (e.g., "wiki", "pipelines"), look up the operation IDs:
     `node scripts/test-api.mjs --dry-run --service <name>` and pick the GET operations
   - If they say "untested" or "gaps", run `node scripts/api-coverage.mjs --untested --json` and pick high-value untested ops
2. Build the issue body with all operation IDs included as `services.X.Y.Z` format
3. Create the issue:
   ```
   gh issue create \
     --title "Test request: <operation IDs>" \
     --label "test-request" \
     --body "<description with operation IDs>"
   ```
4. Confirm the issue was created and explain that the `test-request` workflow will:
   - Parse the operation IDs from the issue
   - Validate they exist in the catalog
   - Generate a vitest test file
   - Run the tests against the live API
   - Open a PR with the results

## Important

- Operation IDs must be in `services.X.Y.Z` or `server.X.Y.Z` format in the issue body
- The `test-request` label triggers the automation
- The workflow runs tests with live API credentials from GitHub secrets
