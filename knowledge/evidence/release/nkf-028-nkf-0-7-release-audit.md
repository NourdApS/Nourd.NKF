---
title: NKF-028 NKF 0.7 Release Audit
summary: Records the fresh independent audit of the exact NKF 0.7 release candidate — archive, manifest, authority bindings, guidance-review verification, repository truthfulness, gates, and tests — that the mandatory technical-confirmation Decision binds.
created_at: 2026-08-17T18:00:00Z
---

# NKF-028 NKF 0.7 Release Audit

The accepted release protocol requires a fresh independent audit of the exact
candidate, including verification that the guidance review was performed
against the actual rule diff, before the mandatory technical-confirmation
Decision. A fresh independent reviewer agent with no part in producing the
candidate performed that audit. This Evidence records its verdict and the
exact subject.

## Exact Subject

| Binding | Value |
| --- | --- |
| Release commit | `e5b265e87da6c12b73b4749f8d24b41b996cc77a` |
| Archive SHA-256 | `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |
| Checker SHA-256 | `64751e77af081ae795e60ebd7f68132548e0c71b101ba78ac9e2e9d7fd1ce70a` |
| Adopter SHA-256 | `e565978a73f625bc43992291a43d253966ec67168312b2571deff1822c88a360` |

## Verdict

CLEAN — no blocking-confirmation and no should-fix findings. Two
note-severity observations: one pre-existing README sentence about the 0.3
archive that reads stale beside the updated status but makes no false claim,
and the recorded fact that the producer-promotion input is deliberately a
repository-side artifact bound by its accepting Decision rather than an
archive member.

## Mechanical Verifications The Auditor Performed

- Repository state: the audited worktree stood exactly at the release commit
  with a clean tree.
- Archive integrity: the tar's computed digest equals its content-addressed
  name; the manifest declares version 0.7 and the exact release commit; all
  one hundred sixty-four member digests were computed and matched, with zero
  missing and zero extra files, across authority, checker, adopter,
  protocols, skills, host adapters, fixtures, schemas, and license members.
- Authority binding: the archive's four authority artifacts carry exactly
  the digests accepted by
  [ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md),
  byte-identical to the worktree copies; the checker digest matches the
  claimed value.
- Producer-promotion coherence: the promotion input's digest equals the
  accepted binding, and its embedded declaration declares the exact native
  identity, provenance, and governance the promotion creates, with its
  specification binding equal to the archive's specification digest.
- Guidance-review verification: every claim of the
  [guidance review](nkf-028-nkf-0-7-guidance-review.md) was verified on the
  shipped bytes — the 0.7 adoption surface, the Git transition orchestration
  and policy-declared judgment dependencies in the authoring protocol,
  correct version markers on all eight guidance files, byte-identical skill
  twins, no stale pre-0.7 claims outside legitimate migration context, and
  every guidance-named command and flag present in the shipped adopter's
  parser with the repository-owner approval value enforced.
- Release-set completeness: the accepted release-set coverage expands to
  exactly the manifest member set in both directions.
- Repository truthfulness: the front page states 0.6 revision 3 as current
  and 0.7 as the accepted successor pending separately authorized acts; the
  only active Task is
  [NKF-028](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md);
  the validation and implementation predecessors stand completed; the gate
  carries twelve proven rows with no exception.
- Gates and tests run by the auditor: the complete producer handoff gate
  passed with empty diagnostics, and the full suite passed twenty-five files
  and two hundred twenty-eight tests.

In total the auditor performed one hundred seventy-one digest computations,
all matching their bound values.

## Candidate Exercise This Audit Covers

The audited candidate had completed the isolated exact-candidate exercise:
candidate-bound promotion into a fresh clone of the exact release commit
returned `updated`, the promoted producer's complete gate passed including
its full test suite, a second invocation returned `current` with the
host-superset integration preserved, and one hundred sixty-four source
members were byte-reproduced from the release commit. The prepublication
whole-root review — the deliberate last whole-root review this lineage
requires at that stage — was completed by the delegated technical reviewer,
re-affirming two hundred ninety-one carried judgments and freshly judging
the seven nodes new in 0.7.

This Evidence records audit facts. It does not itself accept, publish,
recommend, or confirm anything.
