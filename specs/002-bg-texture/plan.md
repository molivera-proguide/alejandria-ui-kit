# Plan — 002-bg-texture

## Stack (existente, sin scaffold — brownfield)
- TypeScript `strict: true`, React 19.2, Storybook 10, Vite 8, pnpm.
- `source_root`: `packages/ui/src/`, consumida por `apps/web/src/` vía
  workspace.

## Estructura (1 archivo nuevo, no exportado)
```
packages/ui/src/
├── utils/
│   └── backgroundTexture.tsx   (nuevo — helper no exportado, 32 <path>/
│                                <ellipse> reales + clases de animación)
├── styles.css                  (editar: reemplazar background-image data
│                                URI por clases de animación por punto +
│                                @media prefers-reduced-motion)
├── patterns/login/Login.tsx    (editar: importar el helper en vez de solo
│                                el className)
└── screens/carga-de-formulario/
    CargaDeFormulario.stories.tsx (editar: idem)
```

## Artefacto a construir
1. **`backgroundTexture.tsx`** — componente interno (no exportado) que
   renderiza los 32 elementos reales dentro de un `<svg>`, con
   `mix-blend-mode: screen; opacity: .05` fijo en el `<g>` contenedor, y
   cada punto con su propia `animation-delay`/`animation-duration` (jitter
   por índice) vía custom properties inline.
2. **`@keyframes` de respiración** en `styles.css` — oscila `opacity` entre
   el valor base de cada punto y ~25% de ese valor, `ease-in-out`,
   infinito. `@media (prefers-reduced-motion: reduce)` anula la animación.
3. Token `--ds-color-pattern-dot` y la convención `--ds-color-pdf-surface`
   — sin cambios respecto a la versión estática.

## Fuera de este plan
Sin instalar test framework ni linter. Sin export en `index.ts` — sigue
siendo un helper interno, no parte de la API pública del kit.

## Docs a actualizar
- `knowledge/component-roadmap.md` — actualizar la entrada "Textura de
  fondo compartida" ya escrita (de estática a animada), no crear una nueva.
