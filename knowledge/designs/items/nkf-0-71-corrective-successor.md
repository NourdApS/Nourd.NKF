---
id: design-nkf-031-corrective-successor
type: design
title: NKF 0.71 Corrective Successor
summary: This Design proposes NKF 0.71, the deliberately small corrective successor to published NKF 0.7 — reconciling the accepted specification's topology self-contradiction and version-label errors, closing the close-and-seal ordering hole with the seal-completing conclusion, regenerating the public documentation projection, sliding the live window to exactly 0.71 plus 0.7, and proving the delivered delta-review machinery on the first delta-only producer upgrade.
created_at: 2026-08-17T17:20:00Z
---

# NKF 0.71 Corrective Successor

## Design Kind Problem And Scope

This is a Technology specification, contract, tooling, release, and
distribution Design under
[NKF-031](../../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md). It
proposes NKF 0.71, one corrective successor to the immutable published
NKF 0.7 set, scoped to the defects the sixth independent audit recorded in
the
[whole-NKF master audit](../../evidence/audits/nkf-030-whole-nkf-master-audit.md):

- The accepted 0.7 Specification contradicts itself. Its Portable Knowledge
  Topology chapter still requires the `realizations/current/README.md` index
  and the supporting-current linking rule, while its neutralization chapter
  abolishes the `realizations/current` tree and forbids new
  currency-asserting paths. The executable companion silently omits the
  requirement — the exact silent divergence the format forbids — and carries
  a vestigial supporting-current placement key.
- The accepted Specification's evaluation-policy section carries copy-forward
  version-label errors: it attributes the 0.7 freshness policy to "NKF 0.6"
  and states the `hard` consequence class as being "in 0.6".
- Closing the delivering Task changes the knowledge graph after the last
  seal that Task can perform, so every delivery lands one mechanical step
  stale. The
  [NKF-029](../../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md)
  and
  [NKF-030](../../tasks/items/NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
  closes each required a hand-orchestrated post-close reseal commit, and the
  same close-time hole left the hand-maintained Tasks front page asserting a
  completed Task as active on the merged default branch.
- The published archive's public-documentation projection still teaches
  NKF 0.6 and the state-baked layout, and the projection tooling was never
  brought to 0.7.
- The frozen NKF 0.2 process roots and the predecessor distribution trees
  remain in the working tree, explicitly deferred to this version by
  [NKF-030](../../tasks/items/NKF-030-repair-the-merged-master-gate-and-stale-navigation.md).

This Design does not add review-quality measurement, multi-writer semantics,
or large-monolith onboarding — all explicitly deferred by the Human Product
Owner — and does not change repository visibility or the protected merge
gate owned by
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md).

## Governing Inputs And Constraints

[ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
accepts the immutable NKF 0.7 authority set this Design corrects; every
correction enters through this governed successor, never in place.
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md)
binds the confirmed published bytes that stay untouched.
[ADR 0096](../../decisions/0096-deterministic-governed-mechanics.md) and
[ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md)
fix the boundary the seal-completing conclusion must not cross: deterministic
commands own closed mechanics and never supply meaning.
[ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
requires truthful predecessor-relative compatibility signaling as the window
slides. [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
freezes published sets and requires exact-candidate proof and independent
audit.
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
keeps the canonical graph authored and projections derived.
[ADR 0125](../../decisions/0125-accept-the-nkf-0-6-revision-3-authority-set.md)
accepts the immutable 0.6 authority whose published archive becomes the
stepping stone.

The Human Product Owner fixed the governing constraints in the
[NKF-031](../../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md)
planning conversation, recorded verbatim in the owning Task: the version
string is exactly `0.71`; the 0.7-to-0.71 producer upgrade must be provable
through the digest-bound delta claim alone with no whole-root review, and an
unprovable delta is recorded as an NKF 0.7 defect finding, never waived;
0.71 stays deliberately small; the full accepted release order applies
without shortcuts; the live window becomes exactly 0.71 plus 0.7 with
NKF 0.6 dropping to stepping-stone history — answered verbatim "Confirmed";
and the seal-completing conclusion is the adopted close-and-seal direction —
directed verbatim "go with option B . Seal-completing conclusion."

## Proposed Direction

### Reconciled Topology

The successor Specification states one reconciled topology in prose and
executable explicitly. The required-topology table drops the abolished
`realizations/current/README.md` row; the realizations index rule states the
neutral layout the shipped tooling already generates — the index links the
consolidated current-system Realization and every Realization source below
`realizations/items/` exactly once; the supporting-current linking clause and
the vestigial executable supporting-current placement key are removed; and
the neutralization chapter's legacy mapping continues to resolve historical
references to the abolished tree. Where NKF 0.7's executable silently omitted
the contradicted requirement, NKF 0.71's prose and executable agree in the
open: the Markdown is normative, and executable divergence is a defect, not
a reconciliation mechanism.

### True Version Labels

Both evaluation-policy labels are corrected to state their true version —
the 0.71 policy is distributed by NKF 0.71, and the `hard` consequence-class
restriction is stated for 0.71 — and one full copy-forward label pass over
the successor text verifies that every remaining predecessor mention names
its true version deliberately.

### Seal-Completing Conclusion

The deterministic Task conclusion — close, defer, and cancel — becomes
seal-completing: after applying the declared state change and regenerating
the lifecycle indexes, the same transaction reseals the baseline over its
own delta, so the concluded tip carries equal baseline and candidate graph
revisions with no hand-orchestrated post-close act.

The mechanism stays strictly mechanical through a new authority-declared
carry: a conclusion delta is admissible only when it is exactly the closed
mechanical vocabulary — the concluded Task's declared state value changed
under the accepted state machine, the generated state indexes were
regenerated, and nothing else moved. Within that closed delta, the concluded
Task node's existing judgments carry with recorded conclusion provenance:
their basis digests and source digests are unchanged, the only revision
input that moved is the closed state value, and the carry is computed and
recorded as carried, never asserted. Every other judgment carries by
ordinary digest identity. A conclusion whose delta exceeds the closed
vocabulary fails closed and demands the ordinary review path first; the
conclusion supplies no semantic judgment and resolves no open uncertainty.

Activation receives the same treatment: a state-only activation delta seals
identically, while a creation delta — a new node — remains ordinary
authoring with a fresh judgment, exactly as today.

The residual close-time staleness channel — hand-maintained prose that
duplicates lifecycle state — is closed operationally, not normatively: the
accepted topology already states that link labels and prose create no
semantic status, and the producer's Tasks front page now defers lifecycle
state to the generated indexes instead of duplicating it. The Specification
gains no new prose-policing rule; the generated indexes remain the only
lifecycle listing a conforming close must update.

### Version Coordinate And Window

The version string is exactly `0.71`: under the declared major-minor
coordinate model this is minor seventy-one, a full successor version to 0.7,
deliberately not an in-version revision of the 0.7 authority — accepted
records are immutable, and the correction path is a successor version. The
live support window becomes exactly 0.71 plus 0.7 under the standing
current-plus-one policy, explicitly confirmed by the Human Product Owner.
NKF 0.6 drops to stepping-stone history: a 0.6 repository receives an
explicit fail-closed signal naming the published 0.7 archive as its stepping
stone, and every published archive remains the immutable, self-contained
authority for its version. The 0.7-to-0.71 compatibility is classified
non-breaking with no path, identity, or declaration-shape migration: an
adopted 0.7 repository upgrades through the ordinary public Adopt update
with a mechanical contract rebind and the digest-bound delta carry. The
conditional window policy and its widening condition remain recorded in the
authority unchanged.

### Delta-Only Producer Upgrade

The 0.7-to-0.71 version delta is declared per rule over the complete
213-rule registry, seeded by the deterministic registry diff, with the named
reviewer judging the non-identical remainder. The producer promotion runs on
the delta review stage — the whole-root promotion review was 0.7's
deliberate one-time bootstrap — so carried judgments verify by digest
identity under the accepted delta and fresh review confines to the computed
closure of the 0.71 authoring itself. This is the delivered 0.7 headline
mechanism discharging its bootstrap promise on its first successor, and it
is the release's acceptance test in the isolated candidate exercise. If the
machinery cannot prove the upgrade on the delta claim alone, that inability
is recorded as an NKF 0.7 defect finding.

### Fail-Closed Version Gates

Every tooling surface that compares, windows, dispatches, or constructs
version strings registers `0.71` exactly, and the identified silent-degrade
gate family is refactored to fail closed: an unregistered version errors
instead of inheriting predecessor semantics at the checker's modern-envelope
and topology gates, the digest-bound baseline and reconciliation readiness
gates, the release-manifest composition gates, the pin-repository check, and
the guidance verifier. The five identified structural hazards are
eliminated: the release-class downgrade, the missing upgrade route, the
self-hosting predecessor assertion, the silent-degrade family, and the
unanchored schema-generator replacement. The archive-version sniff invariant
— one contract tree per archive — is preserved by shipping only the 0.71
contract tree in the 0.71 release set.

### Public Documentation Projection

The projection is regenerated to teach exactly the 0.71 format and the
neutral layout: the reference copy of the accepted successor Specification,
guides describing the items-based topology and generated lifecycle indexes,
the shipped adopter copy, and examples derived from the 0.71 fixtures. The
projection build and verification tooling — which never received 0.7 — is
brought current so the shipped projection is verified against the release
set rather than trailing it.

### Predecessor Working-Tree Cleanup

The frozen NKF 0.2 process roots and the predecessor distribution and
contract trees leave the working tree in one deliberate act performed with
the release-tooling review: historical member enumeration reconciles to the
published archives that permanently carry every predecessor byte, the
adopter's embedded-predecessor build input moves to the 0.7 contract tree,
and nothing the live window needs is removed. Published archives remain
untouched history.

### Consumer Applicability And Fixtures

The upgrade delta, conclusion carry, and refusal behavior are proven on
consumer-shaped Product and Technology fixtures, not only on the NKF
producer, so the closed conclusion vocabulary and the upgrade closure rules
are not overfitted to the producer's topology.

## Responsibilities Interactions And Information Flows

The accepted authority pair owns the reconciled topology, the corrected
labels, the conclusion-carry vocabulary, the per-rule 0.7-to-0.71 delta, the
window policy, and the compatibility classification. The checker owns
deterministic closure computation, carried-judgment verification including
the conclusion carry, delta-claim admission, and fail-closed version
dispatch. The adopter owns the upgrade route, the delta-stage producer
promotion, and the seal-completing conclusion mechanics. The named reviewer
owns every fresh judgment; the Human Product Owner owns adoption,
acceptance, the window, publication, recommendation, live promotion, and
merges. Conclusions flow from authored results through the deterministic
transition to the sealed baseline in one transaction; nothing in that flow
converts a computation into acceptance or confirmation.

## Alternatives And Trade-Offs

### Make Task-State Declarations Graph-Neutral

Excluding the declared lifecycle state from node revisions would make a
conclusion graph-neutral and no reseal necessary. Rejected by the Human
Product Owner in favor of the seal-completing conclusion: it blinds the
graph to lifecycle state, so a close would bind into no baseline and audit
reproduction would lose the state history; it turns the deepest
revision-computation rules semantically-new at exactly the release whose
acceptance test is a delta-only upgrade; and it repairs the symptom by
removing evidence rather than completing the transaction.

### Keep The Hand-Orchestrated Post-Close Reseal As Procedure

Documenting the workaround leaves the delivered-tip invariant dependent on
operator discipline outside the deterministic transition. Two live
occurrences already prove the cost, and the transition already owns the Git
conclusion act — owning the seal completes the same transaction. Rejected.

### Restore The Supporting-Current Tree Instead Of Reconciling To Items

Resolving the topology contradiction toward the chapter that requires
`realizations/current/README.md` would reintroduce the currency-asserting
tree 0.7 deliberately abolished, contradict the shipped executable and
generated navigation, and force another path migration on adopters. Rejected;
the neutralization direction is the accepted one, and the prose follows it.

### Correct The 0.7 Authority In Place As A Revision

Re-releasing the 0.7 authority as an in-version revision would repair
accepted immutable bytes in place and blur the correction's provenance. The
Human Product Owner chose the successor version `0.71`; under the
major-minor coordinate model it is a full successor, and the published 0.7
set remains exactly as confirmed. Rejected.

### Fold In Review-Quality Measurement

The audit's fitness caveat that review quality remains an accountable claim
rather than a measurable one invites a measurement mechanism. Explicitly
deferred by the Human Product Owner to keep 0.71 small; the caveat is
recorded, not addressed.

## Failure Safety Recovery And Operations

Every new mechanism fails closed. A conclusion whose delta exceeds the
closed mechanical vocabulary refuses and names the excess, with the ordinary
review-and-seal path as recovery. A delta claim smaller than the computed
closure is refused with the missing set named, and whole-root review remains
the universal recovery path. An unregistered version errors at every
formerly silent gate. An out-of-window repository receives the explicit
stepping-stone signal. The working-tree cleanup is one reviewed transactional
act, and every removed predecessor byte remains available in its published
content-addressed archive.

## Validation And Decision Evidence

The [whole-NKF master audit](../../evidence/audits/nkf-030-whole-nkf-master-audit.md)
grounds every corrected defect with exact locations and dispositions,
including the specification-fitness judgment. The two live close-reseal
occurrences are recorded in the
[NKF-029](../../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md)
and
[NKF-030](../../tasks/items/NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
branch histories and Completion Results. The exhaustive version-string
tooling inventory performed during planning — no lexical hazards, five
structural hazards, and the routine registration points — is recorded in the
owning Task's plan and drives the fail-closed gate work. Pre-acceptance, the
authority set receives a fresh independent audit against every confirmed
boundary; post-implementation, the exact candidate is exercised in an
isolated real-producer copy including the delta-only upgrade acceptance test
and refusal cases, and a fresh independent release audit precedes the
mandatory audit-bound technical-confirmation Decision before any separately
authorized publication.

## Unresolved Matters

No matter remains unresolved. The Human Product Owner resolved each planning
question on `2026-08-17` before adoption, recorded verbatim in the owning
Task: the close-and-seal direction is the seal-completing conclusion; the
predecessor working-tree cleanup is in scope; the live window becomes
exactly 0.71 plus 0.7 with NKF 0.6 as stepping-stone history — "Confirmed";
and the version string is exactly `0.71`, read as a full successor version
under the major-minor coordinate model. Review-quality measurement,
multi-writer semantics, and large-monolith onboarding remain explicitly
deferred without a version commitment.
