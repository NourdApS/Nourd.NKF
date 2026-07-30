---
created_at: 2026-07-30T07:53:41Z
---

# ADR 0037: Confirm Checker-Findings-Resolved Json Schema Bindings

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's authorization to approve exact derived revisions after
  independent review
- **Accepted Source Pair:** ADR 0036

## Context

ADR 0036 accepts and promotes the exact NKF 0.1 Markdown/YAML pair that
realizes ADRs 0034 and 0035. The schemas confirmed by ADR 0033 retain their
assertion meaning, but their `x-nkf-source` metadata binds the historical
source pair.

The source pair changes stable diagnostic, hierarchy, and example meaning
implemented by the checker. None of those changes alters the three local JSON
object shapes enforced by the existing schemas. The schemas therefore require
an exact source-metadata-only rebind.

## Review

The reviewer audited:

- [`../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-bundle-schema-proposal.json`](../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-bundle-schema-proposal.json);
- [`../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-record-schema-proposal.json`](../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-record-schema-proposal.json);
  and
- [`../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-validation-result-schema-proposal.json`](../evidence/decision-inputs/adr-0036-0037/nkf-0.1-checker-findings-resolved-validation-result-schema-proposal.json).

Duplicate-aware JSON parsing passed. Removing `x-nkf-source` from each
proposal produces an object byte-structurally equal to its ADR 0033 schema.
All three compile strictly with Ajv `8.20.0` and `ajv-formats` `3.0.1` and
pass 32 renewed focused probes.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `8ca3d5238a209381cb00865aed91095a13df6fd93c57b447182e2e8ae2a155a2` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `105193cdc8b89a36d5efd780dfc90b2001d116c8838c4b9aa805d38c9d099882` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `c5a48b2e31039ca7e2dc0e3de532612fc9ffc76d499b439c64d9a73d0fd1ac14` |

Promotion copies the reviewed proposal bytes unchanged. Each schema binds to
Markdown SHA-256
`099fe3cbda9c99708e630b30fdec9d0a8335cca70b34f022d85101ce71cf379d`
and executable YAML SHA-256
`8e6ffdfdbe70915b8d0baf07da7aa0464327ef7ccb9857383a96d380bdfec1bc`.

No schema assertion or additional NKF 0.1 meaning changes.

## Non-Claims

This Decision does not confirm checker completeness, fixture completeness,
distribution, release, consumer migration, or a conformance result.
