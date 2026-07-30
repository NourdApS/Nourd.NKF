# NKF-007 Current Structure Inventory

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T16:27:13Z`
- **Repository Checkpoint:** `38cb734e143580d360b8ff78b316fb58451ef071`
- **Reviewer:** Codex
- **Authority Effect:** None

## Purpose

This Evidence records the independently inspected NKF repository state before
NKF-007 defines or executes a knowledge-structure migration. It separates
observed facts from target-model decisions. It does not accept a structure,
rename a record, close a Task, confirm a Realization, or establish
conformance.

## Repository Boundary

The inspected Git top level was
`/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format`.
Both `origin` directions resolved to
`https://github.com/kaveh6202/Nourd.NKF.git`. The current branch was `master`.
The worktree differed from checkpoint `38cb734` only through the active
NKF-007 clarification.

## Corpus Inventory

The `knowledge/` tree contained 157 files:

| Location | Files |
| --- | ---: |
| Root Markdown | 2 |
| Decisions | 53 |
| Designs and associated proposal artifacts | 61 |
| Evidence | 32 |
| Realizations | 2 |
| Specifications | 2 |
| Tasks | 5 |

The tree contained 105 Markdown files, 31 JSON files, 11 YAML files, nine
TypeScript files, and one JavaScript module. The 61 Design-area files comprised
30 Markdown documents, 24 JSON artifacts, and seven YAML artifacts.

No symlink existed under `knowledge/` or `.nourd/`.

## Task State

Two Tasks were marked Active:

- `NKF-003`, containing 2,400-plus lines of accumulated authority,
  specification, realization, release, dynamic-root, and self-hosting
  execution history; and
- `NKF-007`, owning the current knowledge-structure and confirmation repair.

NKF-004, NKF-005, and NKF-006 were explicitly Deferred.

NKF-003 still stated external consumer migration, authority handover, and
publication-oriented work that had not been completed. Its independent
authority, current NKF 0.1 contract, local release package, Product and
Technology profiles, and initial self-hosting realization had been completed.
A truthful close therefore requires explicit transfer or deferral of every
remaining obligation rather than only changing its status label.

## Navigation And Organization

The root knowledge index attempted to narrate the current system by walking
ADRs 0001 through 0052. The Decision index likewise exposed a chronological
table of all 52 Decisions. These indexes preserve provenance but require
history-first reading and do not provide a consolidated current-system entry
point.

The Designs index grouped most material under `Resolved proposals`, but the
directory remained flat and mixed:

- active or adopted Design prose;
- superseded exact specification proposals;
- gap and implementation-finding records;
- historical JSON Schema proposals;
- historical executable YAML proposals; and
- one example validation result.

The index's `Active Proposals` section also discussed already accepted or
confirmed work. Directory position and current header wording therefore could
not be trusted as Design disposition.

Only one substantive Realization document existed:
`knowledge/realizations/nkf-0.1-native-realization.md`. It described the native
realization at a high level but did not consolidate the current architecture,
topology, components, relationships, interfaces, artifact mappings,
implementation status, confirmation status, and Decision provenance required
by NKF-007.

## Naming

All 52 Decision filenames began with a procedural verb after their numeric
identifier:

| Verb | Files |
| --- | ---: |
| `accept` | 24 |
| `establish` | 11 |
| `confirm` | 11 |
| `reconcile` | 2 |
| `introduce` | 1 |
| `correct` | 1 |
| `clarify` | 1 |
| `govern` | 1 |

Design filenames repeated repository and version context inconsistently,
mixed proposal and realization terminology, and encoded temporary process
states such as replacement, pre-checker, findings-resolved, and
schema-status-reconciled.

## Front Matter And Dates

There were 94 non-Evidence Markdown files. Only NKF-007 began with front
matter and a `created_at` UTC timestamp. The other 93 did not have front
matter.

Every one of the 94 non-Evidence Markdown paths had an exact earliest Git
introduction timestamp. Those timestamps provide non-fabricated migration
evidence for `created_at`; they do not claim that Git introduction equals the
original authoring or acceptance event.

Many Decisions, Designs, Specifications, and NKF-003 execution slices used
date-only structured fields such as `Proposed`, `Accepted`, `Prepared`,
`Recorded`, and `Revised`. Exact times for all of those historical semantic
events were not present in the documents. NKF-007 must not manufacture them:
an unsupported structured event timestamp must be omitted, linked to
preserved Evidence, or recorded with an explicitly evidenced timestamp.

Evidence and immutable source snapshots remain exempt from front-matter and
timestamp normalization so their original bytes and date precision are not
changed.

## Links

A CommonMark parse found no unresolved relative file link outside Evidence.
Six unresolved relative links existed only inside the deliberately partial,
immutable Nourd Studio source snapshots. They are preserved source
limitations rather than active navigation defects.

## NKF Representation

The project-root `.nourd` bundle represented 103 of the 105 Markdown files:

- 85 record declarations;
- 18 explicit non-record entries;
- no duplicate representation; and
- no representation pointing to a missing Markdown file.

The two unrepresented files were:

- `knowledge/evidence/nkf-pre-remediation-repository-audit.md`; and
- `knowledge/tasks/NKF-007-repair-knowledge-structure-and-confirmation.md`.

The existing declaration generator classified all Decision filenames as
accepted records and assigned semantic responsibilities through heading
keyword scoring. The prior audit demonstrated that those mechanisms infer
acceptance and produce materially incorrect semantic mappings. NKF-007 must
not use that generator to establish the migrated bundle's meaning.

## Technical Baseline

At the inspected worktree:

- TypeScript type checking passed.
- The portable build completed.
- Build-integrity verification reproduced checker digest
  `9d7f63778c8794ef5326b4704d0daac5c6eac7e65c5df17bd4c95d19d1fd8f57`.
- Fourteen of 15 test files passed.
- Eighty-nine of 90 tests passed.
- The sole failing test was repository self-hosting.
- A non-persisting full-bundle validation selected
  `nkf.profile.technology`, verified the canonical contract artifacts, and
  failed only the project phase with two
  `knowledge.markdown.unrepresented` diagnostics for the files listed above.

These results establish the exact pre-migration mechanical baseline. They do
not prove semantic adequacy, acceptance, confirmed Realization, or eventual
post-migration conformance.

## Required Next Decision

Before moving current documents, NKF-007 must define and independently review:

1. the target lifecycle-based information architecture;
2. concise stable filename conventions;
3. Design disposition and provenance semantics;
4. evidence-backed front-matter and UTC timestamp migration;
5. NKF-003 closure and remaining-work transfer;
6. the consolidated current-system Realization structure;
7. preservation rules for immutable Decisions and Evidence; and
8. a non-inferential method for rebuilding `.nourd`.
