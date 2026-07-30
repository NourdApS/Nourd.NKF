---
created_at: 2026-07-30T17:16:33Z
---

# NKF Checker And Validation

## Realization Identity And Kind

This Realization describes the native TypeScript checker, command-line
interface, deterministic diagnostics, fixtures, tests, and validation-result
production.

## Governed Meaning Realized

The checker implements only behavior allocated by the accepted NKF 0.1
authority pair. It validates conformance; it cannot accept knowledge, confirm
a Realization, determine truth or design quality, or change the contract by
implementation.

The ADR 0054 source-envelope rule is implemented by separating safe YAML front
matter from the CommonMark body before heading and Title Case analysis. Exact
source bytes remain the digest, snapshot, and security-scan input.

## Durable Mapping

| Responsibility | Implementation |
| --- | --- |
| Contract and Schema loading | `src/checker/contracts.ts` |
| Native YAML parsing | `src/checker/yaml.ts` |
| Front matter and CommonMark | `src/checker/markdown.ts` |
| Project paths and snapshots | `src/checker/project.ts` |
| Schema and phase orchestration | `src/checker/checker.ts` |
| Profiles and semantic rules | `src/checker/semantic.ts` |
| Extension resolution | `src/checker/extensions.ts` |
| Security patterns | `src/checker/security.ts` |
| Title Case | `src/checker/titlecase.ts` |
| Diagnostics | `src/checker/diagnostics.ts` |
| CLI | `src/cli.ts` |
| Positive and negative coverage | `fixtures/`, `test/` |

The checker evaluates the accepted phase order from contract loading through
result construction. Unsafe later phases remain not evaluated after an
earlier blocking error.

## Responsibilities And Ownership Boundaries

The checker owns deterministic observation and diagnostics for supported
contracts. Authority resolvers own verification against acceptance
authorities. Extension resolvers own retrieval of accepted extension
contracts. Human review retains semantic adequacy and acceptance.

The latest persisted result is replaceable operational evidence. Test success
and an empty diagnostic list do not accept a record, verify its acceptance
authority, or confirm a later implementation revision.

## Interfaces Dependencies Locators And Resolution

The CLI invokes the library with a candidate project root, trusted contract
root, checker artifact, validation request, and optional authority or
extension resolvers.

The implementation requires Node.js 22 or later and pinned dependencies for
Ajv, CommonMark, YAML, Unicode data, TypeScript, Vitest, and build tooling.
Dependency packages are implementation inputs rather than semantic
authorities.

## External Authority And Operational State Boundaries

The checker does not write knowledge or declarations. With persistence
enabled, it atomically replaces only `.nourd/validation-result.json`.
Execution IDs and timestamps describe one run; workflows, CI state, Git state,
releases, accounts, and consumer operations remain in their authoritative
systems.

## Compatibility Verification And Recovery

ADR 0057 confirms the exact checker source and current derived build after
type checking, 15 test files with 93 passing tests, deterministic build
verification, declaration audit, and passing repository self-validation. The
confirmed build identity is `nourd-nkf-checker` with SHA-256
`2d32d43b43788d3d874c7ffef4e01fa370d6467d93fc5c6f62fb088b269e4bc3`.

The implementation fails closed when trusted contract artifacts mismatch.
Recovery is to restore a confirmed artifact set or govern and confirm a new
one, never to bypass a binding or reinterpret a failing source.
