# Azure DevOps Doc Client

[![CI](https://github.com/tdevere/azure-devops-doc-client/actions/workflows/ci.yml/badge.svg)](https://github.com/tdevere/azure-devops-doc-client/actions/workflows/ci.yml)
[![Release](https://github.com/tdevere/azure-devops-doc-client/actions/workflows/release.yml/badge.svg)](https://github.com/tdevere/azure-devops-doc-client/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/azure-devops-doc-client.svg)](https://www.npmjs.com/package/azure-devops-doc-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js >=20](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)

<!-- STATUS:START -->
<!-- This section is auto-updated by CI after smoke tests pass. Do not edit manually. -->
| Metric | Value |
|--------|-------|
| **Latest Release** | *unreleased* |
| **Live API Tests** | 22 passed ✅ |
| **Unit Tests** | 20 |
| **Integration Tests** | 22 |
| **Operations Cataloged** | 2004 |
| **Last Updated** | 2026-04-09 02:25 UTC |
<!-- STATUS:END -->

A generated Azure DevOps REST client built from the official 7.1 documentation PDFs. Covers both **Azure DevOps Services** and **Azure DevOps Server** with 2,000+ operations, shared auth, retries, error handling, and a fully typed namespace API.

## Installation

```bash
npm install azure-devops-doc-client
```

Or clone and build from source:

```bash
git clone https://github.com/tdevere/azure-devops-doc-client.git
cd azure-devops-doc-client
npm install
npm run build
```

## Quick Start

```ts
import {
  AzureDevOpsClient,
  loadAzureDevOpsClientOptionsFromEnv,
} from "azure-devops-doc-client";

const client = new AzureDevOpsClient(loadAzureDevOpsClientOptionsFromEnv());

// Namespace-based access
const projects = await client.services.core.projects.list();

// By operation ID
const result = await client.invoke("services.core.projects.list", {
  path: { organization: "my-org" },
});
```

## Configuration

Copy `.env.example` to `.env` and configure your credentials:

| Variable              | Description                            |
| --------------------- | -------------------------------------- |
| `AZDO_PAT`            | Personal access token (basic auth)     |
| `AZDO_ACCESS_TOKEN`   | Bearer token (alternative to PAT)      |
| `AZDO_ORGANIZATION`   | Default organization                   |
| `AZDO_PROJECT`        | Default project                        |
| `AZDO_TEAM`           | Default team                           |
| `AZDO_INSTANCE`       | Azure DevOps Server instance           |
| `AZDO_COLLECTION`     | Azure DevOps Server collection         |
| `AZDO_TIMEOUT_MS`     | Request timeout in ms (default: 30000) |
| `AZDO_RETRY_COUNT`    | Retry count for 429/5xx (default: 2)   |
| `AZDO_RETRY_DELAY_MS` | Base retry delay in ms (default: 750)  |

## Usage Examples

### Namespace API

Every operation is accessible via `client.services.<service>.<group>.<action>` or `client.server.<service>.<group>.<action>`:

```ts
const repo = await client.services.git.repositories.get({
  path: { project: "MyProject", repositoryId: "my-repo" },
});

const approvals = await client.services.approvalsAndChecks.approvals.query({
  path: { organization: "my-org", project: "MyProject" },
  query: { top: 10, state: "pending" },
});
```

### Generic Invoke

```ts
const result = await client.invoke("services.core.projects.list", {
  path: { organization: "my-org" },
});
```

### List Available Operations

```ts
// All operations
const all = client.listOperations();

// Only Server operations
const server = client.listOperations("server");
```

## Architecture

The project has two layers:

1. **Codegen layer** — Scripts that extract operations from the 7.1 documentation PDFs into a machine-readable catalog (`scripts/`).
2. **Runtime layer** — A client that executes any cataloged operation with auth, retries, timeouts, and error diagnostics (`src/`).

## Regeneration

If the source PDFs change:

```bash
npm run catalog:refresh   # Rebuild inventory + catalog + docs
```

Individual steps:

- `npm run catalog:inventory` — Extract operations from PDFs to JSON
- `npm run catalog:generate` — Generate TypeScript catalog from JSON

## Development

This project uses the provided devcontainer for development. Reopen in the container before running type checks, tests, or live API calls.

```bash
npm run typecheck      # Type-check with strict settings
npm test               # Run tests with coverage
npm run build          # Compile to dist/
```

## Troubleshooting

| Status           | Cause                               | Fix                                                     |
| ---------------- | ----------------------------------- | ------------------------------------------------------- |
| `401` / `403`    | Invalid or insufficient token scope | Verify `AZDO_PAT` or `AZDO_ACCESS_TOKEN`                |
| `404`            | Missing path placeholders           | Check organization, project, team defaults              |
| `429`            | Throttling                          | Retried automatically; reduce concurrency if persistent |
| `400` on preview | Unstable preview API                | Verify api-version and request body                     |

The client includes diagnostic headers (`x-vss-e2eid`, `x-tfs-session`) in error messages for escalation.

## Known Limitations

See [docs/reevaluation.md](docs/reevaluation.md) for tracked gaps:

- Response/request types are `unknown` (no per-endpoint schemas yet)
- File upload/download streams not supported
- Preview APIs (22.6% of catalog) may change without notice

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)

## Docs

- [Coverage Summary](docs/coverage.md)
- [Architecture Stages](docs/stages.md)
- [Reevaluation Backlog](docs/reevaluation.md)
