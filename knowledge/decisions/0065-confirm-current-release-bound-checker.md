---
id: adr-0065
type: decision
title: "ADR 0065: Confirm Current Release-Bound Checker"
summary: Confirm the current NKF 0.1 authority, Schema, and checker bytes at an exact source checkpoint as the inputs eligible for the successor content-addressed release.
created_at: 2026-07-31T02:08:43Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
---

# ADR 0065: Confirm Current Release-Bound Checker

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit delegation to complete and independently audit [NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md)
- **Source Checkpoint:**
  `57b3410dfccd8ff4f5c7b7995a32cab18c32e7fc`
- **Exact-Commit Workflow Evidence:** Github Actions run `30597538635`

## Context And Problem

[ADR 0047](0047-release-checker.md) confirms the earlier release-bound checker at an older source
checkpoint. [ADR 0059](0059-confirm-governed-frontmatter-realization.md) confirms the current governed-frontmatter implementation,
including the current checker and Schemas, but the release packager requires
one exact Decision that directly binds its eligible source checkpoint and
checker executable digest.

The published prerelease and `scripts/release/config.mjs` still point to the
older authority and checker. They cannot be called current merely because the
development repository now passes.

## Confirmed Realization

The exact source checkpoint above builds the current portable checker at:

```text
SHA-256 a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7
```

That checker binds these exact accepted or confirmed release inputs:

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `428bcc1b2fbda43052582663630fe808b536e5b424caba0afdabbf298d87c6be` |
| `contracts/nkf/0.1/nkf.yaml` | `b05d4e7d34d5f2b8472045feed547ae44ff4a0a57299da0630b3a538dc6ab2fd` |
| `contracts/nkf/0.1/schemas/bundle.schema.json` | `05f9303d799f8e07a64dc2fb571317ca3d28491dd02d5ed0a446b77065468a1f` |
| `contracts/nkf/0.1/schemas/record.schema.json` | `397f83707112022b16f7860882e3b48afb83b9c46c62cc82043483e7a727859b` |
| `contracts/nkf/0.1/schemas/release-manifest.schema.json` | `00058b5e86f29edb005f0a4125125c32ccd18a986a244c69f60f8605cab11f23` |
| `contracts/nkf/0.1/schemas/validation-result.schema.json` | `155f94a6c3ff7c86a57c58590fa9d3a6a2afc609a5ab6a9a6191a9c9e9708248` |

The source checkpoint was pushed to the verified `kaveh6202/Nourd.NKF`
repository. Its exact-commit workflow installed locked dependencies, ran the
canonical `npm run nkf:check` command, built the deterministic checker, and
passed for that exact commit.

## Decision

The source checkpoint, checker digest, and six release-input digests above are
confirmed as the current release-bound NKF 0.1 checker Realization.

Release packaging may bind this Decision and those exact values. The later
release commit may contain packaging, adoption, documentation, and knowledge
changes that do not alter these eight distributed bytes; the release manifest
binds both checkpoints separately.

## Scope And Applicability

This confirmation applies only to the exact checker executable and release
inputs listed above. It succeeds [ADR 0047](0047-release-checker.md) for a new release without rewriting
or invalidating the historical release that [ADR 0047](0047-release-checker.md) supported.

## Rationale

An explicit successor binding prevents a current package from borrowing an
older confirmation by implication. It also makes the release packager verify
that the configured Decision text contains both the source checkpoint and
checker digest before archive construction.

[ADR 0059](0059-confirm-governed-frontmatter-realization.md) supplies the independent implementation audit and exact
Realization-level confirmation. The successful exact-commit workflow supplies
reproducible build and validation evidence at the selected source checkpoint.
Neither evidence substitutes for this explicit release eligibility act.

## Alternatives Considered

Reusing [ADR 0047](0047-release-checker.md) was rejected because it binds predecessor checker and
authority bytes.

Treating [ADR 0059](0059-confirm-governed-frontmatter-realization.md) as the package binding was rejected because it does not name
one checker source checkpoint and executable digest in the exact form the
release packager verifies.

Using the future packaging commit as the checker source checkpoint was
rejected because packaging and documentation changes do not alter the already
confirmed checker source. The manifest binds the checker and release source
checkpoints separately.

## Consequences And Trade-Offs

`scripts/release/config.mjs` can now be updated from [ADR 0047](0047-release-checker.md) to ADR 0065 and
from stale artifact digests to the current values.

Any later change to a distributed authority, Schema, or checker byte requires
a successor confirmation. A packaging-only source change may reuse these
exact distributed bytes only while every configured digest still matches.

## Non-Claims

This Decision does not:

- publish or recommend a release;
- confirm the release packager, adopter, public documentation, or consumer
  integration;
- establish conformance for a consumer snapshot;
- accept knowledge;
- make the checker public;
- activate protected branch enforcement; or
- complete [NKF-008](../tasks/completed/NKF-008-publish-and-onboard-consumers.md).
