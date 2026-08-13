---
title: "NKF-026: Implement And Release NKF 0.5 Freshness And Knowledge Graph"
summary: Derive, implement, release, self-adopt, and independently audit NKF 0.5 from the exact freshness and deterministic knowledge-graph direction adopted by ADR 0115.
created_at: 2026-08-13T05:26:08Z
task_id: NKF-026
task_status: active
owner: Nourd ApS
decision_authority: Human Product Owner for Product meaning; Codex technical reviewer under explicit delegation for exact technical derivation, implementation, audit reconciliation, and confirmation within ADR 0115
related_tasks:
  - NKF-005
  - NKF-021
  - NKF-024
  - NKF-025
---

# NKF-026: Implement And Release NKF 0.5 Freshness And Knowledge Graph

## Human Direction

On `2026-08-13`, after the exact evidence-bounded direction was adopted and
the first attempted close of [NKF-025](NKF-025-validate-freshness-and-knowledge-graph-direction.md)
exposed a frozen NKF 0.4 lifecycle-transition contradiction, the Human Product
Owner stated that pull request 9 would not merge until NKF 0.5 was complete
and then explicitly directed the agent to start implementing NKF 0.5.

This is the separately directed implementation and release Task required by
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md).
It authorizes creation and immediate execution of this Task. The Human Product
Owner remains authority for every substantive Product boundary already fixed
through [NKF-025](NKF-025-validate-freshness-and-knowledge-graph-direction.md).
The Codex technical reviewer is delegated to derive exact serialization,
contracts, compatibility, implementation, audit corrections, and technical
confirmation only where they faithfully implement those boundaries. Any new
or changed Product meaning returns to the Human Product Owner.

The existing `task/NKF-025` branch and pull request 9 remain the sole
integration boundary until NKF 0.5 is complete. This is a narrow process
exception forced by the independently reproduced NKF 0.4 close defect: no
intermediate Task lifecycle commit merges to `master`, no second implementation
pull request is opened, and both Tasks remain truthful on the branch until the
0.5 transition mechanics can conclude them without changing accepted immutable
record bytes. Human merge remains the final review act.

## Problem

NKF 0.4 can validate structure, source bindings, exact artifacts, links,
release integrity, and one observed conformance snapshot. It cannot determine
whether applicable governed knowledge remains semantically current after a
related Decision, Design, Realization, governed artifact, external authority,
invalidation condition, or time-bounded input changes. It also moves Task and
Design files between lifecycle directories and rewrites every inbound link.
The close attempt at `9cfa55e` proved that this can mutate already accepted
immutable record bytes while leaving lifecycle-sensitive experiments stale.

[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopts the Product direction needed to resolve these failures. NKF 0.5 must
now turn that direction into one exact versioned authority pair, derived
implementation, release, migration, producer self-adoption, and consumer-safe
workflow without letting checker code or technical convenience redefine the
accepted meaning.

## Desired Outcome

Deliver one immutable NKF 0.5 release that:

- preserves durable human meaning in Markdown while YAML declares lifecycle,
  governance, freshness policy, typed graph facts, invalidation triggers,
  successors, revision inputs, and reviewer-bound baseline evidence;
- represents every governed record and every independently freshness-evaluable
  governed non-record as a stable node without promoting non-record authority;
- derives full, applicable, and current projections, conservative impact
  closure, simultaneous freshness results, Decision reconciliation, reason
  paths, and revision-bound receipts deterministically;
- blocks readiness when graph completeness, required relationships, external
  observations, accepted-Decision compatibility, exact bindings, or semantic
  review are missing or disputed;
- keeps canonical document paths stable when Task status, Design disposition,
  or computed freshness changes, with lifecycle navigation and virtual
  frontmatter derived rather than written into canonical meaning;
- repairs deterministic Task and Design transitions so they never rewrite an
  accepted immutable record merely because another document changes lifecycle;
- migrates supported 0.1 through 0.4 repositories deliberately through the one
  public Adopt operation, preserving repository authority and knowledge;
- updates the consolidated current-system Realization with the exact 0.5
  implementation and confirmation boundary;
- proves the exact candidate before publication and proves ordinary public
  producer self-adoption after publication; and
- leaves pull request 9 ready for one Human Product Owner merge only after the
  complete release and both independent audits are clean.

## Fixed Product Boundaries

The 23 individually Human-Product-Owner-confirmed boundaries in
[NKF-025](NKF-025-validate-freshness-and-knowledge-graph-direction.md) and their
exact consolidation in
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
govern this Task. In particular:

- Markdown owns durable meaning; YAML owns declared lifecycle, governance,
  freshness policy, graph relationships, invalidation, and successors.
- `current`, `stale`, `expired`, `invalidated`, and `unknown` are computed
  freshness results, separate from lifecycle, applicability, authority, role,
  conformance, acceptance, and Realization confirmation.
- stable identifiers define identity and canonical paths remain stable across
  lifecycle and freshness changes;
- the canonical graph contains authored durable input only, while projections,
  closures, inverses, navigation, freshness, and receipts are derived;
- impact operates on the applicable graph and missing or ambiguous material
  relationships fail closed without making every document universally
  mandatory;
- incremental readiness requires an exact graph-revision baseline confirmation
  by a named reviewer, with whole-root semantic review as recovery;
- every simultaneously applicable noncurrent result and its reason is
  preserved; presentation order cannot discard meaning;
- exact revision and governed-artifact mismatches are deterministic hard
  blockers, while a broader hard-versus-review taxonomy remains unstandardized;
- conservative mapping must be refined only through governed versioned
  evidence and never through silent repository-specific overrides; and
- prepublication exact-candidate Adopt plus audit and post-publication ordinary
  public self-adoption plus audit remain distinct mandatory stages.

## Technical Derivation Boundary

The technical reviewer may derive exact YAML shapes, closed vocabularies,
Schema organization, revision algorithms, relationship-policy tables,
baseline-confirmation envelopes, receipt formats and storage, generated
navigation, checker diagnostics, adopter transactions, migration mechanics,
release membership, and test fixtures. Each derivation must be:

1. necessary to implement a fixed Product boundary;
2. deterministic, closed, portable, and fail-closed;
3. recorded first in the normative Markdown and digest-bound executable
   companion before implementation depends on it;
4. compared against immutable NKF 0.4 and classified explicitly for
   compatibility;
5. exercised against Product, Technology, and the actual NKF producer; and
6. independently audited before technical acceptance or confirmation.

If two derivations differ in Product behavior, authority, user obligation,
knowledge meaning, or compatibility rather than implementation detail, work
stops at that boundary and returns to the Human Product Owner.

## Scope

- derive and accept one exact NKF 0.5 normative Markdown Specification and
  executable YAML companion from the adopted Design;
- define all required 0.5 Schemas, declarations, graph/evaluation contracts,
  result and receipt formats, diagnostics, and release membership;
- introduce stable lifecycle-neutral Task and Design source locations and
  generated lifecycle navigation, with a deliberate migration from prior
  directory-placement projections;
- productionize the bounded evaluator behavior with closed policies, complete
  source bindings, deterministic receipts, and checker integration;
- implement full, applicable, and current projections, impact closure,
  freshness evaluation, Decision reconciliation, external-observation
  handling, baseline confirmation, and fail-closed readiness;
- update deterministic Task and Design mechanics so lifecycle changes do not
  rewrite unrelated accepted immutable records;
- update onboarding and the one public Adopt operation for new and supported
  predecessor repositories, including approval and compatibility signaling;
- derive Product and Technology fixtures, adversarial cases, public examples,
  authoring/onboarding guidance, host adapters, and complete release-set
  membership;
- update the producer Realization and exact governed-artifact mappings;
- build, candidate-Adopt, reproduce, independently audit, technically confirm,
  publish, recommend, publicly self-adopt, and independently post-audit the
  exact 0.5 release; and
- reconcile and conclude [NKF-025](NKF-025-validate-freshness-and-knowledge-graph-direction.md)
  and this Task only after the 0.5 mechanics can do so without mutating
  accepted immutable records.

## Out Of Scope

- changing any frozen 0.1, 0.2, 0.3, or 0.4 complete-set byte;
- accepting or rewriting a consumer repository's canonical Product or
  Technology meaning;
- making AI semantic review deterministic proof or inferring graph
  completeness from an absence of detected omissions;
- automatic unbounded cross-repository discovery, public graph registries, or
  hidden external polling;
- implementing the deferred
  [NKF-021 Task Scope Gate](../deferred/NKF-021-task-scope-gate.md) beyond the
  minimal non-overlap needed to preserve its deferred authority;
- completing the separate authority-freshness investigation owned by
  [NKF-005](../deferred/NKF-005-validation-expiry-and-authority-freshness.md)
  except where its current accepted constraints directly apply;
- protected-branch enforcement, general acceptance-binding verification, or
  a claim of Governing Use readiness; and
- declaring NKF 1.0 stable.

## Execution Plan

1. Establish this separately directed Task as a second active Task on the
   existing sole branch and draft pull request, record the process exception,
   complete its Decision Applicability Gate, validate, commit, and push before
   changing normative or implementation files.
2. Derive an exact NKF 0.5 normative Markdown and executable companion from
   immutable NKF 0.4 plus [ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md),
   including stable lifecycle-neutral paths, graph declarations, evaluation
   contexts, policies, baseline confirmations, receipts, results,
   compatibility, and release requirements.
3. Independently audit the complete authority pair against all 23 Product
   boundaries, predecessor authority, process allocation, self-reference,
   migration feasibility, and fail-closed behavior. Correct and restart the
   audit whenever exact bytes change.
4. Accept only the exact clean pair under the recorded technical delegation,
   then derive 0.5 Schemas, checker dispatch, graph and freshness engine,
   diagnostics, stable lifecycle mechanics, adopter/migration transactions,
   onboarding, fixtures, examples, protocols, skills, host adapters, public
   documentation, and release-set membership.
5. Migrate the producer candidate to stable lifecycle-neutral Task and Design
   paths without rewriting historical meaning; update declarations, indexes,
   graph facts, baseline evidence, governed artifacts, and the consolidated
   current-system Realization; retain all predecessor trees unchanged.
6. Exercise controlled Product and Technology fixtures and actual NKF cases:
   lifecycle changes, stale Realization, Decision extension/supersession/
   conflict, missing and ambiguous relationships, cycles, exact binding,
   expiry, invalidation, external unknowns, receipt replay, baseline drift,
   simultaneous results, whole-root recovery, migration rollback, tampering,
   and idempotence.
7. Build one exact candidate archive from a clean release commit. Candidate-
   Adopt it in a fresh isolated producer clone, require repeat `current`,
   preserve the pinned-first host-superset gate, reproduce every source,
   member, mode, digest, build, and archive byte, and run a fresh independent
   adversarial audit.
8. After a clean exact-candidate audit, technically confirm only those exact
   implementation and archive bytes, publish that unchanged archive, and
   atomically promote the recommendation with explicit predecessor-relative
   compatibility.
9. Perform ordinary no-override public Adopt on the producer branch, require
   repeat `current`, rerun the complete producer gate, and complete a fresh
   independent post-adoption audit of recommendation, pin, integration,
   knowledge, graph baseline, receipts, rollback, and tamper rejection.
10. Reconcile every criterion and capability, ensure current-system Realization
    language and bindings match delivered reality, conclude both active Tasks
    without mutating immutable accepted bytes, mark pull request 9 ready, and
    leave the Human Product Owner one final merge to `master`.

## Acceptance Criteria

- One exact 0.5 authority pair faithfully implements every fixed Product
  boundary and is independently audited before technical acceptance.
- Immutable 0.1 through 0.4 authority, releases, tags, complete-set members,
  recommendations as historical evidence, and consumer validity remain
  unchanged.
- Canonical Task and Design paths do not change when status or disposition
  changes; lifecycle navigation and virtual frontmatter are derived, and a
  lifecycle transition cannot rewrite an unrelated accepted immutable record.
- Every governed record and independently freshness-evaluable non-record has a
  stable node identity and revision binding without authority promotion.
- The checker deterministically validates the closed relationship vocabulary,
  endpoint constraints, authored direction, meaning-section binding, impact
  policy, graph revision, baseline confirmation, context, and receipt identity.
- Full, applicable, and current projections remain distinct; mandatory impact
  runs on the applicable graph and retains reproducible reason paths.
- `current`, `stale`, `expired`, `invalidated`, and `unknown` results preserve
  every simultaneous applicable reason independently of renderer order.
- Missing or disputed graph completeness, missing or ambiguous material edges,
  unresolved applicable Decision conflicts, unobservable external change, and
  stale baseline confirmation block readiness and expose whole-root recovery.
- Exact revision and artifact mismatches hard-block deterministically without
  standardizing an unsupported broader severity taxonomy.
- Product, Technology, and actual NKF exercises compare targeted closure with
  whole-root semantic review, record every false negative and conservative
  false positive, and never normalize silent shrinkage.
- One public Adopt operation onboards a new 0.5 repository and deliberately
  updates every supported predecessor with correct compatibility, approval,
  preservation, rollback, idempotence, and host-superset behavior.
- The producer current-system Realization names the exact 0.5 implementation,
  artifact mappings, confirmation status, and remaining nonclaims without
  going stale during the final merge.
- One complete enumerated release set binds every authority, Schema, checker,
  adopter, policy, protocol, skill, adapter, fixture, example, public document,
  and manifest member with exact bytes and modes.
- Exact-candidate Adopt and audit pass before publication; ordinary public
  producer self-adoption and a separate audit pass after publication.
- `npm run nkf:check` passes every handoff and the final exact source snapshot
  with zero diagnostics; acceptance binding and Governing Use remain separate.
- Pull request 9 is the only implementation pull request and becomes ready only
  after both Tasks truthfully conclude and all audits are clean.

## Current Progress

- Human direction now explicitly authorizes this separately required 0.5
  implementation and release Task.
- The exact adopted direction, evidence, prototype, and 23 confirmed Product
  boundaries remain owned by [NKF-025](NKF-025-validate-freshness-and-knowledge-graph-direction.md)
  and [ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md).
- The frozen NKF 0.4 close contradiction is reproduced and recorded; no 0.5
  authority, implementation, Realization confirmation, candidate, release,
  recommendation, or adoption is claimed at Task creation.
- The exact prospective normative Markdown, executable companion, and
  freshness policy passed a restarted independent audit with a `CLEAN` verdict
  recorded in the
  [authority-pair audit](../../evidence/audits/nkf-026-nkf-0-5-authority-pair-audit.md).
- [ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md)
  technically accepts only those three exact audited inputs under the Human
  Product Owner's derivation delegation and adds no Product meaning.
- While this producer remains governed by NKF 0.4, the unchanged 0.5 Markdown
  is represented as bootstrap Evidence. Only candidate Adopt may apply the
  accepted bootstrap lifecycle transition.
- Derived checker, migration, sealer, release-set, fixtures, and public-Adopt
  integration are in implementation. The first cross-version end-to-end run
  exposed one authority-pair contradiction before any candidate release:
  migration promises exact preservation of every predecessor Markdown byte,
  while the native Task rule unconditionally requires a Decision
  Applicability Gate even for a preserved legacy Task that predates that
  section. Automatically inventing an applicability result would violate the
  semantic-review boundary, and rewriting the legacy source would violate the
  exact-preservation boundary.
- A proposed conformance exception for a preserved gate-free legacy Task was
  rejected by independent audit. It would weaken the Human Product Owner's
  explicit [ADR 0077](../../decisions/0077-decision-applicability-gate.md)
  direction that every Task, including completed history, carries a truthful
  retrospective gate. The byte-preservation promise was later technical
  derivation under
  [ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md)'s
  express no-new-Product-meaning boundary and
  therefore cannot supersede
  [ADR 0077](../../decisions/0077-decision-applicability-gate.md).
- The technical correction retains universal gate presence and narrows
  migration preservation only for a predecessor Task missing the gate:
  migration adds the already-governed explicit retrospective form before
  deriving the 0.5 declaration, lock, graph revision, and semantic-review
  candidate. No historical extraction is invented. Every other canonical
  Markdown byte and stable path remains exact.
- The corrected revision 2 authority set passed a restarted independent audit
  against its exact final hashes. The audit also verified its distinct
  identity, immutable
  [ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md)
  predecessor provenance, 0.4 bootstrap
  conformance, exact UTC creation evidence, full executable closure, and no
  Product-boundary expansion.
- The first two attempted acceptance records are retained as non-record
  historical Evidence because their own plain same-bundle references violated
  the inherited deep-link rule; neither supplies authority or acceptance.
- [ADR 0119](../../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
  technically accepts only the exact revision 2 Markdown, executable
  companion, and unchanged freshness policy. It supersedes the
  [ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md) pair
  only as prepublication authority selected for the 0.5 release and preserves
  that Decision plus both predecessor bytes as immutable historical facts.
- The first exact archive construction exposed one producer-only process-tool
  gap before publication: `scripts/exercise-release-candidate.mjs` still
  rejected every version except 0.4 and had no way to receive 0.5's required
  external whole-root review. The generic helper now dispatches 0.4 and 0.5,
  requires a named review only for 0.5, applies the repository-owner-approved
  breaking migration, expects `migrated`, runs the full producer gate, and
  requires `current` on repeat. This source correction invalidates that first
  candidate archive and requires a new exact candidate before audit or
  confirmation.
- The replacement candidate's fresh review template exposed a second technical
  defect before mutation: an explicitly represented YAML Evidence document
  cannot supply the CommonMark heading that the template generator previously
  demanded as its suggested basis, and the relationship vocabulary was seeded
  from the first candidate node instead of the accepted 0.5 relationship
  section. The generator now supplies a resolvable governing record-section
  basis for represented non-Markdown documents, uses the accepted 0.5
  relationship section when this producer carries it, and falls back to the
  bundle Root record for ordinary consumers. A focused regression exercises
  the non-Markdown case. This finding invalidates the replacement archive too;
  no impossible or generic review is accepted as evidence.
- No derived Schema, checker, adopter, fixture, documentation, Realization,
  release candidate, publication, recommendation, or producer adoption is yet
  claimed.

## Created-State Rule

This Task's creation and active status record human direction, scope, plan,
constraints, and current evidence only. They do not accept a 0.5 authority
pair, adopt additional Product meaning, confirm a Realization, establish
conformance, publish a release, migrate a consumer, prove self-adoption, or
make pull request 9 ready. Later records and evidence supersede only the
specific created-state facts they explicitly replace.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, authority-first derivation, versioned release, deliberate consumer migration, and explicit separation of acceptance from implementation and conformance. |
| [`adr-0007`](../../decisions/0007-markdown-yaml-authority.md) | record | Markdown remains normative human meaning; executable YAML may enable deterministic validation but cannot silently override or accept the Markdown. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Stable record identity, typed relationships, semantic entities, and Realization bindings remain one coherent topology; 0.5 must extend rather than compete with it. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | Unsupported required graph or freshness meaning fails closed, optional unsupported meaning stays visible and non-consequential, and exact contract identity remains digest-bound. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, acceptance verification, conformance, Realization confirmation, and external authority are separate axes and must remain separately reported. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | Schemas, bundle checking, extension or external resolution, and semantic review keep separate responsibilities; deterministic evaluation cannot establish truth, adequacy, acceptance, or confirmation. |
| [`adr-0049`](../../decisions/0049-common-and-root-profiles.md) | record | Meaning identical across Product and Technology belongs in Common; profile-specific meaning stays with the selected concrete Root Profile. |
| [`adr-0050`](../../decisions/0050-product-and-technology-profiles.md) | record | Every bundle selects exactly one Product or Technology Root Profile with Common automatic; no generic fallback or multi-profile composition is introduced. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement-surface change requires accepted authority, predecessor comparison, independent review, successor Realization, exact confirmation, and layered local and remote validation without implying protected merge. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every complete-set meaning change is a new immutable version with explicit compatibility and deliberate migration; publication freeze is strengthened by [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md). |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task must carry all applicable accepted Decisions and classify each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate versioned protocols; its publish-before-self-adopt order is superseded by [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md). |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive carries the complete versioned set, and exact candidate and post-action adoption states receive fresh independent audits. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own closed mechanics only and never supply meaning; 0.5 must explicitly supersede the lifecycle-move behavior that mutates immutable accepted records. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Every release member is deterministically enumerated and reviewed against the complete applicable rule set before a cut. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; open uncertainties remain explicit and checker success cannot resolve them. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | A Task branch carries active work and merges only concluded. Human direction keeps both related Tasks on the existing branch and pull request until 0.5 repairs the close defect; no intermediate active state merges to `master`. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation resolves an immutable recommendation and applies explicit predecessor-relative compatibility, approval, migration, and idempotence. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes every complete-set member; exact-candidate and ordinary public self-adoption are separate audited proofs; the producer gate remains a verified host superset. |
| [`adr-0113`](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) | record | Exact NKF 0.4 is immutable predecessor authority; a vocabulary, topology, validation, lifecycle, or compatibility change requires a separately accepted 0.5 pair. |
| [`adr-0114`](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) | record | Technical confirmation binds only the exact audited 0.4 implementation and archive; 0.5 requires its own clean candidate audit and exact confirmation. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The exact evidence-bounded direction and all nonclaims govern 0.5 derivation; implementation is authorized only by this separately human-directed Task and may not add Product meaning. |
| [`adr-0116`](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md) | record | Derived 0.5 contracts and tooling must bind the exact independently audited authority set; technical acceptance adds no Product meaning and does not imply implementation, confirmation, publication, or adoption. |
| [`adr-0119`](../../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md) | record | The distinct revision 2 pair is the current prepublication 0.5 authority; the [ADR 0116](../../decisions/0116-accept-the-nkf-0-5-authority-pair.md) pair remains immutable historical provenance, and only the narrow reviewed retrospective Task-gate normalization corrects the technical contradiction without adding Product meaning. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Exact 0.5 authority pair faithfully implements all 23 confirmed Product boundaries without semantic expansion | proven | data-validity | none |
| Stable lifecycle-neutral paths prevent Task or Design transitions from rewriting accepted immutable records | unknown | none | none |
| Closed graph declarations and policies derive deterministic projections, impact closure, reasons, simultaneous freshness results, and receipts | unknown | none | none |
| Missing completeness, relationships, Decision reconciliation, external observation, or baseline review fails closed with whole-root recovery | unknown | none | none |
| Product, Technology, and actual NKF exercises match reviewed semantic oracles without hidden false negatives | unknown | none | none |
| One public Adopt operation safely onboards 0.5 and deliberately migrates all supported predecessors with preservation, rollback, and idempotence | unknown | none | none |
| Current-system Realization remains exact through candidate, publication, producer adoption, and final merge | unknown | none | none |
| Complete release membership, source reproduction, builds, archive bytes, modes, digests, and recommendation are deterministic and exact | unknown | none | none |
| Prepublication candidate-Adopt and post-publication ordinary producer self-adoption each pass their complete gate and independent audit | unknown | none | none |
| Both active Tasks can conclude without changing accepted immutable record bytes or weakening deep-link validation | unknown | none | none |
