---
id: adr-0047
type: decision
title: "ADR 0047: Confirm Release-Bound Checker Realization"
summary: ADR 0045 replaces the canonical NKF 0.1 authority pair and ADR 0046 confirms the exact source-bound schemas. The native project checker must bind the new pair and the three project schemas without treating release-package verification as project conformance.
created_at: 2026-07-30T09:52:27Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0047: Confirm Release-Bound Checker Realization

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer acting under explicit Human
  Product Owner delegation
- **Source Checkpoint:**
  `0fe4f0d4f7d6253cb39340c1e8e3b1d8c526da7f`

## Context

ADR 0045 replaces the canonical NKF 0.1 authority pair and ADR 0046 confirms
the exact source-bound schemas. The native project checker must bind the new
pair and the three project schemas without treating release-package
verification as project conformance.

## Confirmed Realization

The exact checker source at the source checkpoint:

- binds Markdown SHA-256
  `67beed2a380e719573175d3dfd70b05c59cbe51274c9975f863a58f7083ddba4`;
- binds executable YAML SHA-256
  `7a2489c3b81ef87e38913629c65f71b8b39e815d9b72efe81939c4500db3510b`;
- binds exactly the bundle, record, and validation-result schemas confirmed by
  ADR 0046;
- keeps `urn:nkf:0.1:schema:release-manifest` outside project contract loading,
  Governed Validation Inputs, validation-result contract artifacts, and
  project conformance; and
- tests the release-manifest schema separately as release-package
  enforcement.

## Verification

From the exact source checkpoint under Node 22:

- strict TypeScript checking passed;
- 76 tests in 12 files passed;
- all 115 project diagnostic rules retained Markdown/YAML severity parity;
- all 41 governed headings retained Unicode 17 Title Case;
- all four schemas compiled strictly;
- the three project schema assertion graphs remained unchanged after removing
  `x-nkf-source`;
- the release-manifest schema passed one exact positive shape and 29 focused
  negative mutations; and
- the portable checker built and verified at SHA-256
  `f71226e5f632cdd0918a0eedae1cbbc5d5f17b450395d98e744ae572dfd73579`.

## Decision

The source checkpoint and built checker digest above are confirmed as the
current release-bound native checker Realization for NKF 0.1.

This is confirmation of derived implementation, not semantic acceptance or a
project conformance result.

## Non-Claims

This Decision does not confirm release tooling, a release manifest, archive
bytes, publication, installation UX, support, consumer migration, or any
consumer's conformance.
