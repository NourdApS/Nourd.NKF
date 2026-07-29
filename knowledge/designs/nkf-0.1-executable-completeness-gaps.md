# NKF 0.1 executable completeness gaps

- **Status:** Living audit; all nine identified boundaries accepted
- **Task:** `NKF-003`
- **Prepared:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Authority effect:** None

## Purpose

Identify accepted Markdown requirements that cannot yet be represented as a
complete executable YAML contract without inventing normative details.

## Confirmed deterministic coverage

The accepted Markdown already determines:

- the single NKF version and canonical contract identities;
- required bundle and record responsibilities;
- ten record and body kinds;
- four section-authority classes;
- eleven record-relationship types;
- lifecycle and record-authority states;
- the 69 required body-responsibility identifiers;
- section-local responsibility-binding rules;
- Product–Domain–Capability hierarchy obligations;
- source-digest, section-resolution, provenance, external-authority, and
  Evidence minimum obligations; and
- structural, contract, and full-bundle conformance boundaries.

These should be represented in the replacement YAML.

## Missing executable definitions

### 1. Exact record serialization

The Markdown gives logical responsibilities and one example, but does not
fully define exact object fields and cardinality for governance, acceptance
authority, scope, relationships, provenance, external authority, semantic
entities, entity relationships, bindings, and presentation.

**Resolution:** ADR 0013 accepts the record serialization except for the
explicitly deferred presentation-guidance boundary.

### 2. Section-role vocabularies

Section `role` is controlled and body-contract-specific. The Markdown uses
examples such as `governing`, `boundary`, and `catalogue`, but does not define
the complete allowed role set for each body kind.

**Resolution:** ADR 0014 accepts the exact core role vocabulary and
body-specific subsets.

### 3. Entity and binding vocabularies

Entity kinds, entity-relationship types, and binding kinds are declared
controlled by a body contract or supported profile, but NKF 0.1 defines no
complete core vocabulary or explicit rule that none are core-defined.

**Resolution:** ADR 0015 accepts the exact core entity, entity-relationship,
and binding vocabularies.

### 4. Extensions

Consumers must fail closed on unsupported required extensions, but there is no
accepted declaration field, identifier grammar, registry, resolution rule, or
current supported-extension set.

**Resolution:** ADR 0016 accepts the extension mechanism and an empty native
core supported-extension set. It accepts no concrete extension.

### 5. Acceptance provenance

Acceptance must bind an exact proposed revision, but standardized
acceptance-event storage and exact declaration fields are deliberately
unresolved. The executable boundary between a copied status and authoritative
acceptance evidence is therefore not fully defined.

**Resolution:** ADR 0017 deliberately keeps universal acceptance proof outside
native core and separates declared governance from optional authority-binding
verification.

### 6. Path and distribution boundary

Paths must remain inside a distribution boundary after normalization and
symlink resolution, but the universal boundary and resolution base remain
unresolved outside the Nourd repository profile.

**Resolution:** ADR 0018 replaces that assumption with fixed project-root
`.nourd`, a configurable in-project `knowledge_root`, and complete Markdown
representation rules.

### 7. Diagnostics and enforcement partition

The specification defines conformance obligations but not which are expressible
in JSON Schema, which require a bundle-aware checker, or stable diagnostic rule
identifiers.

**Resolution:** The exact boundary in
[`nkf-0.1-enforcement-and-diagnostics.md`](nkf-0.1-enforcement-and-diagnostics.md)
is accepted by ADR 0019 under explicitly delegated technical authority.

### 8. Presentation guidance

The accepted specification permits deterministic, non-authoritative
presentation guidance, while ADR 0013 deliberately reserves no field until
that concern is separately accepted. NKF 0.1 still needs either an exact
native presentation shape and semantics or an explicit decision to leave
presentation to an extension.

**Resolution:** ADR 0020 keeps presentation outside the native record and
permits it only through a separately governed optional extension. The boundary
is explicitly revisitable through deferred Task NKF-004.

### 9. Exact bundle serialization

Replacement-pair authoring exposed that the accepted bundle responsibilities
do not determine the exact manifest object, `non_records` entry shape and
classification vocabulary, or unknown-field handling.

**Resolution:** The exact boundary in
[`nkf-0.1-native-bundle-serialization.md`](nkf-0.1-native-bundle-serialization.md)
is accepted by ADR 0021.

## Recommended decision order

1. author and accept coherent replacement Markdown and YAML revisions; and
2. derive, review, and test exact schema and checker bytes.

Only after the replacement authority pair is accepted can one YAML file
honestly claim to be the complete current executable NKF 0.1 companion
required by ADR 0007 and ADR 0012.

## Next realization boundary

The current boundary is the coherent replacement Markdown/YAML pair.
Presentation extension design remains deferred under NKF-004 and must not be
invented through that pair or its derived schemas and checker.
