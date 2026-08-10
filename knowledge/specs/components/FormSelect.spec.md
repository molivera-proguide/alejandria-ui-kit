# FormSelect — Numeric Specification

- Status: measured
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-form-field` shared base + `.ds-form-select__*` (styles.css, PDF-context block)
- Export: packages/ui/src/components/FormSelect.tsx
- PDF reference: p.18 § "Para select" — per `knowledge/components/FormSelect.md`
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

Measured 2026-08-07. Post-review PyMuPDF sweep on p.18 (`get_text()` span colors) found and
fixed 1 real delta (selected-option text color) — see Deltas below; base field styles
(shared with `FormTextInput`) had no deltas.

## Dimensions
| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| menu max-height | 160 | px | styles.css | not PDF-measured — scroll container cap |
| option padding | 10px 11px | px | styles.css | not independently PDF-measured |
| option check icon | 10×8 | px | styles.css | measured check-glyph stroke bbox via `get_drawings()` |

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
