---
id: adr-0042
type: decision
title: "ADR 0042: Establish Initial Release Distribution Boundary"
summary: ADR 0041 confirms one exact native NKF 0.1 development Realization, but expressly leaves distribution and release unresolved. NKF-003 requires one pinned checker distribution before the NKF repository can exercise that distribution as its first governed consumer.
created_at: 2026-07-30T08:39:41Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0042: Establish Initial Release Distribution Boundary

- **Confirmation Source:** Direct confirmation in the [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion on
  30 July 2026 after review of the initial checker-distribution alternatives

## Context

[ADR 0041](0041-checker-development-realization.md) confirms one exact native NKF 0.1 development Realization, but
expressly leaves distribution and release unresolved. [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) requires one
pinned checker distribution before the NKF repository can exercise that
distribution as its first governed consumer.

The checker is one portable Node.js executable whose contract loader requires
the canonical Markdown, executable YAML, and source-bound schemas at their
accepted relative paths. Distributing only the executable would therefore
separate it from the exact authority it implements. Distributing a mutable
branch or an unpinned source checkout would not supply the immutable revision
pin required by the NKF 0.1 specification.

The NKF Github repository is currently private and has no published release.
That observed repository state is implementation context, not permanent NKF
meaning.

## Decision

### Initial Distribution Channel

The initial native NKF 0.1 checker distribution is one content-addressed
archive attached to a Github Release in `kaveh6202/Nourd.NKF`.

The archive contains, as one integrity unit:

- the portable `nourd-nkf-checker` executable;
- the exact canonical NKF 0.1 Markdown;
- its exact executable YAML companion;
- the exact source-bound JSON Schemas required by that companion; and
- deterministic release metadata binding the distributed files and their
  source.

The archive's full SHA-256 digest is its content address and the immutable
consumer pin. A consumer MUST verify that digest before using the extracted
distribution. The internal release metadata MUST then bind every distributed
authority, schema, and checker artifact to its exact path and SHA-256 digest.

### Authority And Version Boundary

The Github Release, Git tag, release name, asset name, source commit, archive
digest, and checker digest are distribution, provenance, or integrity
identities. None is another NKF version coordinate.

`nkf_version: "0.1"` remains the only NKF format version. A release label MUST
NOT be interpreted as an NKF sub-version, contract version, compatibility
claim, semantic-acceptance state, or conformance result.

Markdown remains authoritative human meaning. YAML remains its executable
companion, and the schemas remain derived Realizations. Packaging them
together does not alter their authority relationship.

### Supported Path

The content-addressed Github Release archive is the selected initial consumer
distribution path. The private development package name, an npm publication,
a raw branch, and a source checkout are not alternate supported consumer
coordinates under this Decision. A later governed Decision may add another
distribution channel without changing NKF by implication.

Exact archive layout, release-manifest serialization, packaging mechanics,
tag naming, release workflow, and enforcement remain subject to separate
review before realization.

## Compatibility

This Decision changes no NKF 0.1 bundle, record, body, extension, diagnostic,
validation-result, acceptance, or conformance rule. It selects a distribution
boundary for the already confirmed checker and accepted authority artifacts.

Consumer projects must migrate deliberately to the selected pinned
distribution. Existing source references or legacy checker integrations do
not become supported aliases.

## Non-Claims

This Decision does not:

- confirm archive or release-manifest bytes;
- create a tag, Github Release, asset, installer, or consumer pin;
- establish public distribution, licensing, contribution governance, support,
  continuous integration, artifact attestation, or a security-response
  process;
- authorize repository self-hosting or external-consumer migration;
- accept or conform any consumer knowledge; or
- make a passing checker result prove semantic acceptance or release
  realization.
