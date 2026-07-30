---
id: design-nkf-0-1-common-and-root-profile-proposal
type: design
title: NKF 0.1 Common And Root Profile Proposal
summary: "Develop the smallest coherent realization of ADR 0049: specify repeated NKF mechanics once, require one concrete profile for every knowledge root, preserve Product meaning, and make later profile-specific specifications and validators possible without redesigning the bundle envelope."
created_at: 2026-07-30T15:59:54Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0049
  - adr-0050
---

# NKF 0.1 Common And Root Profile Proposal

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Governing Direction:** `ADR 0049`
- **Proposal Authority Effect:** ADR 0049 accepts the architecture only. Every exact
  contract, identity, serialization, extraction, validation, artifact, and
  migration detail below remains proposed.

## Purpose

Develop the smallest coherent realization of ADR 0049: specify repeated NKF
mechanics once, require one concrete profile for every knowledge root, preserve
Product meaning, and make later profile-specific specifications and validators
possible without redesigning the bundle envelope.

## Conceptual Layers

```text
NKF Common Specification
├── Common declaration and source contracts
├── Common governance and semantic mechanisms
├── Concrete-profile resolver
└── Common validation result
        │
        ├── Product Root Profile Specification
        ├── Candidate Technology Root Profile Specification
        └── Future Concrete Root Profile Specification
```

The Common Specification is abstract and applies automatically. It is not a
Root Profile.

## Proposed Bundle Selection

The current candidate serialization is:

```yaml
root:
  record: <root record ID>
  profile: <accepted concrete Root Profile identity>
```

For a Product:

```yaml
root:
  record: product
  profile: nkf.profile.product
```

For NKF under a future accepted Technology Profile:

```yaml
root:
  record: nkf
  profile: nkf.profile.technology
```

The `root` object replaces `product_record`. It is closed and requires exactly
`record` and `profile`. The exact field names and profile identities remain
proposal material.

There is no `nkf.profile.common`, `nkf.profile.generic`, omitted profile,
profile default, or profile array. A bundle selects one concrete profile.

Every record would use root-neutral bundle membership:

```yaml
scope:
  root: <root record ID>
  subjects: [<optional narrower subject IDs>]
```

`scope.root` equals `bundle.root.record` and does not create semantic
relationships or hierarchy.

## Proposed Common Specification

The first extraction candidate keeps these existing contracts in Common:

1. project-root `.nourd` invocation precondition;
2. fixed native metadata layout and configurable in-project knowledge root;
3. complete Markdown representation and non-record declarations;
4. path, file-kind, symlink, duplicate-source, and canonical-term rules;
5. CommonMark source parsing, headings, Title Case, and source digests;
6. record identity, source, governance, scope, sections, relationships,
   provenance, external authorities, entities, bindings, and extensions;
7. section authority and responsibility-binding mechanisms;
8. common relationship, entity-reference, binding, and extension mechanics;
9. security and Governed Validation Inputs;
10. validation invocation, phases, diagnostics envelope, result,
    currentness, and governing-use separation;
11. release integrity and trusted validator distribution; and
12. profile identity, resolution, exact artifact binding, support, dispatch,
    and fail-closed behavior.

Common defines mechanisms, not profile-specific semantic completeness.

The current record bodies must be classified individually. Decision, Design,
Evidence, Realization, Principle, Concept, Journey, Domain, Capability, and
Specification-like meaning cannot move into Common merely because more than
one profile might use a similarly named record.

## Proposed Concrete Profile Contract

Every concrete profile specification and executable companion must declare:

1. stable profile identity;
2. the supported NKF format version;
3. root record type and body contract;
4. required root responsibilities and lifecycle;
5. allowed and required record/body contracts;
6. allowed roles, responsibilities, vocabularies, relationships, entities,
   and bindings;
7. scope and hierarchy rules;
8. additional Governed Validation Inputs;
9. deterministic profile rules and diagnostic identities;
10. unsupported-profile and incomplete-validation behavior;
11. compatibility, migration, deprecation, and retirement; and
12. exact normative, executable, schema, validator, and fixture bindings.

Profile rules may add to Common. They cannot override a Common field, reduce a
Common requirement, suppress a Common diagnostic, reinterpret Common
semantics, or claim profile conformance from Common conformance alone.

## Technology-First Comparison Method

Common is not extracted from Product in isolation. The Technology
Specification must first be derived independently from NKF's actual governed
knowledge.

Only then are the two concrete specifications compared:

```text
Product Specification ∩ Technology Specification = Common Specification
Product Specification − Common Specification = Product Profile
Technology Specification − Common Specification = Technology Profile
```

An item enters Common only when both concrete specifications independently
require the same meaning, authority boundary, structural obligation,
enforcement layer, failure behavior, and compatibility treatment.

The following do not establish Commonality:

- replacing `Product` with `subject`, `root`, or another neutral word;
- identical YAML shape with different semantic responsibility;
- checker-code reuse;
- similar headings or directory placement;
- one profile being able to tolerate another profile's rule; or
- a desire to reduce duplication.

The comparison must preserve all Product meaning that does not appear
identically in Technology and all Technology meaning that does not appear
identically in Product.

The independent Technology candidate is
[`technology-root-profile.md`](technology-root-profile.md).
The resulting rule-family comparison is
[`product-technology-common-allocation.md`](product-technology-common-allocation.md).
Neither document is accepted authority.

## Candidate Technology Profile

Technology remains the candidate profile for NKF and later Nourd Agent SDK.
Its first specification must be derived from NKF before Common contents are
proposed. Before acceptance, it must establish:

- whether one Technology profile accurately covers both a knowledge format and
  an SDK;
- the required root responsibilities;
- whether Domain and Capability retain the same meaning and hierarchy;
- which existing record bodies are semantically reusable;
- whether Specification is Common or Technology-specific;
- profile-specific validation and diagnostics;
- any additional Governed Validation Inputs; and
- deliberate migration and release behavior.

Format, SDK, protocol, tool, framework, library, service, platform,
application, and system remain examples for investigation, not a closed
Technology-kind vocabulary.

`Shared Technology` remains outside NKF vocabulary.

## Profile Validation

The proposed validation sequence is:

```text
Invocation Precondition
        ↓
Common Contract And Source Validation
        ↓
Resolve And Bind Concrete Root Profile
        ↓
Profile Schema And Semantic Validation
        ↓
Common Security And Result Finalization
        ↓
One Core-And-Profile-Bound Result
```

The validation result must identify the selected profile and exact profile
artifacts. Common structural success without successful required profile
validation cannot produce full-bundle profile conformance or `NKF Verified`.

Profile-specific rules should use a declared profile validation interface and
stable diagnostic identities. Exact phases, diagnostic namespaces, schema
composition, and result fields remain unresolved.

A project may contain declarative profile data, but it cannot make arbitrary
code trusted. Validator code must be distributed through the trusted NKF
release or a later accepted trust and plugin mechanism.

## Profile Specifications And Packaging

Each concrete profile has logically separate normative meaning and executable
contracts. Physical organization remains open:

- separate digest-bound Markdown and YAML artifacts;
- separately identified sections within a complete NKF contract set; or
- separately packaged modules bound by one NKF release.

Any layout must permit exact profile identity, independent review,
source-to-executable binding, validator binding, compatibility analysis, and
deterministic release verification without creating another NKF version
namespace.

## Adding A Future Profile

A later root type can be added without changing the bundle selection shape:

1. gather concrete root evidence;
2. specify and accept one concrete profile;
3. declare its root and record model;
4. define profile validation and diagnostics;
5. bind schemas, validator, and fixtures;
6. add it to a trusted NKF release;
7. make unsupported checkers fail closed; and
8. migrate consumers deliberately.

If a candidate profile cannot obey Common, NKF must reconsider whether the
disputed rule is genuinely Common. A profile cannot override it locally.

## Compatibility

Moving from the Product-only native format to Common plus an explicit Product
Profile changes the accepted authority, manifest shape, validation result,
artifact bindings, schemas, checker dispatch, diagnostics, fixtures, release,
and consumer declarations.

The work remains a governed breaking pre-stable NKF 0.1 change. There is one
NKF version namespace, no selectable generic profile, no parallel
Product-only alias, and no silent migration.

## Deferred

This proposal does not yet accept:

- the `root` or `scope.root` serialization;
- `nkf.profile.product` or `nkf.profile.technology` identities;
- the exact Common extraction;
- any Common record body;
- the Technology root body, hierarchy, record set, or validator;
- Specification body ownership;
- profile artifact paths or package topology;
- profile schema composition, validator interface, diagnostics, or result
  fields;
- another concrete profile; or
- NKF repository or Agent SDK conformance.
