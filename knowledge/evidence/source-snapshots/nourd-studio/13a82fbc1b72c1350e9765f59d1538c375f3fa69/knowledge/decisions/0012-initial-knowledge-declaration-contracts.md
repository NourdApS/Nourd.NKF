# ADR 0012: Adopt NKF 0.1 as the initial Product knowledge format

- **Status:** Accepted
- **Proposed:** 23 July 2026
- **Updated:** 28 July 2026
- **Accepted:** 28 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Task:** `NKF-001`
- **Acceptance source:** Direct Human Product Owner acceptance of proposal
  `56c8f77c9a1374ab56fdda7d62b7a0108c6e18738d77bf59513d5de201a4133c`
  in the Product discussion on 28 July 2026
- **Proposal source:** Product discussions on 23, 27, and 28 July 2026 about
  canonical knowledge, the Product knowledge standard, OKF, semantic
  topology, and Shredwise knowledge reconstruction

## Context

[ADR 0001](./0001-foundational-product-decisions.md) requires every initialized
Product to use an OKF-derived Product knowledge standard that covers both the
Product/business and Realization lenses. It accepted the HumanInTheLoop model
as a structural baseline to adapt rather than copy, and left the standard's
name, schema, versioning, validation, and wider scope unresolved.

[ADR 0006](./0006-typed-markdown-knowledge-backbone.md) makes governed
Markdown the canonical human-auditable Product meaning.
[ADRs 0008–0011](./README.md) establish revision-specific acceptance,
composite Markdown-and-YAML records, the repository topology, and one shared
validation and reconciliation core.

The current `nourd.knowledge.*` contracts are a Nourd Studio bootstrap. They
are useful implementation evidence, but their Nourd-specific identifiers,
record vocabulary, and incomplete semantic model are not yet a public or
portable Product knowledge format.

The Human Product Owner has selected **Nourd Knowledge Format (NKF)** as the
name, directed that it should eventually become public, limited its first
version to Product knowledge, selected Shredwise as the first pilot, and
confirmed that NKF should rebase deliberately on OKF 0.2 while preserving
stronger Nourd authority and semantic requirements.

## Decision

**Name and boundary.** The Product knowledge standard is named **Nourd
Knowledge Format (NKF)**. NKF remains a format. **Nourd Knowledge Protocol
(NKP)** is reserved for a possible future interaction, synchronization, or
acceptance protocol. The Nourd Knowledge Engine may implement NKF but does not
define it.

**Initial version and scope.** NKF begins at version `0.1`. NKF 0.1 covers
Product knowledge only. It must cover the complete Product and its
Realizations without prescribing a business, development, or Task lifecycle.
Company and Organization knowledge remain future work.

**Canonical record.** One NKF record consists of one canonical Markdown
source and one YAML declaration. Markdown owns human Product meaning. The
declaration identifies, source-binds, classifies, and relates that meaning and
cannot introduce meaning absent from Markdown. An exact digest binds the
declaration to the Markdown bytes.

**Location-independent bundle and Nourd profile.** NKF defines a logical
location-independent bundle located by a manifest. The accepted
`knowledge/` plus `.nourd/knowledge/` topology remains the Nourd repository
profile rather than a universal public path requirement.

**Core records.** NKF 0.1 defines Product, Principle, Concept, Journey, Domain,
Capability, Design, Decision, Realization, and Evidence records. A Product
vision is represented through the Product record plus Concepts and Evidence
until narrower knowledge is justified. Decision is a general Product record;
Architecture Decision is a specialization rather than the only kind of
decision.

**Identity and relationships.** Bundles, records, sections, and semantic
entities have stable identities independent of titles, filenames, paths,
types, addresses, or provider locators. NKF uses explicit source-bound typed
relationships. The core hierarchy is Product → Domain → Capability through an
acyclic `part-of` relationship.

**Authority and acceptance.** Record lifecycle and authority state remain
separate. Semantic sections are classified as accepted meaning, proposal,
unresolved, or Evidence. An accepted living record may receive a proposed
revision while the last accepted revision continues to govern. An accepted
Decision is immutable and changes only through a later extending or
superseding Decision. Validation, verification, Git operations, or metadata
cannot infer acceptance.

**Roles and provenance.** Producer, Verifier, acceptance authority, and
external authority are distinct roles. Provenance records derivation from
sources; external authority records ownership of external data, accounts,
permissions, resources, or operations. Neither production nor verification
constitutes acceptance.

**Semantic-to-real mapping.** NKF separates Semantic entity → Realization →
Operational instance → Observation. NKF owns semantic meaning, Realizations,
durable bindings, resolution rules, locators, and authority boundaries.
Operational stores and connected systems own current instances, state, and
observations.

**OKF compatibility.** NKF 0.1 uses OKF 0.2 as its interoperability baseline.
OKF export is a derived projection and never a competing authority. Future
OKF versions trigger a deliberate compatibility review and possible NKF
rebase; they do not change NKF automatically.

**Specification.** The complete proposed logical contracts, body contracts,
Nourd profile, OKF mapping, and conformance requirements are defined in
[NKF 0.1 — Product knowledge format](../designs/nkf-0.1.md). Exact public
schemas, validator implementation, migration, enforcement, registry hosting,
and runtime behavior require later decisions.

**Existing drafts.** The earlier Nourd-specific `record/v2` and semantic-model
drafts were inputs to NKF 0.1. Acceptance of this ADR and its specification
supersedes those standalone semantic-contract proposals for overlapping
scope. They remain provenance and do not govern that scope.

**Public direction.** NKF is intended to become vendor-neutral and public.
Publication occurs only after the specification, conformance materials,
governance, compatibility policy, and license are ready. Internal use or a
pilot does not itself make a public stable release.

## Consequences

- Product knowledge receives its confirmed name and one coherent accepted
  model instead of several partially overlapping draft contracts.
- Shredwise can pilot a whole-Product knowledge reconstruction without being
  operationally onboarded to Nourd Studio.
- Markdown remains the complete human authority while declarations provide
  stable identity, source binding, relationships, and machine verification.
- Product intent, Realizations, operational instances, observations, and
  external authority remain distinct.
- OKF exchange remains possible without reducing NKF acceptance and authority
  semantics to permissive frontmatter.
- Existing Nourd bootstrap contracts need a deliberate migration or verified
  profile mapping.
- Public governance, tooling, migration, and enforcement remain substantial
  later work.

## Not decided here

This ADR does not decide:

- freshness or `stale_after` policy;
- enforcement runners or repository-gate requirements;
- exact JSON Schema or other public schema files;
- migration from current `nourd.knowledge.*` contracts;
- cross-bundle relationships;
- Company or Organization knowledge;
- public license, contribution, registry, or release governance;
- Task lifecycle or Task-to-knowledge protocol;
- standardized acceptance-event storage;
- attested-computation profiles; or
- the future NKP runtime protocol.

The Human Product Owner accepted this ADR and the NKF 0.1 specification as
one exact composite proposal on 28 July 2026.

## Pre-mortem

| Failure mode | Required response |
| --- | --- |
| NKF becomes a rename of current implementation | Keep the logical format vendor-neutral and the Nourd layout as one profile |
| Metadata competes with Markdown | Require exact source binding and reject declaration-only Product meaning |
| Permissive OKF semantics weaken governance | Keep OKF export derived and preserve NKF identity, authority, and acceptance |
| The format absorbs runtime state or protocol | Keep instances and observations operational and reserve NKP for future interaction rules |
| Shredwise-specific needs overfit the public core | Require whole-Product coverage and isolate Product-specific extensions |
| A later Draft is mistaken for the accepted standard | Keep the accepted revision governing until an exact replacement is accepted |
