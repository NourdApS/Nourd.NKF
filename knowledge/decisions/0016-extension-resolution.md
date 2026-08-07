---
id: adr-0016
type: decision
summary: The accepted NKF 0.1 specification requires unknown extensions to remain visible and round-trippable and requires consumers to fail closed when a required extension is unsupported. It does not completely define extension identity, contract binding, declaration fields, requirement semantics, or support resolution.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0016: Accept NKF 0.1 Extension Declaration And Resolution

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct confirmation in the NKF-003 discussion on
  29 July 2026

## Context

The accepted NKF 0.1 specification requires unknown extensions to remain
visible and round-trippable and requires consumers to fail closed when a
required extension is unsupported. It does not completely define extension
identity, contract binding, declaration fields, requirement semantics, or
support resolution.

The later NKF-002 checker separates a `required_extensions` string list from
an arbitrary `extensions` payload map and recognizes support through an
unbound string set. That model can drift and cannot identify the exact
extension contract revision.

## Decision

The exact proposal at
[`../designs/adopted/extension-declaration-and-resolution.md`](../designs/adopted/extension-declaration-and-resolution.md),
with SHA-256
`dc7f7511b0a045af4fba605dcfc3063bf56975dd1eb1c818e281b45c027eef5f`,
is accepted for native NKF 0.1.

The accepted boundary includes:

- the owner-namespaced extension identifier grammar and `nkf` reservation;
- unversioned extension identities governed by the sole `nkf_version`
  coordinate and exact artifact digests;
- digest-bound normative Markdown and executable YAML extension authority
  pairs, using canonical executable identity `nkf.extension`;
- the exact bundle `extension_contracts` catalog shape;
- the exact bundle and record `extensions` use shape;
- one `required` or `optional` requirement value on each extension use,
  without a separate `required_extensions` field;
- exact contract resolution and support criteria;
- the empty native NKF 0.1 core supported-extension set;
- deterministic conformance and fail-closed behavior;
- JSON-compatible data-model round-trip requirements; and
- the prohibition against extensions weakening core meaning, adding
  source-absent claims, proving acceptance, creating another NKF version
  coordinate, or hiding operational state and secrets.

## Compatibility

Extension artifact digests identify exact revisions and are not semantic
versions. Historical `/v1` extension identities are not current NKF support.

An unsupported optional extension may coexist with native core conformance
only when it remains nonessential, visible, preserved, and excluded from
consequential interpretation. An unsupported required extension prevents
contract conformance and governing action.

The bundle-local catalog is resolution metadata, not a public extension
registry. A public registry and its compatibility policy remain out of scope.

## Not Decided

This Decision does not accept any concrete extension, the universal locator
and distribution boundary, standardized acceptance proof, replacement
Markdown or YAML bytes, schemas, checker behavior, fixtures, distribution, a
release, conformance, or consumer migration.
