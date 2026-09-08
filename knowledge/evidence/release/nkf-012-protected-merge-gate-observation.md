---
title: NKF-012 Protected Merge Gate Observation
summary: Records the Github branch protection observed on master after the repository became public — the required exact-commit Validate check, the mandatory approving review with the Human Product Owner's bypass allowance, the push restriction to the Human Product Owner, administrator enforcement, and the branch lock — together with the intentionally invalid pull-request candidate that failed Validate and that Github reported unmergeable, then closed unmerged.
created_at: 2026-09-08T13:22:00Z
---

# NKF-012 Protected Merge Gate Observation

This records the protected merge gate on `master` of `NourdApS/Nourd.NKF` as
Github reported it, and the exercise that proved it blocks an invalid
candidate, under
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md). It is
Evidence of operational facts at one moment. It accepts no meaning, confirms no
Realization, and claims protection only from Github's own report, never from a
workflow file or a passing run.

## Preconditions Reverified

| Fact | Value |
| --- | --- |
| Repository | `NourdApS/Nourd.NKF`, public since `2026-09-08` |
| Default branch | `master` |
| Workflow | `.github/workflows/nkf-contracts.yml`, name `NKF Contracts`, one job named `Validate` running `npm run nkf:check` on every push and pull request |
| Check context observed on pull requests | `Validate` |
| Protection availability | HTTP `403` while private; available after the visibility change |

## Protection As Reported By Github

Queried through the branch-protection API on `2026-09-08` at `13:18Z`.

| Setting | Value | Set by |
| --- | --- | --- |
| Required status check | `Validate` | Claude technical reviewer under [ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md) item seven |
| Strict, branch up to date before merge | `true` | same |
| Enforce for administrators | `true` | same |
| Required approving reviews | `1` | Human Product Owner |
| Bypass pull-request review allowance | user `kaveh6202` | Human Product Owner |
| Require review from Code Owners | `true` | Human Product Owner |
| Dismiss stale reviews | `false` | Human Product Owner |
| Require last-push approval | `false` | Human Product Owner |
| Restrict who can push | user `kaveh6202`; no teams, no apps | Human Product Owner |
| Force pushes | disallowed | Claude technical reviewer under ADR 0136 |
| Branch deletion | disallowed | same |
| Required linear history | `false` | default |
| Required conversation resolution | `false` | default |
| Lock branch | `true` | Human Product Owner |

## Bypass And Direct-Push Policy

The policy the Human Product Owner configured, stated explicitly:

- Nobody may push directly to `master` except `kaveh6202`, and administrator
  enforcement means organization administrators are bound by every rule.
- A pull request needs the `Validate` check green on its exact head commit
  and one approving review. `kaveh6202` may bypass the review requirement,
  which is what allows a single maintainer to merge their own pull requests;
  nobody may bypass the required check.
- Anyone may open a pull request and have it validated; only `kaveh6202` may
  merge it.

Two settings are recorded with their effect rather than smoothed over.
Require review from Code Owners is enabled but no `CODEOWNERS` file exists in
the repository, so the setting is inert until one is added. Lock branch is
enabled; Github documents a locked branch as read-only, which blocks pushes
and merges for everyone including the restricted user, and it was enabled after
pull request 21 merged. Whether it blocks the Human Product Owner's own merges
is for the Human Product Owner to observe on the next merge; this Evidence
records the setting as found.

## The Invalid Candidate Exercise

| Fact | Value |
| --- | --- |
| Branch | `nkf-012-invalid-candidate` from `master` at `c31b698` |
| Change | One sentence appended to a declared Task's Markdown without a repin, so the declared digest no longer matches the bytes |
| Head commit | `79f14b20` |
| Pull request | number 22, titled as an exercise that must never be merged |
| `Validate` run | id `34231167450`, conclusion `failure` |
| Failure | The pinned checker returned `NKF-ADOPTER-FAILED` from `npm run nkf:check:pinned`; the job stopped there |
| Github pull-request state | `mergeable_state: blocked`, `mergeStateStatus: BLOCKED` |
| Merged | no |
| Disposition | closed unmerged after this record was written; branch deleted |

The candidate failed NKF validation for the reason it was built to fail, and
Github reported the pull request blocked under the active rule. No check,
checker, workflow, or adapter verifier was weakened.

## Boundary

These are observations of Github state and one exercise at one moment. Github
owns their later state. Nothing here accepts NKF meaning, confirms the
Realization, or establishes conformance of any candidate. The intentionally
invalid candidate was never merged.
