---
title: NKF-027 NKF 0.6 Authority And Compatibility Audit
summary: Fresh independent read-only audit of the exact prospective NKF 0.6 authority set and its required pre-acceptance 0.5-to-0.6 compatibility evidence.
created_at: 2026-08-13T21:27:28Z
---

# NKF-027 NKF 0.6 Authority And Compatibility Audit

## Audit Boundary

This audit is bound to the exact prospective NKF 0.6 authority and evidence
set below. It was performed read-only against the temporary exact authority
bytes, the governed
[compatibility Evidence](nkf-027-nkf-0-5-to-0-6-compatibility-proof.md),
disposable proof artifacts, and a disposable full Git clone of the producer.

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.6.md` | `29b09eed921fdf0db2042b046909d193e2e8999095c41b708adef959187e03b2` |
| `contracts/nkf/0.6/nkf.yaml` | `cdae1762581c7c6ba9a2737c0389bad0cf4699b5796b08fd3cb2414fadc8a7e8` |
| `contracts/nkf/0.6/freshness-policy.yaml` | `a870dc037364776b927e93705655d3f4572407c65852c4e5a258aa7d5bafe4a4` |
| `knowledge/evidence/release/nkf-0.6-producer-promotion.yaml` | `a48c1a1802f23796263124d7331ae6e1f1d585429b004ee59b82d7285418e797` |
| disposable compatibility updater | `1b4b29b7db93bc23dba068e0bd83c466d066e89f962026c3709bab1efbda587a` |
| governed compatibility Evidence | `09b2ba337686b906bc0853067f21534dbad61fef47dcfd856933786855243909` |
| owning NKF-027 Task checkpoint | `c7909e1fc9d34d08eb1ff6fd12482e0f17822e24628f107f98ed19d76885bfb0` |

Any change to an authority, promotion, updater, or governed Evidence byte
invalidates this verdict for the changed target.

## Independent Verification

The fresh audit verified:

- strict YAML parsing for the executable, policy, and promotion input;
- exact Markdown and policy pins inside the executable plus exact Markdown,
  executable, and policy pins inside the promotion input;
- all `63` Specification section declarations and their relationship bases;
- all `14` policy mappings in exact order and structural equality between the
  0.5 and 0.6 policy objects after removing only version and identity;
- the closed nine-operation command-subject matrix, conditional legacy
  reviews, 0.5 baseline carry-forward, both exact producer-promotion stages,
  freshness, sealing, release, and ADR 0109's prepublication/public-adoption
  separation;
- the exact future native Specification declaration, destination path,
  governance state, source digest, and no self-referential acceptance digest;
- every recorded Product, Technology, stale-producer, and ready-producer
  compatibility result through fresh independent reruns;
- source-bound re-sealing of the exact `d753383...` producer baseline at graph
  revision `45abd5ba...3e9c`, covering 271 nodes, 79 authored edges, 118
  accepted Decisions for three purposes, all 14 relationship categories, and
  zero conflicts or diagnostics;
- fail-closed stale-baseline refusal, repeat-current behavior, injected
  rollback, one-hex baseline tamper rejection, and unchanged source inputs;
  and
- the canonical `npm run nkf:check` gate from a disposable full Git clone:
  29 test files and 218 tests passed, 1,294 links were checked, producer full-
  bundle conformance passed with zero diagnostics, acceptance binding was not
  evaluated, and Governing Use remained not-ready.

## Verdict

`CLEAN` for the exact prospective technical authority set and its required
pre-acceptance compatibility prerequisite. The evidence supports classifying
the exact tested update from a valid, ready 0.5 predecessor as non-breaking.
A non-ready predecessor correctly fails before mutation and must undergo any
necessary semantic review and sealing as a separate governed 0.5 operation.

This verdict supplies no authority acceptance, Schema or implementation
confirmation, release readiness, publication, recommendation, adoption,
Realization confirmation, public visibility, remote enforcement, acceptance-
binding verification, or Governing Use readiness. Those facts remain
separate.
