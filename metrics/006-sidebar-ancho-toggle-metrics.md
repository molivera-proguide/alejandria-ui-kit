# Métricas — 006-sidebar-ancho-toggle

> `feature_id` provisorio (`006-sidebar-ancho-toggle`) asignado en esta sesión de
> `/sdd-refine` — siguiente número libre en `specs/_registry/features.yaml` (últimos
> registrados: `005-alert-toast-filter`, `fix-002-topbar-alertbar-fullwidth`).
> `/sdd-generate` confirma o ajusta el `feature_id` definitivo al generar los
> artefactos.

## Refine — 2026-08-12T00:00:00Z
- command_origin: sdd-refine
- rondas_de_preguntas: 8
- categorias_faltantes: 3
- categorias_ambiguas: 1
- alertas_seguridad: 0

## Validate — 2026-08-12T00:00:00Z
- command_origin: sdd-validate
- gaps_encontrados: 1
- cobertura_inicial: 97%
- iteration_number: 1

---

## Reporte completo — 2026-08-12T18:30:00Z

### 📊 Reporte de Esfuerzo SDD

**Contexto de ejecución**
- **feature_id**: 006-sidebar-ancho-toggle
- **command_origin**: sdd-implement
- **iteration_number**: 1
- **timestamp**: 2026-08-12T18:30:00Z

**Eficiencia de la IA (DX)**
- DX_MET_001 **Ciclos de Autocorrección**: 0 — ningún fix de código de aplicación
  (`SideBar.tsx`, `styles.css`, las 3 screens) tras la verificación en Storybook; todo
  funcionó en el primer intento (ancho medido, edge-toggle eliminado, toggle real en
  las 3 screens, verificado con `getComputedStyle`/click real vía `javascript_tool`).
- DX_MET_002 **Consultas de Clarificación**: 1 — Luna interrumpió para preguntar por
  qué no estaba trabajando en `eval-loop`; derivó en una pregunta real de branching
  (mover el trabajo al checkout principal vs. mergear después vs. liberar el nombre de
  rama), resuelta con `AskUserQuestion`.
- DX_MET_003 **Interacciones Totales**: 3 (comando `/sdd-implement` inicial +
  interrupción de Luna + su respuesta a la pregunta de branching).

**Análisis de Retrabajo**
- DX_MET_004 **Causa Raíz**: ninguna causada por ambigüedad de spec — `tasks.md`/
  `constitution.md` de `006` se siguieron sin desvíos de código. El único retrabajo
  real fue de **infraestructura/proceso**, no de código: (1) este worktree
  (`claude/goofy-kepler-ac280c`) estaba parado en `main`, 47 commits atrás de
  `eval-loop` — se sincronizó con `git reset --hard eval-loop` antes de arrancar
  `/sdd-refine`; (2) git no permite tener `eval-loop` *checked out* en dos worktrees a
  la vez, así que todo el trabajo ya hecho en el worktree se migró al checkout
  principal vía patch (`git diff` + `git apply`) cuando Luna señaló el problema; (3) el
  puerto 6006 de Storybook estaba ocupado por otro proceso, y el script `storybook`
  del `package.json` tiene `-p 6006` hardcodeado (no acepta `--port` extra) — se invocó
  `storybook dev` directo vía `pnpm exec` en el puerto 6017 en su lugar.
- DX_MET_005 **Resiliencia**: no se alcanzó ningún rate-limit ni límite de tokens
  durante la tarea.

- DX_MET_006 **Token Budget** — Variante A (Claude Code, ccusage, tokens reales):

  Sesión `98bf21ee-13a6-4ab0-a18b-083585b8ee1f` (`metrics/sessions.jsonl`), filtrada
  por `sessionId` + `projectPath` (`C--Users-LunaVioletaGonzalez-Projects-alejandria-ui-kit-alejandria-ui-kit`).
  Cubre toda la sesión (`/sdd-refine` → `/sdd-generate` → `/sdd-validate` → `/sdd-log`
  → `/sdd-implement`), no solo el tramo de implementación.

  | Fila del reporte | Tokens |
  |---|---|
  | input_tokens | 441 |
  | output_tokens | 177,769 |
  | cache_creation_input_tokens | 694,804 |
  | cache_read_input_tokens | 61,273,026 |
  | **TOTAL** | **62,146,040** |

  - `session_ids`: [`98bf21ee-13a6-4ab0-a18b-083585b8ee1f`]
  - `source`: `ccusage`
  - `cacheReadTokens` domina el total (contexto releído: `knowledge/`, `styles.css`,
    los 4 artefactos SDD, y los dos PDFs medidos con PyMuPDF).

**Rework Ratio (calculado)**
- **Tareas totales en tasks.md**: 9 (T001-T009)
- **DX_MET_001 acumulado (todas las iteraciones de esta feature)**: 0
- **Entradas en DECISIONS.md para esta feature**: 2 (ampliación de T007 tras el gap de
  `/sdd-validate`; enmienda a `004-familia-tareas` MUST-3/PROHIBITED-1)
- **Rework Ratio estimado**: (0 + 2) ÷ 9 ≈ **0.22**

---

## Actualización — 2026-08-12T19:00:00Z (revisión visual de Luna, post-reporte)

Luna revisó Storybook con capturas antes de commitear (fuera del loop automatizado de
`/sdd-implement`) y encontró 3 regresiones reales de layout introducidas al sacar
`.ds-sidebar-shell` (T003): labels wrappeando (padding sin recalibrar para el nuevo
ancho), la sidebar sin llenar el alto en las 6 screens, y `BackgroundTextureDots`
pintándose por encima de la sidebar (orden de stacking). Las 3 se diagnosticaron en
vivo (medición de `scrollWidth`, `offsetHeight`, `position` computado — no a ojo) y se
corrigieron en `styles.css`. Ver `DECISIONS.md` (entrada "3 regresiones reales
encontradas en revisión visual").

- **DX_MET_001 actualizado**: 3 (labels wrap, altura, stacking — 3 causas raíz
  distintas, 3 fixes de CSS separados; ninguna requirió tocar `SideBar.tsx` ni las
  screens, solo `styles.css`).
- **Entradas en DECISIONS.md para esta feature**: 3 (+1 sobre el conteo anterior).
- **Rework Ratio estimado (actualizado)**: (3 + 3) ÷ 9 ≈ **0.67**.

## Actualización 2 — 2026-08-12T19:15:00Z (segunda ronda de revisión visual)

Luna encontró un 4º hallazgo, en una ronda separada: el badge de notificación
cortado en colapsado (`overflow: hidden` recortando el acento de esquina que
sobresalía 2.5px). Fix quirúrgico de 1 línea (`right: 3px` solo en colapsado),
medido en vivo. Ver `DECISIONS.md` ("badge de notificación cortado en colapsado").

- **DX_MET_001 actualizado**: 4.
- **Entradas en DECISIONS.md para esta feature**: 4.
- **Rework Ratio estimado (actualizado)**: (4 + 4) ÷ 9 ≈ **0.89**.

## Review — 2026-08-12T19:30:00Z
- command_origin: sdd-review
- resultado: APROBADO
- criterios_sin_test: 4
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0
- structural_issues: 1
