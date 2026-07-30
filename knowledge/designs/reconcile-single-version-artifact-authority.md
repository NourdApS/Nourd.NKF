# Reconcile Single-Version Artifact Authority

- **Status:** Proposal
- **Task:** `NKF-003`
- **Prepared:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Authority effect:** None

## Problem

ADR 0009 establishes exactly one NKF version namespace: the format version,
currently `0.1`. ADR 0007 still requires independent versions for the YAML
contract set and each supported bundle, record, body, and extension contract.
Both cannot govern current NKF simultaneously.

## Proposed Reconciliation

Preserve ADR 0007's accepted authority model:

- canonical Markdown owns complete human-readable meaning;
- one complete YAML contract set is its executable companion;
- the pair is bound by exact paths, revisions, and digests;
- conflict fails closed and Markdown cannot be overridden by YAML; and
- schemas, checker tables, fixtures, and distributions are derived artifacts.

Supersede only ADR 0007's independent version-coordinate requirements:

- `nkf_version` is the only version coordinate;
- `nkf.contract-set`, `nkf.bundle`, `nkf.record`, and body/extension identities
  do not have independent version suffixes;
- the YAML contract set identifies the exact NKF version it realizes; and
- every derived or released artifact identifies `nkf_version`, the exact YAML
  digest, and the bound Markdown digest and revision.

An exact digest identifies an artifact revision. It is not another semantic
version namespace.

## Compatibility Effect

This correction does not change NKF 0.1 Product meaning, responsibility
vocabularies, declaration structure, or conformance intent. It removes an
internal governance contradiction and makes artifact pinning compatible with
ADR 0009.

Historical imported and superseded `/v1` and `/v2` identifiers remain evidence
only. They are not supported current NKF contracts.

## Exact Confirmation Requested

> Keep `nkf_version` as NKF's only version coordinate. Preserve ADR 0007's
> complete Markdown/YAML authority pair, but supersede its requirements for
> independent contract-set, bundle, record, body, and extension versions.
> Identify exact artifact revisions through NKF version plus Markdown/YAML
> paths, revisions, and digests. Require derived and released artifacts to bind
> that exact accepted pair.

Acceptance would resolve only this authority/version contradiction. It would
not accept corrected Markdown or YAML bytes, schemas, checker behavior,
fixtures, distribution, a release, or consumer conformance.

## Decision Outcome

The Human Product Owner accepted the exact reconciliation on 29 July 2026. The
immutable result is
[`ADR 0012`](../decisions/0012-reconcile-single-version-artifact-authority.md).
