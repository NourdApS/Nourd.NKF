---
id: design-nkf-019-decision-applicability-gate
type: design
title: NKF Decision Applicability Gate
summary: This Design proposes one deterministic Decision Applicability Gate in Task non-records, closed verification-level and capability-finding vocabularies, a completion fail-closed rule, and normative claim rules so conditional decisions and proxy evidence can no longer silently become unconditional success.
created_at: 2026-08-06T21:29:34Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
design_disposition: adopted
design_decisions:
  - adr-0077
---

# NKF Decision Applicability Gate

## Design Kind Problem And Scope

This is a Common contract, conformance, authoring-procedure, and migration
Design. It corrects the failure class evidenced by
[NKF-019 Nourd Tiles Decision Applicability Failure](../../evidence/audits/nkf-019-nourd-tiles-decision-applicability-failure.md):
a conditional accepted decision lost its conditions in successor Tasks, a
harness change silently invalidated an extracted renderer decision, validation
levels were mixed, and proxy evidence was represented as outcome success until
direct human inspection contradicted it.

NKF 0.1 currently validates only `task_id`, `task_status`, and topology
placement for a Task non-record. Nothing portable requires a Task to extract
the accepted decisions that apply to it, to carry their conditions, negative
findings, rejected capabilities, supersessions, and unresolved unknowns, to
classify mandatory capabilities, or to state the verification level a claim
actually reached.

The Design covers the portable Common contract for Task non-records, two new
closed vocabularies, deterministic checker enforcement, authoring protocol and
skill procedure, onboarding output, fixtures, the versioned NKF `0.11`
successor identity, and deliberate consumer migration. It does not modify any
consumer repository, define Task execution semantics, or claim that semantic
contradictions in prose are mechanically decidable.

## Governing Inputs And Constraints

The lifecycle remains:

```text
Task → Design → Decision → Specification → Realization → Validation
```

Tasks remain non-records: NKF validates declared shape and reference graph
and never executes, schedules, completes, or becomes authoritative for a
Task. Directory placement remains navigation. Substantive canonical meaning
remains in the CommonMark body under the safe frontmatter envelope accepted
through ADR 0058. Acceptance, implementation, Realization confirmation,
conformance, local Git state, and remote enforcement remain separate facts.

Deterministic validation may establish structure, closed vocabulary use,
exact reference resolution, and fail-closed states. It cannot establish that
an extraction is complete, that prose is truthful, or that a summary
elsewhere contradicts a condition. Those remain authoring-procedure and human
review obligations, and this Design must not present them otherwise.

NKF keeps one current version namespace at a time, and the Human Product
Owner requires every contract-meaning change after first consumer adoption to
ship as a new version. Accepted immutable records are not rewritten. Consumer
adoption of a successor version remains deliberate migration.

## Proposed Direction

NKF 0.1 Common defines one Decision Applicability Gate: a deterministic,
governed structure inside every Active Task non-record that carries the
applicable accepted decisions with their constraints and classifies every
implicated mandatory capability, together with closed vocabularies and claim
rules that keep validation levels separate.

### Gate Structure

Every Task non-record MUST contain exactly one top-level H2 whose comparison
string is `Decision Applicability`, containing exactly two top-level H3
subsections in order: `Applicable Decisions` and `Mandatory Capabilities`.

The first block of `Applicable Decisions` MUST be exactly one of:

- one paragraph whose whitespace-normalized text is exactly
  `No accepted decision applies to this Task.`; or
- one pipe table with the exact header `| Reference | Kind | Carried
  Constraint |` and at least one data row.

Each `Applicable Decisions` row declares:

- `Reference` — for kind `record`, one backticked same-bundle record ID that
  MUST resolve to exactly one Decision record whose declared governance
  status is `accepted`; for kind `external`, prose naming the external
  authority and record, which native validation does not resolve;
- `Kind` — exactly `record` or `external`; and
- `Carried Constraint` — non-empty prose carrying the applicable condition,
  negative finding, rejected capability, supersession, or unresolved unknown.
  A genuinely unconditional decision states `Unconditional.` explicitly.

The first block of `Mandatory Capabilities` MUST be exactly one of:

- one paragraph whose whitespace-normalized text is exactly
  `No mandatory capability is implicated by this Task.`; or
- one pipe table with the exact header `| Capability | Finding | Verification
  | Exception |` and at least one data row.

Each `Mandatory Capabilities` row declares:

- `Capability` — non-empty prose naming one capability that a governing
  requirement makes mandatory for the Task's outcome;
- `Finding` — exactly `proven`, `unsupported`, or `unknown`;
- `Verification` — for `proven`, exactly one verification-level identifier
  naming the highest level at which the capability was directly verified; for
  `unsupported` and `unknown`, exactly `none`; and
- `Exception` — exactly `none`, or a non-empty explicit Human Product Owner
  exception: either a backticked same-bundle record ID that MUST resolve to an
  accepted Decision record, or prose identifying the recorded human exception
  act.

Additional explanatory blocks MAY follow the required first block in each
subsection. A gate added to a pre-existing Task after the fact MUST state in
an explanatory block that it was added retrospectively rather than implying a
historical extraction. The gate records extraction; it confers no acceptance,
adoption, confirmation, conformance, or readiness.

### Closed Vocabularies

Common defines `verification_levels`, an ordered closed vocabulary for the
level a verification claim actually reached:

| Level | Meaning |
| --- | --- |
| `data-validity` | Governed inputs or artifacts are well-formed and integrity-bound |
| `adapter-compatibility` | A consumer, adapter, or interface can load and address the data through its declared contract |
| `runtime-behaviour` | The required runtime outcome itself was directly observed in the executing system |
| `human-experience` | The applicable human authority directly reviewed the experienced result |
| `production-suitability` | Production, commercial, and legal suitability established by its owning authority |

Common defines `capability_findings`, a closed vocabulary for mandatory
capabilities: `proven`, `unsupported`, and `unknown`.

These vocabularies classify claims about capabilities and outcomes. They are
distinct from checker conformance levels, section authority classes, and
result axes, and none of those may be substituted for them.

### Deterministic Enforcement

The checker enforces, with new registered diagnostics:

1. gate presence and uniqueness for every Task — `task.applicability.missing`;
2. exact structural grammar: subsection order, first-block form, exact table
   headers, well-formed single-line rows with the exact column count, and the
   exact canonical sentences — `task.applicability.structure.invalid`;
3. closed vocabulary agreement, including `Verification` consistency with
   `Finding` — `task.applicability.value.unsupported`;
4. exact resolution of backticked record references to accepted same-bundle
   Decision records — `task.applicability.reference.unresolved`; and
5. the completion fail-closed rule below — `task.applicability.completion.blocked`.

Enforcement is contract-driven from the executable companion, following the
portable-topology precedent, and fails closed when the executable gate
contract is absent or unsupported.

### Presence And Completion Matrix

| `task_status` | Gate | Completion rule |
| --- | --- | --- |
| `active` | Required | Not applicable |
| `deferred` | Required | Not applicable |
| `completed` | Required | No row may combine Finding `unsupported` or `unknown` with Exception `none` |

The Human Product Owner directed that every Task carries the gate, including
completed history. A Completed Task whose gate contains an unexcepted
`unsupported` or `unknown` mandatory capability fails closed. A repository
therefore gates its complete Task history when it migrates to the successor
version: retrospective gates are added truthfully, declare themselves
retrospective, and never fabricate a historical extraction. Repositories that
do not migrate remain valid against the version they declare.

### Normative Claim Rules

Common adds these normative rules for governed knowledge:

1. A verification claim MUST name the verification level it reached, and a
   claim at one level MUST NOT be represented as success at a higher level.
2. A claim at `runtime-behaviour` or higher requires direct observation of
   the required outcome itself. Available input data, invoked methods,
   differing screenshots, simulated or sent gestures, and process survival
   are not sufficient evidence that the outcome occurred.
3. A restatement of an accepted decision that carries conditions, negative
   findings, or unresolved unknowns MUST carry them or reference the exact
   record; it MUST NOT be summarized as an unconditional choice.
4. A change to the renderer, provider, platform, data format, architecture,
   verification harness, or a mandatory requirement invalidates the affected
   extraction; the gate MUST be re-evaluated before dependent claims are
   made.
5. Gate content and validation results remain distinct from acceptance,
   adoption, Realization confirmation, conformance, Git state, and remote
   enforcement.

Rules 1 through 4 are deterministic only where the gate structure makes them
so; their application to free prose remains an authoring obligation under
human review.

### Versioned Contract Release

The gate ships as NKF `0.11`, a versioned successor contract, by explicit
Human Product Owner direction. NKF 0.1 meaning, its accepted Specification,
and its executable contract set remain immutable historical authority for the
repositories that declare them; nothing mutates NKF 0.1 in place.

The successor establishes the versioned-evolution process: after first
consumer adoption of a version, every contract-meaning change produces a new
`<major>.<minor>` version with its own immutable Specification revision,
executable companion, Schemas, and release. Before NKF `1.0`, a minor version
MAY include breaking changes when they ship with explicit migration meaning;
this supersedes the earlier rule that a minor version only adds
backward-compatible vocabulary. A bundle declares exactly one `nkf_version`,
and a checker that does not support the declared version fails closed rather
than validating against a different version's meaning.

### Authoring Procedure And Skill

The neutral authoring protocol adds the gate procedure: extract applicable
accepted decisions with carried constraints into the owning Task's gate
before Git-backed work; classify implicated mandatory capabilities; re-extract
when a re-evaluation trigger changes; verify required outcomes directly
before claiming `runtime-behaviour` or higher; and never summarize a
conditional decision unconditionally. The portable authoring skill continues
to bind the protocol; its digests are re-pinned wherever the guidance
registry, verifier, and bundle bind them.

### Onboarding And Migration

Initial onboarding generates the active onboarding Task with a gate whose
subsections carry the canonical no-applicable-decision and
no-mandatory-capability sentences, and the onboarding procedure directs the
participating agent to correct that extraction when preserved accepted
decisions apply. Preserved pre-existing Tasks receive agent-authored,
truthful, retrospective gates under the same human confirmation the
onboarding assessment already uses. Fixtures and public examples carry
conformant gates.

Already-adopted repositories migrate deliberately to NKF `0.11`: the bundle
declares the successor version and every Task, including completed history,
gains a truthful gate, retrospective where applicable. Repositories that stay
on NKF 0.1 remain valid against NKF 0.1. Consumer migration is separate
future work; nothing migrates by implication of this repository's
implementation.

## Responsibilities Interactions And Information Flows

The canonical Specification owns gate meaning, vocabularies, and claim rules.
The digest-bound executable companion mirrors them mechanically. The checker
owns deterministic structure, vocabulary, reference, and completion
enforcement and emits registered diagnostics. The authoring protocol and
portable skill own the extraction and re-evaluation procedure for
participating agents. The Human Product Owner owns exceptions, acceptance,
and truth judgements. Harness and Evidence authors own direct-outcome
observation. Audits and reviews own semantic completeness and contradiction
detection in prose. The onboarding generator owns conformant initial output.

Information flows one way: accepted decisions are extracted into successor
Task gates with their constraints; gate rows cite decisions and exceptions by
exact reference; validation reads the gate and never writes or accepts it.

## Alternatives And Trade-Offs

### Authoring-Procedure-Only Safeguard

Update only the protocol and skill. Rejected as the sole mechanism: the
evidenced failure occurred under an authoring procedure that already required
beginning from current knowledge; prose discipline without machine-visible
structure decays exactly when work accelerates, and the Human Product Owner
direction requires machine enforcement where reliable.

### Task Frontmatter Fields

Encode references, findings, and levels as Task frontmatter keys. Cheaper to
check, but carried constraints are substantive meaning and belong in the
CommonMark body under the ADR 0058 boundary; frontmatter would truncate or
duplicate canonical meaning and invite silent divergence between the two.

### Promote Tasks To Records

Give Tasks a record type and body contract with required responsibilities.
Strongest structural leverage, but it reverses the accepted Task non-record
model, requires new record-type, body-contract, profile, topology, and
serialization machinery, and forces every adopted repository to re-declare
every Task. Disproportionate to the failure class.

### Structure Decision Conditions Instead

Require Decision records to declare machine-readable condition tables. This
strengthens the source but does not force successors to extract anything, and
the evidenced loss happened in successors. It also cannot cover external
authority decisions. Retained as possible complementary future work.

### A Separate Gate Record Kind

Record extractions as standalone governed gate documents per Task. Creates a
second file per Task, a new record kind, and a synchronization burden between
Task and gate, for no additional enforcement power. Rejected as a redundant
NKF layer.

### Semantic Contradiction Detection

Attempt mechanical detection of unconditional summaries and proxy-evidence
claims in prose. Rejected: not reliably decidable; a checker that guesses
semantics produces false authority in both directions. The Design instead
makes the structured extraction mandatory and leaves prose judgement with
humans and audits.

## Failure Safety Recovery And Operations

A structurally valid gate can still be semantically false: the canonical
sentences and explicit rows make such claims visible, auditable, and
attributable, but only review establishes truth. Because every Task requires
the gate, deleting one is caught structurally; falsifying one remains a
review and audit concern. An overlooked applicable decision remains possible;
the protocol's extraction step and audits reduce, not eliminate, it.

Fail-closed behavior: a missing executable gate contract, an unresolvable
reference, an unsupported vocabulary value, and an unexcepted unresolved
mandatory capability at completion each block conformance rather than degrade
silently. Recovery uses ordinary governed successors: a wrong extraction is
corrected in the living Task; a wrong exception requires a later explicit
human act; no history is rewritten.

Operationally, the gate adds one required section to Active Tasks and a
bounded parsing pass to validation; no network, credential, or external
authority access is introduced.

## Validation And Decision Evidence

Deterministic evidence for an informed Decision: positive fixtures where
Product and Technology Active Tasks carry conformant gates; negative fixtures
for each new diagnostic; self-hosting evidence that `NKF-019` itself carries
the first real gate; and the complete `npm run nkf:check` gate passing with
the new enforcement active.

Semantic evidence: the bound Nourd Tiles Evidence demonstrates each rule's
counterpart failure — lost conditions, an unre-evaluated renderer change,
mixed validation levels, and proxy evidence claimed as outcome success — so
the Decision can weigh the gate directly against the evidenced failure chain.

## Unresolved Matters

- Whether Decision records should additionally declare structured conditions
  remains open complementary work.
- Cross-bundle decision references remain `external` prose until NKF defines
  cross-bundle relationships; native resolution stops at the bundle boundary.
- Acceptance-binding verification remains deferred under `NKF-016`; gate
  reference resolution proves declared status, not verified acceptance.
- How a future Knowledge Engine consumes gate rows mechanically is out of
  scope for NKF 0.1.
