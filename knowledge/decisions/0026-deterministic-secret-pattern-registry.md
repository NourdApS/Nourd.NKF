---
id: adr-0026
type: decision
title: "ADR 0026: Accept Deterministic Secret Pattern Registry"
summary: ADR 0019 prohibits live credentials, access tokens, private keys, and secrets. It makes a high-confidence security.secret-pattern finding block native conformance while warning that a passing scan does not prove absence.
created_at: 2026-07-30T00:27:52Z
record_lifecycle: immutable
record_status: accepted
task: NKF-003
decision_authority: Human Product Owner, Nourd ApS, with exact matching mechanics derived and confirmed by the Codex technical reviewer
---

# ADR 0026: Accept Deterministic Secret Pattern Registry

- **Confirmation Source:** Direct Human Product Owner confirmation in the
  [NKF-003](../tasks/completed/NKF-003-independent-nkf-authority.md) discussion on 30 July 2026 after review of the exact scan scope,
  blocking signature classes, exclusions, diagnostic behavior, and governed
  evolution boundary
- **Reviewed Design:**
  [`../evidence/audits/nkf-0.1-checker-realization-gaps.md`](../evidence/audits/nkf-0.1-checker-realization-gaps.md)

## Context

[ADR 0019](0019-validation-enforcement-and-diagnostics.md) prohibits live credentials, access tokens, private keys, and secrets.
It makes a high-confidence `security.secret-pattern` finding block native
conformance while warning that a passing scan does not prove absence.

The accepted authority does not define exact scan inputs or deterministic
patterns. Allowing a checker library or an automatically updated provider
registry to decide them would silently change NKF conformance.

The imported NKF-002 implementation provides useful evidence but is not
authority. It scans four signatures. One is an AWS access-key identifier,
which is not the secret credential by itself and is therefore unsuitable as a
native blocking finding.

## Decision

### Native Scan Scope

The security phase scans the exact safely readable UTF-8 source bytes of:

1. `.nourd/knowledge/bundle.yaml`;
2. every direct `.yaml` declaration candidate under
   `.nourd/knowledge/records/`; and
3. every recursively discovered Markdown file under the resolved
   `knowledge_root`, including Markdown represented as a record or
   `non_record`.

Unsafe, external, broken, or cyclic paths are never followed to enlarge the
scan. Earlier failures may make the security phase `not-evaluated` under the
accepted phase-safety rule.

These exact bytes are Governed Validation Inputs. No other resource kind is
added to the native scan by implication. An accepted extension may define
additional scan inputs or namespaced security rules for its governed
resources.

### Exact Minimum Registry

Native NKF 0.1 has exactly three blocking detector classes. Matching is
case-sensitive over ASCII bytes.

#### Complete Private-Key Block

A private-key finding requires:

- an exact header `-----BEGIN <LABEL>-----`;
- a later exact footer `-----END <LABEL>-----` using the same label;
- between them, after removing ASCII space, horizontal tab, carriage return,
  and line feed, at least 64 bytes; and
- every remaining intervening byte in the ASCII Base64 alphabet
  `A-Z`, `a-z`, `0-9`, `+`, `/`, or `=`.

`<LABEL>` is exactly one of:

- `PRIVATE KEY`;
- `RSA PRIVATE KEY`;
- `EC PRIVATE KEY`;
- `DSA PRIVATE KEY`;
- `OPENSSH PRIVATE KEY`; or
- `ENCRYPTED PRIVATE KEY`.

A header without a qualifying body and matching footer does not trigger this
detector.

#### GitHub-Prefixed Token

A GitHub-prefixed token is:

- exactly one prefix from `ghp_`, `gho_`, `ghu_`, `ghs_`, or `ghr_`;
- followed immediately by at least 36 ASCII alphanumeric bytes;
- preceded by start of input or a byte outside ASCII alphanumeric plus `_`;
  and
- followed by end of input or a non-ASCII-alphanumeric byte.

#### OpenAI-Prefixed Token

An OpenAI-prefixed token is:

- exactly `sk-proj-` or `sk-`, considered longest prefix first;
- followed immediately by at least 20 bytes from ASCII alphanumeric, `_`, or
  `-`;
- preceded by start of input or a byte outside that same body alphabet; and
- followed by end of input or a byte outside that same body alphabet.

### Exclusions And Examples

There is no contextual exemption for fenced code, inline code, comments,
examples, fixtures, quoted text, or a nearby word such as `test` or
`redacted`. A real secret remains prohibited in those contexts.

Safe placeholders remain nonmatching because they do not satisfy the exact
registry, including:

```text
ghp_<REDACTED>
sk-...
${TOKEN}
<SECRET>
```

An AWS `AKIA...` access-key identifier alone, generic password-looking text,
JWTs, hashes, digests, Base64 strings, high-entropy text, and provider tokens
outside the exact registry do not trigger native
`security.secret-pattern`.

NKF supplies no inline ignore, allowlist, or waiver mechanism in 0.1. A
document that must explain a matching form uses a nonmatching fragmented or
placeholder representation. Negative conformance fixtures may deliberately
produce matching input and expect failure; they do not establish an
exception.

### Diagnostic Behavior

If one or more native detectors match an artifact, the checker emits exactly
one diagnostic for that logical artifact:

- `rule_id`: `security.secret-pattern`;
- `severity`: `error`;
- `blocking`: `conformance`;
- `phase`: `security`; and
- a generic message and remediation that never include the matched value.

The diagnostic may identify the project-relative artifact and associated
record when known. It does not include the secret, matching substring,
surrounding source, or copied payload.

Any finding fails every requested conformance level because `security` is a
required phase. A passed security phase means only that the exact native
registry found no match.

### Supplemental Detectors And Evolution

A checker implementation may not add, remove, widen, narrow, or reinterpret a
native blocking detector.

Supplemental secret-scanning tools may run operationally, but their findings
remain outside native `nkf.validation-result` and cannot affect NKF
conformance. An accepted extension may define namespaced deterministic
security diagnostics for its scope.

Changing native scan scope, detector grammar, contextual treatment,
exclusions, blocking effect, or diagnostic cardinality is a consequential
conformance change. It must follow [ADR 0006](0006-pre-stable-evolution.md), update the normative
Markdown/executable YAML pair, update derived fixtures and checker behavior,
produce a governed release, and require deliberate consumer migration.

## Compatibility

This is a pre-stable NKF 0.1 clarification. It introduces no NKF sub-version
or independent registry version.

The imported checker patterns remain implementation evidence. Its
private-header-only trigger is narrowed to a complete block, its
access-key-identifier-only trigger is rejected, and its GitHub/OpenAI evidence
is retained only through the exact accepted mechanics above.

## Non-Claims

This Decision does not:

- prove that a passing bundle contains no credential or secret;
- replace dedicated repository, CI, provider, or organizational secret
  scanning;
- define secret storage, rotation, incident response, access policy, or
  disclosure handling;
- authorize network calls or automatic provider-registry updates;
- implement or confirm checker code or fixtures;
- produce an NKF conformance result; or
- accept any consumer knowledge.
