# Plan — 001-form-modal

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10 (`@storybook/react-vite`), Vite 8, pnpm.
- `source_root`: `packages/ui/src/` (librería `@alejandria/ui-kit`), consumida
  por `apps/web/src/` vía workspace (`workspace:*`).

## Estructura (sin carpetas nuevas)
```
packages/ui/src/
├── components/
│   ├── FormTextInput.tsx + .stories.tsx   (nuevo)
│   ├── FormSelect.tsx + .stories.tsx      (nuevo)
│   ├── FormCheckable.tsx + .stories.tsx   (nuevo)
│   ├── FormFileUpload.tsx + .stories.tsx  (nuevo)
│   ├── FormDatePicker.tsx + .stories.tsx  (nuevo)
│   └── Modal.tsx + .stories.tsx           (nuevo)
├── styles.css                              (editar: tokens --ds-* nuevos)
└── index.ts                                (editar: 6 exports nuevos)
```

## Componentes a crear
1. **FormTextInput** — variantes `login` | `default`; props: value, label, error?, disabled?
2. **FormSelect** — single/multiselect, overlay sobre el input, error?, disabled?
3. **FormCheckable** — checkbox | radio | switch, `description?`, disabled?
4. **FormFileUpload** — multi-file, drag&drop básico, error?, disabled?
5. **FormDatePicker** — calendario + selector de hora, disabled? (layout de
   grid final: revisar PDF p.21 directamente antes de implementar, el
   extract de texto no lo resuelve)
6. **Modal** — título, texto, 2 acciones configurables (solo variante
   "Confirmación de acción")

## Fuera de este plan
Sin instalar test framework ni linter. Sin carpeta `patterns/` — los 6
componentes van planos en `components/` (field primitives, no composición).

## Docs a actualizar
- `knowledge/component-roadmap.md` — cerrar nota de Form obsoleta + marcar
  gap Modal/Dialog resuelto.
- `knowledge/fidelity-pass/next-steps.md` — agregar entrada de fidelity pass
  para los 6 componentes contra PDF v3 p.17–22.
