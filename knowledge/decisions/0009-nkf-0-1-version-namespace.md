---
created_at: 2026-07-29T20:06:17Z
---

# ADR 0009: Establish The Single NKF 0.1 Version Namespace

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed clarification in the NKF-003
  discussion on 29 July 2026

## Context

Earlier migration decisions used independent versions in bundle, record, body,
and contract-set identifiers. The Human Product Owner clarified that this
creates an unwanted conceptual split between format and record-contract
versions.

## Decision

NKF has exactly one version namespace: the NKF format version. The current
format version is `0.1`.

The structure previously called `nkf.record/v2` is the sole record definition
of NKF 0.1. Canonical NKF 0.1 must not retain or introduce `nkf.record/v1`,
`nkf.record/v2`, or any other separately versioned bundle, record, body, or
contract-set identity. Its canonical identifiers are `nkf.bundle`,
`nkf.record`, `nkf.contract-set`, and the ten unversioned Product body
identifiers (`nkf.product` through `nkf.evidence`), all governed by
`nkf_version: "0.1"`.

The sole NKF 0.1 record definition includes the explicit section-local
`responsibilities` binding and required-coverage rules previously expressed as
the record-v2 structure. Those rules are not optional within NKF 0.1 native
declarations.

External systems using an older structure are legacy consumers. Their
historical formats remain provenance and may be inspected as evidence, but are
not supported parallel NKF contracts. They must deliberately onboard or migrate
to NKF 0.1; no automatic conversion or external migration is required or
authorized by this Decision.

## Supersession And Preservation

This Decision supersedes the versioned-contract identity and parallel-contract
model in ADR 0002, ADR 0003, ADR 0004, ADR 0005, and ADR 0008. It preserves
their accepted semantic content where not inconsistent with this Decision:

- responsibility identifiers and their Product meaning;
- section-local responsibility bindings and their deterministic conformance
  limit;
- Markdown authority and explicit, reviewed migration; and
- the canonical artifact paths.

The earlier Decisions, resolved designs, and imported Studio snapshots remain
immutable historical provenance. They are not current canonical NKF support
for a separate contract version.

## Consequences

- NKF 0.1 has one complete record definition and one version coordinate.
- A canonical YAML contract set represents NKF 0.1, rather than a matrix of
  separately versioned contracts.
- Checker and distribution work must identify `nkf_version: "0.1"` and must
  not dispatch historical record-contract versions as current NKF support.
- Any future semantic or structural change requires a later NKF format version
  under ADR 0006.

## Not Decided

This Decision does not accept the exact independent Markdown composite, YAML
contents or digest, schemas, checker behavior, fixture set, packaging, release,
or any consumer migration plan.
