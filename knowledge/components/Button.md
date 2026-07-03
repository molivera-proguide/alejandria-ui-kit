---
id: button
name: Button
category: input
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Button.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Button

aliases:
  - botón
  - action button
  - control de acción
keywords:
  - Button
  - botón
  - acción
  - primary
  - secondary
  - ghost
  - danger
  - loading
  - iconLeft
  - iconRight
  - ButtonVariant
  - ButtonSize
tags:
  - input
  - actions
  - interactive
  - atom

last_reviewed: 2026-07-02
---

# Button

## Purpose

Ofrece un control de acción interactivo con variantes visuales, tamaños e iconos opcionales en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** ejecutar acciones del usuario (asignar, filtrar, cancelar, ver detalle) con apariencia coherente del design system.
- **Problema que resuelve:** unificar estilos de botón, estados interactivos (hover, foco, deshabilitado, carga) y soporte de iconos sin reimplementar CSS en cada vista.
- **Alcance:** componente interactivo basado en `<button>` con `forwardRef`; el consumidor provee texto en `children`, manejadores de evento y atributos nativos vía `...props`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<button>` con clases `ds-button`, `ds-button--{variant}` y `ds-button--{size}` por defecto.
- `variant` por defecto `"primary"`; `size` por defecto `"md"`; `fullWidth` por defecto `false`; `loading` por defecto `false`.
- `disabled` efectivo cuando `disabled` es `true` o `loading` es `true`.
- Atributo `data-loading="true"` en la raíz solo cuando `loading` es `true`.
- `children` siempre renderizado en `<span class="ds-button__label">`, incluso durante carga.
- Cuando `loading` es `true`: muestra `<span class="ds-button__spinner" aria-hidden="true">` y oculta `iconLeft` e `iconRight`.
- Cuando `loading` es `false`: renderiza `iconLeft` e `iconRight` en `<span class="ds-button__icon">` si son truthy.
- Clase `ds-button--full` cuando `fullWidth` es `true`.
- Fusión de `className` externa con clases base mediante `cn()`.
- Repaso de atributos nativos de `ButtonHTMLAttributes<HTMLButtonElement>` al `<button>` raíz vía `...props` (`onClick`, `type`, `aria-label`, `id`, `name`, `form`, `data-*`, etc.).
- Reenvío de `ref` al elemento `<button>` nativo.

## This component never

- Navega, envía formularios ni ejecuta lógica de negocio por sí mismo.
- Compone internamente `Card`, `Badge`, `TextField`, `ModuleCard` ni otros componentes del kit.
- Define `type="button"` por defecto (el valor por defecto del navegador aplica si no se pasa `type`).
- Aplica `aria-busy`, `aria-live` ni oculta el texto de `children` durante carga.
- Marca iconos con `aria-hidden` automáticamente.
- Aplica estilos responsivos propios (sin media queries en `.ds-button`).
- Usa `SegmentedControl` ni delega en otros controles de selección.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer texto descriptivo en `children` o `aria-label` explícito cuando el botón sea de solo icono.
- Pasar `type="button"` dentro de formularios si la acción no debe enviar el formulario.

## Forbidden

- Inventar props que no existan en `ButtonProps` (`tone`, `icon`, `variant="outline"`, etc.).
- Asumir que `loading` oculta el texto de `children` (el label permanece visible junto al spinner).
- Usar `Button` como sustituto de `ModuleCard` para navegación por módulo con métricas embebidas.
- Anidar otro `Button` dentro de `iconLeft` o `iconRight` (los iconos van en el slot, no controles interactivos anidados).

## Recommendations

- Usar `variant="primary"` para la acción principal y `variant="secondary"` o `variant="ghost"` para acciones secundarias, según `Button.stories.tsx` → `Variants` y `apps/web/src/App.tsx`.
- Usar `size="sm"` en footers de `Card` y encabezados de sección (`Card.stories.tsx`, `Components.stories.tsx`).
- Usar `variant="danger"` para acciones destructivas en `AlertBanner.stories.tsx` → `WithAction`.
- Pasar iconos de `lucide-react` en `iconLeft` o `iconRight` (demos usan `Crosshair`, `Filter`, `Save`, `ArrowRight`).
- Combinar con `Badge` en `footer` de `Card` para contexto de estado y acción secundaria.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Actions |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/Button.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Button` — componente con `forwardRef`.
- `ButtonProps` — props del componente.
- `ButtonVariant` — unión de variantes visuales.
- `ButtonSize` — unión de tamaños.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `children` | `ReactNode` | — | no | Texto del botón. Renderizado en `<span class="ds-button__label">`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `variant` | `ButtonVariant` | `"primary"` | no | Variante visual. Aplica clase `ds-button--{variant}`. Valores: `"primary"`, `"secondary"`, `"ghost"`, `"danger"`. |
| `size` | `ButtonSize` | `"md"` | no | Tamaño del botón. Aplica clase `ds-button--{size}`. Valores: `"sm"`, `"md"`, `"lg"`. |
| `fullWidth` | `boolean` | `false` | no | Cuando es `true`, aplica clase `ds-button--full` (`width: 100%`). |
| `loading` | `boolean` | `false` | no | Estado de carga. Deshabilita el botón, muestra spinner y oculta iconos. Atributo `data-loading="true"`. |
| `iconLeft` | `ReactNode` | — | no | Icono a la izquierda del label. Renderizado en `<span class="ds-button__icon">` solo si `loading` es `false`. |
| `iconRight` | `ReactNode` | — | no | Icono a la derecha del label. Renderizado en `<span class="ds-button__icon">` solo si `loading` es `false`. |
| `disabled` | `boolean` | `false` | no | Deshabilita el botón. Combinado con `loading` mediante OR lógico. |
| `className` | `string` | — | no | Clases adicionales fusionadas con las clases base en el `<button>` raíz. |
| `type` | `"button" \| "submit" \| "reset"` | — | no | Atributo `type` del `<button>`. No se establece por defecto en el componente. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | no | Manejador de clic del botón raíz. |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | no | Atributos nativos del botón (`aria-label`, `id`, `name`, `form`, `data-*`, etc.). |

### ButtonVariant

| Value | Description |
|-------|-------------|
| `"primary"` | Acción principal. Gradiente teal, texto oscuro. Clase `ds-button--primary`. |
| `"secondary"` | Acción secundaria. Fondo semitransparente, borde de línea fuerte. Clase `ds-button--secondary`. |
| `"ghost"` | Acción terciaria. Fondo transparente, texto suave. Clase `ds-button--ghost`. |
| `"danger"` | Acción destructiva. Gradiente rojo, texto blanco. Clase `ds-button--danger`. |

### ButtonSize

| Value | Description |
|-------|-------------|
| `"sm"` | Compacto. `min-height: 32px`, `font-size: 0.78rem`, `padding: 0 11px`. Clase `ds-button--sm`. |
| `"md"` | Tamaño por defecto. `min-height: 40px`, `font-size: 0.88rem`, `padding: 0 15px`. Clase `ds-button--md`. |
| `"lg"` | Grande. `min-height: 48px`, `font-size: 1rem`, `padding: 0 20px`. Clase `ds-button--lg`. |

---

# Variants

Describe every public visual variant.

## Default

Cuatro variantes públicas implementadas en CSS mediante modificadores BEM. Todas comparten estilos base de `.ds-button` (`inline-flex`, `gap: 8px`, `border-radius: var(--ds-radius-xs)`, `font-weight: 700`, `text-transform: uppercase`, transiciones de 160ms).

| Variant | Apariencia implementada |
|---------|-------------------------|
| `primary` | Gradiente `linear-gradient(180deg, #82f3d8, var(--ds-color-teal-dark))`, borde teal semitransparente, sombra teal, texto `#04110f`. Hover: gradiente más claro y sombra ampliada. |
| `secondary` | Fondo `rgb(255 255 255 / 0.05)`, borde `var(--ds-color-line-strong)`, texto `var(--ds-color-ink)`. Hover: fondo más claro, borde `var(--ds-color-teal)`. |
| `ghost` | Fondo transparente, texto `var(--ds-color-ink-soft)`. Hover: fondo `rgb(255 255 255 / 0.06)`, texto `var(--ds-color-ink)`. |
| `danger` | Gradiente `linear-gradient(180deg, #ff696f, #bd1f2a)`, borde rojo semitransparente, texto `#ffffff`. Hover: gradiente más claro y sombra roja. |

Tres tamaños (`sm`, `md`, `lg`) y el modificador `fullWidth` (`ds-button--full`) alteran dimensiones sin cambiar la paleta de la variante.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-button` según `variant` y `size`. |
| Hover | `:hover:not(:disabled)` aplica `transform: translateY(-1px)` en todas las variantes; cada variante define además cambios de fondo, borde y sombra. |
| Focus-visible | `:focus-visible` aplica `box-shadow: var(--ds-focus-ring)` y `outline: none`. |
| Disabled | `:disabled` aplica `cursor: not-allowed`, `opacity: 0.58` y `transform: none`. Activo cuando `disabled` o `loading` es `true`. |
| Loading | `loading={true}` deshabilita el botón, muestra `.ds-button__spinner` con animación `ds-spin`, oculta iconos; el texto de `children` permanece visible. Atributo `data-loading="true"`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica nativa de `<button>`; el contenido de `children` forma parte del nombre accesible del control.
- El spinner de carga lleva `aria-hidden="true"`; no se anuncia a tecnologías asistivas.
- Los iconos en `.ds-button__icon` no reciben `aria-hidden` del componente; si son decorativos, el consumidor debe asegurar que el texto de `children` o `aria-label` describa la acción.
- El consumidor es responsable de proveer `aria-label` en botones de solo icono y de pasar `type="button"` en contextos de formulario cuando corresponda.
- Durante `loading`, el botón queda deshabilitado pero no expone `aria-busy`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-button__spinner` durante carga. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `aria-pressed`, etc. en el `<button>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| `Enter` | Activa el botón (comportamiento nativo). |
| `Space` | Activa el botón (comportamiento nativo). |
| `Tab` | Mueve el foco al/desde el botón (comportamiento nativo). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Button` no define media queries. El ancho lo define el contenido (`min-width: max-content`) salvo cuando `fullWidth` aplica `width: 100%`.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Tamaño fijo por `size`; el layout responsivo depende del contenedor padre (flex, grid). |
| Storybook `Variants` / `Sizes` | Contenedor padre con `display: flex`, `flexWrap: wrap` y `gap: 12`; el colapso depende del padre, no del componente. |
| `apps/web` | Botones en `.ops-command__tools` y footers de `Card`; el colapso en viewport estrecho lo define CSS del consumidor en `apps/web/src/app.css`, no `.ds-button`. |

---

# Composition

## Purpose in Layout

- **Action** — acción principal o secundaria en barras de herramientas, encabezados y pies de panel.
- **Detail** — acción contextual en `footer` de `Card` ("Ver tarea", "Ver log", "Recalcular").
- **Navigation** — no es navegación estructural; acciones puntuales con `onClick` del consumidor.

## Parent

- `footer` de `Card` (junto con `Badge` en demos).
- `div.ds-field__action` cuando se pasa como `action` de `TextField`.
- `div.ds-alert__action` cuando se pasa como `action` de `AlertBanner`.
- `div.ops-command__tools` en `apps/web/src/App.tsx`.
- Contenedor flex en encabezado de `Components.stories.tsx` → `OperationsConsole`.

## Children

- Texto de acción vía prop `children` (no slots adicionales).
- Iconos vía `iconLeft` e `iconRight`, no como `children` arbitrarios.

## Siblings

- `Badge` — contexto de estado en el mismo `footer` de `Card`.
- `TextField` — campo de búsqueda adyacente en barras de herramientas.
- `Card`, `TaskCard`, `MetricCard` — paneles y tarjetas en la misma vista de consola.
- Otros `Button` — acciones múltiples en la misma barra (p. ej. "Filtros" + "Asignar").

## Alternatives

- `ModuleCard` — navegación a módulo con icono grande y métricas; usa `<button>` propio (`ds-module-card`), no compone `Button`.
- `SegmentedControl` — selección entre opciones mutuamente excluyentes; usa botones nativos con clase `ds-segmented__item`.
- Enlace estilizado externamente — cuando la acción es navegación pura sin semántica de botón (no provisto por el kit).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Card` | `Button` usado en `footer` para acciones secundarias; no hay composición interna. |
| `TextField` | Acepta `Button` en slot `action`; el campo no importa ni envuelve `Button` internamente. |
| `AlertBanner` | Acepta `Button` en slot `action` para respuesta a la alerta. |
| `Badge` | Hermano habitual en `footer` de `Card`; complementa contexto sin integración en `Button`. |
| `ModuleCard` | Alternativa para entrada a módulo; `<button>` con estilos propios, no usa `Button`. |
| `SegmentedControl` | Alternativa para toggle entre segmentos; no compone ni extiende `Button`. |

---

# Content Guidelines

## Labels

- `children`: verbo o frase corta de acción (p. ej. `"Asignar"`, `"Filtros"`, `"Ver log"`, `"Cancelar"`). El CSS aplica `text-transform: uppercase`; no es obligatorio escribir en mayúsculas en la prop.
- Para botones de solo icono, proveer `aria-label` descriptivo vía `...props`; no hay story que demuestre este patrón en el repositorio.

## Values

- No aplica; `Button` no muestra valores numéricos ni métricas.

## Icons

- Pasar iconos como `ReactNode` en `iconLeft` o `iconRight`.
- Demos usan `lucide-react` (`Crosshair`, `Filter`, `Save`, `ArrowRight`, `AlertTriangle`).
- `.ds-button__icon` fija contenedor a 17×17 px; `.ds-button__icon svg` ocupa el 100%.
- Durante `loading`, los iconos no se renderizan.

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `children`.

---

# Examples

## Basic

```tsx
import { Button } from "@alejandria/ui-kit";

<Button>Asignar</Button>
```

## Variant

```tsx
import { Crosshair, Filter } from "lucide-react";
import { Button } from "@alejandria/ui-kit";

<Button iconLeft={<Crosshair />}>Asignar</Button>
<Button variant="secondary" iconLeft={<Filter />}>
  Filtros
</Button>
<Button variant="ghost">Ver log</Button>
<Button variant="danger">Cancelar</Button>
```

## Composition

```tsx
import { Badge, Button, Card } from "@alejandria/ui-kit";

<Card
  eyebrow="Mision"
  title="Evacuacion"
  description="Riesgo alto, avance estable y recursos en movimiento."
  footer={
    <>
      <Badge tone="success">Lote 1</Badge>
      <Button size="sm" variant="secondary">
        Ver tarea
      </Button>
    </>
  }
/>
```

---

# Reasoning Examples

## User Request

Acción principal "Asignar" y secundaria "Filtrar" en la barra superior de la consola.

### Recommended Components

- `Button` (primary + `iconLeft`) + `Button variant="secondary" iconLeft`

### Why

Patrón de `Button.stories.tsx` → `Variants`, `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx` → `.ops-command__tools`.

---

## User Request

Botón compacto "Ver log" en el pie de un panel.

### Recommended Components

- `Button size="sm" variant="secondary"`

### Why

Demos en `Card.stories.tsx` → `WithActionsAndFooter` y `Components.stories.tsx` dentro del `footer` de `Card`.

---

## User Request

Acción destructiva "Resolver" en un banner de alerta.

### Recommended Components

- `Button size="sm" variant="danger"` como `action` de `AlertBanner`

### Why

`AlertBanner.stories.tsx` → `WithAction` pasa `Button` en la prop `action`.

---

## User Request

Navegar a un módulo operativo con icono grande y métricas.

### Recommended Components

- `ModuleCard`

### Why

`ModuleCard` es un `<button>` navegable con estructura fija; `Button` no incluye icono de módulo ni filas de métricas.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-radius-xs` | radius | `border-radius` de `.ds-button` |
| `--ds-font-body` | typography | `font-family` de `.ds-button` |
| `--ds-focus-ring` | shadow | `box-shadow` en `.ds-button:focus-visible` |
| `--ds-color-teal-dark` | color | Color inferior del gradiente en `.ds-button--primary` |
| `--ds-color-line-strong` | color | `border-color` de `.ds-button--secondary` |
| `--ds-color-ink` | color | `color` de `.ds-button--secondary`; `color` en hover de `.ds-button--ghost` |
| `--ds-color-teal` | color | `border-color` en hover de `.ds-button--secondary` |
| `--ds-color-ink-soft` | color | `color` de `.ds-button--ghost` |

Nota: `.ds-button--primary` y `.ds-button--danger` usan gradientes y colores hardcodeados (`#82f3d8`, `#04110f`, `#ff696f`, `#bd1f2a`, etc.) además de tokens. El atributo `data-loading` no tiene reglas CSS asociadas; el estado de carga se refleja solo vía `disabled` y el spinner.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Button.tsx
```

## Dependencies

- `forwardRef` from `react`
- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-button`, `ds-button--{variant}`, `ds-button--{size}`, `ds-button--full`, `ds-button__icon`, `ds-button__label`, `ds-button__spinner`; animación `@keyframes ds-spin`)

## DOM Structure

```text
button.ds-button.ds-button--{variant}.ds-button--{size}[.ds-button--full]
├── span.ds-button__spinner[aria-hidden="true"] (solo si loading)
├── span.ds-button__icon (solo si iconLeft y no loading)
├── span.ds-button__label
│   └── {children}
└── span.ds-button__icon (solo si iconRight y no loading)
```

---

# Known Limitations

- No establece `type="button"` por defecto; dentro de `<form>` el comportamiento por defecto del navegador puede ser `submit`.
- Durante `loading`, el texto de `children` permanece visible junto al spinner; no hay ocultación visual ni `aria-busy`.
- Los contenedores de icono (`.ds-button__icon`) no aplican `aria-hidden`; iconos decorativos dependen del texto visible o `aria-label` del consumidor.
- `data-loading="true"` no tiene estilos CSS dedicados en `styles.css`.
- `fullWidth` no aparece en ninguna story ni demo de `apps/web`.
- Gradientes y colores de `primary` y `danger` mayoritariamente hardcodeados; migración incompleta a tokens.
- Sin tests unitarios ni de integración en el repositorio.
- `Button.displayName` es `"Button"` para depuración en React DevTools; no afecta la API pública.

---

# Future Improvements

- [ ] `type="button"` por defecto para evitar envíos accidentales en formularios
- [ ] `aria-busy="true"` y/o ocultación del label durante `loading`
- [ ] `aria-hidden="true"` en `.ds-button__icon` cuando el texto de `children` describe la acción
- [ ] Estilos CSS para `[data-loading="true"]` si se requiere feedback visual adicional
- [ ] Story de `fullWidth` y uso en layouts de formulario
- [ ] Migrar gradientes hardcodeados de `primary` y `danger` a tokens (`--ds-color-teal`, `--ds-color-danger`)
- [ ] Documentación JSDoc en `Button.tsx` según convenciones del repositorio

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `Button`, `ButtonProps`, `ButtonVariant` y `ButtonSize` con estilos `ds-button`, `forwardRef` y stories en Storybook (`Playground`, `Variants`, `Sizes`, `Loading`). Uso en `Card.stories.tsx`, `TextField.stories.tsx`, `AlertBanner.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`. |
