# Plan — 003-home-dashboard

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- `source_root`: `packages/ui/src/`, precedente estructural:
  `screens/carga-de-formulario/`.

## Estructura (4 archivos nuevos de código + 2 docs, 0 exports)
```
packages/ui/src/screens/
├── home/
│   ├── Home.stories.tsx     (nuevo — composición completa, sin .tsx aparte)
│   └── home.css              (nuevo)
└── dashboard/
    ├── Dashboard.stories.tsx (nuevo)
    └── dashboard.css          (nuevo)

knowledge/screens/
├── home.md        (nuevo — formato de carga-de-formulario.md)
└── dashboard.md    (nuevo)
```

## Artefacto a construir
1. **Home** — `SideBar` expandido (izq, fija) · columna central con
   `Asistente` completo arriba (ancho completo) y, debajo, "PRÓXIMOS
   EVENTOS" (`CalendarCard` ×6) y "RESUMEN DE PRODUCTIVIDAD" (`MetricCard`
   ×2 + `DonutChartCard` 75%, corregido 2026-08-11 desde `ProgressRing`)
   **lado a lado** (2 columnas iguales, corregido 2026-08-11 — la primera
   pasada las apiló verticalmente) · "TAREAS EN FECHA" (`TaskCard`
   scrolleable) (der, fija). Fondo `--ds-color-pdf-surface`.
2. **Dashboard** — `SideBar` colapsado + grilla CSS `repeat(4, 1fr)` × 2
   filas de `ModuleCard` (8 total), algunas con 2 `ModuleMetric`.
3. Screen docs siguiendo el template de `carga-de-formulario.md`.

## Fuera de este plan
Sin instalar test framework ni linter. Sin export en `index.ts` — Home y
Dashboard son Storybook-only, igual que `CargaDeFormulario`. No se toca
ningún componente de `components/` (cero gaps confirmados en `input.md`).

## Docs a actualizar
- `knowledge/screens/home.md`, `knowledge/screens/dashboard.md` — nuevos.
- `knowledge/component-roadmap.md` — sin cambios adicionales (el fix de p.3
  ya se aplicó durante `/sdd-refine`, commit `db2648f`).
