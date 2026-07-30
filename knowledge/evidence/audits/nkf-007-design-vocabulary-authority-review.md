# NKF-007 Design Vocabulary Authority Review

- **Task:** `NKF-007`
- **Status:** Evidence
- **Recorded At:** `2026-07-30T17:23:28Z`
- **Reviewer:** Codex
- **Authority Effect:** None

## Problem

The accepted NKF 0.1 Design body still required
`proposed-or-accepted-design` and `validation-and-acceptance-evidence`.
Those responsibility identities conflicted with the clarified NKF lifecycle:
a Design is proposal knowledge, a Decision adopts or rejects its proposed
direction, and acceptance governs an exact record revision.

Leaving the old names in the native contract would make repository guidance
and executable conformance disagree.

## Reviewed Revisions

| Artifact | SHA-256 |
| --- | --- |
| Canonical NKF 0.1 Markdown candidate | `f50fe1ffe805195911b053c66329ddd0fb7664aef45abb911cc29d1d1b3f2a0a` |
| Executable NKF 0.1 YAML candidate | `4bedf1bed591ce173c02091827885178154839c09fdb3b9d8d22b347d906fc5b` |
| Bundle Schema candidate | `a9d118b3f066fa9389dfa5ef909f5b57681b61238309edde5f9576e801cad8a8` |
| Record Schema candidate | `0b11a7faaeb2ac9993d83f8102fc2ae25c7c32436ef4496f3a5aeb97eb6b5ff1` |
| Validation Result Schema candidate | `f7873cbbd9b3a7a24dd4b0374c68b165cc4b3cf85d98e7fdcd5c51bc6c315ed4` |
| Knowledge Architecture Design successor | `f460b081a18fa7215cd8746588731e356de62eb773010e64ed9527c157527d48` |
| Product Responsibility Design successor | `de0a5c7a66c75e42da246e41176c3dd10a8639554453b305bc52eccf67c5a06f` |
| Technology Profile Design successor | `1f079cc4b26cb3061f7750cea3139bfafd5fdc0aedb118888a9dd6ee0fcb0aa6` |

The ADR 0054 authority pair and Design revision remain preserved exactly under
`knowledge/evidence/decision-inputs/adr-0054/`.

## Semantic Review

The candidate replaces exactly two current Design responsibility identities:

| Predecessor | Successor | Current Meaning |
| --- | --- | --- |
| `proposed-or-accepted-design` | `proposed-direction` | Direction proposed for a Decision to adopt, reject, or supersede |
| `validation-and-acceptance-evidence` | `validation-and-decision-evidence` | Validation approach and evidence required for an informed Decision |

The Design body still has eight required responsibilities. No other body,
profile, serialization field, section role, diagnostic, Schema assertion, or
version coordinate changes.

The normative prose now states explicitly that a Design remains proposal
knowledge in every disposition and cannot claim implementation or conformance
without Realization and Evidence.

## Mechanical Review

Strict parsing produced one executable YAML document with no parser errors.
The YAML contains the exact eight reviewed current responsibility identities
and binds the reviewed Markdown digest.

All three core Schema assertion graphs remain identical to the predecessor
baseline after removing only non-assertive source annotations. Type checking
and the ten focused front-matter and diagnostic tests pass.

## Compatibility

This is a breaking pre-stable responsibility-identifier correction within the
single NKF 0.1 version namespace. New or revised native Design declarations
must use the successor identifiers. Historical Decisions and Evidence retain
the predecessor wording as provenance, not current support.

External consumer migration remains deliberate and is not performed by this
review.

## Conclusion

The exact Markdown/YAML pair is coherent with NKF’s Design concept and ready
for an explicit successor acceptance Decision. Schema and checker
confirmation remains part of the final NKF-007 Realization confirmation.
