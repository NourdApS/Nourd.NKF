# NKF 0.1 — Product knowledge format

- **Status:** Accepted
- **Task:** `NKF-001`
- **Version:** `0.1`
- **Proposed:** 28 July 2026
- **Accepted:** 28 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct Human Product Owner acceptance of proposal
  `56c8f77c9a1374ab56fdda7d62b7a0108c6e18738d77bf59513d5de201a4133c`
  in the Product discussion on 28 July 2026
- **Decision:** [ADR 0012](../decisions/0012-initial-knowledge-declaration-contracts.md)
- **Interoperability baseline:** Open Knowledge Format 0.2

> This document is the accepted NKF 0.1 specification for internal use and
> Product pilots. It does not make a repository conformant without validation
> against the applicable contracts, and it is not the public stable NKF 1.0
> release.

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

NKF 0.1 is an accepted pre-stable format for internal use and piloting with
Shredwise and Nourd Studio. Its `0.x` version communicates that public
governance and compatibility are not yet stable. A validator result, Git
commit, merge, file status, or tool output cannot accept a later revision.
Only the applicable Human Product Owner or another explicitly authorized
acceptance authority can accept changed Product meaning.

Conformance and acceptance are different:

- **conformance** means that a bundle satisfies the structural and semantic
  declaration requirements of a supported NKF contract; and
- **acceptance** means that an authorized actor has accepted an exact proposed
  revision as governing Product meaning.

A conformant Draft remains a proposal. An accepted record that becomes
structurally invalid is still part of accepted history, but a consumer MUST
surface the defect and MUST NOT silently reinterpret it.

## Drafting provenance

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

This distinction records where the specification detail came from; it does
not create partial authority. The Human Product Owner accepted the exact
composite NKF 0.1 proposal on 28 July 2026.

## Scope

NKF 0.1 defines Product knowledge only. Company and Organization knowledge may
be added in later NKF versions after their requirements are understood.

NKF 0.1 defines:

- a location-independent knowledge bundle;
- one canonical Markdown source and one YAML declaration per governed record;
- stable bundle, record, section, and semantic-entity identity;
- Product record types and their minimum body contracts;
- lifecycle, authority, provenance, and acceptance semantics;
- typed record and semantic-entity relationships;
- Realization and external-authority bindings;
- the boundary between knowledge and operational instances;
- a Nourd repository profile; and
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

The earlier Nourd-specific Knowledge semantic model v2 draft was an input to
this model. Acceptance of NKF 0.1 supersedes that standalone draft for
overlapping scope rather than leaving two semantic-model authorities.

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

Bundle, record, and body-contract versions are independent of the NKF format
version. A bundle MUST declare its `nkf_version` and contract identifiers.
Contract identifiers MUST include their own version, such as
`nkf.record/v1` or `nkf.product/v1`.

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

The logical NKF bundle is location-independent. NKF does not require
`.nourd`, `.nkf`, a fixed Markdown root, or a fixed records directory. A bundle
manifest locates its content.

A bundle manifest MUST declare:

| Field | Responsibility |
| --- | --- |
| `nkf_version` | NKF format version targeted by the bundle |
| `contract` | Versioned bundle contract |
| `id` | Stable bundle identity |
| `product_record` | Record ID of the unique Product root |
| `markdown_root` | Location of canonical Markdown relative to the manifest |
| `records_root` | Location of record declarations relative to the manifest |
| `record_contract` | Default record contract expected by the bundle |
| `non_records` | Markdown or other files inside the declared roots that are navigation, generated projections, redirects, or other explicitly non-governing material |

Paths MUST resolve inside the distribution boundary after symlink and
normalization checks. A manifest MUST NOT rely on an unresolved environment
variable or machine-specific absolute path for portable identity.

`non_records` MUST enumerate every file under the governed Markdown root that
is intentionally not a governed record. Absence from governance MUST be
explicit rather than inferred from a filename.

The filename of a declaration SHOULD be `<record-id>.yaml`. This is a
deterministic navigation convention, not identity or authority.

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
- MAY provide deterministic presentation guidance; and
- MUST NOT introduce, strengthen, accept, or reinterpret meaning that is
  absent from the Markdown source.

A record declaration MUST contain these logical responsibilities:

| Responsibility | Required content |
| --- | --- |
| Contract | Versioned record contract identifier |
| Identity | Stable bundle-scoped `id` |
| Type | One core or profile-defined record type |
| Body contract | Versioned contract for the Markdown body's responsibilities |
| Title | Title agreeing with the Markdown level-one title |
| Source binding | Source path, digest algorithm, and digest of the exact Markdown bytes |
| Governance | Lifecycle, authority state, and acceptance authority |
| Scope | Product root and optional narrower subjects |
| Sections | Complete semantic section map |
| Relationships | Source-bound typed record relationships |

A declaration MAY contain these responsibilities when real:

- provenance producers, verifiers, and sources;
- external-authority boundaries;
- semantic entities, entity relationships, and bindings; and
- non-authoritative presentation guidance.

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

Each semantic entity has exactly one canonical definition owner. Another
record MAY reference, constrain, realize, evidence, bind, or observe the
entity, but MUST NOT redefine its identity, kind, or core meaning.

A record MAY declare source-bound `entity_relationships`. Each relationship
MUST include a controlled type, source entity, target entity, and source
section. The applicable body contract or supported profile controls entity
kinds and entity-relationship types; free-form labels cannot silently extend
them.

A record MAY declare durable `bindings`. Each binding MUST include:

- the semantic entity;
- the Realization record;
- a controlled binding kind;
- the source section; and
- at least one durable locator or resolution rule.

A binding MAY identify an applicable external authority. A locator, rule,
provider identifier, Source path, deployment name, or namespace address is not
semantic identity.

NKF owns semantic entities, Realizations, durable binding definitions,
resolution rules, locators, and authority boundaries. Nourd Studio or another
operational system owns resolution, instance state, and observations. NKF
MUST NOT enumerate live users, resorts, activities, devices, sessions,
deployments, accounts, or provider resources as canonical knowledge merely
because a binding can resolve them.

## Body contracts

Every record MUST declare a versioned `body_contract`. A body contract
defines required semantic responsibilities, optional roles, valid authority
classes, and minimum structural rules for that record type.

A supported body contract MAY allow additional declared and classified
sections. A consumer MAY display an unsupported body contract generically,
but MUST NOT claim complete validation or use it for a consequential governing
action.

**Product — `nkf.product/v1`**

Required responsibilities:

1. Product definition: name, ownership, and what kind of Product it is.
2. Purpose: why the Product exists.
3. Vision: the durable future it seeks to create.
4. People served: who receives value.
5. Needs and outcomes: what becomes possible or improves.
6. Boundaries: what belongs to the Product and what does not.
7. Product map: links to Domains, Capabilities, and other governing knowledge.

Optional responsibilities include a vision portfolio; offering and commercial
model; operating and support model; external-authority boundaries; risks and
obligations; Product measures; evolution and retirement; and unresolved
matters.

A Product record MUST be unique and living. It describes the whole Product,
not only its software. It SHOULD link to narrower records instead of
duplicating them. Implementation and runtime state belong in Realizations and
operational systems. Exploratory visions remain proposals; accepted direction
uses accepted-meaning sections.

**Principle — `nkf.principle/v1`**

Required responsibilities:

1. Principle statement.
2. Rationale.
3. Applicability.
4. Required behaviour.
5. Boundaries.
6. Implications for decisions and trade-offs.

Optional responsibilities include examples, counterexamples, supporting
Evidence, tensions with other Principles, known exceptions, and unresolved
questions.

A Principle is normative guidance, not a slogan. It says what should remain
true; a Decision records a particular choice. It MUST be concrete enough to
evaluate a Decision, Design, or Realization. Principles are normally living.
A material exception MUST be explicit and supported by a Decision. Compliance
requires Design, Realization, and Evidence rather than assertion by the
Principle itself.

**Concept — `nkf.concept/v1`**

Required responsibilities:

1. Definition.
2. Purpose and Product relevance.
3. Distinguishing characteristics.
4. Inclusion, exclusion, and ambiguity boundaries.
5. Relationships to the Product and other meaning.
6. Current maturity: accepted, proposed, and unresolved meaning.

Optional responsibilities include alternative names, examples, scenarios,
competing interpretations, supporting Evidence, possible evolution, and open
questions.

A Concept defines shared Product meaning; it is not automatically a feature
commitment. Exploratory visions MAY begin as proposal sections. Accepted
direction and speculation MUST remain distinct. A Concept MUST NOT claim to be
a Design, Realization, or operational instance. Concepts are normally living.

**Journey — `nkf.journey/v1`**

Required responsibilities:

1. Purpose and desired human or system outcome.
2. Actors and beneficiaries.
3. Trigger and operating context.
4. Start, end, and scope boundaries.
5. Meaningful stages, decisions, or transitions.
6. Needs, expectations, and consequential moments.
7. Success, failure, interruption, and recovery conditions.
8. Related Domains and Capabilities.

Optional responsibilities include variants, channels, accessibility needs,
support paths, Evidence, measures, risks, and unresolved questions.

A Journey describes a bounded experience or reason for interaction. It is not
a Task lifecycle, Workflow Run, screen flow, or implementation script. It MAY
cross Domains and Capabilities. A Journey SHOULD preserve the intended
outcome while allowing several Designs and Realizations.

**Domain — `nkf.domain/v1`**

Required responsibilities:

1. Responsibility and Product purpose.
2. Value and people served.
3. Scope and explicit boundaries.
4. Concepts and semantic entities owned.
5. Capability map.
6. Dependencies, interfaces, and external-authority boundaries.
7. Obligations, risks, and measures relevant to the responsibility.

Optional responsibilities include commercial, operational, support, policy,
data, evolution, retirement, and unresolved concerns.

A Domain is a durable area of Product responsibility, not a department,
repository, service, screen, or temporary initiative. It MUST be `part-of`
the Product. Its boundaries SHOULD reduce competing ownership while allowing
explicit relationships with other Domains.

**Capability — `nkf.capability/v1`**

Required responsibilities:

1. Ability statement.
2. People, actors, and outcomes served.
3. Conditions, inputs, and resulting outcome.
4. Scope and non-capability boundaries.
5. Governing constraints and authority.
6. Dependencies and related Journeys.
7. Success and failure conditions.

Optional responsibilities include variants, policies, measures, Evidence,
risks, Designs, Realizations, and unresolved questions.

A Capability states what the Product can enable, not a feature backlog or how
it is implemented. It MUST be `part-of` one Domain. Current availability,
authorization, health, and use are operational state. An accepted Capability
does not claim that a complete Realization exists.

**Design — `nkf.design/v1`**

Required responsibilities:

1. Design kind, problem, and scope.
2. Governing inputs and constraints.
3. Proposed or accepted design.
4. Responsibilities, interactions, and information flows.
5. Alternatives and trade-offs.
6. Failure, safety, recovery, and operational considerations.
7. Validation approach and acceptance evidence required.
8. Explicit unresolved matters.

Optional responsibilities include experience states, diagrams, contracts,
data treatment, accessibility, security, privacy, commercial implications,
migration, rollout, and retirement.

A Design MAY describe experience, business, service, operating, policy, or
technical realization. It MUST distinguish Product requirements from chosen
solutions. It MUST NOT claim implementation or conformance without a
Realization and Evidence. A material choice that must remain historically
stable SHOULD be captured by a Decision.

**Decision — `nkf.decision/v1`**

Required responsibilities:

1. Context and problem.
2. Decision.
3. Scope and applicability.
4. Rationale.
5. Alternatives considered.
6. Consequences and trade-offs.

Optional responsibilities include evidence, compatibility, migration,
recovery, supersession, and matters deliberately not decided.

A Decision applies across the whole Product and is not limited to
architecture. An accepted Decision MUST be immutable. Correction, extension,
replacement, or reversal requires a later Decision with a typed relationship,
normally `supersedes` or `extends`. A draft Decision may evolve until its
exact revision is accepted. Rejection remains review, Task, and Git history;
it does not create an alternate governing record.

**Realization — `nkf.realization/v1`**

Required responsibilities:

1. Realization identity and kind.
2. Product meaning, entities, Designs, or Decisions realized.
3. Durable Source, system, process, asset, agreement, or implementation
   mapping.
4. Responsibilities and ownership boundaries.
5. Interfaces, dependencies, locators, and resolution rules.
6. External-authority and operational-state boundaries.
7. Compatibility, verification, and recovery obligations.

Optional responsibilities include environments, configuration classes,
migration, deployment model, support model, security, privacy, retention,
retirement, and unresolved questions.

A Realization maps intent to reality without redefining the governed meaning.
It MAY declare durable bindings but MUST NOT store live instance state,
current health, current deployment, or observations as canonical fields.
Implementation presence does not prove conformance; Evidence is required.

**Evidence — `nkf.evidence/v1`**

Required responsibilities:

1. Question, claim, or decision context.
2. Sources or primary observation method.
3. Observations and findings.
4. Interpretation.
5. Limitations and uncertainty.
6. Applicability and boundaries.
7. Relevance to Product knowledge.

Optional responsibilities include methodology detail, samples, competing
evidence, confidence, reproducibility, ethical or privacy constraints,
recommended investigation, and unresolved questions.

Evidence carries evidence authority; it does not become Product intent,
Design, or a Decision by being convincing. It MUST distinguish observation
from interpretation and MUST NOT overstate applicability. A fixed study or
review MAY be immutable; a maintained synthesis MAY be living. Raw runtime
events and current status remain in their authoritative operational stores.

## Nourd repository profile

The Nourd repository profile realizes the location-independent NKF bundle as:

```text
<product-repository>/
├── knowledge/
│   ├── README.md
│   ├── product.md
│   ├── principles/
│   ├── concepts/
│   ├── journeys/
│   ├── domains/
│   ├── capabilities/
│   ├── designs/
│   ├── decisions/
│   ├── realizations/
│   └── evidence/
└── .nourd/
    └── knowledge/
        ├── bundle.yaml
        └── records/
            └── <record-id>.yaml
```

Directories are navigation, not semantic authority, and SHOULD exist only
when real governed records need them. The declarations directory remains flat
until a later accepted profile change.

For this profile:

- `knowledge/` is the canonical Markdown root;
- `.nourd/knowledge/bundle.yaml` is the manifest;
- `.nourd/knowledge/records/` contains declarations;
- `knowledge/README.md` and directory indexes are non-governing projections
  unless explicitly represented as records;
- accepted Nourd ADRs remain immutable; and
- generated projections and operational state MUST remain outside the
  committed declaration tree.

The profile MAY continue to use `nourd.knowledge.*` bootstrap contracts during
migration. Such a repository is governed by its accepted Nourd contracts; it
does not become natively NKF-conformant solely because its logical model is
similar.

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

An NKF 0.1 bundle is **structurally conformant** when:

1. its manifest is parseable and contains every required bundle
   responsibility;
2. all declared paths remain inside the distribution boundary;
3. exactly one Product root exists;
4. every governed record has exactly one Markdown source and one declaration;
5. all stable identities are unique in their scope;
6. every title and source digest matches the exact Markdown source;
7. every semantic section is mapped and resolves;
8. every relationship target resolves inside the bundle;
9. `part-of` is acyclic and the Product–Domain–Capability hierarchy is valid;
10. governance, provenance, authority, and role fields are structurally valid;
11. Evidence has a provenance source or primary observation method; and
12. non-record material is explicitly declared.

A record is **contract-conformant** when it is structurally conformant and a
consumer validates its complete body against the declared supported body
contract and every required profile extension.

A bundle is **fully conformant** only when every governed record is
contract-conformant and all bundle-wide constraints pass.

Consumers:

- MUST fail closed for governing or consequential use when a required
  contract, extension, source binding, authority state, or relationship cannot
  be understood;
- MAY provide best-effort display and discovery of unsupported material;
- MUST identify incomplete validation;
- MUST distinguish deterministic reconciliation from semantic authoring; and
- MUST NOT report acceptance from conformance alone.

Reconciliation MAY update deterministic fields such as an exact source
digest. It MUST NOT invent or change semantic roles, section authority,
relationships, scope, entities, bindings, external authority, or presentation
meaning.

NKF 0.1 defines these obligations but does not decide the validator,
continuous-integration gate, agent skill, review interface, or enforcement
policy that carries them out.

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
- enforcement mechanisms and required repository gates;
- exact public schema files and registry distribution;
- migration from current `nourd.knowledge.*` bootstrap contracts;
- cross-bundle semantic identity and relationships;
- Company and Organization knowledge contracts;
- public governance, contribution process, trademark position, and license;
- an NKF extension registry and compatibility policy;
- a future NKP runtime protocol;
- standardized acceptance-event storage; and
- attested-computation profiles.

These omissions MUST be visible to consumers. A profile MAY resolve one for
its own scope, but MUST identify the extension and MUST NOT claim that the
profile decision is part of NKF 0.1 core.

## Minimal example

A logical NKF 0.1 manifest:

```yaml
nkf_version: "0.1"
contract: nkf.bundle/v1
id: example-product
product_record: product
markdown_root: ../../knowledge
records_root: records
record_contract: nkf.record/v1
non_records:
  - path: knowledge/README.md
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
contract: nkf.record/v1
id: product
type: product
body_contract: nkf.product/v1
title: Example Product
source:
  path: knowledge/product.md
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
  - id: purpose
    heading_path: [Purpose]
    occurrence: 1
    authority: proposal
    role: governing
  - id: vision
    heading_path: [Vision]
    occurrence: 1
    authority: proposal
    role: governing
  - id: people-served
    heading_path: [People served]
    occurrence: 1
    authority: proposal
    role: boundary
  - id: needs-and-outcomes
    heading_path: [Needs and outcomes]
    occurrence: 1
    authority: proposal
    role: governing
  - id: boundaries
    heading_path: [Boundaries]
    occurrence: 1
    authority: proposal
    role: boundary
  - id: product-map
    heading_path: [Product map]
    occurrence: 1
    authority: proposal
    role: catalogue
relationships: []
```

Concrete serialization schemas may add deterministic fields such as heading
occurrence and explicit empty collections. Those profile details MUST
preserve this logical model and MUST NOT introduce competing Product meaning.

## Pre-mortem

| Failure mode | Consequence | Required response |
| --- | --- | --- |
| NKF attempts to model every kind of knowledge immediately | The first version becomes unusable and untestable | Keep 0.1 Product-only and add Company or Organization contracts from real needs |
| Metadata becomes more authoritative than Markdown | Human review no longer sees complete Product meaning | Reject declarations that assert meaning without exact source sections |
| Stable identity follows paths or provider resources | Moves and integration changes break history | Preserve bundle, record, section, and entity identity independently |
| Real instances are copied into Markdown | Operational truth becomes stale and conflicts with its owner | Keep durable bindings in NKF and resolve live state from authoritative systems |
| Permissive interoperability weakens governance | Consumers treat OKF verification as Product acceptance | Keep the OKF export derived and preserve NKF authority extensions |
| A green validator is presented as acceptance | Unreviewed proposals silently govern | Report conformance and proposal status separately |
