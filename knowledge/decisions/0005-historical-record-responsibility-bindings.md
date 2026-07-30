---
created_at: 2026-07-29T20:06:17Z
---

# ADR 0005: Accept Record V2 Responsibility Bindings

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

ADR 0004 introduces `nkf.record/v2` for the explicit responsibility-binding
mechanism established by ADR 0002 and the Product responsibility identifiers
accepted by ADR 0003.

The binding must remain traceable to an exact canonical Markdown section,
support responsibilities that span several sections, and avoid implying that
deterministic coverage proves semantic adequacy.

## Decision

In an `nkf.record/v2` declaration, each entry in `sections` may contain a
section-local YAML field named `responsibilities`.

When present, `responsibilities`:

- is a non-empty sequence of strings;
- contains only identifiers supported by the exact declared body contract;
- contains no duplicate value within the section; and
- may contain several responsibility identifiers.

Across the record:

- every responsibility required by the declared body contract must occur in
  at least one section's `responsibilities` list;
- one responsibility may occur in several sections when its meaning spans
  them;
- binding order carries no meaning; and
- a native serializer should emit bindings in body-contract order for
  deterministic review.

An empty `responsibilities` sequence is invalid and should be omitted.
Sections that do not fulfill a controlled body responsibility omit the field.

## Conformance Boundary

Deterministic validation may establish that:

1. every binding belongs to its containing declared source section;
2. every identifier is supported by the exact body contract;
3. each section-local list is non-empty and duplicate-free; and
4. every required responsibility is bound.

This establishes responsibility-binding completeness only. It does not prove
the semantic adequacy, truth, safety, or acceptance of the Markdown.

Section authority and record governance remain separate. A binding does not
promote proposal, unresolved, or evidence material into accepted meaning.

## Migration

Migration from `nkf.record/v1` requires reviewed mapping from exact source
sections to accepted responsibility identifiers.

A tool may propose mappings if it identifies them as non-authoritative. It
must not add or alter bindings, or change the declaration to
`nkf.record/v2`, without reviewed confirmation.

Deterministic reconciliation may reorder an already valid list. It must not
invent, remove, or reinterpret bindings.

## Not Decided

This Decision does not accept:

- executable JSON Schema structure;
- diagnostic rule identifiers or wording;
- mixed v1 and v2 bundles;
- bundle or NKF format versions;
- package or distribution layout; or
- consumer migration.
