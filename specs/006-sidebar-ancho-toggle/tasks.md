# Tasks — 006-sidebar-ancho-toggle

| ID | US | Descripción | Archivos |
|---|---|---|---|
| T001 | — | Validar entorno existente (`pnpm install`) | — |
| T002 | US-1 | Sweep PyMuPDF de `design-reference.pdf` p.13 y `Alejandria - Agosto 2026.pdf` p.5/8/9 (Downloads); fijar ancho expandido/colapsado, crear tokens dedicados si difieren de los reutilizados | `styles.css` (modificado) |
| T003 | US-2 | Eliminar `SideBarChevron`/`button.ds-sidebar__edge-toggle` de `SideBar.tsx`; migrar `aria-expanded`/`aria-label` al heading "Menú"; ajustar `SideBar.stories.tsx` | `components/SideBar.tsx`, `components/SideBar.stories.tsx` (modificados) |
| T004 | US-3 | Cablear `useState` real de colapso en `TareasPendientes` (heading + ícono topbar) | `screens/tareas-pendientes/TareasPendientes.stories.tsx` (modificado) |
| T005 | US-4 | Cablear `useState` real de colapso en `TareasKanban` | `screens/tareas-kanban/TareasKanban.stories.tsx` (modificado) |
| T006 | US-5 | Cablear `useState` real de colapso en `TareasFinalizadas` | `screens/tareas-finalizadas/TareasFinalizadas.stories.tsx` (modificado) |
| T007 | US-2/3/4/5/6 | Verificar en Storybook: (a) las 3 stories propias de `SideBar` (`Expanded`/`Collapsed`/`Playground`) tras sacar el edge-toggle; (b) el toggle real funcionando con click en heading "Menú" e ícono topbar en las 3 screens de Tareas; (c) `Home`, `Dashboard`, `CargaDeFormulario` sin regresión visual con el nuevo ancho | — (verificación, sin archivos nuevos) |
| T008 | — | Actualizar `knowledge/components/SideBar.md` (contrato/DOM/tokens/Known Limitations/Changelog `0.2.0`) y cerrar el hallazgo en `knowledge/component-roadmap.md` | `knowledge/components/SideBar.md`, `knowledge/component-roadmap.md` (modificados) |
| T009 | — | Enmendar MUST-3 de `specs/004-familia-tareas/constitution.md` + registrar la decisión en `DECISIONS.md` | `specs/004-familia-tareas/constitution.md`, `DECISIONS.md` (modificados) |
