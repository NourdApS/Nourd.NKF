---
id: nkf-self-hosting
type: realization
title: NKF Self-Hosting
summary: This Realization describes how the NKF repository represents and validates its own knowledge as an NKF 0.1 Technology bundle.
created_at: 2026-07-30T17:16:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
confirmation_status: confirmed
confirmation_decisions:
  - adr-0059
---

# NKF Self-Hosting

## Realization Identity And Kind

This Realization describes how the NKF repository represents and validates
its own knowledge as an NKF 0.1 Technology bundle.

## Governed Meaning Realized

The project-root `.nourd` directory is fixed. Its bundle selects
`nkf.profile.technology` and points to the project-contained `knowledge`
directory. Every Markdown file under that knowledge root must have exactly
one record declaration or explicit non-record entry.

The repository root represents NKF as a Technology, not as a Product or a
selectable General profile.

## Durable Mapping

The bundle is `.nourd/knowledge/bundle.yaml`; record declarations are direct
`.yaml` children of `.nourd/knowledge/records/`; the latest result is
`.nourd/validation-result.json`.

ADR 0059 confirms the current self-host structure after NKF-010. It preserves
stable record IDs, adds governed orientation to every non-Evidence source,
classifies operational Tasks and Evidence explicitly as non-record kinds, and
binds exact source and governed-artifact digests.

After ADR 0059, the bundle contains 88 explicit records, 46 explicit
non-record Markdown entries, and 62 governed artifacts. Every Markdown file
under `knowledge` is represented exactly once.

## Responsibilities And Ownership Boundaries

Human-reviewed Markdown remains canonical. `.nourd` represents exact sources,
section responsibilities, relationships, provenance, and artifacts without
inferring them from filenames or directories. Frontmatter exposes bounded
orientation and exact declared governance; equality is enforced without
creating conflict precedence.

The earlier declaration generator used filename and keyword heuristics that
could infer acceptance or semantic mappings. It has been retired. Current
declarations are explicit and reviewed.

## Interfaces Dependencies Locators And Resolution

The checker discovers all recursive `.md` paths under `knowledge`, resolves
record source paths relative to that root, and compares them with record and
non-record representations. Technology governed artifacts resolve relative to
the project root and bind to exact Realization sections.

Symlinks remain generally prohibited by project policy; the native checker
applies its accepted deterministic path and portability diagnostics.

## External Authority And Operational State Boundaries

Self-hosting validates the repository snapshot only. It does not accept NKF,
confirm the implementation, publish a release, describe remote Git state, or
migrate consumers.

The persisted result is latest-run state rather than historical knowledge.
Only the latest current result belongs in `.nourd`; historical audit evidence
belongs under `knowledge/evidence/`.

## Compatibility Verification And Recovery

Exact Markdown coverage, source digests, section mappings, Technology
hierarchy, artifact bindings, frontmatter applicability and references,
active links, symlink policy, full checker tests, deterministic build
verification, and full-bundle validation pass. Byte-preserved historical
Evidence may retain predecessor-location links without becoming current
navigation or requiring current orientation.

The latest persisted result is the current full-bundle observation after ADR
0059. It establishes conformance for that snapshot only. Recovery uses
predecessor declarations in Git and the explicit migration manifest rather
than regenerating semantic content heuristically.
