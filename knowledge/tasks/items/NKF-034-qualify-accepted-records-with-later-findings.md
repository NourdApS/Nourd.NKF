---
title: "NKF-034: Qualify Accepted Records With Later Findings"
summary: Give NKF a governed way to attach a later finding to an accepted immutable record whose stated basis turns out weaker than claimed, without superseding it and without letting unaccepted Evidence erode accepted authority — deferred from the NKF 0.8 release Task so that release stays scoped to the generated distribution and the guidance-review enforcement repair.
created_at: 2026-08-18T20:15:00Z
---

# NKF-034: Qualify Accepted Records With Later Findings

## Purpose

NKF can replace an accepted record through supersession and can correct
content through a governed successor. It has no way to record that an
accepted record still stands while one of its stated supports turns out to be
weaker than claimed.

The situation is concrete rather than hypothetical.
[`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
confirms the NKF 0.71 candidate bound to its independent release audit. One of
that audit's required checks — that the pre-cut guidance review covered the
whole versioned set under
[`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
— was performed against the rule-diff standard that
[`adr-0095`](../../decisions/0095-review-guidance-before-cutting.md) set and
[`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md)
superseded, because release-protocol step six still named the
superseded standard. The confirmed bytes are unaffected and independently
reproduced; the unsupported part is the guidance-coverage claim alone.

[`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md)
states that the confirmation "is invalid without its bound audit
Evidence". That clause anticipates the Evidence being absent. It says nothing
about Evidence that is present and partly wrong, so the clause does not fire
and the Decision stands with nothing in the record signalling the limitation.

## Scope

1. Decide whether the missing mechanism is a relationship type, a record
   field, or a record kind, and accept the choice as Product meaning.
2. If a relationship type, add one closed-vocabulary member alongside the
   existing `supersedes`, `evidences`, and `observes` entries. The proposal
   carried from [NKF-033](NKF-033-release-nkf-0-8-with-generated-distribution.md)
   is `qualifies`, meaning
   `source-records-a-later-finding-limiting-target-stated-basis`, with
   `class: context` rather than `review` so a qualification never cascades
   into re-reviewing an immutable accepted record, and with propagation that
   makes the qualification visible when reading the qualified record rather
   than only from the qualifying one.
3. Establish the authority boundary that keeps the mechanism from becoming a
   backdoor. Stating what an audit did or did not verify is a fact and belongs
   to Evidence. Concluding that an accepted record's claim is therefore
   unsupported is a judgment about accepted authority and requires a Decision.
   The mechanism must make the distinction legible from the qualifying
   record's own kind.
4. Derive checker support, fixtures, and diagnostics, and migrate the
   Evidence recording the NKF 0.71 guidance-review finding onto
   the stronger edge once it exists.

## Out Of Scope

- Reopening, superseding, or weakening any accepted record, including
  [`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md).
  The published NKF 0.71 bytes are immutable and independently confirmed.
- The NKF 0.8 release itself, owned by
  [NKF-033](NKF-033-release-nkf-0-8-with-generated-distribution.md).
- A general re-litigation of the relationship vocabulary.

## Acceptance Criteria

1. The accepted authority defines exactly one mechanism for qualifying an
   accepted record without superseding it, stated in prose and executable in
   explicit agreement.
2. A qualification is discoverable when reading the qualified record, not only
   from the qualifying record.
3. A qualification never triggers re-review of an immutable accepted record.
4. Evidence may record an observation about an accepted record; only a
   Decision may assert a consequence for that record's standing, and the
   checker enforces the distinction.
5. The NKF 0.71 guidance-review finding is carried on the mechanism, with its
   predecessor Evidence edge preserved as history.

## Guardrails

Recording a limitation must never become a way to erode accepted authority
without the authority that accepted it. If the design cannot keep observation
and consequence separate deterministically, the mechanism is not ready and
this Task stays deferred rather than shipping a weaker form.

## Origin

Deferred on `2026-08-18` under
[NKF-033](NKF-033-release-nkf-0-8-with-generated-distribution.md). The Human
Product Owner directed that the mechanism land in a later version so the NKF
0.8 release stays scoped to the generated distribution and the guidance-review
enforcement repair, and directed that this Task be created and deferred.

Until it is delivered, the NKF 0.71 finding is recorded as ordinary Evidence
with an `evidences` edge under the NKF 0.71 contract, which is truthful but
not discoverable from the qualified Decision.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Consequential pre-stable change requires evidence, reproduction, compatibility classification, authority-first derivation, versioned release, and deliberate migration. |
| [`adr-0015`](../../decisions/0015-semantic-topology-and-bindings.md) | record | Stable record identity, typed relationships, and bindings remain one coherent topology; a new relationship type joins that topology rather than forking it. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a qualification changes none of them by implication. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0097`](../../decisions/0097-full-set-guidance-review-and-enumeration.md) | record | The full-set guidance review and its recorded member list and digests are the standard whose unmet application this mechanism must be able to record. |
| [`adr-0132`](../../decisions/0132-confirm-the-nkf-0-71-release-candidate.md) | record | The confirmed and published NKF 0.71 bytes stay exactly as confirmed; this Task records a limitation on a claim and changes no byte and no acceptance. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Exactly one accepted mechanism qualifies an accepted record without superseding it | unknown | none | none |
| A qualification is discoverable from the qualified record | unknown | none | none |
| A qualification never triggers re-review of an immutable accepted record | unknown | none | none |
| Observation and consequence are deterministically distinguished by the qualifying record's kind | unknown | none | none |
