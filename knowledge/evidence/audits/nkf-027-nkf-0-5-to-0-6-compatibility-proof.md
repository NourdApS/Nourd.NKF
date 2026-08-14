---
title: NKF-027 NKF 0.5 To 0.6 Compatibility Proof
summary: Pre-acceptance fixture and isolated real-producer evidence for the prospective NKF 0.6 non-breaking knowledge-format update, including current-baseline carry-forward, stale-baseline refusal, rollback, tamper rejection, and repeat-current behavior.
created_at: 2026-08-13T21:07:50Z
---

# NKF-027 NKF 0.5 To 0.6 Compatibility Proof

## Scope And Non-Claims

This Evidence supports
[NKF-027](../../tasks/items/NKF-027-correct-and-release-nkf-0-6-with-open-source-licensing.md)
and the compatibility prerequisite adopted by
[ADR 0121](../../decisions/0121-adopt-the-nkf-0-6-corrective-and-licensing-direction.md).
It asks one bounded pre-acceptance question: can an exact, ready NKF 0.5
knowledge graph be advanced to the prospective 0.6 version and policy
coordinates without repository-owner breaking approval, human semantic input,
knowledge loss, or silent review conversion?

The exercise uses a disposable evidence-only updater. It is not the shipped
0.6 adopter, does not install a release, and supplies no 0.6 authority
acceptance, implementation confirmation, conformance, release readiness,
publication, recommendation, producer adoption, Realization confirmation, or
Governing Use claim.

## Exact Prospective Boundary

The proof is bound to these still-prospective bytes:

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.6.md` | `29b09eed921fdf0db2042b046909d193e2e8999095c41b708adef959187e03b2` |
| `contracts/nkf/0.6/nkf.yaml` | `cdae1762581c7c6ba9a2737c0389bad0cf4699b5796b08fd3cb2414fadc8a7e8` |
| `contracts/nkf/0.6/freshness-policy.yaml` | `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4` |
| `knowledge/evidence/release/nkf-0.6-producer-promotion.yaml` | `a48c1a1802f23796263124d7331ae6e1f1d585429b004ee59b82d7285418e797` |

The disposable updater had SHA-256
`1b4b29b7db93bc23dba068e0bd83c466d066e89f962026c3709bab1efbda587a`.
It strict-parsed predecessor and successor YAML, required exact 0.5 and 0.6
authority and policy digests, compared the complete policy objects after
removing only top-level `nkf_version` and `id`, reconstructed graph revisions
through the defined JCS input, and applied structural scalar replacements at
parsed YAML node ranges. It rejected any authority drift and any change
outside the authorized scalar ranges.

## Exact Predecessor Cases

The released NKF 0.5 checker with SHA-256
`95f53b252b57235b6ad5569f45dd9e661b5155318630ca634971b851b6631358`
performed the predecessor whole-root-readiness checks with receipt persistence
disabled.

| Case | Exact 0.5 Precondition | Result |
| --- | --- | --- |
| Product fixture | 4 nodes; graph revision `45c54d9c...242f1`; conformance passed; readiness ready; zero diagnostics | Updated without approval or semantic input; successor revision `639cecf1...0cd1`; only bundle and baseline changed; repeat returned current. |
| Technology fixture | 5 nodes and 1 edge; graph revision `062b9ffc...a813`; conformance passed; readiness ready; zero diagnostics | Updated without approval or semantic input; successor revision `b7324581...720b`; only bundle and baseline changed; repeat returned current. |
| Exact producer commit `d753383...` before current-baseline maintenance | 271 nodes and 79 edges; conformance passed; baseline `c0ef69a9...1677`; candidate graph `45abd5ba...3e9c`; readiness not-ready | Refused before mutation; the complete source snapshot remained unchanged. |
| Exact producer commit `d753383...` after separate current 0.5 review and seal | 271 nodes and 79 edges; graph revision `45abd5ba...3e9c`; conformance passed; readiness ready; zero diagnostics | Updated without approval or semantic input; successor revision `350b5e63...7c02`; only bundle and baseline changed; repeat returned current. |

The exact result artifacts had these SHA-256 digests:

| Result | SHA-256 |
| --- | --- |
| Product fixture update | `f66db5624d4b5e7f6373a7f4b88729697697b8c706b65dbead76dd502e39cc99` |
| Technology fixture update | `123c194a90d8e97308af0ee52213a46fd9a9cbfa3e4b960c50179f697e47f7d6` |
| Stale producer refusal | `ee3e4f374fa97889b147caaa3bba19e67733cf9737696b5194482c961cb6daa3` |
| Current producer update | `3fdc5dcf8967ef499489673664b617cd4b59831422dbde5dbdd1d95aa1a2345c` |

## Separate Predecessor Review Boundary

The committed producer was structurally conformant but not ready because the
published-adoption baseline preceded the current NKF-026 Task bytes. The 0.6
prototype did not repair, infer, or silently replace that semantic review. It
first proved refusal with no mutation.

A separate governed 0.5 whole-root review was then derived from the exact
`d753383961f8adc35e076f2e8bae6c29fd461e85` source. It covered all 271 nodes,
all 118 accepted Decisions for the three required purposes, all 14 relationship
categories and 79 authored edges, four exact observations, and five bounded
limitations. The completed review SHA-256 was
`f659ea83f035c7a3e0a25f5af956d3f20d75f106d0001cfa347eb98bf82e79cb`;
its independent derivation Evidence SHA-256 was
`c6694ff5b5198b7b39bd9947a4cb90dcfb1e3b71fcab5e9b35c012f53c72fe0e`.

The 0.5 sealer accepted that exact review and produced current predecessor
graph revision `45abd5ba73a164a6d78b563c33b9131574ff63a2518da705fc741e63b78f3e9c`.
A fresh 0.5 whole-root-readiness check then passed with zero diagnostics. This
review and seal are predecessor knowledge maintenance, not part of the 0.6
update. The subsequent update consumed no manual semantic input.

## Preservation And Failure Evidence

Every successful case preserved canonical source files, record and document
declarations, predecessor-only locks, node revisions, authored edges, external
dependencies, authority inputs, relationship and applicability coverage,
Decision classifications, observations, limitations, dispute state, and
confirmation. The only changed project files were:

1. `.nourd/knowledge/bundle.yaml`; and
2. `.nourd/knowledge/freshness/baseline.yaml`.

Within those files, only the bundle version and policy coordinates plus the
baseline version, policy coordinates, and deterministically recomputed graph
revision changed. The updater compared every untouched byte segment and then
re-read the successor to prove internal graph-revision reproducibility.

An injected failure after in-memory staging and before project mutation exited
nonzero, created no output project or result, and left the source Product
fixture byte-clean. A baseline whose declared revision was altered by one
hexadecimal character was rejected before mutation because it no longer bound
its own exact graph inputs. These cases distinguish rollback and tamper
rejection from a successful update.

## Compatibility Finding

The exact tested knowledge-format change is non-breaking from a valid, ready
NKF 0.5 predecessor: it requires no repository-owner breaking approval, no
human semantic conversion during update, and no knowledge loss. A missing,
outdated, disputed, ambiguous, or otherwise non-ready 0.5 baseline is not
eligible for automatic carry-forward and fails before mutation. Restoring a
current predecessor baseline remains a separate governed 0.5 review and seal.

This finding satisfies the adopted pre-acceptance compatibility-evidence
boundary for the exact prospective authority bytes. It does not prove the
future adopter implementation, release installation, complete producer
authoring rehearsal, archive, or public adoption. Those remain mandatory
post-acceptance implementation and prepublication evidence under NKF-027.
