# Alejandria UI Kit

Monorepo simple con una libreria de componentes React inspirada en las capturas del PDF de Alejandria y una app Vite que la consume como dependencia workspace.

## License

Proprietary / internal use only (`UNLICENSED`). Not an open-source license; do not redistribute outside authorized consumers.

## Install (tarball or git — no registry)

`@alejandria/ui-kit` is meant to be installed from a local tarball or a git ref. There is no npm registry publish for this MVP.

### From a tarball (recommended)

From the repo root, build then pack. `pnpm pack:ui` copies the knowledge into the package, writes
the tarball to the repo root, and cleans up the transient copy:

```bash
pnpm build:ui      # build packages/ui/dist
pnpm pack:ui       # → ./alejandria-ui-kit-0.1.0.tgz (dist + knowledge + AI entrypoint)

# in the consumer app (use an absolute path to the .tgz, or copy it in first):
npm install /path/to/alejandria-ui-kit-0.1.0.tgz
```

The tarball ships the runnable package (`dist/`, `style.css`, types), the `knowledge/` tree (minus
the 35 MB design-reference PDF), and the AI entrypoint at
`knowledge/consumer/AGENTS.template.md` — see "Consuming with an AI agent" below.

> Running `npm pack` directly inside `packages/ui` also works (the `prepack` hook copies the
> knowledge), but it leaves a transient `packages/ui/knowledge/` copy behind and writes the tarball
> into `packages/ui/`. Prefer `pnpm pack:ui`.

### From git

```bash
npm install git+https://<host>/<org>/alejandria-ui-kit.git#<ref>
```

Caveat: git-install runs `prepare`, not the `prepack` / `pnpm pack:ui` flow, and the package has no
`prepare` hook — so a git ref ships **neither** a built `packages/ui/dist` **nor** the copied
`knowledge/` unless they are committed to the ref. For the AI-consumer workflow (which needs the
shipped `knowledge/`), prefer the tarball. Peer dependencies: `react` and `react-dom` `>=18.2.0`.

## Usage

```tsx
import { Button, BuscarIcon } from "@alejandria/ui-kit";
import "@alejandria/ui-kit/style.css";

export function Example() {
  return (
    <>
      <Button>Guardar</Button>
      <img src={BuscarIcon} alt="" width={40} height={40} />
    </>
  );
}
```

Icons ship in the package as URL strings (`data:` URLs or asset URLs). Use them as `src` on `<img>` (or equivalent).

## App background (required for the Alejandría look)

`@alejandria/ui-kit/style.css` ships the design tokens (`--ds-*`) and fonts but **does not paint a
page background**. Components carry their own dark surfaces, so on a default (white) page you get dark
cards floating on white. Give your app root the console backdrop using tokens:

```tsx
import "@alejandria/ui-kit/style.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ds-color-surface)", color: "var(--ds-color-ink)" }}>
      {children}
    </div>
  );
}
```

Use `var(--ds-*)` tokens for shell spacing too (`--ds-space-1..6`) — don't hardcode hex or px for
design values.

## Fonts (network requirement)

Importing `@alejandria/ui-kit/style.css` loads **Montserrat** and **Source Code Pro** from Google Fonts over the network (via a CSS `@import`). Offline or CSP-restricted consumers must self-host those two families — and drop the `@import` — or the Alejandría typography silently falls back to system fonts (deferred; not covered in this MVP).

## Consuming with an AI agent

Want your AI (Cursor, Claude Code, …) to generate UI that looks Alejandría? After installing the
package, copy the shipped entrypoint to your repo root and let your agent read the bundled knowledge:

```bash
cp node_modules/@alejandria/ui-kit/knowledge/consumer/AGENTS.template.md ./AGENTS.md
```

Full steps: `node_modules/@alejandria/ui-kit/knowledge/consumer/SETUP.md`.

## Scripts

- `pnpm install`
- `pnpm storybook`
- `pnpm dev:web`
- `pnpm build`
- `pnpm pack:ui`

## Estructura

- `packages/ui`: libreria `@alejandria/ui-kit`, tokens, componentes y Storybook.
- `apps/web`: aplicacion React + TypeScript + Vite que consume `@alejandria/ui-kit`.

## Componentes incluidos

- `Button`, `Badge`, `Card`, `TextField`
- `AlertBanner`, `SelectField`, `Switch`, `SegmentedControl`
- `MetricCard` para KPIs operativos.
- `TaskCard` para tarjetas de tareas con prioridad, estado y progreso.
- `ProgressRing` para indicadores circulares de avance.
- `DataTable` para listados compactos de recursos, tareas o eventos.
- Icon set Alejandría (Cards, Investigations, Menu, Modules) exported from the package entry.

La app demo usa un asset liviano extraido del PDF como mapa operativo en `apps/web/src/assets/alejandria-map.jpg`.
