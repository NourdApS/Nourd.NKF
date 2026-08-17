---
id: design-nkf-0-1-presentation-guidance-boundary
type: design
title: NKF 0.1 Presentation-Guidance Boundary
summary: Native NKF 0.1 should define no presentation-guidance field.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0020
proposal_authority_effect: None
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Presentation-Guidance Boundary

## Recommendation

Native NKF 0.1 should define no presentation-guidance field.

Canonical Markdown already supplies readable content, heading structure, and
document order. A consumer may render that source and may choose its own
non-authoritative interface without copying display instructions into every
native record declaration.

When portable presentation metadata is genuinely needed, it should use a
separately governed optional extension under [ADR 0016](../../decisions/0016-extension-resolution.md). This decision would not
create or accept such an extension.

## Boundary

Presentation behavior must not:

- add, remove, suppress, strengthen, or reinterpret Product meaning;
- turn display order, grouping, labels, or emphasis into semantic
  relationships or authority;
- hide governing or unsupported material;
- change record, section, entity, relationship, or binding identity;
- imply acceptance, conformance, or confirmed Realization; or
- become necessary for consequential interpretation.

If metadata is necessary to understand governing meaning, it is semantic
content and belongs in canonical Markdown or another accepted semantic
contract—not in presentation guidance.

Unsupported presentation metadata remains visible and round-trippable under
the optional-extension rules, but native core conformance does not validate or
depend on it.

## Compatibility

The replacement NKF 0.1 specification would clarify that its earlier allowance
for deterministic presentation guidance is realized only through a supported
optional extension. [ADR 0013](../../decisions/0013-native-record-serialization.md)'s native record shape remains unchanged.

## Exact Confirmation Requested

> Keep presentation guidance out of the native NKF 0.1 record. Use canonical
> Markdown as the default readable presentation and a separately governed
> optional extension when portable display metadata is needed.

Acceptance would resolve the final semantic gap only. It would not accept a
presentation extension, replacement Markdown/YAML bytes, schemas, checker
code, a release, or any conformance result.
