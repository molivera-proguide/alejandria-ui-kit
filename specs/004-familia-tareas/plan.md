# Plan — 004-familia-tareas

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- `source_root`: `packages/ui/src/`, precedente estructural:
  `screens/home/`, `screens/dashboard/`.

## Estructura (6 archivos nuevos + 3 modificados + 3 docs, 0 exports)
```
screens/tareas-pendientes/{TareasPendientes.stories.tsx,tareas-pendientes.css} (nuevos — useState local)
screens/tareas-kanban/{TareasKanban.stories.tsx,tareas-kanban.css}             (nuevos — estático)
screens/tareas-finalizadas/{TareasFinalizadas.stories.tsx,tareas-finalizadas.css} (nuevos — estático)
components/TaskCard.tsx                     (modificado — slot "VER MÁS")
patterns/detail-sheet/DetailSheet.tsx       (modificado — prop `onClose`)
patterns/detail-sheet/detail-sheet.css      (modificado — estilo --c, ancho panel)
knowledge/screens/{tareas-pendientes,tareas-kanban,tareas-finalizadas}.md (nuevos)
```

## Artefacto a construir
1. **TareasPendientes** — `SideBar` expandido · buscador + filtro +
   `SegmentedControl` · grilla 12× `TaskCard` default. Click en card → guarda
   selección en `useState` → renderiza `DetailSheet` como overlay lateral
   ancho (usa el `onClose` nuevo para limpiar selección al click en "Cerrar").
2. **TareasKanban** — `SideBar` colapsado + 3 columnas fijas con `TaskCard`
   variant `kanban` (4/2/1), sin estado.
3. **TareasFinalizadas** — `SideBar` colapsado + selects + buscador + grilla
   8× `TaskCard` usando el slot nuevo "VER MÁS".
4. Screen docs siguiendo el template de `knowledge/screens/home.md`.

## Decisión — duplicación de config de `SideBar`
La config default (`primaryItems`/`secondaryItems`/`sidebarLogo`/`menuIcon`) se
copia igual una 4ta, 5ta y 6ta vez en las 3 screens nuevas (ya duplicada en
`carga-de-formulario`, `home`, `dashboard`). **Decisión explícita para esta
feature: se mantiene la duplicación, no se extrae helper compartido ahora** —
se revisita en una iteración de refactor aparte cuando el equipo lo priorice.

## Fuera de este plan
Sin instalar test framework ni linter. Sin export en `index.ts`. No se
construye p.6. No se toca `SideBar`/`SegmentedControl`/`MetricCard`/
`LineChartCard`/`LinearBarChartCard`/`SelectField`.

## Docs a actualizar
- `knowledge/screens/tareas-pendientes.md`, `tareas-kanban.md`,
  `tareas-finalizadas.md` — nuevos.
- `knowledge/component-roadmap.md` — corregir filas p.5/p.6/p.7 (una sola
  pantalla) y cerrar la fila de "2026-07-28 sizing pass" (kanban).
