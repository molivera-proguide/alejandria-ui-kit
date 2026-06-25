import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ChartCard } from "./ChartCard";

/**
 * @description Punto de datos para el gráfico de barras
 */
export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
}

/**
 * @description Propiedades de la tarjeta con gráfico de barras
 */
export interface BarChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  footer: string;
  data: BarChartDatum[];
  maxValue?: number;
}

const CHART_COLORS = [
  "var(--ds-color-teal)",
  "var(--ds-color-blue)",
  "var(--ds-color-green)",
  "var(--ds-color-amber)",
  "var(--ds-color-coral)"
];

const CHART_WIDTH = 280;
const CHART_HEIGHT = 120;
const CHART_PADDING_X = 8;
const CHART_PADDING_Y = 8;
const LABEL_HEIGHT = 18;

/**
 * @description Tarjeta con gráfico de barras verticales en SVG puro
 * @param {BarChartCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Tarjeta con gráfico de barras
 */
export function BarChartCard({
  title,
  footer,
  data,
  maxValue,
  className,
  ...props
}: BarChartCardProps) {
  const resolvedMax = maxValue ?? Math.max(...data.map((item) => item.value), 1);
  const plotHeight = CHART_HEIGHT - CHART_PADDING_Y * 2 - LABEL_HEIGHT;
  const barGap = 10;
  const barWidth = data.length
    ? (CHART_WIDTH - CHART_PADDING_X * 2 - barGap * (data.length - 1)) / data.length
    : 0;

  return (
    <ChartCard title={title} footer={footer} className={cn(className)} {...props}>
      <svg
        className="ds-bar-chart"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={`Gráfico de barras: ${title}`}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / resolvedMax) * plotHeight;
          const x = CHART_PADDING_X + index * (barWidth + barGap);
          const y = CHART_PADDING_Y + plotHeight - barHeight;
          const color = item.color ?? CHART_COLORS[index % CHART_COLORS.length];

          return (
            <g key={item.label}>
              <rect
                className="ds-bar-chart__bar"
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={2}
              />
              <text
                className="ds-bar-chart__label"
                x={x + barWidth / 2}
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
