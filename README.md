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

Current contract work remains grounded in the accepted Product knowledge
format. ADR 0029 accepts the current exact canonical Markdown/YAML authority
pair, incorporating the CommonMark, heading coverage, Title Case,
canonical-term, validation-result, and deterministic secret-registry
boundaries accepted through ADRs 0024–0026. ADR 0030 confirms the exact
source-bound bundle, record, and validation-result JSON Schemas for that pair.
No checker, fixture suite, package, continuous-integration gate, distribution,
release, consumer migration, or conformance result is yet realized.

NKF remains open to evidence-driven change before its first stable release.
Real-project findings must move through governed reproduction, classification,
validation, confirmation, authoritative updates, release, and deliberate
consumer migration; pre-stable does not permit silent contract drift.
