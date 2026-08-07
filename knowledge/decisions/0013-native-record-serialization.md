---
id: adr-0013
type: decision
title: "ADR 0013: Accept NKF 0.1 Native Record Serialization"
summary: The accepted NKF 0.1 specification defines the logical record declaration but does not completely determine its native YAML object shape. A complete executable companion cannot derive schemas or checker behavior honestly while those representation choices remain implicit.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0013: Accept NKF 0.1 Native Record Serialization

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

The accepted NKF 0.1 specification defines the logical record declaration but
does not completely determine its native YAML object shape. A complete
executable companion cannot derive schemas or checker behavior honestly while
those representation choices remain implicit.

The proposal
[`../designs/adopted/native-record-serialization.md`](../designs/adopted/native-record-serialization.md)
isolates the minimum required and optional structures without accepting the
controlled vocabularies and other boundaries it explicitly defers.

## Decision

The exact proposal revision with SHA-256
`c6c54c31f8e60278ac4efcc17a025ed6b1b496c36121fb939d80c43759e6ff0e`
is accepted as the NKF 0.1 native record serialization.

The accepted boundary includes:

- the required top-level `contract`, `id`, `type`, `body_contract`, `title`,
  `source`, `governance`, `scope`, `sections`, and `relationships` fields;
- the exact minimum nested shapes and value constraints stated by the
  proposal;
- closed handling of unknown top-level fields except for a separately accepted
  supported extension;
- exact record-type and body-contract correspondence;
- source-bound relationships and section-local responsibility bindings;
- complete coverage of every required body responsibility;
- the stated deterministic array-order rule; and
- the minimum optional provenance, external-authority, entity,
  entity-relationship, and binding structures.

Optional empty structures are omitted. A copied
`governance.status: accepted` or `accepted_at` value does not prove acceptance;
acceptance remains externally bound to an exact revision by its governing
authority.

## Explicitly Deferred

This Decision does not define or accept:

- complete section-role vocabularies;
- entity kinds, entity-relationship types, or binding kinds;
- required extensions or extension payloads;
- standardized acceptance-event storage or proof;
- presentation guidance fields;
- a universal path-resolution base;
- replacement Markdown or YAML bytes;
- JSON Schemas, checker behavior, fixtures, distribution, or a release; or
- any conformance result or consumer migration.

Each deferred semantic boundary requires separate Human Product Owner
confirmation before it can become part of NKF 0.1 authority.

## Compatibility

This is the sole native record serialization inside the single NKF 0.1
version namespace established by ADR 0009. Historical `/v1` and `/v2`
serialization identities remain evidence only and are not supported parallel
contracts.

The accepted canonical Markdown and YAML revisions remain immutable accepted
snapshots. Realizing this Decision requires later accepted replacement
revisions rather than changing those bytes silently.
