---
name: nkf-authoring
description: Author, change, classify, migrate, audit, or validate NKF-governed knowledge in an adopted repository. Use for any operation affecting a knowledge root, .nourd declarations, NKF lifecycle records, governed artifacts, contract bindings, or NKF validation.
---

# NKF Authoring

NKF Version: 0.2

From the project root, read and follow
`integrations/ai/nkf-authoring-protocol.md` before editing governed knowledge.

Maintain each affected Task's Decision Applicability section before Git-backed
work: extract the applicable accepted decisions with their conditions,
negative findings, and unknowns, classify mandatory capabilities as proven,
unsupported, or unknown, and re-extract when the renderer, provider, platform,
data format, architecture, harness, or a mandatory requirement changes.

Keep orientation identity in frontmatter only; the closed identity labels
are rejected as top-level body bullets in every non-Evidence document, the
frontmatter title must equal the H1 exactly, and every same-bundle document
reference must be a deep link to the referenced document's source path.

Transition Tasks deliberately: before activating one, semantically resolve
and confirm every requirement and open uncertainty — the Human Product Owner
confirms, or the agent confirms under an explicitly recorded delegation;
before closing one, verify every acceptance criterion is done, tested, and
confirmed the same way. Only then run the deterministic `task` transition,
which enforces only the machine-checkable parts.

Perform governed mechanics through the deterministic adopter commands —
`task`, `repin`, `linkify`, `refs`, `set`, and `migrate` — supplying only the
prose; never hand-edit what a command performs.

Run `npm run nkf:check` after one coherent governed change and before handoff.
Treat the protocol as derived procedure and accepted NKF Specifications as the
authority for format meaning.
