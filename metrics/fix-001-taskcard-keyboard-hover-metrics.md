# Fix — fix-001-taskcard-keyboard-hover

## Fix — 2026-08-12T00:00:00Z
- command_origin: sdd-fix
- archivos_tocados: 2 (TaskCard.tsx, styles.css)
- test_reproductor: sin framework de test instalado (mismo criterio ya establecido 6
  veces en DECISIONS.md para este proyecto) — verificación funcional en Storybook vía
  `getBoundingClientRect`/`dispatchEvent(KeyboardEvent)` real (Enter y Espacio, ambos
  abren `DetailSheet`), y confirmando que Kanban/Finalizadas (sin onClick) quedan sin
  tabIndex/clase interactiva.
- colisiones_detectadas: 2 (mismo owner que 004-familia-tareas/005-alert-toast-filter,
  no bloqueante)
