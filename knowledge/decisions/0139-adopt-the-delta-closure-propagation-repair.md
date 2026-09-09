---
id: adr-0139
type: decision
title: "ADR 0139: Adopt The Delta Closure Propagation Repair"
summary: Adopt, as the seventh confirmed boundary of the NKF 0.81 direction, the repair of a checker and adopter defect against accepted meaning — the delta-review closure the seal computes omits the impact propagation the accepted 0.8 Specification requires, and the validating checker never recomputes it — so that under NKF 0.81 the seal walks the evaluation policy's propagation map and the checker recomputes and compares the closure, without changing what the Specification already means.
created_at: 2026-09-08T18:51:27Z
---

# ADR 0139: Adopt The Delta Closure Propagation Repair

## Context And Problem

The accepted NKF 0.8 Specification defines the computed closure of a
`semantically-reviewed-delta` claim to include "every node reached from those
inputs by the evaluation policy's impact propagation". Two implementation
facts leave that sentence unenforced. The seal in
`scripts/freshness/seal-baseline-0-7.mjs` computes the closure from
digest-changed nodes, new nodes, and pending promotion reconciliation only,
and never walks the propagation map the evaluation policy declares. The
validating checker verifies that a claim's performed set contains the closure
the claim itself recorded; it does not recompute the closure from the graph,
so a seal that omitted propagation is accepted as complete.

The consequence was found while the Human Product Owner asked how ten frozen
supporting Realizations had stayed stale through eight versions without any
guardrail firing. They had been migrated with empty relationship lists, so no
edge could reach them, and even where edges exist, superseding a Decision
today — as [ADR 0136](0136-adopt-the-public-repository-direction.md) did to
part of [ADR 0064](0064-release-documentation-and-adoption.md) — pulled no
dependent into review. Every delta seal since NKF 0.7 has been narrower than
the Specification requires.

[ADR 0138](0138-adopt-the-nkf-0-81-public-adoption-direction.md) adopted the
NKF 0.81 direction with six confirmed boundaries and explicitly left this
finding for separate confirmation. The Human Product Owner confirmed it
verbatim on `2026-09-08`: "7 - yes . go on".

## Decision

Adopt the repair as the seventh boundary of the
[NKF 0.81 Public Adoption Design](../designs/items/nkf-0-81-public-adoption.md)
under
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md):

1. The finding is classified as a checker and adopter defect against accepted
   meaning. The 0.8 Specification's closure definition is correct and is not
   changed; the 0.81 successor states the checker's recompute obligation
   explicitly so the two implementations cannot drift again.
2. Under NKF 0.81 the seal computes the delta closure from the changed inputs
   and every node reached from them by the evaluation policy's propagation
   map, and records that closure in the claim.
3. Under NKF 0.81 the validating checker recomputes the closure from the
   candidate graph, the predecessor baseline, the policy, and the accepted
   version-delta declaration, and refuses a claim whose recorded closure
   differs from the recomputed one, naming the missing subjects.
4. Repositories sealed under NKF 0.8 or earlier are not re-reviewed by
   implication. The first delta review under 0.81 computes the propagated
   closure from that point; whole-root review remains the recovery path where
   a repository's authority judges the carried history insufficient.
5. The retirement of the ten frozen Realizations under [ADR 0138](0138-adopt-the-nkf-0-81-public-adoption-direction.md) closes the
   empty-relationship migration issue for those records; no other record is
   changed by this Decision.

## Scope And Applicability

This Decision governs the 0.81 seal and checker implementation of the delta
closure and the successor Specification sentence that states the recompute
obligation. It applies to the work owned by
[NKF-038](../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
It does not reopen any sealed baseline, re-review any carried judgment, or
change the evaluation policy's propagation map.

## Rationale

A fail-closed claim that is verified only against itself is not fail-closed.
The Specification placed the closure computation in the checker precisely so
an auditor could verify containment without recomputing; when the checker
trusts the recorded closure, that guarantee is inverted. Repairing both sides
in the same version keeps one authority for the computation and one
independent verification of it, which is the shape every other digest-bound
mechanism in NKF already has.

Classifying the finding as a defect rather than a Specification change keeps
the accepted meaning stable and puts the correction where the fault is. Not
re-reviewing history by implication respects the seals already made under the
accepted rules of their time; the Human Product Owner may direct a whole-root
review where the carried history matters.

## Alternatives Considered

Leaving the defect recorded for a later version was rejected because 0.81
already changes the seal and checker, and because the defect is the mechanism
by which stale records evade review. Forcing a whole-root review of this
producer at 0.81 adoption was rejected as disproportionate for a repository
whose stale records are being retired under the same release; the Human
Product Owner may still direct it. Changing the Specification's closure
definition to match the implementation was rejected because the definition is
right and the implementation is wrong.

## Consequences And Trade-Offs

Delta reviews under 0.81 will require more fresh judgments than under 0.8
whenever a changed node has edges, which is the intended cost of a truthful
closure. The seal's closure computation and the checker's recompute must
agree byte-for-byte on the same inputs, so both are derived from one shared
implementation with fixtures proving containment refusals. Every seal made
under 0.7 through 0.8 stands as sealed, and this Decision records that they
were narrower than the Specification required.

## Non-Claims

This Decision accepts no NKF 0.81 authority set and no checker, adopter, or
fixture bytes. It changes no accepted meaning, reopens no baseline, confirms
no Realization, establishes no conformance, and authorizes no publication or
promotion. It does not edit [ADR 0138](0138-adopt-the-nkf-0-81-public-adoption-direction.md).
