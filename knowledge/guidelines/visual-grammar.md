# Alejandría Visual Grammar

**Status:** generative grammar (Milestone 6)  
**Language:** English (governance)  
**Claims:** labeled **[observation]** (cited measured fact) or **[interpretation]** (rule inferred from repeated usage)

This document is the **generative** layer: the rules an agent applies to *produce* faithful Alejandría UI when the PDF never drew that exact component or screen.

It does **not** replace:

| Layer | Doc | Role vs this grammar |
|-------|-----|----------------------|
| Descriptive intent taxonomy | [`design-language.md`](./design-language.md) | Names roles and measured values; this grammar says how to *compose* them |
| Construction shape | [`component-archetype.md`](../reasoning/component-archetype.md) | DOM/BEM, prop axes, API; this grammar sits *on top* for look |
| Contrastive failures | [`anti-examples.md`](./anti-examples.md) | Right vs wrong pairs |
| Numeric self-check | [`fidelity-validation.md`](../reasoning/fidelity-validation.md) | Verify authored values against specs |

---

## 1. Two contexts

**[observation]** Specs and the design language record two coexisting systems ([design-language.md](./design-language.md) §1; [MetricCard.spec.md](../specs/components/MetricCard.spec.md), [Button.spec.md](../specs/components/Button.spec.md)):

| Context | Surfaces / ink / accent | Typical hosts | Scale rule |
|---------|-------------------------|---------------|------------|
| **Console / brand (teal)** | `--ds-color-surface` `#101315`, `--ds-color-ink` `#f4f7f5`, teal accents | `.ds-button` (primary/secondary/ghost/danger), Badge, Card, AlertBanner, base `.ds-field`, Switch, SegmentedControl, DataTable, ProgressRing | `rem` / shared tokens — **out of scope** for ÷2 ([specs/README.md](../specs/README.md#scale-calibration)) |
| **PDF / reporting (grey)** | `#060606`, `#2a2927`, `#8a8b87`, `#c1c1c1`, `#e6e6e6`, `#ffffff`, `#494949`, `#ff0404` | MetricCard, ModuleCard, TaskCard, ChartCard*, InvestigationCard, `Button variant="pdf"`, fields `appearance="pdf"`, Login / DetailSheet / Modal patterns | Absolute `px`/`pt` at **display = PDF annotation ÷ 2** |

\*Chart cards use the PDF grey family for shell/labels.

**When each applies — [interpretation] grounded in API promotion (roadmap M5, Rule 03):**

1. Interactive **console chrome** (ops demo, teal controls) → console/brand grammar. Prefer `variant="primary"` etc., never paint PDF greys into teal Button.
2. Screens/cards drawn from the **design-reference PDF** (login, fichas, métricas, módulos, charts, modales) → PDF/reporting grammar. Prefer `variant="pdf"` / `appearance="pdf"` / `appearance="ficha"|reporting` rather than local CSS overrides ([Button.md](../components/Button.md); eval 1→2 recurrence close in [roadmap.md](../roadmap.md)).
3. **MetricCard scales:** `appearance="reporting"` (large value `42px` display = 84÷2) vs `appearance="ficha"` (value `26px` display = 52÷2, transparent bg) — [MetricCard.spec.md](../specs/components/MetricCard.spec.md). Do not use the reporting size inside a ficha layout.

**Scale link:** always read [specs/README.md — Scale calibration](../specs/README.md#scale-calibration) and [scale-calibration-changelog.md](../specs/scale-calibration-changelog.md) before authoring PDF-context absolutes.

---

## 2. Color grammar

Pick color by **role**, then by **context**. Role catalog lives in [design-language.md](./design-language.md) §2 — do not duplicate the full table here.

**[observation] Generative pick rules (from specs):**

| Need | Console | PDF / reporting | Cite |
|------|---------|-----------------|------|
| Canvas / card fill | `--ds-color-surface` / `--ds-color-surface-strong` | `#060606` / `--ds-color-pdf-surface`; Metric reporting wash `rgb(6 6 6 / 0.2)` | ModuleCard, MetricCard specs |
| Primary readable text | `--ds-color-ink` | `#ffffff` on dark PDF tiles for values | Button ink; ModuleCard metric value |
| Muted / label ink | `--ds-color-ink-soft` / `--ds-color-ink-muted` | `#8a8b87` / `--ds-color-pdf-ink-muted` | Metric label, Module metric label |
| Hairline / border | `--ds-color-line` (teal-grey alpha) | `#c1c1c1` / `#e6e6e6` PDF greys | ModuleCard border; MetricCard `#e6e6e6` |
| Interactive accent | Teal family (`--ds-color-teal*`) | **Not teal** — grey action `#494949` / `--ds-color-pdf-action` | `.ds-button--pdf` |
| Critical / danger | `--ds-color-danger` `#ff3d48` | Metric critical `#ff0404` / `--ds-color-pdf-critical` (do not silently merge) | MetricCard.spec deltas |
| State (info/success/warning) | Tokenized accent ladder | Same semantic tokens when status is console; PDF cards often use critical red only for metric tone | design-language §2.1 |

**[interpretation]** Never “upgrade” a PDF grey action to teal primary for polish. Context selects the accent family first; then pick the role within that family.

---

## 3. Type grammar

Relationships, not token laundry lists. Families: Source Code Pro (`--ds-font-mono` / display) + Montserrat (`--ds-font-body`) — [design-language.md](./design-language.md) §4.

| Hierarchy role | Rule | Evidence |
|----------------|------|----------|
| **Section / chip / form labels** | Mono + **uppercase** + **tracked** + bold (often 700) | Badge / table `th` mono uppercase; Metric reporting label mono 700 uppercase `letter-spacing: 0.41em` ([MetricCard.spec.md](../specs/components/MetricCard.spec.md)); Module title mono 400 uppercase `0.1em` ([ModuleCard.spec.md](../specs/components/ModuleCard.spec.md)) |
| **Primary numeric / KPI values** | Montserrat **bold (700)**, large relative to label, no uppercase | Metric reporting value `42px` / ficha `26px` body 700; Module metric value body 700 `8px` display |
| **Supporting / description** | Montserrat light (**300**) or extralight (**200**) | Module metric label 300; ficha metric label weight 200; PDF body pair in design-language §4.3 |
| **Control / button label (console)** | Body, uppercase, 700, rem ladder by size | Button.spec typography |
| **PDF action label** | Body bold on grey fill (login/ficha annotations) | Button `--pdf`; pdf-text-extract p4/p6 `#494949` |

**[interpretation]** Hierarchy is built by **size + weight + casing + tracking**, not by decorative underlines or extra chrome (Principle 04).

---

## 4. Spacing & whitespace grammar

**[observation]** Densest compatible lattice is **4px**: `4 / 8 / 12 / 16 / 20 / 24` → `--ds-space-1..6` ([design-language.md](./design-language.md) §3). High-reuse off-grid values (`10`, `11`, `14`, `15`) exist as measured drift — do **not** silently normalize (gated in token plan / Fidelity).

**Generative rules:**

1. Prefer on-lattice steps for *new* layout gaps unless a PDF annotation/spec forces an off-grid value.
2. **Whitespace has meaning** (Principle 03; Anti-Pattern 05): preserve padding/gap from the spec or reference; do not compress empty regions.
3. **Density by context — [interpretation]:**
   - Console chrome: rem-based padding on controls (Button sm/md/lg).
   - PDF cards: tight display-scale padding (Metric `5px`, Module `25px 10px 12.5px 10px`, Task/Investigation compact tiles) — [MetricCard](../specs/components/MetricCard.spec.md) / [ModuleCard](../specs/components/ModuleCard.spec.md) specs.
4. Negative offsets (`-1px` hover, Task accent `-9px` display) are **geometry/motion**, not rhythm steps — keep as component-specific ([design-language.md](./design-language.md) §3.3).

---

## 5. Border / elevation grammar

**[observation]**

| Element | Rule | Evidence |
|---------|------|----------|
| Borders | Prefer **hairlines** `0.75px` or `1px` — hairlines are **not** ÷2-scaled | MetricCard / ModuleCard `0.75px`; Button `1px`; [specs/README.md](../specs/README.md#scale-calibration) |
| Radius | Small: `--ds-radius-xs` `2px` on cards/buttons; sm/md for larger chrome; pills `999px` for circular UI | Metric/Module radius-xs; design-language §5.1 |
| Shadows | **Minimal.** Console: `--ds-shadow-sm` / `--ds-shadow-md` / focus ring. PDF: Module hover `0 16px 42px rgb(0 0 0 / 0.22)` is measured component paint — do not invent extra layers | ModuleCard.spec; design-language §5.2 |
| Focus | Prefer existing `--ds-focus-ring` or the component’s documented focus paint | Module focus ring in spec |

**[interpretation]** Flat PDF reporting tiles (MetricCard) stay flat — no “modern” card stack shadows (see [anti-examples.md](./anti-examples.md) Modernization; AP04).

---

## 6. Composition grammar

**[observation]** Screens compose patterns; patterns compose components ([index.md](../index.md) Architecture).

| Level | Generative rule | Cite |
|-------|-----------------|------|
| **Regions** | Segment the screen first (regions dominate → secondary). Do not invent regions the reference lacks | [visual-analysis-protocol.md](../visual-analysis-protocol.md) Pass 1–3 |
| **Stack** | Card anatomy is vertical: identity → primary metric/body → secondary meta/actions. Exemplars: Metric (label → value → change); Module (icon → title → divider → metrics); Investigation (icon/title → metrics → actions) | Component specs + archetype slots |
| **Patterns** | Prefer documented pattern recipes ([operations-console](../patterns/operations-console.md), [metrics-row](../patterns/metrics-row.md), [module-grid](../patterns/module-grid.md), login/detail-sheet/modal under `packages/ui` patterns) over inventing new layout shells | index patterns table |
| **Controls inside PDF screens** | Compose `Button variant="pdf"` + field `appearance="pdf"` rather than overriding global Button CSS | roadmap eval 1–2; Button.spec `.ds-button--pdf` |
| **Missing kit piece** | Report the gap (e.g. PatternLock not exported) — compose with local markup only when the pattern already does; do not mint a fake package component | roadmap eval 1 “report-don't-invent”; coverage audit PatternLock |

**[interpretation]** Prop axes (`variant` / `appearance` / `size` / `tone`) stack per [component-archetype.md](../reasoning/component-archetype.md) §3 — context skin is `appearance` or PDF-oriented `variant`, not a one-off class in the consumer.

---

## 7. Generative procedure

To build a faithful component or screen **the PDF did not draw** (or to assemble one it did):

1. **Classify context** — console/teal vs PDF/reporting (§1). If PDF, commit to **display = annotation ÷ 2** for absolute lengths.
2. **Apply this grammar** — color roles (§2), type hierarchy (§3), spacing (§4), border/elevation (§5), composition (§6).
3. **Select / reuse** — [decision-order.md](../reasoning/decision-order.md) §3–§4 → [component-selection.md](../reasoning/component-selection.md) → [reuse-rubric.md](../reasoning/reuse-rubric.md). Prefer existing `variant`/`appearance` over local overrides.
4. **Shape the build** — [component-archetype.md](../reasoning/component-archetype.md) (BEM, props, tokens, a11y).
5. **Consume tokens** — [decision-order.md](../reasoning/decision-order.md) §2; [tokens/README.md](../tokens/README.md). Hardcode only keep-as-is geometry/paint.
6. **Validate before “done”** — [fidelity-validation.md](../reasoning/fidelity-validation.md) (spec deltas, scale check, token/reuse check). That checklist operationalizes [visual-analysis-protocol.md](../visual-analysis-protocol.md) Pass 10.

If any step invents a value, component, or polish not grounded in specs/reference → stop and report ([design-principles.md](../design-principles.md) P01–P02).
