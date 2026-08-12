import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Tono visual de `AlertBar` (PDF "ALERT" § "Alert Sigcat")
 */
export type AlertBarTone = "default" | "alerta";

/**
 * @description Props públicas del componente `AlertBar`
 */
export interface AlertBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  tone?: AlertBarTone;
}

/**
 * @description Franja de alerta full-width con un label centrado (PDF "ALERT" p.22 §
 * "Alert Sigcat" — distinto de `AlertBanner`, que es una tarjeta con ícono/descripción/
 * acción para otro caso de uso, no se toca). Sin slots de ícono ni acción.
 * @param {AlertBarProps} props - Label y tono de la franja
 * @returns {JSX.Element} Franja de alerta del Design System
 */
export function AlertBar({ label, tone = "default", className, ...props }: AlertBarProps) {
  return (
    <div className={cn("ds-alert-bar", `ds-alert-bar--${tone}`, className)} role="status" {...props}>
      {label}
    </div>
  );
}
