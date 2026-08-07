---
id: design-nkf-0-1-replacement-json-schemas
type: design
title: NKF 0.1 Replacement JSON Schemas
summary: This proposal derives the first current JSON Schema 2020-12 realization from the exact NKF 0.1 Markdown/YAML authority pair accepted by ADR 0022. It replaces the obsolete markdown_root, records_root, open-object, and shallow record assumptions in the preliminary schema files without treating schema code as normative meaning.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: superseded
task: NKF-003
design_disposition: superseded
design_decisions:
  - adr-0023
superseded_by:
  - adr-0030
proposal_authority_effect: None
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Replacement JSON Schemas

- **Accepted authority pair:** [ADR 0022](../../decisions/0022-native-authority-pair.md)

## Purpose

This proposal derives the first current JSON Schema 2020-12 realization from
the exact NKF 0.1 Markdown/YAML authority pair accepted by [ADR 0022](../../decisions/0022-native-authority-pair.md). It
replaces the obsolete `markdown_root`, `records_root`, open-object, and shallow
record assumptions in the preliminary schema files without treating schema
code as normative meaning.

## Exact Proposal Artifacts

| Proposed artifact | Canonical destination | SHA-256 |
| --- | --- | --- |
| [`nkf-0.1-bundle-schema-proposal.json`](../../evidence/decision-inputs/adr-0022-0023/nkf-0.1-bundle-schema-proposal.json) | `contracts/nkf/0.1/schemas/bundle.schema.json` | `daf7b15f8b6edc143be10f6d832dc740b0f36292fdace0198495a9e51bb94574` |
| [`nkf-0.1-record-schema-proposal.json`](../../evidence/decision-inputs/adr-0022-0023/nkf-0.1-record-schema-proposal.json) | `contracts/nkf/0.1/schemas/record.schema.json` | `f22a9ed1a8a4d2e56003e7c50e757bcb8bd5a7f09169f817e29dbcb85388502a` |

Both proposals bind:

- `nkf_version: "0.1"`;
- `knowledge/specifications/nkf-0.1.md` at SHA-256
  `9e90fc712df661b7c008b47a8392a180c5418346f8c3a5a1f2c344c6cbeb3b97`;
  and
- `contracts/nkf/0.1/nkf.yaml` at SHA-256
  `ebb8c98dfb4611cffe4c19eeebd5fcd932d48332067393c0c7ee7a6f07ac6e87`.

Their `$id` values are the accepted
`urn:nkf:0.1:schema:bundle` and `urn:nkf:0.1:schema:record`. A schema's own
digest remains release metadata and is deliberately not embedded recursively
inside its bytes.

## Schema-Owned Enforcement

The proposals enforce only local deterministic structure assigned to JSON
Schema by [ADR 0019](../../decisions/0019-validation-enforcement-and-diagnostics.md) and the accepted authority pair:

- closed bundle, record, and nested object fields;
- required fields, primitive types, constants, and local cardinality;
- `nkf_version`, bundle identity, record identity, digest algorithm, lifecycle,
  governance status, extension requirement, and non-record-kind constants or
  enums;
- non-empty identifiers without inventing a lexical identifier grammar;
- exact SHA-256 value syntax and extension-identifier syntax;
- duplicate-free scalar `governance.authority` and section-responsibility
  arrays;
- non-empty optional collections when present;
- ISO 8601 date validation only for `governance.accepted_at`;
- required `reason` when a non-record kind is `other`;
- at least one `locator` or `resolution_rule` for external-authority objects;
  and
- every accepted optional record structure and extension catalog/use shape.

Unknown native fields fail closed. Extension payload remains any
JSON-compatible value because its separately governed extension contract owns
the payload shape.

## Deliberate Checker-Owned Boundaries

The record schema intentionally represents semantic controlled values such as
record type, body contract, section authority and role, responsibility,
relationship type, entity kind, entity-relationship type, and binding kind as
non-empty identifiers rather than duplicating their accepted vocabularies.
[ADR 0019](../../decisions/0019-validation-enforcement-and-diagnostics.md) assigns their support, body-specific allowance, correspondence, and
semantic conditions to the later bundle-aware `record-contract` or
`bundle-graph` phase with stable specific diagnostics.

Likewise, the schemas do not attempt to enforce:

- project layout, path spelling, containment, symlinks, file kind, or
  existence;
- Markdown suffix, source bytes or digest match, H1/title agreement, heading
  resolution, or complete Markdown representation;
- bundle-scoped, record-scoped, resolved-path, or object-ID uniqueness;
- Product-root, scope, hierarchy, relationship, entity-reference, cycle, or
  ownership rules;
- complete body-responsibility coverage or responsibility emission order;
- Product and accepted-Decision lifecycle conditions;
- Evidence provenance sufficiency;
- the binding `locator` or `resolution_rule` condition owned by stable
  diagnostic `binding.locator.missing`;
- provider-specific external-authority requirements;
- exact duplicate object detection where a stable checker rule owns it;
- extension catalog/use correspondence, contract resolution, support,
  payload validation, or core-conflict behavior;
- prohibited-secret detection, acceptance-authority binding, or governing-use
  readiness; or
- semantic adequacy, truth, acceptance, or confirmed Realization.

This partition prevents a generic `schema.record.invalid` result from becoming
a second implementation of rules whose accepted primary layer and diagnostic
identity belong elsewhere.

## Verification Performed

The proposals:

- parse as JSON with no duplicate object keys;
- compile in strict JSON Schema 2020-12 mode;
- match all accepted top-level and nested required/optional field sets across
  sixteen compared bundle and record objects;
- match the accepted schema IDs, constants, extension grammar, canonical
  source paths, and exact authority digests;
- pass minimal and full positive bundle and record instances;
- reject targeted unknown-field, missing-field, closed-shape, digest,
  cardinality, duplicate-scalar, invalid-date, conditional-field, and
  optional-empty negative instances; and
- deliberately allow a structurally valid but semantically unsupported record
  so later checker-owned diagnostics remain testable.

The current verification used 23 focused instances. They are audit probes,
not the accepted conformance fixture suite and make no conformance claim.

## Compatibility And Non-Claims

The proposal is a breaking replacement for the preliminary schema bytes, but
it does not change NKF format version `0.1` or any accepted meaning. The
preliminary schemas were never confirmed as current realization.

Accepting these exact bytes would confirm only the derived schema realization
and allow the next checker/fixture implementation step. It would not accept
knowledge, establish a checker package or release, verify a consumer,
confirm a Realization, or produce NKF conformance.

## Exact Confirmation Requested

> Confirm the two exact JSON Schema proposal revisions and digests above as
> the derived schema realization of the NKF 0.1 authority pair accepted by ADR
> 0022, promote those exact bytes to their canonical schema paths, and preserve
> every checker, fixture, package, release, migration, acceptance, Realization,
> and conformance non-claim stated here.
