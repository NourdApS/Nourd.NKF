---
id: adr-0020
type: decision
summary: The NKF 0.1 specification permits non-authoritative presentation guidance, while ADR 0013 deliberately reserves no native field for it. Discussion using a concrete project established that native NKF semantics already provide records, canonical Markdown, section structure, types, hierarchy, relationships, governance, and provenance from which an interface can build a default presentation.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0020: Establish Current Presentation-Guidance Boundary

- **Follow-up Task:** `NKF-004`
- **Acceptance source:** Direct confirmation in the NKF-003 discussion on
  29 July 2026

## Context

The NKF 0.1 specification permits non-authoritative presentation guidance,
while ADR 0013 deliberately reserves no native field for it. Discussion using
a concrete project established that native NKF semantics already provide
records, canonical Markdown, section structure, types, hierarchy,
relationships, governance, and provenance from which an interface can build a
default presentation.

Portable display metadata may still be valuable in the future when several
interfaces need consistent guidance that cannot be derived from those
semantics.

## Decision

The current NKF 0.1 boundary is:

> Keep presentation settings out of native NKF. Markdown remains the default
> readable form. Projects needing portable display metadata can use a
> separately governed optional extension.

Therefore:

- native `nkf.record` defines no presentation-guidance field;
- native conformance does not require presentation metadata;
- presentation metadata cannot add, remove, suppress, strengthen, or
  reinterpret Product meaning;
- unsupported optional presentation metadata cannot be required to understand
  or govern the knowledge; and
- no concrete presentation extension is accepted by this Decision.

The supporting proposal remains at
[`../designs/adopted/presentation-guidance.md`](../designs/adopted/presentation-guidance.md).

## Explicit Future Reconsideration

This boundary is intentionally current rather than permanent. Task
[`NKF-004`](../tasks/deferred/NKF-004-portable-presentation-guidance.md)
owns future evidence gathering and design of a portable presentation-guidance
extension and may propose refining, extending, or superseding this boundary.

NKF-004 does not change this Decision merely by producing a design,
implementation, fixture, or successful demonstration. Any consequential
change must follow ADR 0006 and be accepted in a later Decision that preserves
ADR 0020 as historical provenance.

## Not Established

This Decision does not establish:

- an extension identity, authority pair, payload, vocabulary, or schema;
- checker or interface behavior;
- common visual layouts, labels, grouping, ordering, or emphasis;
- application or user-interface operational state;
- replacement NKF Markdown or YAML authority bytes;
- a release, consumer migration, or conformance result; or
- a commitment to promote presentation guidance into native NKF.
