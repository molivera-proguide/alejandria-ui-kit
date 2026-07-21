# Component selection taxonomy

Semantic roles for every export of `@alejandria/ui-kit`. Use this after classifying a **component-selection** task ([decision-order.md](./decision-order.md) §3).

Spanish Purpose prose in component docs is authoritative for nuance; this file is the English selection map.

---

## How to select

1. Match the **job** (KPI, task, module entry, chart, form control, …) to a role below.
2. Check **Nearest neighbors** — if two candidates fit, the boundary decides.
3. Open `knowledge/components/<Name>.md` to confirm Purpose / exclusions.
4. If nothing fits, go to [`reuse-rubric.md`](./reuse-rubric.md) — do not stretch identity.

---

## Surfaces & cards

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **Card** | Composable console **panel**: optional header / body / footer / actions for arbitrary operational content. | Not a KPI tile (**MetricCard**), not a PDF reporting entity card (**TaskCard** / **InvestigationCard** / **ModuleCard**), not a chart shell (**ChartCard**). Use when you need a generic container, not a fixed reporting anatomy. |
| **MetricCard** | Single **KPI** tile: label + large value + optional change; PDF METRIC CARD (p.11, formerly MÉTRICAS) language. | Not a multi-metric entity (**InvestigationCard**), not a module hub (**ModuleCard**), not a task summary (**TaskCard**), not a generic panel (**Card**). One metric per card. |
| **ModuleCard** | **Navigable module entry**: large icon, title, embedded metric rows; interactive `<button>`. | Not a static KPI (**MetricCard**), not an investigation summary with actions (**InvestigationCard**), not a task (**TaskCard**). Prefer when the primary job is “enter this module.” |
| **TaskCard** | **Task** summary: code, status, title, description, meta; PDF TARJETAS p.3; variants `default` / `kanban`. | Not an investigation entity (**InvestigationCard**), not a module entry (**ModuleCard**), not a KPI (**MetricCard**). No progress visualization by design. |
| **InvestigationCard** | **Investigation / flight-style entity** card: icon, title, 2×2 metrics grid, PDF-local actions/utilities (INVESTIGATION CARD p.4, formerly TARJETAS p.2). | Not a task (**TaskCard**), not a module launcher (**ModuleCard**), not a single KPI (**MetricCard**), not generic **Card**. Own action styles — does not compose kit **Button**. |

---

## Charts & progress

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **ChartCard** | **Chart shell** only: title + body slot + footer. | Not a chart itself. Prefer composing **BarChartCard** / **LineChartCard** / **DonutChartCard**, or pass custom SVG children. |
| **BarChartCard** | Bar chart inside ChartCard framing. | Not a proportion ring (**DonutChartCard**), not a single % indicator (**ProgressRing**). |
| **LineChartCard** | Line/area series inside ChartCard framing. | Same family as Bar/Donut; choose by data shape (trend vs category vs part-to-whole). |
| **DonutChartCard** | **Part-to-whole** donut SVG + optional floating stats inside ChartCard. | Not **ProgressRing** (single percentage progress). Donut encodes a distribution / share; ProgressRing encodes one 0–100 progress value. |
| **ProgressRing** | Compact **circular progress** (0–100) with center value; console chrome. | Not **DonutChartCard** (multi-segment distribution in a reporting card). Not a KPI number without a ring (**MetricCard**). |

---

## Feedback & status

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **AlertBanner** | Operational **status message** with tone, optional description / icon / action. | Not a KPI (**MetricCard**), not a Badge chip, not an investigation action row. Use for transient or persistent console signals. |
| **Badge** | Compact **status chip** (label + optional dot); inline metadata. | Not a banner (**AlertBanner**), not a segmented filter (**SegmentedControl**). |

---

## Actions & inputs

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **Button** | Primary kit **action** control (variants, sizes, loading). | Not InvestigationCard’s PDF-local action buttons; not a module-sized hit target (**ModuleCard**). |
| **TextField** | Labeled **text input** with hint/error. | Not a select (**SelectField**), not a boolean (**Switch**). |
| **SelectField** | Labeled **native select** for one option from a list (often many options / forms). | Not **SegmentedControl** (few always-visible options). Prefer Select when options are long, dynamic, or form-like. |
| **SegmentedControl** | **Mutually exclusive** visible segments (filters / view modes). | Not **SelectField** (dropdown). Not **Switch** (boolean). Prefer when 2–~5 options should stay on screen. |
| **Switch** | Labeled **boolean** toggle. | Not multi-option (**SegmentedControl** / **SelectField**). |

---

## Chrome & navigation affordances

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **Scrollbar** | Presentational **vertical scroll chrome** (track + thumb capsules); PDF ALERT p.18 (formerly MISCELÁNEAS p.13). | Not **Switch** (boolean track/thumb). Not a scroll-container wrapper and not native `::-webkit-scrollbar` styling of arbitrary overflow. Consumer owns position (`value`) and region sync. |

---

## Data density

| Component | Role | Nearest neighbors / boundary |
|-----------|------|------------------------------|
| **DataTable** | Dense **tabular** operational rows (wrap + table). | Not a metrics row of cards (**MetricCard**), not a task board (**TaskCard**). Use for comparable columns across many entities. |

---

## Quick disambiguation

```text
Need a number on a dashboard?
  → one KPI          → MetricCard
  → many metrics on one entity → InvestigationCard (or ModuleCard if the card is a module entry)
  → % complete       → ProgressRing
  → share / mix      → DonutChartCard

Need a card-shaped thing?
  → generic panel    → Card
  → task             → TaskCard
  → investigation    → InvestigationCard
  → module hub tile  → ModuleCard
  → chart frame      → ChartCard (+ chart variant)

Need the user to choose?
  → boolean          → Switch
  → few on-screen    → SegmentedControl
  → list / form      → SelectField
  → trigger action   → Button (or InvestigationCard actions only inside that card)
```
