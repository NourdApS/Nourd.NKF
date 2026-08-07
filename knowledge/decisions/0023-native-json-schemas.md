---
id: adr-0023
type: decision
title: "ADR 0023: Confirm NKF 0.1 JSON Schema Realization"
summary: ADR 0022 accepts the exact current NKF 0.1 Markdown/YAML authority pair. The schema files previously present at the canonical paths were preliminary proposal evidence bound to an obsolete open-field, markdown_root, and records_root model. They were not a current realization of the accepted authority pair.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer, acting under explicit delegation from the Human Product Owner, Nourd ApS
---

# ADR 0023: Confirm NKF 0.1 JSON Schema Realization

- **Delegation source:** Direct instruction in the [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion on
  29 July 2026 to confirm the exact schema proposals on the reviewer's
  approval

## Context

[ADR 0022](0022-native-authority-pair.md) accepts the exact current NKF 0.1 Markdown/YAML authority pair. The
schema files previously present at the canonical paths were preliminary
proposal evidence bound to an obsolete open-field, `markdown_root`, and
`records_root` model. They were not a current realization of the accepted
authority pair.

[NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) derived and audited two replacement JSON Schema 2020-12 proposals.
Before exercising the delegated authority, the reviewer reverified:

- unchanged proposal and accepted authority-pair digests;
- exact schema IDs and source metadata;
- unique JSON keys and strict JSON Schema 2020-12 compilation;
- exact top-level and nested field-set reconciliation across sixteen governed
  bundle and record objects;
- 23 focused positive, negative, and enforcement-partition probes; and
- preservation of checker-owned and human-review-owned rules outside schema.

No material derivation, over-enforcement, under-enforcement, or authority
defect was found inside the accepted JSON Schema layer.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization of NKF 0.1:

| Schema | Canonical artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `daf7b15f8b6edc143be10f6d832dc740b0f36292fdace0198495a9e51bb94574` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `f22a9ed1a8a4d2e56003e7c50e757bcb8bd5a7f09169f817e29dbcb85388502a` |

Their exact reviewed source artifacts remain at:

- [`../evidence/decision-inputs/adr-0022-0023/nkf-0.1-bundle-schema-proposal.json`](../evidence/decision-inputs/adr-0022-0023/nkf-0.1-bundle-schema-proposal.json);
  and
- [`../evidence/decision-inputs/adr-0022-0023/nkf-0.1-record-schema-proposal.json`](../evidence/decision-inputs/adr-0022-0023/nkf-0.1-record-schema-proposal.json).

Promotion copies those reviewed bytes unchanged. Both schemas identify:

- NKF version `0.1`;
- Markdown path `knowledge/specifications/nkf-0.1.md` and SHA-256
  `9e90fc712df661b7c008b47a8392a180c5418346f8c3a5a1f2c344c6cbeb3b97`;
  and
- YAML path `contracts/nkf/0.1/nkf.yaml` and SHA-256
  `ebb8c98dfb4611cffe4c19eeebd5fcd932d48332067393c0c7ee7a6f07ac6e87`.

Schema self-digests remain release metadata and are not embedded recursively
inside the schema bytes.

## Enforcement Boundary

The schemas confirm local closed shapes, required fields, primitives,
constants, static local enums, local cardinality, duplicate-free scalar
arrays, exact digest and extension-identifier syntax, accepted-date format,
and the accepted local conditions assigned to the schema layer.

Project paths and files, source resolution, graph rules, controlled semantic
vocabulary support, body correspondence and responsibility coverage,
governance special cases, Evidence sufficiency, binding-locator semantics,
extension resolution, security scanning, authority verification, acceptance,
Realization confirmation, and semantic adequacy remain in their accepted
checker, resolver, or human-review layers.

## Supersession And Compatibility

These exact revisions replace the preliminary schema bytes as the current
canonical schema realization. The preliminary revisions and their digests
remain Git and Task provenance; they never established current conformance.

This confirmation changes no NKF meaning and introduces no schema sub-version.
NKF retains the sole `0.1` version coordinate and exact artifact-digest
binding.

## Non-Claims

This Decision confirms only the derived schema realization. It does not:

- accept any consumer knowledge;
- implement or confirm the bundle-aware checker or its fixture suite;
- establish schema packaging, integrity metadata, release distribution, or
  continuous-integration gates;
- support or accept a concrete extension or authority resolver;
- confirm a consumer implementation or Realization;
- perform an acceptance-authority binding; or
- produce an NKF conformance result or authorize consumer migration.

Those remain separately governed realization steps.
