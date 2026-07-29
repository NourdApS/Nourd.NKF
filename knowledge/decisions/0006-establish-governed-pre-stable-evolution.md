# ADR 0006: Establish governed pre-stable evolution

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 29 July 2026
- **Accepted:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct Human Product Owner direction in the NKF-003
  discussion on 29 July 2026

## Context

NKF is pre-stable. Implementing and exercising it across Nourd Studio,
Shredwise, Nourd Agent SDK, and later projects will expose shortcomings,
ambiguities, invalid assumptions, checker bugs, and missing cases that cannot
all be discovered from specification drafting alone.

Pre-stable must mean open to evidence-driven change. It must not mean that a
consumer, checker implementation, passing test, or repository edit can change
the format by accident.

The accepted NKF 0.1 specification reserves `1.0` for the first public stable
release.

## Decision

Until the first stable NKF release, NKF may change in response to validated
implementation and real-project evidence.

Every consequential change follows a governed feedback loop:

1. **Observe:** Capture the shortcoming or defect with the affected project,
   exact NKF and checker versions, relevant inputs, observed result, and
   expected result.
2. **Reproduce:** Reduce the observation to reviewable evidence and, where
   possible, a deterministic positive or negative fixture.
3. **Classify:** Determine whether it is a specification ambiguity or gap,
   contract defect, checker implementation bug, distribution defect, migration
   issue, or consumer nonconformance.
4. **Propose:** Record the exact intended change, authority effect,
   alternatives, failure cases, and compatibility impact under an NKF Task.
5. **Validate:** Test the proposal against accepted meaning, affected
   contracts, positive and negative fixtures, and representative consumers.
6. **Confirm:** Obtain explicit Human Product Owner acceptance for any changed
   normative meaning or consequential compatibility boundary.
7. **Update authority:** Change accepted Decisions and specifications first,
   then derive executable contracts, checker behavior, fixtures,
   documentation, and distribution metadata.
8. **Adjust and refactor:** Update implementation without allowing refactoring
   convenience to redefine the accepted contract.
9. **Release:** Publish an exact version with integrity and compatibility
   information.
10. **Migrate:** Move consumers deliberately through pinned versions,
    validation, and recorded results rather than silently updating them.

## Classification controls

An implementation bug may be fixed without changing normative meaning when
the accepted specification already determines the correct behavior. The fix
still requires regression evidence and a versioned checker release.

A specification ambiguity, missing rule, changed responsibility, or changed
conformance result requires governed normative review. Implementation cannot
resolve it by becoming the de facto authority.

Consumer nonconformance does not justify weakening NKF merely to produce a
green result. The consumer may need repair or migration instead.

Refactoring that preserves accepted external behavior is implementation work.
If behavior, diagnostics relied upon as contracts, compatibility, or accepted
meaning changes, it enters the governed loop.

## Versioning and compatibility

Breaking changes are possible before `1.0`, but they must be explicit,
versioned, justified by evidence, and accompanied by migration and
compatibility treatment.

No accepted format, contract, or responsibility meaning changes silently in
place. Pre-stable releases still require exact pins so consumers can reproduce
which rules they used.

Before the first stable release, NKF must separately accept its stable
compatibility policy, supported-version window, deprecation rules, and
migration guarantees.

## Authority

Consumer projects own their canonical Product meaning and operational state.
Their use of NKF supplies evidence about the format; it does not give them
authority to redefine NKF contracts.

NKF owns format, contract, checker, compatibility, release, and migration
changes. Human acceptance remains distinct from validation and implementation.

## Consequences

- Real implementation is a required learning source before stability.
- Shortcomings become traceable evidence and fixtures.
- Specification, contracts, checker, and consumers evolve in an explicit
  order.
- Bugs can be corrected without pretending every fix changes normative
  meaning.
- Pre-stable breaking changes remain reviewable and migratable.
- The first stable release is earned through exercised contracts rather than
  declared stable by aspiration.
