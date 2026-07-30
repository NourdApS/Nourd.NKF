---
created_at: 2026-07-30T15:59:54Z
---

# NKF Current System

## Realization Identity And Kind

This is the consolidated current-system Realization for the Nourd Knowledge
Format repository. It is the normal entry point for understanding how
accepted NKF meaning is implemented.

It consolidates architecture, topology, components, relationships,
interfaces, artifact mappings, implementation status, confirmation status,
and relevant Decision provenance. It is not a separate lifecycle layer,
normative authority, generated validation result, or copy of live operational
state.

The stable record identity remains `nkf-0.1-native-realization`.

## Governed Meaning Realized

The implementation targets the accepted NKF 0.1 Common Specification and its
Product and Technology Root Profiles. Markdown remains the normative human
authority and the executable YAML remains its digest-bound companion.

The current exact authority pair is accepted through
[ADR 0056](../decisions/0056-design-direction-and-record-authority.md). ADR 0054
adds a safe optional front-matter source envelope while keeping canonical
meaning in the CommonMark body; ADRs 0055 and 0056 align the native Design
responsibility vocabulary with the NKF lifecycle.

The predecessor implementation baseline is
[ADR 0052](../decisions/0052-dynamic-root-self-hosting.md). ADR 0057 confirms
the current implementation and repository structure produced by NKF-007.
Confirmation applies to the exact revisions and artifacts listed by that
Decision; it does not make a release current or verify external acceptance
authority.

## Durable Mapping

The current repository topology is:

```text
Canonical Specification
        ↓ exact semantic derivation
Executable YAML Contract
        ↓ closed structural derivation
JSON Schemas
        ↓ loaded by
Native Checker And CLI
        ↓ validates
Project-Root .nourd Bundle + Knowledge Sources + Governed Artifacts
        ↓ emits
Latest Validation Result
```

| Component | Durable Location | Current State | Confirmation |
| --- | --- | --- | --- |
| Normative Specification | `knowledge/specifications/nkf-0.1.md` | Accepted current revision | ADR 0056 |
| Executable companion | `contracts/nkf/0.1/nkf.yaml` | Accepted current revision | ADR 0056 |
| Core JSON Schemas | `contracts/nkf/0.1/schemas/` | Source-bound current Schemas with unchanged assertion graphs | ADR 0057 |
| Checker library and CLI | `src/checker/`, `src/cli.ts` | Front-matter boundary and accepted checker behavior implemented | ADR 0057 |
| Fixtures and tests | `fixtures/`, `test/` | 15 test files and 93 tests pass | ADR 0057 |
| Build artifact | `dist/nourd-nkf-checker.mjs` | Deterministically verified local build | ADR 0057 |
| Self-host declaration | `.nourd/knowledge/` | Explicit Technology bundle with complete source and artifact bindings | ADR 0057 |
| Latest result | `.nourd/validation-result.json` | Latest passing full-bundle observation | Conformance only |
| Release tooling | `scripts/package-release.mjs`, `scripts/release/` | Earlier release contract implementation | Current publication deferred to NKF-008 |

Supporting current Realizations provide the detailed mappings:

- [Contracts And Schemas](current/contracts-and-schemas.md)
- [Checker And Validation](current/checker-and-validation.md)
- [Self-Hosting](current/self-hosting.md)
- [Release Package](current/release-package.md)

## Responsibilities And Ownership Boundaries

The canonical Specification owns normative meaning. The executable YAML
represents that meaning mechanically. Schemas enforce local closed shapes.
The checker owns deterministic project, source, graph, record-contract,
security, authority-binding, and result behavior assigned to it by the
accepted contract.

The `.nourd` declaration represents this repository as one Technology bundle;
it does not accept the Markdown or infer Design disposition, section meaning,
relationships, or confirmation from paths and filenames.

This Realization owns a navigable implementation account. It does not compete
with the Specification, decide a Design disposition, accept knowledge, or
turn a passing check into confirmation.

## Interfaces Dependencies Locators And Resolution

The native invocation starts at a candidate project root whose direct
`.nourd` entry must resolve safely inside that project. The bundle at
`.nourd/knowledge/bundle.yaml` selects exactly one concrete Root Profile and a
project-contained relative `knowledge_root`.

Record declarations resolve from `.nourd/knowledge/records/*.yaml` to exact
Markdown sources under `knowledge_root`. Technology bundles may additionally
bind project-contained governed artifacts. The checker loads its trusted
contract set from `contracts/nkf/0.1/` and uses Node.js with pinned package
dependencies.

Durable repository paths and digests are locators and integrity bindings.
They do not become semantic identity or live operational authority.

## External Authority And Operational State Boundaries

Git owns commits and history. Github owns remote repository and Release state.
Package registries own publication state. Consumer repositories own their
knowledge, declarations, acceptance, migrations, and operational use.

The latest validation result records one observed snapshot and may become
stale immediately after an input changes. This Realization records the durable
mechanism and current repository implementation status, not mutable workflow,
process, deployment, account, permission, health, or execution state.

No release, push, deployment, or external-consumer migration is part of the
current NKF-007 work.

## Compatibility Verification And Recovery

Verification consists of strict authority-pair binding, schema compilation,
type checking, positive and negative fixtures, diagnostic coverage, unit and
integration tests, deterministic build verification, explicit self-host
declarations, and full-bundle validation.

`npm run check` passes type checking, 15 test files with 93 tests, build, and
deterministic build verification. The self-host bundle contains 85 explicit
records and 43 explicit non-record Markdown entries after ADR 0057, with 60
digest-bound governed artifacts. Full-bundle validation passes with no
diagnostics; authority-binding verification was not requested and remains
separate.

Recovery uses Git history, immutable Decision and Evidence provenance,
predecessor digests, explicit successor Decisions, deterministic rebuilding,
and deliberate consumer migration. A failed validation blocks a conformance
claim; it does not revoke prior acceptance or silently change NKF meaning.
