# Numeric Fidelity Validation

**Status:** grounded self-check (Milestone 6)  
**Language:** English (governance)

Run this **before declaring a component or screen done**. It turns [visual-analysis-protocol.md](../visual-analysis-protocol.md) **Pass 10 — Fidelity Review** into a **checkable** comparison against measured specs — it does **not** replace Passes 0–9 (those precede implementation).

Related: [`visual-grammar.md`](../guidelines/visual-grammar.md) (how to build), [`anti-examples.md`](../guidelines/anti-examples.md) (right vs wrong), [`component-archetype.md`](./component-archetype.md), [`reuse-rubric.md`](./reuse-rubric.md), [`specs/README.md`](../specs/README.md).

---

## When to run

| Situation | Validation path |
|-----------|-----------------|
| Component with `knowledge/specs/components/<Name>.spec.md` | §§1–3 + checklist |
| Screen / pattern composition | §§1–3 for each DS component used + composition notes in §5 |
| **New** component (no spec yet) | §4 New-component path |

---

## 1. Spec check

**Goal:** authored CSS/TSX visual values match the component’s numeric spec at **display scale**.

1. Open `knowledge/specs/components/<Name>.spec.md`.
2. Extract from your implementation (or proposed CSS): `font-size`, `padding`, `gap`, `margin`, `min-width`/`min-height`/`width`/`height`, colors (hex / `var(--ds-*)`), `border-width`, `border-radius`, `letter-spacing`, `font-weight`, `font-family`.
3. For each property present in the spec tables (Dimensions, Color, Typography, Spacing, Variants), compare to the **Value** column (those values are already at display scale for PDF-context blocks — see MetricCard/ModuleCard headers).
4. Record **deltas** (see [report format](#how-to-report-deltas)). A delta is expected only if already listed under the spec’s “Deltas & open questions”; new silent deltas are failures.
5. **Geometry is a separate axis from color — checking one does not check the other.**
   `FormCheckable`'s switch (control before the label instead of after, track 3.4× oversized)
   and every one of `FormTextInput`/`FormSelect`/`FormFileUpload`/`FormDatePicker`/`Modal`'s
   2026-08-10 bugs shipped through a prior pass that had verified color/font-size only and
   recorded it as "fidelity-passed" — geometry was never independently re-measured. A pass
   that only diffed `getComputedStyle().color`/`font-size` has not verified position or size,
   even if it says "pixel-for-pixel." Explicitly measure and diff:
   - **Position of each element relative to its siblings** — which one is visually first,
     is it inline or does it wrap to its own row, is it centered/top-anchored/right-aligned.
     Do not infer this from color matching.
   - **Absolute size of any control/track/thumb/icon reused from a different component
     family's token** (`--ds-size-*` shared with `Button`/`Switch`/`TextField`, etc.) — these
     are the highest-risk values, since a wrong-family token still "looks like a real
     design-system value" while being 2-3× off for this context.
   - **State-transition geometry** — if the element has more than one visual state, diff the
     reference's own examples of each state directly (see
     [visual-analysis-protocol.md — PASS 9](../visual-analysis-protocol.md#pass-9--interaction-analysis))
     instead of assuming a familiar animation pattern (floating label, etc.) from one frame.

**Exemplar targets (do not invent others):**

| Spec | Display-scale examples to verify |
|------|----------------------------------|
| [MetricCard.spec.md](../specs/components/MetricCard.spec.md) | padding `5px`; reporting value `42px`; ficha value `26px`; label `6px`; border `#e6e6e6`; critical `#ff0404` |
| [ModuleCard.spec.md](../specs/components/ModuleCard.spec.md) | min `130×130`; title `12px`; icon `90×90`; padding `25px 10px 12.5px 10px` |
| [Button.spec.md](../specs/components/Button.spec.md) | pdf fill `--ds-color-pdf-action` → `#494949`; console sizes stay rem ladder |

---

## 2. Scale check

**Goal:** catch the “Fichas too big” class of error ([roadmap.md](../roadmap.md) eval 3; [scale-calibration-changelog.md](../specs/scale-calibration-changelog.md)).

| Check | Pass criterion |
|-------|----------------|
| PDF-context absolute `px`/`pt` | Equal to **display** in the spec (= historical PDF annotation ÷ 2), **not** the raw annotation |
| Hairlines / radius / `em` / unitless leading / `rem` | Unchanged by ÷2 — do not “helpfully” halve them ([specs/README.md](../specs/README.md#scale-calibration)) |
| Console / teal hosts | Not forced through ÷2 (Button non-pdf, Badge, base field, OperationsConsole demo scale) |
| Already-calibrated CSS | Do **not** ÷2 again ([anti-examples.md](../guidelines/anti-examples.md) §6 Over-correction) |
| Metric appearance | `ficha` → 26px value; `reporting` → 42px — never ship 84px in production CSS for these selectors |

**Operational test:** if the PDF page cites `84pt` / `52pt` / `180px` icons, your CSS must show ≈ half those numbers (42 / 26 / 90), matching the spec — not the annotation literal.

---

## 3. Token / reuse check

**Goal:** no duplicate vocabulary; no local override where a variant exists.

| Check | Pass criterion | Link |
|-------|----------------|------|
| Hardcoded hex/spacing that duplicates an existing `--ds-*` | Prefer `var(--ds-*)`; if intentionally literal, must be keep-as-is / documented | Anti-Pattern 07 / 12; [decision-order.md](./decision-order.md) §2 |
| PDF grey button / field chrome | Uses `variant="pdf"` / `appearance="pdf"` — **not** pattern-local overrides of teal Button | [anti-examples.md](../guidelines/anti-examples.md) §2; [reuse-rubric.md](./reuse-rubric.md) |
| New look for same semantic control | Add/use axis (`variant` / `appearance` / `size` / `tone`) per archetype — do not invent a parallel CSS skin | [component-archetype.md](./component-archetype.md) §3 |
| Missing kit piece | Reported, not fabricated | [anti-examples.md](../guidelines/anti-examples.md) §3; AP01 |

---

## 4. New-component path (no spec yet)

When `*.spec.md` does not exist yet:

1. **Grammar** — [visual-grammar.md](../guidelines/visual-grammar.md) §§1–6 (context, color, type, space, elevation, composition).
2. **Archetype** — [component-archetype.md](./component-archetype.md) conformance checklist (§9).
3. **Display scale** — if PDF-context, author absolutes at annotation ÷ 2; cite the PDF page / [pdf-text-extract.md](../references/pdf-text-extract.md).
4. **Token reuse** — §3 above; do not mint drift as new scale tokens without decision-order §2.
5. **Then** draft the numeric spec (SCHEMA) before calling the work complete for knowledge registration ([specs/README.md](../specs/README.md) — How to add a new spec).

Until a spec is filed, report comparisons against **grammar + cited PDF annotation÷2 + nearest exemplar specs** (MetricCard / ModuleCard / Button as applicable).

---

## Runnable checklist

Copy and tick before “done”:

```text
Fidelity validation — <Component or Screen name>
Date / agent:

[ ] Spec file opened (or §4 path if none)
[ ] Spec check: each authored font-size / padding / gap / color / dimension compared; deltas listed
[ ] Geometry check run as its own pass, not inferred from the color check: sibling order/position verified; any control/icon/track sized from a shared cross-family token re-measured against this context; multi-state elements diffed across the reference's own state examples (§1.5)
[ ] Scale check: PDF absolutes are display (÷2); no stacked ÷2; hairlines/rem untouched; correct Metric appearance
[ ] Token check: no needless hardcodes duplicating --ds-*
[ ] Reuse check: pdf/ficha/reporting variants used instead of local overrides
[ ] Pass 10 questions (below) all answered NO
[ ] Anti-example modes scanned (scale, override, invent, modernize, wrong context, over-correct)
[ ] New artifacts registered (manifest / index) if claiming kit membership
```

### Pass 10 questions (from visual-analysis-protocol)

Answer **NO** to all, or stop and fix:

- Did I move / regroup / simplify anything vs the reference?
- Did I replace a layout?
- Did I infer missing information or invent spacing / hierarchy?
- Did I add visual polish (gradients, shadows, rounding) not in the spec/reference?

→ Full wording: [visual-analysis-protocol.md — PASS 10](../visual-analysis-protocol.md#pass-10--fidelity-review).

---

## How to report deltas

Use one row per property. Prefer exact spec Value as the baseline.

```text
| Property | Authored | Spec (display) | Delta | Severity |
|----------|----------|----------------|-------|----------|
| .ds-metric__value font-size | 84px | 42px (reporting) | +42px (likely @2× miss) | blocker |
| .ds-button--pdf background | #6ce0c7 | #494949 / --ds-color-pdf-action | wrong context | blocker |
| .ds-metric__label font-size | 6px | 6px | 0 (or known open question in spec) | ok / known |
```

**Severity guide:**

| Severity | Meaning |
|----------|---------|
| **blocker** | Scale miss, wrong context palette, invent/modernize — do not ship |
| **known** | Already listed in the spec’s “Deltas & open questions” — cite that row; do not “fix” mid-task unless asked |
| **ok** | Match within documented display value |

---

## Layer map (avoid duplication)

| Need | Use |
|------|-----|
| Pre-code visual analysis | [visual-analysis-protocol.md](../visual-analysis-protocol.md) Passes 0–9 |
| Checkable pre-done numeric gate | **This document** (Pass 10 operationalized) |
| How to produce the look | [visual-grammar.md](../guidelines/visual-grammar.md) |
| Right vs wrong pictures | [anti-examples.md](../guidelines/anti-examples.md) |
| Measured numbers | `knowledge/specs/components/*.spec.md` |
