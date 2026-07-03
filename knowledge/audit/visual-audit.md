# Alejandria UI Kit — Visual Audit

**Audit date:** 2026-07-03  
**Reference PDF:** `Alejandria - UI Toolkit (1).pdf`  
**Implementation sources:** `packages/ui/src/styles.css`, `packages/ui/src/components/*.tsx`, `packages/ui/src/**/*.stories.tsx`, `packages/ui/.storybook/preview.css`  
**Method:** Compare PDF typography, spacing, color, radius, shadow, border, state, icon, sizing, and hierarchy specs against CSS and component code rendered in Storybook. Only discrepancies verifiable from source code are listed.

**Fidelity scale**

| Rating | Meaning |
|--------|---------|
| **High** | Core visual tokens (color, type scale, spacing, borders) align with PDF for the matched spec section |
| **Medium** | Partial alignment — some PDF values match, others diverge materially |
| **Low** | Major divergence from PDF spec, no PDF spec, or implementation uses a different visual language |

---

## Global Storybook environment

These affect all Storybook stories and are verifiable from `preview.css` and story decorators.

| Aspect | PDF | Storybook implementation | Discrepancy |
|--------|-----|--------------------------|-------------|
| Canvas background | Dark surfaces (`#060606`, `#2a2927`, black at 70%) | `body.sb-show-main` uses `--ds-color-paper` (`#eef4f3`) with light grid | Light preview canvas vs dark PDF UI |
| Body text color | `#FFFFFF` on dark | `body.sb-show-main { color: #11191c }` | Dark text on light canvas |
| Component surfaces | Opaque dark grays | Many components use `--ds-color-surface` (`#101315`), glass gradients, teal accents | Palette shift from PDF gray scale to teal-forward tokens |
| Font loading | Source Code + Montserrat families | Google Fonts: Montserrat 300/400/500/700, Source Code Pro 400/600/700 | No Montserrat Extralight (200); no Source Code Light weight for login-style 20pt fields |
| Shadows | Not specified in PDF | `--ds-shadow-sm`, `--ds-shadow-md` on Card, TaskCard, MetricCard, AlertBanner, DataTable | Shadows present in code; absent from PDF |

**Impact:** Even when individual tokens match PDF inside a component (e.g. ModuleCard `#060606`), Storybook renders them on a light page background, changing perceived contrast and hierarchy versus the PDF.

---

## Component visual fidelity summary

| Storybook entry | PDF section | Visual Fidelity |
|-----------------|-------------|:---------------:|
| `Alejandria/ModuleCard` | MÓDULOS (p. 4) | **High** |
| `Alejandria/ChartCard` | GRÁFICOS container (p. 7–8) | **Medium** |
| `Alejandria/ChartCard` → DonutChart | GRÁFICOS torta (p. 7–8) | **Medium** |
| `Alejandria/SelectField` | Filtros / Login inputs (p. 3, 5) | **Low** |
| `Alejandria/TextField` | Login inputs (p. 5) | **Low** |
| `Alejandria/SegmentedControl` | Filtros (p. 3) | **Low** |
| `Alejandria/TaskCard` | TARJETAS (p. 1) | **Low** |
| `Alejandria/MetricCard` | MÉTRICAS (p. 9) | **High** |
| `Alejandria/BarChartCard` (via ChartCard) | GRÁFICOS barras (p. 7–8) | **Low** |
| `Alejandria/LineChartCard` (via ChartCard) | GRÁFICOS líneas (p. 8) | **Low** |
| `Alejandria/Button` | Inline button specs (p. 1–3, 5) | **Low** |
| `Alejandria/Card` | FICHAS widgets (p. 3) | **Low** |
| `Alejandria/Badge Chip` | Estado / misc (p. 1, 12) | **Low** |
| `Alejandria/AlertBanner` | MISCELÁNEAS alertas (p. 12) | **Low** |
| `Alejandria/ProgressRing` | GRÁFICOS torta (p. 7–8) | **Low** |
| `Alejandria/Icons` | ICONOS (p. 6) | **Medium** |
| `Alejandria/DataTable` | — | **Low** |
| `Alejandria/Switch` | — | **Low** |
| `Alejandria/Overview` | Reporting / FICHAS composite (p. 3, 7–9) | **Low** |

---

## Per-component audit

### ModuleCard — `Alejandria/ModuleCard`

**PDF reference:** MÓDULOS (p. 4)  
**Visual Fidelity: High**  
**Last refined:** 2026-07-03

| Dimension | PDF spec | Implementation (`styles.css` + stories) | Match |
|-----------|----------|-------------------------------------------|:-----:|
| **Colors — background** | `#060606` | `#060606` on `.ds-module-card` | Yes |
| **Colors — border** | `0,75pt` `#c1c1c1` | `0.75px solid #c1c1c1` | Yes |
| **Colors — title** | `#c1c1c1` | `#c1c1c1` on `.ds-module-card__title` | Yes |
| **Colors — metric label** | `#8a8b87` | `#8a8b87` on `.ds-module-card__metric-label` | Yes |
| **Colors — metric value** | `#FFFFFF` | `#ffffff` on `.ds-module-card__metric-value` | Yes |
| **Colors — separator** | `0,75pt` `#8a8b87` | `0.75px solid #8a8b87` on `.ds-module-card__divider` | Yes |
| **Spacing — padding** | `50px 20px 25px 20px` | `50px 20px 25px 20px` | Yes |
| **Typography — title** | Source Code Regular 24pt, uppercase | Source Code Pro (`--ds-font-mono`) `24px`, weight 400, uppercase | Yes |
| **Typography — metrics** | Montserrat Light/Bold 16pt | Label Montserrat 300 `16px`; value Montserrat 700 `16px` | Yes |
| **Borders — radius** | Not specified | `var(--ds-radius-xs)` = `2px` | Unknown |
| **Shadows** | Not specified | Hover: `0 16px 42px rgb(0 0 0 / 0.22)` | Extra |
| **States — hover** | Not specified | Border → `#ffffff`, `translateY(-2px)` (PDF palette, no teal) | Extra |
| **States — focus** | Not specified | Focus ring `rgb(193 193 193 / 0.35)` (PDF `#c1c1c1`) | Extra |
| **Icons — size** | 180×180, color `#c1c1c1` | `180×180px`; SVG assets use `#c1c1c1` fill | Yes |
| **Sizing — min dimensions** | Not specified | `min-height: 260px`, `min-width: 260px` | N/A |
| **Hierarchy** | Icon → title → separator → metrics | Same DOM order | Yes |
| **Storybook canvas** | Dark UI | Background `#060606` | Yes |

**Remaining differences**

1. Hover lift/shadow and focus ring are interaction affordances not drawn in the PDF (palette-aligned, no teal).
2. `border-radius: 2px` and internal `gap: 20px` are unspecified in the PDF and preserved.
3. Title `letter-spacing: 0.1em` is preserved; PDF does not state inter-letter spacing for module titles.
4. `min-width` / `min-height: 260px` are implementation constraints, not PDF specs.

---

### ChartCard — `Alejandria/ChartCard` (Base)

**PDF reference:** GRÁFICOS container (p. 7 reporting)  
**Visual Fidelity: Medium**

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Colors — background** | `#060606` at 20% opacity (reporting) | `rgb(6 6 6 / 0.2)` on `.ds-chart-card` | Yes |
| **Colors — border** | `0,75pt` `#e6e6e6` (p. 7) / `#c1c1c1` (p. 8 reporting) | `1px solid rgb(193 193 193 / 0.6)` | Partial |
| **Spacing — padding** | `10px` | `10px` on `.ds-chart-card` | Yes |
| **Typography — title** | Montserrat Extralight 16pt `#8a8b87` (p. 7) or Source Code Bold 16pt (p. 8) | Source Code Pro `0.9rem` (~14.4px) weight 700 `#8a8b87`, `letter-spacing: 0.25em` | Partial |
| **Typography — footer** | Montserrat Extralight 16pt `#FFFFFF` (refs in charts) | Montserrat `0.9rem` weight 300 `#ffffff` | Partial |
| **Border radius** | Not specified | `2px` (`--ds-radius-xs`) | N/A |
| **Shadows** | Not specified | None on `.ds-chart-card` | Yes |
| **Hierarchy** | Title → chart → reference | Title → body slot → footer | Yes |

**Discrepancies**

1. Border color uses `#c1c1c1` at 60% opacity, not PDF `#e6e6e6` from ficha/reporting chart page 7.
2. Title font: implementation uses bold Source Code at ~14.4px; PDF specifies 16pt Extralight Montserrat (p. 7) or 16pt Bold Source Code with interlettering 410 (p. 8).
3. Title letter-spacing `0.25em` is much wider than PDF "Inteletrado 410" on other chart titles.
4. No distinct "ficha" variant (transparent background per PDF p. 7).

---

### BarChartCard — `Alejandria/ChartCard` → BarChart / Gallery

**PDF reference:** GRÁFICOS barras (p. 7 horizontal 5pt; p. 8 vertical 15px)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation (`BarChartCard.tsx` + CSS) | Match |
|-----------|----------|-------------------------------------------|:-----:|
| **Chart orientation** | Horizontal linear bars (p. 7) and traditional vertical bars 15px wide (p. 8) | Vertical bars only, width computed dynamically | **No** |
| **Bar width** | 5pt (~6.7px) horizontal; 15px vertical | Dynamic `barWidth` from 280px viewBox | **No** |
| **Bar colors** | `#FFFFFF`, `#ff0404` (p. 7); `#c1c1c1`, `#8a8b87`, `#060606` (p. 8) | Default palette: `--ds-color-teal`, blue, green, amber, coral | **No** |
| **Grid** | `0,25pt` `#8a8b87` (p. 8) | No grid lines in `BarChartCard` | **No** |
| **Typography — labels** | Montserrat Extralight 16pt (refs) | SVG `font-size: 8px`, Source Code Pro, `#8a8b87` | **No** |
| **Border radius on bars** | Not specified | `rx={2}` on `<rect>` | Extra |
| **Sizing — chart** | Not specified | `viewBox="0 0 280 120"` | N/A |

**Discrepancies**

1. Implementation renders vertical bars; PDF primary reporting example uses horizontal 5pt bars (p. 7).
2. Default bar colors use teal/blue/green token palette, not PDF white/red/gray scale.
3. No chart grid (`0.25pt #8a8b87`) as specified for traditional bars (p. 8).
4. Axis labels at 8px SVG text vs PDF 16pt reference typography.
5. Gallery story does not override colors to PDF values (unlike DonutChart story).

---

### DonutChartCard — `Alejandria/ChartCard` → DonutChart / Gallery

**PDF reference:** GRÁFICOS torta (p. 7–8)  
**Visual Fidelity: Medium** (when story uses `#ffffff` / `#8a8b87`; **Low** with default token palette)

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Segment stroke width** | 15pt (p. 7) / 25pt (p. 8 reporting) | `STROKE = 14` px in `DonutChartCard.tsx` | Partial |
| **Segment colors** | `#e3a500`, `#ff0404`, `#28a500` (p. 7) / `#FFFFFF`, `#8a8b87` (p. 8) | DonutChart story: `#ffffff`, `#8a8b87`; default: teal/blue/green tokens | Partial |
| **Track / axis** | Eje 7pt `#e6e6e6` (p. 7) / 25pt `#494949` (p. 8) | Track stroke `#8a8b87` at 25% opacity, stroke width 14 | **No** |
| **Typography — stat primary** | Montserrat Bold 18pt (p. 7) / 32pt (p. 8) | `1.75rem` (~28px) bold body | Partial |
| **Typography — stat label** | Montserrat Extralight 14–16pt | `0.75rem` (~12px) weight 300 | **No** |
| **Typography — chart title** | Via ChartCard (see above) | Inherited from `.ds-chart-card__title` | Partial |
| **Sizing — donut** | Not fixed in PDF | SVG `120×120`, positioned with `left: 90px` | N/A |
| **Hierarchy** | Title → donut + stats | ChartCard title → donut layout → footer | Yes |

**Discrepancies**

1. Ring stroke 14px vs PDF 15pt (p. 7) or 25pt (p. 8).
2. Default color palette (teal, blue, green…) does not match PDF semantic colors (`#e3a500`, `#ff0404`, `#28a500`).
3. Donut track uses `#8a8b87` at 25% opacity, not PDF eje `#e6e6e6` 7pt or `#494949` 25pt.
4. Stat label size ~12px vs PDF 14–16pt Extralight.
5. BarChart/LineChart in Gallery still use token palette; only DonutChart story aligns partially with PDF grays.

---

### LineChartCard — `Alejandria/ChartCard` → LineChart / Gallery

**PDF reference:** GRÁFICOS líneas (p. 8)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Line stroke** | `0,75pt` `#c1c1c1` | `stroke-width: 2` default color `var(--ds-color-teal)` | **No** |
| **Grid** | `0,25pt` `#8a8b87` | `stroke: rgb(255 255 255 / 0.08)`, `stroke-width: 1` | **No** |
| **Typography — numbers** | Montserrat Extralight 10pt `#FFFFFF` / `#ff0404` | No y-axis number labels in SVG | **No** |
| **Typography — axis labels** | Montserrat Extralight 16pt `#8a8b87` | SVG labels `8px` Source Code `#8a8b87` | **No** |
| **Area fill** | Not specified | Area under line at 18% opacity of stroke color | Extra |
| **Point markers** | Not specified | `r={3}` circles at each data point | Extra |
| **Title** | Source Code Bold 16pt `#8a8b87`, interlettering 410 | Via ChartCard ~14.4px bold | Partial |

**Discrepancies**

1. Line color teal (`#6ce0c7`) vs PDF `#c1c1c1`.
2. Line weight 2px vs PDF 0.75pt (~1px).
3. Grid lines white at 8% opacity vs PDF `#8a8b87` at 0.25pt.
4. No numeric axis labels per PDF.
5. Filled area and point dots not in PDF line chart spec.

---

### MetricCard — `Alejandria/MetricCard`

**PDF reference:** MÉTRICAS (p. 9)  
**Visual Fidelity: High**  
**Last refined:** 2026-07-03

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Colors — background** | `#060606` 20% opacity (reporting) | `rgb(6 6 6 / 0.2)` on `.ds-metric` | Yes |
| **Colors — border** | `0,75pt` `#e6e6e6` | `0.75px solid #e6e6e6` | Yes |
| **Spacing — padding** | `10px` | `10px` | Yes |
| **Typography — label (reporting)** | Source Code Bold 16pt `#8a8b87`, uppercase, interlettering 410 | Mono `16px` weight 700 `#8a8b87`, `letter-spacing: 0.41em` | Yes |
| **Typography — value (reporting)** | Montserrat Bold 84pt `#FFFFFF` / `#ff0404` | Body `84px` weight 700; `#ffffff` / `#ff0404` when `critical` | Yes |
| **Typography — reference** | Montserrat Extralight 16pt `#FFFFFF` | `.ds-metric__change`: `16px` weight 200 `#ffffff` | Yes |
| **Typography — ficha variant** | Montserrat Extralight 16pt label; Bold 52pt value | Not implemented (no API variant) | **No** |
| **Border radius** | Not specified | `2px` | N/A |
| **Shadows** | Not specified | None | Yes |
| **States — tone** | `#ff0404` for highlighted numbers | `.ds-metric--critical .ds-metric__value { color: #ff0404 }` | Yes |
| **Sizing** | Not specified | `min-height: 132px` | N/A |
| **Hierarchy** | Title → large number → reference | Label → value → change | Yes |
| **Storybook canvas** | Dark UI | Background `#060606` | Yes |

**Remaining differences**

1. Ficha typography variant (52pt value) is not in the public API — reporting only.
2. `good` / `watch` tones have no PDF color; values stay white.
3. `border-radius: 2px`, internal `gap: 11px`, and `min-height: 132px` are unspecified in the PDF and preserved.
4. Wide label tracking can overflow narrow grid columns.

---

### TaskCard — `Alejandria/TaskCard`

**PDF reference:** TARJETAS (p. 1)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Colors — background normal** | `#2a2927` | `--ds-color-surface` `#101315` + white gradient overlay | **No** |
| **Colors — background selected** | `#060606` | No selected state in code | **No** |
| **Colors — border** | `0,75pt` `#c1c1c1` | `1px solid var(--ds-color-line)` teal-tinted rgba | **No** |
| **Spacing — padding** | `15px` TB, `10px` LR | `16px` all sides | Partial |
| **Typography — title** | Source Code Bold 20pt `#FFFFFF` | Display `1.12rem` (~17.9px) weight 700 | **No** |
| **Typography — status** | Source Code Bold 20pt `#FFFFFF` uppercase | Mono `0.68rem` (~10.9px), color `--task-accent` | **No** |
| **Typography — paragraph** | Montserrat Light 18pt `#8a8b87` | Body `0.9rem` (~14.4px) `--ds-color-ink-soft` `#a9b3b0` | **No** |
| **Border radius** | Not specified | `2px` | N/A |
| **Shadows** | Not specified | `var(--ds-shadow-sm)` | Extra |
| **States — selected/active** | `#060606` background on active | Not implemented | **No** |
| **States — tone** | Estado indicator color change | Corner triangle accent via `::before` | Different |
| **Icons** | Not on minimal task card | Not present | N/A |
| **Sizing** | Not specified | `min-height: 170px` | N/A |
| **Hierarchy** | Tipo, código, estado, resumen | Code, status, title, description, meta, progress | Different |
| **Extra UI** | PDF minimal card has no progress bar | 4px progress track + label always shown | Extra |

**Discrepancies**

1. Background `#101315` ≠ PDF `#2a2927`.
2. No selected-state styling (`#060606`).
3. Border not `#c1c1c1`.
4. Title ~17.9px vs PDF 20pt (~26.7px).
5. Status ~10.9px vs PDF 20pt — less than half PDF size.
6. Description color `#a9b3b0` vs PDF `#8a8b87`; size 14.4px vs 18pt.
7. Estado shown as corner accent triangle, not PDF inline uppercase status treatment.
8. Progress bar and `% avance` label not in PDF TARJETAS minimal spec.
9. Card includes `box-shadow` not in PDF.

---

### Button — `Alejandria/Button`

**PDF reference:** Inline specs (p. 1 task card, p. 2 investigation card, p. 3 ficha, p. 5 login)  
**Visual Fidelity: Low**

| Dimension | PDF spec (task/ficha) | Implementation `.ds-button` | Match |
|-----------|----------------------|----------------------------|:-----:|
| **Colors — primary fill** | `#494949` (task, login); ficha also `#c1c1c1`, `#8a8b87` | Teal gradient `#82f3d8` → `#1b8f7d` | **No** |
| **Colors — text** | `#FFFFFF` | Primary: `#04110f` (dark on teal) | **No** |
| **Typography** | Montserrat Bold 13pt (task/ficha); 11pt (p. 2); 18pt (login) | `0.88rem` (~14.1px) md, weight 700, uppercase | Partial |
| **Spacing — padding** | `5px 25px` (task/ficha); `5px 20px` (p. 2); `10px 120px` (login) | md: `0 15px`, `min-height: 40px` | **No** |
| **Border** | Not specified | `1px solid` transparent or colored per variant | N/A |
| **Border radius** | Not specified | `2px` | N/A |
| **Shadows** | Not specified | Primary/danger: glow `box-shadow` teal/red | Extra |
| **States — hover** | Not specified | `translateY(-1px)`, brighter gradient | Extra |
| **States — focus** | Not specified | Teal `--ds-focus-ring` | Extra |
| **States — loading** | Not specified | Spinner, `opacity` on disabled | Extra |
| **Icons** | Not in PDF button spec | `lucide-react` 17×17 in stories | Extra |
| **Variants** | Gray fills only | primary, secondary, ghost, danger with teal/red | **No** |

**Discrepancies**

1. Primary button uses teal gradient, not PDF `#494949` solid gray.
2. Primary text is dark `#04110f`, not white.
3. Padding and height exceed PDF compact `5px 25px` buttons.
4. Secondary/ghost/danger variants have no PDF equivalents.
5. Hover lift and glow shadows not in PDF.
6. Stories use `lucide-react` icons (Crosshair, Filter, Save), not Alejandria SVG set.

---

### TextField — `Alejandria/TextField`

**PDF reference:** Login inputs (p. 5)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation `.ds-field` | Match |
|-----------|----------|------------------------------|:-----:|
| **Colors — input background** | `#2a2927` | Control: `rgb(0 0 0 / 0.34)` | **No** |
| **Colors — border** | `0,75pt` `#c1c1c1` (login card) | `var(--ds-color-line)` teal-tinted | **No** |
| **Typography — input** | Source Code Light 20pt | Mono `0.84rem` (~13.4px) weight inherited | **No** |
| **Spacing — input padding** | `10px` | `0 11px`, `min-height: 38px` | Partial |
| **Typography — label** | USUARIO / CONTRASEÑA uppercase | Mono `0.7rem` uppercase `--ds-color-ink-soft` | Partial |
| **Border radius** | Not specified | `4px` (`--ds-radius-sm`) | N/A |
| **States — focus** | Not specified | Teal border + `--ds-focus-ring` | Extra |
| **States — invalid** | Not specified | Red border `--ds-color-danger` | Extra |
| **Icons** | Not in login spec | Stories use `lucide-react` Search 17×17 | Extra |

**Discrepancies**

1. Input background not `#2a2927`.
2. Font ~13.4px vs PDF 20pt; weight not Light.
3. Focus ring uses teal, not in PDF login spec.
4. Story icon from lucide-react, not PDF menu icon set.

---

### SelectField — `Alejandria/SelectField`

**PDF reference:** Filtros (p. 3) — partial  
**Visual Fidelity: Low**

Shares `.ds-field` styles with TextField. PDF filtros spec: border `0,75pt #e6e6e6`, label Montserrat Extralight 24pt uppercase `#8a8b87`.

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Filter label typography** | Montserrat Extralight 24pt `#8a8b87` | Mono `0.7rem` (~11.2px) | **No** |
| **Border** | `#e6e6e6` | `var(--ds-color-line)` | **No** |
| **Control background** | Not specified for filtros | Same as TextField | N/A |
| **States** | Not specified | Focus teal ring, invalid red | Extra |

**Discrepancies**

1. Label ~11.2px mono vs PDF 24pt Extralight Montserrat.
2. No PDF-style filter panel chrome — single dropdown only.
3. CompactFilters story uses 2-column grid not in PDF.

---

### Card — `Alejandria/Card`

**PDF reference:** FICHAS widgets (p. 3)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation `.ds-card` | Match |
|-----------|----------|----------------------------|:-----:|
| **Colors — background** | Widget on `#2a2927` ficha; description area `#060606` | Glass gradient + `--ds-color-surface-glass` | **No** |
| **Colors — border** | Widgets `0,75pt` `#e6e6e6` | `var(--ds-color-line)` + teal top highlight `::before` | **No** |
| **Typography — widget title** | Montserrat Extralight 16pt `#8a8b87` | Eyebrow: teal mono `0.66rem`; title: display `1.35rem` bold uppercase | **No** |
| **Typography — description** | Montserrat Light 18pt `#FFFFFF` (ficha body) | Body `0.95rem` `--ds-color-ink-soft` | **No** |
| **Spacing — padding** | Ficha `40px`; widget `10px` in charts | Header/body `16px`; footer `12px 16px` | **No** |
| **Border radius** | Not specified | `2px` | N/A |
| **Shadows** | Not specified | `--ds-shadow-sm` | Extra |
| **Icons** | Not specified on widget shell | Stories: `lucide-react` Eye, Crosshair 18×18 | Extra |
| **Hierarchy** | Widget title → metric content | Eyebrow → title → description → body → footer | Different |

**Discrepancies**

1. Teal eyebrow accent and top gradient line not in PDF widgets.
2. Title uses large bold Source Code (~21.6px), not Extralight 16pt Montserrat.
3. Description color muted `#a9b3b0`, not white 18pt Light.
4. WithActionsAndFooter story embeds ProgressRing + inline stats — layout differs from PDF widget grid.
5. Footer uses Badge + Button with teal-era styling, not PDF ficha action buttons (`#c1c1c1` / `#8a8b87` / `#494949`).

---

### Badge — `Alejandria/Badge Chip`

**PDF reference:** Estado on task cards (p. 1); alertas text (p. 12) — no standalone chip spec  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation `.ds-badge` | Match |
|-----------|----------|---------------------------|:-----:|
| **Component type** | Inline uppercase status text 20pt on card | Separate chip with border, background, optional dot | Different |
| **Typography** | Source Code Bold 20pt `#FFFFFF` (estado) | Mono `0.68rem` (~10.9px) weight 700 | **No** |
| **Colors** | White on dark card | Per-tone soft backgrounds (blue, green, amber, danger tokens) | **No** |
| **Border** | Not specified as chip | `1px solid` per tone | Extra |
| **Border radius** | Not specified | `2px` | N/A |
| **States** | Not specified | Dot with `box-shadow: 0 0 12px` | Extra |
| **Sizing** | Inline text | `min-height: 24px`, `padding: 0 8px` | N/A |

**Discrepancies**

1. PDF shows status as card typography, not a bordered chip component.
2. Text ~10.9px vs PDF 20pt estado.
3. Semantic tones use teal-era palette (blue, green, coral), not PDF white uppercase on dark.
4. Glow dot on badges not in PDF.

---

### AlertBanner — `Alejandria/AlertBanner`

**PDF reference:** MISCELÁNEAS alertas (p. 12) — visual example only, minimal numeric spec  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation `.ds-alert` | Match |
|-----------|----------|-----------------------------|:-----:|
| **Layout** | Full-width banner text "ALERTAS NUEVAS" + incident line | 3-column grid: icon, content, action | Different |
| **Typography** | Uppercase incident type line | Title: display `1.05rem` uppercase; description `0.92rem` | Partial |
| **Colors** | Not fully specified | Glass surface, left accent border 4px per tone | N/A |
| **Border** | Not specified | `1px` + `4px` left accent | Extra |
| **Border radius** | Not specified | `6px` (`--ds-radius-md`) | N/A |
| **Shadows** | Not specified | `--ds-shadow-sm` | Extra |
| **Icons** | Not specified | `lucide-react` 18×18 in icon box 34×34 | Extra |
| **States — tones** | Not specified | info, success, warning, danger with token colors | Extra |

**Discrepancies**

1. PDF shows a simple horizontal alert strip; implementation is a rich alert panel with icon slot and action area.
2. Stories use lucide-react (Info, AlertTriangle, etc.), not Alejandria icons.
3. Teal-era tone colors and glass styling not evidenced in PDF screenshot text.
4. WithAction pairs with teal-gradient danger Button, not PDF gray buttons.

---

### ProgressRing — `Alejandria/ProgressRing`

**PDF reference:** GRÁFICOS torta (p. 7–8) — different purpose (chart vs progress indicator)  
**Visual Fidelity: Low**

| Dimension | PDF spec (torta) | Implementation `.ds-progress` | Match |
|-----------|------------------|------------------------------|:-----:|
| **Purpose** | Data donut chart with segments | Single-value progress ring | Different |
| **Segment colors** | `#e3a500`, `#ff0404`, `#28a500` / `#FFFFFF`, `#8a8b87` | `--progress-accent` from tone tokens (blue, green, amber, danger) | **No** |
| **Stroke / ring** | 15pt / 25pt segment thickness | Conic gradient fill; border `1px var(--ds-color-line)` | Different |
| **Typography — center** | Montserrat Bold 18pt / 32pt | Display `1.72rem` md accent-colored | Partial |
| **Sizing** | Chart-sized | sm 78px, md 112px, lg 148px diameter | N/A |
| **Shadows** | Not specified | None | Yes |

**Discrepancies**

1. Component is a progress indicator, not PDF multi-segment torta chart.
2. Default accent `--ds-color-blue`, not PDF donut palette.
3. Conic-gradient rendering differs from PDF arc segments with explicit eje.

---

### DataTable — `Alejandria/DataTable`

**PDF reference:** None  
**Visual Fidelity: Low** (no PDF baseline; diverges from PDF dark-table aesthetic)

| Dimension | PDF | Implementation | Notes |
|-----------|-----|----------------|-------|
| All dimensions | No table spec in PDF | Glass wrap, teal-tinted borders, mono headers `0.68rem`, `--ds-shadow-sm` | Cannot verify against PDF |

**Discrepancies (internal vs PDF dark UI language)**

1. No PDF specification exists.
2. Uses `--ds-color-surface-glass`, teal focus tokens, and shadows — consistent with kit but not PDF.

---

### Switch — `Alejandria/Switch`

**PDF reference:** None  
**Visual Fidelity: Low**

**Discrepancies**

1. No PDF specification.
2. Track checked state uses `--ds-color-teal` (`#6ce0c7`), absent from PDF palette.

---

### SegmentedControl — `Alejandria/SegmentedControl`

**PDF reference:** Filtros (p. 3) — conceptual only  
**Visual Fidelity: Low**

| Dimension | PDF spec | Implementation | Match |
|-----------|----------|----------------|:-----:|
| **Filter typography** | Montserrat Extralight 24pt uppercase `#8a8b87` | Items: mono `0.74rem` (~11.8px) | **No** |
| **Selected state** | Not specified | Teal text, dark surface, shadow | Extra |
| **Icons** | Not specified | `lucide-react` 15×15 per item | Extra |

**Discrepancies**

1. No segmented control in PDF — filtros shown as separate controls.
2. Selected item uses teal accent, not PDF colors.
3. Icons from lucide-react, not Alejandria menu set.

---

### Icons — `Alejandria/Icons`

**PDF reference:** ICONOS (p. 6)  
**Visual Fidelity: Medium**

| Dimension | PDF spec | Implementation (catalog story + assets) | Match |
|-----------|----------|------------------------------------------|:-----:|
| **Modules size** | 180×180 | SVG viewBox 180×180; catalog displays `40×40` img | Partial |
| **Menu size** | 50×50 | SVG 50×50; catalog displays `40×40` | Partial |
| **Investigations size** | 50×50 | SVG 50×50; catalog displays `40×40` | Partial |
| **Cards size** | 20×20 | SVG 20×20; catalog displays `40×40` | **No** |
| **Module icon color** | `#c1c1c1` | SVG fill baked in asset; not enforced in CSS | Partial |
| **Menu icon color** | `#8a8b87` | SVG fill baked in asset | Partial |
| **Typography in catalog** | N/A | Display headings use `--ds-font-display` | N/A |

**Discrepancies**

1. Catalog normalizes all icons to 40×40px preview (`Icons.stories.tsx` `iconImgStyles`), losing PDF size tiers (180/50/20).
2. Card icons (20×20) displayed larger than PDF spec.
3. `Notificaciones-50x50.svg` exists on disk but is not exported in `Icons/index.ts` or shown in catalog.
4. ModuleCard renders module icons at 180×180 (aligned with PDF); icon catalog still previews at 40×40.

---

### Overview — `Alejandria/Overview` → OperationsConsole

**PDF reference:** Composite of reporting dashboard, tareas, métricas, ficha widgets (p. 1, 3, 7–9)  
**Visual Fidelity: Low**

| Dimension | PDF spec | Story implementation | Match |
|-----------|----------|---------------------|:-----:|
| **Page background** | Dark `#060606` / `#2a2927` | `--ds-color-paper` `#eef4f3` with light grid (inline style L25–26) | **No** |
| **Page title** | Not specified at this scale | `2.4rem` display uppercase | N/A |
| **Metric row** | MÉTRICAS reporting strip | 4× MetricCard with gaps 14px | Partial |
| **Task grid** | Kanban TARJETAS | 2×2 TaskCard grid | Partial |
| **Side panel** | Ficha widgets | Card + ProgressRing + TextField | Partial |
| **Icons** | Alejandria SVG sets | `lucide-react` throughout (Filter, Search, Shield, etc.) | **No** |
| **Buttons** | `#494949` gray | Teal primary/secondary Button variants | **No** |
| **Hierarchy** | Ficha maximized center; rest secondary | Flat dashboard: header → metrics → tasks + card | Different |

**Discrepancies**

1. Entire overview uses light `--ds-color-paper` background; PDF is dark-first.
2. All action/filter icons are lucide-react, not PDF Alejandria icon sets.
3. MetricCard has no `icon` slot (dead `icon` props removed from Overview and demo app).
4. Button styling follows teal kit, not PDF gray.
5. No map layer, ficha 40px padding, or modal patterns from PDF screens.

---

## Cross-cutting visual themes

Verified systematic differences between PDF and implementation:

| Theme | PDF | Implementation |
|-------|-----|----------------|
| **Primary accent** | Neutral grays `#494949`, `#c1c1c1`, `#8a8b87` | Teal `#6ce0c7` gradients and focus rings |
| **Surface colors** | `#060606`, `#2a2927` | `#101315`, glass overlays, `--ds-color-paper` in Storybook |
| **Danger / highlight** | `#ff0404`, `#7f0000` | `#ff3d48` (`--ds-color-danger`) |
| **Success / chart green** | `#28a500` | `#85d66f` (`--ds-color-green`) |
| **Warning / chart amber** | `#e3a500` | `#d7b24a` (`--ds-color-amber`) |
| **Border weight** | `0,75pt` (~1px) explicit | Mostly `1px`; some `0.75px` on ModuleCard only |
| **Border radius** | Not specified | Systematic `2px` / `4px` / `6px` radius tokens |
| **Shadows** | Absent from PDF specs | Used on cards, tables, alerts, buttons |
| **Icon library in stories** | Alejandria SVG tiers | `lucide-react` in most interactive stories |
| **Font Extralight** | Used in PDF chart/metric refs | Not loaded (Montserrat stops at 300) |

---

## Fidelity distribution

| Visual Fidelity | Storybook components |
|:-------------:|:--------------------|
| **High** | 2 (ModuleCard, MetricCard) |
| **Medium** | 3 (ChartCard shell, DonutChart when PDF colors used, Icons assets) |
| **Low** | 14 |

---

## Audit metadata

| Field | Value |
|-------|-------|
| PDF pages used | 1–9, 12 (component specs); 6 (icons) |
| Storybook titles audited | 17 |
| Code modified | Yes (ModuleCard, MetricCard visual refinement 2026-07-03) |
| Comparison basis | CSS values, TSX constants, story args/decorators only |

---

*Visual audit. ModuleCard section updated after PDF fidelity pass (2026-07-03).*
