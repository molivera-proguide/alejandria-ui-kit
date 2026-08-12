# Fix — fix-002-topbar-alertbar-fullwidth

## Fix — 2026-08-12T00:00:00Z
- command_origin: sdd-fix
- archivos_tocados: 3 (tareas-pendientes.css, tareas-kanban.css, tareas-finalizadas.css)
- test_reproductor: sin framework de test instalado (mismo criterio ya establecido en
  DECISIONS.md) — verificación funcional en Storybook vía `getBoundingClientRect` en las
  3 screens (barra full-width, íconos superpuestos y clickeables, altura sin regresión),
  medido primero contra "Alejandria - Agosto 2026.pdf" p.5 con PyMuPDF (`get_drawings()`).
- colisiones_detectadas: 2 (mismo owner que 004-familia-tareas/005-alert-toast-filter,
  no bloqueante)
