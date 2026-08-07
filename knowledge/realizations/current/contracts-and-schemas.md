---
id: nkf-contracts-and-schemas
type: realization
summary: This Realization describes the current executable-contract and JSON Schema mapping for NKF 0.1.
created_at: 2026-07-30T17:16:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
confirmation_status: confirmed
confirmation_decisions:
  - adr-0059
---

# NKF Contracts And Schemas

## Realization Identity And Kind

This Realization describes the current executable-contract and JSON Schema
mapping for NKF 0.1.

## Governed Meaning Realized

The authoritative human meaning is
`knowledge/specifications/nkf-0.1.md`. The executable companion at
`contracts/nkf/0.1/nkf.yaml` represents that meaning and binds its exact
SHA-256 digest.

ADR 0058 accepts the current pair:

| Artifact | SHA-256 |
| --- | --- |
| Normative Markdown | `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be` |
| Executable YAML | `b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd` |

## Durable Mapping

The accepted YAML defines identities, profiles, serialization, vocabularies,
rule allocation, diagnostics, validation phases, result semantics, governed
validation inputs, and release-contract meaning.

Four current JSON Schemas realize local closed-shape subsets. The checker
loads the bundle, record, and validation-result Schemas during project
validation; the release-manifest Schema remains part of release tooling.

| Identity | Path | Confirmed SHA-256 |
| --- | --- | --- |
| `urn:nkf:0.1:schema:bundle` | `contracts/nkf/0.1/schemas/bundle.schema.json` | `05f9303d799f8e07a64dc2fb571317ca3d28491dd02d5ed0a446b77065468a1f` |
| `urn:nkf:0.1:schema:record` | `contracts/nkf/0.1/schemas/record.schema.json` | `397f83707112022b16f7860882e3b48afb83b9c46c62cc82043483e7a727859b` |
| `urn:nkf:0.1:schema:validation-result` | `contracts/nkf/0.1/schemas/validation-result.schema.json` | `155f94a6c3ff7c86a57c58590fa9d3a6a2afc609a5ab6a9a6191a9c9e9708248` |
| `urn:nkf:0.1:schema:release-manifest` | `contracts/nkf/0.1/schemas/release-manifest.schema.json` | `00058b5e86f29edb005f0a4125125c32ccd18a986a244c69f60f8605cab11f23` |

The bundle Schema extends `non_records[].kind` with `task` and `evidence`; the
other assertion graphs remain unchanged from the ADR 0057 baseline. All four
Schemas carry non-assertive source annotations bound to the ADR 0058
authority pair. ADR 0059 confirms these exact derived revisions.

## Responsibilities And Ownership Boundaries

Markdown owns normative meaning. YAML is executable companion authority but
cannot override Markdown. JSON Schemas are derived Realizations and cannot
create rules absent from the accepted pair.

Schemas own primitives, constants, local enums, required fields, closed
objects, cardinality, and accepted local conditions. The bundle-aware checker
owns filesystem, graph, source, cross-record, semantic, extension, security,
and authority-resolver checks allocated to it.

## Interfaces Dependencies Locators And Resolution

`src/checker/bindings.ts` pins exact specification, executable, core Schema
identities, paths, and SHA-256 digests. `src/checker/contracts.ts` observes
those files, fails closed on binding mismatch, strictly parses YAML and JSON,
and compiles the three validation-time Schemas using JSON Schema 2020-12.

The release-manifest Schema remains a release-contract artifact. It is not
loaded as a core project-validation schema.

## External Authority And Operational State Boundaries

Contract files do not own repository commit, release, registry, consumer, or
runtime state. A path or digest proves only an exact artifact binding, not
publication, support, acceptance of consumer meaning, or conformance.

## Compatibility Verification And Recovery

Verification checks strict YAML parsing, Markdown/YAML diagnostic parity,
source metadata, unchanged Schema assertion graphs, schema compilation, and
focused positive and negative examples.

Predecessor authority and schema revisions remain recoverable through
Decisions, Decision-input Evidence, and Git. Any later semantic change
requires governed pre-stable evolution rather than an unrecorded schema or
checker adjustment.
