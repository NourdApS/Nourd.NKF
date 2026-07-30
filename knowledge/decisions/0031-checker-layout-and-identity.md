---
created_at: 2026-07-30T07:53:41Z
---

# ADR 0031: Establish Checker Development Layout And Identity

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Human Product Owner, Nourd ApS
- **Confirmation Source:** Direct confirmation in the NKF-003 discussion on
  30 July 2026 after review of the exact package layout, artifact identity,
  validation-only responsibility, and distribution boundary
- **Implementation Evidence:** Imported Nourd Studio `@nourd/knowledge-core`
  snapshot preserved under `knowledge/evidence/source-snapshots/`

## Context

ADRs 0029 and 0030 establish the current canonical NKF 0.1 authority pair and
all three exact source-bound JSON Schemas. The remaining realization step is a
native checker that implements those accepted contracts without becoming
another source of normative meaning.

The imported `@nourd/knowledge-core` package is useful technical evidence, but
it combines legacy contract dispatch, validation, reconciliation, inspection,
and portable building. Copying that package boundary would preserve
consumer-specific history and mutation responsibilities that do not belong to
the native NKF checker.

The accepted validation-result contract requires a portable checker identity
and the SHA-256 digest of the exact checker artifact used. It deliberately
leaves concrete identity and packaging to realization work.

## Decision

### Package And Runtime

The NKF repository contains one root Node.js package:

- development package name: `@nourd/nkf-checker`;
- publication state: `private`;
- minimum runtime: Node.js 22;
- source language: TypeScript;
- module system: ESM; and
- package topology: one package, not a workspace or multi-package monorepo.

The development package name is not a promise of an npm publication name.
Public distribution coordinates remain separately governed release work.

### Repository Layout

The checker uses:

```text
package.json
tsconfig.json
src/
  checker/
  cli.ts
test/
fixtures/
dist/
```

`src/checker/` contains the reusable validation engine. `src/cli.ts` is a thin
command-line adapter over that engine. `test/` contains implementation tests.
`fixtures/` contains governed positive and negative conformance inputs.
`dist/` contains generated output and is not committed.

The existing `knowledge/` and `contracts/` directories retain their current
authority. The package layout does not move, duplicate, or replace them.

### Checker Identity And Digest

The portable native checker identity is exactly:

```text
nourd-nkf-checker
```

That identity is stable across runners and is distinct from:

- the development package name;
- a future distribution coordinate;
- a release version;
- the runner invoking the checker; and
- the NKF format version.

The portable build produces one executable checker artifact. A native
validation result records the SHA-256 digest of the exact executable artifact
whose code performed that validation. Source-tree identity, a Git commit, a
package-lock digest, or an aggregate directory digest cannot substitute for
that artifact digest.

Source-level unit tests may inject explicit test artifact metadata, but they
cannot present that metadata as a released checker artifact or consumer
conformance evidence.

### Responsibility Boundary

The native checker validates NKF 0.1. It may expose a reusable library and a
thin CLI in the same package.

It does not:

- edit or reconcile Markdown or YAML;
- generate, repair, or migrate declarations;
- dispatch legacy Nourd bootstrap contracts;
- accept knowledge;
- confirm semantic adequacy or a Realization;
- own operational workflow state; or
- perform public distribution, installation, or release management.

Migration, reconciliation, authoring assistance, and consumer integrations
may be separately governed tools that call the checker; they are not hidden
checker responsibilities.

## Compatibility

This Decision adds realization architecture only. It changes no NKF 0.1
format rule, contract shape, diagnostic trigger, conformance meaning, or
consumer obligation.

The imported `@nourd/knowledge-core` package remains immutable proposal and
implementation evidence. Its package identity and legacy behavior are not
supported aliases of `nourd-nkf-checker`.

## Non-Claims

This Decision does not:

- confirm checker implementation bytes or fixtures;
- select dependency versions beyond the accepted runtime boundary;
- establish public packaging, distribution, release, support, or
  continuous-integration gates;
- validate a consumer project;
- accept consumer knowledge;
- confirm a Realization;
- produce a conformance result; or
- authorize consumer migration.
