# TaskCard — Numeric Specification

- Status: partial
- Source-of-truth order: PDF (page N) > component doc > implemented CSS
- CSS block: `.ds-task` (styles.css — PDF-context block)
- Export: packages/ui/src/components/TaskCard.tsx
- PDF reference: p. 3 (per knowledge/components/TaskCard.md — TARJETAS)
- Scale: display values = PDF annotation ÷ 2 (see [specs/README.md — Scale calibration](../README.md#scale-calibration))

## Dimensions

Corrected 2026-08-04 using exact PDF vector path coordinates (`page.get_drawings()` via PyMuPDF on
`knowledge/references/design-reference.pdf` page index 2 / "p. 3"), not a screenshot estimate. The
screenshot-derived numbers from the first pass that day (chamfer 26px, accent 19px, kanban 159px)
were themselves undercalibrated — see Deltas below. The **÷2 scale-calibration rule in
[specs/README.md](../README.md#scale-calibration) still applies**; these are the exact PDF pt
(`@2×`) values divided by 2, not a departure from that rule.

| Property | Value | Unit | Source | Delta vs PDF/doc |
|----------|------:|------|--------|------------------|
| border-width | 0.75 | px | styles.css | hairline — not scaled |
| corner chamfer (default only) | 31 | px | styles.css | changed 2026-08-04 — PDF vector path: chamfer run is 63pt × 62pt @2× ≈ 62.5pt → ÷2 ≈ 31px. First-pass screenshot estimate (26px) undercalibrated. |
| corner accent | 24×24 | px | styles.css | changed 2026-08-04 — PDF vector path: accent triangle bbox 48.0×48.6pt @2× → ÷2 ≈ 24px. First-pass screenshot estimate (19px, before that the original 38÷2) undercalibrated. |
| accent offset | right/top 2 | px | styles.css | changed 2026-08-04 (was right/top -9, clipped flush by `overflow:hidden`) — PDF vector path: accent inset ≈3pt @2× from the card's outer top/right edge → ÷2 ≈ 1.5px, rounded to 2px. Accent floats inside the chamfer, not flush; see Implementation Notes for why it lives on `.ds-task::before` and not `.ds-task--default::before`. |
| default max-width | 170 | px | styles.css | changed 2026-08-04 — PDF vector path: card outline bbox 340pt @2× → ÷2 = 170px. The prior 120px (`display = 240÷2`) was never measured against the actual PDF vector path — it was an invented/assumed 2× multiple. |
| default padding | 7.5px 5px | px | styles.css | display = 15/10 ÷2 — matches the PDF legend text directly (`Padding: 15px top y bottom - 10px left y right`), unaffected by today's correction |
| default gap | 8 | px | styles.css | was `--ds-space-4` → 8px calibrated |
| kanban max-width | 225 | px | styles.css | changed 2026-08-04 — PDF vector path: kanban card rect bbox 450.8pt @2× → ÷2 = 225px. Was 140px (invented) before this session, briefly 159px (screenshot estimate) mid-session. |
| kanban padding | 5 | px | styles.css | display = 10÷2 |
| kanban gap | 2.5 | px | styles.css | display = 5÷2 |
| resumen max-width | 225 | px | styles.css | added 2026-08-04 — PDF vector path: resumen card rect bbox 450.7pt @2× → ÷2 = 225px, same width class as kanban (matches independently, not just assumed) |
| resumen padding | 5 | px | styles.css | added 2026-08-04, mirrors kanban |
| resumen gap | 2.5 | px | styles.css | added 2026-08-04, mirrors kanban |
| details gap | 2.5 | px | styles.css | added 2026-08-04 — `.ds-task__details` internal gap (between `creator`/`startDate`/`endDate`), mirrors `.ds-task__meta`'s own inter-item gap; matches PDF measurement (Dependencia→Inicio and Inicio→Vencimiento are both ~3.35px display apart) |
| details margin-top | 10 | px | styles.css | added 2026-08-04 — on top of `.ds-task--default`'s own 8px grid gap ≈ 18px total, matching the PDF-measured gap between `Causa Corion` (end of `meta`) and `Dependencia` (start of `details`): 36.7pt @2× → ÷2 ≈ 18.35px |
| `style` width/maxWidth | dropped | — | TaskCard.tsx (added 2026-07-28) | a consumer-supplied `style` prop has `width`/`maxWidth` stripped before being applied — closes a real gap where a wide grid column caused an agent to override the kanban cap via inline style instead of fixing the column. See anti-examples §9. |

## Color
| Role | Value | Matching --ds-* token? | Source | Delta |
|------|-------|------------------------|--------|-------|
| background | #2a2927 | --ds-color-pdf-surface-warm | styles.css | doc: «PDF TARJETAS» |
| border | #c1c1c1 | --ds-color-pdf-line | styles.css | — |
| code/status text | #ffffff | --ds-color-white | styles.css | confirmed 2026-08-04 via PDF text-span extraction (`color=0xffffff`) |
| title/description/meta | #8a8b87 | --ds-color-pdf-ink-muted | styles.css | confirmed 2026-08-04 via PDF text-span extraction (`color=0x8a8b87`) |
| tone neutral accent | none (no triangle rendered) | — | styles.css | changed 2026-08-04 — PDF TARJETAS p.3's third/gray example card has the chamfer notch but no drawing for a triangle inside it; `.ds-task--neutral::before` now hides the accent instead of coloring it `#c1c1c1`. The prior gray-triangle behavior was invented, not observed in the PDF. |
| tone success accent | var(--ds-color-green) | --ds-color-green | styles.css | — |
| tone warning accent | var(--ds-color-amber) | --ds-color-amber | styles.css | no PDF example card for `warning`; amber is this design system's own convention carried over from other components, not a TARJETAS-page observation |
| tone danger accent | var(--ds-color-danger) | --ds-color-danger | styles.css | — |

## Typography

Corrected 2026-08-04 using exact PDF text-span extraction (`page.get_text("dict")` via PyMuPDF on
`knowledge/references/design-reference.pdf` page index 2), which returns each span's real font
name, size (pt, already at `@2×` scale per the ÷2 rule), and color straight from the PDF — not an
estimate. Two roles were previously mismatched: `code` was styled smaller/regular instead of
matching `status` (same PDF font/size/weight for both), and `meta` used a mono font instead of
`--ds-font-body` (PDF span font is `Montserrat-Light`, not monospace). `title` and `meta` are the
*same* PDF role ("Párrafo" in the page's own legend) — same font, size, weight, color — and neither
is uppercase in the PDF source text; the prior `text-transform: uppercase` on both was invented.

| Element | Font family | Size | Weight | Letter-spacing | Line-height | Casing | Source |
|---------|-------------|------|--------|----------------|-------------|--------|--------|
| code (default) | var(--ds-font-mono) | 10px | 700 | 0 | 1.45 (`--ds-leading-body`) | uppercase (harmless, no letters in sample data) | PDF span: `SourceCodeVariable-Roman`, 20pt @2×, `#ffffff` — same as status. Was 7px/400/line-height literal `0.2` (an outlier vs every other line-height in the file; squashed the line box and was the main driver of the "card needs to be taller" gap). |
| status (default) | var(--ds-font-mono) | 10px | 700 | 0 | 1.45 (`--ds-leading-body`) | uppercase (PDF source text "EN ESPERA" is itself authored in caps) | PDF span: `SourceCodeVariable-Roman`, 20pt @2×, `#ffffff`. Was 9px, line-height literal `0.2` (same squashed-line-box bug as code). |
| title (default) | var(--ds-font-body) | 9px | 300 | 0 | 1.2 | none | PDF span: `Montserrat-Light`, 18pt @2×, `#8a8b87`. Was 8px with `text-transform: uppercase` (PDF source text "Tareas investigativas" is sentence case, not authored in caps). |
| description | var(--ds-font-body) | 8px | 300 | UNVERIFIED | 1.45 | none | **Not a PDF field** — see Deltas below. Confirmed 2026-08-04 as an intentional API generalization, kept as-is; not planned for removal. |
| meta (default) | var(--ds-font-body) | 9px | 300 | 0 | 1.35 | none | PDF span: `Montserrat-Light`, 18pt @2×, `#8a8b87` — identical to title ("Párrafo" role). Was `--ds-font-mono` 7px/400 with `text-transform: uppercase` (font family, size, weight, and casing were all mismatched). |
| details: creator/startDate/endDate | var(--ds-font-body) | 9px | 300 | 0 | 1.35 (`--ds-leading-relaxed`) | none | added 2026-08-04. PDF spans: `Montserrat-Light`, 18pt @2×, `#8a8b87` — same "Párrafo" role and exact styling as `meta`/`title`. Maps to the PDF's "Creador"/"Fecha" callouts (see Deltas). |
| title (kanban) | var(--ds-font-body) | 9px | (inherit 300) | — | 1.15 | none (inherited from base; no PDF text-span data specific to the kanban example card — not independently verified, just no longer force-cased) | display = 18÷2 |
| code (kanban) | var(--ds-font-mono) | 6.5px | (inherit 700, changed 2026-08-04) | — | 1.25 | uppercase | display = 13÷2 — weight now inherits bold from the corrected base `.ds-task__code`, not independently verified against a kanban-specific PDF span |
| status (kanban) | var(--ds-font-mono) | 8px | — | — | 1.15 | uppercase | display = 16÷2 |
| meta (kanban) | var(--ds-font-body) | 6.5px | (inherit 300) | — | 1.25 | none (inherited) | display = 13÷2 — family now inherits from the corrected base `.ds-task__meta` |
| title (resumen) | var(--ds-font-body) | 9px | (inherit 300) | — | 1.15 | none (inherited) | added 2026-08-04, mirrors kanban |
| code (resumen) | var(--ds-font-mono) | 6.5px | (inherit 700, changed 2026-08-04) | — | 1.25 | uppercase | added 2026-08-04, mirrors kanban |
| status (resumen) | var(--ds-font-mono) | 8px | — | — | 1.15 | uppercase | added 2026-08-04, mirrors kanban |

## Spacing
| Region | Padding | Gap | Margin | Source |
|--------|---------|-----|--------|--------|
| default | 7.5px 5px | 8px | title margin 12px 0 0 0 | styles.css (display scale) |
| kanban | 5px | 2.5px | — | styles.css |
| meta default | — | 2.5px | — | styles.css |
| meta kanban | — | 1px | — | styles.css (hairline-sized gap from 2÷2) |
| details (default only) | — | 2.5px | margin-top 10px | styles.css, added 2026-08-04 |

## Variants / modifiers present in CSS
| Class | Effect | Source | Backed by CSS? (yes/no) |
|-------|--------|--------|-------------------------|
| .ds-task--default | density/layout; corner chamfer via clip-path | styles.css | yes |
| .ds-task--kanban | density/layout; hides ::before | styles.css | yes |
| .ds-task--resumen | density/layout; hides ::before | styles.css | yes (added 2026-08-04) |
| .ds-task--neutral | accent | styles.css | yes |
| .ds-task--success | accent | styles.css | yes |
| .ds-task--warning | accent | styles.css | yes |
| .ds-task--danger | accent | styles.css | yes |
| selected state | PDF #060606 | knowledge/components/TaskCard.md | no |

## Deltas & open questions (facts only — DO NOT resolve)
- Doc Variants historically cited pre-calibration @2× numbers (gap 12px / kanban 300px / etc.); CSS now at display scale — compare docs after documentation pass.
- PDF selected state `#060606` not implemented (knowledge/components/TaskCard.md Known Limitations).
- 2026-08-04, first pass: chamfer/accent/kanban-width were pixel-measured off a *screenshot* of the PDF page (26px chamfer, 19px accent, 159px kanban). That pass also shipped a real bug: putting the chamfer's `clip-path` directly on `.ds-task--default` clipped away `::before` too (clip-path clips an element's whole subtree, pseudo-elements included), so the accent never rendered. 2026-08-04, second pass same day: re-derived chamfer/accent/default-width/kanban-width/resumen-width directly from the PDF's vector path coordinates (PyMuPDF `get_drawings()`, exact pt values, no screenshot/zoom guessing) and fixed the clip-path bug by moving the card's background/border/chamfer to `.ds-task--default::after` (a separate, negatively-z-indexed layer) so `.ds-task::before` (the accent) is never inside the clipped subtree. The vector-derived numbers superseded the screenshot ones in the table above.
- The accent triangle's three corners are slightly rounded in the PDF vector path (~2.2pt @2× radius ≈ 1.1px display) — not reproduced (`clip-path: polygon()` can't express corner rounding without a more complex shape). Judged negligible at this size; flagged here as a known, intentional gap rather than an oversight.
- **`description` is not a field in the PDF card — resolved as a decision, not a defect.** Extracting card1's actual text spans (PyMuPDF, 2026-08-04) shows the content directly under the title/status block goes straight to `Subactividad` — there is no paragraph between them. The text originally used as `description` in `TaskCard.stories.tsx` was a page-level design caption sitting elsewhere on the TARJETAS page, not card body copy — this has been corrected in the stories (moved to a dedicated `WithDescription` story with different, plausible copy). The user explicitly confirmed 2026-08-04 that `description` stays in the API as an intentional generalization beyond the literal PDF example.
- **RESOLVED 2026-08-04: the PDF's meta block's extra gap is now reproduced**, via the new `creator`/`startDate`/`endDate` props and `.ds-task__details` block (see Dimensions/Spacing/Typography above) rather than via grouping within `meta` itself. Evidence for the split: real line y-positions in card1 — `Subactividad`→`Causa Corion` and `Inicio`→`Vencimiento` are each ~6.7pt @2× apart, but `Causa Corion`→`Dependencia` is ~36.7pt @2× apart (≈5.5× bigger). Cross-checked against the page's own annotation leader-lines (`page.get_drawings()`, the plain fill=None line paths): a leader line at y≈407.6 (label "Creador", y-range 393.7–414.9) lands inside the `Dependencia` text span's y-range (392.2–415.5), and a leader line at y≈437.6 (label "Fecha", y-range 423.7–444.9) lands inside the `Inicio 21/04/2022` span's y-range (422.2–445.5) — i.e. the PDF's own annotations independently confirm `Dependencia`/`Inicio`/`Vencimiento` are a distinct semantic group ("Creador"/"Fecha"), not a continuation of the plain `meta` list. `meta[]` itself is unchanged (still a flat array, still used for `Subactividad`/`Causa Corion` or arbitrary consumer tags — see `apps/web/src/App.tsx`'s unrelated freeform usage, which does not fit this 5-field model and was not forced into it).
- Kanban/resumen typography rows above are **not independently verified** against PDF text-spans specific to those example cards (only the default/full card's spans were extracted) — the "inherited" values just stopped being force-uppercased or picked up the corrected base weight/family as a side effect of the base fix, they were not each individually measured.
- `startDate`/`endDate` render whatever string the consumer passes verbatim (no automatic "Inicio "/"Vencimiento " label injection) — the PDF example happens to bake the label into the text itself (`"Inicio 21/04/2022"`), and the component follows that same convention rather than adding label-prefixing logic.
