---
title: "NKF-005: Investigate Validation Expiry And Authority Freshness"
summary: Determine from concrete consumer evidence whether NKF needs a universal time-based expiry for a completed validation result, a separate freshness mechanism for an acceptance binding or another externally governed claim, an authority-specific optional extension, or no additional mechanism — created deferred beside the accepted validation-result meaning and still awaiting that evidence.
created_at: 2026-07-30T00:27:52Z
---

# NKF-005: Investigate Validation Expiry And Authority Freshness

## Human Direction

This Task was created deferred on `2026-07-30` during
[NKF-003](NKF-003-independent-nkf-authority.md), while the validation-result
meaning was being accepted.
[ADR 0025](../../decisions/0025-validation-result.md) records that universal
expiry and separate authority-freshness mechanisms remain deferred here, and
[ADR 0027](../../decisions/0027-validation-authority-pair.md) records this Task
as the deferred investigation path without introducing either feature. On
`2026-08-12`
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopted the contextual document-freshness direction that NKF 0.5 later
realized and stated that this Task continues to own any universal
validation-expiry or separate authority-freshness question that direction does
not resolve.

No human direction has resumed this Task. It stays deferred until the
activation evidence below exists and the Human Product Owner explicitly
directs work to begin.

This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Desired Outcome

Determine from concrete consumer evidence whether NKF needs:

- a universal time-based expiry for a previously completed validation result;
- a separate freshness mechanism for an acceptance binding or another
  externally governed claim;
- an authority-specific optional extension; or
- no additional mechanism.

Any accepted solution must preserve deterministic NKF verification without
turning an unobserved external event into a hidden change of NKF state.

## Current Boundary

This feature is intentionally deferred and does not exist.

The boundary below was recorded on `2026-07-30` against the then-current NKF
0.1 proposal. The live version today is NKF 0.8, with NKF 0.81 in preparation
under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md);
the validation-result meaning
[ADR 0025](../../decisions/0025-validation-result.md) accepted has been carried
through each accepted successor, and the boundary holds for the live contract:

- a normal acceptance change follows the governed change process;
- the resulting decision, declaration, provenance, or other governed resource
  changes the applicable Governed Validation Inputs;
- the changed snapshot makes the prior full-bundle result outdated and
  requires a new validation;
- if no governed input changes, NKF does not infer that acceptance changed;
  and
- NKF Core imposes no universal expiry, polls no authority, and does not
  continuously refresh an acceptance binding.

Since NKF 0.5, delivered under
[NKF-026](NKF-026-implement-and-release-nkf-0-5-freshness-and-knowledge-graph.md)
from the direction
[ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
adopted, NKF evaluates the contextual freshness of governed knowledge against a
declared knowledge graph and a versioned freshness policy after a change. That
mechanism answers whether governed knowledge needs semantic review after a
change. It adds no time-based expiry to a validation result, polls no external
authority, and refreshes no acceptance binding, and that Decision states that
the questions it leaves unresolved remain with this Task.

An external change made without its required governed representation is
outside what current NKF verification can observe. This Task preserves the
question of whether a later NKF contract should model such freshness; it does
not answer it by implication.

## Activation Evidence

Begin design work only when exercise of a real NKF project supplies:

1. the exact accepted claim whose usefulness can become stale while the
   project snapshot remains unchanged;
2. the authoritative source and the process by which that source changes;
3. evidence that ordinary governed-document updates cannot adequately
   represent the change;
4. the consequence of continuing to show the previous result as current;
5. a deterministic way to observe or calculate freshness, including behavior
   when the authority is unavailable; and
6. at least one reproducible fresh, stale, unavailable, and contradictory
   case suitable for review and fixtures.

## Future Execution Plan

1. Collect and classify concrete expiry and authority-freshness cases from
   consumer projects.
2. Separate NKF conformance freshness, acceptance-binding freshness,
   operational monitoring, cache freshness, and interface wording.
3. Determine whether each case belongs in NKF Core, an optional
   authority-specific extension, the consumer's governance process, or an
   external operational system.
4. Compare universal expiry, authority-specific freshness rules, explicit
   revalidation, and no-change alternatives.
5. Analyze determinism, offline verification, historical reproducibility,
   privacy, security, availability, clock dependence, and compatibility.
6. Present the consequential boundary to the Human Product Owner before
   drafting normative meaning or executable contracts.
7. Update accepted authority before deriving schemas, checker behavior,
   fixtures, distribution metadata, or consumer migration guidance.

## Acceptance Criteria

- Real-project evidence demonstrates a failure that the governed snapshot and
  current artifact-binding freshness rules do not already resolve.
- The proposal identifies exactly what expires or becomes stale and does not
  conflate NKF conformance with semantic acceptance or Governing Use Ready.
- The authoritative source, freshness observation, failure behavior, and
  unavailable-authority behavior are deterministic.
- Historical validation evidence remains interpretable as of its completion
  time.
- A universal rule is adopted only if authority-specific or
  consumer-governance alternatives are demonstrably insufficient.
- Privacy, secret handling, network access, clock trust, offline operation,
  and denial-of-service effects are addressed.
- The Human Product Owner accepts the exact semantic boundary before any
  executable realization.
- Any schema, checker, fixture, package, or migration change derives from the
  subsequently accepted authority.

## Out Of Scope Until Activation

- adding a time-to-live to validation results under any live NKF contract
  (NKF 0.1 when this Task was created; NKF 0.8 today);
- introducing background polling or continuous authority checks;
- making external operational resources Governed Validation Inputs by
  default;
- changing the accepted `nkf.validation-result` meaning, which was a proposal
  at this Task's creation and is accepted authority today;
- defining an authority protocol, locator, credential model, or trust system;
- changing a consumer's acceptance process; and
- implementing schemas, checker code, fixtures, packaging, or migration.

## Deferred-State Rule

This Task records a future investigation only. It does not claim that expiry
or separate authority freshness is necessary, specified, accepted,
implemented, released, supported, or conformant. Work begins through a
recorded execution slice after the activation evidence exists and the Human
Product Owner directs it.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | An expiry or freshness mechanism is a consequential pre-stable change: it requires evidence, reproduction, compatibility classification, authority-first derivation, a versioned release, and deliberate consumer migration. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a freshness observation about an acceptance binding cannot change acceptance, and an unobserved external event cannot change NKF state. |
| [`adr-0025`](../../decisions/0025-validation-result.md) | record | A validation result is one observed snapshot that becomes outdated when a Governed Validation Input changes and otherwise remains historical operational evidence; NKF infers no hidden acceptance change and polls no authority, and universal expiry and separate authority freshness stay deferred to this Task. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |
| [`adr-0115`](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md) | record | The contextual document-freshness direction adopted for NKF 0.5 answers post-change semantic review; this Task owns only the universal validation-expiry and separate authority-freshness questions that direction leaves unresolved and must not reopen it by implication. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Real-project evidence demonstrates a failure the governed snapshot and artifact-binding freshness rules do not already resolve | unknown | none | none |
| The proposal identifies exactly what expires or becomes stale without conflating NKF conformance with semantic acceptance or Governing Use Ready | unknown | none | none |
| The authoritative source, freshness observation, failure behavior, and unavailable-authority behavior are deterministic | unknown | none | none |
| Historical validation evidence remains interpretable as of its completion time | unknown | none | none |
| A universal rule is adopted only if authority-specific or consumer-governance alternatives are demonstrably insufficient | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
