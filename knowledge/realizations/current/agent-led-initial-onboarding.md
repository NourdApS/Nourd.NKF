---
id: nkf-agent-led-initial-onboarding
type: realization
title: NKF Agent-Led Initial Onboarding
summary: This Realization maps the implemented agent-led Category 1 and Category 2 workflow, complete mechanical project snapshot, plan-bound confirmation, deterministic sealing, and existing transaction and validation boundary.
created_at: 2026-07-31T14:16:33Z
record_lifecycle: living
record_status: draft
task: NKF-015
confirmation_status: unconfirmed
---

# NKF Agent-Led Initial Onboarding

## Realization Identity And Kind

This is the current implementation Realization for the onboarding direction
adopted by ADR 0069. It describes derived pre-adoption guidance, tooling,
tests, and public documentation. It does not revise native NKF 0.1 meaning.

The revision is implemented as a candidate and remains unconfirmed until the
NKF-015 audit, complete repository validation, and a separate confirmation act
cover its exact bytes. The exact NKF-013 Realization revision confirmed by ADR
0068 remains historical provenance rather than being rewritten as if this
direction existed earlier.

## Governed Meaning Realized

ADR 0069 assigns complete semantic repository review to the portable
`nkf-onboarding` skill. The agent distinguishes useful knowledge, source
implementation, project configuration, incidental material, and unresolved
items; recommends Empty Repository or Tiny Knowledge, No Source Or
Configuration; exposes evidence and uncertainty; and obtains mandatory human
confirmation for Category 2.

The public `inspect` command remains but now performs only mechanical source
capture and candidate-workspace preparation. It no longer emits semantic
eligibility, numeric size decisions, or frontmatter-based maturity decisions.
When an agent cannot recommend either supported category, the agent stops and
refers future work to deferred NKF-014 without guessing another category.

The existing deterministic boundary remains responsible for plan shape,
assessment completeness, Category 2 confirmation presence, exact source and
candidate bytes, Markdown representation coverage, safe paths, symbolic-link
and special-file rejection, release verification, native generation, staged
full-bundle validation, transaction, rollback, receipt, and idempotence. It
does not prove that the plan-supplied semantic category is true.

## Durable Mapping

The implementation topology is:

```text
Complete Repository Review By Participating Agent
        ↓ evidence and category recommendation
Required Human Confirmation Or Explicit Override
        ↓
Mechanical Project Capture + External Candidate Workspace
        ↓ resolved plan assessment and Markdown representations
Deterministic Seal
        ↓ exact source and candidate verification
Native Generation + Pinned Integration + Full-Bundle Check
        ↓ rollback-capable replacement
Draft Adopted Repository + Operational Receipt
```

| Component | Durable Location | Implemented Boundary |
| --- | --- | --- |
| Accepted direction | `knowledge/decisions/0069-agent-led-initial-onboarding.md` | Agent semantic assessment, Category 1 and Category 2 confirmation rules, mechanical source manifest, and deterministic final enforcement |
| Design provenance | `knowledge/designs/adopted/agent-led-initial-onboarding.md` | Responsibility allocation, exact plan semantics, alternatives, compatibility, and validation matrix |
| Pre-adoption protocol | `integrations/onboarding/nkf-onboarding-protocol.md` | Complete vendor-neutral agent review, recommendation, confirmation, candidate-resolution, seal, onboard, and handoff procedure |
| Portable skills | `.agents/skills/nkf-onboarding/SKILL.md` and `.claude/skills/nkf-onboarding/SKILL.md` | Byte-identical discovery routes requiring complete semantic review before mechanical capture |
| Onboarding core | `scripts/onboarding/core.mjs` | Complete project-entry manifest, mechanical readiness, assessment and confirmation validation, source binding, sealing, scaffold and native generation |
| Public executable | `scripts/adoption/nourd-nkf-adopt.mjs` and `dist/nourd-nkf-adopt.mjs` | Mechanical inspect result, assessment-aware receipt and handoff, onboarding transaction, and existing install commands |
| Guidance verifier | `scripts/verify-onboarding-guidance.mjs` | Byte equality, neutral protocol subjects, supported-category guidance, and rejected deterministic semantic thresholds |
| Focused tests | `test/adopter.test.ts` and `test/onboarding-guidance.test.ts` | Both profiles, Category 1, Category 2, missing confirmation, negative override, numeric and frontmatter neutrality, complete source drift, unsafe files, rollback, idempotence, and neutral guidance |
| Consumer exercise | `scripts/exercise-consumer-adoption.mjs` | Explicit agent assessment and applicable confirmation for the local Product and Technology exercise candidates |
| Public guide | `public-docs/guides/initial-onboarding.md` | Complete agent-led user workflow, plan examples, deterministic boundary, status interpretation, and recovery behavior |
| Public projection | `public-docs/tools/`, public skills, and `public-docs/README.md` | Built byte mirrors and user navigation for the revised workflow |

The existing installer and transaction implementation remain shared. The
change revises pre-adoption analysis and source binding rather than creating a
second installer or native NKF contract.

## Responsibilities And Ownership Boundaries

The participating agent owns a proposal-quality semantic assessment and must
report uncertainty. Project authority owns Root Profile selection, Category 2
confirmation or override, candidate meaning, acceptance, Decisions,
Specification status, and Realization confirmation.

The mechanical inspector owns a complete manifest of project directories and
regular files outside version-control implementation metadata. The manifest
records paths, kinds, byte counts, and SHA-256 values but no semantic file
classification. Other project files enter the onboarding source snapshot
without becoming native records or Governed Validation Inputs by implication.

The sealer and onboarder own exact completeness and safety checks. The pinned
checker owns conformance for the staged candidate. No instruction, assessment,
confirmation field, receipt, or passing result accepts project meaning.

## Interfaces Dependencies Locators And Resolution

The agent begins with the complete neutral protocol. After its review and the
applicable human confirmation, the public command sequence remains:

```text
nourd-nkf-adopt.mjs inspect ...
nourd-nkf-adopt.mjs seal --project ... --plan ...
nourd-nkf-adopt.mjs onboard --project ... --plan ... --archive ... --sha256 ...
```

The plan retains `contract: nkf.onboarding-plan` and `nkf_version: "0.1"` and
adds one `assessment` mapping. Empty Repository requires a recommended agent
assessment and `confirmation.status: not-required`. Tiny Knowledge, No Source
Or Configuration requires a human `confirmed` mapping. A negative or
indeterminate agent recommendation additionally requires an explicit override
and rationale.

`inspection.json` contains the complete mechanical `project_entries` manifest,
knowledge-root Markdown inventory, integration surfaces, package commands,
Git binding, and canonical snapshot digest. `.git` implementation metadata is
excluded and Git root and branch remain separately observed.

Sealing now validates the resolved assessment and every Markdown
representation before writing refreshed candidate digests. Application repeats
the source snapshot and candidate checks before generating the native bundle.

## External Authority And Operational State Boundaries

The agent assessment, human category confirmation, workspace, plan, and
receipt are operational onboarding state. They do not become canonical project
knowledge merely because deterministic tooling validates their shape.

Release availability, public-repository publication, workflow runs, Git
history, branch protection, and consumer acceptance remain in their owning
systems. No successor release or public publication is claimed by this
candidate Realization.

Consumer-repository onboarding is outside this Realization and NKF-015. The
Human Product Owner removed that operation from the Task and will perform it
separately using trusted release inputs.

## Compatibility Verification And Recovery

Existing adopted repositories retain `install`, `update`, `check`, `status`,
and `integration-check`. Their pins do not move automatically.

Unapplied NKF-013 workspaces fail the successor plan envelope because they do
not contain the accepted assessment mapping or complete source-manifest
semantics. Users regenerate those temporary workspaces. This is a deliberate
pre-stable operational compatibility change, not an NKF format-version change.

The source snapshot now detects changes to ordinary source and configuration
files in addition to the previously selected integration surfaces. Symbolic
links and special entries fail closed. Candidate edits remain external until
seal; any source or candidate drift blocks application. The existing complete
staging, post-write verification, automatic handled-failure rollback, and
same-plan no-update behavior remain in place.

The isolated audit passed agent and onboarding guidance verification, type
checking, all 136 tests across nineteen files, deterministic checker and
adopter builds, public documentation verification, and full-bundle
self-hosting validation. Its recommendation check correctly stopped at the
then-current predecessor adopter. The Human Product Owner subsequently
authorized the successor publication and deliberate recommendation update as
well as the bounded repository-specific `AGENTS.md` policy binding; that
policy remains outside the neutral protocol and portable skills.

The independent
[NKF-015 Audit](../../evidence/audits/nkf-015-agent-led-initial-onboarding-audit.md)
records the exact execution, two repaired findings, and the original blockers.
Its post-audit resolution records the later authority changes. Confirmation,
successor publication, and the final exact-worktree `npm run nkf:check` remain
outstanding at this interim revision.
