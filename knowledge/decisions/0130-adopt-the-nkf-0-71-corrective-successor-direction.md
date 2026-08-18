---
id: adr-0130
type: decision
title: "ADR 0130: Adopt The NKF 0.71 Corrective Successor Direction"
summary: Adopt the NKF 0.71 Design direction that reconciles the accepted 0.7 specification's topology self-contradiction and version-label errors through a governed successor, closes the close-and-seal ordering hole with the seal-completing conclusion, regenerates the public documentation projection, performs the deferred predecessor working-tree cleanup, and slides the live window to exactly 0.71 plus 0.7 with the 0.7-to-0.71 producer upgrade provable on the digest-bound delta claim alone, without accepting an authority set or authorizing publication.
created_at: 2026-08-17T17:25:00Z
---

# ADR 0130: Adopt The NKF 0.71 Corrective Successor Direction

## Context And Problem

The sixth independent audit, recorded in the
[whole-NKF master audit](../evidence/audits/nkf-030-whole-nkf-master-audit.md),
judged the accepted NKF 0.7 Specification fit-with-caveats and found defects
that repository-side repair could not fix because accepted bytes are
immutable: the topology chapter contradicts the neutralization chapter while
the executable companion silently omits the contested requirement; the
evaluation-policy section carries copy-forward version-label errors; the
deterministic Task close changes the knowledge graph after the delivering
Task's last seal, proven live by the hand-orchestrated post-close reseals of
[NKF-029](../tasks/items/NKF-029-adopt-the-producer-to-published-nkf-0-7.md)
and
[NKF-030](../tasks/items/NKF-030-repair-the-merged-master-gate-and-stale-navigation.md)
and by the stale hand-maintained Tasks front page on the merged default
branch; the published public-documentation projection still teaches NKF 0.6;
and the frozen predecessor process and distribution trees remain in the
working tree by explicit deferral.

The [NKF 0.71 Corrective Successor Design](../designs/items/nkf-0-71-corrective-successor.md)
under [NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md)
proposes one deliberately small corrective successor addressing exactly
these findings, with every planning question resolved by the Human Product
Owner before this adoption.

## Decision

Adopt the exact direction proposed by the
[NKF 0.71 Corrective Successor Design](../designs/items/nkf-0-71-corrective-successor.md),
and allocate the version coordinate `0.71` — read as a full successor
version under the major-minor coordinate model — to it:

1. One reconciled topology stated in prose and executable explicitly: the
   required topology drops the abolished supporting-current index, the
   realizations index rule states the neutral items layout the shipped
   tooling generates, and the vestigial executable supporting-current
   placement key is removed. The Markdown stays normative; silent executable
   divergence is a defect, never a reconciliation mechanism.
2. True version labels: both evaluation-policy labels are corrected and one
   full copy-forward label pass verifies every remaining predecessor mention
   in the successor text.
3. The seal-completing conclusion: the deterministic Task conclusion reseals
   the baseline over its own closed mechanical delta inside the same
   transaction, carrying the concluded Task's judgments under an
   authority-declared conclusion carry and every other judgment by digest
   identity, with zero fresh semantic review, failing closed on any delta
   exceeding the closed vocabulary. Hand-maintained prose stops duplicating
   lifecycle state as producer practice; the Specification gains no
   prose-policing rule.
4. The live support window becomes exactly NKF 0.71 plus NKF 0.7, explicitly
   confirmed by the Human Product Owner; NKF 0.6 drops to stepping-stone
   history with an explicit fail-closed signal naming the published 0.7
   archive; the conditional window policy and its widening condition remain
   recorded unchanged.
5. The 0.7-to-0.71 compatibility is classified non-breaking with no path,
   identity, or declaration-shape migration; an adopted 0.7 repository
   upgrades through the ordinary public Adopt update with a mechanical
   contract rebind and the digest-bound delta carry.
6. The producer promotion runs on the delta review stage: the 0.7-to-0.71
   upgrade must be provable through the digest-bound delta claim alone under
   the per-rule 0.7-to-0.71 version delta, with no whole-root review; an
   unprovable delta is recorded as an NKF 0.7 defect finding, never waived.
7. Fail-closed version gates: `0.71` registers at every version surface, the
   identified silent-degrade gate family errors on unregistered versions
   instead of inheriting predecessor semantics, and the five identified
   structural hazards are eliminated.
8. The public documentation projection is regenerated to teach exactly the
   0.71 format and neutral layout, with its build and verification tooling
   brought current.
9. The frozen NKF 0.2 process roots and predecessor distribution and
   contract trees leave the working tree in one deliberate act with the
   release-tooling review; published archives remain untouched history.
10. Consumer-shaped Product and Technology fixtures prove the upgrade delta,
    the conclusion carry, and refusal behavior.
11. The full accepted release order applies without shortcuts: the exact
    authority set is accepted only after a fresh independent audit, the
    exact candidate is exercised in isolation, a fresh independent release
    audit precedes the mandatory audit-bound technical-confirmation
    Decision, and publication, recommendation, live promotion, and merges
    remain separately authorized Human Product Owner acts.

## Scope And Applicability

This Decision adopts the Design direction for the NKF 0.71 work owned by
[NKF-031](../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md). It
governs derivation of the exact NKF 0.71 authority set and its
implementation, fixtures, projection regeneration, cleanup, release process,
and producer promotion. Review-quality measurement, multi-writer semantics,
large-monolith onboarding, repository visibility, and the protected merge
gate owned by
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) remain
outside it.

## Rationale

The accepted 0.7 authority is immutable, so its recorded defects can only be
corrected by a governed successor, and the sixth audit's findings are
exactly scoped: two specification contradictions, one structural ordering
hole, one stale projection, and one deferred cleanup. The seal-completing
conclusion completes the transaction the deterministic transition already
owns — it performs the Git conclusion act today but leaves the graph it
just changed unsealed — and it does so without crossing the mechanics
boundary, because the conclusion delta is a closed mechanical vocabulary
and the carry is computed, recorded, and refusable. The window slide follows
the standing current-plus-one policy with zero external adopters. Running
the promotion on the delta stage is not optional polish: it is the delivered
0.7 headline mechanism's bootstrap promise, and 0.71 is its first
enforcement point.

## Alternatives Considered

The Design records the rejected alternatives with reasons: making Task-state
declarations graph-neutral (rejected by the Human Product Owner in favor of
the seal-completing conclusion), keeping the hand-orchestrated post-close
reseal as documented procedure, restoring the supporting-current tree
instead of reconciling to the neutral layout, correcting the 0.7 authority
in place as a revision, and folding in review-quality measurement.

## Consequences And Trade-Offs

NKF 0.71 stays deliberately small, so the audit's remaining fitness caveats
— review quality as an accountable rather than measurable claim, and
single-producer shape — are recorded and deferred, not addressed. The window
slide makes stepping-stone migration the only path for 0.6 and older
repositories, which the direction accepts and signals explicitly. The
conclusion carry adds one new mechanical vocabulary to the baseline contract
that every future version inherits; in exchange, every future delivery lands
sealed-current by construction and the post-close workaround retires. This
Task's own close still runs under the pinned 0.7 adopter and is the last to
need the workaround; the fix activates at the live 0.71 promotion.

## Non-Claims

This Decision accepts no NKF 0.71 authority set, no schema, checker,
adopter, or fixture bytes, and no migration. It confirms no Realization,
establishes no conformance, authorizes no publication, recommendation,
producer promotion, or visibility change, and concludes no Task. The Design
remains proposal knowledge with an adopted disposition; normative NKF 0.71
meaning requires the separately accepted authority set after its independent
audit and the mandatory audit-bound confirmation Decision.
