# existing-arch.md — Estado del codebase

> Generado por /sdd-scan el 2026-08-07
> Commit base: 11c9a51
> Este archivo es DESCRIPTIVO (qué hay), no PRESCRIPTIVO (qué debería haber).
> Las restricciones acá son no negociables salvo decisión registrada en DECISIONS.md.

## Qué es este proyecto
`@alejandria/ui-kit`: librería de componentes React cuyo objetivo es que **agentes de IA
generen UI con la estética de Alejandría** de forma consistente — no solo que humanos
consuman los componentes. Por eso `knowledge/` (docs, specs numéricas, reasoning/decision-order)
viaja junto al código en el tarball (`knowledge/consumer/AGENTS.template.md` + `SETUP.md`) como
la superficie que le da a un agente el criterio visual para generar, no solo la API para importar.
Esto condiciona cómo se documentan y prueban los componentes: el `knowledge/` es tan "producto"
como el código en sí.

## Stack
- Lenguaje: TypeScript (`strict: true`, ES2022, `tsconfig.base.json` compartido)
- Framework: React 19.2 + Storybook 10 (`@storybook/react-vite`)
- Build/runtime: Vite 8 (lib mode en `packages/ui`, app mode en `apps/web`)
- Gestor de paquetes: pnpm (`packageManager: pnpm@11.5.0`, workspaces `apps/*` + `packages/*`)

## source_root
Dos raíces separadas (monorepo librería + consumidor):
- `packages/ui/src/` — librería `@alejandria/ui-kit` (fuente de verdad del código)
- `apps/web/src/` — app demo Vite que consume la librería vía workspace (`workspace:*`)

## Estructura
```
packages/ui/src/
├── components/       ← un .tsx + un .stories.tsx por componente, plano (sin subcarpetas)
├── patterns/<nombre>/← composiciones (.tsx + .css + .stories.tsx), ej. login, mission, detail-sheet
├── Icons/<Categoria>/← Brand, Cards, Investigations, Menu, Modules
├── utils/
├── styles.css        ← tokens --ds-* + fonts
└── index.ts           ← barrel único, única fuente de exports públicos

apps/web/src/
├── App.tsx, main.tsx, app.css
├── patterns/detail-sheet/
└── assets/

packages/tokens/       ← carpeta vacía, sin package.json (ver Ambigüedades)
knowledge/              ← doc AI-first, fuente de verdad visual (ver abajo)
```

## Patrones inquebrantables
- **`knowledge/` es la autoridad de diseño.** Tokens `--ds-*`, radios, tipografía,
  decisiones visuales: se resuelven ahí (`design-system-manifest.json`,
  `reasoning/decision-order.md`, `design-principles.md`, `design-system-rules.md`,
  `anti-patterns.md`). Regla Cursor `.cursor/rules/Alejandria-Design-System-Builder.mdc`
  sigue vigente. SDD gobierna el proceso alrededor, no reemplaza esta autoridad.
- Un componente = un `.tsx` + un `.stories.tsx` en el mismo nivel de `components/`; sin
  carpeta propia por componente (a diferencia de `patterns/`, que sí usa subcarpeta).
- `src/index.ts` es la única fuente de verdad de exports públicos — el build (`vite.config.ts`
  de `packages/ui`) deriva el `.d.ts` del barrel a partir de esas líneas `export`, nunca a mano.
- Iconos se exportan como URL strings (`data:` o asset URL), se consumen como `src` de `<img>`.
- `packages/ui/knowledge/` (copia transitoria para el tarball) está gitignored — nunca se comitea.

## Tests
- Framework: **ninguno instalado** (decisión consciente, confirmada por el equipo — no TDD
  automatizado hoy). Sin `vitest.config.*`, sin script `test` en ningún `package.json`.
- Los `*.spec.md` en `knowledge/specs/components/` son specs de documentación (valores
  numéricos citables), no tests ejecutables — no confundir.
- Implicancia para `/sdd-implement`: cuando una task pida tests, hay que decidir explícitamente
  qué framework instalar (candidato natural: Vitest, ya usan Vite) — no asumirlo.

## Linting
- Ninguno instalado (`.eslintrc*`, Biome, etc.) — **decisión consciente**, no gap pendiente.
  TypeScript `strict: true` cubre parte del chequeo de tipos; sin reglas de hooks/imports.

## Persistencia / Data
Ninguna. Sin DB, sin API externa, sin localStorage. Librería de componentes puros + app
demo con datos mock inline (stories, `App.tsx`).

## Estado / Estilos / Integraciones
- Estado: sin gestor global (esperable en librería de UI).
- Estilos: CSS custom properties `--ds-*` en `packages/ui/src/styles.css`, gobernadas por
  `knowledge/`. Fonts (Montserrat, Source Code Pro) vía `@import` de Google Fonts — requiere red.
- Integraciones externas: ninguna (sin auth/pagos/analytics). Única dependencia de red: fonts.
- Distribución: sin registro npm — tarball (`pnpm pack:ui`) o git ref (ver README.md).

## Restricciones de deploy / entorno
- CI: GitHub Actions (`sdd-audit.yml`) — job `audit` corre `pnpm audit:sdd`; job `secrets`
  corre gitleaks sobre el historial completo en cada push/PR a `main`.
- Sin entorno de deploy propio (es librería, no servicio).

## Ambigüedades sin resolver (reportadas, no resueltas)
- CI fija pnpm `version: 9` (`pnpm/action-setup@v4`) pero `package.json` declara
  `packageManager: pnpm@11.5.0` — contradicción interna, decidir cuál es la fuente de verdad.
- `packages/tokens/` existe vacía (sin `package.json`) dentro del glob de workspaces —
  ¿scaffold para un futuro paquete de tokens separado, o resto a borrar?

## Drift tracking
- Generado contra commit: 11c9a51
- Re-scan sugerido si: cambian dependencias mayores, se agregan/eliminan carpetas
  top-level, se instala test framework o linter, o pasan >2 sprints.
