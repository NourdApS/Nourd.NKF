---
title: "NKF-013: Establish Initial Greenfield Onboarding"
summary: Define, implement, validate, document, and release one seamless first-iteration NKF onboarding path for greenfield Product and Technology repositories with an empty or small reviewable Markdown set.
created_at: 2026-07-31T09:29:17Z
task_id: NKF-013
task_status: completed
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-013: Establish Initial Greenfield Onboarding

- **Iteration:** First
- **Scope Boundary:** Greenfield or near-greenfield Product and Technology
  repositories with an empty or small, reviewable Markdown set and no
  substantial existing knowledge or implementation requiring reconstruction
- **Deferred Successor:**
  [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md)

## Purpose

Make the first practical NKF onboarding experience complete and seamless for
new projects without attempting to solve every brownfield migration and
reconstruction problem in the first iteration.

Seamless means that a user or participating agent does not manually assemble
the bundle, record declarations, section mappings, digests, pinned release,
authoring integration, or validation workflow. It does not mean automatic
semantic acceptance or invented project meaning.

## Problem

The current public adopter is an integration installer for a project that is
already structurally onboarded. Before installation, it requires a
project-root `.nourd`, bundle, project-contained knowledge root, root record,
and selected Product or Technology Root Profile.

The Agent SDK attempt exposed the missing phase: its native NKF structure had
to be assembled manually before the adopter could run. The documented
installation path and the actual user understanding of onboarding are
therefore materially different.

The first correction must close that gap for a deliberately narrow starting
state before NKF attempts large-corpus migration or source-derived system
reconstruction.

## Supported Starting State

The first iteration supports a repository that:

- has no adopted NKF bundle or consumer pin;
- is empty or at an early greenfield stage;
- may contain a small Markdown set that one authoring session can inventory
  and review completely;
- may contain early source files, but does not require the onboarding process
  to reconstruct architecture or intended meaning from implementation;
- has no large established knowledge corpus requiring complex migration;
- selects exactly one Product or Technology Root Profile through project
  authority; and
- selects a project-contained knowledge root.

The exact quantitative and qualitative limit for a small reviewable Markdown
set must be defined by the accepted Design. The process must fail closed with
an explicit [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) deferral diagnostic when the repository exceeds that
supported boundary rather than attempting an unsafe partial migration.

## Desired Outcome

One user-facing onboarding operation takes the supported starting state to a
complete checked NKF candidate through these phases:

1. **Inspect:** Read the repository, Markdown inventory, candidate knowledge
   root, symbolic links, existing instructions, package commands, workflows,
   and owned-path conflicts without mutation.
2. **Select:** Require project authority to provide or confirm the Product or
   Technology Root Profile, knowledge root, root identity, and root title.
   Common Specification rules are inherited; Common is not selectable.
3. **Classify:** Give every existing Markdown file under the chosen knowledge
   root exactly one proposed representation as a record source or
   `non_records` entry.
4. **Resolve:** Pause only for classification, authority, and semantic choices
   that cannot be determined mechanically. AI-assisted answers remain
   proposals unless the owning authority accepts them.
5. **Scaffold:** Create the missing minimum Draft root knowledge, onboarding
   Task, consolidated current-system Realization, and knowledge map without
   inventing accepted meaning or implementation.
6. **Generate:** Produce the bundle, record declarations, section mappings,
   relationships, source digests, navigation, and Task traceability.
7. **Integrate:** Verify and install the exact pinned NKF release, neutral
   authoring protocol, portable skills, supported host adapters, local command,
   integrity verifier, and exact-commit workflow.
8. **Validate:** Run the one supported full-bundle command against the complete
   candidate.
9. **Handoff:** Report created, preserved, changed, and blocked paths;
   conformance; Draft and unresolved meaning; Realization confirmation; Git
   state; and remote enforcement state separately.

The current `install` implementation becomes an internal integration phase.
The user does not prepare native YAML manually as a prerequisite.

## Greenfield Scaffold Requirements

When no knowledge exists, onboarding creates an honest minimum candidate
containing:

- project-root `.nourd`;
- `.nourd/knowledge/bundle.yaml`;
- one concrete Product or Technology Root Profile;
- the selected project-contained `knowledge_root`;
- one Draft root record with every required responsibility represented;
- one consolidated current-system Realization that truthfully records the
  current implementation boundary, including the absence of an implementation;
- one active onboarding Task;
- one navigable knowledge map;
- exact record declarations, section mappings, and digests; and
- explicit Draft or unresolved wording wherever project meaning has not been
  supplied.

Scaffolding cannot accept Product or Technology meaning, adopt a Design,
create historical Decisions, or confirm a Realization.

## Small Existing Documentation Requirements

When a small Markdown set exists:

- inventory it completely before the first write;
- preserve its paths and bytes by default;
- propose one explicit representation for every file;
- identify every required frontmatter, heading, classification, or source
  change before applying it;
- never infer acceptance, rejection, supersession, or confirmation from prose,
  filenames, directory names, source code, or implementation;
- preserve existing authority and provenance when it is actually evidenced;
- require explicit resolution of ambiguous lifecycle or document-class
  choices; and
- reject the candidate rather than leaving a Markdown file unrepresented.

NKF's own lifecycle subdirectories are navigation choices, not a consumer
topology requirement. Initial onboarding must not force that directory
structure onto a project.

## User And Agent Experience Requirements

- One public entry point owns the complete first-iteration onboarding path.
- The exact command vocabulary remains a Design choice, but the normal user
  does not invoke an undocumented internal installer.
- A vendor-neutral onboarding protocol and portable onboarding skill cover the
  pre-adoption phase. The installed NKF authoring protocol and skill take over
  after successful onboarding.
- AI-host adapters remain thin discovery mechanisms. No model, vendor, agent,
  instruction filename, or proprietary prompt convention owns onboarding
  meaning.
- A participating agent may propose classification, structure, and migration
  edits within the complete small corpus. It cannot infer acceptance or
  Realization confirmation.
- The user supplies the profile and core identity choices. Source code and
  directory names do not select the Root Profile.
- The operation does not initialize Git, commit, push, publish, configure
  remote protection, or modify another repository by implication.

## Minimum Safety And Recovery

The narrow first iteration still requires essential safety:

- preflight every target before the first durable replacement;
- reject path escapes, prohibited symbolic links, malformed adapters, and
  incompatible owned paths before mutation;
- stage the complete candidate transactionally;
- preserve the exact predecessor bytes required for automatic failure
  rollback;
- leave the project unchanged when preflight or candidate validation fails;
- make repetition of the same successful onboarding idempotent;
- preserve every original documentation and source byte unless the resolved
  plan names the exact change; and
- never present partial or failed state as successful adoption.

Long-lived resumable sessions, complex interrupted-state repair, user-directed
historical rollback, and advanced migration recovery belong to [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).

## Authority And Lifecycle Requirements

- Invoking onboarding authorizes creation of a candidate, not acceptance of
  project meaning.
- The selected Root Profile comes from project authority.
- Generated root knowledge begins Draft.
- Designs remain proposals with explicit disposition.
- Decisions are never reconstructed from implementation or filenames.
- Specifications own normative meaning only after applicable acceptance.
- Realizations begin unconfirmed unless confirmation provenance exists.
- Validation evaluates one snapshot and cannot accept knowledge or confirm a
  Realization.
- Operational runtime state remains outside native NKF knowledge.

## Validation And Exercise Matrix

Implementation must cover at least:

1. an empty Product repository;
2. an empty Technology repository;
3. Product and Technology repositories with a small Markdown set;
4. a small nested documentation structure that differs from NKF's own
   topology;
5. an unborn Git repository with no commits;
6. existing project instructions, package manifests, and workflow files;
7. ambiguous Markdown classification that pauses safely;
8. a repository exceeding the initial scope that fails closed and directs the
   user to deferred [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md);
9. symbolic-link, path-escape, duplicate, and owned-path conflicts;
10. transactional failure and automatic rollback;
11. repeat-operation idempotence;
12. byte preservation and zero unexplained file loss;
13. honest Draft, unresolved, unconfirmed, conformant, and Governing Use
    status reporting;
14. local execution and exact-commit Github workflow execution; and
15. an authorized Agent SDK exercise after the released workflow is confirmed,
    provided its complete starting snapshot remains within the accepted small
    documentation boundary.

## Acceptance Criteria

- A user can take an empty or supported small-documentation Product or
  Technology repository to a complete checked NKF candidate without manually
  constructing native YAML or integration files.
- The supported-corpus boundary is deterministic, understandable, and fails
  closed before mutation.
- The workflow supports both concrete NKF 0.1 Root Profiles without adding a
  selectable Generic or Common profile.
- Every Markdown file under the chosen knowledge root has exactly one resolved
  representation before successful validation.
- Existing paths and bytes are preserved unless the resolved plan names an
  exact change.
- Greenfield scaffolds are conformant and honest without invented accepted
  meaning.
- A failed operation restores predecessor state, and a repeated successful
  operation creates no duplicate or conflicting integration.
- The onboarding tool, neutral protocol, portable skill, adapters,
  documentation, fixtures, and checker integration are deterministic and
  mutually consistent.
- Public documentation contains complete empty and small-documentation Product
  and Technology examples.
- A separate adversarial audit records no unresolved material finding.
- Exact successor Realizations are independently confirmed before Task
  completion.
- Agent SDK completes an authorized onboarding through the released process if
  it satisfies the initial boundary; its validation remains consumer Evidence
  and does not make NKF authoritative for Agent SDK meaning.

## Explicitly Deferred

[`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md)
owns:

- large or structurally complex documented brownfield migration;
- source-rich knowledge-poor system reconstruction;
- source-derived current-system Realization generation;
- large-scale provenance recovery and semantic reconciliation;
- complex partial or interrupted adoption repair;
- long-lived resumable onboarding sessions and user-directed historical
  rollback; and
- advanced already-adopted migration and compatibility workflows beyond the
  same-operation idempotence required here.

## Guardrails

- Do not treat the current installer as complete onboarding by renaming it or
  changing only its documentation.
- Do not broaden the first iteration into [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) work to accommodate a
  convenient test repository.
- Do not automate away semantic or authority decisions.
- Do not infer a Root Profile from source code or directory names.
- Do not force NKF's own knowledge directory topology onto consumers.
- Do not rewrite accepted records or invent acceptance provenance.
- Do not reconstruct architecture, Specifications, or Decisions from source
  code in this iteration.
- Do not weaken contracts or diagnostics to make generated scaffolds pass.
- Do not claim that a conformant candidate is accepted, confirmed, Governing
  Use Ready, committed, pushed, published, or remotely protected.

## Task Execution Plan

1. Audit the current adopter, public guide, fixtures, tests, and integration
   against the narrowed empty and small-documentation starting state.
2. Draft an initial onboarding Design defining the exact supported-corpus
   boundary, inspection result, classification plan, scaffold, transaction,
   command experience, AI-neutral bootstrap, and failure behavior.
3. Independently review the Design and obtain Human Product Owner acceptance
   for consequential authority, compatibility, and user-experience choices.
4. Record the adopting Decision and revise normative NKF meaning only if the
   accepted Design exposes a genuine format-contract requirement.
5. Implement the deterministic inspection, small-corpus planning, scaffold,
   native generation, release integration, transaction, and handoff path.
6. Implement the vendor-neutral onboarding protocol, portable onboarding
   skill, host-discovery route, documentation, and integrity verification.
7. Add the complete initial validation and exercise matrix.
8. Exercise both Root Profiles and the supported small-documentation path
   locally and through exact-commit continuous integration.
9. Publish a deliberate content-addressed successor release only after its
   checker and onboarding Realizations are confirmed.
10. Evaluate Agent SDK against the exact first-iteration boundary and onboard
    it only if it qualifies without scope expansion.
11. Perform an adversarial completion audit, resolve every material finding,
    confirm the exact successor Realizations, and complete this Task.

## Scope Revision Provenance

The first `NKF-013` draft recorded the complete future onboarding concept,
including documented brownfield migration, source-rich reconstruction,
partial-state recovery, and already-adopted migration. Before any Design or
implementation work began, the Human Product Owner narrowed the first
iteration to greenfield repositories with an empty or small documentation set.
The broader outcome is preserved as deferred [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) rather than being
silently discarded or accidentally included.

## AI Execution Slice: Narrow The First Iteration

- **Recorded At:** `2026-07-31T09:51:12Z`
- **Authority:** The Human Product Owner limited the first onboarding iteration
  to greenfield projects with some small documentation and deferred the rest.
- **Scope:** Revise active `NKF-013`, create deferred [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md), synchronize
  Task navigation and bundle coverage, and validate the coherent change.
- **Non-Claims:** This slice does not adopt an onboarding Design, change the
  NKF 0.1 Specification, implement tooling, publish a release, or onboard
  Agent SDK.

### Plan

1. Preserve the complete onboarding problem and allocation provenance.
2. Restrict active requirements and acceptance criteria to empty and
   small-documentation greenfield repositories.
3. Transfer large brownfield, reconstruction, and advanced recovery work to
   deferred [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).
4. Synchronize navigation and the bundle's explicit Task non-record set.
5. Run `npm run nkf:check` and report validation separately from acceptance,
   implementation, and confirmation.

## AI Execution Slice: Begin Initial Onboarding Design

- **Recorded At:** `2026-07-31T10:19:54Z`
- **Authority:** The Human Product Owner directed work to begin on `NKF-013`.
- **Scope:** Audit the current adopter, fixtures, public guidance, release and
  integration constraints against the narrowed first iteration; identify the
  exact gaps; and propose one consequential Design boundary at a time for
  Product Owner confirmation.
- **Non-Claims:** This slice does not adopt a Design, record a Decision, change
  normative NKF 0.1 meaning, implement onboarding, publish a release, or modify
  Agent SDK.

### Plan

1. Reconcile the current installer prerequisites and transaction behavior with
   the `NKF-013` supported starting state.
2. Audit Product and Technology fixtures, small-document coverage, current
   tests, public instructions, AI-neutral bootstrap, and release constraints.
3. Separate reusable current capabilities from missing onboarding behavior,
   misleading claims, and scope that belongs to deferred [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).
4. Draft the initial onboarding Design incrementally, beginning with the exact
   supported-input boundary and the handoff between deterministic tooling and
   semantic authoring.
5. Obtain explicit Product Owner direction before realizing any consequential
   onboarding choice.

## Initial Audit Checkpoint

- **Observed At:** `2026-07-31T10:21:34Z`
- **State:** Read-only implementation and consumer inspection complete for the
  first Design boundary

Verified findings:

1. The public guide explicitly requires `.nourd`, the native bundle,
   knowledge root, root record, and concrete Root Profile before installation.
2. The adopter calls `requireBundle` before release acquisition or target
   generation and supports only `install`, `update`, `check`, `status`, and
   `integration-check`; it has no pre-adoption inspection, planning,
   classification, scaffold, or native-declaration generation phase.
3. The current installer already supplies valuable reusable capabilities:
   content-addressed release verification, integration-file conflict checks,
   bounded instruction merging, a pinned consumer manifest, deterministic
   build verification, same-pin idempotence, and the canonical local and
   continuous-integration command.
4. The current transaction stages integration bytes only after `.nourd`
   exists. Full installed verification and the checker run occur after those
   bytes are written; a later validation failure is outside the current
   write-transaction rollback boundary.
5. The adopter tests begin from already conformant Product and Technology
   fixtures. The test description "without manual assembly" therefore proves
   integration installation without manual integration-file assembly, not
   onboarding from an unadopted repository.
6. The public adopter is a deterministic derived executable outside the fixed
   native eight-file archive. Its digest is bound separately in the
   recommended-release catalog and public-documentation publication.
7. Native conformance for an empty Product begins with one Draft Product root.
   Native conformance for an empty Technology requires a Draft Technology root
   and at least one Specification record because the Technology Root Profile
   mandates a Specification. The installed authoring workflow additionally
   requires both profiles to receive a consolidated current-system Realization
   as the normal starting view, even when it truthfully records that no
   implementation exists.
8. The post-adoption authoring protocol and agent-host adapters are available,
   but there is no vendor-neutral pre-adoption onboarding protocol or portable
   onboarding skill.
9. The restored Agent SDK starting snapshot contains ten Markdown files under
   `knowledge/`, totaling 50,079 bytes, with explicit Task, Design, Decision,
   and acceptance language. It is a useful small-corpus candidate, but the
   accepted Design must still determine eligibility and preserve Agent SDK
   authority.
10. No audited finding yet requires changing normative NKF 0.1 meaning. The
    missing behavior is currently a derived onboarding, transaction,
    documentation, test, and release-integration concern.

## Origin

The manual Agent SDK attempt demonstrated that the current adopter begins only
after native NKF structure already exists. `NKF-013` addresses that immediate
gap with the smallest complete user experience that can be designed,
implemented, released, and exercised honestly before broader onboarding is
attempted.

## AI Execution Slice: Complete Initial Onboarding

- **Recorded At:** `2026-07-31T10:47:13Z`
- **Authority:** The Human Product Owner directed the technical reviewer to
  work until `NKF-013` is independently verified as finished, preserve an
  extension path that minimizes later [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) Design change, and then commit
  and push the completed work.
- **Scope:** Govern the onboarding direction, realize the supported initial
  path, verify its complete acceptance matrix, preserve deferred successor
  boundaries, confirm the exact successor Realizations under the delegated
  technical-review authority, complete this Task, and publish the resulting
  Git revision.
- **Non-Claims:** The delegation does not authorize inferred consumer meaning,
  activation of [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md), modification of an ineligible external consumer,
  silent NKF 0.1 format change, or treating validation as acceptance or
  Realization confirmation.

### Plan

1. Reconcile every `NKF-013` requirement with current installer, release,
   authoring, documentation, and validation behavior.
2. Adopt one AI-neutral Design with a stable inspect-plan-apply boundary,
   explicit initial eligibility policy, complete project transaction, and
   extension seams for [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) reconstruction and resumability.
3. Implement the onboarder, pre-adoption protocol and skill, deterministic
   scaffolds, native generation, integration reuse, rollback, diagnostics,
   and idempotence.
4. Exercise empty and small-document Product and Technology repositories,
   ambiguity, limits, symbolic links, target conflicts, rollback, byte
   preservation, unborn Git, existing project conventions, and exact-commit
   workflow generation.
5. Update public guidance, knowledge navigation, current-system Realizations,
   governed declarations, and derived artifacts without changing normative
   NKF 0.1 meaning unless implementation proves that necessary.
6. Perform a separate adversarial audit against every acceptance criterion and
   the [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) future-extension boundary, repair all material findings, and
   confirm only exact audited Realization revisions.
7. Move `NKF-013` to Completed, run `npm run nkf:check`, verify repository and
   remote identity, commit the coherent revision, push `master`, and verify the
   remote commit.

## Pre-Publication Verification Checkpoint

- **Observed At:** `2026-07-31T11:50:43Z`
- **State:** Local realization complete and conformant; remote successor
  publication, exact-commit exercise, final confirmation, and Task closure
  remain pending.

The independent implementation review found and repaired two material
pre-publication gaps rather than accepting the first passing candidate:

1. the initial inspection digest bound Markdown but not the existing
   instruction, package, workflow, integration-target, or Git-branch surfaces
   that onboarding later merges or generates; and
2. an intermediate symbolic link in a multi-component `knowledge_root` could
   reach content outside the selected project even though a symbolic link at
   the final component was rejected.

The repaired inspection now inventories and digest-binds every relevant
project surface, extracts package script names, binds the default branch,
requires a detected Git project to be its repository root, rejects symbolic
links in every knowledge-root component, and invalidates stale plans before
mutation. CommonMark CRLF frontmatter also enters the mature-lifecycle gate.

Focused verification passes eleven adopter tests, two onboarding-guidance
tests, and two public-documentation tests. The local consumer exercise passes
for an unborn-Git empty Product and an unborn-Git small-document Technology,
including generated `npm ci`, `npm run nkf:check`, no-update, and tamper
rejection. The pre-confirmation self-host candidate contains 102 record
declarations, 59 explicit non-record sources, and 119 governed artifacts.
Validation remains conformance Evidence and does not supply the still-pending
Realization confirmation.

## Completion

- **Completed At:** `2026-07-31T12:06:29Z`
- **Accepted Direction:**
  [ADR 0067](../../decisions/0067-initial-greenfield-onboarding.md)
- **Confirmation:**
  [ADR 0068](../../decisions/0068-confirm-initial-greenfield-onboarding.md)
- **Independent Review:**
  [NKF-013 Completion Audit](../../evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md)

NKF-013 is complete for deterministic initial onboarding of empty and
small-document Product and Technology repositories. The delivered path covers
inspection, an externally reviewable and sealed semantic plan, profile-specific
Draft scaffolding, native declaration generation, pinned integration, isolated
whole-project validation, exact replacement or rollback, idempotence,
AI-neutral guidance, public documentation, and local and exact-commit consumer
exercise.

The final implementation revision
`b50493ddb42c87ed426eeb3bb11d3568652d8130` passed Github contract run
`30628878063` and consumer-adoption run `30628889305` without annotations.
Public commit `772d57370a094269ee1d9287ae871b0b3c7f64de` was freshly cloned and
matched all 28 staged files; both complete examples passed with zero
diagnostics. Those observations remain external Evidence. [ADR 0068](../../decisions/0068-confirm-initial-greenfield-onboarding.md) supplies
the separate exact-byte confirmation act.

The completed self-host state contains 103 record declarations, 60 explicit
non-record sources, and 119 governed artifacts. Agent SDK was inspected,
found qualitatively outside the accepted greenfield boundary because of its
mature lifecycle history, and left unchanged. [`NKF-014`](../deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) retains brownfield,
source reconstruction, resumability, and advanced recovery behind the same
resolved-plan application seam. [`NKF-012`](../deferred/NKF-012-activate-protected-merge-gate.md) separately retains protected merge
enforcement.

No NKF 0.1 normative authority, Schema, checker byte, or native release archive
changed. The successor adopter remains a separately digest-bound derived
artifact. Validation and publication establish observations, not acceptance,
consumer meaning, Realization confirmation, or Governing Use readiness.

Execution Plan step 9 therefore did not trigger a new native release: none of
its governed inputs changed. The separately digest-bound adopter and public
projection were published and freshly verified as derived distribution
surfaces under [ADR 0067](../../decisions/0067-initial-greenfield-onboarding.md); they are not a replacement native NKF 0.1 archive.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
