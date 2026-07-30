---
id: adr-0011
type: decision
title: "ADR 0011: Accept NKF 0.1 YAML Companion"
summary: The exact YAML revision at ../../contracts/nkf/0.1/nkf.yaml is accepted as the executable companion to the canonical NKF 0.1 Markdown specification.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0011: Accept NKF 0.1 YAML Companion

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003 discussion
  on 29 July 2026

## Decision

The exact YAML revision at [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml)
is accepted as the executable companion to the canonical NKF 0.1 Markdown
specification.

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `a0096d74fc444d197ce9c4c4fce78181c80fdb5bd633e2fd605b659a610f1151` |
| `contracts/nkf/0.1/nkf.yaml` | `9b7fe0f8bd241b8d50cc2d8adc4151feed356b892eb97e10903d881ea37c1aa3` |

Markdown remains the authoritative human-readable meaning. YAML is the
accepted executable representation of the deterministic contracts bound above.
Any mismatch fails closed under ADR 0007.

## Consequences

JSON Schemas, checker tables, fixtures, types, and distributions may now be
derived from or verified against this accepted pair. Their existence, validity,
distribution, and conformance results remain separate realization work and are
not claimed by this Decision.
