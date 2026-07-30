---
created_at: 2026-07-29T20:06:17Z
---

# ADR 0008: Accept NKF 0.1 Artifact Identities

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Human Product Owner, Nourd ApS
- **Acceptance source:** Direct informed confirmation in the NKF-003
  discussion on 29 July 2026

## Context

ADR 0007 establishes a digest-bound pair of normative Markdown and complete
executable YAML, but deliberately leaves their version, paths, and YAML
contract-set identity undecided.

NKF `0.1` remains the accepted Product-format version. `nkf.record/v2`
changes the record declaration contract, while NKF format and contract
versions remain independent.

## Decision

The current NKF format version remains `0.1`.

The independent canonical artifacts are:

| Responsibility | Accepted value |
| --- | --- |
| Normative Markdown | `knowledge/specifications/nkf-0.1.md` |
| Complete executable YAML | `contracts/nkf/0.1/nkf.yaml` |
| YAML contract-set identity | `nkf.contract-set/v1` |

The YAML identity is owned by NKF. It is not checker-specific and must not use
the imported proposal identity `nkf.checker.contract-set/v1`.

## Initial Contract Representation

The first complete YAML contract set must represent:

- `nkf.bundle/v1`;
- `nkf.record/v1`;
- `nkf.record/v2`; and
- the ten accepted Product body contracts at `v1`.

This identifies what the first YAML contract set must cover. It does not yet
decide the bundle default record contract, mixed v1/v2 bundle behavior, the
remaining serialization shapes, or executable schemas.

## Consequences

- The independent Markdown specification can be drafted with a stable final
  destination.
- The YAML contract set has a neutral identifier independent of its checker.
- Format `0.1` can contain independently versioned record contracts.
- The Markdown/YAML pair still requires exact revision and digest binding
  under ADR 0007.

## Not Decided

This Decision does not accept:

- the exact composite Markdown revision;
- the YAML contents or digest;
- bundle default or mixed record-version policy;
- remaining YAML vocabularies and serialization fields;
- schemas, checker behavior, fixtures, packaging, or consumer migration.
