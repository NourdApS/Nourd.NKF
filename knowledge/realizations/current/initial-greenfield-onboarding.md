---
id: nkf-initial-greenfield-onboarding
type: realization
title: NKF Initial Greenfield Onboarding
summary: This Realization maps the implemented inspect-plan-seal-onboard path for empty and small-document Product and Technology repositories, including AI-neutral guidance, whole-project staging, rollback, public documentation, and the NKF-014 extension boundary.
created_at: 2026-07-31T11:08:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-013
confirmation_status: unconfirmed
---

# NKF Initial Greenfield Onboarding

## Realization Identity And Kind

This is the current implementation Realization for the initial NKF onboarding
path adopted by ADR 0067. It describes derived tooling and user experience. It
does not revise native NKF 0.1 meaning.

The implementation supports an empty or small-document unadopted repository
whose authority selects Product or Technology. It fails closed when the
corpus exceeds the accepted quantitative or qualitative greenfield boundary.

## Governed Meaning Realized

ADR 0067 adopts an AI-neutral `inspect → resolved plan workspace → seal →
onboard` path. Markdown remains canonical project meaning; the onboarder
generates native YAML, digests, release integration, and validation mechanics
from a fully resolved candidate plan.

Project authority supplies the Root Profile and identity inputs. A human or
participating AI may propose semantic classifications and candidate Markdown
edits in the external workspace. The executable never invokes a model and
never turns classification, conformance, or implementation observation into
acceptance or confirmation.

The initial boundary is twenty Markdown files, 256 KiB total, and 64 KiB per
file. Existing accepted authority, Task lifecycle, Design disposition,
Decision, Specification, or Realization confirmation receives a deterministic
`NKF-014` deferral diagnostic.

The inspection snapshot also binds relevant existing project surfaces:
supported AI instructions, package and lock files, all top-level Github
workflow YAML, integration-owned targets, and the Git default branch. A change
to one of those inputs invalidates the plan. Uninterpreted source files remain
outside this semantic inspection boundary and are preserved by the bounded
transaction target set.

## Durable Mapping

The implementation topology is:

```text
Unadopted Project
        ↓ inspect without project mutation
Inspection + External Candidate Workspace
        ↓ complete semantic resolution
Sealed NKF 0.1 Onboarding Plan
        ↓ deterministic generation
Knowledge + Native Declarations + Pinned Integration
        ↓ isolated whole-project validation
Conformant Staged Candidate
        ↓ rollback-capable replacement
Draft Adopted Repository + Operational Receipt
```

| Component | Durable Location | Implemented Boundary |
| --- | --- | --- |
| Onboarding core | `scripts/onboarding/core.mjs` | Markdown and project-surface inspection, eligibility, safe knowledge-root traversal, Git-root and branch binding, workspace, plan validation, sealing, profile scaffolds, record generation, and receipt serialization |
| Public executable | `scripts/adoption/nourd-nkf-adopt.mjs` and `dist/nourd-nkf-adopt.mjs` | `inspect`, `seal`, and `onboard` commands plus shared install, update, check, status, and integration behavior |
| Whole-project transaction | `scripts/adoption/nourd-nkf-adopt.mjs` | Complete candidate mirror, verified release checker, predecessor-byte retention, post-write verification, rollback, and same-plan no-update |
| Pre-adoption protocol | `integrations/onboarding/nkf-onboarding-protocol.md` | Complete vendor-neutral semantic handoff and authority procedure |
| Portable skills | `.agents/skills/nkf-onboarding/SKILL.md` and `.claude/skills/nkf-onboarding/SKILL.md` | Byte-identical open-skill discovery routes to the same protocol |
| Guidance verifier | `scripts/verify-onboarding-guidance.mjs` | Exact skill equality, protocol completeness, and provider-neutrality checks |
| Exercise | `scripts/exercise-consumer-adoption.mjs` | Empty Product, small-document Technology, already-structured install, check, idempotence, and tamper behavior against one exact archive |
| Focused tests | `test/adopter.test.ts` and `test/onboarding-guidance.test.ts` | Product, Technology, nested documentation, candidate edits, ambiguity, limits, lifecycle deferral, final and intermediate symlinks, duplicate and escaping paths, relevant-surface drift, conflicts, rollback, source preservation, conventions, and guidance negatives |
| Public guide | `public-docs/guides/initial-onboarding.md` | Complete user path, limits, commands, semantic plan examples, status meaning, and recovery boundary |
| Public artifacts | `public-docs/tools/` and public `.agents` and `.claude` skill paths | Byte-identical adopter, neutral protocol, and portable skill publication inputs |

The existing pinned installer supplies release acquisition, content-addressed
verification, authoring integration, instruction merging, package command,
workflow, pin, and full-bundle checker invocation. Onboarding composes that
implementation rather than duplicating a second integration contract.

## Responsibilities And Ownership Boundaries

The onboarder owns deterministic inspection, eligibility, plan-envelope
validation, exact source and candidate binding, generated scaffolds and native
declarations, release verification, staging, transaction, rollback, receipt,
and result serialization.

Project authority owns Root Profile selection, root identity, candidate
meaning, acceptance, Design disposition, Decisions, normative Specification
status, and Realization confirmation. A participating author owns only the
proposals it places in the candidate workspace.

The pinned checker owns mechanical conformance for one candidate snapshot.
Github and Git own remote workflow and repository state. Neither validation,
the operational receipt, a passing workflow, nor this Realization establishes
consumer acceptance.

## Interfaces Dependencies Locators And Resolution

The public command sequence is:

```text
nourd-nkf-adopt.mjs inspect ...
nourd-nkf-adopt.mjs seal --project ... --plan ...
nourd-nkf-adopt.mjs onboard --project ... --plan ... --archive ... --sha256 ...
```

The plan uses `contract: nkf.onboarding-plan` and `nkf_version: "0.1"`. It
binds the inspection digest, project-authority inputs, scaffold paths, original
and candidate document digests, and exactly one representation for every
existing Markdown source. The inspection digest covers the relevant existing
instruction, package, workflow, integration-target, and Git-branch surfaces.
The plan omits generated native `source` bindings.

The Technology scaffold adds a Draft Specification. Both profiles add a Draft
root, active onboarding Task, navigation map, and unconfirmed current-system
Realization. Existing source code is not interpreted or added to Governed
Validation Inputs.

The installed `npm run nkf:check` command remains the post-adoption handoff.
The generated lockfile makes the exact-commit workflow executable for a new
dependency-free project. A project with package dependencies must supply its
own committed lockfile before integration.

## External Authority And Operational State Boundaries

The onboarding workspace and receipt are operational state, not canonical
project meaning. The workspace stays outside the project. The receipt stays
under `.nourd`, supports same-plan idempotence, and does not enter the
validated snapshot by implication.

Release availability, public-repository publication, workflow runs, Git
history, branch protection, and consumer acceptance remain in their owning
systems. The native archive remains the previously confirmed exact release
because no native authority, Schema, or checker byte changed. The adopter has
a new separately bound digest.

The restored Agent SDK snapshot was inspected only as eligibility Evidence. It
contains mature Task, Design, Decision, and acceptance history and therefore
receives the intended `NKF-014` deferral. No Agent SDK byte is modified by this
Realization.

## Compatibility Verification And Recovery

Existing `install`, `update`, `check`, `status`, and `integration-check`
commands remain supported. Installer and onboarding application now validate
a complete isolated candidate before mutation and keep post-write verification
inside the rollback-capable transaction.

The same sealed plan returns `no-update` only after installed integration and
full-bundle verification. A different plan against an adopted repository fails
closed. Candidate edits require an updated sealed digest, source inspection
or relevant project-surface drift blocks application, and every handled
failure restores predecessor bytes and removes transaction-created paths.

The stable plan/apply boundary permits `NKF-014` to add large-corpus analyzers,
source-grounded candidate producers, provenance graphs, checkpoints, session
resumption, and advanced recovery before final apply. Those extensions cannot
infer authority or weaken the final source binding, staged checker, or
transaction contract.

This revision remains unconfirmed until the separate adversarial completion
audit verifies every `NKF-013` criterion and a later Decision binds its exact
bytes.
