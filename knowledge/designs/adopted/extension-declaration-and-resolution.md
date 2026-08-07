---
id: design-nkf-0-1-extension-declaration-and-resolution
type: design
summary: Whether the following extension identity, contract binding, declaration, support, round-trip, and fail-closed rules are the native NKF 0.1 extension mechanism.
created_at: 2026-07-29T20:06:17Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0016
decision_authority: Human Product Owner, Nourd ApS
---

# NKF 0.1 Extension Declaration And Resolution

- **Proposal Authority Effect:** None
- **Proposal evidence:** imported NKF-002 `required_extensions`,
  `extensions`, and `supported_extensions` shapes and checker behavior; none
  is authority

## Decision Sought

Whether the following extension identity, contract binding, declaration,
support, round-trip, and fail-closed rules are the native NKF 0.1 extension
mechanism.

## Extension Boundary

An extension may add namespaced types, body contracts, vocabularies,
declaration payloads, deterministic constraints, or interoperability data for
an explicitly governed scope.

An extension must not:

- change, weaken, replace, or reinterpret core NKF 0.1 fields or rules;
- introduce Product claims absent from canonical Markdown;
- make copied metadata or conformance evidence prove acceptance;
- create a second NKF version coordinate;
- hide live operational state, credentials, or secrets in a declaration; or
- claim core NKF support merely because one consumer understands it.

If extension meaning conflicts with core NKF 0.1, validation fails closed.

## Identity

An extension has one lowercase owner-namespaced identifier matching:

```text
^[a-z][a-z0-9]*(?:\.[a-z](?:[a-z0-9-]*[a-z0-9])?){2,}$
```

Examples: `com.example.presentation` and `org.example.attestation`.

The first namespace `nkf` is reserved for extensions owned and accepted by
NKF. Other namespaces must be controlled by the extension authority. Namespace
text is an ownership claim, not proof of ownership.

Extension identifiers have no `/v1`, `/v2`, or other independent version.
`nkf_version: "0.1"` is the only version coordinate. Exact extension
revisions are identified by artifact digests.

## Extension Contract Authority

Every used extension is governed by its own digest-bound pair:

1. normative Markdown owning the complete human-readable extension meaning;
2. an executable YAML companion with canonical identity `nkf.extension`,
   `nkf_version: "0.1"`, the exact extension identifier, its allowed
   application sites, payload shape, vocabularies, constraints, and
   deterministic validation rules.

The pair follows ADR 0007 and ADR 0012: Markdown remains human authority, YAML
is the executable companion, and a conflict fails closed. An extension
artifact digest is an exact revision identifier, not another semantic version.

Acceptance of an extension contract belongs to its stated authority. NKF core
acceptance is required only for an `nkf`-owned extension or for presenting
external extension meaning as native core meaning.

## Bundle Extension Catalog

When any extension is used, the bundle manifest contains
`extension_contracts`, a non-empty duplicate-free list with this exact shape:

```yaml
extension_contracts:
  - id: com.example.presentation
    specification:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
    executable:
      locator: <durable locator>
      digest:
        algorithm: sha-256
        value: <64 lowercase hexadecimal characters>
```

Each catalog ID is unique. Both locators are required and must resolve to the
exact declared bytes. The executable artifact must declare the same extension
ID and `nkf_version` as the bundle.

The universal interpretation of locators and the distribution boundary remain
a separate NKF 0.1 decision. Until that decision is accepted, a consumer that
cannot resolve a locator and verify its digest treats the extension as
unsupported.

The catalog is bundle-local resolution metadata, not a public extension
registry. A public registry and its compatibility policy remain out of scope.

## Extension Use

The bundle manifest and each record may contain an `extensions` list. Each
entry has this exact shape:

```yaml
extensions:
  - contract: com.example.presentation
    requirement: required
    payload: {}
```

Rules:

- `contract` must resolve uniquely through the bundle's
  `extension_contracts`;
- `requirement` is exactly `required` or `optional`;
- `payload` is required and may contain any JSON-compatible YAML value allowed
  by the extension contract;
- extension contract IDs are unique within each `extensions` list;
- list order carries no meaning; and
- empty `extension_contracts` and `extensions` lists are omitted.

There is no separate `required_extensions` field. Requirement is stated once,
on the exact extension use, so a list and payload map cannot drift.

An extension necessary to interpret a record's type, body contract, authority,
responsibilities, relationships, governing meaning, or consequential use must
be `required`. An `optional` extension may provide only nonessential display,
discovery, interoperability, or advisory data.

A record using a profile-defined type or body contract must declare the
owning extension as `required`. The bundle must also declare that extension as
`required` when interpreting the bundle itself depends on the profile.

## Support And Validation

A consumer supports an extension use only when it:

1. resolves both contract artifacts;
2. verifies both exact digests;
3. verifies matching extension identity and `nkf_version`;
4. recognizes the exact executable-contract digest; and
5. implements all required deterministic and semantic-review boundaries
   stated by that contract.

Similarity of identifiers, a schema that parses the payload, or support for a
different digest does not establish support.

The native NKF 0.1 core supported-extension set is empty. Extension contracts
become supported only through a later accepted profile or consumer
capability; they do not become core by appearance in a bundle.

Validation behavior is:

| Condition | Required behavior |
| --- | --- |
| Required extension unsupported, unresolvable, or digest-mismatched | Record or bundle contract conformance fails; consequential governing action fails closed |
| Required extension payload missing or invalid | Record or bundle contract conformance fails |
| Optional extension unsupported | Preserve and expose it; core validation may continue but must report that extension semantics were not validated |
| Supported optional extension payload invalid | Record or bundle contract conformance fails because a declared understood contract is violated |
| Extension conflicts with core NKF | Fail closed regardless of `requirement` |

An unsupported optional extension does not by itself prevent native core
contract conformance. A validator must not claim that extension's semantic
validation or use its payload for a consequential decision.

## Round-Trip Requirement

An unsupported extension's catalog entry, use metadata, and payload must remain
visible and must be preserved without data-model loss when a consumer reads
and writes the bundle.

Round-trip preservation means retaining JSON-compatible keys, values, arrays,
objects, nulls, numbers, booleans, and strings. It does not require preserving
YAML comments, anchors, aliases, scalar style, whitespace, or key order.
Consumers unable to preserve the payload must operate read-only or fail rather
than silently dropping it.

## Deliberate Differences From Imported Checker Evidence

This proposal does not adopt the checker model unchanged:

- the separate `required_extensions` list is replaced by one
  `requirement` value on each extension use;
- arbitrary extension-map keys are replaced by unique structured entries;
- every used extension resolves through exact Markdown and YAML digests;
- support requires an exact executable revision, not membership in an
  unbound string list;
- extension identity uses the single NKF version namespace without `/v1`; and
- the absence of currently supported core extensions is explicit.

## Exact Confirmation Requested

> Accept the extension identifier grammar, digest-bound extension authority
> pair, bundle catalog, bundle/record extension-use shape, support rules,
> round-trip behavior, and fail-closed semantics exactly as stated above for
> native NKF 0.1.

Acceptance would establish the extension mechanism only. It would not accept
any concrete extension, a public registry, the remaining universal path
boundary, acceptance-proof storage, replacement Markdown or YAML bytes,
schemas, checker behavior, fixtures, distribution, a release, conformance, or
consumer migration.
