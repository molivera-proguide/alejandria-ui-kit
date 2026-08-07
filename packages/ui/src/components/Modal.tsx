import { useEffect, useId } from "react";
import type { HTMLAttributes, MouseEvent } from "react";
import { cn } from "../utils/cn";

/**
 * @description Una de las 2 acciones del diálogo de confirmación (PDF p.22: "ACCIÓN A" / "ACCIÓN B")
 */
export interface ModalAction {
  label: string;
  onClick: () => void;
}

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  description: string;
  /**
   * @description Acción secundaria (se renderiza primero, ej. "cancelar")
   */
  secondaryAction: ModalAction;
  /**
   * @description Acción primaria (se renderiza segunda, ej. "confirmar")
   */
  primaryAction: ModalAction;
  /**
   * @description Se dispara al hacer click en el backdrop o presionar Escape
   */
  onClose?: () => void;
}

/**
 * @description Diálogo modal de confirmación de acción (PDF v3 p.22 "ALERT" §
 * "Confirmación de acción" — "¿ESTÁS SEGURO DE ESTA ACCIÓN?"). Distinto de
 * `AlertBanner` (notificación inline, no bloqueante) — este es el único
 * componente de esta feature con overlay + backdrop. Solo implementa la
 * variante confirm/cancel; las otras 2 cajas de p.22 ("Alert Sigcat", "Tarea
 * realizada") son notificaciones, no diálogos, y quedan fuera de scope.
 * @param {ModalProps} props - Propiedades del diálogo
 * @returns {JSX.Element} Modal del Design System
 */
export function Modal({
  title,
  description,
  secondaryAction,
  primaryAction,
  onClose,
  className,
  ...props
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function onBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose?.();
  }

  return (
    <div className="ds-modal-backdrop" onClick={onBackdropClick}>
      <div
        className={cn("ds-modal", className)}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...props}
      >
        <h2 className="ds-modal__title" id={titleId}>
          {title}
        </h2>
        <p className="ds-modal__text" id={descriptionId}>
          {description}
        </p>
        <div className="ds-modal__divider" role="presentation" />
        <div className="ds-modal__actions">
          <button type="button" className="ds-modal__action" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </button>
          <button
            type="button"
            className="ds-modal__action ds-modal__action--primary"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </button>
        </div>
      </div>
    </div>
  );
}
