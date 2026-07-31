# Nourd Knowledge Format

> NKF 0.1 is pre-stable. The current checker release is internal to authorized
> Nourd projects. This public documentation is explanatory; the exact
> digest-bound [NKF 0.1 Specification](reference/nkf-0.1.md) is normative.

Nourd Knowledge Format, or NKF, is a governed way to keep important project
knowledge understandable to people and mechanically coherent for tools and AI
agents.

## What NKF Is

NKF is a human-readable knowledge format, an executable declaration model, and
a deterministic validation contract for governed project knowledge.

## Why NKF Exists

NKF exists because a folder of Markdown can look useful while quietly
drifting: a Decision may no longer match a Specification, an implementation
may not be represented, a Task may disappear from navigation, or a checker
may validate different meaning than the document a person reviewed. NKF makes
those boundaries explicit and checks their representation.

NKF is not a knowledge database, workflow engine, document viewer, AI model,
source of Product acceptance, or owner of external operational state.

## The Short Version

An adopted project has:

```text
project-root/
├── .nourd/
│   ├── knowledge/
│   │   ├── bundle.yaml
│   │   └── records/
│   ├── nkf-release.json
│   └── validation-result.json
└── <configured-knowledge-root>/
```

`.nourd` is always at the project root. `bundle.yaml` selects exactly one
concrete Root Profile, Product or Technology, and points to a knowledge root
inside the same project. Common NKF rules apply to both profiles. The selected
profile adds root-specific meaning and validation.

Every Markdown file in the knowledge root has exactly one record declaration
or one explicit non-record entry. A record declaration binds the source,
governance, sections, responsibilities, relationships, and digest needed for
deterministic validation.

```mermaid
flowchart TB
  P["Project Root"] --> N[".nourd"]
  P --> K["Configured Knowledge Root"]
  N --> B["Bundle"]
  B --> C["Common Specification"]
  B --> R{"Concrete Root Profile"}
  R --> PR["Product"]
  R --> TR["Technology"]
  B --> D["Record Declarations"]
  D --> K
  K --> M["Canonical Markdown Meaning"]
  B --> V["Governed Validation Inputs"]
  V --> X["Pinned Checker"]
  X --> O["Latest Validation Result"]
```

## How Knowledge Moves

NKF uses this lifecycle:

```mermaid
flowchart LR
  T["Task"] --> G["Design"]
  G --> D["Decision"]
  D --> S["Specification"]
  S --> R["Realization"]
  R --> V["Validation"]
```

- A **Task** owns durable intent, constraints, criteria, and execution plans.
- A **Design** proposes a direction, alternatives, and trade-offs.
- A **Decision** records why a direction was adopted, rejected, or
  superseded.
- A **Specification** defines current normative meaning.
- A **Realization** describes how that meaning is currently implemented.
- **Validation** evaluates one particular system snapshot.

An agent should start from the knowledge map and consolidated current
Realization, then follow Decisions or Designs only when it needs provenance,
rationale, or alternatives. It should not reconstruct the current system by
reading every historical file.

## Claims That Must Stay Separate

| Claim | Meaning | Who Or What Establishes It |
| --- | --- | --- |
| Accepted | An owning authority accepted an exact record revision | The declared human authority |
| Design Adopted | A Decision selected a proposed direction | An accepted Decision |
| Confirmed Realization | An authority confirmed an exact implementation account | A confirmation Decision |
| Conformant | One checker run found no blocking violation in one observed snapshot | The pinned checker result |
| NKF Verified | The required conformance and binding conditions for the stated scope were met | The accepted NKF rules and one result |
| Governing Use Ready | The accepted readiness conditions for governing use were met | The applicable authority and contract |
| Published | Bytes were observed on a distribution surface | The distribution system |
| Protected | A remote repository rule actually prevents an invalid merge | The remote repository |

None of these claims implies another unless the normative Specification says
so. A passing checker never accepts knowledge.

## Use NKF

1. Decide whether the project knowledge root represents a Product or a
   Technology.
2. For an Empty Repository or a Tiny Knowledge, No Source Or Configuration
   repository, follow [Initial Onboarding](guides/initial-onboarding.md). The
   portable skill guides complete agent assessment and required human
   confirmation; deterministic tooling captures exact bytes, seals the plan,
   generates native declarations, and applies only a complete conformant
   candidate.
3. For a project whose native NKF bundle is already complete, follow
   [Adopt And Validate](guides/adopt-and-validate.md) to install the pinned
   integration without reconstructing the bundle.
4. Obtain the public adopter and the exact recommended release SHA-256 from
   `reference/publication.json`.
5. Author through the installed AI-neutral protocol and run
   `npm run nkf:check` before handoff.
6. Review release updates deliberately; never follow a moving branch or
   `latest`.

The onboarder does not invent project meaning or acceptance decisions. When
the agent cannot recommend either supported initial category, it reports the
evidence and stops without guessing a later brownfield category.

## Documentation Map

- [Topology](concepts/topology.md) explains roots, profiles, records, semantic
  entities, Realizations, and external authority.
- [Authority And Lifecycle](concepts/authority-and-lifecycle.md) explains
  Markdown, executable contracts, Schemas, checking, and claim boundaries.
- [Initial Onboarding](guides/initial-onboarding.md) covers agent-led Empty and
  Tiny Knowledge Product and Technology repositories.
- [Adopt And Validate](guides/adopt-and-validate.md) covers installation,
  AI-assisted authoring, local checks, and continuous integration.
- [Update And Recover](guides/update-and-recover.md) covers no-update, explicit
  updates, rollback, diagnosis, and failure recovery.
- [Product Example](examples/product/README.md) is a complete small Product
  bundle.
- [Technology Example](examples/technology/README.md) is a complete small
  Technology bundle with governed artifacts.
- [NKF 0.1 Specification](reference/nkf-0.1.md) is the exact normative
  Markdown mirror.

## Current Boundaries

- NKF 0.1 is pre-stable and may change through the governed change process.
- The current checker release is private and available only to authorized
  users of `kaveh6202/Nourd.NKF`.
- The exact Specification mirror preserves source-relative provenance links
  whose internal Evidence targets are intentionally absent from this public
  projection.
- The public adopter is public-safe but requires either an authenticated
  `gh` session for the private release or a locally supplied archive.
- Only Product and Technology are selectable Root Profiles. Common rules are
  shared implementation-independent meaning, not a selectable General root.
- Initial onboarding uses semantic agent assessment rather than file or byte
  thresholds. Category 2 requires human confirmation; unsupported or uncertain
  later categories remain deferred to NKF-014.
- Public presentation metadata, other future root models, validation expiry,
  broader secret scanning, and a protected merge gate remain outside the
  current delivered boundary.
- Github-hosted CommonMark and Mermaid are the initial documentation surface;
  a dedicated generated website may be added later.

If explanatory documentation conflicts with the exact Specification, follow
the Specification and report the documentation defect.
