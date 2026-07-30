# NKF 0.1 Enforcement And Diagnostics

- **Status:** Proposal
- **Task:** `NKF-003`
- **Prepared:** 29 July 2026
- **Decision authority:** Human Product Owner, Nourd ApS
- **Authority effect:** None
- **Proposal evidence:** accepted NKF 0.1 Decisions through ADR 0018 and the
  imported NKF-002 schemas, checker phases, diagnostics, and result type;
  imported implementation remains evidence only

## Decision Sought

Whether the following YAML parse boundary, schema/checker/resolver/reviewer
partition, validation phases, diagnostic contract, rule registry, and result
semantics are the deterministic enforcement model for native NKF 0.1.

## Authority Model

Normative Markdown and its accepted executable YAML companion remain the
governed NKF authority pair.

JSON Schemas, checker code, diagnostic text, fixtures, reports, and CI gates
are derived realization. They:

- may enforce accepted deterministic rules;
- may not add, weaken, reinterpret, or accept meaning;
- may not turn a passing result into Product acceptance;
- may not confirm a Realization; and
- must fail closed when required meaning or a bound contract is unsupported.

## YAML Parse Boundary

Native NKF YAML is UTF-8 and uses the YAML 1.2 JSON-compatible data model.
Each manifest, record declaration, or executable contract file:

- contains exactly one YAML document;
- has one mapping at its document root;
- has no duplicate mapping key;
- uses only string keys;
- uses only null, boolean, finite number, string, array, and mapping values;
- has no custom tag or merge key; and
- has no anchor or alias.

Comments and presentation whitespace are permitted but carry no meaning.
Parsing must not execute constructors, interpolate environment variables, or
resolve external content.

## Enforcement Partition

| Layer | Owns deterministic enforcement of | Must not claim |
| --- | --- | --- |
| JSON Schema 2020-12 | Local object shape, required and closed fields, primitive types, constants, enums, local cardinality, duplicate-free scalar arrays, local conditional fields, and lexical formats | File existence, path containment, source bytes, headings, graph resolution, authority verification, or semantic adequacy |
| Bundle-aware checker | Project layout, files, paths, source digests, Markdown titles/headings, complete Markdown representation, cross-record references, responsibility coverage, hierarchy, graph rules, extension declaration/use consistency, application of resolver outcomes, and bundle-wide conformance | Acceptance, truth, design quality, Product completeness, or confirmed Realization |
| Artifact and authority resolver | Exact extension-artifact resolution and optional acceptance-authority binding verification against their owning systems | Core acceptance by copying a result into NKF, or locator dereference without an explicit safe operation |
| Human semantic review | Whether Markdown meaning, classification, responsibility binding, evidence, boundaries, and decisions are adequate and acceptable | Deterministic conformance merely from judgment |

A rule has one primary enforcement layer. A later layer may rely on an earlier
result but must not maintain a competing copy of the rule's normative meaning.

## Derived Schema Layout

The first derived schema realization uses JSON Schema 2020-12:

```text
contracts/nkf/0.1/schemas/
  bundle.schema.json
  record.schema.json
```

Their `$id` values are:

```text
urn:nkf:0.1:schema:bundle
urn:nkf:0.1:schema:record
```

The `0.1` component is the one NKF version coordinate, not a schema
sub-version.

Each schema contains non-normative `x-nkf-source` metadata identifying:

- `nkf_version`;
- exact normative Markdown path and SHA-256;
- exact executable YAML path and SHA-256; and
- the schema artifact's own SHA-256 in release metadata, not recursively
  inside its own bytes.

The schemas are generated from or verified against the then-current accepted
YAML companion. Exact schema bytes remain separate realization review.

The files currently present at those paths are superseded proposal bytes based
on the earlier `markdown_root` and `records_root` model. They are not an
implementation of this proposal and must be replaced, not incrementally
treated as current.

Because ADRs 0013 through 0018 supersede parts of the currently accepted
Markdown/YAML bytes, no schema or checker realized against that older pair may
claim current native NKF 0.1 conformance. Realization follows acceptance of a
coherent replacement authority pair.

## Validation Phases

The checker executes these phases in order:

1. `contracts` — load and verify exact Markdown/YAML/schema bindings;
2. `parse` — locate and parse manifest and declaration YAML safely;
3. `schema` — validate local bundle and record shapes;
4. `project` — validate fixed `.nourd` layout, `knowledge_root`, paths,
   symlinks, file kinds, declarations, and Markdown coverage;
5. `source` — verify Markdown bytes, digests, H1, titles, and semantic heading
   mappings;
6. `extension-resolution` — validate extension catalogs and uses, resolve
   applicable exact contract artifacts through an explicitly authorized
   resolver, verify identity and digests, determine exact consumer support,
   and validate supported payloads;
7. `bundle-graph` — resolve identities, Product root, scope, hierarchy,
   cross-record references, cycles, and full-bundle constraints;
8. `record-contract` — validate body, role, responsibility, governance,
   provenance, entity, relationship, binding, and extension rules;
9. `security` — report deterministic high-confidence prohibited-material
   findings; and
10. `authority-binding` — when explicitly requested and supported, verify a
    declared governance state against its owning acceptance authority without
    changing conformance; and
11. `result` — calculate requested conformance and governing-use readiness,
    then emit a deterministic report.

If an earlier failure makes a later phase unsafe or meaningless, the later
phase is `not-evaluated`, never `passed`. A requested conformance level cannot
pass while one of its required phases is failed or not evaluated.

`authority-binding` is optional. When it is not requested or cannot be
performed, its phase is `not-evaluated`. That state does not fail deterministic
conformance, but it prevents `governing-use: ready` when verified acceptance is
required.

## Conformance Levels

The accepted levels remain hierarchical:

- `structural` requires `contracts`, `parse`, `schema`, `project`, `source`,
  `bundle-graph`, `security`, and `extension-resolution` for the catalog,
  bundle uses, and any record extension needed to interpret a structural
  field;
- `contract` additionally requires `record-contract` and
  `extension-resolution` for every extension use on the requested record; and
- `full-bundle` requires structural conformance plus `record-contract` and
  `extension-resolution` for every governed record.

A high-confidence prohibited secret finding fails the requested result, while
a passing scan does not prove that no secret exists.

Warnings do not fail native conformance. If a supported profile makes a
warning condition consequential, it defines a separate profile rule with its
own error identifier rather than silently changing the native rule's severity.

## Diagnostic Contract

Each diagnostic has:

```yaml
rule_id: <stable identifier>
severity: error | warning
blocking: conformance | governing-use | none
phase: <validation phase>
message: <human-readable explanation>
artifact: <optional project-relative path>
record_id: <optional record identity>
instance_pointer: <optional JSON Pointer>
source_section: <optional section identity>
remediation: <optional non-authoritative guidance>
```

Rules:

- `rule_id`, severity, blocking effect, and semantic trigger are stable
  contract behavior;
- message and remediation wording are not machine contracts;
- `error` with `blocking: conformance` fails the applicable requested
  conformance result;
- `error` with `blocking: governing-use` blocks consequential use without
  changing deterministic conformance;
- `warning` always uses `blocking: none`; and
- diagnostics are sorted by phase order, normalized artifact path, record ID,
  instance pointer, source section, and `rule_id`.

Diagnostics never record or imply Product acceptance.

## Stable Native Rule Registry

### Contract, Parse, And Schema

| Rule ID | Severity |
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

All rules above block conformance.

### Project, Path, Source, And Representation

| Rule ID | Severity |
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

Errors above block conformance; warnings are non-blocking.

### Sections, Bodies, And Governance

| Rule ID | Severity |
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

All rules above block conformance.

### Record Relationships And Bundle Graph

| Rule ID | Severity |
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

All rules above block conformance.

### Semantic Entities And Durable Bindings

| Rule ID | Severity |
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

All rules above block conformance.

### Extensions, Security, And Authority Verification

| Rule ID | Severity | Blocking |
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

An unresolved, digest-mismatched, identity-mismatched, or otherwise unsupported
optional extension emits only `extension.optional.unvalidated` and remains
subject to ADR 0016's visibility, round-trip, and non-consequential-use rules.

## Validation Result

The checker emits an operational result with identity
`nkf.validation-result` and `nkf_version: "0.1"`. It is not a governed
knowledge record and does not belong in canonical Markdown.

The result identifies:

- execution ID, runner identity, and start/completion times;
- exact checker artifact identity and digest;
- exact Markdown, YAML, and schema digests;
- requested conformance level;
- every phase as `passed`, `failed`, or `not-evaluated`;
- overall conformance as `passed` or `failed`;
- declared governance separately from optional acceptance-binding
  verification per record;
- whether consequential governing use is `ready`, `not-ready`, or
  `not-evaluated`; and
- the deterministically ordered diagnostics.

`governing-use: ready` requires applicable declared accepted status,
acceptance binding verified, required conformance passed, and no
governing-use blocker. It does not confirm a Realization.

Absolute project paths, credentials, secrets, and copied operational payloads
must not appear in a portable result.

## Human Review Boundary

No deterministic layer can establish:

- whether a section role or responsibility binding is semantically accurate;
- whether Markdown is true, adequate, safe, or complete for the Product;
- whether evidence supports a claim;
- whether the declared authority actually should accept the meaning;
- whether an external authority or locator is current;
- whether a Design is good; or
- whether a Realization exists or behaves as intended.

These require human review and, where applicable, external Evidence. A
validator may surface review needs but must not generate a passing semantic
judgment.

## Deliberate Differences From Imported Checker Evidence

This proposal:

- removes repository, Git base-ref, and Git-specific acceptance-source rules
  from native conformance;
- uses current unversioned NKF identities and ADR 0018 project paths;
- adds complete role, entity, binding, extension, and Markdown-coverage rules;
- separates authority-binding results from conformance;
- makes phase non-evaluation explicit;
- binds every derived artifact to the accepted authority pair; and
- treats imported diagnostic names as evidence rather than stable current
  contract behavior.

## Exact Confirmation Requested

> Accept the YAML parse boundary, JSON Schema 2020-12 layout, four-layer
> enforcement partition, ordered validation phases, hierarchical conformance
> semantics, diagnostic shape and stable rule registry, operational validation
> result boundary, and human-review exclusions exactly as stated above for
> native NKF 0.1.

Acceptance would establish enforcement semantics only. It would not accept
replacement Markdown or YAML bytes, exact schema or checker bytes, fixtures,
packaging, CI policy, a release, any conformance result, Product acceptance,
confirmed Realization, presentation-guidance fields, or presentation
semantics.
