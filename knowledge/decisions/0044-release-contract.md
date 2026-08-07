---
id: adr-0044
type: decision
title: "ADR 0044: Accept NKF 0.1 Release Contract"
summary: ADRs 0042 and 0043 accept one content-addressed Github Release archive as the initial checker distribution and establish nkf.release-manifest as an unversioned native NKF 0.1 contract enforced separately from project validation.
created_at: 2026-07-30T09:39:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer acting under explicit Human Product Owner delegation
---

# ADR 0044: Accept NKF 0.1 Release Contract

- **Delegation Source:** The Human Product Owner directed the reviewer to
  approve the exact reviewed release-contract revision on the Product Owner's
  behalf in the [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion on 30 July 2026
- **Review Checkpoint:** `70f9e4f24203880f4162d522c8157c48c2a6dc47`

## Context

ADRs 0042 and 0043 accept one content-addressed Github Release archive as the
initial checker distribution and establish `nkf.release-manifest` as an
unversioned native NKF 0.1 contract enforced separately from project
validation.

The remaining review revision makes the exact manifest fields, archive bytes,
consumer pin, provenance, verification, schema, and release workflow concrete.
The Human Product Owner explicitly delegated approval of that exact revision
to the Codex technical reviewer after its independent audit.

## Accepted Review Artifacts

The exact accepted distribution design is:

- path:
  `knowledge/designs/adopted/initial-release-distribution.md`;
- Git checkpoint:
  `70f9e4f24203880f4162d522c8157c48c2a6dc47`; and
- SHA-256:
  `b11a5952bf53135cc38cea9b83211aa2df377cc04644204a1a03717b62d9c09b`.

The exact accepted structural schema proposal is:

- path:
  `knowledge/evidence/decision-inputs/adr-0043-0046/nkf-0.1-release-manifest-schema-proposal.json`;
- Git checkpoint:
  `70f9e4f24203880f4162d522c8157c48c2a6dc47`; and
- SHA-256:
  `437736d30c39f7a918ecdcb0c9d018b2d9e815964340e73798af2eb1ad094433`.

The review verified duplicate-free JSON, strict JSON Schema 2020-12
compilation, one complete positive manifest, 29 focused negative mutations,
strict duplicate-free and alias-free YAML, exact Markdown/YAML field parity,
eight unique ASCII-sorted archive paths, four package schemas, and an
unchanged three-schema project-validation boundary.

## Decision

The exact review artifacts above are accepted as the normative NKF 0.1
release-contract revision and its structural schema design.

The accepted contract defines:

- one closed six-field `nkf.release-manifest`;
- exact repository, release-commit, checker-confirmation Decision,
  checker-artifact, authority-pair, and four-schema bindings;
- one uncompressed deterministic USTAR archive with eight regular files;
- one uploaded NKF distribution asset whose filename and lightweight tag
  derive from the full archive SHA-256;
- a consumer trust anchor consisting of the repository and independently
  stored full archive SHA-256 outside `bundle.yaml`;
- a bootstrap-safe verification order before checker invocation;
- execution-level failure with no project validation result when release
  verification fails; and
- public distribution, installation UX, support policy, and artifact
  attestation remaining outside the current native requirement.

`nkf_version: "0.1"` remains the only version coordinate. The
release-manifest schema is release-package enforcement only. It does not
expand project Governed Validation Inputs or
`validation_result.contract_artifacts.schemas`.

## Realization Direction

The accepted review artifacts are delta and schema-design authorities, not a
second canonical NKF specification.

The reviewer must now:

1. derive and promote one coherent canonical Markdown/YAML replacement;
2. derive and confirm the source-bound release-manifest schema and rebound
   existing schemas;
3. rebind and reconfirm the checker without expanding project conformance;
4. implement and verify deterministic packaging and release verification; and
5. bind any confirmed development Realization to immutable source and artifact
   digests.

Any semantic difference from the accepted review artifacts requires a later
governed Decision.

## Compatibility

This is a pre-stable NKF 0.1 release-contract addition. It changes distribution
metadata and package enforcement, not Product knowledge declarations,
project-validation inputs, acceptance semantics, or conformance meaning.

The release-manifest schema adds a fourth distributed schema while the
project checker continues to report exactly the existing bundle, record, and
validation-result schema bindings.

## Non-Claims

This Decision does not:

- promote canonical Markdown, YAML, or schema bytes by itself;
- confirm a rebound checker, packager, verifier, archive, or release;
- create a tag, Github Release, asset, consumer pin, validation result, or
  conformance claim;
- establish public distribution, support, continuous integration, licensing,
  or a security-response process; or
- authorize repository self-hosting or external-consumer migration.
