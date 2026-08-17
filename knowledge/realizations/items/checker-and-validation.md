---
id: nkf-checker-and-validation
type: realization
title: NKF Checker And Validation
summary: This Realization describes the native TypeScript checker, command-line interface, deterministic diagnostics, fixtures, tests, and validation-result production.
created_at: 2026-07-30T17:16:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-010
confirmation_status: confirmed
confirmation_decisions:
  - adr-0059
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

The [ADR 0058](../../decisions/0058-governed-frontmatter.md) source-envelope rule is implemented by separating safe YAML
frontmatter from the CommonMark body before document-class and heading
analysis. Applicable record sources and Markdown non-records require common
orientation. Record identity and governance must equal the declaration;
Design disposition, Realization confirmation, Task identity and state, and
their references are checked according to their separate vocabularies.
Evidence is exempt only when its representation explicitly classifies it as
Evidence. Exact source bytes remain the digest, snapshot, and security-scan
input.

## Durable Mapping

| Responsibility | Implementation |
| --- | --- |
| Contract and Schema loading | `src/checker/contracts.ts` |
| Native YAML parsing | `src/checker/yaml.ts` |
| Front matter and CommonMark | `src/checker/markdown.ts` |
| Governed frontmatter and reference graph | `src/checker/checker.ts` |
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

[ADR 0059](../../decisions/0059-confirm-governed-frontmatter-realization.md) confirms the exact checker source and current derived build after
type checking, 15 test files with 102 passing tests, deterministic build
verification, frontmatter and declaration audit, and passing repository
self-validation. The confirmed build identity is `nourd-nkf-checker` with
SHA-256 `a35cbcc2d267748409b913454d1befc7c640a4e4a8dd1487f3acdb8d285233b7`.

The implementation fails closed when trusted contract artifacts mismatch.
Recovery is to restore a confirmed artifact set or govern and confirm a new
one, never to bypass a binding or reinterpret a failing source.
