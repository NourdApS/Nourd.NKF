---
created_at: 2026-07-30T17:16:33Z
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

ADR 0056 accepts the current pair:

| Artifact | SHA-256 |
| --- | --- |
| Normative Markdown | `52daa84db3067e39d8868f190874bb3a75328589d00127fecd7cb299312fa4ed` |
| Executable YAML | `9bd57b1a3c9992ff30a50d5e90ba7f7ef55d56f5aa4a38a5a463e711e07a1136` |

## Durable Mapping

The accepted YAML defines identities, profiles, serialization, vocabularies,
rule allocation, diagnostics, validation phases, result semantics, governed
validation inputs, and release-contract meaning.

Three current JSON Schemas realize the local closed-shape subset loaded by
the checker:

| Identity | Path | Confirmed SHA-256 |
| --- | --- | --- |
| `urn:nkf:0.1:schema:bundle` | `contracts/nkf/0.1/schemas/bundle.schema.json` | `b186a0435d95864b2782e4382a06c64315fb58793d42e9cf8cf0a49839bceb16` |
| `urn:nkf:0.1:schema:record` | `contracts/nkf/0.1/schemas/record.schema.json` | `94a3143ad1cf4be7cb01191d602115c783b1cfa5d11fedcbdd53b3c273c6e85f` |
| `urn:nkf:0.1:schema:validation-result` | `contracts/nkf/0.1/schemas/validation-result.schema.json` | `24a736cdf1138af6ef88603bb3ab67dea35e7b9f978e9681bb4e465f7bf2a004` |

Their assertion graphs are unchanged from the ADR 0052 baseline; only their
non-assertive source annotations are rebound. ADR 0057 confirms these exact
Schema revisions as the current derived Realization.

## Responsibilities And Ownership Boundaries

Markdown owns normative meaning. YAML is executable companion authority but
cannot override Markdown. JSON Schemas are derived Realizations and cannot
create rules absent from the accepted pair.

Schemas own primitives, constants, local enums, required fields, closed
objects, cardinality, and accepted local conditions. The bundle-aware checker
owns filesystem, graph, source, cross-record, semantic, extension, security,
and authority-resolver checks allocated to it.

## Interfaces Dependencies Locators And Resolution

`src/checker/bindings.ts` pins exact specification, executable, schema
identities, paths, and SHA-256 digests. `src/checker/contracts.ts` observes
those files, fails closed on binding mismatch, strictly parses YAML and JSON,
and compiles the three schemas using JSON Schema 2020-12.

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
