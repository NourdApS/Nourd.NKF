# NKF-024 Dependency Security Baseline

## Evidence Boundary

This Evidence records the clean merged NKF 0.3 producer source inspected on
`2026-08-11` at commit `8c7916d4c9ce18dbc00a4fa0e1a8f33f671036fe`
before NKF 0.4 dependency maintenance. It supports
[NKF-024](../../tasks/active/NKF-024-release-nkf-0-4-dependency-security-maintenance.md)
and accepts or confirms nothing.

## Reproduced Advisory State

`npm ci` installed the exact lock and `npm audit --json` reported two known
high-severity affected transitive packages and no other advisory:

| Package | Locked Version | Dependency Path | Affected Range | Patched Version |
| --- | --- | --- | --- | --- |
| `fast-uri` | `3.1.4` | production `ajv` `8.20.0` → `fast-uri` | `>=3.0.0 <3.1.5` | `3.1.5` |
| `nanoid` | `3.3.16` | development `vitest` → `vite` → `postcss` → `nanoid` | `<3.3.17` | `3.3.17` |

The advisory identities are
[`GHSA-7p8r-x3mc-p8w7`](https://github.com/advisories/GHSA-7p8r-x3mc-p8w7)
for `fast-uri` host confusion and
[`GHSA-2v37-7h3g-55p8`](https://github.com/advisories/GHSA-2v37-7h3g-55p8)
for the `nanoid` zero-size custom-generator loop.

## Exact NKF Reachability Assessment

The frozen adopter accepts only repository `kaveh6202/Nourd.NKF`, derives the
tag and asset name from an independently pinned full SHA-256, and invokes
`gh release download` with those exact values. It does not use `fast-uri` to
approve an untrusted host and then pass the same value to Node `fetch` or URL
network consumers. The checker bundles `fast-uri` through AJV for local Schema
identifier and reference handling, but configures no automatic remote Schema
retrieval. The advisory's host-policy/use desynchronization path is therefore
not observed in the current shipped NKF boundary.

`nanoid` is marked development-only in the lock, enters through the test stack,
is not imported by NKF source, and is not required by the distributed checker
or adopter runtime. No shipped NKF operation calls `customAlphabet` or
`customRandom` with attacker-controlled size zero.

These are bounded code-path findings, not a general claim that affected
packages are safe. Both affected resolutions remain present and compatible
patched versions are available, so
[ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md)
allocates the correction to a new immutable NKF version.

## Baseline Validation

The first active NKF-024 snapshot, before dependency changes, passed the
installed NKF 0.3 producer gate: 25 test files, 202 tests, 988 living links,
deterministic checker, adopter and 63-file public projection builds, and
full-bundle self-validation with zero diagnostics. The same snapshot retained
the two npm advisories above; NKF conformance and dependency-advisory state are
separate facts.
