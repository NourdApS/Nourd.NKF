---
created_at: 2026-07-30T15:59:54Z
---

# Nourd Knowledge Format

## Technology Definition

Nourd Knowledge Format, abbreviated NKF, is a Nourd ApS-maintained knowledge
format with stable identity `NKF`. It is a Company-owned Technology that
defines portable, human-readable, machine-verifiable contracts for durable
governed knowledge.

## Purpose And Problem

NKF exists so people and machines can share exact knowledge structure without
letting metadata, validators, repositories, or operational systems silently
become authorities for meaning. It addresses source traceability, explicit
authority, deterministic validation, profile-specific semantics, and
deliberate evolution.

## Consumers And Use Contexts

Products and Technologies may use NKF when their project knowledge needs a
canonical Markdown form and executable validation. Each consumer retains
authority for its own meaning and deliberately selects a supported Root
Profile. Nourd Knowledge Engine may consume NKF but does not define it.

## Capabilities And Contracts

NKF 0.1 supplies a Common Specification plus Product and Technology Root
Profiles, bundle and record declarations, exact source bindings, body and
vocabulary contracts, deterministic diagnostics, validation results,
extensions, and a native checker contract. The canonical Specification owns
the exact requirements.

## Scope Authority And Boundaries

NKF owns its format, profiles, contracts, schemas, diagnostics, checker
distribution, compatibility, migration, security, and lifecycle. It does not
own consumer meaning or acceptance, operational instances or state, external
systems, Nourd Knowledge Engine behavior beyond supported contracts, or a
future Nourd Knowledge Protocol runtime.

## Technology Map

The canonical NKF 0.1 Specification defines normative behavior. Decisions
preserve accepted choices; Designs preserve proposals and rationale;
Realizations bind the specification to schemas, checker source, tests,
fixtures, build tooling, and project configuration; Evidence preserves
reviewed sources and observations.

## Versioning Compatibility And Migration

`nkf_version: "0.1"` is the sole NKF version coordinate. NKF remains
pre-stable and open to evidence-driven change. Consequential changes require
governed evidence, compatibility analysis, explicit acceptance, coordinated
authority and realization updates, a versioned release, and deliberate
consumer migration.

## Distribution Support And Security

Native distribution uses content-addressed release artifacts and exact
digests. The checker fails closed when required contracts or profiles are
unsupported and scans the accepted native secret-pattern registry. Passing
validation proves only the stated conformance level, not acceptance,
correctness, semantic adequacy, or confirmed Realization.

## Evolution And Retirement

Implementation and consumer use may expose specification, checker,
distribution, migration, or conformance defects. Findings follow the governed
pre-stable change process and cannot mutate NKF by implication. Deprecation
or retirement requires explicit compatibility, provenance, release, and
migration treatment.
