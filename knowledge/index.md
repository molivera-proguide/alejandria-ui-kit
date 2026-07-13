# Alejandria UI Kit — Knowledge Base

**Version:** 0.1.0  
**Package:** `@alejandria/ui-kit`  
**Last stabilized:** 2026-07-13

This is the main entry point for the Alejandria UI Kit knowledge base. It is written for AI agents and humans who need an accurate map of what exists in the repository today — not a roadmap of future work.

**Rule:** Only artifacts that exist in the repository are listed here. Empty folders and audit-only concepts are called out explicitly.

**Decisions:** Follow [`reasoning/decision-order.md`](./reasoning/decision-order.md) — the single authoritative Decision Order (keyed by task type). Active plan: [`roadmap.md`](./roadmap.md).

---

## Project overview

Alejandria UI Kit is a monorepo with:

| Path | Role |
|------|------|
| `packages/ui` | React component library (`@alejandria/ui-kit`), CSS tokens, Storybook |
| `apps/web` | Vite demo app consuming the package |
| `knowledge/` | AI-first documentation (this tree) |

The design system targets operational consoles: KPIs, tasks, alerts, modules, and charts. Storybook is the interactive catalog; `knowledge/` is the structured reference for agents.

**Manifest:** [`design-system-manifest.json`](./design-system-manifest.json) — machine-readable index of every documented artifact.

---

## Folder organization

```
knowledge/
├── index.md                      ← you are here
├── design-system-manifest.json   ← machine-readable registry
├── roadmap.md                    ← active knowledge-architecture plan
├── components/                   ← one doc per exported component
├── patterns/                     ← Storybook composed UI patterns
├── screens/                      ← Storybook fullscreen screens
├── specs/                        ← M1 numeric specs + token inventory
├── tokens/                       ← M2 token plan, migration map, overview
├── guidelines/                   ← M2 design language
├── reasoning/                    ← M3 decision order, selection, reuse rubric
├── templates/                    ← doc templates (authoring aid)
└── audit/                        ← inventory, coverage, visual, pattern, roadmap audits
```

| Folder | Status | Contents |
|--------|:------:|----------|
| `components/` | Documented | Component markdown files (see table below; includes InvestigationCard) |
| `patterns/` | Documented | Patterns from Storybook composed stories |
| `screens/` | Documented | 1 screen (`OperationsConsole`) |
| `specs/` | Documented | Schema, tokens inventory, per-component `*.spec.md` (M1) |
| `tokens/` | Documented | `README.md`, `token-plan.md`, `migration-map.md` (M2) |
| `guidelines/` | Documented | `design-language.md` (M2) |
| `reasoning/` | Documented | Decision order, component selection, reuse rubric (M3) |
| `templates/` | Authoring | `component.md` template |
| `audit/` | Reference | Read-only audits; not product API docs |

---

## Components

Public exports from `packages/ui/src/index.ts` have dedicated docs under `knowledge/components/` (18 exports). InvestigationCard is documented and exported; it may still be pending a `components[]` manifest entry (see [`roadmap.md`](./roadmap.md) parallel track).

| Component | Doc | Storybook |
|-----------|-----|-----------|
| AlertBanner | [AlertBanner.md](./components/AlertBanner.md) | `Alejandria/AlertBanner` |
| Badge | [Badge.md](./components/Badge.md) | `Alejandria/Badge Chip` |
| BarChartCard | [BarChartCard.md](./components/BarChartCard.md) | `Alejandria/ChartCard` (nested) |
| Button | [Button.md](./components/Button.md) | `Alejandria/Button` |
| Card | [Card.md](./components/Card.md) | `Alejandria/Card` |
| ChartCard | [ChartCard.md](./components/ChartCard.md) | `Alejandria/ChartCard` |
| DataTable | [DataTable.md](./components/DataTable.md) | `Alejandria/DataTable` |
| DonutChartCard | [DonutChartCard.md](./components/DonutChartCard.md) | `Alejandria/ChartCard` (nested) |
| InvestigationCard | [InvestigationCard.md](./components/InvestigationCard.md) | `Alejandria/InvestigationCard` |
| LineChartCard | [LineChartCard.md](./components/LineChartCard.md) | `Alejandria/ChartCard` (nested) |
| MetricCard | [MetricCard.md](./components/MetricCard.md) | `Alejandria/MetricCard` |
| ModuleCard | [ModuleCard.md](./components/ModuleCard.md) | `Alejandria/ModuleCard` |
| ProgressRing | [ProgressRing.md](./components/ProgressRing.md) | `Alejandria/ProgressRing` |
| SegmentedControl | [SegmentedControl.md](./components/SegmentedControl.md) | `Alejandria/SegmentedControl` |
| SelectField | [SelectField.md](./components/SelectField.md) | `Alejandria/SelectField` |
| Switch | [Switch.md](./components/Switch.md) | `Alejandria/Switch` |
| TaskCard | [TaskCard.md](./components/TaskCard.md) | `Alejandria/TaskCard` |
| TextField | [TextField.md](./components/TextField.md) | `Alejandria/TextField` |

Component docs follow the structure in [`templates/component.md`](./templates/component.md). For which component to pick, see [`reasoning/component-selection.md`](./reasoning/component-selection.md).

---

## Patterns

Patterns are **reusable compositions** observed in Storybook stories. None are exported as package layout components; they exist as story markup.

Only patterns with a Storybook composed (or layout-intent) story are documented. Demo-app-only compositions (`apps/web` navigation rail, map hero, event feed, etc.) are **not** registered here.

| Pattern | Doc | Primary story |
|---------|-----|---------------|
| Operations Console | [operations-console.md](./patterns/operations-console.md) | `Alejandria/Overview/OperationsConsole` |
| Command Header | [command-header.md](./patterns/command-header.md) | `Alejandria/Overview/OperationsConsole` |
| Metrics Row | [metrics-row.md](./patterns/metrics-row.md) | `Alejandria/MetricCard/Tones` |
| Task Board | [task-board.md](./patterns/task-board.md) | `Alejandria/TaskCard/Tones` |
| Module Grid | [module-grid.md](./patterns/module-grid.md) | `Alejandria/ModuleCard/GridExample` |
| Chart Gallery | [chart-gallery.md](./patterns/chart-gallery.md) | `Alejandria/ChartCard/Gallery` |
| Mission Panel | [mission-panel.md](./patterns/mission-panel.md) | `Alejandria/Card/WithActionsAndFooter` |
| Alert Stack | [alert-stack.md](./patterns/alert-stack.md) | `Alejandria/AlertBanner/Tones` |
| Actionable Alert | [actionable-alert.md](./patterns/actionable-alert.md) | `Alejandria/AlertBanner/WithAction` |
| Filter Pair | [filter-pair.md](./patterns/filter-pair.md) | `Alejandria/SelectField/CompactFilters` |
| Operational Table | [operational-table.md](./patterns/operational-table.md) | `Alejandria/DataTable/DenseOperationalRows` |

Each pattern doc includes: Purpose, Responsibilities, Layout structure, Components involved, Composition rules, Responsive behavior, When to use, When not to use, Related patterns, Known limitations.

---

## Screens

Screens are **fullscreen page compositions** in Storybook.

| Screen | Doc | Storybook |
|--------|-----|-----------|
| Operations Console | [operations-console.md](./screens/operations-console.md) | `Alejandria/Overview/OperationsConsole` |

No other Storybook screens exist today. The following are **not** documented because they have no Storybook screen:

- Login
- Ficha (detail sheet)
- Modal / asistente
- Módulos hub (only Module Grid pattern)
- Reporting dashboard (only Chart Gallery pattern)
- Full Operations Center from `apps/web` (demo app only)

Each screen doc includes: Purpose, User goals, Main regions, Patterns used, Components used, Navigation, Responsive behavior, Accessibility considerations, Known limitations.

---

## Specs (numeric foundation)

Measured, citable values from CSS and component docs live under [`knowledge/specs/`](./specs/README.md):

| Doc | Path |
|-----|------|
| Layer overview | [specs/README.md](./specs/README.md) |
| Schema | [specs/SCHEMA.md](./specs/SCHEMA.md) |
| Token inventory | [specs/tokens-inventory.md](./specs/tokens-inventory.md) |
| Per-component specs | [specs/components/](./specs/components/) |

Specs record facts and deltas; they do not redesign or tokenize. Registered in the manifest `specs[]`.

---

## Tokens

Design tokens are CSS custom properties (`--ds-*`) in `packages/ui/src/styles.css`, documented and planned under [`knowledge/tokens/`](./tokens/README.md):

| Doc | Path |
|-----|------|
| Token layer overview | [tokens/README.md](./tokens/README.md) |
| Token plan | [tokens/token-plan.md](./tokens/token-plan.md) |
| Migration map | [tokens/migration-map.md](./tokens/migration-map.md) |
| Intent taxonomy (roles) | [guidelines/design-language.md](./guidelines/design-language.md) |

M2b applied **mechanical** literal→`var()` swaps (byte-identical). Visual-gated rows remain for the Fidelity milestone — see the migration map and [`roadmap.md`](./roadmap.md).

---

## Guidelines

| Doc | Path |
|-----|------|
| Design language | [guidelines/design-language.md](./guidelines/design-language.md) |

For historical analysis and prioritization, see `knowledge/audit/` (inventory, coverage, visual audit, pattern audit, roadmap). Audits are reference material, not guidelines. The **active** plan is [`roadmap.md`](./roadmap.md) (not `audit/design-system-roadmap.md`).

---

## Governance & reasoning

Process and decision docs (registered in the manifest `governance[]`):

| Doc | Path |
|-----|------|
| Knowledge architecture roadmap | [roadmap.md](./roadmap.md) |
| Agent playbook (workflow) | [agent-playbook.md](./agent-playbook.md) |
| Design principles | [design-principles.md](./design-principles.md) |
| Design system rules | [design-system-rules.md](./design-system-rules.md) |
| Anti-patterns | [anti-patterns.md](./anti-patterns.md) |
| Visual analysis protocol | [visual-analysis-protocol.md](./visual-analysis-protocol.md) |
| Reasoning layer overview | [reasoning/README.md](./reasoning/README.md) |
| **Decision Order (authoritative)** | [reasoning/decision-order.md](./reasoning/decision-order.md) |
| Component selection taxonomy | [reasoning/component-selection.md](./reasoning/component-selection.md) |
| Reuse vs variant vs new | [reasoning/reuse-rubric.md](./reuse-rubric.md) |

---

## Recommended reading order

For AI agents:

1. `knowledge/index.md` (this file)
2. `knowledge/reasoning/decision-order.md` (how to decide)
3. `design-system-manifest.json`
4. `knowledge/specs/` (numeric truth) and/or `knowledge/tokens/` + `guidelines/design-language.md` (vocabulary) as the task requires
5. Screen documentation
6. Pattern documentation
7. Component documentation (+ selection taxonomy when choosing an export)
8. Source code
9. Storybook examples

---

## Design System Architecture

The following hierarchy represents composition relationships between documented artifacts.
Screens are composed of patterns.
Patterns are composed of components.
Components are the smallest reusable UI building blocks.

```text
Screen
 ├── Pattern
 │     ├── Component
 │     ├── Component
 │     └── Component
 │
 └── Pattern
       ├── Component
       └── Component
```

Current graph:

Operations Console (Screen)
├── Command Header
├── Metrics Row
└── Task Board

Module Grid
└── ModuleCard

Chart Gallery
├── ChartCard
├── BarChartCard
├── LineChartCard
└── DonutChartCard

Metrics Row
└── MetricCard

Task Board
└── TaskCard

Operational Table
└── DataTable

Filter Pair
├── SelectField
├── TextField
└── SegmentedControl

Alert Stack
└── AlertBanner

Mission Panel
├── Card
├── Button
└── ProgressRing

---

## Navigation instructions for AI agents

### How to find the right doc

1. **Start here** (`knowledge/index.md`) or load [`design-system-manifest.json`](./design-system-manifest.json).
2. **How to decide** → [`reasoning/decision-order.md`](./reasoning/decision-order.md); selection → [`reasoning/component-selection.md`](./reasoning/component-selection.md); reuse → [`reasoning/reuse-rubric.md`](./reasoning/reuse-rubric.md).
3. **Component API / behavior** → `knowledge/components/<Name>.md`, then source in `packages/ui/src/components/`.
4. **Measured values / deltas** → `knowledge/specs/`.
5. **How pieces are arranged** → `knowledge/patterns/`.
6. **Full-page composition** → `knowledge/screens/`.
7. **Visual tokens / vocabulary** → `knowledge/tokens/` and `guidelines/design-language.md`; implemented values in `packages/ui/src/styles.css`.
8. **Plan / milestone scope** → [`roadmap.md`](./roadmap.md).
9. **What is missing or partial** → `knowledge/audit/` (do not treat audits as implemented features).

### Ground rules

- **Do not invent** components, patterns, screens, tokens, or guidelines that are not in the manifest (or otherwise registered as package exports with docs).
- **Prefer Storybook + package source** as implementation truth; knowledge docs describe what exists.
- **Patterns are not package exports.** Compose from components; copy layout recipes from pattern docs.
- **Screens ≠ demo app.** Only Storybook fullscreen compositions are screens in this knowledge base.
- **Empty folders mean no docs**, not “use defaults.” Folders that are still empty should be called out as empty; `tokens/`, `guidelines/`, `specs/`, and `reasoning/` are documented — do not treat them as empty.
- **Avoid duplicating** component API details inside pattern/screen docs; link to component docs instead.
- **Spanish component docs** may use Spanish prose; pattern/screen/index docs use English section contracts for agent stability.

### Suggested resolution order for a UI task

```
index / manifest
    → reasoning/decision-order.md (task type)
        → screen (if full page)
            → patterns (regions)
                → components (API) + specs (numbers)
                    → tokens / design-language / styles.css
                        → Storybook story (live example)
```

### Related audit documents

| Audit | Path |
|-------|------|
| Inventory | [audit/design-system-inventory.md](./audit/design-system-inventory.md) |
| Coverage | [audit/design-system-coverage.md](./audit/design-system-coverage.md) |
| Visual | [audit/visual-audit.md](./audit/visual-audit.md) |
| Patterns | [audit/pattern-audit.md](./audit/pattern-audit.md) |
| Roadmap (historical snapshot) | [audit/design-system-roadmap.md](./audit/design-system-roadmap.md) |

Audits may mention future or PDF-only concepts. Those concepts are **not** part of the stabilized knowledge base until they have a file under `components/`, `patterns/`, `screens/`, `tokens/`, `guidelines/`, `specs/`, or `reasoning/` and an entry in the manifest. Prefer [`roadmap.md`](./roadmap.md) over the audit roadmap for the current plan.
