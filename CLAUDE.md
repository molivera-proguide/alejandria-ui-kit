# SDD Model — Contexto del proyecto (Alejandría UI Kit)

## Qué es esto

Este es el modelo de trabajo Spec-Driven Development (SDD), instalado en modo
**core** (sin integración Jira ni QA E2E vía ProGuide — se pueden sumar después,
ver `README-SDD.md`). El objetivo es generar código a partir de un brief inicial
estructurado, pasando por artefactos intermedios que guían la implementación.

## Relación con `knowledge/` (el sistema de diseño existente)

Este repo ya tiene un sistema de gobierno para decisiones visuales en `knowledge/`
(`design-system-manifest.json`, `decision-order.md`, `design-principles.md`,
`design-system-rules.md`, `anti-patterns.md`) y una regla en
`.cursor/rules/Alejandria-Design-System-Builder.mdc` que manda leerlo antes de
tocar un componente. **Eso no cambia.** SDD no reemplaza esa fuente de verdad
visual — gobierna el proceso alrededor de una feature nueva (brief → spec →
tasks → implementación → review). Para cualquier decisión de estilo, tokens
`--ds-*`, radios, tipografía, etc., `knowledge/` sigue siendo la autoridad.

Regla práctica: `/sdd-implement` y `/sdd-review` deben leer `knowledge/index.md`
y `knowledge/reasoning/decision-order.md` igual que lo pedía la regla de Cursor,
además de los artefactos SDD (`spec.md`, `plan.md`, `tasks.md`).

## Ciclo de trabajo

```
[FASE 0 — BROWNFIELD, correr una sola vez]
/sdd-scan → existing-arch.md + graph/domain.yaml
   (este repo ya tiene código — corré /sdd-scan antes de la primera feature)

[PREPARACIÓN — sin comandos]
El equipo pone borradores en drafts/
(notas, wireframes, restricciones, contexto, el PDF de UI Toolkit resumido)

    ↓  PRIMER COMANDO
   /sdd-refine
        ↓
input.md (brief pulido)
    ↓  /sdd-generate
constitution.md + spec.md + plan.md + tasks.md
    ↓  /sdd-validate
    gap → humano ajusta → /sdd-log → DECISIONS.md
    ↓  /sdd-implement
código + tests
    ↓  /sdd-checklist
checklist.md (lo completa el humano: UX, accesibilidad, negocio)
    ↓  /sdd-review
verificación final: lógica + tests + UI (spec + knowledge/) + calidad estructural
    ↓  cada sprint
/sdd-health → auditoría de artefactos + drift de existing-arch

[TRANSVERSAL — disponible en cualquier momento]
/sdd-fix → bugs/hotfixes puntuales (≤3 archivos)
/sdd-task [feature_id] [task_id] → implementar una task suelta
/sdd-handoff [propósito] → snapshot de sesión para continuar en otro agente/sesión
/sdd-compact-guide → ¿conviene compactar ahora?
/sdd-context-budget → cuánto pesa el framework en tokens
```

## Comandos disponibles (modo core)

Cargá el `.md` del comando solo cuando el trigger aparezca en la conversación o el usuario lo invoque explícitamente.

| Trigger keywords | Comando | Cuándo cargar el .md |
|---|---|---|
| explain, qué es, cómo funciona, onboarding | `/sdd-explain` | Primer contacto con el modelo |
| scan, codebase, código existente, brownfield | `/sdd-scan` | Antes de la primera feature (una sola vez) |
| refine, clarifica, grilling, ambigüedad, brief | `/sdd-refine` | Hay `drafts/` sin pulir |
| generate, spec, constitution, plan, tasks | `/sdd-generate` | `input.md` listo |
| validate, gap, cobertura, brief vs spec | `/sdd-validate` | Spec generada, querés verificar |
| log, decisión, ADR, alternativas | `/sdd-log` | Hay un desvío que registrar |
| implement, código, TDD, tareas | `/sdd-implement` | `tasks.md` listo |
| task, una tarea, task específica, incremental | `/sdd-task` | Querés implementar UNA task puntual de una feature |
| fix, bug, hotfix | `/sdd-fix` | Bug puntual (≤3 archivos) |
| checklist, criterios manuales, UX | `/sdd-checklist` | Implementación cerrada |
| review, gate final, UI vs spec | `/sdd-review` | Listo para gate final |
| health, drift, auditoría, sprint | `/sdd-health` | Cierre de sprint o sospechás drift |
| metrics, tokens, retrabajo | `/sdd-metrics` | Querés ver costo de esta feature |
| metrics-summary, proyecto, agregado | `/sdd-metrics-summary` | Querés ver costo del proyecto completo |
| handoff, continuar, próxima sesión, snapshot | `/sdd-handoff` | Cerrás sesión o pasás a otro agente |
| compact, contexto, fase, transición | `/sdd-compact-guide` | No sabés si conviene compactar ahora |
| context budget, overhead, peso framework | `/sdd-context-budget` | Querés saber cuánto pesa el framework |
| test, smoke, fixture | `/sdd-test` | Validás cambios al propio modelo SDD |

> No instalados en este proyecto (opcionales, ver `README-SDD.md` para sumarlos):
> `/sdd-setup` (guiado de MCPs/Jira), `/sdd-jira-start` · `/sdd-jira-sync` · `/sdd-jira-close`
> (integración Jira), `/sdd-e2e` (QA funcional E2E vía ProGuide).

## Reglas generales

- Usá `pnpm` como gestor de paquetes (es el que ya usa este monorepo).
- Los tests van antes de la implementación (TDD) en `/sdd-implement`.
- No inventés arquitectura que no esté en `plan.md`.
- Si existe `existing-arch.md`, sus restricciones son no negociables salvo decisión registrada en `DECISIONS.md`.
- Para estilos, tokens y componentes: `knowledge/` manda (ver sección arriba). Si algo del brief contradice `knowledge/design-system-rules.md`, se resuelve a favor de `knowledge/` y se registra en `DECISIONS.md`.
- Si algo del brief es ambiguo, preguntá antes de implementar.

## Steering skill

- Skill recomendado: `.claude/skills/coding-standards/SKILL.md`
- Usalo para implementación/review y dudas de convenciones con progressive disclosure.
- El skill NO reemplaza comandos SDD ni `pnpm audit:sdd`, ni la regla de Cursor de `knowledge/`.

## Gobernanza y routing de contexto

- **Registro maestro**: `specs/_registry/features.yaml` indexa toda feature
  (status, dominio, owner, sprint, archivos que toca, decisiones).
  `/sdd-generate` registra, `/sdd-review` cierra, `/sdd-health` audita.
- **Sprints**: un archivo por sprint en `specs/_registry/sprints/` con scope
  y gate de cierre. El humano define el scope; los comandos no lo modifican.
- **Grafo de dominio**: `graph/domain.yaml` mapea dominios → entidades,
  servicios, componentes y rutas exactas de archivos. Lo genera `/sdd-scan`.
- **Regla de routing (ahorro de tokens)**: ante cualquier tarea, consultá
  PRIMERO `graph/domain.yaml` para identificar el dominio afectado y leé
  SOLO los archivos listados en `files`. No escanees el codebase completo
  salvo que el grafo no exista o no cubra el dominio (en ese caso, avisá).

## Reglas de trabajo en equipo

- **Colisiones**: antes de tocar archivos, intersectá los `touches` de la
  feature/fix actual con los de toda otra feature `OPEN` de otro owner en
  `specs/_registry/features.yaml`. Si hay intersección, reportala y esperá
  decisión humana. Nunca pises trabajo ajeno en silencio.
- **Gates de prerequisitos**: cada comando verifica que el paso anterior
  ocurrió (artefactos existen, validación corrió) antes de ejecutar.
  Saltarse un gate requiere confirmación humana explícita + entrada en
  `DECISIONS.md` vía `/sdd-log`.
- **Audit determinista**: `pnpm audit:sdd` (script `scripts/sdd-audit.mjs`)
  verifica consistencia del modelo sin IA: registro↔specs, colisiones,
  gates de cierre, grafo y sprints. Lo que el script ya verifica, los
  agentes NO lo recalculan — leen su salida.
- **Bugs chicos van por `/sdd-fix`**, no por el ciclo completo. Si un fix
  crece (>3 archivos, contratos nuevos), se promueve a feature con `/sdd-refine`.
