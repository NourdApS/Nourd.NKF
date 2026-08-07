---
summary: Replace deterministic repository-category assessment in initial NKF onboarding with a portable agent-led inspection and recommendation workflow while retaining deterministic sealing, application, and validation safeguards.
created_at: 2026-07-31T13:58:38Z
task_id: NKF-015
task_status: completed
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-015: Establish Agent-Led Initial Onboarding

- **Predecessor:**
  [`NKF-013`](../completed/NKF-013-initial-greenfield-onboarding.md)
- **Deferred Successor:**
  [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md)

## Purpose

Revise initial NKF onboarding so a participating AI agent follows one
portable, vendor-neutral workflow to inspect and reason about an unadopted
repository, recommend its supported starting category, obtain the required
human confirmation, and prepare the onboarding candidate.

The executable boundary remains deterministic where exactness and safety are
required. It verifies the final candidate's complete source coverage, hashes,
paths, symbolic-link policy, release integrity, generated native knowledge,
transaction behavior, rollback, idempotence, and NKF conformance. It does not
decide whether repository content is useful knowledge, source code,
configuration, incidental material, or evidence of maturity.

## Accepted Direction

The Human Product Owner accepted this boundary on 2026-07-31:

> Agent-led inspection and classification; human confirmation where required;
> deterministic sealing, application, and validation.

The repository assessment is a required step in the existing portable
`nkf-onboarding` skill. It is not a separate deterministic survey, semantic
classifier, selectable Generic profile, or competing onboarding skill.

On 2026-07-31, the Human Product Owner separately authorized the completion
and repository-cleanup operation: commit the repository-specific `AGENTS.md`
Task-authorization policy without making it portable NKF protocol meaning;
remove Agent SDK onboarding from this Task because the Product Owner will
perform that consumer operation manually; and commit, push, publish, verify,
confirm, and close the exact NKF-015 successor when its evidence supports
those claims.

## Initial Categories In Scope

This Task supports only these two starting categories:

1. **Empty Repository:** no useful knowledge, source code, or project
   configuration. Incidental material such as editor settings, empty workflow
   scaffolding, or a generic placeholder README does not by itself make the
   repository non-empty for this semantic assessment.
2. **Tiny Knowledge, No Source Or Configuration:** a small, completely
   reviewable knowledge set with no meaningful source implementation or
   project configuration.

Both categories apply before `.nourd` exists and before any NKF onboarding has
completed. Category 1 may proceed without a separate human category decision
only when the agent can establish the effectively-empty condition from the
complete repository. Category 2 always requires explicit human confirmation.

If the agent cannot recommend Category 2, it reports the evidence and stops
without guessing which later category applies. The human may still direct
Category 2 onboarding after reviewing that evidence, but cannot override a
mechanical safety failure such as an escaping path, prohibited symbolic link,
conflicting `.nourd` state, incomplete source coverage, or changed snapshot.

All other starting categories remain with deferred `NKF-014`. Their semantic
criteria require later Human Product Owner confirmation and are not defined or
inferred by this Task.

## Scope

This Task owns:

1. a successor Design and Decision that preserve NKF-013 as historical
   provenance while replacing its deterministic eligibility interpretation;
2. the portable agent-led repository inspection, evidence, recommendation,
   confirmation, candidate-resolution, and handoff procedure;
3. an AI-neutral revision of the existing `nkf-onboarding` skill and its two
   supported discovery locations;
4. removal of deterministic numeric and lifecycle-content classification from
   onboarding eligibility;
5. a mechanically complete source-manifest and candidate-plan boundary at
   sealing and application;
6. revised commands, diagnostics, public guidance, fixtures, and tests;
7. a successor current-system Realization and independent completion audit.

## Guardrails

- Do not rewrite the completed NKF-013 Task, adopted Design, Decisions, audit,
  or confirmed Realization to make the new direction look historical.
- Do not let the agent's recommendation become acceptance, confirmation, or a
  conformance result.
- Do not let deterministic tooling infer semantic category, lifecycle
  maturity, Root Profile, or project authority from repository bytes.
- Do not let an agent omit files from the final source manifest or bypass
  exact snapshot binding.
- Do not create a model-vendor-specific workflow or instruction authority.
- Do not activate or define the deferred Category 3 through Category 10
  criteria under this Task.

## Acceptance Criteria

- The portable onboarding skill requires complete repository inspection and
  evidence-backed semantic assessment before candidate preparation.
- The agent distinguishes meaningful knowledge, source, configuration,
  incidental material, and unresolved items without fixed numeric thresholds
  masquerading as meaning.
- Category 1 automatic progression and Category 2 human confirmation are
  explicit and tested.
- A negative or uncertain Category 2 recommendation stops without guessing a
  later category, while preserving a deliberate human override boundary.
- No public or internal executable claims to survey or classify repository
  meaning deterministically.
- Final sealing and application independently verify complete source coverage,
  exact bytes, safety, release integrity, native generation, and conformance.
- Existing NKF-013 users and accepted historical records receive explicit
  compatibility and provenance treatment.
- The `.agents/skills` and `.claude/skills` representations remain
  byte-identical and route every supported AI host to the same neutral
  protocol.
- Public documentation explains the agent-led workflow and the remaining
  deterministic enforcement boundary without requiring users to author native
  YAML.
- Local tests and `npm run nkf:check` pass for the exact governed revision.
- An independent audit records no unresolved material finding before the
  successor Realization is confirmed and the Task is completed.

## Task Execution Plan

1. Audit the confirmed NKF-013 Design, Decisions, Realization, protocol,
   skills, adopter, tests, public documentation, and release bindings against
   the accepted agent-led boundary.
2. Draft a successor Design that allocates semantic repository inspection to
   the portable skill and exact mechanical enforcement to seal, apply, and
   validation.
3. Record the Human Product Owner's accepted boundary in a successor Decision
   with explicit NKF-013 compatibility and provenance.
4. Revise the neutral protocol and byte-identical skills before changing the
   executable surface.
5. Replace deterministic eligibility classification with a final mechanical
   source-manifest, snapshot, candidate, and transaction boundary.
6. Revise diagnostics, tests, fixtures, command guidance, public documentation,
   distribution bindings, and generated artifacts coherently.
7. Exercise both supported categories and negative, uncertain, overridden,
   stale, incomplete, unsafe, rollback, and idempotent cases.
8. Author the successor current-system Realization, run an independent
   requirement-by-requirement audit, repair material findings, and obtain or
   apply delegated confirmation authority only after the exact revision is
   evidenced.
9. Run `npm run nkf:check` and report acceptance, implementation,
   confirmation, conformance, Git, and publication as separate facts.

## Authorized Completion Plan

1. Reconcile current-system navigation so superseded NKF-013 eligibility is
   clearly historical and live validation state is not copied into durable
   Realization meaning.
2. Bind the authorized repository-specific `AGENTS.md` Task-creation policy as
   a bounded project instruction while leaving the neutral NKF protocol and
   portable skills unchanged.
3. Remove Agent SDK mutation and exercise from NKF-015 completion; the Human
   Product Owner owns that later manual consumer operation.
4. Re-run focused checks and the exact `npm run nkf:check`, then perform a
   fresh independent completion audit over the coherent local candidate.
5. Commit and push the candidate, publish and independently verify the updated
   public adopter and documentation projection, and update the deliberate
   recommendation without creating a new native archive when its accepted
   checker and authority inputs remain byte-identical.
6. Reconcile exact publication Evidence and current Realizations, exercise the
   delegated confirmation authority through a successor Decision, complete
   this Task, run the final exact-worktree validation, and commit and push the
   closure revision.

## Current Status

The Task is completed. ADR 0069 adopts the exact successor Design, and ADR
0070 confirms the exact independently audited successor Realizations through
delegated technical-review authority.

The final implementation passes 19 test files and all 136 tests,
deterministic checker and adopter builds, agent and onboarding guidance
verification, public-documentation verification, and full-bundle
self-hosting. Exact private source commit
`53ae5217f68731d953f3bf616a578adeb033bb03` passed `NKF Contracts` run
`30655408945`. Exact public commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90` matched its fresh-cloned
28-file staging projection, every manifest digest matched, and both complete
examples passed without diagnostics.

The bounded repository-specific `AGENTS.md` Task-authorization policy is
bound as project instruction without becoming portable NKF protocol meaning.
The unchanged native archive remains recommended alongside the successor
public adopter. The independent audit records two repaired findings and no
unresolved material completion finding.

Consumer-repository onboarding is excluded from NKF-015. The Human Product
Owner retained that operation for separate manual execution, so no consumer
mutation or conformance claim is part of this completion.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
