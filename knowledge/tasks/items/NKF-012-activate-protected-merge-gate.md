---
title: "NKF-012: Activate Protected Merge Gate"
summary: Activate and prove the Github protected merge gate on master now that the repository is public — record the required exact-commit Validate check, the mandatory approving review, the explicit bypass and direct-push policy the Human Product Owner configured, and the intentionally invalid pull-request candidate that Github blocks — then reconcile the Realization, obtain the independent completion audit, and confirm the successor account.
created_at: 2026-07-31T01:40:19Z
---

# NKF-012: Activate Protected Merge Gate

## Human Direction

This Task was created deferred on `2026-07-31` under
[ADR 0063](../../decisions/0063-defer-protected-merge-gate.md), which
completed [NKF-011](NKF-011-enforce-nkf-contracts.md) for its delivered
enforcement scope and transferred the externally blocked protected merge gate
here. Its activation condition was that Github branch protection or repository
rulesets become available, or that the Human Product Owner separately
authorize a visibility change.

On `2026-09-08` the Human Product Owner made the repository public under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md), and
the condition was observed true and recorded in the
[public repository observation](../../evidence/release/nkf-037-public-repository-observation.md).
The Claude technical reviewer then proposed closing this Task first, before the
successor release Task, and the Human Product Owner directed verbatim: "i agree
with the proposed order . do it ."

That direction explicitly resumes this Task and begins its work. The confirmed
boundaries:

1. This Task's remaining lifecycle is carried on the `task/NKF-012` branch
   from `master`, and one pull request delivers it for human review.
2. Every protection setting is the Human Product Owner's act in Github
   settings or under their explicit authorization. This Task observes,
   exercises, and records; it does not decide policy.
3. Merging remains the Human Product Owner's act.
4. The Claude technical reviewer is delegated to rewrite this Task natively
   with a real gate, run the invalid-candidate exercise, record Evidence,
   reconcile the Realization, obtain the independent completion audit, author
   the confirmation Decision text, and run the gate.

This rewrite replaces the legacy-locked NKF 0.4 predecessor source. Its
purpose, scope, criteria, guardrails, and origin are carried forward; what
changed is stated in each section.

## Purpose

Turn the active exact-commit `NKF Contracts` workflow into a protected remote
merge gate that prevents an invalid candidate from entering `master`, and
record the gate as observed operational fact rather than as a claim inferred
from a workflow file.

## Scope

1. Reverify repository identity, visibility, plan capability, workflow
   identity, and the exact `Validate` check context.
2. Protect `master` through branch protection or an equivalent repository
   ruleset.
3. Require the `Validate` check produced by the exact-commit `NKF Contracts`
   workflow.
4. Require at least one approving pull-request review before merge.
5. Define and record the bypass policy, including its treatment of repository
   administrators and direct pushes.
6. Exercise one intentionally invalid pull-request candidate after protection
   is active and prove that Github blocks its merge.
7. Preserve exact remote Evidence, update the Current System Realization,
   independently audit the successor account, confirm it, and complete this
   Task.

Items two and three were performed under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) item
seven on `2026-09-08`. Items four and five were performed by the Human Product
Owner in Github settings the same day. This Task records them and performs
items one, six, and seven.

## Out Of Scope

- Purchasing a Github plan or changing repository visibility. Visibility
  changed under [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md),
  not here.
- Weakening the `Validate` command, checker, workflow, or adapter verifier to
  make the protection exercise pass.
- Merging the intentionally invalid candidate.
- Publishing a release or onboarding a consumer.
- Deciding protection policy. The Human Product Owner decided it; this Task
  records what was decided and observed.

## Acceptance Criteria

1. Github reports active branch protection for `master`.
2. The exact `Validate` check is required and strict.
3. At least one approving pull-request review is required.
4. Bypass and direct-push behaviour are explicit, recorded, and consistent
   with the hard merge guarantee: who may push, who may bypass review, and
   whether administrators are bound.
5. An intentionally invalid candidate fails NKF validation and Github reports
   its pull request as unmergeable under the active rule.
6. The invalid candidate is not merged and is closed safely after its Evidence
   is preserved.
7. The current-system Realization distinguishes operational Evidence,
   confirmation, and conformance and does not overstate the protected
   boundary.
8. A separate completion audit records no unresolved material finding, and a
   Decision confirms the exact successor account bound to that audit.

## Guardrails

- Do not claim protection from a workflow file or a successful workflow run;
  claim it only from Github's protection report.
- Do not weaken any check to make the exercise pass.
- Do not merge the intentionally invalid candidate.

## Execution Plan

1. Rewrite this Task natively on `task/NKF-012`, declare it active, regenerate
   the state indexes, repin, and commit.
2. Push an intentionally invalid candidate on its own branch, open its pull
   request, and observe the `Validate` failure and Github's unmergeable state.
3. Query Github for the exact protection rules and record them, the exercise,
   and the bypass and direct-push policy as Evidence; close the invalid pull
   request and delete its branch.
4. Reconcile the current-system Realization and the front page.
5. Obtain an independent completion audit of the Evidence, the Realization
   revision, and this Task; repair material findings.
6. Author the confirmation Decision bound to the audit, declare it, repin,
   reseal, run the gate, author the Completion Result, and run the
   deterministic close.

## Origin

[ADR 0060](../../decisions/0060-layered-contract-enforcement.md) and
[ADR 0062](../../decisions/0062-confirm-remote-workflow-activation-boundary.md)
establish the intended protected-gate architecture and the observed
private-plan blocker. The Human Product Owner directed that
[NKF-011](NKF-011-enforce-nkf-contracts.md) close for its delivered enforcement
scope and that the blocked items move to this deferred Task.
[ADR 0063](../../decisions/0063-defer-protected-merge-gate.md) records that
successor allocation and the mandatory pull-request approval requirement.

## Current Progress

Resumed on `2026-09-08` under the Human Direction above, on the `task/NKF-012`
branch from `master`. The protection is configured; the exercise, Evidence,
reconciliation, audit, and confirmation follow. Every mandatory capability
reads `unknown` until each is observed.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority stay separate axes; an active protection rule is an operational fact and accepts nothing. |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Enforcement is layered: local canonical command, exact-commit workflow, and remote protection; a change to the enforcement surface requires a successor Realization and confirmation. |
| [`adr-0062`](../../decisions/0062-confirm-remote-workflow-activation-boundary.md) | record | Confirms remote workflow activation only, explicitly not protection; this Task must not read that confirmation as covering the gate. |
| [`adr-0063`](../../decisions/0063-defer-protected-merge-gate.md) | record | This Task owns the required `Validate` check, at least one mandatory approving review, an explicit bypass and direct-push policy, the invalid-candidate exercise, and the resulting Evidence, successor Realization, confirmation, and completion. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0136`](../../decisions/0136-adopt-the-public-repository-direction.md) | record | Branch protection requiring `Validate` was activated under that Decision's item seven; the approving review and bypass policy were left to this Task's own revision, and that Decision does not close this Task. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Github reports active branch protection on `master` with the exact `Validate` check required and strict | unknown | none | none |
| At least one approving pull-request review is required | unknown | none | none |
| Bypass and direct-push policy is explicit and recorded, including administrator enforcement | unknown | none | none |
| An intentionally invalid candidate fails `Validate` and Github reports its pull request unmergeable, and it is closed unmerged | unknown | none | none |
| The Realization and front page state the protected boundary without overstating it | unknown | none | none |
| An independent completion audit records no unresolved material finding and a confirmation Decision binds it | unknown | none | none |

This gate replaces the empty retrospective gate the NKF 0.2 self-migration
recorded for the legacy-locked predecessor; the applicable Decisions above were
extracted at this native rewrite on `2026-09-08`.
