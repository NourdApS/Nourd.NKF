---
title: NKF-028 NKF 0.7 Independent Authority Audit
summary: Records the three-round independent adversarial audit of the exact NKF 0.7 candidate authority set that the Human Product Owner required before delegated acceptance, including every finding, every fix, and the final clean digest-chain verification.
created_at: 2026-08-17T09:00:00Z
---

# NKF-028 NKF 0.7 Independent Authority Audit

The Human Product Owner conditioned delegated acceptance of the NKF 0.7
authority on an independent audit. Three adversarial audit rounds were
performed by independent reviewer agents that had no part in deriving the
authority. This Evidence records their verdicts, findings, and the exact
resolution of each finding, as the pre-acceptance evidence NKF-028 requires.

## Round 1: Full Authority Audit

Subject: the complete candidate authority set at branch commit `f82f2f0`
(specification digest `872338ec36143262afe62f87e13eade079a1bcd8e4e7ee951d2c48b4fd10063e`).
Method included computed digest verification of all authority files, a
mechanical rule-table-to-registry diff (213 = 213, triples identical), and
complete version-delta coverage verification against both registries.

Verdict: FINDINGS — eight, two blocking acceptance.

1. Blocking: the `coverage-incomplete` baseline state reached prose, rule
   table, and schemas but not the executable companion's closed
   `baseline_state` enums or the Validation Result prose.
2. Blocking: the judgment-to-depended-rule function that the carry
   precondition and closure computation reference was defined nowhere,
   breaking the reproducibility claim of the delta-review mechanism.
3. Should-fix: the seed registry diff compares only declared attributes, so
   semantically changed rules with unchanged attributes
   (`markdown.reference.deep-link.required`,
   `knowledge.path.stability.invalid`) passed as `identical` unjudged.
4. Should-fix: the identity succession the promotion applies was described
   as "declared by this revision" but appeared in no authority file.
5. Note: "the deliberate last whole-root review" was singular while the
   contract requires one per authorized producer stage.
6. Note: one rule-table blocking cell (`conformance when supported`) sat
   outside the closed blocking enum.
7. Note: the many-to-one legacy stable-path mapping lets a historically
   mistargeted sibling-directory link in a locked source resolve; confined
   to checker-verified predecessor locks.
8. Note: list punctuation defect in Unresolved Matters.

Resolution: all eight fixed in commit `b6cc55e`. The dependency function is
now declared: the accepted evaluation policy carries closed
`judgment_dependencies` rule-identifier lists per judgment kind, the
specification and executable bind the carry precondition and closure to
exactly that declaration, and the review-template tool refuses cross-version
carries for any kind whose listed rules are not `identical` under the
accepted version delta. The two under-classified rules were reclassified
`semantically-new`, the reviewer obligation was extended to confirming
`identical` classifications against predecessor prose, the one accepted
identity succession (`nkf-0.1-native-realization` to `nkf-current-system`,
producer-only) was declared in the specification and the executable, and
finding 7 was recorded in the specification as a deliberate, narrowly
confined consequence.

## Round 2: Fix Verification And Regression Hunt

Subject: branch commit `b6cc55e` (audited through `24ba64a`, whose changes
were outside the authority files). A fresh independent auditor verified each
claimed fix on the bytes and hunted for regressions.

Verdict: all eight round-1 findings verified FIXED, including explicit
adversarial acceptance of excluding enforcement-presence rules from the
`decision_classification` dependency list. One blocking regression and four
lesser findings:

- N1 blocking: commit `b6cc55e` changed the policy and version-delta bytes
  without rebinding their digests inside the executable companion, leaving
  the authority set self-contradictory. Root cause: the digest freeze script
  did not rewrite those two fields.
- N2 should-fix: one residual migration-prose baseline-state enumeration
  omitted `coverage-incomplete`.
- N3 note: schema enum member order differed from the executable's.
- N4 note: the `judgment_dependencies` schema arrays lacked `uniqueItems`.
- N5 note: two dead README links to removed 0.5 authority paths.

Resolution: all five fixed in commit `b010a3b`. The freeze script now
rebinds the policy and version-delta digests inside the executable before
the schemas bind the executable digest; all downstream digests, schemas,
checker bindings, the release set, the declaration, and the serialized
promotion input were regenerated against the exact rebound bytes.

## Round 3: Targeted Digest-Chain Verification

Subject: branch commit `b010a3b`. A third independent auditor verified all
five round-2 fixes and the complete digest chain, computing every digest.

Verdict: CLEAN. The executable's three declared digests equal the computed
file digests; all seven schemas bind the exact authority pair; the checker
bindings carry exactly the computed digests; the promotion input's four
bindings and its own bundle-declared digest verify; every remaining
baseline-state enumeration is complete or carries a catch-all; enum order,
uniqueness constraints, and README links verify; the link sweep passed all
checked links. One observation outside audit scope: the README
"Current Status" prose predates this branch and awaits the 0.7 release
authoring.

## Accepted Result

The audited authority set this evidence covers is exactly:

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.7.md` | `5fb91a603982de9741400a95809d359b79aa2883d08d7b4e36d150c9ff204ef0` |
| `contracts/nkf/0.7/nkf.yaml` | `936c1795fe2facc83cb4c80c82d37fa6622293b24b4e10a70174baf56f86fe9a` |
| `contracts/nkf/0.7/freshness-policy.yaml` | `7bee48aac0fef1b1cc968efa25f2a6fb2205c77a0ec3fcf6c82ec17cdd5eeee0` |
| `contracts/nkf/0.7/version-delta.yaml` | `dcc65c82512c73a204223a3bac990c951f44e995d5859426479042dbef8fcb37` |
| `knowledge/evidence/release/nkf-0.7-producer-promotion.yaml` | `afd411e37976f7543ef132a48ccebe5a948dcae7f7377295a09d860c8ab7fc84` |

This Evidence records audit facts. It does not itself accept, publish,
recommend, or confirm anything.
