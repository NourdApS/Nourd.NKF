---
title: NKF Knowledge
summary: Begin with the Current System Realization. It is the consolidated, navigable view of the current architecture, topology, components, interfaces, implementation status, confirmation status, artifact mappings, and relevant Decision provenance.
created_at: 2026-07-28T22:01:17Z
---

# NKF Knowledge

<!-- nkf-navigation:start -->
## NKF Navigation

- [Technology Root](nkf.md)
- [Tasks](tasks/README.md)
- [Designs](designs/README.md)
- [Decisions](decisions/README.md)
- [Specifications](specifications/README.md)
- [Realizations](realizations/README.md)
- [Current System](realizations/current-system.md)
- [Evidence](evidence/README.md)
<!-- nkf-navigation:end -->

Begin with the Current System Realization named in NKF Navigation. It is the
consolidated, navigable view of the current architecture, topology,
components, interfaces, implementation status, confirmation status, artifact
mappings, and relevant Decision provenance.

Follow historical Decisions or Designs selectively when the reason,
alternatives, trade-offs, or predecessor state is needed. Do not reconstruct
the current system by routinely replaying every historical record.

## Current Entry Points

| Need | Start Here |
| --- | --- |
| Current implementation | Current System in NKF Navigation |
| Current normative meaning | Specifications in NKF Navigation |
| Active work | Tasks in NKF Navigation |
| Adopted or superseded proposal reasoning | Designs in NKF Navigation |
| Governing rationale | Decisions in NKF Navigation |
| Reviewed history and migration inputs | Evidence in NKF Navigation |
| Technology root meaning | Technology Root in NKF Navigation |

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
