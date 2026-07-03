# Alejandria UI Kit — Design System Inventory

**Audit date:** 2026-07-03  
**Auditor role:** Design System inventory (read-only)  
**Primary reference PDF:** `Alejandria - UI Toolkit (1).pdf` (13 pages)

---

## 1. Scope and methodology

This inventory cross-references every detectable UI element against these sources of truth:

| Source | Location | Role |
|--------|----------|------|
| UI Kit PDF | `Alejandria - UI Toolkit (1).pdf` | Original visual specification (13 pages) |
| React components | `packages/ui/src/components/*.tsx` | Implemented UI API |
| Public exports | `packages/ui/src/index.ts` | Published component surface |
| Styles / tokens | `packages/ui/src/styles.css` | CSS custom properties and BEM classes |
| Storybook stories | `packages/ui/src/**/*.stories.tsx` | Interactive catalog and demos |
| Icons | `packages/ui/src/Icons/` | SVG asset library |
| Knowledge docs | `knowledge/components/*.md` | Structured component documentation |
| Demo app | `apps/web/src/` | Consumer integration (`App.tsx`, `app.css`) |
| Overview story | `packages/ui/src/components/Components.stories.tsx` | Composite operations console |
| Token / pattern / guideline stubs | `knowledge/tokens/`, `knowledge/patterns/`, `knowledge/guidelines/` | Placeholder directories (`.gitkeep` only) |

### Classification legend

| Category | Definition in this audit |
|----------|--------------------------|
| **Design Token** | Named CSS custom property in `:root` |
| **Primitive** | Reusable styled building block (CSS class system) without its own React export |
| **Component** | Exported React component from `@alejandria/ui-kit` |
| **Pattern** | Composed arrangement of multiple components (Storybook or app-level) |
| **Layout** | Structural page/section scaffold (CSS grid regions, rails, panels) |
| **Screen** | Full-page or PDF-defined view concept |
| **Icon** | Individual SVG asset or icon group |
| **Utility** | Helper function or animation not rendered as UI |

### Column legend

| Column | Meaning |
|--------|---------|
| **PDF** | Present or clearly described in the UI Toolkit PDF |
| **Storybook** | Has a dedicated story file or named story under `Alejandria/*` |
| **Code** | Implemented in the repository |
| **Docs** | Has a `knowledge/components/*.md` file |
| **Confidence** | High = explicit match across sources; Medium = partial or inferred; Low = speculative mapping |

---

## 2. Executive summary

| Metric | Count |
|--------|------:|
| Design tokens (`--ds-*`) | 28 |
| CSS primitive systems | 14 |
| Exported React components | 17 |
| Icon SVG files | 36 |
| Icon exports in `Icons/index.ts` | 35 |
| Storybook story files | 17 |
| Knowledge component docs | 17 |
| PDF-only screen/pattern concepts | 6 |
| App-specific layout regions (`ops-*`) | 15 |

**Package version:** `@alejandria/ui-kit` v0.1.0

**Notable state observations (descriptive only):**

- The PDF palette (`#060606`, `#2a2927`, `#c1c1c1`, `#8a8b87`, `#ff0404`, etc.) coexists with a separate token palette in `styles.css` (teal-forward: `#6ce0c7`, `#101315`, etc.). Some components hardcode PDF values (`ModuleCard`, `ChartCard` family) while others use `--ds-*` tokens exclusively.
- Icons live in the package but are **not** re-exported from `packages/ui/src/index.ts`.
- `knowledge/tokens/`, `knowledge/patterns/`, and `knowledge/guidelines/` contain no substantive content beyond `.gitkeep`.
- `README.md` lists 11 components; the codebase exports 17.
- Chart subcomponents (`BarChartCard`, `DonutChartCard`, `LineChartCard`) share one Storybook entry (`Alejandria/ChartCard`) rather than individual story files.

---

## 3. PDF structure (source map)

| PDF page | Section title | Primary UI concepts |
|---------:|---------------|---------------------|
| 1 | TARJETAS | Task cards, Kanban view, estado indicator, selected/normal states |
| 2 | TARJETAS | Investigation metric card (flight-style), compact metrics, actions |
| 3 | FICHAS | Detail sheet: widgets, filters, bar/line charts, metrics, media, actions |
| 4 | MÓDULOS | Module cards with icon, title, highlighted info |
| 5 | MÓDULOS / Login | Login form (usuario, contraseña), pattern circles |
| 6 | ICONOS | Icon size tiers: modules 180×180, menu 50×50, investigations 50×50, cards 20×20 |
| 7 | GRÁFICOS | Reporting charts: horizontal bar, donut (torta), vertical bar |
| 8 | GRÁFICOS | Reporting charts: traditional bars, donut, line chart with grid |
| 9 | MÉTRICAS | Metric cards — reporting vs. ficha variants, array layout |
| 10 | MODALES | Modal with greeting, actions, file attach |
| 11 | MENÚS | Menu navigation (visual only, no component spec) |
| 12 | MISCELÁNEAS | Alert banner (“ALERTAS NUEVAS”, incident type) |
| 13 | (end) | — |

---

## 4. Design tokens

All tokens are defined in `packages/ui/src/styles.css` under `@layer ds.tokens`. No separate token documentation file exists (`knowledge/tokens/` is empty).

### 4.1 Typography tokens

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| `--ds-font-display` | Design Token | Partial (Source Code family in PDF) | Yes (used in stories) | Yes | Indirect (per-component docs) | High |
| `--ds-font-body` | Design Token | Partial (Montserrat in PDF) | Yes | Yes | Indirect | High |
| `--ds-font-mono` | Design Token | Partial (Source Code in PDF) | Yes | Yes | Indirect | High |

### 4.2 Color tokens

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| `--ds-color-ink` | Design Token | No (PDF uses `#FFFFFF`) | Yes | Yes | Indirect | Medium |
| `--ds-color-ink-soft` | Design Token | Partial (`#8a8b87`) | Yes | Yes | Indirect | Medium |
| `--ds-color-ink-muted` | Design Token | Partial | Yes | Yes | Indirect | Medium |
| `--ds-color-paper` | Design Token | No | Yes | Yes | Indirect | Low |
| `--ds-color-surface` | Design Token | Partial (`#060606`, `#2a2927`) | Yes | Yes | Indirect | Medium |
| `--ds-color-surface-strong` | Design Token | No | Yes | Yes | Indirect | Low |
| `--ds-color-surface-glass` | Design Token | Partial (70% opacity contexts) | Yes | Yes | Indirect | Medium |
| `--ds-color-line` | Design Token | Partial (`#c1c1c1`, `#e6e6e6`) | Yes | Yes | Indirect | Medium |
| `--ds-color-line-strong` | Design Token | Partial | Yes | Yes | Indirect | Medium |
| `--ds-color-teal` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-teal-dark` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-teal-soft` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-coral` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-coral-soft` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-amber` | Design Token | Partial (`#e3a500`) | Yes | Yes | Indirect | Medium |
| `--ds-color-amber-soft` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-blue` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-blue-soft` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-green` | Design Token | Partial (`#28a500`) | Yes | Yes | Indirect | Medium |
| `--ds-color-green-soft` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-color-danger` | Design Token | Partial (`#ff0404`) | Yes | Yes | Indirect | Medium |
| `--ds-color-danger-soft` | Design Token | No | Yes | Yes | Indirect | High |

### 4.3 Elevation, radius, and focus tokens

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| `--ds-shadow-sm` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-shadow-md` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-radius-xs` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-radius-sm` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-radius-md` | Design Token | No | Yes | Yes | Indirect | High |
| `--ds-focus-ring` | Design Token | No | Yes | Yes | Indirect | High |

### 4.4 PDF-specified values not tokenized

These appear in the PDF and/or hardcoded in component CSS but are **not** exposed as `--ds-*` variables:

| Value / concept | Where used | Category | PDF | Code | Confidence |
|-----------------|------------|----------|:---:|:----:|:----------:|
| `#060606` (module/chart backgrounds) | `.ds-module-card`, `.ds-chart-card` | Primitive color | Yes | Yes | High |
| `#c1c1c1` (borders, module title) | `.ds-module-card`, charts | Primitive color | Yes | Yes | High |
| `#8a8b87` (muted text, chart labels) | `.ds-chart-card`, module metrics | Primitive color | Yes | Yes | High |
| `#2a2927` (input backgrounds per PDF) | PDF only for login/ficha | Primitive color | Yes | No | High |
| `#ff0404` / `#7f0000` (semaphore estado) | PDF ficha | Primitive color | Yes | Partial (`--ds-color-danger`) | Medium |
| `#e3a500`, `#28a500` (chart segment colors) | PDF donut specs | Primitive color | Yes | Partial (DonutChartCard props) | Medium |
| `#494949` (button backgrounds per PDF) | PDF | Primitive color | Yes | No (Button uses teal gradient) | High |

---

## 5. CSS primitives

Styled class systems in `styles.css` (`@layer ds.components`). Each maps to one or more React components unless noted.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| Button (`.ds-button`, variants, sizes) | Primitive | Partial (inline button specs) | Yes (`Alejandria/Button`) | Yes | Yes (`Button.md`) | High |
| Badge (`.ds-badge`, tones) | Primitive | Partial (estado chips in PDF) | Yes (`Alejandria/Badge Chip`) | Yes | Yes | Medium |
| Card (`.ds-card`, header/body/footer) | Primitive | Partial (ficha widgets) | Yes | Yes | Yes | Medium |
| Field (`.ds-field`, input, select, hint, error) | Primitive | Partial (login inputs) | Yes | Yes | Yes (`TextField.md`, `SelectField.md`) | High |
| Metric (`.ds-metric`) | Primitive | Yes (MÉTRICAS section) | Yes | Yes | Yes (`MetricCard.md`) | High |
| Module card (`.ds-module-card`) | Primitive | Yes (MÓDULOS) | Yes | Yes | Yes (`ModuleCard.md`) | High |
| Task (`.ds-task`, progress bar) | Primitive | Yes (TARJETAS) | Yes | Yes | Yes (`TaskCard.md`) | High |
| Progress ring (`.ds-progress`) | Primitive | Partial (torta/donut visually related) | Yes | Yes | Yes (`ProgressRing.md`) | Medium |
| Alert (`.ds-alert`) | Primitive | Partial (MISCELÁNEAS alertas) | Yes | Yes | Yes (`AlertBanner.md`) | Medium |
| Switch (`.ds-switch`) | Primitive | No | Yes | Yes | Yes | High |
| Segmented control (`.ds-segmented`) | Primitive | Partial (filtros concept in PDF) | Yes | Yes | Yes | Low |
| Data table (`.ds-table`, `.ds-table-wrap`) | Primitive | No | Yes | Yes | Yes | High |
| Chart card shell (`.ds-chart-card`) | Primitive | Yes (GRÁFICOS container) | Yes | Yes | Yes (`ChartCard.md`) | High |
| Bar / donut / line chart SVG (`.ds-bar-chart`, `.ds-donut-chart`, `.ds-line-chart`) | Primitive | Yes | Yes (under ChartCard stories) | Yes | Yes (per chart doc) | High |

---

## 6. React components

All listed below are exported from `packages/ui/src/index.ts`.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| AlertBanner | Component | Partial (alertas nuevas) | Yes (`Alejandria/AlertBanner`) | Yes | Yes | Medium |
| Badge | Component | Partial | Yes (`Alejandria/Badge Chip`) | Yes | Yes | Medium |
| BarChartCard | Component | Yes (barras) | Yes (`ChartCard` → BarChart, Gallery) | Yes | Yes | High |
| Button | Component | Partial (inline specs) | Yes | Yes | Yes | High |
| Card | Component | Partial (ficha widgets, panels) | Yes | Yes | Yes | Medium |
| ChartCard | Component | Yes (chart container) | Yes | Yes | Yes | High |
| DataTable | Component | No | Yes | Yes | Yes | High |
| DonutChartCard | Component | Yes (torta) | Yes (`ChartCard` → DonutChart, Gallery) | Yes | Yes | High |
| LineChartCard | Component | Yes (líneas) | Yes (`ChartCard` → LineChart, Gallery) | Yes | Yes | High |
| MetricCard | Component | Yes (MÉTRICAS) | Yes | Yes | Yes | High |
| ModuleCard | Component | Yes (MÓDULOS) | Yes | Yes | Yes | High |
| ProgressRing | Component | Partial (donut/torta) | Yes | Yes | Yes | Medium |
| SegmentedControl | Component | No | Yes | Yes | Yes | High |
| SelectField | Component | Partial (filtros) | Yes | Yes | Yes | Medium |
| Switch | Component | No | Yes | Yes | Yes | High |
| TaskCard | Component | Yes (TARJETAS) | Yes | Yes | Yes | High |
| TextField | Component | Partial (login inputs) | Yes | Yes | Yes | Medium |

### 6.1 Exported types and sub-APIs (code only)

| Name | Parent | Category | Code | Docs | Confidence |
|------|--------|----------|:----:|:----:|:----------:|
| `BadgeTone` | Badge | Utility type | Yes | Yes | High |
| `ButtonVariant`, `ButtonSize` | Button | Utility type | Yes | Yes | High |
| `AlertTone` | AlertBanner | Utility type | Yes | Yes | High |
| `MetricTone` | MetricCard | Utility type | Yes | Yes | High |
| `TaskTone` | TaskCard | Utility type | Yes | Yes | High |
| `ProgressRingTone`, `ProgressRingSize` | ProgressRing | Utility type | Yes | Yes | High |
| `SegmentItem` | SegmentedControl | Utility type | Yes | Yes | High |
| `SelectOption` | SelectField | Utility type | Yes | Yes | High |
| `DataTableColumn` | DataTable | Utility type | Yes | Yes | High |
| `ModuleMetric` | ModuleCard | Utility type | Yes | Yes | High |
| `BarChartDatum` | BarChartCard | Utility type | Yes | Yes | High |
| `DonutChartDatum`, `DonutChartStat` | DonutChartCard | Utility type | Yes | Yes | High |
| `LineChartDatum` | LineChartCard | Utility type | Yes | Yes | High |

---

## 7. Icons

**Total SVG files:** 36  
**Exported in `Icons/index.ts`:** 35  
**Storybook catalog:** `Alejandria/Icons` → `Catalog` story (35 icons)

Icons are **not** exported from the package root (`index.ts`). Consumed internally (e.g. `ModuleCard.stories.tsx`) and via direct import path.

### 7.1 Icon groups

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| Cards icon set (20×20) | Icon | Yes | Yes | Yes (3 SVG) | No | High |
| Investigations icon set (50×50) | Icon | Yes | Yes | Yes (10 SVG) | No | High |
| Menu icon set (50×50) | Icon | Yes | Yes | Yes (15 exported SVG) | No | High |
| Modules icon set (180×180) | Icon | Yes | Yes | Yes (7 SVG) | No | High |

### 7.2 Individual icons

#### Cards (20×20)

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| CerrarIcon | Icon | Yes | Yes | Yes | No | High |
| EditarIcon | Icon | Yes | Yes | Yes | No | High |
| EliminarIcon | Icon | Yes | Yes | Yes | No | High |

#### Investigations (50×50)

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| ArchivoIcon | Icon | Yes | Yes | Yes | No | High |
| AutoIcon | Icon | Yes | Yes | Yes | No | High |
| AvionIcon | Icon | Yes | Yes | Yes | No | High |
| ColectivoIcon | Icon | Yes | Yes | Yes | No | High |
| DocumentoIcon | Icon | Yes | Yes | Yes | No | High |
| DriveIcon | Icon | Yes | Yes | Yes | No | High |
| InstagramIcon | Icon | Yes | Yes | Yes | No | High |
| PersonaIcon | Icon | Yes | Yes | Yes | No | High |
| TelefonoIcon | Icon | Yes | Yes | Yes | No | High |

#### Menu (50×50)

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| AyudaIcon | Icon | Yes | Yes | Yes | No | High |
| MenuBandejaIcon | Icon | Yes | Yes | Yes | No | High |
| BuscarIcon | Icon | Yes | Yes | Yes | No | High |
| CerrarSesionIcon | Icon | Yes | Yes | Yes | No | High |
| ConfiguracionIcon | Icon | Yes | Yes | Yes | No | High |
| MenuEditarIcon | Icon | Yes | Yes | Yes | No | High |
| FiltroIcon | Icon | Yes | Yes | Yes | No | High |
| HamburguesaIcon | Icon | Yes | Yes | Yes | No | High |
| HistorialIcon | Icon | Yes | Yes | Yes | No | High |
| NuevaEntidadIcon | Icon | Yes | Yes | Yes | No | High |
| NuevaRelacionIcon | Icon | Yes | Yes | Yes | No | High |
| PersonalizarIcon | Icon | Yes | Yes | Yes | No | High |
| ReportsIcon | Icon | Yes | Yes | Yes | No | High |
| RelacionarEntidadesIcon | Icon | Yes | Yes | Yes | No | High |
| UsuarioIcon | Icon | Yes | Yes | Yes | No | High |
| Notificaciones (file only) | Icon | Yes | No | Partial (SVG exists, not in `index.ts`) | No | Medium |

#### Modules (180×180)

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| ModulesBandejaIcon | Icon | Yes | Yes | Yes | No | High |
| CatastrofesIcon | Icon | Yes | Yes | Yes | No | High |
| CiberseguridadIcon | Icon | Yes | Yes | Yes | No | High |
| DespliegueIcon | Icon | Yes | Yes | Yes | No | High |
| EvidenciasIcon | Icon | Yes | Yes | Yes | No | High |
| GeneroIcon | Icon | Yes | Yes | Yes | No | High |
| InvestigacionesIcon | Icon | Yes | Yes | Yes | No | High |

### 7.3 External icon dependency

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| lucide-react icons | Icon (external) | No | Yes (stories, Overview) | Yes (`apps/web`, stories) | No | High |

Used in Storybook demos and `apps/web` for navigation and actions. Not part of the Alejandria SVG set.

---

## 8. Patterns

Composed UI arrangements found in Storybook or the demo app.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| Operations Console | Pattern | Partial (reporting/ficha concepts) | Yes (`Alejandria/Overview` → `OperationsConsole`) | Yes (`Components.stories.tsx`) | No | High |
| Chart gallery (2×2 grid) | Pattern | Yes | Yes (`ChartCard` → `Gallery`) | Yes | No | High |
| Module card grid | Pattern | Yes | Yes (`ModuleCard` → `GridExample`) | Yes | No | High |
| Task card grid | Pattern | Yes (Kanban-like) | Partial (Overview, TaskCard stories) | Yes (`apps/web`) | No | Medium |
| Metric row (4-column KPI strip) | Pattern | Yes | Yes (Overview) | Yes (`apps/web`) | No | High |
| Icon catalog browser | Pattern | No | Yes (`Icons` → `Catalog`) | Yes | No | High |
| Alert + command header | Pattern | Partial | Yes (Overview, `apps/web`) | Yes | No | Medium |
| Card + ProgressRing + TextField panel | Pattern | Partial (ficha widgets) | Yes (Overview, `apps/web` map panel) | Yes | No | Medium |
| Event feed list (Badge + text + tag) | Pattern | No | No | Yes (`apps/web` `.ops-feed`) | No | Medium |
| Resource summary list | Pattern | Partial (ficha métricas) | No | Yes (`apps/web` `.ops-resource-list`) | No | Medium |

---

## 9. Layouts

Structural regions. App layouts live in `apps/web/src/app.css` and are **not** part of `@alejandria/ui-kit`.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| `ops-app` (sidebar + main grid) | Layout | Partial (menus) | No | Yes (`apps/web`) | No | Medium |
| `ops-rail` (vertical nav rail) | Layout | Partial (MENÚS) | No | Yes | No | Medium |
| `ops-brand` | Layout | No | No | Yes | No | High |
| `ops-nav` / `ops-nav__item` | Layout | Partial | No | Yes | No | Medium |
| `ops-main` | Layout | No | No | Yes | No | High |
| `ops-command` (page header) | Layout | No | No | Yes | No | High |
| `ops-map` (map hero section) | Layout | Partial (ficha sobre mapa) | No | Yes | No | Medium |
| `ops-metrics` | Layout | Yes | Partial (Overview grid) | Yes | No | High |
| `ops-lower` (board + sidebar) | Layout | Partial | No | Yes | No | Medium |
| `ops-board` / `ops-task-grid` | Layout | Yes (Kanban/tareas) | Partial | Yes | No | Medium |
| `ops-side` | Layout | Partial (ficha lateral) | No | Yes | No | Medium |
| `ops-map__panel` (floating card on map) | Layout | Yes | No | Yes | No | Medium |
| Storybook fullscreen canvas | Layout | No | Yes (Overview `layout: fullscreen`) | Yes | No | High |
| Storybook centered canvas | Layout | No | Yes (multiple stories) | Yes | No | High |

---

## 10. Screens

Full-page concepts from the PDF or implemented demo applications.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| Kanban / tareas board | Screen | Yes | Partial (Overview task grid) | Partial | No | Medium |
| Ficha (detail sheet) | Screen | Yes | No | No | No | High |
| Reporting dashboard | Screen | Partial (gráficos, métricas pages) | Partial (Overview) | Partial (`apps/web`) | No | Medium |
| Login | Screen | Yes | No | No | No | High |
| Módulos hub | Screen | Yes | Partial (`ModuleCard` stories) | No | No | Medium |
| Modal / asistente (“¿Qué querés hacer hoy?”) | Screen | Yes | No | No | No | High |
| Menú principal | Screen | Yes | No | Partial (`ops-rail` in demo app) | No | Medium |
| Operations control center (demo app) | Screen | Partial | Partial (Overview mirrors structure) | Yes (`apps/web/App.tsx`) | No | High |

---

## 11. Utilities

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| `cn()` class merger | Utility | No | Yes (used by components) | Yes (`utils/cn.ts`) | No | High |
| `ds-spin` keyframe animation | Utility | No | Yes (Button loading) | Yes (`styles.css`) | No | High |
| Google Fonts import (Montserrat, Source Code Pro) | Utility | Partial (font families in PDF) | Yes | Yes (`styles.css`) | No | High |

---

## 12. Storybook catalog

### 12.1 Story files and titles

| Storybook title | Story file | Primary exports |
|-----------------|------------|-----------------|
| `Alejandria/Overview` | `Components.stories.tsx` | `OperationsConsole` |
| `Alejandria/AlertBanner` | `AlertBanner.stories.tsx` | Playground, Tones, WithAction |
| `Alejandria/Badge Chip` | `Badge.stories.tsx` | Playground, Tones, WithoutDot |
| `Alejandria/Button` | `Button.stories.tsx` | Playground, Variants, Sizes, Loading |
| `Alejandria/Card` | `Card.stories.tsx` | Playground, WithActionsAndFooter, BodyOnly |
| `Alejandria/ChartCard` | `ChartCard.stories.tsx` | Base, BarChart, DonutChart, LineChart, Gallery |
| `Alejandria/DataTable` | `DataTable.stories.tsx` | Playground, WithoutCaption, DenseOperationalRows |
| `Alejandria/Icons` | `Icons.stories.tsx` | Catalog |
| `Alejandria/MetricCard` | `MetricCard.stories.tsx` | Playground, Tones |
| `Alejandria/ModuleCard` | `ModuleCard.stories.tsx` | Investigaciones, Ciberseguridad, Evidencias, Género, GridExample |
| `Alejandria/ProgressRing` | `ProgressRing.stories.tsx` | Playground, Tones, Sizes |
| `Alejandria/SegmentedControl` | `SegmentedControl.stories.tsx` | Playground, CriticalSelected, WithDisabledItem |
| `Alejandria/SelectField` | `SelectField.stories.tsx` | Playground, Disabled, Invalid, CompactFilters |
| `Alejandria/Switch` | `Switch.stories.tsx` | Playground, Off, Disabled, Stack |
| `Alejandria/TaskCard` | `TaskCard.stories.tsx` | Playground, Tones |
| `Alejandria/TextField` | `TextField.stories.tsx` | Playground, WithIcon, WithAction, Invalid |

### 12.2 Components with no dedicated story file

None — every exported component has Storybook coverage, though chart variants are nested under `ChartCard`.

---

## 13. Knowledge documentation coverage

All 17 exported components have a matching `knowledge/components/*.md` file with YAML frontmatter (`id`, `category`, `storybook`, `status: draft`, `last_reviewed: 2026-07-02`).

| Component doc | Matches code export | Storybook path in frontmatter |
|---------------|:-------------------:|-------------------------------|
| AlertBanner.md | Yes | `Alejandria/AlertBanner` |
| Badge.md | Yes | `Alejandria/Badge Chip` |
| BarChartCard.md | Yes | `Alejandria/ChartCard` |
| Button.md | Yes | `Alejandria/Button` |
| Card.md | Yes | `Alejandria/Card` |
| ChartCard.md | Yes | `Alejandria/ChartCard` |
| DataTable.md | Yes | `Alejandria/DataTable` |
| DonutChartCard.md | Yes | `Alejandria/ChartCard` |
| LineChartCard.md | Yes | `Alejandria/ChartCard` |
| MetricCard.md | Yes | `Alejandria/MetricCard` |
| ModuleCard.md | Yes | `Alejandria/ModuleCard` |
| ProgressRing.md | Yes | `Alejandria/ProgressRing` |
| SegmentedControl.md | Yes | `Alejandria/SegmentedControl` |
| SelectField.md | Yes | `Alejandria/SelectField` |
| Switch.md | Yes | `Alejandria/Switch` |
| TaskCard.md | Yes | `Alejandria/TaskCard` |
| TextField.md | Yes | `Alejandria/TextField` |

**Empty knowledge areas:**

| Path | Content state |
|------|---------------|
| `knowledge/tokens/` | `.gitkeep` only |
| `knowledge/patterns/` | `.gitkeep` only |
| `knowledge/guidelines/` | `.gitkeep` only |
| `knowledge/templates/component.md` | Template scaffold (not component inventory) |

---

## 14. PDF-only or not-yet-implemented concepts

Elements described in the PDF with no corresponding React component or package primitive.

| Name | Category | PDF | Storybook | Code | Docs | Confidence |
|------|----------|:---:|:---------:|:----:|:----:|:----------:|
| Ficha (full detail sheet) | Screen | Yes | No | No | No | High |
| Login form screen | Screen | Yes | No | No | No | High |
| Modal / asistente IA | Component / Screen | Yes | No | No | No | High |
| Menú (as DS component) | Component | Yes | No | No | No | High |
| Kanban board (dedicated) | Pattern | Yes | No | No | No | High |
| Investigation flight card (VUELO XR style) | Component | Yes | No | No | No | High |
| Widget metric block (ficha inner widget) | Primitive | Yes | Partial (MetricCard) | Partial | Partial | Medium |
| Filtros panel (standalone) | Component | Yes | Partial (SelectField, SegmentedControl) | Partial | Partial | Medium |
| Estado semáforo indicator | Primitive | Yes | Partial (Badge, TaskCard status) | Partial | Partial | Medium |
| Pattern lock circles (login) | Primitive | Yes | No | No | No | High |
| Horizontal bar chart (reporting style, 5pt bars) | Component | Yes | Partial (BarChartCard differs visually) | Partial | Yes | Medium |
| Traditional vertical bar chart (15px, grid) | Component | Yes | Partial | Partial | Yes | Medium |

---

## 15. Cross-source matrix (components at a glance)

| Component | PDF | Storybook | Code | Docs |
|-----------|:---:|:---------:|:----:|:----:|
| AlertBanner | Partial | Yes | Yes | Yes |
| Badge | Partial | Yes | Yes | Yes |
| BarChartCard | Yes | Yes* | Yes | Yes |
| Button | Partial | Yes | Yes | Yes |
| Card | Partial | Yes | Yes | Yes |
| ChartCard | Yes | Yes | Yes | Yes |
| DataTable | No | Yes | Yes | Yes |
| DonutChartCard | Yes | Yes* | Yes | Yes |
| LineChartCard | Yes | Yes* | Yes | Yes |
| MetricCard | Yes | Yes | Yes | Yes |
| ModuleCard | Yes | Yes | Yes | Yes |
| ProgressRing | Partial | Yes | Yes | Yes |
| SegmentedControl | No | Yes | Yes | Yes |
| SelectField | Partial | Yes | Yes | Yes |
| Switch | No | Yes | Yes | Yes |
| TaskCard | Yes | Yes | Yes | Yes |
| TextField | Partial | Yes | Yes | Yes |

\*Stories live under `Alejandria/ChartCard`, not a top-level story file.

---

## 16. `apps/web` component usage

The demo application consumes these package exports:

| Package export | Used in `App.tsx` |
|----------------|:-----------------:|
| AlertBanner | No |
| Badge | Yes |
| BarChartCard | No |
| Button | Yes |
| Card | Yes |
| ChartCard | No |
| DataTable | No |
| DonutChartCard | No |
| LineChartCard | No |
| MetricCard | Yes |
| ModuleCard | No |
| ProgressRing | Yes |
| SegmentedControl | No |
| SelectField | No |
| Switch | No |
| TaskCard | Yes |
| TextField | Yes |

**Demo-only UI:** navigation rail, map section, timer, markers, event feed, resource list — all implemented with `app.css` classes and `lucide-react`, not as package components.

---

## 17. Audit metadata

| Field | Value |
|-------|-------|
| Repository | `alejandria-ui-kit` (pnpm monorepo) |
| UI package | `packages/ui` → `@alejandria/ui-kit@0.1.0` |
| Demo app | `apps/web` |
| Storybook version | 10.4.6 |
| React peer | >=18.2.0 |
| Total inventory rows (approx.) | 150+ detectable elements |
| Files analyzed | PDF, 17 story files, 17 component TSX files, `styles.css`, 17 knowledge docs, `apps/web` |

---

*End of inventory. This document describes current state only; no recommendations are included.*
