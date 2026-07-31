# Product Example

This synthetic example shows the smallest complete shape, not accepted Product
meaning for a real Nourd project.

```text
example-product/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
│           └── product.yaml
└── knowledge/
    ├── README.md
    ├── product.md
    └── task.md
```

`.nourd/knowledge/bundle.yaml`:

```yaml
nkf_version: "0.1"
contract: nkf.bundle
id: example-product
root:
  record: product
  profile: nkf.profile.product
knowledge_root: knowledge
non_records:
  - path: README.md
    kind: navigation
  - path: task.md
    kind: task
```

`knowledge/product.md`:

```markdown
---
id: product
type: product
title: Example Product
summary: A synthetic Product root used to demonstrate NKF 0.1.
created_at: 2026-07-31T00:00:00Z
record_lifecycle: living
record_status: accepted
---

# Example Product

## Product Scope

The Product helps a person demonstrate a complete NKF Product bundle.

## Intent

The user can understand the governed Product boundary.

## Capabilities

The Product exposes one documented example.

## Architecture

The example consists only of canonical Markdown and its NKF declaration.

## Responsibilities

The Product owns its example meaning. NKF owns only format validation.

## Constraints

The example contains no live customer or operational data.
```

`.nourd/knowledge/records/product.yaml` binds the exact SHA-256 of
`product.md`, declares `body_contract: nkf.product`, maps each required
section by exact Title Case heading path, and declares accepted Product
authority. Replace the example digest only after reviewing the exact source
bytes.

`task.md` is explicitly represented as a Task non-record. `README.md` is
explicit navigation. No Markdown file under `knowledge` is left
unrepresented.

After installing the exact pinned release, `npm run nkf:check` validates this
Product bundle. The pass does not accept the Product intent.
