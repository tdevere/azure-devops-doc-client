# Agent Notes

## Working Rules

- Regenerate the catalog with `npm run catalog:refresh` if the local PDFs change.
- Reopen in the devcontainer before running `typecheck`, `test`, `build`, or live API calls.
- Do not remove preview operations from the generated catalog unless the documentation inventory no longer contains them.
- Keep the generated client namespaced by `flavor -> service -> group -> action` to avoid collisions.

## Environment

- Use `.env` for local defaults and secrets.
- Prefer `AZDO_PAT` for local development unless the workflow already uses `AZDO_ACCESS_TOKEN`.
