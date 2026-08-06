import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "../utils/cn";
import { ChartCard } from "./ChartCard";

/**
 * @description Orientación del gráfico de barras lineales (PDF GRAFICOS p.9 "Barras lineal
 * horizontal" / "Barras lineal vertical", `doc[8]`).
 * @type {"horizontal" | "vertical"}
 */
export type LinearBarChartOrientation = "horizontal" | "vertical";

/**
 * @description Punto de datos para el gráfico de barras lineales.
 */
export interface LinearBarDatum {
  /**
   * @description Etiqueta de la fila (horizontal, p. ej. `"Córdoba"`) o del grupo (vertical,
   * p. ej. `"NOV"`) al que pertenece este valor.
   * @type {string}
   */
  label: string;
  /**
   * @description Valor numérico representado por la línea.
   * @type {number}
   */
  value: number;
  /**
   * @description Solo `orientation="vertical"`: agrupa varias barras bajo una misma etiqueta de
   * grupo (PDF: meses). Si se omite, cada dato es su propio grupo de una sola barra.
   * @type {string}
   */
  group?: string;
  /**
   * @description Resalta la fila/barra en `--ds-color-pdf-critical` (PDF «Número o referencia
   * destacada» / primer ítem del ranking).
   * @type {boolean}
   */
  highlighted?: boolean;
}

/**
 * @description Propiedades de la tarjeta con gráfico de barras lineales.
 */
export interface LinearBarChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  footer: string;
  data: LinearBarDatum[];
  /**
   * @description `"horizontal"` (ranking con línea + label + valor, PDF «HISTÓRICO INCENDIOS») o
   * `"vertical"` (barras agrupadas, PDF «PRECIPITACIONES ESTACIONALES»). Default `"horizontal"`.
   * @type {LinearBarChartOrientation}
   */
  orientation?: LinearBarChartOrientation;
  /**
   * @description Sufijo agregado a cada valor mostrado (PDF usa `"%"` en el ranking horizontal y
   * `"mm"` en el ejemplo vertical). Default `"%"`.
   * @type {string}
   */
  unit?: string;
  maxValue?: number;
}

/**
 * @description Agrupa los datos por `group` preservando el orden de aparición; sin `group`, cada
 * dato queda solo en su propio grupo (mismo comportamiento que la fila individual horizontal).
 * @param {LinearBarDatum[]} data - Datos a agrupar.
 * @returns {{ label: string; bars: LinearBarDatum[] }[]} Grupos en orden de aparición.
 */
function groupData(data: LinearBarDatum[]): { label: string; bars: LinearBarDatum[] }[] {
  const groups: { label: string; bars: LinearBarDatum[] }[] = [];

  data.forEach((datum) => {
    const groupLabel = datum.group ?? datum.label;
    const existing = groups.find((group) => group.label === groupLabel);

    if (existing) {
      existing.bars.push(datum);
    } else {
      groups.push({ label: groupLabel, bars: [datum] });
    }
  });

  return groups;
}

/**
 * @description Tarjeta con gráfico de barras lineales (trazos finos, no rectángulos) según
 * GRAFICOS p.9 "Barras lineal horizontal/vertical" (`doc[8]`) — distinto de `BarChartCard`, que
 * cubre las barras tradicionales de p.10.
 * @param {LinearBarChartCardProps} props - Propiedades del componente.
 * @returns {ReactElement} Tarjeta con gráfico de barras lineales.
 */
export function LinearBarChartCard({
  title,
  footer,
  data,
  orientation = "horizontal",
  unit = "%",
  maxValue,
  className,
  ...props
}: LinearBarChartCardProps): ReactElement {
  const resolvedMax = maxValue ?? Math.max(...data.map((item) => item.value), 1);

  if (orientation === "vertical") {
    // Bars sit in one continuous grid track so every bar is the same distance from its
    // neighbors regardless of which group it belongs to (PDF measures a uniform ~17.7px
    // center-to-center spacing throughout the whole chart, group boundaries or not — see spec).
    // Nesting each group in its own flex row (previous implementation) made within-group gaps
    // and between-group gaps inconsistent whenever groups had different bar counts.
    let column = 0;
    const groups = groupData(data).map((group) => {
      const startColumn = column;
      column += group.bars.length;
      return { ...group, startColumn };
    });

    return (
      <ChartCard title={title} footer={footer} className={cn(className)} {...props}>
        <div
          className="ds-linear-bar-chart ds-linear-bar-chart--vertical"
          style={{ gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, 1fr)` }}
        >
          {groups.map((group) =>
            group.bars.map((bar, index) => (
              <div
                className={cn(
                  "ds-linear-bar-chart__bar-vertical",
                  bar.highlighted && "ds-linear-bar-chart__bar-vertical--highlighted"
                )}
                key={`${group.label}-${index}`}
                style={{
                  gridColumn: group.startColumn + index + 1,
                  height: `${(bar.value / resolvedMax) * 100}%`
                }}
              >
                <span className="ds-linear-bar-chart__bar-value">
                  {bar.value}
                  {unit}
                </span>
              </div>
            ))
          )}
          {groups.map((group) => (
            <span
              className="ds-linear-bar-chart__group-label"
              key={`group-label-${group.label}`}
              style={{ gridColumn: `${group.startColumn + 1} / span ${group.bars.length}` }}
            >
              {group.label}
            </span>
          ))}
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title={title} footer={footer} className={cn(className)} {...props}>
      <div className="ds-linear-bar-chart ds-linear-bar-chart--horizontal">
        {data.map((item, index) => (
          <div
            className={cn(
              "ds-linear-bar-chart__row",
              item.highlighted && "ds-linear-bar-chart__row--highlighted"
            )}
            key={`${item.label}-${index}`}
          >
            <span className="ds-linear-bar-chart__track">
              <span
                className="ds-linear-bar-chart__bar-horizontal"
                style={{ width: `${(item.value / resolvedMax) * 100}%` }}
              />
            </span>
            <span className="ds-linear-bar-chart__label">{item.label}</span>
            <span className="ds-linear-bar-chart__value">
              {item.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
