---
title: "NKF-011: Enforce NKF Contracts"
summary: Establish layered NKF enforcement that reduces document drift during AI-assisted authoring, provides one standard local validation path, blocks invalid knowledge from merging to the protected default branch, and can later be adopted by consumer repositories without confusing tooling with authority.
created_at: 2026-07-30T23:07:00Z
task_id: NKF-011
task_status: active
---

# NKF-011: Enforce NKF Contracts

- **Status:** Active
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Authority Boundary:** The Human Product Owner has accepted the enforcement
  boundary and authorized work through the exact Design. Consequential
  normative or integration choices still require explicit acceptance before
  realization. Guidance, skills, hooks, checks, Git operations, and passing
  validation cannot accept knowledge or confirm a Realization.

## Purpose

Make NKF conformance the normal path from AI-assisted authoring through merge,
with the earliest practical feedback and a concrete hard gate before invalid
knowledge can enter the protected default branch.

Practice the enforcement model on the NKF repository itself, then extract
portable adoption artifacts that remain derived from NKF authority.

## Accepted Boundary

Enforcement is layered:

1. AI-neutral authoring guidance and explicit agent-host adapters reduce
   avoidable divergence before files are written;
2. one standard local command validates the current project;
3. commit-time enforcement remains deferred until NKF can validate the exact
   staged snapshot instead of a possibly different working tree;
4. required continuous integration validates the exact candidate commit and
   is the hard merge gate on the protected default branch; and
5. consumer projects pin a deliberate NKF checker-and-authority release pair.

This boundary does not claim that every temporary feature-branch commit is
valid. It requires that invalid knowledge cannot merge to the protected
default branch once the required remote protection is activated.

## Requirements

1. Define the authority, purpose, guarantees, and limits of every enforcement
   layer.
2. Define one standard project-local validation invocation and stable
   success/failure behavior.
3. Provide concise AI-neutral agent instructions and a reusable NKF authoring
   skill that guide work from the governed Task through validation.
4. Treat agent guidance and skills as derived integration artifacts, never as
   competing normative authority.
5. Keep the canonical authoring protocol independent of any model or agent
   vendor and maintain explicit adapters for supported agent-host discovery
   conventions.
6. Make the complete minimum authoring workflow available as plain CommonMark
   without requiring native instruction-file or Agent Skills discovery.
7. Apply the same deterministic command and merge check to every candidate
   snapshot regardless of whether its author was human, AI, automation, or
   another tool.
8. Define the capability boundary for an AI surface that participates in
   governed authoring, without claiming that arbitrary AI software can be
   forced to discover or obey repository files.
9. Add exact-commit continuous-integration validation for the NKF repository
   and define the reusable consumer pattern.
10. Protect enforcement-surface changes with explicit human review and
    successor-Realization confirmation rather than letting candidate tooling
    validate its own weakening by implication.
11. Do not claim the hard merge guarantee until the workflow is present on the
   remote default branch and its check is required by repository protection.
12. Keep commit-time enforcement deferred unless staged-snapshot validation is
   designed and implemented correctly.
13. Keep consumer activation dependent on an exact, intentionally selected NKF
   release rather than a floating branch or silently mutable checker.
14. Preserve acceptance, confirmed Realization, conformance, Git state, and
   remote enforcement state as distinct facts.
15. Do not claim that enforcement automatically closes every active Task or
    Design without a separately accepted lifecycle-completion policy.
16. Validate the enforcement artifacts themselves and retain an adversarial
    completion audit.

## AI Execution Plan

- **Recorded At:** `2026-07-30T23:07:00Z`
- **Scope:** Define, realize, self-host, validate, and audit the accepted NKF
  enforcement boundary without activating unapproved remote state.
- **Authority Effect:** Designs propose the exact enforcement model; Decisions
  adopt or reject it; Specifications define any normative NKF meaning;
  Realizations describe implemented integrations; Validation evaluates exact
  snapshots.

### Plan

1. Inventory the checker invocation, package scripts, repository instructions,
   Git and GitHub surfaces, release boundary, and current governed-artifact
   mappings.
2. Draft one exact Design covering authoring guidance, the local command,
   exact-commit continuous integration, portable adoption artifacts, remote
   activation, diagnostics, and the staged-snapshot limitation.
3. Review the Design against current NKF authority and return consequential
   choices for Human Product Owner acceptance.
4. Record the adopting Decision and update normative authority only where the
   accepted model changes NKF meaning.
5. Implement NKF repository self-enforcement, agent guidance, the reusable
   authoring skill, and portable consumer templates from the accepted Design.
6. Update Schemas, checker behavior, fixtures, or tests only if the accepted
   Design identifies a genuine contract requirement.
7. Update declarations, governed-artifact bindings, and the consolidated
   current-system Realization.
8. Run skill validation, type checking, tests, deterministic build
   verification, full bundle validation, coverage checks, and digest checks.
9. Perform a separate adversarial audit of the final current snapshot and
   repair every material finding.
10. Record exact local Realization confirmation without treating CI, checker,
    or Git success as acceptance. Complete the Task only after separately
    authorized remote activation and its required operational evidence.

## Acceptance Criteria

- The enforcement layers and their limits are explicitly accepted and
  represented without creating a second NKF authority.
- The NKF repository has one documented local validation command.
- AI agents receive concise, actionable, model-neutral NKF authoring
  instructions.
- One vendor-neutral CommonMark protocol contains the complete minimum
  authoring workflow and is directly readable without native skill support.
- A governed adapter registry identifies each supported agent-host surface,
  its discovery conventions, and the exact adapter artifact that realizes
  each convention; a product-family name alone is not a coverage claim.
- Byte-identical `.agents` and `.claude` representations of the reusable,
  open-format NKF authoring skill use the cross-host common subset, direct the
  host to the neutral protocol, and do not duplicate or redefine its complete
  workflow.
- Continuous integration validates the exact candidate commit.
- Every candidate snapshot receives the same mechanical validation regardless
  of its authoring source.
- Enforcement-surface changes cannot be treated as trusted merely because
  their candidate-controlled check passes.
- The repository states exactly what local implementation exists and what
  remote protection remains inactive or unconfirmed.
- Consumer adoption artifacts require an exact NKF release and do not depend
  on this repository's moving default branch.
- No naïve commit hook is presented as staged-snapshot enforcement.
- All affected knowledge, declarations, bindings, and Realization records are
  synchronized.
- A separate final audit records no unresolved material finding.

## Guardrails

- Do not use a skill, `AGENTS.md`, or workflow file as normative NKF meaning.
- Do not let automation accept a Design, Decision, Specification, or
  Realization.
- Do not claim remote branch protection from a local workflow file.
- Do not pin consumers to an unreleased local commit by implication.
- Do not make a working-tree check appear to validate the staged commit.
- Do not broaden this Task into checker publication or consumer migration
  owned by NKF-008.

## Current Progress

ADR 0060 adopts the exact Layered Contract Enforcement Design. The local
reference implementation now includes the neutral protocol, explicit
host-surface registry, four instruction adapters, two byte-identical portable
skill representations, integrity verifier, unified project command,
exact-commit workflow, adversarial tests, governed-artifact bindings, and
current Realization updates.

The
[final implementation audit](../../evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md)
records no unresolved material local finding after repairing incomplete
competing-instruction discovery and strengthening path, command, and workflow
integrity checks.

The confirmed local implementation passes the canonical gate over 92 record
declarations, 50 non-record sources, and 72 governed artifacts. ADR 0061
records the delegated independent confirmation. Git commit state, remote
workflow activation, required-check protection, review and bypass controls,
and the blocked invalid pull-request observation remain later Task work
requiring their applicable authority and operational evidence.

## AI Execution Slice: Activate Remote Enforcement

- **Recorded At:** `2026-07-31T00:55:01Z`
- **Authorization:** The Human Product Owner authorized correction of the
  stale repository entry points, commit and push of the exact validated
  candidate, and work through remote hard-gate activation. Release,
  publication, and consumer-experience work remain outside this slice.
- **Scope:** Close the remaining local documentation residue, publish the
  confirmed candidate to the remote default branch, observe the exact-commit
  workflow, and activate or precisely identify the blocker to the accepted
  protected merge gate.

### Plan

1. Correct the root and Specification navigation entry points without
   changing normative NKF 0.1 meaning.
2. Synchronize governed-artifact bindings and run `npm run nkf:check`.
3. Audit the exact candidate, commit it on `master`, and push it to the
   verified NKF remote.
4. Observe the remote workflow and exact check context.
5. Configure required-check, review, and bypass protection only when the
   current repository plan and visibility support the accepted boundary.
6. Exercise one intentionally invalid pull-request candidate only after the
   protection rule is active, and confirm that GitHub blocks its merge.
7. Record remote operational Evidence and successor Realization status.

### Guardrails

- Do not change repository visibility or purchase a GitHub plan by
  implication.
- Do not publish, replace, or modify a release.
- Do not begin consumer onboarding or user-experience design.
- Do not claim a protected remote gate unless GitHub operational evidence
  establishes every accepted condition.
