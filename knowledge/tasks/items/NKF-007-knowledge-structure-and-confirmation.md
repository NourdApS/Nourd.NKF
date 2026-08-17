---
title: "NKF-007: Repair Knowledge Structure And Confirmation"
summary: "Repair the fundamental knowledge-model, navigation, lifecycle, metadata, and confirmation problems identified after the whole-repository NKF audit before returning to its individual implementation findings. The central knowledge gap is an incomplete Realization boundary: NKF does not yet provide one complete, consolidated, and navigable view of the system as it is currently implemented."
created_at: 2026-07-30T15:52:40Z
task_id: NKF-007
task_status: completed
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-007: Repair Knowledge Structure And Confirmation

- **Authority Boundary:** This Task authorizes work but does not accept
  Design directions, normative meaning, or Realization confirmation.

## Purpose

Repair the fundamental knowledge-model, navigation, lifecycle, metadata, and
confirmation problems identified after the whole-repository NKF audit before
returning to its individual implementation findings. The central knowledge
gap is an incomplete Realization boundary: NKF does not yet provide one
complete, consolidated, and navigable view of the system as it is currently
implemented.

## Problem List

1. NKF Realization knowledge lacks a complete, consolidated, and navigable
   current-system view.
2. Agents must currently reconstruct the present system from too much
   historical knowledge instead of beginning from a trustworthy current
   technical baseline.
3. The flat knowledge structure is difficult for humans to navigate and read.
4. Designs do not consistently declare a disposition. Existing descriptions
   use terms such as active, accepted, resolved, rejected, superseded, and
   abandoned without distinguishing Design disposition from record authority
   state or an index grouping.
5. Decision and Design filenames do not provide a sufficiently clear,
   consistent, and concise naming convention.
6. Non-Evidence Markdown requires human-readable front matter with a
   `created_at` timestamp, independently of its `.nourd` declaration.
7. Structured NKF dates require time and UTC rather than date-only values.
8. Evidence records and preserved evidence artifacts are exempt from the
   front-matter and timestamp-normalization rule so their original structure,
   bytes, and precision can remain intact.
9. Confirmation needs an efficient current-system-view-first audit path with
   selective Decision provenance, Realization bindings, and adversarial
   review instead of routine reconstruction from every historical document.

## Clarified Knowledge Lifecycle

NKF-007 uses this lifecycle:

```text
Task → Design → Decision → Specification → Realization → Validation
```

- A **Task** owns the work intent, constraints, acceptance criteria, and
  execution plan.
- A **Design** is a proposal that presents alternatives and trade-offs.
- A **Decision** records why a direction was adopted, rejected, or
  superseded.
- A **Specification** defines current normative meaning.
- A **Realization** describes how that normative meaning is currently
  implemented.
- **Validation** evaluates a particular system snapshot.

The Current System Model is not a separate layer, lifecycle stage, or
authority between Decisions and Realizations. It is a consolidated view within
Realization knowledge.

## Current-System View Boundary

The consolidated Current System Model within Realization knowledge must
provide a navigable account of the current:

- architecture and topology;
- components and relationships;
- interfaces;
- mappings from Specifications to implementation artifacts;
- implementation status;
- confirmation status; and
- relevant Decision provenance.

Specifications remain authoritative for current normative meaning. The
consolidated Realization view must not compete with them, accept meaning, or
own live operational state. Validation remains an evaluation of a particular
system snapshot and must not be collapsed into the durable current-system
view.

Agents should begin system review and audit from the consolidated Realization
view. They should follow Decisions when provenance or accepted reasoning is
needed and follow Designs selectively when alternatives, trade-offs, or
historical reasoning are relevant. They should not routinely reconstruct the
current system by reading every historical document.

## Design Disposition

Every Design must declare exactly one explicit disposition:

1. **Active** — the proposal remains under consideration.
2. **Adopted** — an explicit Decision adopted the proposed direction.
3. **Rejected** — an explicit Decision declined the proposed direction.
4. **Superseded** — a later Design or Decision replaced the proposal.
5. **Withdrawn** — the proposal owner or governing Task explicitly stopped
   consideration without a Decision adopting or rejecting its direction.

A Design remains proposal knowledge. It is never current authority merely
because it exists, has an Adopted disposition, or has been implemented.
Current normative meaning belongs to Specifications, and current
implementation knowledge belongs to Realizations.

`accepted` is not a Design disposition. It remains an NKF record authority
state and describes acceptance of an exact record revision. `Adopted`
describes that a Decision selected the direction proposed by a Design and
requires Decision provenance.

`resolved` is not a Design disposition. It is a derived navigation grouping
for Designs whose disposition is Adopted, Rejected, Superseded, or Withdrawn.

`abandoned` is not a Design disposition because it does not establish who
stopped the work or whether the proposal was rejected. An explicit,
provenance-bound withdrawal is represented as Withdrawn.

Adopted and Rejected dispositions must identify their governing Decision.
Superseded must identify the replacement and relevant Decision provenance.
Withdrawn must identify the explicit withdrawal provenance. Historical
wording must not be normalized without that evidence; an unresolved migration
classification is a defect to repair, not a sixth Design disposition.

Design disposition is distinct from the native record governance fields
`lifecycle: living | immutable` and
`status: draft | accepted | superseded | retired`. [ADR 0056](../../decisions/0056-design-direction-and-record-authority.md) establishes that
the axes are independent: disposition never determines record authority.
Exact acceptance, supersession, or retirement provenance governs the record
state.

## Execution Plan

1. Preserve the completed whole-repository audit as non-authoritative Evidence.
2. Record the Human Product Owner's clarified lifecycle and the
   Realization-contained Current System Model boundary in this Task.
3. Define the structure and required content of the complete, consolidated,
   and navigable current-system view within Realization knowledge.
4. Define a human-navigable knowledge information architecture and stable
   naming convention.
5. Inventory existing Design descriptions and classify every Design and
   associated non-Markdown artifact using Active, Adopted, Rejected,
   Superseded, or Withdrawn. Treat `resolved` only as a derived grouping,
   reserve `accepted` for record authority state, and require evidence before
   normalizing historical `abandoned` wording to Withdrawn.
6. Define exact front-matter, creation-time, UTC timestamp, Evidence-exemption,
   and migration rules.
7. Define how NKF validates lifecycle structure, Design disposition, and the
   consolidated Realization view without claiming semantic quality, current
   operational state, or acceptance.
8. Only after those boundaries are accepted, return to the preserved audit
   findings and repair them through the governed process.

## AI Execution Slice: Inventory And Target Structure

- **Recorded At:** `2026-07-30T16:27:13Z`
- **Scope:** Audit the current repository, reconcile [NKF-003](NKF-003-independent-nkf-authority.md) closure, define
  the exact target knowledge architecture, and prepare a reviewed migration
  before moving or renaming current documents
- **Authority Effect:** Inventory results are Evidence. Target structure and
  migration meaning require an explicit Decision before realization.

### Plan

1. Inventory every knowledge file, declaration, Task state, Design
   disposition, structured date, link, filename, and Realization gap.
2. Separate completed [NKF-003](NKF-003-independent-nkf-authority.md) outcomes from work that must transfer to
   NKF-007, another deferred Task, or a future publication and
   consumer-onboarding Task.
3. Design a lifecycle-based information architecture that keeps current
   normative meaning in Specifications and the consolidated current-system
   view in Realizations.
4. Define stable filename, front-matter, UTC timestamp, Design disposition,
   immutable-record migration, Evidence preservation, and link-repair rules.
5. Independently review the exact target map and provenance before accepting
   a migration Decision.
6. Only after that review, move and rename current documents, create the
   missing Realization knowledge, rebuild declarations without semantic or
   acceptance inference, and validate the repository.
7. Stop before expanding NKF rule enforcement, CI enforcement, publication,
   deployment, or external-consumer migration.

### Baseline Evidence

The independently inspected pre-migration state is preserved in
[`../evidence/nkf-007-current-structure-inventory.md`](../../evidence/audits/nkf-007-current-structure-inventory.md).

## Guardrails

- Do not move, rename, reclassify, accept, supersede, or delete existing
  knowledge merely to make the repository look cleaner.
- Do not introduce the Current System Model as a separate knowledge layer,
  lifecycle stage, or authority.
- Do not turn the consolidated Realization view into live operational state,
  normative meaning, or a generated summary with competing authority.
- Do not infer Design disposition from directory location, filename, checker
  output, or the existence of an ADR.
- Do not treat a Design as current authority merely because it exists, has
  been implemented, or is linked to an accepted Decision.
- Do not fabricate creation or acceptance timestamps.
- Do not weaken immutable Evidence or source provenance to satisfy new
  authoring rules.
- Keep acceptance, confirmed Realization, conformance, and current operational
  validation state distinct.

## Evidence

The pre-remediation repository audit is preserved in
[`../evidence/pre-remediation-repository-audit.md`](../../evidence/audits/pre-remediation-repository-audit.md).

## Completion

- **Completed At:** `2026-07-30T17:45:47Z`
- **Confirmation Decision:** [`ADR 0057`](../../decisions/0057-current-system-realization.md)

NKF-007 completed the accepted knowledge migration, explicit Design
dispositions, subject-based filenames, front-matter boundary, consolidated
current-system Realization, supporting Realizations, explicit self-host
declarations, Schema and checker rebinding, full repository audit, and final
Realization confirmation.

The final full-bundle result is a separate conformance observation. It does
not supply the acceptance or confirmation recorded by [ADR 0057](../../decisions/0057-current-system-realization.md).

Publication and external-consumer onboarding remain with [NKF-008](NKF-008-publish-and-onboard-consumers.md). Broad
governed-artifact secret scanning remains with [NKF-009](../deferred/NKF-009-governed-artifact-secret-scanning.md). [NKF-004](../deferred/NKF-004-portable-presentation-guidance.md), [NKF-005](../deferred/NKF-005-validation-expiry-and-authority-freshness.md), and
[NKF-006](../deferred/NKF-006-extensible-root-models.md) retain their previously deferred scopes.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
