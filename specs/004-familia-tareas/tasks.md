# Tasks — 004-familia-tareas

| ID | US | Descripción | Archivos |
|---|---|---|---|
| T001 | — | Validar entorno existente (`pnpm install`) | — |
| T002 | US-1 | Componer Tareas Pendientes: `SideBar` expandido + buscador + filtro + `SegmentedControl` + grilla 12× `TaskCard` default — gate de fidelidad antes de fijar spacing/grid | `screens/tareas-pendientes/TareasPendientes.stories.tsx` (nuevo), `screens/tareas-pendientes/tareas-pendientes.css` (nuevo) |
| T003 | US-2 | Agregar prop `onClose` a `DetailSheet` (cablear botón "Cerrar") + estilo `--c` y ancho de panel lateral en `detail-sheet.css` — gate de fidelidad antes de fijar el ancho nuevo; cablear `useState` local en la screen para abrir/cerrar al click en `TaskCard`/"Cerrar" | `patterns/detail-sheet/DetailSheet.tsx` (modificado), `patterns/detail-sheet/detail-sheet.css` (modificado), `screens/tareas-pendientes/TareasPendientes.stories.tsx` |
| T004 | US-3 | Componer Tareas Kanban: `SideBar` colapsado + 3 columnas con `TaskCard` variant `kanban` (4/2/1) — gate de fidelidad antes de fijar el grid | `screens/tareas-kanban/TareasKanban.stories.tsx` (nuevo), `screens/tareas-kanban/tareas-kanban.css` (nuevo) |
| T005 | US-4 | Agregar slot visual "VER MÁS" a `TaskCard` (sin `onClick` funcional) y componer Tareas Finalizadas: `SideBar` colapsado + selects + buscador + grilla 8× `TaskCard` — gate de fidelidad antes de fijar la geometría del slot | `components/TaskCard.tsx` (modificado), `screens/tareas-finalizadas/TareasFinalizadas.stories.tsx` (nuevo), `screens/tareas-finalizadas/tareas-finalizadas.css` (nuevo) |
| T006 | — | Escribir `knowledge/screens/*.md` (3 nuevos, formato de `home.md`; `tareas-pendientes.md` incluye la nota de p.6 como alternativa descartada) y corregir `knowledge/component-roadmap.md` (filas p.5/p.6/p.7 + cierre de "2026-07-28 sizing pass") | `knowledge/screens/tareas-pendientes.md`, `tareas-kanban.md`, `tareas-finalizadas.md` (nuevos), `knowledge/component-roadmap.md` (modificado) |
