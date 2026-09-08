---
title: NKF-012 Completion Audit
summary: Records the independent completion audit of the NKF-012 protected merge gate delivery — the auditor's read-only verification of every Evidence claim against Github, its criterion-by-criterion assessment, its verdict of no material finding with six minor findings, and the repair of each minor finding before confirmation.
created_at: 2026-09-08T13:40:00Z
---

# NKF-012 Completion Audit

This records the separate completion audit that
[NKF-012](../../tasks/items/NKF-012-activate-protected-merge-gate.md) requires
before its account is confirmed. The audit was performed on `2026-09-08` by an
independent Claude agent instance with no prior context of the delivery,
working read-only against the `task/NKF-012` branch at commit `74c17c3` and
against Github. It is Evidence. It accepts no meaning and confirms nothing; the
confirmation is the separate Decision that binds to this record.

## What The Auditor Verified Against Github

Every setting in the
[protected merge gate observation](../release/nkf-012-protected-merge-gate-observation.md)
was compared with a fresh branch-protection query. All fourteen recorded
settings matched. Pull request 22 was confirmed closed and unmerged with
`mergeable_state: blocked`; its branch returned `404` on the remote. Workflow
run `34231167450` was confirmed `failure` on head `79f14b20` with the pinned
checker emitting `NKF-ADOPTER-FAILED`. No `CODEOWNERS` file exists at any
recognized location. The repository is public. The branch diff against
`origin/master` touches only governed knowledge, the front page, and `.nourd`
declarations — no workflow, checker, package, script, or distribution byte.

## Criterion Assessment

| Criterion | Auditor's finding |
| --- | --- |
| 1 Active protection on `master` | Satisfied by Github's protection report |
| 2 `Validate` required and strict | Satisfied |
| 3 One approving review required | Satisfied |
| 4 Bypass and direct-push policy explicit | Satisfied, with the lock-versus-push tension stated after the policy bullets rather than inside them |
| 5 Invalid candidate fails and is reported unmergeable | Satisfied on the facts; the `blocked` state is composite and the Evidence attributed it to the active rule alone |
| 6 Not merged, closed safely, branch deleted | Satisfied |
| 7 Realization does not overstate the boundary | Satisfied; it understated by omitting the lock |
| 8 Audit and confirmation Decision | Pending by design at audit time |

Guardrails: none violated. No enforcement surface changed on the branch, the
invalid candidate was not merged, visibility changed under a different Task,
and protection is claimed from Github's report.

## Verdict And Findings

**Verdict: no material finding.** Six minor findings, none blocking closure:

1. The Evidence attributed pull request 22's `blocked` state to the active rule
   alone. The state is composite — the failed required check, the review
   requirement, and the branch lock, which was already enabled when the pull
   request was evaluated — so a valid candidate would also have read
   `blocked`. The exercise proves Github blocks the pull request and that the
   check failed on its exact head; it does not isolate the `Validate` rule.
2. One bare `ADR 0136` mention in the Evidence table was not a deep link.
3. The Task's scope attribution assigned all of item five to the Human Product
   Owner, while administrator enforcement was set under ADR 0136 item seven.
4. The Evidence table omitted three settings Github reports: block branch
   creation `true`, required signatures `false`, allow fork syncing `false`.
5. The Realization and front page omitted the branch lock, the one setting
   that changes merge behaviour for everyone.
6. The lock's effect on the push policy was stated only after the policy
   bullets, not within them.

The auditor judged the Evidence's description of Github's lock-branch semantics
accurate against Github's documentation, and its "inert" characterization of
code-owner review without a `CODEOWNERS` file consistent with known behaviour
while noting the documentation does not address that case.

## Repairs

Every minor finding was repaired in commit `3e69a55` on `task/NKF-012` before
confirmation: the composite block is stated as such, the bare mention is
linked, item five's attribution carves out administrator enforcement, the
three settings are added, the Realization and front page name the lock, and
the lock's effect is stated inside the policy. The repaired documents were
repinned and the pinned check passed.

## Boundary

This audit examined one branch state and one Github state at one moment. It
does not confirm the Realization; the confirming Decision does that, bound to
this record. It does not observe whether the branch lock blocks the Human
Product Owner's own merge, which Github will show on the next merge attempt.
