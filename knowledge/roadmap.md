---
id: knowledge-architecture-roadmap
name: Knowledge Architecture Roadmap
status: active
last_reviewed: 2026-07-13
supersedes_note: >
  This is the ACTIVE knowledge-architecture roadmap. It is distinct from
  knowledge/audit/design-system-roadmap.md, which is a historical 2026-07-03
  audit snapshot and is now partially stale (it lists pattern docs and
  InvestigationCard as unbuilt; both exist). Treat the audit roadmap as
  reference, not as the current plan.
---

# Alejandría — Knowledge Architecture Roadmap

Living plan for raising AI-generated component quality along two axes:
**visual fidelity** and **architectural-decision consistency**. Sequenced so that
each milestone consumes settled outputs of the previous one, reversible knowledge
work precedes irreversible code work, and generalizations come after the facts
they generalize.

North star: an AI agent should generate components with high visual fidelity and
consistent architectural decisions because the knowledge base gives it (a) precise
inputs and (b) one deterministic way to decide.

---

## Milestone spine

| # | Milestone | Governing idea | Type | Status |
|---|-----------|----------------|------|--------|
| M1 | Numeric Foundation | Measured, cited source-of-truth | Knowledge | ✅ Done (verified) |
| M2 | Semantic Foundation | Design language + token vocabulary; mechanical migration | Knowledge → Code | ✅ Done — pending visual-regression merge gate |
| M3 | Reasoning Spine | Reconcile the entry point; one deterministic decision path; selection; reuse | Governance + Reasoning | ◻ Next |
| M4 | Contracts & Archetype | The structural skeleton every component takes | Knowledge | ◻ |
| M5 | Fidelity | Apply the deferred visual work; raise components to PDF spec | Code (gated) | ◻ |
| M6 | Grammar, Contrast & Validation | Generalize the "why"; teach right-vs-wrong; validate against spec | Knowledge + Reasoning | ◻ |

---

## Improvement → milestone mapping

The ten high-impact improvements from the audit, mapped to milestones:

| # | Improvement | Milestone |
|---|-------------|-----------|
| 1 | Structured Numeric Specifications | M1 |
| 2 | Semantic Design Token scales | M2 |
| 4 | Visual Grammar — *semantic core* | M2 (design-language.md) |
| 3 | Single deterministic Decision Order | M3 |
| 9 | Semantic Component Selection taxonomy | M3 |
| 6 | Reuse vs Variant vs New rubric | M3 |
| 7 | Canonical Component Archetype | M4 |
| 5 | Component Anatomy Contracts | M4 |
| — | Fidelity (enabler for #10; from M2b deferral) | M5 |
| 4 | Visual Grammar — *generative* layer | M6 |
| 8 | Contrastive Anti-Examples | M6 |
| 10 | Numeric Fidelity Validation | M6 |

Note: improvement #4 (Visual Grammar) is deliberately split — its *semantic* core
moved forward into M2 (it supplies the criteria for tokenization); its *generative*
layer stays in M6 (it must cite a settled vocabulary and faithful components).

---

## Completed milestones

### M1 — Numeric Foundation ✅
- Created `knowledge/specs/` — `SCHEMA.md`, `tokens-inventory.md`, and 18 per-component
  `*.spec.md` (one per `index.ts` export), all values cited to `styles.css` / component
  docs / PDF. Registered in manifest `specs[]`.
- Outcome: the visual reference is now a measured, machine-usable record with
  implemented-vs-intended deltas recorded (not resolved).
- Known signal: 17/18 specs are `status: partial` because component docs lack PDF
  page citations — this is a prerequisite for M5. Inventory occurrence counts are
  approximate (M2b found `999px` listed as 10, actual 5).

### M2 — Semantic Foundation ✅ (pending visual-regression merge gate)
- **M2a:** `knowledge/guidelines/design-language.md` (intent taxonomy: color roles,
  4px spacing rhythm, type roles) + `knowledge/tokens/` (`token-plan.md`,
  `migration-map.md`, `README.md`). Registered in manifest `tokens[]` / `guidelines[]`.
- **M2a-revision:** de-fossilized drift — off-grid spacing and PDF pt sizes became
  gated normalization proposals (not permanent tokens); spacing vocabulary is the
  clean `--ds-space-1..6` lattice; naming collision (`space-Npx`) removed.
- **M2b:** mechanical-only migration of `styles.css` — 105 new tokens defined at exact
  current values, 314 literal→`var()` swaps, **byte-identical rendering**, Storybook
  build passed. All `visual-gated` rows (V1–V5, S1–S6, T1–T4) left untouched.
- Merge gate: run a Storybook visual-regression diff (HEAD vs migrated) before merge —
  static checks indicate zero change; this is the definitive confirmation.

---

## Key decisions on record

- **Sequencing principle:** reversible knowledge before irreversible code; facts before
  generalizations of those facts.
- **M2 reframe:** the token milestone is led by design-language *semantics* (the criteria
  for tokenization), not by the code migration. Tokenization decisions ARE design-language
  decisions.
- **Drift is never a token.** Off-grid values are either gated normalization proposals or
  justified component-local literals — never minted as scale tokens.
- **Tokenization is decoupled from normalization.** M2b shipped the vocabulary with zero
  visual change; the look-changing decisions (V/S/T) are deferred to M5 under PDF/designer
  review.
- **Naming rename:** M6 was renamed from "Grammar, Discrimination & Validation" →
  "Grammar, Contrast & Validation" (the loaded term replaced).

---

## Deferred visual worklist (input to M5 — Fidelity)

The `visual-gated` resolutions M2b did not apply, enumerated and ready:

- **Color merges (V1–V5):** `#ff0404`→danger · `#8a8b87`→ink-soft · `#c1c1c1`→line ·
  `#060606`/`#2a2927`→surface · `#82f3d8`→teal. *(Default = keep both palettes named
  unless the team elects to consolidate contexts.)*
- **Spacing normalizations (S1–S6):** 5→4 · 7→8 · 10→12|8 (tie) · 11→12 · 14→16|12 (tie) · 15→16.
- **Type mappings (T1–T4):** 13/14/16px → role rem tokens; 18px keep-as-is.
- **Spec deltas (from M1):** e.g. MetricCard label `12px` vs PDF `16px`.

M5 also includes acquiring the PDF reference (page citations → upgrade specs
`partial → measured`) and re-verifying inventory counts.

---

## Dependencies

```
M1 ──▶ M2 ──▶ M3
        │       │
        └──▶ M5 ◀┘   (M5 also needs M1 deltas + M2 vocabulary)
M3 ──▶ M4 ──▶ M5 ──▶ M6
```

- M5 (Fidelity) precedes M6: the generative grammar (#4) and contrastive examples (#8)
  should generalize from faithful components, and numeric validation (#10) is meaningless
  until components are at spec.
- M3 and M4 are independent of the deferred visual work and can proceed now.

---

## Parallel maintenance track (not a quality milestone)

Runs alongside, lower leverage, batchable:
- Register `InvestigationCard` in manifest `components[]` (it is spec-registered but not
  component-registered).
- Reduce manifest hand-maintenance drift (generator / drift-check).

These do not gate any quality milestone.
