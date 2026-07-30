# ADR 0046: Confirm Release Contract Json Schema Bindings

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 30 July 2026
- **Accepted:** 30 July 2026
- **Decision Authority:** Codex technical reviewer acting under explicit Human
  Product Owner delegation
- **Accepted Source Pair:** ADR 0045

## Context

ADR 0045 accepts the current NKF 0.1 Markdown/YAML authority pair. The existing
bundle, record, and validation-result schemas retain their assertion meaning
but require exact source-metadata rebinding. The accepted release contract also
requires one separate release-manifest schema that must not enter project
validation.

## Review

The reviewer audited these exact proposal artifacts:

- [`../designs/nkf-0.1-release-contract-bundle-schema-proposal.json`](../designs/nkf-0.1-release-contract-bundle-schema-proposal.json);
- [`../designs/nkf-0.1-release-contract-record-schema-proposal.json`](../designs/nkf-0.1-release-contract-record-schema-proposal.json);
- [`../designs/nkf-0.1-release-contract-release-manifest-schema-proposal.json`](../designs/nkf-0.1-release-contract-release-manifest-schema-proposal.json);
  and
- [`../designs/nkf-0.1-release-contract-validation-result-schema-proposal.json`](../designs/nkf-0.1-release-contract-validation-result-schema-proposal.json).

All four passed duplicate-aware strict parsing. Removing `x-nkf-source` from
the three project schemas produces object graphs equal to their ADR 0040
predecessors. All four compile strictly with Ajv `8.20.0` and `ajv-formats`
`3.0.1`. The release-manifest schema accepts the exact positive shape and
rejects 29 focused mutations covering closed fields, constants, digests,
source provenance, runtime, authority paths, and ordered schema entries.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `73459c032933eb140b7c62d5dc551ea8103e1e5c3c72ba6d7823c73757cf9fbc` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `aad9bac1c7dd40bef536010da9b3493f5c08f89d46d044a62b141e9cda3d46a7` |
| Release Manifest | [`../../contracts/nkf/0.1/schemas/release-manifest.schema.json`](../../contracts/nkf/0.1/schemas/release-manifest.schema.json) | `8ee2ede58717387c418e956f2b1e45f4d6edb21a7d024c8fd855e0d006ab0e34` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `f901f78d3c11e9360f55d322713296879d8e2971059b83a8bb1b33ddbf6b30a1` |

Promotion copies the reviewed proposal bytes unchanged. Each schema binds to
Markdown SHA-256
`67beed2a380e719573175d3dfd70b05c59cbe51274c9975f863a58f7083ddba4`
and executable YAML SHA-256
`7a2489c3b81ef87e38913629c65f71b8b39e815d9b72efe81939c4500db3510b`.

The project checker continues to bind exactly the bundle, record, and
validation-result schemas. The release-manifest schema is a release-package
contract only.

## Non-Claims

This Decision does not confirm checker source, built checker bytes, release
tooling, an archive, publication, consumer migration, or a conformance result.
