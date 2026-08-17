---
id: design-nkf-record-v2-responsibility-bindings
type: design
title: NKF Record V2 Responsibility Bindings
summary: Whether nkf.record/v2 should represent responsibility bindings as a section-local YAML list named responsibilities and enforce complete body-contract coverage across the record.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: superseded
task: NKF-003
design_disposition: superseded
design_decisions:
  - adr-0005
superseded_by:
  - adr-0009
decision_authority: Human Product Owner, Nourd ApS
---

# NKF Record V2 Responsibility Bindings

- **Accepted meaning changed:** None

## Decision Sought

Whether `nkf.record/v2` should represent responsibility bindings as a
section-local YAML list named `responsibilities` and enforce complete
body-contract coverage across the record.

## Proposed Representation

Each entry in `sections` may contain `responsibilities`:

```yaml
contract: nkf.record/v2
body_contract: nkf.product/v1
sections:
  - id: product-definition
    heading_path: [Product definition]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities:
      - product-definition
  - id: purpose
    heading_path: [Purpose]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities:
      - purpose
```

The field is section-local because a binding asserts where the canonical
Markdown addresses a responsibility. A top-level list would separate the
assertion from its exact source section.

## Field Rules

For each section:

1. `responsibilities` is optional because not every semantic section must
   fulfill a required body responsibility.
2. When present, it is a non-empty YAML sequence of strings.
3. Every value must be an identifier supported by the exact declared
   `body_contract`.
4. Values must be unique within that section.
5. A section may bind several responsibilities.
6. An empty sequence is invalid and should be omitted.

Across the record:

1. every responsibility required by the declared body contract must appear in
   at least one section's `responsibilities` list;
2. one responsibility may be established across several sections;
3. the order of bindings does not change meaning;
4. a native serializer should emit bindings in body-contract order for
   deterministic review; and
5. an unsupported identifier or body contract fails closed.

## Authority Boundary

A binding is a declaration assertion that an exact Markdown section addresses
a responsibility. It does not add missing Markdown meaning.

Deterministic validation may prove that:

- every binding resolves through its containing declared section;
- every identifier is supported by the body contract; and
- all required identifiers are represented.

It cannot prove that the prose is semantically sufficient, true, safe, or
accepted. Section `authority`, record governance, and human acceptance remain
separate.

## Reconciliation And Migration

Reconciliation may reorder an already valid list deterministically. It must
not add, remove, or change responsibility identifiers.

Migration from `nkf.record/v1` requires reviewed mapping of exact source
sections to the [ADR 0003](../../decisions/0003-product-responsibility-identifiers.md) identifiers. A tool may propose mappings, but it must
label them non-authoritative and may not change the record contract to v2
without reviewed confirmation.

## Deferred

This proposal does not decide:

- executable JSON Schema structure;
- diagnostic rule identifiers or result wording;
- mixed v1 and v2 bundles;
- bundle or NKF format versions;
- optional responsibility identifiers not yet accepted;
- package layout; or
- consumer migration.

## Exact Confirmation Requested

> In `nkf.record/v2`, a section may declare a non-empty, duplicate-free
> `responsibilities` list containing only identifiers supported by its exact
> body contract. Across the record, every required body responsibility must be
> bound to at least one section. A section may bind several responsibilities,
> and a responsibility may span several sections. Binding order carries no
> meaning. Deterministic validation verifies the mapping and coverage, not the
> semantic adequacy or acceptance of the Markdown.

Acceptance would approve these logical YAML semantics only. It would not
approve executable schemas, checker code, bundle versioning, or migration.

## Decision Outcome

The Human Product Owner accepted the exact logical YAML semantics on 29 July
2026. The immutable result is
[`ADR 0005`](../../decisions/0005-historical-record-responsibility-bindings.md).
