---
id: adr-0062
type: decision
title: "ADR 0062: Confirm Remote Workflow Activation Boundary"
summary: Confirm the exact successor Realization revisions that account for the successfully observed remote NKF Contracts workflow while preserving the unavailable protected merge gate as an explicit blocker.
created_at: 2026-07-31T01:03:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-011
---

# ADR 0062: Confirm Remote Workflow Activation Boundary

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's prior delegated technical-confirmation instruction and current
  authorization to execute [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) through remote hard-gate activation
- **Remote Evidence:**
  `knowledge/evidence/audits/nkf-011-remote-enforcement-activation.md`

## Context And Problem

[ADR 0061](0061-confirm-layered-contract-enforcement-realization.md) confirms the exact local [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) implementation while explicitly
leaving remote workflow presence, successful execution, protection, review,
bypass control, and a blocked invalid pull request unconfirmed.

The confirmed candidate was committed as
`143f6f49d9f42b2e4e8e5073ed119a1c3d092d88` and pushed to remote `master`.
Github Actions then completed an exact-commit `NKF Contracts` run
successfully.

Authenticated Github API reads also established that branch-protection and
repository-ruleset features are unavailable for the observed private
repository under the current plan. The current Realizations therefore require
a successor revision that records both the successful remote activation and
the still-unavailable protected gate without collapsing those facts.

## Decision

The authorized technical reviewer independently confirms the following exact
successor revisions as accurate accounts of the observed implementation and
remote boundary:

| Record | Source | Confirmed Candidate SHA-256 |
| --- | --- | --- |
| [`nkf-0.1-native-realization`](../realizations/current-system.md) | `knowledge/realizations/current-system.md` | `a3936204043638af8cbe52e8da35b510382830119ffc28c2734a2ebf33a34183` |
| [`nkf-layered-contract-enforcement`](../realizations/current/layered-contract-enforcement.md) | `knowledge/realizations/current/layered-contract-enforcement.md` | `36d1e9f3198a53bce3e0c1b7158129bcae53889f73fa0c6d497bf0ed00848561` |
| [`nkf-self-hosting`](../realizations/current/self-hosting.md) | `knowledge/realizations/current/self-hosting.md` | `646a0517975492c576e217d303da4487dca9c268c858761cb177cb4996fe580d` |

This confirmation establishes that those revisions accurately state:

- the accepted workflow exists on remote `master`;
- push run `30595019454` passed for exact commit
  `143f6f49d9f42b2e4e8e5073ed119a1c3d092d88`;
- check run `Validate` is the observed Github Actions check identity;
- Github returned HTTP `403` for both branch-protection and
  repository-ruleset access under the observed private-repository plan; and
- the protected hard gate, review and bypass enforcement, and blocked invalid
  pull-request observation do not yet exist.

## Scope And Applicability

Confirmation applies to the exact Realization revisions listed above and to
their accurate representation of the linked Evidence. Github remains
authoritative for the time-bound operational observations.

This Decision does not make external operational state immutable. A later
plan, visibility, workflow, rule, run, or repository change requires fresh
Evidence and a successor Realization before a new current claim is confirmed.

[NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md) remains Active. Completion still requires the required check,
governed review and bypass controls, and an observed blocked intentionally
invalid pull request.

## Rationale

The remote Evidence has SHA-256
`440d5b8f1bbb677b59bc0805924aba968c7c0cafb8b91ea0f094d3a5e54db4c2`.
It records the repository identity, exact remote commit, workflow blob,
successful run and check identities, private visibility, protection and
ruleset responses, and their limits.

The reviewer rechecked the three candidate digests against this Decision and
confirmed that each Realization distinguishes successful workflow activation
from protected-gate activation. No source claims that passing Actions,
confirmation, or conformance makes `master` protected.

## Alternatives Considered

Claiming the hard gate from a successful workflow run was rejected because a
non-required check does not block merge.

Leaving the current Realizations at “remote activation unconfirmed” was
rejected because the exact remote workflow and successful run are now
observed facts.

Changing repository visibility or purchasing Github Pro by implication was
rejected because either action requires a separate owner choice with
consequences outside technical confirmation.

Creating an invalid pull request before protection exists was rejected
because a failing check without a required rule cannot establish the accepted
blocked-merge criterion.

## Consequences And Trade-Offs

The consolidated Current System, Layered Contract Enforcement, and
Self-Hosting Realizations now expose the exact partial remote state and cite
this Decision as confirmation provenance.

The bundle adds this Decision and the remote Evidence, bringing the represented
snapshot to 93 records, 51 non-record sources, and 72 governed artifacts.

Remote workflow execution now supplies operational feedback on `master`, but
invalid knowledge can still reach `master` through an unprotected merge or
direct push. The accepted hard guarantee must not be advertised until the
remaining protection criteria are exercised and confirmed.

## Non-Claims

This Decision does not:

- activate branch protection or a repository ruleset;
- require check run `Validate`;
- require human review or disable bypass;
- establish that an invalid pull request was blocked;
- make Github operational state part of NKF conformance;
- change NKF 0.1 normative meaning;
- complete [NKF-011](../tasks/completed/NKF-011-enforce-nkf-contracts.md);
- change repository visibility or subscription; or
- publish, replace, or modify a release or consumer integration.
