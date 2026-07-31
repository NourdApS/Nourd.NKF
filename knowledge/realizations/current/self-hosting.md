---
id: nkf-self-hosting
type: realization
title: NKF Self-Hosting
summary: This Realization describes how the NKF repository represents and validates its own knowledge as an NKF 0.1 Technology bundle.
created_at: 2026-07-30T17:16:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
confirmation_status: confirmed
confirmation_decisions:
  - adr-0059
  - adr-0061
  - adr-0062
  - adr-0063
  - adr-0066
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

ADR 0060 adopts the layered enforcement direction. NKF-011 adds the neutral
authoring protocol, four instruction adapters, two byte-identical skill
representations, twelve surface registry entries, the adapter verifier, the
unified project command, negative tests, and the exact-commit workflow.
ADR 0061 confirms this exact audited local self-hosting successor. Remote
workflow activation was then observed successfully and its current
protection limit recorded as remote Evidence. ADR 0062 confirms the exact
successor Realization account without claiming that the protected gate exists.
ADR 0063 completes NKF-011 for that delivered enforcement scope and transfers
protected-gate activation and proof to deferred NKF-012.

NKF-008 adds its adopted Design, Decisions, current Realization, audit
Evidence, release rebinding, adopter, public-documentation projection, focused
tests, and consumer exercise. The pre-closure candidate contained 98 record
declarations, 54 explicit non-record sources, and 95 governed artifacts. The
confirmed successor contains 99 record declarations, 57
explicit non-record sources, and 109 governed artifacts, including the
complete public Product and Technology example trees. Every Markdown file
under `knowledge` remains represented exactly once. ADR 0066 confirms the
successor after live publication and final audit.

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

Every applicable enforcement integration file is declared as a Technology
`governed_artifact` and bound to the Layered Contract Enforcement Realization.
The registry and verifier apply an additional fail-closed regular-file rule to
instruction adapters and portable skills.

Every applicable NKF-008 adopter source, deterministic build and verification
tool, public documentation source and mirror, focused test, and consumer
workflow is declared as a Technology `governed_artifact` and bound to the
Release Documentation And Adoption Realization.

## External Authority And Operational State Boundaries

Self-hosting validates the repository snapshot only. It does not accept NKF,
confirm the implementation, publish a release, infer remote Git or Github
state, activate branch protection, or migrate consumers. Remote workflow and
protection observations remain sourced from Github and retained as Evidence.
Deferred NKF-012 owns the unavailable required check, mandatory
pull-request approval, bypass policy, and blocked-invalid-candidate proof.

The persisted result is latest-run state rather than historical knowledge.
Only the latest current result belongs in `.nourd`; historical audit evidence
belongs under `knowledge/evidence/`.

## Compatibility Verification And Recovery

The two skill representations pass the bundled skill validator. The
agent-guidance verifier and eighteen focused positive and negative cases pass.
The canonical command passes type checking, eighteen test files with 126
tests, deterministic checker and adopter builds, verification of the
23-file public source projection and its two complete conformant example
projects, and final full-bundle validation. It exits nonzero when an
unrepresented Markdown source is introduced, independent of who produced
that candidate.

The separate
[NKF-011 Realization Audit](../../evidence/audits/nkf-011-layered-contract-enforcement-realization-audit.md)
records no unresolved material local-implementation finding. The latest
persisted result covers the new Governed Validation Inputs but remains a
conformance observation rather than the source of confirmation. ADR 0061
supplies the separate local confirmation act, and ADR 0062 confirms the exact
successor account of remote workflow activation and the protection blocker.
ADR 0063 confirms the successor Task allocation and current counts without
claiming protected enforcement.
The
[NKF-008 Completion Audit](../../evidence/audits/nkf-008-completion-audit.md)
records no unresolved material successor finding, and ADR 0066 confirms the
release, documentation, consumer, integration, and self-hosting account
without turning publication or conformance into confirmation.
Recovery uses predecessor declarations and reviewed artifact digests in Git
rather than regenerating semantic content heuristically.
