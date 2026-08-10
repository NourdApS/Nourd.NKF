---
title: "ADR 0106: Confirm The Complete-Set Release Correction"
id: adr-0106
type: decision
summary: Confirm the independently audited technical correction that makes the NKF 0.2 archive and deterministic set enumeration carry the complete frozen set required by already accepted meaning.
created_at: 2026-08-09T18:35:00Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
decision_authority: Codex technical reviewer under the Human Product Owner's explicit delegation for this non-Product technical correction
---

# ADR 0106: Confirm The Complete-Set Release Correction

## Context And Problem

The accepted NKF 0.2 Specification and release protocol require one complete
frozen release set. The published archive enumerated only 15 pre-manifest
members and omitted the governed adopter, host-adapter instruction content,
fixtures, examples, and documentation projection. The Human Product Owner
directed fixing the technical defect and explicitly stated that it carried no
Product-specific decision for another approval round.

The [NKF-020 Complete-Set Release Audit](../evidence/audits/nkf-020-complete-set-release-audit.md)
independently reviewed exact implementation commit
`3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a` and candidate archive SHA-256
`423b56fdb2199f196b65c2cf11f1016fdf81580caca8f76532b52882d48198d5`.

## Decision

On `2026-08-09`, the Codex technical reviewer, under the Human Product
Owner's explicit delegation, confirms the complete-set release correction at
exact commit `3d6ea93c3b3c8ab50684b56bf66f5b0c117ab05a` and the corresponding Draft
current-system revision.

The confirmed implementation uses one explicit 132-member pre-manifest
allowlist shared by release packaging, strict archive verification, public
documentation verification, and the adopter `set` command. With the generated
manifest, the archive contains exactly 133 members. Two separate clean package
processes produced byte-identical archives, extracted tools passed, all source
members matched byte-for-byte, and GitHub exact-commit validation passed.

This confirmation authorizes publishing that corrected unconsumed 0.2 archive
under the existing release direction and [ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception.

## Scope And Applicability

This Decision confirms only the release-tooling and distribution correction
that realizes already accepted NKF 0.2 complete-set meaning. The accepted
authority pair and checker bytes are unchanged.

## Rationale

The audit separates implementation truth from the Product authority boundary:
there is no new format meaning to accept, while release protocol still
requires a separate confirmation act before publication. Explicit delegated
technical confirmation satisfies that boundary without manufacturing a
Product decision.

## Alternatives Considered

Requesting another Product approval was rejected because the Human Product
Owner explicitly classified this as a technical correction with no
Product-specific choice. Weakening complete-set wording was rejected because
the accepted Specification already governs. Publishing before the independent
audit and confirmation was rejected because it would skip release protocol.

## Consequences And Trade-Offs

The corrected archive may now be published and independently re-downloaded.
Its larger exact member list increases archive size and review surface while
removing the gap between accepted frozen-set meaning, deterministic
enumeration, and distributed bytes.

## Non-Claims

This Decision does not:

- publish the archive or update the recommended release catalog;
- migrate any consumer or make recommendation a moving dependency;
- accept a breaking-change classification or signaling policy;
- conclude [NKF-020](../tasks/completed/NKF-020-version-release-adoption-and-compatibility-process.md);
- verify historical acceptance bindings or make Governing Use ready; or
- establish protected merge enforcement.
