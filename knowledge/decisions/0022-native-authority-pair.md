---
created_at: 2026-07-30T00:27:52Z
---

# ADR 0022: Accept Coherent NKF 0.1 Authority Pair

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision authority:** Codex technical reviewer, acting under explicit
  delegation from the Human Product Owner, Nourd ApS
- **Delegation source:** Direct instruction in the NKF-003 discussion on
  29 July 2026: the reviewer has permission to accept the pair if the reviewer
  approves it

## Context

ADRs 0013 through 0021 establish native record and bundle serialization,
controlled vocabularies, semantic topology, durable bindings, extensions,
acceptance provenance, project paths, knowledge coverage, enforcement,
diagnostics, and the current presentation boundary. The previously accepted
Markdown/YAML pair predates those Decisions and remains an immutable
historical snapshot rather than their coherent current realization.

NKF-003 prepared one exact replacement Markdown specification and one
digest-bound YAML companion. Before exercising the delegated authority, the
reviewer independently reverified:

- the exact proposal and accepted-input digests;
- preservation of all 69 accepted body-responsibility meanings;
- one YAML document, one mapping root, string keys, JSON-compatible values,
  and no duplicate keys, custom tags, merge keys, anchors, or aliases;
- exact coverage of 38 section-role meanings, ten body-specific role subsets,
  27 entity kinds, ten entity-relationship types, eleven binding kinds,
  eleven record-relationship types, four section-authority classes, and ten
  record/body pairs;
- exact identity, severity, blocking behavior, and phase coverage for all 110
  native diagnostics;
- the single NKF `0.1` version namespace, canonical paths, local links, and
  exact Markdown-to-YAML digest binding; and
- the separation of acceptance, downstream realization, Realization
  confirmation, and conformance.

No material authority, coherence, completeness, or enforceability defect was
found within the accepted NKF 0.1 boundary.

## Decision

The exact reviewed pair is accepted as the current canonical NKF 0.1 authority
pair:

| Responsibility | Canonical artifact | SHA-256 |
| --- | --- | --- |
| Normative human-readable meaning | [`../specifications/nkf-0.1.md`](../specifications/nkf-0.1.md) | `9e90fc712df661b7c008b47a8392a180c5418346f8c3a5a1f2c344c6cbeb3b97` |
| Executable companion | [`../../contracts/nkf/0.1/nkf.yaml`](../../contracts/nkf/0.1/nkf.yaml) | `ebb8c98dfb4611cffe4c19eeebd5fcd932d48332067393c0c7ee7a6f07ac6e87` |

The exact reviewed source artifacts remain at:

- [`../evidence/decision-inputs/adr-0022-0023/nkf-0.1-replacement-specification.md`](../evidence/decision-inputs/adr-0022-0023/nkf-0.1-replacement-specification.md);
  and
- [`../evidence/decision-inputs/adr-0022-0023/nkf-0.1-replacement-contract-set.yaml`](../evidence/decision-inputs/adr-0022-0023/nkf-0.1-replacement-contract-set.yaml).

Promotion copies those reviewed bytes unchanged. Markdown remains
authoritative human meaning. YAML is its accepted executable companion and
cannot add, weaken, strengthen, reinterpret, or accept meaning independently.
A mismatch fails closed.

The proposal-era status wording inside the promoted Markdown is retained
because the accepted object is the exact digest-locked review revision. This
Decision supplies its acceptance state; the retained wording must not be
misread as overriding this later acceptance event.

## Supersession And Compatibility

This pair realizes ADRs 0013 through 0021 and is the current NKF 0.1
specification and executable companion. It supersedes the exact revisions
accepted by ADRs 0010 and 0011 as the current canonical revisions without
rewriting or invalidating those historical Decisions, paths, digests, or
provenance.

NKF still has only the `0.1` format-version coordinate. This acceptance does
not introduce a contract sub-version, mixed-version policy, or silent
compatibility claim. Consumers of older structures or exact historical
digests require deliberate onboarding or migration before they may claim
current native NKF 0.1 conformance.

## Authority Provenance And Non-Claims

This is delegated technical acceptance. It must not be restated as
line-by-line Human Product Owner review.

This Decision accepts the exact authority pair. It does not by itself:

- replace or confirm the preliminary JSON Schemas;
- implement or confirm checker code, fixtures, packaging, integrity metadata,
  release distribution, or continuous-integration gates;
- accept any extension or authority resolver;
- confirm a consumer implementation or Realization;
- produce an NKF conformance result;
- verify acceptance bindings for governed consumer knowledge; or
- authorize consumer migration.

Those outcomes remain separately evidenced and governed realization work.
Validation and conformance cannot retroactively alter this Decision.
