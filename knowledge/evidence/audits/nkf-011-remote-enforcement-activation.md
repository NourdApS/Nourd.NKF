# NKF-011 Remote Enforcement Activation Evidence

- **Task:** `NKF-011`
- **Observed At:** `2026-07-31T01:00:12Z`
- **Observer:** Codex technical reviewer
- **Authority Effect:** None

## Purpose

This Evidence records the exact Git and Github operational observations made
after the confirmed NKF-011 local enforcement candidate was committed and
pushed. It distinguishes successful remote workflow activation from the
still-unavailable protected merge gate.

It does not confirm a Realization, activate a subscription feature, change
repository visibility, accept knowledge, publish a release, or establish
consumer readiness.

## Sources And Method

The observer:

1. verified the local Git root and `origin` identity;
2. pushed exact commit
   `143f6f49d9f42b2e4e8e5073ed119a1c3d092d88` to remote `master`;
3. inspected the repository, workflow file, Actions run, job, and check run
   through authenticated Github CLI and API reads; and
4. queried both the branch-protection and repository-ruleset endpoints.

Github remains authoritative for the remote repository, Actions, protection,
ruleset, plan, and visibility observations.

## Observations

The remote repository was
`https://github.com/kaveh6202/Nourd.NKF`, with default branch `master` and
private visibility.

Remote `master` resolved to exact commit
`143f6f49d9f42b2e4e8e5073ed119a1c3d092d88`. The workflow existed at
`.github/workflows/nkf-contracts.yml` in that commit with Git blob identity
`f56a68f21fd54d4a5ce2f23d02a7e16782bf2b85`.

Push run
[`30595019454`](https://github.com/kaveh6202/Nourd.NKF/actions/runs/30595019454)
executed workflow `NKF Contracts` for that exact commit. Job
[`Validate`](https://github.com/kaveh6202/Nourd.NKF/actions/runs/30595019454/job/91045419802)
completed successfully from `2026-07-31T00:57:32Z` through
`2026-07-31T00:58:23Z`.

The commit exposed exactly one Github Actions check run:

- check-run ID `91045419802`;
- check name `Validate`;
- Github App ID `15368`, slug `github-actions`; and
- conclusion `success`.

The successful run establishes remote workflow presence, exact-commit
execution, and the actual check identity. It does not make that check
required.

## Protection Availability

At `2026-07-31T01:00:10Z`, the Github branch-protection endpoint for `master`
returned HTTP `403`. At `2026-07-31T01:00:12Z`, the repository-ruleset
endpoint returned the same status.

Both responses stated:

> Upgrade to GitHub Pro or make this repository public to enable this feature.

No branch-protection or ruleset change was therefore available under the
observed private repository and current plan. No visibility or subscription
change was authorized or attempted.

## Interpretation

The remote workflow layer is active and has one successful exact-commit
observation. The accepted protected merge gate is not active.

The check cannot yet be required for `master`; review ownership and bypass
controls cannot yet be enforced through the accepted Github branch rule or
ruleset; and an intentionally invalid pull request cannot demonstrate a
blocked merge without that protection.

Creating an invalid pull request before protection exists would prove only
that its check can fail. It would not satisfy the accepted negative-gate
criterion, so no such pull request was created.

Completing NKF-011 now requires an external choice between enabling Github Pro
for the private repository or making the repository public after separately
considering license and public-governance consequences.

## Limits

These observations are time-bound operational Evidence. Github state may
change independently and must be re-read before a later activation claim.

This Evidence does not:

- claim that `master` is protected;
- claim that direct, administrator, or alternate-path bypass is blocked;
- confirm a blocked invalid pull request;
- complete NKF-011;
- change NKF 0.1 normative meaning; or
- begin release, publication, consumer onboarding, or user-experience work.
