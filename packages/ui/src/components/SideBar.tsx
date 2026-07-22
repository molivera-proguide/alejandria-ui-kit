import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { HamburguesaIcon } from "../Icons";
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
 * @returns {ReactElement} Navegación semántica con listas primaria y secundaria opcionales.
 */
export function SideBar({
  logo,
  menuLabel,
  items,
  secondaryLabel,
  secondaryItems,
  collapsed,
  onToggleCollapsed,
  className,
  ...props
}: SideBarProps): ReactElement {
  const hasSecondary = Boolean(secondaryItems?.length);

  return (
    <nav
      className={cn("ds-sidebar", collapsed && "ds-sidebar--collapsed", className)}
      {...props}
    >
      <div className="ds-sidebar__header">
        {logo ? <span className="ds-sidebar__logo">{logo}</span> : null}
        <button
          type="button"
          className="ds-sidebar__toggle"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          onClick={onToggleCollapsed}
        >
          <img src={HamburguesaIcon} alt="" />
        </button>
      </div>

      <div className="ds-sidebar__menu">
        {menuLabel ? <span className="ds-sidebar__menu-label">{menuLabel}</span> : null}
        <ul className="ds-sidebar__list">
          {items.map((item) => (
            <SideBarListItem key={item.label} item={item} />
          ))}
        </ul>
      </div>

      {hasSecondary ? (
        <div className="ds-sidebar__secondary">
          {secondaryLabel ? (
            <span className="ds-sidebar__menu-label">{secondaryLabel}</span>
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
