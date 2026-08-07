---
summary: "Determine from concrete consumer evidence whether NKF needs:"
created_at: 2026-07-30T00:27:52Z
task_id: NKF-005
task_status: deferred
owner: Nourd ApS
decision_authority: Human Product Owner, Nourd ApS
---

# NKF-005: Investigate Validation Expiry And Authority Freshness

- **Related Task:** `NKF-003`

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

This feature is intentionally deferred and does not exist today.

Under the current NKF 0.1 proposal:

- a normal acceptance change follows the governed change process;
- the resulting decision, declaration, provenance, or other governed resource
  changes the applicable Governed Validation Inputs;
- the changed snapshot makes the prior full-bundle result outdated and
  requires a new validation;
- if no governed input changes, NKF does not infer that acceptance changed;
  and
- NKF Core does not currently impose a universal expiry, poll an authority,
  or continuously refresh an acceptance binding.

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

- adding a time-to-live to NKF 0.1 validation results;
- introducing background polling or continuous authority checks;
- making external operational resources Governed Validation Inputs by
  default;
- changing the current `nkf.validation-result` proposal;
- defining an authority protocol, locator, credential model, or trust system;
- changing a consumer's acceptance process; and
- implementing schemas, checker code, fixtures, packaging, or migration.

## Deferred-State Rule

This Task records a future investigation only. It does not claim that expiry
or separate authority freshness is necessary, specified, accepted,
implemented, released, supported, or conformant. Work begins through a
recorded execution slice after the activation evidence exists.

## Decision Applicability

### Applicable Decisions

No accepted decision applies to this Task.

### Mandatory Capabilities

No mandatory capability is implicated by this Task.

This gate was added retrospectively during the NKF 0.2 self-migration; no
historical extraction is implied.
