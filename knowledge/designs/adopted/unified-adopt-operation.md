---
id: design-nkf-020-unified-adopt-operation
type: design
title: NKF Unified Adopt Operation
summary: This Design defines one public Adopt operation that brings every supported repository to the governed recommended NKF release while preserving semantic approval, compatibility, pinning, and rollback boundaries.
created_at: 2026-08-10T10:50:20Z
record_lifecycle: immutable
record_status: accepted
task: NKF-020
design_disposition: adopted
design_decisions:
  - adr-0107
decision_authority: Human Product Owner, Nourd ApS
---

# NKF Unified Adopt Operation

## Design Kind Problem And Scope

This is a release-adoption process, compatibility-signaling, and derived
tooling Design. The earlier public surface required a user to choose among
`onboard`, `install`, `update`, and `migrate`, although those names described
implementation paths rather than decisions the user should make.

This Design replaces those choices with one public operation named **Adopt**.
It covers supported initial Product and Technology adoption, migration from
NKF 0.1, refresh within NKF 0.2, and the already-current result. It does not
extend initial adoption to mature unadopted repositories, which remains owned
by [NKF-014](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md),
or change NKF 0.2 format meaning.

## Governing Inputs And Constraints

- The governed recommended-release catalog is a reviewed mutable channel; the
  full archive SHA-256 it selects is the immutable trust anchor.
- A repository permanently pins the exact archive, checker, adopter, source
  commit, and integration state after successful adoption.
- Compatibility is judged by the Human Product Owner relative to each
  supported predecessor. Tooling validates the declared signal but does not
  infer semantic compatibility.
- Breaking migration must be shown before mutation and requires explicit
  repository-authority approval.
- Initial semantic assessment remains agent-led and plan sealing remains a
  prerequisite. Adopt does not mechanically classify repository meaning.
- Staging, complete candidate validation, atomic application, rollback, and
  post-application validation remain mandatory.

## Proposed Direction

### One Public Adopt Operation

The user-facing invocation has no subcommand:

```text
node nourd-nkf-adopt.mjs --project .
```

Optional inputs may identify an already sealed initial-adoption plan, an exact
offline archive and recommendation, or the authority approving a displayed
breaking migration. Internal mechanics may retain named functions and
agent-facing commands, but public documentation presents no competing
onboard, install, update, or migrate choice.

### State Resolution

Adopt resolves the current governed recommendation, validates its closed
catalog shape, and observes the repository before selecting one internal path:

| Observed state | Internal path | Public result |
| --- | --- | --- |
| Supported unadopted repository with a sealed plan | Initial adoption | `onboarded` |
| Supported NKF 0.1 repository with approval | Migration and integration | `migrated` |
| NKF 0.2 repository missing or behind the recommended pin | Integration install or refresh | `updated` |
| NKF 0.2 repository already on the exact recommendation | Verification only | `current` |

An unadopted repository without a reviewed sealed plan, an unsupported NKF
predecessor, a mature unadopted repository outside current category support,
or an inconsistent installation fails closed before mutation.

### Recommended Release And Compatibility Signal

`release/recommended.json` declares one compatibility entry per supported
predecessor. Each entry carries:

- `from_nkf_version`;
- `classification`, exactly `breaking` or `non-breaking`;
- `migration_required`, consistent with that classification; and
- a concise human-readable summary.

NKF 0.2 is declared **breaking from NKF 0.1**, with migration required, and
**non-breaking from NKF 0.2**, allowing an exact release and integration
refresh. The consumer sees the target version, archive digest, classification,
and migration requirement before any breaking change is applied.

### Transaction And Result States

Every mutating path builds the complete candidate outside the live paths,
validates it with the target release, and applies it through the existing
transaction and rollback mechanism. A breaking path proceeds only with an
explicit `human-product-owner` approval assertion. A successful result uses
the closed `nkf.adopt-result` contract and one of `onboarded`, `migrated`,
`updated`, or `current`.

The result records the exact target and the applicable compatibility signal.
It reports operational application and validation; it does not claim that
consumer meaning was accepted, a Realization was confirmed, or remote Git
enforcement exists.

### Supported Boundary

Initial adoption continues to support only Empty Repository and Tiny Knowledge
With No Source Or Configuration for Product and Technology roots. Later
category support must extend the same Adopt operation and state resolver. It
must not introduce another public installation command.

## Responsibilities Interactions And Information Flows

The NKF repository owns the recommendation, compatibility declaration,
content-addressed archive, adopter, migration mechanics, and validation. The
consumer repository owns its meaning, its accepted authority acts, and the
approval to enter a breaking migration. The agent owns complete inspection and
truthful presentation of the candidate. The Human Product Owner owns semantic
compatibility judgement. The checker owns structural conformance only.

The flow is recommendation to exact target, observed repository state to
internal path, preflight to any required authority approval, complete candidate
to validation, validated transaction to exact consumer pin, and exact pin to
the reported result.

## Alternatives And Trade-Offs

Keeping four public commands was rejected because it transfers internal state
detection to the user and permits choosing an invalid path. The name `ensure`
was rejected by the Human Product Owner because it obscures the deliberate
governed adoption act. Following Github `latest` was rejected because it makes
the target mutable and unauditable. Silent breaking migration was rejected
because validation cannot supply semantic authority approval.

One command makes the user workflow simpler while making the adopter's state
resolver and tests more important. The mutable recommendation makes deliberate
promotion convenient, while the permanent exact archive pin prevents that
channel from becoming a moving consumer dependency.

## Failure Safety Recovery And Operations

Recommendation failure, catalog inconsistency, archive digest mismatch,
predecessor drift, missing sealed plan, unsupported category or version,
missing breaking approval, candidate failure, and transaction failure all
stop without a partially adopted repository. The predecessor release and
content-addressed archive remain available for inspection and recovery.

A newer standalone adopter validates an older installed 0.2 consumer through
that consumer's exact pinned adopter before replacing integration bytes. This
prevents legitimate predecessor guidance from being compared to successor
embedded bytes while preserving predecessor integrity checks.

## Validation And Decision Evidence

The exact direction was reviewed interactively and confirmed by the Human
Product Owner on `2026-08-10`, including the public name Adopt, no-subcommand
invocation, recommendation resolution, compatibility vocabulary, breaking
approval gate, 0.1-to-0.2 classification, supported-category stop, result
states, and exact pinning.

Executable evidence must cover initial Product and Technology adoption, a
real 0.1 migration blocked before approval and successful after approval, a
native or behind 0.2 integration refresh, an already-current run, unsupported
input, rollback, and full canonical validation. Independent audit remains
required before release and Task conclusion.

## Unresolved Matters

Later mature-repository category semantics remain deferred to [NKF-014](../../tasks/deferred/NKF-014-expand-brownfield-and-advanced-onboarding.md).
Acceptance-binding verification remains deferred to [NKF-016](../../tasks/deferred/NKF-016-deliver-acceptance-binding-verification.md). Protected merge
enforcement remains deferred to [NKF-012](../../tasks/deferred/NKF-012-activate-protected-merge-gate.md). None blocks the bounded Adopt
operation accepted here.
