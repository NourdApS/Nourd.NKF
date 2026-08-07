---
id: adr-0043
type: decision
summary: ADR 0042 selects one content-addressed Github Release archive as NKF's initial checker distribution. The exact distribution proposal identified that a release manifest implemented only by packaging code would create a second, ungoverned contract authority.
created_at: 2026-07-30T08:39:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0043: Establish Native Release Manifest Contract

- **Confirmation Source:** Direct confirmation in the NKF-003 discussion on
  30 July 2026 after review of the exact authority and enforcement boundary

## Context

ADR 0042 selects one content-addressed Github Release archive as NKF's initial
checker distribution. The exact distribution proposal identified that a
release manifest implemented only by packaging code would create a second,
ungoverned contract authority.

The current executable YAML says schema self-digests belong in release
metadata, but the canonical NKF 0.1 authority pair does not yet define that
metadata's identity, shape, or enforcement. The current three schemas govern
project declarations and validation results; none governs release packaging.

## Decision

### Native Identity

The release manifest is a native NKF 0.1 contract with exact unversioned
identity:

```text
nkf.release-manifest
```

It declares `nkf_version: "0.1"`. It has no independent manifest, checker,
schema, package, distribution, or release version. Exact revisions are bound
by immutable artifact digests and source provenance.

### Authority

The canonical NKF 0.1 Markdown owns the release manifest's human meaning,
archive boundary, and integrity requirements. The executable YAML companion
defines its deterministic machine-readable contract. A packaging script,
checker implementation, schema, fixture, Github Release, or consumer cannot
change that contract by implication.

The current authority pair must be replaced through the governed pre-stable
change process before release-manifest packaging is realized.

### Enforcement

The release manifest has one derived JSON Schema with exact identity:

```text
urn:nkf:0.1:schema:release-manifest
```

That schema enforces the release-package contract. It is not a project
declaration schema, does not expand project Governed Validation Inputs, and is
not an additional entry in
`validation_result.contract_artifacts.schemas`.

The native project checker continues to bind the bundle, record, and
validation-result schemas used for project validation. Release packaging and
verification separately bind the release-manifest schema and all distributed
artifacts.

## Compatibility

This Decision adds distribution metadata within the existing pre-stable NKF
0.1 version. It creates no new version namespace and changes no Product
knowledge record, bundle declaration, extension declaration, project
validation input, diagnostic trigger, acceptance state, or conformance
meaning.

Because the canonical Markdown/YAML pair will change, the checker must be
rebound to the resulting exact authority digests and independently reconfirmed
before release. ADR 0041 remains the immutable development baseline and does
not become the release Realization by implication.

## Non-Claims

This Decision does not:

- accept the exact release-manifest fields, JSON serialization, archive bytes,
  packager, verifier, or tag;
- promote a replacement Markdown/YAML authority pair;
- confirm the release-manifest schema or a rebound checker;
- create a commit, tag, Github Release, asset, consumer pin, or conformance
  result;
- establish public distribution, support, continuous integration, licensing,
  artifact attestation, or security-response policy; or
- authorize repository self-hosting or external-consumer migration.
