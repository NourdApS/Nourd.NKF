---
id: adr-0041
type: decision
summary: ADR 0031 establishes the private Node.js 22 TypeScript ESM development package, validation-only responsibility, and portable checker identity. ADRs 0034 through 0040 govern all authority findings exposed during implementation and establish the exact current NKF 0.1 authority and source-bound schemas.
created_at: 2026-07-30T07:57:12Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Codex technical reviewer, acting under the Human
---

# ADR 0041: Confirm Native Checker Development Realization

  Product Owner's authorization to confirm the exact technical realization
  after independent audit
- **Source Checkpoint:**
  `f06ebb5c514f9549b0dfb34a910dbdb3d4349edd`
- **Portable Checker Identity:** `nourd-nkf-checker`

## Context

ADR 0031 establishes the private Node.js 22 TypeScript ESM development
package, validation-only responsibility, and portable checker identity. ADRs
0034 through 0040 govern all authority findings exposed during implementation
and establish the exact current NKF 0.1 authority and source-bound schemas.

Checker code, tests, or a Git commit cannot accept format meaning or consumer
knowledge. A development Realization may nevertheless be confirmed separately
when one immutable source checkpoint is shown to implement the already
accepted authority without unresolved conformance-critical findings.

## Confirmed Binding

The confirmed development Realization binds:

| Artifact | SHA-256 |
| --- | --- |
| Canonical Markdown | `2274d569d147eadd658de8e8f00a790630be1f30a5303f3c608b085fac020f48` |
| Executable YAML | `7fc193f8622f8068c56a24fc5f4cfbe11ea2787f3bba3bb612f9a39d49f8e413` |
| Bundle Schema | `7718ad7ffdc5cf8884b68b163edef58cb3b080eec6316ec4edc7e79de52208b4` |
| Record Schema | `3e28f6549e1139a813102f4786b491a02af2c5e0c92eedf06290d59a79206273` |
| Validation-Result Schema | `33386af81143415adbb48a365d6b00571cfed31fa3072c1e30ecd9d306802e12` |
| Reproducible Development Executable | `f64d772cb628d6c1fe7dd337baceecb75007fdabe74f91bd87971e063a362d0c` |

The executable is a reproducible local build output of the source checkpoint.
It is intentionally ignored by Git and is not a release or distribution
artifact.

## Review Evidence

The reviewer audited the exact clean source checkpoint and confirmed:

- `npm run check` passes TypeScript checking, 74 tests in 11 files, the
  portable build, and build verification;
- the exact Markdown/YAML pair parses safely, binds correctly, and has
  115-rule identity and severity parity;
- every stable rule identity has an implementation reference and a fixture
  assertion reference;
- all 35 participating canonical headings pass the accepted Unicode 17
  Title-Case algorithm;
- all three schemas are duplicate-free, compile strictly with Ajv `8.20.0`
  and `ajv-formats` `3.0.1`, retain unchanged assertion graphs after removing
  `x-nkf-source`, and pass 32 focused probes;
- two consecutive builds produce the same executable SHA-256;
- the built CLI passes the minimal fixture with every required phase passed
  and zero diagnostics;
- an uninitialized project exits at the execution level with status `2`,
  writes no JSON to standard output, creates no `.nourd`, and persists no
  result;
- 285 current local Markdown links resolve, with unresolved links confined to
  immutable partial source snapshots;
- the native secret registry finds no match in 142 current reviewed
  Markdown, YAML, JSON, TypeScript, and build-script files;
- `npm audit --audit-level=high` reports zero known vulnerabilities at review
  time; and
- Git object integrity passes and the committed worktree remains clean after
  verification.

## Decision

The implementation at source checkpoint
`f06ebb5c514f9549b0dfb34a910dbdb3d4349edd`, producing development executable
SHA-256
`f64d772cb628d6c1fe7dd337baceecb75007fdabe74f91bd87971e063a362d0c`,
is confirmed as the native NKF 0.1 **development Realization** of the exact
authority and schemas bound above.

This confirmation is implementation evidence at one immutable checkpoint. It
does not let later source, dependency, contract, schema, or build changes
inherit confirmation by implication.

## Non-Claims

This Decision does not:

- accept or change NKF format meaning;
- accept, validate, migrate, or conform any consumer knowledge;
- establish a public package, installer, provenance envelope, signature,
  release, tag, compatibility promise, support policy, or security response
  process;
- establish a continuous-integration or repository-protection gate;
- confirm behavior for an unaccepted extension or external resolver;
- claim comprehensive secret detection; or
- make the ignored local build output a distributable artifact.

Distribution and release realization require separately governed work.
