---
id: design-nkf-013-initial-greenfield-onboarding
type: design
title: NKF Initial Greenfield Onboarding
summary: This Design proposes one deterministic inspect-plan-apply onboarding path for empty and small-document Product and Technology repositories, with a stable extension boundary for later brownfield reconstruction and advanced recovery.
created_at: 2026-07-31T10:47:13Z
record_lifecycle: immutable
record_status: accepted
task: NKF-013
design_disposition: adopted
design_decisions:
  - adr-0067
---

# NKF Initial Greenfield Onboarding

## Design Kind Problem And Scope

This is a user-experience, integration, transaction, and derived-tooling
Design. It closes the gap between an unadopted repository and the existing
pinned NKF installer without changing NKF 0.1 normative meaning.

The supported initial state is an empty or near-greenfield Product or
Technology repository with no native NKF bundle and no substantial knowledge
history or implementation reconstruction problem. The outcome is one complete
checker-conformant Draft candidate whose acceptance and Realization
confirmation remain separate project-authority acts.

Large documented corpora, source-rich reconstruction, recovered historical
authority, interrupted long-lived sessions, and advanced already-adopted
migration remain deferred to [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).

## Governing Inputs And Constraints

The Design is governed by accepted NKF 0.1 meaning, [ADR 0018](../../decisions/0018-project-paths-and-knowledge-coverage.md) project-root and
knowledge-root boundaries, ADRs 0042 through 0048 release integrity, [ADR 0057](../../decisions/0057-current-system-realization.md)
current-system Realization navigation, [ADR 0060](../../decisions/0060-layered-contract-enforcement.md) AI-neutral enforcement, and
[ADR 0064](../../decisions/0064-release-documentation-and-adoption.md) pinned consumer adoption.

The project root directly contains `.nourd` after adoption. The selected
knowledge root is a safe relative directory inside that project. Exactly one
Product or Technology Root Profile is selected by project authority. Common
is inherited and is never a selectable profile.

Markdown remains canonical project meaning. The onboarder may generate Draft
scaffold text and native declarations, but it cannot infer acceptance,
Design disposition, Decision history, intended architecture, confirmed
implementation, or Root Profile from repository contents.

## Proposed Direction

NKF supplies one self-contained public adopter with two pre-adoption commands:

```text
inspect → resolve plan workspace → onboard
```

`inspect` reads the complete supported input boundary without changing the
project. It emits a machine-readable inspection and an editable onboarding
workspace containing a plan plus exact candidate copies of every existing
Markdown file under the selected knowledge root.

A human or participating AI resolves semantic classifications and any planned
Markdown edits in that workspace. `onboard` validates the resolved plan,
rechecks the source snapshot, generates all native declarations and integration
files, validates a complete staged project with the verified release checker,
and then applies the exact candidate as one rollback-capable transaction.

The user never manually authors `.nourd/knowledge/bundle.yaml`, native record
declarations, source digests, release pins, integration registries, adapter
blocks, skills, verifier scripts, package commands, or workflows.

### Exact Initial Eligibility Boundary

The initial supported corpus contains at most twenty Markdown files, at most
256 KiB of Markdown bytes in total, and at most 64 KiB in any one Markdown
file. All paths must be regular project-contained files reached without a
symbolic link.

The repository is not initially eligible when it already contains `.nourd`,
when an existing Markdown frontmatter envelope declares accepted authority,
a Design disposition, a Decision, a Specification, a Realization confirmation
state, or another lifecycle migration requiring provenance reconciliation, or
when complete classification cannot be resolved in one plan.

Those qualitative gates prevent a numerically small but semantically mature
repository from being mislabeled greenfield. They also make the restored
Agent SDK snapshot ineligible for automatic initial onboarding because it
contains existing Task, Design, Decision, and acceptance history requiring
deliberate migration. That result is a correct [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) deferral, not a reason
to weaken the initial boundary.

Eligibility is based only on the configured knowledge-root Markdown corpus
and explicit conflict surfaces. Early source files may exist, but the initial
onboarder neither interprets them nor derives knowledge from them.

### Stable Inspection And Plan Boundary

The inspection and plan use the current `nkf_version: "0.1"` coordinate and do
not introduce a second NKF version namespace. They are derived operational
interfaces, not new native format authorities.

An inspection binds:

- resolved project and knowledge-root boundaries;
- every Markdown path, size, and SHA-256;
- eligibility limits and deterministic diagnostics;
- existing adoption and owned-path state; and
- one canonical inspection snapshot digest.

The plan binds:

- that inspection digest;
- project-authority supplied profile, root identity, root title, Task identity,
  authority identifier, creation instant, and canonical terms;
- safe scaffold target paths;
- every original Markdown digest and candidate Markdown digest; and
- exactly one resolved record or non-record representation per existing
  Markdown file.

For a record representation, the plan owns semantic classification and section
mapping but omits the native source digest. The onboarder injects the exact
candidate source path and digest and serializes canonical native YAML. For a
non-record representation, the plan supplies its NKF non-record kind and any
required reason.

Unresolved, incomplete, stale, duplicate, escaping, unsupported, or ambiguous
plans fail before project mutation. A later [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) analyzer may create more
complex candidate bytes and plan entries, but it must preserve this exact
source-binding and apply contract unless a later governed Decision identifies
a demonstrated incompatibility.

### Honest Profile-Specific Scaffolds

Both profiles receive:

- one Draft root record;
- one active onboarding Task;
- one navigable knowledge map; and
- one unconfirmed consolidated current-system Realization.

The Product scaffold covers all Product root responsibilities with explicit
Draft or unresolved statements. The Technology scaffold additionally creates
one Draft Specification because the Technology Root Profile requires at least
one Specification record.

The current-system Realization states only that onboarding did not establish
an accepted implementation mapping. It does not claim that no source or
implementation exists. Generated records begin Draft, the Realization begins
unconfirmed, and no historical Decision is invented.

Default lifecycle subdirectories are scaffold navigation choices. The plan may
select other safe paths, and existing consumer topology is never reclassified
from directory names.

### Whole-Project Transaction

Before the first durable project write, the onboarder:

1. verifies the source inspection has not drifted;
2. validates every plan and candidate digest;
3. resolves all target conflicts and symbolic-link boundaries;
4. acquires and verifies the exact pinned release;
5. constructs every knowledge, native, adopter, pin, protocol, skill, adapter,
   verifier, package, and workflow target;
6. applies those targets to an isolated project mirror;
7. runs the verified release checker at `full-bundle`; and
8. retains the complete predecessor bytes required for rollback.

Only a conformant staged candidate may replace project bytes. Post-write
integration and checker verification remain inside the transaction. Any
failure restores predecessor files and removes transaction-created paths.

The transaction never initializes Git, commits, pushes, publishes, changes
remote settings, or modifies files not named by the resolved plan and
integration target set.

### Idempotence And Operational State

A successful onboarding stores one operational onboarding receipt under
`.nourd`. It binds the plan digest, inspection digest, profile, knowledge root,
and exact created or changed paths. The receipt is not canonical knowledge and
does not enter the validated snapshot by implication.

Repeating the exact successful plan verifies the installed release,
integration, source declarations, and full bundle and returns `no-update`.
A different plan against an adopted repository fails closed and directs the
user to a deliberate authoring or later migration workflow.

Long-lived resumability, repair of arbitrarily interrupted historical states,
and user-directed rollback beyond the active transaction remain [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).

### AI-Neutral Semantic Handoff

NKF publishes a vendor-neutral pre-adoption protocol and byte-identical
portable skill representations for open Agent Skills discovery and the
additional supported skill directory. The protocol owns the complete semantic
handoff procedure. It requires a participating author to review the entire
eligible corpus, work only in the candidate workspace, resolve every
representation, preserve authority uncertainty, and run `onboard` only after
the plan is complete.

No model or provider is invoked by the executable. Host adapters, instruction
filenames, proprietary prompts, and model identities do not own onboarding
meaning. Unknown authoring surfaces may use the protocol directly when they
can read exact files, preserve bytes, and expose the result honestly.

### User-Facing Result And Diagnostics

Successful and failed pre-adoption operations emit structured JSON. Results
separate:

- eligibility and deterministic diagnostics;
- created, preserved, and changed paths;
- Draft and unresolved meaning;
- Realization confirmation state;
- snapshot conformance and Governing Use state;
- release and adopter digests; and
- local or remote Git state only when separately observed.

An out-of-scope result names [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) and leaves the project unchanged. A
passing staged or installed check is never called acceptance or confirmation.

## Responsibilities Interactions And Information Flows

Project authority supplies the Root Profile and identity inputs and owns any
semantic acceptance. A participating human or AI author resolves candidate
meaning within the bounded workspace. The deterministic onboarder owns
inspection, plan validation, native generation, release verification,
transaction, and structured reporting. The pinned checker owns mechanical
conformance for the candidate snapshot.

The existing installer becomes an internal integration phase shared by
`install`, `update`, and `onboard`. Native release archive meaning remains
fixed. The adopter remains a separately digest-bound public artifact, so this
derived onboarding change does not force a new native release when checker and
authority bytes are unchanged.

[`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) may later add analyzers, source-derived candidate generation,
provenance graphs, checkpoint stores, and recovery controllers before the same
resolved-plan apply boundary. It must not weaken authority separation or make
model interpretation authoritative.

## Alternatives And Trade-Offs

### Fully Automatic Model-Driven Onboarding

Rejected. A model can propose classifications and candidate wording, but
embedding one model in the executable would make semantic behavior
provider-dependent, non-deterministic, and capable of inventing authority.

### Deterministic Scaffolding Without A Semantic Plan

Rejected for existing documentation. It could create an empty scaffold, but it
could not safely decide whether existing Markdown is a record, navigation,
Task, Evidence, accepted meaning, or unresolved proposal.

### Require Users To Author Native YAML

Rejected. That preserves the exact usability failure exposed by the Agent SDK
attempt and lets source digests, declarations, and integration bytes drift.

### Mutate The Project During Interactive Resolution

Rejected for the initial release. A separate candidate workspace permits
complete review, deterministic source binding, and zero project mutation on an
unresolved or invalid plan. [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) may later add resumable workspace state
without changing final apply semantics.

### Treat Every Numerically Small Corpus As Greenfield

Rejected. Existing accepted Decisions or confirmation history can require
careful provenance even when only a few files exist. Numeric and qualitative
gates are both necessary.

### Publish A New Native Archive For Adopter-Only Changes

Rejected while every native authority and checker byte remains unchanged. The
adopter already has a separate content digest and publication binding. A new
native archive is required only when its governed contents change.

## Failure Safety Recovery And Operations

Inspection rejects project-root or knowledge-root symbolic links, escaping
paths, duplicate resolved paths, unreadable files, invalid UTF-8, size-limit
excess, existing adoption, and mature lifecycle evidence before mutation.

Application rejects inspection drift, candidate-digest drift, unresolved
representations, malformed record declarations, generated-path collisions,
owned integration conflicts, unsupported release bytes, malformed adapters,
and any staged checker failure. Rollback restores every predecessor byte and
removes every transaction-created file or empty directory.

The initial operation is intentionally short-lived. If the process is killed
outside its handled failure boundary, Git or filesystem recovery may still be
needed; robust interruption journaling belongs to [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md). The staged-first
design minimizes that exposure and leaves no durable project write before a
complete candidate passes.

## Validation And Decision Evidence

Realization must exercise empty and small-document Product and Technology
repositories, nested consumer topology, an unborn Git repository, existing
instructions and package/workflow files, semantic ambiguity, numeric and
qualitative deferral, symbolic links, path escape, duplicate and owned-path
conflicts, staged checker failure, rollback, same-plan idempotence, byte
preservation, status separation, local execution, and exact-commit workflow
generation.

The public projection must include complete onboarding instructions and empty
and small-document examples. Deterministic adopter, guidance, public-doc, and
full-bundle verification must pass. A separate adversarial audit must map every
[`NKF-013`](../../tasks/completed/NKF-013-initial-greenfield-onboarding.md) acceptance criterion and assess whether later [`NKF-014`](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md) work can
extend analysis and recovery without replacing the apply boundary.

## Unresolved Matters

No matter blocks the initial Design. Later evidence may justify changing the
eligibility limits, adding plan producers, supporting resumable sessions, or
changing publication channels. Such changes remain governed successors and do
not silently alter this accepted revision.
