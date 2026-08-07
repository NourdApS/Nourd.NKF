---
id: adr-0025
type: decision
title: "ADR 0025: Accept NKF 0.1 Validation Result Contract"
summary: ADR 0019 accepts the logical nkf.validation-result boundary but does not define an encoding, exact object shape, persistence rule, validated-snapshot algorithm, artifact bindings, or the relationship between conformance and Governing Use Ready.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
---

# ADR 0025: Accept NKF 0.1 Validation Result Contract

- **Status:** Accepted
- **Task:** `NKF-003`
- **Decision Authority:** Human Product Owner for consequential semantics;
  Codex technical reviewer for exact structural serialization under direct
  bounded delegation
- **Delegation Source:** Direct Human Product Owner instruction in the
  NKF-003 discussion on 30 July 2026: “i will let you do through this trivial
  structural stuff on your own and confirm them on your own”
- **Reviewed Design:**
  [`../evidence/audits/nkf-0.1-checker-realization-gaps.md`](../evidence/audits/nkf-0.1-checker-realization-gaps.md)
- **Reviewed Structural Proposal:**
  [`../evidence/decision-inputs/adr-0025/nkf-0.1-validation-result-schema-proposal.json`](../evidence/decision-inputs/adr-0025/nkf-0.1-validation-result-schema-proposal.json),
  SHA-256
  `3671fa052d748bc0bf12ba1d6107baf513201018a57a10e6b17998f34b5c4f62`
- **Reviewed Non-Normative Example:**
  [`../evidence/decision-inputs/adr-0025/nkf-0.1-validation-result-example.json`](../evidence/decision-inputs/adr-0025/nkf-0.1-validation-result-example.json),
  SHA-256
  `8f4d9ab8f32f87276ceba9c4d00fd8b406c9ee5ea8507c08c2a536aae56ae82e`

## Context

ADR 0019 accepts the logical `nkf.validation-result` boundary but does not
define an encoding, exact object shape, persistence rule, validated-snapshot
algorithm, artifact bindings, or the relationship between conformance and
Governing Use Ready.

Those omissions prevent deterministic checker realization. They also create a
risk that a stored passing result could be mistaken for semantic acceptance,
confirmed Realization, or permanently current verification.

The Human Product Owner confirmed the consequential semantics one boundary at
a time. The remaining JSON grouping, field names, null-versus-omission
behavior, closed-object mechanics, and fixed ordering were delegated to the
Codex technical reviewer. The final structural audit verified JSON parsing,
69 local references, six regular-expression declarations, sixteen closed
object schemas, thirteen top-level fields, eleven ordered phases, and three
ordered core schema bindings. Full source-bound JSON Schema realization
remains a later step.

## Decision

### Identity, Encoding, And Storage

The operational result identity is exactly `nkf.validation-result` under the
sole NKF version coordinate `0.1`.

A result is one UTF-8 JSON object with no byte-order mark, comments, duplicate
keys, non-JSON values, or unknown fields. JSON member order and insignificant
whitespace have no semantic meaning.

The project receipt path is exactly:

```text
.nourd/validation-result.json
```

Only a completed `full-bundle` request writes that receipt. It atomically
replaces the previous receipt whether the new result passes or fails.
`structural` and single-record `contract` results are transient and never
write or replace it. NKF Core keeps no local validation-result history;
external operational systems may retain history.

The receipt is operational state outside `knowledge_root`, is not governed
knowledge, is excluded from its own validation snapshot, and is ordinarily
not committed.

### Closed Top-Level Object

Every result contains exactly these thirteen required fields:

```json
{
  "contract": "nkf.validation-result",
  "nkf_version": "0.1",
  "execution": {},
  "checker": {},
  "contract_artifacts": {},
  "request": {},
  "bundle_id": null,
  "validated_snapshot": {},
  "phases": [],
  "conformance": "failed",
  "records": [],
  "governing_use": "not-evaluated",
  "diagnostics": []
}
```

There is no `current`, `verified`, `accepted`, `stored`, `resolved_target`, or
Realization field. Current status is derived from the exact receipt and
current governed artifacts rather than stored as a self-assertion.

### Execution And Checker Identity

`execution` contains exactly:

- lowercase UUID `id`;
- portable `runner` identity;
- fixed-millisecond UTC RFC 3339 `started_at`; and
- fixed-millisecond UTC RFC 3339 `completed_at`.

Completion cannot precede start.

`checker` contains a portable artifact `identity` and a digest object with
exactly `algorithm: sha-256` and a 64-character lowercase hexadecimal value.
Concrete released checker identity and digest remain distribution work.

Usernames, hostnames, absolute paths, credentials, secrets, and copied
operational payloads are prohibited from the portable result.

### Request Semantics

The closed request object always contains `level`, nullable `record_id`, and
`acceptance_binding`.

- `structural` requires `record_id: null` and
  `acceptance_binding: not-requested`.
- `contract` requires one non-null record ID and permits
  `acceptance_binding: requested` or `not-requested`.
- `full-bundle` requires `record_id: null` and permits either acceptance
  binding value.

When acceptance binding is not requested, accepted records report
`not-verified` and their governing use is `not-evaluated`.

### Contract Artifact Bindings

Every involved artifact binding contains:

```json
{
  "expected_sha256": "64-lowercase-hex",
  "observed_sha256": null,
  "binding": "unavailable"
}
```

Binding is exactly:

- `verified` when expected and observed digests are present and equal;
- `unavailable` when observed digest is `null`; or
- `mismatched` when both digests are present and unequal.

The result never copies artifact contents or absolute artifact locations.

`contract_artifacts.core` contains the canonical Markdown specification,
executable YAML, and exactly three schema bindings in this order:

1. `urn:nkf:0.1:schema:bundle`;
2. `urn:nkf:0.1:schema:record`; and
3. `urn:nkf:0.1:schema:validation-result`.

`contract_artifacts.extensions` is always present, is empty when no extension
is involved, and otherwise contains one entry per resolved involved extension
sorted by exact extension ID. An ambiguous or invalid extension cannot receive
an invented identity.

Digest equality and inequality are checker-enforced cross-field rules rather
than JSON Schema assertions.

### Governed Validation Inputs And Snapshot

**Governed Validation Inputs** are the exact project resources whose observed
state participates in the requested validation. NKF Core defines its initial
set; an accepted extension contract may add resource kinds. A checker cannot
add inputs ad hoc.

Each input contributes only the aspects an applicable accepted rule validates:
structural state, exact bytes, or both. The validated snapshot is calculated
solely from those inputs.

The checker builds this closed internal inventory:

```json
{
  "contract": "nkf.validation-snapshot",
  "nkf_version": "0.1",
  "inputs": [
    {
      "path": "knowledge/product.md",
      "direct_kind": "regular-file",
      "resolution": "direct",
      "resolved_path": "knowledge/product.md",
      "final_kind": "regular-file",
      "content_sha256": "64-lowercase-hex"
    }
  ]
}
```

Each logical project path appears exactly once. Applicable selectors merge;
content participates when any applicable accepted rule validates exact bytes.
Entries sort by exact `path` using the unsigned UTF-16 code-unit comparator
required by RFC 8785, without Unicode normalization or case folding.

The inventory is canonicalized as UTF-8 JSON using RFC 8785 JCS and hashed
with SHA-256. The result stores only:

```json
{
  "algorithm": "sha-256",
  "canonicalization": "rfc8785-jcs",
  "value": "64-lowercase-hex",
  "entry_count": 0
}
```

The internal inventory itself is not persisted in the result.

Core discovery, safe resolution, file-kind, symlink, bundle, declaration, and
recursive Markdown input mechanics remain exactly as recorded in the reviewed
design. The result file itself, unrelated `.nourd` content, unreferenced
non-Markdown assets, and unaccepted external resources are excluded.

### Phases And Conformance

Every emitted result contains all eleven phases exactly once in accepted
phase order. Each is a closed `id` and `state` object. State is `passed`,
`failed`, or `not-evaluated`.

The `result` phase is always `passed` in an emitted conforming result because
it means the receipt was successfully constructed and validated in memory. If
the checker cannot construct a valid receipt, no completed result exists. A
completed conformance failure still emits a valid result.

Top-level conformance is `passed` or `failed` according to the phases required
for the requested level. Authority-binding outcome can block Governing Use
Ready but does not change native conformance.

### Record Results And Governing Use

Each record result contains exactly:

```json
{
  "record_id": "product",
  "declared_governance": null,
  "conformance": "not-evaluated",
  "acceptance_binding": "not-verified",
  "governing_use": "not-ready"
}
```

Results contain each in-scope unique record ID once, sorted by exact ID.
`declared_governance` is the exact locally valid governance object or `null`
when it cannot be represented safely. Record conformance is level-relative.

The array contains every uniquely identified in-scope record for `structural`,
only the uniquely resolved requested record for `contract`, and every uniquely
identified governed record for `full-bundle`. An ambiguous or duplicate
identity contributes no invented or merged record result.

Acceptance binding is exactly `not-applicable`, `not-verified`, `verified`, or
`contradicted`. Governing use is exactly `ready`, `not-ready`, or
`not-evaluated`.

- Draft, superseded, and retired records are `not-applicable` and
  `not-ready`.
- Accepted records whose binding is unavailable or unperformed are
  `not-verified` and `not-evaluated`.
- A contradicted accepted record is `not-ready`.
- Only accepted, binding-verified, conforming, unblocked records are `ready`.
- Any conformance or governing-use blocker makes the affected record
  `not-ready`.

For `full-bundle`, all applicable records ready makes the project ready; any
not-ready record makes it not-ready; otherwise any not-evaluated record makes
it not-evaluated. Per-record readiness remains visible.

Top-level Governing Use Ready is always `not-evaluated` for `structural`; is
the unique target record's result for `contract`, or `not-ready` when the
target is missing or ambiguous; and is the aggregate above for `full-bundle`.

### Diagnostics

Every diagnostic requires `rule_id`, `severity`, `blocking`, `phase`,
and non-empty `message`. Optional `artifact`, `record_id`,
`instance_pointer`, `source_section`, and `remediation` fields are omitted
when unavailable, never set to `null`.

Artifact paths are project-relative and use `/`. Diagnostics contain no secret
or copied payload. They sort by accepted phase, then optional artifact,
record ID, instance pointer, source section, and rule ID, with absent values
first and RFC 8785 string comparison. Duplicate complete diagnostic identities
are prohibited. Message and remediation wording are non-contractual.

### Currentness

`NKF Verified` means current full-bundle conformance only. It does not mean
acceptance, semantic correctness, evidence sufficiency, Governing Use Ready,
or confirmed Realization.

A stored passing result is current only while:

- its Governed Validation Inputs still produce the recorded snapshot;
- its core specification, executable YAML, and schema bindings match the
  currently accepted NKF 0.1 artifact revision; and
- its checker artifact remains recognized and supported for that revision.

Otherwise it remains historical operational evidence and status is
**verification outdated** until a new full-bundle validation completes.

Normal acceptance changes follow the governed change process and therefore
change applicable Governed Validation Inputs. When no governed input changes,
NKF 0.1 does not infer a hidden acceptance change or poll an authority.
Universal expiry and separate authority-freshness mechanisms remain deferred
under
[`NKF-005`](../tasks/deferred/NKF-005-validation-expiry-and-authority-freshness.md).

## Authority And Realization Boundary

This Decision accepts the exact result meaning and serialization boundary. It
does not promote the reviewed structural proposal to the canonical schema
path and does not modify the current Markdown/YAML authority pair in place.

The current authority pair must be replaced and rebound through ADR 0006.
Only then may a source-bound validation-result schema be derived, validated,
and separately confirmed.

Cross-field digest equality, chronological ordering, request-dependent
aggregation, phase dependencies, record sorting and uniqueness, diagnostic
sorting and uniqueness, snapshot construction, and currentness are checker
rules outside ordinary JSON Schema expressiveness.

## Compatibility And Non-Claims

This is a pre-stable NKF 0.1 clarification. It introduces no NKF sub-version
and no result-contract version.

This Decision does not:

- implement or confirm checker code or fixtures;
- establish checker identity, packaging, distribution, release, or support;
- validate a consumer project;
- verify an acceptance binding;
- accept knowledge or confirm semantic adequacy;
- confirm a Realization;
- create a conformance result; or
- authorize consumer migration.
