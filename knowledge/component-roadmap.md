---
id: component-roadmap
name: Component Build Roadmap (from design timeline v2)
status: active
last_reviewed: 2026-08-07
source: "knowledge/references/design-reference.pdf (v2, p.2 LÍNEA DE TIEMPO) — screens triage section additionally sourced from Alejandria - Agosto 2026.pdf (kept external by decision, not committed to the repo — see Screens triage section)"
supersedes_note: >
  This tracks WHICH PDF-defined components still need to be built in code. It is
  distinct from knowledge/roadmap.md (the knowledge-architecture roadmap, M1-M6)
  and from knowledge/audit/design-system-roadmap.md (a stale 2026-07-03 audit
  snapshot whose M5 "missing components" list predates this one and is out of date).
---

# Component Build Roadmap

## Where this comes from

The design-reference PDF was updated to v2 on 2026-07-17. Its new p.2 (LÍNEA DE
TIEMPO) is the design team's own tracker: two rows, **Diseño** and **Desarrollo**,
each with a dot per component — filled if done, hollow if pending. All 11
components are marked done in Diseño; **all 5 original timeline gaps in Desarrollo
are now closed** (Empty, Skeleton, CalendarCard, SideBar, Asistente).

Cross-checked against the actual code (`packages/ui/src/components/*`,
`packages/ui/src/patterns/*`) on 2026-07-22: **0** pending timeline items remain
without a code export. Empty (`Empty.tsx`), Skeleton (`Skeleton.tsx`),
CalendarCard (`CalendarCard.tsx`), SideBar (`SideBar.tsx`), and Asistente
(`Asistente.tsx`, promoted from `patterns/modal/`) ship. The 6 items marked done
in both rows (Tarjetas → `Card`/`TaskCard`, Investigation card →
`InvestigationCard`, Ficha → `DetailSheet`, Módulos → `ModuleCard`, Gráficos →
`ChartCard` family, Metric card → `MetricCard`) all have a working implementation
already.

**This finishes the component-build-track** for the original p.2 timeline gaps.

## Gap table

| Component (PDF name) | PDF page | Diseño | Desarrollo | Code today |
|---|---|:---:|:---:|---|
| Tarjetas | p.3 | ✅ | ✅ | `Card.tsx`, `TaskCard.tsx` |
| Investigation card | p.4 | ✅ | ✅ | `InvestigationCard.tsx` |
| Ficha | p.5 | ✅ | ✅ | `patterns/detail-sheet/DetailSheet.tsx` — exported from the main `index.ts` barrel since 2026-07-28 (see "Export `DetailSheet`" row in the post-baseline table below); documented in `knowledge/components/DetailSheet.md` + `DetailSheet.spec.md` since 2026-08-07 (**stale note removed** — this row previously said "built but not exported", which stopped being true 2026-07-28) |
| Módulos (p.6 — "Icono, título y preview de información") | p.6 | ✅ | ✅ | `ModuleCard.tsx` |
| Módulos (p.7 — "De loguin") | p.7 (`doc[6]`) | not on timeline | not on timeline | `patterns/login/Login.tsx`. **Row added/corrected 2026-08-06**: same class of miss as the p.9/p.10 GRAFICOS pair — p.6 and p.7 share the section title "MÓDULOS" but are distinct pages; p.7's own subtitle is "De loguin", not a separate "Ingresar" page title (an earlier pass of this correction mis-cited it that way from an out-of-order text read — the button label "INGRESAR" on the mockup isn't the page title). Real spec: fondo `#060606`, borde `0,75pt #c1c1c1`, padding `20px` (legend value — real vector geometry measures ~23.07pt @2×, see `login-card` CSS comment), input `#2a2927`, círculos patrón `45×45px`, botón `#494949`. Fidelity-checked against `Login.tsx` 2026-08-06 — see `fidelity-pass/next-steps.md`. |
| Gráficos (p.10 — Barra tradicional/Torta comparativa/Líneas) | p.10 (`doc[9]`) | ✅ | ✅ | `ChartCard.tsx`, `BarChartCard.tsx`, `DonutChartCard.tsx`, `LineChartCard.tsx` |
| Gráficos (p.9 — Barras lineal horizontal/vertical, Torta gauge) | p.9 (`doc[8]`) | ✅ | ✅ | **Corrected 2026-08-06**: this row previously said "p.9–10" and pointed at the same 4 files above — wrong. p.9 is a distinct page under the same "GRAFICOS" title with 3 chart types those files don't cover (thin "linear" bars, not rectangles; a status-color gauge, not a grayscale comparison donut). Now built: `LinearBarChartCard.tsx` (horizontal/vertical) + `ProgressRing.tsx` `variant="pdf"` (gauge). |
| Metric card | p.11 | ✅ | ✅ | `MetricCard.tsx` |
| **Asistente** | p.12 | ✅ | ✅ | `Asistente.tsx` — promoted 2026-07-22 from `patterns/modal/Modal.tsx` (static landing shell only; chat/thread + dynamic suggestions out of scope) |
| **Side bar** | p.13 | ✅ | ✅ | `SideBar.tsx` — built 2026-07-22 |
| **Skeleton** | p.14 | ✅ | ✅ | `Skeleton.tsx` — built 2026-07-21 |
| **Calendar card** | p.15 | ✅ | ✅ | `CalendarCard.tsx` — built 2026-07-21 |
| **Empty** | p.16 | ✅ | ✅ | `Empty.tsx` — built 2026-07-21 |
| Form | p.17–21 (v3) | ✅ | ✅ | **Built 2026-08-07** (feature `001-form-modal`) — `FormTextInput.tsx`, `FormSelect.tsx`, `FormCheckable.tsx`, `FormFileUpload.tsx`, `FormDatePicker.tsx`. Field primitives, not a compound `Form` — see `specs/001-form-modal/plan.md`. |
| Alert | p.18 (v2) / p.22 (v3) | not on timeline | not on timeline | `AlertBanner.tsx` — already built as the "teal/console" notification card, out of scope for PDF `@2×÷2` fidelity (confirmed 2026-08-06, `specs/README.md`). Visually unlike the PDF's p.18 bar (full-width flat dark strip, centered uppercase text, no card/icon) — closed as a naming coincidence, not pursued as a fidelity target. v3 p.22 added a distinct confirm/cancel dialog under the same "ALERT" title — see `Modal` row in the post-baseline table below, built separately from this `AlertBanner` row. |

**Note on Form, Alert, and the p.7 Login page:** none of these appear as their own row on
the p.2 (v2) timeline, so they sit outside the design team's own tracked scope (p.7 rides
along under the "Módulos" timeline dot instead, since it shares that section title with p.6).
Alert and the p.7 Login page are non-issues for *coverage* — `AlertBanner`/`Login` already
ship, just under different names/groupings than a literal PDF page title.

**Form — resolved 2026-08-07 (superseded the 2026-08-06 "not ready" note below).** The PDF
was updated to **v3** (24 pages, 2026-08-07): p.17's old placeholder (near-identical to p.16
Empty's — same icon/title/text/button spec, no field list/layout/validation) was replaced by
**5 dedicated pages** (Login-input, Input+Select, Checkables, Adjuntos, Datepicker), each with
a real visual spec. Built as field primitives in feature `001-form-modal` — see
`specs/001-form-modal/` and `knowledge/references/pdf-text-extract.md` p.17–21 for the
verbatim spec this was built against. The note that follows is kept for history (it described
the v2 placeholder, now gone):

> *(2026-08-06, superseded)* Form is confirmed not ready: its p.17 spec block reads as an
> unfinished placeholder because it genuinely is one — the designer is still actively working
> on the real Form spec. No dedicated `Form` component exists and none should be built from
> the current placeholder page; revisit once design ships a real spec.

## Build order (timeline gaps closed)

All 5 original timeline gaps are shipped:

1. ~~**Empty**~~ — `Empty.tsx` (p.16)
2. ~~**Skeleton**~~ — `Skeleton.tsx` (p.14)
3. ~~**CalendarCard**~~ — `CalendarCard.tsx` (p.15)
4. ~~**SideBar**~~ — `SideBar.tsx` (p.13)
5. ~~**Asistente**~~ — `Asistente.tsx` (p.12) — promoted from `patterns/modal/`; static landing shell only. Chat/thread UI and what drives «tareas rápidas» remain separate design/app questions, not open kit-build gaps on the timeline.

## Lesson from Empty (apply to PDF-context stories)

`Empty` shipped with title/description text unreadable in Storybook (light-on-light):
its PDF spec is "sin fondo" (no self-drawn background), assuming a dark parent, and its
story's `parameters.backgrounds` had no effect because the `backgrounds` addon isn't
registered in `packages/ui/.storybook/main.ts` (`addons: []`). Fixed by giving the
story's own decorator an explicit `background: var(--ds-color-pdf-surface)` instead of
relying on the (currently inert) backgrounds parameter. Every PDF-context component with
an opaque background of its own (`ModuleCard`, `MetricCard`, `CalendarCard`, `SideBar`,
`Asistente`, etc.) was masking this same gap. **Side bar** (`#282828`) and **Asistente**
(shell `#060606`) draw their own opaque backgrounds so this shouldn't recur, but
**Skeleton** (`#2a2927` at 70% opacity — not fully opaque) should keep an explicit dark
decorator background rather than depending on `parameters.backgrounds`.
**Skeleton** shipped with an opaque outer decorator (`var(--ds-color-pdf-surface)`)
plus a `ComposedOnFondo` story that demos `--ds-color-pdf-surface-warm-a70` inside it.
**CalendarCard** ships opaque `#2a2927` and mirrors `TaskCard.stories.tsx` (harmless
`parameters.backgrounds` + `padding: 32` decorator; no canvas override needed).
**SideBar** ships opaque `#282828` and mirrors `ModuleCard.stories.tsx` (harmless
`parameters.backgrounds` + `padding: 32` decorator; no canvas override needed).
**Asistente** ships opaque shell `#060606` and mirrors the former Modal story
(`layout: "fullscreen"` + page-padding decorator; harmless `parameters.backgrounds`).

## Quick win (not a new build) — ✅ done 2026-07-28

`DetailSheet` (Ficha) existed in `packages/ui/src/patterns/detail-sheet/` but was
not exported from `packages/ui/src/index.ts`. Exported 2026-07-28 (see "Export
`DetailSheet`" row in the post-baseline table below) — kept here as history, this
is no longer an open item. Its own `knowledge/components/DetailSheet.md` +
`DetailSheet.spec.md` were added 2026-08-07 (see the "Ficha" Gap table row above).

## Post-baseline: coverage & hardening (from eval 2026-07-22)

The p.2 timeline gaps are closed, but the first generation eval baseline
([eval/results/2026-07-22-baseline.md](./eval/results/2026-07-22-baseline.md)) surfaced
gaps a *real consumer* hits immediately. These are NOT on the PDF timeline; prioritise by
observed consumer need, not by the PDF.

| Item | Type | Priority | Evidence | Notes |
|---|---|:---:|---|---|
| **@2× → fluid sizing** | Component hardening | **Done (partial) + 1 new gap found** | G1, G4, G5 (3/5 prompts) | See "2026-07-28 sizing pass" below — `ChartCard`/`MetricCard` ficha fixed and confirmed in a real re-run; kanban `TaskCard`'s empty-space finding wasn't actually fixed (the re-run agent overrode the card's own cap via a local `style` prop instead — a new, worse gap, see below); `Asistente` 774px **done 2026-08-06** (**stale note removed** — this row said "deferred", superseded by the fidelity-pass entry that halved every raw-@2× value in `.ds-asistente*` and verified it in Storybook, see `fidelity-pass/next-steps.md`). |
| **Pagination** | New component | **High** | G3 | No export; consumer had to hand-build a page bar with `Button`. Needed by any list/table. |
| **DataTable: sort / filter / paginate** | Component feature | **High** | G3 | Display-only today; realistic tables need at least sort + paginate. |
| **Modal / Dialog** | New component | ✅ Done (2026-08-07) | G6 | Resolved by feature `001-form-modal` — PDF v3 p.22 ("ALERT" § "Confirmación de acción") gave this gap a real spec. `Modal.tsx` ships the confirm/cancel variant only (title + text + 2 actions), with Esc + backdrop-click to close + `aria-modal`/`role="alertdialog"`. No full focus trap yet (not required by the PDF spec) — revisit if a future consumer need surfaces it. |
| **Ficha label contrast** | a11y / fidelity | Medium | G4 | Ficha `MetricCard` label (extralight + `--ds-color-pdf-ink-muted`) is spec-faithful but low-contrast on dark. Fidelity-vs-a11y tension to resolve with design. |
| **Export `DetailSheet`** | Barrel fix | ✅ Done (2026-07-28) | G4 | See "Quick win" above — a detail/login composer would reuse it. |

**Not a gap (validated by the eval):** subsystem selection (console teal vs PDF grey) is
already well-specified — the agent chose correctly in all 5 builds. See anti-examples §2/§5.

### 2026-07-28 sizing pass (Focus A from `eval/next-steps.md`)

Resolved the component-vs-composition boundary flagged in §7 for the two @2× sizing
findings, differently per component depending on whether an intrinsic size exists to
derive a cap from:

- **`ChartCard` (`.ds-chart-card`)** — added `max-width: 280px`, the native SVG `viewBox`
  width shared by `LineChartCard`/`BarChartCard`. This is an *intrinsic* cap (derived from
  the chart's own coordinate space, not invented) — fixes G4's "`LineChartCard` fills the
  viewport" for any standalone usage, not just inside `DetailSheet` (which already had its
  own local height override in `detail-sheet.css` — that finding mostly hit the hand-composed
  ficha screen consumers had to build *before* `DetailSheet` was exported).
- **`MetricCard` ficha (`.ds-metric--ficha`)** — added `width: fit-content`, the same
  technique already used by `.ds-task`. No PDF width measurement exists for this tile (see
  `MetricCard.spec.md`), so a pixel cap would be invented; sizing to content isn't. Fixes
  G4's "ficha `MetricCard` stretch full-width" regardless of the consumer's grid/flex choice.
  Reporting `MetricCard` (dashboards) is untouched — it's *meant* to fill its grid cell.
  **Both this and the `ChartCard` fix above are confirmed against G4's actual generated code**
  (not just the screenshot) — no `style`/`className` override on either component; `Card`'s own
  `style={{ maxWidth: "590px" }}` on the ficha container is legitimate since `.ds-card` ships no
  intrinsic width to defeat. G4 also used `Card`'s title/eyebrow slots instead of hand-rolling a
  heading, avoiding the §8 hardcoded-type trap G1 fell into (see below). G4 scores 24/24 with
  code-level confidence, not a screenshot-only estimate.
- **`TaskCard` kanban** — **no code change**, reasoned as a consumer/composition
  responsibility (it already self-caps via `width: fit-content` + `max-width: 140px` on
  `.ds-task--kanban`). **The 2026-07-28 G1 re-run shows this reasoning wasn't enough on its
  own:** the agent didn't size the grid column to the card — it passed
  `style={{ maxWidth: "100%", width: "100%" }}` straight to `TaskCard`
  (`alejandria-harness/src/App.tsx:290`), which overrides the component's own cap (inline
  style beats any class rule) so the card stretches to fill the still-wide `1fr` column. Visually
  this reads as "fixed" (no empty space) but it's a fidelity regression, not a fix — see
  [eval/results/2026-07-28-sizing.md](./eval/results/2026-07-28-sizing.md) correction. **New gap,
  not yet fixed:** need either a new anti-example pair (local `style`/`className` override
  defeating a shipped component's calibrated cap — distinct from §7, which assumes no cap exists)
  or a harder guard in `TaskCard` itself (e.g. not merging `width`/`maxWidth` from an incoming
  `style` prop).
- **`Asistente` 774px** — **done 2026-08-06** (**stale note removed** — previously said
  "deferred to a second pass"). Every raw-@2× value in `.ds-asistente*` (shell, mic, attach-
  plus, execute button + offsets, all 5 font-sizes, suggestions spacing) was halved and
  verified in Storybook before commit — see `fidelity-pass/next-steps.md`, "Asistente" entry.

Verified in Storybook (`ChartCard` Gallery/Line Chart stories, `MetricCard` Reporting-vs-Ficha
story) at a 1600px viewport: charts cap at native resolution instead of growing with the
viewport; the ficha tile is visibly narrower than the reporting tile now. Real-browser
re-check still recommended before re-scoring the golden set (see eval loop discipline).

## Screens triage (from "Alejandría - Agosto 2026.pdf", 2026-08-07)

**New source, distinct from `design-reference.pdf`.** Luna shared
`Alejandria - Agosto 2026.pdf` (her Downloads). Same @2× `1920×1080` canvas convention
as `design-reference.pdf`. PyMuPDF reports 30 pages, but **only 24 are real screens** —
p.25–30 are empty Illustrator artboards (0 images, 0 drawings, 0 text each), not screens.

**Decided 2026-08-07: this PDF stays out of the repo, by design, not "not yet".** It's
107.7MB, almost entirely embedded raster/3D-illustration assets (e.g. p.1's decorative
splash) with near-zero information density relevant to component specs — and it exceeds
GitHub's 100MB hard per-file push limit (this repo has no Git LFS configured). Rather
than add LFS infra for a single large internal-only reference, the source PDF is treated
like a Figma file: an external reference Luna keeps locally, cited by name/page in this
doc. What's committed instead is exactly what matters — this triage table, the gaps it
found, and (when a specific screen gets built) its own `knowledge/screens/*.md` +
fidelity-checked component. See `DECISIONS.md` (2026-08-07) for the reasoning and the
general rule this sets for future large reference PDFs.

Unlike `design-reference.pdf` (isolated component specs), this PDF shows **composed,
full-page screens** — the layer above individual components: how they combine into
real product surfaces. This is the first look at that layer for this project (today
only `knowledge/screens/operations-console.md` exists).

### Triage table (24 real screens, p.1–24)

Grupo **A** = ensamblable hoy con componentes ya construidos y fidelity-checked.
Grupo **B** = el componente principal ya existe, pero falta una pieza chica (nueva).
Grupo **C** = necesita algo que un design system no debería poseer (mapa real,
canvas de grafo interactivo) — ingeniería de aplicación, no un componente.

| p. | Pantalla | Grupo | Nota |
|---|---|:---:|---|
| 1 | Welcome / splash | A | Ilustración 3D decorativa suelta — asset estático de una sola vez, no requiere componente |
| 2 | Login | A | `patterns/login/Login.tsx` ya construido y fidelity-checked (p.7 de `design-reference.pdf`) — el grid de puntos es el fondo decorativo del propio patrón, no un teclado numérico |
| 3 | Home (eventos + KPIs) | A | **Corregido 2026-08-11** (era "Asistente IA, estado vacío" — error de mapeo de páginas, ver `drafts/pantallas-grupo-a-b.md` § hallazgo p.3/p.5/p.6, re-verificado con `get_pixmap()`). Contenido real: `SideBar` expandido + saludo/input de `Asistente` completo + "PRÓXIMOS EVENTOS" (`CalendarCard` ×6) + "RESUMEN DE PRODUCTIVIDAD" (`MetricCard` ×2 + `DonutChartCard`) + columna "TAREAS EN FECHA" (`TaskCard`). No hay una página separada de "Asistente vacío" en este PDF — era la misma pantalla contada dos veces. **Corrección 2026-08-11 (post-implementación):** el gauge "ASISTENCIAS" es `DonutChartCard`, no `ProgressRing` como se asumió inicialmente — el componente está cortado en el PDF (parece requerir scroll), confirmado contra el mock por Luna. Construido en `003-home-dashboard`. |
| 4 | Dashboard módulos | A | Grid de `ModuleCard` ×8 + topbar |
| 5 | Tareas Pendientes (grid, variante A) | A | **Nota 2026-08-11**: esta fila decía "Home (eventos+KPIs)" con la descripción de `Asistente`+gauges — ese contenido es en realidad el de p.3 (ver fila arriba). Contenido real de p.5: toggle "EN FECHA/VENCIDAS" + buscador + grilla de `TaskCard` con triángulo de acento (tone). **Pendiente de Sprint 2**: confirmar si p.5/p.6 son pantallas reales distintas o field gallery del mismo patrón (ver `drafts/pantallas-grupo-a-b.md`) — no resuelto todavía, esta fila no se corrige más allá del contenido hasta esa decisión. |
| 6 | Tareas Pendientes (grid, variante B) | A | Tabs con barra de progreso ("EN FECHA 45%"/"RETRASADAS 75%") + `TaskCard` con botón "VER MÁS" (sin triángulo de acento). Ver nota de p.5 — misma pregunta pendiente de Sprint 2. |
| 7 | Tareas — master-detail | A | El panel de detalle es casi 1:1 `DetailSheet` |
| 8 | Tareas — kanban | A* | `TaskCard` ya tiene variante kanban, pero tiene la regresión de sizing sin cerrar de la "2026-07-28 sizing pass" arriba — cerrar antes de mostrar esta pantalla como lista |
| 9 | Tareas finalizadas (grid) | A | Mismo componente que p.6, otro filtro |
| 10 | Investigación Motochorros — grafo (parcial) | C | Canvas de nodos/conectores con fotos de sospechosos, link-analysis |
| 11 | Investigación Motochorros — grafo (completo) | C | Mismo que p.10, otro estado |
| 12 | Reportes | A | Casi 100% componentes de charts existentes (`BarChartCard`, `LineChartCard`, `ProgressRing`, tiles KPI) |
| 13 | Nuevo workflow agentes | C | Editor de grafo de nodos (drag, conectores bezier) — mismo paradigma visual que p.10/11, propósito distinto |
| 14 | Predicción / Pronóstico | C (shell) | Mapa real de fondo + panel flotante reusable (viento, barras estacionales, log de decisiones) |
| 15 | Mapa — recursos "Instalación de acogida" | C (shell) | El panel flotante es prácticamente `DetailSheet` de nuevo |
| 16 | Mapa — alerta crítica | C (shell) | Mismo patrón que p.15 |
| 17 | Mapa — evacuación en vivo (completa) | C (shell) | Panel con `ProgressRing` ×4, carrusel de video, log de decisiones — todo reusable salvo el mapa |
| 18 | Mapa — evacuación (variante overlay) | C | Mismo que p.17, otro estado |
| 19 | Carga de formulario | **A** ⭐ ✅ | **Construida 2026-08-07** — `knowledge/screens/carga-de-formulario.md` + `packages/ui/src/screens/carga-de-formulario/`, prueba de concepto de la capa `knowledge/screens/*`. Reencuadrada como field gallery (ver el doc) en vez de forzar múltiples desplegables abiertos a la vez. |
| 20 | Modal + toast + acordeón | B | `Modal` listo; toast ("se creó una tarea con éxito") y acordeón ("desplegable") son gaps nuevos y chicos |
| 21 | Asistente IA — thread de chat | B | Shell existe; el thread scrolleable está fuera de scope desde que se promovió `Asistente` (ver "Build order" arriba) |
| 22 | Misión con tabs + Asistente embebido | B/C | Gaps: `Tabs` (no existe) + thread de chat; el contenido de métricas es reusable |
| 23 | Usuarios creados (tabla) | A | `DataTable` existe; sort/filter ya está trackeado como gap High priority en la tabla post-baseline arriba |
| 24 | Mapa full-bleed + log expandido | C (shell) | El panel de log es una lista simple reusable; el mapa no |

### Gaps nuevos encontrados (no estaban en ninguna tabla de arriba)

Componentes chicos, sin dependencia de mapa/canvas — candidatos baratos si se decide ampliar el kit:

- **Toast / Snackbar** — p.20 ("Se creó una tarea con éxito"). No existe hoy; `AlertBanner` es una tarjeta inline no descartable, no un toast.
- **Acordeón / Collapsible** — p.20 ("DESPLEGABLE" ×4). No existe hoy.
- **Tabs / TabNav** — p.22 ("Misión | Asistente IA | Métricas | Resumen ejecutivo | Resumen completo"). No existe hoy.
- **Carrusel de thumbnails de video/imagen** — p.17/18/22 ("IMÁGENES EN VIVO"). No existe hoy, esfuerzo bajo-medio.
- **Textura de fondo compartida** — p.1,2,3,4,5,6,8,9,20 comparten un fondo de puntos
  que vivía implícito en cada mockup, sin token ni clase propia. **✅ Resuelta
  2026-08-10 (`002-bg-texture`)**, **animada desde el mismo día** tras una nota del
  diseñador post-implementación (ver `DECISIONS.md`): `BackgroundTextureDots`
  (`utils/backgroundTexture.tsx`, helper interno **no exportado** en `index.ts`) —
  32 puntos reales extraídos de `Textura fondo.svg` como SVG inline, `mix-blend-mode:
  screen; opacity: .05` fijo en el grupo, cada punto animando su propia opacidad
  (`ease-in-out`, ciclo base ~6s con jitter, sin sincronía, respeta
  `prefers-reduced-motion`) + token `--ds-color-pattern-dot: #ebf2fe` en `styles.css`.
  Reemplazó la primera versión estática (clase `.ds-bg-texture-dots` con
  `background-image` de data URI, ya removida de `styles.css`). Aplicada por ahora
  solo a `Login` (`patterns/login/Login.tsx`) y `Carga de Formulario`
  (`screens/carga-de-formulario/CargaDeFormulario.stories.tsx`) — el resto de las
  pantallas listadas queda pendiente de sus propias features.

Gaps grandes, fuera del scope típico de un design system:

- **Mapa real** — 7 de 24 pantallas (14–18, 22, 24) lo necesitan. Requiere una librería de mapas (Mapbox/Leaflet/etc.) + estado en vivo — es una integración de aplicación, no un componente presentacional.
- **Canvas de grafo de nodos** — aparece 2 veces con propósitos distintos (link-analysis en p.10/11, workflow builder en p.13) pero el mismo paradigma visual (nodos + conectores + popup). Si algún día se justifica construirlo, evaluarlo como una sola pieza base compartida, no dos — pero es un desarrollo grande (drag, conectores bezier, zoom/pan), no "ensamblar átomos existentes".

Gaps ya trackeados en otra tabla de este mismo archivo, solo confirmados (no nuevos) por esta pantalla:

- **`DataTable` sort/filter/paginate** (p.23) — ya en la tabla "Post-baseline" arriba, High priority.
- **`TaskCard` kanban — regresión de sizing sin cerrar** (p.8) — ya en la "2026-07-28 sizing pass" arriba.

### Recomendación (sin accionar todavía — a la espera de decisión)

No es "adentro del kit" *o* "en un repo consumidor" para las 24 por igual — depende del grupo:

- **Grupo A y B** → construir como `knowledge/screens/*` + composición en Storybook, mismo
  workflow de fidelidad ya establecido en este repo (PyMuPDF, `/sdd-refine`→`/sdd-implement`).
  **p.19 ya se construyó** (2026-08-07, ver fila arriba) como prueba de concepto — cero gaps,
  usa exactamente los 6 componentes que se construyeron y fidelity-pasaron esta semana. El
  resto del Grupo A/B queda pendiente de un draft + `/sdd-refine` propio (hay ambigüedades
  reales por resolver por pantalla, no son todas tan directas como la #19).
- **Grupo C** → no intentar fidelidad completa adentro del kit. Extraer primero cualquier
  pieza presentacional reusable del panel flotante (la mayoría ya existe, como se ve en la
  tabla) vía el pipeline normal de este archivo; la pantalla completa (con mapa/grafo reales
  y estado en vivo) va en una app consumidora (`apps/web` o un repo de prueba), no en
  Storybook con datos mockeados.
