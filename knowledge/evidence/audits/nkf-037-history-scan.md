---
title: NKF-037 History Scan
summary: Records the pre-flip scan of the complete Git history of NourdApS/Nourd.NKF for secrets, tokens, private keys, and personal data before the repository becomes public — the method, the scope, every pattern hit and its classification, and the commit-metadata observations — as Evidence that accepts nothing and authorizes nothing.
created_at: 2026-09-08T11:32:42Z
---

# NKF-037 History Scan

This records the history scan required by the
[NKF Public Repository Design](../../designs/items/nkf-public-repository.md)
before any visibility change, performed under
[NKF-037](../../tasks/items/NKF-037-make-the-nkf-repository-public.md). It is
Evidence of one observation at one moment. It accepts no meaning, confirms
nothing, and does not itself authorize the flip.

## Method And Scope

| Fact | Value |
| --- | --- |
| Repository | `NourdApS/Nourd.NKF`, local clone at the task branch |
| Scanned at | `2026-09-08T11:32:42Z` |
| History tip | `ce20fd2` on `task/NKF-037`, all refs included |
| Enumeration | `git rev-list --objects --all`, 7779 reachable objects |
| Unique blobs considered | 7300 after excluding generated and binary families |
| Unique blobs scanned | 4121, every considered blob under two megabytes |
| Excluded families | `.nourd/knowledge/freshness/`, `.nourd/knowledge/bundle.yaml`, `package-lock.json`, `dist/`, `public-docs/tools/`, `distribution/`, and `.tar` release archives — generated projections of scanned sources, or published archives whose members are scanned at their source paths |
| Patterns | Github tokens (`gh[pousr]_`), AWS access keys (`AKIA`), PEM private-key headers, Slack tokens (`xox`), `sk-` style API keys, e-mail addresses, and `password`, `passwd`, `secret`, or `token` assignments of twelve or more characters |
| Tooling | `git cat-file --batch` piped to `grep -a -E -o`; no third-party scanner was installed on the host |

The excluded families are derived from scanned sources or are published
archives whose members exist at their source paths in the same history. A
secret introduced only into a generated file would escape this scan; none of
the excluded families is hand-authored.

## Findings

Every pattern hit was located to its blob and path and read in context.

| Hit | Count | Location | Classification |
| --- | --- | --- | --- |
| `-----BEGIN PRIVATE KEY` | 4 | `test/security.test.ts`, `test/public-docs.test.ts`, and the immutable Nourd Studio source snapshot's `nkf.test.ts` | Test fixture: a literal header written into a fixture record to prove the `security.secret-material` rule fires. No key material follows the header. |
| `token = "github_pat_not-public…` | 13 | `test/security.test.ts` and the Nourd Studio source snapshot test | Test fixture: a deliberately non-credential string exercising the secret-material rule. |
| `fixture@example.com`, `nkf@example.invalid`, `knowledge@example.invalid` | 18 | Fixtures and examples | Reserved example domains; not personal data. |
| `eemeli@gmail.com` | 2 | `THIRD_PARTY_NOTICES.md` and the licensing-preparation assessment Evidence | Upstream author attribution reproduced from the `yaml` package's license, as its license requires. |
| `kaveh.majidi@visma.com` | 2 | Governed documents | The Human Product Owner's work address, already the author identity on the commits. |
| `kaveh.majidy@gmail.com` | 1 | One governed document | The Human Product Owner's personal address, also present as the author identity on twelve early commits. |
| Github, AWS, Slack, or `sk-` tokens | 0 | — | None found. |
| Password or secret assignments | 0 beyond the fixture above | — | None found. |

No credential, key material, or third-party personal data was found in any
scanned blob.

## Commit Metadata

| Identity | Commits | Note |
| --- | --- | --- |
| `kaveh.majidi@visma.com` | 624 author or committer entries | Human Product Owner, work address |
| `kaveh.majidy@gmail.com` | 12 author or committer entries | Human Product Owner, personal address, early history |
| `noreply@github.com` | 18 committer entries | Github merge commits |

Commit metadata cannot be changed without rewriting history, which the Design
excludes because every Decision and Evidence record binds exact commits. The
personal address becomes visible with the repository. This is recorded for the
Human Product Owner's awareness, not as a blocker.

## Workflows

Both checked-in workflows, `nkf-contracts.yml` and
`nkf-consumer-adoption.yml`, declare explicit `permissions` blocks and
reference no repository secret. Neither needs a secret on pull requests from
forks.

## Boundary

This Evidence records what one scan found in one history at one moment. It
does not prove the absence of secrets encoded in forms the patterns do not
match, it does not cover blobs introduced after `ce20fd2`, and it does not
authorize the visibility change, which remains the Human Product Owner's act
after the adopting Decision.
