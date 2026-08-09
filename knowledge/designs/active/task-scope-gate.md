---
id: design-nkf-021-task-scope-gate
type: design
title: NKF Task Scope Gate
summary: This Design proposes one minimal Task Scope Gate that classifies newly discovered work and prevents it from remaining in a Task unless it is required by an existing acceptance criterion or explicitly admitted by the Human Product Owner.
created_at: 2026-08-09T12:08:06Z
record_lifecycle: living
record_status: draft
task: NKF-021
design_disposition: active
decision_authority: Human Product Owner, Nourd ApS
proposal_authority_effect: None until a Decision adopts the direction and the exact normative authority-pair revision is separately accepted.
proposal_evidence: NKF-020 scope history and NKF-021 activation findings.
implementation_evidence: None; this is a Design proposal.
---

# NKF Task Scope Gate

## Design Kind Problem And Scope

This is a Common contract, conformance, authoring-procedure, onboarding, and
migration Design under [NKF-021](../../tasks/active/NKF-021-task-scope-gate.md).
It addresses one failure class: work discovered during an active Task can be
implemented there merely because it was discovered there, even when the work
does not satisfy the Task's established acceptance criteria.

The immediate evidence is
[NKF-020](../../tasks/active/NKF-020-version-release-adoption-and-compatibility-process.md):
its original remaining scope was release-process refinement and
breaking-change classification, while later rounds added Git transition
mechanics and new normative Task-state meaning. This Design preserves that
history as evidence; it does not retrospectively reclassify delivered work or
rewrite an immutable Decision.

The proposal adds one compact finding ledger to Task non-records. It does not
duplicate the Task's Scope or Acceptance Criteria, promote Tasks to records,
add workflow states, let the checker judge semantic necessity, or authorize a
receiving Task merely because a link to it exists.

## Governing Inputs And Constraints

Tasks continue to own work intent, constraints, acceptance criteria, and
execution plans. NKF validates their declared shape and reference graph but
does not execute, schedule, complete, accept, or become authoritative for
them. The Human Product Owner's confirmed rule is:

> New work may remain in an active Task only when it is necessary to satisfy
> an existing acceptance criterion. Otherwise it transfers to another
> confirmed Task before implementation. An explicit Human Product Owner
> scope amendment is the exception.

The gate must make classification and disposition visible without pretending
that code can decide whether prose is truthful. A receiving Task still
requires the explicit human direction already required by the repository and
authoring protocol. A link never creates, opens, confirms, or authorizes work
on a Task.

[ADR 0006](../../decisions/0006-pre-stable-evolution.md) requires evidence,
classification, Human Product Owner confirmation, authority-first updates,
derived implementation, release, and deliberate migration for consequential
pre-stable change. [ADR 0096](../../decisions/0096-deterministic-governed-mechanics.md)
keeps prose truth and acceptance outside deterministic commands, and
[ADR 0098](../../decisions/0098-semantic-gates-around-deterministic-mechanics.md)
requires semantic review before those commands run.

The one-time NKF 0.2 recovery and branch exceptions are recorded in
[NKF-021](../../tasks/active/NKF-021-task-scope-gate.md). They do not become
general Task Scope Gate semantics or a precedent for later in-place version
changes.

## Proposed Direction

Every Task non-record under a successor NKF version that adopts this Design
carries exactly one Task Scope Gate. The gate records newly discovered work
that could expand the established Task boundary, its classification, its
disposition, and the basis for that disposition.

The existing Task prose remains authoritative for scope and acceptance
criteria. The gate is a control around newly discovered work, not another
scope source.

### Gate Structure

Every Task non-record contains exactly one top-level H2 whose comparison
string is `Task Scope Gate`. The first block of that section is exactly one of:

- the canonical current sentence
  `No discovered work requires scope classification in this Task.`;
- the canonical retrospective sentence
  `This Task predates the Task Scope Gate; no retrospective finding classification is claimed.`;
  or
- one pipe table with the exact header
  `| Finding | Classification | Disposition | Basis |` and at least one data
  row.

Additional explanatory blocks may follow the required first block. A Task may
replace a canonical sentence with a table when a finding arises. The table is
a ledger of findings discovered after the Task's established boundary; it is
not a list of all planned work.

Each row declares:

- `Finding` — non-empty prose identifying one discovered unit of work;
- `Classification` — one closed classification value;
- `Disposition` — one closed disposition value; and
- `Basis` — the exact form required by that disposition.

### Closed Classifications

The classification vocabulary is:

| Classification | Meaning |
| --- | --- |
| `required-for-criterion` | The work is necessary to satisfy an acceptance criterion that existed before the finding. |
| `blocking-dependency` | The work blocks progress but is not itself part of an existing acceptance criterion. |
| `adjacent-improvement` | The work would improve the result but is not required by an existing acceptance criterion. |
| `new-normative-meaning` | The work would add or change governed meaning beyond the established Task boundary. |

Only `required-for-criterion` can remain without a scope amendment. Calling a
finding a blocker does not make it part of the Task; if it is truly required
by an existing criterion, its classification is `required-for-criterion`.

### Closed Dispositions

The disposition vocabulary is:

| Disposition | Meaning And Required Basis |
| --- | --- |
| `remain` | The current Task may implement the finding. It is valid only with `required-for-criterion`; Basis is non-empty prose identifying the existing acceptance criterion. |
| `transfer` | The current Task does not implement the finding. Basis is one CommonMark link whose visible text is another same-bundle Task identifier and whose destination is that Task's exact source path. Human confirmation of the receiving Task remains separately required before implementation. |
| `amend` | The established Task boundary is explicitly expanded. It is valid only for `blocking-dependency`, `adjacent-improvement`, or `new-normative-meaning`; Basis is an accepted same-bundle Decision link or non-empty prose identifying the recorded Human Product Owner amendment act. |
| `decline` | The finding will not be implemented under this Task. It is valid only for `blocking-dependency`, `adjacent-improvement`, or `new-normative-meaning`; Basis is non-empty prose recording the rationale and the applicable Task authority act. |

`transfer` is valid with every classification because a Task may separate even
work that could have remained. `remain` with any classification other than
`required-for-criterion` fails closed. `amend` and `decline` with
`required-for-criterion` fail closed because the row must instead identify the
changed criterion, transferred dependency, Task cancellation, or later human
scope decision truthfully.

### Deterministic Enforcement

The checker enforces:

1. exactly one Task Scope Gate in every Task non-record;
2. one valid first-block form, the exact table header, and non-empty cells;
3. the closed classification and disposition vocabularies;
4. the allowed classification-disposition combinations;
5. exact same-bundle, non-self Task resolution for `transfer` Basis links;
6. exact accepted same-bundle Decision resolution when an `amend` Basis uses a
   Decision link; and
7. the retrospective sentence as a distinct form that makes no historical
   classification claim.

The checker does not determine whether a finding was omitted, whether work is
actually necessary for a criterion, whether an amendment act is truthful, or
whether implementation happened before transfer. Those remain authoring,
review, and audit obligations.

The diagnostic family is separate from Decision Applicability:
`task.scope.missing`, `task.scope.structure.invalid`,
`task.scope.value.unsupported`, and `task.scope.reference.unresolved`.

### Authoring Procedure

Before implementing work discovered after activation, the author compares it
with the established Acceptance Criteria and records a Task Scope Gate row:

1. classify the finding;
2. choose one allowed disposition;
3. record the required Basis;
4. obtain explicit Human Product Owner confirmation before a scope amendment;
5. obtain the repository-required explicit direction before beginning a
   receiving Task; and
6. only then implement the finding in the owning Task.

The gate is revisited before each coherent implementation round and before a
Task conclusion. A new finding is recorded before its implementation, not
reconstructed afterward. Correcting a false classification changes the living
Task transparently; validation cannot supply the correction's authority.

### Onboarding And Migration

New onboarding Tasks receive the canonical current sentence. A Task created
after adoption receives the same form until a finding requires a row.

Existing Tasks migrating from the predecessor version receive the canonical
retrospective sentence unless the author has sufficient evidence to record
specific findings truthfully. The retrospective form does not claim that no
scope expansion occurred; it claims only that the gate did not exist and no
historical classification is being fabricated.

The NKF repository self-migration records known current findings rather than
hiding them behind the retrospective sentence. In particular, [NKF-021](../../tasks/active/NKF-021-task-scope-gate.md) records
the activation-worktree defect as a `blocking-dependency` transferred to
[NKF-020](../../tasks/active/NKF-020-version-release-adoption-and-compatibility-process.md). Existing concluded Tasks may use the retrospective sentence.

Fixtures and public examples carry the current sentence. The
predecessor-to-successor migration adds the retrospective sentence to every
preserved Task, re-pins affected declarations, and validates the complete
result.

## Responsibilities Interactions And Information Flows

The Specification owns gate meaning, vocabularies, combinations, and claim
limits. The executable companion mirrors them mechanically. The checker owns
deterministic structure, vocabulary, combination, and reference enforcement.
The authoring protocol and portable skill own classification timing, semantic
review, receiving-Task authorization, and amendment procedure. Onboarding and
migration tooling own conformant initial and retrospective forms.

The Task's decision authority owns classification truth and decline acts. The
Human Product Owner exclusively owns scope amendments under this proposal.
The receiving Task's Human Direction owns authorization to begin that work;
the transfer link supplies provenance but no authority. Independent audit
reviews omitted or falsely classified findings that deterministic validation
cannot detect.

Information flows from a discovered finding into exactly one current Task
gate row, then either remains under an existing criterion, transfers by Task
reference, enters by explicit amendment, or is declined with rationale.

## Alternatives And Trade-Offs

### Duplicate Scope Snapshot

Copy Scope and Acceptance Criteria into a second structured gate. Rejected:
it creates two semantic authorities inside one Task and guarantees drift. The
proposed ledger points to the existing criterion in prose and keeps the Task
body as the single meaning source.

### Task Frontmatter Fields

Store classifications as YAML orientation metadata. Rejected: finding and
basis prose are substantive meaning, not navigation identity, and frontmatter
would duplicate or truncate the human-readable Task record.

### Separate Scope Record

Create one governed record per Task. Rejected: it adds a synchronized file and
new record kind without adding enforcement power. Task scope remains Task
meaning.

### Automatic Semantic Classification

Have the checker or an AI decide whether work is required. Rejected: necessity
depends on human meaning and acceptance criteria. Automation may propose a
classification but cannot make it authoritative or validate its truth.

### No Decline Disposition

Require every non-scope finding to transfer into a new Task. Rejected as
needless Task creation for work the applicable authority intentionally decides
not to pursue. `decline` keeps that decision visible without pretending work
was transferred or delivered.

## Failure Safety Recovery And Operations

A structurally valid gate can omit or misclassify a finding. The closed forms
make recorded decisions visible and auditable but do not solve semantic truth.
Review compares actual changed files, commits, and release contents with the
Task's established criteria and gate rows.

Missing gates, malformed rows, unsupported values, invalid combinations, and
unresolved transfer or Decision links fail closed. A false free-prose Basis
remains a human-review defect. A receiving Task cannot begin from a link alone;
existing explicit-direction rules remain the authority boundary.

If work was implemented before classification, the author records the breach,
stops further implementation, and either transfers and reverts the out-of-scope
change, obtains an explicit Human Product Owner amendment, or creates a later
repair Task. The gate must not be backfilled as though it preceded the work.

## Validation And Decision Evidence

An informed Decision requires:

- positive and negative checker fixtures for every first-block form,
  vocabulary value, allowed and rejected combination, Task reference, and
  accepted-Decision reference;
- onboarding and predecessor-to-successor migration exercises proving current and
  retrospective forms;
- self-migration of every NKF Task with truthful retrospective disclosure or
  specific current findings;
- authoring guidance and deterministic Task mechanics that preserve the gate;
- full-set enumeration and review of every changed guidance member;
- `npm run nkf:check` with zero diagnostics on the exact candidate; and
- an independent semantic and adversarial audit that does not rely only on
  implementation tests.

Validation proves mechanical conformance only. The Human Product Owner must
separately adopt the Design direction and accept the exact successor authority
pair; a successor Realization must separately map and confirm the implementation.

## Unresolved Matters

- Whether `decline` belongs in the minimal disposition vocabulary requires
  explicit Human Product Owner confirmation.
- Whether a free-prose existing-criterion Basis is sufficient, or every Task
  should gain criterion identifiers, requires explicit Human Product Owner
  confirmation. This Design recommends free prose because retrofitting stable
  criterion identifiers would expand the change substantially.
- Cross-bundle receiving Tasks remain unsupported; a transfer is limited to
  another Task in the same governed bundle.
