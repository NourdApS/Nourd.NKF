---
title: "ADR 0094: Carry The Set And Audit Independently"
id: adr-0094
type: decision
summary: Correct the release archive to carry the complete versioned set, bring the adoption protocol to the current migration meaning, and require an independent post-action audit in the onboarding and adoption guidance.
created_at: 2026-08-07T18:19:57Z
record_lifecycle: immutable
record_status: accepted
task: NKF-019
decision_authority: Human Product Owner, Nourd ApS
---

# ADR 0094: Carry The Set And Audit Independently

## Context And Problem

The Human Product Owner directed a sanity audit covering 0.2 rule
soundness, flawless onboarding and upgrading, and guidance that makes the
AI audit its own onboarding independently. The
[audit Evidence](../evidence/audits/nkf-019-onboarding-and-upgrade-audit.md)
records sound rules and passing end-to-end exercises, plus three guidance
and tooling findings.

## Decision

Under the continued
[ADR 0084](0084-replace-the-unconsumed-0-2-release.md) exception:

1. The 0.2 release archive carries the complete versioned set — contracts,
   checker, specification, the four protocols, and the four portable
   skills — making the accepted versioned-set rule literally true; the
   retired 0.1 layout keeps its historical eight members.
2. The adoption protocol states the current NKF 0.2 migration meaning,
   replacing the withdrawn title-removal text.
3. Onboarding and adoption guidance require an independent post-action
   audit — fresh reading, checker rerun, pin, receipt, and guidance-marker
   verification, topology walk against the protocol, findings recorded as
   findings — and onboarding resolves preserved-document conflicts as
   sealed candidate edits.

## Scope And Applicability

This Decision corrects guidance and release tooling only; the accepted
authority pair and the [ADR 0093](0093-bind-the-adopted-0-2-release-checker.md)
checker binding are unchanged.

## Rationale

A frozen set that does not ship its guidance is a promise the archive
cannot keep, and an onboarding that grades its own work is the exact
failure mode [NKF-019](../tasks/active/NKF-019-decision-applicability-gate.md) exists to prevent.

## Alternatives Considered

Weakening the versioned-set sentence to match the eight-member archive was
rejected: the sentence is the accepted meaning.

## Consequences And Trade-Offs

The unconsumed archive is replaced once more; consumer onboarding cost is
unchanged because the adopter still installs guidance itself.

## Non-Claims

This Decision does not release, migrate any consumer, or confirm the
Realization.
