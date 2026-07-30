# ADR 0028: Confirm Pre-Checker NKF 0.1 Json Schema Realization

- **Status:** Accepted
- **Task:** `NKF-003`
- **Proposed:** 30 July 2026
- **Accepted:** 30 July 2026
- **Decision Authority:** Codex technical reviewer, acting under the Human
  Product Owner's direct authorization to approve exact derived revisions
  after independent review
- **Authorization Source:** Earlier direct NKF-003 instruction granting the
  reviewer permission to accept exact revisions if approved, together with
  the 30 July 2026 direction to complete all work before checker
  implementation
- **Accepted Source Pair:** ADR 0027

## Context

ADR 0027 replaces the canonical NKF 0.1 authority pair. The bundle and record
schemas confirmed by ADR 0023 remain exact historical realization of the
superseded ADR 0022 pair, but their embedded source digests no longer match
current authority.

ADR 0024 adds the optional bundle `canonical_terms` field. ADR 0025 requires a
third schema for the exact operational validation-result structure. All other
new CommonMark, Title Case, Mermaid, snapshot, ordering, aggregation,
security, currentness, and semantic requirements remain assigned to checker,
resolver, or human-review layers rather than being invented in JSON Schema.

## Review

The reviewer derived and audited three JSON Schema 2020-12 proposals:

- [`../designs/nkf-0.1-pre-checker-bundle-schema-proposal.json`](../designs/nkf-0.1-pre-checker-bundle-schema-proposal.json);
- [`../designs/nkf-0.1-pre-checker-record-schema-proposal.json`](../designs/nkf-0.1-pre-checker-record-schema-proposal.json); and
- [`../designs/nkf-0.1-pre-checker-validation-result-schema-proposal.json`](../designs/nkf-0.1-pre-checker-validation-result-schema-proposal.json).

Validation used pinned Ajv `8.17.1` with `ajv-formats` `3.0.1`, strict mode,
all errors, Draft 2020-12, and explicit registration of `x-nkf-source` as a
non-assertive annotation keyword.

Strict compilation found and corrected one derived mechanics defect in the
initial result proposal: `$ref`/`allOf` object refinements using `properties`
needed explicit `type: object` declarations. The correction changes no
accepted result meaning.

The final review verified:

- strict compilation of all three exact schemas;
- exact current Markdown and YAML source paths and digests;
- locally resolved references and regular-expression compilation;
- closed object boundaries and accepted required-field sets;
- exact result field, phase, request, artifact-binding, record, diagnostic,
  and fixed schema-order structures;
- canonical-term non-empty, unique, single-U+0020 whitespace grammar;
- preservation of Title Case and core-term conflict checks in the checker
  layer;
- preservation of digest equality, chronological ordering, phase dependency,
  sorting, uniqueness-by-ID, readiness aggregation, snapshot construction,
  and currentness in the checker layer; and
- 32 focused positive, negative, and enforcement-partition probes.

The schema deltas were mechanically constrained:

- bundle: current source bindings plus optional `canonical_terms` only;
- record: current source bindings only; and
- validation result: current source bindings plus strict object-refinement
  mechanics only, relative to the ADR 0025 structural proposal.

## Decision

The exact reviewed schemas are confirmed as the current derived JSON Schema
realization of NKF 0.1:

| Schema | Canonical Artifact | SHA-256 |
| --- | --- | --- |
| Bundle | [`../../contracts/nkf/0.1/schemas/bundle.schema.json`](../../contracts/nkf/0.1/schemas/bundle.schema.json) | `946a310fe1de2bdfae7297e3c80183f2d85e40397c7a5374b35c5ddbe241e8d4` |
| Record | [`../../contracts/nkf/0.1/schemas/record.schema.json`](../../contracts/nkf/0.1/schemas/record.schema.json) | `b0662b8019b14a9d20c8866cb68e6232b0ca4a3573860088e262430e692257ac` |
| Validation Result | [`../../contracts/nkf/0.1/schemas/validation-result.schema.json`](../../contracts/nkf/0.1/schemas/validation-result.schema.json) | `59c44cb56001343aa8d7438827a00ebc56896fe86ab12ece03f6b62e65155fca` |

Promotion copies the reviewed proposal bytes unchanged. Each schema identifies:

- NKF version `0.1`;
- Markdown path `knowledge/specifications/nkf-0.1.md` and SHA-256
  `5b0aa9c6851217f0c88a97de03f8d7fce0c495053d6e411a317946fda749092e`;
  and
- YAML path `contracts/nkf/0.1/nkf.yaml` and SHA-256
  `8ef4ff36f6d2ab1eb8e58704d8d16929e1c07a2b6f617a626dbce1769c52ac66`.

Schema self-digests remain release metadata and are not embedded recursively.

## Enforcement Boundary

The schemas enforce only their accepted local layer: closed shapes, required
fields, constants, primitives, local enums, cardinalities, duplicate-free
scalar arrays, lexical patterns, formats, fixed tuple order, and local
conditions.

Project paths and files, source bytes, Markdown interpretation, Title Case,
core canonical-term conflict, graph and body-contract rules, artifact digest
equality, snapshot construction, record/diagnostic ordering and uniqueness,
chronology, readiness aggregation, secret scanning, currentness, acceptance
binding, semantic adequacy, and Realization confirmation remain outside JSON
Schema as accepted.

## Supersession And Compatibility

These revisions replace the ADR 0023 schemas as the current canonical schema
realization. ADR 0023 and its exact files remain immutable historical
confirmation of the prior authority pair.

No NKF sub-version or schema version is introduced. Consumers require a
deliberate release and migration; schema confirmation alone does not authorize
consumer adoption.

## Non-Claims

This Decision does not:

- implement or confirm the bundle-aware checker;
- establish positive or negative conformance fixtures beyond the schema-layer
  review probes;
- establish checker identity, packaging, integrity distribution, release,
  support, or CI;
- validate a consumer project;
- verify an acceptance binding;
- accept knowledge or confirm semantic adequacy;
- confirm a Realization;
- produce an NKF conformance result; or
- authorize consumer migration.
