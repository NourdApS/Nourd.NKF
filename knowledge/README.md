---
title: NKF Knowledge
summary: Begin with the Current System Realization. It is the consolidated, navigable view of the current architecture, topology, components, interfaces, implementation status, confirmation status, artifact mappings, and relevant Decision provenance.
created_at: 2026-07-28T22:01:17Z
---

# NKF Knowledge

Begin with the
[Current System Realization](realizations/current-system.md). It is the
consolidated, navigable view of the current architecture, topology,
components, interfaces, implementation status, confirmation status, artifact
mappings, and relevant Decision provenance.

Follow historical Decisions or Designs selectively when the reason,
alternatives, trade-offs, or predecessor state is needed. Do not reconstruct
the current system by routinely replaying every historical record.

## Current Entry Points

| Need | Start Here |
| --- | --- |
| Current implementation | [Current System](realizations/current-system.md) |
| Current normative meaning | [NKF 0.1 Specification](specifications/nkf-0.1.md) |
| Active work | [Tasks](tasks/README.md) |
| Adopted or superseded proposal reasoning | [Designs](designs/README.md) |
| Governing rationale | [Decisions](decisions/README.md) |
| Reviewed history and migration inputs | [Evidence](evidence/README.md) |
| Technology root meaning | [NKF](nkf.md) |

## Lifecycle

```text
Task → Design → Decision → Specification → Realization → Validation
```

- Tasks own work intent, constraints, acceptance criteria, and execution plans.
- Designs are governed proposals containing alternatives and trade-offs.
- Decisions record why a direction was adopted, rejected, or superseded.
- Specifications define current normative meaning.
- Realizations describe how that meaning is currently implemented.
- Validation evaluates a particular system snapshot.

The Current System Model belongs inside Realization knowledge. It is not
another layer or authority.

## Authority Boundaries

Markdown remains canonical human meaning. Executable YAML, Schemas, checker
behavior, fixtures, build artifacts, declarations, and validation results
cannot silently change or accept that meaning.

Acceptance of an exact record revision, adoption of a Design direction,
confirmation of a Realization, and conformance of a snapshot are separate
facts.

The root [README](../README.md) records repository identity and scope.
[AGENTS](../AGENTS.md) records repository working rules.
