---
created_at: 2026-07-30T17:16:33Z
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

The current release configuration is bound to the earlier ADR 0047 checker
confirmation and predecessor authority digests. It is not a current
distribution realization of the ADR 0056 authority pair. Publication and
consumer onboarding are deferred to NKF-008.

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

No package-registry channel is currently selected.

## External Authority And Operational State Boundaries

Remote tags, Github Releases, uploaded assets, immutability controls, registry
versions, download availability, and consumer pins remain operational state
in their authoritative systems. This Realization records the durable release
mechanism and its present confirmation boundary only.

## Compatibility Verification And Recovery

When NKF-008 is activated, release work must first rebind the package to a
confirmed current checker and authority pair, then pass two-build
reproducibility, manifest Schema validation, archive path and digest checks,
independent extraction verification, and explicit publication authorization.

Recovery rejects or removes a candidate artifact before publication and
rebuilds from the exact governed source commit. A published release is never
silently overwritten.
