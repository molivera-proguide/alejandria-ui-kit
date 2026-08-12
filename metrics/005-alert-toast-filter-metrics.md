# Métricas — 005-alert-toast-filter

## Refine — 2026-08-11
- command_origin: sdd-refine
- rondas_de_preguntas: 12
- categorias_faltantes: 3
- categorias_ambiguas: 2
- alertas_seguridad: 0

## Validate — 2026-08-11
- command_origin: sdd-validate
- gaps_encontrados: 3
- cobertura_inicial: 89%
- iteration_number: 1

## Reporte completo — 2026-08-12T14:05:28Z

### 📊 Reporte de Esfuerzo SDD

**Contexto de ejecución**
- **feature_id**: 005-alert-toast-filter
- **command_origin**: sdd-implement
- **iteration_number**: 1
- **timestamp**: 2026-08-12T14:05:28Z

**Eficiencia de la IA (DX)**
- DX_MET_001 **Ciclos de Autocorrección**: 0 post-verificación en esta ejecución — las
  9 tasks (3 componentes nuevos, 3 íconos, 3 retrofits, docs) verificaron limpio en el
  primer pase de Storybook (topbar, `AlertBar`, `FilterField` 400×50px medido,
  `Toast` con auto-dismiss verificado click a click a los 4000ms exactos, barra de
  progreso/"..." en Kanban, dataset completo en Finalizadas). Nota de contexto: las
  correcciones de ancho de panel/botón "VER MÁS"/z-index que motivaron esta feature
  ocurrieron en turnos anteriores, sobre código de `004-familia-tareas`, antes de que
  `005-alert-toast-filter` existiera como feature formal — no cuentan para el
  Rework Ratio de esta feature puntual.
- DX_MET_002 **Consultas de Clarificación**: 0 — toda la ambigüedad se resolvió en
  `/sdd-refine`/`/sdd-validate` (sesión previa).
- DX_MET_003 **Interacciones Totales**: 1 (comando `/sdd-implement` único).

**Análisis de Retrabajo**
- DX_MET_004 **Causa Raíz**: no aplica — 0 ciclos de autocorrección post-verificación.
- DX_MET_005 **Resiliencia**: no se alcanzó ningún rate-limit ni límite de tokens.
- DX_MET_006 **Token Budget**: no disponible en este entorno (mismo motivo que
  `004-familia-tareas` — `ccusage` no instalado, no se instala como efecto colateral).

**Rework Ratio (calculado)**
- **Tareas totales en tasks.md**: 9 (T001–T009)
- **DX_MET_001 acumulado (esta feature)**: 0
- **Entradas en DECISIONS.md para esta feature**: 1 (adaptación del loop TDD)
- **Rework Ratio estimado**: (0 + 1) ÷ 9 = **0.11**

🟢 Rework Ratio muy bajo.

**Gaps conocidos, no resueltos en esta iteración (flagueados, no corregidos en
silencio):**
- `knowledge/components/TaskCard.md`/`.spec.md` siguen sin documentar `viewMore` —
  gap heredado de `004-familia-tareas`, tampoco estaba en el scope de `tasks.md` de
  esta feature. Sigue recomendado para `/sdd-checklist`/`/sdd-review`.
- `pnpm tsc --noEmit` reporta el mismo patrón preexistente (`render` sin `args` en
  stories de Storybook) también en `Toast.stories.tsx` § `AutoDismiss` — coherente
  con los 6 archivos ya señalados en `004-familia-tareas`, no es un error nuevo de
  esta feature, es la misma convención ya aceptada en el repo.

## Corrección post-entrega — 2026-08-12
- command_origin: sdd-implement (feedback de Luna, comparando Storybook contra el PDF real)
- ciclos_autocorreccion_post_entrega: 1 — encontrado por Luna (captura de `DetailSheet`
  § `Fichas`: título envuelto en 2 líneas + superposición visual con el gráfico), causa
  raíz investigada con `design-reference.pdf` p.5 "FICHAS" (hoja de spec limpia, no
  usada hasta este punto). Resultó en 4 fixes reales — ver `DECISIONS.md` 2026-08-12.
- rework_ratio_actualizado: (0 + 2) ÷ 9 = 0.22 (2 entradas en DECISIONS.md para esta
  feature: adaptación TDD + esta corrección — sigue 🟢 bajo, pero ya no es 0.11)

## Corrección post-entrega #2 — 2026-08-12
- command_origin: sdd-implement (feedback de Luna: "las taskcard no tienen fondo, se ven fusionadas con el fondo")
- ciclos_autocorreccion_post_entrega: 1 más (total 2) — bug real de stacking context en
  `.ds-task` (variant `default`), latente desde antes de esta feature, nunca detectado
  porque ninguna screen combinaba `variant="default"` con `BackgroundTextureDots` hasta
  ahora. Fix: `isolation: isolate`. No verificable con captura de pantalla en este
  entorno — pendiente confirmación visual de Luna.
- rework_ratio_actualizado: (0 + 3) ÷ 9 = 0.33 (3 entradas en DECISIONS.md: adaptación
  TDD + corrección DetailSheet/headings + bug de TaskCard)

## Review — 2026-08-12T00:00:00Z
- command_origin: sdd-review
- resultado: PENDIENTE
- criterios_sin_test: 12 (todos — sin framework de test instalado, decisión ya aceptada)
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0 (no aplica, ProGuide no instalado)
- structural_issues: 2 (TaskCard.md con claims de accesibilidad desactualizadas por fix-001;
  TaskCard.md sin documentar prop viewMore — gap preexistente)

## Review — 2026-08-12T01:00:00Z
- command_origin: sdd-review
- resultado: APROBADO
- criterios_sin_test: 12 (sin framework de test instalado, decisión ya aceptada)
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0 (no aplica, ProGuide no instalado)
- structural_issues: 1 (duplicación de topbar en las 3 screens — análoga a D015, no bloqueante)
