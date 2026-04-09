# Contributing

Thank you for your interest in contributing to the Azure DevOps Doc Client.

## Getting Started

1. Fork and clone the repository.
2. Reopen the workspace in the provided devcontainer (required for tests and type checking).
3. Copy `.env.example` to `.env` and fill in your Azure DevOps credentials.
4. Run `npm install`.

## Development Workflow

```bash
npm run typecheck      # Type-check the project
npm test               # Run tests with coverage
npm run build          # Compile TypeScript to dist/
```

## Regenerating the Catalog

If the source PDFs change:

```bash
npm run catalog:refresh   # Inventory PDFs + regenerate catalog and docs
```

Do **not** hand-edit files in `src/generated/` or `docs/coverage.md` — they are regenerated from the PDFs.

## Code Guidelines

- Keep the operation catalog generation **deterministic**. Same input PDFs must produce identical output.
- Preserve the namespace layout: `client.services.<service>.<group>.<action>` and `client.server.<service>.<group>.<action>`.
- Prefer catalog-wide tests over one-off hand-maintained endpoint tests.
- Record unsupported specializations or schema-typing gaps in `docs/reevaluation.md`.

## Pull Request Process

1. Create a feature branch from `main`.
2. Ensure `npm run typecheck`, `npm test`, and `npm run build` all pass.
3. If your change affects the generated catalog, run `npm run catalog:refresh` and commit the updated output.
4. Open a pull request with a clear description of the change and its motivation.

## Reporting Issues

Use GitHub Issues for bug reports and feature requests. For security vulnerabilities, see [SECURITY.md](SECURITY.md).
