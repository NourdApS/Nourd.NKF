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

The pair remains a proposal. The accepted canonical Markdown/YAML bytes,
preliminary schemas, checker, fixtures, package, release, consumers, and any
conformance result remain unchanged and unconfirmed.

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

## Initial source anchors

| Source | Revision | Authority state |
| --- | --- | --- |
| `kaveh6202/Nourd.Studio:knowledge/decisions/0012-initial-knowledge-declaration-contracts.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted Decision |
| `kaveh6202/Nourd.Studio:knowledge/designs/nkf-0.1.md` | `13a82fbc1b72c1350e9765f59d1538c375f3fa69` | Accepted NKF 0.1 specification |
| `kaveh6202/Nourd.Studio:knowledge/designs/plans/nkf-002-nkf-0-1-conformance-checker.md` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Task plan and migration evidence |
| `kaveh6202/Nourd.Studio:src/core/knowledge/` | `06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1` | Proposed checker implementation evidence |
