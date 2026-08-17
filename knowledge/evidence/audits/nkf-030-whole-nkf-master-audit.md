---
title: NKF-030 Whole-NKF Master Audit
summary: Records the Human Product Owner-directed independent audit of the complete repository at the merged default branch after the NKF 0.7 release and adoption — adoption completeness, documentation currency, plan conformance, readiness for use, and the fitness of the accepted NKF 0.7 Specification as a Living Governed Knowledge Format — with every finding and its disposition.
created_at: 2026-08-17T23:55:00Z
---

# NKF-030 Whole-NKF Master Audit

After merging the NKF 0.7 release and adoption pull requests, the Human
Product Owner directed one independent audit of the whole repository at
`master`, requiring coherence, current documentation, conformance to plans,
complete adoption, readiness for use, and a fitness review of the accepted
NKF 0.7 Specification itself. A fresh independent reviewer agent with no
part in producing 0.7 performed the audit. This Evidence records its exact
subject, verdicts, findings, and their disposition.

## Exact Subject

| Binding | Value |
| --- | --- |
| Audited commit | `c629d388b72e910e3f9b15d8b7f2cc9751ad8912` (`master`, clean tree) |
| Confirmed release commit | `e5b265e87da6c12b73b4749f8d24b41b996cc77a` |
| Published archive SHA-256 | `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |

## Per-Section Verdicts

- Adoption completeness: fail on two blocking findings; every binding,
  digest, pin, succession, neutral-path, recommendation, and publication
  fact verified exactly, including an independent re-download of the
  published archive hashing byte-identically to the confirmed digest.
- Documentation currency: fail on stale current-state claims in navigation
  surfaces; the root record, current-system Realization, guidance twins,
  and generated indexes verified current.
- Plan conformance: pass — every ADR 0128 and
  [ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md)
  binding recomputed and matched, the governance chain and evidence
  documents agree with the bytes, and the recorded
  [NKF-028 correction](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
  is delivered — with the blocking findings falsifying two close-time
  claims on the merged state.
- Ready to be used: yes mechanically — the published archive, catalog, and
  shipped 0.7 adoption protocol verify end to end and every guidance-named
  command exists in the shipped adopter — with the caveat that the shipped
  public-documentation projection still teaches the predecessor format.
- Specification fitness: fit-with-caveats, detailed below.
- Executed verification: the auditor ran the complete gate and suite; one
  test failed (the first blocking finding), two hundred twenty-seven of two
  hundred twenty-eight passed, and both `master` merge commits failed the
  remote workflow.

## Findings And Disposition

| Finding | Severity | Disposition |
| --- | --- | --- |
| The producer-rehearsal test materializes the 0.6 producer from the merge base of `master` and `HEAD`, which on the merged default branch is the promoted 0.7 producer, so the gate, suite, and workflow are red on `master` | blocking | Repaired by this Task: merge-state-independent materialization |
| The sealed baseline is one step behind `master`'s graph because the deterministic NKF-029 close changed the graph after that Task's final seal | blocking | Instance resealed by this Task; the underlying close-and-seal ordering gap defers to NKF 0.71 |
| The accepted 0.7 Specification contradicts itself: its topology chapter still requires the `realizations/current/` index while its neutralization abolishes that tree, and the executable companion silently omits the requirement | blocking | Deferred to NKF 0.71: accepted bytes are immutable and require a governed successor revision |
| The front page Start Here section names the 0.6 authority and routes adoption to the frozen NKF 0.2 protocol | should-fix | Repaired by this Task |
| The specifications index asserts superseded producer states in the present tense | should-fix | Repaired by this Task |
| The Tasks front page lists the completed adoption Task as active | should-fix | Repaired by this Task |
| The published archive's public-documentation projection teaches NKF 0.6 and the state-baked layout | should-fix | Deferred to NKF 0.71: the projection is frozen release content |
| The accepted Specification's evaluation-policy section carries copy-forward version-label errors | should-fix | Deferred to NKF 0.71 |
| The frozen NKF 0.2 process roots are presented by the current-system Realization as current process sources | should-fix | Row corrected by this Task; working-tree cleanup of predecessor process and distribution trees defers to NKF 0.71 |
| The Evidence index stops before the NKF 0.7 release evidence; assorted note-severity observations on historical prose, legacy human-facing links, and predecessor distribution trees | note | Index completed by this Task; the rest recorded here for NKF 0.71 planning |

## Specification Fitness

The auditor read the accepted Specification in full against its executable
companion, policy, and version delta, and judged it fit-with-caveats as a
Living Governed Knowledge Format. Verified strengths: the deterministic
algorithms — graph revisions, closure computation, basis digests, carry
preconditions, delta claims — are specified precisely enough for an
independent implementer to build a conforming checker and adopter from the
text and schemas alone; the digest-bound review carry is the strongest
part, with carried and performed judgments mechanically distinguishable and
forged carries refused, proven live by the producer's own promotion and
delta reviews. The caveats: the topology self-contradiction above; the
version-label errors above; the structural close-and-seal ordering gap, of
which the stale-baseline finding is the first live occurrence; review
quality remaining an accountable claim rather than a measurable one, with
nominally reviewed stale prose recurring on 0.7's own first artifacts;
hand-maintained navigation prose that can contradict declared state; and
the single-producer shape, with no multi-writer semantics defined — honest
against the standing fact of zero external adopters.

## Mechanical Verification The Auditor Performed

Ten exact digests recomputed and matched, including every ADR 0128 and
ADR 0129 binding and the freshly downloaded published asset; the complete
gate, pinned verification, self-validation, recommended-release
verification, link and guidance verifiers, and full suite executed; the
failing test reproduced in isolation and its cause proven against a
pre-close snapshot; the remote workflow failures confirmed on both merge
commits; guidance twins and skills diffed byte-identically; the shipped
adoption protocol's every named command and flag located in the published
adopter; the release-set class expansion reconciled against the audited
projection findings.

This Evidence records audit facts and dispositions. It does not itself
accept, confirm, re-open, or repair anything.
