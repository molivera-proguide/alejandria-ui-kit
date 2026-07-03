# Alejandria UI Kit — Design System Coverage Matrix

**Audit date:** 2026-07-03  
**Reference:** [`design-system-inventory.md`](./design-system-inventory.md)  
**Scope:** Cross-source coverage for every UI element detected in the project

---

## 1. Methodology

### Source columns

| Column | Values | Meaning |
|--------|--------|---------|
| **PDF** | Yes / Partial / No / N/A | Present in `Alejandria - UI Toolkit (1).pdf` |
| **Storybook** | Yes / Partial / No / N/A | Listed under `Alejandria/*` stories |
| **Code** | Yes / Partial / No / N/A | Implemented in repository |
| **Docs** | Yes / Partial / No / N/A | Documented in `knowledge/` (component `.md` or dedicated token/pattern doc) |

### Status values

| Status | Rule |
|--------|------|
| **Complete** | All applicable sources present (`Yes`). N/A columns are ignored. |
| **Partial** | Implemented or specified in some sources but with gaps, indirect docs, nested stories, or visual/API mismatch with PDF. |
| **Missing** | Expected from PDF or inventory but absent from code, Storybook, or docs. |
| **Unknown** | Insufficient evidence to classify (none detected in this audit). |

### Gap flags (per item)

| Flag | Meaning |
|------|---------|
| **Present everywhere** | Yes in PDF (if applicable), Storybook, Code, and Docs |
| **Missing implementation** | PDF or spec exists; Code = No |
| **Missing documentation** | Code = Yes; Docs = No |
| **Missing Storybook** | Code = Yes; Storybook = No |
| **Missing from UI Kit** | Code = Yes; PDF = No (code-only element) |
| **Deprecated** | Marked obsolete or superseded (none found) |
| **Duplicate** | Overlaps another inventory item |

---

## 2. Executive summary

| Metric | Count |
|--------|------:|
| Total inventory items | 142 |
| Status: Complete | 18 |
| Status: Partial | 108 |
| Status: Missing | 16 |
| Status: Unknown | 0 |
| Missing implementation | 10 |
| Missing documentation | 95 |
| Missing Storybook | 22 |
| Missing from UI Kit (PDF) | 28 |
| Deprecated | 0 |
| Duplicate | 12 |

### Coverage by category

| Category | Items | Complete | Partial | Missing |
|----------|------:|---------:|--------:|--------:|
| Design Token | 28 | 0 | 28 | 0 |
| Primitive (CSS) | 14 | 0 | 14 | 0 |
| Component | 17 | 6 | 11 | 0 |
| PDF-only concept | 12 | 0 | 2 | 10 |
| Icon (group) | 4 | 0 | 4 | 0 |
| Icon (individual) | 36 | 0 | 35 | 1 |
| Pattern | 10 | 0 | 10 | 0 |
| Layout | 14 | 0 | 14 | 0 |
| Screen | 8 | 0 | 5 | 3 |
| Utility | 3 | 0 | 3 | 0 |

---

## 3. Master coverage matrix

Legend for gap flags: `✓` = applies, `—` = does not apply.

### 3.1 React components

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| AlertBanner | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | — |
| Badge | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | — |
| BarChartCard | Yes | Partial | Yes | Yes | Partial | — | — | — | — | — | — | ChartCard family |
| Button | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | — |
| Card | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | — |
| ChartCard | Yes | Yes | Yes | Yes | Complete | ✓ | — | — | — | — | — | — |
| DataTable | No | Yes | Yes | Yes | Partial | — | — | — | — | ✓ | — | — |
| DonutChartCard | Yes | Partial | Yes | Yes | Partial | — | — | — | — | — | — | ChartCard family |
| LineChartCard | Yes | Partial | Yes | Yes | Partial | — | — | — | — | — | — | ChartCard family |
| MetricCard | Yes | Yes | Yes | Yes | Complete | ✓ | — | — | — | — | — | Widget metric block |
| ModuleCard | Yes | Yes | Yes | Yes | Complete | ✓ | — | — | — | — | — | — |
| ProgressRing | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | DonutChartCard |
| SegmentedControl | No | Yes | Yes | Yes | Partial | — | — | — | — | ✓ | — | Filtros panel |
| SelectField | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | Filtros panel |
| Switch | No | Yes | Yes | Yes | Partial | — | — | — | — | ✓ | — | — |
| TaskCard | Yes | Yes | Yes | Yes | Complete | ✓ | — | — | — | — | — | Kanban card |
| TextField | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | — |

**Component notes**

- **Complete (6):** ChartCard, MetricCard, ModuleCard, TaskCard — plus DataTable and Switch qualify as code-complete but are **Partial** overall because PDF = No.
- **BarChartCard / DonutChartCard / LineChartCard:** Storybook = Partial (nested under `Alejandria/ChartCard`, no dedicated story file).
- **No component** has Missing implementation or Missing Storybook.

---

### 3.2 PDF-only or unimplemented concepts

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| Ficha (detail sheet) | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | Reporting dashboard |
| Login form screen | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | TextField (partial) |
| Modal / asistente IA | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | Card (partial) |
| Menú (as DS component) | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | ops-rail layout |
| Kanban board (dedicated) | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | Task card grid |
| Investigation flight card | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | MetricCard / Card |
| Pattern lock circles (login) | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | — |
| Widget metric block (ficha) | Yes | Partial | Partial | Partial | Partial | — | — | — | — | — | — | MetricCard |
| Filtros panel (standalone) | Yes | Partial | Partial | Partial | Partial | — | — | — | — | — | — | SelectField, SegmentedControl |
| Estado semáforo indicator | Yes | Partial | Partial | Partial | Partial | — | — | — | — | — | — | Badge, TaskCard |
| Horizontal bar chart (PDF 5pt) | Yes | Partial | Partial | Yes | Partial | — | — | — | — | — | — | BarChartCard |
| Traditional vertical bar chart | Yes | Partial | Partial | Yes | Partial | — | — | — | — | — | — | BarChartCard |

---

### 3.3 CSS primitives

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| Button (`.ds-button`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | Button component |
| Badge (`.ds-badge`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | Badge component |
| Card (`.ds-card`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | Card component |
| Field (`.ds-field`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | TextField, SelectField |
| Metric (`.ds-metric`) | Yes | Yes | Yes | Yes | Partial | — | — | — | — | — | — | MetricCard component |
| Module card (`.ds-module-card`) | Yes | Yes | Yes | Yes | Partial | — | — | — | — | — | — | ModuleCard component |
| Task (`.ds-task`) | Yes | Yes | Yes | Yes | Partial | — | — | — | — | — | — | TaskCard component |
| Progress ring (`.ds-progress`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | ProgressRing component |
| Alert (`.ds-alert`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | AlertBanner component |
| Switch (`.ds-switch`) | No | Yes | Yes | Yes | Partial | — | — | — | — | ✓ | — | Switch component |
| Segmented control (`.ds-segmented`) | Partial | Yes | Yes | Yes | Partial | — | — | — | — | — | — | SegmentedControl component |
| Data table (`.ds-table`) | No | Yes | Yes | Yes | Partial | — | — | — | — | ✓ | — | DataTable component |
| Chart card shell (`.ds-chart-card`) | Yes | Yes | Yes | Yes | Partial | — | — | — | — | — | — | ChartCard component |
| Bar / donut / line SVG charts | Yes | Partial | Yes | Yes | Partial | — | — | — | — | — | — | Chart card components |

**Primitive notes:** Every primitive duplicates its React component counterpart (CSS + component pair). No primitive lacks code or Storybook.

---

### 3.4 Design tokens (`--ds-*`)

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| `--ds-font-display` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-font-body` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-font-mono` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-ink` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-ink-soft` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-ink-muted` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-paper` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-surface` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-surface-strong` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-surface-glass` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-line` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-line-strong` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-teal` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-teal-dark` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-teal-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-coral` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-coral-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-amber` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-amber-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-blue` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-blue-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-green` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-green-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-color-danger` | Partial | Yes | Yes | Partial | Partial | — | — | ✓ | — | — | — | — |
| `--ds-color-danger-soft` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-shadow-sm` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-shadow-md` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-radius-xs` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-radius-sm` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-radius-md` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |
| `--ds-focus-ring` | No | Yes | Yes | Partial | Partial | — | — | ✓ | — | ✓ | — | — |

**Token notes:** `knowledge/tokens/` is empty. Docs = Partial (referenced inside component docs only). No token has dedicated documentation.

### 3.5 PDF hardcoded colors (not tokenized)

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| `#060606` | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | `--ds-color-surface` |
| `#c1c1c1` | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | `--ds-color-line` |
| `#8a8b87` | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | `--ds-color-ink-soft` |
| `#2a2927` | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | `--ds-color-surface` |
| `#ff0404` / `#7f0000` | Yes | Partial | Partial | Partial | Partial | — | — | — | — | — | — | `--ds-color-danger` |
| `#e3a500` / `#28a500` | Yes | Partial | Partial | No | Partial | — | — | ✓ | — | — | — | `--ds-color-amber/green` |
| `#494949` | Yes | Partial | No | No | Partial | — | ✓ | ✓ | — | — | — | Button styles |

---

### 3.6 Icon groups

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| Cards icon set (20×20) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Investigations icon set (50×50) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Menu icon set (50×50) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Modules icon set (180×180) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| lucide-react (external) | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | Alejandria SVG set |

### 3.7 Individual icons

| Item | PDF | Storybook | Code | Docs | Status | Missing impl. | Missing docs | Missing SB |
|------|:---:|:---------:|:----:|:----:|:------:|:-------------:|:------------:|:----------:|
| CerrarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| EditarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| EliminarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| ArchivoIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| AutoIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| AvionIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| ColectivoIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| DocumentoIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| DriveIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| InstagramIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| PersonaIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| TelefonoIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| AyudaIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| MenuBandejaIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| BuscarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| CerrarSesionIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| ConfiguracionIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| MenuEditarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| FiltroIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| HamburguesaIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| HistorialIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| NuevaEntidadIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| NuevaRelacionIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| PersonalizarIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| ReportsIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| RelacionarEntidadesIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| UsuarioIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| **NotificacionesIcon** | Yes | **No** | **Partial** | No | **Missing** | — | ✓ | ✓ |
| ModulesBandejaIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| CatastrofesIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| CiberseguridadIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| DespliegueIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| EvidenciasIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| GeneroIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |
| InvestigacionesIcon | Yes | Yes | Yes | No | Partial | — | ✓ | — |

**Icon notes:** Icons are not exported from package `index.ts`. All icons except Notificaciones share the same coverage profile.

---

### 3.8 Patterns

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| Operations Console | Partial | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | Operations control center screen |
| Chart gallery (2×2) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Module card grid | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | Módulos hub screen |
| Task card grid | Yes | Partial | Yes | No | Partial | — | — | ✓ | — | — | — | Kanban board |
| Metric row (4-column KPI) | Yes | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Icon catalog browser | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | — |
| Alert + command header | Partial | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | — |
| Card + ProgressRing + TextField panel | Partial | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | Ficha widgets |
| Event feed list | No | No | Yes | No | Partial | — | — | ✓ | ✓ | ✓ | — | DataTable |
| Resource summary list | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | MetricCard row |

**Pattern notes:** `knowledge/patterns/` is empty — all patterns lack dedicated documentation.

---

### 3.9 Layouts

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| `ops-app` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | — |
| `ops-rail` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | Menú screen |
| `ops-brand` | No | No | Yes | No | Partial | — | — | ✓ | ✓ | ✓ | — | — |
| `ops-nav` / `ops-nav__item` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | Menú screen |
| `ops-main` | No | No | Yes | No | Partial | — | — | ✓ | ✓ | ✓ | — | — |
| `ops-command` | No | No | Yes | No | Partial | — | — | ✓ | ✓ | ✓ | — | — |
| `ops-map` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | Ficha sobre mapa |
| `ops-metrics` | Yes | Partial | Yes | No | Partial | — | — | ✓ | — | — | — | Metric row pattern |
| `ops-lower` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | — |
| `ops-board` / `ops-task-grid` | Yes | Partial | Yes | No | Partial | — | — | ✓ | — | — | — | Kanban board |
| `ops-side` | Partial | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | Ficha lateral |
| `ops-map__panel` | Yes | No | Yes | No | Partial | — | — | ✓ | ✓ | — | — | Card panel pattern |
| Storybook fullscreen canvas | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | — |
| Storybook centered canvas | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | — |

**Layout notes:** All `ops-*` layouts are demo-app only (`apps/web`). None appear in Storybook as documented layouts.

---

### 3.10 Screens

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| Kanban / tareas board | Yes | Partial | Partial | No | Partial | — | — | ✓ | — | — | — | Task card grid |
| Ficha (detail sheet) | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | — |
| Reporting dashboard | Partial | Partial | Partial | No | Partial | — | — | ✓ | — | — | — | Operations Console |
| Login | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | — |
| Módulos hub | Yes | Partial | No | No | Partial | — | ✓ | ✓ | — | — | — | Module card grid |
| Modal / asistente IA | Yes | No | No | No | Missing | — | ✓ | ✓ | ✓ | — | — | — |
| Menú principal | Yes | No | Partial | No | Partial | — | — | ✓ | ✓ | — | — | ops-rail |
| Operations control center | Partial | Partial | Yes | No | Partial | — | — | ✓ | — | — | — | Operations Console |

---

### 3.11 Utilities

| Item | PDF | Storybook | Code | Docs | Status | Present everywhere | Missing impl. | Missing docs | Missing SB | Missing PDF | Deprecated | Duplicate |
|------|:---:|:---------:|:----:|:----:|:------:|:------------------:|:-------------:|:------------:|:----------:|:-----------:|:----------:|:---------:|
| `cn()` class merger | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | — |
| `ds-spin` animation | No | Yes | Yes | No | Partial | — | — | ✓ | — | ✓ | — | — |
| Google Fonts import | Partial | Yes | Yes | No | Partial | — | — | ✓ | — | — | — | Font tokens |

---

## 4. Gap analysis

### 4.1 Missing implementation (PDF/spec exists, no code)

| Item | Category | PDF | Code gap |
|------|----------|:---:|----------|
| Ficha (detail sheet) | Screen | Yes | No full screen or layout component |
| Login form screen | Screen | Yes | No screen; inputs exist only as TextField |
| Modal / asistente IA | Screen | Yes | No modal component |
| Menú (as DS component) | Component | Yes | Only demo `ops-rail`, not in package |
| Kanban board (dedicated) | Pattern | Yes | Task grid only, no Kanban semantics |
| Investigation flight card | Component | Yes | No VUELO XR-style card |
| Pattern lock circles | Primitive | Yes | Not implemented |
| `#2a2927` input background | Token/color | Yes | Not in CSS tokens or fields |
| `#494949` button background | Token/color | Yes | Button uses teal gradient instead |
| Módulos hub | Screen | Yes | No dedicated screen (ModuleCard only) |

### 4.2 Missing documentation (code exists, no `knowledge/` doc)

| Area | Count | Notes |
|------|------:|-------|
| Design tokens (`--ds-*`) | 28 | `knowledge/tokens/` empty |
| Icon groups | 4 | No icon documentation |
| Individual icons | 35 | No per-icon docs |
| Patterns | 10 | `knowledge/patterns/` empty |
| Layouts (`ops-*`) | 12 | App-specific, undocumented |
| Screens (implemented) | 5 | No screen-level docs |
| Utilities | 3 | Undocumented |
| PDF hardcoded colors | 7 | Not in token docs |
| **Total items lacking dedicated docs** | **95** | Component docs cover 17 items only |

### 4.3 Missing Storybook

| Item | Category | Code | Storybook gap |
|------|----------|:----:|---------------|
| NotificacionesIcon | Icon | Partial | Not in `Icons/index.ts` or catalog |
| Event feed list | Pattern | Yes | Demo app only |
| Resource summary list | Pattern | Yes | Demo app only |
| All `ops-*` layouts (12) | Layout | Yes | Not in Storybook |
| `ops-map__panel` | Layout | Yes | Demo app only |
| Ficha, Login, Modal screens | Screen | No | N/A (also missing code) |
| Menú principal | Screen | Partial | No Storybook screen |
| Módulos hub | Screen | No | Partial ModuleCard stories only |
| `#2a2927`, `#494949` colors | Token | No/Partial | N/A |

### 4.4 Missing from UI Kit PDF (code exists, not in PDF)

| Item | Category |
|------|----------|
| DataTable | Component |
| SegmentedControl | Component |
| Switch | Component |
| ProgressRing | Component (partial PDF overlap with torta) |
| AlertBanner | Component (partial: misc alertas) |
| Badge | Component (partial) |
| Card | Component (partial) |
| lucide-react icons | Icon |
| Icon catalog browser | Pattern |
| `cn()`, `ds-spin` | Utility |
| Storybook canvas layouts | Layout |
| All teal-era tokens (14) | Design Token |
| `ops-brand`, `ops-main`, `ops-command` | Layout |
| Event feed list | Pattern |

### 4.5 Deprecated

No items are marked deprecated in code, Storybook, knowledge docs, or the PDF. **Count: 0.**

### 4.6 Duplicate / overlapping items

| Primary item | Overlaps with | Nature |
|--------------|---------------|--------|
| MetricCard | Widget metric block (PDF ficha) | Component ≈ PDF widget |
| MetricCard (`.ds-metric`) | MetricCard component | CSS primitive + React wrapper |
| ProgressRing | DonutChartCard | Circular progress vs donut chart |
| BarChartCard | Horizontal / vertical bar PDF specs | Same chart family, different visual spec |
| TaskCard | Kanban card, Task card grid | Card vs board pattern |
| Task card grid | Kanban board (dedicated) | Partial implementation |
| SelectField + SegmentedControl | Filtros panel (PDF) | Split across two components |
| Badge + TaskCard status | Estado semáforo (PDF) | Status distributed |
| ops-rail | Menú principal (PDF) | App layout vs PDF screen |
| Operations Console | Operations control center screen | Storybook vs demo app |
| ChartCard + subcharts | Chart gallery pattern | Container + compositions |
| Alejandria SVG icons | lucide-react | Two icon systems in parallel |
| PDF hardcoded hex values | `--ds-*` tokens | Dual palette in codebase |

---

## 5. Component coverage at a glance

Compact view of exported components only:

| Item | PDF | Storybook | Code | Docs | Status |
|------|:---:|:---------:|:----:|:----:|:------:|
| AlertBanner | Partial | Yes | Yes | Yes | Partial |
| Badge | Partial | Yes | Yes | Yes | Partial |
| BarChartCard | Yes | Partial | Yes | Yes | Partial |
| Button | Partial | Yes | Yes | Yes | Partial |
| Card | Partial | Yes | Yes | Yes | Partial |
| ChartCard | Yes | Yes | Yes | Yes | Complete |
| DataTable | No | Yes | Yes | Yes | Partial |
| DonutChartCard | Yes | Partial | Yes | Yes | Partial |
| LineChartCard | Yes | Partial | Yes | Yes | Partial |
| MetricCard | Yes | Yes | Yes | Yes | Complete |
| ModuleCard | Yes | Yes | Yes | Yes | Complete |
| ProgressRing | Partial | Yes | Yes | Yes | Partial |
| SegmentedControl | No | Yes | Yes | Yes | Partial |
| SelectField | Partial | Yes | Yes | Yes | Partial |
| Switch | No | Yes | Yes | Yes | Partial |
| TaskCard | Yes | Yes | Yes | Yes | Complete |
| TextField | Partial | Yes | Yes | Yes | Partial |

---

## 6. Knowledge base coverage

| Knowledge path | Expected content | Status |
|----------------|------------------|:------:|
| `knowledge/components/*.md` | 17 component docs | Complete |
| `knowledge/tokens/` | Token reference | Missing |
| `knowledge/patterns/` | Pattern docs | Missing |
| `knowledge/guidelines/` | Usage guidelines | Missing |
| `knowledge/audit/` | Inventory + coverage | Complete |

---

## 7. Audit metadata

| Field | Value |
|-------|-------|
| Source inventory | `knowledge/audit/design-system-inventory.md` |
| Output | `knowledge/audit/design-system-coverage.md` |
| Items evaluated | 142 |
| Code modified | No |

---

*End of coverage matrix. Descriptive only — no code changes or recommendations.*
