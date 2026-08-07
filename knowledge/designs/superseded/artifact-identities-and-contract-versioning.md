---
id: design-nkf-0-1-authoritative-artifacts
type: design
title: NKF 0.1 Authoritative Artifacts
summary: The exact version, paths, and contract-set identity for the independent normative Markdown specification and its complete executable YAML companion.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: superseded
task: NKF-003
design_disposition: superseded
design_decisions:
  - adr-0008
superseded_by:
  - adr-0009
  - adr-0012
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Authoritative Artifacts

- **Accepted meaning changed:** None

## Decision Sought

The exact version, paths, and contract-set identity for the independent
normative Markdown specification and its complete executable YAML companion.

## Proposed Identities

| Responsibility | Proposed value |
| --- | --- |
| Current NKF format version | `0.1` |
| Canonical normative Markdown | `knowledge/specifications/nkf-0.1.md` |
| Complete executable YAML | `contracts/nkf/0.1/nkf.yaml` |
| YAML contract identity | `nkf.contract-set/v1` |

## Rationale

The accepted Product-format meaning remains NKF `0.1`. The new
`nkf.record/v2` contract introduces a breaking record-declaration revision,
but accepted NKF versioning already makes record-contract versions independent
from the format version. No Product-format meaning currently requires an NKF
format-version change.

The Markdown path belongs under the existing accepted specifications
authority. The YAML path keeps executable contracts outside governed
knowledge records while making the complete contract set easy to package.

The imported proposal uses `nkf.checker.contract-set/v1`. That identity makes
the contract set appear owned by one checker implementation. NKF owns the
contract set, so the neutral identity is `nkf.contract-set/v1`.

## Initial Supported Contracts

The first YAML contract set will describe already established identities:

- `nkf.bundle/v1`;
- `nkf.record/v1`;
- `nkf.record/v2`; and
- the ten Product body contracts at `v1`.

This statement identifies the contracts that require representation. It does
not yet decide the bundle's default record contract, mixed v1/v2 bundle
behavior, or unconfirmed field shapes.

## Creation Sequence

1. Prepare the independent Markdown specification by preserving the accepted
   Studio source meaning and applying only accepted ADRs with exact
   provenance.
2. Review and accept the exact composite Markdown revision.
3. Create the complete YAML contract set bound to that exact path, revision,
   and digest.
4. Resolve remaining YAML field and vocabulary decisions explicitly.
5. Review and accept the exact YAML revision.
6. Derive or verify JSON Schemas, checker tables, fixtures, and distribution
   metadata against the accepted pair.

The Studio source snapshots remain immutable evidence and are not edited.

## Exact Confirmation Requested

> Keep the current NKF format at `0.1`. Place its canonical normative Markdown
> at `knowledge/specifications/nkf-0.1.md` and its complete executable YAML
> companion at `contracts/nkf/0.1/nkf.yaml`. Identify the YAML as
> `nkf.contract-set/v1`, owned by NKF rather than by a checker implementation.

Acceptance would approve these identities and paths only. It would not yet
accept the composite Markdown bytes, YAML contents, bundle default, mixed
record versions, schemas, or checker code.

## Decision Outcome

The Human Product Owner accepted these artifact identities on 29 July 2026.
The immutable result is
[`ADR 0008`](../../decisions/0008-nkf-0-1-artifact-paths.md).
