# ADR 0012: Reconcile single-version artifact authority

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 29 July 2026
- **Accepted:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003 discussion
  on 29 July 2026

## Context

ADR 0009 establishes exactly one NKF version namespace: the format version.
ADR 0007 otherwise preserves the correct Markdown-over-YAML authority model,
but contains earlier requirements for independently versioned contract-set,
bundle, record, body, and extension identities.

## Decision

`nkf_version` is NKF's only version coordinate.

ADR 0007's complete Markdown/YAML authority pair, exact source and digest
binding, fail-closed conflict handling, and derived-artifact rules remain
accepted.

Its independent contract-version requirements are superseded:

- `nkf.contract-set`, `nkf.bundle`, `nkf.record`, and body or extension
  identities do not have independent version suffixes;
- the YAML contract set identifies the exact NKF version it realizes; and
- every derived or released artifact identifies `nkf_version`, the exact YAML
  digest, and the bound Markdown digest and revision.

An artifact digest identifies an exact revision. It is not another semantic
version namespace.

## Compatibility and authority

This Decision changes no NKF 0.1 Product meaning, responsibility vocabulary,
declaration structure, or conformance intent. Historical `/v1` and `/v2`
identities remain evidence only and are not current NKF support.

ADRs 0007 and 0009 remain immutable historical snapshots. This later Decision
governs where their version language conflicts.

## Not decided

This Decision does not accept corrected Markdown or YAML bytes, schemas,
checker behavior, fixtures, distribution, a release, or consumer conformance.
