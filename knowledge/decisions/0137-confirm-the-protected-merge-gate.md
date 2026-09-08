---
id: adr-0137
type: decision
title: "ADR 0137: Confirm The Protected Merge Gate"
summary: Confirm the exact current-system Realization revision that states the protected merge gate on master as Github reports it — the required exact-commit Validate check, the mandatory approving review with the Human Product Owner's bypass allowance, the push restriction to the Human Product Owner, administrator enforcement, the branch lock as configured, and the intentionally invalid candidate Github blocked — bound to the protected merge gate observation and the independent completion audit that found no material finding, and conclude the confirmation scope ADR 0063 transferred to the protected-merge-gate Task.
created_at: 2026-09-08T13:26:57Z
---

# [ADR 0137](0137-confirm-the-protected-merge-gate.md): Confirm The Protected Merge Gate

## Context And Problem

[ADR 0063](0063-defer-protected-merge-gate.md) completed
[NKF-011](../tasks/items/NKF-011-enforce-nkf-contracts.md) for its delivered
enforcement scope and transferred the externally blocked protected merge gate
to deferred [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md):
required-check protection for the exact `Validate` check, at least one
mandatory approving review, an explicit bypass and direct-push policy, an
intentionally invalid pull-request exercise proving that Github blocks merge,
and the resulting Evidence, successor Realization, confirmation, and
completion. [ADR 0062](0062-confirm-remote-workflow-activation-boundary.md)
had confirmed remote workflow activation and, explicitly, that the gate did not
yet exist because Github returned HTTP `403` on the private repository.

On `2026-09-08` the repository became public under
[ADR 0136](0136-adopt-the-public-repository-direction.md), branch protection
requiring `Validate` was activated under that Decision's item seven, and the
Human Product Owner configured the approving review, its bypass allowance, the
push restriction, and the branch lock. [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) was resumed, rewritten natively
with a real gate, and delivered: the
[protected merge gate observation](../evidence/release/nkf-012-protected-merge-gate-observation.md)
records Github's own protection report, the explicit policy, and the blocked
invalid candidate; the
[completion audit](../evidence/audits/nkf-012-completion-audit.md) records an
independent read-only verification of every claim against Github with no
material finding and six minor findings, each repaired before this Decision.

What remains is the confirmation act [ADR 0063](0063-defer-protected-merge-gate.md) required: that the successor
Realization revision accurately states the protected boundary without
overstating it.

## Decision

The Claude technical reviewer, under the delegation recorded in
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md), confirms
the following exact revisions as accurate accounts of the observed protected
merge gate, bound to the two Evidence records named above:

| Record | Source | Confirmed Candidate SHA-256 |
| --- | --- | --- |
| [`nkf-current-system`](../realizations/current-system.md) | `knowledge/realizations/current-system.md` | `6c8195106561f537771bfa53b605ca4f2de1ecc3f5cc851a028aee4421f8f371` |
| [protected merge gate observation](../evidence/release/nkf-012-protected-merge-gate-observation.md) | `knowledge/evidence/release/nkf-012-protected-merge-gate-observation.md` | `bd69a278d7b835d8dc6e4061c8fe1234d2994d08edd061cf30de4eaeab4704fa` |
| [completion audit](../evidence/audits/nkf-012-completion-audit.md) | `knowledge/evidence/audits/nkf-012-completion-audit.md` | `831cb8f124b20337abad0b47440647757e9926e84476ec3c61ba517913131fb4` |

This confirmation establishes that the Realization revision accurately states:

1. Github reports active branch protection on `master` with the exact-commit
   `Validate` check required and strict, enforced for administrators, with
   force pushes and deletion disallowed.
2. One approving pull-request review is required, with a bypass allowance for
   the Human Product Owner, and pushes to `master` are restricted to the Human
   Product Owner.
3. The branch lock is enabled as configured and, while enabled, makes `master`
   read-only for everyone; code-owner review is enabled without a `CODEOWNERS`
   file and is inert until one exists.
4. An intentionally invalid candidate failed `Validate` on its exact head and
   Github reported its pull request blocked, where the blocked state is
   composite and the protection claim rests on Github's protection report
   rather than on the exercise; the candidate was closed unmerged.
5. Protection is claimed from Github's report, not from the workflow file or a
   passing run, and the Realization distinguishes operational Evidence,
   confirmation, and conformance.

This Decision concludes the confirmation scope
[ADR 0063](0063-defer-protected-merge-gate.md) transferred to [NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md). The
Task's deterministic close follows separately.

## Scope And Applicability

This Decision confirms the exact revisions listed above for the protected
merge gate account only. It applies to
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md) and to the
enforcement layer
[ADR 0060](0060-layered-contract-enforcement.md) established. The
Realization's declared confirmation status stays `partially-confirmed`: every
other scope it carries remains as confirmed or unconfirmed as the Decisions
that address it left it.

## Rationale

[ADR 0063](0063-defer-protected-merge-gate.md) required a confirmation, not merely Evidence, so that the record
distinguishes an observed setting from an accepted account of the boundary.
The account is confirmed only after an independent audit compared every stated
setting with Github's own report and found them equal, and after the audit's
minor findings were repaired rather than carried. Binding the confirmation to
the exact digests of the Realization revision and both Evidence records means a
later edit to any of them falls outside this confirmation by construction.

The composite nature of the blocked state is confirmed as stated rather than
narrowed to the `Validate` rule, because the exercise ran under a lock that
would have blocked a valid candidate too. Confirming a stronger claim than the
exercise supports would be exactly the overstatement the Task's guardrails
forbid.

## Alternatives Considered

Confirming without the independent audit was rejected because [ADR 0063](0063-defer-protected-merge-gate.md) and
the Task both require a separate completion audit before confirmation, and
because the audit found six defects the author had not.

Re-running the invalid-candidate exercise with the lock lifted, to isolate the
`Validate` rule, was rejected because lifting the lock is the Human Product
Owner's settings act, and the protection claim does not depend on isolating
the rule: Github's protection report states the required check directly.

Waiting to confirm until the Human Product Owner's next merge shows whether the
lock blocks them was rejected because the Realization already states the
lock's documented effect as configured, and Github owns the later observation.

## Consequences And Trade-Offs

The protected merge gate that has been architecture since
[ADR 0060](0060-layered-contract-enforcement.md) is now a confirmed account of
an observed fact. Every pull request into `master`, including the one that
delivers this Decision, needs the `Validate` check green on its exact head and
the Human Product Owner's merge. While the branch lock stays enabled, no pull
request can merge at all; that is the configured state, recorded and confirmed
as such, and lifting it is the Human Product Owner's act.

The confirmation is bound to exact bytes. The living Realization will change
again, and each later revision is confirmed or not by its own Decision; this
one does not travel with the record.

## Non-Claims

This Decision changes no accepted NKF meaning, contract, checker, adopter,
workflow, or published byte. It does not accept the Realization as a whole, does
not change its `partially-confirmed` status for any other scope, does not
establish conformance of any candidate, and does not itself close
[NKF-012](../tasks/items/NKF-012-activate-protected-merge-gate.md). It does not
decide protection policy, which the Human Product Owner decided, and it does
not observe whether the branch lock blocks the Human Product Owner's own merge.
