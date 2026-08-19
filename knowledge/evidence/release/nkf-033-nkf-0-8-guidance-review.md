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
| `distribution/nkf/0.8/integrations/adoption/nkf-adoption-protocol.md` | adoption-protocol | `26f07cc6a9564ad15bba418a605c10582dd8561807484c37ac58649632b4d930` |
| `distribution/nkf/0.8/integrations/ai/nkf-authoring-protocol.md` | authoring-protocol | `e1b8ea7e35d500d59ce24692fecfa360844458b9436535fb48892e8f1cd7b80b` |
| `distribution/nkf/0.8/host-adapters/AGENTS.adapter.md` | host-adapter-instruction | `0919110739d3402eeff13d4443a5e1ba51eb0f3571a76aead6f076c4116100a7` |
| `distribution/nkf/0.8/host-adapters/CLAUDE.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.8/host-adapters/GEMINI.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.8/host-adapters/copilot-instructions.adapter.md` | host-adapter-instruction | `d9a9d7ded74b90e019f35722b963e7dc55b45edfde7339e9e6e6300aaf219520` |
| `distribution/nkf/0.8/integrations/onboarding/nkf-onboarding-protocol.md` | onboarding-protocol | `972335517d16d9c06cedd1e7ef18e5909b468eafa08c59d1bdf58366061a893c` |
| `distribution/nkf/0.8/.agents/skills/nkf-authoring/SKILL.md` | portable-skill | `12a8da78e889f213b0e4cf159db2495f8d6087d87c8ab66c4d50ea2fc0f1097b` |
| `distribution/nkf/0.8/.agents/skills/nkf-onboarding/SKILL.md` | portable-skill | `cf5ad1e6413c050ec179d142a8fd6b5d2913cbfc286b246c5040d6bae7b07837` |
| `distribution/nkf/0.8/.claude/skills/nkf-authoring/SKILL.md` | portable-skill | `12a8da78e889f213b0e4cf159db2495f8d6087d87c8ab66c4d50ea2fc0f1097b` |
| `distribution/nkf/0.8/.claude/skills/nkf-onboarding/SKILL.md` | portable-skill | `cf5ad1e6413c050ec179d142a8fd6b5d2913cbfc286b246c5040d6bae7b07837` |
| `distribution/nkf/0.8/integrations/release/nkf-release-protocol.md` | release-protocol | `d4a771bfee8c5dee0fef78543f3faa3f824f1000626d38b9b84d64b31dab3129` |

The twelve members are nine distinct byte sets: each portable skill is emitted
into both host directories, and the `GEMINI` adapter is byte-identical to the
`CLAUDE` adapter. Each byte set was read in full, not diffed against its
predecessor.

The remaining one hundred twenty-nine members were not read in full, and saying so is
part of the record rather than a footnote to it. Three are byte-identical
copies of members already read — both onboarding skill twins and the shipped
onboarding protocol, in the documentation projection. The other one hundred twenty-six
were checked for a version literal that does not state NKF 0.8: the generated
release manifest carries the version by construction, and the one hundred twenty-five
readable members were scanned from their bytes. That scan found the defect
recorded below in the third-party notices; every other literal it surfaced is a
deliberate predecessor reference — the Specification's version lineage, the
adopter's window and stepping-stone tables, the projection's compatibility
prose. Step four now states these three parts separately, because a review that
enumerates one hundred forty-one members and reads twelve should say which twelve.

Every count in this paragraph and in the table above is computed from the
release set rather than typed. Three successive revisions of this document
stated one or another of them wrongly, each time in a repair meant to correct
the last.

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

Two independent release audits found sentences this review had read past. All
of them are recorded here rather than only in the audits, because step four
requires the review to record every correction and the honest record is that
the review did not find them. Both rounds are recorded because the count
matters: this is the second time.

### Found By The First Audit

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

### Found By The Second Audit

**The first repair of step three replaced one false universal with another.**
It read "no other class carries one". Eleven members carry the marker, across
six classes: the eight in the distribution tree, and three byte-identical
copies in the documentation projection. Step three now names the eight and the
three derived copies explicitly.

**The first repair of step three contradicted the paragraph it sat in.** The
new sentence said the host-adapter content "deliberately carries no version
literal at all" while the unchanged next sentence listed that same content
among "every version-bearing guidance member … emitted … with this version
injected". The paragraph was internally consistent before the repair and was
not after. It now says the version is injected into the members that state
one and the host-adapter content is emitted unchanged because it states none.

**The authoring protocol claimed a command capability that does not exist.**
It read "`migrate` performs the declared 0.71-to-0.8 upgrade beneath the one
public Adopt operation". Run against an in-window repository the shipped
adopter answers "migrate does not apply to an in-window NKF 0.71 repository;
use the ordinary Adopt update"; the upgrade is performed by Adopt. This is the
same class as the first audit's step-four finding and worse in one respect:
the sentence lived in the version-neutral source with placeholders, so the
generator would have re-emitted the falsehood at every future version. The
authoring skill's command family listed `migrate` the same way. Both now state
that `migrate` fails closed and that Adopt performs the upgrade.

**Two projection guides stated the wrong out-of-window boundary.** Both read "a
repository declaring NKF 0.1 through 0.6 is outside the support window". At
NKF 0.8 the boundary is 0.1 through 0.7, which each file's own next section
already said. They were true at 0.71 and carried verbatim through the hand
slide — the exact defect class this release exists to end, in the same two
files where this review had already found and hand-fixed one instance. Neither
file has frontmatter, so the deterministic self-description check cannot reach
them.

**Step four's re-read scope did not match what it requires.** It named "each
shipped protocol and portable skill" — eight members — while the enumeration
and the deterministic check cover all twelve. Step four now names the six
guidance classes, and requires a claim about what a command or tool does to be
corrected like any other stale sentence.

### Found By The Third Audit

**A shipped member carried a two-version-old label.**
`THIRD_PARTY_NOTICES.md` stated that its inventory "is bound to the implemented
NKF 0.6 checker and adopter source build-input graphs". It entered at the
NKF 0.6 implementation and has shipped unchanged inside the published 0.7 and
0.71 archives. It is a mutable release-set member that no verifier reaches: it
is not a guidance class, it has no frontmatter, and the self-description check
walks only Markdown under the guidance roots. It now states NKF 0.8.

Its cause is the more important finding. Step four opened by requiring a review
of "every member of the versioned set" and then narrowed to the guidance
classes, and this review covered twelve of one hundred forty-one without
disclosing the gap. The label lived in that gap for three releases. Step four
now states three parts — enumerate every member, re-read the guidance classes
in full, and check every remaining member for a version literal — and requires
the review to say which members received which.

## Reviewed Without Correction

The four host-adapter instruction members carry no version literal at all and
required none. The onboarding protocol and both onboarding skill twins state
NKF 0.8 throughout, including the frontmatter description that carried the
published NKF 0.71 defect — that sentence now reads "prepare its NKF 0.8
candidate" because the generator wrote it, not because anyone edited a line.
The authoring skill's account of the Task transition, the seal-completing
conclusion, and the deep-link and title rules matches the accepted NKF 0.8
authority; its command family did not, and is corrected above. The adoption protocol's support-window
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
member is named by its full path with a reviewed digest equal to its bytes.

Stale sentences survived this review in the first, second, and third audit
rounds, and repairs made in each of the first four rounds introduced further
defects that the following round found. This document deliberately states no
tally of either: the per-round tables in the
[release audit](nkf-033-nkf-0-8-release-audit.md) are the record, three
successive attempts to summarise them as a number were each wrong, and a
hand-counted total of one's own failures is exactly the kind of claim this
release has demonstrated a reviewer cannot be trusted to get right.

What the rounds do establish, without arithmetic, is the shape. Every stale
sentence found in shipped guidance was body prose, which the new rule is scoped
away from by contract, so the whole-set re-read is their only control. And every
defect found after the delivery settled was in this hand-written record rather
than in what ships. The independent release audit verifies this review; it does
not inherit its conclusions.
