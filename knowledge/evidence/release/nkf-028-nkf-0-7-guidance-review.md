---
title: NKF-028 NKF 0.7 Guidance Review
summary: Records the complete release-protocol step-four review of every shipped protocol, portable skill, and host-adapter instruction in the NKF 0.7 versioned set against the exact accepted authority, with every correction made.
created_at: 2026-08-17T13:00:00Z
---

# NKF-028 NKF 0.7 Guidance Review

The accepted release protocol requires re-reading every shipped protocol and
portable skill in full against this version's accepted authority pair — not
only against the rules that changed — and recording the enumerated member
list, each reviewed digest, and every correction. This Evidence records that
review for the NKF 0.7 versioned set, performed against the authority
accepted by ADR 0128.

## Reviewed Members

The guidance members of the accepted 0.7 release set, enumerated from
`contracts/nkf/0.7/release-set.yaml`, were each read in full:

- `distribution/nkf/0.7/integrations/ai/nkf-authoring-protocol.md`
- `distribution/nkf/0.7/integrations/onboarding/nkf-onboarding-protocol.md`
- `distribution/nkf/0.7/integrations/adoption/nkf-adoption-protocol.md`
- `distribution/nkf/0.7/integrations/release/nkf-release-protocol.md`
- `distribution/nkf/0.7/.agents/skills/nkf-authoring/SKILL.md` and its
  byte-identical `.claude` twin
- `distribution/nkf/0.7/.agents/skills/nkf-onboarding/SKILL.md` and its
  byte-identical `.claude` twin
- `distribution/nkf/0.7/host-adapters/AGENTS.adapter.md`,
  `CLAUDE.adapter.md`, `GEMINI.adapter.md`, and
  `copilot-instructions.adapter.md`

The reviewed digests are the exact digests these members carry in the
release manifest of the candidate archive this review accompanies; the
manifest is the deterministic digest record for the complete set.

## Findings And Corrections

1. The adoption protocol was materially stale: it still described the
   0.1-to-0.2 adoption surface — an obsolete state table, a
   `--accept-breaking human-product-owner` flag that does not exist, no
   support window, no stepping-stone refusal, no delta review, and no
   producer-promotion boundary. It was rewritten in full for 0.7: the
   current+one support window with the fail-closed stepping-stone naming,
   the repository-owner breaking approval, the review-template flow with
   computed carry and the delta claim, the migration's neutralization,
   succession, and provenance-attachment acts, the historical-bytes rule,
   and the producer-only promotion boundary.
2. The authoring protocol denied the Git orchestration the transition now
   performs. Its transition section now describes the Git act truthfully —
   dirty-tree refusal, branch and working-tree activation with a draft
   request, conclusion commit, push, ready-marking, and worktree release,
   with failed Git steps reported as one truthful `incomplete` result — and
   states the boundary that Git is operational output, never a conformance
   input. The `task` command description, the carry-forward sentence (now
   naming the policy-declared judgment dependencies), and the deep-link
   paragraph (now naming the historical-bytes rule for locked, immutable,
   and Evidence sources) were corrected in the same pass.
3. The onboarding protocol carried two stale `0.6` version references in
   prose; both corrected to `0.7`.
4. The onboarding skill description prepared "an NKF 0.6 candidate";
   corrected to 0.7 in both skill copies.
5. The authoring skill's governed-mechanics command list omitted the new
   `review --scaffold` and `record --scaffold` commands; added in both
   copies.
6. The release protocol and the four host-adapter instructions were read in
   full and required no correction.

## Review Boundary

This review verified derived guidance against accepted authority. It changed
no authority byte, accepted nothing, and is itself subject to the fresh
independent audit the release protocol requires next.
