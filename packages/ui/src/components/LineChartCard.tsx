import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ChartCard } from "./ChartCard";

/**
 * @description Punto de datos para el gráfico de línea
 */
export interface LineChartDatum {
  label: string;
  value: number;
}

/**
 * @description Propiedades de la tarjeta con gráfico de línea
 */
export interface LineChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  footer: string;
  data: LineChartDatum[];
  color?: string;
  maxValue?: number;
}

const CHART_WIDTH = 280;
const CHART_HEIGHT = 120;
const CHART_PADDING_X = 12;
const CHART_PADDING_Y = 10;
const LABEL_HEIGHT = 18;

/**
 * @description Construye la ruta SVG del gráfico de línea a partir de los datos
 * @param {LineChartDatum[]} data - Puntos del gráfico
 * @param {number} maxValue - Valor máximo del eje vertical
 * @returns {string} Atributo `d` para el elemento path
 */
function buildLinePath(data: LineChartDatum[], maxValue: number): string {
  if (!data.length) {
    return "";
  }

  const plotWidth = CHART_WIDTH - CHART_PADDING_X * 2;
  const plotHeight = CHART_HEIGHT - CHART_PADDING_Y * 2 - LABEL_HEIGHT;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0;

  return data
    .map((item, index) => {
      const x = CHART_PADDING_X + index * step;
      const y = CHART_PADDING_Y + plotHeight - (item.value / maxValue) * plotHeight;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

/**
 * @description Construye la ruta del área rellena bajo la línea del gráfico
 * @param {LineChartDatum[]} data - Puntos del gráfico
 * @param {number} maxValue - Valor máximo del eje vertical
 * @returns {string} Atributo `d` para el elemento path del área
 */
function buildAreaPath(data: LineChartDatum[], maxValue: number): string {
  if (!data.length) {
    return "";
  }

  const plotWidth = CHART_WIDTH - CHART_PADDING_X * 2;
  const plotHeight = CHART_HEIGHT - CHART_PADDING_Y * 2 - LABEL_HEIGHT;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0;
  const baseline = CHART_PADDING_Y + plotHeight;

  const linePoints = data.map((item, index) => {
    const x = CHART_PADDING_X + index * step;
    const y = CHART_PADDING_Y + plotHeight - (item.value / maxValue) * plotHeight;
    return `${x} ${y}`;
  });

  const firstX = CHART_PADDING_X;
  const lastX = CHART_PADDING_X + (data.length - 1) * step;

  return `M ${firstX} ${baseline} L ${linePoints.join(" L ")} L ${lastX} ${baseline} Z`;
}

/**
 * @description Tarjeta con gráfico de línea en SVG puro
 * @param {LineChartCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Tarjeta con gráfico de línea
 */
export function LineChartCard({
  title,
  footer,
  data,
  color = "var(--ds-color-teal)",
  maxValue,
  className,
  ...props
}: LineChartCardProps) {
  const resolvedMax = maxValue ?? Math.max(...data.map((item) => item.value), 1);
  const plotWidth = CHART_WIDTH - CHART_PADDING_X * 2;
  const plotHeight = CHART_HEIGHT - CHART_PADDING_Y * 2 - LABEL_HEIGHT;
  const step = data.length > 1 ? plotWidth / (data.length - 1) : 0;
  const linePath = buildLinePath(data, resolvedMax);
  const areaPath = buildAreaPath(data, resolvedMax);

  return (
    <ChartCard title={title} footer={footer} className={cn(className)} {...props}>
      <svg
        className="ds-line-chart"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={`Gráfico de línea: ${title}`}
      >
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = CHART_PADDING_Y + plotHeight - tick * plotHeight;
          return (
            <line
              key={tick}
              className="ds-line-chart__grid"
              x1={CHART_PADDING_X}
              x2={CHART_WIDTH - CHART_PADDING_X}
              y1={y}
              y2={y}
            />
          );
        })}
        <path className="ds-line-chart__area" d={areaPath} fill={color} />
        <path className="ds-line-chart__line" d={linePath} stroke={color} />
        {data.map((item, index) => {
          const x = CHART_PADDING_X + index * step;
          const y = CHART_PADDING_Y + plotHeight - (item.value / resolvedMax) * plotHeight;

          return (
            <g key={item.label}>
              <circle className="ds-line-chart__point" cx={x} cy={y} r={3} fill={color} />
              <text
                className="ds-line-chart__label"
                x={x}
                y={CHART_HEIGHT - 4}
                textAnchor="middle"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
