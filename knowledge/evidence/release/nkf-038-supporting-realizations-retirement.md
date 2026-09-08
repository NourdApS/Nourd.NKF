---
title: NKF-038 Supporting Realizations Retirement
summary: Records the retirement of the ten frozen supporting Realizations under realizations/items/ from the working tree to Git history under ADR 0138 item seven — each file's exact SHA-256 at retirement, the Decisions that confirmed it, the record declaration removed with it, the verification that no record or bundle edge targeted any of them, and the commit that removed them — as Evidence of an operational act that accepts nothing.
created_at: 2026-09-08T19:31:11Z
---

# NKF-038 Supporting Realizations Retirement

This records the retirement of the ten frozen supporting Realizations under
[NKF-038](../../tasks/items/NKF-038-release-nkf-0-81-for-public-adoption-and-reconcile-the-record.md),
directed by
[ADR 0138](../../decisions/0138-adopt-the-nkf-0-81-public-adoption-direction.md)
item seven. It is Evidence of an operational act. The accepted bytes of every
retired file remain in Git history at every commit that carried them and in the
release archives that carried them; the Decisions that confirmed them keep
binding those bytes by digest. Nothing here edits, accepts, or confirms.

## Why

Each of the ten was accurate when written between `2026-07-30` and
`2026-08-11` and then frozen as an immutable record. Eight versions, the
public repository, and the protected merge gate later, every one described a
state that no longer exists, and seven sat under the heading "Current System"
in the Realizations map beside the one record that is current. The Human
Product Owner's rule governs: the record exists to be a live, currently true
documentation system, and nothing is kept for the sake of a digest. The
consolidated
[current-system Realization](../../realizations/current-system.md) is the one
current account.

## Preconditions Verified

Before removal, every record declaration under `.nourd/knowledge/records/`
and the bundle declaration were searched for relationships or edges targeting
any of the ten record identities. None existed: each of the ten declared an
empty relationship list at its 0.2 migration, and no other record pointed at
them. Their retirement therefore removes ten isolated nodes from the graph and
severs no edge. The freshness baseline is resealed over the removal by the
ordinary delta review.

## The Retired Records

| Retired source | SHA-256 at retirement | Record declaration removed | Confirmed by |
| --- | --- | --- | --- |
| `knowledge/realizations/items/agent-led-initial-onboarding.md` | `b0a3e4af23f82f3f033a1d4cd419c1cf0b65f7d078a368adde1afc54ed58f603` | `nkf-agent-led-initial-onboarding.yaml` | [ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md), [ADR 0075](../../decisions/0075-confirm-complete-portable-onboarding-topology.md) |
| `knowledge/realizations/items/checker-and-validation.md` | `06b5259ddf9e0870972256971177b018236d291d801dbcdebde95342f75e3d5b` | `nkf-checker-and-validation.yaml` | [ADR 0059](../../decisions/0059-confirm-governed-frontmatter-realization.md) |
| `knowledge/realizations/items/contracts-and-schemas.md` | `1bfeda91ca2e8cfc82187985fafd905d1f89ffc627039d7ccc5736ebe7e219ae` | `nkf-contracts-and-schemas.yaml` | [ADR 0059](../../decisions/0059-confirm-governed-frontmatter-realization.md) |
| `knowledge/realizations/items/initial-greenfield-onboarding.md` | `60b09cb92061104c8fd205661a534b1fb6a3be965bb4d1804963e31589c1d466` | `nkf-initial-greenfield-onboarding.yaml` | [ADR 0068](../../decisions/0068-confirm-initial-greenfield-onboarding.md) |
| `knowledge/realizations/items/layered-contract-enforcement.md` | `720dbdd1552c9b7f0810f52e8ff31cdbb82f4813dbe7d1d4f6d6aa8203efa092` | `nkf-layered-contract-enforcement.yaml` | [ADR 0061](../../decisions/0061-confirm-layered-contract-enforcement-realization.md), [ADR 0062](../../decisions/0062-confirm-remote-workflow-activation-boundary.md), [ADR 0063](../../decisions/0063-defer-protected-merge-gate.md) |
| `knowledge/realizations/items/nkf-0.4-security-maintenance.md` | `e6a9931cc0a6b4865ecde0acb6ffc5fcf4bf969738627a07d3201a99ce934181` | `nkf-0.4-security-maintenance.yaml` | [ADR 0114](../../decisions/0114-confirm-the-nkf-0-4-release-candidate.md) |
| `knowledge/realizations/items/portable-knowledge-topology.md` | `58c6305cef15a4388458456ce93ab9b39b7dbc84466bddead851d0b8ecfa718b` | `nkf-portable-knowledge-topology.yaml` | [ADR 0075](../../decisions/0075-confirm-complete-portable-onboarding-topology.md) |
| `knowledge/realizations/items/release-documentation-and-adoption.md` | `875796c9c84d17f2821974e96b7ee8d8080779d60ad541bad83a8be834159bb5` | `nkf-release-documentation-and-adoption.yaml` | [ADR 0066](../../decisions/0066-confirm-release-documentation-and-adoption.md), [ADR 0070](../../decisions/0070-confirm-agent-led-initial-onboarding.md) |
| `knowledge/realizations/items/release-package.md` | `85765302cd06e77f821dd577406ef954f9a649ed6c3190d5bfce25e0b927985d` | `nkf-release-package.yaml` | [ADR 0059](../../decisions/0059-confirm-governed-frontmatter-realization.md), [ADR 0066](../../decisions/0066-confirm-release-documentation-and-adoption.md) |
| `knowledge/realizations/items/self-hosting.md` | `9315bb1093cbb8e7d13be9d2b7d4c611881cbb86838ca1e1e612da2eaa28ec96` | `nkf-self-hosting.yaml` | [ADR 0061](../../decisions/0061-confirm-layered-contract-enforcement-realization.md), [ADR 0068](../../decisions/0068-confirm-initial-greenfield-onboarding.md) |

The digests are of the files as they stood on `task/NKF-038` immediately
before removal, equal to the digests their record declarations carried. The
last commit carrying every one of them is the parent of the commit that
removed them; the removing commit is named in that commit's own message.

## What Changed Around Them

The Realizations map lists the current-system record alone and states that
the retired records are history. The confirming Decisions above are immutable
and unchanged; their links to the retired paths now resolve as history, which
the link verifier already exempts. No published NKF byte and no accepted
immutable record changed.

## Boundary

This Evidence records one removal at one commit. It accepts no meaning,
confirms no Realization, and does not alter what the confirming Decisions
established about the bytes they bound.
