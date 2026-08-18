---
title: "NKF-031: Release The Corrective NKF 0.71"
summary: Deliver NKF 0.71, the deliberately small corrective successor to published and producer-adopted NKF 0.7 — reconciling the accepted specification's topology self-contradiction and version-label errors, closing the close-and-seal ordering hole with the seal-completing conclusion, regenerating the public documentation projection, and sliding the live window to exactly 0.71 plus 0.7 — proven by the first delta-only producer upgrade and delivered through the full accepted release order as one pull request.
created_at: 2026-08-17T17:01:00Z
---

# NKF-031: Release The Corrective NKF 0.71

## Human Direction

On `2026-08-17`, after the
[NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
repair merged and restored a green gate on `master`, the Human Product Owner
opened a dedicated planning session for NKF 0.71 as the corrective successor
to NKF 0.7, scoped to the specification and format defects the sixth
independent audit recorded in the
[whole-NKF master audit Evidence](../../evidence/audits/nkf-030-whole-nkf-master-audit.md).
The session brief fixed these constraints verbatim:

- "The version string is exactly \"0.71\", chosen by me. Verify every
  tooling surface that compares or windows version strings handles it."
- "the 0.7 → 0.71 producer upgrade MUST be provable through the digest-bound
  delta claim alone, with no whole-root review. If the delta machinery
  cannot prove it, record that as a 0.7 defect finding — do not waive it."
- "Keep 0.71 deliberately small. Review-quality measurement and multi-writer
  semantics are explicitly deferred to a later version."
- "Full accepted release order, no shortcuts: adopt direction → accept
  authority (only after an independent audit) → build and prove the set →
  guidance review → candidate archive + isolated exercise → fresh
  independent release audit → mandatory audit-bound confirmation Decision →
  then publication, recommendation, live promotion, and merges remain my
  separately authorized acts."
- "I own every Product boundary; the Claude technical reviewer works under
  an explicitly recorded delegation inside the owning Task, as in
  [NKF-028](NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)/[NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md)."

After receiving the verified starting state, the confirmed defect locations,
the exhaustive version-string tooling inventory, and the proposed plan, the
Human Product Owner directed verbatim: "go with option B . Seal-completing
conclusion. i agree with your recommendations." — adopting the
seal-completing conclusion as the proposed close-and-seal design direction
and accepting the recommendations that the predecessor-tree cleanup deferred
by [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
is in scope. Asked for the explicit go, the Human Product Owner directed
verbatim: "yes and continue the work until you are done with NKF 0.71 and
the PR is ready". This direction explicitly creates this Task and begins its
work, continuing to a ready pull request.

Asked separately and explicitly whether, under the standing current-plus-one
policy, the live window becomes exactly NKF 0.71 plus NKF 0.7 and NKF 0.6
drops to stepping-stone history — so a 0.6 repository must adopt the
published 0.7 archive first — the Human Product Owner answered verbatim:
"Confirmed".

The confirmed boundaries:

1. NKF 0.71 is deliberately small: exactly the sixth-audit specification and
   format findings — the topology self-contradiction, the copy-forward
   version-label errors, the close-and-seal ordering gap, and the
   predecessor-era public documentation projection — plus the working-tree
   cleanup of frozen predecessor process and distribution trees that
   [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
   explicitly deferred here. Review-quality measurement, multi-writer
   semantics, and large-monolith onboarding are explicitly deferred.
2. The version string is exactly `0.71`, chosen by the Human Product Owner.
   Every tooling surface that compares, windows, dispatches, or constructs
   version strings must handle it, and the identified structural hazards
   must be eliminated fail-closed.
3. The live support window becomes exactly NKF 0.71 plus NKF 0.7, and
   NKF 0.6 drops to stepping-stone history through its immutable published
   archive, explicitly confirmed by the Human Product Owner as recorded
   above.
4. The bootstrap promise is the acceptance test: the 0.7-to-0.71 producer
   upgrade must be provable through the digest-bound delta claim alone, with
   no whole-root review. If the machinery cannot prove it, that is recorded
   as an NKF 0.7 defect finding, never waived.
5. The full accepted release order applies without shortcuts, and
   publication, recommendation, live promotion, and merges remain separately
   authorized Human Product Owner acts.
6. The Human Product Owner remains authority for every Product boundary. The
   Claude technical reviewer is delegated to derive exact contracts,
   serialization, compatibility, implementation, fixtures, tests, evidence,
   independent-audit coordination, and technical confirmation where they
   faithfully implement the confirmed boundaries. Any new or changed Product
   meaning returns to the Human Product Owner.
7. This Task's complete lifecycle is carried on the `task/NKF-031` branch in
   its own worktree, and one pull request delivers the complete NKF 0.71
   release for one human merge.

## Problem

The sixth independent audit judged the accepted
[NKF 0.7 Specification](../../specifications/nkf-0.7.md) fit-with-caveats
and found defects that repository-side repair could not fix, because the
accepted bytes are immutable and require a governed successor:

- The accepted Specification contradicts itself: its Portable Knowledge
  Topology chapter still requires the `realizations/current/README.md` index
  and the supporting-current linking rule, while its neutralization chapter
  abolishes the `realizations/current` tree and forbids new
  currency-asserting paths. The executable companion silently omits the
  requirement rather than stating the reconciled meaning, and it still
  carries a vestigial supporting-current placement key. The Markdown is
  normative; an executable that silently diverges from it is itself a
  defect.
- The accepted Specification's evaluation-policy section carries
  copy-forward version-label errors: it attributes the 0.7 freshness policy
  to "NKF 0.6", and states the `hard` consequence class as being "in 0.6".
- Closing the delivering Task changes the knowledge graph after the last
  seal that Task can perform, so every delivery lands with a one-step-stale
  baseline. Both the
  [NKF-029](NKF-029-adopt-the-producer-to-published-nkf-0-7.md) and
  [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
  closes needed a hand-orchestrated post-close reseal commit as a
  workaround. The same close-time hole leaves hand-maintained navigation
  prose stale: on the merged default branch, the Tasks front page still
  listed the completed repair Task as active, because the deterministic
  close updates declarations and generated indexes but no hand-maintained
  prose.
- The published archive's public-documentation projection still teaches
  NKF 0.6 and the state-baked layout, and the projection tooling was never
  brought to 0.7.
- The frozen NKF 0.2 process roots and predecessor distribution trees remain
  in the working tree, explicitly deferred to this version by
  [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md).

## Desired Outcome

One immutable NKF 0.71 release in which the accepted successor Specification
states one reconciled topology with its executable companion in explicit
agreement, every version label states its true version, a concluded Task's
delivered tip carries equal baseline and candidate graph revisions with no
hand-orchestrated post-close act, the public documentation teaches exactly
the 0.71 format, the live window is exactly 0.71 plus 0.7 with truthful
stepping-stone signaling, and the producer's own 0.7-to-0.71 upgrade is
proven through the digest-bound delta claim alone — the delivered 0.7
headline mechanism discharging its bootstrap promise on its first successor.

## Fixed Product Boundaries

- Accepted NKF records and published bytes are immutable. Every correction
  enters through this governed successor revision with explicit provenance
  and compatibility; nothing is repaired in place.
- The executable companion never silently overrides the normative Markdown.
  The reconciled topology is stated in both, explicitly.
- The seal-completing conclusion is deterministic mechanics only: it carries
  existing judgments by digest identity over the closed mechanical close
  delta and supplies no semantic judgment. A close whose delta exceeds the
  closed mechanical vocabulary fails closed.
- Deterministic adoption is earned per version. The 0.71 upgrade path fails
  closed when its preconditions are unproven, and a delta claim smaller than
  the computed closure is refused with whole-root review as recovery.
- The support-window slide keeps compatibility signaling truthful: an
  out-of-window repository receives an explicit stepping-stone signal naming
  the published archive to step through.

## Scope

1. Successor Specification revision: reconcile the Portable Knowledge
   Topology chapter with the neutralization chapter — the required topology
   drops the abolished supporting-current index, the realizations index rule
   states the neutral layout, and the executable companion states the same
   reconciled meaning explicitly, removing the vestigial supporting-current
   placement key. Correct both evaluation-policy version labels and perform
   a full copy-forward label pass over the successor text.
2. Seal-completing conclusion: the deterministic Task conclusion — close,
   defer, and cancel — performs the mechanical reseal of the baseline over
   its own closed mechanical delta inside the same transaction, so the
   delivered tip carries equal baseline and candidate graph revisions with
   no hand-orchestrated post-close act. The design treats close-time
   navigation-prose staleness in the same act, and the alternative
   direction — making Task-state declarations graph-neutral — is recorded
   and rejected with its evidence.
3. The exact NKF 0.71 authority set: the successor Specification, its
   executable companion, the 0.71 freshness policy, and the per-rule
   0.7-to-0.71 version-delta declaration seeded by the deterministic
   registry diff, with schemas, release set, and distribution derived from
   the accepted pair.
4. Checker and adopter: dispatch exactly NKF 0.71 and NKF 0.7; a supported
   0.7-to-0.71 upgrade route through the one public Adopt operation; the
   producer promotion performed on the delta review stage; the
   seal-completing conclusion in the transition mechanics; stepping-stone
   refusal signaling the published 0.6 archive's successor path; and
   fail-closed treatment of the identified silent-degrade version-gate
   family so an unregistered version errors instead of inheriting
   predecessor semantics.
5. Version-string surfaces: register `0.71` at every registry, window,
   dispatch, binding, fixture, and identifier surface, eliminating the five
   identified structural hazards — the release-class downgrade, the missing
   upgrade route, the self-hosting predecessor assertion, the silent-degrade
   gate family, and the unanchored schema-generator replacement.
6. Public documentation projection: regenerate the projection to teach
   exactly the 0.71 format and the neutral layout, and bring the projection
   build and verification tooling current.
7. Working-tree cleanup: remove the frozen NKF 0.2 process roots and the
   predecessor distribution trees with the release-tooling review,
   preserving published archives as the immutable history.
8. Fixtures, tests, guidance review across the complete set, and release
   membership for 0.71.
9. Build one exact candidate archive from a clean release commit,
   candidate-adopt it into an isolated real-producer copy, and exercise the
   complete ordinary lifecycle including the acceptance test: the
   0.7-to-0.71 producer upgrade proven through the digest-bound delta claim
   alone.
10. Obtain a fresh independent release audit, then the mandatory audit-bound
    technical-confirmation Decision through the reconciled ordering, and
    stop for the separately authorized publication, recommendation, and live
    promotion.
11. Conclude this Task truthfully, mark the single pull request ready, and
    leave the Human Product Owner one merge to `master`.

## Out Of Scope

- Review-quality measurement, multi-writer semantics, and large-monolith
  onboarding — explicitly deferred by the Human Product Owner.
- Changing any published 0.1 through 0.7 complete-set byte, the confirmed
  0.7 archive, or any accepted immutable record.
- Publication, recommendation, live promotion, repository or release
  visibility changes, and merging — separately authorized Human Product
  Owner acts.
- Protected-branch enforcement, owned by
  [NKF-012](NKF-012-activate-protected-merge-gate.md).
- The deferred investigations owned by
  [NKF-005](NKF-005-validation-expiry-and-authority-freshness.md) and
  [NKF-021](NKF-021-task-scope-gate.md).

## Execution Plan

1. Create this Task on the `task/NKF-031` branch in its own worktree with a
   complete Decision Applicability gate and the recorded delegation;
   register its declaration; reconcile the Tasks front page whose
   hand-maintained state listing the deterministic close left stale;
   review and seal the graph delta; validate; commit.
2. Author the active NKF 0.71 Design carrying every confirmed boundary: the
   topology reconciliation, the seal-completing conclusion with the
   graph-neutral alternative recorded and rejected, the window slide, the
   0.7-to-0.71 compatibility classification, the coordinate-model statement
   for the chosen `0.71` string, the version-string hazard inventory, and
   the projection regeneration approach. Author the adoption Decision
   binding the Human Product Owner's verbatim direction recorded above.
3. Derive the exact 0.71 authority set from the adopted Design; obtain a
   fresh independent audit of the authority set against every confirmed
   boundary; then accept it under the recorded delegation through an
   acceptance Decision.
4. Implement: schemas, checker dispatch and the fail-closed version-gate
   treatment, the adopter upgrade route and delta-stage promotion, the
   seal-completing conclusion, the window slide with stepping-stone
   signaling, fixtures, and tests — proving each accepted rule identity.
5. Regenerate the public documentation projection and its tooling; perform
   the guidance review across the complete set; perform the predecessor
   working-tree cleanup with the release-tooling review; regenerate release
   membership.
6. Build the candidate archive from a clean release commit; exercise the
   exact candidate in an isolated real-producer copy, including the
   delta-only upgrade acceptance test and refusal cases.
7. Obtain the fresh independent release audit of the exact candidate; a
   material finding restarts packaging after repair.
8. Author the mandatory audit-bound technical-confirmation Decision binding
   the exact release commit, archive digest, checker and adopter digests,
   and audit Evidence.
9. Conclude this Task truthfully and run the deterministic close under the
   pinned NKF 0.7 adopter. Because the live producer remains on NKF 0.7
   until the separately authorized publication and promotion, this close is
   itself the last to require the hand-orchestrated post-close reseal
   commit on the same branch — the seal-completing conclusion this release
   delivers activates for successors at the live 0.71 promotion. Mark the
   single pull request ready and stop.

## Acceptance Criteria

- The accepted 0.71 successor Specification carries no topology
  self-contradiction: the required topology, the realizations index rule,
  the neutralization chapter, and the executable companion state one
  reconciled meaning explicitly, with no silent executable divergence and no
  vestigial supporting-current key.
- Every version label in the accepted 0.71 authority states its true
  version, including both corrected evaluation-policy labels.
- Under 0.71 mechanics, a concluded Task's delivered tip carries equal
  baseline and candidate graph revisions with no hand-orchestrated
  post-close act, proven by the deterministic transition's own tests and the
  isolated exercise; the conclusion supplies no semantic judgment and fails
  closed on a delta exceeding its closed mechanical vocabulary.
- The 0.7-to-0.71 producer upgrade is proven through the digest-bound delta
  claim alone — carried judgments verified by digest identity under the
  accepted version delta, fresh review confined to the computed closure, no
  whole-root review — in the isolated candidate exercise; if unprovable,
  the defect is recorded as an NKF 0.7 finding rather than waived.
- The live window is exactly NKF 0.71 plus NKF 0.7; a 0.6 or older
  repository fails closed with an explicit stepping-stone signal; the
  conditional policy and its widening condition remain recorded in the
  authority.
- Every version-comparing, windowing, dispatching, or identifier-building
  tooling surface handles the exact string `0.71`; the five identified
  structural hazards are eliminated fail-closed; an unregistered version
  errors instead of inheriting predecessor semantics at the identified
  silent-degrade gates.
- The public documentation projection teaches exactly the 0.71 format and
  the neutral layout, and the projection build and verification tooling
  verify it.
- The frozen NKF 0.2 process roots and predecessor distribution trees are
  removed from the working tree with the release-tooling review agreeing,
  and published archives remain the immutable history.
- The full accepted release order is performed without shortcuts: the
  independent authority audit precedes acceptance, the exact candidate
  passes the isolated exercise, the fresh independent release audit
  precedes the mandatory audit-bound confirmation Decision, and publication
  remains separately authorized.
- `npm run nkf:check` and the full test suite pass at every handoff, and one
  pull request delivers the complete release with `master` untouched until
  the Human Product Owner merges.

## Created-State Rule

This Task's creation and active declaration record human direction, scope,
plan, constraints, and evidence only. They do not accept a 0.71 authority
set, adopt no Design, confirm no Realization, establish no conformance, and
publish no release. Unlike a Task awaiting separate implementation
direction, the same recorded direction that created this Task explicitly
began its work. Later records and evidence supersede only the specific
created-state facts they explicitly replace.

## Current Progress

Created and begun on `2026-08-17` under the Human Direction above. The
starting state was verified before creation: NKF 0.7 published,
recommended, and producer-adopted; the
[NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
repair merged; and the complete gate green on `master` with equal baseline
and candidate graph revisions. At creation, the Tasks front page was
reconciled: the deterministic
[NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
close had left its hand-maintained state listing asserting the completed
repair Task as active, so the front page now defers lifecycle state to the
generated state indexes instead of duplicating it — a live instance of the
close-time staleness family this Task's seal-completing conclusion design
addresses.

The direction was adopted by
[ADR 0130](../../decisions/0130-adopt-the-nkf-0-71-corrective-successor-direction.md),
and the derived candidate authority set was accepted by
[ADR 0131](../../decisions/0131-accept-the-nkf-0-71-authority-set.md) after
the two-round
[independent authority audit](../../evidence/audits/nkf-031-nkf-0-71-independent-authority-audit.md)
whose first round found six blocking predecessor copy-forward findings in
the candidate executable — all repaired before the clean second round. The
accepted authority is implemented across the checker, adopter, seal
tooling, fixtures, and suite. Findings recorded during implementation, each
with its disposition:

1. The generated 0.71 graph-baseline schema violated the checker's strict
   compilation (a conditional requirement without an inline property
   definition); found by the test-driven verification, fixed in the
   generator, and the derived digest re-pinned — no accepted byte changed.
2. One remaining checker gate applied five neutral-path, succession, and
   provenance rules only to the literal predecessor version, silently
   skipping 0.71; found by the rule-coverage tests and fixed through the
   exhaustive per-version capability table.
3. A format finding: under the deployed 0.7 checker a non-Markdown evidence
   document's node revision carries no content digest, so a YAML evidence
   content change is invisible to the graph revision while the accepted
   prose expects source participation. The 0.71 checker deliberately keeps
   the deployed behavior, because the accepted 0.7-to-0.71 version delta
   declares every graph rule identical and a recomputation change would
   falsify it or break exact-conformant 0.7 repositories under the windowed
   checker; the divergence is recorded for a future version with an honest
   semantically-new classification.
4. A process finding against this Task's own execution: one implementation
   commit landed while the handoff gate was red, because a shell pipeline
   masked the gate's exit code and the failing step — the public-documentation
   verifier reading the not-yet-generated 0.71 release set — was truncated
   out of the captured output. The gate practice now records an explicit
   pass or fail marker, the release set was generated, and the repair is
   part of the release-surfaces work.
5. The release-tooling review resolved the deferred predecessor cleanup:
   the 0.6 contract tree, the 0.3 through 0.6 distribution trees, and the
   0.6 fixtures left the working tree — every removed byte remains in its
   published archive and version-control history — while the frozen NKF 0.2
   process roots at `integrations/release/` and `integrations/adoption/`
   deliberately remain, because the immutable accepted
   [ADR 0080](../../decisions/0080-release-and-adoption-process.md) source
   deep-links into them and their removal requires a link-history rule this
   deliberately small release does not introduce.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, authority-first derivation, versioned release, and deliberate migration; every 0.71 correction enters through this path. |
| [`adr-0007`](../../decisions/0007-markdown-yaml-authority.md) | record | Markdown remains normative human meaning; the reconciled topology must be stated in prose and executable explicitly, and an executable that silently diverges is a defect, never a fix. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Stable record identity, typed relationships, and bindings remain one coherent topology; the topology reconciliation changes required paths without forking identity. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | Unsupported required contract, claim, or trigger meaning fails closed; exact contract identity remains digest-bound. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a mechanical close seal is none of them. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | Deterministic evaluation cannot establish truth or adequacy; the seal-completing conclusion carries judgments mechanically and never substitutes for review. |
| [`adr-0049`](../../decisions/0049-common-and-root-profiles.md) | record | Meaning identical across Product and Technology belongs in Common; the topology reconciliation lands once in Common, not per profile. |
| [`adr-0050`](../../decisions/0050-product-and-technology-profiles.md) | record | Every bundle selects exactly one concrete Root Profile; no generic fallback is introduced. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement-surface change requires accepted authority, predecessor comparison, independent review, successor Realization, and exact confirmation. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks; 0.71 adds its registry binding without merging them. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every complete-set meaning change is a new immutable version with explicit compatibility and deliberate migration; 0.71 is that version for the sixth-audit findings. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate versioned protocols; its ordering applies as reconciled by the accepted 0.7 confirmation ordering. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive carries the complete versioned set, and exact candidate and post-action adoption states receive fresh independent audits. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own closed mechanics only and never supply meaning; the seal-completing conclusion extends the transition's closed mechanics and stays on that side of the line. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Every release member is deterministically enumerated and reviewed against the complete applicable rule set before a cut. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; the mechanical close seal carries existing judgments by digest identity and resolves no open uncertainty. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-031` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation resolves an immutable recommendation with explicit predecessor-relative compatibility signaling; the window slide must keep that signaling truthful for 0.6 and older repositories. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes every complete-set member; exact-candidate and ordinary public self-adoption are separate audited proofs; the producer gate remains a verified host superset. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The adopted freshness and knowledge-graph direction governs the graph meaning 0.71 extends; the canonical graph stays authored input and projections stay derived. |
| [`adr-0125`](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md) | record | Exact NKF 0.6 revision 3 is immutable predecessor authority; after the confirmed window slide its published archive is the stepping stone, and no 0.6 byte changes. |
| [`adr-0128`](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md) | record | The accepted NKF 0.7 authority set is the immutable predecessor authority this successor revises; its defects are corrected only through this governed 0.71 revision with explicit provenance and compatibility. |
| [`adr-0129`](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) | record | The confirmed and published 0.7 bytes stay untouched; 0.71 repairs nothing in place, and the 0.7 archive remains exactly as confirmed. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The accepted 0.71 successor Specification reconciles the topology contradiction with prose and executable in explicit agreement | unknown | none | none |
| Every copy-forward version label in the accepted 0.71 authority states its true version | unknown | none | none |
| Under 0.71 mechanics, a concluded Task's delivered tip carries equal baseline and candidate graph revisions with no hand-orchestrated post-close act | unknown | none | none |
| The 0.7-to-0.71 producer upgrade is proven through the digest-bound delta claim alone, with no whole-root review | unknown | none | none |
| The live window is exactly 0.71 plus 0.7 with truthful stepping-stone signaling for out-of-window repositories | unknown | none | none |
| Every version-comparing or windowing tooling surface handles the exact string `0.71`, with the five identified structural hazards eliminated fail-closed | unknown | none | none |
| The public documentation projection teaches exactly the 0.71 format and the neutral layout | unknown | none | none |
| The frozen predecessor process and distribution trees are removed with the release-tooling review agreeing | unknown | none | none |
| The full accepted release order is performed with independent audits preceding acceptance and confirmation | unknown | none | none |
| The complete gate and full suite pass at every handoff on the delivered branch | unknown | none | none |
