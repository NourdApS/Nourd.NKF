---
created_at: 2026-07-30T17:03:21Z
---

# NKF-009: Extend Secret Scanning Across Governed Artifacts

- **Task:** `NKF-009`
- **Status:** Deferred
- **Owner:** Nourd ApS

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

## Origin

The NKF-007 audit confirmed that governed artifact bindings may participate in
validation while the current secret scanner is source-oriented. NKF-007 keeps
that limitation explicit and transfers broader enforcement here.
