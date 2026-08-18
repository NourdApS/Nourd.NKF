---
title: NKF 0.71 Release Notes
summary: The publication-ready migration meaning for NKF 0.71, the deliberately small corrective successor to NKF 0.7 — what is new, what breaks, how to adopt, and how to verify — authored as governed Evidence for the publisher to carry into the release body.
created_at: 2026-08-18T02:10:00Z
---

# NKF 0.71 Release Notes

## What Is New

NKF 0.71 is the deliberately small corrective successor to NKF 0.7, scoped
to the specification and format defects the sixth independent audit
recorded:

- The accepted Specification no longer contradicts itself: the portable
  topology and the neutralization now state one reconciled realizations
  layout — the consolidated current-system record plus `realizations/items/`
  — in prose and executable explicitly, and the vestigial supporting-current
  key is gone from the executable.
- Every copy-forward version label states its true version, including both
  evaluation-policy labels the audit named and two further predecessor-era
  labels found during derivation.
- The deterministic Task conclusion is seal-completing: close, defer, and
  cancel seal the successor baseline through the new
  `mechanically-concluded` claim inside the same transaction — every
  judgment carried, the transitioned Task node conclusion-carried with its
  transition binding, zero fresh review — and a conclusion whose graph
  delta exceeds the closed transition vocabulary fails before mutation.
  A concluded repository never lands one step stale again.
- The public-documentation projection teaches exactly NKF 0.71 and the
  neutral layout, with examples derived from the validating 0.71 fixtures.
- The 0.7-to-0.71 version delta declares two hundred thirteen identical
  rules and exactly two new conclusion rules, so every existing review
  judgment carries by digest identity, and the producer promotion is the
  first in this lineage proven through the digest-bound delta claim alone.

## What Breaks

Nothing breaks for an adopted NKF 0.7 repository: the upgrade is
non-breaking, moves no stable path, succeeds no identity, and changes no
declaration shape. The live support window slides to exactly NKF 0.71 plus
NKF 0.7: repositories declaring NKF 0.6 leave the live window and step
through the immutable published NKF 0.7 archive
(`c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f`), and
older repositories step through their published archives in turn. Every
published predecessor byte remains immutable and retrievable.

## How To Adopt

Run the one public Adopt operation with the shipped adopter:

```text
node nourd-nkf-adopt.mjs --project <project-root>
```

An adopted NKF 0.7 repository receives the non-breaking upgrade: the first
invocation writes the exact delta review template — carried judgments
prefilled by digest identity under the accepted version delta, the computed
required fresh set left to a named reviewer — and stops; rerunning with the
completed review performs the mechanical contract rebind and the
digest-bound baseline conversion in one rollback-capable transaction and
reports `updated`. No repository-owner approval is required. A repeat Adopt
reports `current`. Out-of-window repositories fail closed naming their
exact stepping-stone archive.

## How To Verify

Verify the archive digest independently before trusting any content, then
validate the installed repository:

```text
shasum -a 256 <downloaded-archive>.tar
npm run nkf:check
```

The archive digest must equal the content-addressed release tag exactly.
The complete gate validates the installed contract set, the digest-bound
baseline, and readiness; a successful run establishes conformance for the
observed snapshot only.
