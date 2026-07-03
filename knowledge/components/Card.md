---
id: card
name: Card
category: layout
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/Card.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/Card

aliases:
  - panel
  - tarjeta
  - contenedor de panel
  - mission card
keywords:
  - Card
  - panel
  - contenedor
  - tarjeta compuesta
  - misión
  - evacuación
  - pronóstico
  - encabezado
  - footer
  - actions
  - dashboard
  - operaciones
  - CardProps
tags:
  - layout
  - cards
  - container
  - molecule
  - composable

last_reviewed: 2026-07-02
---

# Card

## Purpose

Agrupa contenido operativo en un panel con encabezado, cuerpo y pie opcionales dentro del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** ofrecer un contenedor presentacional con regiones semánticas (encabezado, cuerpo, pie) para paneles de misión, pronóstico o detalle compuesto en consolas de operaciones.
- **Problema que resuelve:** unificar la estructura visual de tarjetas con eyebrow, título, descripción, acciones contextuales, contenido libre y acciones secundarias en el pie, sin acoplar un tipo de dato concreto.
- **Alcance:** componente de layout; el consumidor provee strings para el encabezado, `ReactNode` para `actions`, `children` y `footer`, y define la interactividad de los nodos insertados en cada slot.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado presentacional sin estado interno ni efectos secundarios.
- Raíz semántica `<section>` con clase `ds-card`.
- Encabezado (`header.ds-card__header`) renderizado cuando al menos una de `eyebrow`, `title`, `description` o `actions` es truthy.
- Cada campo del encabezado se renderiza solo si su valor es truthy (`eyebrow` → `p.ds-card__eyebrow`, `title` → `h3.ds-card__title`, `description` → `p.ds-card__description`, `actions` → `div.ds-card__actions`).
- `children` envuelto en `div.ds-card__body` solo cuando `children` es truthy.
- `footer` renderizado en `footer.ds-card__footer` solo cuando `footer` es truthy.
- Fusión de `className` externa con `ds-card` mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLElement>` al `<section>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni transforma datos.
- Define props de variante visual (`variant`, `tone`, `size`, etc.).
- Envuelve `actions` en un control interactivo; el slot es un contenedor pasivo.
- Impone estructura ni estilos al contenido de `children` o `footer`.
- Aplica estilos responsivos propios (sin media queries en `.ds-card`).
- Define roles ARIA, etiquetas accesibles ni manejo de teclado propios.
- Compone ni delega en `ChartCard`, `MetricCard`, `TaskCard` ni `ModuleCard`.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer interactividad y accesibilidad de los nodos pasados en `actions` y `footer` (p. ej. envolver iconos en `<button>` con `aria-label` cuando actúen como controles).
- Preformatear `eyebrow`, `title` y `description` como strings antes de pasarlos al componente.

## Forbidden

- Inventar props que no existan en `CardProps` (`variant`, `tone`, `icon`, `onAction`, etc.).
- Asumir que `actions` renderiza un botón o icono con comportamiento definido por `Card`.
- Asumir variantes visuales o estados interactivos en la tarjeta raíz.
- Usar `Card` para KPIs puntuales de solo lectura (`MetricCard`), tareas con progreso fijo (`TaskCard`), navegación por módulo (`ModuleCard`) o contenedores de gráficos (`ChartCard` y derivados).
- Anidar `Card` dentro de otra `Card` como patrón soportado por el design system (no hay reglas ni demos que lo validen).

## Recommendations

- Combinar `Badge` y `Button size="sm" variant="secondary"` en `footer` para contexto de estado y acción secundaria, según `Card.stories.tsx` y `Components.stories.tsx`.
- Usar `ProgressRing`, métricas o `TextField` dentro de `children` para paneles compuestos de detalle.
- Omitir props de encabezado no necesarias; `BodyOnly` demuestra panel compacto con solo `children`.
- Agrupar varias tarjetas en un contenedor padre con grid o flex; el colapso responsivo lo define el layout del padre.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/Card.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  Card,
  type CardProps
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `Card` — componente función.
- `CardProps` — props del componente.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `eyebrow` | `string` | — | no | Texto superior del encabezado. Renderizado en `p.ds-card__eyebrow` solo si es truthy. |
| `title` | `string` | — | no | Título del panel. Renderizado en `h3.ds-card__title` solo si es truthy. |
| `description` | `string` | — | no | Texto descriptivo bajo el título. Renderizado en `p.ds-card__description` solo si es truthy. |
| `actions` | `ReactNode` | — | no | Contenido alineado a la derecha del encabezado. Renderizado en `div.ds-card__actions` solo si es truthy. No interactúa por sí mismo. |
| `children` | `ReactNode` | — | no | Contenido principal del panel. Envuelto en `div.ds-card__body` solo si es truthy. |
| `footer` | `ReactNode` | — | no | Pie de la tarjeta. Renderizado en `footer.ds-card__footer` solo si es truthy. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-card`. |
| `...props` | `HTMLAttributes<HTMLElement>` | — | no | Atributos nativos del `<section>` raíz (`id`, `style`, `aria-*`, `data-*`, etc.). |

Ninguna prop es obligatoria en el tipo. Una instancia sin props truthy renderiza `<section class="ds-card"></section>` vacía.

---

# Variants

Describe cada variante visual pública.

## Default

Única variante visual implementada. Clase raíz `ds-card` con fondo glass, borde, sombra, línea decorativa superior (`::before`) y subclases BEM para encabezado, cuerpo y pie. No existe prop `variant`.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-card`: fondo `--ds-color-surface-glass`, borde `--ds-color-line`, `border-radius: var(--ds-radius-xs)`, `box-shadow: var(--ds-shadow-sm)`. |
| Con encabezado | Cuando `eyebrow`, `title`, `description` o `actions` es truthy: se muestra `header.ds-card__header` con borde inferior. |
| Con cuerpo | Cuando `children` es truthy: se muestra `div.ds-card__body` con `padding: 16px`. |
| Con pie | Cuando `footer` es truthy: se muestra `footer.ds-card__footer` con fondo semitransparente y borde superior. |
| Solo cuerpo | Demostrado en `BodyOnly`: sin encabezado ni pie; solo `children` dentro del cuerpo. |
| Vacía | Sin props truthy: `<section>` sin hijos internos. |

`Card` no define estados `:hover`, `:focus` ni `:disabled` en `.ds-card`.

---

# Accessibility

Describe solo el comportamiento accesible implementado por el componente.

## Requirements

- Usa `<section>` como contenedor raíz, que expone un landmark genérico cuando no se asocia etiqueta explícita.
- Cuando `title` está presente, se renderiza como `<h3>` dentro de `<header>`.
- El consumidor debe proveer nombres accesibles para contenido interactivo en `actions` y `footer` (p. ej. `Button` con texto visible o `aria-label` en botones de solo icono).
- El consumidor puede pasar `aria-labelledby`, `aria-label` o `aria-describedby` vía `...props` en el `<section>` raíz.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Ninguno definido por el componente | — |
| Atributos del consumidor | Cualquier `aria-*` pasado vía `...props` se aplica al `<section>` raíz. |

No se establece `aria-labelledby` automáticamente hacia `ds-card__title`.

### Keyboard

| Key | Action |
|-----|--------|
| Ninguno definido por el componente | La navegación por teclado depende de los controles interactivos insertados por el consumidor en `actions`, `children` o `footer`. |

---

# Responsive Behavior

Documenta solo el comportamiento responsivo implementado por el componente mismo.

`Card` no define media queries. El ancho y el colapso en layouts estrechos dependen del contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints propios. `overflow: hidden` en `.ds-card`. |
| Storybook `Card` | Decorator con `minWidth: 420` y `padding: 32`; no forma parte del componente. |
| `ds-card__description` | `max-width: 58ch` fijo en CSS del componente. |
| `ds-card__footer` | `display: flex`, `justify-content: space-between`, `gap: 12px`; sin reglas de colapso en el componente. |

---

# Composition

## Purpose in Layout

- **Container** — agrupa contenido heterogéneo (métricas, anillos de progreso, campos de búsqueda) en un panel delimitado.
- **Detail** — presenta información ampliada de una misión o pronóstico junto a resúmenes (`MetricCard`) y listas (`TaskCard`).
- **Action** — expone acciones secundarias en `footer` y controles contextuales en `actions` sin definir la interacción.

## Parent

- `div` con grid o flex en dashboards operativos (`Components.stories.tsx` → `OperationsConsole`).
- Contenedor centrado de Storybook con ancho mínimo (`Card.stories.tsx` decorator).
- `section` o `div` de layout en consolas donde el consumidor dispone paneles de detalle adyacentes a filas de KPIs o tareas.

## Children

- Cualquier `ReactNode` en `children` (demos: `ProgressRing`, texto, `TextField`, layouts en grid inline).
- Cualquier `ReactNode` en `actions` (demos: iconos de `lucide-react` como `<Eye />` o `<Crosshair />`).
- Cualquier `ReactNode` en `footer` (demos: fragmento con `Badge` + `Button`).

## Siblings

- `MetricCard` — fila de KPIs de resumen encima o al lado del panel de detalle.
- `TaskCard` — listas de tareas en la misma vista de consola.
- `Badge` — contexto de estado en `footer`.
- `Button` — acción secundaria en `footer` (`size="sm"`, `variant="secondary"` en demos).
- `ProgressRing` — indicador de avance dentro del cuerpo del panel.

## Alternatives

- `MetricCard` — indicador KPI puntual de solo lectura sin slots libres.
- `TaskCard` — tarjeta de tarea con estructura fija (código, estado, progreso).
- `ModuleCard` — tarjeta navegable de módulo con métricas embebidas.
- `ChartCard` — contenedor de gráficos con título y pie de texto obligatorios (`ds-chart-card`).

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `MetricCard` | Alternativa de solo lectura para KPIs; `Card` admite contenido libre en `children`. |
| `TaskCard` | Tarjeta de tarea con estructura fija; hermano habitual en dashboards, sin composición interna con `Card`. |
| `ModuleCard` | Navegación por módulo; alternativa cuando la interacción principal es entrar a un módulo, no mostrar panel compuesto. |
| `ChartCard` | Contenedor paralelo para gráficos; no usa ni extiende `Card` (`ds-chart-card` separado). |
| `BarChartCard` / `DonutChartCard` / `LineChartCard` | Componen `ChartCard`, no `Card`. |
| `Button` | Usado en `footer` para acciones secundarias ("Ver tarea", "Ver log"). |
| `Badge` | Usado en `footer` para etiquetas de contexto ("Lote 1", "todo el pais"). |
| `ProgressRing` | Usado en `children` para mostrar avance en demos de panel de misión. |
| `TextField` | Usado en `children` en `Components.stories.tsx` para búsqueda dentro del panel. |

---

# Content Guidelines

## Labels

- `eyebrow`: categoría o contexto breve en mayúsculas (p. ej. `"Mision"`). El CSS aplica `text-transform: uppercase` en `.ds-card__eyebrow`; no es obligatorio escribir en mayúsculas en la prop.
- `title`: nombre del panel en mayúsculas (p. ej. `"Evacuacion"`, `"Pronostico"`). El CSS aplica `text-transform: uppercase` en `.ds-card__title`.
- `description`: una o dos frases de contexto operativo en prosa normal.

## Values

- No aplica directamente; los valores numéricos o métricas van en `children` como nodos controlados por el consumidor (p. ej. texto dentro de un `div`, `ProgressRing`).

## Icons

- Pasar iconos como `ReactNode` en `actions` (demos usan `lucide-react`: `Eye`, `Crosshair`).
- `.ds-card__actions svg` fija `height` y `width` a 18px.
- Para iconos interactivos, envolver en `<button type="button">` con `aria-label` descriptivo; `Card` no lo hace automáticamente.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `eyebrow`, `title` y `description`.

---

# Examples

## Basic

```tsx
<Card
  eyebrow="Mision"
  title="Evacuacion"
  description="Riesgo alto, avance estable y recursos en movimiento."
/>
```

## Variant

No existen variantes públicas. Todas las instancias usan la apariencia por defecto de `ds-card`.

```tsx
<Card
  eyebrow="Mision"
  title="Evacuacion"
  description="Riesgo alto, avance estable y recursos en movimiento."
/>
```

## Composition

```tsx
import { Eye } from "lucide-react";
import { Badge, Button, Card, ProgressRing } from "@alejandria/ui-kit";

<Card
  eyebrow="Mision"
  title="Evacuacion"
  description="Riesgo alto, avance estable y recursos en movimiento."
  actions={<Eye />}
  footer={
    <>
      <Badge tone="success">Lote 1</Badge>
      <Button size="sm" variant="secondary">
        Ver tarea
      </Button>
    </>
  }
>
  <div style={{ alignItems: "center", display: "grid", gap: 18, gridTemplateColumns: "auto 1fr" }}>
    <ProgressRing value={75} label="avance" tone="warning" />
    <div style={{ display: "grid", gap: 6 }}>
      <strong style={{ fontFamily: "var(--ds-font-display)", fontSize: "1.8rem", lineHeight: 1 }}>
        348 personas
      </strong>
      <span style={{ color: "var(--ds-color-ink-soft)", fontFamily: "var(--ds-font-mono)", fontSize: ".72rem" }}>
        Fuera de zona critica
      </span>
    </div>
  </div>
</Card>
```

---

# Reasoning Examples

## User Request

Mostrar un panel de misión con título, descripción y acción en el pie.

### Recommended Components

- `Card` con `eyebrow`, `title`, `description`, `footer` con `Badge` + `Button size="sm" variant="secondary"`

### Why

Patrón de `Card.stories.tsx` → `WithActionsAndFooter` y `Components.stories.tsx` → `OperationsConsole`.

---

## User Request

Panel compacto sin encabezado para contenido auxiliar.

### Recommended Components

- `Card` con solo `children`

### Why

`Card.stories.tsx` → `BodyOnly` demuestra un panel sin `eyebrow`, `title`, `description`, `actions` ni `footer`.

---

## User Request

Fila de KPIs de riesgo, unidades y alertas en un dashboard.

### Recommended Components

- `MetricCard` (una instancia por indicador)

### Why

`Card` no tiene props para label/value ni está pensada para KPIs puntuales de solo lectura; `MetricCard` cubre ese caso.

---

## User Request

Listar tareas con código, estado y barra de progreso.

### Recommended Components

- `TaskCard`

### Why

`TaskCard` define estructura fija (`code`, `status`, `progress`, `meta`); `Card` requiere componer manualmente equivalente en `children`.

---

## User Request

Contenedor para gráfico de barras con título y pie descriptivo.

### Recommended Components

- `BarChartCard` (o `ChartCard` como base)

### Why

La familia `*ChartCard` usa `ds-chart-card`, no `Card`. `ChartCard` exige `title` y `footer` como strings.

---

# Design Tokens

Solo incluye tokens consumidos directamente por el componente.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-surface-glass` | color | Fondo de `.ds-card` |
| `--ds-color-line` | color | Borde de `.ds-card`; separadores de encabezado y pie |
| `--ds-radius-xs` | radius | `border-radius` de `.ds-card` |
| `--ds-shadow-sm` | shadow | `box-shadow` de `.ds-card` |
| `--ds-color-ink` | color | `color` de texto base en `.ds-card` |
| `--ds-color-teal` | color | `color` de `.ds-card__eyebrow` |
| `--ds-font-mono` | typography | `font-family` de `.ds-card__eyebrow` |
| `--ds-font-display` | typography | `font-family` de `.ds-card__title` |
| `--ds-font-body` | typography | `font-family` de `.ds-card__description` |
| `--ds-color-ink-soft` | color | `color` de `.ds-card__description` y `.ds-card__actions` |

Nota: `.ds-card::before` usa `rgb(108 224 199 / 0.75)` (teal hardcodeado). `.ds-card__footer` usa `background: rgb(0 0 0 / 0.2)` sin token dedicado.

---

# Implementation Notes

Esta sección está dirigida a quienes extienden el componente.

Leer después de:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/Card.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-card`, `ds-card__*`)

## DOM Structure

```text
section.ds-card
├── header.ds-card__header                    (si eyebrow | title | description | actions)
│   ├── div.ds-card__heading
│   │   ├── p.ds-card__eyebrow                (si eyebrow)
│   │   ├── h3.ds-card__title                 (si title)
│   │   └── p.ds-card__description            (si description)
│   └── div.ds-card__actions                  (si actions)
│       └── {actions}
├── div.ds-card__body                         (si children)
│   └── {children}
└── footer.ds-card__footer                    (si footer)
    └── {footer}
```

---

# Known Limitations

- No existe prop `variant`, `tone` ni `size`.
- `title` se renderiza siempre como `<h3>`; el componente no ajusta el nivel de encabezado al outline del documento.
- `actions` es un slot pasivo; iconos en demos se pasan sin `<button>` ni `aria-label` desde `Card`.
- No se genera `aria-labelledby` hacia el título del panel.
- No usa `forwardRef`.
- Instancia sin props truthy produce un `<section>` vacío sin región útil.
- `ChartCard` y derivados son implementaciones paralelas; no reutilizan `Card`.
- Sin documentación Figma vinculada en el repositorio.
- Storybook `Playground` no demuestra `children`, `actions` ni `footer`; esos patrones aparecen en `WithActionsAndFooter`, `BodyOnly` y `Components.stories.tsx`.

---

# Future Improvements

- [ ] Asociar `aria-labelledby` al `h3` del título cuando `title` está presente.
- [ ] Documentar o estandarizar el patrón de `actions` como botón de icono accesible.
- [ ] Añadir story de panel con `TextField` en el cuerpo (patrón ya usado en `Components.stories.tsx`).
- [ ] Evaluar `forwardRef` hacia el `<section>` raíz.
- [ ] Vincular diseño Figma cuando esté disponible.

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial con slots `eyebrow`, `title`, `description`, `actions`, `children`, `footer` y estilos `ds-card`. |
