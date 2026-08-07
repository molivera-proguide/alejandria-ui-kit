# Handoff — Arrancar Fase 0 (/sdd-scan) para los componentes de formulario nuevos
Fecha: 2026-08-07
Tipo: GATE
Sesión de origen: Instalación del modelo SDD (modo core) — todavía no hay feature ni brief abiertos
Próximo comando sugerido: `/sdd-scan`

---

## Contexto del proyecto
`alejandria-ui-kit` es un monorepo pnpm (`packages/ui` = librería `@alejandria/ui-kit`,
`apps/web` = app demo). El objetivo inmediato es construir nuevos componentes de
formulario a partir del PDF de UI Toolkit actualizado, usando el modelo SDD para el
proceso (spec → tasks → implementación → review).
→ Ver: `README-SDD.md`, `CLAUDE.md`, `knowledge/index.md` (fuente de verdad visual)

## Estado al momento del handoff

✅ Completado:
- Modelo SDD instalado en modo **core** (sin Jira, sin QA E2E ProGuide): 18 comandos
  `/sdd-*` en `.claude/commands/`, skill `coding-standards`, `CLAUDE.md`, templates de
  `specs/_registry/`, `graph/domain.template.yaml`, `drafts/README.md`, `metrics/README.md`,
  scripts (`sdd-audit.mjs`, `sync-skills.mjs`, `gen-kanban.mjs`, `kanban-server.mjs`).
- `package.json` fusionado (scripts nuevos + devDependency `yaml`), sin romper los scripts
  existentes del repo (`build`, `dev:web`, `storybook`, `pack:ui`, etc.).
- `CLAUDE.md` documenta explícitamente que `knowledge/` (manifest, decision-order,
  design-principles, anti-patterns) sigue siendo la fuente de verdad para estilos —
  SDD gobierna el proceso, no reemplaza esa autoridad visual.

🔄 En curso:
- **Verificar antes de todo:** confirmar que `.claude/commands/`, `.claude/skills/`,
  `.claude/hooks/` y `.github/workflows/sdd-audit.yml` ya se extrajeron del
  `sdd-claude-bundle.zip` en la raíz del repo, y que `pnpm install` corrió sin errores.
  Si `.claude/commands/sdd-scan.md` no existe todavía, `/sdd-scan` no va a estar
  disponible como comando.

🚧 Bloqueado / pendiente de decisión:
- Ninguno.

## Caminos descartados (intentados sin éxito)
Ninguno — esta es la primera sesión de trabajo real sobre el modelo instalado.

## Foco de la próxima sesión

Esta sesión es acotada a **Fase 0 únicamente**:

1. Confirmar el prerequisito de arriba (archivos de `.claude/` presentes, `pnpm install` OK).
2. Correr `/sdd-scan` desde la raíz del repo. Es brownfield (`packages/ui` y `apps/web`
   ya tienen código) — genera `existing-arch.md` + `graph/domain.yaml`, con doble
   confirmación humana antes de guardar cada uno.
3. Al revisar el contenido propuesto de `existing-arch.md`, pedile al agente que:
   - liste `packages/ui` (librería) y `apps/web` (consumidor) como estructura separada,
   - registre en "Patrones inquebrantables" que `knowledge/` es la fuente de verdad de
     diseño y que la regla de Cursor `Alejandria-Design-System-Builder.mdc` sigue vigente,
   - detecte el gestor de paquetes (`pnpm@11.5.0`) y el stack real de `packages/ui`
     (Vite + React + TS) vs. si `apps/web` usa el mismo stack.
4. **No arrancar `/sdd-refine` en esta misma sesión.** Los drafts de los componentes de
   formulario (con el contenido del PDF de UI Toolkit actualizado) quedan para una
   sesión aparte.

## Decisiones relevantes
No hay `DECISIONS.md` todavía — no hay ninguna desviación de brief que registrar porque
todavía no existe un brief/feature abierto. Las decisiones tomadas para instalar el
modelo (alcance core, sin Jira/ProGuide) están documentadas en `README-SDD.md`, no en
`DECISIONS.md` (son decisiones de configuración de herramienta, no de una feature).

## Skills / comandos sugeridos para la próxima sesión
- `/sdd-scan` — el único comando de esta sesión.

## Información redactada
Ninguna.
