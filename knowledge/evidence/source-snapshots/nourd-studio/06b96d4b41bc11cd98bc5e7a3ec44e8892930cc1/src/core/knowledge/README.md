# Knowledge core

This private TypeScript package is the shared validation and reconciliation
core required by ADR 0011. It dispatches the legacy Nourd bootstrap contracts
and the exact proposed NKF 0.1 executable contract set separately. A legacy
pass is labelled as legacy and never reported as NKF conformance.

Run its stable repository entry points from the Product root:

```sh
npm run knowledge:validate
npm run knowledge:reconcile -- --record product
npm run knowledge:reconcile -- --all
npm run knowledge:inspect -- --record product
npm run knowledge:check
```

Legacy validation compares against `main` by default. NKF validation can target
another Product repository and must receive its accepted base explicitly when
the Nourd Git-backed profile is required:

```sh
npm run knowledge:validate -- --base main
node --import tsx src/core/knowledge/src/cli.ts validate \
  --repository /path/to/product \
  --base master
```

`reconcile` atomically updates only exact Markdown SHA-256 digests. It accepts
a missing digest for a new otherwise-valid descriptor and does not infer or
rewrite semantic sections, relationships, scope, authority, or presentation
guidance.

The base comparison resolves stable record identities, rejects byte changes
to accepted Decisions, and reports valid changed living records as
`proposal-awaiting-acceptance`. Inspection refuses stale or invalid composite
records. A validator pass never supplies human acceptance.

NKF validation loads its executable schemas and controlled body-contract
registry from this package rather than trusting schemas supplied by the
consumer repository. The checker validates all ten NKF 0.1 body contracts,
explicit responsibility bindings, complete source and section binding,
Product–Domain–Capability hierarchy, provenance, external authority, semantic
entities, bindings, extensions, security boundaries, and Nourd Git-backed
acceptance.

Build the integrity-manifested portable distribution with:

```sh
npm run knowledge:build:portable
```

The generated artifact is written to
`src/core/knowledge/dist/portable/`. It contains one bundled executable, the
exact executable contracts, and SHA-256 integrity metadata. Generated output
is not committed in this repository; a consumer pins the reviewed artifact
and its source revision.
