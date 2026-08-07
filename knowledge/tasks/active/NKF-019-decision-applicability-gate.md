---
title: "NKF-019: Establish The Decision Applicability Gate"
summary: Prevent conditional technology decisions from losing their conditions, negative findings, and unresolved unknowns in successor Tasks, and prevent lower-level validation evidence from being represented as higher-level outcome success.
created_at: 2026-08-06T21:23:12Z
task_id: NKF-019
task_status: active
---

# NKF-019: Establish The Decision Applicability Gate

- **Task:** `NKF-019`
- **Status:** Active
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Repository:** `kaveh6202/Nourd.NKF`
- **Related Tasks:** `NKF-005`, `NKF-016`, `NKF-017`

## Human Direction

On `2026-08-06T21:23:12Z`, the Human Product Owner explicitly directed the
creation of this governed Task and the start of work on preventing
conditional technology decisions from losing their constraints in successor
Tasks. The direction requires the smallest coherent NKF-owned safeguard, named
a Decision Applicability Gate or an equally strong minimal alternative, and
requires that the safeguard ensure:

1. successor Tasks extract all applicable accepted decisions, including
   conditions, negative findings, rejected capabilities, supersession, and
   unresolved unknowns;
2. mandatory capabilities are classified as proven, unsupported, or unknown,
   and unsupported or unknown mandatory capabilities fail closed unless the
   Human Product Owner explicitly accepts an exception;
3. changes to renderer, provider, platform, data format, architecture,
   harness, or a mandatory Product requirement trigger re-evaluation;
4. validation levels remain separate: data validity, adapter compatibility,
   runtime or renderer behaviour, Human Product experience review, and
   production, commercial, and legal suitability;
5. passing a lower validation level cannot be represented as success at a
   higher level;
6. harnesses verify required outcomes directly, and available input data,
   invoked methods, differing screenshots, or simulated gestures are not
   sufficient evidence that an outcome occurred;
7. conditional decisions are never summarized later as unconditional choices;
   and
8. acceptance, implementation, Realization confirmation, conformance, Git
   state, and remote enforcement remain separate facts.

The direction authorizes inspecting the current NKF authority, protocol,
skills, schemas, and checker; designing and implementing the safeguard in this
repository; and updating the applicable authoring skill, protocol, tests, and
checker enforcement where justified. It authorizes read-only inspection of
named Nourd Tiles records as evidence. It does not authorize modifying Nourd
Tiles or Wonderer, publishing a release, migrating a consumer, or claiming
acceptance or confirmation that has not passed its separate authority
boundary.

On `2026-08-06`, reviewing the drafted Design, the Human Product Owner
adopted the gate direction as proposed, directed that the gate be required on
all Tasks including completed history, and directed versioned delivery:
NKF updates now follow a defined versioning process, every release is
versioned, and this correction ships as a new version rather than mutating
NKF 0.1, because other repositories use NKF 0.1. The Human Product Owner also
directed committing the older completed work and keeping this Task's work as
its own Git history before continuing. The initial allocation was NKF
`0.11`.

Later on `2026-08-06`, reviewing the candidate, the Human Product Owner
directed that the shipping process is repository process rather than rulebook
meaning and must be removed from the candidate Specification; that a new
Task be created and deferred to define the version release process, the
consumer adoption process, and breaking-change classification and signaling;
and that the correction be versioned NKF `0.2` because it carries breaking
changes. ADR 0078 records that correction, and `NKF-020` holds the deferred
process work.

Still on `2026-08-06`, the Human Product Owner directed removing the
frontmatter title, moving the repeated top-of-document identity properties
into type-dynamic frontmatter, and ending the duplication between frontmatter
and body openings. ADR 0079 records that direction for NKF 0.2.

The Human Product Owner then directed that guidance, protocols, and agent
instructions be versioned per NKF version as one complete frozen set, agreed
that superseded versions live in Git history rather than beside the current
tree, and on `2026-08-07` accepted the proposed separated release and
adoption processes with the NKF repository releasing first and then adopting
its own version as the first migrator. ADR 0080 records that acceptance; the
followable procedures are the release and adoption protocols under
`integrations/`.

On `2026-08-07`, the Human Product Owner received a plain-language
explanation of every difference from NKF 0.1 and confirmed each change
separately: the gate section with fail-closed completion, the validation
levels and claim rules, the versioned-set and guidance-marker rules, and the
title-free dynamic frontmatter. ADR 0081 records acceptance of the exact
NKF 0.2 authority pair.

## Current Progress

- The read-only Nourd Tiles failure Evidence is bound with exact digests.
- The Decision Applicability Gate Design was drafted, revised to the directed
  all-Task and versioned-delivery boundaries, and adopted through ADR 0077.
- ADR 0076 records the versioned contract evolution process and allocates
  NKF `0.11` to this correction.
- The predecessor NKF-017 work was committed separately as `aca9bad`, and the
  NKF-019 groundwork as `d0afe31`, on local `master`; no push is claimed.
- ADR 0078 reallocated the correction to NKF `0.2`, removed the shipping
  process from the candidate rulebook, and recorded the deferred `NKF-020`
  process Task; the removed release outline is preserved there as unaccepted
  draft input.
- ADR 0079 removed the frontmatter title from the 0.2 candidate, added the
  optional Task orientation keys `owner`, `decision_authority`, and
  `related_tasks`, and removed `markdown.frontmatter.title-mismatch` from the
  0.2 registry; this repository's own documents migrate to the new envelope
  during the 0.2 self-migration.
- The 0.2 candidate now defines the versioned set and the guidance version
  marker with `guidance.version.mismatch` enforcement. ADR 0080 accepts the
  separated release and adoption processes, documented as the versioned
  release and adoption protocols under `integrations/`; NKF-020 keeps only
  breaking-change classification and signaling plus refinements.
- ADR 0081 accepts the exact NKF 0.2 authority pair after per-change Human
  Product Owner confirmation: canonical Markdown SHA-256
  `bac288b2299e2e3dc9f7eecf41158b2717b427d4ccc59842e4927b1b9f8b7317` bound to
  executable SHA-256
  `3178dd061ab0e9e91f8cf46d3391b9f43fc6bda0f2f3eb4a6cb18c65e86e05bd`. The
  0.2 Schemas remain derived candidates. The next boundary is release
  protocol step three: derive the complete 0.2 set — checker enforcement,
  fixtures, tests, version-stamped guidance, onboarding, and documentation.
  No 0.2 implementation, conformance, confirmation, release, or adoption is
  claimed yet; this repository still declares and validates as NKF 0.1.

## Triggering External Evidence

The triggering failure occurred in the Nourd Tiles repository and was
inspected read-only at
`/Users/kam/Documents/NourdApS/shared_technology/nourd_tiles`:

- `TILES-007` inherited the accepted Wonderer Mapbox pilot baseline.
- `TILES-008` later made custom LiDAR-derived true 3D terrain a mandatory
  first-iteration requirement, recorded the negative finding that the
  documented Mapbox Android path supports only Mapbox Terrain DEM as a
  raster-DEM source, and selected ArcGIS Maps SDK for Kotlin conditional on an
  experience proof.
- Successor work continued referring to accepted renderer baselines without
  consistently carrying those conditions. The `TILES-012` sample harness
  switched the effective renderer to MapLibre GL JS without re-evaluating the
  applicable decisions.
- The `TILES-012` harness mixed data-package validation, renderer
  compatibility, and experience validation. Automated checks proved only
  proxies — valid elevation bytes, button callbacks, screenshots, and a sent
  gesture — while claiming useful navigation and rendered terrain.
- Human Product Owner inspection then established that navigation failed and
  that the renderer was receiving zero elevation, and the earlier automated
  conclusion was withdrawn.

The exact observed evidence, including source digests, is captured under this
Task as governed Evidence. Nourd Tiles remains the authority for its own
knowledge; the observations are recorded here only to ground the NKF-owned
correction.

## Problem

NKF 0.1 currently gives a Task non-record no machine-checkable body
structure: only `task_id` and `task_status` are validated, and topology
placement is enforced. Nothing in the portable contract requires a successor
Task to extract the accepted decisions that apply to it, to carry a decision's
conditions and negative findings forward, or to state the level at which a
claimed verification actually occurred.

The authoring protocol requires beginning from current knowledge but does not
require an explicit extraction of applicable accepted decisions, their
conditions, or unresolved unknowns before Git-backed work, and it defines no
vocabulary that separates data validity from adapter compatibility, runtime
behaviour, human experience review, and production suitability. A consumer can
therefore pass every deterministic NKF check while a conditional decision is
silently summarized as unconditional and while proxy evidence is represented
as outcome success.

## Finding Classification

This is an NKF Specification and contract gap with a derived checker,
protocol, skill, fixture, and documentation impact. The Nourd Tiles records
also show consumer-side authoring failures, but the class of failure is one a
portable NKF contract can make structurally visible and partially
machine-enforceable, and NKF currently does not.

## Desired Outcome

Every adopted repository's active Tasks expose one deterministic, governed
Decision Applicability Gate: the applicable accepted decisions with their
carried constraints, the mandatory capabilities with an explicit proven,
unsupported, or unknown finding, and the verification level actually reached
for proven findings. Completion of a Task fails closed while a mandatory
capability remains unsupported or unknown without an explicit Human Product
Owner exception.

NKF gains closed portable vocabularies for verification levels and capability
findings, a normative rule that lower-level evidence cannot be represented as
higher-level success, a normative direct-outcome evidence rule for harnesses,
and a normative rule that restating a conditional decision must carry its
conditions. The authoring protocol and portable skill carry the corresponding
procedure. Deterministic checking enforces structure, vocabulary, reference
resolution, and the completion gate, and is never represented as proof of
semantic completeness or truth.

## Scope

- capture the Nourd Tiles failure as read-only governed Evidence with exact
  provenance;
- design the gate against the current Task non-record contract, section-role
  vocabularies, conformance semantics, and checker capabilities;
- resolve the consequential boundaries with the Human Product Owner and record
  them in immutable Decisions;
- update the canonical NKF 0.1 Specification and digest-bound executable
  companion for the accepted direction;
- derive checker rules, diagnostics registry entries, fixtures, tests,
  onboarding template output, authoring protocol and skill updates, digest
  re-pins, and the public documentation projection;
- satisfy the adopted contract in this repository's own governed knowledge,
  including this Task; and
- validate with `npm run nkf:check` and present the exact successor for
  separate audit and confirmation.

## Required Design Decisions

1. Is the gate portable NKF 0.1 Common meaning that binds every adopted
   repository after deliberate migration, or a repository-local convention?
2. Which Task states require, permit, and gate the structure, and how do
   previously completed Tasks remain valid without rewriting history?
3. Does the gate live in deterministic Task body structure, in Task
   frontmatter, or in a new record kind?
4. Are the verification levels and capability findings closed portable
   vocabularies, and what are their exact values?
5. Which properties does deterministic checking own, and which remain
   authoring-procedure and human-review obligations?

## Guardrails

- Do not modify Nourd Tiles or Wonderer under this Task.
- Do not publish a release or migrate any consumer under this Task.
- Do not rewrite previously completed Tasks or accepted immutable records to
  satisfy the new contract; compatibility must be explicit.
- Do not represent deterministic structural checking as proof of semantic
  completeness, truthful extraction, or absence of contradiction in prose.
- Do not let the gate structure itself claim acceptance, adoption,
  confirmation, conformance, or readiness.
- Preserve the one-version namespace; do not introduce sub-versioned record
  or gate contracts.
- Keep acceptance, implementation, Realization confirmation, conformance,
  local Git state, and remote enforcement as separate facts in every report.

## AI Execution Plan

This plan is recorded in the owning immutable Task before further execution:

1. record the read-only Nourd Tiles observations as governed Evidence with
   exact file digests and observation time;
2. audit the current Task non-record contract, vocabularies, conformance
   semantics, protocol, skills, and checker enforcement surfaces;
3. draft one Decision Applicability Gate Design with alternatives and
   trade-offs and declare it as an Active Design;
4. present the consequential boundaries to the Human Product Owner and record
   the adopted direction in an immutable Decision;
5. draft the exact successor Specification and executable companion candidate
   pair and obtain Human Product Owner acceptance of the exact bytes;
6. derive Schemas where affected, checker rules, diagnostics registry
   entries, fixtures, tests, onboarding output, protocol and skill updates,
   digest re-pins, and the public documentation projection from the accepted
   meaning;
7. bring this repository's own governed knowledge, including this Task and
   fixture Tasks, into conformance with the adopted gate;
8. run exactly `npm run nkf:check` after each coherent governed change and
   repair in-scope findings;
9. update the consolidated Current System Realization as an unconfirmed
   successor account; and
10. record completion Evidence and present the exact successor for separate
    Human Product Owner confirmation without claiming release, publication,
    or consumer migration.

## Acceptance Criteria

- Governed Evidence records the exact Nourd Tiles observations without
  modifying that repository.
- A Human Product Owner Decision adopts the gate direction, and a Decision
  accepts the exact successor authority pair.
- The canonical Specification and executable companion define the gate
  structure, closed verification-level and capability-finding vocabularies,
  the completion fail-closed rule, the re-evaluation obligation, the
  direct-outcome evidence rule, and the carried-condition rule.
- The checker fails closed for every gate property the accepted contract
  makes deterministic, with registered diagnostics, fixtures, and tests.
- An active Task lacking the required gate structure, an unresolved gate
  reference, an unsupported vocabulary value, and a completed Task with an
  unexcepted unsupported or unknown mandatory capability each produce a
  blocking diagnostic.
- The authoring protocol and portable skill require extraction before
  Git-backed work, re-evaluation on trigger changes, direct outcome evidence,
  and carried conditions, and remain vendor-neutral.
- Previously completed Tasks and already-onboarded consumers remain valid
  without history rewriting, and consumer migration remains deliberate,
  separate work.
- This repository passes exactly `npm run nkf:check` with the gate enforced,
  including this Task's own gate section.
- Acceptance, implementation, Realization confirmation, conformance, local
  Git state, and remote enforcement are reported separately at handoff.

## Created-State Rule

At creation, this Task records required work, recorded direction, and the
triggering external evidence only. It does not claim that a design has been
adopted, that normative meaning has changed, that any enforcement exists,
that any consumer must migrate, or that a Realization has been confirmed.
Later Decisions and recorded progress supersede only these created-state
facts.
