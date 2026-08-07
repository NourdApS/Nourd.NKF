# NKF-019 Onboarding And Upgrade Audit

This Evidence records the independent sanity audit of the released NKF 0.2
set covering rule soundness, fresh onboarding, upgrading, and the AI
guidance, performed after the third correction round at commit `6c21456`.

## Method And Observations

Mechanical consistency was compared across the canonical Markdown, the
executable companion, and the checker: the 159-rule registries match
exactly, every emitted rule is registered, and the twelve identity labels
agree between contract and implementation.

Three end-to-end exercises ran against the published release archive:

1. An empty repository onboarded through inspect, agent-resolved
   assessment, seal, and onboard: conformance passed, the generated Task
   carries its gate, every document carries a heading-equal title, the
   installed guidance carries the `NKF Version: 0.2` marker, and the
   independent `check` command passed on the result.
2. An adversarial Tiny Knowledge repository with an untitled document,
   restated identity bullets, and a non-resolving decision-style mention
   failed closed at staged validation with exactly
   `markdown.frontmatter.required` and `markdown.body.identity-duplication`,
   left no partial state after rollback, did not flag the non-resolving
   mention, and onboarded cleanly after the findings were resolved as
   sealed candidate edits.
3. A real NKF 0.1 repository from history was migrated by the documented
   adoption steps alone — version declaration, retrospective gates, and
   digest re-pins — and validated as NKF 0.2 with zero diagnostics.

## Findings And Corrections

1. The release archive carried only the contract set while the accepted
   versioned-set rule promises the complete set. The 0.2 archive now
   carries the four protocols and four portable skills; the retired 0.1
   layout keeps its historical eight members.
2. The adoption protocol still described the withdrawn title removal. Its
   migration meaning now states the current contract: heading-equal titles,
   gates with retrospective disclosure, identity bullets moving into
   orientation keys, deep links including gate cells, and digest re-pins.
3. Neither onboarding nor adoption required an independent post-action
   audit. Both protocols and the onboarding skill now require auditing the
   completed action with a fresh reading — checker rerun, pin, receipt, and
   marker verification, topology walk against the protocol — recording
   findings as findings, and the onboarding protocol now directs sealed
   candidate edits for preserved-document conflicts.

## Non-Claims

This audit does not accept records, confirm the Realization, or prove any
later snapshot. The corrected archive replaces the unconsumed release under
the recorded exception.
