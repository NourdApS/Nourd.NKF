---
id: adr-0019
type: decision
title: "ADR 0019: Accept NKF 0.1 Enforcement And Diagnostics"
summary: NKF 0.1 needs one deterministic enforcement model that assigns each machine-checkable rule to schema validation, bundle-aware checking, external resolution, or human review without allowing implementation to create normative meaning.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0019: Accept NKF 0.1 Enforcement And Diagnostics

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Codex technical reviewer, acting under explicit
  delegation from the Human Product Owner, Nourd ApS
- **Delegation source:** Direct instruction in the NKF-003 discussion on
  29 July 2026 after the Human Product Owner stated that they had not reviewed
  the complete proposal and delegated its approval under the reviewer's
  technical authority

## Context

NKF 0.1 needs one deterministic enforcement model that assigns each
machine-checkable rule to schema validation, bundle-aware checking, external
resolution, or human review without allowing implementation to create
normative meaning.

The proposal was independently reconciled against accepted Decisions through
ADR 0018. Its rule registry was checked for duplicate identifiers, its phase
and conformance dependencies were reviewed, and its Markdown links and
formatting were validated.

The Human Product Owner did not claim a line-by-line review of the proposal.
They explicitly delegated this technical approval. This provenance must not be
restated as informed personal acceptance of every line.

## Decision

The exact proposal at
[`../designs/adopted/enforcement-and-diagnostics.md`](../designs/adopted/enforcement-and-diagnostics.md),
with SHA-256
`c3239253e8ac33977d2563e8067322631b3f024ab4fcd52217748d060c55a546`,
is accepted as the native NKF 0.1 deterministic enforcement and diagnostics
model.

The accepted boundary includes:

- the UTF-8, single-document, JSON-compatible YAML parse boundary;
- JSON Schema 2020-12 and the two-file derived schema layout;
- distinct schema, bundle-checker, artifact/authority-resolver, and human
  review responsibilities;
- ordered validation, extension-resolution, optional authority-binding, and
  result phases;
- hierarchical structural, contract, and full-bundle conformance;
- the diagnostic object, severity and blocking rules, deterministic ordering,
  and 110 unique stable native rule identifiers;
- an operational `nkf.validation-result` boundary;
- governing-use readiness separate from deterministic conformance; and
- explicit matters that deterministic validation cannot establish.

## Authority And Non-Claims

This delegated technical acceptance establishes NKF enforcement semantics. It
does not establish Product acceptance, truth, semantic adequacy, confirmed
Realization, or any consumer's conformance.

It also does not accept:

- replacement normative Markdown or executable YAML bytes;
- exact schema, checker, fixture, package, or CI bytes;
- a checker distribution, release, or migration;
- a concrete extension or authority resolver;
- presentation-guidance fields or semantics; or
- any emitted validation result.

Schema and checker realization must derive from the coherent accepted
authority pair that incorporates ADRs 0013 through 0019. Passing realization
tests cannot retroactively alter this Decision.

## Compatibility

The preliminary schemas currently present under
`contracts/nkf/0.1/schemas/` retain superseded root-path and open-field
assumptions. They remain proposal evidence and must not be reported as current
NKF 0.1 schema realization.

Consequential changes to this accepted enforcement model follow ADR 0006 and
require a later governed Decision.
