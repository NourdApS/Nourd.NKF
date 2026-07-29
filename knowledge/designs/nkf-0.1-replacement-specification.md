# NKF 0.1 — Product knowledge format

- **Status:** Proposal to replace the accepted canonical NKF 0.1 revision
- **Task:** `NKF-003`
- **Version:** `0.1`
- **Prepared:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Accepted source baseline:** `kaveh6202/Nourd.Studio@13a82fbc1b72c1350e9765f59d1538c375f3fa69`
- **Accepted source digest:** `77869d6f6cfe2ba8086e4eeba28fc5e545aa2c1896b9a28488b6d53b1b03bc5a`
- **Source acceptance:** [Nourd Studio ADR 0012](../evidence/source-snapshots/nourd-studio/13a82fbc1b72c1350e9765f59d1538c375f3fa69/knowledge/decisions/0012-initial-knowledge-declaration-contracts.md)
- **Accepted canonical baseline:** `knowledge/specifications/nkf-0.1.md`
- **Accepted canonical digest:** `a0096d74fc444d197ce9c4c4fce78181c80fdb5bd633e2fd605b659a610f1151`
- **Proposed executable companion destination:** `contracts/nkf/0.1/nkf.yaml`
- **Independent governing inputs:** ADRs 0001 through 0021
- **Interoperability baseline:** Open Knowledge Format 0.2

> This is a proposed replacement for the accepted canonical NKF 0.1 revision.
> It integrates the accepted baseline with the later governed changes in ADRs
> 0013 through 0021. It is not accepted merely because its inputs are accepted,
> and it is not the public stable NKF 1.0 release.

## Purpose

The **Nourd Knowledge Format (NKF)** is a human-readable, machine-verifiable
format for durable Product knowledge. It lets people and machines identify
what a Product means, which parts govern, how narrower knowledge relates,
what evidence supports it, how it is realized, and where external or
operational authority remains.

NKF is designed for the whole Product. It covers Product and business meaning
as well as experience, design, technology, operations, risk, evidence,
evolution, and retirement. It does not make software the center of the model.

NKF remains a **format**. A possible future interaction, synchronization, or
acceptance protocol is reserved under the name **Nourd Knowledge Protocol
(NKP)**. The Nourd Knowledge Engine is an implementation that may consume NKF;
it does not define the format.

## Normative status

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**,
and **MAY** express normative requirements in this specification.

NKF 0.1 is an accepted pre-stable format. The exact canonical revision in ADR
0010 and its YAML companion in ADR 0011 remain accepted historical snapshots.
ADRs 0013 through 0021 establish later changes that require this coherent
replacement pair. This replacement revision remains a proposal until its exact
bytes are accepted.

The `0.x` version communicates that public governance and compatibility are not
yet stable. A validator result, Git commit, merge, file status, or tool output
cannot accept a later revision. Only the applicable Human Product Owner or
another explicitly authorized acceptance authority can accept changed Product
meaning.

Conformance and acceptance are different:

- **conformance** means that a bundle satisfies the structural and semantic
  declaration requirements of a supported NKF contract; and
- **acceptance** means that an authorized actor has accepted an exact proposed
  revision as governing Product meaning.

A conformant Draft remains a proposal. An accepted record that becomes
structurally invalid is still part of accepted history, but a consumer MUST
surface the defect and MUST NOT silently reinterpret it.

## Source drafting provenance

The Human Product Owner directly confirmed the NKF name; eventual public
direction; Product-only 0.1 scope; Shredwise pilot; deliberate OKF 0.2 rebase;
Markdown-plus-YAML composite record; core record vocabulary; stable identity;
section-authority classes; typed record relationships; four authority roles;
provenance and external-authority separation; semantic entity, Realization,
instance, and observation layers; Nourd repository profile; Product body
contract; Principle body contract; and the decision to leave freshness and
enforcement unresolved.

The precise Concept, Journey, Domain, Capability, Design, Decision,
Realization, and Evidence body-contract wording was drafted under the Human
Product Owner's delegation to complete NKF 0.1 without contract-by-contract
confirmation. The exact `nkf.*` contract identifiers, conformance levels,
extension behaviour, external-authority minimum fields, security and privacy
language, minimal serialization example, and Attested Computation treatment
are also drafting proposals.

This distinction records the provenance and authority of the Studio source
baseline; it does not create partial authority. The Human Product Owner
accepted that exact Studio composite on 28 July 2026 and the current canonical
independent revision under ADR 0010. Later independent Decisions accept
specific changed boundaries, but neither those Decisions nor the baseline
accepts this proposed composite revision by implication.

## Scope

NKF 0.1 defines Product knowledge only. Company and Organization knowledge may
be added in later NKF versions after their requirements are understood.

NKF 0.1 defines:

- a project-contained knowledge bundle with fixed `.nourd` metadata and a
  configurable canonical knowledge root;
- one canonical Markdown source and one YAML declaration per governed record;
- stable bundle, record, section, and semantic-entity identity;
- Product record types and their minimum body contracts;
- lifecycle, authority, provenance, and acceptance semantics;
- typed record and semantic-entity relationships;
- Realization and external-authority bindings;
- the boundary between knowledge and operational instances;
- one native project layout; and
- a deliberate export mapping to OKF 0.2.

NKF 0.1 does not define:

- a Task or business lifecycle;
- Task state, Workflow Runs, Steps, sessions, checks, deployments, current
  availability, synchronization state, or live observations;
- one storage engine, graph, database, API, user interface, validator,
  acceptance workflow, or enforcement mechanism;
- a runtime wire protocol;
- cross-bundle semantic relationships;
- Company or Organization knowledge contracts;
- public governance, registry hosting, or licensing; or
- a universal freshness policy.

## Core model

NKF separates four layers:

```text
Semantic entity → Realization → Operational instance → Observation
```

A **Knowledge Bundle** is a distributable set of Product knowledge with one
stable identity and exactly one Product root record.

A **Record** is a governed unit of Product knowledge. It is a composite of:

1. one Markdown source that owns the human Product meaning; and
2. one YAML declaration that identifies, binds, classifies, and relates that
   meaning.

A **Semantic entity** is an independently addressable meaning defined by an
exact record section. Records are governance and reading units; entities are
semantic topology units. A record may define zero, one, or several entities.

An earlier Nourd-specific Knowledge semantic-model draft was an input to this
model. Acceptance of NKF 0.1 supersedes that standalone draft for overlapping
scope rather than leaving two semantic-model authorities.

A **Realization** is a durable mapping from Product meaning to a Source,
system, service, process, agreement, asset, integration, or implementation.
It may define how real instances are found or governed, but it does not own
their live state.

An **Operational instance** is a concrete running, stored, connected, or
externally managed instance. An **Observation** is a time-bound fact about an
instance or event. NKF may contain durable definitions, bindings, and reviewed
Evidence about these layers; it MUST NOT become the authoritative store for
their live state merely by describing them.

Every datum MUST have one writable authority. Canonical Markdown, declarations,
generated projections, operational stores, and connected systems MUST NOT
compete for the same authority.

## Versioning

NKF format versions use `<major>.<minor>`.

- A minor version MAY add backward-compatible optional vocabulary or clarify
  existing requirements.
- A major version MAY make breaking changes.
- NKF `1.0` is reserved for the first public stable release.

NKF has one version namespace: the NKF format version. A bundle MUST declare
`nkf_version`. NKF 0.1 uses the unversioned canonical identities `nkf.bundle`,
`nkf.record`, `nkf.contract-set`, and `nkf.product` through `nkf.evidence`.
They are all governed by the one NKF version coordinate, `0.1`.

The sole NKF 0.1 record definition includes explicit responsibility bindings.
Older external record structures are legacy-consumer formats, not supported
parallel NKF contracts. They may be retained as provenance and deliberately
migrated by their consumers, but MUST NOT be reported as native NKF 0.1
conformance or automatically converted.

A repository or distribution MUST pin the exact specification revision it
uses through immutable distribution metadata or version control. The human
version `0.1` alone does not identify editorial changes to a draft.

NKF 0.1 uses OKF 0.2 as its interoperability baseline. A later OKF release
does not automatically change NKF. Each rebase MUST be reviewed deliberately,
document compatibility effects, update the mapping, and produce a new NKF
revision when needed.

Existing `nourd.knowledge.*` contracts remain the Nourd Studio bootstrap
contracts. NKF 0.1 does not silently rename or reinterpret them. A controlled
migration or verified profile mapping is required before a repository using
those identifiers can claim native NKF contract conformance.

## Bundle contract

The project root is the directory that directly contains `.nourd/`. Native NKF
0.1 fixes:

```text
<project-root>/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
└── <configured-knowledge-directory>/
```

The manifest is `.nourd/knowledge/bundle.yaml`. Record declarations are UTF-8
`.yaml` files in the flat `.nourd/knowledge/records/` directory.

The manifest is a closed object with these required fields:

| Field | Responsibility |
| --- | --- |
| `nkf_version` | Constant NKF version `"0.1"` |
| `contract` | Constant bundle identity `nkf.bundle` |
| `id` | Non-empty stable bundle identity |
| `product_record` | Non-empty record ID of the unique Product root |
| `knowledge_root` | Canonical knowledge directory relative to the project root |
| `non_records` | Explicit non-governing file declarations; present and possibly empty |

It may additionally contain only `extension_contracts` and `extensions` under
the extension contract below. Unknown top-level fields fail closed. Native NKF
0.1 has no `record_contract`, `markdown_root`, `records_root`,
`required_extensions`, or free-form top-level extension field.

`knowledge_root` is a non-empty project-root-relative directory path. It is
not relative to the manifest, must resolve inside the project root and outside
`.nourd`, and must not be absolute; contain an empty, `.` or `..` segment; use
environment-variable or `~` expansion; or escape after symlink resolution.

Record `source.path` and `non_records[].path` are relative to
`knowledge_root`. Stored paths use `/`, are interpreted literally, and have no
leading slash, Windows drive or UNC prefix, NUL, ASCII control character,
empty segment, `.` segment, or `..` segment. Path spelling and case are exact.
NKF core adds no Windows-reserved-name or Unicode case-folding rule.

Each `non_records` entry is closed and contains:

```yaml
path: README.md
kind: navigation
reason: <optional non-empty explanation>
```

`kind` is exactly `navigation`, `generated`, `redirect`, or `other`.
`reason` is required and non-empty for `other`, and optional otherwise. The
path resolves to an existing regular file. Resolved paths are unique and
cannot also be record sources. List order carries no meaning.

Every Markdown file recursively under `knowledge_root` has exactly one
representation: one record declaration or one `non_records` entry.
Non-Markdown assets need not be listed; listed assets follow the same
existence, containment, uniqueness, and classification rules.

One governed Markdown file has exactly one record declaration. A declaration
may map many sections, responsibilities, entities, entity relationships, and
bindings, but several declarations cannot divide one Markdown source by
section. Duplicate record IDs, duplicate source paths, or different paths
resolving to the same source file are invalid.

The declaration filename SHOULD be `<record-id>.yaml`. A mismatch produces a
navigation warning but does not change identity or conformance.

Symlinks are generally prohibited. A broken, cyclic, or project-escaping
symlink fails structural conformance. A symlink whose complete target remains
inside the project may be read but produces a portability warning; a knowledge
path target must also remain inside resolved `knowledge_root`. The final target
must have the required file kind and duplicate-physical-file rules still
apply.

## Record contract

Every governed record MUST have exactly one canonical Markdown source and one
YAML declaration.

The Markdown source:

- MUST be UTF-8 Markdown;
- MUST contain exactly one level-one title;
- MUST own all human Product meaning asserted by the record;
- MUST use headings to make semantic sections addressable; and
- MUST NOT require the declaration to complete an otherwise absent Product
  claim.

The YAML declaration:

- MUST identify and bind the exact Markdown bytes;
- MUST classify every semantic level-two and level-three section;
- MUST declare relationships only when the source establishes them;
- MUST NOT contain native presentation settings; and
- MUST NOT introduce, strengthen, accept, or reinterpret meaning absent from
  the Markdown source.

A record declaration MUST contain these logical responsibilities:

| Responsibility | Required content |
| --- | --- |
| Contract | NKF record identity (`nkf.record`) |
| Identity | Stable bundle-scoped `id` |
| Type | One core or profile-defined record type |
| Body contract | NKF body identity for the Markdown body's responsibilities |
| Title | Title agreeing with the Markdown level-one title |
| Source binding | Source path, digest algorithm, and digest of the exact Markdown bytes |
| Governance | Lifecycle, authority state, and acceptance authority |
| Scope | Product root and optional narrower subjects |
| Sections | Complete semantic section map with explicit body-responsibility bindings |
| Relationships | Source-bound typed record relationships |

A declaration MAY contain these responsibilities when real:

- provenance producers, verifiers, and sources;
- external-authority boundaries;
- semantic entities, entity relationships, and bindings; and
- separately governed extensions.

Governance lifecycle MUST be `living` or `immutable`. Authority state MUST be
`draft`, `accepted`, `superseded`, or `retired`. The declaration MUST identify
at least one acceptance authority. An acceptance date MAY be recorded for an
accepted revision, but the authoritative acceptance event and exact revision
binding remain outside a copied status field.

The Product root MUST be living. An accepted Decision MUST be immutable.
Other body contracts MAY support living or immutable records according to the
meaning they contain.

Empty optional structures SHOULD be omitted by a native NKF serializer.
Profiles MAY require explicit empty collections for compatibility, but those
collections carry no meaning.

### Native record serialization

The native declaration is closed to unknown top-level fields except for the
accepted `extensions` field. It requires:

```yaml
contract: nkf.record
id: <non-empty record ID>
type: <supported record type>
body_contract: <corresponding supported body identity>
title: <Markdown H1>
source:
  path: <knowledge-root-relative Markdown path>
  digest:
    algorithm: sha-256
    value: <64 lowercase hexadecimal characters>
governance:
  lifecycle: living | immutable
  status: draft | accepted | superseded | retired
  authority: [<one or more acceptance-authority identifiers>]
  accepted_at: <optional ISO 8601 date>
scope:
  product: <Product record ID>
  subjects: [<optional narrower subject IDs>]
sections:
  - id: <record-scoped section ID>
    heading_path: [<one or more exact heading strings>]
    occurrence: <integer, minimum 1>
    authority: accepted-meaning | proposal | unresolved | evidence
    role: <body-contract-controlled role>
    responsibilities: [<optional supported responsibility IDs>]
relationships:
  - type: <supported record relationship type>
    target: <record ID>
    source_section: <declared section ID>
```

`relationships` is required and is empty when none exist. Optional
`scope.subjects` is omitted when empty. The `type` and `body_contract` pair
must correspond exactly. Every required body responsibility occurs in at least
one section.

Optional source-bound structures have these exact minimum shapes:

- `provenance.producers[]` and `provenance.verifiers[]` require `actor`, with
  optional `at` and `method`;
- `provenance.sources[]` requires `locator`, with optional `id`, `title`,
  `author`, `observed_at`, `revision`, `last_modified_at`, and digest;
- `provenance.primary_observation` requires `method` and `source_section`, with
  optional `observed_at`;
- `external_authorities[]` requires `id`, `authority`, `relationship`, and
  `source_section`, plus at least one of `locator` or `resolution_rule`;
- `entities[]` requires `id`, controlled `kind`, and `defining_section`, with
  optional non-identifying `address`;
- `entity_relationships[]` requires controlled `type`, entity-reference
  `source`, entity-reference `target`, and `source_section`; and
- `bindings[]` requires entity reference `entity`, record ID `realization`,
  controlled `kind`, and `source_section`, plus at least one of `locator` or
  `resolution_rule` and optional `external_authority`.

An entity reference contains `record` and `entity`.

Except for `governance.accepted_at`, whose ISO 8601 date shape is explicit
above, NKF 0.1 does not impose a narrower lexical format on the optional
factual-time strings in these structures. A later format revision may
standardize them through the governed change process.

Array order carries no meaning except `heading_path`. Native serialization
emits responsibility IDs in body-contract order for deterministic review.
Optional empty structures are omitted.

Native NKF 0.1 defines no presentation-guidance field. Markdown is the default
readable form. Portable display metadata uses a separately governed optional
extension and remains subject to ADR 0020 and future governed reconsideration
through NKF-004.

The core Product record types are:

- `product`
- `principle`
- `concept`
- `journey`
- `domain`
- `capability`
- `design`
- `decision`
- `realization`
- `evidence`

A Product vision is not a separate core type. Durable direction belongs in
the Product record; exploratory visions and investigations belong in Concept
and Evidence records until a Decision, Capability, Design, or Realization is
justified.

Profiles MAY introduce namespaced types and body contracts. Unknown
extensions MUST remain visible and round-trippable, but a consumer that does
not understand a required extension MUST NOT claim complete semantic
validation or perform a consequential governing action from it.

## Identity

A bundle has one stable `bundle_id`. Each record has one stable,
bundle-scoped `record_id`. Each semantic section has one stable,
record-scoped `section_id`.

The durable identity of a record is the pair:

```text
(bundle_id, record_id)
```

The durable identity of a section is:

```text
(bundle_id, record_id, section_id)
```

The durable identity of a semantic entity is:

```text
(bundle_id, record_id, entity_id)
```

Titles, filenames, paths, headings, record types, display labels, canonical
addresses, and external locators are not identity. They MAY change through a
governed revision without changing the referenced meaning.

An identity MUST NOT be reused for materially different meaning. Moving a
canonical definition owner MUST preserve the stable identity, provenance,
incoming relationships, and accepted history through a governed migration.

A bundle MUST have exactly one Product root. Every governed record MUST
resolve to that Product through its scope and, where applicable, `part-of`
relationships.

Cross-bundle identity and typed relationships are deferred in NKF 0.1.
External material and authority are addressed through provenance locators and
external-authority bindings instead.

## Section authority

Every semantic Markdown section MUST be classified as exactly one of:

| Authority class | Meaning |
| --- | --- |
| `accepted-meaning` | Governing meaning when its exact record revision has been accepted |
| `proposal` | Candidate meaning that does not govern |
| `unresolved` | An explicit question, ambiguity, conflict, or undecided matter |
| `evidence` | Observation, source-grounded analysis, or factual support that does not itself govern Product intent |

Section authority and section role are separate. A section may, for example,
have the role `boundary` while its authority remains `proposal`.

Accepting a record revision MUST NOT promote `proposal`, `unresolved`, or
`evidence` sections into accepted Product meaning. A Draft record may contain
sections prepared as `accepted-meaning`, but they do not govern until the
exact revision is accepted.

The declaration MUST map every semantic heading that contributes meaning.
Introductory metadata, a title, and generated navigation are not automatically
semantic sections. A profile MAY require a more complete heading map, but it
MUST NOT leave governing prose outside declared source authority.

Each declared section MAY bind one or more controlled `responsibilities`
defined by its declared body contract. A native declaration MUST bind every
required body responsibility to at least one exact source section. A section
MAY satisfy several responsibilities, and one responsibility MAY be
established across several sections.

`responsibilities` is optional for a section, but when present it MUST be a
non-empty duplicate-free sequence of identifiers supported by the declared
body contract. Binding order carries no meaning. Sections that do not fulfill a
controlled body responsibility omit the field.

Deterministic validation may establish supported identifiers, exact source
section resolution, duplicate-free lists, and complete required coverage. It
does not prove the semantic adequacy, truth, safety, or acceptance of the
bound Markdown.

Responsibility identity is scoped by `body_contract`; it is not inferred from
heading text, section ID, section role, filesystem path, or model
classification. Section role remains a separate controlled classification and
does not by itself prove body-contract coverage. A consumer that does not
understand a declared responsibility or cannot prove complete required
coverage MUST fail closed for contract conformance.

### Section-role vocabulary

Every declared section has exactly one role from its body contract's allowed
subset. Repeated role names have one meaning across contracts. The role
classifies the section's principal function; it does not determine section
authority, satisfy a responsibility, or prove semantic adequacy, truth,
safety, acceptance, or conformance.

| Role | Exact classification meaning |
| --- | --- |
| `actor` | A person, role, group, system, or external participant involved in or served by the subject. |
| `alternative` | A materially relevant option other than the proposed or selected approach. |
| `applicability` | The subjects, contexts, conditions, or scope in which the stated meaning applies. |
| `behaviour` | Required, permitted, or prohibited conduct implied by a principle or constraint. |
| `boundary` | An inclusion, exclusion, limit, non-goal, ownership boundary, or authority boundary. |
| `catalogue` | An organized inventory, classification, portfolio, or map of related items. |
| `condition` | A prerequisite, input state, or condition required for a capability or outcome. |
| `consequence` | An effect or implication resulting from a decision or chosen direction. |
| `content` | Source meaning for which no narrower allowed role accurately describes the principal function. |
| `context` | Background, circumstances, problem, or operating situation needed to understand the subject. |
| `definition` | Meaning that states what the subject is and distinguishes it from other subjects. |
| `dependency` | A required reliance on other meaning, capability, system, actor, or external authority. |
| `evidence` | Supporting material used to substantiate, assess, or validate a claim, choice, or design. |
| `evolution` | Intended maturity, change, migration, compatibility, deprecation, or retirement direction. |
| `finding` | A conclusion directly supported by stated sources, observations, and method. |
| `governing` | A constraint, accepted input, policy, rule, or authority that governs the subject. |
| `identity` | The stable identity, kind, or identifying characteristics of a durable realization. |
| `interface` | An interaction, exchange, contract boundary, or point of connection with another subject. |
| `interpretation` | Reasoned meaning drawn from observations or findings, kept distinct from the observations themselves. |
| `limitation` | A known uncertainty, caveat, evidence gap, method constraint, or applicability limit. |
| `mapping` | A durable correspondence between Product meaning and a realization. |
| `measure` | A criterion or indicator for success, failure, effectiveness, health, or progress. |
| `method` | The procedure used to observe, collect, analyze, compare, or verify evidence. |
| `obligation` | A duty, requirement, compliance constraint, or commitment borne by the subject or an actor. |
| `observation` | A directly observed or source-reported fact kept distinct from interpretation. |
| `outcome` | A desired, expected, achieved, failed, or recovered result. |
| `principle` | The concise normative statement of a Product principle. |
| `rationale` | The reason why a principle, decision, design, or direction exists or was chosen. |
| `recovery` | Failure handling, rollback, interruption response, restoration, or safe recovery. |
| `relevance` | How evidence bears on Product knowledge, a claim, a decision, or a governed question. |
| `responsibility` | An assignment or boundary of responsibility, ownership, or accountability. |
| `risk` | A material uncertainty, exposure, hazard, or failure mode and its possible impact. |
| `source` | Material, data, testimony, or another origin from which evidence is derived. |
| `trade-off` | A tension, cost, benefit, or compromise between relevant choices or qualities. |
| `transition` | A meaningful stage, decision point, state change, or movement through a journey. |
| `trigger` | An event or circumstance that initiates a journey or consequential transition. |
| `unresolved` | An explicit open question, ambiguity, conflict, missing decision, or unsettled matter. |
| `validation` | The approach, criteria, or required proof for validating a design or its acceptance conditions. |

The core body-specific subsets are:

| Body contract | Allowed roles |
| --- | --- |
| `nkf.product` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `interface`, `obligation`, `measure`, `unresolved`, `content` |
| `nkf.principle` | `principle`, `rationale`, `applicability`, `behaviour`, `boundary`, `trade-off`, `evidence`, `unresolved`, `content` |
| `nkf.concept` | `definition`, `governing`, `boundary`, `catalogue`, `evolution`, `evidence`, `unresolved`, `content` |
| `nkf.journey` | `governing`, `actor`, `trigger`, `boundary`, `transition`, `obligation`, `outcome`, `interface`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.domain` | `governing`, `boundary`, `catalogue`, `interface`, `obligation`, `risk`, `measure`, `evolution`, `unresolved`, `content` |
| `nkf.capability` | `governing`, `actor`, `condition`, `outcome`, `boundary`, `obligation`, `dependency`, `measure`, `evidence`, `risk`, `unresolved`, `content` |
| `nkf.design` | `context`, `boundary`, `governing`, `responsibility`, `interface`, `alternative`, `trade-off`, `risk`, `recovery`, `validation`, `evidence`, `unresolved`, `content` |
| `nkf.decision` | `context`, `governing`, `applicability`, `rationale`, `alternative`, `consequence`, `trade-off`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.realization` | `identity`, `mapping`, `responsibility`, `boundary`, `interface`, `dependency`, `obligation`, `evidence`, `recovery`, `unresolved`, `content` |
| `nkf.evidence` | `context`, `source`, `method`, `observation`, `finding`, `interpretation`, `limitation`, `boundary`, `relevance`, `evidence`, `unresolved`, `content` |

Unknown or body-unsupported roles fail closed. Role `unresolved` requires
section authority `unresolved`. Role `evidence` remains distinct from
authority class `evidence`. Role `content` is a last resort and cannot declare
responsibilities. Human review determines whether the chosen role accurately
classifies the source.

## Relationships

NKF 0.1 defines these record relationship types:

| Type | Directional meaning |
| --- | --- |
| `part-of` | Source is a governed part of target |
| `defines` | Source canonically defines meaning used by target |
| `governs` | Source constrains target |
| `applies-to` | Source is applicable to target |
| `depends-on` | Source requires target meaning |
| `extends` | Source adds compatible meaning to target |
| `supersedes` | Source replaces target for its declared scope |
| `rationale-for` | Source explains why target exists or was chosen |
| `realizes` | Source maps target meaning to a durable realization |
| `evidences` | Source supplies evidence relevant to target |
| `references` | Source deliberately points to target without asserting a stronger core relation |

Every typed relationship MUST declare its source section. A consumer MUST be
able to trace the relationship to exact Markdown meaning. When a stronger
known relationship applies, `references` SHOULD NOT be used as a substitute.

`part-of` creates the structural Product hierarchy. The core hierarchy is:

```text
Product → Domain → Capability
```

`part-of` MUST be acyclic. A Capability MUST be part of a Domain, and a
Domain MUST ultimately be part of the Product. Other types may participate in
the hierarchy only when their body contract or a supported profile defines
the meaning.

Filesystem placement, ordinary Markdown links, generated backlinks,
similarity, tags, model classifications, and runtime correlations do not
create typed relationships. Backlinks and graph projections are derived.

## Provenance and roles

NKF separates four roles:

| Role | Responsibility |
| --- | --- |
| **Producer** | Created or materially changed the record content |
| **Verifier** | Checked the content against its sources, method, or referenced reality |
| **Acceptance authority** | May accept the exact proposed revision as governing Product meaning |
| **External authority** | Owns external accounts, data, permissions, resources, or operations |

Producing and verifying content do not accept it. Human verification is not a
substitute for Product acceptance unless the same actor separately exercises
an explicitly granted acceptance role.

### Acceptance provenance

Core governance values are declarations, not proof. `status` states the
claimed state; `authority` names who may decide it; and optional `accepted_at`
states the claimed original acceptance date. Native NKF 0.1 has no universal
`acceptance_source`, `acceptance_event`, `proposal_revision`, or equivalent
proof field.

Acceptance occurs in the declared authority's authoritative system, never
inside a checker. A consumer may report `acceptance binding verified` only
when an authority-specific resolver establishes that:

1. the authoritative event or immutable Decision exists;
2. the actor exercised an authority listed by the record;
3. the outcome matches the claimed status;
4. the event identifies the exact bundle and record;
5. it binds the exact Markdown digest;
6. it binds the exact declaration revision or digest; and
7. it has not been superseded, revoked, or contradicted by that authority.

Unavailable or unperformed verification is `not verified`, not rejection. A
resolved conflict is `contradicted` and blocks governing use. Verification
does not perform acceptance, judge semantic adequacy, or confirm a
Realization.

Consumers keep four axes separate:

| Axis | Question |
| --- | --- |
| Declared governance | What status and authority does the declaration claim? |
| Acceptance-binding verification | Did that authority accept this exact revision? |
| NKF conformance | Does the bundle satisfy applicable NKF contracts? |
| Realization confirmation | Does separate Evidence establish the claimed implementation or behavior? |

Consequential governing use requires applicable accepted status, verified
acceptance binding, required conformance, and no governing-use blocker. When
portable authority evidence or resolver configuration is needed, it uses an
authority-owned extension. That extension is required when governing use
depends on it and defines exact event identity, revision binding,
supersession/revocation behavior, verification, failures, and round-trip data.

Provenance sources use the OKF 0.2 `sources` semantics. A source entry MUST
have a locator and SHOULD have a stable local source ID when the Markdown
attributes a claim to it. It MAY include title, author, observed time,
source revision, source last-modified time, and digest.

Claim-level attribution SHOULD use Markdown footnotes whose labels match
stable source IDs. Reordering a sources list MUST NOT change attribution.

An Evidence record MUST declare at least one provenance source or describe a
primary observation method sufficiently for another reviewer to understand
where the evidence came from.

Provenance answers “what was this derived from?” External authority answers
“who or what owns the external datum, permission, resource, or operation?”
They MUST be represented separately. Citing an external source does not
transfer its authority to NKF, and recording an external authority does not
make that authority a Producer, Verifier, or Product acceptance authority.

An external-authority declaration MUST identify the authority, its
relationship to the record, a durable locator or resolution rule, and the
source section that establishes the boundary.

NKF MAY record factual production, verification, observation, and
last-modified times. NKF 0.1 does not define `stale_after` or a universal
freshness policy.

## Semantic entities and bindings

A record MAY define semantic entities when independently addressable meaning
is needed for relationships, navigation, architecture, or Realization
bindings.

Each entity declaration MUST include:

- a stable record-scoped entity ID;
- a controlled entity kind supplied by the body contract or supported
  profile; and
- the exact defining section.

It MAY include a canonical semantic or architectural address. An address is
not identity.

Core entity kinds and allowed defining bodies are:

| Kind | Exact meaning | Allowed defining body contracts |
| --- | --- | --- |
| `product` | The Product as independently addressable governed meaning. | `nkf.product` |
| `principle` | A specific normative Product principle. | `nkf.principle` |
| `concept` | A named Product concept not more accurately classified by a narrower kind. | `nkf.concept` |
| `actor` | A person, role, group, system, or external participant that acts in the described Product context. | `nkf.product`, `nkf.concept`, `nkf.journey`, `nkf.domain`, `nkf.capability` |
| `beneficiary` | A person, group, or other subject intended to receive a Product outcome or value. | `nkf.product`, `nkf.concept`, `nkf.journey`, `nkf.domain`, `nkf.capability` |
| `stage` | A meaningful segment of a journey. | `nkf.journey` |
| `decision-point` | A point in a journey where an actor or governing rule selects among consequential paths. | `nkf.journey` |
| `transition` | A meaningful movement between journey stages or conditions. | `nkf.journey` |
| `outcome` | A desired, achieved, failed, or recovered Product result. | `nkf.product`, `nkf.journey`, `nkf.capability` |
| `domain-concept` | A concept whose canonical meaning is owned within a Product domain. | `nkf.concept`, `nkf.domain` |
| `domain-entity` | A domain-owned semantic subject with stable identity relevant to domain responsibilities. | `nkf.concept`, `nkf.domain` |
| `capability-input` | Information, material, permission, or condition consumed by a capability. | `nkf.capability` |
| `capability-outcome` | A result produced or enabled by a capability. | `nkf.capability` |
| `component` | A design-level constituent with a defined responsibility or interaction. | `nkf.design` |
| `interface` | A defined semantic boundary through which subjects interact or exchange information. | `nkf.domain`, `nkf.capability`, `nkf.design`, `nkf.realization` |
| `information-flow` | A design-level movement of information between defined subjects. | `nkf.design` |
| `state` | A meaningful design or concept state, not the current state of an operational instance. | `nkf.concept`, `nkf.design` |
| `policy` | A defined rule set governing behavior, applicability, or decisions. | `nkf.principle`, `nkf.domain`, `nkf.design`, `nkf.decision` |
| `decision-scope` | The independently addressable scope to which a Decision applies. | `nkf.decision` |
| `system` | A durable system or service definition, not a live system instance. | `nkf.design`, `nkf.realization` |
| `source` | A durable source definition, distinct from a provenance citation and from current source state. | `nkf.realization`, `nkf.evidence` |
| `process` | A durable organizational or technical process definition. | `nkf.design`, `nkf.realization` |
| `asset` | A durable governed asset definition not more accurately classified by another core kind. | `nkf.realization` |
| `agreement` | A durable agreement, contract, or commitment represented by a Realization. | `nkf.realization` |
| `implementation` | A durable implementation or configuration definition. | `nkf.realization` |
| `claim` | A source-bound proposition examined or supported by Evidence. | `nkf.evidence` |
| `observation` | A reviewed, time-bounded observation represented as Evidence, not live operational state. | `nkf.evidence` |

Unknown or body-unsupported kinds fail closed. A record need not declare a
record-root entity merely because the record exists.

Each semantic entity has exactly one canonical definition owner. Another
record MAY reference, constrain, realize, evidence, bind, or observe the
entity, but MUST NOT redefine its identity, kind, or core meaning.

A record MAY declare source-bound `entity_relationships`. Each relationship
MUST include a controlled type, source entity, target entity, and source
section. The applicable body contract or supported profile controls entity
kinds and entity-relationship types; free-form labels cannot silently extend
them.

Entity references contain `record` and `entity`, both resolving inside the
same bundle. The source endpoint is canonically defined by the record declaring
the relationship; the target may belong to that or another same-bundle record.

Core entity-relationship types are:

| Type | Directional meaning |
| --- | --- |
| `part-of` | Source entity is a governed constituent of target entity. |
| `defines` | Source entity supplies canonical defining meaning used by target entity without transferring or duplicating target ownership. |
| `depends-on` | Source entity requires target entity's meaning or availability. |
| `governs` | Source entity constrains target entity. |
| `flows-to` | Information, value, material, or control moves from source entity to target entity. |
| `transitions-to` | Source stage or state may move to target stage or state. |
| `realizes` | Source entity in a Realization record maps target Product meaning to a durable realization. |
| `evidences` | Source entity in an Evidence record supplies support relevant to target entity. |
| `observes` | Source `observation` entity in an Evidence record records an observation about target entity. |
| `references` | Source entity deliberately points to target entity without asserting a stronger core relationship. |

Relationships are directional, source-bound, duplicate-free, and not
self-referential. Entity `part-of` is acyclic. `flows-to` and
`transitions-to` may cycle when the source establishes it. `transitions-to`
requires both endpoints to be `stage`, `transition`, or `state`. `realizes`
requires a source owned by `nkf.realization`; `evidences` requires a source
owned by `nkf.evidence`; and `observes` requires source kind `observation`
owned by `nkf.evidence`.

A record MAY declare durable `bindings`. Each binding MUST include:

- the semantic entity;
- the Realization record;
- a controlled binding kind;
- the source section; and
- at least one durable locator or resolution rule.

A binding MAY identify an applicable external authority. A locator, rule,
provider identifier, Source path, deployment name, or namespace address is not
semantic identity.

Bindings are declared only by `nkf.realization`. The `realization` value equals
the declaring record ID, `source_section` resolves there, and the entity
reference resolves in the same bundle. A present `external_authority` resolves
to that record's declaration. At least one non-empty `locator` or
`resolution_rule` is required.

Core binding kinds are:

| Kind | Exact mapping target |
| --- | --- |
| `source` | A source-controlled repository, path, artifact, or equivalent durable source location. |
| `system` | A system, service, application, or platform. |
| `process` | An organizational or technical process. |
| `asset` | A durable asset not more accurately classified by another binding kind. |
| `agreement` | An agreement, contract, service commitment, or equivalent governed instrument. |
| `implementation` | Code, configuration, infrastructure definition, or another implementation artifact. |
| `provider` | A provider-owned capability, registration, tenant, or resource boundary; an applicable `external_authority` is required. |
| `namespace` | A durable namespace or resolution domain. |
| `deployment` | A durable deployment target, class, or address, not current deployment state. |
| `data` | A dataset, schema, data store, or durable data-access surface, not copied live data. |
| `interface` | An API, event, integration, UI, or other durable interaction surface. |

Unknown binding kinds fail closed. Bindings are order-insensitive and exact
duplicate objects are invalid. Multiple distinct mappings may target the same
entity through the same Realization when their kind, locator, or resolution
rule differs.

NKF owns semantic entities, Realizations, durable binding definitions,
resolution rules, locators, and authority boundaries. Nourd Studio or another
operational system owns resolution, instance state, and observations. NKF
MUST NOT enumerate live users, resorts, activities, devices, sessions,
deployments, accounts, or provider resources as canonical knowledge merely
because a binding can resolve them.

## Body contracts

Every record MUST declare a `body_contract`. A body contract
defines required semantic responsibilities, allowed section roles, valid
authority classes, and minimum structural rules for that record type.

Each body contract MUST assign a stable machine-readable identifier to every
required responsibility. Those identifiers are governed by the NKF format
version. Renaming, splitting, combining, adding, or removing a required
responsibility requires a later NKF format-version compatibility change rather
than a heading convention.

A supported body contract MAY allow additional declared and classified
sections. A consumer MAY display an unsupported body contract generically,
but MUST NOT claim complete validation or use it for a consequential governing
action.

**Product — `nkf.product`**

Required responsibilities:

1. `product-definition` — Product definition: name, ownership, and what kind
   of Product it is.
2. `purpose` — Purpose: why the Product exists.
3. `vision` — Vision: the durable future it seeks to create.
4. `people-served` — People served: who receives value.
5. `needs-and-outcomes` — Needs and outcomes: what becomes possible or
   improves.
6. `boundaries` — Boundaries: what belongs to the Product and what does not.
7. `product-map` — Product map: links to Domains, Capabilities, and other
   governing knowledge.

Optional responsibilities include a vision portfolio; offering and commercial
model; operating and support model; external-authority boundaries; risks and
obligations; Product measures; evolution and retirement; and unresolved
matters.

A Product record MUST be unique and living. It describes the whole Product,
not only its software. It SHOULD link to narrower records instead of
duplicating them. Implementation and runtime state belong in Realizations and
operational systems. Exploratory visions remain proposals; accepted direction
uses accepted-meaning sections.

**Principle — `nkf.principle`**

Required responsibilities:

1. `principle-statement` — Principle statement.
2. `rationale` — Rationale.
3. `applicability` — Applicability.
4. `required-behaviour` — Required behaviour.
5. `boundaries` — Boundaries.
6. `decision-and-trade-off-implications` — Implications for decisions and
   trade-offs.

Optional responsibilities include examples, counterexamples, supporting
Evidence, tensions with other Principles, known exceptions, and unresolved
questions.

A Principle is normative guidance, not a slogan. It says what should remain
true; a Decision records a particular choice. It MUST be concrete enough to
evaluate a Decision, Design, or Realization. Principles are normally living.
A material exception MUST be explicit and supported by a Decision. Compliance
requires Design, Realization, and Evidence rather than assertion by the
Principle itself.

**Concept — `nkf.concept`**

Required responsibilities:

1. `definition` — Definition.
2. `purpose-and-product-relevance` — Purpose and Product relevance.
3. `distinguishing-characteristics` — Distinguishing characteristics.
4. `inclusion-exclusion-and-ambiguity-boundaries` — Inclusion, exclusion, and
   ambiguity boundaries.
5. `product-and-knowledge-relationships` — Relationships to the Product and
   other meaning.
6. `current-maturity` — Current maturity: accepted, proposed, and unresolved
   meaning.

Optional responsibilities include alternative names, examples, scenarios,
competing interpretations, supporting Evidence, possible evolution, and open
questions.

A Concept defines shared Product meaning; it is not automatically a feature
commitment. Exploratory visions MAY begin as proposal sections. Accepted
direction and speculation MUST remain distinct. A Concept MUST NOT claim to be
a Design, Realization, or operational instance. Concepts are normally living.

**Journey — `nkf.journey`**

Required responsibilities:

1. `purpose-and-desired-outcome` — Purpose and desired human or system
   outcome.
2. `actors-and-beneficiaries` — Actors and beneficiaries.
3. `trigger-and-operating-context` — Trigger and operating context.
4. `start-end-and-scope-boundaries` — Start, end, and scope boundaries.
5. `meaningful-stages-decisions-and-transitions` — Meaningful stages,
   decisions, or transitions.
6. `needs-expectations-and-consequential-moments` — Needs, expectations, and
   consequential moments.
7. `success-failure-interruption-and-recovery` — Success, failure,
   interruption, and recovery conditions.
8. `related-domains-and-capabilities` — Related Domains and Capabilities.

Optional responsibilities include variants, channels, accessibility needs,
support paths, Evidence, measures, risks, and unresolved questions.

A Journey describes a bounded experience or reason for interaction. It is not
a Task lifecycle, Workflow Run, screen flow, or implementation script. It MAY
cross Domains and Capabilities. A Journey SHOULD preserve the intended
outcome while allowing several Designs and Realizations.

**Domain — `nkf.domain`**

Required responsibilities:

1. `responsibility-and-product-purpose` — Responsibility and Product purpose.
2. `value-and-people-served` — Value and people served.
3. `scope-and-boundaries` — Scope and explicit boundaries.
4. `owned-concepts-and-semantic-entities` — Concepts and semantic entities
   owned.
5. `capability-map` — Capability map.
6. `dependencies-interfaces-and-external-authority` — Dependencies,
   interfaces, and external-authority boundaries.
7. `obligations-risks-and-measures` — Obligations, risks, and measures
   relevant to the responsibility.

Optional responsibilities include commercial, operational, support, policy,
data, evolution, retirement, and unresolved concerns.

A Domain is a durable area of Product responsibility, not a department,
repository, service, screen, or temporary initiative. It MUST be `part-of`
the Product. Its boundaries SHOULD reduce competing ownership while allowing
explicit relationships with other Domains.

**Capability — `nkf.capability`**

Required responsibilities:

1. `ability-statement` — Ability statement.
2. `people-actors-and-outcomes` — People, actors, and outcomes served.
3. `conditions-inputs-and-resulting-outcome` — Conditions, inputs, and
   resulting outcome.
4. `scope-and-non-capability-boundaries` — Scope and non-capability
   boundaries.
5. `governing-constraints-and-authority` — Governing constraints and
   authority.
6. `dependencies-and-related-journeys` — Dependencies and related Journeys.
7. `success-and-failure-conditions` — Success and failure conditions.

Optional responsibilities include variants, policies, measures, Evidence,
risks, Designs, Realizations, and unresolved questions.

A Capability states what the Product can enable, not a feature backlog or how
it is implemented. It MUST be `part-of` one Domain. Current availability,
authorization, health, and use are operational state. An accepted Capability
does not claim that a complete Realization exists.

**Design — `nkf.design`**

Required responsibilities:

1. `design-kind-problem-and-scope` — Design kind, problem, and scope.
2. `governing-inputs-and-constraints` — Governing inputs and constraints.
3. `proposed-or-accepted-design` — Proposed or accepted design.
4. `responsibilities-interactions-and-information-flows` — Responsibilities,
   interactions, and information flows.
5. `alternatives-and-trade-offs` — Alternatives and trade-offs.
6. `failure-safety-recovery-and-operations` — Failure, safety, recovery, and
   operational considerations.
7. `validation-and-acceptance-evidence` — Validation approach and acceptance
   evidence required.
8. `unresolved-matters` — Explicit unresolved matters.

Optional responsibilities include experience states, diagrams, contracts,
data treatment, accessibility, security, privacy, commercial implications,
migration, rollout, and retirement.

A Design MAY describe experience, business, service, operating, policy, or
technical realization. It MUST distinguish Product requirements from chosen
solutions. It MUST NOT claim implementation or conformance without a
Realization and Evidence. A material choice that must remain historically
stable SHOULD be captured by a Decision.

**Decision — `nkf.decision`**

Required responsibilities:

1. `context-and-problem` — Context and problem.
2. `decision` — Decision.
3. `scope-and-applicability` — Scope and applicability.
4. `rationale` — Rationale.
5. `alternatives-considered` — Alternatives considered.
6. `consequences-and-trade-offs` — Consequences and trade-offs.

Optional responsibilities include evidence, compatibility, migration,
recovery, supersession, and matters deliberately not decided.

A Decision applies across the whole Product and is not limited to
architecture. An accepted Decision MUST be immutable. Correction, extension,
replacement, or reversal requires a later Decision with a typed relationship,
normally `supersedes` or `extends`. A draft Decision may evolve until its
exact revision is accepted. Rejection remains review, Task, and Git history;
it does not create an alternate governing record.

**Realization — `nkf.realization`**

Required responsibilities:

1. `realization-identity-and-kind` — Realization identity and kind.
2. `product-meaning-realized` — Product meaning, entities, Designs, or
   Decisions realized.
3. `durable-mapping` — Durable Source, system, process, asset, agreement, or
   implementation mapping.
4. `responsibilities-and-ownership-boundaries` — Responsibilities and
   ownership boundaries.
5. `interfaces-dependencies-locators-and-resolution` — Interfaces,
   dependencies, locators, and resolution rules.
6. `external-authority-and-operational-state-boundaries` —
   External-authority and operational-state boundaries.
7. `compatibility-verification-and-recovery` — Compatibility, verification,
   and recovery obligations.

Optional responsibilities include environments, configuration classes,
migration, deployment model, support model, security, privacy, retention,
retirement, and unresolved questions.

A Realization maps intent to reality without redefining the governed meaning.
It MAY declare durable bindings but MUST NOT store live instance state,
current health, current deployment, or observations as canonical fields.
Implementation presence does not prove conformance; Evidence is required.

**Evidence — `nkf.evidence`**

Required responsibilities:

1. `question-claim-or-decision-context` — Question, claim, or decision
   context.
2. `sources-or-primary-observation-method` — Sources or primary observation
   method.
3. `observations-and-findings` — Observations and findings.
4. `interpretation` — Interpretation.
5. `limitations-and-uncertainty` — Limitations and uncertainty.
6. `applicability-and-boundaries` — Applicability and boundaries.
7. `relevance-to-product-knowledge` — Relevance to Product knowledge.

Optional responsibilities include methodology detail, samples, competing
evidence, confidence, reproducibility, ethical or privacy constraints,
recommended investigation, and unresolved questions.

Evidence carries evidence authority; it does not become Product intent,
Design, or a Decision by being convincing. It MUST distinguish observation
from interpretation and MUST NOT overstate applicability. A fixed study or
review MAY be immutable; a maintained synthesis MAY be living. Raw runtime
events and current status remain in their authoritative operational stores.

## Extension contract

An extension may add namespaced types, body contracts, vocabularies,
declaration payloads, deterministic constraints, or interoperability data for
an explicitly governed scope. It cannot change or weaken core fields or rules;
introduce source-absent Product claims; make metadata or conformance prove
acceptance; create another NKF version coordinate; hide operational state or
secrets; or claim core support from one consumer's implementation.

An extension ID is lowercase, owner-namespaced, and matches:

```text
^[a-z][a-z0-9]*(?:\.[a-z](?:[a-z0-9-]*[a-z0-9])?){2,}$
```

The first namespace `nkf` is reserved for extensions owned and accepted by
NKF. Other namespaces belong to their stated authority. Namespace text is an
ownership claim, not proof. Extension IDs have no independent version;
`nkf_version: "0.1"` is the only version coordinate and artifact digests bind
exact revisions.

Every used extension has a digest-bound authority pair:

1. normative Markdown owning its complete human-readable meaning; and
2. executable YAML with identity `nkf.extension`, `nkf_version: "0.1"`, the
   extension ID, application sites, payload shape, vocabularies, constraints,
   and deterministic validation.

When any extension is used, the bundle contains a non-empty,
duplicate-ID-free catalog:

```yaml
extension_contracts:
  - id: com.example.profile
    specification:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
    executable:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
```

Both locators resolve to the exact bytes. The executable declares matching
extension ID and `nkf_version`. The catalog is bundle-local resolution
metadata, not a public registry.

The bundle and records may contain:

```yaml
extensions:
  - contract: com.example.profile
    requirement: required
    payload: {}
```

`contract` resolves uniquely through the catalog. `requirement` is `required`
or `optional`. `payload` is required and may contain any JSON-compatible YAML
value permitted by the extension. IDs are unique within each use list, order
carries no meaning, and empty catalog/use lists are omitted. There is no
separate `required_extensions` field.

Meaning necessary to interpret a type, body contract, authority,
responsibility, relationship, governing statement, or consequential use is
`required`. An optional extension supplies only nonessential display,
discovery, interoperability, or advisory data. A namespaced type or body
contract requires its owning extension.

A consumer supports an extension use only when it:

1. resolves both authority artifacts;
2. verifies both exact digests;
3. verifies matching extension ID and `nkf_version`;
4. recognizes the exact executable digest; and
5. implements all required deterministic and semantic-review boundaries.

The native core supported-extension set is empty. Similar identity, parseable
payload, or support for another digest is not support.

| Condition | Required behavior |
| --- | --- |
| Required extension unsupported, unresolved, or digest-mismatched | Applicable contract conformance and consequential governing use fail closed |
| Required payload missing or invalid | Applicable contract conformance fails |
| Optional extension unsupported | Preserve and expose it; core validation may continue and reports semantics unvalidated |
| Supported optional payload invalid | Applicable contract conformance fails |
| Extension conflicts with core | Fail closed regardless of requirement |

Unsupported extension catalog, use metadata, and payload remain visible and
round-trip without JSON-data-model loss. Comments, anchors, aliases, scalar
style, whitespace, and key order need not survive. A consumer unable to
preserve unsupported payload operates read-only or fails instead of dropping
it.

Native NKF 0.1 accepts no concrete extension. Portable presentation guidance
is deliberately outside the native record; future NKF-owned presentation work
is deferred under NKF-004.

## Native project organization

The fixed `.nourd` layout in the bundle contract is native NKF 0.1, not a
separate Nourd repository profile. The configured `knowledge_root` may be
named `knowledge` or another project-contained path.

Directories inside `knowledge_root` are navigation, not semantic authority,
and SHOULD exist only when real material needs them. A Markdown README or
index is not exempt by filename: it has one record declaration or one
`non_records` entry.

Generated projections and operational state remain outside the record
declaration tree. Existing `nourd.knowledge.*` bootstrap consumers require
deliberate migration and do not become native merely because their logical
model is similar.

## OKF 0.2 interoperability

OKF 0.2 is an intentionally permissive directory of Markdown documents with
YAML frontmatter. It requires only a `type`, treats paths as concept identity,
uses ordinary untyped Markdown links, and makes provenance, production,
verification, lifecycle, freshness, and attestation optional.

NKF is stricter because it must represent governing Product meaning, stable
identity independent of path, typed and source-bound relationships,
section-level authority, explicit acceptance, Realizations, and external
authority.

An OKF export is a derived projection of an NKF bundle. It MUST NOT become a
competing canonical authority.

The minimum mapping is:

| NKF | OKF 0.2 export |
| --- | --- |
| Record type | `type` |
| Title | `title` |
| Markdown meaning | OKF Markdown body |
| Provenance sources | `sources` |
| Producer | `generated` |
| Verifier | `verified` |
| Draft authority state | `status: draft` |
| Accepted current record | `status: stable` |
| Superseded or retired record | `status: deprecated` |
| Record links | Markdown links, with typed NKF relationships retained only in a clearly identified extension |
| NKF stable identity and governance | Preserved in an NKF extension because OKF path identity and `verified` cannot represent them |

NKF acceptance MUST NOT map to OKF `verified`; verification and acceptance
remain different roles. `stale_after` is omitted unless a later NKF freshness
policy or explicit supported profile governs it.

OKF's Attested Computation does not automatically become a new NKF core record
type. A durable sanctioned computation may be represented through a supported
Design or Realization profile, while receipts and per-run attestation remain
operational Evidence. An exporter MUST NOT invent that mapping without a
declared profile.

NKF 0.1 is based on the official
[OKF 0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
and the
[Google Cloud 0.2 release explanation](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals/).
OKF 0.2 supersedes `timestamp` with `generated.at` and the body
`# Citations` convention with `sources`; NKF exporters MUST use the 0.2 forms.

## Conformance

### YAML parse boundary

Native NKF YAML is UTF-8 and uses the YAML 1.2 JSON-compatible data model.
Each manifest, record declaration, or executable contract file contains
exactly one document with one mapping root and string keys. Values are only
null, boolean, finite number, string, array, or mapping. Duplicate keys,
custom tags, merge keys, anchors, and aliases are invalid.

Comments and presentation whitespace carry no meaning. Parsing cannot execute
constructors, interpolate environment variables, or resolve external content.

### Enforcement layers

| Layer | Deterministic responsibility | Cannot establish |
| --- | --- | --- |
| JSON Schema 2020-12 | Local closed shapes, required fields, primitives, constants, enums, cardinality, duplicate-free scalar arrays, conditions, lexical formats | Files, containment, source bytes, headings, graphs, authority verification, semantic adequacy |
| Bundle-aware checker | Project layout, paths, sources, Markdown coverage, cross-record resolution, responsibilities, hierarchy, extension-use consistency, resolver outcomes, bundle conformance | Acceptance, truth, design quality, Product completeness, confirmed Realization |
| Artifact and authority resolver | Exact extension artifacts and optional acceptance-authority binding | Core acceptance, unsafe automatic dereference |
| Human semantic review | Adequacy and acceptability of meaning, classification, evidence, boundaries, and decisions | Deterministic conformance merely from judgment |

Each rule has one primary layer. Later layers may consume earlier results but
cannot maintain competing normative meaning.

Derived schemas use:

```text
contracts/nkf/0.1/schemas/
  bundle.schema.json   # urn:nkf:0.1:schema:bundle
  record.schema.json   # urn:nkf:0.1:schema:record
```

The `0.1` component is the one NKF version coordinate. Each schema carries
non-normative source metadata for `nkf_version`, exact Markdown path/digest,
and exact YAML path/digest. Release metadata carries the schema's own digest.
Exact schema bytes remain derived realization.

### Validation phases

The checker executes:

1. `contracts` — verify exact Markdown/YAML/schema bindings;
2. `parse` — locate and safely parse manifest and declaration YAML;
3. `schema` — validate local bundle and record shapes;
4. `project` — validate `.nourd`, `knowledge_root`, paths, symlinks, files,
   declarations, and Markdown coverage;
5. `source` — verify Markdown bytes, digests, H1, title, and headings;
6. `extension-resolution` — validate catalogs/uses, safely resolve exact
   artifacts, verify identity/digests/support, and validate supported payloads;
7. `bundle-graph` — resolve identities, Product root, scope, hierarchy,
   references, cycles, and bundle constraints;
8. `record-contract` — validate body, role, responsibility, governance,
   provenance, entity, relationship, binding, and extension rules;
9. `security` — report high-confidence prohibited-material findings;
10. `authority-binding` — when requested and supported, verify declared
    governance against its acceptance authority without changing conformance;
    and
11. `result` — calculate conformance and governing-use readiness and emit a
    deterministic report.

When an earlier failure makes a later phase unsafe or meaningless, the later
phase is `not-evaluated`, never `passed`. A required failed or not-evaluated
phase prevents the requested conformance level from passing.
`authority-binding` is optional; when absent it does not fail conformance but
prevents `governing-use: ready` when verified acceptance is required.

### Conformance levels

- `structural` requires `contracts`, `parse`, `schema`, `project`, `source`,
  `bundle-graph`, `security`, and `extension-resolution` for the catalog,
  bundle uses, and any record extension needed to interpret structural fields.
- `contract` additionally requires `record-contract` and
  `extension-resolution` for every extension use on the requested record.
- `full-bundle` requires structural conformance plus `record-contract` and
  `extension-resolution` for every governed record.

A high-confidence prohibited-secret finding fails the result; a passing scan
does not prove that no secret exists. Warnings do not fail native conformance.
A profile that makes a warning condition consequential defines a separate
profile error rule rather than changing native severity silently.

Consumers MUST fail closed for governing or consequential use when required
meaning cannot be understood, may provide clearly incomplete best-effort
display, identify incomplete validation, distinguish reconciliation from
semantic authoring, and never report acceptance from conformance.

Reconciliation may update deterministic values such as a source digest. It
cannot invent or change roles, authority, relationships, scope, entities,
bindings, external authority, or presentation meaning.

### Diagnostic contract

Each diagnostic contains:

```yaml
rule_id: <stable identifier>
severity: error | warning
blocking: conformance | governing-use | none
phase: <validation phase>
message: <human-readable explanation>
artifact: <optional project-relative path>
record_id: <optional record ID>
instance_pointer: <optional JSON Pointer>
source_section: <optional section ID>
remediation: <optional non-authoritative guidance>
```

Rule ID, severity, blocking effect, and semantic trigger are stable contract
behavior. Message and remediation text are not machine contracts.
Conformance-blocking errors fail applicable conformance; governing-use errors
block consequential use without changing conformance; warnings are
non-blocking. Diagnostics sort by phase, normalized artifact, record ID,
instance pointer, source section, and rule ID. They never imply acceptance.

### Stable native rule registry

Unless a table says otherwise, every listed error blocks conformance and every
warning is non-blocking.

| Contract, parse, and schema rule | Severity |
| --- | --- |
| `contract-set.unavailable` | error |
| `contract-set.binding-mismatch` | error |
| `schema.unavailable` | error |
| `schema.binding-mismatch` | error |
| `bundle.manifest.missing` | error |
| `yaml.utf8.invalid` | error |
| `yaml.document-count.invalid` | error |
| `yaml.root.invalid` | error |
| `yaml.key.duplicate` | error |
| `yaml.key.non-string` | error |
| `yaml.value.non-json` | error |
| `yaml.tag.unsupported` | error |
| `yaml.merge-key.unsupported` | error |
| `yaml.anchor.unsupported` | error |
| `yaml.alias.unsupported` | error |
| `yaml.parse.invalid` | error |
| `schema.bundle.invalid` | error |
| `schema.record.invalid` | error |

| Project, path, source, and representation rule | Severity |
| --- | --- |
| `project.nourd.missing` | error |
| `project.records-directory.missing` | error |
| `project.records-directory.invalid` | error |
| `knowledge.root.missing` | error |
| `knowledge.root.invalid` | error |
| `knowledge.root.outside-project` | error |
| `knowledge.root.inside-nourd` | error |
| `path.invalid` | error |
| `path.outside-root` | error |
| `path.file-kind.invalid` | error |
| `path.symlink.invalid` | error |
| `path.symlink.discouraged` | warning |
| `record.declaration.non-yaml` | error |
| `record.id.duplicate` | error |
| `record.source.missing` | error |
| `record.source.non-markdown` | error |
| `record.source.duplicate` | error |
| `record.source.digest-mismatch` | error |
| `record.h1-count.invalid` | error |
| `record.title.mismatch` | error |
| `record.filename.nonconventional` | warning |
| `knowledge.markdown.unrepresented` | error |
| `knowledge.markdown.multiple-representations` | error |
| `non-record.missing` | error |
| `non-record.duplicate` | error |
| `non-record.conflict` | error |

| Sections, bodies, and governance rule | Severity |
| --- | --- |
| `section.id.duplicate` | error |
| `section.heading.unresolved` | error |
| `section.heading.duplicate-mapping` | error |
| `section.heading.unrepresented` | error |
| `section.authority.unsupported` | error |
| `section.role.unsupported` | error |
| `section.unresolved.authority-mismatch` | error |
| `section.content.responsibility-forbidden` | error |
| `body.unsupported` | error |
| `body.type-mismatch` | error |
| `body.responsibility.unsupported` | error |
| `body.responsibility.missing` | error |
| `governance.product.lifecycle` | error |
| `governance.decision.lifecycle` | error |
| `provenance.source-id.duplicate` | error |
| `provenance.observation-section.unresolved` | error |
| `evidence.provenance.missing` | error |
| `external-authority.id.duplicate` | error |
| `external-authority.section.unresolved` | error |

| Record relationship and bundle-graph rule | Severity |
| --- | --- |
| `relationship.type.unsupported` | error |
| `relationship.target.unresolved` | error |
| `relationship.section.unresolved` | error |
| `relationship.duplicate` | error |
| `bundle.product.missing` | error |
| `bundle.product.multiple` | error |
| `bundle.product.invalid` | error |
| `scope.product.mismatch` | error |
| `hierarchy.product-parent.invalid` | error |
| `hierarchy.domain-parent.invalid` | error |
| `hierarchy.capability-parent.invalid` | error |
| `hierarchy.part-of.cycle` | error |
| `hierarchy.product-unreachable` | error |
| `hierarchy.participation.unsupported` | error |

| Entity and binding rule | Severity |
| --- | --- |
| `entity.id.duplicate` | error |
| `entity.kind.unsupported` | error |
| `entity.section.unresolved` | error |
| `entity-reference.record.unresolved` | error |
| `entity-reference.entity.unresolved` | error |
| `entity-relationship.type.unsupported` | error |
| `entity-relationship.section.unresolved` | error |
| `entity-relationship.source-owner.invalid` | error |
| `entity-relationship.self` | error |
| `entity-relationship.duplicate` | error |
| `entity-relationship.part-of.cycle` | error |
| `entity-relationship.type-constraint` | error |
| `binding.kind.unsupported` | error |
| `binding.entity.unresolved` | error |
| `binding.realization.unresolved` | error |
| `binding.realization-owner.invalid` | error |
| `binding.section.unresolved` | error |
| `binding.external-authority.unresolved` | error |
| `binding.locator.missing` | error |
| `binding.duplicate` | error |
| `binding.provider-authority.missing` | error |

| Extension, security, and authority rule | Severity | Blocking |
| --- | --- | --- |
| `extension.catalog-id.duplicate` | error | conformance |
| `extension.use-id.duplicate` | error | conformance |
| `extension.required.contract-unresolved` | error | conformance |
| `extension.required.contract-digest-mismatch` | error | conformance |
| `extension.required.contract-identity-mismatch` | error | conformance |
| `extension.required.unsupported` | error | conformance |
| `extension.payload.invalid` | error | conformance when supported |
| `extension.core-conflict` | error | conformance |
| `extension.optional.unvalidated` | warning | none |
| `security.secret-pattern` | error | conformance |
| `authority.binding.unavailable` | warning | none |
| `authority.binding.contradicted` | error | governing-use |

An unsupported optional extension emits only
`extension.optional.unvalidated` and remains visible, round-trippable, and
excluded from consequential interpretation.

### Validation result

The checker emits operational `nkf.validation-result` with
`nkf_version: "0.1"`. It is not governed knowledge. It identifies execution
and runner, times, checker identity/digest, Markdown/YAML/schema digests,
requested level, every phase state (`passed`, `failed`, or `not-evaluated`),
overall conformance, declared governance, optional acceptance-binding result,
governing-use readiness, and deterministically ordered diagnostics.

`governing-use: ready` requires applicable accepted status, verified
acceptance binding, required conformance, and no governing-use blocker. It
does not confirm a Realization. Portable results exclude absolute project
paths, credentials, secrets, and copied operational payloads.

No deterministic layer establishes semantic role accuracy, adequate or true
Markdown, evidence support, deserved acceptance, current external authority,
Design quality, or Realization existence and behavior. Those require human
review and, where applicable, external Evidence.

## Security and privacy

NKF bundles are durable, reviewable Product knowledge and may be distributed.
A bundle MUST NOT contain live credentials, access tokens, private keys, or
secrets.

Sensitive Product knowledge MAY require a restricted bundle or access policy,
but NKF 0.1 does not define that policy. A consumer MUST NOT hide missing
governing knowledge and then present the remaining view as complete.

Provenance, Producers, Verifiers, acceptance authorities, external
authorities, locators, observations, and Evidence may contain personal or
commercially sensitive information. Profiles and implementations MUST apply
applicable minimization, access, retention, and disclosure requirements
without changing the canonical authority model.

A locator MUST NOT be dereferenced automatically when doing so could disclose
information, trigger an operation, incur cost, or cross an authorization
boundary.

## Unresolved matters

The following remain deliberately unresolved in NKF 0.1:

- universal freshness and staleness policy;
- required repository and continuous-integration gates;
- exact schema/checker bytes, packaging, and public distribution;
- migration from current `nourd.knowledge.*` bootstrap contracts;
- cross-bundle semantic identity and relationships;
- Company and Organization knowledge contracts;
- public governance, contribution process, trademark position, and license;
- an NKF extension registry and compatibility policy;
- a future NKP runtime protocol;
- standardized acceptance-event storage; and
- attested-computation profiles;
- the future optional presentation-guidance extension under NKF-004.

These omissions MUST be visible to consumers. A profile MAY resolve one for
its own scope, but MUST identify the extension and MUST NOT claim that the
profile decision is part of NKF 0.1 core.

## Minimal example

A logical NKF 0.1 manifest:

```yaml
nkf_version: "0.1"
contract: nkf.bundle
id: example-product
product_record: product
knowledge_root: knowledge
non_records:
  - path: README.md
    kind: navigation
```

A minimal Product Markdown source:

```markdown
# Example Product

## Product definition

Example Product is a Product of Example Company.

## Purpose

It helps its people achieve a clearly defined outcome.

## Vision

The Product becomes their durable companion for that outcome.

## People served

It serves the people who experience the stated need.

## Needs and outcomes

It improves the decisions and results within its boundary.

## Boundaries

It does not own external accounts, permissions, or operations.

## Product map

Its Domains and Capabilities are defined by related NKF records.
```

Its declaration:

```yaml
contract: nkf.record
id: product
type: product
body_contract: nkf.product
title: Example Product
source:
  path: product.md
  digest:
    algorithm: sha-256
    value: <digest-of-exact-markdown-bytes>
governance:
  lifecycle: living
  status: draft
  authority:
    - human-product-owner
scope:
  product: product
sections:
  - id: product-definition
    heading_path: [Product definition]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [product-definition]
  - id: purpose
    heading_path: [Purpose]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [purpose]
  - id: vision
    heading_path: [Vision]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [vision]
  - id: people-served
    heading_path: [People served]
    occurrence: 1
    authority: proposal
    role: boundary
    responsibilities: [people-served]
  - id: needs-and-outcomes
    heading_path: [Needs and outcomes]
    occurrence: 1
    authority: proposal
    role: governing
    responsibilities: [needs-and-outcomes]
  - id: boundaries
    heading_path: [Boundaries]
    occurrence: 1
    authority: proposal
    role: boundary
    responsibilities: [boundaries]
  - id: product-map
    heading_path: [Product map]
    occurrence: 1
    authority: proposal
    role: catalogue
    responsibilities: [product-map]
relationships: []
```

Derived schemas enforce the exact native serialization. They cannot add
fields, responsibilities, or meaning. A supported extension supplies its own
separately governed executable contract.

## Pre-mortem

| Failure mode | Consequence | Required response |
| --- | --- | --- |
| NKF attempts to model every kind of knowledge immediately | The first version becomes unusable and untestable | Keep 0.1 Product-only and add Company or Organization contracts from real needs |
| Metadata becomes more authoritative than Markdown | Human review no longer sees complete Product meaning | Reject declarations that assert meaning without exact source sections |
| Stable identity follows paths or provider resources | Moves and integration changes break history | Preserve bundle, record, section, and entity identity independently |
| Real instances are copied into Markdown | Operational truth becomes stale and conflicts with its owner | Keep durable bindings in NKF and resolve live state from authoritative systems |
| Permissive interoperability weakens governance | Consumers treat OKF verification as Product acceptance | Keep the OKF export derived and preserve NKF authority extensions |
| A green validator is presented as acceptance | Unreviewed proposals silently govern | Report conformance and proposal status separately |
