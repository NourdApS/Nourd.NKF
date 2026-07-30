---
created_at: 2026-07-30T07:53:41Z
---

# ADR 0040: Confirm Invocation-Precondition Json Schema Bindings

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's authorization to approve exact derived revisions after
  independent review
- **Accepted Source Pair:** ADR 0039

## Context

ADR 0039 accepts and promotes the exact NKF 0.1 Markdown/YAML pair that
realizes ADR 0038. The schemas confirmed by ADR 0037 retain their assertion
meaning, but their `x-nkf-source` metadata binds the historical source pair.

The invocation precondition and stable-diagnostic retirement do not alter the
three local JSON object shapes enforced by the existing schemas. The schemas
therefore require an exact source-metadata-only rebind.

## Review

The reviewer audited:

- [`../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-bundle-schema-proposal.json`](../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-bundle-schema-proposal.json);
- [`../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-record-schema-proposal.json`](../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-record-schema-proposal.json);
  and
- [`../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-validation-result-schema-proposal.json`](../evidence/decision-inputs/adr-0039-0040/nkf-0.1-invocation-precondition-validation-result-schema-proposal.json).

Duplicate-aware parsing passed. Removing `x-nkf-source` from each proposal
produces an object byte-structurally equal to its ADR 0037 schema. All three
compile strictly with Ajv `8.20.0` and `ajv-formats` `3.0.1` and pass 32
renewed focused probes.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `7718ad7ffdc5cf8884b68b163edef58cb3b080eec6316ec4edc7e79de52208b4` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `3e28f6549e1139a813102f4786b491a02af2c5e0c92eedf06290d59a79206273` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `33386af81143415adbb48a365d6b00571cfed31fa3072c1e30ecd9d306802e12` |

Promotion copies the reviewed proposal bytes unchanged. Each schema binds to
Markdown SHA-256
`2274d569d147eadd658de8e8f00a790630be1f30a5303f3c608b085fac020f48`
and executable YAML SHA-256
`7fc193f8622f8068c56a24fc5f4cfbe11ea2787f3bba3bb612f9a39d49f8e413`.

No schema assertion or additional NKF 0.1 meaning changes.

## Non-Claims

This Decision does not confirm checker completeness, fixture completeness,
distribution, release, consumer migration, or a conformance result.
