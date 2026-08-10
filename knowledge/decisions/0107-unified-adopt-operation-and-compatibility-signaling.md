---
title: "ADR 0107: Unified Adopt Operation And Compatibility Signaling"
id: adr-0107
type: decision
summary: Accept one public Adopt operation, predecessor-relative compatibility signals, and an explicit authority gate for breaking migration.
created_at: 2026-08-10T10:50:20Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0107: Unified Adopt Operation And Compatibility Signaling

## Context And Problem

[ADR 0080](0080-release-and-adoption-process.md) separates release from
consumer adoption, while [ADR 0076](0076-versioned-contract-evolution.md)
requires deliberate migration between immutable NKF versions. The existing
adopter exposed onboarding, installation, updating, and migration as separate
public choices even though repository state determines the valid path.
[NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md)
also still lacked the accepted breaking-change classification and signaling
boundary required to finish the 0.2 adoption experience.

## Decision

On `2026-08-10`, the Human Product Owner accepts the direction in the
[Unified Adopt Operation Design](../designs/adopted/unified-adopt-operation.md).

NKF exposes one public operation named **Adopt**, invoked without a
subcommand. Adopt resolves the governed recommended release, exposes and pins
its exact content-addressed archive, inspects supported repository state, and
selects the internal initial-adoption, migration, integration-refresh, or
current path. Its closed successful states are `onboarded`, `migrated`,
`updated`, and `current`.

The recommended-release catalog declares compatibility relative to every
supported predecessor as `breaking` or `non-breaking`, with a consistent
migration-required flag and human-readable summary. The Human Product Owner
owns that semantic judgement; tooling validates only presence, vocabulary,
and consistency.

NKF 0.2 is breaking from NKF 0.1 and requires migration. Adopt must show the
exact target and breaking signal and require explicit Human Product Owner
approval before mutating governed knowledge. Refreshing an NKF 0.2 consumer to
the recommended 0.2 release is non-breaking. Initial semantic assessment and
category confirmation remain outside mechanical inference.

Unsupported mature unadopted repositories fail closed under [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md). Later
support extends the same Adopt operation rather than adding another public
command.

## Scope And Applicability

This Decision governs NKF release recommendation, compatibility signaling,
and consumer adoption process. It accepts derived process and tooling meaning;
it does not revise the already accepted NKF 0.2 format authority pair.

The recommended channel may move only through reviewed NKF repository state.
Every successful consumer permanently pins the resolved full archive SHA-256
and related exact release identities, so the channel never becomes a mutable
runtime dependency.

## Rationale

The consumer should state the desired governed outcome, not diagnose which
implementation subcommand is safe. Repository state is observable by the
adopter, while semantic compatibility and breaking approval remain human
authority acts. A mutable reviewed recommendation combined with an immutable
consumer pin gives one current entry point without weakening reproducibility.

## Alternatives Considered

Four public commands were rejected because they duplicate adopter state
knowledge and make invalid selection possible. The name `ensure` was rejected
by the Human Product Owner. A mutable Github `latest` target was rejected
because it lacks an independent exact trust anchor. Silent or checker-approved
breaking migration was rejected because conformance cannot supply acceptance
or repository authority.

## Consequences And Trade-Offs

Public onboarding and updating become one stable operation. The adopter must
carry stricter state resolution, predecessor validation, preflight reporting,
transactional application, and cross-path tests. Public documentation becomes
shorter, while internal mechanics remain available for deterministic agent
work and regression testing.

Every future recommendation must declare all supported predecessor
compatibility entries deliberately. A missing or contradictory entry blocks
Adopt instead of being inferred.

## Non-Claims

This Decision does not:

- accept consumer Product or Technology meaning;
- confirm any consumer Realization or remote enforcement state;
- extend initial adoption beyond the currently supported repository categories;
- implement acceptance-binding verification;
- make compatibility a checker-derived semantic judgement; or
- confirm or release the resulting implementation before its independent audit.
