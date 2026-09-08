---
title: "NKF-009: Extend Secret Scanning Across Governed Artifacts"
summary: Determine and implement the correct security-scanning boundary for Governed Validation Inputs that are not Markdown sources — governed artifacts, structured data, binary artifacts, and extension-added resources — transferred here deferred from the whole-repository audit and still awaiting separate activation.
created_at: 2026-07-30T17:03:21Z
---

# NKF-009: Extend Secret Scanning Across Governed Artifacts

## Human Direction

This Task was created deferred on `2026-07-30` when the
[NKF-007](NKF-007-knowledge-structure-and-confirmation.md) whole-repository
audit confirmed that governed artifact bindings may participate in validation
while the accepted secret scanner is source-oriented. That Task kept the
limitation explicit and transferred broader enforcement here, and
[ADR 0053](../../decisions/0053-repository-knowledge-architecture.md) records
this Task as the owner of governed-artifact secret-scan scope and enforcement
expansion. On `2026-09-08`
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md)
made the repository public and states explicitly that it does not close this
Task.

No human direction has resumed this Task. It stays deferred until separately
activated by the Human Product Owner.

This native rewrite on 2026-09-08 under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md)
replaced the legacy-locked NKF 0.4 source; the Task's substance, deferred
state, and creation direction are unchanged.

## Purpose

Determine and implement the correct security-scanning boundary for governed
validation inputs that are not Markdown sources.

## Scope

- inventory governed artifact kinds and their current security coverage;
- determine which secret rules apply to text, structured data, binary
  artifacts, or extension-added resources;
- define deterministic diagnostics, size and decoding limits, and recovery;
- update normative meaning before derived checker behavior; and
- add focused positive and negative fixtures.

## Guardrails

- Do not imply that current Markdown secret scanning covers every governed
  artifact.
- Do not scan arbitrary project files outside Governed Validation Inputs by
  implementation preference.
- Do not let checker behavior enlarge the governed boundary without accepted
  specification meaning.
- Do not begin this Task until separately activated.

## Current Boundary

At this Task's creation the native scan scope was that of NKF 0.1 under
[ADR 0026](../../decisions/0026-deterministic-secret-pattern-registry.md):
the exact safely readable UTF-8 bytes of `.nourd/knowledge/bundle.yaml`, every
direct `.yaml` declaration candidate under `.nourd/knowledge/records/`, and
every recursively discovered Markdown file under the resolved
`knowledge_root`, with exactly three blocking detector classes and no other
resource kind added by implication.

The live version today is NKF 0.8, with NKF 0.81 in preparation under
[NKF-038](NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md).
The accepted NKF 0.8 specification carries the same scan scope, while its
Technology Profile lets a bundle declare `governed_artifacts` that the native
scan scope does not list. The repository has been public at
`NourdApS/Nourd.NKF` since `2026-09-08` under
[ADR 0136](../../decisions/0136-adopt-the-public-repository-direction.md),
which raises the consequence of any secret that reaches a governed artifact;
that Decision changes no scan scope and does not close this Task. The gap this
Task owns is therefore unchanged.

## Origin

The [NKF-007](NKF-007-knowledge-structure-and-confirmation.md) audit confirmed
that governed artifact bindings may participate in validation while the
current secret scanner is source-oriented.
[NKF-007](NKF-007-knowledge-structure-and-confirmation.md) keeps that
limitation explicit and transfers broader enforcement here.

## Decision Applicability

### Applicable Decisions

| Reference | Kind | Carried Constraint |
| --- | --- | --- |
| [`adr-0006`](../../decisions/0006-pre-stable-evolution.md) | record | Enlarging the security-scan boundary is a consequential pre-stable change: it requires evidence, reproduction, compatibility classification, authority-first derivation, a versioned release, and deliberate consumer migration. |
| [`adr-0017`](../../decisions/0017-acceptance-provenance.md) | record | Declared governance, conformance, Realization confirmation, and external authority remain separate axes; a passing or failing scan is a conformance observation and accepts nothing. |
| [`adr-0019`](../../decisions/0019-validation-enforcement-and-diagnostics.md) | record | A high-confidence `security.secret-pattern` finding blocks native conformance and a passing scan does not prove absence; every machine-checkable rule is assigned to one enforcement layer without letting implementation create normative meaning. |
| [`adr-0026`](../../decisions/0026-deterministic-secret-pattern-registry.md) | record | The native scan inputs and detector registry are exact and deterministic; no resource kind joins the native scan by implication, and additional scan inputs or namespaced security rules require accepted extension or specification meaning. |
| [`adr-0053`](../../decisions/0053-repository-knowledge-architecture.md) | record | Governed-artifact secret-scan scope and enforcement expansion are transferred to this Task; the accepted architecture does not claim that the source-oriented scanner covers governed artifacts. |
| [`adr-0077`](../../decisions/0077-decision-applicability-gate.md) | record | This Task carries all applicable accepted Decisions and classifies each mandatory capability; unknown or unsupported requirements block completion without an explicit recorded Human Product Owner exception. |

### Mandatory Capabilities

| Capability | Finding | Verification | Exception |
| --- | --- | --- | --- |
| Governed artifact kinds and their current security coverage are inventoried | unknown | none | none |
| Secret rules for text, structured data, binary artifacts, and extension-added resources derive from accepted normative meaning before checker behavior | unknown | none | none |
| Diagnostics, size and decoding limits, and recovery are deterministic | unknown | none | none |
| Focused positive and negative fixtures exist for every covered artifact kind | unknown | none | none |

This gate was extracted at the native rewrite on 2026-09-08, replacing the
empty retrospective placeholder recorded at the NKF 0.2 self-migration.
