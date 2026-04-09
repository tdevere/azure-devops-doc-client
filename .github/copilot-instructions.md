# Repository Instructions

- This repository generates an Azure DevOps client from the local 7.1 documentation PDFs.
- Keep the operation catalog generation deterministic. Do not hand-edit generated catalog output.
- Preserve the namespace layout `client.services.<service>.<group>.<action>` and `client.server.<service>.<group>.<action>`.
- Use `npm run catalog:refresh` when the PDFs change, then update generated docs if the counts change.
- Do not run tests or live API calls outside the devcontainer.
- Prefer adding coverage through catalog-wide tests instead of one-off hand-maintained endpoint tests.
- Record any unsupported specialization or schema-typing gaps in `docs/reevaluation.md`.
