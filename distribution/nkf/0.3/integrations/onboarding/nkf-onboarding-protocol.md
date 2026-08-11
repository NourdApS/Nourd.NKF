# NKF Pre-Adoption Onboarding Protocol

NKF Version: 0.3

This is the complete vendor-neutral procedure for preparing an Empty
Repository or a Tiny Knowledge, No Source Or Configuration repository for
initial NKF 0.3 adoption. It applies before the project has a project-root
`.nourd` directory.

The participating agent owns complete repository review, semantic assessment,
evidence, recommendation, uncertainty, and candidate proposals. Project
authority owns the Root Profile, Category 2 confirmation, overrides, and
project meaning. Deterministic tooling owns exact source capture, plan
completeness, sealing, native generation, release integration, staging,
rollback, and checking. None of those actions accepts meaning or confirms a
Realization by implication.

## Verify Participating Capability

Before starting, verify that the authoring surface can:

1. read the complete repository tree, including hidden project content;
2. distinguish repository instructions from normative NKF authority;
3. inspect exact project-relative files without sampling the corpus;
4. preserve exact bytes and edit only a candidate workspace before final
   application;
5. run the internal mechanical capture and seal stages and the public Adopt
   operation; and
6. expose evidence and uncertainty without calling its recommendation
   deterministic, accepted, confirmed, or conformant.

If the surface cannot review the complete repository, stop. Do not claim that
a partial review establishes an onboarding category.

## Review The Complete Repository

Read applicable repository instructions, then recursively inspect every
project entry except top-level `.git` implementation metadata. Do not limit
the review to the knowledge root, Markdown, filenames, top-level directories,
or a fixed file count.

For the assessment, distinguish:

- useful knowledge;
- meaningful source implementation;
- project configuration;
- incidental material; and
- unresolved items.

Editor settings, workflow directories, placeholder README files, package
files, generated output, and other conventional paths are not categories by
themselves. Read their contents and judge their actual project meaning. Do not
infer acceptance, Design disposition, Decision history, normative status,
Realization confirmation, or Root Profile from a filename, directory, prose,
frontmatter, or implementation.

Record a concise evidence-backed assessment. Identify the paths or repository
surface supporting each material finding and state any uncertainty.

## Recommend The Supported Category

Recommend exactly one supported category only when the complete review
supports it:

1. **Empty Repository:** no useful knowledge, source implementation, or
   project configuration. Incidental material may exist. The agent may proceed
   without a separate human category confirmation only after explaining why
   the repository is effectively empty.
2. **Tiny Knowledge, No Source Or Configuration:** a small knowledge corpus
   that fits one complete semantic review and no meaningful source
   implementation or project configuration. This always requires explicit
   human confirmation.

`Tiny` is a semantic reviewability judgment. Do not substitute a numeric file
or byte threshold.

If neither category is supportable, or the result is uncertain, report that
initial onboarding is not recommended, cite the evidence, and stop without
guessing a later repository category. Refer the future path to deferred
`NKF-014`.

A human may explicitly direct Category 2 after a negative or indeterminate
recommendation. Record that as an override with the authority, UTC confirmation
time, and rationale. Human direction cannot override a mechanical failure such
as incomplete coverage, changed bytes, an escaping path, a prohibited symbolic
link, conflicting `.nourd` state, release failure, or checker failure.

## Resolve Project Authority Inputs

Before mechanical capture, obtain:

- the absolute project path;
- `product` or `technology` as the authority-selected Root Profile;
- a safe project-relative knowledge root;
- the root identity and Title Case title;
- an immutable onboarding Task identity;
- an authority identifier; and
- a real UTC creation instant.

Common rules are inherited and Common is not selectable. The Root Profile is
never inferred from the repository assessment.

## Capture Exact Project Bytes

Run the public adopter's `inspect` command with the authority inputs and an
empty workspace outside the project. Despite its retained command name, this
is mechanical capture inside the agent workflow—not a repository survey or
semantic classifier.

Inspection must leave the project unchanged. It emits `inspection.json`,
`plan.yaml`, and exact candidate copies of every Markdown file under the
selected knowledge root. The inspection contains a complete project entry
manifest, excluding top-level `.git` implementation metadata, plus relevant
integration surfaces and Git-root and branch observations.

Require `mechanically_ready: true`. A blocked result is a mechanical failure,
not a category decision. Compare the manifest with the entries used in the
agent review. If the agent missed content, redo the semantic assessment before
continuing.

Any later project-entry, relevant integration-surface, or Git-binding change
makes the plan stale. Capture a new workspace rather than silently merging
snapshots.

## Record The Assessment In The Plan

Replace the unresolved `assessment` mapping in `plan.yaml`. A recommended
Empty Repository example is:

```yaml
assessment:
  category: empty-repository
  assessed_by: participating-agent
  assessed_at: 2026-07-31T14:00:00Z
  recommendation: recommended
  summary: The complete repository contains only incidental placeholder material.
  evidence:
    - subject: README.md
      classification: incidental
      finding: The file contains only generic placeholder text and no project meaning.
  confirmation:
    status: not-required
```

A confirmed Category 2 example is:

```yaml
assessment:
  category: tiny-knowledge-no-source-or-configuration
  assessed_by: participating-agent
  assessed_at: 2026-07-31T14:00:00Z
  recommendation: recommended
  summary: The complete repository contains a tiny early knowledge set and no meaningful source or configuration.
  evidence:
    - subject: knowledge/
      classification: knowledge
      finding: Every document was read in one complete review.
  confirmation:
    status: confirmed
    authority: human-product-owner
    confirmed_at: 2026-07-31T14:05:00Z
    override: false
    rationale: The authority confirms Category 2 for this exact repository snapshot.
```

For a human-directed Category 2 override, retain `not-recommended` or
`indeterminate`, set `override: true`, and record the exact rationale. Do not
rewrite the agent recommendation to make the human decision appear automatic.

The plan is operational candidate state. Its assessment is not canonical
project meaning and deterministic validation cannot prove that the semantic
judgment is true.

## Resolve The Candidate Workspace

Read `inspection.json`, `plan.yaml`, and every file below `candidate/`. For
each `documents` entry, choose exactly one representation:

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

The record declaration omits `source`; the onboarder injects the exact
candidate path and SHA-256 and serializes native YAML.

The generated plan initially chooses non-conflicting scaffold paths. When a
complete semantic review establishes that an inspected document is already the
safe Draft root, set `scaffold.root_record` to that document's existing
knowledge-root-relative path and represent it as exactly one matching Draft
Product or Technology root declaration. For Technology, an inspected safe
Draft Specification may likewise be selected through
`scaffold.initial_specification` and exactly one Draft `nkf.specification`
declaration. The selected declaration must retain the project root scope and
must not imply acceptance. Leave the generated path selected when identity,
authority, status, or intended role is ambiguous.

The onboarder preserves the selected candidate bytes, injects their exact
source bindings, and does not generate a second root or initial Specification.
Path selection is a reviewed semantic act in the candidate plan, not a
filename inference by the executable.

Ask project authority when meaning is ambiguous. An unresolved entry is safer
than an invented classification. Preserve existing candidate bytes by default.
Make an exact candidate edit only when authorized. Evidence may preserve
source bytes under its applicable exemption.

Canonical terms that intentionally retain non-Title-Case spelling belong in
`project.canonical_terms`. Do not add a term merely to hide inconsistent
casing.

## Seal The Complete Candidate

Run `seal --project <path> --plan <plan.yaml>`. Sealing:

- validates the supported category assessment and applicable confirmation;
- recreates and compares the complete mechanical project snapshot;
- requires every knowledge-root Markdown file exactly once in the plan;
- rejects unresolved or malformed document representations;
- verifies the fixed canonical map, current-system, active Task, and
  profile-specific onboarding target paths; and
- refreshes and verifies exact candidate digests.

Sealing does not mutate the source project, prove the semantic category,
accept meaning, confirm a Realization, or prove NKF conformance.

## Apply One Complete Candidate

When staged validation rejects preserved documents — a missing envelope, a
title that does not equal its H1, restated identity bullets, or an unlinked
same-bundle reference — resolve each finding as an explicit sealed candidate
edit and re-seal; never weaken the plan, misclassify a document, or edit the
project directly to pass.

Run the public subcommand-free Adopt operation with the sealed plan. Adopt
resolves the governed recommendation and independently trusted release archive
SHA-256, repeats the source and candidate checks,
generates native knowledge and integration, creates the complete portable
topology, validates an isolated full project candidate, and applies only a
conformant candidate.

The portable topology includes the canonical `README.md`; parent and state
indexes for Tasks; parent and disposition indexes for Designs; Decision,
Specification, Realization, supporting-current, and Evidence indexes; and the
single `realizations/current-system.md` record. The managed `NKF Navigation`
block links the root and all required entry points plus the active onboarding
Task and the initial Technology Specification when applicable.

If `README.md` already exists, onboarding reuses it and preserves all
project-owned bytes outside the managed block. It never creates
`README-2.md`. Existing required indexes are reconciled only when their
representation is unambiguous; otherwise onboarding stops before mutation.

If any step fails, report its structured diagnostic and confirm that the source
project remains unchanged. Do not delete consumer files, weaken validation, or
relabel a mechanical failure as a human-overridable semantic choice.

## Read The Handoff Correctly

Report separately:

1. the plan-supplied category, recommendation, confirmation, and the fact that
   they were not mechanically proven;
2. created, preserved, and intentionally changed paths;
3. Draft and unresolved project meaning;
4. Realization confirmation state;
5. full-bundle conformance and Governing Use state;
6. release and adopter digests;
7. local Git state only if separately inspected; and
8. remote workflow or protection state only if separately observed.

Successful onboarding creates a Draft candidate and deterministic integration.
It does not accept the root, accept a Specification, adopt a Design, confirm a
Realization, commit Git history, push a branch, or configure remote policy.

After success, the installed NKF authoring protocol and `nkf-authoring` skill
govern all later knowledge changes.

For trusted NKF-013 or NKF-015 predecessors, Adopt selects the bounded topology
repair mechanics internally when required. Do not invoke a separate public
repair choice or imitate the migration by manually deleting a competing map.

## Independent Post-Onboarding Audit

After Adopt reports `onboarded`, audit the result independently before
reporting it: with a fresh reading rather than this session's assumptions,
rerun `npm run nkf:check` to zero diagnostics, verify the
release pin and receipt digests, confirm the guidance files carry the
release's NKF version marker, walk the generated topology against this
protocol's promises, and confirm every preserved document survived with its
meaning intact. Record the audit and any findings in the onboarding Task as
findings, not as success language, and leave acceptance, confirmation, and
Governing Use to their separate authorities.
