import { useEffect } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Props públicas del componente `Toast`
 */
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  message: string;
  /**
   * @description Tiempo antes de disparar `onDismiss`, en ms.
   * @default 4000
   */
  durationMs?: number;
  /**
   * @description Se dispara cuando termina `durationMs` — el componente no se desmonta
   * solo, es responsabilidad del consumidor (mismo criterio que `Modal`'s `onClose`).
   */
  onDismiss?: () => void;
}

/**
 * @description Notificación centrada de auto-dismiss (PDF "ALERT" p.22 § "Tarea
 * realizada"). Sin botón de cierre — el PDF no lo muestra. Un solo tono (`success`)
 * por ahora.
 * @param {ToastProps} props - Mensaje, duración y callback de cierre
 * @returns {JSX.Element} Notificación del Design System
 */
export function Toast({ message, durationMs = 4000, onDismiss, className, ...props }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss?.(), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onDismiss]);

  return (
    <div className={cn("ds-toast", className)} role="status" {...props}>
      {message}
    </div>
  );
}
