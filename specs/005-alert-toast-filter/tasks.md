# Tasks — 005-alert-toast-filter

| ID | US | Descripción | Archivos |
|---|---|---|---|
| T001 | — | Validar entorno existente (`pnpm install`) | — |
| T002 | — | Copiar los 3 íconos nuevos a `Icons/Menu/`, normalizando el nombre de archivo sin espacios (`OpenClose sidebar-50x50.svg` → `OpenCloseSidebar-50x50.svg`) + exportarlos en `Icons/index.ts` (`FiltroIcon` ya existe, se reusa) | `Icons/Menu/{Adelante,Atras,OpenCloseSidebar}-50x50.svg` (nuevos), `Icons/index.ts` (modificado) |
| T003 | US-1 | Construir `AlertBar` (2 tonos, franja full-width) — gate de fidelidad antes de fijar el CSS, aunque los valores ya vienen medidos del PDF en `input.md` | `components/AlertBar.tsx` (nuevo), `components/AlertBar.stories.tsx` (nuevo), `index.ts`, `styles.css` (modificados) |
| T004 | US-2 | Construir `Toast` (auto-dismiss 4000ms, un tono) — gate de fidelidad antes de fijar el CSS | `components/Toast.tsx` (nuevo), `components/Toast.stories.tsx` (nuevo), `index.ts`, `styles.css` (modificados) |
| T005 | US-3 | Construir `FilterField` (400×50px final, decorativo) — gate de fidelidad antes de fijar el CSS | `components/FilterField.tsx` (nuevo), `components/FilterField.stories.tsx` (nuevo), `index.ts`, `styles.css` (modificados) |
| T006 | US-4 | Retrofit Tareas Pendientes: topbar + reemplazar hack por `FilterField` — gate de fidelidad antes de fijar geometría del topbar | `screens/tareas-pendientes/TareasPendientes.stories.tsx`, `tareas-pendientes.css` (modificados) |
| T007 | US-5 | Retrofit Tareas Kanban: topbar + fila de `FilterField` + barra de progreso/"..." por columna — gate de fidelidad antes de fijar geometría nueva | `screens/tareas-kanban/TareasKanban.stories.tsx`, `tareas-kanban.css` (modificados) |
| T008 | US-6 | Retrofit Tareas Finalizadas: topbar + reemplazar `TextField` por `FilterField` + dataset completo (`creator`/`startDate`/`endDate`) | `screens/tareas-finalizadas/TareasFinalizadas.stories.tsx`, `tareas-finalizadas.css` (modificados) |
| T009 | — | Escribir `knowledge/components/{AlertBar,Toast,FilterField}.md` + `knowledge/specs/components/{AlertBar,Toast,FilterField}.spec.md` (nuevos); registrar en `design-system-manifest.json`/`knowledge/index.md` y actualizar los 3 `knowledge/screens/*.md` con el retrofit (modificados) | `knowledge/components/*.md`, `knowledge/specs/components/*.spec.md` (nuevos), `knowledge/design-system-manifest.json`, `knowledge/index.md`, `knowledge/screens/*.md` (modificados) |
