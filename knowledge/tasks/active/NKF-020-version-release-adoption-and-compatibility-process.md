---
title: "NKF-020: Define Version Release, Adoption, And Compatibility Process"
summary: Define the governed process for releasing a new NKF version, the process by which an adopted repository adopts a new version, and how breaking changes are classified and signaled to consumers.
created_at: 2026-08-06T23:30:03Z
task_id: NKF-020
task_status: active
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-016
  - NKF-018
  - NKF-019
---

# NKF-020: Define Version Release, Adoption, And Compatibility Process

## Human Direction

On `2026-08-06`, while reviewing the NKF 0.2 candidate under [`NKF-019`](../completed/NKF-019-decision-applicability-gate.md), the
Human Product Owner directed that the shipping process be removed from the
NKF rulebook and that this Task be created and deferred. The directed scope
is to define how a new NKF version is released, how a repository adopts a
new version, and whether a new version has breaking changes, including how
that is determined and communicated.

Creation does not authorize Design, Decision, Specification, implementation,
release, or consumer work. Begin only after a separate explicit human
direction to start `NKF-020`.

On `2026-08-08`, the Human Product Owner explicitly directed activating this
Task and beginning work, with this recorded execution plan for the first
round: replace the released version's compressed release notes with a
reader-first version and require named human-readable sections in the
release protocol; add a front-page refresh step to the release protocol and
refresh this repository's outdated front page to the released 0.2 state;
add a deterministic dead-link verification for living surfaces to the
canonical command, with immutable decisions and Evidence exempt; decouple
the accepted Specification from Task lifecycle by rewording its six
Task-file references as timeless scope statements, after the first
activation attempt proved that a lifecycle transition would otherwise
change accepted pair bytes and correctly failed closed; correct the task
command to rebase a moved Task's own outbound links; and re-release the
corrected set under the continued exception with the revised pair
re-accepted and the release checker re-bound. Timeless wording was chosen
so that no future Task lifecycle transition can require a release.

Later on `2026-08-08`, the Human Product Owner directed embedding the usual
Git actions deterministically in the Task transitions: activation requires
a clean work tree on the up-to-date default branch and creates the Task's
own branch before starting; closing commits the transition on that branch,
pushes it, and opens the merge request that carries the Completion Result,
with the merge itself remaining the repository's human review act. The
transition flows in the guidance and the `task` command carry these
mechanics; this round ships them and re-releases the set, and the branch
flow governs transitions from that release onward.

Still later on `2026-08-08`, the Human Product Owner directed two
corrections to that shipment, approved as an explicit proposal: the
informal phrase carried into the skills and release notes is replaced by
the formal term Git transition mechanics, and activation creates the
Task's own working tree at a deterministic sibling path in addition to the
branch, so the default-branch checkout never leaves the default branch;
closure runs in that working tree and releases it once the branch is
pushed. The Human Product Owner also directed an independent audit of the
completed work, recorded as findings in this Task.

On `2026-08-08`, reviewing the audit findings, the Human Product Owner
directed addressing the first one: a Git step that fails after the applied
transition must surface as a successful transition with an explicit
incomplete Git report and error field, never as a failed command, because
the transition and its commit exist and the report must not contradict
them.

On `2026-08-09`, after the deferred [NKF-021](../deferred/NKF-021-task-scope-gate.md)
pull request exposed a failing remote validation check, the Human Product
Owner directed fixing the technical CI defect without another Product
decision or approval round. The repair remains owned by NKF-020 because it is
an exact-commit workflow and release-integrity refinement. It may land on the
already authorized exceptional recovery branch because the failed check
blocks incorporation of [NKF-021](../deferred/NKF-021-task-scope-gate.md)'s concluded state; it does not reopen [NKF-021](../deferred/NKF-021-task-scope-gate.md)
or add Task Scope Gate meaning to NKF 0.2.

After that pull request merged, the Human Product Owner directed continuing
the technical repair and explicitly stated that it carries no Product-specific
decision for separate approval. This delegates correction of implementation
that fails to realize already accepted NKF 0.2 release meaning; it does not
delegate a new breaking-change policy, accept new format meaning, or migrate a
consumer by implication.

## Scope Reduction

On `2026-08-07`, [ADR 0080](../../decisions/0080-release-and-adoption-process.md) under [`NKF-019`](../completed/NKF-019-decision-applicability-gate.md) accepted the separated release and
adoption processes and their followable protocols, consuming most of this
Task's directed scope ahead of activation. The remaining deferred scope is
breaking-change classification and signaling, plus process refinements from
real release and adoption experience.

## Problem

[ADR 0076](../../decisions/0076-versioned-contract-evolution.md) establishes that every contract-meaning change after first consumer
adoption ships as a new immutable NKF version, and [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md) keeps release
and adoption process outside format meaning. No governed process yet defines
the exact release steps, the consumer adoption and migration procedure, or
how breaking and non-breaking versions are classified and signaled. Until
that exists, each release relies on the accepted governance rules plus
per-release migration notes.

## Draft Process Input

The following release outline was drafted inside the NKF 0.2 candidate and
removed by [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md). It is unaccepted draft input for this Task, not
established process:

1. an immutable Decision adopting the change and allocating the version;
2. Human Product Owner acceptance of the exact new Specification revision
   and its digest-bound executable companion;
3. Schemas, checker, diagnostics, fixtures, tests, onboarding, guidance, and
   documentation derived from the accepted meaning;
4. a passing complete authoring gate on the exact successor snapshot,
   including the publishing repository's own migration;
5. independent audit Evidence and a separate confirmation Decision;
6. one content-addressed versioned release archive and manifest; and
7. explicit migration meaning for consumers, who migrate deliberately.

## Desired Outcome

One governed process definition covering:

- the release process for a new NKF version, from adopting Decision through
  verified versioned release and published migration meaning;
- the adoption process for a consumer repository moving to a new version,
  including validation, Task-gate migration obligations, receipts or other
  integrity evidence, and rollback boundaries;
- breaking-change classification: how it is determined whether a version
  carries breaking changes, where that classification is declared, and how
  consumers observe it before migrating; and
- the authority boundaries that keep release, adoption, acceptance,
  conformance, confirmation, and publication separate facts.

## Scope

- reconcile [ADR 0076](../../decisions/0076-versioned-contract-evolution.md), [ADR 0078](../../decisions/0078-version-gate-correction-as-nkf-0-2.md), the accepted version semantics, release
  tooling, adopter behavior, and existing migration precedent;
- compare candidate homes for the process: governed process knowledge,
  Realization knowledge, release tooling contracts, or an NKF extension;
- define breaking-change classification criteria and their declaration,
  including whether the release manifest or another artifact carries them;
- define the consumer adoption procedure for version migration, including
  gating previously completed Tasks where a version requires it;
- obtain Human Product Owner decisions on the consequential boundaries; and
- derive any required tooling, fixtures, documentation, and guidance from
  the accepted process meaning.

## Out Of Scope Until Activation

- accepting or changing any NKF Specification revision;
- implementing release or adoption tooling changes;
- publishing a release or migrating any consumer;
- changing NKF 0.1 or NKF 0.2 meaning; and
- defining acceptance-binding verification, which remains [`NKF-016`](../deferred/NKF-016-deliver-acceptance-binding-verification.md).

## Future Execution Plan

1. Collect the release and migration precedent from completed NKF Tasks and
   the NKF 0.2 shipment as evidence.
2. Draft a Design comparing process homes, breaking-change classification
   models, and adoption procedures with alternatives and trade-offs.
3. Resolve the consequential boundaries with the Human Product Owner and
   record them in immutable Decisions.
4. Realize the accepted process in the appropriate governed locations and
   tooling, with fixtures and tests where deterministic.
5. Validate with exactly `npm run nkf:check` and present the successor for
   separate audit and confirmation.
6. Inspect the exact failing pull-request run and compare it with the local
   full-history result and the confirmed predecessor workflow.
7. Repair only the checkout-history precondition required by tests that
   intentionally archive pinned predecessor commits; preserve the read-only
   token, exact checked-out candidate, full-SHA Action pins, locked install,
   canonical validation command, and deferred protection boundary.
8. Re-pin the governed workflow artifact, update the unconfirmed current-system
   account, run exactly `npm run nkf:check`, commit, push, and observe the new
   remote check on its exact head before recommending merge.
9. Reconcile the independent audit's archive-membership finding against the
   accepted 0.2 Specification, [ADR 0094](../../decisions/0094-carry-the-set-and-audit-independently.md), and the release protocol; classify omission of already required members as a release-tooling defect rather than a new Product or format decision.
10. Make the deterministic release-entry list, archive verifier, and adopter
    `set` command carry and enumerate the exact complete 0.2 set: authority and
    contracts, checker and governed adopter, protocols and portable skills,
    host-adapter instruction content, fixtures, examples, documentation
    projection, and manifest. Add focused exact-membership and tamper tests.
11. Reconcile the consolidated current-system account and repository release
    surfaces with observed 0.2 reality while preserving predecessor
    confirmation provenance, consumer-migration separation, and the deferred
    breaking-change-policy boundary.
12. Run exactly `npm run nkf:check`, build the candidate archive twice, and
    perform a fresh post-action audit from independently extracted bytes:
    digest and byte comparison, exact member comparison with `set`, checker and
    adopter invocation, fixture and public-example conformance, guidance
    markers, and source provenance.
13. Only after that audit is clean, publish and independently re-download the
    corrected unconsumed 0.2 release under [ADR 0084](../../decisions/0084-replace-the-unconsumed-0-2-release.md), then update recommendation and front-page publication facts only to exact observed state. Do not claim consumer migration.
14. Conclude this Task only for criteria actually satisfied; do not manufacture
    acceptance of the separately unresolved breaking-change classification and
    signaling boundary.

## Current Progress

- [ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) records the combination principle and this round's direction. The
  authoring protocol and skill carry the explicit open and close
  procedures, and this Task's own activation was their first execution:
  semantic review, gate re-extraction, and recorded confirmations first,
  the deterministic transition second.
- The specification decoupled from Task lifecycle and states the
  sealed-pair versioning rule. [ADR 0099](../../decisions/0099-accept-the-decoupled-0-2-pair.md) accepts the revised pair, every
  digest pin moved in one cascade, and [ADR 0100](../../decisions/0100-bind-the-decoupled-0-2-release-checker.md) binds the rebuilt checker.
- The release protocol requires human-readable notes and a front-page
  refresh, the front page was refreshed to the released 0.2 state, and the
  deterministic link verification joined the canonical command: 799 living
  links checked with zero dead, immutable decisions and Evidence exempt.
- The task command rebases a moved Task's own outbound links with a
  regression test, after the first activation attempt failed closed on the
  specification's Task links.
- The widened pre-cut review ran from the deterministic set enumeration:
  every guidance member was re-read against the complete rule set
  including the new sealed-pair rule; the corrections were the
  release-protocol immutability boundary and the members this round
  changed, and the remaining members carry no stale statement.
- The corrected release is tag
  `release-sha256-4c67df321f2482fa4356478011fd1b85bc56d277942b41ab61b5e179b24113f9`
  from commit `adbe2a5`, verified by independent re-download; the archive's
  own extracted checker validates this bundle with zero diagnostics; the
  superseded unconsumed release was deleted under the recorded exception.
- [ADR 0101](../../decisions/0101-deterministic-git-mechanics-in-task-transitions.md) embeds the Git actions in the task command: activation requires a
  clean work tree on the up-to-date default branch and creates the
  `task/<task_id>` branch; deferral and closure commit, push, and open the
  merge request carrying the Completion Result; merging stays the human
  review act. Three regression tests prove the dirty-tree refusal, the
  branch-commit-push deferral, and the clean-default-branch activation.
  The set was re-cut as tag
  `release-sha256-5b6acbb4b1bb9cde46ebe78ddb505d0672956feb82f2e3b422cb674fc91cffa0`
  from commit `60dfd4c` with the checker binding unchanged, verified by
  independent re-download, and the archive's extracted checker validates
  this bundle with zero diagnostics; the branch flow governs transitions
  from this release onward.
- [ADR 0102](../../decisions/0102-task-worktrees-and-formal-transition-vocabulary.md) replaces the informal transition phrase with the formal term Git
  transition mechanics and gives every activation its own working tree at
  the deterministic sibling path, applied inside the working tree so the
  default-branch checkout never moves; closure releases the working tree
  after pushing. The set was re-cut as tag
  `release-sha256-053a51f3fcefee290f43fb94ff398b55b274896c8417e99fef52559425ebd7ac`
  from commit `d45e828` with the checker binding unchanged.
- The directed independent audit of that shipment was performed with fresh
  verification rather than test reruns, and its findings are: the
  re-downloaded archive matches by digest and byte comparison and its
  extracted checker validates this bundle with zero diagnostics; the
  shipped members and the working tree carry no informal transition
  vocabulary; a full deferral, worktree activation, and worktree-resident
  closure lifecycle succeeds end to end outside the test suite, ending
  with the working tree released and the default branch checked out.
  Two defects and one cosmetic observation are recorded as open findings:
  a Git step that fails after the applied transition — such as a failed
  push — surfaces the whole command as failed although the transition and
  its commit exist, which misleads the reader; an origin remote recorded
  as a relative filesystem path resolves differently from inside a
  working tree and cannot be pushed to, which URL remotes do not suffer;
  and the sibling working-tree parent directory remains, empty, after the
  last working tree is released. No finding blocks the shipment; the
  reporting defect is proposed for the next tooling round.
- [ADR 0103](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) records the confirmed branch-carried Task life and the official
  `cancelled` state, and [ADR 0104](../../decisions/0104-accept-the-cancelled-state-pair.md) accepts the revised pair carrying it.
  The delivered cascade: the specification and executable companion define
  the four-state vocabulary and `tasks/cancelled/` topology; the checker
  enforces placement and the enum; onboarding generates the cancelled
  index; the deterministic migration creates and registers it for 0.1
  consumers; the task command gains `cancel` with a required Cancellation
  Result, terminal semantics, and no completion-gate application;
  activation pushes and opens a draft merge request; conclusions mark the
  request ready; the pending view reports resting state plus in-flight
  branches and requests; and the Git report never over-claims, folding in
  the audit's reporting finding. The widened pre-cut review ran against
  the changed rule with no stale statement in any member; fixtures,
  examples, and 186 tests validate the complete set.
- The corrected set was released as tag
  `release-sha256-a1a12e4482d430a1555b0bb8dbda9ba716ca3acaadb845c0ef4dd9f632023482`
  from commit `f39c7f9`, with the rebuilt checker bound through [ADR 0105](../../decisions/0105-bind-the-cancelled-state-release-checker.md)
  and human-readable notes naming the four-state lifecycle and the
  migration's new index.
- The directed independent audit of the cancelled-state shipment was
  performed with fresh verification: the re-downloaded archive matches by
  digest and byte comparison and its extracted checker validates this
  bundle with zero diagnostics; the shipped specification and executable
  companion both carry the cancelled state; no informal transition
  vocabulary survives in the shipped set; and a cancellation driven by the
  distributed adopter against the archive's checker transitions the Task,
  records its rationale, pushes the branch, and reports the conclusion as
  proposed rather than done. The audit confirmed the confirmed model
  behaving as intended rather than as a defect: after the conclusion the
  default branch still rests in the pre-conclusion state, the concluded
  Task lives on its branch awaiting the human merge, the pending view
  reports both, and terminality is enforced where the cancelled state
  rests. One new finding is open: the deterministic command surface ships
  in the adopter, which is distributed through the public documentation
  mirror and self-installs rather than being a member of the release
  archive, so the set enumeration does not list it; either the adopter
  joins the archive members or the versioned-set wording is corrected to
  describe its actual distribution. The earlier cosmetic findings remain.
- The remaining scope is breaking-change classification and signaling, the
  deterministic successor-pair scaffold, process refinements from further
  release and adoption experience, and the audit's open findings.
- Pull-request run `31313283533` on exact head `c6a0aa3b6df4e0a75af234bf045d701ea7cc4888`
  failed because the default `actions/checkout` depth supplied only the merge
  commit. `test/adopter.test.ts` requires pinned predecessor commit
  `53ae5217f68731d953f3bf616a578adeb033bb03`, and
  `test/mechanics.test.ts` requires pinned predecessor commit `b748402`; both
  are available in the local full-history repository, where all 186 tests
  pass. The repair changes checkout history availability only; it does not
  weaken the command, skip either test, change NKF meaning, or claim remote
  success before a new run is observed.
- Successor run `31325531988` on exact head
  `a30e108121db5beebc27ad39bf2d831a410e7da7` proved the full-history repair:
  both previously missing predecessor commits were available and the
  migration and adopter predecessor tests passed. It then exposed a separate
  hosted-runner timing boundary: the complete two-profile empty-repository
  onboarding test finished in `5.459` seconds and exceeded Vitest's default
  five-second test timeout. The candidate gives only that existing end-to-end
  test a `15`-second timeout, matching the file's other bounded integration
  tests; its assertions and the global timeout remain unchanged.
- Pull request `1` merged the concluded [NKF-021](../deferred/NKF-021-task-scope-gate.md) state and the technical CI repair to `master` as commit
  `1af636cdaf28f991f8f8a0507bcd8a7cac344be9`. Its final `NKF Contracts`
  run `31325760190` passed on exact head
  `4ab4b87c41a4c60a2dcb195e58136317ab9c5376`; the pull request was reported
  `CLEAN` and `MERGEABLE` before the human merge. Local `master` was then
  fast-forwarded to the exact merge commit and the continuing work moved to
  `task/NKF-020`.
- The post-merge release audit confirms a tooling defect: the accepted 0.2
  Specification and release protocol require the complete frozen set,
  including governed adopter commands, host-adapter instruction content,
  fixtures, examples, and the documentation projection, while the current
  deterministic entry list and archive contain only the authority/contracts,
  checker, four protocols, and four portable skills. The correction implements
  existing accepted meaning; it does not widen that meaning.
- The [NKF-020 Complete-Set Release Audit](../../evidence/audits/nkf-020-complete-set-release-audit.md) independently verified candidate commit
  `3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a`: two separately packaged
  archives were byte-identical at SHA-256
  `423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`;
  system extraction found exactly 133 members; all 132 source members matched
  byte-for-byte; the extracted checker passed this repository and both
  fixtures with zero diagnostics; the extracted adopter enumerated all 132
  pre-manifest members; and GitHub run `31329086006` passed on the exact
  commit. [ADR 0106](../../decisions/0106-confirm-the-complete-set-release-correction.md) supplies the separate delegated technical confirmation and authorizes
  corrected unconsumed-release publication without inventing a Product
  decision.

## Acceptance Criteria

- A Human Product Owner Decision accepts the exact release, adoption, and
  breaking-change process boundary.
- The release process, adoption process, and classification rules are
  recorded in their accepted governed home with clear authority boundaries.
- Breaking-change classification is observable to a consumer before
  migration.
- Deterministic parts are enforced by tooling with fixtures and tests;
  judgement parts name their human authority.
- Release, adoption, acceptance, conformance, confirmation, and publication
  remain separate facts throughout.

## Deferred-State Rule

This Task records required future work only. It does not claim that any
process has been selected, accepted, implemented, or followed, and it does
not authorize beginning the work. The recorded Human Direction of
`2026-08-08` supersedes this deferred-state fact: activation and the first
round follow it.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Every candidate receives the same exact-commit command; enforcement-surface changes require human review and a successor Realization confirmation boundary. |
| [`adr-0061`](../../decisions/0061-confirm-layered-contract-enforcement-realization.md) | record | The confirmed local workflow is immutable predecessor evidence; a later enforcement change requires comparison, proportional audit, a successor Realization, and later confirmation. |
| [`adr-0062`](../../decisions/0062-confirm-remote-workflow-activation-boundary.md) | record | Remote workflow observations are time-bound Github state and do not establish branch protection. |
| [`adr-0063`](../../decisions/0063-defer-protected-merge-gate.md) | record | Required-check protection, approval enforcement, bypass policy, and blocked-invalid-candidate proof remain deferred to [NKF-012](../deferred/NKF-012-activate-protected-merge-gate.md). |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | Every contract-meaning change after first consumer adoption ships as a new immutable version. |
| [`adr-0078`](../../decisions/0078-version-gate-correction-as-nkf-0-2.md) | record | Release, adoption, and breaking-change process stay outside format meaning. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Only breaking-change classification and signaling plus process refinements remain in this Task's scope. |
| [`adr-0082`](../../decisions/0082-confirm-nkf-0-2-versioned-set.md) | record | The audited 0.2 set required separate delegated technical confirmation before publication; later corrected snapshots do not inherit confirmation by implication. |
| [`adr-0084`](../../decisions/0084-replace-the-unconsumed-0-2-release.md) | record | Replacement corrections stay within the unconsumed-release exception until first consumer adoption. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | The archive must literally carry the complete versioned set and onboarding and adoption require a fresh independent post-action audit. |
| [`adr-0096`](../../decisions/0096-deterministic-governed-mechanics.md) | record | The deterministic command surface is closed; prose, judgment, and acceptance stay human. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | The pre-cut review covers every set member against the complete rule set from the deterministic enumeration. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Every Task transition pairs a confirmed semantic review with deterministic execution. |
| [`adr-0099`](../../decisions/0099-accept-the-decoupled-0-2-pair.md) | record | The revised pair digests are the accepted 0.2 authority; schemas and rules are unchanged. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The current 0.2 implementation carries branch-resident Task life and the official terminal `cancelled` state. |
| [`adr-0104`](../../decisions/0104-accept-the-cancelled-state-pair.md) | record | The cancelled-state pair is the exact accepted 0.2 authority pair for the corrected set. |
| [`adr-0105`](../../decisions/0105-bind-the-cancelled-state-release-checker.md) | record | Release packaging must carry the checker built at the bound source commit and exact SHA-256. |
| [`adr-0106`](../../decisions/0106-confirm-the-complete-set-release-correction.md) | record | The exact complete-set correction at commit `3d6ea93` is technically confirmed and authorized for corrected unconsumed-release publication; publication, recommendation, migration, breaking-change policy, and Task conclusion are not implied. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Living-surface links resolve deterministically in the canonical command | proven | runtime-behaviour | none |
| Task transitions fail closed before altering accepted pair bytes | proven | runtime-behaviour | none |
| The exact-commit workflow supplies the pinned predecessor history required by the complete migration and adopter test suite | proven | runtime-behaviour | none |
| The 0.2 release archive carries every member required by the accepted complete frozen-set rule | proven | data-validity | none |
| The deterministic `set` output equals the archive's exact pre-manifest membership and digests | proven | runtime-behaviour | none |
| A fresh post-action audit independently verifies the corrected archive, installed tools, fixtures, examples, guidance, and provenance | proven | runtime-behaviour | none |

This gate was added when the Task was created before NKF 0.2 was adopted,
was normalized during the self-migration, and was re-extracted on the
`2026-08-08` activation.
