---
id: knowledge-architecture-roadmap
name: Knowledge Architecture Roadmap
status: active
last_reviewed: 2026-07-14
supersedes_note: >
  This is the ACTIVE knowledge-architecture roadmap. It is distinct from
  knowledge/audit/design-system-roadmap.md, which is a historical 2026-07-03
  audit snapshot and is now stale. Treat the audit roadmap as reference, not plan.
---

# Alejandría — Knowledge Architecture Roadmap

Living plan for raising AI-generated component quality along two axes:
**visual fidelity** and **architectural-decision consistency**.

North star: an AI agent should generate components with high visual fidelity and
consistent architectural decisions because the knowledge base gives it (a) precise
inputs and (b) one deterministic way to decide.

> **How the path actually went (2026-07-13):** after M3, we did *not* proceed linearly.
> Real generation tasks (Login, then the Fichas screen) surfaced fidelity gaps, so the
> **eval loop drove the work** — pulling M5 (Fidelity) forward ahead of M4/M6. This was
> the right move: it validated the knowledge→generation loop and exposed a foundational
> scale flaw that no static check would have caught. M4 and M6 remain unstarted.

---

## Milestone spine

| # | Milestone | Governing idea | Status |
|---|-----------|----------------|--------|
| M1 | Numeric Foundation | Measured, cited source-of-truth | ✅ Done |
| M2 | Semantic Foundation | Design language + token vocabulary; mechanical migration | ✅ Done (byte-identity proven) |
| M3 | Reasoning Spine | Unified entry point; one decision order; selection + reuse | ✅ Done |
| M4 | Contracts & Archetype | The structural skeleton every component takes | ✅ Done (validated by the scrollbar eval) |
| M5 | Fidelity | Raise components to PDF display scale | 🔄 Substantially done (eval-driven, out of order) |
| M6 | Grammar, Contrast & Validation | Generalize the "why"; teach right-vs-wrong; validate | ✅ Done (eval-validated — eval 5) |

---

## Completed work

### M1 — Numeric Foundation ✅
`knowledge/specs/` — SCHEMA, `tokens-inventory.md`, 18 per-component `*.spec.md`, cited and
manifest-registered. Later augmented with `references/pdf-text-extract.md` (lossless text-layer
extraction of all 13 PDF pages — the exact annotated values, cited by page).

### M2 — Semantic Foundation ✅
- `design-language.md` (color roles, 4px rhythm, type roles); `knowledge/tokens/` (token-plan,
  migration-map). Drift never tokenized (gated proposals / justified literals only).
- **M2b** mechanical migration: 105 tokens, 314 literal→`var()` swaps, **byte-identical**
  (proven by resolved-CSS diff: 750 declarations, 0 differences) + human visual pass. Merge gate cleared.

### M3 — Reasoning Spine ✅
- `knowledge/reasoning/` (decision-order, component-selection, reuse-rubric). One authoritative
  Decision Order; the two old conflicting orders redirect to it.
- Reconciled `index.md` (no more false "empty" claims; specs/tokens/reasoning all discoverable) and
  the `.cursor` rule; added manifest `governance[]`. InvestigationCard registered in `components[]`.

### M4 — Contracts & Archetype ✅
- `knowledge/reasoning/component-archetype.md` — the evidence-grounded construction standard
  (DOM/BEM, prop axes, API conventions, AP13 interaction law, slots, token/@2× consumption, a11y,
  primitive↔component pairing, conformance checklist), with real divergences flagged. Wired into
  the manifest `governance[]`, index, decision-order, reasoning README, and the component template.
- Anatomy-contract audit of the 18 component docs (report-only; all four contract sections present).
- **Validated by eval 4:** a fresh agent built a new `Scrollbar` component (PDF p13) that came out
  kit-consistent and closed the full knowledge loop — proving the archetype drives architectural
  consistency for un-templated components. Scrollbar kept (component count now 19).

### M5 — Fidelity 🔄 (eval-driven; most done, some deferred)
- **PDF-context variants promoted** (Rule 03, from repeated Login/DetailSheet overrides):
  `Button variant="pdf"` + `TextField/SelectField appearance="pdf"` — **documented in the same
  milestone** (docs + specs), so agents discover them. Source Code Light (300) loaded.
- **MetricCard `appearance="reporting" | "ficha"`** — the two scales page 10 specs.
- **@2× scale calibration** *(the session's key finding — see below)*: PDF-context absolute px
  halved (display = annotation ÷ 2). Fixed the "Fichas too big" problem.
- **DonutChart** layout converted absolute→relative flex (scale-robust).
- **Still deferred (see Open items):** OperationsConsole scale decouple; the M2b V/S/T palette/
  spacing normalizations; per-element annotation-vs-drawn drift; donut label placement.

### M6 — Grammar, Contrast & Validation ✅ (built; eval-validation pending)
- `knowledge/guidelines/visual-grammar.md` (generative grammar — build faithful UI with no reference),
  `knowledge/guidelines/anti-examples.md` (contrastive right/wrong pairs sourced from real eval failures),
  `knowledge/reasoning/fidelity-validation.md` (self-check vs specs incl. the ÷2 scale check; operationalizes Pass 10).
- Wired into `governance[]`, index, decision-order, reasoning README, anti-patterns, visual-analysis-protocol.
- **Completes the knowledge stack:** M1 inputs → M2 vocabulary → M3 decide → M4 build → M6 generate + verify.

---

## The eval loop (validated practice)

Not a milestone — a working method that proved itself. Give a *fresh* Cursor agent (no session
memory) a generation task + the knowledge base; score the output against a hidden rubric; let
failures reprioritize the roadmap.

| Eval | Task | Result |
|------|------|--------|
| 1 | Build Login (PDF p6) | Faithful; report-don't-invent held; **but overrode** Button/fields in local CSS → drove the variant promotion |
| 2 | Build Modal (PDF p11) | **Reused** `variant="pdf"`/`appearance="pdf"` unprompted (via reasoning taxonomy + code + precedent) → recurrence closed |
| 3 | Build Fichas (PDF p4, clean-room) | Discovered `appearance="ficha"` from docs, **but still "too big"** → surfaced the @2× foundation flaw |
| 4 | Build a **new** component (Scrollbar, PDF p13) | Followed the archetype unprompted → kit-consistent component (BEM, `cn()`/`...props`/exported types, no `forwardRef`, ARIA, token reuse, ProgressRing-style runtime vars) **with the full knowledge loop** (doc+spec+manifest) → **validates M4** |
| 5 | Generate a **no-reference** screen (Mission/Evacuación, capstone) | Produced a faithful Alejandría screen it never saw + reused 6 components + reported gaps + **ran the fidelity self-check unprompted** → **validates M6 extrapolation**. Findings: context mis-classification (console vs PDF); the p13 `Scrollbar` is decorative-only → shipped the functional `.ds-scroll-area` utility; the panel scroll needed a `flex:1; min-height:0` chain the grammar/archetype don't yet cover |

Loop shape that works: **observe → promote → document → regenerate**. Static checks
(byte-identity, resolved-CSS) cannot catch scale/semantic errors; only rendering a dense screen did.

---

## Key decisions & findings

- **The @2× artboard finding (major).** The reference PDF is a `1920×1080` = @2× artboard of a
  `960×540` logical design. Its absolute `px`/`pt` annotations were implemented as literal @1×
  CSS pixels, so PDF-context components rendered ~2× oversized (invisible on small cards, obvious
  on dense screens). Rule: **display px = annotation ÷ 2.** Documented in `specs/README.md`; full
  before→after in `specs/scale-calibration-changelog.md`.
- **PDF-context vs console are separate scale contexts.** The OperationsConsole is a *synthetic
  demo*, not a PDF-faithful screen; it owns its own (larger) scale and should not inherit the ÷2.
- **API without docs is invisible to agents.** A shipped variant that isn't in the component doc
  won't be discovered (Principle 08) → document variants in the *same* milestone that ships them.
- **The PDF is imperfect ground truth.** Annotations are internally inconsistent (p10 ficha `52pt`
  vs p4 drawn `~38pt`) and uncalibrated in absolute scale → per-surface visual validation is
  required; there is no single global factor for everything.
- **Sequencing principle** (still holds): reversible knowledge before irreversible code; facts
  before generalizations. But **empirical eval signal outranks the pre-planned order.**
- **M6 rename:** "Grammar, ~~Discrimination~~ **Contrast** & Validation."

---

## Open / deferred items

**Fidelity (M5 tail):**
- **OperationsConsole scale decouple** — decouple prompt is drafted (make `.ds-metric--ficha` a
  full small-scale override; revert base MetricCard/TaskCard to console scale). Demo-only cosmetic.
- **M2b V/S/T normalizations** — the gated palette merges (V1–V5) + spacing normalizations (S1–S6)
  + type mappings (T1–T4) were never applied; still awaiting a design decision.
- **Per-element scale drift** — ÷2 fixed the systemic 2×; individual elements (annotation vs drawn)
  may want ±small tuning.
- **Donut label placement** polish.
- **From eval 5 (M6 capstone):** (a) the `Scrollbar` (p13) is decorative-only — the functional
  `.ds-scroll-area` utility now covers real scroll regions (a functional `ScrollArea` wrapper could
  follow if reused); (b) grammar could give a sharper **console-vs-PDF context** rule (the agent
  mis-classified Mission); (c) candidate archetype/grammar note: scroll regions need a
  `flex:1; min-height:0` chain (the layout bug the agent didn't foresee). Mission pattern kept.
- **Specs `partial → measured`** — most specs still lack PDF page citations (pdf-text-extract now
  makes this cheap/exact).

**Maintenance (parallel, low-leverage):**
- ✅ InvestigationCard registered in manifest `components[]`.
- ◻ Manifest hand-maintenance drift — a generator / CI drift-check would stop recurring
  registry inconsistencies.

---

## Improvement → milestone mapping

| # | Improvement | Milestone | Status |
|---|-------------|-----------|--------|
| 1 | Structured Numeric Specifications | M1 | ✅ |
| 2 | Semantic Design Token scales | M2 | ✅ |
| 4 | Visual Grammar — *semantic core* | M2 | ✅ |
| 3 | Single deterministic Decision Order | M3 | ✅ |
| 9 | Semantic Component Selection taxonomy | M3 | ✅ |
| 6 | Reuse vs Variant vs New rubric | M3 | ✅ |
| — | Fidelity (variants, ficha scale, @2× calibration) | M5 | 🔄 mostly |
| 7 | Canonical Component Archetype | M4 | ✅ |
| 5 | Component Anatomy Contracts | M4 | ✅ (audit) |
| 4 | Visual Grammar — *generative* layer | M6 | ✅ |
| 8 | Contrastive Anti-Examples | M6 | ✅ |
| 10 | Numeric Fidelity Validation | M6 | ✅ |

---

## Commit log (branch `ui-components`)

- `b007ea0` — Login pattern composition (PDF p6) + PDF text-extract reference
- `71fd47e` — PDF-context variants, MetricCard ficha scale, doc-sync
- `16a297c` — @2× scale calibration (÷2) + relative donut layout
- `e921371` — roadmap refresh (post-2026-07-13 session)
- `c3005bd` — M4 component archetype + anatomy-contract audit
- `e280317` — Scrollbar component (M4 eval keeper) + roadmap tick
- `2d0679f` — M6 grammar / anti-examples / fidelity-validation + roadmap tick
- *(this commit)* — Mission pattern (M6 capstone keeper) + `.ds-scroll-area` functional scroll utility + eval-5 tick

---

## Recommended next

1. **Run the M6 eval** — the ambitious one: give a fresh agent a task requiring UI generated with
   *no direct reference* (a novel Alejandría screen/entity) and check that (a) it comes out faithful
   via the generative grammar and (b) it runs the fidelity self-check before declaring done. This
   validates the extrapolation lever. **The knowledge stack (M1–M6) is now built; this closes it.**
2. **Decide the OperationsConsole decouple** — run the drafted prompt or leave the demo as-is.
3. **Distribution & portability track** (raised 2026-07-14, deferred): the knowledge/generation
   layer is maturing, but external consumption is not ready — publish the package, export icons,
   stabilize the API, make the knowledge portable, design the agent consumption model. Separate track.
4. **Batch the maintenance** (manifest generator) when convenient — it keeps biting mid-milestone.
