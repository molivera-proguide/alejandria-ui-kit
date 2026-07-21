import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * @description Props del estado vacío centrado (EMPTY, PDF p.16).
 */
export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description Icono decorativo del estado vacío.
   * @type {ReactNode}
   */
  icon?: ReactNode;
  /**
   * @description Título obligatorio del estado vacío.
   * @type {string}
   */
  title: string;
  /**
   * @description Texto descriptivo opcional bajo el título.
   * @type {string}
   */
  description?: string;
  /**
   * @description Acción contextual (slot libre; no compone `Button` del kit).
   * @type {ReactNode}
   */
  action?: ReactNode;
}

/**
 * @description Estado vacío presentacional sin fondo, centrado, según EMPTY (PDF p.16).
 * @param {EmptyProps} props - Props del estado vacío.
 * @returns {ReactElement} Contenedor con icono, título, descripción y acción opcionales.
 */
export function Empty({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyProps): ReactElement {
  return (
    <div className={cn("ds-empty", className)} {...props}>
      {icon ? (
        <span className="ds-empty__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <strong className="ds-empty__title">{title}</strong>
      {description ? <p className="ds-empty__description">{description}</p> : null}
      {action ? <div className="ds-empty__action">{action}</div> : null}
    </div>
  );
}
