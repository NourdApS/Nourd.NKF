---
created_at: 2026-07-30T15:52:40Z
---

# NKF-007: Repair Knowledge Structure And Confirmation

- **Status:** Active
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Authority Effect:** None until exact changes are separately accepted

## Purpose

Repair the fundamental knowledge-model, navigation, lifecycle, metadata, and
confirmation problems identified after the whole-repository NKF audit before
returning to its individual implementation findings.

## Problem List

1. NKF lacks a consolidated Current System Model between accepted Decisions
   and their Realizations.
2. Agents must currently reconstruct the present system from too much
   historical knowledge instead of beginning from a trustworthy current
   technical baseline.
3. The flat knowledge structure is difficult for humans to navigate and read.
4. Design proposals, resolved inputs, accepted Designs, superseded material,
   and historical artifacts are not clearly separated.
5. Decision and Design filenames do not provide a sufficiently clear,
   consistent, and concise naming convention.
6. Non-Evidence Markdown requires human-readable front matter with a
   `created_at` timestamp, independently of its `.nourd` declaration.
7. Structured NKF dates require time and UTC rather than date-only values.
8. Evidence records and preserved evidence artifacts are exempt from the
   front-matter and timestamp-normalization rule so their original structure,
   bytes, and precision can remain intact.
9. Confirmation needs an efficient current-model-first audit path with
   selective Decision provenance, Realization bindings, and adversarial
   review instead of routine reconstruction from every historical document.

## Initial Plan

1. Preserve the completed whole-repository audit as non-authoritative Evidence.
2. Review and correct this short problem list with the Human Product Owner.
3. Define the Current System Model boundary and its relationship to
   Specifications, Decisions, Designs, and Realizations.
4. Define a human-navigable knowledge information architecture and stable
   naming convention.
5. Classify every existing Design and associated non-Markdown artifact by its
   real disposition.
6. Define exact front-matter, creation-time, UTC timestamp, Evidence-exemption,
   and migration rules.
7. Define how NKF validates the new model without claiming semantic quality or
   live operational state.
8. Only after those boundaries are accepted, return to the preserved audit
   findings and repair them through the governed process.

## Guardrails

- Do not move, rename, reclassify, accept, supersede, or delete existing
  knowledge merely to make the repository look cleaner.
- Do not turn the Current System Model into operational state or a generated
  summary with competing authority.
- Do not infer Design disposition from directory location, filename, checker
  output, or the existence of an ADR.
- Do not fabricate creation or acceptance timestamps.
- Do not weaken immutable Evidence or source provenance to satisfy new
  authoring rules.
- Keep acceptance, confirmed Realization, conformance, and current operational
  validation state distinct.

## Evidence

The pre-remediation repository audit is preserved in
[`../evidence/nkf-pre-remediation-repository-audit.md`](../evidence/nkf-pre-remediation-repository-audit.md).
