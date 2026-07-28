# NKF knowledge

This directory is the authority entry point for Nourd Knowledge Format.

## Authority map

| Location | Authority |
| --- | --- |
| [`tasks/`](tasks/) | Durable Task intent, constraints, acceptance criteria, and execution plans |
| [`designs/`](designs/) | Evolving proposals; never accepted merely because they validate |
| [`decisions/`](decisions/) | Immutable accepted NKF decisions |
| [`specifications/`](specifications/) | Accepted normative NKF format and profile specifications |
| [`evidence/`](evidence/) | Governed evidence and migration provenance |

The root [`README.md`](../README.md) owns repository identity and scope.
[`AGENTS.md`](../AGENTS.md) owns working rules.

## Current authority state

[ADR 0001](decisions/0001-establish-independent-nkf-authority.md) establishes
this independent repository as the NKF Shared Technology authority.

Task [`NKF-003`](tasks/NKF-003-establish-independent-nkf-authority.md) governs
the source migration. Until its acceptance criteria are satisfied, every
imported source must expose whether it is an exact accepted snapshot, a
proposal, implementation evidence, or a new unconfirmed realization.
