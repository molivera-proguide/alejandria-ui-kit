---
id: skeleton
name: Skeleton
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Skeleton.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Skeleton

aliases:
  - placeholder de carga
  - loading skeleton
  - shimmer
  - recuadro de carga
keywords:
  - Skeleton
  - skeleton
  - loading
  - shimmer
  - SKELETON
  - placeholder
  - SkeletonProps
  - SkeletonVariant
tags:
  - feedback
  - indicators
  - presentational
  - atom

last_reviewed: 2026-08-05
---

# Skeleton

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 14 — SKELETON** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 14).

## Purpose

Presenta un recuadro animado en lugar de objetos reales mientras se realiza la carga en pantallas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** ocupar espacio visual de contenido pendiente con un placeholder de forma `rect` o `circle` y pulso de opacidad.
- **Problema que resuelve:** unificar el skeleton PDF (recuadros `#2a2927`, animación lineal) sin acoplar layouts de cards ni un prop `loading` en otros componentes.
- **Alcance:** átomo presentacional basado en `<div class="ds-skeleton">`; el consumidor provee dimensiones (`width` / `height`) y compone múltiples instancias manualmente.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div class="ds-skeleton">` con fondo `var(--ds-color-pdf-surface-warm)` (`#2a2927` sólido — PDF «Recuadros»).
- `variant` por defecto `"rect"` (`border-radius: var(--ds-radius-sm)`); `"circle"` aplica `ds-skeleton--circle` (`border-radius: var(--ds-radius-pill)`).
- Animación CSS `ds-skeleton-shimmer`: pulso de opacidad `1 → 0.55 → 1` en `var(--ds-duration-shimmer)` con `var(--ds-ease-standard)`.
- `width` / `height` opcionales: `number` → px; `string` se aplica tal cual, vía `style` inline.
- Fusión de `style`: primero dimensiones de props, luego `style` del consumidor (el consumidor gana en conflictos).
- `aria-hidden="true"` por defecto en la raíz; sobrescribible vía `...props` (mismo patrón que ProgressRing con atributos ARIA).
- Fusión de `className` externa con clases base mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `data-*`, `aria-*`, etc.).

## This component never

- Dibuja el «Fondo» PDF (`#2a2927` al 70% de opacidad); eso es responsabilidad del contenedor padre (token disponible: `--ds-color-pdf-surface-warm-a70`).
- Expone ejes `tone`, `size` o `appearance`.
- Admite `children`, `count`, `lines` ni composición interna de múltiples líneas.
- Compone internamente `MetricCard`, `ChartCard`, `InvestigationCard`, `TaskCard` ni otros componentes del kit.
- Usa `forwardRef`.
- Aplica un barrido de degradé (shimmer gradient); la lectura implementada es pulso de opacidad lineal.
- Define media queries ni breakpoints propios.
- Impone dimensiones por defecto en CSS (sin `width`/`height` el bloque puede colapsar).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Tratar PDF p.14 como referencia canónica de apariencia.
- Proveer `width` y/o `height` (o CSS externo) para que el placeholder sea visible.

## Forbidden

- Inventar props que no existan en `SkeletonProps` (`tone`, `size`, `appearance`, `children`, `count`, `lines`, etc.).
- Asumir que Skeleton pinta el fondo de card/región al 70% (PDF «Fondo»); aplicar ese wash en el padre.
- Hardcodear hex reutilizables en lugar de tokens (`--ds-color-pdf-surface-warm`, `--ds-duration-shimmer`, etc.).
- Usar `Skeleton` como indicador de progreso numérico (`ProgressRing`).
- Integrar Skeleton como prop `loading` de cards en esta versión (fuera de alcance; ver Future Improvements).

## Recommendations

- Componer varios `<Skeleton>` para layouts de carga (avatar + líneas + bloque), como en la story `ComposedOnFondo`.
- En pantallas PDF/reporting, envolver la región de carga con `background: var(--ds-color-pdf-surface-warm-a70)` cuando se necesite el wash «Fondo» del PDF.
- En Storybook, usar un decorator opaco `var(--ds-color-pdf-surface)`: el addon `backgrounds` no está registrado (`addons: []`), así que `parameters.backgrounds` no tiene efecto.
- Para círculos, pasar `width` y `height` iguales.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Indicators |
| Package | @alejandria/ui-kit |
| Import | `import { Skeleton } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Skeleton,
  type SkeletonProps,
  type SkeletonVariant
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Skeleton` — componente funcional.
- `SkeletonProps` — props del componente.
- `SkeletonVariant` — unión `"rect" | "circle"`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `variant` | `"rect" \| "circle"` | `"rect"` | no | Forma: rectángulo (`--ds-radius-sm`) o círculo (`--ds-radius-pill` vía `ds-skeleton--circle`). |
| `width` | `number \| string` | — | no | Ancho inline. Número → px; string se aplica tal cual. |
| `height` | `number \| string` | — | no | Alto inline. Número → px; string se aplica tal cual. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-skeleton` en el `<div>` raíz. |
| `style` | `CSSProperties` | — | no | Estilos inline; se aplican **después** de `width`/`height` (el consumidor gana en conflictos). |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `data-*`, `aria-*`, etc.). Puede sobrescribir `aria-hidden`. |

---

# Variants

## Default (`rect`)

Recuadro con `border-radius: var(--ds-radius-sm)` y fondo sólido `--ds-color-pdf-surface-warm`.

## Circle

Modificador BEM `ds-skeleton--circle`: `border-radius: var(--ds-radius-pill)`.

| Elemento | Rol visual (PDF p.14) |
|----------|------------------------|
| Recuadro | `#2a2927` sólido (`--ds-color-pdf-surface-warm`) |
| Fondo de región (padre) | `#2a2927` @ 70% (`--ds-color-pdf-surface-warm-a70`) — **no** dibujado por Skeleton |
| Animación | Pulso de opacidad lineal (lectura implementada de «transparencia lineal») |

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-skeleton` con animación shimmer continua. Sin `:hover`, `:focus` ni `:disabled`. |
| Circle | Cuando `variant="circle"`, se aplica `.ds-skeleton--circle`. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Por defecto es decorativo: `aria-hidden="true"` en la raíz.
- El consumidor puede sobrescribir ARIA vía `...props` (p. ej. quitar `aria-hidden` o añadir `aria-label` si el placeholder debe anunciarse).
- El componente no define `role` ni `aria-busy` por sí solo; el contenedor de carga puede usar `aria-busy` a nivel de región.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en la raíz; sobrescribible vía `...props`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `role`, etc. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado propio (no es interactivo). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Skeleton` no define media queries. Las dimensiones las define el consumidor (`width`/`height` o CSS).

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. `display: block`; tamaño vía props o CSS externo. |
| Storybook decorator | `padding: 32` + `background: var(--ds-color-pdf-surface)` en el contenedor de `Skeleton.stories.tsx` — necesario porque el addon `backgrounds` no está registrado y el wash «Fondo» al 70% no es opaco por sí solo sobre canvas claro. |

---

# Composition

## Purpose in Layout

- **Indicators** — placeholder de carga mientras llegan datos.
- **Container** — átomo sin `children`; el consumidor apila varios `Skeleton`.
- **Detail** — no sustituye cards; ocupa su lugar visual temporalmente.

## Parent

- Región o card padre con wash `--ds-color-pdf-surface-warm-a70` (PDF «Fondo»).
- Contenedor oscuro de Storybook en `Skeleton.stories.tsx`.
- Futuros slots `loading` de cards (fuera de alcance en esta versión).

## Children

- No admite `children`. Cada instancia es un solo recuadro.

## Siblings

- Otros `Skeleton` — composición manual de layouts de carga.
- `Empty` — estado sin datos (no carga en curso).
- `ProgressRing` — progreso numérico conocido, no placeholder de geometría.

## Alternatives

- `ProgressRing` — avance porcentual; no es skeleton de layout.
- `Empty` — ausencia de elementos, no estado de carga.
- CSS/`div` custom — sin tokens ni animación del kit.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Empty` | Hermano de feedback PDF; Empty = sin datos, Skeleton = carga en curso. Ambos delegan fondo/centrado al padre. |
| `ProgressRing` | Átomo Indicators con ejes `tone`/`size`; progreso conocido vs placeholder. |
| `MetricCard` / `ChartCard` / `InvestigationCard` / `TaskCard` | Consumidores potenciales futuros (prop `loading`); **no** integrados en esta pasada. |

---

# Content Guidelines

## Labels

- No aplica; el skeleton es decorativo por defecto (`aria-hidden`).

## Values

- No muestra métricas; solo geometría placeholder.

## Icons

- No aplica. Usar `variant="circle"` para pozos de ícono/avatar.

## Localization

- Sin copy. Las stories no imponen idioma.

---

# Examples

## Basic

```tsx
import { Skeleton } from "@alejandria/ui-kit";

<Skeleton width={200} height={16} />
```

## Variant

```tsx
import { Skeleton } from "@alejandria/ui-kit";

<Skeleton variant="rect" width={200} height={16} />
<Skeleton variant="circle" width={40} height={40} />
```

## Composition

```tsx
import { Skeleton } from "@alejandria/ui-kit";

<div
  style={{
    background: "var(--ds-color-pdf-surface-warm-a70)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 16
  }}
>
  <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
    <Skeleton variant="circle" width={40} height={40} />
    <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8 }}>
      <Skeleton width="100%" height={12} />
      <Skeleton width="60%" height={12} />
    </div>
  </div>
  <Skeleton width="100%" height={72} />
</div>
```

---

# Reasoning Examples

## User Request

Mostrar placeholders mientras cargan las métricas de un panel.

### Recommended Components

- Varios `Skeleton` compuestos por el consumidor (y wash `--ds-color-pdf-surface-warm-a70` en el padre si aplica)

### Why

PDF p.14 define recuadros animados; no hay prop `count`/`lines` — composición manual como Empty sin `children` libres.

---

## User Request

Indicar 75% de avance de una misión.

### Recommended Components

- `ProgressRing value={75}`

### Why

`Skeleton` no expresa progreso numérico; es geometría de carga.

---

## User Request

Mensaje «no hay tareas» con botón para crear.

### Recommended Components

- `Empty` + `Button` en `action`

### Why

Ausencia de datos ≠ estado de carga; ver Empty PDF p.16.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface-warm` | color | Fondo de `.ds-skeleton` (PDF «Recuadros» `#2a2927`) |
| `--ds-radius-sm` | radius | Radio de `variant="rect"` |
| `--ds-radius-pill` | radius | Radio de `variant="circle"` (`.ds-skeleton--circle`) |
| `--ds-duration-shimmer` | motion | Duración de la animación (`1600ms`) |
| `--ds-ease-standard` | motion | Timing function de la animación |

Token de consumidor (no consumido por `.ds-skeleton`):

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-surface-warm-a70` | color | Wash «Fondo» PDF (`#2a2927` @ 70%) para el contenedor padre |

---

# Implementation Notes

This section is intended for maintainers extending the component.

> **Interno (mantenedores).** Las rutas de esta sección (Source File, Dependencies, DOM Structure)
> son fuente del monorepo (`packages/ui/**`); no forman parte de la API publicada de
> `@alejandria/ui-kit`. Un consumidor externo usa el import de arriba y `@alejandria/ui-kit/style.css`.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Skeleton.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-skeleton`, `ds-skeleton--circle`; keyframes `ds-skeleton-shimmer`)

## DOM Structure

```text
div.ds-skeleton[.ds-skeleton--circle][aria-hidden="true"]
```

---

# Known Limitations

- No expone `children`, `count`, `lines`, `tone`, `size` ni `appearance`.
- El «Fondo» al 70% no lo dibuja el componente; el consumidor debe aplicarlo.
- Sin dimensiones por defecto en CSS; sin `width`/`height` el bloque puede ser invisible.
- Animación = pulso de opacidad (no barrido de degradé); ver open question en spec.
- Sin integración `loading` en MetricCard / ChartCard / InvestigationCard / TaskCard.
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Playground`, `Rect`, `Circle`, `ComposedOnFondo`).
- El PDF ilustra una composición de ejemplo (dos "cards" con recuadros + líneas de distinto ancho/alto — ver spec § Deltas para las coordenadas exactas) pero **no** anota el tamaño de ningún recuadro individual como valor de spec; es una ilustración de layout, no una medida a replicar 1:1 (misma distinción que la "lección ModuleCard": un diagrama en el PDF no siempre es la fuente de verdad de tamaño). `ComposedOnFondo` ya refleja el mismo patrón compositivo (avatar circular + líneas + bloque) sin copiar coordenadas literales.

---

# Future Improvements

- [ ] Confirmar con design si la animación debe ser barrido de degradé en lugar de (o además de) pulso de opacidad
- [ ] Integrar como estado `loading` de MetricCard / ChartCard / InvestigationCard / TaskCard
- [ ] Confirmar dimensiones tipográficas de ejemplo en el artboard PDF (p.14 no anota tamaños de recuadro)

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `Skeleton` / `SkeletonProps` / `SkeletonVariant` con estilos `ds-skeleton` según PDF p.14 SKELETON, y stories `Playground`, `Rect`, `Circle`, `ComposedOnFondo`. |
