# Alejandria UI Kit

Monorepo simple con una libreria de componentes React inspirada en las capturas del PDF de Alejandria y una app Vite que la consume como dependencia workspace.

## License

Proprietary / internal use only (`UNLICENSED`). Not an open-source license; do not redistribute outside authorized consumers.

## Install (tarball or git — no registry)

`@alejandria/ui-kit` is meant to be installed from a local tarball or a git ref. There is no npm registry publish for this MVP.

### From a tarball

```bash
pnpm --filter @alejandria/ui-kit build
# from packages/ui (or use root `pnpm pack:ui`):
npm pack
# → alejandria-ui-kit-0.1.0.tgz

# in the consumer app:
npm install ./path/to/alejandria-ui-kit-0.1.0.tgz
```

### From git

```bash
npm install git+https://<host>/<org>/alejandria-ui-kit.git#<ref>
```

Ensure the git ref includes a built `packages/ui/dist` (or run the package `build` script as part of your install/prepare flow). Peer dependencies: `react` and `react-dom` `>=18.2.0`.

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

## Fonts (network requirement)

Importing `@alejandria/ui-kit/style.css` loads **Montserrat** and **Source Code Pro** from Google Fonts over the network. Offline or CSP-restricted consumers must self-host those fonts (deferred; not covered in this MVP).

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
