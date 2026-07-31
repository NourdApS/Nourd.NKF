# NKF Pre-Adoption Onboarding Protocol

This is the complete vendor-neutral procedure for preparing an empty or
small-document Product or Technology repository for initial NKF 0.1 adoption.
It applies before the project has a project-root `.nourd` directory.

The deterministic onboarder owns inspection, plan validation, native YAML,
release integration, staging, rollback, and checking. The participating human
or AI author owns semantic proposals in the candidate workspace. Neither may
accept project meaning or confirm a Realization by implication.

## Participating Capability

A participating author must be able to read every file in the emitted
workspace, preserve exact bytes, edit candidate Markdown without changing the
source project, classify the complete inspected corpus, run local commands,
and report uncertainty honestly.

If the author cannot review the complete corpus or determine a representation,
leave the entry unresolved. Do not run final onboarding and do not claim a
partial adoption.

## Inspect Without Project Mutation

Project authority supplies:

- the absolute project path;
- `product` or `technology` as the Root Profile choice;
- a safe project-relative knowledge root;
- the root identity and Title Case title;
- an immutable onboarding Task identity;
- an authority identifier; and
- a real UTC creation instant.

Run the public adopter's `inspect` command with those values and an empty
workspace outside the project. Inspection must leave the project unchanged.

Review `project_surfaces`, `package_scripts`, and `git` in the inspection
result. They bind existing AI instructions, package files, workflow files,
integration-owned paths, and the selected default branch into the same source
snapshot as the Markdown inventory. A later change to any bound surface makes
the plan stale and requires a new inspection rather than a silent merge.

If inspection reports `NKF-ONBOARDING-DEFER-NKF-014`, stop. Do not reduce the
corpus, discard lifecycle evidence, or relabel accepted knowledge merely to fit
the initial boundary.

## Resolve The Candidate Workspace

Read `inspection.json`, `plan.yaml`, and every file below `candidate/`.
Review the complete corpus, not a filename sample.

For each `documents` entry, choose exactly one representation:

```yaml
representation:
  kind: non_record
  non_record_kind: navigation
```

or:

```yaml
representation:
  kind: record
  declaration:
    contract: nkf.record
    id: example
    type: evidence
    body_contract: nkf.evidence
    title: Example
    governance:
      lifecycle: living
      status: draft
      authority: [human-product-owner]
    scope:
      root: example-root
    sections: []
    relationships: []
```

The record declaration deliberately omits `source`. The onboarder injects the
exact candidate path and SHA-256 and serializes the native YAML.

Do not infer record type, acceptance, Design disposition, Decision history,
normative status, Realization confirmation, or Root Profile from filenames,
directories, prose, or implementation. Ask project authority when meaning is
ambiguous. An unresolved entry is safer than an invented classification.

Existing candidate bytes are preserved by default. When an exact edit is
authorized, edit only the workspace copy. Add complete governed frontmatter
and body structure when the selected NKF representation requires it. Evidence
may preserve source bytes under its applicable exemption.

Canonical terms that intentionally retain non-Title-Case spelling belong in
`project.canonical_terms`. Do not add a term merely to hide inconsistent
casing.

## Seal Exact Candidate Bytes

After semantic resolution, run `seal --project <path> --plan <plan.yaml>`.
Sealing refreshes every candidate digest inside the plan. It does not mutate
the source project, validate acceptance, or prove conformance.

Review the resulting plan diff. Every changed candidate digest must correspond
to an intentional candidate edit. Every document must have one resolved
representation.

## Apply One Complete Candidate

Run `onboard` with the sealed plan, exact adopter, and independently trusted
release archive SHA-256. The onboarder rechecks the original Markdown,
project-surface, and Git-branch inspection,
verifies every candidate digest, generates native knowledge and integration,
validates an isolated full project candidate, and applies only a conformant
candidate.

If any step fails, report its structured diagnostic and confirm that the source
project remains unchanged. Do not work around target conflicts by deleting
consumer files or weakening validation.

## Read The Handoff Correctly

Report separately:

1. created, preserved, and intentionally changed paths;
2. Draft and unresolved project meaning;
3. Realization confirmation state;
4. full-bundle conformance and Governing Use state;
5. release and adopter digests;
6. local Git state only if separately inspected; and
7. remote workflow or protection state only if separately observed.

Successful onboarding creates a candidate and deterministic integration. It
does not accept the Draft root, accept a Specification, adopt a Design, confirm
a Realization, commit Git history, push a branch, or configure remote policy.

After success, the installed NKF authoring protocol and `nkf-authoring` skill
govern all later knowledge changes.
