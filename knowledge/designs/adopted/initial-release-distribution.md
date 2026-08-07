---
id: design-nkf-0-1-initial-release-distribution
type: design
title: NKF 0.1 Initial Release Distribution
summary: This proposal defines one reproducible distribution unit for the confirmed native NKF 0.1 checker and the exact authority artifacts it implements. It turns ADR 0042's accepted channel boundary into reviewable archive, manifest, integrity, pinning, and release mechanics.
created_at: 2026-07-30T08:39:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
design_disposition: adopted
design_decisions:
  - adr-0042
  - adr-0043
  - adr-0044
proposal_authority_effect: None until the consequential release-contract boundary and exact realization are separately accepted and confirmed
---

# NKF 0.1 Initial Release Distribution

- **Decision Basis:** [ADR 0042](../../decisions/0042-release-distribution.md)

## Purpose

This proposal defines one reproducible distribution unit for the confirmed
native NKF 0.1 checker and the exact authority artifacts it implements. It
turns [ADR 0042](../../decisions/0042-release-distribution.md)'s accepted channel boundary into reviewable archive, manifest,
integrity, pinning, and release mechanics.

It does not publish a release, change NKF 0.1 meaning, or claim conformance.

## Proposed Archive

The Github Release contains exactly one uploaded NKF distribution asset:

```text
nourd-nkf-sha256-<full-archive-sha256>.tar
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
      "path": "<checker-release-confirmation-decision-path>",
      "digest": {
        "algorithm": "sha-256",
        "value": "<checker-release-confirmation-decision-sha256>"
      },
      "checker_source_commit": "<40-lowercase-hex-checker-source-commit>"
    }
  },
  "checker": {
    "identity": "nourd-nkf-checker",
    "path": "dist/nourd-nkf-checker.mjs",
    "digest": {
      "algorithm": "sha-256",
      "value": "<confirmed-release-checker-sha256>"
    },
    "runtime": {
      "name": "node",
      "minimum_major": 22
    }
  },
  "authority": {
    "precedence": "normative-markdown",
    "markdown": {
      "path": "knowledge/specifications/nkf-0.1.md",
      "digest": {
        "algorithm": "sha-256",
        "value": "<accepted-release-markdown-sha256>"
      }
    },
    "executable": {
      "path": "contracts/nkf/0.1/nkf.yaml",
      "digest": {
        "algorithm": "sha-256",
        "value": "<accepted-release-yaml-sha256>"
      }
    }
  },
  "schemas": [
    {
      "identity": "urn:nkf:0.1:schema:bundle",
      "path": "contracts/nkf/0.1/schemas/bundle.schema.json",
      "digest": {
        "algorithm": "sha-256",
        "value": "<confirmed-release-bundle-schema-sha256>"
      }
    },
    {
      "identity": "urn:nkf:0.1:schema:record",
      "path": "contracts/nkf/0.1/schemas/record.schema.json",
      "digest": {
        "algorithm": "sha-256",
        "value": "<confirmed-release-record-schema-sha256>"
      }
    },
    {
      "identity": "urn:nkf:0.1:schema:release-manifest",
      "path": "contracts/nkf/0.1/schemas/release-manifest.schema.json",
      "digest": {
        "algorithm": "sha-256",
        "value": "<confirmed-release-manifest-schema-sha256>"
      }
    },
    {
      "identity": "urn:nkf:0.1:schema:validation-result",
      "path": "contracts/nkf/0.1/schemas/validation-result.schema.json",
      "digest": {
        "algorithm": "sha-256",
        "value": "<confirmed-release-validation-result-schema-sha256>"
      }
    }
  ]
}
```

All objects are closed. All fields are required. Paths are normalized relative
paths under `nourd-nkf/`, and schema entries are ordered by exact identity.
Every digest uses algorithm `sha-256` and a 64-lowercase-hexadecimal value.

`release_commit` is the future clean source checkpoint from which the release
archive is built. It may be distinct from the checker source checkpoint when
packaging-only work changes no distributed checker byte. The manifest binds
both identities explicitly.

[ADR 0041](../../decisions/0041-checker-development-realization.md) and executable SHA-256
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
4. verifies the checker-confirmation Decision path, digest, and source binding;
5. verifies the exact Markdown, YAML, and four schema digests;
6. constructs and validates the closed release manifest; and
7. assembles the archive twice and requires identical SHA-256 results.

Archive entries use exact ASCII-byte path order, fixed modification time,
numeric owner and group `0`, empty owner and group names, mode `0755` for the
checker, and mode `0644` for other files. Packaging uses uncompressed USTAR
with regular-file type flags, zero device values, zero content padding, two
final zero blocks, and no PAX extensions. The packager fails closed if the
source tree is dirty, a required digest differs, an unexpected archive entry
appears, or either reproducibility comparison fails.

The archive filename is assigned only after its bytes and SHA-256 digest
exist. Because the filename is outside the archive, this creates no circular
binding.

## Proposed Consumer Verification

A consumer's dependency or tooling configuration stores:

- repository `kaveh6202/Nourd.NKF`; and
- the full expected archive SHA-256.

The exact tag and asset name are derived from that digest. A consumer may cache
a durable asset locator, but it is not an additional trust anchor.

This pin does not belong in `bundle.yaml`: selecting and installing checker
tooling is operational dependency state, while the bundle declares governed
knowledge. The persisted NKF validation result separately records the exact
checker identity and executable digest that actually performed validation.

Consumer tooling:

1. downloads bytes from the locator;
2. verifies the full expected archive SHA-256 before extraction;
3. inspects and extracts into an empty directory using
   traversal- and link-safe handling;
4. strictly parses the fixed-path manifest and verifies its bootstrap
   contract, version, and release-manifest-schema entry;
5. verifies the fixed-path release-manifest schema digest before compiling it;
6. validates the closed manifest with that schema;
7. verifies every other manifest-bound file digest and path;
8. rejects unexpected regular files below `nourd-nkf/`; and
9. invokes:

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

## External Platform Evidence

The platform workflow above was checked against official Github documentation
on 30 July 2026:

- [Managing Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
  confirms tag-based releases, draft preparation, prerelease classification,
  and uploaded binary assets;
- [Immutable Releases](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/establish-provenance-and-integrity/prevent-release-changes)
  confirms that published release tags and assets can be locked while drafts
  remain editable; and
- [Artifact Attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations)
  documents additional plan requirements for private repositories, so
  attestation is not made a native release precondition here.

These external platform capabilities support realization but do not own NKF
format meaning or replace the independent archive digest.

## Proposed Normative Markdown Delta

The exact semantic proposal adds `nkf.release-manifest` to the unversioned
native identities in **Versioning**, adds the initial release distribution to
the positive **Scope** list, adds the release-manifest schema separately from
the three project-validation schemas in **Conformance**, and inserts the
following section before **Security And Privacy**:

````markdown
## Release Distribution

NKF 0.1 uses one content-addressed archive attached to a Github Release in
`kaveh6202/Nourd.NKF` as its initial native checker distribution. The archive
is release metadata and tooling, not Product knowledge, a project declaration,
an acceptance record, or a conformance result.

The release, tag, asset name, source commit, archive digest, checker digest,
and schema digests are distribution, provenance, or integrity identities.
They are not NKF versions. `nkf_version: "0.1"` remains the only format
version.

### Release Manifest

The archive contains exactly one UTF-8 JSON `release-manifest.json` at its
distribution root. It has contract identity `nkf.release-manifest` and
`nkf_version: "0.1"`.

The manifest is one closed JSON object with exactly six required top-level
fields in this logical shape:

```text
contract, nkf_version, source, checker, authority, schemas
```

`source` contains the exact NKF repository, the 40-lowercase-hexadecimal Git
commit from whose clean checkout the release is built, and the accepted
checker-confirmation Decision with its exact repository path and SHA-256 in
that release commit, plus the exact 40-lowercase-hexadecimal checker source
checkpoint the Decision confirms. The Decision ID and four-digit path prefix
must match.

`checker` contains identity `nourd-nkf-checker`, exact relative path
`dist/nourd-nkf-checker.mjs`, its SHA-256 digest, and runtime name `node` with
minimum major version `22`.

`authority` fixes precedence to `normative-markdown` and binds:

- `knowledge/specifications/nkf-0.1.md`; and
- `contracts/nkf/0.1/nkf.yaml`.

`schemas` contains exactly four entries in exact identity order:

1. `urn:nkf:0.1:schema:bundle`;
2. `urn:nkf:0.1:schema:record`;
3. `urn:nkf:0.1:schema:release-manifest`; and
4. `urn:nkf:0.1:schema:validation-result`.

Every checker, authority, and schema artifact has its exact fixed relative
path and one digest object whose algorithm is `sha-256` and whose value is 64
lowercase hexadecimal characters. All manifest objects are closed and all
their fields are required.

The manifest uses two-space indentation, LF line endings, one final LF, no
byte-order mark, no trailing whitespace, top-level and nested object members
in contract order, and schema entries in exact identity order. Member order
does not change its logical meaning but is fixed for reproducible release
bytes.

The manifest omits its own digest, the containing archive digest, asset name,
tag, release URL, publication time, latest status, and mutable Github state.
The archive digest binds the manifest; the manifest binds every other
distributed file. This avoids a digest cycle.

### Release Manifest Schema

Release package enforcement uses:

```text
contracts/nkf/0.1/schemas/release-manifest.schema.json
  # urn:nkf:0.1:schema:release-manifest
```

The schema is derived from this Markdown and the executable YAML companion.
Its own digest is carried by the release manifest.

The release-manifest schema validates release metadata only. It is not a
project declaration schema, does not expand project Governed Validation
Inputs, and is not included in
`validation_result.contract_artifacts.schemas`. The project checker continues
to bind exactly the bundle, record, and validation-result schemas in that
result.

### Deterministic Archive

The Github Release contains exactly one uploaded NKF distribution asset whose
name matches:

```text
^nourd-nkf-sha256-[0-9a-f]{64}\.tar$
```

The embedded digest equals the SHA-256 of the exact archive bytes. A trusted
consumer pin stores that full digest independently from the downloaded
filename or release locator. Github-generated source archives are not NKF
distribution assets or supported consumer coordinates.

The archive uses uncompressed USTAR and contains exactly eight regular files
under stable root `nourd-nkf/`, in exact ASCII-byte path order:

```text
contracts/nkf/0.1/nkf.yaml
contracts/nkf/0.1/schemas/bundle.schema.json
contracts/nkf/0.1/schemas/record.schema.json
contracts/nkf/0.1/schemas/release-manifest.schema.json
contracts/nkf/0.1/schemas/validation-result.schema.json
dist/nourd-nkf-checker.mjs
knowledge/specifications/nkf-0.1.md
release-manifest.json
```

Every archive path is relative to `nourd-nkf/`. There are no explicit
directory entries. Symlinks, hard links, devices, absolute paths, traversal,
duplicate paths, case-colliding paths, and any ninth entry are forbidden.

USTAR paths use the name field only and an empty prefix field. Headers use
magic bytes `75 73 74 61 72 00`, version bytes `30 30`, standard zero-padded
ASCII-octal numeric encoding,
modification time `0`, numeric user and group `0`, empty user, group, and link
names, mode `0755` for the checker, and mode `0644` for every other file.
Every entry uses the regular-file type flag, zero device major and minor
values, exact derived file size and header checksum, and zero-filled content
padding. The archive ends immediately after two final zero blocks. Base-256
numbers, PAX extensions, and trailing bytes are forbidden. The archive is not
compressed, avoiding compressor-version variance in its content address.

The packager operates only from the manifest's clean `release_commit`. It
runs the complete accepted development checks, builds the checker twice,
verifies the checker-confirmation Decision and every accepted artifact digest,
constructs and validates the manifest, assembles the archive twice, and
requires identical checker and archive SHA-256 results. Any mismatch or
unexpected entry fails packaging.

### Consumer Pin And Verification

A consumer stores the exact repository and expected full archive SHA-256 in
its dependency or tooling configuration. The tag and asset name are derived
from that digest. A cached durable locator is transport metadata and not an
additional trust anchor. The pin is not a `bundle.yaml` field because checker
selection and installation are operational dependency state. A completed NKF
validation result separately records the exact checker identity and digest
that actually performed validation.

Before invoking the checker, consumer tooling:

1. verifies the downloaded archive against the independently stored full
   SHA-256;
2. rejects an unsafe format, path, link, entry, mode, or metadata value;
3. strictly parses the fixed-path manifest and verifies its bootstrap
   contract, version, and release-manifest-schema entry;
4. verifies the fixed-path release-manifest schema digest;
5. compiles that schema and validates the closed release manifest;
6. verifies every other manifest-bound file path and digest;
7. verifies the checker-confirmation Decision path and digest in
   `release_commit` and its binding to `checker_source_commit` when source
   provenance is evaluated;
8. rejects any missing or unexpected archive file; and
9. invokes the checker only from the verified distribution root.

Release verification failure is an execution-level tooling failure. It
produces no project conformance result and cannot be reported as NKF Verified.

### Github Release

The tag matches:

```text
^release-sha256-[0-9a-f]{64}$
```

Its digest component equals the archive SHA-256, and the tag targets the
manifest's exact `release_commit`. It is a lightweight tag; an annotated tag
and its additional tag-object metadata are not used. The tag, release name,
asset URL, and Github user interface remain locators; the independently stored
full archive digest is the consumer trust anchor.

The release is prepared as a draft and published as a prerelease because NKF
0.1 is pre-stable. Before publication, release automation downloads the
uploaded asset and repeats the archive, manifest, artifact, checker-help, and
source-commit checks. Immutable Github Releases SHOULD be used when supported.
Artifact attestations MAY add provenance but do not replace the archive
digest.

Public distribution remains unresolved. Repository visibility or access
control does not alter the NKF 0.1 format.
````

The existing unresolved-matters entry becomes:

```markdown
- public checker distribution, installation UX, and support policy;
```

This removes already confirmed checker bytes and the proposed private package
contract from the unresolved list without claiming a public release.

## Proposed Executable YAML Delta

The exact proposed executable companion adds ADRs 0042 and 0043 to
`authority.governing_decisions` and inserts this top-level mapping before
`security`:

```yaml
release_distribution:
  initial_channel: github-release
  repository: "https://github.com/kaveh6202/Nourd.NKF.git"
  public_distribution: unresolved
  operational_state_authority: github
  manifest:
    identity: nkf.release-manifest
    nkf_version: "0.1"
    path: release-manifest.json
    encoding:
      character_encoding: UTF-8
      bom: forbidden
      data_model: JSON
      root: one-object
      comments: forbidden
      duplicate_keys: forbidden
      non_json_values: forbidden
      indentation_spaces: 2
      line_endings: LF
      final_lf: exactly-one
      trailing_whitespace: forbidden
      member_order: contract-order
    closed: true
    required_fields: [contract, nkf_version, source, checker, authority, schemas]
    fields:
      contract:
        const: nkf.release-manifest
      nkf_version:
        const: "0.1"
      source:
        ref: release_distribution.source
      checker:
        ref: release_distribution.checker
      authority:
        ref: release_distribution.authority
      schemas:
        ref: release_distribution.schemas
    omitted_fields:
      - manifest-self-digest
      - containing-archive-digest
      - asset-name
      - tag
      - release-url
      - publication-time
      - latest-status
      - mutable-github-state
  source:
    closed: true
    required_fields: [repository, release_commit, checker_confirmation]
    fields:
      repository:
        const: "https://github.com/kaveh6202/Nourd.NKF.git"
      release_commit:
        type: string
        pattern: '^[0-9a-f]{40}$'
      checker_confirmation:
        ref: release_distribution.checker_confirmation
  checker_confirmation:
    closed: true
    required_fields: [decision, path, digest, checker_source_commit]
    fields:
      decision:
        type: string
        pattern: '^ADR-[0-9]{4}$'
      path:
        type: string
        pattern: '^knowledge/decisions/[0-9]{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$'
      digest:
        ref: common.digest
      checker_source_commit:
        type: string
        pattern: '^[0-9a-f]{40}$'
    decision_id_matches_path_prefix: packager-and-verifier
  checker:
    closed: true
    required_fields: [identity, path, digest, runtime]
    fields:
      identity:
        const: nourd-nkf-checker
      path:
        const: dist/nourd-nkf-checker.mjs
      digest:
        ref: common.digest
      runtime:
        ref: release_distribution.runtime
  runtime:
    closed: true
    required_fields: [name, minimum_major]
    fields:
      name:
        const: node
      minimum_major:
        const: 22
  authority:
    closed: true
    required_fields: [precedence, markdown, executable]
    fields:
      precedence:
        const: normative-markdown
      markdown:
        ref: release_distribution.markdown_artifact
      executable:
        ref: release_distribution.executable_artifact
  markdown_artifact:
    closed: true
    required_fields: [path, digest]
    fields:
      path:
        const: knowledge/specifications/nkf-0.1.md
      digest:
        ref: common.digest
  executable_artifact:
    closed: true
    required_fields: [path, digest]
    fields:
      path:
        const: contracts/nkf/0.1/nkf.yaml
      digest:
        ref: common.digest
  schema_artifact:
    closed: true
    required_fields: [identity, path, digest]
    fields:
      identity:
        type: string
      path:
        type: string
      digest:
        ref: common.digest
  schemas:
    type: array
    exact_items_in_order:
      - identity: urn:nkf:0.1:schema:bundle
        path: contracts/nkf/0.1/schemas/bundle.schema.json
        ref: release_distribution.schema_artifact
      - identity: urn:nkf:0.1:schema:record
        path: contracts/nkf/0.1/schemas/record.schema.json
        ref: release_distribution.schema_artifact
      - identity: urn:nkf:0.1:schema:release-manifest
        path: contracts/nkf/0.1/schemas/release-manifest.schema.json
        ref: release_distribution.schema_artifact
      - identity: urn:nkf:0.1:schema:validation-result
        path: contracts/nkf/0.1/schemas/validation-result.schema.json
        ref: release_distribution.schema_artifact
  schema:
    identity: urn:nkf:0.1:schema:release-manifest
    path: contracts/nkf/0.1/schemas/release-manifest.schema.json
    scope: release-package-enforcement-only
    project_declaration_schema: false
    governed_validation_input: false
    validation_result_contract_artifact: false
    self_digest_location: release-manifest
  archive:
    uploaded_distribution_asset_count: 1
    filename_pattern: '^nourd-nkf-sha256-[0-9a-f]{64}\.tar$'
    digest:
      algorithm: sha-256
      filename_value_must_equal_archive_digest: true
    format: ustar
    compression: none
    root: nourd-nkf
    entry_kind: regular-file-only
    explicit_directory_entries: forbidden
    entry_order: exact-ascii-path
    entries:
      - {path: contracts/nkf/0.1/nkf.yaml, mode: "0644"}
      - {path: contracts/nkf/0.1/schemas/bundle.schema.json, mode: "0644"}
      - {path: contracts/nkf/0.1/schemas/record.schema.json, mode: "0644"}
      - {path: contracts/nkf/0.1/schemas/release-manifest.schema.json, mode: "0644"}
      - {path: contracts/nkf/0.1/schemas/validation-result.schema.json, mode: "0644"}
      - {path: dist/nourd-nkf-checker.mjs, mode: "0755"}
      - {path: knowledge/specifications/nkf-0.1.md, mode: "0644"}
      - {path: release-manifest.json, mode: "0644"}
    forbidden:
      - symlink
      - hard-link
      - device
      - absolute-path
      - traversal
      - duplicate-path
      - case-colliding-path
      - unexpected-entry
    ustar:
      modification_time: 0
      uid: 0
      gid: 0
      user_name: ""
      group_name: ""
      link_name: ""
      magic_bytes_hex: "75 73 74 61 72 00"
      version_bytes_hex: "30 30"
      path_storage: name-field-only
      prefix_field: ""
      numeric_encoding: zero-padded-ascii-octal
      type_flag_byte_hex: "30"
      device_major: 0
      device_minor: 0
      file_size: derived-exact-byte-count
      header_checksum: derived-standard-ustar
      content_padding: zero-filled
      final_zero_blocks: 2
      trailing_bytes_after_final_blocks: forbidden
      base_256_numbers: forbidden
      pax_extensions: forbidden
  packaging:
    source_tree: clean-release-commit
    steps:
      - complete-accepted-development-check
      - build-checker-twice
      - verify-confirmed-checker-digest
      - verify-checker-confirmation-decision-path-digest-and-source-binding
      - verify-authority-and-schema-digests
      - construct-and-schema-validate-manifest
      - assemble-archive-twice
      - require-reproducible-checker-and-archive-digests
    failure_behavior: no-release-artifact
  consumer_pin:
    storage: consumer-dependency-or-tooling-configuration
    required_fields: [repository, archive-sha256]
    tag_and_asset_name: derived-from-archive-sha256
    cached_durable_locator: transport-only
    bundle_field: forbidden
    independently_trusted_archive_digest: required
  verification:
    order:
      - verify-archive-sha256
      - reject-unsafe-archive
      - strict-parse-manifest-and-bootstrap-fixed-contract-version-and-schema-entry
      - verify-release-manifest-schema-digest
      - compile-schema-and-validate-release-manifest
      - verify-other-manifest-bound-paths-and-digests
      - verify-checker-confirmation-provenance-when-evaluated
      - reject-missing-or-unexpected-file
      - invoke-checker
    failure:
      classification: execution-level
      checker_invocation: forbidden
      project_validation_result: forbidden
      nkf_verified_claim: forbidden
  github_release:
    uploaded_distribution_asset_count: 1
    github_generated_source_archives: excluded-non-distribution
    tag_pattern: '^release-sha256-[0-9a-f]{64}$'
    tag_digest_equals_archive_digest: true
    tag_target_equals_release_commit: true
    tag_kind: lightweight
    annotated_tag: forbidden
    preparation_state: draft
    publication_class: prerelease
    prepublication_reverification: required
    immutable_release_when_supported: should
    artifact_attestation:
      status: optional
      substitutes_for_archive_digest: false
```

The project-validation `enforcement.schema.paths`,
`enforcement.schema.ids`, and
`validation_result.contract_artifacts.core.schemas` remain exactly the current
three-entry project set. The release-manifest schema is added only under
`release_distribution.schema` and the distribution manifest's four-entry
package list.

## Authority Reconciliation Required

The current NKF 0.1 Markdown still lists schema/checker packaging as unresolved.
The YAML says schema self-digests live in release metadata but does not define
that metadata's contract. A release-manifest implementation created only in
packaging code would therefore become an ungoverned parallel contract.

[ADR 0043](../../decisions/0043-release-manifest.md) resolves the first authority question by accepting
`nkf.release-manifest` as an unversioned native identity governed solely by
`nkf_version: "0.1"`. The remaining reconciliation is to:

1. accept and add its exact human meaning to the canonical Markdown;
2. add its executable shape and archive rules to the YAML companion;
3. derive
   `contracts/nkf/0.1/schemas/release-manifest.schema.json` with identity
   `urn:nkf:0.1:schema:release-manifest`;
4. classify that fourth schema as release-package enforcement, not as a
   project-validation schema or an additional
   `validation_result.contract_artifacts.schemas` entry;
5. include that fourth schema in the archive and manifest;
6. replace the current unresolved-matters statement so exact checker bytes and
   private schema/checker packaging are no longer called unresolved while
   public distribution remains explicitly unresolved; and
7. replace, rebind, and separately confirm the resulting authority pair,
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

[ADR 0043](../../decisions/0043-release-manifest.md) resolves the native-contract and project-validation separation
boundary. The remaining consequential boundary is acceptance of the exact
manifest fields, deterministic USTAR contract, consumer pin, verification
order, Github Release mechanics, and Markdown/YAML delta proposed above.
Canonical promotion and packaging should not begin until that exact revision
is accepted or replaced.
