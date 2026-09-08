---
title: "NKF-037: Make The NKF Repository Public"
summary: Govern the change of the NKF producer repository from private to public — propose the direction as a Design, record the Human Product Owner's Decision superseding the earlier rejection of a public repository, perform the pre-flip hygiene and post-flip verification and reconciliation around the Human Product Owner's own visibility act, and record why the released recommendation catalog keeps its private-channel literals until NKF 0.9 — without changing any accepted meaning or published byte.
created_at: 2026-09-08T11:25:20Z
---

# NKF-037: Make The NKF Repository Public

## Human Direction

On `2026-09-08`, after the
[NKF-036](NKF-036-reconcile-the-producer-record-and-republish-the-public-projection.md)
pull request was merged, the Human Product Owner directed verbatim: "yes let's
open source the repo. what steps needs to be taken here ?" The Claude technical
reviewer listed the steps and proposed one Task for the governance, hygiene,
flip verification, and reconciliation, with the NKF 0.9 successor work left to
a separate release Task. The Human Product Owner directed verbatim: "go on".

That direction explicitly creates this Task and begins its work, starting with
the Design. The confirmed boundaries:

1. This Task's complete lifecycle is carried on the `task/NKF-037` branch from
   `master`, and one pull request delivers it for human review.
2. The visibility change itself is the Human Product Owner's act in Github
   repository settings. This Task prepares, verifies, and records it; no agent
   performs it.
3. Merging remains the Human Product Owner's act.
4. The Human Product Owner remains authority for every Product boundary,
   including the Decision that supersedes the earlier rejection and every
   community-policy question. The Claude technical reviewer is delegated to
   author the Design and the Decision text from the confirmed direction,
   perform the history scan, the post-flip verification, the reconciliation
   edits, the Evidence recording, and the gate runs.

## Problem

NKF 0.8 is ready for a clean repository to adopt, but the adoption path assumes
access this repository does not grant. The released adopter resolves the
recommendation catalog with `gh api` and downloads the archive with
`gh release download` from `NourdApS/Nourd.NKF`, which is private. A
repository owner outside the collaborator set cannot adopt at all, and there is
no address anyone can hand out for the latest or a specific published version.

[ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) rejected
making the complete repository public because documentation did not require
it, and chose the public documentation projection instead. That reasoning was
about documentation. The need now is adoption by repositories this
organization does not administer, which the projection cannot serve on its
own.

Two consequences of the private state are already recorded elsewhere.
[NKF-012](NKF-012-activate-protected-merge-gate.md) is deferred because Github
returned `403` for branch protection on a private repository under the current
plan, and its activation condition names a visibility change explicitly.
[NKF-009](NKF-009-governed-artifact-secret-scanning.md) is deferred, so no
governed secret scan has run over the history that a public repository would
expose.

One consequence is new. The released NKF 0.8 adopter validates the recommended
release catalog against closed literals: channel
`internal-private-github-prerelease` and release visibility `private`. That
vocabulary is adopter code, not accepted Specification meaning. Once the
repository is public the catalog states a false visibility, and correcting the
literal breaks every 0.8 and 0.71 adopter, because their validation is frozen
in published bytes. A truthful public catalog needs the NKF 0.9 successor.

## Desired Outcome

1. A Design states the public-repository direction with its alternatives and
   trade-offs, and a Decision by the Human Product Owner adopts it, superseding
   the rejection in
   [ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) for
   exactly that scope.
2. The Git history is scanned for secrets and personal data before the flip,
   and the result is Evidence.
3. The Human Product Owner flips visibility; the public state is then verified
   from outside the collaborator set — anonymous clone, anonymous archive
   download by the catalog URL, and branch-protection availability — and
   recorded as Evidence.
4. The front page and the current-system Realization state the public reality,
   and the recorded catalog-truthfulness gap names NKF 0.9 as its remedy.
5. [NKF-012](NKF-012-activate-protected-merge-gate.md) is either unblocked with
   its activation condition observed true, or activated if the Human Product
   Owner directs it.

## Scope

1. Author the public-repository Design with an Active disposition.
2. Author the Decision adopting it, once the Human Product Owner confirms the
   Design direction, and record the Design as adopted.
3. Scan the complete Git history for secrets and personal data and record the
   result as Evidence, whatever it finds.
4. After the Human Product Owner's flip, verify the public state and record it
   as Evidence.
5. Reconcile the front page and the Realization paragraphs that describe the
   repository as private, and record the catalog gap with its 0.9 remedy.
6. Repin, reseal, run the gate, and deliver one pull request.

## Out Of Scope

- Performing the visibility change. That is the Human Product Owner's act in
  Github settings.
- Changing the recommendation catalog's channel or visibility literals. That
  breaks released adopters and belongs to NKF 0.9.
- Any NKF 0.9 work: the adopter's plain-HTTPS fetch, the channel vocabulary
  moving into the accepted contract, the regenerated public-docs prose, and the
  adoption protocol's adopter-obtaining step.
- Authoring community policy content — security response, contribution,
  conduct — beyond recording the Human Product Owner's decision about whether
  and when they exist.
- Activating the protected merge gate, unless the Human Product Owner directs
  it within this Task; otherwise it stays with
  [NKF-012](NKF-012-activate-protected-merge-gate.md).
- Changing any accepted meaning, contract, or published byte.

## Acceptance Criteria

1. The Design exists with its alternatives and trade-offs, and the Decision
   adopting it is accepted by the Human Product Owner, with the Design's
   disposition recorded as adopted.
2. The history-scan Evidence records the method, the scope scanned, and every
   finding, or the absence of findings.
3. After the flip, an anonymous clone succeeds, the catalog's archive URL
   downloads anonymously and its bytes hash to the recommended archive digest,
   and the branch-protection API no longer returns `403`, each recorded as
   Evidence.
4. No statement in the front page or the Realization describes the repository
   as private, and the catalog-truthfulness gap is recorded with NKF 0.9 named
   as its remedy.
5. No published NKF 0.1 through 0.8 byte, no accepted immutable record, and no
   recommendation catalog literal changes.
6. The complete gate passes.

## Execution Plan

1. Open this Task on `task/NKF-037`, declare it, regenerate the state index,
   repin, and commit.
2. Author the Design, scaffold and complete its record declaration, register
   it as Active, repin, run the gate, and commit. Stop for the Human Product
   Owner's confirmation of the direction.
3. Author the Decision from the confirmed direction, scaffold and complete its
   record declaration, record the Design as adopted, repin, and commit.
4. Complete the history scan and record it as Evidence. Stop for the Human
   Product Owner's flip.
5. Verify the public state, record it as Evidence, reconcile the front page and
   Realization, repin, reseal, run the gate, and commit.
6. Author the Completion Result, prove every mandatory capability, reseal, and
   run the deterministic close.

## Current Progress

Created on `2026-09-08` under the Human Direction above, on the `task/NKF-037`
branch from `master`. The Design is authored and, after the Human Product
Owner confirmed the direction and all four open questions, adopted by
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md). The
history scan is recorded as
[Evidence](../../evidence/audits/nkf-037-history-scan.md) and found no
credential or third-party personal data. The policy files exist as repository
content. The Task is stopped at the Human Product Owner's flip; verification,
protection activation, reconciliation, and close follow it. Every mandatory
capability reads `unknown` until then.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, and deliberate migration; visibility is an operational fact, not format meaning, and this Task must not change meaning under its cover. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; a public repository accepts nothing and confirms nothing. |
| [`adr-0064`](../../decisions/0064-release-documentation-and-adoption.md) | record | Rejected making the complete repository public on documentation grounds and chose the allowlisted public projection. This Task supersedes exactly the rejection through a later Decision; the projection direction stands. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate governed protocols in the versioned set; this Task changes neither, and the adopter's fetch behaviour changes only through a versioned release. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes released bytes permanently; the released adopters' catalog validation is frozen, which is why the catalog literals cannot change before NKF 0.9. |
| [`adr-0121`](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md) | record | Apache-2.0 licensing was prepared as repository content and explicitly did not make the repository public; this Task supplies the separate visibility Decision that licensing anticipated. |
| [`adr-0135`](../../decisions/0135-confirm-the-nkf-0-8-release-candidate.md) | record | The confirmed and published NKF 0.8 bytes stay exactly as confirmed; a public repository exposes them, it does not change them. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| The Design and its adopting Decision exist, the Decision is accepted by the Human Product Owner, and the Design disposition is adopted | unknown | none | none |
| The complete Git history is scanned for secrets and personal data with method, scope, and findings recorded as Evidence | unknown | none | none |
| After the flip, anonymous clone, anonymous archive download hashing to the recommended digest, and branch-protection availability are observed and recorded | unknown | none | none |
| No front-page or Realization statement describes the repository as private, and the catalog gap is recorded with NKF 0.9 as remedy | unknown | none | none |
| No published byte, accepted immutable record, or catalog literal changes | unknown | none | none |
| The complete gate passes | unknown | none | none |
