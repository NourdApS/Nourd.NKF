---
title: NKF-028 NKF 0.7 Whole-Line Completion Audit
summary: Records the Human Product Owner-directed final independent audit over the complete NKF 0.7 line at the post-confirmation branch head — plan conformance, governance-chain coherence, the post-confirmation commit tail, cross-surface consistency, and executed gates — with its findings and their resolution.
created_at: 2026-08-17T21:30:00Z
---

# NKF-028 NKF 0.7 Whole-Line Completion Audit

After the mandatory technical confirmation in
[ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md),
the Human Product Owner directed one further independent audit over the whole
NKF 0.7 line to verify that everything is according to plan, coherent, and
consistent. A fresh independent reviewer agent with no part in producing the
candidate performed that audit. This Evidence records its exact subject,
scope, verdict, and the resolution of its findings.

## Exact Subject

| Binding | Value |
| --- | --- |
| Audited branch head | `cfdc3a56` on `task/NKF-028` (post-confirmation) |
| Confirmed release commit | `e5b265e87da6c12b73b4749f8d24b41b996cc77a` |
| Confirmed archive SHA-256 | `c5ee783cd56c75fff2b19e8ae897e70954be2a82a6f0ce646270dc059c3df94f` |
| Bound confirmation | [ADR 0129](../../decisions/0129-confirm-the-nkf-0-7-release-candidate.md) |

## Scope The Auditor Covered

- Plan conformance: every
  [NKF-028](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
  acceptance criterion, scope item, and Human Direction boundary verified
  against actual bytes and test evidence, not against produced reports.
- Governance-chain coherence: ADR 0126 through ADR 0129, the three release
  evidence documents, and the NKF-025 and NKF-026 closes, with all digest
  chains recomputed — eighteen digest computations, all matching, and the
  candidate archive independently rebuilt byte-identically from the release
  commit.
- The post-confirmation commit tail between the confirmed release commit and
  the branch head: four commits, fourteen files, verified to touch no archive
  member and no accepted authority byte.
- Cross-surface consistency: specification, shipped adopter, shipped
  guidance, support window, front page, and release notes.
- Executed verification: the complete producer handoff gate passed with
  empty diagnostics and the full suite passed two hundred twenty-eight tests,
  both run by the auditor.

## Verdict

One should-fix finding and three note-severity observations. Nothing
invalidates the confirmed candidate bytes: the confirmed release commit,
archive, checker, and adopter digests all still equal the values bound by
ADR 0129.

## The Should-Fix Finding And Its Resolution

The acceptance criterion that the recommended-release verifier carries no
hand-edited version literal was not delivered: at the audited head,
`scripts/verify-recommended-release.mjs` still hard-coded the current
version, the complete compatibility table, and the pinned release digests,
and the Task close recorded no exception for it. The resolution, applied
after this audit in the same Task: the verifier now derives every
expectation from a per-version recommended-release binding registry in the
governed release-constants module, each entry bound to its accepting
Decision, with an unregistered version failing closed; the verifier itself
carries no version literal, and the confirmed 0.7 binding is pre-registered
so the separately authorized publication requires no verifier or registry
edit. The
[NKF-028](../../tasks/items/NKF-028-release-nkf-0-7-with-verifiable-delta-review.md)
Completion Result records the late delivery. The verifier is not an archive
member, so ADR 0129's confirmed bytes are unaffected.

## Note-Severity Observations

- The revised authority accepted by
  [ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md)
  was verified after its revision at digest-binding level by the release
  audit, while the three-round adversarial authority audit had bound the
  superseded ADR 0127 digests. This whole-line audit subsequently verified
  the revised rule text semantically across specification, shipped adopter,
  and shipped guidance at the branch head. Whether that coverage satisfies
  the fresh-independent-audit expectation for the narrow revision remains a
  judgment for the Human Product Owner to make knowingly.
- The producer's sealed whole-root baseline predates the confirmation and
  close commits, so the merged default branch will carry governed nodes not
  yet covered by a sealed review until the separately authorized live 0.7
  promotion performs its whole-root review. The gate passes truthfully — 
  readiness is reported as a separate fact — and the promotion is the
  designed resolution.
- Two acceptance criteria — the bundle root record stating the delivered 0.7
  reality, and every governed path resolving at a neutral location — are
  satisfied in the promoted producer state proven by the candidate exercise
  and its tests, not at the pre-promotion branch head. This is the designed
  two-stage promotion boundary: the live repository exhibits them only after
  the separately authorized live promotion.

This Evidence records audit facts and their resolution. It does not itself
accept, publish, recommend, confirm, or re-open anything.
