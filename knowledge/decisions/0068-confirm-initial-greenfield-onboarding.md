---
id: adr-0068
type: decision
title: "ADR 0068: Confirm Initial Greenfield Onboarding"
summary: Confirm the exact independently audited NKF-013 successor Realizations and complete the initial Product and Technology greenfield-onboarding Task while preserving the deferred NKF-014 expansion seam.
created_at: 2026-07-31T12:06:29Z
record_lifecycle: immutable
record_status: accepted
task: NKF-013
---

# ADR 0068: Confirm Initial Greenfield Onboarding

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit delegation to complete, independently audit, confirm,
  commit, and push [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md)
- **Predecessor:** [ADR 0067](0067-initial-greenfield-onboarding.md)

## Context And Problem

[ADR 0067](0067-initial-greenfield-onboarding.md) adopts deterministic, AI-neutral initial onboarding for empty and
small-document Product and Technology repositories. It does not implement or
confirm that direction. [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) can complete only after the exact successor
implementation satisfies its full validation matrix, an adversarial audit
repairs every material finding, external execution and public-byte facts are
recorded separately, and an authorized Decision confirms the resulting
Realization bytes without deriving confirmation from those observations.

## Decision

The authorized technical reviewer confirms these exact successor
Realizations:

| Record | Source | Confirmed SHA-256 |
| --- | --- | --- |
| [`nkf-0.1-native-realization`](../realizations/current-system.md) | `knowledge/realizations/current-system.md` | `2a868eb2e5180089f18aeba63851bf261877e5c9d61bf875371b3eaab5364199` |
| [`nkf-initial-greenfield-onboarding`](../realizations/current/initial-greenfield-onboarding.md) | `knowledge/realizations/current/initial-greenfield-onboarding.md` | `ee93d89964c09a57fae98b8669284501bcd95b8101d132c04bd4b3e34336ce3f` |
| [`nkf-release-documentation-and-adoption`](../realizations/current/release-documentation-and-adoption.md) | `knowledge/realizations/current/release-documentation-and-adoption.md` | `0212edf11aeb80c92b8c75b719433c68bab44a5a30ca8b3422eccd8bf0b92675` |
| [`nkf-layered-contract-enforcement`](../realizations/current/layered-contract-enforcement.md) | `knowledge/realizations/current/layered-contract-enforcement.md` | `811ed5c3544d890ad3fe1efcf40187478286bc6908350562342549bbe0563044` |
| [`nkf-self-hosting`](../realizations/current/self-hosting.md) | `knowledge/realizations/current/self-hosting.md` | `0eb18f6477db9f9820055313c8dd96e69fcee000325ba8ceb04240b671c3a81a` |

The separate
`knowledge/evidence/audits/nkf-013-initial-greenfield-onboarding-completion-audit.md`
revision with SHA-256
`c8409d6523adb17aa09338dd85cba3a67c96b92540af79d895fbe64a16d0275e`
supports this review. It remains Evidence and cannot confirm a Realization by
itself.

[NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) is Completed for:

1. deterministic inspection and stale-plan rejection over the relevant
   project surface;
2. an externally reviewable, fully resolved, and sealed semantic plan;
3. Product and Technology Draft scaffolds with honest lifecycle status;
4. exact native declaration and source-digest generation;
5. verified pinned integration, complete isolated validation, whole-project
   replacement or rollback, and same-plan idempotence;
6. provider-neutral onboarding protocol and byte-identical portable skills;
7. complete empty and small-document Product and Technology public guidance;
8. local and exact-commit consumer and repository exercises;
9. content-addressed adopter and public-projection distribution; and
10. the final requirement-by-requirement completion audit.

## Scope And Applicability

This confirmation applies only to the exact Realization and completion-audit
bytes listed above. It confirms the current initial-onboarding, release and
documentation integration, layered enforcement, self-hosting, and
consolidated current-system accounts.

It does not change the NKF 0.1 Specification, executable YAML companion, JSON
Schemas, Root Profiles, checker bytes, native eight-file release archive,
acceptance model, confirmation model, or conformance meaning. The successor
adopter remains a separately digest-bound derived artifact.

Agent SDK was evaluated against the accepted eligibility rule. Its mature
Task, Design, Decision, and acceptance history makes it ineligible for this
greenfield path, so it remains unmodified and is deliberately deferred to
[NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) rather than used to expand [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md).

## Rationale

The final audit rejected the first green candidates and repaired three
material gaps: incomplete inspection-snapshot coverage, intermediate
knowledge-root symbolic-link traversal, and deprecated Github Actions runtime
pins. The resulting local suite passes nineteen test files with 135 tests and
the full canonical project command.

On exact implementation commit
`b50493ddb42c87ed426eeb3bb11d3568652d8130`, contract run `30628878063`
and consumer-adoption run `30628889305` passed with empty annotation sets.
Public commit `772d57370a094269ee1d9287ae871b0b3c7f64de` was freshly cloned,
matched the 28-file staged projection, satisfied every manifest digest, and
produced zero diagnostics for both complete examples. These facts make the
Realization accounts sufficiently evidenced for the delegated reviewer to
confirm them, but the authority act remains this Decision rather than any
check, workflow, publication, or Git operation.

The inspect-plan-apply boundary preserves a deliberate [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) seam: later
analyzers, provenance reconstruction, checkpointing, resumability, and
advanced recovery may produce richer resolved candidates before the same
fail-closed validation and transactional application boundary.

## Alternatives Considered

Completing [NKF-013](../tasks/completed/NKF-013-initial-greenfield-onboarding.md) after the first locally green candidate was rejected
because independent inspection found material safety and remote-runtime gaps.

Forcing Agent SDK through the initial path was rejected because corpus size
does not erase mature authority and lifecycle history.

Changing native NKF 0.1 or manufacturing a new native archive was rejected
because onboarding changed derived adoption behavior rather than normative
format, Schema, or checker bytes.

Treating remote runs, public publication, or checker conformance as
confirmation was rejected because operational systems and validation do not
exercise semantic confirmation authority.

Expanding the Task into reconstruction, long-lived resumability, or protected
merge enforcement was rejected because [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) and [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md) own those distinct
boundaries.

## Consequences And Trade-Offs

NKF now provides one complete initial onboarding path for eligible unadopted
Product and Technology repositories. Users need not manually construct native
YAML or integration files, but documented repositories still require an
explicit semantic-plan review before application.

The initial path remains intentionally narrow. Repositories with mature
lifecycle knowledge, large or complex corpora, source-derived reconstruction
needs, or advanced interrupted-state recovery receive an explicit [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md)
deferral instead of an unsafe partial migration.

The confirmed self-host state contains 103 record declarations, 60 explicit
non-record sources, and 119 governed artifacts. The protected `master` gate
remains unavailable and unconfirmed under deferred [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md).

## Non-Claims

This Decision does not:

- accept, conform, confirm, or establish Governing Use readiness for a
  consumer project;
- infer Product or Technology meaning from source code, paths, or prose;
- onboard or modify Agent SDK;
- activate [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) or promise backward-compatible operational plan additions;
- make external Github state, package state, or public repository state part
  of native NKF authority;
- publish a new native NKF 0.1 release archive;
- activate required checks, pull-request approval, bypass rules, or protected
  merge enforcement; or
- allow passing validation to replace human acceptance or delegated
  Realization confirmation.
