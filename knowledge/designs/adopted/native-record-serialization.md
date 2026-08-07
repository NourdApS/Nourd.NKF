---
id: design-nkf-0-1-native-record-serialization
type: design
summary: Whether the following YAML object shape is the exact native serialization of the logical NKF 0.1 record defined by the accepted Markdown.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0013
---

# NKF 0.1 Native Record Serialization

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Proposal Authority Effect:** None
- **Implementation evidence:** imported NKF-002 record schema and TypeScript
  types; neither is authority

## Decision Sought

Whether the following YAML object shape is the exact native serialization of
the logical NKF 0.1 record defined by the accepted Markdown.

## Required Top-Level Fields

| Field | Exact shape |
| --- | --- |
| `contract` | constant `nkf.record` |
| `id` | non-empty record identifier |
| `type` | one of the ten NKF 0.1 record types |
| `body_contract` | corresponding NKF 0.1 body identity |
| `title` | non-empty string matching Markdown H1 |
| `source` | object containing `path` and exact SHA-256 `digest` |
| `governance` | object containing `lifecycle`, `status`, and non-empty `authority` list |
| `scope` | object containing Product record ID and optional narrower subject IDs |
| `sections` | non-empty list of exact source-section declarations |
| `relationships` | list of source-bound typed record relationships; empty when none |

Unknown top-level fields fail closed unless owned by a separately supported
extension decision.

## Required Nested Shapes

```yaml
source:
  path: <distribution-relative Markdown path>
  digest:
    algorithm: sha-256
    value: <64 lowercase hexadecimal characters>

governance:
  lifecycle: living | immutable
  status: draft | accepted | superseded | retired
  authority: [<one or more acceptance-authority identifiers>]
  accepted_at: <optional ISO 8601 date>

scope:
  product: <Product record ID>
  subjects: [<optional narrower subject IDs>]

sections:
  - id: <record-scoped section ID>
    heading_path: [<one or more exact heading strings>]
    occurrence: <integer, minimum 1>
    authority: accepted-meaning | proposal | unresolved | evidence
    role: <body-contract-controlled role>
    responsibilities: [<optional non-empty unique body responsibility IDs>]

relationships:
  - type: <one accepted relationship type>
    target: <target record ID>
    source_section: <declared section ID>
```

Every required body responsibility must occur in at least one section. The
`type` and `body_contract` pair must correspond exactly. Array order carries no
meaning except `heading_path`; native serialization emits responsibilities in
body-contract order for deterministic review.

## Optional Source-Bound Structures

When present, these use the following exact minimum shapes:

- `provenance.producers[]` and `provenance.verifiers[]`: required `actor`, with
  optional `at` and `method`;
- `provenance.sources[]`: required `locator`, with optional `id`, `title`,
  `author`, `observed_at`, `revision`, `last_modified_at`, and digest;
- `provenance.primary_observation`: required `method` and `source_section`, with
  optional `observed_at`;
- `external_authorities[]`: required `id`, `authority`, `relationship`, and
  `source_section`, plus at least one of `locator` or `resolution_rule`;
- `entities[]`: required `id`, controlled `kind`, and `defining_section`, with
  optional non-identifying `address`;
- `entity_relationships[]`: required controlled `type`, `source`, `target`, and
  `source_section`; entity references contain `record` and `entity`;
- `bindings[]`: required entity reference, `realization`, controlled `kind`,
  and `source_section`, plus at least one of `locator` or `resolution_rule` and
  optional `external_authority`.

Optional empty structures are omitted.

## Explicitly Deferred From This Boundary

- complete section-role vocabularies;
- entity kinds, entity-relationship types, and binding kinds;
- required extensions and extension payloads;
- standardized acceptance-event storage or proof;
- presentation guidance fields; and
- universal path-resolution base.

The serialization reserves no field for a deferred concern until that concern
is accepted. A copied `governance.status: accepted` or `accepted_at` value does
not prove acceptance; authoritative acceptance remains externally bound to an
exact revision.

## Exact Confirmation Requested

> Accept the required and optional NKF 0.1 native record field shapes above,
> including closed unknown-field handling, exact type/body correspondence,
> source-bound relationships, and minimum provenance, external-authority,
> entity, entity-relationship, and binding structures. Preserve the listed
> vocabularies, extensions, acceptance-event proof, presentation, and universal
> path base as separate decisions.

Acceptance would establish serialization only. It would not accept YAML
replacement bytes, schemas, checker behavior, fixtures, confirmed realization,
distribution, or conformance.
