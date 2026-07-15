---
id: badge
name: Badge
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Badge.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Badge Chip

aliases:
  - chip
  - etiqueta
  - badge de estado
  - indicador compacto
keywords:
  - Badge
  - chip
  - etiqueta
  - estado
  - tone
  - dot
  - BadgeTone
  - neutral
  - info
  - success
  - warning
  - danger
tags:
  - feedback
  - labels
  - presentational
  - atom

last_reviewed: 2026-07-02
---

# Badge

## Purpose

Presenta una etiqueta compacta de estado o contexto con tono semántico y punto indicador opcional en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** mostrar etiquetas breves de estado (alerta, lote, simulación, conteo de tareas) con codificación visual por tono.
- **Problema que resuelve:** unificar chips de estado inline en encabezados, footers de paneles, tablas y feeds sin acoplar lógica de negocio ni interacción.
- **Alcance:** componente presentacional basado en `<span>`; el consumidor provee texto en `children`, tono semántico y opcionalmente un punto decorativo con `dot`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<span>` con clases `ds-badge` y `ds-badge--{tone}` por defecto.
- `tone` por defecto `"neutral"`; `dot` por defecto `false`.
- `children` renderizado como contenido textual del badge.
- Cuando `dot` es `true`: muestra `<span class="ds-badge__dot" aria-hidden="true">` antes de `children`.
- Fusión de `className` externa con `ds-badge` y el modificador de tono mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLSpanElement>` al `<span>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni determina el tono a partir de datos externos.
- Compone internamente `Button`, `Card`, `AlertBanner`, `DataTable` ni otros componentes del kit.
- Define interactividad, manejadores de clic ni semántica de botón o enlace.
- Expone props de tamaño, icono ni variantes más allá de `tone` y `dot`.
- Aplica roles ARIA propios ni etiquetas accesibles automáticas.
- Aplica estilos responsivos propios (sin media queries en `.ds-badge`).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer texto descriptivo en `children` para comunicar el estado o contexto.

## Forbidden

- Inventar props que no existan en `BadgeProps` (`variant`, `size`, `icon`, `onClick`, etc.).
- Usar `Badge` como sustituto de `AlertBanner` para mensajes con título, descripción y acción.
- Usar `Badge` como control interactivo clicable sin envolverlo en un elemento interactivo del consumidor.
- Asumir que `dot` transmite información accesible por sí solo (`aria-hidden="true"` en el punto).

## Recommendations

- Usar `dot` en encabezados de consola para alertas o contexto geográfico, según `Components.stories.tsx` y `apps/web/src/App.tsx`.
- Usar `tone="success"` en footers de `Card` para etiquetas de lote o estado positivo (`Card.stories.tsx`, `apps/web`).
- Usar `tone="danger" dot` para alertas breves inline ("Alerta nueva").
- Usar `tone` sin `dot` en celdas de tabla o feeds compactos (`DataTable.stories.tsx`, `WithoutDot`).
- Combinar con `Button` en `footer` de `Card` para contexto de estado y acción secundaria.

---

# Category

| Field | Value |
|--------|-------|
| Type | atom |
| Group | Labels |
| Package | @alejandria/ui-kit |
| Import | `import { Badge } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Badge,
  type BadgeProps,
  type BadgeTone
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Badge` — componente funcional.
- `BadgeProps` — props del componente.
- `BadgeTone` — unión de tonos semánticos para la prop `tone`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `children` | `ReactNode` | — | no | Texto o contenido de la etiqueta. Renderizado dentro del `<span>` raíz tras el punto opcional. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `tone` | `BadgeTone` | `"neutral"` | no | Tono semántico. Aplica clase `ds-badge--{tone}` en la raíz. |
| `dot` | `boolean` | `false` | no | Cuando es `true`, muestra punto indicador en `.ds-badge__dot` con `aria-hidden="true"`. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-badge` y el modificador de tono en el `<span>` raíz. |
| `...props` | `HTMLAttributes<HTMLSpanElement>` | — | no | Atributos nativos del `<span>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). |

### BadgeTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Valor por defecto. Fondo semitransparente, borde de línea, texto suave. Clase `ds-badge--neutral`. |
| `"info"` | Fondo azul suave, borde y texto azul. Clase `ds-badge--info`. |
| `"success"` | Fondo verde suave, borde y texto verde. Clase `ds-badge--success`. |
| `"warning"` | Fondo ámbar suave, borde y texto ámbar. Clase `ds-badge--warning`. |
| `"danger"` | Fondo rojo suave, borde y texto de peligro. Clase `ds-badge--danger`. |

---

# Variants

Describe every public visual variant.

## Default

Cinco tonos públicos implementados en CSS mediante modificadores BEM. Todas las instancias comparten estilos base de `.ds-badge`: `inline-flex`, `gap: 7px`, `min-height: 24px`, `padding: 0 8px`, `font-size: 0.68rem`, `font-weight: 700`, `text-transform: uppercase`, `white-space: nowrap`, `border-radius: var(--ds-radius-xs)`, `font-family: var(--ds-font-mono)`.

| Tone | Apariencia implementada |
|------|-------------------------|
| `neutral` | Fondo `rgb(255 255 255 / 0.05)`, borde `var(--ds-color-line)`, texto `var(--ds-color-ink-soft)`. |
| `info` | Fondo `var(--ds-color-blue-soft)`, borde `rgb(98 184 215 / 0.42)`, texto `var(--ds-color-blue)`. |
| `success` | Fondo `var(--ds-color-green-soft)`, borde `rgb(133 214 111 / 0.42)`, texto `var(--ds-color-green)`. |
| `warning` | Fondo `var(--ds-color-amber-soft)`, borde `rgb(215 178 74 / 0.46)`, texto `var(--ds-color-amber)`. |
| `danger` | Fondo `var(--ds-color-danger-soft)`, borde `rgb(255 61 72 / 0.5)`, texto `var(--ds-color-danger)`. |

El modificador `dot` añade `.ds-badge__dot` (7×7 px, `border-radius: 999px`, `box-shadow: 0 0 12px currentColor`, `background: currentColor`) antes del texto; el color del punto hereda el `color` del tono.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-badge` según `tone`. Sin estados `:hover`, `:focus` ni `:disabled` en CSS. |
| With dot | Cuando `dot` es `true`, se muestra `.ds-badge__dot` con `aria-hidden="true"` antes de `children`. |
| Without dot | Cuando `dot` es `false`, solo se renderiza el contenido de `children`. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica genérica de `<span>`; no define rol ni nombre accesible propios.
- El texto de `children` queda expuesto en el árbol de accesibilidad como contenido estático.
- El punto decorativo lleva `aria-hidden="true"`; no se anuncia a tecnologías asistivas.
- El consumidor es responsable de que `children` describa el estado de forma suficiente; el tono visual no se expone programáticamente.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-hidden="true"` | Aplicado por el componente en `.ds-badge__dot` cuando `dot` es `true`. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `role`, etc. en el `<span>` raíz. El componente no los aplica por defecto. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo haga mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`Badge` no define media queries. Es `inline-flex` con `white-space: nowrap`; el ancho lo define el contenido de `children`.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Tamaño fijo por estilos base (`min-height: 24px`); el layout responsivo depende del contenedor padre. |
| Storybook `Tones` | Contenedor padre con `display: flex`, `flexWrap: wrap`, `gap: 10`; el colapso depende del padre, no del componente. |
| `apps/web` | Badges en encabezado, mapa, footers de `Card`, encabezados de sección y feed de eventos; sin reglas CSS propias del badge en viewport estrecho. |

---

# Composition

## Purpose in Layout

- **Summary** — etiqueta de estado breve en encabezados de consola o sección.
- **Detail** — contexto en `footer` de `Card` (lote, simulación, cobertura geográfica).
- **Container** — no es contenedor; etiqueta inline sin slots adicionales.

## Parent

- `footer` de `Card` (junto con `Button` en demos).
- `div.ops-command__title` y `div.ops-map__topline` en `apps/web/src/App.tsx`.
- `div.ops-section-head` y `div.ops-feed__item` en `apps/web`.
- Celdas de `DataTable` cuando el consumidor pasa `<Badge>` como `ReactNode` en datos de fila (`DataTable.stories.tsx`).
- Encabezado de `Components.stories.tsx` → `OperationsConsole`.

## Children

- Texto o `ReactNode` vía prop `children` (demos usan strings cortos).

## Siblings

- `Button` — acción secundaria en el mismo `footer` de `Card`.
- `h1`, `h2`, `p` — títulos y descripciones adyacentes en encabezados de consola.
- `Card`, `TaskCard`, `MetricCard` — paneles y tarjetas en la misma vista.
- `AlertBanner` — alternativa para mensajes extensos con descripción y acción.

## Alternatives

- `AlertBanner` — mensaje de alerta con título, descripción, icono y slot `action`.
- Texto plano — sin codificación visual por tono ni estilos del kit.
- `MetricCard` — indicador KPI numérico, no etiqueta de estado compacta.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `AlertBanner` | Alternativa para alertas narrativas; `Badge` es compacto e inline sin descripción ni acción. |
| `Button` | Hermano habitual en `footer` de `Card`; acción interactiva complementaria al contexto del badge. |
| `Card` | Usa `Badge` en `footer` como etiqueta de contexto; no hay composición interna. |
| `DataTable` | Acepta `Badge` como contenido de celda vía datos del consumidor; no importa `Badge` internamente. |
| `TaskCard` | Tarjeta de tarea con estado propio en texto; `Badge` puede etiquetar contexto adyacente, sin integración interna. |
| `ModuleCard` | No usa `Badge`; métricas y título propios en la tarjeta de módulo. |

---

# Content Guidelines

## Labels

- `children`: texto breve (p. ej. `"Alerta nueva"`, `"Lote 1"`, `"5 tareas pendientes"`, `"Critica"`). El CSS aplica `text-transform: uppercase`; no es obligatorio escribir en mayúsculas en la prop.
- Evitar frases largas; el badge usa `white-space: nowrap` y `text-overflow` no está definido en el contenedor raíz.

## Values

- No formatea números; si el conteo forma parte de la etiqueta, preformatear en `children` (p. ej. `"5 tareas pendientes"`).

## Icons

- `Badge` no expone prop `icon` ni slot para iconos.
- El modificador `dot` actúa como indicador visual circular, no como icono semántico.

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `children`.

---

# Examples

## Basic

```tsx
import { Badge } from "@alejandria/ui-kit";

<Badge tone="neutral" dot>
  En espera
</Badge>
```

## Variant

```tsx
import { Badge } from "@alejandria/ui-kit";

<Badge tone="neutral" dot>En espera</Badge>
<Badge tone="info" dot>Todo el pais</Badge>
<Badge tone="success" dot>Lote 1</Badge>
<Badge tone="warning" dot>Simulacion</Badge>
<Badge tone="danger" dot>Alerta nueva</Badge>
<Badge tone="danger">Critico</Badge>
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

Etiqueta compacta "Alerta nueva" junto al título de la consola.

### Recommended Components

- `Badge tone="danger" dot`

### Why

Patrón de `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx` → `ops-command__title`.

---

## User Request

Etiqueta de lote en el pie de un panel de misión.

### Recommended Components

- `Badge tone="success"`

### Why

`Card.stories.tsx` → `WithActionsAndFooter` y `apps/web` usan `Badge` sin `dot` en `footer`.

---

## User Request

Columna de estado en una tabla de operaciones.

### Recommended Components

- `Badge` con tono según estado (`danger`, `success`, `warning`, `info`)

### Why

`DataTable.stories.tsx` pasa `<Badge tone="...">` como valor de celda en columnas `status` y `state`.

---

## User Request

Banner con título, descripción y botón para resolver una alerta crítica.

### Recommended Components

- `AlertBanner`

### Why

`Badge` no admite `description`, `icon` ni slot `action`; `AlertBanner` cubre mensajes extensos con acción opcional.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-radius-xs` | radius | `border-radius` de `.ds-badge` |
| `--ds-font-mono` | typography | `font-family` de `.ds-badge` |
| `--ds-color-line` | color | `border-color` de `.ds-badge--neutral` |
| `--ds-color-ink-soft` | color | `color` de `.ds-badge--neutral` |
| `--ds-color-blue-soft` | color | `background` de `.ds-badge--info` |
| `--ds-color-blue` | color | `color` de `.ds-badge--info` |
| `--ds-color-green-soft` | color | `background` de `.ds-badge--success` |
| `--ds-color-green` | color | `color` de `.ds-badge--success` |
| `--ds-color-amber-soft` | color | `background` de `.ds-badge--warning` |
| `--ds-color-amber` | color | `color` de `.ds-badge--warning` |
| `--ds-color-danger-soft` | color | `background` de `.ds-badge--danger` |
| `--ds-color-danger` | color | `color` de `.ds-badge--danger` |

Nota: el fondo de `.ds-badge--neutral` usa `rgb(255 255 255 / 0.05)` hardcodeado. Los bordes de tonos `info`, `success`, `warning` y `danger` usan valores `rgb(...)` inline en lugar de tokens de borde dedicados.

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
packages/ui/src/components/Badge.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-badge`, `ds-badge--{tone}`, `ds-badge__dot`)

## DOM Structure

```text
span.ds-badge.ds-badge--{tone}
├── span.ds-badge__dot[aria-hidden="true"] (solo si dot es true)
└── {children}
```

---

# Known Limitations

- No es interactivo; semántica de `<span>` sin rol ARIA por defecto.
- El tono semántico es solo visual; no se expone con `aria-*` ni atributos de estado.
- No expone props de tamaño, icono ni variantes adicionales.
- `children` es opcional en TypeScript; una instancia sin contenido ni `aria-label` sería vacía para lectores de pantalla.
- Sin estados `:hover`, `:focus` ni `:disabled` en CSS.
- Sin tests unitarios ni de integración en el repositorio.
- El título de Storybook es `Alejandria/Badge Chip`, no `Alejandria/Badge`.
- Bordes de tonos no neutros usan colores `rgb(...)` hardcodeados parcialmente.

---

# Future Improvements

- [ ] Prop opcional de tamaño si el diseño lo requiere
- [ ] `aria-label` o texto oculto cuando el tono aporta significado no presente en `children`
- [ ] Migrar bordes hardcodeados a tokens (`--ds-color-*` con opacidad)
- [ ] Story que demuestre uso en `DataTable` desde la página del componente
- [ ] Documentación JSDoc en `Badge.tsx` según convenciones del repositorio
- [ ] Alinear título de Storybook con `Alejandria/Badge` si se estandariza nomenclatura

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `Badge`, `BadgeProps` y `BadgeTone` con estilos `ds-badge` y stories en Storybook (`Playground`, `Tones`, `WithoutDot`). Uso en `Card.stories.tsx`, `DataTable.stories.tsx`, `Components.stories.tsx` y `apps/web/src/App.tsx`. |
