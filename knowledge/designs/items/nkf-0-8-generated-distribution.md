---
id: design-nkf-033-generated-distribution
type: design
title: NKF 0.8 Generated Distribution
summary: This Design proposes NKF 0.8, the successor that ends the recurring stale-guidance defect class at its source — deriving the whole versioned guidance distribution from one version-neutral authored source with the version injected instead of copying it forward by hand, making a guidance file's own self-description a checked conformance position, wiring the previously unenforceable guidance verifiers into the accepted integration chain, and sliding the live window to exactly NKF 0.8 plus NKF 0.71.
created_at: 2026-08-19T00:30:00Z
---

# NKF 0.8 Generated Distribution

## Design Kind Problem And Scope

This is a Technology specification, contract, tooling, release, and
distribution Design under
[NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md).
It proposes NKF 0.8, the successor to the immutable published NKF 0.71 set,
scoped to one defect class the Human Product Owner directed be root-caused
rather than patched again: every version release leaves a document or skill
behind.

The class was established from evidence, not inference. A stale version label
shipped inside the published, immutable NKF 0.71 archive
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`: the
onboarding portable skill's frontmatter `description` directs an agent to
"prepare its NKF 0.7 candidate" while its own body marker states `NKF Version:
0.71`. Two independent causes produced it, and each recurs by construction.

- **The versioned distribution tree is duplicated by hand, not derived.** No
  script wrote into `distribution/nkf/`. Cutting a version copied the
  predecessor tree and edited the marker line. The 0.7 and 0.71 distributed
  onboarding skills differ by exactly one line — the marker. The description
  was correct at 0.7 and went stale at 0.71 purely because the copy changed
  one line and nothing else. Every sentence carrying a version rots by
  default, and only the marker line was enforced.
- **The independent audit was instructed to verify the superseded rule.**
  [ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
  widened release-protocol step four from the version's rule diff to every
  member of the versioned set, each re-read in full, with the enumerated
  member list and reviewed digests recorded. Step six was never propagated:
  it still directed the audit to verify that the step four review "was
  performed against the actual rule diff". A diff-scoped review therefore
  passed an audit that had been told to check the diff standard, and step
  four's full-set requirement was enforced by nobody.

Correcting the shipped bytes in place is not merely undone — it is actively
refused. Four surfaces are byte-locked by the installed NKF 0.71 pin, each
established by attempting the correction and being rejected: the installed
onboarding skill, the `nkf:check:host` chain, the `check` chain, and the
published distribution and generated projection bytes. The pin makes the
shipped bytes mandatory for the producer, so a published mistake must be
reproduced until a successor release replaces it, and the pin also locks the
verification chain, so the producer cannot add the check that would have
caught it. Both halves of the remedy are reachable only through a successor
version, which is what NKF 0.8 is for.

This Design does not add review-quality measurement, multi-writer semantics,
or large-monolith onboarding, all explicitly deferred by the Human Product
Owner at 0.71. It does not machine-check guidance prose against the contract
as a whole, rejected as false confidence by
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md).
It changes no published byte, no accepted immutable record, and neither
repository visibility nor the protected merge gate owned by
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md).

## Governing Inputs And Constraints

[ADR 0131](../../decisions/0131-accept-the-nkf-0-71-authority-set.md) accepts
the immutable NKF 0.71 authority set this Design revises, and
[ADR 0132](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
binds the confirmed published bytes that stay exactly as confirmed; every
correction enters through this governed successor, never in place.
[ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
makes that permanent: publication freezes every complete-set member, so the
stale label inside the published archive is immutable.
[ADR 0076](../../decisions/0076-versioned-contract-evolution.md) requires that
every complete-set meaning change be a new immutable version with explicit
compatibility and deliberate migration.
[ADR 0006](../../decisions/0006-pre-stable-evolution.md) fixes the path a
consequential pre-stable change takes: evidence, reproduction, compatibility
classification, authority-first derivation, versioned release, deliberate
migration.
[ADR 0007](../../decisions/0007-markdown-yaml-authority.md) keeps Markdown
normative, so generated distribution bytes are derived output and never a
second authority.
[ADR 0096](../../decisions/0096-deterministic-governed-mechanics.md) and
[ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md)
fix the boundary generation must not cross: deterministic commands own closed
mechanics and supply no meaning.
[ADR 0019](../../decisions/0019-validation-enforcement-and-diagnostics.md)
bounds what a new check may claim — form, never truth.
[ADR 0060](../../decisions/0060-layered-contract-enforcement.md) applies in
full because this Design changes the enforcement surface.
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
already mandates the full-set pre-cut review; this Design implements that
accepted meaning and adds no new rule of its own.
[ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md)
requires truthful predecessor-relative compatibility signaling as the window
slides.
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
keeps the canonical graph authored and projections derived, which is exactly
the boundary generated distribution must respect.

The Human Product Owner fixed four boundaries in the
[NKF-033](../../tasks/items/NKF-033-release-nkf-0-8-with-generated-distribution.md)
planning conversation, recorded verbatim in the owning Task: the corrective
successor also removes the duplication at its source rather than being a
text-only correction — "go with option B"; the version string is exactly
`0.8`, because a generated distribution is an architecture change rather than
another deliberately small corrective; the live window becomes exactly NKF 0.8
plus NKF 0.71, so NKF 0.7 leaves under the standing current-plus-one policy;
and the guidance-review half takes no new Decision because
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
already mandates the full-set review and the defect was a derived-artifact
sentence.

## Proposed Direction

### One Authored Source For Versioned Guidance

Version-bearing guidance text has exactly one authored source. Every emitted
copy — each distributed protocol, portable skill, and host-adapter
instruction, and the two in-repository protocol roots nothing installs — is
written from that source with the version injected, and no emitted tree is
ever read as an input. The source may not contain a literal NKF version at
all: the emitter rejects one, so a version cannot go stale in a file that is
not allowed to state one. Carry-forward, the mechanism that produced the
defect, becomes structurally unavailable rather than merely discouraged.

Two authored escapes keep the rule honest instead of forcing authors to lie.
A stamp-scoped region emits only into targets carrying the named stamp, so the
in-repository copy of a protocol may carry provenance links into the decisions
tree that a consumer copy must not, from one source and with both emissions
truthful. A declared-literal region marks version literals that are
deliberately historical — an out-of-window range, a named predecessor archive
— so the neutrality check still catches every accidental one. The predecessor
a target names is derived per stamp from the governed recommendation rather
than passed in, because re-emitting the published version is a faithfulness
check rather than a cut and its predecessor is the version below it.

Emission is verifiable in both directions. Writing produces the tree;
checking regenerates into memory and compares against the committed bytes, so
a hand edit to an emitted tree fails immediately instead of shipping. Writing
into a frozen published tree is refused outright.

### Self-Description Becomes A Checked Position

The exact position that carried the 0.71 defect becomes a conformance
position rather than a producer-tooling concern. A governed project's
installed guidance file describes itself in its frontmatter `description`, so
a version literal there is a self-description and must state that file's own
declared version. NKF 0.8 adds one rule to the stable registry for it. The
body is deliberately excluded: compatibility prose, window tables, and
stepping-stone chains reference earlier versions on purpose, and policing them
would be the prose-checking this lineage already rejected as false confidence.

This converts the defect from something only the producer could have caught
into something every adopted NKF 0.8 repository catches, and it is the reason
the correction needs format meaning rather than only a build script.

### The Audit Verifies What The Rule Requires

Release-protocol step six directs the independent audit to verify full-set
coverage — the enumerated member list is present, each member carries a
reviewed digest, and every correction is recorded — and carries no surviving
rule-diff instruction. A review recording only the version's rule diff does
not satisfy step four and the audit rejects it. This propagates already-accepted
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
meaning into the derived protocol that contradicted it; it creates no new
Product meaning and takes no new Decision.

Deterministic enforcement backs the corrected sentence. The member list a
review must name is computed from the reviewed version's own release set, so
coverage starts from the machine list rather than recollection, and a review
naming fewer members than the set declares fails.

### The Accepted Chain Gains The Guidance Verifiers

The three deterministic guidance checks — emitted bytes match the source, a
self-description states its own version, and a pre-cut review enumerates the
set — join the accepted integration chain at NKF 0.8. They could not join it
at 0.71: the pin byte-locks the chain, which is precisely why the producer
could not add the check that would have caught its own defect. The expected
chain becomes version-keyed, so a repository declaring NKF 0.71 keeps exactly
the chain it accepted and a repository declaring NKF 0.8 must carry the new
stages. Nothing about the producer's current chain changes until the producer
deliberately adopts NKF 0.8 through the ordinary public Adopt.

### Version Coordinate And Window

The version string is exactly `0.8`, chosen by the Human Product Owner. Under
the declared major-minor coordinate model this is minor eight, a full
successor to 0.71 rather than an in-version revision — accepted records are
immutable and the correction path is a successor version. The step from a
deliberately small corrective to an architecture change is what the coordinate
records.

The live support window becomes exactly NKF 0.8 plus NKF 0.71 under the
standing current-plus-one policy. NKF 0.7 drops to stepping-stone history: a
0.7 repository receives an explicit fail-closed signal naming the published
0.71 archive as its stepping stone, and each older repository is named its own
next archive. Every published archive remains the immutable, self-contained
authority for its version, and the 0.7 contract and distribution trees leave
the working tree while every removed byte stays retrievable from its archive.

The 0.71-to-0.8 compatibility is classified `non-breaking` with no path,
identity, or declaration-shape migration: an adopted 0.71 repository upgrades
through the ordinary public Adopt update with a mechanical contract rebind and
the digest-bound delta carry. The one added rule participates in no declared
judgment-dependency list, so it widens no required fresh-review set and the
upgrade remains provable on the delta claim alone.

### Fail-Closed Version Registration

Every tooling surface that compares, windows, dispatches, or constructs
version strings registers `0.8` exactly, verified against an exhaustive
inventory rather than a sample, and an unregistered version continues to error
rather than inherit predecessor semantics. The per-version tooling a cut
genuinely needs — the schema derivation and the release-set regeneration —
stays per-version because each encodes its own delta; it is not copy-forward
duplication and is deliberately not folded into the generator.

## Responsibilities Interactions And Information Flows

The accepted authority pair owns the self-description rule, the window policy,
the compatibility classification, and the per-rule 0.71-to-0.8 delta. The
version-neutral source owns every authored guidance sentence exactly once; the
generator owns every version literal in every emitted copy and owns no
meaning. The checker owns deterministic evaluation of the new rule and
fail-closed version dispatch. The adopter owns the upgrade route, the
stepping-stone signaling, and the producer promotion. The release protocol
owns the order, and the independent audit owns verification that the full-set
review actually happened. The named reviewer owns every fresh judgment; the
Human Product Owner owns adoption, acceptance, the window, publication,
recommendation, live promotion, and merges. Nothing in that flow converts a
generated byte or a passing check into acceptance or confirmation.

## Alternatives And Trade-Offs

### Correct The Stale Sentences And Stop

The text-only correction fixes eleven copies of one sentence and leaves the
mechanism that produced them intact: the next cut copies the tree again and
the next sentence rots. The Human Product Owner asked for the root cause and
directed the corrective that removes the duplication at its source. Rejected.

### Repair The Published NKF 0.71 Archive In Place

Editing the shipped bytes would correct the defect where it is actually
visible to a consumer. It also breaks the publication freeze, invalidates the
technical confirmation of the exact candidate, and destroys the property that
makes an archive citable. Rejected; 0.71 is never repaired in place.

### Machine-Check Every Guidance Sentence Against The Contract

Extending checking from self-descriptions to the whole body would appear to
close the class completely. It cannot: agreement between prose and a contract
is a semantic judgment, and a check that appears to certify it manufactures
false confidence in exactly the place human review is load-bearing. Already
rejected by
[ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
and not reopened.

### Generate The Distribution Tree From The Predecessor Tree

Templating the emitted tree from the previous version's bytes would need no
version-neutral source and no re-authoring. It also preserves the exact defect
mechanism — the predecessor's stale sentence is the template — and makes every
future emission inherit every past mistake. Rejected: no emitted tree is ever
an input.

### Add The Guidance Checks Without A New Version

Wiring the verifiers into the current chain would deliver the enforcement
sooner and without a release. The pin refuses it, and the refusal is correct:
the accepted chain is part of the accepted set, and changing it is a version
act. Rejected, and the refusal is recorded as the reason NKF 0.8 exists.

### Restate The Full-Set Guidance Review As A New Decision

A new Decision would make the corrected step six look authoritative on its
own. [ADR 0097](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
already carries that meaning, and duplicating it would create two authorities
for one rule. Explicitly declined by the Human Product Owner. Rejected.

## Failure Safety Recovery And Operations

Every new mechanism fails closed. A literal version in the guidance source is
refused with its exact file and line. A hand edit to an emitted tree is
refused by the byte comparison, with regeneration as the recovery. Writing
into a published tree is refused outright. A self-description contradicting
its file's declared version is a blocking conformance diagnostic. A pre-cut
review naming fewer members than the release set declares fails with the
missing members named, and whole-root re-review remains the recovery path. An
out-of-window repository receives an explicit stepping-stone signal naming its
own next archive rather than an unexplained refusal. The predecessor
working-tree cleanup is one reviewed act, and every removed byte remains in
its published content-addressed archive.

## Validation And Decision Evidence

The defect is grounded in extracted bytes rather than recollection: the stale
`description` was read out of the published archive's own
`nkf-onboarding/SKILL.md` and its projection twin, and the four byte-locked
surfaces were each established by attempting the correction and recording the
refusal, both preserved in
[the NKF 0.71 guidance-review finding](../../evidence/audits/nkf-033-nkf-0-71-guidance-review-finding.md).
Each new check ships with a fixture that fails closed on the exact 0.71
defect, so the enforcement is proven against the real historical bytes rather
than against a hypothetical. The complete set is re-read in full under the
corrected step six with the deterministically enumerated member list and
reviewed digests recorded. Pre-acceptance, the authority set receives a fresh
independent audit; post-implementation, the exact candidate is exercised in an
isolated real-producer copy, and a fresh independent release audit precedes
the mandatory audit-bound technical-confirmation Decision before any
separately authorized publication.

## Unresolved Matters

No matter remains unresolved. The Human Product Owner resolved every planning
question on `2026-08-18` before adoption, recorded verbatim in the owning
Task: the corrective is option B rather than the text-only correction; the
version string is exactly `0.8`; the live window becomes exactly NKF 0.8 plus
NKF 0.71; and the guidance-review half takes no new Decision. Review-quality
measurement, multi-writer semantics, and large-monolith onboarding remain
explicitly deferred without a version commitment. Qualifying an accepted
record with a later finding remains deferred to
[NKF-034](../../tasks/items/NKF-034-qualify-accepted-records-with-later-findings.md).
