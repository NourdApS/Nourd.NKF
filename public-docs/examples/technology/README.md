# Technology Example

This directory contains a complete, conformant synthetic Technology project
with one governed implementation artifact. It is executable example data, not
accepted Technology meaning for a real Nourd project.

```text
project/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       ├── freshness/
│       │   └── baseline.yaml
│       └── records/
│           ├── realization.yaml
│           ├── specification.yaml
│           └── technology.yaml
├── knowledge/
│   ├── README.md
│   ├── technology.md
│   ├── tasks/
│   ├── designs/
│   ├── decisions/
│   ├── specifications/
│   ├── realizations/
│   └── evidence/
└── src/
    └── example.ts
```

Start with the actual
[bundle](project/.nourd/knowledge/bundle.yaml). It selects
`nkf.profile.technology` and binds the exact digest of
[the source artifact](project/src/example.ts) to the
[Realization declaration](project/.nourd/knowledge/records/realization.yaml).
The other declarations bind the
[Technology](project/knowledge/technology.md) and
[Specification](project/knowledge/specifications/specification.md) sources. The
[Task](project/knowledge/tasks/items/task.md) is a stable document node at a
neutral `tasks/items/` path whose lifecycle is declared in YAML and projected
under `tasks/by-state/`.

The Technology record defines purpose, consumers, contracts, boundaries, and
evolution. The Specification owns current normative meaning. The Realization
describes the implementation and maps `src/example.ts` through its
`Durable Mapping` section.

The exact source artifact participates in Governed Validation Inputs because
the Technology Profile permits `governed_artifacts`. Changing `example.ts`
without updating and reviewing its binding causes validation to fail. The
[reviewed baseline](project/.nourd/knowledge/freshness/baseline.yaml) binds
the exact graph revision and carries one
`semantically-reviewed-whole-root` confirmation.

The equivalent Product bundle cannot add `governed_artifacts` by implication.
That distinction keeps Common rules shared while preserving the concrete
profile boundary.

From this example page, copy `project/` to a writable directory, run Adopt to
install the same exact governed recommendation, and then run:

```sh
npm run nkf:check
```

The publication verifier runs the bundled checker and requires the exact
reviewed whole-root baseline to be ready. The result observes one snapshot;
it does not confirm the
Realization or own the runtime state of the implemented Technology.
