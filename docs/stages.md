# Delivery Stages

This project is structured so work can be split across multiple agents without producing overlapping edits.

## Stage 1: Inventory And Validation

- Inputs: local Azure DevOps 7.1 PDFs.
- Outputs: `tmp/rest-inventory.json`, `tmp/server-inventory.json`, `docs/coverage.md`.
- Suggested agent split: one agent validates extraction quality while another checks duplicate namespaces and parser gaps.

## Stage 2: Runtime Core

- Inputs: generated operation catalog.
- Outputs: runtime client, auth helpers, URL templating, retry logic, and error handling.
- Suggested agent split: one agent owns HTTP and auth; another owns client shape and operation tree assembly.

## Stage 3: Generated Surface

- Inputs: runtime core and inventories.
- Outputs: generated catalog and namespace exposure for all Services and Server APIs.
- Suggested agent split: one agent owns code generation; another validates operation ids, namespace collisions, and preview endpoint handling.

## Stage 4: Tests And Automation

- Inputs: generated catalog and runtime.
- Outputs: unit tests, generated namespace coverage tests, optional live smoke tests, GitHub Actions workflow.
- Suggested agent split: one agent writes unit tests for the core runtime while another focuses on catalog-wide coverage and CI wiring.

## Stage 5: Docs And Reevaluation

- Inputs: generated coverage and implementation constraints.
- Outputs: README, troubleshooting guidance, deferred items in `docs/reevaluation.md`, repo instructions for future agents.
- Suggested agent split: one agent documents consumer usage while another documents maintainer workflows and deferred type-enrichment work.
