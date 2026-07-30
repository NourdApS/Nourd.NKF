# Nourd Knowledge Format

Nourd Knowledge Format (**NKF**) is Company-owned **Shared Technology**
maintained by Nourd ApS. It is a human-readable, machine-verifiable format for
durable governed knowledge.

NKF is not a Product. A repository, Product, Shared Technology, Company, or
other eligible subject that uses NKF remains authoritative for its own meaning.
NKF defines format, declaration, compatibility, and conformance contracts; it
does not accept a consumer's knowledge or become authority for operational
state.

## Repository identity

| Property | Value |
| --- | --- |
| Owner | Nourd ApS |
| Classification | Shared Technology |
| Repository | `kaveh6202/Nourd.NKF` |
| Remote | `https://github.com/kaveh6202/Nourd.NKF.git` |
| Default branch | `master` |
| Local checkout | `/Users/kam/Documents/NourdApS/shared_technology/nourd_knowledge_format` |

This repository owns NKF specifications, profiles, executable contracts,
conformance tooling and fixtures, compatibility, migrations, releases,
distribution, security, and technical lifecycle.

## Current stage

The independent authority migration is governed by Task `NKF-003`. NKF 0.1
was accepted in the Nourd Studio repository as a Product-only format. That
exact accepted revision and the subsequent checker work remain source
provenance during migration; they must not be silently rewritten or treated as
already migrated.

ADR 0045 accepts the current exact canonical Markdown and strict-YAML
executable companion, including the native release contract. ADR 0046 confirms
the four source-bound release-package schemas while preserving bundle, record,
and validation-result as the exact three-schema project-validation boundary.

ADR 0047 confirms the release-bound project checker at source checkpoint
`0fe4f0d` and executable SHA-256
`f71226e5f632cdd0918a0eedae1cbbc5d5f17b450395d98e744ae572dfd73579`.
ADR 0048 confirms deterministic release tooling and two independent,
byte-identical local package builds from source checkpoint `50fbc53`, with
archive SHA-256
`c8d0df6e68889d5be0c4ca9e215188748d28399f10d10d03728d0561eaf86b4d`.
The complete development gate passes 81 tests in 13 files. No tag, asset
upload, Github Release, public distribution, consumer migration, or consumer
conformance result is claimed.

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
