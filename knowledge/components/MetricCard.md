---
id: metric-card
name: MetricCard
category: data-display
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/MetricCard.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/MetricCard

aliases:
  - tarjeta de métrica
  - KPI card
  - indicador operativo
keywords:
  - MetricCard
  - métrica
  - KPI
  - indicador
  - dashboard
  - operaciones
  - riesgo
  - alertas
  - resumen
  - tone
  - MetricTone
tags:
  - data-display
  - cards
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# MetricCard

## Purpose

Presenta un indicador operativo de solo lectura con etiqueta, valor principal y texto de cambio opcional en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** mostrar un KPI puntual (p. ej. riesgo operativo, unidades activas, alertas abiertas) en una tarjeta compacta con jerarquía visual fija.
- **Problema que resuelve:** unificar la presentación de métricas de resumen en filas de dashboard sin acoplar formato numérico, cálculo de tendencias ni navegación.
- **Alcance:** componente presentacional basado en `<div>`; el consumidor provee strings preformateados para `label`, `value` y `change`, y opcionalmente un `tone` semántico.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div>` con clases `ds-metric` y `ds-metric--{tone}` por defecto.
- `label` y `value` obligatorios en la firma de props; renderizados siempre en el DOM.
- `change` renderizado en `<span class="ds-metric__change">` solo cuando su valor es truthy.
- `tone` por defecto `"neutral"`; la clase modificadora `ds-metric--{tone}` se aplica en la raíz.
- Fusión de `className` externa con `ds-metric` y el modificador de tono mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni formatea datos numéricos.
- Renderiza iconos, gráficos ni `children`.
- Compone internamente `Card`, `ModuleCard`, `ProgressRing`, `Badge` ni otros componentes del kit.
- Define interactividad, manejadores de clic ni semántica de botón o enlace.
- Aplica estilos responsivos propios (sin media queries en `.ds-metric`).
- Define roles ARIA, etiquetas accesibles ni manejo de teclado propios.
- Diferencia visualmente los tonos `good`, `watch`, `critical` ni `neutral` mediante CSS en la implementación actual.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `label` y `value` como `string`.
- Preformatear `value` y `change` en el consumidor (unidades, porcentajes, localización).

## Forbidden

- Inventar props que no existan en `MetricCardProps` (`icon`, `variant`, `size`, `children`, `footer`, etc.).
- Pasar `icon` u otras props no declaradas esperando renderizado interno; atributos desconocidos se reenvían al `<div>` raíz sin efecto visual.
- Asumir que `tone` altera colores o acentos visuales (no hay reglas CSS para `.ds-metric--*`).
- Anidar otro `MetricCard` como hijo (no hay slot `children`).
- Confiar en formato automático de números, fechas ni tendencias.

## Recommendations

- Agrupar instancias en un contenedor con CSS Grid, como en la story `Tones` (`repeat(4, minmax(180px, 1fr))`) o en `apps/web` (`.ops-metrics` con `repeat(4, minmax(0, 1fr))`).
- Usar `key={metric.label}` al mapear listas, como en `apps/web/src/App.tsx`.
- Envolver la fila de métricas en `<section aria-label="...">` cuando el grupo requiera región semántica; `MetricCard` no la provee.
- Reservar `change` para contexto breve del valor (p. ej. `"critico"`, `"en campo"`, `"7 sin leer"`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Cards |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/MetricCard.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  MetricCard,
  type MetricCardProps,
  type MetricTone
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `MetricCard` — componente funcional.
- `MetricCardProps` — props del componente.
- `MetricTone` — unión de tonos semánticos para la prop `tone`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `label` | `string` | — | sí | Etiqueta de la métrica. Renderizada en `<span class="ds-metric__label">` dentro de `.ds-metric__topline`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `value` | `string` | — | sí | Valor principal de la métrica. Renderizado en `<strong class="ds-metric__value">`. |
| `change` | `string` | — | no | Texto de contexto o variación. Renderizado en `<span class="ds-metric__change">` solo si es truthy. Mayúsculas vía CSS. |
| `tone` | `MetricTone` | `"neutral"` | no | Tono semántico. Aplica clase `ds-metric--{tone}` en la raíz. Valores: `"neutral"`, `"good"`, `"watch"`, `"critical"`. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-metric` y el modificador de tono en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). |

### MetricTone

| Value | Description |
|-------|-------------|
| `"neutral"` | Valor por defecto. Clase `ds-metric--neutral`. |
| `"good"` | Clase `ds-metric--good`. Usado en demos para métricas positivas (p. ej. unidades activas). |
| `"watch"` | Clase `ds-metric--watch`. Usado en demos para métricas en observación (p. ej. alertas abiertas). |
| `"critical"` | Clase `ds-metric--critical`. Usado en demos para métricas críticas (p. ej. riesgo operativo). |

---

# Variants

Describe every public visual variant.

## Default

Única apariencia visual implementada en CSS mediante `.ds-metric` y sus elementos internos. Fondo semitransparente (`rgb(0 0 0 / 20%)`), borde con token de línea, sombra pequeña, `min-height: 132px`, layout en grid con `gap: 11px`.

La prop `tone` expone cuatro valores públicos (`neutral`, `good`, `watch`, `critical`) que añaden clases BEM (`ds-metric--*`) en la raíz, pero **no existen reglas CSS** para esas clases en `styles.css`; todas las instancias comparten la misma apariencia base.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-metric`. Sin estados `:hover`, `:focus`, `:active` ni `:disabled` definidos en CSS. |
| With change | Cuando `change` es truthy, se muestra `.ds-metric__change` debajo del valor. |
| Without change | Cuando `change` es `undefined`, vacío o falsy, el nodo de cambio no se renderiza. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa semántica genérica de `<div>`; no define rol, nombre accesible ni descripción propios.
- El texto visible (`label`, `value`, `change`) queda expuesto en el árbol de accesibilidad como contenido estático del `div`.
- El consumidor es responsable de proveer contexto semántico del grupo (p. ej. `aria-label` en un `<section>` padre) y atributos ARIA en la raíz si la métrica requiere nombre o descripción explícitos.
- No es interactivo; no recibe foco ni responde a teclado por diseño del componente.

### ARIA

| Attribute | Usage |
|-----------|-------|
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, `role`, etc. en el `<div>` raíz. El componente no los aplica por defecto. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado implementado. El componente no es focusable salvo que el consumidor lo haga mediante `tabIndex` u otro atributo vía `...props`. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`MetricCard` no define media queries. Impone `min-height: 132px` en `.ds-metric`; el ancho lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Tamaño mínimo vertical fijo; el ancho efectivo depende del grid o flex del padre. |
| Storybook `Tones` | Contenedor padre con `gridTemplateColumns: repeat(4, minmax(180px, 1fr))` y `gap: 14`; el colapso responsivo depende del grid del padre, no del componente. |
| `apps/web` `.ops-metrics` | Grid de 4 columnas en viewport amplio; media query del consumidor colapsa a `grid-template-columns: 1fr` bajo `@media (max-width: 960px)`. |

---

# Composition

## Purpose in Layout

- **Summary** — fila de KPIs operativos en la parte superior de una consola o dashboard.
- **Detail** — indicador puntual adyacente a paneles de detalle (`Card`, `TaskCard`).
- **Container** — envoltorio presentacional con estructura fija (etiqueta, valor, cambio); no admite slots libres.

## Parent

- `<section className="ops-metrics" aria-label="Estado operativo">` en `apps/web/src/App.tsx`.
- `div` con CSS Grid en la story `Tones` y en `Components.stories.tsx` → `OperationsConsole`.
- Contenedor centrado de Storybook con `minWidth: 340` en `MetricCard.stories.tsx`.

## Children

- No admite `children`. Solo contenido derivado de `label`, `value` y `change`.

## Siblings

- Otras instancias de `MetricCard` en la misma fila de resumen.
- `Card` — panel compuesto de misión o pronóstico debajo o al lado de la fila de métricas.
- `TaskCard` — listas de tareas en la sección inferior de la consola.
- `ProgressRing` — indicador de avance dentro de un `Card`, no sustituto de KPI puntual.
- `Badge` — etiquetas de contexto en encabezados de sección, no integradas en `MetricCard`.

## Alternatives

- `ModuleCard` — tarjeta navegable de módulo con métricas embebidas e interacción de clic.
- `Card` — contenedor genérico con slots libres para paneles compuestos.
- `ProgressRing` — progreso circular con valor numérico y etiqueta, no KPI de texto libre.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `ModuleCard` | Embebe filas de métricas similares en tarjeta navegable; `MetricCard` es solo lectura sin botón ni icono de módulo. |
| `Card` | Contenedor de detalle compuesto; hermano habitual debajo de la fila de `MetricCard` en consolas. |
| `TaskCard` | Tarjeta de tarea con estructura fija; hermano en dashboards, sin composición interna. |
| `ProgressRing` | Indicador de avance circular; complemento en paneles `Card`, no reemplazo de KPI textual. |
| `Badge` | Etiqueta de estado en otros contextos; no usado por `MetricCard`. |
| `ChartCard` | Contenedor de gráficos; alternativa cuando la métrica requiere visualización chart, no valor escalar. |

---

# Content Guidelines

## Labels

- `label`: descriptor breve de la métrica (p. ej. `"Riesgo operativo"`, `"Unidades activas"`, `"Alertas abiertas"`). El CSS aplica `text-transform: uppercase` y `letter-spacing: 0.4em` en `.ds-metric__label`; no es obligatorio escribir en mayúsculas en la prop.

## Values

- `value`: string preformateado por el consumidor (p. ej. `"87%"`, `"50"`, `"23"`). Sin localización, unidades automáticas ni formato numérico interno.

## Icons

- `MetricCard` no expone prop `icon` ni slot para iconos.
- Demos en `Components.stories.tsx` y `apps/web/src/App.tsx` pasan `icon` en el spread de datos, pero el componente no lo consume; no tiene efecto visual.

## Localization

- Las stories y `apps/web` usan español. El componente no impone idioma; cualquier string es válido en `label`, `value` y `change`.

---

# Examples

## Basic

```tsx
import { MetricCard } from "@alejandria/ui-kit";

<MetricCard
  label="Riesgo operativo"
  value="87%"
  change="critico"
  tone="critical"
/>
```

## Variant

La prop `tone` selecciona la clase modificadora; la apariencia visual base es la misma para todos los tonos en la implementación actual.

```tsx
<MetricCard label="Unidades activas" value="50" change="en campo" tone="good" />
<MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" />
<MetricCard label="Nodos enlazados" value="15" change="red viva" tone="neutral" />
```

## Composition

```tsx
<section aria-label="Estado operativo">
  <div
    style={{
      display: "grid",
      gap: 14,
      gridTemplateColumns: "repeat(4, minmax(180px, 1fr))"
    }}
  >
    <MetricCard label="Riesgo operativo" value="87%" change="critico" tone="critical" />
    <MetricCard label="Unidades activas" value="50" change="en campo" tone="good" />
    <MetricCard label="Alertas abiertas" value="23" change="7 sin leer" tone="watch" />
    <MetricCard label="Nodos enlazados" value="15" change="red viva" />
  </div>
</section>
```

---

# Reasoning Examples

## User Request

Mostrar KPIs de riesgo, unidades, alertas y nodos en una fila superior del dashboard.

### Recommended Components

- `MetricCard` ×4

### Why

Patrón de `MetricCard.stories.tsx` → `Tones`, `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx` → sección `.ops-metrics`.

---

## User Request

Entrar a un módulo operativo con icono y métricas resumidas al hacer clic.

### Recommended Components

- `ModuleCard`

### Why

`MetricCard` es presentacional y no interactivo. `ModuleCard` combina icono, título y métricas en un `<button>` navegable.

---

## User Request

Colorear la métrica crítica en rojo según el tono.

### Recommended Components

- `MetricCard` con `tone="critical"` (sin diferenciación visual actual)

### Why

La prop `tone` existe y aplica `ds-metric--critical`, pero no hay reglas CSS asociadas. La diferenciación por color requeriría extender `styles.css` o CSS externo no cubierto por la API actual.

---

## User Request

Mostrar un icono de alerta junto al valor de riesgo.

### Recommended Components

- Ninguno dentro de `MetricCard`

### Why

No existe prop `icon` ni slot en la API. Envolver la instancia en un layout del consumidor o extender el componente.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-line` | color | `border` de `.ds-metric` |
| `--ds-radius-xs` | radius | `border-radius` de `.ds-metric` |
| `--ds-shadow-sm` | shadow | `box-shadow` de `.ds-metric` |
| `--ds-color-ink` | color | `color` base de `.ds-metric` |
| `--ds-color-ink-muted` | color | `color` de `.ds-metric__label` |
| `--ds-font-mono` | typography | `font-family` de `.ds-metric__label` |
| `--ds-font-body` | typography | `font-family` de `.ds-metric__value` y `.ds-metric__change` |

Nota: el fondo de `.ds-metric` está hardcodeado (`rgb(0 0 0 / 20%)`) y no usa token del sistema. La regla comentada `color: var(--metric-accent)` en `.ds-metric__change` referencia una variable no definida en `:root`. Las clases `ds-metric--*` no consumen tokens adicionales porque no tienen reglas CSS.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/MetricCard.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-metric`, `ds-metric--{tone}`, `ds-metric__topline`, `ds-metric__label`, `ds-metric__value`, `ds-metric__change`)

## DOM Structure

```text
div.ds-metric.ds-metric--{tone}
├── div.ds-metric__topline
│   └── span.ds-metric__label
├── strong.ds-metric__value
└── span.ds-metric__change (solo si change es truthy)
```

---

# Known Limitations

- La prop `tone` aplica clases `ds-metric--neutral`, `ds-metric--good`, `ds-metric--watch` y `ds-metric--critical`, pero no existen reglas CSS para ellas; no hay diferenciación visual por tono.
- No expone prop `icon`, `children`, slots de acciones ni pie de tarjeta.
- No formatea ni localiza valores numéricos.
- `.ds-metric__topline` no tiene reglas CSS propias; actúa solo como contenedor estructural.
- `.ds-metric__change` no aplica color de acento; la referencia a `--metric-accent` está comentada y la variable no existe en tokens.
- Sin estados interactivos (`hover`, `focus`, `disabled`) ni semántica de control.
- Sin tests unitarios ni de integración en el repositorio.
- Demos en `Components.stories.tsx` y `apps/web` pasan `icon` al spread de props; el componente no lo renderiza y el atributo se reenvía al `<div>` raíz como prop HTML no estándar.
- La story `Tones` no pasa `tone` en cada instancia; todas usan el default `"neutral"` a pesar del nombre de la story.
- Fondo hardcodeado; migración incompleta a tokens del design system para superficies.

---

# Future Improvements

- [ ] Reglas CSS para `.ds-metric--good`, `.ds-metric--watch`, `.ds-metric--critical` y `.ds-metric--neutral`
- [ ] Token `--metric-accent` o uso de tokens existentes (`--ds-color-danger`, `--ds-color-green`, etc.) en `.ds-metric__change`
- [ ] Estilos para `.ds-metric__topline` si se requiere layout de icono o acciones
- [ ] Migrar fondo hardcodeado a token de superficie (`--ds-color-surface-glass` u equivalente)
- [ ] Alinear demos (`icon` en spread) con la API real o añadir soporte de icono si se define en el diseño
- [ ] Documentación JSDoc en `MetricCard.tsx` según convenciones del repositorio

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `MetricCard`, `MetricCardProps` y `MetricTone` con estilos `ds-metric` y stories en Storybook (`Playground`, `Tones`). Uso en `Components.stories.tsx` → `OperationsConsole` y `apps/web/src/App.tsx`. |
