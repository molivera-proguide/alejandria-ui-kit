---
id: side-bar
name: SideBar
category: navigation
status: draft
since: 0.1.0

package: "@alejandria/ui-kit"
export: packages/ui/src/components/SideBar.tsx

figma: https://www.figma.com/file/PLACEHOLDER
storybook: Alejandria/SideBar

aliases:
  - menú lateral
  - side bar
  - nav rail
  - navegación
keywords:
  - SideBar
  - sidebar
  - SIDE BAR
  - menú
  - colapsable
  - SideBarProps
  - SideBarItem
tags:
  - navigation
  - chrome
  - app-shell
  - molecule
  - controlled

last_reviewed: 2026-08-05
---

# SideBar

Component structure follows `knowledge/reasoning/component-archetype.md`.

Canonical design reference: `knowledge/references/design-reference.pdf` **page 13 — SIDE BAR** (verbatim extract: `knowledge/references/pdf-text-extract.md` § Page 13).

## Purpose

Presenta el menú central colapsable de la plataforma Alejandría, desde el que se navegan módulos y opciones de utilidad.

Describe:

- **Responsabilidad principal:** renderizar un rail de navegación con lista primaria declarativa, lista secundaria opcional (módulos), logo y toggle de colapso controlado.
- **Problema que resuelve:** unificar el chrome SIDE BAR PDF (fondo `#282828`, ítems con bajada/badge/estado, animación de ancho) sin acoplar un router.
- **Alcance:** componente de app-shell basado en `<nav class="ds-sidebar">`; el consumidor provee `items` (grupo primario, anclado arriba) / `secondaryItems` (grupo secundario/utilidades, anclado abajo vía `margin-top: auto`), controla `collapsed` / `onToggleCollapsed` y cablea navegación vía `onClick`.

Exclude:

- API details
- Implementation details
- Usage examples
- Composition

---

# Behavioral Contract

Documenta los comportamientos públicos en los que el consumidor puede confiar.

## This component guarantees

- Renderizado dentro de un wrapper estructural `div.ds-sidebar-shell` (chrome de posicionamiento, no parte del contrato de props público). El `<nav class="ds-sidebar">` interno recibe `className` y `...props` como antes.
- Modificador `ds-sidebar--collapsed` en el `<nav>` cuando `collapsed` es truthy.
- Estado de colapso **solo controlado**: requiere `collapsed` + `onToggleCollapsed` (sin estado interno; mismo convenio que `SegmentedControl`).
- Edge-toggle `.ds-sidebar__edge-toggle` como **hermano** del `<nav>` (no hijo del header), con `aria-expanded={!collapsed}` e `aria-label` «Contraer menú» / «Expandir menú»; chevron hand-drawn que apunta izquierda (expandido) o derecha (colapsado).
- Encabezado `.ds-sidebar__header` solo con slot `logo` opcional (sin toggle).
- Heading de menú primario `button.ds-sidebar__menu-heading` solo si `menuIcon` o `menuLabel` (ícono de sección + label); `onClick` llama a `onToggleCollapsed` (mismo toggle que el edge-toggle — el ícono hamburguesa es la convención universal para esto, no hay prop nueva). El heading secundario (`secondaryIcon`/`secondaryLabel`) sigue siendo un `div` no interactivo.
- Highlight de hover (`--ds-color-white-a06`) en cada `.ds-sidebar__item` y en el botón de heading primario; el ítem seleccionado mantiene su fondo cálido en hover (no se superpone un segundo tono).
- Lista primaria desde `items` como `<ul class="ds-sidebar__list">` de botones `<button type="button">` dentro de `<li>`.
- Lista secundaria renderizada solo si `secondaryItems?.length` es truthy, dentro de `.ds-sidebar__secondary` (mismo patrón de heading con `secondaryIcon` / `secondaryLabel`).
- Ítem seleccionado con clase `ds-sidebar__item--selected` y `aria-current="page"`.
- Capas opcionales por ítem: `caption` → `.ds-sidebar__item-caption`; `badge` → `.ds-sidebar__badge`; `status` → `.ds-sidebar__status`.
- Colapso por CSS (mismo DOM): oculta copy, menu-label, menu-heading-icon y status; el `badge` permanece visible (acento de esquina sobre el ícono); anima `width` en `.ds-sidebar`.
- Fusión de `className` externa con `ds-sidebar` mediante `cn()` en el `<nav>`.
- Repaso de atributos nativos de `Omit<ComponentPropsWithoutRef<"nav">, "children">` al `<nav>` vía `...props` (no al shell).

## This component never

- Mantiene estado interno de colapso o de selección.
- Implementa routing (`href`, `<a>`, integración con React Router / Next).
- Recolorea el bitmap del ícono seleccionado a `#FFFFFF` (los assets compartidos son `<img>` multi-color no tintables; ver Known Limitations).
- Usa `HamburguesaIcon` como control de colapso (pertenece al heading «Menú» vía `menuIcon`).
- Inventa un archivo nuevo bajo `Icons/` para el toggle; el chevron es SVG interno hand-drawn (chrome de UI, mismo precedente que Switch/ProgressRing/Button spinner).
- Implementa la pantalla completa «Asistente» (PDF p.12) ni el flujo «aparece completa en la pantalla del asistente».
- Expone ejes `variant`, `appearance`, `size` o `tone`.
- Usa `forwardRef`.
- Compone internamente otros componentes del kit (solo `cn()` + SVG interno).

---

# Constraints

Estas reglas tienen la máxima prioridad.

Si algún ejemplo entra en conflicto con estas reglas,
siempre seguir estas reglas.

## Required

- Importar desde `@alejandria/ui-kit` y cargar `styles.css` del paquete (`@alejandria/ui-kit/style.css`).
- Proveer `items`, `collapsed` y `onToggleCollapsed`.
- Tratar PDF p.13 como referencia canónica de apariencia (escala display = anotación @2× ÷ 2).
- Dar altura al contenedor padre (`height: 100%` en `.ds-sidebar`).

## Forbidden

- Inventar props de routing (`href`, `to`, `Link`).
- Hardcodear la lista de menú dentro del componente (AP13: set abierto → array declarativo).
- Aplicar filtros CSS para fingir el recoloreo del ícono seleccionado.
- Añadir un archivo nuevo bajo `Icons/` para chrome de UI (toggle/chevrons); el edge-toggle usa SVG hand-drawn interno.
- Sustituir el fondo del chip de estado (`#282828`) para «arreglar» contraste sobre navegación secundaria.

## Recommendations

- Pasar íconos como `<img src={…Icon} alt="" />` desde `@alejandria/ui-kit` Icons (mismo patrón que `ModuleCard` / `InvestigationCard`).
- Pasar `menuIcon={<img src={HamburguesaIcon} alt="" />}` junto a `menuLabel="Menú"` (confirmado por artwork PDF: hamburguesa = ícono de sección, no toggle).
- Cablear selección en el consumidor (mapear `selected` / `onClick` sobre `items`).
- Usar la story `Playground` como referencia del toggle controlado con `useState` en el story, no en el componente.
- Para módulos en secundaria, reutilizar títulos en mayúsculas como en `ModuleCard.stories.tsx` (p. ej. `CATÁSTROFES` + `CatastrofesIcon`).

---

# Category

| Field | Value |
|--------|-------|
| Type | molecule |
| Group | Chrome |
| Package | @alejandria/ui-kit |
| Import | `import { SideBar } from "@alejandria/ui-kit"` |

---

# Public API

Solo documenta la API pública.

```tsx
import {
  SideBar,
  type SideBarProps,
  type SideBarItem
} from "@alejandria/ui-kit";
```

Tipos exportados:

- `SideBar` — componente funcional.
- `SideBarProps` — props del componente.
- `SideBarItem` — forma de cada ítem declarativo.

---

# Props

| Prop | Type | Default | Required | Description |
|------|------|----------|----------|-------------|
| `items` | `SideBarItem[]` | — | sí | Lista primaria/utilitaria (AP13: set abierto). |
| `collapsed` | `boolean` | — | sí | Estado colapsado controlado. |
| `onToggleCollapsed` | `() => void` | — | sí | Alterna el colapso (controlado); cableado al edge-toggle. |
| `logo` | `ReactNode` | — | no | Slot de logo en `.ds-sidebar__logo` (header solo logo). |
| `menuIcon` | `ReactNode` | — | no | Icono de sección junto a `menuLabel` (p. ej. `HamburguesaIcon`). |
| `menuLabel` | `string` | — | no | Encabezado sobre la lista primaria (p. ej. «Menú»). |
| `secondaryIcon` | `ReactNode` | — | no | Icono junto a `secondaryLabel` (conveniencia simétrica; no confirmado en PDF). |
| `secondaryLabel` | `string` | — | no | Encabezado opcional sobre la lista secundaria (conveniencia; el PDF no muestra label visible). |
| `secondaryItems` | `SideBarItem[]` | — | no | Lista de módulos / navegación secundaria. |
| `className` | `string` | — | no | Clases adicionales fusionadas con `ds-sidebar` en el `<nav>`. |
| `...props` | `Omit<ComponentPropsWithoutRef<"nav">, "children">` | — | no | Atributos nativos del `<nav>` (no del shell). Sin `children`. |

### SideBarItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | `ReactNode` | sí | Icono del ítem. |
| `label` | `string` | sí | Etiqueta visible. |
| `caption` | `string` | no | Bajada (PDF «Bajada»). |
| `badge` | `number` | no | Contador de notificación. |
| `status` | `string` | no | Chip de estado (p. ej. «EN VIVO»). |
| `selected` | `boolean` | no | Estado seleccionado (línea izquierda 2pt). |
| `onClick` | `() => void` | no | Handler de navegación (sin `href`). |

---

# Variants

## Default / Expanded

Apariencia completa alineada a PDF p.13 SIDE BAR. Modificador BEM ausente cuando `collapsed={false}`.

| Elemento | Rol visual (PDF p.13, display ÷2) |
|----------|-----------------------------------|
| Raíz | Fondo `#282828`, padding `10px` (`20px` @2×), sombra derecha provisional, ancho reutilizado `--ds-size-card-min-w` (220px) |
| Ícono | Pozo `25×25` (`50×50` @2×; provenance `--ds-size-icon-50`); `#8a8b87` por defecto, `#FFFFFF` (vía `filter: brightness(0) invert(1)`) cuando el ítem está seleccionado |
| Label del ítem | `#8a8b87` por defecto, `#FFFFFF` cuando está seleccionado (2026-08-05 — antes blanco siempre) |
| Seleccionado | Fondo `#2a2927` + `border-left: 2px solid #fff` + label/ícono blancos |
| Bajada | Source Code Regular `7px` (`14pt` @2×), `#8a8b87` (no cambia con la selección) |
| Badge | Montserrat Bold `8.5px` (`17pt` @2×), blanco sobre `#e30000`; círculo fijo `10×10px` posicionado como acento sobre la esquina superior derecha del ícono (no una pill en línea con el label) |
| Estado | Montserrat Medium `5px` (`10pt` @2×), uppercase, `#c1c1c1` sobre `#282828` |
| Grupo secundario | Sin fondo propio — mismo `#282828` del panel; anclado al borde inferior vía `margin-top: auto` |

## Collapsed

Modificador `ds-sidebar--collapsed`: ancho `--ds-size-control-lg` (48px); oculta copy, menu-label y status (rail de íconos). El `badge` y el ícono del heading («Menú») permanecen visibles — el PDF muestra el mismo contador «2» y el mismo ícono hamburguesa en ambas columnas (Desplegada y Colapsada), centrados igual que los demás ítems. El edge-toggle permanece visible fuera del chrome.

---

# States

| State | Description |
|--------|-------------|
| Expanded | `collapsed={false}`; muestra labels, captions, badges y status. |
| Collapsed | `collapsed={true}` + clase `ds-sidebar--collapsed`; solo íconos de ítem (+ logo si cabe); edge-toggle con chevron derecha. |
| Item selected | `item.selected`; clase `ds-sidebar__item--selected` + `aria-current="page"`; label e ícono pasan de `#8a8b87` a `#FFFFFF`. |
| Item with caption / badge / status | Capas opcionales renderizadas solo si truthy / `badge != null`. |
| Hover | Highlight sutil (`--ds-color-white-a06`) en cualquier `.ds-sidebar__item` y en el botón «Menú»; el ítem seleccionado no cambia de tono en hover. |

No hay variantes de tono ni de tamaño.

---

# Accessibility

Describe only accessibility behavior implemented by the component.

## Requirements

- Host estructural `div.ds-sidebar-shell` + `<nav>` semántico interno.
- Edge-toggle con `aria-expanded` y `aria-label` contextual.
- Ítems como botones nativos (activables con Enter/Space).
- Ítem seleccionado con `aria-current="page"`.
- Wrappers de ícono (ítem y heading) con `aria-hidden="true"` (el nombre accesible vive en `label` / `menuLabel`).
- El consumidor puede pasar `aria-label` / `aria-labelledby` en el `<nav>` vía `...props`.

### ARIA

| Attribute | Usage |
|-----------|-------|
| `aria-expanded` | En `.ds-sidebar__edge-toggle` y en el botón «Menú» (`!collapsed`; ambos controlan el mismo toggle, 2026-08-05). |
| `aria-label` | En el edge-toggle y en el botón «Menú» («Contraer menú» / «Expandir menú»). |
| `aria-current="page"` | En el botón del ítem cuando `selected`. |
| `aria-hidden="true"` | En `.ds-sidebar__item-icon` y `.ds-sidebar__menu-heading-icon`. |

### Keyboard

| Key | Action |
|-----|--------|
| Tab | Mueve el foco entre edge-toggle e ítems. |
| Enter / Space | Activa el botón enfocado (edge-toggle o ítem). |

---

# Responsive Behavior

Document only responsive behavior implemented by the component itself.

`SideBar` no define media queries. El colapso es un eje de estado controlado, no un breakpoint.

| Contexto | Behavior |
|----------|----------|
| Componente | Sin breakpoints. `width` anima entre tokens reutilizados; overflow hidden. |
| Storybook decorator | `padding: 32` + altura fija en `SideBar.stories.tsx` (mismo razonamiento que `ModuleCard` / `CalendarCard`: fondo opaco propio). |

---

# Composition

## Purpose in Layout

- **App shell** — rail de navegación principal de la consola PDF.
- **Navigation** — lista primaria de utilidades + secundaria de módulos.
- **Container** — anatomía fija; no admite `children` libres.

## Parent

- Layout de app-shell con altura definida.
- Contenedor de Storybook en `SideBar.stories.tsx`.

## Children

- No admite `children`. Contenido derivado de `logo`, `items` y `secondaryItems`.

## Siblings

- `Scrollbar` — chrome de navegación/desplazamiento; mismo Group Chrome.
- `ModuleCard` — tile de módulo; los ítems secundarios suelen reutilizar los mismos Icons de Modules.
- `SegmentedControl` — precedente de API controlada (`value` + handler).

## Alternatives

- Nav custom / rail de `apps/web` — no es el SIDE BAR del kit.
- Lista de `Button` ghost — sin anatomía PDF de bajada/badge/estado ni colapso.

---

# Related Components

| Component | Relationship |
|-----------|--------------|
| `Scrollbar` | Hermano Chrome (Group Chrome); no solapa el rol de menú. |
| `ModuleCard` | Proveedor de iconografía/títulos de módulos para `secondaryItems`. |
| `SegmentedControl` | Precedente de estado controlado sin uncontrolled default. |
| `InvestigationCard` / `ModuleCard` | Patrón `<img src={IconUrl}>` para assets compartidos. |

---

# Content Guidelines

## Labels

- `menuLabel`: encabezado corto (PDF: `"Menú"`).
- Grupo primario (`items`, anclado arriba, PDF orden real): Mis tareas, Historial, Reportes, Catástrofes.
- Grupo secundario (`secondaryItems`, anclado abajo vía `margin-top: auto`, PDF orden real): Notificaciones, Mi cuenta, Configuración, Ayuda, Cerrar sesión.

## Values

- `badge`: entero de no leídos (PDF muestra contadores); se renderiza como acento sobre la esquina del ícono, visible en expandido y colapsado.
- `status`: chip uppercase corto (PDF: `"EN VIVO"`). **No confirmado como parte de un ítem normal de lista** — el único «EN VIVO» del PDF p.13 vive en el estado «Reducida» (logo + chip, sin lista de ítems), que este componente no implementa (ver Known Limitations). Ningún ítem de las stories actuales usa `status`.

## Icons

- Usar iconos compartidos del paquete (`Icons/*`) para contenido (ítems / heading de sección).
- Mapeo de stories: Historial→`HistorialIcon`, Reportes→`ReportsIcon`, Notificaciones→`NotificacionesIcon`, Mi cuenta→`UsuarioIcon`, Configuración→`ConfiguracionIcon`, Ayuda→`AyudaIcon`, Cerrar sesión→`CerrarSesionIcon`, Mis tareas→`MenuBandejaIcon` (**inferido**), Catástrofes→`CatastrofesIcon`.
- Heading «Menú»: `menuIcon` → `HamburguesaIcon` (confirmado por artwork PDF).
- Edge-toggle: chevron SVG hand-drawn interno (no archivo en `Icons/`); dirección según `collapsed`.

## Localization

- Labels y `aria-label` del edge-toggle están en español en la implementación actual. El consumidor controla el copy de ítems.

---

# Examples

## Basic

```tsx
import {
  SideBar,
  HamburguesaIcon,
  HistorialIcon,
  MenuBandejaIcon
} from "@alejandria/ui-kit";

<SideBar
  menuIcon={<img src={HamburguesaIcon} alt="" />}
  menuLabel="Menú"
  collapsed={false}
  onToggleCollapsed={() => {}}
  items={[
    {
      icon: <img src={MenuBandejaIcon} alt="" />,
      label: "Mis tareas",
      selected: true
    },
    {
      icon: <img src={HistorialIcon} alt="" />,
      label: "Historial"
    }
  ]}
/>
```

## Variant

```tsx
import { useState } from "react";
import {
  SideBar,
  CatastrofesIcon,
  HamburguesaIcon,
  HistorialIcon,
  MenuBandejaIcon,
  NotificacionesIcon,
  ReportsIcon
} from "@alejandria/ui-kit";

function AppShellNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideBar
      menuIcon={<img src={HamburguesaIcon} alt="" />}
      menuLabel="Menú"
      collapsed={collapsed}
      onToggleCollapsed={() => setCollapsed((v) => !v)}
      items={[
        { icon: <img src={MenuBandejaIcon} alt="" />, label: "Mis tareas", selected: true },
        { icon: <img src={HistorialIcon} alt="" />, label: "Historial" },
        { icon: <img src={ReportsIcon} alt="" />, label: "Reportes" },
        { icon: <img src={CatastrofesIcon} alt="" />, label: "Catástrofes" }
      ]}
      secondaryItems={[
        {
          icon: <img src={NotificacionesIcon} alt="" />,
          label: "Notificaciones",
          badge: 2
        }
      ]}
    />
  );
}
```

## Composition

Ver story `Playground` en `SideBar.stories.tsx` (estado de colapso + selección en el story).

---

# Reasoning Examples

## User Request

Menú lateral colapsable con utilidades y un módulo Catástrofes.

### Recommended Components

- `SideBar`

### Why

Rol PDF p.13 SIDE BAR; lista declarativa + `secondaryItems` con `CatastrofesIcon`.

---

## User Request

Links con `href` y React Router.

### Recommended Components

- `SideBar` con `onClick` que llame a `navigate(...)` en el consumidor.

### Why

El kit es router-agnostic; no hay prop `href`.

---

## User Request

Empty state cuando no hay tareas.

### Recommended Components

- `Empty`

### Why

`SideBar` es chrome de navegación, no feedback de ausencia de datos.

---

# Design Tokens

Only include tokens directly consumed by the component.

| Token | Category | Usage |
|--------|----------|-------|
| `--ds-color-pdf-shell` | color | Fondo de `.ds-sidebar`, chip `.ds-sidebar__status` y edge-toggle (`#282828`) |
| `--ds-color-pdf-notification` | color | Fondo de `.ds-sidebar__badge` (`#e30000`) |
| `--ds-color-pdf-surface-warm` | color | Fondo del ítem seleccionado (`#2a2927`) |
| `--ds-color-pdf-ink-muted` | color | Color de tinta muted / caption / chevron del edge-toggle (`#8a8b87`) |
| `--ds-color-pdf-line` | color | Texto del chip de estado + borde del edge-toggle (`#c1c1c1`) |
| `--ds-color-white` | color | Label / badge / línea seleccionada |
| `--ds-color-black-a24` | color | Sombra derecha provisional |
| `--ds-border-width-hair` | border | Borde del edge-toggle |
| `--ds-radius-xs` | radius | `border-radius` del edge-toggle |
| `--ds-size-card-min-w` | size | Ancho expandido (provisional/reutilizado, 220px) |
| `--ds-size-control-lg` | size | Ancho colapsado (provisional/reutilizado, 48px) |
| `--ds-duration-md` | motion | Transición de `width` |
| `--ds-ease-standard` | motion | Easing de la transición |
| `--ds-font-body` | typography | Labels, badge, menu-label |
| `--ds-font-mono` | typography | Caption (bajada) y status (brief de build; PDF copy dice Montserrat Medium para Estado) |
| `--ds-font-weight-regular` | typography | Caption / label |
| `--ds-font-weight-medium` | typography | Status (Montserrat Medium) |
| `--ds-font-weight-bold` | typography | Badge |
| `--ds-radius-pill` | radius | Badge |

Nota: el tamaño de ícono `25px` es literal calibrado (÷2 de asset 50×50); se cita `--ds-size-icon-50` como provenance en comentario CSS, sin redefinir ese token (@2× crudo por convención).

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
packages/ui/src/components/SideBar.tsx
```

## Dependencies

- `cn()` from `packages/ui/src/utils/cn.ts`
- `styles.css` (bloques `.ds-sidebar-shell` / `.ds-sidebar` / `.ds-sidebar__edge-toggle`)
- Chevron SVG interno hand-drawn (`SideBarChevron`, no exportado)

## DOM Structure

> **Corrección 0.1.1 (mismo día que el ship 0.1.0):** el host documentado pasa de un `<nav>` raíz a un wrapper `div.ds-sidebar-shell` + `<nav>` + edge-toggle hermano. Motivado por el artwork PDF real (el toggle no vive dentro del header y debe straddlear el borde derecho; `overflow: hidden` del nav lo recortaría). No es un breaking change de API de props (`className` / `...props` siguen en el `<nav>`); sí cambia el DOM raíz.

```text
div.ds-sidebar-shell
├── nav.ds-sidebar[.ds-sidebar--collapsed]
│   ├── div.ds-sidebar__header (solo si logo)
│   │   └── span.ds-sidebar__logo
│   ├── div.ds-sidebar__menu
│   │   ├── button.ds-sidebar__menu-heading (solo si menuIcon o menuLabel; onClick → onToggleCollapsed)
│   │   │   ├── span.ds-sidebar__menu-heading-icon (solo si menuIcon)
│   │   │   └── span.ds-sidebar__menu-label (solo si menuLabel)
│   │   └── ul.ds-sidebar__list
│   │       └── li → button.ds-sidebar__item[.ds-sidebar__item--selected]
│   │           ├── span.ds-sidebar__item-icon
│   │           │   ├── {icon}
│   │           │   └── span.ds-sidebar__badge (solo si badge != null — acento absoluto sobre el ícono)
│   │           ├── span.ds-sidebar__item-copy
│   │           │   ├── span.ds-sidebar__item-label
│   │           │   └── span.ds-sidebar__item-caption (solo si caption)
│   │           └── span.ds-sidebar__status (solo si status)
│   └── div.ds-sidebar__secondary (solo si secondaryItems?.length)
│       ├── div.ds-sidebar__menu-heading (solo si secondaryIcon o secondaryLabel)
│       │   ├── span.ds-sidebar__menu-heading-icon (solo si secondaryIcon)
│       │   └── span.ds-sidebar__menu-label (solo si secondaryLabel)
│       └── ul.ds-sidebar__list (misma anatomía de ítem)
└── button.ds-sidebar__edge-toggle
    └── svg (SideBarChevron left|right)
```

---

# Known Limitations

- **«Navegación secundaria» (rail de 6 íconos: buscar, seleccionar/crop, compartir, intercambiar,
  editar, ajustes; `fondo #2a2927`) no está implementada.** Es un elemento visualmente distinto en
  el PDF p.13, dibujado a la derecha de los mockups Desplegada/Colapsada — no es el grupo
  secundario (`secondaryItems`) de este componente. No existe ningún componente/patrón del kit que
  lo implemente hoy; queda como descubrimiento de backlog (ver
  `knowledge/fidelity-pass/next-steps.md`).
- **Ritmo vertical de la lista primaria sin resolver:** la anotación PDF «25 px» junto al hueco
  entre ítems no se pudo conciliar limpiamente con `.ds-sidebar__list{gap: 2px}` ni con una lectura
  ÷2 directa (el pitch medido entre labels varía 49–54pt @2× entre los 4 ítems primarios). No se
  tocó sin evidencia más limpia — re-medir si se reporta que el espaciado se ve mal.
- **Edge-toggle glyph simplificado:** el PDF muestra un pictograma pequeño de dos rectángulos («panel»); se implementó un chevron direccional plain porque el glifo exacto no se pudo reproducir pixel-a-pixel desde la referencia. Tamaño (`20×20`) y posición (`top: 12px`, `translateX(50%)` straddling el borde) son **provisionales**, no medidos.
- **«Flechas de navegación»:** interpretadas como el ícono del propio edge-toggle cambiando de dirección según `collapsed` (← expandido / → colapsado), no como un control separado siempre visible — interpretación, no lectura confirmada del PDF.
- **«Mis tareas» → `MenuBandejaIcon`:** mapeo inferido (bandeja/inbox), no confirmado por el PDF.
- Anchos expandido/colapsado no medidos en PDF; se reutilizan tokens existentes.
- `logo` es un slot libre sin variante para el estado colapsado: un wordmark de texto se recorta contra el ancho reducido (`overflow: hidden` en `.ds-sidebar`). El PDF solo anota «Logo» sin distinguir tratamiento por estado; el consumidor debe pasar un logo compacto/isotipo si necesita verse bien colapsado.
- Sombra derecha y paddings de badge/status: valores provisionales (sin medición PDF de blur/spread ni caja).
- Chip de estado `#282828` sobre secundaria `#2a2927`: contraste bajo heredado del PDF; no se «arregla» en código.
- Sin tests unitarios ni de integración en el repositorio.
- Sin uso documentado en `apps/web`; evidencia en Storybook (`Expanded`, `Collapsed`, `Playground`).

---

# Future Improvements

- [ ] Confirmar con design el pictograma exacto del edge-toggle (panel de dos rectángulos vs chevron)
- [ ] Medir tamaño/posición del edge-toggle y anchos expandido/colapsado en artboard
- [ ] Confirmar mapeo de ícono «Mis tareas»
- [ ] Integrar en un patrón/screen de app-shell cuando se documente
- [ ] Construir el rail «Navegación secundaria» (PDF p.13) como componente/patrón propio si producto lo pide
- [ ] Re-medir el ritmo vertical de la lista primaria («25 px») con evidencia más limpia

---

# Changelog

| Version | Change |
|----------|--------|
| 0.1.5 | **Third same-day follow-up (2026-08-05), user-reported:** the selected item's label and icon are now painted white — PDF legend gives «Iconos: #8a8b87» (default) vs «Icono seleccionado: #FFFFFF» (selected), but the previous CSS hardcoded the label to white for every row (verified via `getComputedStyle()`, not just visual guessing) and never recolored the icon. Changed the label's base color to `--ds-color-pdf-ink-muted` with a white override on `.ds-sidebar__item--selected`, and added `filter: brightness(0) invert(1)` on the selected item's icon. This required correcting a prior (wrong) Known Limitation: the shared icon SVGs were assumed to be flat multi-color and therefore non-tintable — inspecting the actual asset source showed every one is genuinely monochrome (`Icons/Menu/*-50x50.svg`, `Modules/Catastrofes-180x180.svg`), so the filter trick works reliably. Also removed the `caption: "Bandeja operativa"` demo prop from "Mis tareas" — user-reported it looked out of place as the only item with a subtitle; the `caption` prop itself stays supported. |
| 0.1.4 | **Second same-day follow-up (2026-08-05), user-reported:** the selected item's white accent line sat visibly inset from the sidebar's edge because `.ds-sidebar`'s own `padding: 10px` pushed every row inward. Moved the horizontal inset onto each row instead: `.ds-sidebar{padding: 10px 0}`, `.ds-sidebar__item`/`button.ds-sidebar__menu-heading{padding: 4px 16px}` (was `4px 6px`), `.ds-sidebar__header{padding-inline: 10px}` (new). Icon/label screen position is unchanged (the math is inset-preserving); only the row's own background/accent now spans flush to the true edge. Collapsed mode needed no change — centered icons land in the same spot regardless of padding value. |
| 0.1.3 | **Same-day follow-up (2026-08-05), user-reported:** «Menú» heading was a non-interactive `<div>` — user asked for it to be a real button too, and for a hover highlight generally. Primary `.ds-sidebar__menu-heading` is now a `<button>` wired to the existing `onToggleCollapsed` (no new prop). Added `:hover` background to `.ds-sidebar__item` and the new heading button. Fixed a bug surfaced while testing collapsed mode: `.ds-sidebar--collapsed` was hiding `.ds-sidebar__menu-heading-icon` entirely, so the new button had nothing visible/clickable once collapsed — PDF's own Colapsada column shows the hamburger icon present and centered like every other row; removed it from the collapsed hide-list and centered it to match. |
| 0.1.2 | **Fidelity pass (2026-08-05), user-reported:** corregido el agrupamiento de ítems en las stories — «Catástrofes» estaba modelado como un chip de estado «EN VIVO» en `secondaryItems` en solitario, y todo lo demás (incluyendo Notificaciones/Mi cuenta/Configuración/Ayuda/Cerrar sesión) vivía junto en `items`. PDF p.13 confirma el orden real: `items` = Mis tareas/Historial/Reportes/Catástrofes (arriba); `secondaryItems` = Notificaciones/Mi cuenta/Configuración/Ayuda/Cerrar sesión (abajo). `.ds-sidebar__secondary` pasa de `margin-top: 12px` + fondo `#2a2927` (color mal atribuido desde un diagrama no relacionado del mismo PDF, ver spec) a `margin-top: auto` (ancla real al borde inferior). El badge de notificación se reposiciona como acento absoluto sobre la esquina del ícono (antes era una pill en línea después del label, y se ocultaba por completo en colapsado — el PDF muestra el mismo badge en ambas columnas). Corregido el bug de unidad `pt`→`px` en los 5 `font-size` de este bloque (mismo bug ya documentado para `CalendarCard`/`Empty`). |
| 0.1.1 | **Corrección mismo día (artwork PDF real, no solo text extract):** `HamburguesaIcon` pasa a `menuIcon` junto a «Menú»; toggle sale del header y se convierte en `.ds-sidebar__edge-toggle` (hermano del `<nav>` dentro de `.ds-sidebar-shell`) con chevron hand-drawn; props `menuIcon` / `secondaryIcon`. |
| 0.1.0 | Implementación inicial de `SideBar` / `SideBarProps` / `SideBarItem` con estilos `ds-sidebar` según PDF p.13 SIDE BAR; export `NotificacionesIcon`; stories `Expanded`, `Collapsed`, `Playground`. |
