# NKF-003: Establish independent NKF authority

- **Task:** `NKF-003`
- **Status:** Active
- **Owner:** Nourd ApS
- **Decision authority:** Human Product Owner, Nourd ApS
- **Repository:** `kaveh6202/Nourd.NKF`

## Desired outcome

Establish Nourd Knowledge Format as independent Company-owned Shared
Technology, migrate its accepted specification and implementation provenance
without rewriting history, and create one authoritative path for NKF
specifications, profiles, contracts, conformance, compatibility, and releases.

## Accepted constraints

- NKF is Shared Technology and not a Product.
- This repository is `kaveh6202/Nourd.NKF`, with local checkout
  `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` and
  default branch `master`.
- Nourd Studio's accepted NKF 0.1 Decision and specification remain immutable
  provenance.
- Nourd Studio, Shredwise, and Nourd Agent SDK are consumers of pinned NKF
  contracts and tooling; no consumer owns NKF.
- NKF conformance never supplies semantic acceptance.
- NKF contract work remains grounded in Product knowledge. Do not introduce a
  separate Shared Technology model or profile unless separately directed.

## Scope

1. Establish the independent repository and technical knowledge authority.
2. Import the exact accepted NKF 0.1 Product specification with source commit
   and digest provenance.
3. Import and classify the NKF-002 checker plan, amendments, implementation,
   fixtures, and results without promoting proposals to accepted meaning.
4. Reconcile the accepted specification with later proposed executable
   contract clarifications.
5. Establish the exact NKF Product contract realization under this independent
   authority.
6. Establish exact contract ownership, checker distribution, integrity,
   compatibility, migration, and release rules.
7. Provide pinned consumer paths and remove temporary duplicate authority only
   after every consumer migration is verified.

## Out of scope until separately accepted

- rewriting accepted Nourd Studio ADRs or their historical specification;
- accepting a consumer's Product or Shared Technology knowledge;
- moving the Nourd Knowledge Engine into this repository;
- defining a future NKP runtime protocol;
- changing Nourd Studio, Shredwise, or Agent SDK knowledge automatically;
- public licensing, contribution governance, or stable NKF 1.0 release; and
- deleting source material before authority and provenance are reconciled.

## Execution plan

1. Verify the empty remote, local repository identity, and `master` branch.
2. Record the repository authority and migration plan before source import.
3. Inventory exact accepted, proposed, implementation, and operational NKF
   material in Nourd Studio by repository path and commit.
4. Import immutable accepted NKF 0.1 source and acceptance provenance.
5. Import checker work on a migration branch or as explicitly classified
   evidence; do not merge it into normative contracts by implication.
6. Produce a complete authority and compatibility reconciliation identifying
   what remains accepted, proposed, superseded, consumer-specific, or absent.
7. Present each consequential format or contract decision for Human Product
   Owner confirmation.
8. Implement and validate exact accepted contracts with positive and negative
   conformance fixtures.
9. Establish pinned distribution and migrate consumers one at a time.
10. Record the completed authority handover in Company and affected consumer
    knowledge without rewriting accepted history.

## AI execution slice: source inventory and reconciliation basis

- **Recorded:** 29 July 2026
- **Scope:** Steps 3 and 6, limited to evidence inventory and classification
- **Authority effect:** None; this slice cannot accept, reject, amend, or
  supersede normative NKF meaning

### Plan

1. Verify each imported snapshot against its recorded file count, source
   identity, and byte digests.
2. Compare the accepted NKF 0.1 Product specification with the later NKF-002
   proposal and checker contracts.
3. Classify every material difference as accepted baseline, later proposal,
   implementation choice, consumer-specific behavior, or unresolved absence.
4. Record the reconciliation as governed evidence with exact source anchors.
5. Present the first consequential format or contract boundary separately for
   informed Human Product Owner confirmation before drafting normative
   specifications or executable contracts.

### Guardrails

- Preserve source snapshots byte-for-byte.
- Do not infer normative meaning from checker code, schemas, tests, or passing
  validation.
- Do not create a canonical specification, profile, package layout, release,
  or consumer migration in this slice.
- Stop at the first consequential format boundary requiring human acceptance.

### Result

The source inventory and authority classification are recorded in
[`../evidence/nkf-003-source-reconciliation.md`](../evidence/nkf-003-source-reconciliation.md).
The accepted snapshot's declared byte digests are verified, the checker
snapshot's 22-file local set is inventoried, and the exact later specification
delta is isolated.

The declared Nourd Studio source commits are not currently reachable from the
declared GitHub repository, and the checker source archive is not preserved
locally. Those provenance limitations remain open. Work is paused at the
first decision boundary: the ownership and conformance semantics of explicit
body-responsibility identifiers and section bindings.

On 29 July 2026, the Human Product Owner accepted that boundary. The immutable
result is
[`ADR 0002`](../decisions/0002-establish-body-responsibility-bindings.md).
It establishes the generic core mechanism and its deterministic conformance
limit without accepting exact Product vocabularies, serialization, or checker
implementation.

## Human Product Owner clarification

On 29 July 2026, the Human Product Owner clarified that NKF should continue to
be developed for Product knowledge and that this work is expected to cover
Shared Technology needs. NKF-003 must not introduce a separate Shared
Technology model, profile, subject-root architecture, or reusable-contract
layer unless separately directed.

Earlier unaccepted proposals created during this execution were removed. No
normative NKF meaning resulted from them.

## AI execution slice: Product responsibility identifiers

- **Recorded:** 29 July 2026
- **Scope:** Steps 4, 6, and 7, limited to stable identifiers for the already
  accepted Product body responsibilities
- **Authority effect:** None until the exact identifier set is accepted by the
  Human Product Owner

### Plan

1. Compare every responsibility identifier proposed by NKF-002 with the exact
   accepted NKF 0.1 Product responsibility wording.
2. Verify one-to-one coverage, contract scoping, uniqueness, spelling, and
   absence of semantic wording changes.
3. Record only the proposed identifier mapping and its compatibility effect.
4. Present the complete identifier set for informed confirmation before
   choosing serialization fields or changing executable contracts.

### Guardrails

- Keep Product meaning and responsibility order unchanged.
- Treat identifiers as contract-scoped labels, not new semantic authority.
- Do not accept the proposed `responsibilities` YAML field, schemas, checker
  implementation, or package layout in this slice.
- Do not introduce a separate Shared Technology model or profile.

### Result

The exact mapping and verification result are recorded in
[`../designs/nkf-0.1-product-responsibility-identifiers.md`](../designs/nkf-0.1-product-responsibility-identifiers.md).
The proposal contains 69 valid contract-scoped identifiers with no duplicates.

One NKF-002 wording change was rejected: Design responsibility 7 capitalized
accepted lowercase `evidence`, which could incorrectly require the specific
Evidence record type. The identifier proposal preserves the accepted wording.

No serialization or executable contract has been drafted. Work is paused for
Human Product Owner confirmation of the exact identifier set.

On 29 July 2026, the Human Product Owner accepted the exact 69 identifiers.
The immutable result is
[`ADR 0003`](../decisions/0003-accept-product-responsibility-identifiers.md).
Serialization and executable contract realization remain undecided.

## AI execution slice: NKF record v2

- **Recorded:** 29 July 2026
- **Scope:** Steps 4, 6, and 7, limited to versioning and serialization of
  responsibility bindings
- **Authority effect:** The `nkf.record/v2` version boundary is accepted;
  serialization remains a proposal until separately confirmed

### Plan

1. Record the accepted decision to introduce responsibility bindings through
   `nkf.record/v2` without changing `nkf.record/v1`.
2. Keep the ten Product body contracts at `v1` because their accepted
   responsibility meaning is unchanged.
3. Define the smallest YAML representation and deterministic coverage rules
   required by ADRs 0002 and 0003.
4. Preserve migration as reviewed semantic declaration work; reconciliation
   must not invent responsibility bindings.
5. Present the exact serialization boundary before changing schemas or checker
   code.

### Guardrails

- Do not change the meaning of `nkf.record/v1`.
- Do not change bundle or NKF format versions in this slice.
- Do not treat a contract-version bump as acceptance of field semantics.
- Do not implement executable contracts before the serialization proposal is
  accepted.

### Accepted version boundary

On 29 July 2026, the Human Product Owner accepted `nkf.record/v2` for explicit
responsibility bindings while retaining `nkf.record/v1` and the ten Product
body contracts at `v1`. The immutable result is
[`ADR 0004`](../decisions/0004-introduce-nkf-record-v2.md).

### Serialization proposal

The proposed section-local YAML field and deterministic coverage rules are
recorded in
[`../designs/nkf-record-v2-responsibility-bindings.md`](../designs/nkf-record-v2-responsibility-bindings.md).
The Human Product Owner accepted the exact logical serialization on 29 July
2026. The immutable result is
[`ADR 0005`](../decisions/0005-accept-record-v2-responsibility-bindings.md).
No executable schema or checker change has been made.

## AI execution slice: record v2 acceptance and pre-stable evolution

- **Recorded:** 29 July 2026
- **Scope:** Steps 6 through 10, limited to recording the accepted v2
  serialization and the governed feedback loop before the first stable release
- **Authority effect:** Direct Human Product Owner acceptance governs both
  boundaries

### Plan

1. Record the accepted `nkf.record/v2` section-local responsibility-binding
   semantics.
2. Establish how implementation and exercise across real projects may produce
   governed NKF changes before the first stable release.
3. Distinguish specification gaps, contract defects, checker bugs, and
   consumer nonconformance before choosing a remedy.
4. Require evidence, reproduction, validation, confirmation, authoritative
   updates, implementation adjustment, release, and deliberate consumer
   migration for consequential changes.
5. Update repository guidance so pre-stable flexibility cannot become silent
   contract drift.

### Guardrails

- Real-project findings are evidence, not automatic normative changes.
- A checker fix may not change accepted contract behavior by implication.
- Pre-stable breaking change remains explicit, versioned, and migration-aware.
- Consumer repositories remain authoritative for their meaning and state.
- A green validation result never supplies acceptance.

### Result

The accepted pre-stable feedback loop is recorded in
[`ADR 0006`](../decisions/0006-establish-governed-pre-stable-evolution.md).
It permits evidence-driven change before `1.0` while requiring explicit
classification, validation, acceptance, authoritative updates, versioned
release, and deliberate migration.

## AI execution slice: canonical specification and YAML contract set

- **Recorded:** 29 July 2026
- **Scope:** Steps 4 through 8, limited to the authority relationship and
  artifact sequence for the canonical Markdown specification and complete
  machine-readable YAML contract set
- **Authority effect:** The Markdown-to-YAML authority relationship is
  accepted; exact paths and version identifiers remain proposals

### Plan

1. Record that normative Markdown owns human NKF meaning and that the complete
   YAML contract set is its accepted executable companion.
2. Require exact path, revision, and digest binding so Markdown and YAML cannot
   drift into competing authorities.
3. Establish the canonical independent Markdown specification before creating
   a YAML artifact that claims completeness.
4. Propose the current NKF format version, canonical specification path, YAML
   contract-set path, and supported contract versions for confirmation.
5. Derive JSON Schemas, checker tables, and fixtures only after both accepted
   artifacts exist.

### Guardrails

- YAML may express executable detail but may not introduce Product meaning
  absent from accepted Markdown and Decisions.
- A Markdown/YAML mismatch fails closed and requires governed reconciliation.
- Imported checker schemas remain proposal evidence.
- Generated schemas and code cannot become a second contract authority.

### Accepted authority boundary

On 29 July 2026, the Human Product Owner accepted normative Markdown and its
complete executable YAML contract set as a digest-bound governed pair. The
immutable result is
[`ADR 0007`](../decisions/0007-establish-markdown-and-yaml-contract-authority.md).

### Artifact proposal

The proposed NKF version, canonical paths, YAML contract identity, and
creation sequence are recorded in
[`../designs/nkf-0.1-authoritative-artifacts.md`](../designs/nkf-0.1-authoritative-artifacts.md).
On 29 July 2026, the Human Product Owner accepted those exact artifact
identities. No canonical specification or YAML contract set has yet been
created.

## AI execution slice: canonical NKF 0.1 Markdown specification

- **Recorded:** 29 July 2026
- **Scope:** Steps 4 through 8, limited to preparing the independent
  Markdown specification from accepted source and Decisions
- **Authority effect:** The artifact identity is accepted; the exact composite
  Markdown revision remains a proposal until separately reviewed and accepted

### Plan

1. Record the accepted NKF 0.1 artifact identities and paths.
2. Copy the exact accepted Studio NKF 0.1 Markdown source into a proposed
   independent specification without changing its source evidence.
3. Incorporate only the explicitly accepted ADR 0002 through ADR 0005 and
   ADR 0009
   contract changes, each with provenance.
4. Preserve every other imported NKF-002 amendment as proposal evidence.
5. Compare the composite Markdown against the accepted source and present the
   exact semantic and compatibility delta for Human Product Owner review.

### Guardrails

- Do not treat the composite draft as accepted merely because every included
  Decision is accepted.
- Preserve the accepted Studio source bytes and provenance unchanged.
- Do not introduce unaccepted executable schema fields or checker behavior.
- Bind a later YAML contract set only after the exact Markdown revision is
  accepted and digested.

### Result

The proposed independent Markdown realization is
[`../designs/nkf-0.1-independent-specification.md`](../designs/nkf-0.1-independent-specification.md).
It is mechanically based on the later NKF-002 snapshot only where its changes
are now accepted by ADRs 0002 through 0005; the rejected capitalization of
Design responsibility 7 has been corrected to the accepted lowercase
`evidence` wording.

The composite remains a proposal. Exact source and semantic delta review is
required before it moves to `knowledge/specifications/nkf-0.1.md`.

## AI execution slice: single NKF 0.1 version namespace

- **Recorded:** 29 July 2026
- **Scope:** Resolve the relationship between NKF format version and prior
  record-contract versions
- **Authority effect:** Direct Human Product Owner acceptance governs the
  canonical NKF 0.1 version model

### Result

The Human Product Owner clarified that NKF has only the format-version
namespace, currently `0.1`. The former record-v2 structure is the sole NKF
0.1 record definition. Earlier versioned-contract identities remain immutable
provenance but are not current supported parallel NKF contracts. The immutable
result is [`ADR 0009`](../decisions/0009-establish-single-nkf-0-1-version-namespace.md).

The independent Markdown draft is revised as a proposal to remove the prior
sub-versioning and mixed/default-policy language. Its exact resulting semantic
change requires Product Owner review before final promotion.

## AI execution slice: accepted Markdown and executable YAML proposal

- **Recorded:** 29 July 2026
- **Scope:** Promote the accepted exact Markdown revision and author, but do
  not accept, its executable YAML companion
- **Authority effect:** The Product Owner's Markdown acceptance governs only
  the exact recorded specification revision; YAML remains a proposal pending
  separate review and acceptance

### Plan

1. Preserve the accepted draft bytes at the canonical specification path and
   record their path and SHA-256 digest in an immutable Decision.
2. Create a complete YAML proposal bound to those exact Markdown bytes and the
   governing Decisions.
3. Include only accepted deterministic constraints and make unsupported or
   unspecified behavior fail closed.
4. Validate syntax, source binding, identity coverage, and internal references.
5. Present the exact YAML revision for Product Owner review before calling it
   an accepted companion or deriving schemas, checker code, fixtures, or a
   release.

## AI execution slice: accepted YAML and derived schema proposals

- **Recorded:** 29 July 2026
- **Scope:** Record acceptance of the exact YAML companion and derive schema
  proposals from the accepted Markdown/YAML pair
- **Authority effect:** YAML acceptance governs the exact companion revision;
  schemas remain derived proposals until their realization is reviewed

### Plan

1. Bind the accepted YAML digest to the accepted canonical Markdown digest in
   an immutable Decision.
2. Derive JSON Schema proposals from the accepted pair without adding meaning.
3. Verify syntax and dispatch coverage for the single NKF 0.1 structure.
4. Keep checker, fixtures, packaging, distribution, and conformance absent
   until separately realized and verified.

## AI execution slice: JSON Schema realization proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose the first JSON Schema realization boundary from the
  accepted Markdown/YAML pair
- **Authority effect:** None; the proposal cannot accept serialization shape,
  schema layout, checker behavior, or conformance

### Plan

1. Identify the minimum derived schema set needed to validate the accepted
   bundle and record structures.
2. Separate fields already determined by the accepted pair from concrete JSON
   representation choices that still need confirmation.
3. Keep the proposed schemas out of the canonical contract authority until the
   exact realization boundary is accepted.
4. Present one bounded, reviewable schema-layout proposal before implementation.

## Acceptance criteria

- This repository is the sole current technical authority for future NKF
  specification, contract, checker, compatibility, and release changes.
- The exact accepted NKF 0.1 Product specification is preserved with verifiable
  source commit and digest provenance.
- Later Nourd Studio checker work is classified accurately and no proposal is
  silently promoted.
- Product knowledge has accepted, versioned NKF contracts.
- One checker distribution validates exact supported contracts and fails
  closed on unsupported required meaning.
- The NKF repository is the first governed NKF 0.1 consumer. Its self-hosted
  bundle must pass the required full-bundle conformance checks and receive
  separate Human Product Owner confirmation before external consumer pilots
  are treated as readiness evidence.
- Nourd Studio, Shredwise, and Nourd Agent SDK can pin an exact NKF release
  without copying an independently evolving validator.
- Real-project shortcomings can enter a reproducible, classified, validated,
  accepted, versioned, and migration-aware pre-stable change process.
- Company and consumer records point to this authority while historical
  accepted sources remain traceable.

## AI execution slice: reconcile single-version artifact authority

- **Recorded:** 29 July 2026
- **Scope:** Reconcile ADR 0007's artifact-version language with ADR 0009's
  single NKF version namespace
- **Authority effect:** None until the exact reconciliation is accepted by the
  Human Product Owner

### Plan

1. Preserve ADR 0007's Markdown-over-YAML authority, completeness, digest
   binding, conflict handling, and derived-artifact rules.
2. Remove only its independent contract-set and contract-version requirements.
3. Require released artifacts to identify the one NKF version and exact
   Markdown/YAML digests instead of sub-version coordinates.
4. Preserve all earlier Decisions as immutable historical snapshots and use a
   later Decision for any accepted correction.

### Result

The Human Product Owner accepted the exact reconciliation on 29 July 2026. It
is recorded in
[`ADR 0012`](../decisions/0012-reconcile-single-version-artifact-authority.md).

## AI execution slice: replacement authoritative pair proposal

- **Recorded:** 29 July 2026
- **Scope:** Prepare a coherent replacement for the accepted Markdown/YAML pair
  without editing accepted bytes in place
- **Authority effect:** None until exact replacement revisions are accepted

### Plan

1. Preserve the ADR 0010 and ADR 0011 artifacts as immutable accepted
   revisions.
2. Produce a new Markdown proposal that accurately states its current accepted
   baseline and governing Decisions without changing Product meaning.
3. Produce a complete YAML proposal covering every deterministic vocabulary,
   structure, constraint, and conformance rule in the replacement Markdown.
4. Bind the proposals to each other by exact paths and digests without creating
   an independent version namespace.
5. Audit the complete delta and request exact replacement acceptance before
   changing canonical paths or derived schemas.

### Completeness finding

Derivation of a complete replacement YAML exposed deterministic gaps in the
accepted Markdown itself. It refers to controlled section roles, entity kinds,
entity-relationship types, binding kinds, supported extensions, acceptance
provenance, and exact nested declaration structures without defining complete
vocabularies or serialization shapes for them. The current YAML cannot fill
those gaps without becoming a second semantic authority.

The exact gap inventory and proposed decision order are recorded in
[`../designs/nkf-0.1-executable-completeness-gaps.md`](../designs/nkf-0.1-executable-completeness-gaps.md).
Replacement YAML authoring is paused at the first unresolved normative
boundary rather than silently inventing executable meaning.

## AI execution slice: NKF 0.1 native record serialization

- **Recorded:** 29 July 2026
- **Scope:** Resolve the exact native record object shape without deciding its
  deferred controlled vocabularies or realization
- **Authority effect:** Direct Human Product Owner acceptance governs the
  exact serialization boundary

### Plan

1. Separate the logical record requirements already accepted from concrete
   native YAML representation choices.
2. Define the required top-level fields and minimum nested structures.
3. Require exact type/body correspondence, complete responsibility coverage,
   source-bound relationships, and fail-closed unknown-field handling.
4. Isolate controlled vocabularies, extensions, acceptance proof,
   presentation, and path resolution as later decisions.
5. Do not replace accepted Markdown/YAML bytes or derive schemas and checker
   behavior until all required normative boundaries are accepted.

### Result

The Human Product Owner accepted the exact native serialization proposal on
29 July 2026. The immutable result is
[`ADR 0013`](../decisions/0013-accept-nkf-0-1-native-record-serialization.md).

This acceptance defines serialization only. Replacement Markdown/YAML bytes,
the deferred controlled vocabularies, schemas, checker behavior, fixtures,
distribution, releases, conformance, and consumer migration remain
unconfirmed or absent.

## AI execution slice: section-role vocabulary proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose the complete controlled section-role vocabulary and the
  allowed subset for each NKF 0.1 body contract
- **Authority effect:** None until the exact vocabulary is accepted by the
  Human Product Owner

### Plan

1. Extract the later NKF-002 checker role lists as proposal evidence only.
2. Define one human-readable meaning for every unique role name.
3. Map allowed role subsets to the ten unversioned NKF 0.1 body identities.
4. Separate role classification from section authority and responsibility
   coverage, and constrain the generic `content` role so it cannot become a
   conformance escape hatch.
5. Present the exact vocabulary for informed confirmation before updating the
   replacement specification or executable companion.

### Guardrails

- Checker data does not accept role names or meanings.
- A role never proves semantic adequacy, truth, authority, acceptance, or
  responsibility coverage.
- Repeated role names have one meaning across all body contracts.
- Do not introduce sub-versioned body identities.
- Do not edit accepted Markdown/YAML bytes or implement schemas and checker
  behavior in this slice.

### Result

The Human Product Owner accepted the exact section-role proposal on 29 July
2026. The immutable result is
[`ADR 0014`](../decisions/0014-accept-nkf-0-1-section-role-vocabularies.md).

This acceptance establishes the 38 shared role meanings, ten body-specific
allowed subsets, and stated semantic and fail-closed guardrails only. All
other deferred vocabularies and realization work remain unconfirmed or absent.

## AI execution slice: semantic topology and binding vocabularies

- **Recorded:** 29 July 2026
- **Scope:** Propose the controlled entity kinds, entity-relationship types,
  and binding kinds required by the accepted native record serialization
- **Authority effect:** None until the exact vocabulary and semantics are
  accepted by the Human Product Owner

### Plan

1. Compare the accepted semantic-entity, Realization, external-authority, and
   operational-state boundaries with the later checker vocabularies.
2. Define the exact meaning, direction, valid references, and deterministic
   constraints of every proposed value.
3. Keep semantic entity relationships distinct from record relationships and
   keep durable bindings distinct from live operational state.
4. Reject or isolate checker values that cannot be grounded in accepted NKF
   meaning.
5. Present one exact proposal before updating the replacement authority pair
   or any derived realization.

### Guardrails

- Imported checker vocabularies are evidence, not authority.
- Entity addresses and locators are not identity.
- Bindings map durable Product meaning to realizations; they do not make NKF
  the owner of external or operational state.
- Unknown controlled values fail closed for native NKF 0.1.
- Do not edit accepted Markdown/YAML bytes or implement schemas and checker
  behavior in this slice.

### Result

The Human Product Owner confirmed that the exact semantic-topology and binding
proposal should proceed on 29 July 2026. The immutable result is
[`ADR 0015`](../decisions/0015-accept-nkf-0-1-semantic-topology-and-binding-vocabularies.md).

This acceptance establishes the core entity kinds and ownership matrix,
entity-relationship types, binding kinds, and stated semantic-layer guardrails
only. All remaining deferred boundaries and realization work remain
unconfirmed or absent.

## AI execution slice: extension declaration and resolution proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose how native NKF 0.1 declares, identifies, resolves, and
  fails closed on optional and required extensions
- **Authority effect:** None until the exact extension boundary is accepted by
  the Human Product Owner

### Plan

1. Reconcile the accepted extension principles with the later checker fields
   and validation behavior.
2. Define extension identifier ownership without creating another version
   namespace inside NKF.
3. Define exact declaration fields, payload binding, requirement semantics,
   support resolution, and round-trip obligations.
4. Keep native core meaning and profile-specific meaning visibly separate.
5. Present the exact boundary before updating the replacement authority pair
   or any schema/checker realization.

### Guardrails

- An extension cannot silently redefine native NKF 0.1 meaning.
- Unknown optional extensions remain visible and round-trippable but cannot be
  semantically validated by an unsupported consumer.
- Unknown required extensions fail closed for complete validation and
  consequential governing action.
- Extension support is exact and explicit, never inferred from a similar name
  or payload.
- Do not edit accepted Markdown/YAML bytes or implement schemas and checker
  behavior in this slice.

### Result

The Human Product Owner confirmed the exact extension proposal on 29 July
2026. The immutable result is
[`ADR 0016`](../decisions/0016-accept-nkf-0-1-extension-declaration-and-resolution.md).

This acceptance establishes the extension mechanism only. It accepts no
concrete extension, registry, replacement authority pair, derived
realization, conformance result, or consumer migration.

## AI execution slice: acceptance provenance proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose the standard declaration reference to authoritative
  acceptance evidence without moving acceptance authority into copied YAML
- **Authority effect:** None until the exact representation is accepted by the
  Human Product Owner

### Plan

1. Reconcile accepted record governance and exact-revision acceptance rules
   with the later checker's proposed acceptance-source structure.
2. Define the minimum source-bound reference needed when a record declares
   accepted, superseded, or retired status.
3. Keep the authoritative acceptance event in its owning governed system and
   treat declaration data only as a verifiable reference.
4. Define deterministic consistency checks without claiming semantic
   acceptance.
5. Present the exact boundary before updating the replacement authority pair
   or implementing derived schemas and checker behavior.

### Guardrails

- A copied `status`, date, actor, or acceptance reference never proves
  acceptance by itself.
- The acceptance authority and evidence source must remain explicit.
- The reference must bind the exact accepted proposal bytes.
- Unresolvable or inconsistent acceptance evidence fails closed for a claim of
  accepted authority, but does not authorize a checker to accept or reject
  meaning.
- Do not edit accepted Markdown/YAML bytes or implement schemas and checker
  behavior in this slice.

### Result

The Human Product Owner confirmed the exact acceptance-provenance boundary on
29 July 2026. The immutable result is
[`ADR 0017`](../decisions/0017-accept-nkf-0-1-acceptance-provenance-boundary.md).

Native core therefore defines no universal acceptance-proof field. Authority
binding verification remains outside copied declaration metadata and distinct
from NKF conformance and Realization confirmation.

## AI execution slice: path and distribution-boundary proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose the universal resolution base, portable path syntax, and
  containment rules for NKF 0.1 bundle content
- **Authority effect:** None until the exact boundary is accepted by the Human
  Product Owner

### Plan

1. Reconcile the accepted location-independent bundle model with later
   repository-specific checker path behavior.
2. Define the distribution root and exact resolution bases for manifest,
   Markdown, declarations, source bindings, non-records, and extension
   artifacts.
3. Define normalization, symlink, file-kind, case, and containment rules that
   fail closed across platforms.
4. Keep portable bundle paths separate from external locators and operational
   resource addresses.
5. Present the exact boundary before updating the replacement authority pair
   or implementing derived schemas and checker behavior.

### Guardrails

- NKF must not require a repository root, `.nourd`, `.nkf`, or a fixed
  directory layout.
- Portable identity must not depend on absolute paths, environment variables,
  current working directory, or symlink targets outside the distribution.
- Path normalization must not allow traversal outside the distribution.
- External locators remain locators, not portable bundle paths or identity.
- Do not edit accepted Markdown/YAML bytes or implement schemas and checker
  behavior in this slice.

### Result

The Human Product Owner replaced the abstract distribution-root proposal with
a fixed project-root `.nourd` location and a configurable in-project knowledge
entry point, then confirmed the exact interpretation on 29 July 2026. The
immutable result is
[`ADR 0018`](../decisions/0018-accept-nkf-0-1-project-path-and-knowledge-coverage.md).

This acceptance establishes path and Markdown-coverage semantics only. The
currently accepted authority-pair bytes remain unchanged; replacement
artifacts and derived realization remain pending.

## AI execution slice: enforcement partition and diagnostics proposal

- **Recorded:** 29 July 2026
- **Scope:** Propose the exact division among schema validation,
  bundle-aware deterministic checks, semantic review boundaries, and stable
  diagnostics
- **Authority effect:** None while proposed; the exact audited boundary was
  later accepted under explicitly delegated technical authority

### Plan

1. Inventory every accepted deterministic NKF 0.1 rule after ADR 0018.
2. Assign each rule to JSON Schema, bundle-aware checker, authority/external
   resolver, or human semantic review without duplicating authority.
3. Define conformance phases, failure behavior, diagnostic identity, severity,
   location, and deterministic ordering.
4. Distinguish validation execution from acceptance, authority verification,
   and Realization confirmation.
5. Present the exact enforcement boundary before replacing the authority pair
   or implementing derived artifacts.

### Guardrails

- Schemas and checker code remain derived artifacts.
- A diagnostic cannot create or change normative meaning.
- Unsupported required meaning and incomplete required validation fail closed.
- Warnings must not be silently promoted to errors or ignored when a
  governing profile makes them consequential.
- Validation output must identify exact contract and source digests.
- Do not edit accepted Markdown/YAML bytes or implement the checker in this
  slice.

### Result

The Human Product Owner stated that they had not reviewed the whole proposal
and explicitly delegated its approval under the technical reviewer's
authority. After independent reconciliation and self-audit, the exact proposal
was accepted without claiming line-by-line Human Product Owner review. The
immutable result is
[`ADR 0019`](../decisions/0019-accept-nkf-0-1-enforcement-and-diagnostics.md).

This acceptance establishes enforcement semantics only. Presentation guidance
remains the final unresolved semantic boundary before a coherent replacement
Markdown/YAML authority pair can be authored and reviewed.

## AI execution slice: presentation-guidance boundary

- **Recorded:** 29 July 2026
- **Scope:** Resolve whether non-authoritative presentation guidance belongs
  in native NKF 0.1 or only in a separately governed extension
- **Authority effect:** None until the exact boundary is accepted by its
  owning decision authority

### Plan

1. Reconcile the specification's optional presentation allowance with ADR
   0013's deliberate omission of presentation fields and ADR 0016's optional
   extension mechanism.
2. Prefer the smallest boundary that preserves canonical Markdown order and
   prevents display metadata from becoming Product meaning.
3. State the recommendation, compatibility effect, and non-claims in a short
   proposal.
4. Do not define a concrete presentation extension, replacement authority
   bytes, schemas, or checker implementation in this slice.

### Result

The Human Product Owner accepted the current boundary directly: presentation
settings remain outside native NKF, Markdown remains the default readable
form, and portable display metadata uses a separately governed optional
extension. The immutable result is
[`ADR 0020`](../decisions/0020-establish-current-presentation-guidance-boundary.md).

The intended future extension is preserved separately as deferred Task
[`NKF-004`](NKF-004-define-portable-presentation-guidance-extension.md).
ADR 0020 is explicitly subject to governed reconsideration through that Task,
but Task activity cannot change the accepted boundary without a later
Decision.

## AI execution slice: coherent replacement authority-pair proposal

- **Recorded:** 29 July 2026
- **Scope:** Integrate ADRs 0013 through 0021 into one proposed replacement
  normative Markdown specification and one complete executable YAML companion
- **Authority effect:** None until the exact replacement artifacts are
  separately reviewed and accepted

### Plan

1. Reconcile every section of the existing replacement Markdown proposal
   against ADRs 0013 through 0021 and remove superseded path, presentation,
   serialization, vocabulary, extension, enforcement, and authority language.
2. Preserve accepted Product meaning, source provenance, the single NKF 0.1
   version namespace, and Markdown-over-YAML authority.
3. Author one complete YAML companion proposal containing every accepted
   deterministic structure, vocabulary, constraint, diagnostic, and
   conformance rule without inventing NKF-004 presentation fields.
4. Bind the YAML proposal to the exact Markdown proposal digest and record the
   governing Decisions.
5. Validate Markdown links, YAML syntax and data model, vocabulary coverage,
   responsibility coverage, rule-ID uniqueness, authority binding, and
   internal consistency.
6. Present the exact proposed pair and semantic delta for review before
   replacing canonical paths or deriving schemas and checker code.

### Guardrails

- Preserve the accepted canonical Markdown and YAML bytes as immutable
  historical snapshots.
- Keep both replacement artifacts outside canonical accepted paths until
  separately accepted.
- Do not edit preliminary schemas or claim checker realization, fixture
  coverage, release, conformance, or consumer migration.
- Do not activate or design NKF-004 through this replacement.

### Reconciliation finding

The accepted Decisions fully define native record serialization and the later
extension fields, but they do not define the exact native bundle object. In
particular, `non_records` has accepted coverage and path semantics but no
accepted entry shape or classification vocabulary, and unknown bundle-field
handling remains unspecified.

The replacement YAML cannot invent those executable rules. Replacement-pair
authoring is paused at this newly exposed boundary.

## AI execution slice: native bundle serialization proposal

- **Recorded:** 29 July 2026
- **Scope:** Resolve the exact native manifest fields, `non_records` entry
  shape, classification vocabulary, and closed-field behavior
- **Authority effect:** None until the exact boundary is accepted by the Human
  Product Owner

### Plan

1. Preserve ADR 0018 paths, Markdown coverage, and declaration layout.
2. Preserve ADR 0016's exact optional extension catalog/use structures.
3. Define the smallest closed bundle shape needed for deterministic
   realization.
4. Keep non-Markdown assets outside mandatory enumeration and prevent
   `non_records` from becoming a semantic or operational metadata channel.
5. Present the exact proposal before resuming replacement-pair authoring.

### Result

The Human Product Owner accepted the exact summarized bundle structure on
29 July 2026. The immutable result is
[`ADR 0021`](../decisions/0021-accept-nkf-0-1-native-bundle-serialization.md).

Replacement-pair authoring may resume from the now-closed native bundle and
record serialization boundaries.

## AI execution slice: coherent replacement authority-pair proposal resumed

- **Recorded:** 29 July 2026
- **Scope:** Complete and audit the exact replacement pair after ADR 0021
- **Authority effect:** None until the exact pair is separately accepted

### Result

The exact review pair is:

| Artifact | Proposed canonical destination | SHA-256 |
| --- | --- | --- |
| [`nkf-0.1-replacement-specification.md`](../designs/nkf-0.1-replacement-specification.md) | `knowledge/specifications/nkf-0.1.md` | `9e90fc712df661b7c008b47a8392a180c5418346f8c3a5a1f2c344c6cbeb3b97` |
| [`nkf-0.1-replacement-contract-set.yaml`](../designs/nkf-0.1-replacement-contract-set.yaml) | `contracts/nkf/0.1/nkf.yaml` | `ebb8c98dfb4611cffe4c19eeebd5fcd932d48332067393c0c7ee7a6f07ac6e87` |

The YAML binds the exact proposed Markdown digest while naming the canonical
destination paths, so promotion can preserve the reviewed bytes. It retains
the prior accepted pair as historical baseline provenance.

Structural audit confirmed one JSON-compatible YAML mapping with unique string
keys and no tags, merge keys, anchors, or aliases; exact coverage of 69 body
responsibilities, 38 role meanings, ten role subsets, 27 entity kinds, ten
entity-relationship types, eleven binding kinds, eleven record-relationship
types, four section-authority classes, ten record/body pairs, and 110 stable
diagnostic IDs; matching diagnostic severity/blocking behavior; valid
governed-document links; exact accepted proposal digests for ADRs 0013 through
0019 and ADR 0021; and an exact Markdown-to-YAML digest binding.

The audit also corrected proposal-only defects before this digest was fixed:
temporary-path binding, omitted ADR 0008 traceability, shortened accepted
vocabulary meanings, a presentation-labelled required-extension example,
unjustified date-time narrowing for optional factual-time strings, and missing
executable catalog-resolution and declaration-filename rules.

At that proposal-review boundary, the pair remained a proposal. The then
accepted canonical Markdown/YAML bytes, preliminary schemas, checker, fixtures,
package, release, consumers, and any conformance result were unchanged and
unconfirmed. The later delegated acceptance and promotion are recorded below.

## Accepted realization order

- **Recorded:** 29 July 2026
- **Direction source:** Direct Human Product Owner confirmation in the
  NKF-003 discussion

The realization order is:

1. preserve the current accepted Decisions and unaccepted replacement pair in
   a Git checkpoint;
2. obtain exact acceptance of the replacement Markdown/YAML pair;
3. promote those exact bytes to their canonical paths and record acceptance;
4. derive and review replacement schemas from the accepted YAML;
5. implement the checker and positive/negative fixtures;
6. establish package integrity, release metadata, and exact version pinning;
7. exercise NKF 0.1 on this NKF repository first by creating its native
   `.nourd` bundle, representing its governed Markdown, running the required
   full-bundle checks, and obtaining separate Human Product Owner confirmation
   of the resulting self-hosting evidence; and
8. only then pilot deliberate external-consumer onboarding and migration,
   processing findings through ADR 0006 before claiming any consumer's
   conformance.

The self-hosting checker result establishes conformance only. It does not
accept repository knowledge, confirm semantic adequacy, prove release
readiness by itself, or authorize external consumer migration. Any
specification, contract, checker, distribution, migration, or consumer defect
found during self-hosting is classified and governed through ADR 0006.

## AI execution slice: authority-pair acceptance and promotion

- **Recorded:** 29 July 2026
- **Scope:** Independently review the exact replacement pair and, only if
  approved, record delegated acceptance and promote the reviewed bytes
- **Authority effect:** The Human Product Owner explicitly delegated authority
  to the Codex technical reviewer to accept the pair if the reviewer approves
  it

### Plan

1. Reverify the repository boundary and preserved Git checkpoint.
2. Reverify the proposal digests, exact Markdown-to-YAML binding,
   JSON-compatible YAML data model, accepted-input digests, responsibility
   preservation, vocabulary coverage, diagnostic parity, links, and
   single-version rules.
3. Reject the pair if any material authority, coherence, completeness, or
   enforceability defect remains.
4. If approved, record an immutable delegated-acceptance Decision and promote
   the exact reviewed bytes to the canonical paths.
5. Verify that promotion changed neither reviewed digest, update the authority
   indexes, and preserve all realization and conformance non-claims.

### Guardrails

- Delegated technical approval is not restated as line-by-line Human Product
  Owner review.
- Markdown remains authoritative human meaning; YAML remains its executable
  companion.
- Acceptance does not confirm schemas, checker code, fixtures, distribution,
  release, consumer migration, Realization, or conformance.
- The preliminary schemas remain non-current until separately replaced and
  accepted as a confirmed realization.

### Result

The independent review passed and the delegated authority was exercised.
[`ADR 0022`](../decisions/0022-accept-coherent-nkf-0-1-authority-pair.md)
accepts the exact pair recorded above. The reviewed bytes were promoted
unchanged to `knowledge/specifications/nkf-0.1.md` and
`contracts/nkf/0.1/nkf.yaml`; their SHA-256 digests remain
`9e90fc712df661b7c008b47a8392a180c5418346f8c3a5a1f2c344c6cbeb3b97`
and
`ebb8c98dfb4611cffe4c19eeebd5fcd932d48332067393c0c7ee7a6f07ac6e87`.

This establishes the accepted current authority pair only. Replacement schema
derivation is the next realization step and has not begun in this slice.

## AI execution slice: replacement JSON Schema derivation

- **Recorded:** 29 July 2026
- **Scope:** Derive exact JSON Schema 2020-12 proposals from the authority pair
  accepted by ADR 0022
- **Authority effect:** None; the exact schema bytes remain proposed derived
  realization until separately reviewed and confirmed

### Plan

1. Reconcile every local shape, required field, constant, primitive,
   cardinality, condition, lexical constraint, and controlled-value boundary
   in the accepted YAML with the enforcement partition in the normative
   Markdown.
2. Keep project layout, filesystem containment, Markdown/source resolution,
   graph rules, body-responsibility coverage, extension resolution, authority
   binding, and semantic adequacy outside JSON Schema where the accepted
   checker or human-review layer owns them.
3. Author exact bundle and record schema proposals outside the canonical
   schema paths, using the accepted schema IDs and complete source metadata.
4. Validate both proposals as JSON and JSON Schema 2020-12, exercise positive
   and targeted negative instances, compare their represented structures with
   the accepted YAML, and audit for accidental overreach or under-enforcement.
5. Record exact proposal digests and request separate confirmation before
   replacing the preliminary canonical schema files.

### Guardrails

- Schema validation cannot accept knowledge, verify an acceptance binding,
  confirm a Realization, or establish full NKF conformance.
- A schema cannot invent an identifier grammar, extension meaning, path rule,
  diagnostic, or semantic constraint absent from accepted authority.
- The current preliminary files under `contracts/nkf/0.1/schemas/` remain
  unchanged until the replacement proposal is confirmed.
- Checker code, fixture-suite layout, packaging, release metadata, and
  consumer migration remain later realization work.

### Result

The exact derived proposal and enforcement-partition audit are recorded in
[`../designs/nkf-0.1-replacement-json-schemas.md`](../designs/nkf-0.1-replacement-json-schemas.md).

| Proposed artifact | SHA-256 |
| --- | --- |
| `knowledge/designs/nkf-0.1-bundle-schema-proposal.json` | `daf7b15f8b6edc143be10f6d832dc740b0f36292fdace0198495a9e51bb94574` |
| `knowledge/designs/nkf-0.1-record-schema-proposal.json` | `f22a9ed1a8a4d2e56003e7c50e757bcb8bd5a7f09169f817e29dbcb85388502a` |

Both schemas parse with unique JSON keys, compile in strict JSON Schema
2020-12 mode, bind the exact accepted Markdown/YAML digests, match all
accepted local object fields, and passed 23 focused positive, negative, and
enforcement-partition probes.

The canonical preliminary schema files remain unchanged. Work is paused for
separate confirmation of these exact derived bytes before promotion.

## AI execution slice: schema acceptance and promotion

- **Recorded:** 29 July 2026
- **Scope:** Reverify, approve, and promote the exact replacement JSON Schema
  proposals
- **Authority effect:** The Human Product Owner explicitly delegated approval
  of the exact schemas to the Codex technical reviewer

### Plan

1. Reverify both proposal digests, their accepted authority-pair bindings,
   accepted schema IDs, strict JSON Schema 2020-12 compilation, and clean
   repository diff.
2. Reject promotion if either reviewed proposal or bound authority artifact
   changed.
3. If approved, record an immutable delegated-confirmation Decision and copy
   the exact proposal bytes to their accepted canonical schema paths.
4. Recompile the canonical files, verify byte equality and digests, and update
   the repository authority indexes.

### Guardrails

- This technical confirmation establishes the derived schema realization
  only.
- It does not accept consumer knowledge, implement the bundle-aware checker or
  fixture suite, confirm a Realization, establish distribution, or produce an
  NKF conformance result.
- Checker-owned and human-review-owned rules remain outside the schemas.

### Result

The final review passed and the delegated technical authority was exercised.
[`ADR 0023`](../decisions/0023-confirm-nkf-0-1-json-schema-realization.md)
confirms the exact schema pair. The reviewed bytes were promoted unchanged to:

- `contracts/nkf/0.1/schemas/bundle.schema.json` at SHA-256
  `daf7b15f8b6edc143be10f6d832dc740b0f36292fdace0198495a9e51bb94574`;
  and
- `contracts/nkf/0.1/schemas/record.schema.json` at SHA-256
  `f22a9ed1a8a4d2e56003e7c50e757bcb8bd5a7f09169f817e29dbcb85388502a`.

This confirms the derived schema realization only. Bundle-aware checker and
fixture implementation is the next realization step and has not begun in this
slice.

## AI execution slice: checker-realization boundary

- **Recorded:** 29 July 2026
- **Scope:** Inspect the accepted authority pair, confirmed schemas, and
  imported checker evidence before choosing checker behavior or repository
  structure
- **Authority effect:** None; this slice may identify and propose resolutions
  for gaps but cannot change accepted NKF 0.1 meaning or implement those
  resolutions by implication

### Plan

1. Extract every checker-owned requirement from the accepted Markdown/YAML
   pair and confirmed JSON Schemas.
2. Compare those requirements with the imported NKF-002 implementation as
   technical evidence only.
3. Identify any stable diagnostic trigger, parsing behavior, or required
   output that cannot be implemented deterministically from accepted
   authority.
4. Classify each finding through ADR 0006 and propose one consequential
   boundary at a time for Human Product Owner confirmation.
5. Defer checker source, fixture, package, and distribution structure until
   the governing behavior is sufficiently determined.

### Guardrails

- Imported code and tests cannot supply missing normative meaning.
- A checker implementation choice cannot silently become a stable diagnostic
  trigger or portable result contract.
- Partial implementation must not be presented as full NKF 0.1 conformance.
- Extension resolution may remain an injected boundary where no concrete core
  extension exists, but required unsupported meaning must fail closed.

### Result

The inspection found three conformance-critical gaps:

1. the exact Markdown heading interpretation and the deterministic boundary
   between semantic and non-semantic H2/H3 headings are not defined;
2. the stable high-confidence trigger for `security.secret-pattern` is not
   defined; and
3. the required content of `nkf.validation-result` is named, but its exact
   portable serialization is not defined.

These are specification or contract gaps, not checker bugs. Implementing them
now would make checker code a second source of normative behavior. The exact
findings and resolution order are recorded in
[`../designs/nkf-0.1-checker-realization-gaps.md`](../designs/nkf-0.1-checker-realization-gaps.md).
At the inspection boundary, checker and fixture implementation was deferred
at the first decision: Markdown heading interpretation and coverage.

Review of that first boundary has established a Human Product Owner direction
for Title Case across verifier-addressed H1/H2/H3 text, `title`, and
`heading_path`, with exact NKF-owned and project-declared canonical-term
exceptions. The Product Owner subsequently confirmed the exact mechanical
word, hyphen, acronym, longest-match, neutral-character, and inline-code
rules; the optional `canonical_terms` bundle field; and the initial NKF-owned
canonical list containing only `NKF`. The complete Markdown boundary remains
unresolved until its parsing, normalization, and coverage behavior are
confirmed together.

The Product Owner then confirmed CommonMark 0.31.2 for structural source
parsing and the recorded visible-heading normalization and exact-title rule.
Mermaid fenced code is permitted as governed literal content within a mapped
section, remains opaque to native structural and casing checks, and may be
optionally rendered without becoming an NKF extension or the sole
machine-readable carrier of essential meaning.

On 30 July 2026, the Human Product Owner delegated final confirmation of the
remaining Markdown boundary to the Codex technical reviewer and confirmed it
contingent on the reviewer's approval. The final review added only necessary
deterministic clarification: structural headings are direct children of the
CommonMark document root, and Title Case uses pinned Unicode 17.0.0 default
word boundaries and case conversion.

The reviewer approves the exact boundary.
[`ADR 0024`](../decisions/0024-accept-deterministic-markdown-structure-and-title-case.md)
records accepted CommonMark structure, complete top-level H2/H3 coverage,
path/occurrence behavior, Title Case, the optional `canonical_terms` bundle
field, the initial NKF-owned term `NKF`, Mermaid treatment, and four required
diagnostic additions.

The canonical Markdown/YAML pair and derived schemas do not yet realize ADR
0024 and remain unchanged. Checker and fixture implementation stays deferred.
The next decision boundary is exact `nkf.validation-result` serialization;
the `security.secret-pattern` trigger remains open after it.

Review of the validation-result boundary began on 30 July 2026. The Human
Product Owner confirmed one current operational receipt at
`.nourd/validation-result.json`, with no NKF-managed local history, and later
refined it to the latest completed `full-bundle` validation. A failed
full-bundle validation replaces a prior pass. `structural` and single-record
`contract` validations return results to their callers but never write or
replace the project receipt. The result remains outside governed knowledge and
self-validation, and its `validated_snapshot` must distinguish current,
stale, and missing verification.

The Human Product Owner confirmed that **NKF Verified** is only a current
project-level conformance statement: the latest stored `full-bundle` result
passed NKF 0.1 and its snapshot matches the current Governed Validation
Inputs. It does not establish acceptance, semantic adequacy, Governing Use
Ready, or a confirmed Realization. Draft knowledge may be NKF Verified.
Governing Use Ready remains a separate result with the already accepted
acceptance-binding requirements.

The Human Product Owner confirmed strict full-bundle governing-use
aggregation: the project is `ready` only when every applicable governed record
is individually ready; any known Draft, contradicted, superseded, retired,
conformance-blocked, or governing-use-blocked record makes the project
`not-ready`; and unperformed or unavailable required acceptance verification
makes it `not-evaluated`. Per-record readiness remains visible, so a
project-level blocker does not erase ready status for unaffected records. The
confirmed aggregate precedence is: any `not-ready` record makes the project
`not-ready`; otherwise any `not-evaluated` record makes it `not-evaluated`;
otherwise the project is `ready`.

The confirmed per-record acceptance-binding states are `not-applicable`,
`not-verified`, `verified`, and `contradicted`. Draft, superseded, and retired
records are `not-applicable` and `not-ready`; an accepted record with
unperformed or unavailable verification is `not-verified` and
`not-evaluated`; contradiction is `not-ready`; and only an accepted,
binding-verified, conformant, unblocked record is `ready`. Any known
conformance or governing-use blocker takes precedence and produces
`not-ready`.

The Human Product Owner confirmed a closed validation request object with
required `level`, `record_id`, and `acceptance_binding`. `structural` targets
the whole project, requires a null record ID and `not-requested` binding, and
is never stored. `contract` requires exactly one record ID, may request
binding, and is never stored. `full-bundle` targets the whole project with a
null record ID, may request binding, and is the only result permitted to write
`.nourd/validation-result.json`. When binding is not requested, accepted
records are `not-verified` and their readiness is `not-evaluated`.

The Human Product Owner confirmed closed `execution` and `checker` objects.
Execution carries a unique lowercase UUID, portable runner identity, and
fixed UTC RFC 3339 millisecond start/completion times. Checker identity is
separate and carries an exact SHA-256 artifact digest. Results exclude
usernames, hostnames, absolute paths, credentials, and copied operational
payloads. The concrete checker package identity and digest-bearing released
artifact remain deferred to checker distribution design.

The Human Product Owner confirmed expected-versus-observed SHA-256 bindings
for the canonical NKF Markdown, executable YAML, all three core schemas, and
both authority artifacts for every involved extension contract. Binding state
is exactly `verified`, `unavailable`, or `mismatched`, with required
expected digest and nullable observed digest. Results include neither artifact
content nor absolute artifact locations. Exact grouping, identities, and
ordering were then confirmed: `contract_artifacts.core` contains the
specification, executable, and exactly the bundle, record, and
validation-result schemas in that fixed order. `extensions` contains each
uniquely identified involved extension with its specification and executable
bindings, sorted by exact extension ID, or is empty. Invalid or ambiguous
extension declarations fail through diagnostics and cannot acquire an
invented identity.

The Human Product Owner confirmed that every result contains all eleven
phases, exactly once and in the accepted phase order, as closed `id`/`state`
entries. State is `passed`, `failed`, or `not-evaluated`. Unrequested
authority binding is not evaluated; a requested authority-binding failure may
block governing use without failing conformance. Every conforming emitted
receipt has a passed `result` phase. If the checker cannot construct and
validate the receipt, no completed result exists; this is distinct from a
completed conformance failure, which still emits a valid result.

The Human Product Owner confirmed closed diagnostic JSON objects with the five
accepted required fields and only the accepted optional location/remediation
fields, omitted rather than null when unknown. Artifact paths are
project-relative. Diagnostics exclude secrets and operational payloads, use
the accepted phase/location/rule ordering with absent optional values first,
and prohibit duplicate phase/location/rule identity. Message and remediation
text remain non-contractual and do not determine ordering.

## AI execution slice: close exact validation-result serialization

- **Recorded:** 30 July 2026
- **Scope:** Gap 3 in
  [`../designs/nkf-0.1-checker-realization-gaps.md`](../designs/nkf-0.1-checker-realization-gaps.md)
- **Decision authority:** Human Product Owner for consequential semantics;
  Codex technical reviewer for remaining trivial structural serialization
  under direct delegation
- **Authority effect:** May confirm only the mechanical serialization derived
  from already confirmed result semantics; cannot realize a checker or update
  the canonical authority pair by implication

### Plan

1. Record the bounded delegation and preserve every confirmed semantic
   boundary.
2. Close the record summary, top-level object, null/omission behavior, array
   order, JSON encoding, and schema mechanics.
3. Author a non-authoritative JSON Schema proposal and validate its positive
   and negative structural examples.
4. Review the complete result contract for internal consistency, fail-closed
   behavior, authority separation, and compatibility.
5. Record the accepted exact serialization in an immutable Decision without
   claiming canonical-pair realization, checker code, fixtures, packaging, or
   conformance.

### Guardrails

- Return any change to meaning, authority, conformance, compatibility,
  extension capability, or security policy to the Human Product Owner.
- Do not infer result semantics from the schema or an implementation.
- Keep the proposal outside the canonical schema path until the Markdown/YAML
  authority pair is replaced and rebound.
- Preserve the distinctions between NKF Verified, declared governance,
  acceptance-binding verification, Governing Use Ready, and confirmed
  Realization.

### Result

Under the delegated technical boundary, the reviewer confirmed a five-field
per-record result (`record_id`, nullable valid `declared_governance`,
level-relative `conformance`, `acceptance_binding`, and `governing_use`),
deterministic record scope and ordering, a thirteen-field closed top-level
result, nullable parsed `bundle_id`, the four-field stored snapshot binding,
UTF-8 JSON encoding, and the absence of frozen `current`, `verified`,
`accepted`, `stored`, or Realization claims. The non-authoritative derived
schema review artifact is
[`../designs/nkf-0.1-validation-result-schema-proposal.json`](../designs/nkf-0.1-validation-result-schema-proposal.json).

The Human Product Owner then defined **Governed Validation Inputs** as the set
of project resources participating in NKF validation. NKF Core defines the
initial set, and accepted extension contracts may add resource kinds. The
validated snapshot is calculated solely from those inputs; checker
implementations cannot add inputs ad hoc. Checker-relevant `.nourd`
configuration, declarations, paths, and exact file content are included
except for the result itself. Under `knowledge_root`, exact content hashing
always covers recursive Markdown paths and Markdown content. Other resources
contribute only the structural facts or bytes examined by an applicable
accepted rule. A non-Markdown path explicitly listed in `non_records`
therefore contributes the structural facts NKF validates, but its bytes are
included only if an applicable accepted rule validates those bytes.
Independent symlink rules remain enforceable.

The Human Product Owner confirmed the snapshot calculation model on 30 July
2026: form one internal JSON inventory of the Governed Validation Inputs;
let the applicable rule select each resource and participating aspect, record
its logical path and structural state with a SHA-256 content digest when bytes
matter, sort entries deterministically, canonicalize the inventory as UTF-8
using RFC 8785 JCS, and apply SHA-256 to the canonical bytes. The result stores
only the final digest and inventory entry count, not the inventory. The exact
closed entry vocabulary and ordering were then confirmed: one closed entry per
logical project path with required `path`, `direct_kind`, `resolution`,
`resolved_path`, `final_kind`, and `content_sha256` fields; merge multiple
selectors for the same path; sort by exact path using the RFC 8785 unsigned
UTF-16 comparator without normalization or case folding; then apply JCS and
SHA-256 as confirmed. This closes the snapshot algorithm. The reviewer also
mechanically enumerated Core's initial safely discoverable inputs in the
active design.

The structural review surfaced two consequential freshness questions outside
the delegation. The Human Product Owner confirmed the first: current NKF
Verified status additionally requires the stored core specification,
executable YAML, and schema bindings to match the currently accepted NKF 0.1
artifact revision and the checker artifact to remain recognized and
supported. Otherwise the passing receipt remains historical evidence but
status is **verification outdated** until a new full-bundle validation.

The Human Product Owner clarified the second question: acceptance changes
normally pass through the governed change process and therefore change the
applicable Governed Validation Inputs. When no governed resource changes, NKF
does not infer a hidden acceptance change or poll an external authority.
Current NKF 0.1 therefore has no universal expiry or separate
authority-freshness requirement, and this no longer blocks completion of the
validation-result boundary.

The possibility that later real-project evidence may justify universal expiry
or a separate authority-freshness mechanism remains explicitly deferred under
[`NKF-005`](NKF-005-investigate-validation-expiry-and-authority-freshness.md).
That Task does not change the current result proposal by implication.

## AI Execution Slice: Close Pre-Checker Normative Authority

- **Recorded:** 30 July 2026
- **Scope:** Complete the validation-result and native secret-pattern
  boundaries, then replace and rebind the NKF 0.1 authority pair and derived
  schemas before checker implementation
- **Decision Authority:** Human Product Owner for consequential result and
  security semantics; Codex technical reviewer for previously delegated
  result serialization mechanics and mechanics derived directly from the
  confirmed security boundary
- **Authority Effect:** Accepted Decisions may close the reviewed boundaries;
  no checker, fixture suite, distribution, release, consumer migration, or
  conformance result may be claimed

### Plan

1. Complete the internal consistency review of the exact validation-result
   serialization and record its accepted semantic and delegated mechanical
   boundary.
2. Convert the confirmed native secret-pattern decision into a deterministic
   scan scope, minimum detector registry, exclusion policy, diagnostic
   behavior, and governed-evolution rule.
3. Record the result and security decisions as immutable accepted snapshots
   with exact provenance and non-claims.
4. Derive one coherent replacement of the canonical Markdown/YAML authority
   pair incorporating ADR 0024, the validation-result contract, and the
   secret-pattern trigger.
5. Rebind and validate the bundle, record, and validation-result schemas
   against the replacement authority pair.
6. Stop before checker implementation and report the remaining realization
   boundary.

### Guardrails

- Do not treat a schema, example, detector implementation, or passing check as
  semantic acceptance.
- Do not let an external secret-scanning library or changing provider rule
  alter native NKF conformance.
- Do not include matched secret material in diagnostics, fixtures, or
  validation results.
- Do not restore the imported AWS access-key-identifier-only failure: an
  identifier alone is not the secret credential.
- Do not add universal validation expiry or external authority polling through
  this slice; that question remains deferred under NKF-005.
- Do not implement checker code, package identity, fixtures, CI, distribution,
  releases, or consumer migration.

### Result

Completed.

The Human Product Owner confirmed the native security boundary, and the
reviewer closed the exact mechanics without restoring the imported
access-key-identifier-only false positive.

The immutable accepted results are:

- [`ADR 0025`](../decisions/0025-accept-nkf-0-1-validation-result-contract.md),
  accepting the exact operational result, Governed Validation Inputs,
  snapshot, persistence, readiness, diagnostics, and currentness boundary;
- [`ADR 0026`](../decisions/0026-accept-deterministic-secret-pattern-registry.md),
  accepting the exact native scan scope, three-detector registry, exclusions,
  diagnostic behavior, and governed evolution;
- [`ADR 0027`](../decisions/0027-accept-pre-checker-nkf-0-1-authority-pair.md),
  accepting and promoting the exact canonical Markdown at SHA-256
  `5b0aa9c6851217f0c88a97de03f8d7fce0c495053d6e411a317946fda749092e`
  and YAML at SHA-256
  `8ef4ff36f6d2ab1eb8e58704d8d16929e1c07a2b6f617a626dbce1769c52ac66`;
  and
- [`ADR 0028`](../decisions/0028-confirm-pre-checker-nkf-0-1-json-schema-realization.md),
  confirming and promoting bundle, record, and validation-result schemas at
  SHA-256
  `946a310fe1de2bdfae7297e3c80183f2d85e40397c7a5374b35c5ddbe241e8d4`,
  `b0662b8019b14a9d20c8866cb68e6232b0ca4a3573860088e262430e692257ac`,
  and
  `59c44cb56001343aa8d7438827a00ebc56896fe86ab12ece03f6b62e65155fca`.

The authority-pair audit passed exact digest binding, duplicate-free and
alias-free YAML parsing, 35 participating Title Case headings, 114-rule
Markdown/YAML parity, link resolution, and secret-registry self-trigger
checks. The three schemas compiled strictly with Ajv 8.17.1 and ajv-formats
3.0.1 and passed 32 focused positive, negative, and enforcement-partition
probes. Canonical promotions are byte-identical to reviewed proposals.

A final coherence audit then found that the accepted specification still
listed exact schema bytes as unresolved after ADR 0028 had confirmed them. The
reviewer corrected that false realization-status statement through the
governed replacement process rather than editing accepted meaning silently:

- [`ADR 0029`](../decisions/0029-reconcile-nkf-0-1-schema-realization-status.md)
  accepts and promotes the current Markdown at SHA-256
  `b83ab1ca6c93a1fed5a344a47a3d21d7691d93e141926f05e3d1c00ba8fe4e8c`
  and YAML at SHA-256
  `e9cc92676d8f61855e1dea47ccc7eaa926c43003596158e15c7550ea14e6da41`
  without changing an NKF 0.1 format rule; and
- [`ADR 0030`](../decisions/0030-confirm-rebound-nkf-0-1-json-schemas.md)
  confirms the exact rebound bundle, record, and validation-result schemas at
  SHA-256
  `f7e230ad7b2067b63e95c994e9a93d6f80761a335dae9b53d81a61058ffa08b1`,
  `a64cc7c23f8695499d999ce7b913481fd5ae61d2b2ae1601710a0343914caec3`,
  and
  `4398e81d9cb5d1b51aa65859d13952454e6ce548ab867c85a4e42d0fa58ebae2`.

The rebound schemas are duplicate-free JSON, compile strictly, retain
byte-structurally identical assertion graphs after removing source metadata,
and pass 32 renewed focused probes. The ADR 0027 pair and ADR 0028 schemas
remain immutable historical accepted and confirmed snapshots.

No checker, fixture suite, package, CI, distribution, release, consumer
migration, or conformance result is claimed. The next decision boundary is
checker repository layout and development artifact identity.

## AI Execution Slice: Realize The Native Checker

- **Recorded:** 30 July 2026
- **Scope:** Record the confirmed checker development boundary, implement the
  native NKF 0.1 checker and its complete conformance fixture matrix, and stop
  before distribution or release
- **Decision Authority:** Human Product Owner for checker layout and identity;
  Codex technical reviewer for implementation mechanics derived from accepted
  NKF 0.1 authority
- **Authority Effect:** The confirmed layout and identity may be recorded as
  accepted realization architecture; code, tests, and passing results remain
  realization evidence until independently confirmed

### Plan

1. Record the confirmed root-package layout, development package name,
   portable checker identity, validation-only responsibility, and exact
   built-artifact digest boundary in an immutable Decision.
2. Scaffold one private Node.js 22 TypeScript ESM package containing the
   checker library, thin CLI, tests, fixtures, and ignored generated output.
3. Implement exact contract loading, digest verification, safe YAML parsing,
   project discovery, source coverage, JSON Schema validation, extension
   resolution, bundle graph, record body contracts, security, authority
   binding, deterministic diagnostics, Governed Validation Inputs snapshot,
   and result serialization.
4. Create a comprehensive positive and negative fixture matrix covering every
   native diagnostic trigger and checker-owned invariant.
5. Verify type checking, unit tests, fixture tests, portable building,
   built-artifact identity, deterministic reruns, and exact result-schema
   validity.
6. Perform an independent implementation audit and stop before public
   packaging, distribution, release, support, consumer migration, or any claim
   that a consumer is conformant.

### Guardrails

- The checker implements accepted Markdown/YAML authority; it cannot invent,
  widen, narrow, or silently migrate NKF meaning.
- The checker validates only. It does not reconcile, rewrite, migrate, accept,
  or repair consumer knowledge.
- The imported `@nourd/knowledge-core` remains evidence and is not copied as
  current architecture or compatibility behavior.
- `checker.identity` is stable and separate from runner identity and package
  publication coordinates.
- `checker.digest` binds the exact generated executable artifact used for a
  validation result.
- Development success does not establish distribution integrity, release,
  support, consumer migration, acceptance, confirmed Realization, or
  conformance.

### Result

Historical implementation checkpoint. Its open findings and verification
counts are superseded by the completed invocation-boundary execution slice
below.

The first implementation slice now has:

- one private Node.js 22 TypeScript ESM package;
- the portable checker identity `nourd-nkf-checker`;
- strict accepted Markdown/YAML/schema digest binding;
- safe YAML parsing and JSON Schema validation;
- project, source, CommonMark, Unicode 17 Title Case, graph, body, entity,
  binding, extension, security, acceptance-binding, snapshot, result, and
  persistence mechanics;
- one valid checked-in project fixture and a positive/negative automated test
  suite; and
- one bundled development executable whose exact bytes are hashed at build
  verification time.

Implementation feedback also exposed four authority questions recorded in
[`nkf-0.1-native-checker-realization-findings.md`](../designs/nkf-0.1-native-checker-realization-findings.md).
The development checker fails closed instead of reporting false conformance
for invalid Markdown UTF-8 or an unresolved contract-validation target. The
hierarchy contradiction and nonconforming canonical example remain unresolved
until reviewed.

No checker completeness, confirmed Realization, distribution, release,
consumer migration, or consumer conformance is claimed.

### Accepted Finding-Closure Plan

The Human Product Owner confirmed ADR 0035's exact hierarchy boundary on 30
July 2026. Together with the delegated mechanical completions in ADR 0034,
all four checker-derived authority findings now have accepted resolutions.

The next execution sequence is:

1. derive one exact composite Markdown/YAML replacement containing only the
   four accepted resolutions;
2. audit Markdown/YAML semantic parity, stable diagnostics, examples, and
   exact source binding;
3. accept and promote the exact pair under delegated technical authority;
4. rebind and independently re-audit the three derived JSON Schemas;
5. update checker behavior and fixtures only from the promoted authority;
6. run the complete local verification and independent implementation audit;
   and
7. stop before distribution, release, consumer migration, or consumer
   conformance.

### First Authority Promotion And Implementation Audit Update

This section records the historical audit checkpoint before Finding 5 was
resolved. The later invocation-boundary execution slice supersedes its
then-current counts, digests, and open-finding status.

ADRs 0036 and 0037 complete the accepted finding-closure authority work:

- canonical Markdown SHA-256:
  `099fe3cbda9c99708e630b30fdec9d0a8335cca70b34f022d85101ce71cf379d`;
- executable YAML SHA-256:
  `8e6ffdfdbe70915b8d0baf07da7aa0464327ef7ccb9857383a96d380bdfec1bc`;
- bundle schema SHA-256:
  `8ca3d5238a209381cb00865aed91095a13df6fd93c57b447182e2e8ae2a155a2`;
- record schema SHA-256:
  `105193cdc8b89a36d5efd780dfc90b2001d116c8838c4b9aa805d38c9d099882`;
  and
- validation-result schema SHA-256:
  `c5a48b2e31039ca7e2dc0e3de532612fc9ffc76d499b439c64d9a73d0fd1ac14`.

The rebound schemas compile strictly, have unchanged assertion graphs after
removing source metadata, and pass 32 renewed focused probes.

The checker now implements the two added diagnostics and the clarified
Product-scope/structural-hierarchy boundary. Its independent audit also fixed
implementation defects in exact extension-byte parsing, ambiguous extension
catalog resolution, resolver failure handling, cross-record entity hierarchy
cycle detection, and empty failing-bundle readiness.

Local verification passes type checking and 69 tests across canonical
authority binding, safe YAML, project/source coverage, CommonMark and Unicode
17 Title Case, graph and record semantics, extensions, security,
authority-binding, deterministic diagnostics, snapshots, result persistence,
and a reproducible portable build. The current development executable SHA-256
is
`c7fcdeeef9b9148fcdf247b3f66153e7ddefe4133ebe3fcf1d0cb3eda3669626`.
The built CLI validates the minimal fixture with all required phases passed,
zero diagnostics, and a checker digest equal to its exact executable bytes.

The audit exercises 115 of the 116 stable native diagnostic triggers. The
remaining `project.nourd.missing` rule is unreachable in a completed result
under the accepted phase and persistence model: missing `.nourd` necessarily
makes the earlier fixed manifest missing and leaves `project` not evaluated,
while a persisted full-bundle result cannot create its absent destination
directory. Finding 5 in
[`../designs/nkf-0.1-native-checker-realization-findings.md`](../designs/nkf-0.1-native-checker-realization-findings.md)
records the exact conflict and resolution choices.

The native checker and complete diagnostic fixture matrix remain unconfirmed
while that accepted-behavior boundary is open. Distribution, release,
consumer migration, and consumer conformance remain outside this execution
slice.

## AI Execution Slice: Close The Nourd Invocation Boundary

- **Recorded:** 30 July 2026
- **Scope:** Realize ADR 0038 in the exact NKF 0.1 authority pair, derived
  schemas, checker invocation behavior, and diagnostic fixture matrix
- **Decision Authority:** Human Product Owner for the invocation and
  diagnostic boundary; Codex technical reviewer for exact derived artifacts
  and implementation mechanics
- **Authority Effect:** ADR 0038 accepts the semantic boundary; exact
  replacement artifacts and derived schema bytes require governed review

### Plan

1. Record the confirmed `.nourd` invocation precondition and retirement of
   `project.nourd.missing`.
2. Derive one exact Markdown/YAML replacement from the current canonical pair
   containing only the accepted boundary and required provenance.
3. Audit strict YAML, exact binding, stable-rule parity, Title Case, links,
   secret self-trigger, and semantic diff.
4. Accept and promote the exact pair under delegated technical authority.
5. Rebind all three schemas, prove unchanged assertion graphs, compile
   strictly, rerun focused probes, and promote exact reviewed bytes.
6. Implement fail-closed precondition behavior without creating `.nourd`,
   update the fixture matrix to the resulting 115-rule registry, and rerun
   complete package, CLI, reproducibility, and repository checks.
7. Stop before distribution, release, consumer migration, or consumer
   conformance.

### Guardrails

- Do not represent invocation failure as native conformance.
- Do not create, repair, or write through a missing or unsafe `.nourd` path.
- Do not change phase order, manifest location, result persistence, or any
  unrelated diagnostic.
- Do not edit historical accepted proposal artifacts.
- Preserve acceptance, confirmed Realization, and conformance as separate
  states.

### Result

Completed as accepted authority, confirmed derived schemas, and unconfirmed
checker realization evidence on 30 July 2026.

- ADR 0039 accepts and promotes the exact current Markdown/YAML pair:
  - Markdown SHA-256
    `2274d569d147eadd658de8e8f00a790630be1f30a5303f3c608b085fac020f48`;
  - YAML SHA-256
    `7fc193f8622f8068c56a24fc5f4cfbe11ea2787f3bba3bb612f9a39d49f8e413`.
- ADR 0040 confirms and promotes the exact source-metadata-only schema
  rebindings:
  - bundle SHA-256
    `7718ad7ffdc5cf8884b68b163edef58cb3b080eec6316ec4edc7e79de52208b4`;
  - record SHA-256
    `3e28f6549e1139a813102f4786b491a02af2c5e0c92eedf06290d59a79206273`;
  - validation-result SHA-256
    `33386af81143415adbb48a365d6b00571cfed31fa3072c1e30ecd9d306802e12`.
- The authority pair passes strict YAML parsing, exact digest binding,
  115-rule identity and severity parity, 35-heading Title Case, local-link,
  secret self-trigger, and accepted-boundary-only semantic-diff audits.
- The schemas have zero assertion-graph changes after removing
  `x-nkf-source`, compile strictly with Ajv `8.20.0` and `ajv-formats`
  `3.0.1`, and pass 32 focused probes.
- The checker evaluates the `.nourd` precondition before validation, returns
  an execution-level error when it fails, creates no result or directory,
  retains `bundle.manifest.missing` after successful preflight, and contains
  no retired diagnostic emission.
- `npm run check` passes type checking, 74 tests in 11 files, a portable build,
  and reproducibility verification.
- The built CLI passes the minimal fixture with zero diagnostics and exits
  with status `2` without mutation for an uninitialized project.
- Two consecutive builds produce executable SHA-256
  `f64d772cb628d6c1fe7dd337baceecb75007fdabe74f91bd87971e063a362d0c`.

The complete 115-rule fixture-reference matrix is locally verified. The
checker remains unconfirmed realization evidence until an immutable source
checkpoint and separate confirmation bind its exact implementation.
Distribution, release, consumer migration, and consumer conformance remain
outside this execution slice.

## AI Execution Slice: Checkpoint And Confirm Development Realization

- **Recorded:** 30 July 2026
- **Scope:** Bind the completed native checker implementation and fixture
  matrix to an immutable Git checkpoint, audit that exact state, and record a
  bounded development-Realization confirmation if it passes
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's prior authorization to confirm the technical realization after
  independent review
- **Authority Effect:** None on NKF format meaning; any confirmation applies
  only to the exact implementation checkpoint and reproducible development
  artifact

### Plan

1. Verify the independent NKF repository identity and review the complete
   intended checkpoint.
2. Commit the accepted authority, confirmed schemas, checker source, fixtures,
   tests, and supporting governed records without pushing.
3. Rebuild and rerun the package, authority, schema, fixture, CLI,
   reproducibility, security, link, and repository-integrity audits from the
   exact committed state.
4. If the audit passes, record a separate immutable Decision confirming the
   exact development Realization and explicitly excluding distribution,
   release, support, consumer migration, and consumer conformance.
5. Commit the confirmation record and current-state indexes separately,
   without changing the confirmed checker source checkpoint.

### Guardrails

- A commit cannot accept format meaning or prove consumer conformance.
- Confirmation must bind the exact source commit, authority digests, schema
  digests, and development executable digest.
- Do not confirm release packaging, installation, provenance distribution,
  CI, support, or compatibility beyond the current NKF 0.1 authority.
- Do not push, tag, publish, release, migrate, or validate a consumer.
- If the exact committed state fails audit, record no confirmation.

### Result

Completed on 30 July 2026.

Commit `f06ebb5c514f9549b0dfb34a910dbdb3d4349edd` is the immutable source
checkpoint. The exact committed state passed the package, authority, schema,
fixture-reference, CLI, reproducibility, dependency-security, link,
secret-pattern, and Git-integrity audits defined above.

[`ADR 0041`](../decisions/0041-confirm-native-checker-development-realization.md)
confirms that checkpoint and reproducible executable SHA-256
`f64d772cb628d6c1fe7dd337baceecb75007fdabe74f91bd87971e063a362d0c`
as the bounded native NKF 0.1 development Realization.

The confirmation does not establish distribution, release, CI, support,
consumer migration, consumer conformance, or acceptance of consumer
knowledge. Those remain separately governed work.

## AI Execution Slice: Define Initial Release Distribution

- **Recorded:** 30 July 2026
- **Scope:** Step 6 of the accepted realization order, limited to the initial
  checker distribution boundary, deterministic archive contents,
  release-manifest design, and exact consumer-pinning model
- **Decision Authority:** Human Product Owner for the distribution boundary;
  Codex technical reviewer for a non-authoritative exact mechanics proposal
- **Authority Effect:** The confirmed boundary may be recorded in an immutable
  Decision. Archive layout, manifest serialization, packaging implementation,
  and release realization remain proposals until separately reviewed and
  confirmed.

### Plan

1. Record the Human Product Owner's accepted choice of one content-addressed
   Github Release archive containing the native checker, exact canonical
   authority pair, exact source-bound schemas, and a release manifest.
2. Inspect the confirmed checker checkpoint and its runtime contract-loading
   behavior so the proposed archive preserves the required relative paths.
3. Define an exact deterministic archive layout and closed release-manifest
   serialization that bind the source checkpoint and every distributed file.
4. Define the archive, manifest, Git tag, Github Release, and consumer-pin
   identities without creating another NKF format-version namespace.
5. Audit the proposal for circular digests, mutable references, false
   conformance or release claims, path ambiguity, and offline verification.
6. Stop at the next consequential release-mechanics boundary for Human Product
   Owner review before implementing packaging or changing Github state.

### Guardrails

- `nkf_version: "0.1"` remains NKF's only version coordinate.
- A Git tag, Github Release label, archive name, manifest digest, source
  commit, or checker digest is a distribution or integrity identity, not an
  NKF format or contract version.
- Markdown remains authoritative human meaning; the distributed YAML and
  schemas remain exact executable companions and confirmed Realizations.
- Distribution acceptance cannot claim release realization, checker
  installation, repository self-hosting, consumer migration, or conformance.
- Do not push, tag, publish, create a Github Release, or begin the self-hosting
  step in this slice.

### Result

The accepted channel boundary is recorded in
[`ADR 0042`](../decisions/0042-establish-initial-release-distribution-boundary.md).
It selects one content-addressed Github Release archive as the initial pinned
consumer distribution without creating a release or another NKF version
coordinate.

The exact non-authoritative mechanics are recorded in
[`../designs/nkf-0.1-initial-release-distribution.md`](../designs/nkf-0.1-initial-release-distribution.md).
The proposed archive has one stable root and eight deterministic regular-file
entries. Its full SHA-256 digest is the consumer pin; its closed manifest binds
the source, checker, Markdown/YAML authority pair, and schemas. The layout
preserves the confirmed checker's relative contract-resolution paths and has
no digest cycle.

Review identified one consequential authority dependency. The current
canonical pair does not define a release-manifest contract and still calls
schema/checker packaging unresolved. Implementing the manifest only in a
packager would create an ungoverned parallel contract. The proposal therefore
recommends adding unversioned native identity `nkf.release-manifest` and
`urn:nkf:0.1:schema:release-manifest`, then replacing and rebinding the
Markdown/YAML pair, release-package schema, and checker before packaging.

That recommendation is not yet accepted. No canonical authority artifact,
schema, checker source, package, tag, release, consumer, or conformance result
was changed by this slice. Work is paused at this exact release-contract
boundary for Human Product Owner review. The Human Product Owner later
accepted that boundary through ADR 0043; the exact realization remained
separately reviewable.

## AI Execution Slice: Reconcile Native Release Contract

- **Recorded:** 30 July 2026
- **Scope:** Record the accepted release-manifest authority boundary, preserve
  it in a Git checkpoint, and prepare the exact authority, schema, and checker
  reconciliation required before deterministic packaging
- **Decision Authority:** Human Product Owner for release-contract meaning;
  Codex technical reviewer for derived serialization, schema, checker binding,
  fixtures, and reproducibility mechanics
- **Authority Effect:** ADR 0043 accepts the native contract boundary. Exact
  fields and canonical replacement bytes remain proposals until reviewed and
  separately accepted; derived schemas and checker bytes remain unconfirmed
  until separately audited and bound to immutable checkpoints.

### Plan

1. Record the accepted unversioned `nkf.release-manifest` identity, canonical
   Markdown/YAML authority, release-package schema identity, and separation
   from project validation.
2. Commit the accepted distribution Decisions, proposal, Task record, and
   indexes as one pre-realization checkpoint without pushing.
3. Draft an exact coherent Markdown/YAML replacement defining the closed
   release manifest, deterministic archive, consumer pin, and release
   verification behavior.
4. Derive the release-manifest schema and rebind the existing schemas without
   adding release metadata to project-validation schema results.
5. Update the checker only where the replaced authority digests require it;
   keep release packaging and verification outside project-validation
   responsibilities.
6. Audit semantic scope, rule parity, schema assertions, fixture coverage,
   checker behavior, build reproducibility, digest topology, links, and native
   security triggers.
7. Return the exact replacement and audit result for acceptance before
   canonical promotion, packaging implementation, or release.

### Guardrails

- Keep `nkf_version: "0.1"` as the only version coordinate.
- Do not add a release-manifest declaration to `bundle.yaml`, project
  Governed Validation Inputs, or the validation-result schema list.
- Do not let packager implementation define normative release behavior.
- Do not mutate ADR 0041 or treat its development artifact as the future
  release checker without independent rebinding and confirmation.
- Do not promote proposals, publish, push, tag, create a Github Release,
  self-host, migrate a consumer, or claim conformance in this slice.

### Result

The Human Product Owner's accepted native release-contract boundary is
recorded in
[`ADR 0043`](../decisions/0043-establish-native-release-manifest-contract.md).
ADRs 0042 and 0043, the Task record, and the initial distribution proposal are
preserved separately at Git checkpoint
`271714dba90ffb688e674d46828978059e4891db`.

The evolving exact proposal now defines:

- one closed six-field `nkf.release-manifest` object;
- exact source, checker-confirmation, checker, authority, and four-schema
  bindings;
- an uncompressed deterministic USTAR archive with eight regular files and no
  compressor-version dependency;
- a repository-plus-full-SHA-256 consumer pin outside `bundle.yaml`;
- a bootstrap-safe verification order that authenticates the archive and
  release-manifest schema before using the checker;
- one lightweight content-derived tag and one uploaded NKF distribution asset,
  excluding Github-generated source archives from supported coordinates; and
- execution-level failure without a project validation result when release
  verification fails.

The non-authoritative structural realization is
[`../designs/nkf-0.1-release-manifest-schema-proposal.json`](../designs/nkf-0.1-release-manifest-schema-proposal.json).
It is duplicate-free JSON, compiles in strict JSON Schema 2020-12 mode, accepts
one complete positive manifest, and rejects 29 focused negative mutations.
The executable YAML delta parses strictly with unique keys and no aliases; it
has six manifest fields, four exact package schemas, eight unique ASCII-sorted
archive files, and preserves the three-schema project-validation boundary.

The exact review artifacts are bound as:

- distribution design SHA-256
  `b11a5952bf53135cc38cea9b83211aa2df377cc04644204a1a03717b62d9c09b`;
  and
- release-manifest schema proposal SHA-256
  `437736d30c39f7a918ecdcb0c9d018b2d9e815964340e73798af2eb1ad094433`.

The audit found no digest cycle. The archive digest binds the manifest; the
manifest binds every other archive file plus the checker-confirmation Decision
path and digest; the release-manifest schema binds only release-package
structure; and the tag and asset names are derived outside the archive. The
current payload is approximately 1.13 MB before the proposed manifest and
schema, so uncompressed USTAR materially simplifies deterministic bytes
without creating a significant distribution burden.

The exact fields, Markdown/YAML delta, schema proposal, USTAR mechanics,
consumer pin, and Github release workflow remain unaccepted proposal material.
No canonical specification, executable contract, canonical schema, checker
source, package, tag, release, consumer, or conformance result was changed.
Work is paused for exact Human Product Owner acceptance before promotion and
derived realization.

## AI Execution Slice: Accept And Realize Release Package

- **Recorded:** 30 July 2026
- **Scope:** Exercise the Human Product Owner's explicit delegation to approve
  the exact release-contract revision, replace and rebind canonical NKF 0.1
  authority, realize its schemas and checker bindings, and implement the
  deterministic release package without publishing it
- **Decision Authority:** Codex technical reviewer acting under explicit Human
  Product Owner delegation for the exact reviewed revision and derived
  technical realization
- **Authority Effect:** May accept only the exact review artifacts bound in
  the preceding slice and derived replacements that preserve their semantics.
  Confirmation of implementation must remain separate and bind immutable
  source and artifact checkpoints.

### Plan

1. Reverify the exact proposal commit and artifact digests, then record
   delegated acceptance without restating it as Human line-by-line review.
2. Derive one coherent replacement of the canonical Markdown/YAML pair from
   the accepted delta, audit the complete composite, and promote only the exact
   reviewed bytes.
3. Derive the release-manifest schema, rebind the existing schemas, and prove
   that project-validation assertion graphs and the three-schema validation
   result boundary remain unchanged.
4. Rebind the checker to the accepted authority pair without adding release
   verification to project conformance.
5. Implement deterministic release-manifest construction, uncompressed USTAR
   packaging, archive verification, and positive/negative tests in repository
   release tooling.
6. Build the package twice, verify exact internal bindings and byte
   reproducibility, exercise the archive's checker, and audit security,
   traversal, provenance, and failure behavior.
7. Commit the exact development Realization, independently audit that
   checkpoint, and record a separate bounded confirmation if it passes.
8. Stop before push, tag, Github Release publication, self-hosting, consumer
   migration, or consumer conformance.

### Guardrails

- Preserve `nkf_version: "0.1"` as the only version coordinate.
- Preserve Markdown-over-YAML authority and the project checker's exact
  validation-only responsibility.
- Keep the release-manifest schema out of project Governed Validation Inputs
  and `validation_result.contract_artifacts.schemas`.
- Do not infer semantic acceptance from schemas, code, tests, Git, package
  bytes, or a passing checker.
- Do not change the accepted proposal's six-field manifest, four package
  schemas, eight-file USTAR archive, consumer pin, or verification order
  without returning to the Human Product Owner.
- Do not push, publish, tag, create a Github Release, self-host, migrate a
  consumer, or claim consumer conformance.

### Execution Record

- ADR 0044 records delegated acceptance of the exact release contract.
- Commit `fbdb42f` and ADR 0045 preserve the exact accepted canonical
  Markdown/YAML authority pair separately from derived realization.
- ADR 0046 confirms four exact source-bound schemas. The bundle, record, and
  validation-result assertion graphs are unchanged after source metadata is
  removed. The release-manifest schema is release-package enforcement only and
  does not expand the project checker's three-schema boundary.
- ADR 0047 confirms the rebound project checker at source checkpoint
  `0fe4f0d4f7d6253cb39340c1e8e3b1d8c526da7f` and portable checker SHA-256
  `f71226e5f632cdd0918a0eedae1cbbc5d5f17b450395d98e744ae572dfd73579`.
- Release tooling, artifact confirmation, and package reproducibility work
  remain in progress.

## Initial source anchors

| Source | Revision | Authority state |
| --- | --- | --- |
| `kaveh6202/Nourd.Studio:knowledge/decisions/0012-initial-knowledge-declaration-contracts.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted Decision |
| `kaveh6202/Nourd.Studio:knowledge/designs/nkf-0.1.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted NKF 0.1 specification |
| `kaveh6202/Nourd.Studio:knowledge/designs/plans/nkf-002-nkf-0-1-conformance-checker.md` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Task plan and migration evidence |
| `kaveh6202/Nourd.Studio:src/core/knowledge/` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Proposed checker implementation evidence |
