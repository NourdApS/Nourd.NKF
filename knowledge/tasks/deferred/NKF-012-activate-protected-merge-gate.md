---
summary: Activate and prove the Github protected merge gate when repository capabilities permit requiring exact-commit NKF validation, one pull-request approval, and an explicit bypass policy.
created_at: 2026-07-31T01:40:19Z
task_id: NKF-012
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-012: Activate Protected Merge Gate

- **Activation Condition:** Github branch protection or repository rulesets
  must become available for the private `kaveh6202/Nourd.NKF` repository, or
  the Human Product Owner must separately authorize a visibility change.

## Purpose

Turn the active exact-commit `NKF Contracts` workflow into a protected remote
merge gate that prevents an invalid candidate from entering `master`.

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
7. Preserve exact remote Evidence, update the Current System and supporting
   Realizations, independently confirm the successor account, and complete
   this Task.

## Acceptance Criteria

- Github reports active protection or an equivalent active ruleset for
  `master`.
- The exact `Validate` check is required.
- At least one approving pull-request review is required.
- Bypass and direct-push behavior are explicit and consistent with the hard
  merge guarantee.
- An intentionally invalid candidate fails NKF validation and Github reports
  it as unmergeable under the active rule.
- The invalid candidate is not merged and is removed or closed safely after
  Evidence is preserved.
- Current Realizations distinguish operational Evidence, confirmation, and
  conformance and do not overstate the protected boundary.
- A separate completion audit records no unresolved material finding.

## Guardrails

- Do not purchase a Github plan or change repository visibility by implication.
- Do not claim protection from a workflow file or successful workflow run.
- Do not weaken the `Validate` command, checker, workflow, or adapter verifier
  to make the protection exercise pass.
- Do not merge the intentionally invalid candidate.
- Do not publish a release or onboard consumers under this Task.

## Origin

ADRs 0060 and 0062 establish the intended protected-gate architecture and the
observed private-plan blocker. The Human Product Owner directed that NKF-011
close for its delivered enforcement scope and that the blocked items move to
this deferred Task. ADR 0063 records that successor allocation and the
mandatory pull-request approval requirement.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
