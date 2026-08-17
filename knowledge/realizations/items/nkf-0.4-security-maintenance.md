---
id: nkf-0.4-security-maintenance
type: realization
title: NKF 0.4 Security Maintenance
summary: This Realization maps the accepted NKF 0.4 maintenance pair to its patched dependency closure, derived contracts, release set, checker, adopter, compatibility behavior, and verification surface.
created_at: 2026-08-11T14:46:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-024
confirmation_status: confirmed
confirmation_decisions:
  - adr-0114
---

# NKF 0.4 Security Maintenance

## Realization Identity And Kind

This is the successor Realization for the bounded NKF 0.4 dependency-security
maintenance release. It supplements the consolidated current-system view and
does not replace the immutable NKF 0.3 release evidence.

## Governed Meaning Realized

The implementation derives from the exact authority pair accepted by
[ADR 0113](../../decisions/0113-accept-the-nkf-0-4-authority-pair.md) under the
maintenance boundary fixed by
[ADR 0112](../../decisions/0112-allocate-nkf-0-4-security-maintenance.md).
It preserves NKF 0.3 format behavior while allocating separately frozen 0.4
bytes, classifying 0.3-to-0.4 as non-breaking without knowledge migration or
breaking approval, and retaining the breaking approval gate for 0.1 and 0.2.

## Durable Mapping

| Responsibility | Implementation |
| --- | --- |
| Accepted authority and Schemas | `knowledge/specifications/nkf-0.4.md`, `contracts/nkf/0.4/` |
| Patched dependency closure | `package-lock.json` |
| Exact authority dispatch | `src/checker/bindings.ts`, `src/checker/checker.ts`, `src/checker/types.ts` |
| Complete-set enumeration and packaging | `contracts/nkf/0.4/release-set.yaml`, `scripts/release/`, `scripts/package-release.mjs` |
| One-operation compatibility and adoption | `scripts/adoption/nourd-nkf-adopt.mjs` |
| Portable protocols and host guidance | `distribution/nkf/0.4/`, `public-docs/` |
| Product and Technology examples | `fixtures/valid/*-0-4/`, `public-docs/examples/` |
| Security and predecessor regression coverage | `test/dependency-security.test.ts`, `test/adopter.test.ts`, `test/contracts-0-4.test.ts`, `test/release-set-0-4.test.ts` |
| Deterministic distributed executables | `dist/nourd-nkf-checker.mjs`, `dist/nourd-nkf-adopt.mjs` |

The 0.4 release set enumerates 136 members across the same 18 closed classes as
0.3. The additional member is the 0.4 public Specification reference; no
format class or distribution surface is added.

## Responsibilities And Ownership Boundaries

The accepted Specification owns meaning. The lockfile owns exact dependency
resolution, the builders own reproducible executable derivation, and the
release set owns complete archive membership. Tests and audits provide
evidence; they do not accept the pair or confirm this Realization.

Consumer repositories retain authority for their knowledge and deliberate
adoption. The public adopter may update version declarations and managed
integration only through the accepted compatibility route; it cannot reinterpret
consumer meaning.

## Interfaces Dependencies Locators And Resolution

Ajv and `ajv-formats` exercise the bundled `fast-uri` parser at the local JSON
Schema format boundary. The lock resolves patched `fast-uri` `3.1.5`. The test
toolchain resolves patched development-only `nanoid` `3.3.18`; `nanoid` is not
bundled into either distributed runtime.

Public Adopt resolves one exact recommended catalog and content-addressed
archive. An installed 0.3 consumer stages its bundle coordinate, governed
artifact digests, pin, receipt, and managed integration as one rollback-capable
transaction while preserving its knowledge tree. The producer preserves its
stronger pinned-first host-superset validation chain.

## External Authority And Operational State Boundaries

Git owns commits and history; Github owns tags, Releases, assets, pull-request
state, and workflow observations; the npm advisory service owns time-bound
advisory reports. [ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md)
confirms the exact release commit, checker, adopter, lock, and candidate archive
after the independent audit. Publication, recommendation, and ordinary
producer adoption remain separate facts and are not claimed by confirmation.

## Compatibility Verification And Recovery

Verification requires the canonical authoring gate, deterministic builds,
zero known npm advisories, exact historical predecessor reproduction, complete
release-set and manifest binding, Product and Technology fixtures, non-breaking
0.3 adoption with byte-identical knowledge, approval-gated preserving 0.1 and
0.2 migrations, rollback, tamper rejection, and repeat `current` behavior.

The confirmed candidate was reconstructed and exercised from fresh isolated
source before technical confirmation. Publication must use exactly those
audited bytes, and ordinary producer adoption requires a second fresh audit.
Recovery restores an immutable known-good pin or performs a later governed NKF
version; it never rewrites frozen 0.3 or 0.4 release members.
