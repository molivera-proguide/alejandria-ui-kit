---
id: component-roadmap
name: Component Build Roadmap (from design timeline v2)
status: active
last_reviewed: 2026-07-17
source: knowledge/references/design-reference.pdf (v2, p.2 LÍNEA DE TIEMPO)
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
components are marked done in Diseño; **Asistente, Side bar, Skeleton, Calendar
card and Empty are marked pending in Desarrollo.**

Cross-checked against the actual code (`packages/ui/src/components/*`,
`packages/ui/src/patterns/*`) on 2026-07-17: the 5 pending items are exactly the 5
components that don't exist in code. The 6 items marked done in both rows
(Tarjetas → `Card`/`TaskCard`, Investigation card → `InvestigationCard`, Ficha →
`DetailSheet`, Módulos → `ModuleCard`, Gráficos → `ChartCard` family, Metric card
→ `MetricCard`) all have a working implementation already. The design timeline is
an accurate proxy for build status — no separate audit was needed to confirm gaps.

## Gap table

| Component (PDF name) | PDF page | Diseño | Desarrollo | Code today |
|---|---|:---:|:---:|---|
| Tarjetas | p.3 | ✅ | ✅ | `Card.tsx`, `TaskCard.tsx` |
| Investigation card | p.4 | ✅ | ✅ | `InvestigationCard.tsx` |
| Ficha | p.5 | ✅ | ✅ | `patterns/detail-sheet/DetailSheet.tsx` — **built but not exported from the main `index.ts` barrel** |
| Módulos | p.6 | ✅ | ✅ | `ModuleCard.tsx` |
| Gráficos | p.9–10 | ✅ | ✅ | `ChartCard.tsx`, `BarChartCard.tsx`, `DonutChartCard.tsx`, `LineChartCard.tsx` |
| Metric card | p.11 | ✅ | ✅ | `MetricCard.tsx` |
| **Asistente** | p.12 | ✅ | ⬜ | not found — no chat/assistant component anywhere in `src/` |
| **Side bar** | p.13 | ✅ | ⬜ | not found — no Sidebar/nav-rail component (blank page in PDF v1; fully specified in v2) |
| **Skeleton** | p.14 | ✅ | ⬜ | not found — no loading-skeleton component |
| **Calendar card** | p.15 | ✅ | ⬜ | not found — no calendar/date-widget component |
| **Empty** | p.16 | ✅ | ⬜ | not found — no empty-state component |
| Form | p.17 | not on timeline | not on timeline | no dedicated `Form`; scattered field primitives exist (`TextField`, `SelectField`, `SegmentedControl`, `Switch`, `DataTable`) |
| Alert | p.18 | not on timeline | not on timeline | `AlertBanner.tsx` — already built, naming differs from PDF ("Alert") |

**Note on Form and Alert:** neither appears on the p.2 timeline at all, so they sit
outside the design team's own tracked scope. Alert is a non-issue — `AlertBanner`
already ships. Form is the one open question: its p.17 spec block is nearly
word-for-word identical to p.16 Empty (same icon/title/text/button spec, no field
list, no layout, no validation states) — it reads as an unfinished placeholder
page, not a real spec. **Recommendation: confirm the actual Form spec with design
before scoping a build.**

## Build order (5 confirmed gaps)

Ordered by size/reuse first, structural complexity last — each one after the
first two makes the later ones easier or is needed before them:

1. **Empty** — smallest, no dependencies. Immediately reusable inside `DataTable`
   (empty rows), list-style patterns, and any future Side bar/Módulos-adjacent
   screen with no data yet.
2. **Skeleton** — smallest, no dependencies. Pairs with existing cards
   (`MetricCard`, `ChartCard` family, `InvestigationCard`, `TaskCard`) as their
   loading state; no reason to gate it behind anything else.
3. **Calendar card** — self-contained widget, no dependency on the other 4.
4. **Side bar** — structural/app-shell component. Overlaps with the "nav rail"
   gap already flagged as backlog from the MVP-4 consumer eval (D5 backlog: see
   the `distribution-mvp-track` memory) — worth building once, covering both asks.
5. **Asistente** — highest complexity (chat UI, dynamic per-user suggestions,
   attach-file affordance). Do this last; it has no dependents among the other 4
   and benefits most from the design/behavior questions (what drives "tareas
   rápidas"?) being answered separately from implementation.

## Quick win (not a new build)

`DetailSheet` (Ficha) exists in `packages/ui/src/patterns/detail-sheet/` but is
not exported from `packages/ui/src/index.ts`. Exporting it is a docs/barrel fix,
not a component build — do it independently of the order above.
