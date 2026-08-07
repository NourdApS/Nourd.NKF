---
id: adr-0045
type: decision
summary: "ADR 0044 accepts the exact NKF 0.1 release contract and structural schema design. The accepted revision is a delta authority: it must be reconciled into one complete canonical Markdown specification and one executable YAML companion so NKF does not retain parallel normative sources."
created_at: 2026-07-30T09:47:32Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer acting under explicit Human
---

# ADR 0045: Accept Release Contract Authority Pair

  Product Owner delegation
- **Semantic Authority:** ADR 0044 and its exact accepted review artifacts

## Context

ADR 0044 accepts the exact NKF 0.1 release contract and structural schema
design. The accepted revision is a delta authority: it must be reconciled into
one complete canonical Markdown specification and one executable YAML
companion so NKF does not retain parallel normative sources.

The reviewer composed a full replacement pair from the current ADR 0039
authority plus only the accepted release-contract changes. The pair was
reviewed before schema or checker rebinding.

## Accepted Artifacts

The exact accepted normative Markdown is:

- canonical path: `knowledge/specifications/nkf-0.1.md`;
- review path:
  `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-specification-proposal.md`; and
- SHA-256:
  `67beed2a380e719573175d3dfd70b05c59cbe51274c9975f863a58f7083ddba4`.

The exact accepted executable companion is:

- canonical path: `contracts/nkf/0.1/nkf.yaml`;
- review path:
  `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-contract-proposal.yaml`; and
- SHA-256:
  `7a2489c3b81ef87e38913629c65f71b8b39e815d9b72efe81939c4500db3510b`.

The canonical promotions are byte-identical to the reviewed proposals.

## Review

The independent review confirmed:

- exact byte parity with ADR 0044's accepted normative Markdown section and
  executable YAML mapping;
- one strict JSON-compatible YAML document with unique string keys and no
  tags, merge keys, anchors, or aliases;
- exact YAML binding to the Markdown SHA-256;
- unchanged parity of all 115 project diagnostic rule identities and
  severities;
- 41 participating headings in accepted Unicode 17 Title Case;
- exact four-schema release-package ordering and unchanged three-schema
  project-validation ordering;
- eight unique ASCII-sorted archive paths and closed release metadata;
- valid governed-document links; and
- no native secret-registry match.

The composite changes only:

- administrative acceptance and provenance references;
- positive scope and unversioned-identity listings;
- separate release-package schema explanation;
- the exact accepted Release Distribution section;
- the exact executable `release_distribution` mapping; and
- the unresolved-matters entry for public distribution, installation UX, and
  support.

## Decision

The exact Markdown and YAML artifacts above are accepted and promoted as the
current canonical NKF 0.1 authority pair.

Markdown remains authoritative human meaning. YAML remains its digest-bound
executable companion. `nkf_version: "0.1"` remains the only version
coordinate.

The release-manifest schema remains release-package enforcement only. The
current project bundle, record, and validation-result schemas remain the exact
project-validation set until separately rebound to this pair.

## Compatibility

This replacement adds the already accepted release contract without changing
Product knowledge declaration shapes, project Governed Validation Inputs,
project diagnostics, validation phases, acceptance semantics, or conformance
meaning.

The ADR 0039 pair remains immutable historical authority. Consumers do not
inherit this revision until they deliberately pin a later confirmed release.

## Non-Claims

This Decision does not:

- confirm schema or checker bytes;
- implement or confirm a packager, verifier, archive, tag, or Github Release;
- validate the NKF repository or any external consumer;
- establish public distribution, installation UX, support, continuous
  integration, licensing, or security-response policy; or
- claim release realization or conformance.
