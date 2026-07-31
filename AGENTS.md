---
created_at: 2026-07-28T22:01:17Z
---

# Repository identity

This directory is the independent Git repository for **Nourd Knowledge Format
(NKF)**, a Company-owned Shared Technology maintained by Nourd ApS.

| Property | Required value |
| --- | --- |
| Local workspace path | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |
| GitHub repository | `kaveh6202/Nourd.NKF` |
| Expected remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |

The parent Nourd ApS repository ignores this complete directory. This
repository is not a submodule and owns its own technical knowledge, source,
contracts, tooling, history, releases, automation, compatibility, security,
and lifecycle.

# Operating rule

Do not guess or silently decide NKF scope, normative meaning, contracts,
profiles, authority, compatibility, conformance, or repository structure.
Establish each consequential decision from an authoritative source and keep
proposals distinct from accepted decisions.

Validation and conformance do not accept knowledge. A Git operation, checker
result, generated declaration, migration, or implementation cannot supply
human acceptance.

<!-- nkf-authoring-adapter:start -->
# NKF Authoring Adapter

For every NKF-governed knowledge operation, read and follow
[`integrations/ai/nkf-authoring-protocol.md`](integrations/ai/nkf-authoring-protocol.md)
before editing governed files.

Use `npm run nkf:check` as the only supported authoring-handoff validation
command. Report acceptance, Realization confirmation, conformance, local Git
state, and remote enforcement state as separate facts.
<!-- nkf-authoring-adapter:end -->

# Authority boundary

NKF owns:

- normative format and profile specifications;
- NKF-versioned bundle, record, body, extension, and compatibility definitions;
- conformance levels, deterministic checks, diagnostics, and fixtures;
- checker distribution and integrity;
- migrations between supported NKF contracts; and
- NKF releases, security, and lifecycle.

NKF does not own:

- a consumer's canonical meaning or acceptance decisions;
- Product, Shared Technology, Company, or Organization authority;
- Task, Workflow, execution, deployment, or other operational state;
- Nourd Knowledge Engine behavior beyond implementing supported NKF contracts;
- a future Nourd Knowledge Protocol runtime protocol merely because the names
  are related; or
- external systems, resources, permissions, observations, or authoritative
  data referenced by a bundle.

# Knowledge and Task work

The knowledge map begins at [`knowledge/README.md`](knowledge/README.md).

- `knowledge/tasks/` owns durable Task intent, constraints, acceptance
  criteria, and execution plans.
- `knowledge/designs/` owns governed proposals with an explicit Active,
  Adopted, Rejected, Superseded, or Withdrawn disposition.
- `knowledge/decisions/` owns immutable accepted decisions.
- `knowledge/specifications/` owns accepted normative NKF specifications and
  profile contracts.
- `knowledge/realizations/` owns durable mappings from accepted NKF meaning to
  schemas, checker source, fixtures, tooling, and other technical artifacts.
- `knowledge/evidence/` owns reviewed source and migration evidence when it
  must remain part of the governed technical record.

Begin system review with
[`knowledge/realizations/current-system.md`](knowledge/realizations/current-system.md).
Follow Decisions or Designs selectively when governing rationale,
alternatives, trade-offs, or predecessor state is needed.

A Design remains proposal knowledge. `accepted` describes authority over an
exact record revision; `adopted` describes the Design disposition established
when a Decision selects the proposed direction. Neither makes the Design
current normative authority.

Use `propose`, `adopt`, `reject`, `supersede`, and `withdraw` for a Design
direction. Reserve `accept` for an authority accepting an exact record
revision.

Resolve an immutable Task identifier before Git-backed work. Record every AI
execution plan in the owning Task before executing it. Keep operational Git,
GitHub, check, package, and release state in their authoritative systems.

Accepted NKF records and decisions are immutable snapshots. A correction,
extension, replacement, or reversal requires a later governed revision with
explicit provenance and compatibility.

# Source migration

The Nourd Studio repository remains immutable provenance for the originally
accepted NKF 0.1 Product specification and its acceptance decision. Import
exact accepted sources with repository, path, commit, and digest provenance.
Do not edit or delete the originals as a shortcut.

Later NKF-002 checker work is proposal and implementation evidence until its
exact authority and compatibility are reconciled here. Do not present migrated
code as accepted normative meaning.

# Pre-stable evolution

NKF remains open to evidence-driven change before its first stable release.
Implementation and exercise in consumer projects may expose shortcomings, but
consumer behavior, checker code, fixtures, and passing tests cannot change NKF
by implication.

Classify every finding as a specification or contract issue, checker or
distribution bug, migration issue, or consumer nonconformance. Consequential
changes require evidence, reproduction, compatibility analysis, Human Product
Owner confirmation, authoritative specification updates, derived
implementation and fixture changes, a versioned release, and deliberate
consumer migration.

# Git boundary

Before any Git status inspection, branch operation, commit, push, pull, tag,
release, or workflow change, run:

```sh
git rev-parse --show-toplevel
git remote -v
```

Stop before changing Git state unless the results match the repository identity
above. Never commit or push NKF through the Nourd ApS Company repository or a
consumer repository.

# Collaboration standard

- Confirm one consequential format boundary at a time.
- Derive executable contracts from accepted normative meaning, not the other
  way around.
- Fail closed when a required contract, profile, extension, source binding, or
  compatibility rule is unsupported.
- Preserve human-readable canonical meaning, exact source binding, provenance,
  external authority, and operational-state separation.
- Challenge changes that create multiple NKF authorities, consumer-specific
  overfitting, false conformance, or silent semantic migration.
