---
title: "NKF-022: Pin The NKF Repository To Released NKF 0.2"
summary: Use the published unified Adopt operation to pin the already native NKF 0.2 repository to its exact recommended release, verify the installed integration, and audit the resulting self-consumer state.
created_at: 2026-08-10T17:33:24Z
task_id: NKF-022
task_status: active
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
related_tasks:
  - NKF-020
---

# NKF-022: Pin The NKF Repository To Released NKF 0.2

## Human Direction

On `2026-08-10`, after [NKF-020](../completed/NKF-020-version-release-adoption-and-compatibility-process.md)
was completed and merged, the Human Product Owner directed onboarding the NKF
repository itself to NKF 0.2. The repository already declares the accepted
NKF 0.2 bundle, so the precise operation is to run the one public Adopt
operation and install the exact recommended release pin and consumer
integration. The Human Product Owner then explicitly directed creating this
Task and beginning the work.

This direction selects the operation but does not accept new NKF meaning,
authorize a new NKF version, confirm a later Realization, or claim that the
technical adoption has succeeded.

## Problem

The NKF repository is structurally self-hosted as an NKF 0.2 Technology
bundle, but it does not contain `.nourd/nkf-release.json`. Its source tree and
authoring checks therefore represent NKF 0.2 while the repository itself is
not yet pinned as a consumer of the exact released archive
`015a922d...a51f` through the published Adopt transaction.

## Desired Outcome

The NKF repository is an exact self-consumer of its released NKF 0.2 package:
the governed recommendation selects the immutable archive, the release pin and
host integration are installed without changing accepted format meaning, the
installed canonical checker passes, and repeating Adopt returns `current`.

## Scope

- activate this Task through the deterministic Task transition;
- verify the public adopter and governed recommendation before mutation;
- run the subcommand-free public Adopt operation against this repository;
- inspect every resulting path and preserve repository-specific policy outside
  the installed integration boundary;
- record the exact release pin, archive, adopter, checker, and integration
  observations in the current-system account and independent audit Evidence;
- run exactly `npm run nkf:check` after the coherent adoption;
- repeat public Adopt and require public state `current`;
- audit the committed Task branch from an independent fresh clone, including
  the installed archive, pin, adopter, integration, and canonical check; and
- complete the Task only when every acceptance criterion and mandatory
  capability is proven.

## Out Of Scope

- changing accepted NKF 0.2 meaning, its executable companion, Schemas,
  checker behavior, adopter behavior, release archive, or recommendation;
- creating another NKF version;
- migrating or accepting knowledge in an external consumer repository;
- changing the public Adopt product boundary accepted by
  [ADR 0107](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md);
- claiming acceptance binding, Governing Use readiness, or protected merge
  enforcement; and
- absorbing an adopter or release defect that requires a contract or product
  change rather than reporting it under a separately authorized Task.

## Execution Plan

1. Confirm the clean exact `master`, current 0.2 bundle, absent consumer pin,
   published adopter digest, and exact governed recommendation.
2. Create and validate this deferred Task, commit it on the default branch,
   then activate it through the deterministic Task command.
3. From the Task worktree, run the published subcommand-free Adopt operation
   with no local recommendation or archive override.
4. Review the complete diff and stop if the transaction changes accepted NKF
   meaning, overwrites repository-owned policy, or requires a released-contract
   correction.
5. Run `npm run nkf:check`, verify the installed pin and archive independently,
   and repeat Adopt to require `current`.
6. Record current-system and audit Evidence without treating validation or
   publication as acceptance or confirmation.
7. Commit and push the verified candidate, independently clone the exact Task
   branch, and repeat pin, integration, archive, and canonical-check
   verification from the fresh clone.
8. Reconcile every acceptance criterion and mandatory capability, then close
   this Task through the deterministic transition and leave merge as the human
   review act.

## Acceptance Criteria

- The published public adopter resolves `release/recommended.json` from
  `master` and returns `updated` for the already native, previously unpinned
  NKF 0.2 repository.
- `.nourd/nkf-release.json` pins archive `015a922d...a51f`, release source
  commit `7eefe7d`, checker `f96d8b8...403c6`, adopter `e109fbe...344d0`,
  integration revision `1`, and Technology Root Profile.
- The installed archive, adopter, authoring protocol, portable skills, host
  adapters, integration registry, verifier, package command, and exact-commit
  workflow agree with the pin while preserving NKF-repository-specific policy.
- No accepted Specification, executable companion, Schema, checker, adopter,
  release, or recommendation meaning changes under this Task.
- `npm run nkf:check` reports zero diagnostics from the installed pin.
- Repeating the public Adopt operation returns `current` with non-breaking
  0.2 compatibility.
- Independent fresh-clone audit Evidence verifies the exact committed
  self-consumer state and records all material findings.
- Acceptance, technical confirmation, conformance, publication, consumer
  pinning, Governing Use readiness, and remote protection remain separate.

## Current Progress

- Read-only inspection confirmed a clean synchronized `master`, an NKF 0.2
  Technology bundle, and no `.nourd/nkf-release.json`.
- [NKF-020](../completed/NKF-020-version-release-adoption-and-compatibility-process.md)
  completed the release, recommendation, public Adopt, public documentation,
  and independent release audit before this Task was created.
- No release installation or repository mutation has yet been performed under
  this Task.
- Deterministic activation created `task/NKF-022`, its isolated worktree, and
  draft PR 5. The published adopter bytes exactly matched the governed
  recommendation before execution.
- The real no-override Adopt operation failed closed before mutation because
  `package.json` already carries the governed NKF producer repository's
  stronger `nkf:check` command, while the released consumer integration
  requires its exact pinned-adopter check command. Git remained clean and no
  release pin was created. The
  [preflight-failure Evidence](../../evidence/audits/nkf-022-self-adopt-preflight-failure.md)
  records the exact output and compatibility analysis.
- An npm lifecycle wrapper cannot preserve both paths: the accepted producer
  verifier explicitly rejects `prenkf:check` and related wrappers. Replacing
  the producer command would weaken the established one-command producer gate;
  changing the released adopter would require a successor release decision.
  Work is paused before either consequential boundary is changed.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0060`](../../decisions/0060-layered-contract-enforcement.md) | record | Every candidate uses the same exact-commit command; an enforcement-surface change requires comparison, human review, successor Realization treatment, and later confirmation. |
| [`adr-0074`](../../decisions/0074-separate-authoring-and-recommended-release-verification.md) | record | Current-snapshot authoring validation and exact recommended-release verification remain separate checks. |
| [`adr-0076`](../../decisions/0076-versioned-contract-evolution.md) | record | No accepted NKF 0.2 contract meaning may change in place after adoption; any such need stops this Task and requires a new version process. |
| [`adr-0080`](../../decisions/0080-release-and-adoption-process.md) | record | Release and adoption are separate, and the NKF repository is the first adopter of each NKF version it releases. |
| [`adr-0094`](../../decisions/0094-carry-the-set-and-audit-independently.md) | record | Adoption requires a fresh independent post-action audit of the exact installed set and provenance. |
| [`adr-0098`](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md) | record | Task activation and conclusion require semantic review around deterministic transitions. |
| [`adr-0103`](../../decisions/0103-branch-carried-task-life-and-cancelled-state.md) | record | The Task branch carries this Task's whole life and merges only concluded. |
| [`adr-0107`](../../decisions/0107-unified-adopt-operation-and-compatibility-signaling.md) | record | One public Adopt operation resolves the governed recommendation and reports predecessor-relative compatibility without exposing internal path selection. |
| [`adr-0108`](../../decisions/0108-confirm-the-unified-adopt-realization.md) | record | Exact implementation commit `7eefe7d` and archive `015a922d...a51f` are independently audited, technically confirmed, and published; later repository installation remains a separate operational fact. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Public Adopt pins the native unpinned NKF 0.2 repository to the exact governed recommendation | unsupported | none | none |
| The installed integration preserves repository-specific policy and accepted authority bytes | unknown | none | none |
| The installed canonical command validates the complete self-consumer repository with zero diagnostics | unknown | none | none |
| Repeat public Adopt returns `current` only after verifying the complete installed state | unknown | none | none |
| A fresh clone independently reproduces the pin, archive, adopter, integration, and canonical validation result | unknown | none | none |
