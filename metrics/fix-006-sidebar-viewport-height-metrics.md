# Fix — fix-006-sidebar-viewport-height

## Fix — 2026-08-13T00:00:00Z
- command_origin: sdd-fix
- archivos_tocados: 1 (packages/ui/src/styles.css)
- test_reproductor: sin framework de test instalado (mismo criterio ya establecido en
  DECISIONS.md) — verificación visual en Storybook (Tareas Pendientes, grilla larga de
  TaskCard), feedback directo de Luna reportando la SideBar estirada requiriendo scroll
  de página para ver los ítems del final.
- colisiones_detectadas: 0 (no hay features OPEN al momento de este fix)
- nota: zona de alto riesgo de regresión (3 hallazgos previos documentados en
  006-sidebar-ancho-toggle sobre este mismo selector) — cambio acotado a 3 propiedades
  (align-self/height/position), sin tocar padding/overflow/width.
