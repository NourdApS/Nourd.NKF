---
title: "NKF-033: Release NKF 0.8 With Generated Distribution"
summary: End the recurring stale-guidance defect class at its source by generating the versioned distribution tree from one source with the version injected instead of copying it forward by hand, correcting the stale audit sentence that let a diff-scoped guidance review pass an independent audit, enforcing the version positions no check covers, and sweeping every live guidance member in full — delivered as the NKF 0.8 successor with the live window sliding to exactly NKF 0.8 plus NKF 0.71.
created_at: 2026-08-18T16:45:07Z
---

# NKF-033: Release NKF 0.8 With Generated Distribution

## Human Direction

On `2026-08-18`, after the merged NKF 0.71 promotion was verified green on
`master`, the Human Product Owner observed that every version release leaves a
document or skill behind and directed that this be root-caused rather than
patched again: "every time i do a version, this happens that a document or
skill or whatever just left behind. i wanna get to the bottom of this why."

Presented with the finding that the shipped onboarding skill carries a stale
`NKF 0.7` label inside the published immutable 0.71 archive, the Human Product
Owner identified the locus directly: "the missing files are distribution files
which has not been updated, the skills for onboarding . this means that
distribution has problem !" That premise was verified and confirmed: nothing
generates the distribution tree, and cutting 0.71 copied the 0.7 tree while
editing exactly one line.

Asked how heavy a successor version would be under the condition that
everything is looked at and taken care of, the Human Product Owner directed:
"go with option B" — the corrective successor that also removes the
duplication at its source, rather than the text-only correction.

Four boundaries were then confirmed explicitly:

1. the version string is exactly `0.8`, chosen by the Human Product Owner,
   because the generated-distribution change is an architecture change rather
   than another deliberately small corrective;
2. NKF 0.7 leaves the live support window under the standing
   current-plus-one policy, so the live window becomes exactly NKF 0.8 plus
   NKF 0.71 and a 0.7 repository steps through the published 0.71 archive;
3. the guidance-review half is handled by correcting the stale audit sentence
   with no new Decision, because
   [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
   already mandates the full-set review; and
4. the Claude technical reviewer works under the same explicitly recorded
   delegation as
   [NKF-031](NKF-031-release-the-corrective-nkf-0-71.md) and
   [NKF-032](NKF-032-adopt-the-producer-to-published-nkf-0-71.md): derive
   contracts, serialization, compatibility, implementation, fixtures, tests,
   evidence, independent-audit coordination, and technical confirmation, and
   return any new or changed Product meaning to the Human Product Owner.

Publication, recommendation, live producer promotion, and merges remain
separately authorized Human Product Owner acts.

## Problem

A stale version label shipped inside the published, immutable NKF 0.71 archive
`3419801cbddeb374aa458345389a22a8205780c2137f0fd6fa5fe84e63160c13`. The
onboarding portable skill's frontmatter `description` still directs an agent to
"prepare its NKF 0.7 candidate" while its body marker states `NKF Version:
0.71`. The same sentence exists in eleven places in the repository, including
inlined string literals in three copies of the adopter.

Two independent causes produced it, and each recurs by construction.

**The distribution tree is duplicated by hand, not derived.** No script writes
into `distribution/nkf/`. Cutting a version copies the predecessor tree and
edits the marker line. The 0.7 and 0.71 distributed onboarding skills differ by
exactly one line — the marker. The description was correct at 0.7 and went
stale at 0.71 purely because the copy changed one line and nothing else. Every
sentence carrying a version rots by default, and only the marker line is
enforced by
[`scripts/verify-agent-guidance.mjs`](../../../scripts/verify-agent-guidance.mjs).

**The independent audit is instructed to verify the superseded rule.** Step
four of the release protocol was widened by
[`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
from the version's rule diff to every member of the versioned set, each re-read
in full, with the enumerated member list and reviewed digests recorded. Step
six was never propagated: it still directs the audit to verify that the step
four review "was performed against the actual rule diff." A diff-scoped review
therefore passes an audit that was told to check the diff standard, and step
four's full-set requirement is enforced by nobody. The [NKF-028](NKF-028-release-nkf-0-7-with-verifiable-delta-review.md) review for 0.7
complied with step four voluntarily and caught a materially stale protocol; the
[NKF-031](NKF-031-release-the-corrective-nkf-0-71.md) review for 0.71 recorded neither an enumerated member list nor reviewed
digests, and the audit passed it.

Step six is itself a stale sentence describing a rule that is not the current
rule — precisely the defect step four exists to catch. The control was consumed
by the class it governs.

## Desired Outcome

1. Version-bearing guidance text has exactly one authored source. The versioned
   distribution tree is generated from it with the version injected, so no
   version sentence is ever carried forward by hand and the eleven-copy
   duplication cannot reappear.
2. The independent audit verifies what step four actually requires. A guidance
   review that records no enumerated member list and no reviewed digests fails
   rather than passes.
3. Every version-bearing position that a deterministic check can own is
   enforced, including frontmatter prose, not only the body marker line.
4. Every live guidance member is re-read in full against the complete current
   rule set, with the enumerated member list and reviewed digests recorded, and
   every stale sentence corrected.
5. NKF 0.8 is released through the full accepted release order with the live
   window sliding to exactly NKF 0.8 plus NKF 0.71, truthful stepping-stone
   signaling for out-of-window repositories, and every published predecessor
   byte untouched.

## Scope

1. Establish the single authored source for versioned guidance and implement
   deterministic generation of `distribution/nkf/<version>/` from it with the
   version injected, replacing the hand-copy step.
2. Reconcile the release set, its classes and modes, and the public-docs
   projection to the generated topology without changing any published
   predecessor byte.
3. Correct release-protocol step six so the independent audit verifies full-set
   coverage — the enumerated member list, each reviewed digest, and every
   correction — and remove the superseded rule-diff instruction. This
   implements already-accepted
   [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
   meaning and creates no new Product meaning.
4. Extend deterministic guidance verification to the version-bearing positions
   it does not cover, frontmatter `description` prose included, and add
   fixtures proving each new check fails closed on a stale label.
5. Correct the stale onboarding `description` in every mutable copy, and sweep
   every live guidance member in full against the complete current rule set,
   recording the enumerated member list and reviewed digests as Evidence.
6. Derive the accepted NKF 0.8 authority pair, its version delta, compatibility
   classification for 0.71-to-0.8, and the window slide, with an independent
   audit preceding acceptance.
7. Build and prove the complete 0.8 set, perform the pre-cut full-set guidance
   review under the corrected step six, build one exact candidate archive,
   exercise the complete ordinary lifecycle in an isolated real-producer copy,
   obtain a fresh independent release audit, and author the mandatory
   audit-bound technical-confirmation Decision.
8. Conclude truthfully, mark the single pull request ready, and stop for the
   separately authorized publication, recommendation, and live promotion.

## Out Of Scope

- Publication, recommendation, live producer promotion, repository or release
  visibility changes, and merging — separately authorized Human Product Owner
  acts. The producer adoption to published 0.8 is a separate Task on a stacked
  pull request, following the
  [NKF-032](NKF-032-adopt-the-producer-to-published-nkf-0-71.md) pattern.
- Any change to a published 0.1 through 0.71 byte, the confirmed 0.71 archive,
  or any accepted immutable record. The stale label inside the published 0.71
  archive is corrected only in the successor; 0.71 is never repaired in place.
- A new Decision restating the full-set guidance review. It already exists as
  [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
  and the Human Product Owner explicitly declined to duplicate it.
- Machine-checking guidance prose against the contract as a whole, rejected as
  false confidence by
  [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md).
- Review-quality measurement, multi-writer semantics, and large-monolith
  onboarding, deferred by the Human Product Owner at 0.71.
- Protected-branch enforcement, owned by
  [NKF-012](NKF-012-activate-protected-merge-gate.md).

## Execution Plan

1. Record this plan in this Task before executing it, then activate.
2. Inventory every version-bearing position across live guidance, distribution,
   tooling, and the adopter's inlined string literals, separating enforced
   marker positions from unenforced prose, and record the inventory as the
   derivation baseline.
3. Design the single-source generation topology and confirm it against the
   accepted release-set contract before writing code; return to the Human
   Product Owner if generation would change release-set meaning rather than
   only its production.
4. Correct release-protocol step six and extend the guidance verifiers, each
   with a fixture that fails closed on a stale label, before touching the
   distribution tree — so the new checks are proven to catch the 0.71 defect.
5. Implement generation, regenerate the distribution tree, and confirm the
   regenerated bytes differ from the hand-copied ones only where the version
   injection intends.
6. Derive the 0.8 authority pair, version delta, and compatibility, obtain the
   independent authority audit, and author the acceptance Decision.
7. Perform the pre-cut full-set guidance review under corrected step six,
   recording the `set`-enumerated member list and reviewed digests.
8. Build the candidate archive, exercise it in an isolated real-producer copy,
   obtain the fresh independent release audit, and author the audit-bound
   confirmation Decision.
9. Run `npm run nkf:check` green at every handoff, conclude the Task, and mark
   the single pull request ready.

## Acceptance Criteria

1. `distribution/nkf/0.8/` is generated deterministically from one authored
   source with the version injected; regenerating it is byte-reproducible, and
   no hand-copy step remains in the release procedure.
2. The eleven-copy duplication of any single guidance sentence is eliminated for
   every mutable copy, the adopter's inlined literals included.
3. Release-protocol step six directs the independent audit to verify full-set
   coverage, and contains no surviving rule-diff instruction.
4. A guidance review recording no enumerated member list or no reviewed digests
   fails deterministically, proven by a fixture.
5. A stale version label in a frontmatter `description` fails deterministically,
   proven by a fixture that reproduces the exact 0.71 defect.
6. Every live guidance member is recorded as re-read in full against the
   complete current rule set, with the enumerated member list and reviewed
   digests in Evidence, and every stale sentence corrected.
7. The accepted NKF 0.8 authority pair states prose and executable in explicit
   agreement, and every copy-forward version label states its true version.
8. The live window is exactly NKF 0.8 plus NKF 0.71, with truthful
   stepping-stone signaling naming the published 0.71 archive for a 0.7
   repository and each older repository's own next archive.
9. Every version-comparing or windowing tooling surface handles the exact string
   `0.8`, verified against an exhaustive inventory rather than a sample.
10. No published 0.1 through 0.71 byte, and no accepted immutable record,
    changes.
11. The full accepted release order is performed with independent audits
    preceding acceptance and confirmation.
12. `npm run nkf:check` passes complete on the delivered branch tip, with the
    full suite green.

## Current Progress

Created on `2026-08-18` under the Human Direction above, with all four
boundaries confirmed before creation and the root cause established from
evidence rather than inference.

The verified starting state: `master` at `df13cea` carries the fully promoted
NKF 0.71 producer, declaring and pinning 0.71 with the live window
`{0.71, 0.7}`; master CI succeeded in 8m23s; the complete local gate passes all
fifteen stages with 243 of 243 tests green; and all four bindings confirmed by
[`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
match the promoted reality.

Two findings established during derivation, both recorded here as facts rather
than as accepted meaning:

- The stale onboarding `description` is inside the published 0.71 archive, not
  only in mutable copies. It was verified by extracting
  `nourd-nkf/distribution/nkf/0.71/.claude/skills/nkf-onboarding/SKILL.md` and
  the `public-docs` twin from the published archive. It is therefore
  permanently part of 0.71 and correctable only in this successor.
- Release-protocol step six carries the rule-diff instruction that
  [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
  superseded in step four. This is the enforcement hole that let the
  diff-scoped 0.71 guidance review pass its independent audit, and it is a
  derived-artifact defect, not a specification defect: the accepted meaning is
  already correct.

Four surfaces were found to be byte-locked by the installed NKF 0.71 pin, each
established by attempting the correction and being refused rather than by
reading the contract:

| Surface | Refusal |
| --- | --- |
| The installed onboarding skill | `repin` fails with "The installed onboarding skill differs". |
| The `nkf:check:host` chain | The pinned check fails with "The project NKF script chain differs from the exact installed integration". |
| The `check` chain | `verify-agent-guidance` fails with "package.json script check does not match the accepted command". |
| Published distribution and generated `public-docs` bytes | Frozen by publication under [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) and [`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md). |

This materially sharpens the Problem. The stale label is not merely
uncorrected: correcting it is actively rejected. The pin makes the shipped
bytes mandatory for the producer, so a published mistake must be reproduced
until a successor release replaces it, and the pin also locks the entire
verification chain, so the producer cannot add the check that would have
caught it. Both halves of this Task's remedy are therefore only reachable
through a successor version, which is what NKF 0.8 is for.

Delivered on the `task/NKF-033` branch so far, with the complete gate green at
each handoff: release-protocol step six corrected to verify whole-set coverage
with no surviving rule-diff instruction; a new
[`scripts/verify-version-labels.mjs`](../../../scripts/verify-version-labels.mjs)
that fails a version literal in a file's own frontmatter description when it
contradicts that file's declared marker, exempting bytes identical to a frozen
published member under one stated rule; and
[`test/version-labels.test.ts`](../../../test/version-labels.test.ts) proving
the check against the exact NKF 0.71 defect, against a 0.8 tree being cut,
and against legitimate predecessor mentions in body prose.

Two honest limits are recorded rather than presented as complete. The verifier
is not wired into `npm run nkf:check`, because the 0.71 pin forbids changing
the accepted chain; its tests run inside the existing `test` stage, and the
wiring belongs to the accepted 0.8 integration. And the verifier currently
checks zero live files, because every description-bearing guidance member is
frozen-identical today; its activation on a version being cut is proven by
fixture, not by the live tree.

## Completion Result

Not concluded.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, authority-first derivation, versioned release, and deliberate migration; both the generation change and the guidance corrections enter through this path. |
| [`adr-0007`](../../decisions/0007-markdown-yaml-authority.md) | record | Markdown remains normative human meaning; generated distribution bytes are derived output and never become a second authority, and an executable that silently diverges from prose is a defect. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Stable record identity, typed relationships, and bindings remain one coherent topology; generation changes how members are produced, never their identity. |
| [`adr-0016`](../../decisions/0016-extension-resolution.md) | record | Unsupported required contract, claim, or trigger meaning fails closed; exact contract identity remains digest-bound. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a passing generator or check accepts nothing. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | Deterministic evaluation cannot establish truth or adequacy; new guidance checks constrain form and never certify that prose means the right thing. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | This Task changes the enforcement surface, so it requires accepted authority, predecessor comparison, independent review, a successor Realization, and exact confirmation even when the candidate's own check passes. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks and are not merged by the new guidance enforcement. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every complete-set meaning change is a new immutable version with explicit compatibility and deliberate migration; NKF 0.8 is that version for this defect class. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate versioned protocols; correcting step six repairs the release protocol's derived prose without altering that separation. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive carries the complete versioned set, and exact candidate and post-action adoption states receive fresh independent audits. |
| [`adr-0095`](../../decisions/0095-review-guidance-before-cutting.md) | record | The pre-cut guidance review is mandatory before the archive is cut; its original rule-diff scope is superseded in step four and the surviving step six instruction is the defect this Task corrects. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | Deterministic commands own closed mechanics only and supply no meaning; distribution generation is mechanics and must not become a semantic act. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Every release member is deterministically enumerated through `set` and re-read in full against the complete current rule set before a cut, with the enumerated member list and reviewed digests recorded for the independent audit. This is already-accepted meaning; this Task makes it enforced rather than optional and adds no new rule. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and confirmed direction precede mechanics; generation and new checks resolve no open uncertainty and carry no judgment. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The `task/NKF-033` branch carries this Task's whole life and merges only concluded; merging stays the human review act. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation resolves an immutable recommendation with explicit predecessor-relative compatibility signaling; the window slide must keep that signaling truthful for 0.7 and older repositories. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication permanently freezes every complete-set member, so the stale label inside the published 0.71 archive is immutable; exact-candidate and ordinary public self-adoption remain separate audited proofs and the producer gate remains a verified host superset. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The adopted freshness and knowledge-graph direction governs graph meaning; the canonical graph stays authored input and projections stay derived, which is the same boundary distribution generation must respect. |
| [`adr-0131`](../../decisions/0131-accept-the-nkf-0-71-authority-set.md) | record | The accepted NKF 0.71 authority set is the immutable predecessor authority this successor revises; its defects are corrected only through this governed 0.8 revision with explicit provenance and compatibility. |
| [`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md) | record | The confirmed and published 0.71 bytes stay exactly as confirmed; this Task repairs nothing in place, and any release-set or archive byte change would invalidate that confirmation. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The versioned distribution tree is generated deterministically from one authored source with the version injected, and regeneration is byte-reproducible | unknown | none | none |
| Generation changes only how release-set members are produced, never their accepted meaning, classes, or modes | unknown | none | none |
| A guidance review recording no enumerated member list or no reviewed digests fails deterministically | unknown | none | none |
| A stale version label in a frontmatter `description` fails deterministically, reproducing the exact 0.71 defect as a fixture | unknown | none | none |
| Release-protocol step six verifies full-set coverage with no surviving rule-diff instruction | unknown | none | none |
| Every live guidance member is re-read in full against the complete current rule set with the member list and reviewed digests recorded | unknown | none | none |
| The live window is exactly NKF 0.8 plus NKF 0.71 with truthful stepping-stone signaling for out-of-window repositories | unknown | none | none |
| Every version-comparing or windowing tooling surface handles the exact string `0.8`, verified exhaustively | unknown | none | none |
| No published 0.1 through 0.71 byte and no accepted immutable record changes | unknown | none | none |
| The full accepted release order is performed with independent audits preceding acceptance and confirmation | unknown | none | none |
| The complete gate and full suite pass at every handoff on the delivered branch | unknown | none | none |
