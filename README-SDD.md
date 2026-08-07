# SDD Model en Alejandría UI Kit — guía rápida

Instalado en **modo core** desde https://github.com/pmillanmc/sdd-model-v1.1
(sin Jira, sin QA E2E vía ProGuide — ver "Sumar Jira o ProGuide después" al final).

## Qué se trajo y qué no

Se copiaron (aditivo, no toca `packages/`, `apps/` ni `knowledge/`):

```
.claude/commands/*.md         ← 18 comandos /sdd-* (core)
.claude/hooks/                ← captura de sesión para métricas
.claude/skills/coding-standards/  ← steering skill (progressive disclosure)
.claude/settings.json         ← hook + permisos base (separado de tu settings.local.json)
CLAUDE.md                     ← contexto que Claude Code carga cada turno
drafts/README.md              ← instrucciones para poner tus borradores
metrics/README.md             ← guía de telemetría
graph/domain.template.yaml    ← plantilla; /sdd-scan genera graph/domain.yaml real
specs/_registry/*.template.yaml
scripts/sdd-audit.mjs, sync-skills.mjs, gen-kanban.mjs, kanban-server.mjs
.gitleaks.toml                ← allowlist para el scanner de secretos
.github/workflows/sdd-audit.yml  ← CI: audita el modelo + escanea secretos en cada PR
```

No se copió: `/sdd-setup`, `/sdd-jira-*`, `/sdd-e2e`, `.mcp.json`, `.cursor/mcp.json`
(todo lo que requiere Jira o la CLI `proguide-test`).

## Cómo se relaciona con lo que ya tenías

Este repo ya gobierna las decisiones visuales con `knowledge/` (manifest, decision-order,
design-principles, anti-patterns) y la regla de Cursor `Alejandria-Design-System-Builder.mdc`.
Eso sigue mandando para estilo y fidelidad al PDF. SDD agrega el proceso alrededor:
brief → spec con criterios verificables → tasks con TDD → review con gate humano. Los
detalles de esta convivencia están documentados en `CLAUDE.md`.

## Instalación (2 pasos, ya casi listo)

1. Dependencia nueva — el auditor (`sdd-audit.mjs`) usa el paquete `yaml`:

   ```bash
   pnpm add -D yaml
   ```

2. Revisá el diff (`git status` / `git diff`) y commiteá cuando estés conforme:

   ```bash
   git add .claude CLAUDE.md README-SDD.md drafts metrics graph specs scripts .gitleaks.toml .github package.json pnpm-lock.yaml
   git commit -m "chore: instalar SDD model (core) para desarrollo de nuevos componentes de formulario"
   ```

No hace falta instalar nada más ni tocar MCPs — los comandos `/sdd-*` son prompts en
markdown que Claude Code lee directo de `.claude/commands/`.

## Primer uso, paso a paso (para los componentes de formulario)

1. **`/sdd-scan`** — corrélo una sola vez, ahora, antes de la primera feature. Este repo
   ya tiene código (`packages/ui`, `apps/web`), así que es "brownfield". Genera
   `existing-arch.md` (raíz) y `graph/domain.yaml` con doble confirmación tuya antes de
   guardar. Pedile explícitamente que respete `knowledge/` como fuente de verdad visual.

2. **Poné tus borradores en `drafts/`** — el PDF de UI Toolkit actualizado y tus notas
   sobre los componentes de formulario nuevos. Si el PDF trae capturas con estilos, seguí
   la guía de "cómo especificar estilos CSS correctamente" en `drafts/README.md` (valores
   hex/px exactos, no "input azul").

3. **`/sdd-refine`** — lee los drafts + `existing-arch.md`, hace preguntas de clarificación
   (para un feature de tipo formulario, va a preguntar validación, estados de error,
   accesibilidad, etc.) y genera `input.md`.

4. **`/sdd-generate`** — desde `input.md` genera `constitution.md`, `spec.md`, `plan.md`,
   `tasks.md` en `specs/[feature_id]/` y registra la feature en
   `specs/_registry/features.yaml`.

5. **`/sdd-validate`** — chequea que la spec cubra el brief. Si hay gaps, avisa y para.

6. **`/sdd-implement`** — implementa las tasks con loop TDD (Red → Green → Refactor),
   leyendo `knowledge/` para la fidelidad visual.

7. **`/sdd-checklist`** — genera los criterios que vos completás a mano (UX, accesibilidad).

8. **`/sdd-review`** — gate final: lógica + tests + UI (spec vs código vs `knowledge/`) +
   calidad estructural. Cierra la feature en el registro.

Cada sprint: **`/sdd-health`** audita todo. Cuando quieras ver costo/retrabajo:
**`/sdd-metrics`** (esta feature) o **`/sdd-metrics-summary`** (todo el proyecto).

## Comandos de mantenimiento

```bash
pnpm audit:sdd          # auditor determinista (registro ↔ specs ↔ grafo ↔ sprints)
pnpm skills:sync        # instala .claude/skills/coding-standards en ~/.claude/skills (global)
pnpm skills:sync:dry    # preview sin aplicar
pnpm kanban:serve        # tablero visual de features en http://127.0.0.1:<puerto>
```

## Sumar Jira o ProGuide después

Si más adelante querés trazabilidad con Jira o QA E2E automatizado contra la app viva,
pedime que traiga esas capas — son los archivos que dejé afuera a propósito
(`/sdd-setup`, `.claude/commands/sdd-jira-*.md`, `.claude/commands/sdd-e2e.md`,
`.mcp.json`, `.cursor/mcp.json`) — y corré `/sdd-setup` una vez que estén, que te guía
paso a paso pidiendo credenciales de Atlassian.

Documentación completa del modelo (todas las capas): `docs/sdd-model-README.md`.
