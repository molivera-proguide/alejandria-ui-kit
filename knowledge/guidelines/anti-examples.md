# Contrastive Anti-Examples

**Status:** contrastive pairs (Milestone 6)  
**Language:** English (governance)

This document teaches **right vs wrong** with pairs drawn from **observed** generation failures (eval loop + calibration), not hypotheticals.

It does **not** replace the prohibition list in [`anti-patterns.md`](../anti-patterns.md). Anti-patterns say *what not to do*; this file shows *what that looks like* next to the correct alternative.

Related: [`visual-grammar.md`](./visual-grammar.md), [`fidelity-validation.md`](../reasoning/fidelity-validation.md), [`roadmap.md`](../roadmap.md) (eval table), [`scale-calibration-changelog.md`](../specs/scale-calibration-changelog.md).

---

## How to read a pair

| Field | Meaning |
|-------|---------|
| **Right** | Behavior / markup / values that match the kit after the failure was fixed or the rule was documented |
| **Wrong** | What the agent (or pre-fix implementation) actually did |
| **Why wrong** | One-line discrimination |
| **Source** | Traceability to eval / changelog / anti-pattern / principle |
| **Links** | Governing prohibition or principle |

---

## 1. Scale — ficha metric display vs literal 84px

| | |
|--|--|
| **Right** | In a ficha / detail-sheet metrics row, use MetricCard `appearance="ficha"` so the value is **26px** display (= PDF `52pt` ÷ 2). Reporting tiles use **42px** (= `84` ÷ 2). |
| **Wrong** | Author ficha (or dense PDF screen) metrics at **84px** (or other pre-calibration @2× literals) so the sheet reads “too big.” |
| **Why wrong** | Absolute PDF annotations are @2×; display must be annotation ÷ 2 — and ficha is a smaller scale than reporting. |
| **Source** | Roadmap eval 3 (Build Fichas — “too big”); [@2× finding](../roadmap.md#key-decisions--findings); [MetricCard.spec.md](../specs/components/MetricCard.spec.md) (`42px` / `26px`); [scale-calibration-changelog.md](../specs/scale-calibration-changelog.md) (`.ds-metric__value` 84→42, ficha 52→26). |
| **Links** | [specs/README.md — Scale calibration](../specs/README.md#scale-calibration); Principle 01 (Fidelity); fidelity [Scale check](../reasoning/fidelity-validation.md#2-scale-check) |

---

## 2. Reuse — `variant="pdf"` vs local Button CSS override

| | |
|--|--|
| **Right** | `<Button variant="pdf">Ingresar</Button>` (and fields `appearance="pdf"`) so fill is `--ds-color-pdf-action` `#494949`. |
| **Wrong** | Keep console `<Button variant="primary">` and override colors/padding in the pattern’s local CSS to fake a grey PDF button. |
| **Why wrong** | Recurring local override of a shipped variant — Rule 03 / reuse failure; the kit already exposes the context skin. |
| **Source** | Roadmap eval 1 (Login — “overrode Button/fields in local CSS”); eval 2 (Modal — reused `variant="pdf"` unprompted → recurrence closed); [Button.spec.md](../specs/components/Button.spec.md) `.ds-button--pdf`. |
| **Links** | Anti-Pattern 03 (borrowing / sidestepping identity); Anti-Pattern 12 (hardcoding design language); [reuse-rubric.md](../reasoning/reuse-rubric.md); Principle 08 (discoverability — document variants in the same milestone) |

---

## 3. Report-don't-invent — pattern-lock gap vs fabricated PatternLock

| | |
|--|--|
| **Right** | Build Login with existing exports + pattern-local markup for the circle grid; **report** that PatternLock is not a package export / not in the kit. |
| **Wrong** | Invent and ship a `PatternLock` React component (or claim it exists in the manifest) to “complete” the PDF. |
| **Why wrong** | Prefer omission/report over inventing an undocumented package identity. |
| **Source** | Roadmap eval 1 (“report-don't-invent held”); coverage / inventory mark PatternLock as PDF-only / not implemented ([audit/design-system-coverage.md](../audit/design-system-coverage.md)); [index.md](../index.md) ground rule — do not invent unregistered components. |
| **Links** | Anti-Pattern 01 (Inventing Missing UI); Principle 02 (Prefer Omission over Invention) |

---

## 4. Modernization — flat MetricCard vs “cleaned up” card

| | |
|--|--|
| **Right** | MetricCard as specified: hairline `#e6e6e6` border, reporting wash or ficha transparent, radius `--ds-radius-xs` (2px), **no** decorative gradient/shadow stack. |
| **Wrong** | “Clean up” the metric tile with larger radius, gradients, or multi-layer shadows to look modern. |
| **Why wrong** | Fidelity over reinterpretation — polish reinvented the component. |
| **Source** | Governing prohibition AP04 / P01 (observed failure mode in agent generation tasks; MetricCard is the PDF exemplar of a flat reporting tile — [MetricCard.spec.md](../specs/components/MetricCard.spec.md)). Roadmap M5 goal: raise to PDF display scale, not redesign. |
| **Links** | Anti-Pattern 04 (Modernizing Existing Designs); Principle 01 (Fidelity over Interpretation); [visual-grammar.md](./visual-grammar.md) §5 |

---

## 5. Context — grey `#494949` PDF action vs teal console button

| | |
|--|--|
| **Right** | On Login / Fichas / Modal (PDF-context screens), primary actions use grey `#494949` via `Button variant="pdf"` (or InvestigationCard’s documented primary action fill). |
| **Wrong** | Place a teal gradient `variant="primary"` console button as the primary action on those PDF screens. |
| **Why wrong** | Wrong context palette — PDF action role is `pdf-action`, not accent-brand teal. |
| **Source** | [design-language.md](./design-language.md) pdf-action role; pdf-text-extract p4/p6 (“Botón … #494949”); Button promotion notes; visual-audit historically flagged teal vs PDF grey mismatch. |
| **Links** | Anti-Pattern 02 (Mixing Component Variants / contexts); [visual-grammar.md](./visual-grammar.md) §1–§2; Principle 05 (Component Identity) |

---

## 6. Over-correction — respect native / already-display scale vs stacked ÷2

| | |
|--|--|
| **Right** | Apply ÷2 **once**, only to PDF-annotation absolute lengths that were still at @2×. After calibration, CSS/spec **display** values (e.g. Modal assistant shell `387×104`, Metric `42px`) are already correct — leave them. Console / OperationsConsole chrome stays on its own (larger) scale and must **not** inherit PDF ÷2. |
| **Wrong** | Uniformly re-halve an already-calibrated modal (or console MetricCard) “because everything PDF-related is ÷2,” producing UI that is too small. |
| **Why wrong** | ÷2 is a calibration from @2× artboard annotations — not a second global shrink factor for every surface. |
| **Source** | Roadmap key finding: PDF-context vs console are separate scale contexts; “no single global factor for everything”; OperationsConsole must not inherit ÷2. Modal/Login rows in [scale-calibration-changelog.md](../specs/scale-calibration-changelog.md) are already post-÷2 (re-applying would stack). |
| **Links** | [specs/README.md — Scale calibration](../specs/README.md#scale-calibration); fidelity [Scale check](../reasoning/fidelity-validation.md#2-scale-check); Principle 01 |

---

## 7. Sizing — constrain compact components vs stretch/freeze in a layout

| | |
|--|--|
| **Right** | Give compact/PDF-scale components their natural footprint: cap a kanban `TaskCard` column to ~the card width, wrap a ficha `MetricCard` row so tiles don't stretch, and constrain a `ChartCard`/`LineChartCard` with a `max-width`/`max-height` so it doesn't fill the viewport. |
| **Wrong** | Drop these components straight into a wide CSS grid so they stretch to full column width (ficha metrics, kanban tiles → big empty tiles) or grow unbounded (line chart → dominates the screen). |
| **Why wrong** | Several components are drawn at a fixed/compact ÷2 scale with no width cap; a full-width grid cell stretches them and exposes empty space (or, for SVG charts, balloons them). Composition must constrain them; the component's fixed size is not a full-bleed size. |
| **Source** | Eval 2026-07-22 baseline: G1 (kanban tiles ≤140px in wide columns → empty space), G4 (ficha metrics stretched + `LineChartCard` filled the viewport), G5 (`Asistente` frozen at 774px @2×). See [eval/results/2026-07-22-baseline.md](../eval/results/2026-07-22-baseline.md). Root component fix tracked in [component-roadmap.md](../component-roadmap.md) (@2× → fluid). |
| **Links** | Principle 01 (Fidelity — fixed ÷2 sizes are display-calibrated, not responsive); [visual-grammar.md](./visual-grammar.md) (layout); Anti-Pattern 02 (context) |

---

## 8. Tokens — type tokens on headings vs hardcoded weight/tracking

| | |
|--|--|
| **Right** | For a page/section heading, use a component's title slot where one exists (e.g. `Card` eyebrow/title), else `font-family: var(--ds-font-display)` + `font-weight: var(--ds-font-weight-bold)` + `letter-spacing: var(--ds-tracking-tight)` (or `--ds-tracking-title`). |
| **Wrong** | Hand-roll an `<h1>`/`<h2>` with `fontWeight: 700` and `letterSpacing: "0.04em"` as literals when the equivalent tokens (`--ds-font-weight-bold`, `--ds-tracking-tight`) exist. |
| **Why wrong** | Hardcoding design-language values that are already tokenized (AP12); drifts from the scale if tokens change. |
| **Source** | Eval 2026-07-22 baseline: G1 hand-styled the dashboard title with literals; G4 avoided it by using `Card`'s title prop. See [eval/results/2026-07-22-baseline.md](../eval/results/2026-07-22-baseline.md). |
| **Links** | Anti-Pattern 12 (hardcoding design language); [design-language.md](./design-language.md) (type roles); Principle 08 (discoverability) |

---

## Quick index

| Failure mode | Pair § | Primary anti-pattern / principle |
|--------------|--------|----------------------------------|
| @2× / too big | §1 | Scale calibration; P01 |
| Local override vs variant | §2 | AP03 / AP12; reuse-rubric |
| Invent missing component | §3 | AP01; P02 |
| Modernize / polish | §4 | AP04; P01 |
| Teal on PDF screen | §5 | AP02; dual-context grammar |
| Stacked ÷2 / wrong scope | §6 | Scale calibration; P01 |
| Stretch/freeze compact component | §7 | P01; layout grammar |
| Hardcoded type vs tokens | §8 | AP12; type roles |
