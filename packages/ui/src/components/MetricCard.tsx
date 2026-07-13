import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Tono semántico de la métrica
 */
export type MetricTone = "neutral" | "good" | "watch" | "critical";

/**
 * @description Escala visual de la métrica (reporting vs ficha)
 */
export type MetricAppearance = "reporting" | "ficha";

/**
 * @description Propiedades del componente MetricCard
 */
export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  tone?: MetricTone;
  appearance?: MetricAppearance;
}

/**
 * @description Tarjeta de métrica operativa de solo lectura
 * @param {MetricCardProps} props - Propiedades de la métrica
 * @returns {JSX.Element} Indicador KPI del Design System
 */
export function MetricCard({
  label,
  value,
  change,
  tone = "neutral",
  appearance = "reporting",
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "ds-metric",
        `ds-metric--${tone}`,
        appearance === "ficha" && "ds-metric--ficha",
        className
      )}
      {...props}
    >
      <div className="ds-metric__topline">
        <span className="ds-metric__label">{label}</span>
      </div>
      <strong className="ds-metric__value">{value}</strong>
      {change ? <span className="ds-metric__change">{change}</span> : null}
    </div>
  );
}
