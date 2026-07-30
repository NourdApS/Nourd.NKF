# ADR 0052: Confirm Dynamic Root And Self-Hosting Realization

- **Status:** Accepted
- **Task:** `NKF-003`
- **Accepted:** 30 July 2026
- **Decision Authority:** Codex technical reviewer under the Human Product
  Owner's explicit dynamic-root feature delegation
- **Normative Markdown Digest:** `sha256:8fa484035c2fccf401cb966cf39ae57e17d214178c0153ad43d53790d7832e50`
- **Executable YAML Digest:** `sha256:fd60ad052ff5b58a20b285fec03aede560cd84d18221f7b2d88b7db7fdf67dbd`
- **Portable Checker Digest:** `sha256:9d7f63778c8794ef5326b4704d0daac5c6eac7e65c5df17bd4c95d19d1fd8f57`

## Context

ADR 0050 accepts the exact Common, Product, and Technology authority pair.
ADR 0051 accepts the bounded heading-only migration required to represent
legacy NKF knowledge as native records without weakening Title Case or hiding
the earlier source revisions.

Acceptance of those meanings does not confirm their schemas, checker,
fixtures, generator, project declarations, or self-hosted conformance.
Separate realization review is required.

## Confirmed Derived Schemas

The current source-bound project schemas are confirmed as exact derived
realization:

| Schema | SHA-256 |
| --- | --- |
| Bundle | `7d923662563b1b298bb79cacf95f1ad4e836f7322295508b14491a646cd297d8` |
| Record | `e92f7ba4b87ab21042f768b1b0f78bcbd0050911c229233e3073a80e487b75d4` |
| Validation Result | `d544485bf693d7e23d6c34ec87d4ac484d6bba40360f8d2a8b8c4466b26a017a` |

Each schema remains derived from the exact Markdown and executable YAML
digests above. The release-manifest schema is unchanged by this feature and
retains its separately confirmed release boundary.

## Confirmed Checker Behavior

The native checker now:

- resolves exactly one Product or Technology Root Profile and rejects Common
  as a selectable root;
- enforces profile-specific root types, permitted bodies, required Technology
  Specifications, Product hierarchy, and Technology hierarchy prohibition;
- validates root-neutral `scope.root`;
- validates Technology governed-artifact identity, path, file kind, digest,
  profile permission, Realization ownership, and source-section binding;
- includes governed-artifact bytes in the Governed Validation Inputs
  snapshot;
- applies root and accepted-Specification lifecycle rules;
- restricts binding kinds by selected profile; and
- reports selected profile resolution in the closed validation result.

The accepted diagnostic registry contains 130 stable project rules with
Markdown/YAML severity parity and complete implementation and fixture
references.

## Confirmed Fixtures And Gates

The Product fixture is deliberately migrated to `root` and `scope.root`.
A Technology fixture covers a Technology root, immutable accepted
Specification, Realization, and digest-bound governed artifact.

The complete local development gate passes:

- TypeScript type checking;
- 90 unit and integration tests in 15 test files;
- positive Product and Technology fixtures;
- negative profile, hierarchy, lifecycle, artifact, source, security,
  extension, authority, and result cases;
- deterministic build and build-integrity verification; and
- an automated NKF repository self-hosting test.

## Confirmed Self-Hosting Realization

The repository now contains a project-root `.nourd` declaration selecting
`nkf.profile.technology`. It represents every Markdown file under
`knowledge/` as one native record or explicit non-record and declares the
technical files that participate in validity as governed artifacts bound to
the NKF 0.1 Native Realization.

The reproducible generator derives record declarations and artifact digests
from exact repository sources. The final full-bundle validation result is
operational evidence at `.nourd/validation-result.json`; it is regenerated
after this Decision and is not authority for the confirmation recorded here.

## Separation Of Claims

ADR 0050 supplies semantic acceptance. This Decision supplies confirmed
derived realization. A current passing full-bundle result supplies
conformance. These facts remain separate.

No unconfigured external acceptance resolver has verified every historical
record binding, so Governing Use Ready may remain `not-evaluated` or
`not-ready` even when self-host conformance passes.

## Non-Claims

This Decision does not:

- prove semantic adequacy of generated responsibility or role bindings;
- verify external acceptance events for every historical record;
- prove governed technical artifacts implement the Specification correctly;
- confirm a new release package, tag, upload, Github Release, or public
  distribution;
- migrate Nourd Agent SDK or another consumer; or
- accept another Root Profile, selectable generic root, or future extension.
