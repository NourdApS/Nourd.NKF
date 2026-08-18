---
title: NKF-031 NKF 0.71 Guidance Review
summary: Records the release-protocol guidance review of the complete NKF 0.71 versioned guidance set — the shipped adoption, authoring, onboarding, and release protocols, the portable skill twins, and the host adapters — against the accepted 0.71 authority, with the live producer twins deliberately remaining at NKF 0.7 until the separately authorized promotion.
created_at: 2026-08-17T22:30:00Z
---

# NKF-031 NKF 0.71 Guidance Review

Under [NKF-031](../../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md),
the complete versioned guidance set at `distribution/nkf/0.71/` was reviewed
against the accepted NKF 0.71 authority as the release protocol requires
before a cut. This Evidence records what was reviewed and what changed.

## Reviewed Set And Changes

- The adoption protocol was rewritten for the accepted window and
  compatibility: live support is exactly NKF 0.71 plus NKF 0.7; the
  breaking 0.6-to-0.7 migration chapter is replaced by the non-breaking
  0.7-to-0.71 upgrade through the ordinary Adopt update — no
  repository-owner approval, the delta review of the computed required set
  written on first invocation and consumed on rerun — and the out-of-window
  table names the stepping-stone chain, a 0.6 repository stepping through
  the published 0.7 archive. The producer-promotion section states the
  delta-stage reviews with whole-root recovery.
- The authoring protocol gained the seal-completing conclusion in both
  places its transition mechanics are described: the deterministic
  conclusion seals the mechanically-concluded successor baseline over its
  own closed transition delta in the same transaction, refusing any excess
  delta before mutation, and the `task` command description carries the
  same meaning. Its native-envelope and upgrade references state NKF 0.71.
- The onboarding protocol carries its version roll only; onboarding remains
  a whole-root review act.
- The release protocol required no content change beyond its version
  marker: its ordering — candidate archive and isolated exercise, fresh
  independent audit, mandatory audit-bound confirmation Decision, then
  separately authorized publication — is version-neutral and already
  reconciled.
- The portable skill twins under `.claude/` and `.agents/` gained the
  conclusion sentence and remain byte-identical pairs; the host adapters
  are version-neutral and carry their markers.
- Every guidance file declares `NKF Version: 0.71` through the exact marker
  the executable companion defines.

## Boundary

The live producer guidance twins at `integrations/ai/` deliberately remain
at NKF 0.7: the live producer declares NKF 0.7 until the separately
authorized publication and promotion, and bumping the live twins before
promotion would break the producer gate — the same boundary the 0.7 lineage
recorded. The shipped 0.71 guidance activates at adoption.

This Evidence records the review as fact. It does not accept guidance
bytes, confirm a Realization, or authorize publication.
