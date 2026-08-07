---
id: adr-0079
type: decision
summary: Remove the frontmatter title key so the body H1 is the single document title, keep frontmatter type-dynamic, and give Task non-records optional owner, decision-authority, and related-task orientation keys instead of repeated body bullet blocks.
created_at: 2026-08-06T23:50:33Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
---

# ADR 0079: Dynamic Frontmatter Without Title

## Context And Problem

Governed documents currently repeat orientation facts three times: the
frontmatter `title` repeats the H1 immediately below it, and NKF-repository
Tasks additionally open with a bullet block repeating the Task identifier,
status, owner, decision authority, repository, and related Tasks — facts that
belong in, or already exist in, frontmatter. Reviewing the NKF 0.2 candidate
on `2026-08-06`, the Human Product Owner directed removing `title` from
frontmatter, moving the remaining top-of-document properties into
frontmatter, and keeping frontmatter dynamic by document type.

## Decision

For NKF 0.2:

1. Frontmatter carries no `title` key. The single top-level H1 is the
   document title. A record declaration keeps `title`, and the checker
   continues to verify it against the H1 through `record.title.mismatch`.
   A frontmatter `title` key fails closed as an unsupported key, and
   `markdown.frontmatter.title-mismatch` is removed from the 0.2 registry.
2. Frontmatter remains type-dynamic under the closed per-document-class key
   vocabulary. Task non-records gain three optional orientation keys:
   `owner`, `decision_authority`, and `related_tasks`, where `related_tasks`
   is a duplicate-free list of `task_id` values each resolving to another
   same-bundle Task.
3. NKF defines no per-document repository key. Repository identity belongs
   to the bundle and its root record.
4. Identity facts are not repeated as body bullet blocks. This repository's
   own documents are migrated to the new envelope during the NKF 0.2
   self-migration, together with gates and version declaration.

## Scope And Applicability

This Decision governs the NKF 0.2 candidate authority pair, its derived
implementation, and this repository's self-migration. It changes document
orientation structure only; canonical meaning remains in the CommonMark body,
and declarations remain the executable representation. NKF 0.1 documents are
unaffected until their repositories deliberately migrate.

## Rationale

One writable authority per datum is an accepted NKF principle; a frontmatter
title violated it in spirit by triplicating the H1 and declaration title.
Orientation facts belong in the machine-readable envelope, not in prose
bullets that can silently drift from it. Making the remaining keys optional
keeps minimal consumer repositories valid while letting governance-heavy
repositories expose ownership and relationships mechanically.

## Alternatives Considered

Keeping the frontmatter title and deleting only the bullet blocks was
rejected because the title triplication remains. Making `owner` and
`decision_authority` required was rejected as portable burden without
evidenced need. A per-document `repository` key was rejected because the
bundle already owns repository identity and per-file copies invite drift.
Free-form frontmatter was rejected because the closed per-class vocabulary is
what makes the envelope checkable.

## Consequences And Trade-Offs

Every governed document in a migrating repository loses its `title` line,
and NKF-repository Tasks lose their bullet blocks in favor of frontmatter
keys; tools that read only frontmatter must take titles from the H1 or the
declaration. The 0.2 registry shrinks by one rule and the checker gains
`related_tasks` resolution. Migration cost lands in the same deliberate 0.2
migration each repository already performs for gates.

## Non-Claims

This Decision does not:

- accept the NKF 0.2 Specification or executable companion;
- migrate any document, repository, or consumer by itself;
- change NKF 0.1 meaning or invalidate existing 0.1 documents; and
- implement, validate, confirm, or release anything.
