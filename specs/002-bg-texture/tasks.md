# Tasks — 002-bg-texture

| ID | US | Descripción | Archivos |
|---|---|---|---|
| T001 | — | Validar entorno existente (`pnpm install`) | — |
| T002 | US-1 | Crear `backgroundTexture.tsx` (32 elementos reales, SVG inline) + clases de animación por punto + `@media prefers-reduced-motion` en `styles.css` — gate de fidelidad antes de fijar duración/amplitud | `utils/backgroundTexture.tsx` (nuevo), `styles.css` (editar) |
| T003 | US-2, US-4 | Reemplazar el className estático por el helper animado en Login; confirmar en Storybook que respira sutil, no sincronizado, y que `.login-card__pattern-dot` no cambia; probar `prefers-reduced-motion` | `patterns/login/Login.tsx` (editar) |
| T004 | US-3, US-4 | Idem en Carga de Formulario; confirmar mismo timing que Login y el fallback estático con reduced-motion | `screens/carga-de-formulario/CargaDeFormulario.stories.tsx` (editar) |
| T005 | — | Actualizar la entrada de roadmap ya escrita (estática → animada) | `knowledge/component-roadmap.md` (editar) |
