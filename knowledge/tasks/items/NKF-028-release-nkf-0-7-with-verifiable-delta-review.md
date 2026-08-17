---
title: "NKF-028: Release NKF 0.7 With Verifiable Delta Review"
summary: Make NKF adopt itself to its next version cheaply by turning the whole-root semantic re-review into a verifiable, digest-bound delta review, cutting the live multi-version support window, neutralizing state-baked identity and paths, and reconciling the release-confirmation ordering, delivered as one independently audited NKF 0.7 release.
created_at: 2026-08-14T18:39:31Z
---

# NKF-028: Release NKF 0.7 With Verifiable Delta Review

## Human Direction

On `2026-08-14`, after pull request 9 merged the complete NKF 0.6 release to
`master`, the Human Product Owner directed planning for NKF 0.7, confirmed
the plan in conversation, and explicitly directed creating this Task. The
direction to begin implementation is separate: work under this Task starts
only after the Human Product Owner receives the created Task's short
description and explicitly says to proceed.

The Human Product Owner confirmed these boundaries in the planning
conversation:

1. The 0.7 headline is cheap producer self-upgrade. The cost that grows per
   release is the semantic re-review surface, not the mechanical migration.
2. Bootstrap is deliberate: NKF 0.7 ships the delta-review machinery and
   takes one last whole-root semantic review at its own producer promotion.
   The first upgrade that must pass on delta review alone is the promotion
   away from 0.7. This choice was made for safety before Task creation, with
   the alternative recorded and rejected, not discovered as a late exception.
3. The live multi-version support window is cut to the current version plus
   one predecessor, as the standing publishing policy going forward. This
   policy is explicitly conditional on the standing fact that no external
   repository has ever adopted any NKF release; the Design must define what
   widens when the first external adoption occurs. Older repositories
   migrate through their own immutable published archives as stepping
   stones.
4. The 0.6-to-0.7 change may be breaking where that is cleaner.
5. The test-harness corrections (knowledge-proportional bounds for
   repository-scaled exercises, child-process reaping on test timeout, and
   release-verifier generalization) are in scope.
6. The stale [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
   and [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
   conclusions are performed under this Task using the corrected mechanics.
7. Large-monolith onboarding is explicitly deferred as a future-version
   headline and is not pinned to any version number.
8. The Human Product Owner remains authority for every Product boundary. The
   Claude technical reviewer is delegated to derive exact contracts,
   serialization, compatibility, implementation, inventories, tests, audits,
   and technical confirmation where they faithfully implement the confirmed
   boundaries. Any new or changed Product meaning returns to the Human
   Product Owner.
9. This Task's complete lifecycle is carried on the `task/NKF-028` branch in
   its own worktree; `master` does not carry intermediate lifecycle
   snapshots, and one pull request delivers the complete NKF 0.7 release for
   one human merge.

After receiving the created Task's short description on `2026-08-14`, the
Human Product Owner confirmed one clarified premise and gave the explicit
direction to begin work. The clarified premise: the digest-bound delta-review
machinery is format meaning that applies to every adopted repository — both
to a consumer's version upgrades and to its ordinary authoring impact
closure — and the producer self-upgrade is the proof obligation, not the
applicability boundary. Consumer-shaped fixtures must prove the delta path
so the closure rules are not overfitted to the producer's own topology.

## Problem

Every producer promotion requires a fresh whole-root semantic review whose
size grows monotonically by construction. The sealed NKF 0.6 baseline
carries 287 node revisions, roughly 861 applicability judgments, and 366
decision classifications across three purposes, and each successor release
adds nodes and decisions that are all re-judged.

The 0.6 producer state proves the failure mode twice:

- The current sealed baseline's own limitations text records that the reseal
  was a delta re-affirmation in which only the knowledge authored under
  [NKF-027](NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
  was re-read, while its confirmation claim is forced to say the whole root
  was semantically reviewed, because no delta claim exists. The truth of what
  was reviewed lives in free text no checker can evaluate.
- The bundle root record [`nkf`](../../nkf.md) still states that NKF 0.4 is the current
  accepted format authority. It was last edited during the 0.4 candidate,
  its staleness driver is release-promotion state the knowledge graph
  deliberately does not model, and three successive whole-root reviews
  sealed it without an observation. The root record disproves the
  whole-root-review claim that sealed it.

Judgment bases carry no digests, so carried judgments cannot be
distinguished from performed ones. Whole-root review at this size is
performed nominally, and the format cannot detect the difference.

Independently: the checker live-implements every contract from 0.2 through
0.6 to protect consumers that do not exist; one living record and thirty-five
stable paths bake version, state, or currency assertions into identity that
only YAML declarations own; the accepted release protocol requires a
technical-confirmation Decision before publication while the prepublication
lock makes authoring one impossible, which NKF 0.6 survived only through an
explicit recorded exception; and the 0.6 release exposed test-harness
defects, including an orphaned adopter child process that can poison the
runs that audit a release.

## Desired Outcome

Deliver one immutable NKF 0.7 release in which:

- every semantic judgment in a reviewed baseline is bound to digests of the
  node and of the exact basis it judged, so carry-forward is computed from
  identity rather than asserted;
- a new authority version declares, rule by rule, whether each rule is
  identical to its predecessor, mechanically transformable with a stated
  proof obligation, or semantically new, and the checker confines required
  fresh review to the semantically-new closure;
- decision classifications persist keyed on decision digest and purpose and
  carry forward while both are unchanged;
- a deterministic scaffold emits the exact review universe and the exact
  record-declaration skeletons, leaving only semantic judgments to the named
  reviewer;
- a delta review claim exists, is machine-checked against the computed
  closure, and fails closed when the covered set is smaller than the
  computed closure, with whole-root review remaining the recovery path;
- nodes that state operational release facts declare that dependency, and a
  version promotion mechanically invalidates them into a post-promotion
  reconciliation set that blocks readiness until reconciled;
- the release-confirmation ordering is satisfiable without exception, using
  the accepted post-audit outside-the-archive record boundary;
- the live support window is the current version plus one predecessor,
  recorded as conditional policy, with stepping-stone migration through
  published archives and an explicit signal telling an older repository
  which archive to step through;
- living identity and stable paths no longer assert version, state, or
  currency, an identity-succession rule governs the rename of the
  consolidated current-system record, and the thirty-five state-baked
  stable paths migrate to neutral locations in one deliberate governed
  migration;
- the bundle root record and the remaining stale legacy locks are
  reconciled to delivered reality through supported mechanics;
- the test harness bounds repository-scaled exercises proportionally to
  knowledge size, reaps timed-out child processes, and verifies the
  recommended release without hand-edited version literals; and
- [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md) and
  [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
  conclude truthfully under the corrected mechanics.

## Fixed Product Boundaries

- Deterministic adoption is earned per version, never assumed, and fails
  closed when its preconditions are unproven.
- Deterministic never means the tool regenerates semantic acts. Reviews,
  acceptances, and confirmations carry forward by digest identity or they do
  not carry at all. A version that changes meaning while the updater still
  runs green would mint false conformance, which is worse than the cost
  problem.
- The per-rule version-delta declaration is accepted authority, not
  implementation behavior. A deterministic registry diff may seed it, and
  the named reviewer judges the non-identical remainder.
- The 0.7 producer promotion performs one last whole-root semantic review
  and seals the first fully digest-bound baseline. The acceptance criterion
  is that this review is the last whole-root review required by
  construction: the promotion away from 0.7 must be provable on delta
  review alone.
- The support-window cut is conditional on zero external adopters and is
  recorded that way in the authority.
- Published complete-set bytes remain immutable regardless of adoption
  count, and no published predecessor is repaired in place.

## Technical Derivation Boundary

The Claude technical reviewer may derive exact YAML shapes, digest and
closure algorithms, claim vocabularies, scaffold formats, policy tables,
migration mechanics, diagnostics, release membership, fixtures, and tests.
Each derivation must be necessary to implement a fixed boundary,
deterministic, closed, portable, and fail-closed; recorded first in the
normative Markdown and digest-bound executable companion; compared against
immutable NKF 0.6 and classified explicitly for compatibility; exercised
against Product, Technology, and the actual NKF producer; and independently
audited before technical acceptance or confirmation. Any derivation that
changes Product behavior, authority, user obligation, knowledge meaning, or
compatibility returns to the Human Product Owner.

## Scope

1. Basis revision binding: every applicability judgment, decision
   classification, and observation in a reviewed baseline binds digests of
   the judged node revision and of its exact basis.
2. Per-node carry-forward derived from digest identity and the per-rule
   delta declaration, never asserted by a reviewer.
3. Per-rule version-delta declaration in the accepted authority, seeded by a
   deterministic registry diff over the 194-rule predecessor registry, with
   explicit rule-identity mapping for renames.
4. Persisted decision classifications keyed on decision digest and purpose.
5. Deterministic `review --scaffold` and record-declaration scaffold
   subcommands that emit exact skeletons and leave semantic judgments to the
   named reviewer.
6. Identity and path neutrality: an identity-succession rule; renaming the
   consolidated current-system record away from its version-baked
   identifier; one deliberate governed migration of the thirty-five
   state-baked stable paths to neutral locations; a rule forbidding version,
   state, or currency assertions in new living identifiers and new stable
   paths; and removal of obsolete legacy locks.
7. Operational-fact triggers: declared dependencies on release coordinates,
   promotion-driven invalidation, and a post-promotion reconciliation set
   that blocks readiness, designed so the prepublication lock is never asked
   to admit pre-promotion authoring; reconcile the bundle root record as its
   first exercise.
8. Release-confirmation ordering reconciled through the accepted post-audit
   outside-the-archive record boundary, with the release protocol steps
   reordered to match.
9. Support-window cut to current plus one predecessor: remove live 0.2
   through 0.5 contract, fixture, checker-dispatch, migration, and
   distribution surface; keep stepping-stone migration through published
   archives working and explicitly signaled; record the conditional policy
   and what widens at first external adoption.
10. Test-harness corrections: knowledge-proportional bounds for
    repository-scaled exercises with fixture-bound tests on the static
    default, child-process reaping on timeout, and a release verifier that
    reads the version instead of carrying hand-edited literals, generalizing
    the per-version script accumulation.
11. Classification of the undeclared non-Markdown provenance boundary under
    the knowledge root: a closed provenance class or an explicit exemption
    in the authority.
12. Conclude [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md)
    and [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
    truthfully under this Task, including the explicit recorded Human
    Product Owner exception for the never-performed NKF 0.5 post-adoption
    audit and the factual record of the historical pull-request-readiness
    ordering violation.
13. Build, candidate-adopt, independently audit, technically confirm through
    the reconciled ordering, and, when separately authorized, publish,
    recommend, and producer-promote the exact NKF 0.7 release, performing
    the one last whole-root review at that promotion.

## Out Of Scope

- changing any published 0.1 through 0.6 complete-set byte;
- large-monolith onboarding or any commitment of it to a version number;
- declaring NKF 1.0 stable;
- repository visibility changes, trademark, governance, contribution, or
  community policy;
- protected-branch enforcement, which remains owned by
  [NKF-012](../deferred/NKF-012-activate-protected-merge-gate.md);
- the deferred investigations owned by
  [NKF-005](../deferred/NKF-005-validation-expiry-and-authority-freshness.md)
  and [NKF-021](../deferred/NKF-021-task-scope-gate.md) beyond preserving
  their deferred authority; and
- making AI semantic review deterministic proof, or letting any scaffold,
  diff, or carry-forward mechanism supply a semantic judgment.

## Execution Plan

1. Create this Task on the `task/NKF-028` branch in its own worktree with a
   complete Decision Applicability gate, register its declaration, review
   and reseal the graph delta, validate, and commit. Report the short Task
   description and stop until the Human Product Owner directs
   implementation to begin.
2. Author the active NKF 0.7 Design from the source-grounded assessment,
   carrying every confirmed boundary, the bootstrap choice, the conditional
   support-window policy, the identity-succession rule, the operational-fact
   trigger design, and the confirmation-ordering reconciliation, each with
   its evidence.
3. Obtain the Human Product Owner adoption Decision for the Design
   direction.
4. Derive the exact NKF 0.7 authority pair, including the per-rule
   version-delta declaration for 0.6-to-0.7 seeded by the deterministic
   registry diff, and audit it independently against every confirmed
   boundary.
5. Produce pre-acceptance evidence proving digest-bound carry-forward and
   closure computation on exact fixtures and on an isolated copy of the real
   producer, including refusal cases where a claimed delta review is smaller
   than the computed closure.
6. Accept the exact audited authority under the recorded delegation, then
   derive Schemas, checker dispatch, baseline and claim formats, scaffold
   commands, migration and identity-succession mechanics, the support-window
   removal, harness corrections, fixtures, guidance, and release membership.
7. Perform the deliberate identity and path migration and the root-record
   reconciliation on the candidate, with the delta review and reseal that
   the new machinery itself requires.
8. Build one exact candidate archive from a clean release commit,
   candidate-adopt it into an isolated real-producer copy, exercise the
   complete ordinary authoring lifecycle including the new scaffolds and
   delta-claim refusals, reproduce every byte, and obtain a fresh
   independent audit.
9. Technically confirm the exact audited candidate through the reconciled
   post-audit ordering, and stop for the separately authorized publication,
   recommendation, and producer promotion, performing the one last
   whole-root review at that promotion.
10. Conclude [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md),
    [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md),
    and this Task truthfully, mark the single pull request ready, and leave
    the Human Product Owner one merge to `master`.

## Acceptance Criteria

- One accepted immutable NKF 0.7 authority pair carries the per-rule
  version-delta declaration, digest-bound baseline contract, delta claim,
  closure rules, identity-succession rule, operational-fact triggers,
  conditional support-window policy, and reconciled confirmation ordering
  without mutating any published predecessor byte.
- Every judgment in a sealed 0.7 baseline binds node and basis digests, and
  carried judgments are mechanically distinguishable from performed ones.
- The checker computes the required re-review closure from the delta
  declaration and the digest deltas, accepts a delta claim only when its
  covered set contains that closure, and fails closed otherwise, with
  whole-root review as recovery.
- Pre-acceptance evidence proves carry-forward, closure computation, and
  refusal behavior on exact fixtures and an isolated real-producer copy
  before acceptance.
- The 0.7 producer promotion performs one whole-root review, seals the
  first fully digest-bound baseline, and the resulting state proves by
  construction that the promotion away from 0.7 requires only a delta
  review.
- The live support window is current plus one predecessor; stepping-stone
  migration through published archives is exercised and explicitly
  signaled; the conditional policy and its widening condition are recorded
  in the authority.
- No living identifier or stable path created under 0.7 asserts version,
  state, or currency; the consolidated current-system record carries a
  version-free identity with explicit succession provenance; the
  thirty-five state-baked stable paths resolve at neutral locations with
  navigation and links intact.
- The bundle root record states the delivered 0.7 reality, and a version
  promotion mechanically invalidates operational-fact nodes into a
  readiness-blocking reconciliation set.
- The release protocol's confirmation ordering is satisfiable and exercised
  without exception on this release.
- Repository-scaled test bounds derive from knowledge size, a timed-out
  exercise leaves no live child process, and the recommended-release
  verifier carries no hand-edited version literal.
- The undeclared provenance boundary is explicitly classified in the
  authority.
- [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md) and
  [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
  are concluded truthfully with the recorded Human Product Owner exception
  and the historical ordering violation stated as fact.
- `npm run nkf:check` passes every handoff, and one pull request delivers
  the complete release for one human merge.

## Created-State Rule

This Task's creation and active declaration record human direction, scope,
plan, constraints, and evidence only. They do not begin implementation, do
not accept a 0.7 authority pair, adopt no Design, confirm no Realization,
establish no conformance, publish no release, and conclude no other Task.
Implementation begins only on the Human Product Owner's separate explicit
direction after this Task's short description is delivered. Later records
and evidence supersede only the specific created-state facts they
explicitly replace.

## Current Progress

The complete 0.7 line is delivered on this branch: the digest-bound baseline
contract, per-rule version delta with policy-declared judgment dependencies,
computed-closure delta claims with fail-closed refusal, deterministic review
and record scaffolds, the deliberate stable-path neutralization and the one
accepted identity succession, provenance-attachment classification,
operational-fact promotion reconciliation, the current-plus-one support
window with stepping-stone refusals, the Git transition orchestration the
guidance describes, knowledge-proportional test bounds with child reaping,
and the complete 213-rule registry with implementation and test coverage for
every accepted identity. The authority was accepted by
[ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
after
[ADR 0127](../../decisions/0127-accept-the-nkf-0-7-authority-set.md)'s
selection was revised on rehearsal evidence, under the Human Product Owner's
independent-audit condition recorded in the
[independent authority audit](../../evidence/audits/nkf-028-nkf-0-7-independent-authority-audit.md).
The release-protocol guidance review is recorded in the
[guidance review](../../evidence/release/nkf-028-nkf-0-7-guidance-review.md).
The complete producer promotion is proven at both authorized stages against
isolated copies of the live producer, the full suite and handoff gate are
green, and the validation and implementation predecessors concluded
truthfully. The live producer deliberately remains on NKF 0.6: publication,
recommendation, live promotion, and merge stay separately authorized Human
Product Owner acts.

## Completion Result

NKF 0.7 is delivered, accepted, exercised, audited, and technically
confirmed. The accepted authority —
[ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
after the rehearsal-driven revision of
[ADR 0127](../../decisions/0127-accept-the-nkf-0-7-authority-set.md) under
the Human Product Owner's independent-audit condition — carries the
digest-bound baseline contract, the per-rule version delta with
policy-declared judgment dependencies, the fail-closed delta claim with
whole-root recovery, the deterministic scaffolds, the one deliberate
stable-path neutralization and identity succession, provenance-attachment
classification, operational-fact promotion reconciliation, the
current-plus-one support window with stepping-stone refusals, and the
mandatory audit-bound confirmation ordering. Every one of the two hundred
thirteen accepted rules has an implementation and test coverage; the Git
transition orchestration the guidance describes is built and proven; the
harness carries knowledge-proportional bounds with child reaping. The
complete producer promotion is proven at both authorized stages against
isolated copies of the live producer, with the deliberate last whole-root
review performed at the prepublication stage. The exact release candidate —
archive
`c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` at
release commit `e5b265e87da6c12b73b4749f8d24b41b996cc77a` — passed the
isolated candidate exercise and the clean independent
[release audit](../../evidence/release/nkf-028-nkf-0-7-release-audit.md),
and is technically confirmed by
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md).
The validation and implementation predecessors concluded truthfully with
their recorded exceptions. The live producer deliberately remains on NKF
0.6: publication of the confirmed bytes, the recommendation, the live
post-publication producer promotion, and the merge of this Task's single
pull request remain separately authorized Human Product Owner acts, with the
prepared
[release notes](../../evidence/release/nkf-0.7-release-notes.md) ready for
the publication.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, authority-first derivation, versioned release, and deliberate migration; the support-window cut and delta-review machinery all enter through this path. |
| [`adr-0007`](../../decisions/0007-markdown-yaml-authority.md) | record | Markdown remains normative human meaning; the delta declaration, baseline contract, and claim vocabulary are executable companions that cannot silently override or accept it. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Stable record identity, typed relationships, and bindings remain one coherent topology; identity succession must extend it explicitly rather than fork identity. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | Unsupported required delta, claim, or trigger meaning fails closed; exact contract identity remains digest-bound. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a computed carry-forward is none of them. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | Deterministic evaluation cannot establish truth or adequacy; the closure computation bounds required review and never substitutes for it. |
| [`adr-0049`](../../decisions/0049-common-and-root-profiles.md) | record | Meaning identical across Product and Technology belongs in Common; profile-specific meaning stays with the concrete Root Profile. |
| [`adr-0050`](../../decisions/0050-product-and-technology-profiles.md) | record | Every bundle selects exactly one concrete Root Profile; no generic fallback is introduced. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement-surface change requires accepted authority, predecessor comparison, independent review, successor Realization, and exact confirmation. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks; the generalized verifier preserves that separation. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every complete-set meaning change is a new immutable version with explicit compatibility and deliberate migration. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate versioned protocols; its ordering is superseded where [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) and the reconciled 0.7 ordering apply. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive carries the complete versioned set, and exact candidate and post-action adoption states receive fresh independent audits. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own closed mechanics only and never supply meaning; the scaffolds and carry-forward computation stay on the mechanics side of that line. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Every release member is deterministically enumerated and reviewed against the complete applicable rule set before a cut. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; checker success resolves no open uncertainty. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-028` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation resolves an immutable recommendation with explicit predecessor-relative compatibility signaling; the shrunken window must keep that signaling truthful for unsupported predecessors. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes every complete-set member regardless of adoption count; exact-candidate and ordinary public self-adoption are separate audited proofs; the producer gate remains a verified host superset. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The adopted freshness and deterministic knowledge-graph direction and its nonclaims govern the graph meaning 0.7 extends; the canonical graph stays authored input and projections stay derived. |
| [`adr-0119`](../../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md) | record | The immutable 0.5 pair is historical predecessor authority; removing its live checker support changes no accepted byte and repairs nothing in place. |
| [`adr-0120`](../../decisions/0120-confirm-the-nkf-0-5-release-candidate.md) | record | The confirmed 0.5 candidate binding remains immutable history; stepping-stone migration relies on its published archive exactly as confirmed. |
| [`adr-0121`](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md) | record | The corrective and licensing direction governs the 0.6 predecessor state this Task starts from, including the strengthened prepublication producer proof 0.7 must preserve. |
| [`adr-0125`](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md) | record | Exact NKF 0.6 revision 3 is the immutable predecessor authority; a vocabulary, topology, validation, lifecycle, or compatibility change requires the separately accepted 0.7 pair this Task owns. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Digest-bound baselines make carried judgments mechanically distinguishable from performed ones | proven | runtime-behaviour | none |
| Per-rule version-delta declaration in the authority deterministically bounds the required fresh-review closure | proven | runtime-behaviour | none |
| A delta claim smaller than the computed closure is refused and whole-root review remains the recovery path | proven | runtime-behaviour | none |
| Decision classifications carry forward only while decision digest and purpose semantics are unchanged | proven | runtime-behaviour | none |
| Deterministic scaffolds emit exact skeletons without supplying any semantic judgment | proven | runtime-behaviour | none |
| Identity succession renames the current-system record without orphaning prior baselines, receipts, or references | proven | runtime-behaviour | none |
| The thirty-five state-baked stable paths migrate in one governed act with navigation and links intact | proven | runtime-behaviour | none |
| Promotion mechanically invalidates operational-fact nodes into a readiness-blocking reconciliation set | proven | runtime-behaviour | none |
| The reconciled confirmation ordering is satisfiable and exercised without exception on this release | proven | runtime-behaviour | none |
| Stepping-stone migration through published archives works and is explicitly signaled under the shrunken window | proven | runtime-behaviour | none |
| Repository-scaled test bounds derive from knowledge size and timed-out exercises leave no live child process | proven | runtime-behaviour | none |
| [NKF-025](../active/NKF-025-validate-freshness-and-knowledge-graph-direction.md) and [NKF-026](../active/NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md) conclude truthfully under the corrected mechanics | proven | runtime-behaviour | none |
