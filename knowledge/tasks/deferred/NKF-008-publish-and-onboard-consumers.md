---
created_at: 2026-07-30T17:03:21Z
---

# NKF-008: Publish NKF And Onboard Consumers

- **Task:** `NKF-008`
- **Status:** Deferred
- **Owner:** Nourd ApS

## Purpose

Publish a governed NKF release and onboard external consumers deliberately
after NKF-007 establishes a coherent current Realization and truthful
self-validation baseline.

## Scope

- reconcile the current release package with the then-current authority pair,
  schemas, checker, fixtures, and integrity metadata;
- define release publication and support state;
- publish only an explicitly authorized versioned release;
- migrate or onboard each consumer on its own authority and timeline; and
- preserve evidence of package identity, consumer pinning, and compatibility.

## Guardrails

- Do not infer publication from a local archive, passing test, tag candidate,
  or confirmed development Realization.
- Do not change an external consumer without its authority.
- Do not treat consumer validation as acceptance of consumer knowledge.
- Do not begin this Task until separately activated.

## Origin

NKF-003 established the distribution model but intentionally did not publish
or migrate external consumers. NKF-007 transfers that remaining obligation
here so repository repair does not silently expand into release or consumer
work.
