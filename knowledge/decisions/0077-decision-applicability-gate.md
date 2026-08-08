---
id: adr-0077
type: decision
title: "ADR 0077: Decision Applicability Gate"
summary: Adopt the Decision Applicability Gate direction for NKF 0.11, establishing a required deterministic gate in every Task non-record, closed verification-level and capability-finding vocabularies, a completion fail-closed rule, and normative claim rules.
created_at: 2026-08-06T22:10:25Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0077: Decision Applicability Gate

## Context And Problem

The bound
[NKF-019 Nourd Tiles Evidence](../evidence/audits/nkf-019-nourd-tiles-decision-applicability-failure.md)
shows an accepted conditional renderer decision losing its conditions in
successor Tasks, a harness silently changing the renderer without
re-evaluating the applicable decisions, validation levels being mixed, and
proxy evidence being represented as outcome success until direct human
inspection contradicted it. NKF 0.1 validates only Task identity, status, and
placement, so every deterministic check passed while that failure developed.

The Human Product Owner directed [NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md) to establish the smallest coherent
NKF-owned safeguard. On `2026-08-06`, the Human Product Owner adopted the
proposed gate direction, directed that the gate be required on all Tasks
including completed history, and directed versioned delivery as NKF `0.11`
under [ADR 0076](0076-versioned-contract-evolution.md).

## Decision

NKF adopts the direction proposed by this exact Design revision:

| Design | Accepted SHA-256 |
| --- | --- |
| `knowledge/designs/adopted/decision-applicability-gate.md` | `546004cc87e7ab3f8b462590e988a77714d84542ad21243573501b8e0cd563c0` |

The adopted direction establishes, as NKF 0.11 Common meaning:

1. one required Decision Applicability Gate in every Task non-record: a
   `Decision Applicability` section containing an `Applicable Decisions`
   subsection and a `Mandatory Capabilities` subsection, each carrying either
   an exact canonical no-applicability sentence or one deterministic table;
2. extraction rows that carry applicable accepted decisions with their
   conditions, negative findings, rejected capabilities, supersessions, and
   unresolved unknowns, resolving same-bundle references to accepted Decision
   records and marking external authority explicitly;
3. closed vocabularies: verification levels `data-validity`,
   `adapter-compatibility`, `runtime-behaviour`, `human-experience`, and
   `production-suitability`, and capability findings `proven`, `unsupported`,
   and `unknown`;
4. a completion fail-closed rule: a completed Task may not carry a mandatory
   capability finding of `unsupported` or `unknown` without an explicit Human
   Product Owner exception;
5. deterministic checker enforcement of gate presence on every Task,
   structure, vocabulary, reference resolution, and the completion rule,
   through five registered diagnostics;
6. normative claim rules: verification claims name their level and are never
   represented at a higher level; `runtime-behaviour` and higher require
   direct observation of the required outcome, and available input data,
   invoked methods, differing screenshots, simulated gestures, and process
   survival are insufficient; restatements of conditional decisions carry
   their conditions; and changes to renderer, provider, platform, data
   format, architecture, harness, or a mandatory requirement obligate gate
   re-evaluation before dependent claims;
7. authoring protocol and portable skill procedure carrying extraction,
   re-evaluation, and direct-outcome obligations; and
8. retrospective gating of pre-existing Tasks at migration: truthful,
   explicitly retrospective, never fabricating a historical extraction.

## Scope And Applicability

This Decision governs the NKF 0.11 Specification revision, executable
companion, Schemas, checker, diagnostics, onboarding output, fixtures,
tests, authoring protocol and skills, public documentation, self-hosting
migration, and Realization knowledge required by [NKF-019](../tasks/completed/NKF-019-decision-applicability-gate.md). It binds adopted
repositories only when they deliberately migrate to NKF 0.11. It does not
modify Nourd Tiles, Wonderer, or any other consumer repository.

## Rationale

The evidenced failure class survives prose discipline: extraction,
classification, and level separation must be structurally visible to humans
and mechanically checkable where structure permits, while semantic truth
stays with human review and audit. Requiring the gate on every Task keeps one
uniform contract, makes deletion structurally detectable, and lets a
repository's complete Task history answer which decisions governed it.
Versioned delivery preserves NKF 0.1 authority for existing consumers.

## Alternatives Considered

The adopted Design records the considered alternatives: a
procedure-only safeguard, Task frontmatter fields, promoting Tasks to
records, structuring Decision conditions instead, a separate gate record
kind, and mechanical semantic-contradiction detection. Each was rejected for
the reasons stated there; structuring Decision conditions remains possible
complementary future work.

## Consequences And Trade-Offs

Every Task in a migrating repository gains a required section, including
completed history, and authors carry a real extraction burden at Task
creation. The checker gains a bounded parsing pass and five diagnostics.
Structural conformance can still carry semantically false claims; the gate
makes such claims explicit, attributable, and auditable rather than
impossible. Migration cost lands deliberately with each repository owner.

## Realization Requirements

Realization requires the NKF 0.11 authority pair accepted as exact bytes, the
derived Schemas, checker rules, diagnostics registry entries, fixtures,
tests, onboarding and repair output, protocol and skill updates, digest
re-pins, public documentation, and this repository's own migration to NKF
0.11 with truthful gates on every Task. The exact successor must pass
`npm run nkf:check`, then undergo independent audit and separate
confirmation before release.

## Non-Claims

This Decision does not:

- itself revise or accept the NKF 0.11 Specification or executable companion;
- implement or confirm the successor Realization;
- claim any current Task already satisfies the gate;
- migrate, validate, or judge any consumer repository;
- publish or release an artifact; and
- claim that deterministic checking proves semantic completeness or truth.
