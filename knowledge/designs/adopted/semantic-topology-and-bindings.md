---
created_at: 2026-07-29T20:06:17Z
design_disposition: adopted
design_decisions:
  - ADR-0015
---

# NKF 0.1 Semantic-Topology And Binding Vocabularies

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Proposal Authority Effect:** None
- **Proposal evidence:** imported NKF-002 checker contract set at
  `knowledge/evidence/source-snapshots/nourd-studio/06b96d4b41bc11cd98bc5e7a3ec44e8892930cc1/src/core/knowledge/contracts/nkf/0.1/contract-set.json`,
  SHA-256
  `34ef9a6dc78ea66958dedb7b281b2a92a005f2ad2731178969be909e0fa3b9f8`

## Decision Sought

Whether the following entity kinds, entity-relationship types, binding kinds,
and constraints are the complete core semantic-topology and durable-binding
vocabularies for native NKF 0.1.

The imported checker supplies global value lists but no authoritative meanings
or body-specific entity-kind ownership. This proposal uses those lists as
evidence, reconciles them with the accepted NKF semantic layers, and states
every deliberate difference.

## Semantic-Entity Model

A semantic entity is independently addressable Product meaning defined by one
exact section and owned canonically by one record. It is not a record, file,
heading, locator, operational instance, or current-state observation.

An entity declaration:

- has one record-scoped unique `id`;
- has one `kind` allowed by the declaring record's body contract;
- has one `defining_section` resolving inside that record; and
- may have a non-identifying `address`.

The core body contract does not require a record-root entity merely because a
record exists. Entity declarations are used only when independently
addressable meaning is real.

## Entity Kinds

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

An entity kind does not prove that the defining prose is adequate or that the
entity should have been declared. Unknown kinds and kinds unsupported by the
declared body contract fail closed.

## Entity References And Ownership

An entity reference contains `record` and `entity`. Both identifiers resolve
inside the same bundle in NKF 0.1. The referenced record must declare that
entity ID.

The `source` endpoint of an `entity_relationship` must be canonically defined
by the record declaring the relationship. The target may be an entity in that
record or another record in the same bundle. This prevents a third record from
becoming an undeclared authority for relationships between two other owners.

## Entity-Relationship Types

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

All entity relationships are directional, source-bound, and duplicate-free.
Self-relationships are invalid. `part-of` must be acyclic. Cycles are permitted
for `flows-to` and `transitions-to` when the source meaning establishes them.
`references` must not replace a stronger known type.

Additional type-specific constraints:

- `transitions-to` requires source and target kinds `stage`, `transition`, or
  `state`;
- `realizes` requires the source entity to be owned by an
  `nkf.realization` record;
- `evidences` requires the source entity to be owned by an `nkf.evidence`
  record; and
- `observes` requires source kind `observation` owned by an `nkf.evidence`
  record.

A `realizes` entity relationship states semantic topology. It does not replace
a durable binding when a locator or resolution rule is claimed.

## Binding Model

A binding maps one resolved semantic entity to one Realization record and a
durable way to locate or resolve the mapped reality. It does not assert that
an operational instance currently exists, is healthy, is authorized, or has
any particular state.

Bindings are declared only by an `nkf.realization` record. The binding's
`realization` value must equal that declaring record's ID. Its `source_section`
must resolve inside that record. Its entity reference must resolve inside the
same bundle.

When `external_authority` is present, it resolves to an
`external_authorities` declaration in the same Realization record. At least
one non-empty `locator` or `resolution_rule` is required.

## Binding Kinds

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

Unknown binding kinds fail closed. A binding kind classifies what is resolved;
it does not change the entity kind, Realization record type, or authority
owner.

Bindings are order-insensitive and exact duplicate binding objects are
invalid. Multiple distinct bindings may map the same entity through the same
Realization when their kinds, locators, or resolution rules establish
different durable mappings.

Locators and resolution rules must not contain credentials, secrets, live
instance state, or time-varying observations. When the resolved resource,
permission, account, or state has an authority outside NKF, that authority
must remain explicit even when deterministic validation cannot infer it.

## Deliberate Differences From Imported Checker Evidence

The proposed semantics do not adopt the checker globally:

- entity kinds are constrained by defining body contract, as required by the
  accepted specification;
- `observes` is added because the accepted specification explicitly permits
  another record to observe an entity and `evidences` is not equivalent;
- `realizes` is restricted to a source entity owned by a Realization record;
- `evidences` and `observes` are restricted to source entities owned by an
  Evidence record;
- bindings are owned by their named Realization record; and
- cross-bundle entity references remain unsupported in NKF 0.1.

## Compatibility

These vocabularies belong to the sole NKF 0.1 version namespace. A supported
profile may add namespaced kinds or relationship types only through a
separately accepted extension boundary. Unknown required meaning fails closed.

Changing a value's meaning, removing a value, changing body ownership, or
weakening a constraint is an NKF format change governed by ADR 0006.

## Exact Confirmation Requested

> Accept the 27 core entity kinds and body-contract ownership matrix, the ten
> entity-relationship types and constraints, and the eleven binding kinds and
> binding-ownership rules exactly as stated above for native NKF 0.1.

Acceptance would establish semantic-topology and durable-binding vocabularies
only. It would not accept replacement Markdown or YAML bytes, extensions,
acceptance proof, path resolution, schemas, checker behavior, fixtures,
distribution, a release, conformance, or consumer migration.
