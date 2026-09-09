---
title: "NKF-038: Release NKF 0.81 For Public Adoption And Reconcile The Record"
summary: Release NKF 0.81 as the successor that makes adoption from the now-public repository truthful and self-contained — a recommendation catalog whose channel vocabulary lives in the accepted contract with a public value, an adopter that fetches the catalog and archive over plain HTTPS with no gh dependency and tells a consumer where to obtain itself, a regenerated public-documentation projection that no longer calls the release private, and an onboarding snapshot that no longer fails on volatile operating-system metadata — and, under the same release, repair every stale document the whole-repository sweep of 2026-09-08 found, recording that the coordinate 0.81 is what ADR 0136 called the NKF 0.9 successor.
created_at: 2026-09-08T13:51:52Z
---

# NKF-038: Release NKF 0.81 For Public Adoption And Reconcile The Record

## Human Direction

On `2026-09-08`, after the repository became public under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) and
the protected merge gate was delivered under
[NKF-012](NKF-012-activate-protected-merge-gate.md), the Human Product Owner
stated they will onboard their first repository "once NKF is completely ready
for public use". The Claude technical reviewer defined readiness as: a
successor version that removes the private-channel catalog literal and the
`gh` dependency from adoption and regenerates the frozen public prose that
calls the release private; the volatile-metadata onboarding drift recorded in
[NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) fixed in the same
release; the protected merge gate closed first; and the trademark and
conformance-claim policy as a later Product Task. The Human Product Owner
directed verbatim: "i agree with the proposed order . do it . but do not go
0.9 , go to 0.81".

The Claude technical reviewer then swept the whole repository for stale
documents and reported the findings. The Human Product Owner directed
verbatim: "all these stale docs must fix under 0.81".

Those two directions explicitly create this Task and begin its work. The
confirmed boundaries:

1. The version string is exactly `0.81`, chosen by the Human Product Owner.
   [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
   and the records written with it named the remedy "the NKF 0.9 successor";
   that Decision is immutable, and this Task records that the coordinate
   `0.81` is that successor. Every living document that names 0.9 as the
   remedy is corrected under this Task.
2. Full accepted release order, no shortcuts: adopt the direction, accept the
   authority set only after an independent audit, build and prove the set,
   guidance review across the complete set, candidate archive and isolated
   exercise, fresh independent release audit, the mandatory audit-bound
   confirmation Decision, and then publication, recommendation, live
   promotion, and every merge remain the Human Product Owner's separately
   authorized acts.
3. Every stale document the sweep found is repaired under this Task, at the
   level its lifecycle allows: living records are revised, immutable records
   are never edited and are reclassified or succeeded through governed
   revisions, and legacy-locked Tasks are rewritten natively.
4. This Task's lifecycle is carried on the `task/NKF-038` branch, stacked on
   `task/NKF-012` until that pull request merges, and one pull request
   delivers it.
5. The Human Product Owner owns every Product boundary; the Claude technical
   reviewer works under the delegation recorded here for design, derivation,
   implementation, fixtures, tests, guidance review, audits, Evidence, and
   reconciliation within the confirmed boundaries. Each consequential format
   boundary is confirmed by the Human Product Owner at the Design before the
   authority set is authored.

## Problem

NKF 0.8 is published, recommended, and producer-adopted, and the repository
is public, but an outsider still cannot adopt from the public record alone.

- The released adopter fetches the recommendation catalog with `gh api` and
  the archive with `gh release download`, so adoption requires an installed
  and authenticated Github CLI even though the repository and its release
  assets are now readable anonymously by plain HTTPS.
- The adopter validates the catalog against closed literals — channel
  `internal-private-github-prerelease`, release visibility `private` — that
  live only in adopter code. The repository is public, so the catalog now
  states a falsehood it cannot correct without breaking every released
  adopter. The gap is recorded in
  [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
  and the
  [public repository observation](../../evidence/release/nkf-037-public-repository-observation.md).
- The frozen NKF 0.8 public-documentation projection tells readers the checker
  release is private and available only to authorized projects, and directs
  them to an authenticated `gh` session.
- The distributed adoption protocol never says where a consumer obtains the
  adopter file; only the public documentation guide does.
- Onboarding on macOS fails whenever Finder rewrites `.DS_Store` between
  inspection and adoption, because the sealed snapshot binds every filesystem
  entry. [NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) records the
  reproduction and the design questions and has been deferred since
  `2026-08-01`.

Separately, the whole-repository sweep of `2026-09-08` found the record stale
beneath its reconciled surface. The consolidated
[current-system Realization](../../realizations/current-system.md) still
carries a 0.7 layer: twenty-three present-tense claims of a superseded state,
twelve internal contradictions, and eight dead contract paths, concentrated in
its durable-mapping rows, its Interfaces section, and its Compatibility
section. The ten supporting Realizations under `realizations/items/` are all
immutable, all legacy-locked, and all stale, with forty-seven superseded
current-state claims and twenty-four dead paths, while the Realizations map
still lists them as "Current System". The specifications map still names 0.7
as the current authority twelve lines above naming 0.8. The Evidence map's
inventory stops at [NKF-030](NKF-030-repair-the-merged-master-gate-and-stale-navigation.md). Seven of nine deferred Tasks carry the empty
retrospective gate while their own prose names governing Decisions, and thirty
links across them point at `tasks/completed/` and `tasks/deferred/`
directories that no longer exist.

## Desired Outcome

1. NKF 0.81 is accepted, technically confirmed, and ready for the Human
   Product Owner's separately authorized publication, recommendation, and
   producer promotion, with live support exactly 0.81 plus 0.8.
2. A consumer with Node.js and network access adopts from the public
   repository with no Github CLI, no login, and no collaborator access, and
   learns from the distributed adoption protocol where to obtain the adopter.
3. The recommendation catalog states its channel and visibility truthfully
   under a closed vocabulary that the accepted contract owns.
4. The public-documentation projection describes a public release.
5. Onboarding tolerates recognized volatile operating-system metadata without
   weakening drift protection for meaningful or unresolved entries.
6. No document in the repository states a superseded state as current, no
   living document points at a path that does not exist, and every remaining
   historical statement is framed as history.

## Fixed Product Boundaries

- Accepted records and published bytes are immutable. Every correction enters
  through this governed successor version with explicit provenance and
  compatibility; nothing frozen is repaired in place.
- The executable companion never silently overrides the normative Markdown.
- Deterministic adoption is earned per version: the 0.8-to-0.81 route fails
  closed when its preconditions are unproven.
- Excluding volatile metadata from the drift digest never narrows the
  participating agent's complete repository review, never trusts `.gitignore`
  as authority, never accepts an unrestricted user-supplied ignore list, and
  never lets the adopter delete a project-owned file.
- The support-window slide keeps compatibility signaling truthful: a 0.71
  repository receives an explicit stepping-stone signal naming the published
  0.8 archive.

## Scope

1. Design: propose the 0.81 direction with its alternatives and trade-offs,
   and stop for the Human Product Owner's confirmation of each format
   boundary: the coordinate and window, the catalog vocabulary entering the
   contract, the adopter's fetch path, the adopter-obtaining step, the
   projection regeneration, and the volatile-metadata boundary.
2. Authority set: the successor Specification, its executable companion, the
   0.81 evaluation policy, and the per-rule 0.8-to-0.81 version delta, seeded
   by the deterministic registry diff and accepted only after an independent
   audit.
3. Adopter and checker: the delta-review closure computed with the evaluation
   policy's impact propagation in the seal and recomputed by the checker;
   plain-HTTPS catalog and archive fetch with digest verification and no `gh`
   dependency; the recommended-release catalog shape
   and its channel vocabulary validated from the accepted contract with a
   public value; dispatch of exactly 0.81 and 0.8; the 0.8-to-0.81 upgrade
   route; stepping-stone refusal naming the published 0.8 archive; and the
   volatile-metadata boundary in inspection, seal, preflight, and receipt.
4. Guidance: the adopter-obtaining step in the adoption protocol and every
   other guidance member regenerated from the version-neutral source at 0.81.
5. Public-documentation projection regenerated to describe a public release
   and the 0.81 format, with the projection tooling brought current.
6. Record reconciliation, every item from the sweep: the current-system
   Realization's remaining 0.7 layer; retirement of the ten immutable
   supporting Realizations to Git history with their declarations, each named
   in the adopting Decision with its last confirmed digest; the specifications
   and Evidence maps; the
   native rewrite of the eight legacy-locked deferred Tasks with real gates,
   resolving links, and stale premises restated as history; the active
   Task Scope Gate Design's dead links; and every living mention of 0.9 as
   the remedy replaced by 0.81 with the reallocation stated.
7. Fixtures, tests, guidance review across the complete set, release
   membership, one exact candidate archive from a clean release commit,
   candidate adoption into an isolated real-producer copy, the acceptance
   test that the 0.8-to-0.81 producer upgrade is proven on the digest-bound
   delta claim alone, a fresh independent release audit, and the mandatory
   audit-bound confirmation Decision.
8. Conclude this Task truthfully, mark the pull request ready, and leave the
   Human Product Owner the publication, recommendation, promotion, and merge.

## Out Of Scope

- Publication, recommendation, live producer promotion, and merging, which
  remain the Human Product Owner's separately authorized acts.
- Changing any NKF 0.8 or earlier published byte or accepted immutable
  record. Immutable supporting Realizations are reclassified, not edited.
- Trademark and conformance-claim policy, the brownfield onboarding of
  [NKF-014](NKF-014-expand-brownfield-and-advanced-onboarding.md), acceptance
  binding under [NKF-016](NKF-016-deliver-acceptance-binding-verification.md),
  the qualification mechanism of
  [NKF-034](NKF-034-qualify-accepted-records-with-later-findings.md), and
  every other deferred Task's substance. Their Task documents are rewritten
  natively here; their work is not performed.
- Onboarding any consumer repository.
- Lifting the branch lock or changing any protection setting.

## Acceptance Criteria

1. The Human Product Owner has confirmed each format boundary at the Design
   before the authority set was authored, and each confirmation is recorded
   verbatim.
2. The 0.81 authority set is accepted by a Decision after an independent
   audit, and the exact release candidate is technically confirmed by a
   Decision bound to a fresh independent release audit.
3. From a clean environment with Node.js and network access, no `gh` binary,
   and no Github credentials, the public Adopt operation resolves the
   recommendation and installs the 0.81 release into an unadopted or 0.8
   repository, verified by digest.
4. The catalog's channel and visibility values are validated from the
   accepted contract's closed vocabulary, and the catalog states a public
   channel truthfully after promotion.
5. The distributed adoption protocol states where a consumer obtains the
   adopter, and no member of the 0.81 set states that the release is private
   or requires an authenticated session.
6. The `.DS_Store` reproduction from
   [NKF-018](NKF-018-stabilize-volatile-onboarding-inputs.md) no longer fails
   onboarding, a meaningful-file change between seal and adoption still fails
   closed, and the volatile entries remain visible in inspection Evidence.
7. Every finding of the `2026-09-08` sweep is repaired or reclassified, and a
   repeat sweep of the living surfaces finds no superseded state stated as
   current and no dead path.
8. The 0.8-to-0.81 producer upgrade in the isolated exercise is proven on the
   digest-bound delta claim alone.
9. No 0.8 or earlier published byte, accepted immutable record, or 0.8 catalog
   literal changes before promotion; the complete gate passes at every
   handoff.

## Execution Plan

1. Open this Task, declare it, regenerate the state index, repin, commit.
2. Author the Design, declare it Active, repin, commit, and stop for the
   Human Product Owner's boundary confirmations.
3. Author the adoption Decision from the confirmed direction, allocate `0.81`,
   and record the Design as adopted.
4. Author the candidate authority set, obtain the independent audit, repair
   findings, and author the acceptance Decision.
5. Implement adopter, checker, contract, guidance, projection, fixtures, and
   tests; register `0.81` at every version surface; prove the set.
6. Perform the record reconciliation in scope item six.
7. Guidance review across the complete set, candidate archive, isolated
   exercise, independent release audit, repairs, confirmation Decision.
8. Completion Result, reseal, gate, deterministic close.

## Created-State Rule

This Task's creation and active declaration record human direction, scope,
plan, constraints, and evidence only. They accept no 0.81 authority set, adopt
no Design, confirm no Realization, establish no conformance, and publish no
release. The same recorded direction that created this Task explicitly began
its work. Later records supersede only the created-state facts they explicitly
replace.

## Current Progress

Created on `2026-09-08` under the Human Direction above, on the `task/NKF-038`
branch stacked on `task/NKF-012`. The Design is authored, and on `2026-09-08`
the Human Product Owner confirmed each of its boundaries verbatim, as recorded
in the Design: `0.81` as a full successor with 0.71 dropping to stepping-stone
history; two public channel values with 0.81 published as a prerelease; plain
HTTPS with no Github CLI and no fallback; the adopter-obtaining step; the fixed
three-name volatile registry; the ten supporting Realizations retired to Git
history rather than relabelled; and, after a further defect was found while
answering — the delta review closure omits the impact propagation the accepted
Specification requires, which is how the frozen Realizations escaped
re-review — the repair of that defect, confirmed "7 - yes . go on".
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
and
[ADR 0139](../../decisions/0139-adopt-the-delta-closure-propagation-repair.md)
adopt the direction and allocate the coordinate. Every mandatory capability
reads `unknown` until the work is performed.

On `2026-09-08` and `2026-09-09` the candidate authority set was derived,
audited three times, repaired, and accepted by
[ADR 0140](../../decisions/0140-accept-the-nkf-0-81-authority-set.md); the
implementation was then derived from it. Three facts about that derivation
belong in this record rather than only in code:

- The release set is derived at cut time and is outside the accepted set. Its
  first copy carried the 0.8 fixture selectors, so the regenerated membership
  shipped the predecessor fixtures as the 0.81 set's own until the guidance
  review's enumeration caught it; the selectors now name the `*-0-81`
  fixtures and the membership is one hundred forty-two members.
- The guidance generator's check mode skips the release members of a version
  frozen by publication and says how many it skipped, because the source
  evolves for the successor and re-deriving a frozen tree from a later source
  checks the wrong thing. The frozen 0.8 tree therefore is not continuously
  re-derived; its bytes were proven at its cut and are bound by its manifest.
- The checker's closure recompute reconstructs the predecessor view from what
  the sealed baseline proves — carried judgments as unchanged nodes, performed
  judgments inside the recorded closure as seeds, performed judgments outside
  it as voluntary expansion — because the predecessor baseline is not a
  checker input under the closed governed-input set. A seal that omitted a
  changed node from both its closure and its performed set is therefore
  indistinguishable from an unchanged node without predecessor bytes; that
  remains the seal's obligation, and a seal under 0.81 computes the same
  propagated closure; this producer's own seals stay under the 0.8 policy until
  it adopts 0.81.

The adopter and seal implementation was completed by an agent instance whose
session ended before it could report; its work was verified here by rebuild,
typecheck, and the complete test suite, and two defects it left were repaired:
the generated catalog Schema failed Ajv strict mode for lack of `type: object`
on its channel clauses, and the third-party notices digest bound in the release
tooling still named the 0.8 bytes.

The first candidate was cut from commit `c7d10aa` after the guidance review
and the isolated exercise passed, and its first independent
[release audit](../../evidence/release/nkf-038-nkf-0-81-release-audit.md)
found the delivery not clean: the cut commit had changed one release-tooling
line without repinning its declaration, so the complete gate failed at the
release commit even though the packaging's own check passed, and the projection
README carried the window sentence the hand slide had corrupted in the two
guides. Both were repaired with the seven should-fix findings, among them a
version-gated region in the guidance generator so the distributed protocols can
state the 0.81 recompute condition without the adopted 0.8 root becoming false.
The candidate is re-cut, re-exercised, and re-audited from the repaired commit.

The second candidate, cut from `a7aa6d8`, was audited by three divided
instances after one instance stalled twice on long-running commands: no
blocking finding, seven should-fix findings — the adopter sealed a review left
at the template's sentinels, catalog facts about the archive were validated for
shape only, the onboarding drift refusal named no entry, the Realization stated
a reseal that had not happened, the publication manifest labelled every release
internal, the guides omitted the release-asset redirect host, and the
Realization listed a path that did not exist — all repaired, together with a
version-neutral guidance-generation check for the 0.81 chain. The third
candidate, cut from `14bcb44`, was audited by two instances: no blocking
finding, five should-fix findings — blank review values escaping the placeholder
refusal, the Realization's summary and test count stated ahead of the tree, the
guidance review describing superseded guide prose, and the onboarding guide's
overbroad staleness sentence — repaired here; the catalog channel a pin cannot
corroborate is recorded for the successor. Each cut passed the complete gate at
its commit and its isolated exercise before its audit.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, Human Product Owner confirmation, authoritative specification updates, derived implementation and fixture changes, a versioned release, and deliberate consumer migration; this Task is that full sequence for 0.81. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; nothing here accepts by implication, and the reconciled Realization is confirmed only by a Decision that binds it. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement is layered and a change to the enforcement surface requires a successor Realization and confirmation; the adopter's fetch path and catalog validation are enforcement surface. |
| [`adr-0064`](../../decisions/0064-release-documentation-and-adoption.md) | record | The digest-addressed release channel, the allowlisted public projection, and the self-contained adopter stand; the projection continues and is regenerated here, and the adopter stays public-safe and digest-verifying. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | After first consumer adoption, every contract-meaning change ships as a new immutable NKF version; the catalog vocabulary entering the contract and the adopter's fetch change ship as 0.81, never as edits to 0.8. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate governed protocols in the versioned set; this Task follows the release protocol's nine steps in order and adopts nothing. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | The pre-cut guidance review re-reads every member of the versioned set, not the rule diff, with the enumerated list and digests recorded; the independent audit verifies that coverage. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public subcommand-free Adopt operation with predecessor-relative compatibility signals; the plain-HTTPS fetch and the adopter-obtaining step change how Adopt reaches its inputs, not the operation's shape. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes released bytes permanently and the producer's own adoption is proven, not asserted; the 0.8 catalog literal stays until promotion, and the 0.8-to-0.81 producer upgrade is proven in the isolated exercise. |
| [`adr-0134`](../../decisions/0134-accept-the-nkf-0-8-authority-set.md) | record | The accepted 0.8 authority set is the exact predecessor the 0.81 version delta is computed against; it changes in nothing. |
| [`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | record | The confirmed 0.8 bytes stay exactly as confirmed; the six limits the fifth audit declined to vouch for are inputs to the 0.81 guidance review, not repaired by implication. |
| [`adr-0136`](../../decisions/0136-adopt-the-public-repository-direction.md) | record | The repository is public and the catalog keeps its private-channel literals until a successor states a public channel truthfully; that Decision named the successor "NKF 0.9", and this Task records `0.81` as that successor without editing the Decision. |
| [`adr-0137`](../../decisions/0137-confirm-the-protected-merge-gate.md) | record | The protected merge gate account is confirmed at an exact Realization revision; the further Realization revision this Task performs is confirmed or not by its own Decision, and this Task must not represent the earlier confirmation as covering it. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Each format boundary is confirmed by the Human Product Owner at the Design and recorded verbatim before the authority set is authored | unknown | none | none |
| The 0.81 authority set is accepted after an independent audit and the exact release candidate is confirmed bound to a fresh release audit | unknown | none | none |
| Adopt resolves the recommendation and installs 0.81 over plain HTTPS with no `gh` binary and no credentials, verified by digest | unknown | none | none |
| The catalog's channel and visibility are validated from the accepted contract's closed vocabulary with a public value | unknown | none | none |
| The distributed adoption protocol states where to obtain the adopter and no 0.81 member calls the release private | unknown | none | none |
| The `.DS_Store` reproduction passes onboarding while a meaningful-file change between seal and adoption still fails closed | unknown | none | none |
| Every sweep finding is repaired or reclassified and a repeat sweep of living surfaces is clean | unknown | none | none |
| The 0.8-to-0.81 producer upgrade is proven on the digest-bound delta claim alone in the isolated exercise | unknown | none | none |
| No 0.8 or earlier published byte, accepted immutable record, or 0.8 catalog literal changes before promotion, and the gate passes at every handoff | unknown | none | none |
