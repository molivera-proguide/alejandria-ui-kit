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
          {/* PDF p.13: the notification badge is a corner accent on the icon itself (same
              position in both Desplegada and Colapsada), not an inline pill after the label. */}
          {badge != null ? <span className="ds-sidebar__badge">{badge}</span> : null}
        </span>
        <span className="ds-sidebar__item-copy">
          <span className="ds-sidebar__item-label">{label}</span>
          {caption ? <span className="ds-sidebar__item-caption">{caption}</span> : null}
        </span>
        {status ? <span className="ds-sidebar__status">{status}</span> : null}
      </button>
    </li>
  );
}

/**
 * @description Menú central colapsable de la plataforma según SIDE BAR (PDF p.13).
 * @param {SideBarProps} props - Propiedades del sidebar.
 * @returns {ReactElement} `<nav>` único — el heading "Menú" es el único control interno de colapso.
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
          <button
            type="button"
            className="ds-sidebar__menu-heading"
            onClick={onToggleCollapsed}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          >
            {menuIcon ? (
              <span className="ds-sidebar__menu-heading-icon" aria-hidden="true">
                {menuIcon}
              </span>
            ) : null}
            {menuLabel ? <span className="ds-sidebar__menu-label">{menuLabel}</span> : null}
          </button>
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
  );
}
