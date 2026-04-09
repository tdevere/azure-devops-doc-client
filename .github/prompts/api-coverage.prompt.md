---
description: "Show API test coverage across the operation catalog. Use when: coverage report, what's tested, what's untested, show coverage, API coverage, how much is tested"
agent: "agent"
argument-hint: "Optional: service name to filter (e.g., 'git', 'build')"
tools: ["run_in_terminal", "read_file"]
---

Generate an API coverage report showing which operations are tested vs untested.

## Steps

1. Ensure the project is built: `npm run build`
2. Run the coverage reporter: `node scripts/api-coverage.mjs <args>`
   - If the user names a **service**, add `--service <name>`
   - If the user asks for **untested** operations, add `--untested`
   - For machine-readable output, add `--json`
3. Present the results clearly:
   - Overall percentage: tested / total
   - Per-service breakdown with the bar chart
   - Highlight services with 0% coverage as priorities
   - If stats are from a previous test run, note when `tmp/api-test-results.json` was last written

## Flags

- `--service <name>`: filter to one service
- `--flavor <services|server>`: default is services
- `--untested`: list only untested operations
- `--json`: machine-readable output

## Context

The reporter combines two sources:

- Operations invoked in `tests/integration.smoke.test.ts` (vitest suite)
- Results from the last `npm run test:api` run stored in `tmp/api-test-results.json`
