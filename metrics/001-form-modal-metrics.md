# Métricas — 001-form-modal

> `feature_id` provisorio (`001-form-modal`) asignado en esta sesión de
> `/sdd-refine` porque `specs/_registry/features.yaml` todavía no existe
> (ninguna feature registrada). `/sdd-generate` confirma o ajusta el
> `feature_id` definitivo al generar los artefactos.

## Refine — 2026-08-07
- command_origin: sdd-refine
- rondas_de_preguntas: 9
- categorias_faltantes: 5
- categorias_ambiguas: 3
- alertas_seguridad: 0

## Validate — 2026-08-07
- command_origin: sdd-validate
- gaps_encontrados: 2
- cobertura_inicial: 97%
- iteration_number: 1

## Reporte completo — 2026-08-07T18:46:22Z

### 📊 Reporte de Esfuerzo SDD

**Contexto de ejecución**
- **feature_id**: 001-form-modal
- **command_origin**: sdd-implement
- **iteration_number**: 1
- **timestamp**: 2026-08-07T18:46:22Z

**Eficiencia de la IA (DX)**
- DX_MET_001 **Ciclos de Autocorrección**: 4 — (1) error de tipos TS en `FormDatePickerProps` (`defaultValue` colisiona con `HTMLAttributes`), corregido; (2) el mismo error reapareció al reescribir el componente tras el gate de p.21, corregido de nuevo; (3) bug de CSS: el selector `:checked` del switch heredaba el `::after` (punto oscuro) de checkbox/radio, corregido acotando el selector por tipo; (4) reconstrucción estructural completa de `FormDatePicker` tras verificar la página 21 del PDF con PyMuPDF y encontrar que la estructura real (2 triggers independientes FECHA/HORA, spinner de 2 columnas) difería de la primera implementación basada solo en el extract de texto ambiguo.
- DX_MET_002 **Consultas de Clarificación**: 1 — si instalar Vitest para cumplir el loop TDD formal o adaptarlo a verificación visual (sin framework de test instalado, `existing-arch.md`).
- DX_MET_003 **Interacciones Totales**: 2 (comando `/sdd-implement` + 1 respuesta a la consulta de clarificación).

**Análisis de Retrabajo**
- DX_MET_004 **Causa Raíz**: mixta. (1)-(3) son técnicas (tipos TS, especificidad CSS). (4) es ambigüedad de spec — no una falla de `/sdd-refine`: el propio `pdf-text-extract.md` ya advertía que el layout del grid y el rango de horas de p.21 no se podían resolver del texto solo, y el gate de `tasks.md` (T006) exigía revisar la página directamente antes de implementar. El intento inicial no siguió ese gate al pie de la letra (avanzó con una interpretación razonable antes de confirmar que PyMuPDF podía renderizar la página); una vez confirmado que sí se podía, se corrigió.
- DX_MET_005 **Resiliencia**: no se alcanzó ningún rate-limit ni límite de tokens.

- DX_MET_006 **Token Budget** — Variante A (Claude Code, ccusage, tokens reales)

**Consumo real de la sesión** (`ccusage claude session --no-cost --json`, filtrado por `sessionId=ff805377-09a6-443e-84da-c7641f9d259a` + `projectPath` de este repo):

| Fila del reporte | Tokens |
|---|---|
| input_tokens | 382 |
| output_tokens | 213.785 |
| cache_creation_input_tokens | 383.194 |
| cache_read_input_tokens | 46.226.273 |
| **TOTAL** | **46.823.634** |

- `session_ids`: [ff805377-09a6-443e-84da-c7641f9d259a]
- `source`: ccusage
- Nota: esta sesión cubre el ciclo completo `/sdd-refine` → `/sdd-generate` → `/sdd-validate` → `/sdd-log` → `/sdd-implement` de esta feature, no solo el tramo de implementación — `ccusage` reporta a nivel de sesión, no de sub-comando.

**Rework Ratio (calculado)**
- **Tareas totales en tasks.md**: 9 (T001–T009)
- **DX_MET_001 acumulado (todas las iteraciones de esta feature)**: 4
- **Entradas en DECISIONS.md para esta feature**: 3
- **Rework Ratio estimado**: (4 + 3) ÷ 9 = **0.78**

🔴 Rework Ratio > 0.3 — señal esperada para esta feature en particular: gran parte del "retrabajo" no fue código mal escrito sino resolver gates de fidelidad visual contra un PDF que la propia sesión de `/sdd-refine` ya había marcado como parcialmente ambiguo (p.21) y una decisión de proceso (TDD sin framework de test) explícitamente fuera del control de la spec. No headers de contrato roto ni tests fallando — sin framework de test instalado, este ratio pesa más los ajustes de fidelidad/documentación que retrabajo de lógica.

## Review — 2026-08-07
- command_origin: sdd-review
- resultado: APROBADO
- criterios_sin_test: 6
- criterios_sin_implementar: 0
- gaps_ui: 0
- hallazgos_e2e: 0
- structural_issues: 3
