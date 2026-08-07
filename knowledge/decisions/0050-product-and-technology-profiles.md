---
id: adr-0050
type: decision
summary: ADR 0049 accepted an automatically applicable, non-selectable Common Specification and one concrete Root Profile per bundle. It deliberately left the exact Product and Technology allocation, serialization, validation, and realization unresolved.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0050: Accept Product And Technology Root Profiles

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's explicit feature-limited delegation
- **Delegation Source:** Direct instruction on 30 July 2026 to audit, accept,
  and confirm only the changes necessary for the dynamic root feature
- **Normative Markdown Digest:** `sha256:8fa484035c2fccf401cb966cf39ae57e17d214178c0153ad43d53790d7832e50`
- **Executable YAML Digest:** `sha256:fd60ad052ff5b58a20b285fec03aede560cd84d18221f7b2d88b7db7fdf67dbd`

## Context

ADR 0049 accepted an automatically applicable, non-selectable Common
Specification and one concrete Root Profile per bundle. It deliberately left
the exact Product and Technology allocation, serialization, validation, and
realization unresolved.

The Human Product Owner then directed NKF to support exactly Product,
Technology, and the automatic General or Common layer, and authorized the
technical reviewer to accept and confirm only the changes required for that
feature. The resulting contract must be usable by the NKF repository itself
as a Technology knowledge bundle.

## Decision

The exact canonical revision of
[`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) and its
digest-bound executable companion at
`contracts/nkf/0.1/nkf.yaml`, identified by the digests above, are accepted as
the current NKF 0.1 authority pair.

`nkf_version: "0.1"` remains the only NKF version coordinate. The authority
pair contains three identified modules:

- `nkf.common`, which applies automatically and cannot be selected;
- `nkf.profile.product`; and
- `nkf.profile.technology`.

Every bundle selects exactly one of the two concrete profiles and declares its
one root:

```yaml
root:
  record: <root record ID>
  profile: nkf.profile.product | nkf.profile.technology
```

There is no selectable `general`, `generic`, or Common root, no implicit
default, and no multi-profile composition.

## Common Allocation

Common owns the project envelope, `.nourd` location, configurable
project-contained `knowledge_root`, Markdown coverage, declaration and source
binding, root-neutral `scope.root`, governance, authority, provenance,
relationships, semantic entities, Realization bindings, extensions,
Governed Validation Inputs, security, diagnostics, validation results, and
the shared Design, Decision, Realization, and Evidence bodies.

The shared Realization responsibility is
`governed-meaning-realized`. The shared Evidence responsibility is
`relevance-to-governed-knowledge`. These replace their Product-bound
predecessors as a deliberate breaking pre-stable migration.

## Product Allocation

The Product Profile retains Product, Principle, Concept, Journey, Domain, and
Capability bodies; the Product–Domain–Capability record hierarchy; and the
Product-only `agreement` and `deployment` binding kinds.

A Product root is unique and living. Product bundles cannot declare
`governed_artifacts`.

## Technology Allocation

The Technology Profile adds one unique living Technology root, at least one
Specification, and the accepted Technology and Specification body
responsibilities in the canonical specification.

Technology permits only Technology, Specification, Design, Decision,
Realization, and Evidence bodies. It prohibits record-level `part-of`;
technical topology uses typed relationships and semantic entities instead of
repository layout.

An accepted Specification for an exact Technology version is immutable.

Technology may declare project-contained, digest-bound
`governed_artifacts`. Each artifact binds to an exact section of an
`nkf.realization` record and becomes a Governed Validation Input. Artifact
integrity does not establish implementation correctness, semantic adequacy,
acceptance, or confirmed Realization.

## Validation Result

`nkf.validation-result` adds the selected profile identity and its resolution
binding. A supported selected Product or Technology profile is `verified`; an
unsupported or non-selectable identity is `unsupported`; an unavailable or
unevaluated identity is `not-evaluated`.

This profile binding identifies executable profile resolution. It does not
duplicate the authority artifacts or claim semantic acceptance.

## Compatibility

This Decision supersedes only the current effect of Product-only
`product_record`, `scope.product`, Product-only root assumptions, and the two
Product-bound Common responsibility identifiers established in earlier NKF
0.1 Decisions. Those Decisions remain immutable historical provenance.

Consumers must migrate deliberately to `root`, `scope.root`, and the current
responsibility identifiers. NKF retains no parallel aliases or hidden legacy
contract.

## Consequences

Product and Technology bundles now share one accepted Common envelope while
retaining different semantic contracts and enforcement. Later root kinds
require their own evidence, accepted profile, executable realization,
fixtures, release support, and deliberate migration under NKF-006.

The canonical Markdown remains authoritative over YAML, schemas, checker
code, fixtures, project declarations, and validation results.

## Non-Claims

This Decision does not by itself:

- confirm the derived JSON Schemas or checker implementation;
- confirm fixture, build, package, or release realization;
- establish NKF repository conformance;
- verify acceptance bindings for every historical record;
- confirm that technical artifacts correctly implement the Specification;
- publish, tag, release, or migrate another consumer; or
- accept a third Root Profile or a selectable generic root.
