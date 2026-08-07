---
id: adr-0081
type: decision
title: "ADR 0081: Accept The NKF 0.2 Authority Pair"
summary: Accept the exact NKF 0.2 canonical Specification revision and its digest-bound executable companion after the Human Product Owner confirmed each difference from NKF 0.1 separately.
created_at: 2026-08-07T07:44:23Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0081: Accept The NKF 0.2 Authority Pair

## Context And Problem

[NKF-019](../tasks/active/NKF-019-decision-applicability-gate.md) produced the NKF 0.2 candidate authority pair realizing the adopted
Decision Applicability Gate direction together with the directed versioning,
process-boundary, and frontmatter corrections of ADRs 0076 through 0080. The
release protocol requires Human Product Owner acceptance of the exact pair
before any derived implementation, release, or adoption.

## Decision

On `2026-08-07`, after receiving a plain-language explanation of every
difference from NKF 0.1 and confirming each change separately — the required
Decision Applicability section with fail-closed completion; the five
validation levels and claim rules; the versioned-set and guidance-marker
rules; and the title-free dynamic frontmatter with the optional Task
orientation keys — the Human Product Owner accepted the exact NKF 0.2
authority pair:

- canonical Markdown `knowledge/specifications/nkf-0.2.md` with SHA-256
  `bac288b2299e2e3dc9f7eecf41158b2717b427d4ccc59842e4927b1b9f8b7317`; and
- executable companion `contracts/nkf/0.2/nkf.yaml` with SHA-256
  `3178dd061ab0e9e91f8cf46d3391b9f43fc6bda0f2f3eb4a6cb18c65e86e05bd`,
  binding that exact Markdown digest.

Those exact bytes are canonical NKF 0.2. The pair governs a repository only
when it deliberately declares `nkf_version` `0.2`. NKF 0.1 under [ADR 0073](0073-correct-portable-topology-diagnostic-registry.md)
remains immutable authority for repositories that declare NKF 0.1, including
this repository until it adopts 0.2.

## Scope And Applicability

This Decision performs the acceptance act for the exact revisions above and
nothing else. The derived Schemas remain candidates until the release
protocol's set derivation and confirmation complete.

## Rationale

Each consequential difference was confirmed one boundary at a time rather
than as one bulk approval, satisfying the one-boundary collaboration rule
and leaving explicit provenance for every 0.2 change.

## Alternatives Considered

Bulk acceptance of the whole candidate was set aside in favor of per-change
confirmation. Deferring acceptance until after implementation was rejected
because the release protocol derives implementation from accepted meaning,
not the reverse.

## Consequences And Trade-Offs

The release protocol may now proceed to set derivation: checker enforcement,
fixtures, tests, guidance, onboarding, and documentation for 0.2. Any later
change to the accepted pair, however small, is a new version. This
repository continues to validate as NKF 0.1 until it adopts 0.2 under the
adoption protocol.

## Non-Claims

This Decision does not:

- implement, validate, audit, or confirm any 0.2 artifact;
- release NKF 0.2 or produce its archive and manifest;
- migrate this repository or any consumer to 0.2; and
- alter NKF 0.1 or its authority for repositories that declare it.
