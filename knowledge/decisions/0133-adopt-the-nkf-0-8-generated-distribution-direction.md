---
id: adr-0133
type: decision
title: "ADR 0133: Adopt The NKF 0.8 Generated Distribution Direction"
summary: Adopt the NKF 0.8 Design direction that ends the recurring stale-guidance defect class at its source — deriving every versioned guidance copy from one version-neutral authored source with the version injected, making a guidance file's own self-description a checked conformance position, correcting release-protocol step six to the already-accepted full-set standard, admitting the guidance verifiers into the version-keyed accepted integration chain, and sliding the live window to exactly NKF 0.8 plus NKF 0.71 — without accepting an authority set or authorizing publication.
created_at: 2026-08-19T00:35:00Z
---

# ADR 0133: Adopt The NKF 0.8 Generated Distribution Direction

## Context And Problem

Every NKF version release has left a document or skill behind, and the Human
Product Owner directed that this be root-caused rather than patched again. The
most recent instance is not a proposal but a shipped fact: a stale version
label is inside the published, immutable NKF 0.71 archive
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`, where the
onboarding portable skill's frontmatter `description` directs an agent to
"prepare its NKF 0.7 candidate" while its own marker states `NKF Version:
0.71`.

Two independent causes produced it, and each recurs by construction. Nothing
generated the versioned distribution tree, so cutting a version copied the
predecessor tree and edited the marker line — the 0.7 and 0.71 distributed
onboarding skills differ by exactly that one line — and only the marker was
enforced, so every other version-bearing sentence rotted by default. And
release-protocol step six still directed the independent audit to verify that
the step four review "was performed against the actual rule diff" after
[ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md) had
widened step four to the whole versioned set, so a diff-scoped review passed
an audit that had been told to check the superseded standard, and the full-set
requirement was enforced by nobody.

Neither half can be repaired where it is visible.
[ADR 0109](../decisions/0109-publication-freeze-and-proven-self-adoption.md)
freezes the published set permanently, and four surfaces are byte-locked by
the installed NKF 0.71 pin — the installed onboarding skill, the
`nkf:check:host` chain, the `check` chain, and the published distribution and
projection bytes — each established by attempting the correction and being
refused. The pin makes a published mistake mandatory for the producer and
simultaneously locks the verification chain, so the producer cannot add the
check that would have caught it.

The [NKF 0.8 Generated Distribution Design](../designs/items/nkf-0-8-generated-distribution.md)
under
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
proposes the successor that removes both causes, with every planning question
resolved by the Human Product Owner before this adoption.

## Decision

Adopt the exact direction proposed by the
[NKF 0.8 Generated Distribution Design](../designs/items/nkf-0-8-generated-distribution.md),
and allocate the version coordinate `0.8` — read as a full successor version
under the major-minor coordinate model — to it:

1. Version-bearing guidance text has exactly one authored source. Every
   emitted copy is written from that source with the version injected, no
   emitted tree is ever read as an input, and the source may contain no
   literal NKF version at all. Stamp-scoped and declared-literal regions are
   the only authored escapes, and the predecessor a target names is derived
   per stamp rather than passed in.
2. Emission is verifiable in both directions: writing produces the tree,
   checking regenerates into memory and compares against the committed bytes,
   and writing into a frozen published tree is refused outright.
3. A guidance file's own frontmatter `description` becomes a checked
   conformance position: a version literal there must state that file's
   declared version, enforced by one added rule in the stable registry. The
   body remains deliberately unchecked, because policing prose agreement is
   the false confidence
   [ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md)
   rejected.
4. Release-protocol step six directs the independent audit to verify full-set
   coverage — the enumerated member list, each reviewed digest, and every
   correction — with no surviving rule-diff instruction, and a review
   recording only the version's rule diff is rejected. This propagates
   already-accepted
   [ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md)
   meaning into a derived protocol that contradicted it and creates no new
   Product meaning.
5. The member list a pre-cut review must name is computed deterministically
   from the reviewed version's own release set, and a review naming fewer
   members than the set declares fails.
6. The three deterministic guidance checks join the accepted integration chain
   at NKF 0.8. The expected chain becomes version-keyed, so a repository
   declaring NKF 0.71 keeps exactly the chain it accepted and a repository
   declaring NKF 0.8 must carry the new stages; the producer's own chain
   changes only when the producer deliberately adopts NKF 0.8.
7. The live support window becomes exactly NKF 0.8 plus NKF 0.71, explicitly
   confirmed by the Human Product Owner. NKF 0.7 drops to stepping-stone
   history with an explicit fail-closed signal naming the published 0.71
   archive, each older repository is named its own next archive, and the 0.7
   contract and distribution trees leave the working tree while every removed
   byte stays retrievable from its published archive.
8. The 0.71-to-0.8 compatibility is classified `non-breaking` with no path,
   identity, or declaration-shape migration; an adopted 0.71 repository
   upgrades through the ordinary public Adopt update with a mechanical
   contract rebind and the digest-bound delta carry. The added rule
   participates in no declared judgment-dependency list, so it widens no
   required fresh-review set.
9. Every tooling surface that compares, windows, dispatches, or constructs
   version strings registers `0.8` exactly, verified against an exhaustive
   inventory rather than a sample. Per-version schema derivation and
   release-set regeneration remain per-version because each encodes its own
   delta.
10. Each new check ships with a fixture that fails closed on the exact NKF
    0.71 defect, so the enforcement is proven against the real historical
    bytes.
11. The full accepted release order applies without shortcuts: the exact
    authority set is accepted only after a fresh independent audit, the
    complete set is re-read in full under the corrected step six with the
    enumerated member list and reviewed digests recorded, the exact candidate
    is exercised in isolation, a fresh independent release audit precedes the
    mandatory audit-bound technical-confirmation Decision, and publication,
    recommendation, live promotion, and merges remain separately authorized
    Human Product Owner acts.

## Scope And Applicability

This Decision adopts the Design direction for the NKF 0.8 work owned by
[NKF-033](../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md).
It governs derivation of the exact NKF 0.8 authority set and its
implementation, generation topology, fixtures, projection regeneration,
predecessor cleanup, release process, and producer promotion. The producer's
own adoption to published NKF 0.8 is separate work on its own stacked pull
request. Review-quality measurement, multi-writer semantics, large-monolith
onboarding, repository visibility, qualifying accepted records with later
findings owned by
[NKF-034](../tasks/items/NKF-034-qualify-accepted-records-with-later-findings.md),
and the protected merge gate owned by
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) remain
outside it.

## Rationale

The defect class survived four releases because both of its causes are
invisible to the controls that were supposed to catch them. A hand-copied tree
looks correct: the only line a reviewer is trained to check is the only line
the copy changed. An audit instructed to verify the superseded standard
reports success truthfully. Removing the duplication is therefore not
housekeeping — it is the only change that makes the class structurally
unavailable, because a source that may not state a version cannot state a
stale one.

The self-description rule earns format meaning rather than remaining a build
script because the position it guards is a consumer-visible position: an
adopted repository installs guidance and can install it stale. Making it a
registry rule is what converts the fix from something only this producer could
have caught into something every NKF 0.8 repository catches. Keeping the body
unchecked keeps the rule honest about what determinism can establish.

That the enforcement requires a version at all is itself evidence for the
direction: the attempt to add it under the 0.71 pin was refused four times,
and the refusals are the mechanism working correctly. The accepted chain is
part of the accepted set, so changing it is a version act.

## Alternatives Considered

The Design records the rejected alternatives with reasons: correcting the
stale sentences and stopping, repairing the published NKF 0.71 archive in
place, machine-checking every guidance sentence against the contract,
generating the distribution tree from the predecessor tree, adding the
guidance checks without a new version, and restating the full-set guidance
review as a new Decision.

## Consequences And Trade-Offs

Guidance authors gain one indirection: a sentence is edited in the source and
never in the tree a reader browses, and an emitted file becomes read-only in
practice. In exchange, the eleven-copy duplication cannot reappear and a
version literal can no longer go stale in a file that is forbidden to state
one. The window slide makes stepping-stone migration the only path for 0.7 and
older repositories, which the direction accepts and signals explicitly. One
rule joins the registry that every future version inherits, and the accepted
integration chain becomes version-keyed, which every future version must
maintain deliberately.

The published NKF 0.71 archive keeps its stale label permanently. That is the
cost of the publication freeze, and this Decision accepts it rather than
eroding the freeze: the correction lives in the successor, and the finding
stays recorded against 0.71 as history.

## Non-Claims

This Decision accepts no NKF 0.8 authority set, no schema, checker, adopter,
generator, or fixture bytes, and no migration. It confirms no Realization,
establishes no conformance, authorizes no publication, recommendation,
producer promotion, or visibility change, and concludes no Task. It does not
restate, revise, or duplicate
[ADR 0097](../decisions/0097-full-set-guidance-review-and-enumeration.md),
whose full-set guidance review it implements unchanged. The Design remains
proposal knowledge with an adopted disposition; normative NKF 0.8 meaning
requires the separately accepted authority set after its independent audit and
the mandatory audit-bound confirmation Decision.
