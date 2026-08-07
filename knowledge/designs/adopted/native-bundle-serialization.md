---
id: design-nkf-0-1-native-bundle-serialization
type: design
title: NKF 0.1 Native Bundle Serialization
summary: ADR 0018 defines the fixed manifest location, knowledge_root, Markdown coverage, and declaration directory, but not the exact bundle object or non_records entry shape. The executable companion and schemas cannot choose those details by implication.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0021
proposal_authority_effect: None
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Native Bundle Serialization

## Gap

[ADR 0018](../../decisions/0018-project-paths-and-knowledge-coverage.md) defines the fixed manifest location, `knowledge_root`, Markdown
coverage, and declaration directory, but not the exact bundle object or
`non_records` entry shape. The executable companion and schemas cannot choose
those details by implication.

## Proposed Bundle Shape

The native manifest at `.nourd/knowledge/bundle.yaml` has these required
fields:

```yaml
nkf_version: "0.1"
contract: nkf.bundle
id: <non-empty bundle ID>
product_record: <non-empty record ID>
knowledge_root: <project-root-relative directory>
non_records: []
```

It may additionally contain only:

- `extension_contracts`, with the exact [ADR 0016](../../decisions/0016-extension-resolution.md) catalog shape; and
- `extensions`, with the exact [ADR 0016](../../decisions/0016-extension-resolution.md) extension-use shape.

Unknown top-level fields fail closed. There is no `record_contract`,
`markdown_root`, `records_root`, `required_extensions`, or free-form
top-level extension field.

## Non-Record Entries

`non_records` is required and may be empty. Each entry has:

```yaml
path: README.md
kind: navigation
reason: <optional non-empty explanation>
```

Rules:

- `path` is required and follows [ADR 0018](../../decisions/0018-project-paths-and-knowledge-coverage.md)'s knowledge-root-relative path
  rules;
- it resolves to an existing regular file;
- `kind` is required and is one of:
  - `navigation` — an index, README, or other navigation aid;
  - `generated` — a derived Markdown projection whose source authority is
    elsewhere;
  - `redirect` — a compatibility or relocation pointer; or
  - `other` — another deliberately non-governing Markdown file;
- `reason` is optional for the first three kinds and required for `other`;
- entries are closed to unknown fields;
- resolved paths are unique and cannot also be record sources; and
- list order carries no meaning.

Non-Markdown assets are outside mandatory coverage and need not be listed.
When a project chooses to list one, the same entry shape, existence,
containment, uniqueness, and classification rules apply. Another accepted
contract may govern an asset when required.

## Bundle Constraints

- `id` and `product_record` are non-empty identifiers.
- `product_record` resolves to the bundle's one `product` record.
- `knowledge_root` follows [ADR 0018](../../decisions/0018-project-paths-and-knowledge-coverage.md) exactly.
- Every Markdown file recursively under `knowledge_root` has exactly one
  record declaration or one `non_records` entry.
- Optional empty `extension_contracts` and `extensions` lists are omitted.
- Array order carries no meaning.

This proposal does not introduce a new identifier grammar; accepted identity
semantics remain unchanged.

## Exact Confirmation Requested

> Accept the closed native bundle shape, required fields, optional [ADR 0016](../../decisions/0016-extension-resolution.md)
> extension fields, exact `non_records` object, four non-record kinds, and
> stated bundle constraints above for NKF 0.1.

Acceptance would establish serialization only. It would not accept replacement
Markdown/YAML bytes, schemas, checker code, fixtures, a release, conformance,
or migration.
