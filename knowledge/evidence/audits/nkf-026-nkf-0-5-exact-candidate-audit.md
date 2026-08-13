# NKF-026 NKF 0.5 Exact Candidate Audit

## Audit Identity

- **Audited release commit:**
  `777ea9a3a87591de36494296db4437c5b4343ce2`
- **Candidate archive:**
  `nourd-nkf-sha256-e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9.tar`
- **Archive SHA-256:**
  `e46779333951c1bbfe262d73b45b2c2fa4dd1f0d97ca50c9cc5f60a7b79f99d9`
- **Checker SHA-256:**
  `95f53b252b57235b6ad5569f45dd9e661b5155318630ca634971b851b6631358`
- **Adopter SHA-256:**
  `065116b703c9a636c94768ecfb514a7859174929d94ee3e446c6c48a3dfb1870`
- **Completed semantic-review input SHA-256:**
  `2a7f1f3239ece085a5eaa674102f4eb091ed3f425ee7a8b21f62d4c6b19e46b9`
- **Final independent semantic recommendation SHA-256:**
  `6b9aa1ea6c46e3d8b0d0812ef1c1d78db6a2e8e5fedb44b5d3e8db37b820aedd`
- **Audit recorded:** `2026-08-13T17:15:48Z`
- **Mode:** fresh remote clone, clean dependency installation, independent
  archive parsing and construction, source reproduction, semantic-review
  validation, candidate-bound producer migration, repeat-current verification,
  full host-superset gate, and adversarial tamper exercises

This Evidence does not accept NKF meaning, confirm the implementation, publish
or recommend a release, mutate the live producer, establish remote
enforcement, verify acceptance binding, or make general Governing Use ready.

## Accepted Boundary Under Review

[ADR 0119](../../decisions/0119-accept-the-nkf-0-5-revision-2-authority-pair.md)
accepts the exact NKF 0.5 revision 2 authority set. [ADR 0109](../../decisions/0109-publication-freeze-and-proven-self-adoption.md)
requires the exact candidate archive to Adopt in an isolated producer clone,
return `current` on repeat, preserve the full producer gate, and receive a
fresh independent audit before publication. The candidate must also preserve
the 23 Product boundaries adopted by [ADR 0115](../../decisions/0115-adopt-freshness-and-deterministic-knowledge-graph-direction.md)
without deriving additional Product meaning.

Earlier private candidates exposed process-helper, review-basis, native-host,
version-coupled fixture, repeat-authorization, and timing-harness defects. Each
affected archive and review was discarded when its source changed. None is
release or confirmation evidence for the exact candidate identified above.

## Independent Method And Results

1. A fresh remote clone resolved exact commit
   `777ea9a3a87591de36494296db4437c5b4343ce2` with a clean tracked tree.
   Clean `npm ci` followed by canonical `npm run nkf:check` passed 29 test files
   and 218 tests. The common fifteen-second test bound remained explicit and
   the deliberately broader per-test overrides remained intact.
2. Raw archive inspection verified 181 unique safe regular-file members in
   canonical order. The manifest binds all 180 pre-manifest members; the
   checker is the sole `0755` member and every other member is `0644`.
3. Strict manifest and release-set inspection verified the exact revision 2
   Markdown, executable companion, freshness policy, seven Schemas, checker,
   adopter, distribution, integrations, fixtures, examples, public documents,
   paths, modes, and digests. All 180 source-derived members reproduced from
   the exact commit.
4. Two independent constructions produced byte-identical archives at SHA-256
   `e4677933...f99d9`, equal to the supplied 5,260,800-byte candidate.
5. The completed whole-root review validates exactly against the independently
   derived recommendation: 268 nodes, 117 accepted Decisions with 351 distinct
   purpose classifications, 14 relationship categories covering 77 authored
   edges, three observations, four bounded limitations, and zero unresolved
   conflicts or placeholders. Every review basis resolves.
6. The primary candidate exercise and a separately run independent exercise
   both migrated an isolated exact producer from 0.4 to 0.5 with explicit
   repository-owner approval and the exact semantic review. Each preserved the
   host-superset integration, passed the full producer gate, reproduced all
   source members, and returned `current` on the ordinary repeat Adopt without
   retaining breaking-only inputs.
7. The extracted archive checker reported conformance passed and exact
   whole-root readiness `ready` for the reviewed producer snapshot. General
   Governing Use remained separately `not-ready`; neither result supplied
   acceptance or technical confirmation.
8. Wrong candidate pins, a flipped archive byte, and a canonically
   checksummed unsafe archive path were independently rejected before they
   could become trusted state.

The audit used fresh disposable state outside the live Task worktree. It did
not change repository source, Git references, remote release state,
recommendation state, or the producer installation.

## Findings And Boundaries

The verdict is `CLEAN`. No material exact-candidate finding remains.

The following facts remain separate and are not supplied by this audit:

- delegated technical confirmation requires a later exact Decision;
- the 0.5 tag, Github Release, and asset do not yet exist;
- the 0.5 recommendation and producer pin do not yet exist;
- ordinary public producer adoption and its fresh audit remain mandatory;
- the consolidated Realization must continue to reconcile later publication,
  recommendation, adoption, and final Task state; and
- remote merge enforcement, acceptance binding, and general Governing Use
  readiness were not established.

## Audit Conclusion

The exact implementation and archive faithfully realize the accepted NKF 0.5
revision 2 authority, graph, freshness, lifecycle, compatibility, release,
semantic-review, and producer-integration boundaries. They are suitable for
separate delegated technical confirmation and unchanged publication. This
conclusion performs neither act.
