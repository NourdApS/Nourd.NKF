---
id: adr-0033
type: decision
summary: ADR 0032 corrects three invalid YAML flow scalars without changing parsed contract meaning. The schemas confirmed by ADR 0030 therefore require only an exact x-nkf-source.executable_digest rebind.
created_at: 2026-07-30T07:53:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0033: Confirm Yaml Grammar-Corrected Json Schema Bindings

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's authorization to approve exact derived revisions after
  independent review
- **Accepted Source Pair:** ADR 0032

## Context

ADR 0032 corrects three invalid YAML flow scalars without changing parsed
contract meaning. The schemas confirmed by ADR 0030 therefore require only an
exact `x-nkf-source.executable_digest` rebind.

## Review

The reviewer audited:

- [`../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-bundle-schema-proposal.json`](../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-bundle-schema-proposal.json);
- [`../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-record-schema-proposal.json`](../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-record-schema-proposal.json); and
- [`../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-validation-result-schema-proposal.json`](../evidence/decision-inputs/adr-0032-0033/nkf-0.1-yaml-grammar-corrected-validation-result-schema-proposal.json).

Duplicate-aware JSON parsing passed. Removing `x-nkf-source` from each
proposal produces an object byte-structurally equal to its ADR 0030 schema.
All three compile strictly with Ajv `8.20.0` and `ajv-formats` `3.0.1` and
pass 32 renewed focused probes.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `68f627a5dde5d9cddd68cd4a25df970d95c73b89e54f793fa91171c17f0ea96b` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `9a875e3883a3fb6dd02d9ba866a4b4f57c60dec835bcc8ca96c23a6aeb588440` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `dc2b5be7a3bb42bf676c751b7b1ad945f47eecec5909c8d7ab71fa0ddc5bf3d1` |

Promotion copies the reviewed proposal bytes unchanged. Each schema remains
bound to Markdown SHA-256
`b83ab1ca6c93a1fed5a344a47a3d21d7691d93e141926f05e3d1c00ba8fe4e8c`
and now binds executable YAML SHA-256
`763fb7cb86f6d2a5f71672593a9f14262790c0ae3d8e9fbebf7c90cab20ea53b`.

No schema assertion or NKF 0.1 meaning changes.

## Non-Claims

This Decision does not confirm checker implementation, fixtures,
distribution, release, consumer migration, or a conformance result.
