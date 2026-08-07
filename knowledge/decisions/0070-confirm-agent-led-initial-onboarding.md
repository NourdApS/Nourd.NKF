---
id: adr-0070
type: decision
title: "ADR 0070: Confirm Agent-Led Initial Onboarding"
summary: Confirm the exact independently audited and published NKF-015 successor Realizations and complete the agent-led initial-onboarding Task while preserving the consumer-operation and deferred NKF-014 boundaries.
created_at: 2026-07-31T18:40:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
---

# ADR 0070: Confirm Agent-Led Initial Onboarding

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit authorization to independently verify, confirm, commit,
  push, publish, and close [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md)
- **Predecessor:** [ADR 0069](0069-agent-led-initial-onboarding.md)

## Context And Problem

[ADR 0069](0069-agent-led-initial-onboarding.md) adopts agent-led semantic assessment for the two supported initial
onboarding categories while retaining deterministic mechanical capture,
sealing, application, rollback, and validation. It does not implement or
confirm that direction.

[NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) can complete only after its exact successor implementation satisfies
the accepted requirement matrix, an independent audit records and resolves
every material finding, the deliberate recommendation and public projection
are published and freshly verified, and an authorized Decision confirms the
resulting Realization bytes without deriving confirmation from validation or
external operational state.

## Decision

The authorized technical reviewer confirms these exact successor
Realizations:

| Record | Source | Confirmed SHA-256 |
| --- | --- | --- |
| [`nkf-0.1-native-realization`](../realizations/current-system.md) | `knowledge/realizations/current-system.md` | `24f59bcf284e283f18bb81449a36786a22cf16d68bc8856462916835f8692cf8` |
| [`nkf-agent-led-initial-onboarding`](../realizations/current/agent-led-initial-onboarding.md) | `knowledge/realizations/current/agent-led-initial-onboarding.md` | `c7f00c0a31e76693febc74c11128a79d4794eac77278cd7c5d73a0b1abe76e39` |
| [`nkf-layered-contract-enforcement`](../realizations/current/layered-contract-enforcement.md) | `knowledge/realizations/current/layered-contract-enforcement.md` | `c579a94ef6d19563f180d7d7a0e768ca18cba9636d5adc9f153ea1383a797452` |
| [`nkf-release-documentation-and-adoption`](../realizations/current/release-documentation-and-adoption.md) | `knowledge/realizations/current/release-documentation-and-adoption.md` | `34475ad4d7313a0ca7e7be6d14ebbf53bd419d90e9db118b95c3ee0a2bf3fc4c` |

The independent completion audit at
`knowledge/evidence/audits/nkf-015-agent-led-initial-onboarding-audit.md`
has SHA-256
`859e3af0aa9565b58d5f6e37a0494281f405ce79d2abe0a13a302375f1ebd0be`.
The separate publication and verification Evidence at
`knowledge/evidence/audits/nkf-015-publication-and-verification.md` has
SHA-256
`e9f5ea892826311a97563277fc72721cc9c681c89b87d31aee3a7d39b08c16c6`.
Both support this review; neither can confirm a Realization by itself.

[NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md) is Completed for:

1. complete agent-led assessment of unadopted Empty and Tiny Knowledge
   repositories through one portable, vendor-neutral procedure;
2. evidence-backed category recommendation, automatic Category 1 progression,
   mandatory Category 2 human confirmation, and explicit negative or
   indeterminate override handling;
3. complete mechanical project capture without deterministic semantic
   classification;
4. plan-bound assessment, exact Markdown representation coverage, safe-path
   enforcement, deterministic sealing, source and candidate drift rejection,
   native generation, full staged validation, transaction, rollback, and
   idempotence;
5. byte-identical portable onboarding skills and verified neutral protocol;
6. updated public adopter, public documentation, complete Product and
   Technology examples, deliberate recommendation, and fresh-clone
   verification;
7. the bounded NKF-repository-only Task-authorization policy in `AGENTS.md`,
   kept outside portable NKF protocol meaning; and
8. the final requirement-by-requirement audit and exact-source workflow
   observation.

## Scope And Applicability

This confirmation applies only to the exact Realization and Evidence bytes
listed above. It confirms the current agent-led onboarding, release and
documentation integration, layered enforcement, and consolidated
current-system accounts.

Consumer-repository onboarding is outside [NKF-015](../tasks/completed/NKF-015-agent-led-initial-onboarding.md). The Human Product Owner
removed that operation from the Task and retained it for separate manual use.
This Decision neither performs nor confirms any consumer onboarding.

Category 3 through Category 10 criteria and their onboarding behavior remain
deferred to [NKF-014](../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md). Protected merge enforcement remains deferred to [NKF-012](../tasks/deferred/NKF-012-activate-protected-merge-gate.md),
and acceptance-binding resolution remains deferred to [NKF-016](../tasks/deferred/NKF-016-deliver-acceptance-binding-verification.md).

This Decision does not change the NKF 0.1 Specification, executable YAML
companion, JSON Schemas, Root Profiles, checker bytes, native eight-file
release archive, acceptance model, confirmation model, or conformance
meaning. The successor adopter and public projection remain separately
derived and digest-bound surfaces.

## Rationale

The independent audit found two material integration gaps before confirmation:
the then-current deliberate recommendation still bound the predecessor
adopter, and the repository-specific `AGENTS.md` change was outside the
self-hosted governed input set. Both were resolved under explicit Human
Product Owner authorization without broadening portable NKF meaning.

The coherent successor passes nineteen test files with 136 tests, guidance
verification, deterministic checker and adopter builds, public-documentation
verification, and full-bundle self-hosting. Private source commit
`53ae5217f68731d953f3bf616a578adeb033bb03` passed exact-commit workflow run
`30655408945`. Public commit
`a14766ca1bdc67bfd8fb9e6d73355fc019017a90` matched its deterministic
28-file staging projection in a fresh clone, all 27 manifest-bound digests
matched, and both complete examples passed the confirmed checker without
diagnostics.

Those facts make the implementation account sufficiently evidenced for the
authorized reviewer to confirm it, but the confirmation authority remains
this Decision rather than any checker result, workflow, publication, Git
operation, or consumer behavior.

## Alternatives Considered

Confirming the first locally green candidate was rejected because the audit
found unresolved recommendation and repository-instruction bindings.

Keeping deterministic repository-category thresholds was rejected by ADR
0069 because counts and frontmatter tokens cannot establish semantic meaning
or maturity.

Adding the repository-specific Task-authorization policy to the portable NKF
protocol was rejected because it is a local operating preference, not an NKF
consumer contract.

Making consumer onboarding a completion condition was rejected because the
Human Product Owner explicitly removed that external operation and will
perform it manually.

Creating a new native archive was rejected because the accepted
Specification, executable companion, Schemas, checker, and existing archive
bytes did not change.

## Consequences And Trade-Offs

NKF now provides one complete agent-led onboarding path for the two supported
unadopted Product and Technology starting categories. Users receive semantic
review and human confirmation where needed while deterministic tooling retains
the exact safety and conformance boundary.

The path deliberately requires a capable participating agent or an equivalent
human following the complete neutral procedure. The executable cannot
independently prove that a semantic category recommendation is true.

Later repository categories remain unavailable rather than being guessed.
The public adopter and documentation are updated without moving the confirmed
native archive or silently migrating existing consumers.

## Non-Claims

This Decision does not:

- accept, conform, confirm, or establish Governing Use readiness for a
  consumer repository;
- prove that an agent interpreted every repository file correctly;
- onboard or modify a consumer repository;
- define or activate Category 3 through Category 10 onboarding;
- turn the local `AGENTS.md` Task policy into portable NKF meaning;
- make Github workflow or public-repository state part of native NKF
  authority;
- publish a new native NKF 0.1 archive;
- activate protected merge enforcement or acceptance-binding resolution; or
- allow passing validation to replace human acceptance or delegated
  Realization confirmation.
