---
id: adr-0048
type: decision
summary: ADRs 0042 through 0045 accept the NKF 0.1 release boundary and exact authority. ADR 0046 confirms the four release-package schemas while preserving the three-schema project-validation boundary. ADR 0047 confirms the checker source and portable artifact. The remaining approved work was to realize and audit the deterministic package and bootstrap verifier without publishing it.
created_at: 2026-07-30T10:04:40Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer acting under explicit Human
---

# ADR 0048: Confirm Initial Release Package Realization

  Product Owner delegation
- **Release Source Checkpoint:**
  `50fbc53c7ec1022598029780b5159d5a91c4a087`

## Context

ADRs 0042 through 0045 accept the NKF 0.1 release boundary and exact authority.
ADR 0046 confirms the four release-package schemas while preserving the
three-schema project-validation boundary. ADR 0047 confirms the checker source
and portable artifact. The remaining approved work was to realize and audit
the deterministic package and bootstrap verifier without publishing it.

## Confirmed Realization

The release source checkpoint implements:

- construction and strict validation of the closed six-field release manifest;
- two-space, LF-terminated canonical JSON serialization;
- deterministic uncompressed USTAR assembly with the exact eight files,
  ordering, modes, headers, padding, and final blocks;
- independent archive-pin verification before any manifest or checker trust;
- strict JSON parsing with duplicate-key rejection;
- bootstrap contract, version, release-schema, and Decision-ID/path checks;
- release-schema compilation and closed manifest validation;
- verification of every manifest-bound artifact digest;
- optional Git source-provenance verification; and
- checker invocation only from a verified in-memory-inspected distribution.

The packager fails unless it starts and finishes checks at one clean unchanged
Git commit, reproduces the confirmed checker twice, verifies ADR 0047 and all
accepted artifact digests, reproduces the archive twice, verifies the completed
archive, and runs its checker successfully against the accepted valid fixture.

## Audit Evidence

Two independent clean invocations from the release source checkpoint produced
byte-identical archives:

| Property | Confirmed Value |
| --- | --- |
| Archive SHA-256 | `c8d0df6e68889d5be0c4ca9e215188748d28399f10d10d03728d0561eaf86b4d` |
| Archive size | `1159680` bytes |
| Asset name | `nourd-nkf-sha256-c8d0df6e68889d5be0c4ca9e215188748d28399f10d10d03728d0561eaf86b4d.tar` |
| Derived tag | `release-sha256-c8d0df6e68889d5be0c4ca9e215188748d28399f10d10d03728d0561eaf86b4d` |
| Release manifest SHA-256 | `83dec5311486ac14ffa095affaa40e5374d7871bc804824c37c2c82dd124a1d6` |
| Checker SHA-256 | `f71226e5f632cdd0918a0eedae1cbbc5d5f17b450395d98e744ae572dfd73579` |

Each clean invocation passed strict type-checking, 81 tests in 13 files, three
checker builds with identical confirmed bytes, source-provenance verification,
archive inspection, manifest and artifact verification, and full-bundle
checker execution from the verified archive.

Focused tooling tests additionally reject an incorrect independent pin,
duplicate JSON keys, non-JSON values, noncanonical manifest bytes, mismatched
Decision identity and path, content-padding changes, and 15 unsafe or
noncanonical USTAR mutations.

## Decision

The source checkpoint, archive digest, and artifact identities above are
confirmed as the exact initial NKF 0.1 release-package Realization.

This confirmation does not make the temporary local audit archive a published
release. The same bytes are reproducible from the source checkpoint.

## Non-Claims

This Decision does not:

- create or push the derived tag;
- upload an asset or create, publish, or make immutable a Github Release;
- establish public distribution, installation UX, support, licensing,
  continuous integration, or security-response policy;
- migrate a consumer or establish consumer conformance; or
- treat release verification as an NKF validation or acceptance result.
