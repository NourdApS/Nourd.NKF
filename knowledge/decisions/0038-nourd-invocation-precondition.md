---
created_at: 2026-07-30T07:53:41Z
---

# ADR 0038: Establish Nourd Invocation Precondition

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Confirmation Source:** Direct confirmation in the NKF-003 discussion on
  30 July 2026 after review of Finding 5 and its recommended resolution
- **Finding:** Finding 5 in
  [`../evidence/audits/nkf-0.1-native-checker-realization-findings.md`](../evidence/audits/nkf-0.1-native-checker-realization-findings.md)

## Context

Native NKF fixes its manifest at `.nourd/knowledge/bundle.yaml`, evaluates
`parse` before `project`, and stores a completed full-bundle result at
`.nourd/validation-result.json`.

When project-root `.nourd` is absent, the fixed manifest is necessarily
missing and fails the earlier parse phase. The later project phase cannot
produce `project.nourd.missing`. A validation-only checker also cannot persist
a full-bundle result without creating `.nourd`, which would mutate the target
into an initialized NKF project.

The stable `project.nourd.missing` diagnostic is therefore unreachable in a
completed native result and cannot have a complete conformance fixture.

## Decision

The project-root `.nourd` directory is a native-checker invocation
precondition.

Before native validation begins, `.nourd` must already exist and safely
resolve to a directory inside the project root. When that precondition is not
met:

- the target is not an initialized NKF project for this invocation;
- no `nkf.validation-result` is constructed or persisted;
- the checker reports an execution-level failure outside the native
  diagnostic contract;
- the checker does not create, replace, repair, or follow an unsafe `.nourd`
  path; and
- no conformance, acceptance, or Realization result is claimed.

Once the precondition passes, existing project-phase file-kind, containment,
and qualified symlink rules continue to apply to safely observable project
paths.

`project.nourd.missing` is retired from the NKF 0.1 stable native diagnostic
registry. `bundle.manifest.missing` remains the native parse diagnostic when
the already initialized `.nourd` directory exists but its fixed manifest is
missing.

The current phase order and full-bundle persistence location do not change.

## Compatibility

This is a governed pre-stable NKF 0.1 correction. It removes one unreachable
diagnostic identity and makes checker invocation failure explicit; it does
not weaken the required project-root `.nourd` layout.

Existing completed results never contained the retired diagnostic under the
accepted phase model. Consumers must nevertheless bind to the exact revised
NKF 0.1 authority and checker artifact rather than inferring compatibility
from the unchanged `0.1` coordinate.

## Non-Claims

This Decision does not:

- accept exact replacement Markdown/YAML or schema bytes;
- confirm checker or fixture completeness;
- establish distribution, release, installation, or support behavior;
- initialize a consumer project;
- produce a consumer conformance result;
- accept consumer knowledge; or
- confirm a Realization.
