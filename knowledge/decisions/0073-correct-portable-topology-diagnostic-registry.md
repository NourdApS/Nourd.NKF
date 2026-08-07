---
id: adr-0073
type: decision
summary: Accept the corrected NKF 0.1 authority pair that restores eight omitted portable-topology diagnostics to the normative Markdown registry without changing topology behavior.
created_at: 2026-08-01T14:58:34Z
record_lifecycle: immutable
record_status: accepted
task: NKF-017
---

# ADR 0073: Correct Portable Topology Diagnostic Registry

## Context And Problem

ADR 0072 accepted the initial complete-topology NKF 0.1 Markdown and executable
YAML pair. Implementation audit then found that the executable companion and
checker defined eight portable-topology diagnostics that the normative
Markdown diagnostic registry accidentally omitted. The omission made the
accepted pair internally inconsistent even though both artifacts described the
same topology behavior elsewhere.

The Human Product Owner approved correcting the missing Markdown diagnostic
entries on `2026-08-01T14:58:34Z`.

## Decision

NKF accepts this corrected successor authority pair:

| Authority Artifact | Accepted SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.1.md` | `df0235ee01ba951fe5beea50990213e4d1063b2e7014f460657de6904d5fabc0` |
| `contracts/nkf/0.1/nkf.yaml` | `3cd00712ecf5fc4d4ae6faa275fd04373d28802eb1de80f6c47f6f039026f0aa` |

The Markdown registry now includes the eight topology diagnostic identities
already present in the executable companion: required path, representation,
canonical map, map target, lifecycle path, index, competing generated map, and
current-system Realization failures.

Markdown remains the authoritative human meaning and YAML remains its
digest-bound executable companion.

## Scope And Applicability

This Decision corrects the canonical NKF 0.1 authority pair used by NKF-017
and all derived successor artifacts. It does not change the adopted topology,
diagnostic severity, checker phase, Root Profiles, version coordinate, or
consumer migration boundary.

## Rationale

The normative registry must enumerate every native diagnostic identity. Adding
the omitted rows restores exact Markdown/YAML parity and prevents the checker
from appearing to invent behavior outside the accepted human-readable
Specification.

## Alternatives Considered

Removing the diagnostics from YAML and the checker was rejected because the
accepted topology requires those failures and the Markdown already defines
their underlying rules. Treating the mismatch as harmless documentation drift
was rejected because the authority pair must fail closed on disagreement.

## Consequences And Trade-Offs

All derived source bindings, Schema metadata, checker bindings, public
normative mirrors, self-host declarations, and governed-artifact digests must
be rebound to the corrected pair. The initial ADR 0072 pair remains immutable
historical provenance and is not retroactively changed.

## Compatibility

NKF remains at the single `nkf_version: "0.1"` coordinate. This correction
does not add behavior or alter the meaning of prior conformance results. A
successor release must deliberately carry the corrected exact pair.

## Realization Requirements

Realization requires exact Markdown/YAML parity, synchronized derived
bindings, a passing complete repository gate, the NKF-017 whole-repository
audit, and separate confirmation of the exact implementation before release.

## Non-Claims

This Decision does not:

- confirm the NKF-017 Realization;
- prove the current worktree is conformant before derived bindings are updated;
- publish or recommend a release;
- migrate a consumer repository; or
- establish protected remote enforcement.
