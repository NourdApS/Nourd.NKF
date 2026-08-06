# NKF-017 Agent SDK Onboarding Topology Exercise

## Scope And Method

This Evidence records a read-only inspection of the completed Nourd Agent SDK
initial onboarding that exposed NKF-017. It evaluates the resulting filesystem
topology, onboarding receipt, and native bundle against the currently accepted
NKF-013 and NKF-015 onboarding behavior. It does not evaluate or accept Agent
SDK meaning and does not authorize a consumer-repository change.

The inspection was performed on `2026-07-31T21:50:32Z`. The source was the
Human Product Owner's local Nourd Agent SDK working copy after its completed
Category 2 onboarding. The exact local path is intentionally omitted because
it is an environment locator rather than durable repository identity.

## Bound Inputs

| Input | SHA-256 |
| --- | --- |
| `.nourd/onboarding-receipt.json` | `b996718f26dca3ec23c85aeadf78ba27470a23aa76294a2415537c805d14b430` |
| `.nourd/knowledge/bundle.yaml` | `e08861a43a2df0e7adf6b7b2d5c27aca18add426b1180c2517c221e562f3c11a` |
| `knowledge/README.md` | `8cf6d703b57e3f5fd1b33bcf1bebcbd1ff288a9e40833acebe74646c778aa0a7` |
| `knowledge/README-2.md` | `fba9b9eb7ef69d8a691756be9c464c15a76cea693a1c2769ec6055ab8708b4a5` |

The receipt binds the Category 2 assessment, the Technology Root Profile,
the `knowledge` knowledge root, and the exact created and changed paths. It
reports `knowledge/README-2.md` as created and `knowledge/README.md` as
changed.

## Verified Result

The resulting knowledge directories are:

```text
knowledge/
├── decisions/
├── designs/
├── realizations/
├── specifications/
└── tasks/
    └── active/
```

The resulting governed Markdown includes:

- the preserved and transformed `knowledge/README.md`;
- the generated `knowledge/README-2.md` knowledge map;
- four preserved Decision sources and their existing index;
- two preserved Design sources and their existing index;
- the generated Technology root;
- the generated initial Draft Specification;
- the generated unconfirmed current-system Realization;
- the preserved predecessor Task; and
- the generated active onboarding Task.

It does not contain the full Task status navigation, Design disposition
navigation, or top-level Decision, Specification, Realization, and Evidence
indexes represented by the NKF repository's lifecycle-first organization.

## Contract Reconciliation

The result conforms to the implementation that produced it. The accepted
NKF-013 Design guarantees only a Draft root, active onboarding Task, knowledge
map, unconfirmed current-system Realization, and the Technology-only Draft
Specification. It explicitly treats lifecycle subdirectories as selectable
scaffold navigation choices.

The canonical NKF 0.1 Specification also states that directories inside the
knowledge root are navigation and should exist only when real material needs
them. ADR 0053 governs the fuller organization only for the NKF repository.

The generated result therefore demonstrates a mismatch between the intended
portable onboarding experience and current accepted NKF meaning. It does not
demonstrate Agent SDK nonconformance or an onboarding-agent failure.

## Material Finding

NKF does not currently define or continuously enforce a complete portable
lifecycle topology. The adopter consequently allocates a suffix when the
canonical `README.md` path is occupied and creates a second competing map.
This leaves a conformant newly onboarded repository less navigable than the
Human Product Owner intended.

## Limitations

This observation is one Technology Category 2 exercise. It does not by itself
select the correct portable topology, prove Product suitability, establish a
migration algorithm, or accept a Specification change. Those boundaries
belong to the NKF-017 Design and Decision process.
