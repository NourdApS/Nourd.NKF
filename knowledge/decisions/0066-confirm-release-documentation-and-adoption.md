---
id: adr-0066
type: decision
summary: Confirm the exact audited NKF-008 successor Realizations and complete the Task for the current internal release, public documentation, and pinned consumer-adoption scope.
created_at: 2026-07-31T02:57:30Z
record_lifecycle: immutable
record_status: accepted
task: NKF-008
---

# ADR 0066: Confirm Release Documentation And Adoption

- **Confirmation Authority:** Codex technical reviewer under the Human Product
  Owner's explicit delegation to complete, independently audit, confirm,
  commit, and push NKF-008
- **Predecessors:** ADRs 0064 and 0065

## Context And Problem

ADR 0064 adopts the exact release, public-documentation, and pinned-adoption
direction. ADR 0065 confirms the exact release-bound checker and authority
inputs. Neither Decision confirms that the release, public projection,
consumer path, or current successor Realizations exist.

NKF-008 can complete only after separate operational Evidence establishes
publication and execution, an adversarial audit repairs every material
finding, and a distinct authority act confirms exact Realization revisions
without deriving confirmation from passing checks.

## Decision

The authorized technical reviewer confirms these exact successor
Realizations:

| Record | Source | Confirmed SHA-256 |
| --- | --- | --- |
| `nkf-0.1-native-realization` | `knowledge/realizations/current-system.md` | `ca5df7fe34857f14102a2b7b37f0141fbde80856a58285e7ee6443063c28624c` |
| `nkf-release-documentation-and-adoption` | `knowledge/realizations/current/release-documentation-and-adoption.md` | `962f4686070f4a8820c5e849a59bae9447fc2b2a99a1bead056ee305e9c7d8c0` |
| `nkf-release-package` | `knowledge/realizations/current/release-package.md` | `12c785bb892bf4533056c25ada402eda7c1412c6c7f8e39dc6cdf93cbf76854d` |
| `nkf-layered-contract-enforcement` | `knowledge/realizations/current/layered-contract-enforcement.md` | `6235b4efe566be042a34843fafbcf05a354ac76ad768e8ffd4db5a08c4f33faa` |
| `nkf-self-hosting` | `knowledge/realizations/current/self-hosting.md` | `75b2fceb72e2527d87cf94a4058feb02364b634478a2dfe17528678ad8199be2` |

The confirmation is supported by these separate exact Evidence revisions:

| Evidence | SHA-256 |
| --- | --- |
| Release Publication And Local Adoption | `b65fbaf994c8d1e5b68c6e79012c5aa1db08400c1eee67c7939fd5e23fde7c8d` |
| Public Documentation Publication | `5381038f159722e8c362df9d59a80133a87e88fa4f6b71d97ed9efe41b21d1bb` |
| Consumer Workflow Execution | `d34f69768097bdea81811a8faa520a5804a2af6a166806c672f62839525bba3a` |
| Completion Audit | `b910ec6f07d2a4c5b36ffb32cb012decf09dd3726e83a6771db64532c2f617ee` |

NKF-008 is Completed for:

1. the exact content-addressed internal NKF 0.1 prerelease;
2. the deliberate recommended-release catalog;
3. the public-safe Product and Technology adopter;
4. the public explanatory documentation and exact normative Markdown mirror;
5. complete checker-conformant public Product and Technology examples;
6. local and Github execution of the pinned consumer path;
7. same-pin `no-update` and archive, pin, adapter, and governed-knowledge
   tamper rejection;
8. current navigable Realization and self-host mappings; and
9. the final requirement-by-requirement audit.

## Scope And Applicability

This confirmation applies only to the exact Realization and Evidence bytes
listed above. It confirms the current private-release, public-documentation,
consumer-adoption, enforcement-integration, and self-hosting account.

It does not change the NKF 0.1 Specification, executable YAML companion,
Schemas, native eight-file archive contract, Root Profiles, authority model,
or conformance meaning.

## Rationale

The exact release was reproducibly built, independently verified, published,
re-downloaded, and reverified. The public projection was staged through a
closed allowlist, published to a Public repository, freshly cloned,
byte-compared, and digest-verified. Its complete Product and Technology
projects each pass the checker.

The consumer path passes locally and on a Linux Github runner against the
exact private release. Remote failures exposed and drove repair of two
portability defects. The hardened exercise proves installation, local check,
same-pin no-update, and four tamper boundaries. The final audit found and
repaired incomplete example publication before concluding that no unresolved
material finding remained.

These facts make the successor Realizations accurate and sufficiently
verified for confirmation. The separate Decision remains necessary because
publication, validation, tests, and Git cannot confirm their own account.

## Alternatives Considered

Leaving NKF-008 Active after all accepted work was complete was rejected
because it would make the Task map and current Realization stale.

Treating the first sketch examples as complete was rejected because they were
not runnable project trees.

Ignoring failed remote runs because local validation passed was rejected
because the failures exposed real continuous-integration portability defects.

Calling release publication or a green workflow sufficient confirmation was
rejected because external observations and machine checks do not exercise
confirmation authority.

Expanding completion into Agent SDK migration or protected branch enforcement
was rejected because external consumers require their own authority and
NKF-012 owns the protected merge gate.

## Consequences And Trade-Offs

NKF now has one recommended private release, one public documentation
projection, one public-safe adopter, and one documented pinned Product and
Technology adoption experience.

The public documentation repository remains a derived projection. Its edits
must originate in governed private source and receive a new publication
binding. The private release requires authorized Github access or an approved
offline archive.

The synthetic consumer exercise proves the distributed path without claiming
that a real external Product or Technology has migrated. Later consumer
migrations remain deliberate per-repository work.

No Task is Active after NKF-008 completion. Deferred Tasks remain visible,
including NKF-012 for the unavailable protected merge gate.

## Non-Claims

This Decision does not:

- accept consumer or example knowledge;
- make explanatory documentation normative beyond the byte-identical
  Specification mirror;
- make the private checker or private NKF repository public;
- verify every historical acceptance binding;
- establish Governing Use readiness;
- migrate Agent SDK or another external repository;
- activate required checks, pull-request approval, bypass rules, or protected
  merge enforcement;
- make an informational Github Actions runtime notice a contract defect; or
- allow a consumer to follow a moving release recommendation.
