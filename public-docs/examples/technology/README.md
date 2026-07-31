# Technology Example

This synthetic example shows a Technology root and one governed implementation
artifact.

```text
example-technology/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
│           ├── realization.yaml
│           ├── specification.yaml
│           └── technology.yaml
├── knowledge/
│   ├── realization.md
│   ├── specification.md
│   ├── task.md
│   └── technology.md
└── src/
    └── example.ts
```

`.nourd/knowledge/bundle.yaml`:

```yaml
nkf_version: "0.1"
contract: nkf.bundle
id: example-technology
root:
  record: technology
  profile: nkf.profile.technology
knowledge_root: knowledge
non_records:
  - path: task.md
    kind: task
governed_artifacts:
  - id: example-source
    kind: implementation
    path: src/example.ts
    digest:
      algorithm: sha-256
      value: <EXACT_SOURCE_SHA256>
    record: realization
    source_section: durable-mapping
```

The Technology record defines its purpose, capabilities, interfaces,
ownership, and constraints. The Specification record owns current normative
meaning. The Realization record describes the current implementation and maps
`src/example.ts` through its `Durable Mapping` section.

The exact source artifact participates in Governed Validation Inputs because
the Technology Profile permits `governed_artifacts`. Changing `example.ts`
without updating and reviewing its binding causes validation to fail.

The equivalent Product bundle cannot add `governed_artifacts` by implication.
That distinction keeps Common rules shared while preserving the concrete
profile boundary.

After installing the same exact pinned NKF release, `npm run nkf:check`
validates the Technology knowledge and declared artifact together. The result
observes one snapshot; it does not confirm the Realization or own the runtime
state of the implemented Technology.
