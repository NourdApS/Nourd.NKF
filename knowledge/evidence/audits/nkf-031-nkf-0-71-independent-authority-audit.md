---
title: NKF-031 NKF 0.71 Independent Authority Audit
summary: Records the two-round fresh independent audit of the exact candidate NKF 0.71 authority set — the successor Specification, executable companion, evaluation policy, version-delta declaration, derived schemas, and producer-promotion input — that the Human Product Owner's standing acceptance condition requires before any acceptance under delegation, with every finding, its repair, and the final verdict.
created_at: 2026-08-17T18:45:00Z
---

# NKF-031 NKF 0.71 Independent Authority Audit

Under [NKF-031](../../tasks/items/NKF-031-release-the-corrective-nkf-0-71.md),
the candidate NKF 0.71 authority set derived from
[ADR 0130](../../decisions/0130-adopt-the-nkf-0-71-corrective-successor-direction.md)
received the fresh independent audit the Human Product Owner's standing
acceptance condition requires. Independent reviewer agents with no part in
producing the candidate performed two rounds. This Evidence records their
exact subjects, findings, dispositions, and the final verdict.

## Round One — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited commit | `2d21042260e663ab4cf45b0e4321981365bc3b24` (`task/NKF-031`, clean tree) |
| Verdict | Not clean: six blocking findings, one should-fix, two notes |

The auditor recomputed every claimed digest from bytes, verified the four
immutable 0.7 predecessor digests, adjudicated all sixty-three
non-current-version tokens in the candidate Specification, reproduced the
derived schemas byte-identically from the generator in an isolated copy,
re-ran the deterministic version-delta seeding to byte identity, verified
the promotion input's section map against the accepted predecessor
declaration and the Specification's sixty-six real headings, and confirmed
the governance boundaries: no accepted byte changed and nothing claimed
acceptance. The topology reconciliation, version labels, version delta,
window, compatibility, promotion input, digest chain, and scope discipline
passed.

The six blocking findings formed one coherent miss inside the executable
companion: the deterministic-governed-mechanics operations chapter, the
promotion dispatch gate, and the promotion digest-binding block were
predecessor copy-forward text the derivation never enumerated — fresh
instances of exactly the two defect classes the release corrects:

1. The promotion digest binding named the 0.7-era predecessor release
   authority and supersession subject instead of
   [ADR 0128](../../decisions/0128-accept-the-revised-nkf-0-7-authority-set.md).
2. The task-transition mechanic omitted the seal-completed successor
   baseline, the closed-vocabulary admission, and fail-before-mutation on
   excess — silently diverging from the Specification's updated row.
3. The baseline-seal mechanic admitted only reviewer-completed inputs,
   contradicting the executable's own stage rule admitting the
   transition-produced conclusion input.
4. The adopt mechanic retained the unsupported breaking-migrate vocabulary
   and defined no subjects or postconditions for the only supported
   non-breaking upgrade.
5. The adopt mechanic's promotion surfaces still asserted the
   predecessor-only path neutralization and identity successions.
6. The promotion dispatch retained the predecessor-only
   neutralization-and-successions currency condition.

## Repair

All six findings and all three notes were repaired at commit
`593bebd507373bceafec760554586728dcfd07f5` in the executable companion
alone, with the digest rebind rippled through the derived schemas, the
promotion input, and the candidate Evidence registrations, and the graph
resealed. The reseal surfaced one additional format observation, recorded
in the sealed review: under accepted 0.7 revision semantics a non-Markdown
evidence document's node revision projects no content digest, so a YAML
evidence content change is invisible to the graph revision; the repaired
promotion input was semantically re-reviewed despite the empty computed
closure, and the observation is preserved for later governed treatment
alongside the deferred review-quality measurement.

## Round Two — Exact Subject And Verdict

| Binding | Value |
| --- | --- |
| Audited commit | `593bebd507373bceafec760554586728dcfd07f5` (`task/NKF-031`, clean tree) |
| Verdict | Clean: every finding repaired, no regression, two non-blocking notes |

The re-auditor verified each of the six blocking findings and three notes
repaired exactly as specified with no regression; recomputed the complete
digest chain — the executable, its three bound authority digests, all seven
derived schemas reproduced byte-identically in an isolated copy, the
promotion input, and both candidate Evidence registrations; re-ran the
deterministic version-delta seeding to byte identity and independently
cross-checked that the two semantically-new rules are exactly the two new
0.71 diagnostics; confirmed the repair diff touched exactly the expected
eleven files with no accepted byte changed; ran the complete gate to zero
diagnostics with equal baseline and candidate graph revisions; and swept
the entire deterministic-governed-mechanics and compatibility chapters
line by line against the Specification and the predecessor executable,
finding no remaining predecessor-only meaning.

Two non-blocking notes are recorded with their deliberate dispositions:

1. The Specification's Adopt-row ordinary-modes sentence still lists
   "migrated declarations", a predecessor-era word in an enumerated
   coverage list; the executable is internally consistent, no mode or
   postcondition depends on it, and repairing it would reopen the audited
   digest chain for marginal gain. Deliberately not fixed; recorded for
   the next governed revision.
2. The deployed 0.7 checker computes a non-Markdown evidence document's
   node revision without its content digest, so a YAML evidence content
   change is invisible to the graph revision, while the specification
   prose expects source participation — a checker-versus-specification
   divergence inherited from accepted NKF 0.7 and outside the adopted
   corrective scope. The producer recorded it transparently in the sealed
   repair review and semantically re-reviewed the changed bytes;
   acceptance integrity is unaffected because the accepting Decision binds
   the serialized-input digest directly. Its governed treatment is decided
   at the 0.71 checker derivation and recorded there.

## Final Accepted Digests

| Artifact | SHA-256 |
| --- | --- |
| `knowledge/specifications/nkf-0.71.md` | `ec6d7fd733a989eb86580bd3a9d77405d3c02d5402429190ad8d171c4414ae98` |
| `contracts/nkf/0.71/nkf.yaml` | `65b5bec3dd16cd1872216b2dc17acbe77f1a363e76112f675a271e337cf6ec1a` |
| `contracts/nkf/0.71/freshness-policy.yaml` | `20c7b5f4e34f88da6c8365a59cee913020263c2c4ab36796602a2a7cb0ab1ae4` |
| `contracts/nkf/0.71/version-delta.yaml` | `21089afc8155a98410960e2fa7cf19344e1e5ca010095a0f7975dc783d730c01` |
| `knowledge/evidence/release/nkf-0.71-producer-promotion.yaml` | `9f942eae2b25417d3f4ade577587d04577982aa969f51a6ac045e83865cc431a` |

This Evidence records audit facts and dispositions. It does not itself
accept, confirm, or promote anything; acceptance is the separate act of
[ADR 0131](../../decisions/0131-accept-the-nkf-0-71-authority-set.md).
