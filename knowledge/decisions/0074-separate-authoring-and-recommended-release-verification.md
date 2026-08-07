---
id: adr-0074
type: decision
title: "ADR 0074: Separate Authoring And Recommended Release Verification"
summary: Keep the canonical NKF authoring handoff check focused on the current repository snapshot while retaining recommended-release verification as a separate mandatory release operation.
created_at: 2026-08-01T14:58:34Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
---

# ADR 0074: Separate Authoring And Recommended Release Verification

## Context And Problem

The repository's `npm run nkf:check` command included verification that the
current worktree build matched the already published recommended release. A
successor must pass that authoring handoff check before it can be confirmed or
released, but it cannot match the predecessor recommendation before release.
This created a circular validation boundary.

The Human Product Owner approved separating the two checks on
`2026-08-01T14:58:34Z`.

## Decision

`npm run nkf:check` remains the single supported authoring-handoff and
exact-commit continuous-integration command. It validates the current
repository snapshot, including agent guidance, engineering checks,
deterministic builds, public documentation, and self-hosted NKF conformance.

`npm run verify:recommended-release` remains the explicit verification command
for the recommended-release catalog. It is mandatory when reviewing, changing,
or publishing a release recommendation, but it is not part of ordinary
authoring validation for an unreleased successor.

The existing recommended release remains unchanged until a separate deliberate
[NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) release and recommendation process is authorized and completed.

## Scope And Applicability

This Decision governs the NKF repository enforcement and release-validation
surfaces. It does not change native NKF conformance, the consumer-installed
checker command, archive contents, release identities, or recommendation
contents.

## Rationale

Authoring validation must be able to evaluate the bytes proposed for a future
release. Recommendation verification instead evaluates whether a published
catalog entry is correctly bound to its already released artifacts. Keeping
both strict but separate preserves each purpose without making release a
precondition for pre-release validation.

## Alternatives Considered

Updating the recommendation before validation was rejected because it would
claim a release state that did not exist. Making the verifier compare the
successor to undocumented historical source was rejected because the current
release catalog does not bind a complete adopter source checkpoint. Removing
recommended-release verification entirely was rejected because release review
still requires it.

## Consequences And Trade-Offs

The package command chain, guidance verifier, repository documentation, and
successor Realization must expose the separated boundary. Release work must
invoke the recommendation verifier explicitly rather than relying on the
authoring check to invoke it incidentally.

## Compatibility

Existing released consumer pins and the current recommended-release catalog do
not change. Historical checks remain valid observations of their exact
snapshots. The successor only changes how this repository validates unreleased
work before a later release decision.

## Realization Requirements

Realization requires an exact package-script update, verifier coverage for the
new command chain, truthful repository guidance, a passing complete authoring
gate, and separate confirmation of the enforcement-surface successor.

## Non-Claims

This Decision does not:

- verify, publish, or recommend an [NKF-017](../tasks/completed/NKF-017-complete-portable-onboarding-topology.md) release;
- confirm the changed enforcement Realization;
- weaken release catalog verification;
- establish consumer conformance; or
- establish protected remote enforcement.
