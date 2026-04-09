---
description: "Run live API tests against Azure DevOps. Use when: test an API, test operations, run API tests, check if an endpoint works, validate API, smoke test"
agent: "agent"
argument-hint: "Pattern or service to test (e.g., 'services.git.*' or '--service build')"
tools: ["run_in_terminal", "read_file", "create_file"]
---

Run the API test runner against Azure DevOps operations. The user may specify a pattern, service, or specific operation ID.

## Steps

1. Ensure the project is built: `npm run build`
2. Run the test with the user's filters: `node scripts/test-api.mjs <args>`
   - If the user names a **service** (git, build, core, etc.), use `--service <name>`
   - If the user names a **specific operation** (e.g., `services.git.repositories.list`), pass it as a positional pattern
   - If the user says "all" or "everything", run without filters (default: all GET services operations)
   - Add `--verbose` so results are visible per-operation
   - Add `--concurrency 3` to avoid rate-limiting
3. After the run, read `tmp/api-test-results.json` and summarize:
   - Total tested, pass, fail, skip, auth errors
   - List any **failed** operations with their error details
   - Suggest next steps (expand PAT scope for auth failures, file issues for real failures)

## Available flags

- Positional pattern: `"services.git.*"` (glob matching on operation ID)
- `--service <name>`: filter by service key (git, build, core, release, etc.)
- `--group <name>`: filter by group key
- `--flavor <services|server>`: default is services
- `--method <GET|POST|...>`: default is GET only (safe)
- `--all-methods`: include non-GET operations (use with caution)
- `--concurrency <n>`: parallel requests (default 5)
- `--dry-run`: list matching operations without calling them
- `--verbose`: show per-operation results
- `--json`: machine-readable output

## Environment

Tests require `AZDO_PAT` and `AZDO_ORGANIZATION` in `.env`. The runner auto-discovers a project and repo for path substitution.
