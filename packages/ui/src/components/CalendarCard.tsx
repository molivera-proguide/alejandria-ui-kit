import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { cn } from "../utils/cn";

/**
 * @description Props públicas del componente `CalendarCard` (PDF p.15 — tile estático de fecha/evento).
 */
export interface CalendarCardProps extends Omit<ComponentPropsWithoutRef<"article">, "children"> {
  /**
   * @description Día de la fecha (PDF «Fecha»; tipografía compartida con `month`).
   * @type {string}
   */
  day: string;
  /**
   * @description Mes de la fecha (PDF «Fecha»; tipografía compartida con `day`).
   * @type {string}
   */
  month: string;
  /**
   * @description Texto descriptivo opcional bajo el bloque de fecha.
   * @type {string}
   */
  description?: string;
}

/**
 * @description Tile estático de fecha/evento según CALENDAR CARD (PDF p.15). No es un date-picker.
 * @param {CalendarCardProps} props - Propiedades de la tarjeta de calendario.
 * @returns {ReactElement} Artículo semántico con anatomía fija (fecha + descripción opcional).
 */
export function CalendarCard({
  day,
  month,
  description,
  className,
  ...props
}: CalendarCardProps): ReactElement {
  return (
    <article className={cn("ds-calendar-card", className)} {...props}>
      <div className="ds-calendar-card__date">
        <span className="ds-calendar-card__day">{day}</span>
        <span className="ds-calendar-card__month">{month}</span>
      </div>
      {description ? <p className="ds-calendar-card__description">{description}</p> : null}
    </article>
  );
}
