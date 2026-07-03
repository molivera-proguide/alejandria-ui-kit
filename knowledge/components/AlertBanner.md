---
id: alert-banner
name: AlertBanner
category: feedback
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/AlertBanner.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/AlertBanner

aliases:
  - banner de alerta
  - alerta
  - notificación
  - aviso operativo
keywords:
  - AlertBanner
  - alerta
  - notificación
  - feedback
  - info
  - success
  - warning
  - danger
  - tone
  - AlertTone
  - status
tags:
  - feedback
  - alerts
  - presentational
  - molecule

last_reviewed: 2026-07-02
---

# AlertBanner

## Purpose

Presenta un mensaje de estado operativo con título, descripción opcional, icono y acción contextual en consolas del Alejandria UI Kit.

Describe:

- **Responsabilidad principal:** comunicar información, éxito, advertencia o peligro al operador mediante un banner visual con acento lateral por tono.
- **Problema que resuelve:** unificar la presentación de alertas de consola (señales nuevas, misiones estabilizadas, comunicación intermitente, alertas críticas) sin acoplar lógica de negocio ni acciones fijas.
- **Alcance:** componente presentacional basado en `<div role="status">`; el consumidor provee `title`, tono semántico, contenido opcional en `description`, `icon` y `action` como `ReactNode`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado como `<div role="status">` con clases `ds-alert` y `ds-alert--{tone}` por defecto.
- `title` obligatorio en la firma de props; renderizado en `<strong class="ds-alert__title">`.
- `tone` por defecto `"info"`; clase modificadora `ds-alert--{tone}` aplicada en la raíz.
- `description` renderizada en `<p class="ds-alert__description">` solo cuando su valor es truthy.
- `icon` renderizado en `<span class="ds-alert__icon">` solo cuando es truthy.
- `action` renderizado en `<div class="ds-alert__action">` solo cuando es truthy.
- Fusión de `className` externa con `ds-alert` y el modificador de tono mediante `cn()`.
- Repaso de atributos nativos de `HTMLAttributes<HTMLDivElement>` al `<div>` raíz vía `...props` (`id`, `style`, `data-*`, `aria-*`, etc.).

## This component never

- Obtiene, calcula ni determina el tono de una alerta a partir de datos externos.
- Compone internamente `Button`, `Badge`, `Card` ni otros componentes del kit.
- Define botón de cierre, dismiss ni estado `open`/`closed`.
- Impone un componente concreto en el slot `action` (acepta cualquier `ReactNode`).
- Aplica `aria-hidden` al icono automáticamente.
- Define estados interactivos propios (`hover`, `focus`) en `.ds-alert`.
- Aplica media queries ni breakpoints propios.

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proporcionar `title` como `string`.

## Forbidden

- Inventar props que no existan en `AlertBannerProps` (`variant`, `onClose`, `children`, `dismissible`, etc.).
- Asumir que `action` renderiza un `Button` automáticamente (el consumidor provee el nodo).
- Usar `AlertBanner` como sustituto de `Badge` para etiquetas compactas inline.
- Confiar en que el componente anuncie cambios dinámicos con `aria-live` (solo expone `role="status"`).

## Recommendations

- Pasar `icon` con iconos de `lucide-react` alineados al tono, como en `AlertBanner.stories.tsx` → `Tones` (`Info`, `CheckCircle2`, `RadioTower`, `AlertTriangle`).
- Usar `Button size="sm" variant="danger"` en `action` para alertas críticas, según `WithAction`.
- Reservar `tone="danger"` para situaciones que requieren atención inmediata del operador.
- Agrupar múltiples banners en un contenedor con `display: grid` y `gap: 12`, como en la story `Tones`.

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Feedback |
| Package | @alejandria/ui-kit |
| Export | packages/ui/src/components/AlertBanner.tsx |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  AlertBanner,
  type AlertBannerProps,
  type AlertTone
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `AlertBanner` — componente funcional.
- `AlertBannerProps` — props del componente.
- `AlertTone` — unión de tonos semánticos para la prop `tone`.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `title` | `string` | — | sí | Título de la alerta. Renderizado en `<strong class="ds-alert__title">`. Mayúsculas vía CSS (`text-transform: uppercase`). |
| `tone` | `AlertTone` | `"info"` | no | Tono semántico. Aplica clase `ds-alert--{tone}` en la raíz y define `--alert-accent` en CSS. |
| `description` | `string` | — | no | Texto descriptivo. Renderizado en `<p class="ds-alert__description">` solo si es truthy. |
| `icon` | `ReactNode` | — | no | Icono de la alerta. Renderizado en `<span class="ds-alert__icon">` solo si es truthy. |
| `action` | `ReactNode` | — | no | Acción contextual (p. ej. un `Button`). Renderizado en `<div class="ds-alert__action">` solo si es truthy. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-alert` y el modificador de tono en el `<div>` raíz. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | no | Atributos nativos del `<div>` raíz (`id`, `style`, `data-*`, `aria-*`, etc.). `role="status"` lo establece el componente y no debe sobrescribirse sin intención explícita. |

### AlertTone

| Value | Description |
|-------|-------------|
| `"info"` | Valor por defecto. Clase `ds-alert--info`. Acento `--ds-color-blue` vía variable local `--alert-accent` en `.ds-alert` base. |
| `"success"` | Clase `ds-alert--success`. Acento `--ds-color-green`. |
| `"warning"` | Clase `ds-alert--warning`. Acento `--ds-color-amber`. |
| `"danger"` | Clase `ds-alert--danger`. Acento `--ds-color-danger`. |

---

# Variants

Describe every public visual variant.

## Default

Cuatro tonos públicos implementados mediante la variable CSS local `--alert-accent` y modificadores BEM. Todas las instancias comparten estilos base de `.ds-alert`: grid de tres columnas (`auto minmax(0, 1fr) auto`), fondo con gradiente y `var(--ds-color-surface-glass)`, borde `var(--ds-color-line)`, borde izquierdo de 4px con `--alert-accent`, `border-radius: var(--ds-radius-md)`, `box-shadow: var(--ds-shadow-sm)`, `padding: 14px`.

| Tone | Acento (`--alert-accent`) | Regla CSS |
|------|---------------------------|-----------|
| `info` | `var(--ds-color-blue)` | Definido en `.ds-alert` base; clase `ds-alert--info` sin reglas adicionales en `styles.css`. |
| `success` | `var(--ds-color-green)` | `.ds-alert--success` |
| `warning` | `var(--ds-color-amber)` | `.ds-alert--warning` |
| `danger` | `var(--ds-color-danger)` | `.ds-alert--danger` |

El icono (`.ds-alert__icon`) usa `color-mix` con `--alert-accent` para fondo y borde; SVG interno a 18×18 px dentro de contenedor 34×34 px.

---

# States

| State | Description |
|--------|-------------|
| Default | Apariencia base de `.ds-alert` según `tone`. Sin estados `:hover`, `:focus` ni `:disabled` en CSS del banner. |
| With description | Cuando `description` es truthy, se muestra `.ds-alert__description` debajo del título. |
| Without description | Cuando `description` es `undefined`, vacío o falsy, el párrafo no se renderiza. |
| With icon | Cuando `icon` es truthy, se muestra `.ds-alert__icon` en la primera columna del grid. |
| With action | Cuando `action` es truthy, se muestra `.ds-alert__action` alineado al centro en la tercera columna. |

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Usa `role="status"` en el `<div>` raíz para indicar un mensaje de estado informativo.
- El título (`<strong>`) y la descripción (`<p>`) quedan expuestos como contenido textual en el árbol de accesibilidad.
- El icono en `.ds-alert__icon` no recibe `aria-hidden` del componente; si es decorativo, el consumidor debe asegurar que `title` y `description` transmitan el mensaje completo.
- La accesibilidad del contenido en `action` depende del componente insertado (p. ej. `Button` con texto visible).
- El consumidor puede pasar atributos ARIA adicionales vía `...props`; el componente no define `aria-live` ni `aria-atomic`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `role="status"` | Aplicado por el componente en el `<div>` raíz. |
| Atributos vía `...props` | El consumidor puede pasar `aria-label`, `aria-describedby`, etc. en el `<div>` raíz. |

### Keyboard

| Key | Action |
|-----|--------|
| — | Sin comportamiento de teclado propio en el banner. Si `action` contiene un `Button`, el foco y la activación dependen de ese control. |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`AlertBanner` no define media queries. El layout usa CSS Grid con tres columnas fijas; el ancho lo define el contenedor padre.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. Grid `auto minmax(0, 1fr) auto` con `gap: 12px`; el contenido de texto hace wrap dentro de `.ds-alert__content` (`min-width: 0`). |
| Storybook `Tones` | Contenedor padre con `display: grid`, `gap: 12`; el apilado vertical depende del padre, no del componente. |
| Storybook decorator | `minWidth: 620` en el contenedor centrado de `AlertBanner.stories.tsx`. |

---

# Composition

## Purpose in Layout

- **Feedback** — mensaje de estado o alerta en la parte superior o intermedia de una consola.
- **Detail** — contexto operativo con acción opcional para responder a la alerta.
- **Container** — estructura fija (icono, contenido, acción); no admite `children` libres.

## Parent

- `div` con CSS Grid en la story `Tones` (`display: grid`, `gap: 12`).
- Contenedor centrado de Storybook con `minWidth: 620` en `AlertBanner.stories.tsx`.
- Cualquier sección o panel del consumidor donde se dispongan alertas apiladas.

## Children

- No admite `children`. Solo contenido derivado de `title`, `description`, `icon` y `action`.

## Siblings

- `Button` — frecuentemente insertado en el slot `action` (`WithAction`).
- `Badge` — alternativa compacta para etiquetas de estado inline (p. ej. `Badge tone="danger" dot` en `Components.stories.tsx` → `OperationsConsole`).
- `Card`, `MetricCard`, `TaskCard` — paneles y tarjetas en la misma vista de consola.
- Otros `AlertBanner` — apilados en la misma columna de alertas.

## Alternatives

- `Badge` — etiqueta compacta de estado sin título, descripción ni slot de acción.
- `Card` — panel compuesto con slots libres; no sustituye un banner de alerta con acento lateral.
- Texto plano o `div` custom — sin estilos ni `role="status"` del kit.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Button` | Usado en slot `action` en `WithAction`; no hay composición interna. |
| `Badge` | Alternativa compacta para estado inline; tonos semánticos paralelos (`info`, `success`, `warning`, `danger`). |
| `Card` | Contenedor de detalle compuesto; hermano potencial en dashboards, sin integración con `AlertBanner`. |
| `MetricCard` | KPI de solo lectura; no comunica alertas narrativas con descripción. |
| `TextField` | Campo de entrada; no relacionado funcionalmente con alertas de consola. |

---

# Content Guidelines

## Labels

- `title`: frase corta y directa (p. ej. `"Nueva senal recibida"`, `"Alerta critica"`, `"Mision estabilizada"`). El CSS aplica `text-transform: uppercase` en `.ds-alert__title`; no es obligatorio escribir en mayúsculas en la prop.

## Values

- No aplica directamente; `AlertBanner` no muestra valores numéricos. Métricas van en `MetricCard` u otros componentes.

## Icons

- Pasar iconos como `ReactNode` en `icon`.
- Demos usan `lucide-react`: `Info` (info), `CheckCircle2` (success), `RadioTower` (warning), `AlertTriangle` (danger).
- `.ds-alert__icon` reserva contenedor 34×34 px; SVG a 18×18 px.

## Localization

- Las stories usan español. El componente no impone idioma; cualquier string es válido en `title` y `description`.

---

# Examples

## Basic

```tsx
import { AlertBanner } from "@alejandria/ui-kit";

<AlertBanner
  title="Nueva senal recibida"
  description="Se detecto actividad relevante en la zona monitoreada."
/>
```

## Variant

```tsx
import { AlertTriangle, CheckCircle2, Info, RadioTower } from "lucide-react";
import { AlertBanner } from "@alejandria/ui-kit";

<AlertBanner tone="info" icon={<Info />} title="Nueva senal recibida" description="Revision disponible para operador." />
<AlertBanner tone="success" icon={<CheckCircle2 />} title="Mision estabilizada" description="El avance supera el umbral esperado." />
<AlertBanner tone="warning" icon={<RadioTower />} title="Comunicacion intermitente" description="Una unidad reporta latencia alta." />
<AlertBanner tone="danger" icon={<AlertTriangle />} title="Alerta critica" description="La zona requiere reasignacion inmediata." />
```

## Composition

```tsx
import { AlertTriangle } from "lucide-react";
import { AlertBanner, Button } from "@alejandria/ui-kit";

<AlertBanner
  tone="danger"
  title="Alerta critica"
  description="La zona requiere reasignacion inmediata."
  icon={<AlertTriangle />}
  action={
    <Button size="sm" variant="danger">
      Resolver
    </Button>
  }
/>
```

---

# Reasoning Examples

## User Request

Mostrar una alerta crítica con botón para resolver la situación.

### Recommended Components

- `AlertBanner` con `tone="danger"`, `icon` y `action` con `Button size="sm" variant="danger"`

### Why

Patrón de `AlertBanner.stories.tsx` → `WithAction`.

---

## User Request

Listar varios estados operativos (info, éxito, advertencia, peligro) en columna.

### Recommended Components

- `AlertBanner` ×4 con tonos distintos

### Why

`AlertBanner.stories.tsx` → `Tones` demuestra los cuatro tonos con iconos alineados.

---

## User Request

Etiqueta compacta "Alerta nueva" junto al título de la consola.

### Recommended Components

- `Badge tone="danger" dot`

### Why

`Components.stories.tsx` → `OperationsConsole` usa `Badge`, no `AlertBanner`, para estado breve inline sin descripción ni acción.

---

## User Request

Panel con encabezado, cuerpo libre y pie de acciones.

### Recommended Components

- `Card`

### Why

`AlertBanner` no admite `children`, `footer` ni slots compuestos; `Card` cubre paneles con contenido libre.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-blue` | color | Valor por defecto de `--alert-accent` en `.ds-alert` (tono `info`) |
| `--ds-color-green` | color | `--alert-accent` en `.ds-alert--success` |
| `--ds-color-amber` | color | `--alert-accent` en `.ds-alert--warning` |
| `--ds-color-danger` | color | `--alert-accent` en `.ds-alert--danger` |
| `--ds-color-surface-glass` | color | Fondo de `.ds-alert` |
| `--ds-color-line` | color | `border` de `.ds-alert` |
| `--ds-radius-md` | radius | `border-radius` de `.ds-alert` |
| `--ds-radius-sm` | radius | `border-radius` de `.ds-alert__icon` |
| `--ds-shadow-sm` | shadow | `box-shadow` de `.ds-alert` |
| `--ds-color-ink` | color | `color` base de `.ds-alert` |
| `--ds-font-display` | typography | `font-family` de `.ds-alert__title` |
| `--ds-color-ink-soft` | color | `color` de `.ds-alert__description` |

Nota: `--alert-accent` es una variable CSS local definida en `.ds-alert` y sobrescrita por modificadores de tono; no es un token global de `:root`. El gradiente de fondo usa `rgb(255 255 255 / 0.045)` hardcodeado. La clase `ds-alert--info` se aplica desde el componente pero no tiene regla CSS dedicada; el acento info proviene de `.ds-alert` base.

---

# Implementation Notes

This section is intended for maintainers extending the component.

Read after:

1. Constraints
2. Public API
3. Composition

## Source File

```text
packages/ui/src/components/AlertBanner.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (clases `ds-alert`, `ds-alert--{tone}`, `ds-alert__icon`, `ds-alert__content`, `ds-alert__title`, `ds-alert__description`, `ds-alert__action`)

## DOM Structure

```text
div.ds-alert.ds-alert--{tone}[role="status"]
├── span.ds-alert__icon (solo si icon es truthy)
│   └── {icon}
├── div.ds-alert__content
│   ├── strong.ds-alert__title
│   └── p.ds-alert__description (solo si description es truthy)
└── div.ds-alert__action (solo si action es truthy)
    └── {action}
```

---

# Known Limitations

- No expone `children`, `onClose`, `dismissible` ni estado de visibilidad controlado.
- La clase `ds-alert--info` se aplica en el DOM pero no tiene reglas CSS propias; el tono info depende del valor por defecto de `--alert-accent` en `.ds-alert`.
- Sin `aria-live` ni `aria-atomic`; solo `role="status"`.
- El icono no recibe `aria-hidden` automáticamente.
- El grid siempre define tres columnas; sin `icon` o sin `action`, las columnas laterales quedan vacías pero el layout de grid se mantiene.
- Sin estados interactivos en el banner; la interacción se limita al contenido de `action`.
- Sin uso documentado en `apps/web`; solo evidencia en Storybook (`Playground`, `Tones`, `WithAction`).
- Sin tests unitarios ni de integración en el repositorio.
- `action` es `ReactNode` genérico; no hay validación ni convención enforced más allá de la demo con `Button`.

---

# Future Improvements

- [ ] Regla explícita `.ds-alert--info` para simetría con otros tonos
- [ ] `aria-hidden="true"` en `.ds-alert__icon` cuando `title` describe el mensaje
- [ ] Prop `dismissible` con botón de cierre si se define en diseño
- [ ] `aria-live="polite"` o `role="alert"` opcional para alertas críticas dinámicas
- [ ] Layout adaptativo cuando falta `icon` o `action` (evitar columna vacía)
- [ ] Documentación JSDoc en `AlertBanner.tsx` según convenciones del repositorio

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.0 | Implementación inicial de `AlertBanner`, `AlertBannerProps` y `AlertTone` con estilos `ds-alert`, `role="status"` y stories en Storybook (`Playground`, `Tones`, `WithAction`). |
