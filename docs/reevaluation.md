# Reevaluation Backlog

The generated client currently covers the documented operation surface. The remaining reevaluation items are about specialization, not endpoint absence.

## Deferred Items

### 1. Strong Request/Response Typing (High Priority)

The current runtime returns `unknown` payloads and accepts generic `body`, `query`, and `path` inputs. Consumers must cast or validate all responses manually.

**Impact:** Every consumer needs `as T` casts, no IDE autocompletion on responses.
**Approach:** Extract JSON schemas from documentation PDFs or build per-endpoint interfaces from sample responses.

### 2. File Upload/Download Streams (Medium Priority)

Specialized helpers for file uploads, download streams, and other non-JSON payload workflows are deferred. Operations like work item attachments, build artifacts, and git blob downloads require stream handling.

**Impact:** ~50+ operations that deal with binary content are unusable without workarounds.
**Approach:** Add `Content-Type: application/octet-stream` support and `ReadableStream` response handling in `executeOperation`.

### 3. Live Integration Test Coverage (Medium Priority)

Live integration coverage for both Services and Server is scaffolded but intentionally not executed until the workspace is reopened in the devcontainer and environment variables are configured. Currently only one smoke test exists.

**Impact:** No automated validation that generated operations actually work against real APIs.
**Approach:** Add parametric tests for the top 20 most-used operations, gated behind `RUN_LIVE_AZDO_TESTS`.

### 4. Preview API Stability (Low Priority)

Preview APIs are included in the catalog (454 operations, 22.6%), but any high-churn preview endpoints should be revalidated against current service behavior before production use.

**Impact:** Consumers have no runtime indication they are calling an unstable API.
**Approach:** Add runtime warnings when invoking preview operations, or provide a `stable-only` catalog filter.
