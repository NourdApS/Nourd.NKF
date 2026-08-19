---
title: NKF-033 NKF 0.8 Guidance Review
summary: Records the mandatory pre-cut guidance review for the NKF 0.8 versioned set under the corrected release-protocol step four — the deterministically enumerated member list, the reviewed digest of every guidance member, every correction made including the two the first independent release audit found that this review missed, and the findings recorded rather than fixed.
created_at: 2026-08-19T02:45:00Z
---

# NKF-033 NKF 0.8 Guidance Review

This is the pre-cut guidance review [ADR 0095](../../decisions/0095-review-guidance-before-cutting.md)
makes mandatory and [ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
widened to the whole versioned set. It is performed under
[NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
against the corrected release-protocol step four and step six — the correction
this release delivers, applied to its own cut.

## Enumeration

The member list is not recollected. It is the exact enumeration the adopter's
`set` command emits for the NKF 0.8 release set, taken from
`contracts/nkf/0.8/release-set.yaml`: one hundred forty-one members across
twenty-three classes. Twelve of them belong to the classes that carry authored
guidance prose, and step four requires each of those to be re-read in full
against the complete accepted NKF 0.8 rule set. Every one was. The digests
below are computed from each member's exact bytes; `set` emits paths, classes,
and modes, not digests.

| Member | Class | Reviewed SHA-256 |
| --- | --- | --- |
| `distribution/nkf/0.8/integrations/adoption/nkf-adoption-protocol.md` | adoption-protocol | `fd9d62b23f202fe2f5b7bebf51755b8e0662c534ff183bc5a792cd2921072137` |
| `distribution/nkf/0.8/integrations/ai/nkf-authoring-protocol.md` | authoring-protocol | `f798a6bbee4e1aae684691225cb52de2866d5b1165029a66ae0081ddb16706c3` |
| `distribution/nkf/0.8/host-adapters/AGENTS.adapter.md` | host-adapter-instruction | `0919110739d3402eeff13d4443a5e1ba51eb0f3571a76aead6f076c4116100a7` |
| `distribution/nkf/0.8/host-adapters/CLAUDE.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.8/host-adapters/GEMINI.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.8/host-adapters/copilot-instructions.adapter.md` | host-adapter-instruction | `d9a9d7ded74b90e019f35722b963e7dc55b45edfde7339e9e6e6300aaf219520` |
| `distribution/nkf/0.8/integrations/onboarding/nkf-onboarding-protocol.md` | onboarding-protocol | `972335517d16d9c06cedd1e7ef18e5909b468eafa08c59d1bdf58366061a893c` |
| `distribution/nkf/0.8/.agents/skills/nkf-authoring/SKILL.md` | portable-skill | `8a75eaceba8d6de4a2ef092ce5ee39e09925de949e22a8c0838b4758591c8fea` |
| `distribution/nkf/0.8/.agents/skills/nkf-onboarding/SKILL.md` | portable-skill | `cf5ad1e6413c050ec179d142a8fd6b5d2913cbfc286b246c5040d6bae7b07837` |
| `distribution/nkf/0.8/.claude/skills/nkf-authoring/SKILL.md` | portable-skill | `8a75eaceba8d6de4a2ef092ce5ee39e09925de949e22a8c0838b4758591c8fea` |
| `distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md` | portable-skill | `cf5ad1e6413c050ec179d142a8fd6b5d2913cbfc286b246c5040d6bae7b07837` |
| `distribution/nkf/0.8/integrations/release/nkf-release-protocol.md` | release-protocol | `7a0cd30f255d087403e2f9deba0f30faec8d9de7c64c430f5950dba16b86ebf6` |

The twelve members are nine distinct byte sets: each portable skill is emitted
into both host directories, and the `GEMINI` adapter is byte-identical to the
`CLAUDE` adapter. Each byte set was read in full, not diffed against its
predecessor.

## Corrections Made

**The adoption protocol described the wrong contract set.** Its non-breaking
upgrade section read "the mechanical contract rebind to the 0.71 set,
conversion of the reviewed baseline to the digest-bound 0.71 contract" in the
emitted NKF 0.8 tree. The upgrade rebinds to the 0.8 set. Corrected at the
source to the version placeholder and regenerated.

**The generator's own neutrality guard let it through.** The source carried the
bare literal `0.71` in a sentence with no `NKF` prefix, and the guard matched
only the `NKF x.y` and `x.y-to-x.y` forms. This is the defect class this
release exists to end, reappearing inside the mechanism built to end it, and it
reached the emitted tree. The guard now rejects any bare major-minor token in
the source, with the declared-literal region as the only escape, and
[`test/guidance-generation.test.ts`](../../../test/guidance-generation.test.ts)
proves it against this exact sentence.

**Release-protocol step three did not state the derivation rule.** It described
building the versioned set without saying that every version-bearing guidance
member is emitted from the single version-neutral source with the version
injected, that no predecessor member is copied, and that a member whose bytes
differ from its derivation is invalid. Step three now states it.

**The authoring protocol did not state the derivation boundary.** An author
following it had no instruction against editing an emitted guidance member in
place. It now says to correct the source and regenerate, and that an edit to an
emitted member is rejected against its own derivation.

## Corrections This Review Missed

The first independent release audit of the exact candidate found two stale
sentences this review had read past, both in the release protocol itself — the
artifact that defines this review. They are recorded here rather than only in
the audit, because step four requires the review to record every correction and
the honest record is that the review did not find these.

**Step four described a command capability that does not exist.** It read "the
adopter `set` command emits every member with its digest and version stamp".
It does not: for every version carrying a release-set contract — which is every
version this protocol governs — `set` returns the accepted release-set members
with their paths, classes, and modes, and the branch computing digests and
stamps is unreachable. Two other members of the same accepted set stated it
correctly, so the release would have shipped a self-contradiction. Step four
now states what `set` emits and that the reviewer computes each reviewed digest
from the member's exact bytes.

**Step three asserted a marker universal that is false for most of the set.**
It read "Every artifact in the set declares the version it serves through the
exact guidance marker". Eleven of the one hundred forty-one members carry that
marker. The four host-adapter members carry no version literal at all — which
this review's own next section records — and neither do the licences, schemas,
checker, adopter, fixtures, examples, or most of the projection. Step three now
scopes the claim to the four shipped protocols and the portable skills and
states that the host-adapter content deliberately carries none.

## Reviewed Without Correction

The four host-adapter instruction members carry no version literal at all and
required none. The onboarding protocol and both onboarding skill twins state
NKF 0.8 throughout, including the frontmatter description that carried the
published NKF 0.71 defect — that sentence now reads "prepare its NKF 0.8
candidate" because the generator wrote it, not because anyone edited a line.
The authoring skill's account of the deterministic command family, the Task
transition, the seal-completing conclusion, and the deep-link and title rules
matches the accepted NKF 0.8 authority. The adoption protocol's support-window
table, stepping-stone sentence, and producer-promotion section state the
0.8-plus-0.71 window correctly.

## Findings Recorded Rather Than Fixed

**Six public-documentation members are outside the generator.** Of the eleven
`public-documentation` members, five are derived — the two onboarding skill
twins and the shipped onboarding protocol are byte-identical to their
`distribution/nkf/0.8` sources, the reference Specification copies the accepted
Markdown, and the public adopter copies `dist` — and six are hand-authored:
the projection README, two concept pages, and three guides. Sliding those six
for this release was a hand edit, and it surfaced a genuinely wrong
stepping-stone table: the migration guide named the published 0.7 archive
digest under an NKF 0.71 label and had no row for a 0.7 repository at all. It
was corrected by hand, which is exactly the fragility NKF 0.8 removes from
guidance and has not removed from the projection. Bringing the projection under
the generator is beyond the direction
[ADR 0133](../../decisions/0133-adopt-the-nkf-0-8-generated-distribution-direction.md)
adopted, which names the six guidance classes explicitly, so it is recorded
here for a successor rather than widened into this release.

**The two protocol roots are stamped at the adopted version.** Nothing installs
`integrations/release/nkf-release-protocol.md` or
`integrations/adoption/nkf-adoption-protocol.md`, so the generator emits them
at the version this repository has adopted — NKF 0.71 — while they carry the
corrections that ship in NKF 0.8. That is the deliberate `stamp: adopted`
behavior recorded in the guidance-source manifest, and it is what lets the
producer follow the corrected release protocol before adopting the version it
releases. It is recorded so a reader does not mistake the marker for a claim
that the corrections are 0.71 meaning.

**The producer's installed authoring protocol cannot carry the new sentence.**
Its bytes are mandated by the installed NKF 0.71 pin, so the derivation
boundary reaches the producer only when the producer adopts NKF 0.8. The
shipped NKF 0.8 copy carries it.

## Boundary

This review establishes coverage and records what was read and corrected. It
does not establish that the guidance is true: agreement between guidance prose
and the accepted authority is a semantic judgment, and the deterministic check
that accompanies this review verifies only that every enumerated guidance
member is named with a reviewed digest equal to its bytes. That two stale
sentences survived this review and were caught by the independent audit is the
recorded measure of how far a review's coverage claim reaches. The independent
release audit verifies this review; it does not inherit its conclusions.
