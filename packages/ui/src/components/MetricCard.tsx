import type { HTMLAttributes, MouseEventHandler } from "react";
import EditarIcon from "../Icons/Cards/Editar-20x20.svg";
import EliminarIcon from "../Icons/Cards/Eliminar-20x20.svg";
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
 * @description Identificadores de las utilidades fijas de esquina en `MetricCard`
 */
export type MetricUtilityType = "edit" | "delete";

/**
 * @description Configuración de una utilidad de esquina en `MetricCard`
 */
export interface MetricUtility {
  type: MetricUtilityType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

/**
 * @description Propiedades del componente MetricCard
 */
export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  tone?: MetricTone;
  appearance?: MetricAppearance;
  /**
   * Utilidades de editar/eliminar en la esquina superior derecha. Solo se renderizan cuando
   * `appearance="reporting"` — PDF METRIC CARD p.11 no las muestra en las tiles "En ficha".
   */
  utilities?: MetricUtility[];
}

const UTILITY_ORDER: readonly MetricUtilityType[] = ["edit", "delete"];

const UTILITY_METADATA: Record<MetricUtilityType, { icon: string; defaultLabel: string }> = {
  edit: { icon: EditarIcon, defaultLabel: "Editar" },
  delete: { icon: EliminarIcon, defaultLabel: "Eliminar" }
};

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
  utilities = [],
  className,
  ...props
}: MetricCardProps) {
  const isReporting = appearance === "reporting";
  const orderedUtilities = isReporting
    ? UTILITY_ORDER.flatMap((type) => {
        const utility = utilities.find((item) => item.type === type);
        return utility ? [utility] : [];
      })
    : [];

  return (
    <div
      className={cn(
        "ds-metric",
        `ds-metric--${tone}`,
        appearance === "ficha" && "ds-metric--ficha",
        orderedUtilities.length > 0 && "ds-metric--with-utilities",
        className
      )}
      {...props}
    >
      {orderedUtilities.length ? (
        <div className="ds-metric__utilities">
          {orderedUtilities.map((utility) => {
            const { icon, defaultLabel } = UTILITY_METADATA[utility.type];
            return (
              <button
                key={utility.type}
                type="button"
                className="ds-metric__utility"
                onClick={utility.onClick}
                aria-label={utility.label ?? defaultLabel}
              >
                <img src={icon} alt="" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="ds-metric__topline">
        <span className="ds-metric__label">{label}</span>
      </div>
      <strong className="ds-metric__value">{value}</strong>
      {change ? <span className="ds-metric__change">{change}</span> : null}
    </div>
  );
}
