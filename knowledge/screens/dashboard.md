---
id: dashboard-screen
name: Dashboard
category: screen
status: draft
storybook: Alejandria/Screens/Dashboard
source: packages/ui/src/screens/dashboard/Dashboard.stories.tsx
layout: fullscreen
last_reviewed: 2026-08-11
---

# Dashboard

## Purpose

Fullscreen module-launcher screen — collapsed `SideBar` nav rail + an 8-card `ModuleCard`
grid (2 rows × 4 columns). Third screen in the `knowledge/screens/` +
`packages/ui/src/screens/` layer; zero new components, same reuse-only approach as
`carga-de-formulario` and `home`.

**Source:** "Alejandria - Agosto 2026.pdf" p.4 (see `knowledge/component-roadmap.md` §
"Screens triage" and `DECISIONS.md` for why the PDF itself isn't committed).

## User goals

- Launch into any of the platform's operational modules from a single overview grid.
- Reference `ModuleCard` with a mix of 1-row and 2-row `metrics` (`ModuleMetric[]`), both
  already supported by the existing component API.

## Main regions

| Region | Contents |
|--------|----------|
| **Nav rail** | `SideBar`, collapsed, same item set as `Home`/`Carga de Formulario` |
| **Module grid** | 8× `ModuleCard` (Investigaciones, Ciberseguridad, Evidencias, Género, Catástrofes, Despliegue, Bandeja, Usuarios), fixed 194×194px cards, `grid-template-columns: repeat(4, 194px)` |

Canvas: `--ds-color-pdf-surface` (`#060606`) background with `BackgroundTextureDots`
(`002-bg-texture`), `display: flex` (rail + main).

## Patterns used

None yet registered under `knowledge/patterns/` (`Module Grid` in `knowledge/patterns/`
documents the `ModuleCard` grid pattern generically, from `ModuleCard.stories.tsx`'s
`GridExample` — this screen is a fullscreen instance of that same idea, not a new pattern).

## Components used

`SideBar`, `ModuleCard`.

## Navigation

`SideBar` items and `ModuleCard`s have no `onClick` wired (static demo) — Storybook-only
composition, no routing.

## Responsive behavior

None. Fixed 4-column grid of fixed-size cards; narrow viewports will overflow
horizontally (same known limitation as `Home` / `Carga de Formulario`).

## Accessibility considerations

- `ModuleCard` is a native `<button>` per card — keyboard-focusable and activatable
  without additional wiring, per `ModuleCard.tsx`.
- Icons are decorative (`aria-hidden` on the icon wrapper, empty `alt` on the `<img>`),
  same convention as `ModuleCard.stories.tsx`.

## Known limitations

- **8th module icon reused, not new.** `Icons/Modules/` only ships 7 dedicated 180×180
  icons (Investigaciones, Ciberseguridad, Evidencias, Género, Catástrofes, Despliegue,
  Bandeja). The 8th card ("Usuarios") reuses `UsuarioIcon` (Menu, 50×50) — the closest
  semantic match available today, not a newly generated asset. Producing a dedicated
  180×180 "Usuarios" module icon is out of scope for this feature (asset work, not a
  component gap).
- Static demo data (module titles/metrics) — no real data source, same convention as
  `Carga de Formulario` / `Home`.
- No responsive layout.
