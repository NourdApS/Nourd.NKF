---
title: NKF-038 NKF 0.81 Guidance Review
summary: Records the mandatory pre-cut guidance review for the NKF 0.81 versioned set under release-protocol step four — the deterministically enumerated one hundred forty-two-member list, the reviewed digest of each of the twelve guidance members re-read in full, the version-literal check of every remaining member, every correction made, and what was recorded rather than fixed.
created_at: 2026-09-09T05:10:00Z
---

# NKF-038 NKF 0.81 Guidance Review

This is the pre-cut guidance review
[ADR 0095](../../decisions/0095-review-guidance-before-cutting.md) makes
mandatory and
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
widened to the whole versioned set, performed under
[NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
against release-protocol step four in its three parts: enumerate every member,
re-read the guidance classes in full, and check every remaining member for a
version literal.

## Enumeration

The member list is not recollected. It is the exact membership of
`contracts/nkf/0.81/release-set.yaml` after its coverage was regenerated for
this version by the release tooling's deterministic coverage union — the same
accepted release-set contract the adopter's `set` command exports for a
repository that declares NKF 0.81; against this producer, which still declares
0.8, `set` exports the 0.8 set — one hundred forty-two members across
twenty-three classes. One
more than NKF 0.8, because the accepted catalog contract adds an eighth derived
Schema. Twelve members belong to the six classes that carry
authored guidance prose, and step four requires each of those to be re-read in
full against the complete accepted NKF 0.81 authority. Every one was. The
digests below are computed from each member's exact bytes; `set` emits paths,
classes, and modes, not digests.

| Member | Class | Reviewed SHA-256 |
| --- | --- | --- |
| `distribution/nkf/0.81/integrations/adoption/nkf-adoption-protocol.md` | adoption-protocol | `df3066e3b43fb78a1a6add384e4173083ad7965d4131f1079b330043c57b7b85` |
| `distribution/nkf/0.81/integrations/ai/nkf-authoring-protocol.md` | authoring-protocol | `46659b7e55766888d1fd2d2a4fe4b47880482a02f2c59798f1436b764f94d20c` |
| `distribution/nkf/0.81/host-adapters/AGENTS.adapter.md` | host-adapter-instruction | `0919110739d3402eeff13d4443a5e1ba51eb0f3571a76aead6f076c4116100a7` |
| `distribution/nkf/0.81/host-adapters/CLAUDE.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.81/host-adapters/GEMINI.adapter.md` | host-adapter-instruction | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.81/host-adapters/copilot-instructions.adapter.md` | host-adapter-instruction | `d9a9d7ded74b90e019f35722b963e7dc55b45edfde7339e9e6e6300aaf219520` |
| `distribution/nkf/0.81/integrations/onboarding/nkf-onboarding-protocol.md` | onboarding-protocol | `8bd3c1ccacef3aa4fc2ef200c5e58f2248a870dcb6e1be563bd4d5b58a6b2237` |
| `distribution/nkf/0.81/.agents/skills/nkf-authoring/SKILL.md` | portable-skill | `5da4e0f680a03c7322c5894126f345d09be5710a26e2c858a3055eea691a42b1` |
| `distribution/nkf/0.81/.agents/skills/nkf-onboarding/SKILL.md` | portable-skill | `f4053d8b27db4ee6298d96b278dd3ad446108e19c9b8a72a436d13931bb11544` |
| `distribution/nkf/0.81/.claude/skills/nkf-authoring/SKILL.md` | portable-skill | `5da4e0f680a03c7322c5894126f345d09be5710a26e2c858a3055eea691a42b1` |
| `distribution/nkf/0.81/.claude/skills/nkf-onboarding/SKILL.md` | portable-skill | `f4053d8b27db4ee6298d96b278dd3ad446108e19c9b8a72a436d13931bb11544` |
| `distribution/nkf/0.81/integrations/release/nkf-release-protocol.md` | release-protocol | `e2f70472160ff2b738d4103732bc4110ad095a8c0d2258a66dc7556e3fc2b4b9` |

The twelve members are nine distinct byte sets: each portable
skill is emitted into both host directories, and the `GEMINI` adapter is
byte-identical to the `CLAUDE` adapter. Each byte set was read in full, not
diffed against its predecessor, and the reading is recorded below.

The remaining one hundred thirty members were not read in full as guidance, and
saying so is part of the record. Three are
byte-identical copies of members already read — both onboarding skill twins
and the shipped onboarding protocol, in the documentation projection. The
generated release manifest carries the version by construction. The other
one hundred twenty-six were checked from their bytes for a version literal that does
not state NKF 0.81. That check found the third-party notices defect recorded
below; every other literal it surfaced is a deliberate predecessor reference —
the Specification's version lineage and the shipped 0.8 predecessor fixtures,
the adopter's and checker's window and stepping-stone tables, the catalog
Schema's historical-channel enumeration, the version delta's predecessor
coordinate, and the projection's compatibility prose and stepping-stone table.
Every count in this section is computed from the release set rather than typed.

Six of the eleven `public-documentation` members are hand-authored and outside
the generator — the projection README, two concept pages, and three guides —
exactly as the NKF 0.8 review recorded. Because the NKF 0.8 review found its
own stale sentences in those six, and because this release changes what they
describe, all six were also read in full even though step four requires only
the literal check for them. That reading found the two corrections to the
guides recorded below.

## Corrections Made

**The adopt guide told a consumer to install and log in to the Github CLI.**
`public-docs/guides/adopt-and-validate.md` read "For the default authenticated
path, install `gh` and log in to an account authorized for
`NourdApS/Nourd.NKF`". NKF 0.81 invokes no command-line tool and needs no
account; the sentence described the 0.8 adopter. It now states that the default
path needs network access to `raw.githubusercontent.com`, `github.com`, and
the release-asset host Github redirects downloads to, and no account, session,
or command-line tool, and that the downloaded adopter is verified against both
the publication manifest and the catalog's `adopter_sha256` before it runs.

**The hand slide of the projection guides corrupted the stepping-stone
account.** Shifting the version labels in `update-and-recover.md` and
`adopt-and-validate.md` by hand produced "a repository declaring NKF 0.1
through 0.7 is outside the support window", "NKF 0.8 and older versions are
immutable published history", and a stepping-stone table whose NKF 0.7 row
named the published NKF 0.8 archive and which had no NKF 0.71 row at all. The
window is 0.1 through 0.71, the immutable history is 0.71 and older, the 0.7
row names the 0.71 archive `3419801c...160c13`, and a new 0.71 row names the
0.8 archive `2714fb48...699d5`. This is the same defect class the NKF 0.8
review recorded in the same two files; the projection guides are still edited
by hand and still produce it.

**The third-party notices carried the predecessor's label.**
`THIRD_PARTY_NOTICES.md` stated that its inventory "is bound to the implemented
NKF 0.8 checker and adopter source build-input graphs"; the NKF 0.8 review had
found the same member two versions stale. It now states NKF 0.81, and the
reviewed digest bound to the version in the release tooling was rebound to the
new bytes.

**The release-set coverage enumerated the predecessor fixtures.** The 0.81
`release-set.yaml` began as a copy of the 0.8 set, and its `product-fixture`
and `technology-fixture` selectors still named `fixtures/valid/minimal-0-8` and
`fixtures/valid/technology-0-8`, so the regenerated membership shipped the 0.8
fixtures as the 0.81 set's own. The selectors now name the `*-0-81` fixtures
and the membership was regenerated before this enumeration was taken.

**The upgrade guide's delta-claim sentence stated the 0.8 condition only.**
Both guides said a delta review claim is admitted "only when the performed set
contains the computed closure". Under NKF 0.81 the checker also refuses a claim
whose recorded closure differs from the closure it recomputes with the
evaluation policy's impact propagation. Both guides now state both conditions,
and the upgrade section heading names the 0.8-to-0.81 upgrade rather than
"the 0.8 upgrade".

## Corrections This Review Missed

The first independent release audit of the exact candidate found one stale
sentence this review had read past, in a member it claimed to have read in
full. It is recorded here rather than only in the audit, because step four
requires the review to record every correction and the honest record is that
the review did not find it.

**The projection README stated the window boundary falsely.** Its Current
Boundaries section read "NKF 0.8 and older versions are immutable published
history" one sentence after stating that live support is NKF 0.81 plus NKF 0.8.
It is the hand-slide defect this review had already found and corrected in the
two guides, surviving in the third hand-authored member the same slide touched.
It now reads "NKF 0.71 and older".

The same audit found that the delta-claim sentence this review had recorded
rather than fixed could be fixed after all: the generator gained a
version-gated region, and both protocols now state the 0.81 recompute condition
in their 0.81 emission while the adopted 0.8 root keeps the sentence 0.8 knew.
The regenerated adoption and authoring protocols were re-read in full after
that change and the table above records their new digests; the other seven
byte sets did not change.
And it found that this section's first sentence described the enumeration as
what the `set` command emits, which is true only for a repository declaring
0.81; the sentence now says where the list came from.

## Reviewed Without Correction

The adoption protocol's new Obtaining The Adopter section names the projection
path `tools/nourd-nkf-adopt.mjs`, the publication manifest, and the catalog's
`adopter_sha256`, and states that no command-line tool, session, or credential
is required; its One Public Operation section describes the plain-HTTPS catalog
and archive resolution, the accepted `nkf.recommended-release` contract, and
the digest refusal before mutation, which is what the 0.81 adopter does; its
window table states 0.81 plus 0.8 with the 0.8 archive as the one-step
stepping stone; its Which Adopter Performs The Upgrade section is
version-neutral and correct for the 0.8 adopter's refusal of a public-channel
catalog. The release protocol's step four describes the `set` command's actual
output and the three-part review this document performs. The authoring protocol
states the native frontmatter rule, the deep-link rule, the deliberate Task
transitions, the command family including `migrate` failing closed with Adopt
performing the 0.8-to-0.81 upgrade, and the derivation boundary. The onboarding
protocol's new volatile-metadata paragraph matches the implementation exactly:
the classification is applied only to regular files whose basename is one of
the three registered names, at any depth, and a directory, symbolic link, or
special file with such a name is captured and protected like every other entry.
Both skills state NKF 0.81 in their marker and, for onboarding, in the
frontmatter description that carried the published NKF 0.71 defect. The four
host-adapter members carry no version literal and required none.

## Findings Recorded Rather Than Fixed

**The release protocol's second precondition names the Human Product Owner as
the acceptor of the candidate pair.** Both
[ADR 0134](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) and
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md) record
acceptance by the Claude technical reviewer under the delegation the owning
Task records, with the Human Product Owner's independent-audit condition
satisfied. The protocol sentence predates that delegation and does not state
it. It is derived process rather than format meaning, but rewording who accepts
is a governance statement for the Human Product Owner to confirm, not a label
correction, so it is recorded for the successor.

**Six projection members remain outside the generator**, as the NKF 0.8 review
recorded and this review found again in the same two files. Bringing the
projection under the generator remains beyond the adopted direction and is
recorded for a successor.

**The publication manifest is not in this tree.** The adoption protocol, the
projection README, and two guides point a consumer at
`reference/publication.json`. That file is generated when the projection is
published to the public documentation repository, as the
[NKF 0.8 public-documentation publication](nkf-036-nkf-0-8-public-documentation-publication.md)
records, and does not exist in this repository's `public-docs/` tree. The
statements are true of the published projection, which is the only one a
consumer reads.

## Boundary

This review establishes coverage and records what was read and corrected. It
does not establish that the guidance is true: agreement between guidance prose
and the accepted authority is a semantic judgment, and the deterministic check
that accompanies this review verifies only that every enumerated guidance
member is named by its full path with a reviewed digest equal to its bytes. The
independent release audit verifies this review; it does not inherit its
conclusions.

## Post-Review Documentation Correction — 2026-09-09

The Human Product Owner requested correction of all three follow-up
documentation consistency findings under NKF-038. The Technology root now
distinguishes published, recommended, and producer-adopted 0.8 from accepted
successor 0.81 and states the 0.71 predecessor correctly. The Design index now
locates disposition in the native YAML declaration, keeps source paths under
`designs/items/`, and identifies the generated disposition projections.

The neutral onboarding protocol source previously described a separate
supporting-current index. Its topology paragraph now describes one
`realizations/README.md` indexing `realizations/current-system.md` and
represented supporting Realizations under `realizations/items/`. This is a
derived guidance correction, with no change to the accepted authority set.
The 0.81 release-stamped guidance, bundled adopter, and public projection were
regenerated. Published and installed 0.8 guidance remains frozen.

| Changed member | Follow-up reviewed SHA-256 |
| --- | --- |
| `distribution/nkf/0.81/integrations/onboarding/nkf-onboarding-protocol.md` | `4ca144af24ded2684819b5458e2340d3a85b3226058ff8a966eb32a59af18c55` |

This follow-up reviewed the topology correction against the native topology
and checked its generated copies. The original table above remains the record
of the prior whole-set review; this focused correction is not a new whole-set
release audit. ADR 0141 continues to confirm only its exact prior candidate
archive. The changed delivery requires a new candidate cut, exercise,
independent audit, and technical confirmation before publication.

## Final Whole-Set Guidance Reread — 2026-09-09

At the Human Product Owner's request, the independent documentation reviewer
used GPT-5.6 Luna for the final documentation sweep. The reviewer re-read all
twelve current 0.81 guidance members in full, together with their neutral
sources, and recorded the following exact reviewed bytes. This is a new
whole-set reading after the topology and predecessor-proof repairs, not a
reuse of the earlier focused review.

| Member re-read in full | Reviewed SHA-256 |
| --- | --- |
| `distribution/nkf/0.81/.agents/skills/nkf-onboarding/SKILL.md` | `f4053d8b27db4ee6298d96b278dd3ad446108e19c9b8a72a436d13931bb11544` |
| `distribution/nkf/0.81/.agents/skills/nkf-authoring/SKILL.md` | `5da4e0f680a03c7322c5894126f345d09be5710a26e2c858a3055eea691a42b1` |
| `distribution/nkf/0.81/.claude/skills/nkf-onboarding/SKILL.md` | `f4053d8b27db4ee6298d96b278dd3ad446108e19c9b8a72a436d13931bb11544` |
| `distribution/nkf/0.81/.claude/skills/nkf-authoring/SKILL.md` | `5da4e0f680a03c7322c5894126f345d09be5710a26e2c858a3055eea691a42b1` |
| `distribution/nkf/0.81/integrations/adoption/nkf-adoption-protocol.md` | `df3066e3b43fb78a1a6add384e4173083ad7965d4131f1079b330043c57b7b85` |
| `distribution/nkf/0.81/integrations/release/nkf-release-protocol.md` | `e2f70472160ff2b738d4103732bc4110ad095a8c0d2258a66dc7556e3fc2b4b9` |
| `distribution/nkf/0.81/integrations/ai/nkf-authoring-protocol.md` | `46659b7e55766888d1fd2d2a4fe4b47880482a02f2c59798f1436b764f94d20c` |
| `distribution/nkf/0.81/integrations/onboarding/nkf-onboarding-protocol.md` | `4ca144af24ded2684819b5458e2340d3a85b3226058ff8a966eb32a59af18c55` |
| `distribution/nkf/0.81/host-adapters/AGENTS.adapter.md` | `0919110739d3402eeff13d4443a5e1ba51eb0f3571a76aead6f076c4116100a7` |
| `distribution/nkf/0.81/host-adapters/CLAUDE.adapter.md` | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.81/host-adapters/GEMINI.adapter.md` | `97cf8c9fcc1a9c16e9fdbb224ae2aab193b34194877897b6f7fb275cf71aa43d` |
| `distribution/nkf/0.81/host-adapters/copilot-instructions.adapter.md` | `d9a9d7ded74b90e019f35722b963e7dc55b45edfde7339e9e6e6300aaf219520` |

The producer's root integrations and installed skills still state 0.8 because
the producer still declares and pins published 0.8. Those installed-version
instructions are intentionally preserved; the 0.81 generated distribution is
the successor release surface. Changing the installed labels before adoption
would state an adoption that has not occurred. Historical accepted records,
archived authority revisions, and published 0.8 distribution retain their
original version claims as provenance.

### Remaining Release Members And Final Sweep Disposition

The final deterministic inventory contains 142 release members, including the
generated manifest, and 141 source members. The independent reviewer checked
every remaining member for stale version literals. Sixteen source paths
contained predecessor literals. Their compatibility enumerations, version
delta, frozen predecessor contract bindings, historical notices, and migration
examples were correctly scoped. One runtime diagnostic was stale:
`scripts/onboarding/core.mjs` required a 0.81 plan but its refusal called the
required plan 0.4. The source message now names 0.81 and its distributed adopter
and public copy were regenerated. Validation semantics are unchanged.

The documentation inventory covered 428 knowledge files, including 36 Task
items, 37 Design items, 144 top-level Decision entries, and 183 Evidence files;
these populations overlap and are not additive. It also covered 11 neutral
guidance files, 12 distributed guidance files, 62 public-projection files,
six root integration files, and the installed skills. The independent sweep
found no other actionable stale claim. The primary reviewer verified the
installed 0.8 boundary and the diagnostic correction. Link verification found
zero dead living links among 1,878 checked links; 175 historical-link exemptions
remain classified as history, not silently repaired.
