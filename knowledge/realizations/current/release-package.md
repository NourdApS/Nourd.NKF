---
id: nkf-release-package
type: realization
title: NKF Release Package
summary: This Realization describes the repository-owned build, archive, manifest, and verification tooling for a portable native NKF checker release.
created_at: 2026-07-30T17:16:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
confirmation_status: partially-confirmed
confirmation_decisions:
  - adr-0059
  - adr-0065
unconfirmed_scope: Successor package configuration and publication state remain unconfirmed until NKF-008 completes its release, consumer, and final audit.
---

# NKF Release Package

## Realization Identity And Kind

This Realization describes the repository-owned build, archive, manifest, and
verification tooling for a portable native NKF checker release.

## Governed Meaning Realized

The release contract defines one deterministic archive containing the checker
and exact accepted authority artifacts with integrity and source provenance.
A local archive or build is not a published release.

## Durable Mapping

`scripts/build.mjs` creates `dist/nourd-nkf-checker.mjs`.
`scripts/verify-build.mjs` checks deterministic build output.
`scripts/package-release.mjs`, `scripts/release/config.mjs`, and
`scripts/release/core.mjs` build the release archive and manifest.
`scripts/verify-release.mjs` independently verifies the archive.

ADR 0065 now binds the current release checker source checkpoint, executable
digest, normative Markdown, executable YAML, and four Schema digests.
`scripts/release/config.mjs` is rebound to those exact values.

The deterministic package mechanism confirmed by ADR 0059 remains unchanged.
The rebound configuration and later publication account remain unconfirmed
until NKF-008 builds and observes the successor release and completes its
final audit.

## Responsibilities And Ownership Boundaries

Build tooling owns reproducible artifact production. Verification tooling owns
mechanical integrity checks. Decisions own acceptance and confirmation.
Github owns hosted Release state, and consumers own their pinning and
migration.

Release tooling cannot convert an unconfirmed checker, stale authority
binding, local archive, tag, upload, or passing verification into a supported
release.

## Interfaces Dependencies Locators And Resolution

The package scripts read repository sources, accepted artifact digests,
checker-confirmation provenance, and the release-manifest Schema. The archive
contains portable relative paths and SHA-256 bindings. Runtime and archive
names are contract inputs.

No package-registry channel is selected. The native archive remains the
private Github prerelease distribution unit. The separate adopter and public
documentation projection are mapped by the Release Documentation And Adoption
Realization.

## External Authority And Operational State Boundaries

Remote tags, Github Releases, uploaded assets, immutability controls, registry
versions, download availability, and consumer pins remain operational state
in their authoritative systems. This Realization records the durable release
mechanism and its present confirmation boundary only.

## Compatibility Verification And Recovery

The current candidate must pass two-build reproducibility, manifest Schema
validation, archive path and digest checks, independent extraction
verification, and explicit publication observation from a clean exact source
commit before the successor package revision is confirmed.

Recovery rejects or removes a candidate artifact before publication and
rebuilds from the exact governed source commit. A published release is never
silently overwritten.
