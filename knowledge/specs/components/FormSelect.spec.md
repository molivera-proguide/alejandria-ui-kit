# FormSelect — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-field` shared base + `.ds-form-select__*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormSelect.tsx
- PDF reference: p.18 § "Para select" — per `knowledge/components/FormSelect.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07. Post-review PyMuPDF sweep on p.18 (`get_text()` span colors) found and
fixed 1 real delta (selected-option text color) — see Deltas below; base field styles
(shared with `FormTextInput`) had no deltas **(that pass only checked color, not geometry —
see 2026-08-10 below and `FormTextInput.spec.md`, which this component inherits every base
`.ds-form-field__control`/`__label` fix from — control height, label inset, active-label
position, divisor).**

**2026-08-10 — geometry-only re-pass, own (non-shared) elements:**

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| menu max-height | 160 | px | styles.css | not PDF-measured — scroll container cap |
| option padding | 10px 5px | px | styles.css | horizontal calibrated ÷2 — same ~4.5px inset as the shared `.ds-form-field__control` (ver `FormTextInput.spec.md`), era `11px` |
| option check icon | 7×5 | px | styles.css | calibrated ÷2 — 2 paths superpuestos junto a "Admin" en p.18, bbox ~13.76×10.03pt @2× ≈ 6.9×5px. Era `10×8px`, medido contra la página equivocada (nunca se había vuelto a medir específicamente en esta página). |
| chevron | 8×4.67 (border-trick: `border-left/right: 4px`, `border-top: 5px`) | px | styles.css (`.ds-form-field__chevron`, shared) | calibrated ÷2 — 3 instancias medidas (2 triggers de p.18/p.21 + 1 dropdown), todas 14.95×9.56pt @2× ≈ 7.5×4.8px. Era ~10×6px sin medir. |
| chevron inset (right) | 6 | px | styles.css | calibrated ÷2 — inset borde-a-chevron ~11.58pt @2× ≈ 5.79px. Era `11px` sin medir. |
| menu offset (top) | 0 (`top: 100%`) | px | styles.css | calibrated — el panel de FormDatePicker (misma familia de dropdown) mide un gap de ~0.14pt @2× entre trigger y panel en p.21, es decir contiguos. Era `calc(100% + 2px)` sin medir. |
| menu offset (left/right) | 0 | px | styles.css | calibrated — panel y trigger comparten exactamente el mismo x0/x1 en p.21. Era `-1px`/`-1px` sin medir. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| menu background | #060606 | `--ds-color-pdf-surface` | styles.css | confirmed |
| menu border (open) | #ffffff | `--ds-color-white` | styles.css | confirmed — "el desplegable se superpone al input cuando está activo" |
| option text | #ffffff | `--ds-color-white` | styles.css | **corrected 2026-08-07** — first pass dimmed the selected option's text to `--ds-color-pdf-form-muted` (`#8d8d8d`); `get_text()` on p.18 shows "Admin"/"Editor"/"General" all as literal `#ffffff`, selected or not — no dimming in the PDF. |
| option check glyph | #8a8b87 | `--ds-color-pdf-ink-muted` | styles.css | added 2026-08-07 — `get_drawings()` shows the real selection differentiator is a stroke-only check-glyph path next to the selected row, not a text-color change. |

## Typography
| Element | Font family | Size | Weight | Source |
|---------|-------------|------|--------|--------|
| option label | var(--ds-font-body) | 8px | 400 (regular) | Same value family as `FormTextInput`'s value text (PDF 16pt @2× ÷2) — options render the same text style as a filled field value. |

Trigger/label typography is identical to `FormTextInput`'s `default` variant (shared
`.ds-form-field` base) — see `FormTextInput.spec.md`.

## Spacing
| Region | Padding | Gap | Source |
|--------|---------|-----|--------|
| option | 10px 11px | — | styles.css |
| menu | 0 | — | styles.css (scroll handled by `.ds-scroll-area--y`) |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| `.ds-form-select__option--selected` | No visual effect on its own today — selection is marked by the sibling checkmark SVG, not this class's own styling | styles.css | yes (class present, no dedicated rule) |
| `.ds-form-select__option:disabled` | `opacity: 0.5`, `cursor: not-allowed` | styles.css | yes |

## Deltas & open questions (facts only — DO NOT resolve)
- Arrow-key navigation inside the open listbox is not implemented (only `Enter`/`Space`/
  `ArrowDown` on the trigger open it) — flagged in `specs/001-form-modal/checklist.md`
  (CHK004), not yet resolved either way.
- Auto-centering on open (`scrollIntoView({ block: "center" })`) is implemented but its
  exact PDF-measured scroll offset was not independently re-verified beyond the qualitative
  "se centra en esa opción" wording — no numeric PDF value exists to compare against.
- **The open-menu's own separate illustration on p.18 sits ~9.5px below the closed-trigger
  illustration** (two distinct static mockups stacked for documentation, same pattern as the
  input's own static/active example pairs) — NOT used as evidence for the menu's real offset.
  The cleaner, unambiguous 0-gap/0-offset measurement came from FormDatePicker's p.21 (trigger
  and panel drawn as one seamless box), which this component's dropdown shares the same
  "flyout panel" convention with. Left the interaction interpretation from the 2026-08-07 pass
  untouched (`"el desplegable se superpone al input"` → panel appended directly below/flush
  with the trigger, not literally covering it from the same top) — only the numeric offset was
  wrong, not that interpretation.
