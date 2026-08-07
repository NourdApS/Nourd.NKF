---
id: design-nkf-0-1-path-and-distribution-boundary
type: design
summary: Native NKF 0.1 fixes .nourd at the project root while allowing the canonical knowledge directory to be configured inside that project.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0018
---

# NKF 0.1 Project Path And Knowledge Coverage

- **Design Disposition:** Adopted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Proposal Authority Effect:** None by itself. ADR 0018 later adopted the
  proposed direction and records the governing Decision.
- **Supersedes within this design:** the earlier unaccepted abstract
  distribution-root, fixed `knowledge/`, variable records-root, no-symlink,
  and cross-platform filename proposals

## Proposed Direction

Native NKF 0.1 fixes `.nourd` at the project root while allowing the canonical
knowledge directory to be configured inside that project.

## Project Layout

```text
<project-root>/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
└── <configured-knowledge-directory>/
```

The project root is the directory that directly contains `.nourd/`.

- `.nourd/knowledge/bundle.yaml` is the fixed bundle manifest.
- `.nourd/knowledge/records/` is the fixed record-declaration directory.
- The declaration directory remains flat in NKF 0.1 under the already accepted
  Nourd project profile; nested declaration directories require a later
  governed change.
- The configured knowledge directory contains canonical human-readable
  Markdown and may contain non-Markdown assets.

The project root is the containment boundary. It need not be a Git repository,
and its absolute machine path is not identity or authority.

## Knowledge Entry Point

The bundle manifest contains:

```yaml
knowledge_root: knowledge
```

`knowledge_root`:

- replaces the earlier `markdown_root` field;
- is a non-empty path relative to the project root;
- is not relative to `.nourd/knowledge/bundle.yaml`;
- must resolve to a directory inside the project root;
- must not equal `.nourd` or resolve inside `.nourd`; and
- must not be an absolute path, contain an empty, `.` or `..` segment, use
  environment-variable or `~` expansion, or escape the project root after
  symlink resolution.

Because the declaration location is fixed by the format,
`records_root` is removed from the native bundle manifest.

## Paths Inside The Knowledge Root

Record `source.path` and each `non_records[].path` are relative to
`knowledge_root`, not the project root or manifest directory.

For example:

```yaml
knowledge_root: knowledge
```

with:

```yaml
source:
  path: product.md
```

resolves to:

```text
<project-root>/knowledge/product.md
```

A stored knowledge-relative path:

- is non-empty and relative;
- uses `/` as its separator;
- has no empty, `.` or `..` segment;
- has no leading `/`, Windows drive prefix, or UNC prefix;
- contains no NUL or ASCII control character;
- is interpreted literally without environment-variable or `~` expansion;
  and
- must resolve inside the configured `knowledge_root`.

Path spelling and case are exact. NKF core adds no Windows-reserved-name or
Unicode case-folding conformance rule. Packaging tools may warn about paths
that are not portable to a target platform.

## One Markdown File, One Representation

Every `.md` file recursively contained in `knowledge_root` has exactly one
representation in `.nourd`:

1. one governed record declaration under
   `.nourd/knowledge/records/`; or
2. one explicit `non_records` entry in
   `.nourd/knowledge/bundle.yaml`.

No Markdown file may be unaccounted for, represented by more than one record
declaration, listed more than once, or both governed and non-governing.

Non-Markdown assets under `knowledge_root`, such as images, do not need to be
enumerated by NKF 0.1 unless another accepted contract governs them.

## One Declaration, Many Sections

One governed Markdown file has one record identity and one declaration. That
declaration maps every semantic level-two and level-three heading through its
`sections` list.

A declaration may contain many section mappings, responsibility bindings,
semantic entities, entity relationships, and durable bindings while remaining
the single representation of its Markdown source.

NKF 0.1 does not permit several record declarations to divide one Markdown
file by section. If sections require different record types, body contracts,
lifecycles, acceptance authorities, or independent governance, the Markdown
must be split into separate record sources through a governed revision.

Every regular file in `.nourd/knowledge/records/` must be one UTF-8 `.yaml`
record declaration. Each declaration binds one unique Markdown source.
Duplicate record IDs, duplicate source paths, or two paths resolving to the
same source file are invalid.

The declaration filename should be `<record-id>.yaml` for navigation, but a
filename mismatch does not change record identity or conformance.

## Symlinks

Symlinks are generally prohibited and should not be used inside `.nourd/` or
the configured `knowledge_root`.

A symlink that:

- is broken;
- forms or participates in a cycle; or
- resolves outside the project root

is invalid and fails structural conformance.

A symlink whose complete resolved path remains inside the project root may be
read, but produces a portability warning. For a knowledge path, the final
target must also remain inside the resolved `knowledge_root`.

The final target must have the required file or directory kind, and duplicate
physical-file checks still apply.

## Locators Remain Separate

Provenance, external-authority, Realization binding, and extension-contract
locators remain locators rather than knowledge-relative paths or identity.
Their portable local-path representation and external resolution behavior are
not changed or newly accepted by this boundary.

A locator must not be dereferenced automatically when doing so may disclose
information, trigger an operation, incur cost, or cross an authorization
boundary.

## Compatibility

This boundary supersedes the conflicting location-independent path model in
the accepted NKF 0.1 specification:

- `.nourd` and the manifest/declaration locations become fixed at the project
  root;
- `markdown_root` is replaced by project-root-relative `knowledge_root`;
- `records_root` is removed;
- source and non-record paths become knowledge-root-relative; and
- every Markdown file under the configured knowledge root requires exactly one
  `.nourd` representation.

The currently accepted Markdown and YAML artifacts remain immutable snapshots.
Realizing this boundary requires exact replacement revisions, adjusted derived
artifacts, and deliberate consumer migration.

## Not Accepted By This Boundary

This boundary does not:

- choose an authority-specific acceptance extension;
- define universal local or external locator syntax;
- accept replacement Markdown or YAML bytes;
- implement schemas, checker behavior, fixtures, or diagnostics;
- package a distribution;
- migrate a consumer; or
- establish conformance.
