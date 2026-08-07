---
id: design-nkf-0-1-technology-root-profile-specification-proposal
type: design
title: NKF 0.1 Technology Root Profile Specification Proposal
summary: Define the Technology knowledge model independently from the accepted Product knowledge model so the exact intersection can later become the non-selectable Common Specification and every non-intersecting rule can remain in its concrete profile.
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0049
  - adr-0050
proposal_authority_effect: None. This document defines a reviewable Technology candidate derived from NKF's own needs. It does not accept a Technology Profile, change canonical NKF 0.1 authority, or establish conformance.
---

# NKF 0.1 Technology Root Profile Specification Proposal

- **Governing Architecture:** [`ADR 0049`](../../decisions/0049-common-and-root-profiles.md)

## Purpose

Define the Technology knowledge model independently from the accepted Product
knowledge model so the exact intersection can later become the non-selectable
Common Specification and every non-intersecting rule can remain in its
concrete profile.

This proposal uses the NKF repository as its first concrete Technology
exercise. Nourd Agent SDK is a required later exercise before claiming that
the profile is sufficient for both technologies.

## Evidence Basis

The proposal is derived from the following current NKF responsibilities:

- the root repository identity and ownership boundary in `README.md` and
  `AGENTS.md`;
- normative format and profile Specifications;
- immutable accepted Decisions and evolving Designs;
- reviewed Evidence and preserved migration provenance;
- executable contracts, schemas, checker code, fixtures, and release tooling;
- compatibility, migration, distribution, security, and lifecycle ownership;
  and
- the governed pre-stable feedback loop accepted by [ADR 0006](../../decisions/0006-pre-stable-evolution.md).

Product terminology, the Product body, and the Product–Domain–Capability
hierarchy are not derivation sources for this Technology model.

## Technology Definition

A **Technology** is a durable governed technical subject that:

1. supplies technical capabilities, contracts, or both to one or more
   consumers;
2. owns technical meaning and evolution independently of any one consumer;
3. has an identifiable maintainer and authority boundary; and
4. can be specified, designed, realized, distributed, supported, changed, and
   retired through a deliberate lifecycle.

A format, SDK, protocol, library, framework, tool, service, platform,
application, or system may satisfy this definition. Those terms are
illustrative technical kinds, not a closed vocabulary in this proposal.

A repository, package, executable, deployment, or project is not
automatically a Technology. It may instead be a Realization or operational
instance of one. `Shared Technology` is a Nourd ApS organizational
classification and is not Technology Profile vocabulary.

## Technology Semantic Layers

The Technology model independently requires the same four distinct semantic
layers already visible in the NKF repository:

```text
Semantic Entity → Realization → Operational Instance → Observation
```

For NKF:

- NKF, its rules, contracts, and accepted Decisions are semantic meaning;
- the YAML contract set, schemas, checker source, executable, fixtures, and
  release package are Realizations;
- one installed checker or one validation execution is an operational
  instance; and
- its diagnostics, result, logs, and observed behavior are observations.

The Technology Profile governs durable semantic meaning and durable
Realization mappings. It does not copy live deployment, execution, account,
health, permission, or runtime state into canonical knowledge.

## Technology Root

Every Technology bundle has exactly one Technology root. The root is living
and describes the whole Technology, not merely its repository or current
implementation.

### Required Root Responsibilities

1. `technology-definition` — Name, stable identity, maintainer or owner, and
   the kind of Technology.
2. `purpose-and-problem` — Why the Technology exists and the technical problem
   or class of problems it addresses.
3. `consumers-and-use-contexts` — Intended consumers, integration contexts,
   and the circumstances in which they rely on it.
4. `capabilities-and-contracts` — The technical abilities, guarantees,
   interfaces, or contracts the Technology supplies.
5. `scope-authority-and-boundaries` — What meaning and behavior the Technology
   owns, what it does not own, and the applicable external-authority and
   operational-state boundaries.
6. `technology-map` — Links to the governing Specifications, Decisions,
   Designs, Realizations, Evidence, interfaces, and other material parts of
   the Technology knowledge.
7. `versioning-compatibility-and-migration` — Version coordinates,
   compatibility policy, supported transitions, and deliberate consumer
   migration.
8. `distribution-support-and-security` — Distribution and integrity
   boundaries, support expectations, and security and privacy obligations.
9. `evolution-and-retirement` — How the Technology changes, is deprecated, and
   may eventually be retired.

Detailed architecture does not belong in the Technology root. The
`technology-map` points to applicable Design records; those Designs own the
architecture and its trade-offs.

Optional root responsibilities may include licensing, contribution
governance, portability, adoption evidence, known risks, measures, and
unresolved matters.

## Technology Record Model

The initial Technology Profile supports only record bodies proven necessary
by the NKF repository:

| Record | Cardinality | Technology meaning |
| --- | --- | --- |
| Technology | Exactly one | Root identity, intent, authority, technical offering, boundaries, map, and lifecycle |
| Specification | At least one | Normative technical meaning and the requirements against which implementations or consumers can be evaluated |
| Decision | Zero or more | An immutable accepted choice governing the Technology |
| Design | Zero or more | A governed proposal describing a possible direction, its alternatives, and its trade-offs |
| Realization | Zero or more | A durable mapping from Technology meaning to source, artifacts, systems, processes, packages, or implementations |
| Evidence | Zero or more | Source-grounded observations and analysis relevant to Technology meaning, decisions, designs, realizations, or conformance |

Task is not a Technology semantic record in this proposal. Task files remain
durable execution intent owned by the project's task system and are
represented as explicit non-record Markdown while located under the configured
knowledge root. Navigation indexes are also explicit non-records.

Principle, Concept, Journey, Domain, and Capability are not included merely
because the Product Profile contains them. A later Technology exercise may
justify one or more of them, a distinct Technology body, or an extension.

The exact record-type and body-contract identities remain unresolved until
the Product–Technology comparison determines which bodies, if any, belong in
Common.

## Section Roles

The Technology bodies use the following exact candidate role subsets:

| Technology body | Allowed roles |
| --- | --- |
| Technology | `definition`, `context`, `actor`, `governing`, `boundary`, `catalogue`, `evolution`, `interface`, `obligation`, `risk`, `measure`, `unresolved`, `content` |
| Specification | `definition`, `governing`, `applicability`, `boundary`, `interface`, `validation`, `evolution`, `obligation`, `risk`, `unresolved`, `content` |
| Decision | `context`, `governing`, `applicability`, `rationale`, `alternative`, `consequence`, `trade-off`, `evidence`, `recovery`, `unresolved`, `content` |
| Design | `context`, `boundary`, `governing`, `responsibility`, `interface`, `alternative`, `trade-off`, `risk`, `recovery`, `validation`, `evidence`, `unresolved`, `content` |
| Realization | `identity`, `mapping`, `responsibility`, `boundary`, `interface`, `dependency`, `obligation`, `evidence`, `recovery`, `unresolved`, `content` |
| Evidence | `context`, `source`, `method`, `observation`, `finding`, `interpretation`, `limitation`, `boundary`, `relevance`, `evidence`, `unresolved`, `content` |

Role `mapping` means a durable correspondence between governed Technology
meaning and a Realization. Role `relevance` means how Evidence bears on
Technology knowledge, a claim, Decision, or governed question. Their
comparison with the Product-bound definitions determines whether neutral
Common meanings replace both.

The shared structural rules remain necessary: every declared section has one
allowed role; `content` is a last resort and cannot satisfy a controlled
responsibility; and role classification alone cannot establish authority,
responsibility coverage, semantic adequacy, truth, acceptance, or
conformance.

## Specification Body

The Technology Profile requires a Specification body because an independently
governed Technology needs authoritative technical meaning against which
Realizations and consumers can be assessed.

### Required Specification Responsibilities

1. `specification-definition` — Specification identity, subject, purpose, and
   the technical contract or behavior it defines.
2. `authority-and-normative-status` — Normative authority, acceptance state,
   precedence, and the distinction between normative and explanatory content.
3. `scope-and-applicability` — Included and excluded subjects, supported
   contexts, assumptions, and applicability boundaries.
4. `model-vocabulary-and-semantics` — The normative model, controlled
   vocabulary, identities, and semantic rules needed for consistent
   interpretation.
5. `requirements-constraints-and-interfaces` — Required, permitted, and
   prohibited behavior, structural constraints, and applicable interface or
   contract definitions.
6. `validation-and-conformance` — Deterministic checks, semantic-review
   boundaries, conformance meaning, diagnostics, and what validation cannot
   prove.
7. `versioning-compatibility-and-migration` — Version meaning, compatibility,
   deprecation, replacement, and migration requirements.
8. `security-authority-and-operational-boundaries` — Security and privacy
   constraints, external-authority boundaries, and separation from
   operational state.
9. `unresolved-and-deferred-matters` — Known omissions, deferred decisions,
   unsupported cases, and their visible consequences.

An accepted Specification for an exact Technology version is immutable.
Correction, extension, replacement, or reversal requires a later accepted
revision with explicit provenance and compatibility treatment. A draft
Specification may evolve until its exact revision is accepted.

A Specification states normative technical meaning. It does not by itself
prove that a Realization implements that meaning or that a consumer conforms.

Optional Specification responsibilities include examples and
counterexamples; rationale; interoperability; implementation guidance that is
clearly non-normative; test and fixture traceability; change history; and
unresolved questions.

## Decision, Design, Realization, And Evidence Bodies

The NKF repository independently requires these four bodies. Their candidate
responsibilities are stated here without assuming that their Product
counterparts are Common.

### Technology Decision

Required responsibilities:

1. `context-and-problem`;
2. `decision`;
3. `scope-and-applicability`;
4. `rationale`;
5. `alternatives-considered`; and
6. `consequences-and-trade-offs`.

An accepted Technology Decision is immutable. It governs its declared
Technology scope and is not limited to architecture.

Optional responsibilities include Evidence, compatibility, migration,
recovery, supersession, and matters deliberately not decided.

### Technology Design

Required responsibilities:

1. `design-kind-problem-and-scope`;
2. `governing-inputs-and-constraints`;
3. `proposed-direction`;
4. `responsibilities-interactions-and-information-flows`;
5. `alternatives-and-trade-offs`;
6. `failure-safety-recovery-and-operations`;
7. `validation-and-decision-evidence`; and
8. `unresolved-matters`.

A Technology Design owns architecture when architecture is the chosen design
kind. It distinguishes governing Technology requirements from a chosen
solution and does not claim implementation or conformance without a
Realization and Evidence.

Optional responsibilities include diagrams, contracts, data treatment,
security, privacy, migration, rollout, retirement, and other
Technology-specific concerns established by the source.

### Technology Realization

Required responsibilities:

1. `realization-identity-and-kind`;
2. `technology-meaning-realized`;
3. `durable-mapping`;
4. `responsibilities-and-ownership-boundaries`;
5. `interfaces-dependencies-locators-and-resolution`;
6. `external-authority-and-operational-state-boundaries`; and
7. `compatibility-verification-and-recovery`.

A Technology Realization maps Technology meaning to durable source, contracts,
schemas, code, processes, assets, systems, packages, or other implementations
without redefining that meaning. Presence and digest integrity do not prove
correctness or conformance.

Optional responsibilities include environments, configuration classes,
migration, deployment model, support model, security, privacy, retention,
retirement, and unresolved questions.

### Technology Evidence

Required responsibilities:

1. `question-claim-or-decision-context`;
2. `sources-or-primary-observation-method`;
3. `observations-and-findings`;
4. `interpretation`;
5. `limitations-and-uncertainty`;
6. `applicability-and-boundaries`; and
7. `relevance-to-technology-knowledge`.

Evidence carries evidence authority. It does not become a Specification,
Design, Decision, or confirmed Realization merely because it is persuasive.
Raw runtime events and current operational status remain in their
authoritative operational systems.

Optional responsibilities include methodology detail, samples, competing
Evidence, confidence, reproducibility, ethical or privacy constraints,
recommended investigation, and unresolved questions.

## Scope And Structural Topology

Every record belongs to the one Technology root through bundle scope.
Membership does not itself assert a semantic relationship.

The initial Technology Profile defines no mandatory record-level `part-of`
hierarchy. In particular, it does not copy Product–Domain–Capability or
reinterpret repository directories as semantic structure.

Record relationships express the topology that NKF actually needs:

- `defines`;
- `governs`;
- `applies-to`;
- `depends-on`;
- `extends`;
- `supersedes`;
- `rationale-for`;
- `realizes`;
- `evidences`; and
- `references`.

Record-level `part-of` is unsupported by this initial profile. A later
Technology rule may add a precisely defined hierarchy from evidence, but
cannot infer it from paths, package layout, or implementation composition.

## Technology Semantic Entities

The Technology Profile needs controlled entity kinds for independently
addressable technical meaning. The initial candidate set is:

| Kind | Technology meaning |
| --- | --- |
| `technology` | The governed Technology root |
| `specification` | An independently addressable normative specification |
| `contract` | A governed technical contract or contract family |
| `rule` | A governed normative rule |
| `diagnostic` | A stable diagnostic meaning |
| `actor` | A person, role, group, system, or external participant involved in or consuming the Technology |
| `component` | A design-level constituent with defined responsibility |
| `interface` | A defined contract or interaction boundary |
| `policy` | A governed technical policy |
| `decision-scope` | The independently addressable scope of a Decision |
| `system` | A durable system or service definition |
| `source` | A durable source definition |
| `process` | A durable technical or organizational process definition |
| `asset` | A durable governed asset |
| `implementation` | A durable implementation or configuration definition |
| `claim` | A source-bound proposition examined by Evidence |
| `observation` | A reviewed, time-bounded observation represented as Evidence |

The candidate defining-body rules are:

| Kind | Allowed defining Technology bodies |
| --- | --- |
| `technology` | Technology |
| `specification` | Specification |
| `contract` | Technology, Specification |
| `rule` | Specification, Decision |
| `diagnostic` | Specification |
| `actor` | Technology, Specification |
| `component` | Design |
| `interface` | Technology, Specification, Design, Realization |
| `policy` | Technology, Specification, Decision, Design |
| `decision-scope` | Decision |
| `system` | Design, Realization |
| `source` | Realization, Evidence |
| `process` | Design, Realization |
| `asset` | Realization |
| `implementation` | Realization |
| `claim` | Evidence |
| `observation` | Evidence |

Technology entity relationships support `part-of`, `defines`, `depends-on`,
`governs`, `flows-to`, `realizes`, `evidences`, `observes`, and `references`
with the common source-binding, endpoint, uniqueness, ownership, and cycle
rules.

Entity-level `part-of` may express a governed constituent such as a component
inside a Design. It does not create record hierarchy. `flows-to` is available
for Design information flows. Technology defines no `stage`, `transition`, or
`state` entity kind and therefore does not support `transitions-to`.

An operational instance, live account, current deployment, current check run,
or current status is not a canonical semantic entity merely because it can be
resolved.

## Durable Bindings

Technology Realizations support these binding kinds:

- `source`;
- `system`;
- `process`;
- `asset`;
- `implementation`;
- `provider`;
- `namespace`;
- `data`; and
- `interface`.

`agreement` and `deployment` are not supported by this initial Technology
candidate because the NKF exercise does not require them. A later accepted
Technology revision may add a kind from evidence.

Every binding is declared by its Realization, resolves its Technology semantic
entity, identifies at least one durable locator or resolution rule, and
preserves any applicable external-authority boundary. A binding does not copy
current instance state or prove that its target currently exists, works, or
conforms.

## Governed Technical Artifacts

Markdown remains the canonical human meaning. Technology knowledge also needs
to bind exact non-Markdown technical artifacts when those artifacts
participate in validation.

The Technology Profile therefore requires a declarative governed-artifact
mechanism with at least:

- artifact identity and controlled kind;
- project-contained path or safe durable locator;
- exact digest when exact bytes are governed;
- source section establishing why the artifact participates;
- the Specification, Design, Decision, or Realization to which it is bound;
  and
- whether the artifact is a required Governed Validation Input.

Only a resource declared or required by an accepted contract enters the
Governed Validation Inputs. A checker does not include file types by
preference, and the Technology Profile does not govern every source or build
file merely because it exists.

A local required artifact is included in the validated snapshot. An external
locator is not automatically dereferenced. Existence, containment, file kind,
and digest validation establish binding integrity only; they do not prove
semantic adequacy, implementation correctness, acceptance, or confirmed
Realization.

The exact artifact kinds and YAML serialization remain proposed. NKF's likely
first exercised kinds are executable contract, schema, checker source,
checker executable, fixture, release manifest, release archive, and bootstrap
verifier.

## Technology Profile Validation

In addition to the automatically applicable Common rules, a Technology
validator must deterministically check:

1. exactly one Technology root and no other root type;
2. every record scoped to that root;
3. at least one Specification record;
4. supported Technology record/body pairs;
5. complete required responsibility bindings and allowed section roles;
6. the Technology root is living;
7. accepted Decisions and accepted version-specific Specifications are
   immutable;
8. no unsupported record-level `part-of` relationship;
9. supported Technology relationship and entity vocabularies;
10. governed technical-artifact declarations, containment, bindings, and
    digests;
11. additional Technology Governed Validation Inputs and snapshot inclusion;
    and
12. exact supported Technology Profile authority and validator bindings.

Full Technology-profile conformance requires both Common and Technology
validation. Common-only structural success cannot produce `NKF Verified`.

Validation cannot establish that the Technology is useful, its specification
is adequate or true, a Design is sound, a Realization works, an acceptance
event occurred, or an external system currently has any claimed state.

## NKF Self-Hosting Exercise

The proposed profile maps the current NKF repository as follows:

| Current NKF material | Proposed representation |
| --- | --- |
| NKF identity, purpose, consumers, authority, map, versioning, distribution, security, and lifecycle | One new Technology root Markdown record |
| `knowledge/specifications/nkf-0.1.md` | Specification record |
| Accepted ADRs | Decision records |
| Evolving and historical design proposals | Design records |
| Reviewed source reconciliation and substantive migration evidence | Evidence records |
| Confirmed checker, contract, schema, fixture, package, and verifier mappings | New Realization records with governed artifact bindings |
| Task plans | Explicit non-records with `kind: other` and a reason identifying Task authority |
| Navigation READMEs | Explicit `navigation` non-records |
| Byte-preserved Markdown source snapshots | Evidence records when their content is governed evidence; otherwise explicit `other` non-records with a source-artifact reason |

The project root remains the repository root, `.nourd` remains directly at
that root, and `knowledge_root` can remain `knowledge`.

The observed 30 July 2026 tree contains 97 Markdown files under `knowledge`.
Its initial file-level classification is:

| Proposed representation | Current files | Count |
| --- | --- | ---: |
| Decision records | [ADR 0001](../../decisions/0001-independent-nkf-authority.md) through [ADR 0049](../../decisions/0049-common-and-root-profiles.md) | 49 |
| Design records | Non-index Markdown directly under `knowledge/designs` | 29 |
| Specification records | Canonical `knowledge/specifications/nkf-0.1.md` | 1 |
| Evidence records | Reconciliation plus substantive byte-preserved source-snapshot Markdown | 8 |
| Navigation non-records | Knowledge, Decisions, Designs, Evidence, Specifications, and source-snapshot indexes | 6 |
| Task non-records | [NKF-003](../../tasks/completed/NKF-003-independent-nkf-authority.md) through [NKF-006](../../tasks/deferred/NKF-006-extensible-root-models.md) | 4 |
| **Total** |  | **97** |

This classification covers every current Markdown file exactly once. A later
self-hosting realization must review each exact source and generate the
declarations; this proposal does not claim that the current headings,
responsibility coverage, governance, or Title Case already conform.

The missing Technology root and missing Realization Markdown sources would be
new governed files, not ways to reinterpret one of the 97 current files.

This exercise does not require Domain or Capability records and exposes no
honest record-level `part-of` hierarchy. It does require a Specification body
and governed technical-artifact bindings, neither of which the current
Product-only format supplies.

## Fitness Result

The proposal can describe NKF without pretending NKF is a Product, a
repository, or a running checker. It also preserves architecture in Design,
implementation in Realization, observations in Evidence, and operational
state outside canonical knowledge.

The exercise exposes these realization gaps rather than hiding them:

- no accepted Technology Profile specification or executable companion;
- no profile identities or profile-selection serialization;
- no Technology root source or declaration;
- no Specification body contract;
- no governed technical-artifact declaration contract;
- no Technology schemas, validator, diagnostics, fixtures, or release
  bindings; and
- no Technology-profile validation result for this repository.

Those are expected gaps at proposal stage. They are not Product
nonconformance and do not weaken the current Product-only NKF 0.1 authority.

## Compatibility And Non-Claims

Adopting this profile would be a governed breaking pre-stable NKF 0.1 change
requiring accepted Markdown authority, executable contracts, schemas,
validator behavior, fixtures, release support, and deliberate migration.

This proposal does not:

- accept the Technology definition, root responsibilities, record set,
  Specification body, hierarchy, vocabularies, or artifact mechanism;
- prove that Nourd Agent SDK fits the same Technology Profile;
- decide which Technology rules are Common;
- change the current Product specification;
- create another NKF version namespace;
- create `.nourd`, record declarations, artifacts, or a validation result for
  this repository; or
- claim acceptance, confirmed realization, release, migration, or
  conformance.
