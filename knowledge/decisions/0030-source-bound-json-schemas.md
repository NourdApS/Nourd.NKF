---
id: adr-0030
type: decision
title: "ADR 0030: Confirm Rebound NKF 0.1 Json Schemas"
summary: ADR 0029 replaces the NKF 0.1 authority pair solely to reconcile its realization-status statements after schema confirmation. The JSON Schemas confirmed by ADR 0028 still contain the ADR 0027 source digests and therefore cannot identify current NKF 0.1 authority without exact rebinding.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0030: Confirm Rebound NKF 0.1 Json Schemas

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's direct authorization to approve exact derived revisions
  after independent review
- **Authorization Source:** Earlier direct NKF-003 instruction granting the
  reviewer permission to accept exact revisions if approved, together with
  the 30 July 2026 direction to complete all work before checker
  implementation
- **Accepted Source Pair:** ADR 0029

## Context

ADR 0029 replaces the NKF 0.1 authority pair solely to reconcile its
realization-status statements after schema confirmation. The JSON Schemas
confirmed by ADR 0028 still contain the ADR 0027 source digests and therefore
cannot identify current NKF 0.1 authority without exact rebinding.

The format rules and schema assertion graphs are unchanged. This Decision
concerns only exact schema source metadata, renewed mechanical validation, and
current-realization confirmation.

## Review

The reviewer derived and audited three proposals:

- [`../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-bundle-schema-proposal.json`](../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-bundle-schema-proposal.json);
- [`../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-record-schema-proposal.json`](../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-record-schema-proposal.json); and
- [`../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-validation-result-schema-proposal.json`](../evidence/decision-inputs/adr-0029-0030/nkf-0.1-schema-status-reconciled-validation-result-schema-proposal.json).

The review verified:

- duplicate-aware JSON parsing of all three proposals;
- exact current Markdown and YAML source paths and SHA-256 digests;
- byte-structural equality of every schema after removing only the
  `x-nkf-source` annotation;
- zero schema assertion-graph changes from ADR 0028;
- strict compilation of all three schemas with Ajv `8.17.1`,
  `ajv-formats` `3.0.1`, Draft 2020-12, all errors, and explicit
  non-assertive registration of `x-nkf-source`; and
- 32 focused positive, negative, conditional, fixed-order, closed-shape, and
  enforcement-partition probes.

The validation-result example remains valid. No checker-owned requirement was
moved into JSON Schema by the rebind.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization of NKF 0.1:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `f7e230ad7b2067b63e95c994e9a93d6f80761a335dae9b53d81a61058ffa08b1` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `a64cc7c23f8695499d999ce7b913481fd5ae61d2b2ae1601710a0343914caec3` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `4398e81d9cb5d1b51aa65859d13952454e6ce548ab867c85a4e42d0fa58ebae2` |

Promotion copies the reviewed proposal bytes unchanged. Each schema identifies:

- NKF version `0.1`;
- Markdown path `knowledge/specifications/nkf-0.1.md` and SHA-256
  `b83ab1ca6c93a1fed5a344a47a3d21d7691d93e141926f05e3d1c00ba8fe4e8c`;
  and
- YAML path `contracts/nkf/0.1/nkf.yaml` and SHA-256
  `e9cc92676d8f61855e1dea47ccc7eaa926c43003596158e15c7550ea14e6da41`.

Schema self-digests remain release metadata and are not embedded recursively.

## Supersession And Compatibility

These exact schemas replace the ADR 0028 revisions as the current confirmed
schema realization. ADR 0028 and its exact artifacts remain immutable
historical confirmation of the ADR 0027 authority pair.

No NKF sub-version or schema version is introduced. The schema assertions and
consumer obligations are unchanged.

## Non-Claims

This Decision does not:

- implement or confirm the bundle-aware checker;
- establish conformance fixtures beyond the schema-layer review probes;
- establish checker identity, packaging, integrity distribution, release,
  support, or continuous-integration gates;
- validate a consumer project;
- verify an acceptance binding;
- accept knowledge or confirm semantic adequacy;
- confirm a Realization;
- produce an NKF conformance result; or
- authorize consumer migration.
