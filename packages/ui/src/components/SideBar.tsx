import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * @description Ítem declarativo de navegación del `SideBar` (lista primaria o secundaria).
 */
export interface SideBarItem {
  /**
   * @description Icono del ítem (`ReactNode`; tipicamente `<img src={…Icon} alt="" />`).
   * @type {ReactNode}
   */
  icon: ReactNode;
  /**
   * @description Etiqueta visible del ítem.
   * @type {string}
   */
  label: string;
  /**
   * @description Bajada opcional bajo la etiqueta (PDF «Bajada»).
   * @type {string}
   */
  caption?: string;
  /**
   * @description Contador de notificación opcional (PDF «Notificación»).
   * @type {number}
   */
  badge?: number;
  /**
   * @description Chip de estado opcional (PDF «Estado», p. ej. «EN VIVO»).
   * @type {string}
   */
  status?: string;
  /**
   * @description Si el ítem está seleccionado (acento de línea izquierda).
   * @type {boolean}
   */
  selected?: boolean;
  /**
   * @description Handler de clic; el kit no asume routing (`href`).
   * @type {() => void}
   */
  onClick?: () => void;
}

/**
 * @description Props públicas del componente `SideBar` (PDF p.13 — menú central colapsable).
 */
export interface SideBarProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  /**
   * @description Slot opcional de logo en el encabezado.
   * @type {ReactNode}
   */
  logo?: ReactNode;
  /**
   * @description Icono opcional junto a `menuLabel` (p. ej. `HamburguesaIcon` — ícono de sección «Menú»).
   * @type {ReactNode}
   */
  menuIcon?: ReactNode;
  /**
   * @description Encabezado opcional sobre la lista primaria (p. ej. «Menú»). Sin default hardcodeado.
   * @type {string}
   */
  menuLabel?: string;
  /**
   * @description Lista declarativa de ítems de navegación primaria/utilitaria.
   * @type {SideBarItem[]}
   */
  items: SideBarItem[];
  /**
   * @description Icono opcional junto a `secondaryLabel` (conveniencia simétrica; no confirmado en PDF).
   * @type {ReactNode}
   */
  secondaryIcon?: ReactNode;
  /**
   * @description Encabezado opcional sobre la lista secundaria/módulos (conveniencia del consumidor; el PDF no muestra label visible).
   * @type {string}
   */
  secondaryLabel?: string;
  /**
   * @description Lista opcional de ítems de navegación secundaria (módulos).
   * @type {SideBarItem[]}
   */
  secondaryItems?: SideBarItem[];
  /**
   * @description Estado colapsado controlado por el consumidor (sin estado interno).
   * @type {boolean}
   */
  collapsed: boolean;
  /**
   * @description Callback para alternar el estado colapsado (controlado).
   * @type {() => void}
   */
  onToggleCollapsed: () => void;
}

/**
 * @description Chevron direccional hand-drawn para el edge-toggle (chrome de UI, no icono compartido).
 * @param {{ direction: "left" | "right" }} props - Dirección del chevron.
 * @returns {ReactElement} SVG decorativo.
 */
function SideBarChevron({ direction }: { direction: "left" | "right" }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true" focusable="false">
      <path
        d={direction === "left" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/**
 * @description Renderiza un ítem de navegación del sidebar.
 * @param {SideBarItem} item - Datos del ítem.
 * @returns {ReactElement} Elemento `<li>` con botón.
 */
function SideBarListItem({ item }: { item: SideBarItem }): ReactElement {
  const { icon, label, caption, badge, status, selected, onClick } = item;

  return (
    <li>
      <button
        type="button"
        className={cn("ds-sidebar__item", selected && "ds-sidebar__item--selected")}
        onClick={onClick}
        aria-current={selected ? "page" : undefined}
      >
        <span className="ds-sidebar__item-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="ds-sidebar__item-copy">
          <span className="ds-sidebar__item-label">{label}</span>
          {caption ? <span className="ds-sidebar__item-caption">{caption}</span> : null}
        </span>
        {badge != null ? <span className="ds-sidebar__badge">{badge}</span> : null}
        {status ? <span className="ds-sidebar__status">{status}</span> : null}
      </button>
    </li>
  );
}

/**
 * @description Menú central colapsable de la plataforma según SIDE BAR (PDF p.13).
 * @param {SideBarProps} props - Propiedades del sidebar.
 * @returns {ReactElement} Shell de posicionamiento con `<nav>` y edge-toggle.
 */
export function SideBar({
  logo,
  menuIcon,
  menuLabel,
  items,
  secondaryIcon,
  secondaryLabel,
  secondaryItems,
  collapsed,
  onToggleCollapsed,
  className,
  ...props
}: SideBarProps): ReactElement {
  const hasSecondary = Boolean(secondaryItems?.length);
  const hasMenuHeading = Boolean(menuIcon || menuLabel);
  const hasSecondaryHeading = Boolean(secondaryIcon || secondaryLabel);

  return (
    <div className="ds-sidebar-shell">
      <nav
        className={cn("ds-sidebar", collapsed && "ds-sidebar--collapsed", className)}
        {...props}
      >
        {logo ? (
          <div className="ds-sidebar__header">
            <span className="ds-sidebar__logo">{logo}</span>
          </div>
        ) : null}

        <div className="ds-sidebar__menu">
          {hasMenuHeading ? (
            <div className="ds-sidebar__menu-heading">
              {menuIcon ? (
                <span className="ds-sidebar__menu-heading-icon" aria-hidden="true">
                  {menuIcon}
                </span>
              ) : null}
              {menuLabel ? <span className="ds-sidebar__menu-label">{menuLabel}</span> : null}
            </div>
          ) : null}
          <ul className="ds-sidebar__list">
            {items.map((item) => (
              <SideBarListItem key={item.label} item={item} />
            ))}
          </ul>
        </div>

        {hasSecondary ? (
          <div className="ds-sidebar__secondary">
            {hasSecondaryHeading ? (
              <div className="ds-sidebar__menu-heading">
                {secondaryIcon ? (
                  <span className="ds-sidebar__menu-heading-icon" aria-hidden="true">
                    {secondaryIcon}
                  </span>
                ) : null}
                {secondaryLabel ? (
                  <span className="ds-sidebar__menu-label">{secondaryLabel}</span>
                ) : null}
              </div>
            ) : null}
            <ul className="ds-sidebar__list">
              {secondaryItems!.map((item) => (
                <SideBarListItem key={item.label} item={item} />
              ))}
            </ul>
          </div>
        ) : null}
      </nav>

      <button
        type="button"
        className="ds-sidebar__edge-toggle"
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
        onClick={onToggleCollapsed}
      >
        <SideBarChevron direction={collapsed ? "right" : "left"} />
      </button>
    </div>
  );
}
