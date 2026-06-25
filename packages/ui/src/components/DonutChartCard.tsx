import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ChartCard } from "./ChartCard";

/**
 * @description Punto de datos para el gráfico de dona
 */
export interface DonutChartDatum {
  label: string;
  value: number;
  color?: string;
}

/**
 * @description Estadística opcional mostrada junto al gráfico de dona
 */
export interface DonutChartStat {
  value: string;
  label: string;
}

/**
 * @description Propiedades de la tarjeta con gráfico de dona
 */
export interface DonutChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  footer: string;
  data: DonutChartDatum[];
  primaryStat?: DonutChartStat;
  secondaryStat?: DonutChartStat;
  total?: number;
}

const CHART_COLORS = [
  "var(--ds-color-teal)",
  "var(--ds-color-blue)",
  "var(--ds-color-green)",
  "var(--ds-color-amber)",
  "var(--ds-color-coral)"
];

const SIZE = 120;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * @description Tarjeta con gráfico de dona en SVG puro
 * @param {DonutChartCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Tarjeta con gráfico de dona
 */
export function DonutChartCard({
  title,
  footer,
  data,
  primaryStat,
  secondaryStat,
  total,
  className,
  ...props
}: DonutChartCardProps) {
  const chartTotal = total ?? 100;
  let cumulative = 0;

  return (
    <ChartCard title={title} footer={footer} className={cn(className)} {...props}>
      <div className="ds-donut-chart__layout">
        <svg
          className="ds-donut-chart"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`Gráfico de dona: ${title}`}
        >
          <circle
            className="ds-donut-chart__track"
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
          />
          {data.map((item, index) => {
            const dash = (item.value / chartTotal) * CIRCUMFERENCE;
            const segmentOffset = -cumulative;
            cumulative += dash;
            const color = item.color ?? CHART_COLORS[index % CHART_COLORS.length];

            return (
              <circle
                key={item.label}
                className="ds-donut-chart__segment"
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={color}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                strokeDashoffset={segmentOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        {primaryStat ? (
          <div className="ds-donut-chart__stat ds-donut-chart__stat--primary">
            <strong>{primaryStat.value}</strong>
            <span>{primaryStat.label}</span>
          </div>
        ) : null}
        {secondaryStat ? (
          <div className="ds-donut-chart__stat ds-donut-chart__stat--secondary">
            <strong>{secondaryStat.value}</strong>
            <span>{secondaryStat.label}</span>
          </div>
        ) : null}
      </div>
    </ChartCard>
  );
}
