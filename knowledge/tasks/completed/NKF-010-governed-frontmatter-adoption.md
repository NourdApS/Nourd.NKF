---
title: "NKF-010: Adopt Governed Frontmatter"
summary: Make frontmatter an immediately useful, governed document-orientation boundary in NKF 0.1 and migrate the NKF repository to that boundary without weakening Markdown authority, Evidence preservation, lifecycle vocabulary, source binding, or conformance integrity.
created_at: 2026-07-30T19:47:30Z
task_id: NKF-010
task_status: completed
---

# NKF-010: Adopt Governed Frontmatter

- **Status:** Completed
- **Completed At:** `2026-07-30T20:34:28Z`
- **Owner:** Nourd ApS
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Authority Boundary:** The Human Product Owner has accepted the frontmatter
  direction. This Task authorizes its governed definition and realization but
  does not let validation accept semantic meaning or confirm implementation by
  implication.

## Purpose

Make frontmatter an immediately useful, governed document-orientation
boundary in NKF 0.1 and migrate the NKF repository to that boundary without
weakening Markdown authority, Evidence preservation, lifecycle vocabulary,
source binding, or conformance integrity.

## Accepted Direction

Every non-Evidence Markdown document must expose basic human orientation at
the top of the source. Frontmatter provides document identity, a concise
summary, creation provenance, and applicable lifecycle state. NKF validates
frontmatter against the CommonMark body and the `.nourd` representation so
those representations cannot silently diverge.

Evidence remains excluded so preserved source bytes, historical structure,
and original precision are not rewritten.

## Requirements

1. Define one exact common frontmatter field set for every non-Evidence
   Markdown document.
2. Define record-source identity fields and require exact agreement with the
   `.nourd` declaration and Markdown H1.
3. Define type-specific lifecycle and provenance fields without collapsing
   Task status, Design disposition, record governance for Decisions and
   Specifications, or Realization confirmation into one ambiguous status
   vocabulary.
4. Preserve the CommonMark body as the owner of substantive canonical human
   meaning while governing frontmatter as document-orientation metadata.
5. Keep `created_at` as an RFC 3339 UTC timestamp with `Z`; do not introduce a
   generic `updated_at`.
6. Require safe YAML and fail closed for missing, unsupported, malformed,
   inconsistent, or semantically invalid governed fields.
7. Migrate every eligible NKF knowledge document and synchronize every
   affected record declaration and governed-artifact binding.
8. Update the NKF 0.1 Markdown Specification, executable YAML companion,
   checker, schemas, fixtures, tests, and Realization knowledge coherently.
9. Preserve accepted predecessor revisions through Decisions, Evidence, and
   Git history rather than treating the migration as cosmetic formatting.
10. Perform a separate, adversarial completion audit after implementation and
    retain it as Evidence.

## AI Execution Plan

- **Recorded At:** `2026-07-30T19:47:30Z`
- **Scope:** Complete the accepted frontmatter adoption in the independent NKF
  repository, including normative authority, executable realization,
  self-migration, validation, confirmation, and separate audit.
- **Authority Effect:** Designs remain proposals, Decisions adopt or reject
  directions, Specifications own current normative meaning, Realizations
  describe implementation, and Validation evaluates a snapshot.

### Plan

1. Inspect current frontmatter authority, declarations, checker behavior,
   schemas, fixtures, knowledge topology, and immutable source bindings.
2. Write the exact frontmatter Design, including common fields, record
   identity synchronization, type-specific lifecycle fields, Evidence
   exclusion, compatibility, diagnostics, and migration behavior.
3. Independently review the Design and record the adopting Decision.
4. Update the canonical NKF 0.1 Markdown Specification and executable YAML
   companion as one digest-bound authority pair.
5. Update checker behavior, diagnostics, source-bound Schemas, fixtures, and
   tests from the accepted meaning.
6. Migrate all eligible NKF Markdown, synchronize declarations and artifact
   digests, and update the consolidated Realization view.
7. Run type checking, tests, deterministic build verification, full bundle
   validation, coverage checks, digest checks, and lifecycle checks.
8. Perform a separate requirement-by-requirement audit from current evidence,
   preserve the audit, repair every material finding, and repeat verification.
9. Record exact Realization confirmation and Task completion without treating
   checker success as acceptance or confirmation.
10. Commit the coherent, audited successor realization after verifying the
    independent repository boundary.

## Acceptance Criteria

- The exact frontmatter semantics are accepted in NKF 0.1 Markdown and its
  executable YAML companion.
- Every non-Evidence Markdown file in this repository conforms to the accepted
  common and applicable type-specific frontmatter rules.
- Every affected `.nourd` declaration matches its source and contains the
  current digest.
- The checker rejects all specified missing, malformed, inconsistent, and
  unsupported cases with stable diagnostics.
- Valid and invalid fixtures cover records, non-records, lifecycle metadata,
  identity synchronization, UTC time, and Evidence exclusion.
- All source-bound Schemas and governed artifacts bind to the current accepted
  authority pair.
- The current-system Realization accurately describes the implemented
  boundary and confirmation state.
- A separately authored audit proves the requirements against the final
  current snapshot and records no unresolved material finding.
- Full validation passes without supplying semantic acceptance or Realization
  confirmation.

## Guardrails

- Do not rewrite Evidence to satisfy current authoring conventions.
- Do not silently infer identity, lifecycle, provenance, acceptance,
  confirmation, or semantic accuracy from paths, Git state, or passing checks.
- Do not create a second NKF version or a sub-versioned frontmatter contract.
- Do not make `.nourd` or the checker a competing source of canonical human
  meaning.
- Do not let a generic status field erase the distinct meanings of lifecycle
  concepts.
- Do not claim that a present `summary` proves semantic adequacy.

## Completion

ADR 0058 accepts the governed-frontmatter authority pair. ADR 0059 confirms
the exact current Realization revisions under delegated authority. The
separate NKF-010 audit preserves the findings corrected during both the
candidate and post-confirmation passes.

The canonical contract, executable companion, Schemas, checker, fixtures,
knowledge sources, declarations, governed artifacts, and consolidated current
system are synchronized. Full validation and all 102 tests pass without
treating conformance as acceptance or confirmation.
