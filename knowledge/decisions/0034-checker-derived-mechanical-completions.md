---
id: adr-0034
type: decision
summary: "The first independent native checker implementation exposed two states that current normative meaning already requires to fail but for which the stable diagnostic registry has no rule:"
created_at: 2026-07-30T07:53:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0034: Accept Checker-Derived Mechanical Completions

- **Status:** Accepted; canonical realization pending coordinated replacement
- **Task:** `NKF-003`
- **Decision Authority:** Codex technical reviewer, acting within the delegated
  authority for deterministic enforcement mechanics derived from already
  accepted NKF 0.1 meaning
- **Evidence:** First native checker implementation and fixture execution
- **Related Proposal:**
  [`../evidence/audits/nkf-0.1-native-checker-realization-findings.md`](../evidence/audits/nkf-0.1-native-checker-realization-findings.md)

## Context

The first independent native checker implementation exposed two states that
current normative meaning already requires to fail but for which the stable
diagnostic registry has no rule:

1. a safely readable declared record source whose bytes are not valid UTF-8;
   and
2. a `contract` validation request whose record ID does not resolve uniquely.

It also proved that four headings and their declaration paths in the canonical
minimal example do not follow the already accepted Unicode 17 Title-Case
rule.

These are deterministic completion and editorial-realization defects. The
underlying obligations are already accepted. Selecting a stable diagnostic
identity, phase, and non-secret location fields is within the same delegated
technical boundary used for ADR 0019. Correcting an example to satisfy ADR
0024 does not change the accepted rule or Product meaning.

The separate Product hierarchy/reachability question is semantic and is not
accepted by this Decision.

## Decision

### Invalid Markdown UTF-8

The replacement native registry adds:

| Rule | Severity | Blocking | Phase |
| --- | --- | --- | --- |
| `markdown.utf8.invalid` | error | conformance | source |

The trigger is one safely readable declared record source whose exact bytes
are not valid UTF-8. The diagnostic identifies the exact project-relative
artifact and record ID. It does not copy invalid bytes, decoded replacements,
or surrounding content.

The existing `yaml.utf8.invalid` identity remains YAML-specific and unchanged.
An invalid Markdown source is not reported as missing.

### Unresolved Contract Request Target

The replacement native registry adds:

| Rule | Severity | Blocking | Phase |
| --- | --- | --- | --- |
| `request.record.unresolved` | error | conformance | bundle-graph |

The trigger is a structurally valid `contract` request whose `record_id` does
not resolve to exactly one uniquely identified governed record after safe
parsing and identity resolution. The requested ID may appear as `record_id`.
No artifact or record result is invented.

The result contains no record result for the missing or ambiguous target and
fails contract conformance.

### Minimal Example

The replacement canonical Markdown corrects only these example strings and
their matching `heading_path` values:

| Current | Conforming |
| --- | --- |
| `Product definition` | `Product Definition` |
| `People served` | `People Served` |
| `Needs and outcomes` | `Needs And Outcomes` |
| `Product map` | `Product Map` |

No example prose, responsibility, authority, role, identity, or relationship
meaning changes.

## Realization

These completions will be realized through one coordinated replacement of the
canonical Markdown/YAML pair after the separate hierarchy finding is resolved.
All three schemas then require exact source-metadata rebinding, and the checker
and fixtures require renewal against that accepted pair.

Until then, the development checker fails closed without a completed result
for the two missing-diagnostic states. It does not emit unaccepted native rule
IDs against the current contract set.

## Compatibility

The new diagnostics expose failures already required by NKF 0.1. They do not
turn a previously conforming project into a nonconforming project under
normative meaning; they make required failure reporting executable.

The example correction changes no consumer declaration. Consumers that copied
the nonconforming example headings must deliberately correct their Markdown,
heading paths, and source digest before claiming conformance.

## Non-Claims

This Decision does not:

- resolve or accept the Product hierarchy/reachability finding;
- replace or promote the current authority pair by itself;
- confirm final checker completeness or fixture coverage;
- establish distribution, release, support, or consumer migration;
- validate a consumer project;
- accept consumer knowledge; or
- confirm a Realization.
