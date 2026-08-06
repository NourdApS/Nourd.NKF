# Product Example

This directory contains a complete, conformant synthetic Product project. It
is executable example data, not accepted Product meaning for a real Nourd
project.

```text
project/
├── .nourd/
│   └── knowledge/
│       ├── bundle.yaml
│       └── records/
│           ├── product-current-system.yaml
│           └── product.yaml
└── knowledge/
    ├── README.md
    ├── product.md
    ├── tasks/
    ├── designs/
    ├── decisions/
    ├── specifications/
    ├── realizations/
    └── evidence/
```

Start with the actual
[bundle](project/.nourd/knowledge/bundle.yaml), then inspect the
[Product declaration](project/.nourd/knowledge/records/product.yaml) and its
[canonical Markdown](project/knowledge/product.md). The
[Task](project/knowledge/tasks/active/task.md) is an explicit non-record and the
[knowledge README](project/knowledge/README.md) is explicit navigation. No
Markdown source is left unrepresented.

The declaration binds the exact SHA-256 of the included Product Markdown,
uses `body_contract: nkf.product`, and maps every required section by exact
Title Case heading path. The bundle selects
`nkf.profile.product`.

From this example page, copy `project/` to a writable directory, install the
exact pinned release, and run:

```sh
npm run nkf:check
```

The publication verifier runs the bundled checker against this exact project
before publication. A passing example check proves only snapshot conformance;
it does not accept the synthetic Product meaning.
