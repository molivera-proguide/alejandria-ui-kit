# Numeric Specification Layer

## Purpose

This folder is the **numeric specification layer** for Alejandría. It records measured, citable values from implemented CSS and cross-references component docs / PDF pages. It does **not** redesign, tokenize, or resolve discrepancies.

Later milestones (token system, anatomy contracts, visual grammar, validation) consume these facts without re-deriving them.

## Source-of-truth order

1. PDF page cited by the component doc (`knowledge/references/design-reference.pdf`)
2. Stated numbers in `knowledge/components/<Name>.md`
3. Implemented CSS in `packages/ui/src/styles.css`

When sources disagree, both values are recorded as a **delta**. This layer does not pick a winner.

## Scale calibration

The design-reference PDF is a **@2× artboard** (page size 1920×1080 = 2×960×540). Absolute annotations in the PDF (`padding 40px`, value `84pt`/`52pt`, icons `180px`, login input `20pt`, etc.) are @2× coordinates.

**Rule:** `display px = PDF annotation ÷ 2`.

PDF-context component and pattern CSS values in this layer are recorded at **display scale** (after calibration). Shared token *definitions* (`--ds-space-*`, `--ds-radius-*`, `:root`) are unchanged; where a PDF-context selector previously referenced a shared spacing/size token, the selector uses a halved literal (`/* calibrated ÷2 */`) so console/teal components keep the original token values.

Teal/console components (`.ds-button`, `.ds-badge`, `.ds-card`, `.ds-alert`, `.ds-switch`, `.ds-segmented`, `.ds-table`, `.ds-progress`, base `.ds-field`) remain at display scale via `rem` and are out of scope for this rule.

Out of scope for ÷2: `border-width` / hairlines (`0.75px` / `1px`), `border-radius`, `letter-spacing` (`em`), `line-height` (unitless), and any `rem` value.

## Contents

| Path | Role |
|------|------|
| [SCHEMA.md](./SCHEMA.md) | Canonical schema for every `*.spec.md` |
| [tokens-inventory.md](./tokens-inventory.md) | Every literal value in `styles.css`, grouped and counted |
| [components/](./components/) | One numeric spec per `packages/ui/src/index.ts` export |
| [scale-calibration-changelog.md](./scale-calibration-changelog.md) | Before→after table for the @2× → display ÷2 pass |

## Exports covered

`packages/ui/src/index.ts` exports **19** components. Each has a spec:

- [AlertBanner.spec.md](./components/AlertBanner.spec.md)
- [Badge.spec.md](./components/Badge.spec.md)
- [BarChartCard.spec.md](./components/BarChartCard.spec.md)
- [Button.spec.md](./components/Button.spec.md)
- [Card.spec.md](./components/Card.spec.md)
- [ChartCard.spec.md](./components/ChartCard.spec.md)
- [DataTable.spec.md](./components/DataTable.spec.md)
- [DonutChartCard.spec.md](./components/DonutChartCard.spec.md)
- [InvestigationCard.spec.md](./components/InvestigationCard.spec.md)
- [LineChartCard.spec.md](./components/LineChartCard.spec.md)
- [MetricCard.spec.md](./components/MetricCard.spec.md)
- [ModuleCard.spec.md](./components/ModuleCard.spec.md)
- [ProgressRing.spec.md](./components/ProgressRing.spec.md)
- [Scrollbar.spec.md](./components/Scrollbar.spec.md)
- [SegmentedControl.spec.md](./components/SegmentedControl.spec.md)
- [SelectField.spec.md](./components/SelectField.spec.md)
- [Switch.spec.md](./components/Switch.spec.md)
- [TaskCard.spec.md](./components/TaskCard.spec.md)
- [TextField.spec.md](./components/TextField.spec.md)

### Skipped / extra

- **Skipped:** none — every `index.ts` export has a `*.spec.md`.
- **Extra:** none — no specs were created for non-exported modules (e.g. Icons).
- **Note:** `InvestigationCard` is exported and included; it was already documented under `knowledge/components/` but was not listed in the 2026-07-03 manifest `components` array. This specs layer still covers it because `index.ts` is authoritative for exports.

## How to add a new spec

1. Confirm the component is exported from `packages/ui/src/index.ts`.
2. Locate its CSS block(s) in `packages/ui/src/styles.css` and record line ranges.
3. Read `knowledge/components/<Name>.md` for PDF page and stated numbers.
4. Copy the structure from [SCHEMA.md](./SCHEMA.md) into `components/<Name>.spec.md`.
5. Fill tables from **measured CSS first**; cite every value; flag deltas; never invent.
6. Append an entry to the `specs` array in `knowledge/design-system-manifest.json`:
   `{ "id", "name", "path", "source" }`.
7. Re-scan `styles.css` and update [tokens-inventory.md](./tokens-inventory.md) if new literals appeared.

## Language

- Structural docs in this folder: **English**.
- Quotations from Spanish component docs: **preserved verbatim**.

## Non-goals (later milestones)

- Creating or renaming `--ds-*` tokens
- Fixing dual palettes or hardcoded hex
- Anatomy / grammar / do-don't guidance
- Changing React or CSS implementation
