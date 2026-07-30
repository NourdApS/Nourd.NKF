# NKF 0.1 Initial Release Distribution

- **Status:** Proposal
- **Task:** `NKF-003`
- **Decision Basis:** ADR 0042
- **Prepared:** 30 July 2026
- **Authority Effect:** None until the consequential release-contract boundary
  and exact realization are separately accepted and confirmed

## Purpose

This proposal defines one reproducible distribution unit for the confirmed
native NKF 0.1 checker and the exact authority artifacts it implements. It
turns ADR 0042's accepted channel boundary into reviewable archive, manifest,
integrity, pinning, and release mechanics.

It does not publish a release, change NKF 0.1 meaning, or claim conformance.

## Proposed Archive

The Github Release contains exactly one distribution asset:

```text
nourd-nkf-sha256-<full-archive-sha256>.tar.gz
```

The filename embeds the full lowercase SHA-256 digest of the exact archive
bytes. The archive has one stable root and the following exact layout:

```text
nourd-nkf/
  contracts/
    nkf/
      0.1/
        nkf.yaml
        schemas/
          bundle.schema.json
          record.schema.json
          release-manifest.schema.json
          validation-result.schema.json
  dist/
    nourd-nkf-checker.mjs
  knowledge/
    specifications/
      nkf-0.1.md
  release-manifest.json
```

The stable `nourd-nkf/` root avoids making an internal path another release or
format identity. The existing paths below that root let the confirmed
executable resolve `../contracts/nkf/0.1` relative to its location and let the
contract loader resolve the canonical Markdown without code changes.

The archive contains exactly the eight displayed regular-file entries, sorted
by their exact ASCII path bytes. It contains no explicit directory entries.
Symlinks, hard links, devices, path traversal, absolute paths, duplicate
paths, case-colliding paths, and any ninth entry are forbidden.

## Proposed Release Manifest

`release-manifest.json` is proposed as a closed native NKF 0.1 distribution
contract with unversioned identity:

```text
nkf.release-manifest
```

It uses the one NKF version coordinate, `0.1`. It has no manifest, checker,
schema, package, or release sub-version.

The exact proposed logical shape is below. Angle-bracketed values are
realization placeholders whose exact bytes cannot exist until the required
authority reconciliation and new checker confirmation are complete:

```json
{
  "contract": "nkf.release-manifest",
  "nkf_version": "0.1",
  "source": {
    "repository": "https://github.com/kaveh6202/Nourd.NKF.git",
    "release_commit": "<40-lowercase-hex-source-commit>",
    "checker_confirmation": {
      "decision": "<checker-release-confirmation-decision>",
      "source_commit": "<40-lowercase-hex-checker-source-commit>"
    }
  },
  "checker": {
    "identity": "nourd-nkf-checker",
    "path": "dist/nourd-nkf-checker.mjs",
    "sha256": "<confirmed-release-checker-sha256>",
    "runtime": {
      "name": "node",
      "minimum_major": 22
    }
  },
  "authority": {
    "precedence": "normative-markdown",
    "markdown": {
      "path": "knowledge/specifications/nkf-0.1.md",
      "sha256": "<accepted-release-markdown-sha256>"
    },
    "executable": {
      "path": "contracts/nkf/0.1/nkf.yaml",
      "sha256": "<accepted-release-yaml-sha256>"
    }
  },
  "schemas": [
    {
      "identity": "urn:nkf:0.1:schema:bundle",
      "path": "contracts/nkf/0.1/schemas/bundle.schema.json",
      "sha256": "<confirmed-release-bundle-schema-sha256>"
    },
    {
      "identity": "urn:nkf:0.1:schema:record",
      "path": "contracts/nkf/0.1/schemas/record.schema.json",
      "sha256": "<confirmed-release-record-schema-sha256>"
    },
    {
      "identity": "urn:nkf:0.1:schema:release-manifest",
      "path": "contracts/nkf/0.1/schemas/release-manifest.schema.json",
      "sha256": "<confirmed-release-manifest-schema-sha256>"
    },
    {
      "identity": "urn:nkf:0.1:schema:validation-result",
      "path": "contracts/nkf/0.1/schemas/validation-result.schema.json",
      "sha256": "<confirmed-release-validation-result-schema-sha256>"
    }
  ]
}
```

All objects are closed. All fields are required. Paths are normalized relative
paths under `nourd-nkf/`, and schema entries are ordered by exact identity.
Every SHA-256 value is 64 lowercase hexadecimal characters.

`release_commit` is the future clean source checkpoint from which the release
archive is built. It may be distinct from the checker source checkpoint when
packaging-only work changes no distributed checker byte. The manifest binds
both identities explicitly.

ADR 0041 and executable SHA-256
`f64d772cb628d6c1fe7dd337baceecb75007fdabe74f91bd87971e063a362d0c`
remain the current development baseline. They cannot be copied into the first
release manifest by implication: adding the native release-manifest contract
will replace the Markdown/YAML authority pair, add a fourth schema binding,
and require a correspondingly rebound checker Realization. The realized
manifest uses only the later exact digests after those steps are independently
confirmed.

The manifest omits its own digest, the containing archive digest, asset name,
tag, release URL, publication timestamp, latest status, and Github mutable
state. Including any containing-byte digest would be circular; including
locator state would make otherwise identical builds differ.

## Proposed Manifest Encoding

The manifest is encoded as UTF-8 JSON with:

- two-space indentation;
- LF line endings;
- one final LF;
- object members in the displayed contract order;
- schema entries in exact identity order;
- no byte-order mark; and
- no insignificant trailing whitespace.

The release packager constructs the object from verified source bytes and then
serializes it; it does not copy an independently edited manifest into the
archive.

## Proposed Deterministic Packaging

The packager operates only from a clean checkout at `release_commit`.

Before packaging it:

1. installs the exact locked dependencies;
2. runs the complete accepted development check;
3. builds the portable executable twice and verifies the confirmed checker
   digest both times;
4. verifies the exact Markdown, YAML, and four schema digests;
5. constructs and validates the closed release manifest; and
6. assembles the archive twice and requires identical SHA-256 results.

Archive entries use exact ASCII-byte path order, fixed modification time,
numeric owner and group `0`, empty owner and group names, mode `0755` for the
checker, and mode `0644` for other files. Packaging uses USTAR headers without
PAX extensions. Gzip uses fixed compression level `9`, modification time `0`,
operating-system byte `255`, and no filename, comment, or extra field. The
packager fails closed if the source tree is dirty, a required digest differs,
an unexpected archive entry appears, or either reproducibility comparison
fails.

The archive filename is assigned only after its bytes and SHA-256 digest
exist. Because the filename is outside the archive, this creates no circular
binding.

## Proposed Consumer Verification

A consumer's dependency or tooling configuration stores:

- repository `kaveh6202/Nourd.NKF`;
- the exact release-asset name or durable asset locator; and
- the full expected archive SHA-256.

This pin does not belong in `bundle.yaml`: selecting and installing checker
tooling is operational dependency state, while the bundle declares governed
knowledge. The persisted NKF validation result separately records the exact
checker identity and executable digest that actually performed validation.

Consumer tooling:

1. downloads bytes from the locator;
2. verifies the full expected archive SHA-256 before extraction;
3. extracts into an empty directory using traversal- and link-safe handling;
4. validates the closed manifest;
5. verifies every manifest-bound file digest and path;
6. rejects unexpected regular files below `nourd-nkf/`; and
7. invokes:

```text
node <distribution-root>/dist/nourd-nkf-checker.mjs --project <project-root>
```

The tag, release name, asset URL, and Github user interface are locators only.
A valid download from a mutable or replaced locator is rejected whenever its
bytes do not match the consumer's full digest pin.

## Proposed Github Release Workflow

The release is created from the exact `release_commit` as a draft and marked
as a prerelease because NKF 0.1 is pre-stable.

The proposed tag is:

```text
release-sha256-<full-archive-sha256>
```

The tag is a content-derived locator, not an NKF version or independent
authority. The full archive digest remains the consumer pin. Before
publication, release automation downloads the one uploaded asset, reverifies
its name, full digest, safe contents, manifest, internal artifact digests,
checker help command, and exact source commit.

If immutable Github Releases are available and enabled for the repository,
the draft is published only after those checks pass so the published tag and
asset become immutable. If that repository capability is unavailable, the
full consumer digest still fails closed against later asset replacement.

Artifact attestations may be added later as additional provenance when the
repository plan and governance support them. They are not a substitute for
the content address and are not required by this proposal.

## Authority Reconciliation Required

The current NKF 0.1 Markdown still lists schema/checker packaging as unresolved.
The YAML says schema self-digests live in release metadata but does not define
that metadata's contract. A release-manifest implementation created only in
packaging code would therefore become an ungoverned parallel contract.

The recommended resolution is to:

1. accept `nkf.release-manifest` as another unversioned native identity governed
   solely by `nkf_version: "0.1"`;
2. add its exact human meaning to the canonical Markdown;
3. add its executable shape and archive rules to the YAML companion;
4. derive
   `contracts/nkf/0.1/schemas/release-manifest.schema.json` with identity
   `urn:nkf:0.1:schema:release-manifest`;
5. classify that fourth schema as release-package enforcement, not as a
   project-validation schema or an additional
   `validation_result.contract_artifacts.schemas` entry;
6. include that fourth schema in the archive and manifest;
7. replace the current unresolved-matters statement so exact checker bytes and
   private schema/checker packaging are no longer called unresolved while
   public distribution remains explicitly unresolved; and
8. replace, rebind, and separately confirm the resulting authority pair,
   four-schema set, and checker before implementing the packager.

This is an NKF 0.1 pre-stable contract addition, not a new version namespace.
It changes release metadata and package enforcement, not the Product knowledge
record structure, project Governed Validation Inputs, or the three schemas
used to validate a project and serialize its validation result.

## Review Findings

The proposed topology has no digest cycle: the archive digest binds the
manifest, and the manifest binds every other distributed file. It preserves
the confirmed checker's required relative paths and separates:

- NKF format version from release locator and integrity identity;
- source checkpoint from checker Realization checkpoint;
- authoritative Markdown from executable companions;
- distribution acceptance from release realization; and
- installed-tool pinning from knowledge declaration and validation evidence.

The one open consequential boundary is whether to make the release manifest
and its schema a native NKF 0.1 contract through the authority reconciliation
above. Packaging should not begin until that boundary is accepted or replaced.
