---
created_at: 2026-07-30T15:59:54Z
design_disposition: adopted
design_decisions:
  - ADR-0049
  - ADR-0050
---

# NKF 0.1 Product–Technology Common Comparison

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Governing Architecture:** `ADR 0049`
- **Product Source:** `knowledge/specifications/nkf-0.1.md`
- **Technology Source:**
  `knowledge/designs/adopted/technology-root-profile.md`
- **Proposal Authority Effect:** None. The current Product specification is accepted;
  the Technology specification and every allocation below remain proposed.

## Purpose

Compare the accepted Product knowledge model with an independently derived
Technology knowledge model and identify:

```text
Product Specification ∩ Technology Specification = Common Specification
Product Specification − Common Specification = Product Profile
Technology Specification − Common Specification = Technology Profile
```

Common is an automatically applicable, non-selectable specification. It is not
a generic profile and cannot be declared as a root.

## Comparison Test

A rule is a Common candidate only when Product and Technology independently
need the same:

1. semantic meaning;
2. authority and lifecycle boundary;
3. structural obligation;
4. deterministic enforcement and failure behavior;
5. conformance limit; and
6. compatibility treatment.

A neutral noun, identical YAML shape, reusable checker function, or similar
Markdown structure is insufficient. When only a lower-level mechanism is
identical, Common owns that mechanism and each profile retains its different
semantic rule.

## Common Mechanism Candidates

The independent Technology exercise confirms the following Product rules are
also required with the same meaning.

| Rule family | Common candidate | Profile remainder |
| --- | --- | --- |
| Version coordinate | One `nkf_version` coordinate and no sub-versioned record, body, profile, or extension contracts | Each profile defines compatibility of its own semantic model |
| Authority pair | Canonical human-readable Markdown plus a complete digest-bound executable YAML companion; Markdown governs conflicts | Each profile owns its normative semantic contents |
| Project entry | Checker invoked on a project root with `.nourd` directly at that root | None |
| Knowledge entry point | One project-relative `knowledge_root` contained inside the project and outside `.nourd` | None |
| Markdown coverage | Every Markdown file under `knowledge_root` has exactly one record source or one explicit `non_records` entry | Profiles decide which semantic record body represents a file |
| Non-record assets | Non-Markdown assets need not be enumerated unless another accepted rule makes them governed inputs | Technology adds declared governed technical artifacts |
| Path and symlink safety | Containment, literal paths, duplicate-physical-file prevention, required file kinds, and generally prohibited symlinks | None currently |
| Markdown structure | UTF-8 CommonMark, one H1, deterministic H2/H3 section identity and coverage, Title Case with canonical-term exceptions, and non-semantic Mermaid handling | Body responsibilities determine which sections are semantically required |
| Record identity | Stable bundle, record, section, entity, external-authority, and extension identities independent of file paths | Root and body identities remain profile-owned |
| Record envelope | Closed declaration, exact Markdown digest, governance, root scope, sections, relationships, provenance, external authorities, entities, bindings, and extensions | Exact root-scope field realization remains proposed |
| Governance | Living/immutable lifecycle, draft/accepted/superseded/retired state, declared acceptance authority, and optional acceptance date | Product and Technology add body-specific lifecycle constraints |
| Acceptance boundary | Declarations are claims, validation does not accept, and authority-binding verification remains separate from conformance and Realization confirmation | Authority-specific verification may use extensions |
| Section authority | Accepted meaning, proposal, unresolved, and evidence remain distinct and source-bound | Profiles constrain which authorities may satisfy each body responsibility |
| Responsibility bindings | Stable body-scoped responsibility IDs, exact source-section bindings, complete required coverage, and no semantic proof from heading names alone | Profiles own non-Common body responsibilities and additive constraints |
| Record relationships | Source-bound, typed, directed, resolvable, duplicate-free relationships with stronger-known-type preference | Profiles control allowed types and any structural hierarchy |
| Semantic entities | One canonical definition owner, record-scoped identity, controlled kind, exact defining section, and source-bound relationships | Profiles own root- and subject-specific entity kinds |
| Realization bindings | Durable source-bound mappings with controlled kinds, locators or resolution rules, optional external authority, and no copied live state | Profiles control allowed entity and artifact targets |
| External authority | Provenance and external authority remain different; references do not transfer ownership | Profiles identify relevant authorities and required resolvers |
| Extension mechanism | Digest-bound Markdown/YAML extension authority, one NKF version coordinate, required/optional semantics, round-trip preservation, and fail-closed conflicts | Profiles may permit or require particular extensions |
| Presentation boundary | Markdown is the default readable form; presentation settings stay outside native records and require an optional governed extension | None currently |
| Governed Validation Inputs | The accepted contracts define the resources that affect validation; the validated snapshot contains exactly those inputs | Technology adds declared technical artifact resources |
| Security | Secret prohibition, safe path handling, no unsafe automatic dereference, diagnostic redaction, and contract-governed scan inputs | A profile or extension may add stricter inputs and rules |
| Validation result | Deterministic result structure, exact contract/checker/profile binding, diagnostics, snapshot, currentness, and last-result-only persistence | Profile validation contributes required checks and diagnostics |
| Conformance limit | Passing checks never proves truth, adequacy, acceptance, authority, implementation correctness, confirmed Realization, or current external state | Each profile defines its additional semantic-review boundary |
| Trusted realization | Schemas, validators, fixtures, packages, and integrity metadata derive from accepted authority and are distributed through a trusted release | Each profile requires exact bound profile artifacts |
| Unsupported meaning | Unsupported required contracts, profiles, extensions, or mismatched digests fail closed for complete conformance and consequential use | Exact supported set is release-specific |

These are Common candidates because the Technology proposal needs them
independently, not because Product wording was replaced with `root` or
`subject`.

## Record-Body Allocation

### Proposed Common Bodies

Four bodies have the same semantic purpose and core enforcement in both
models:

| Body | Identical core meaning | Profile-specific remainder |
| --- | --- | --- |
| Decision | Context, exact choice, scope, rationale, alternatives, consequences; accepted revision immutable; later change through typed provenance | Product currently adds that a Decision applies across the whole Product; Technology applies the Decision to its declared Technology scope |
| Design | Problem and scope, governing inputs, proposed direction, responsibilities and interactions, alternatives and trade-offs, failure and recovery, validation evidence, unresolved matters, and disposition provenance; no implementation claim | Profiles may constrain permitted design kinds and profile-specific governing inputs |
| Realization | Identity, governed meaning realized, durable mapping, ownership boundaries, interfaces and locators, external-authority and operational-state separation, compatibility and verification; implementation presence is not proof | Profiles control the semantic targets and additional governed artifact kinds |
| Evidence | Question or claim, sources or method, observations, interpretation, limitations, applicability, relevance; evidence does not become governing meaning | Profiles control relevant subject/entity kinds and any additional evidence rules |

The optional-body intersection is also explicit:

- Decision shares Evidence, compatibility, migration, recovery, supersession,
  and matters deliberately not decided.
- Design shares diagrams, contracts, data treatment, security, privacy,
  migration, rollout, and retirement. Product retains experience states,
  accessibility, and commercial implications.
- Realization shares environments, configuration classes, migration,
  deployment model, support model, security, privacy, retention, retirement,
  and unresolved questions.
- Evidence shares methodology detail, samples, competing Evidence, confidence,
  reproducibility, ethical or privacy constraints, recommended investigation,
  and unresolved questions.

If accepted, these bodies belong in Common and the profiles add only their
stricter rules. The existing Product-bound wording would require an explicit
pre-stable migration:

| Current Product identity or wording | Common candidate |
| --- | --- |
| Decision “applies across the whole Product” | Common Decision applies to declared root scope; Product Profile adds whole-Product applicability |
| Design distinguishes “Product requirements” | Design distinguishes governing root-profile requirements from the chosen solution |
| `product-meaning-realized` | `governed-meaning-realized` |
| `relevance-to-product-knowledge` | `relevance-to-governed-knowledge` |
| Role `mapping` refers to Product meaning | Durable correspondence between governed semantic meaning and a Realization |
| Role `relevance` refers to Product knowledge | How Evidence bears on governed knowledge, a claim, Decision, or question |

This is not a silent rename. It changes accepted identifiers or wording and
would require authority updates, executable contract changes, fixtures,
release support, and deliberate Product migration.

### Product Profile Bodies

The Technology exercise does not independently justify these bodies. They
remain entirely Product-specific:

| Body | Product-only meaning |
| --- | --- |
| Product | Product identity, purpose, vision, people served, needs and outcomes, boundaries, and Product map |
| Principle | Normative Product guidance and its implications |
| Concept | Shared Product meaning and maturity |
| Journey | Bounded human or system experience and desired outcome |
| Domain | Durable area of Product responsibility |
| Capability | What the Product can enable |

Their exact responsibilities, roles, lifecycle rules, entity kinds, and
semantic constraints stay in the Product Profile.

### Technology Profile Bodies

The Product specification does not contain these bodies. They remain entirely
Technology-specific:

| Body | Technology-only meaning |
| --- | --- |
| Technology | Technology identity, purpose, consumers, technical capabilities and contracts, authority boundaries, map, compatibility, distribution, security, evolution, and retirement |
| Specification | Normative technical model, vocabulary, requirements, interfaces, conformance, compatibility, security boundaries, and visible omissions |

Technology additionally requires at least one Specification record and makes
an accepted version-specific Specification immutable.

### Bodies Not Yet Shared

Principle and Concept could be useful for some technologies, but the NKF
repository has not established a separate need for those bodies. They do not
enter Common or Technology on hypothetical usefulness.

Nourd Agent SDK may supply later evidence. If it does, the resulting change
must be compared against the already accepted meanings rather than backfilled
as though it had always existed.

## Root And Hierarchy Allocation

| Concern | Common | Product Profile | Technology Profile |
| --- | --- | --- | --- |
| Root selection | Exactly one root record and one concrete Root Profile | Root must be Product | Root must be Technology |
| Bundle membership | Every record resolves to the declared root through root scope | Product is the scope root | Technology is the scope root |
| Root lifecycle | Root is living | Product-specific root constraints | Technology describes the whole Technology, not its repository or implementation |
| Record hierarchy | Relationship mechanism only | `Product → Domain → Capability` through acyclic record-level `part-of` | No supported record-level `part-of` hierarchy initially |
| Filesystem meaning | Paths and directories do not create semantics | No semantic inference from Product folder layout | No semantic inference from repository or package layout |

This is a material result: Technology does not inherit Domain or Capability
and does not invent component hierarchy from the repository tree.

## Relationship Allocation

The record-relationship mechanism is Common. The following types have the
same directional meaning in both current models and are Common candidates:

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

Record-level `part-of` remains Product-profile vocabulary for the currently
accepted Product hierarchy. The Technology Profile initially prohibits it.

Entity-level `part-of` remains a Common candidate because both profiles need
to represent governed constituents inside Designs without turning record
membership or filesystem placement into hierarchy.

## Entity Allocation

The entity declaration, ownership, reference, relationship, and binding
mechanisms are Common candidates. Kinds divide as follows:

| Allocation | Candidate kinds |
| --- | --- |
| Common | `actor`, `component`, `interface`, `policy`, `decision-scope`, `system`, `source`, `process`, `asset`, `implementation`, `claim`, `observation` |
| Product Profile | `product`, `principle`, `concept`, `beneficiary`, `stage`, `decision-point`, `transition`, `outcome`, `domain-concept`, `domain-entity`, `capability-input`, `capability-outcome` |
| Technology Profile | `technology`, `specification`, `contract`, `rule`, `diagnostic` |

`actor` is Common because Technology consumers and external systems can act in
the governed context; `beneficiary` remains Product-specific because the
Technology exercise establishes consumers, not a Product value beneficiary
model.

The candidate defining-body composition is:

| Common kind | Common defining bodies | Product additions | Technology additions |
| --- | --- | --- | --- |
| `actor` | None | Product, Concept, Journey, Domain, Capability | Technology, Specification |
| `component` | Design | None | None |
| `interface` | Design, Realization | Domain, Capability | Technology, Specification |
| `policy` | Design, Decision | Principle, Domain | Technology, Specification |
| `decision-scope` | Decision | None | None |
| `system` | Design, Realization | None | None |
| `source` | Realization, Evidence | None | None |
| `process` | Design, Realization | None | None |
| `asset` | Realization | None | None |
| `implementation` | Realization | None | None |
| `claim` | Evidence | None | None |
| `observation` | Evidence | None | None |

Common entity-relationship types are `part-of`, `defines`, `depends-on`,
`governs`, `flows-to`, `realizes`, `evidences`, `observes`, and `references`.
Product adds `transitions-to`; Technology adds none initially. Entity-level
`part-of` does not create record hierarchy.

## Section-Role Allocation

The role-classification mechanism is Common. Roles used with the same meaning
by the proposed Common Decision, Design, Realization, and Evidence bodies are
Common candidates.

The exact role allocation is:

| Allocation | Roles |
| --- | --- |
| Common | `actor`, `alternative`, `applicability`, `boundary`, `catalogue`, `consequence`, `content`, `context`, `definition`, `dependency`, `evidence`, `evolution`, `finding`, `governing`, `identity`, `interface`, `interpretation`, `limitation`, `mapping`, `measure`, `method`, `obligation`, `observation`, `rationale`, `recovery`, `relevance`, `responsibility`, `risk`, `source`, `trade-off`, `unresolved`, `validation` |
| Product Profile | `behaviour`, `condition`, `outcome`, `principle`, `transition`, `trigger` |
| Technology Profile | No additional role in the initial candidate |

Two current role definitions require explicit neutralization backed by the
body comparison:

- `mapping` targets governed semantic meaning rather than Product meaning;
  and
- `relevance` relates Evidence to governed knowledge rather than Product
  knowledge.

Root- and body-specific allowed role subsets remain in their profiles.
The Product-only roles do not become Common because their current supported
bodies and exact meanings are not independently required by Technology.

## Binding-Kind Allocation

The binding shape and semantic/operational boundary are Common candidates.
The exact allocation is:

| Allocation | Binding kinds |
| --- | --- |
| Common | `source`, `system`, `process`, `asset`, `implementation`, `provider`, `namespace`, `data`, `interface` |
| Product Profile | `agreement`, `deployment` |
| Technology Profile | No additional kind in the initial candidate |

## Governed Validation Input Allocation

Common owns:

- native `.nourd` declaration resources;
- every governed Markdown source;
- resources required by the exact supported Common and profile authority
  bindings;
- the rule that an accepted extension or profile may add resource kinds; and
- snapshot calculation solely from the complete Governed Validation Inputs.

Product currently adds no profile-specific file kind.

Technology adds only explicitly governed technical artifacts whose accepted
contract declares that their bytes participate in validation. It does not
automatically include all source, schema, package, image, or build files.

## Items Not Yet Proven Common

The following current Product-specification areas need separate treatment
rather than automatic movement:

1. **OKF export:** the existing mapping is Product-worded, and the Technology
   proposal does not yet establish that OKF export is required profile
   meaning.
2. **Profile artifact layout:** Common must resolve and bind profiles, but
   separate files versus identified modules remains a realization decision.
3. **Diagnostic namespace:** stable failure meanings are required, but exact
   Common/Profile diagnostic identities remain unresolved.
4. **Nourd Agent SDK fitness:** no claim is made until that repository is
   exercised separately.

## Proposed Resulting Specification Shape

If the current comparison is accepted, NKF 0.1 is separated as:

```text
Common Specification
├── project, source, declaration, governance, provenance and validation mechanics
├── Decision
├── Design
├── Realization
└── Evidence

Product Profile
├── Product root
├── Principle
├── Concept
├── Journey
├── Domain
├── Capability
└── Product hierarchy and Product-specific vocabularies

Technology Profile
├── Technology root
├── Specification
├── no record-level structural hierarchy initially
├── governed technical artifacts
└── Technology-specific vocabularies and validation
```

Every bundle still selects exactly one concrete profile. Nobody selects
Common.

## Compatibility And Next Decision

The comparison preserves Product meaning but changes its packaging, root
selection, scope serialization, four body wordings, two responsibility
identities, profile bindings, schemas, checker dispatch, diagnostics,
fixtures, release, and declarations. It is therefore a governed breaking
pre-stable migration inside the sole NKF 0.1 version namespace.

The next semantic review should decide the Technology Profile before accepting
the Common allocation. Only after Technology meaning is accepted can its exact
intersection with Product be accepted as Common.

No canonical specification, YAML contract, schema, checker, fixture, release,
consumer declaration, or conformance result changes through this comparison.
