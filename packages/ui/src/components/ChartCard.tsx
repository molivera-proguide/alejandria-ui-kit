import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

/**
 * @description Propiedades del contenedor base para tarjetas con gráficos
 */
export interface ChartCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  footer: string;
  children: ReactNode;
}

/**
 * @description Contenedor reutilizable para gráficos con título y pie de tarjeta
 * @param {ChartCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Tarjeta con área de contenido para gráficos
 */
export function ChartCard({
  title,
  footer,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <div className={cn("ds-chart-card", className)} {...props}>
      <header className="ds-chart-card__title">{title}</header>
      <div className="ds-chart-card__body">{children}</div>
      <footer className="ds-chart-card__footer">{footer}</footer>
    </div>
  );
}
