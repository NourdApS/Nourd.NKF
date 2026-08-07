---
id: adr-0010
type: decision
title: "ADR 0010: Accept Canonical NKF 0.1 Markdown"
summary: The exact reconciled composite Markdown revision is accepted as the official canonical NKF 0.1 specification at ../specifications/nkf-0.1.md.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0010: Accept Canonical NKF 0.1 Markdown

- **Acceptance source:** Direct informed confirmation in the [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion
  on 29 July 2026

## Decision

The exact reconciled composite Markdown revision is accepted as the official
canonical NKF 0.1 specification at
[`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md).

| Property | Accepted value |
| --- | --- |
| NKF version | `0.1` |
| SHA-256 | `a0096d74fc444d197ce9c4c4fce78181c80fdb5bd633e2fd605b659a610f1151` |
| Accepted source baseline | `kaveh6202/Nourd.Studio@13a82fbc1b72c1350e9765f59d1538c375f3fa69` |
| Baseline SHA-256 | `77869d6f6cfe2ba8086e4eeba28fc5e545aa2c1896b9a28488b6d53b1b03bc5a` |

This acceptance promotes the exact copied bytes, including their documented
source provenance. The historical Studio source remains immutable evidence.

## Consequences

Markdown is the accepted human-readable normative authority for NKF 0.1. The
YAML companion may now be authored against this exact digest, but remains a
proposal until separately accepted. This Decision does not confirm a YAML
realization, schema, checker, fixture, distribution, conformance result, or
consumer migration.
