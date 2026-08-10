---
title: "NKF-023: Release NKF 0.3 With Immutable Freeze And Proven Self-Adoption"
summary: Preserve the published NKF 0.2 release as immutable history and replace its private recommendation atomically with NKF 0.3 only after exact candidate self-adoption and independent audit.
created_at: 2026-08-10T20:33:32Z
task_id: NKF-023
task_status: active
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-020
  - NKF-021
  - NKF-022
---

# NKF-023: Release NKF 0.3 With Immutable Freeze And Proven Self-Adoption

## Human Direction

On `2026-08-10`, after the released NKF 0.2 Adopt operation failed closed
against this producer repository, the Human Product Owner confirmed that no
external repository had adopted NKF 0.2 and directed moving the correction to
NKF 0.3 rather than altering 0.2 in place. The Human Product Owner confirmed
that NKF 0.2 remains immutable historical evidence, stops being recommended,
and is neither deleted nor replaced under the same version coordinate.

The Human Product Owner then confirmed this exact successor rule:

> Once an NKF version's exact release archive is published and frozen, any
> change to any member of that frozen versioned set requires a new NKF
> version, even when nobody adopted the release.

The rule permits multiple coherent changes while a version is still a
candidate. After publication, a defective release may be withdrawn or
superseded, but its versioned bytes and history remain immutable. Operational
Tasks, audit Evidence, recommendation state, and repository records outside
the complete frozen set do not independently allocate a format version.

The Human Product Owner explicitly directed creating and beginning this Task.
Product decisions remain with the Human Product Owner; technical
implementation review and confirmation remain delegated to the technical
reviewer, with exact Product boundaries returned for confirmation when they
arise. This direction does not itself accept an NKF 0.3 authority pair,
confirm a Realization, publish a release, migrate a consumer, or establish
conformance.

Later on `2026-08-10`, after exact verification showed that the frozen 0.2
public Adopt executable cannot consume a historical target-0.1 recommendation,
the Human Product Owner confirmed the interim correction: retain the existing
private 0.2 recommendation unchanged, onboard no repository to it, and replace
it atomically only with the verified 0.3 recommendation. This supersedes the
earlier planned temporary restoration of the 0.1 recommendation; the healthy
0.1 release remains supported predecessor authority, not the interim current
recommendation.

## Problem

NKF 0.2 was published and recommended before the exact release package proved
that it could be installed back into the NKF producer repository. The public
Adopt operation requires one exact consumer `nkf:check` integration, while
this repository governs a stronger producer command covering guidance, links,
TypeScript, builds, tests, distribution, and self-hosted validation. The real
no-override attempt therefore failed before mutation, as recorded by
[NKF-022](../cancelled/NKF-022-pin-nkf-repository-to-released-nkf-0-2.md).

The current accepted versioning authority also contains an exception that
allowed an unconsumed release to be corrected and republished under the same
version. That exception conflicts with the newly confirmed release-triggered
freeze rule. A successor must remove the exception without rewriting the
historical 0.2 release, preserve the single public Adopt operation, and make
successful exact-candidate self-adoption a release precondition rather than a
post-publication discovery step.

## Desired Outcome

NKF 0.3 is one complete immutable versioned set with a release-triggered
freeze rule, producer-compatible Adopt integration, explicit migration and
compatibility meaning, and a release protocol that blocks publication until
the exact candidate archive self-adopts in an isolated fresh repository while
preserving the stronger producer gate. A second candidate Adopt returns
`current`, the complete set passes independent audit, and only those exact
audited bytes may be published and recommended.

## Scope

- replace the private NKF 0.2 recommendation only after exact 0.3 verification
  while preserving its published archive, tag, manifest, source, Decisions,
  and audit history;
- retain the existing private NKF 0.2 recommendation unchanged during 0.3
  development, onboard no repository to it, and replace it atomically only
  with the exact verified 0.3 release;
- propose and obtain Human Product Owner adoption of the exact
  release-triggered freeze boundary and its treatment of withdrawn releases,
  candidate changes, operational records, and the former unconsumed-release
  exception;
- allocate NKF `0.3` and derive its accepted Specification, executable
  companion, Schemas, checker, diagnostics, fixtures, examples, protocols,
  portable guidance, host adapters, public documentation, and migration;
- preserve one subcommand-free public Adopt operation that routes supported
  unadopted, 0.1, 0.2, native unpinned 0.3, and current pinned 0.3 states;
- make the installed integration preserve and verify an explicitly governed
  producer validation superset instead of replacing it with the consumer-only
  command;
- add an internal release-candidate path that exercises the exact candidate
  archive before publication without exposing a second public consumer
  operation or mutable trust target;
- require the exact candidate to self-adopt in an isolated fresh clone, pass
  the complete producer gate, and return `current` on repeat Adopt;
- run full versioned-set review, reproducible archive verification, extracted
  checker and adopter exercises, migration tests, and an independent audit
  before technical confirmation and publication;
- after publication, run the ordinary no-override public Adopt operation
  against this repository, independently audit the exact installed state, and
  promote only the verified 0.3 release as recommended; and
- keep acceptance, technical confirmation, conformance, publication,
  recommendation, repository adoption, Git state, and remote enforcement as
  separate facts.

## Out Of Scope

- changing, replacing, deleting, or republishing any NKF 0.2 frozen-set byte
  under the `0.2` coordinate;
- implementing the deferred [NKF-021](../deferred/NKF-021-task-scope-gate.md) Task Scope
  Gate or absorbing any other deferred Task merely because 0.3 is open;
- declaring NKF `1.0` stable or introducing a third version component;
- extending initial onboarding to unsupported mature brownfield repositories;
- accepting or migrating an external repository's canonical meaning;
- implementing acceptance-binding verification or claiming Governing Use
  readiness; and
- claiming protected-branch enforcement without independent remote evidence.

## Execution Plan

1. Establish this Task on clean merged `master`, validate it, commit it on the
   default branch, and activate it through the deterministic Task transition.
2. Independently verify the historical 0.1 release, retain it as supported
   predecessor evidence, and leave the private 0.2 recommendation unchanged
   until atomic verified 0.3 promotion.
3. Author the minimal successor Design for release-triggered freezing and
   candidate self-adoption, compare it against the accepted 0.2 exception and
   release/adoption order, and obtain Human Product Owner confirmation of each
   Product boundary before acceptance.
4. Record successor Decisions, allocate 0.3, draft the exact 0.3 Specification
   and executable companion, independently audit that pair, repair every
   material finding, re-audit the corrected pair, and obtain exact Human
   Product Owner acceptance before deriving implementation.
5. Derive Schemas, checker dispatch, diagnostics, complete-set enumeration,
   producer-compatible Adopt integration, migration meaning, protocols,
   portable guidance, fixtures, examples, public documentation, and tests.
6. Build one exact candidate archive and run its internal candidate-bound
   Adopt transaction in an isolated fresh clone. Require the producer gate to
   remain intact, full validation to pass, and the second run to return
   `current`.
7. Audit the exact candidate independently from fresh source and extraction,
   including membership, provenance, reproducibility, predecessor migration,
   tamper rejection, self-adoption, idempotence, and every material finding.
8. Exercise delegated technical confirmation only after a clean audit, then
   publish exactly the confirmed archive without changing any frozen byte.
9. Promote the published 0.3 recommendation, run ordinary no-override public
   Adopt against this repository, repeat it to require `current`, and audit
   the installed pin and integration independently.
10. Reconcile every acceptance criterion and mandatory capability, update the
    current-system Realization without overstating confirmation, and close the
    Task through the deterministic transition for human merge.

## Acceptance Criteria

- NKF 0.2 stops being recommended only through atomic verified 0.3 promotion,
  while its exact published release remains retrievable and unchanged as
  historical evidence.
- During private 0.3 development, the existing 0.2 recommendation remains
  byte-unchanged, no repository is onboarded to it, and promotion changes the
  channel atomically to the exact verified 0.3 release.
- A successor Decision explicitly supersedes the consumer-triggered freeze
  condition and the unconsumed-release replacement exception: publication of
  the exact archive freezes the complete set regardless of adoption count.
- The exact Human Product Owner-accepted NKF 0.3 authority pair and all
  derived members consistently express one version namespace and the new
  freeze rule.
- The complete 0.3 versioned set is enumerated once and carried identically by
  archive construction, verification, public documentation, and Adopt.
- One public Adopt operation routes every supported repository state to the
  latest recommended version with explicit predecessor-relative compatibility
  and authority approval before breaking mutation.
- The NKF producer repository can install the exact candidate and published
  0.3 set without weakening or bypassing its stronger canonical producer
  validation command.
- In a fresh isolated repository, the exact candidate self-adopts, the full
  producer gate reports zero diagnostics, and repeat candidate Adopt returns
  `current` before publication.
- Independent audit Evidence verifies exact candidate source, archive bytes,
  full membership, extracted checker and adopter, supported migrations,
  producer integration, self-adoption, idempotence, rollback, and tamper
  rejection before technical confirmation.
- After authenticated publication, the same immutable archive is promoted as
  recommended, ordinary no-override public Adopt self-pins this repository,
  repeat Adopt returns `current`, and a fresh independent post-action audit
  verifies the complete installed state.
- `npm run nkf:check` passes for every handoff candidate and the final exact
  source snapshot with zero diagnostics.
- Acceptance, delegated technical confirmation, conformance, publication,
  recommendation, consumer pinning, local Git state, remote workflow state,
  and Governing Use readiness remain separately reported.

## Current Progress

- [NKF-022](../cancelled/NKF-022-pin-nkf-repository-to-released-nkf-0-2.md)
  is merged as cancelled with no 0.2 pin or partial integration installed.
- The Human Product Owner confirmed that no external repository adopted NKF
  0.2, selected NKF 0.3 rather than an in-place replacement, confirmed the
  release-triggered freeze rule, and directed creating and beginning this
  Task.
- Task creation is the only governed change currently being performed. No
  Design, successor Decision, Specification, executable companion, Schema,
  checker, adopter, migration, release, recommendation, or consumer state has
  yet changed under this Task.
- The exact deferred Task candidate passed `npm run nkf:check`: 22 test files
  and 192 tests passed, 931 living links resolved, deterministic checker,
  adopter, and public-documentation builds matched, and self-hosted
  full-bundle validation reported zero diagnostics.
- Activation requirements are semantically resolved: the 0.3 allocation,
  release-triggered freeze, preservation of immutable 0.2 history, temporary
  recommendation rollback, one public Adopt operation, preservation of the
  stronger producer gate, exact-candidate self-adoption, delegated technical
  confirmation, and independent audit are understood and confirmed. Exact
  Design and authority-pair bytes remain later Product review and acceptance
  boundaries rather than activation uncertainties.
- Deterministic activation created `task/NKF-023`, its isolated worktree, and
  draft PR 6. The activation transition validated, committed, and pushed the
  exact active Task state.
- The exact historical NKF 0.1 release was authenticated, downloaded,
  byte-verified, source-bound, rebuilt from its locked source, and exercised
  with its extracted checker. The
  [interim recommendation assessment](../../evidence/audits/nkf-023-interim-recommendation-assessment.md)
  records the full result, including the raw-checkout missing-build-artifact
  failure before the deterministic historical build.
- Directly restoring that healthy 0.1 catalog is unsupported by the currently
  distributed frozen 0.2 Adopt executable, which only accepts a recommendation
  targeting 0.2 with the accepted two-predecessor compatibility shape.
  Restoring the old adopter or changing the released 0.2 adopter would violate
  the confirmed freeze. No recommendation changed; work pauses at the Product
  choice between temporarily retaining the existing 0.2 recommendation until
  atomic 0.3 promotion or deliberately pausing public Adopt until 0.3.
- The Human Product Owner selected temporary retention: the 0.2 recommendation
  remains byte-unchanged, no repository is to adopt it, and verified 0.3
  replaces it atomically. The Decision Applicability Gate was re-extracted;
  consumability of a temporary 0.1 recommendation is no longer a mandatory
  capability.
- The active
  [NKF 0.3 Design](../../designs/adopted/nkf-0-3-immutable-freeze-and-proven-self-adoption.md)
  records the confirmed freeze and interim boundaries together with
  exact-candidate self-adoption, a general verified host-superset integration,
  release/adoption order, and predecessor compatibility. The Human Product
  Owner confirmed the remaining `0.2`-to-`0.3` breaking classification on
  `2026-08-10`, authorizing adoption of the exact Design revision through
  [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md).
- The unaccepted [NKF 0.3 Specification Draft](../../specifications/nkf-0.3.md)
  and executable companion candidate preserve the complete 0.2 Product and
  Technology knowledge contract while proposing the accepted successor
  boundaries. The first fresh independent authority-pair audit verified its
  supplied digests, predecessor bindings, YAML safety, and links, but blocked
  acceptance on four material findings: a confirmation-to-manifest byte cycle,
  weaker executable file-mode rules, non-derivable release-set class
  completeness, and operational-process detail placed inside the format pair.
  The earlier acceptance request was withdrawn. The technical correction now
  separates external post-audit confirmation from immutable archive metadata,
  makes class coverage and modes deterministic, and leaves operational order
  to the versioned release and adoption protocols. The first correction
  re-audit cleared those four findings and independently proved the release
  cycle, mode rule, coverage model, process allocation, and digest topology,
  but blocked exact acceptance on three pair-symmetry defects: same-version
  refresh and selector ordering were executable-only, and an earlier complete-
  set summary omitted later-required classes. After correction, the second
  exact-byte re-audit returned `CLEAN` with no remaining material finding. It
  verified final-form Markdown SHA-256
  `0094bedce5485901c3ab6fb542e3d2785e961991cf7cc6f24e9aa3462498436e`
  and executable SHA-256
  `e988a596e741d48611a5f77a9236e9d539f9a7475a76f07768bc273a8bf4d27f`,
  together with predecessor bindings, strict parsing, links, semantic
  symmetry, release-set self-reference, and every earlier regression. The
  current 0.2 authoring gate also passed after correction with 22 test files
  and 192 tests. The Draft has no authority effect; exact Human Product Owner
  acceptance remains pending and implementation has not begun.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, classification, Human Product Owner confirmation, authority-first updates, derived implementation, versioned release, and deliberate migration. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | A changed enforcement surface requires predecessor comparison, human review, a successor Realization, and later technical confirmation; one exact command remains the candidate gate. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Accepted versions are immutable after first consumption under current authority; NKF 0.3 must explicitly supersede that trigger with the confirmed publication-triggered freeze rather than rewriting this Decision. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption remain separate, both protocols freeze in the versioned set, and the NKF repository must prove the same adoption path before consumers carry risk. |
| [`adr-0081`](../../decisions/0081-accept-nkf-0-2-authority-pair.md) | record | The exact accepted NKF 0.2 authority pair is immutable; any later pair change is a new version. |
| [`adr-0084`](../../decisions/0084-replace-the-unconsumed-0-2-release.md) | record | The historical unconsumed-release replacement was an explicit bounded exception; the confirmed 0.3 direction requires a successor Decision that removes this exception prospectively. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The release archive carries the complete versioned set and onboarding or adoption requires a fresh independent post-action audit. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | Pre-cut review covers every deterministically enumerated versioned-set member against the complete applicable rule set. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Semantic review and authority precede deterministic mechanics; Task activation and conclusion require resolved, confirmed requirements. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | This Task's branch carries its whole active life and merges only after conclusion; merging remains the human review act. |
| [`adr-0106`](../../decisions/0106-confirm-the-complete-set-release-correction.md) | record | One 132-member pre-manifest enumeration currently feeds archive, verifier, public documentation, and Adopt; 0.3 must preserve one complete-set source rather than reintroduce split membership. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | NKF exposes one public subcommand-free Adopt operation, pins an immutable recommendation, declares compatibility for every supported predecessor, and requires explicit authority approval before breaking migration. |
| [`adr-0108`](../../decisions/0108-confirm-the-unified-adopt-realization.md) | record | The exact 0.2 Adopt implementation is technically confirmed only for its audited source and candidate archive; successor implementation requires its own independent audit and confirmation. |
| [`adr-0109`](../../decisions/0109-publication-freeze-and-proven-self-adoption.md) | record | Publication freezes every complete-set member permanently, candidate and public self-adoption remain separate gates, the producer gate must be preserved through a general verified integration, and 0.1-to-0.3 plus 0.2-to-0.3 migrations require explicit approval as breaking changes. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Published NKF versions remain immutable after release even when no repository adopts them | unknown | none | none |
| The governed recommendation can leave 0.2 without deleting or altering its published release history | unknown | none | none |
| One complete-set enumeration carries every exact NKF 0.3 frozen member across all distribution surfaces | unknown | none | none |
| The single public Adopt operation routes every supported unadopted and predecessor state safely to recommended 0.3 | unknown | none | none |
| Exact candidate Adopt preserves the NKF producer repository's stronger canonical validation gate | unknown | none | none |
| Exact candidate self-adoption and repeat `current` succeed before publication in a fresh isolated repository | unknown | none | none |
| Independent audit reproduces and verifies the complete candidate before delegated technical confirmation | unknown | none | none |
| Ordinary published Adopt self-pins this repository and independently verifies `current` after publication | unknown | none | none |
