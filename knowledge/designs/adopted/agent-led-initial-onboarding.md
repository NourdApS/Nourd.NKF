---
id: design-nkf-015-agent-led-initial-onboarding
type: design
title: NKF Agent-Led Initial Onboarding
summary: This Design proposes an agent-led semantic assessment for the two initial repository categories while retaining deterministic source binding, candidate sealing, transactional application, and NKF validation.
created_at: 2026-07-31T14:02:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-015
design_disposition: adopted
design_decisions:
  - adr-0069
---

# NKF Agent-Led Initial Onboarding

## Design Kind Problem And Scope

This is a pre-adoption workflow, derived-tooling, integration, and transaction
Design. It corrects the initial onboarding implementation without changing
native NKF 0.1 format meaning, the Product or Technology Root Profiles, or the
authority of consumer knowledge.

NKF-013 made initial onboarding executable, but allocated repository
eligibility to fixed Markdown counts, byte limits, and frontmatter heuristics.
Those checks can observe syntax and size; they cannot determine whether a
repository contains useful knowledge, meaningful source code, project
configuration, incidental files, or lifecycle history requiring a different
onboarding path.

This Design covers Category 1, Empty Repository, and Category 2, Tiny
Knowledge With No Source Or Configuration. It does not define the criteria for
the later categories owned by deferred NKF-014.

## Governing Inputs And Constraints

The Human Product Owner accepted this allocation:

> Agent-led inspection and classification; human confirmation where required;
> deterministic sealing, application, and validation.

The existing `nkf-onboarding` skill remains the single portable pre-adoption
workflow. Its `.agents/skills` and `.claude/skills` copies are discovery
adapters with byte-identical content. The vendor-neutral protocol remains the
complete procedure. No model vendor, host, instruction filename, or executable
owns repository meaning.

The project root, Root Profile, knowledge root, root identity, Task identity,
authority, and creation time remain explicit inputs. Common rules remain
inherited and Common is not a selectable Root Profile.

Markdown remains canonical project meaning. The agent may propose assessment,
classification, candidate structure, and Markdown edits. It cannot create
acceptance, Design disposition, Decisions, normative status, or Realization
confirmation by inspection or implementation.

## Proposed Direction

Initial onboarding becomes one agent-led workflow containing two distinct
responsibility zones:

```text
Complete Agent Review
        ↓ recommendation and required human confirmation
Mechanical Snapshot + Candidate Workspace
        ↓ semantic resolution inside the existing plan
Deterministic Seal
        ↓ exact source, candidate, and completeness verification
Deterministic Onboard + Full-Bundle Validation
        ↓
Draft Candidate Handoff
```

The agent first reviews the complete repository, including hidden project
content but excluding version-control implementation metadata. It distinguishes
meaningful knowledge, source implementation, project configuration, incidental
material, and unresolved items. It then recommends Category 1 or Category 2,
or stops without guessing a later category.

The public `inspect` command remains as a compatibility-preserving mechanical
operation invoked inside the workflow. It captures an exact source manifest,
creates candidate copies of Markdown under the selected knowledge root, and
emits the existing plan workspace. It is not a semantic survey and does not
emit an eligibility or maturity conclusion.

### Initial Repository Categories

Category 1, Empty Repository, means the complete repository contains no useful
knowledge, source implementation, or project configuration. Incidental editor
settings, empty workflow scaffolding, generic placeholder text, or similar
material do not by themselves create useful project knowledge. The agent may
progress without a separate human category confirmation only when it can
establish and explain that effectively-empty state.

Category 2, Tiny Knowledge With No Source Or Configuration, means the complete
repository contains a small knowledge corpus that the agent can read and
reason about in one complete review, and contains no meaningful source
implementation or project configuration. This category always requires an
explicit human confirmation bound into the plan.

`Tiny` is a semantic reviewability judgment, not a file-count or byte-count
threshold. The agent must report uncertainty rather than compress, sample, or
discard material to obtain a supported result.

### Agent Assessment And Human Confirmation

The onboarding plan adds one `assessment` mapping. It records:

- the selected Category 1 or Category 2 identifier;
- the agent capability or authority identifier and UTC assessment time;
- `recommended`, `not-recommended`, or `indeterminate` as the recommendation;
- a concise summary and evidence entries grounded in exact repository paths or
  the repository as a whole; and
- either `not-required` for a recommended Category 1 assessment or a Category
  2 human confirmation containing authority, UTC time, override flag, and
  rationale.

For Category 1, sealing requires a `recommended` agent assessment and a
`not-required` confirmation state. For Category 2, sealing requires human
confirmation regardless of the agent recommendation. A human may deliberately
override a negative or indeterminate Category 2 recommendation, but must
record that fact and rationale. Human direction cannot override mechanical
safety or snapshot failures.

The plan is operational candidate state. It does not become canonical project
meaning merely because it records an assessment or confirmation.

### Complete Mechanical Source Manifest

Mechanical inspection recursively captures every project directory and
regular file except `.git` implementation metadata. Each entry records its
safe project-relative path and kind; regular files also record byte length and
SHA-256. The separate Git binding retains repository-root and branch
observation.

The manifest does not label entries as knowledge, source, configuration, or
incidental. Its only purpose is to make agent omissions and later source drift
detectable. Symbolic links and non-regular filesystem entries fail closed.

The Markdown document map remains limited to `.md` files under the selected
knowledge root because those files require exactly one NKF record or
`non_records` representation. Other files enter the source snapshot without
becoming Governed Validation Inputs or native NKF records by implication.

### Deterministic Seal And Application

Sealing validates the complete assessment shape and applicable human
confirmation, re-creates the mechanical source manifest, requires the exact
source snapshot, requires one representation for every knowledge-root
Markdown file, and refreshes every candidate digest. An unresolved assessment,
confirmation, document representation, or candidate path prevents a sealed
plan.

Application repeats the same source and plan checks, verifies the independently
trusted release, generates native declarations and integration, validates the
complete staged project at `full-bundle`, and applies only that exact candidate
through the existing rollback-capable transaction.

Deterministic tooling may reject malformed plans, incomplete manifests, stale
bytes, unsafe paths, prohibited symbolic links, conflicting `.nourd` or owned
integration state, release mismatch, generation failure, checker failure, or
transaction failure. It must not reject or approve a repository because of
semantic maturity, document count, total bytes, frontmatter vocabulary,
source-language presence, or inferred category.

### Diagnostics And Handoff

Mechanical inspection reports `mechanically-ready` or `blocked`; it does not
report `eligible` or `deferred`. Semantic deferral to NKF-014 is an agent
workflow outcome, accompanied by evidence, not an executable conclusion.

The final result reports the plan-supplied category, recommendation, and human
confirmation separately from Draft project meaning, Realization confirmation,
NKF conformance, Governing Use, Git state, and remote enforcement. It states
that the category assessment was not mechanically proven.

## Responsibilities Interactions And Information Flows

| Participant | Responsibility | Must Not Claim |
| --- | --- | --- |
| Project authority | Root Profile, identity, Category 2 confirmation, override rationale, and project meaning | That confirmation proves mechanical safety or conformance |
| Participating agent | Complete review, evidence-backed recommendation, uncertainty, candidate representations, and authorized candidate edits | Deterministic category proof, acceptance, or confirmation |
| Mechanical inspector | Complete source manifest, exact digests, Markdown inventory, project surfaces, and Git binding | Knowledge usefulness, maturity, or category |
| Sealer | Assessment-shape, confirmation, coverage, source snapshot, paths, representations, and candidate digests | Semantic correctness or acceptance |
| Onboarder | Release verification, native generation, integration, staging, checking, transaction, rollback, and receipt | Category truth, accepted meaning, or confirmed Realization |
| NKF checker | Conformance of one generated candidate snapshot | Acceptance, onboarding authority, or operational readiness |

The agent communicates its assessment to the human before Category 2
confirmation. The same resolved assessment and confirmation then travel inside
the plan to sealing and application; they are not reconstructed from prose or
tool output.

## Alternatives And Trade-Offs

### Keep Deterministic Eligibility Thresholds

Rejected because counts, bytes, and frontmatter tokens are deterministic
observations but invalid proxies for repository meaning. They already
misclassified a tiny early repository as mature.

### Build A Separate Deterministic Survey Command

Rejected because it would duplicate the agent's repository review and invite
tool output to appear semantically authoritative. Mechanical capture remains a
subordinate step inside the skill.

### Use A Model-Driven Executable Classifier

Rejected because it would make provider behavior part of an allegedly
deterministic tool and would still require authority confirmation.

### Trust The Agent Without Mechanical Sealing

Rejected because instructions cannot prove complete file coverage, exact
bytes, stable snapshots, safe paths, transaction behavior, or conformance.

### Require Human Confirmation For Both Categories

Not selected for the first iteration. A genuinely effectively-empty repository
does not need a separate category ceremony after the agent has inspected and
explained it. Category 2 retains human confirmation because usefulness,
smallness, and absence of meaningful source or configuration are semantic
judgments.

### Remove The Inspect Command Name

Not selected. The existing command remains useful as a mechanical workspace
capture and changing the name would add compatibility cost without changing
authority. Documentation must make its reduced responsibility unmistakable.

## Failure Safety Recovery And Operations

The source project remains unchanged during agent review, mechanical capture,
candidate editing, and sealing. The workspace remains outside the project.

Any new or changed project entry after capture invalidates the source snapshot.
Any changed candidate byte after sealing invalidates the candidate digest.
An incomplete Markdown representation, missing confirmation, unsafe path,
symbolic link, special file, existing `.nourd`, owned-path conflict, release
failure, staged checker failure, or transaction failure stops onboarding.

Existing adopted repositories remain on their current integration path.
Unapplied NKF-013 workspaces lack the assessment and complete manifest
semantics and must be regenerated; they are short-lived operational state, not
canonical knowledge or a supported migration format.

The agent workflow cannot promise that every model follows instructions.
Byte-identical skills, neutral protocol verification, final deterministic
checks, and normal repository review provide the enforceable boundary.

## Validation And Decision Evidence

Validation must cover both Root Profiles and both supported categories;
Category 1 automatic progression; Category 2 positive confirmation; negative
and indeterminate recommendations; deliberate human override; unresolved
assessment and confirmation; complete source-manifest coverage; source drift;
knowledge-root document coverage; symbolic links and special files; candidate
drift; owned-path conflicts; rollback; same-plan idempotence; public guidance;
byte-identical skill copies; and vendor-neutral language.

The audit must compare every NKF-015 acceptance criterion against the Design,
Decision, implementation, tests, public projection, current-system
Realization, and exact validation result. Agent SDK remains a later authorized
consumer exercise and is not evidence that NKF can accept its meaning.

## Unresolved Matters

No unresolved matter blocks implementation of the accepted responsibility
allocation. Release publication and the separately authorized Agent SDK
exercise remain later operational steps. Criteria and workflows for Category
3 through Category 10 remain deferred to NKF-014 and require later Human
Product Owner confirmation.
