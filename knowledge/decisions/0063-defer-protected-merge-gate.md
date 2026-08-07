---
id: adr-0063
type: decision
summary: Complete NKF-011 for its delivered and confirmed enforcement scope, transfer the externally blocked protected merge gate to deferred NKF-012, and require pull-request approval when that gate is activated.
created_at: 2026-07-31T01:40:19Z
record_lifecycle: immutable
record_status: accepted
task: NKF-011
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0063: Defer Protected Merge Gate

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's delegated technical-confirmation authority
- **Predecessors:** ADRs 0060, 0061, and 0062

## Context And Problem

ADR 0060 assigns NKF-011 both the layered enforcement implementation and a
later protected remote merge gate. ADR 0061 confirms the audited local
implementation. ADR 0062 confirms that the exact-commit Github workflow is
active while branch protection and repository rulesets remain unavailable for
the private repository under the observed plan.

The Human Product Owner determined that the delivered and confirmed
enforcement work should not remain Active solely because an external
repository capability is unavailable. The blocked remote protection work must
remain explicit and must not be abandoned or misrepresented as complete.

## Decision

NKF-011 is Completed for the following delivered scope:

1. the vendor-neutral NKF authoring protocol;
2. registered agent-host adapters and portable skill representations;
3. deterministic agent-guidance integrity verification;
4. the canonical local `npm run nkf:check` command;
5. exact-commit Github continuous integration on remote `master`;
6. governed artifact bindings, tests, audits, and current Realization
   mappings; and
7. confirmed accounts of the local implementation, successful remote workflow
   observation, and unavailable protection boundary.

Deferred Task `NKF-012` now owns:

1. required-check protection for the exact `Validate` check;
2. at least one mandatory approving pull-request review;
3. an explicit bypass and direct-push policy;
4. an intentionally invalid pull-request exercise proving that Github blocks
   merge; and
5. the resulting Evidence, successor Realization, confirmation, and Task
   completion.

The authorized technical reviewer confirms these exact successor
Realizations as accurate accounts of the unchanged implementation and revised
Task allocation:

| Record | Source | Confirmed Candidate SHA-256 |
| --- | --- | --- |
| `nkf-0.1-native-realization` | `knowledge/realizations/current-system.md` | `4c5e92a18ab33d9c41ed1f67ae5bc4a176a0e54d53158b323f9ce53aea5aebd9` |
| `nkf-layered-contract-enforcement` | `knowledge/realizations/current/layered-contract-enforcement.md` | `349dc8f2696ece38099d0be4f47aefb50ffd9e86920d52fa1b0b062452ecb864` |
| `nkf-self-hosting` | `knowledge/realizations/current/self-hosting.md` | `352c8ceb894e16029682d7cad4c2103c0e06a6303d58f0b250f5e1ad37fe3885` |

## Scope And Applicability

This Decision changes Task allocation and completion status for the NKF
repository reference implementation. It does not change NKF 0.1 normative
meaning, the adopted layered enforcement architecture, checker behavior, the
workflow, or current Github protection state.

ADRs 0060 through 0062 remain immutable predecessor authority and Evidence.
This Decision supersedes only their allocation of the unavailable protected
gate to NKF-011 and their resulting statement that NKF-011 must remain Active.

## Rationale

An Active Task should represent work that can currently proceed. Separating
the externally blocked gate keeps the completed implementation truthful,
preserves the outstanding guarantee as durable work, and avoids treating an
unavailable Github capability as unfinished local implementation.

Requiring pull-request approval in NKF-012 preserves the Human Product Owner's
latest enforcement choice without claiming that the rule exists today.

## Alternatives Considered

Keeping NKF-011 Active indefinitely was rejected because its actionable,
authorized implementation and remote workflow work are complete and
confirmed.

Closing NKF-011 without a successor Task was rejected because it would abandon
the accepted hard-gate objective.

Calling the active workflow a protected gate was rejected because a
non-required check does not prevent merge.

Removing the future pull-request approval requirement was rejected by the
Human Product Owner.

## Consequences And Trade-Offs

NKF-011 moves to Completed and NKF-012 begins Deferred. The repository has no
Active Task after this transition.

The self-host bundle contains 94 record declarations, 52 explicit non-record
sources, and 72 governed artifacts after adding this Decision and NKF-012.

Exact-commit validation continues to provide remote feedback, but invalid
knowledge can still enter `master` until NKF-012 is activated and completed.
The stronger guarantee remains visible without blocking closure of the work
already delivered.

## Non-Claims

This Decision does not:

- activate branch protection or a repository ruleset;
- require `Validate` or a pull-request approval in Github;
- define the final bypass actors or permit direct pushes;
- establish that an invalid candidate was blocked;
- change repository visibility or subscription;
- revise NKF 0.1 normative meaning or conformance;
- publish a checker or release;
- onboard a consumer; or
- treat Task completion as acceptance, confirmation, conformance, protection,
  publication, or Governing Use readiness.
