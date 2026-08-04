import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Unión de tonos semánticos disponibles para la prop `tone` de `TaskCard`
 */
export type TaskTone = "neutral" | "success" | "warning" | "danger";

/**
 * @description Variantes visuales de `TaskCard` definidas en PDF TARJETAS (p. 3)
 */
export type TaskVariant = "default" | "kanban" | "resumen";

/**
 * @description Props públicas del componente `TaskCard`
 */
export interface TaskCardProps extends HTMLAttributes<HTMLElement> {
  code: string;
  title: string;
  status?: string;
  description?: string;
  creator?: string;
  startDate?: string;
  endDate?: string;
  meta?: string[];
  progress?: number;
  tone?: TaskTone;
  variant?: TaskVariant;
}

/**
 * @description Presenta una tarea operativa según PDF TARJETAS (`default` completa, `kanban` compacta o `resumen` mínima)
 * @param {TaskCardProps} props - Propiedades de la tarjeta de tarea
 * @returns {JSX.Element} Artículo semántico con la estructura fija de la tarjeta
 */
export function TaskCard({
  code,
  title,
  status = "En espera",
  description,
  creator,
  startDate,
  endDate,
  meta = [],
  progress: _progress = 0,
  tone = "neutral",
  variant = "default",
  className,
  style,
  ...props
}: TaskCardProps) {
  const isDefault = variant === "default";
  const isKanban = variant === "kanban";
  const isResumen = variant === "resumen";
  const visibleMeta = isKanban ? meta.slice(0, 2) : meta;
  const hasDetails = Boolean(creator || startDate || endDate);
  // width/maxWidth dropped from an incoming style prop: TaskCard's own calibrated
  // width (fixed per variant, see .ds-task--default/kanban/resumen) is fidelity, not a
  // default — a consumer stretching a wide grid column shouldn't be able to silently
  // override it via inline style.
  const { width: _width, maxWidth: _maxWidth, ...safeStyle } = style ?? {};

  return (
    <article
      className={cn("ds-task", `ds-task--${tone}`, `ds-task--${variant}`, className)}
      style={safeStyle}
      {...props}
    >
      <header className="ds-task__header">
        <span className="ds-task__code">{code}</span>
      </header>
      <span className="ds-task__status">{status}</span>
      <h3 className="ds-task__title">{title}</h3>
      {isDefault && description ? <p className="ds-task__description">{description}</p> : null}
      {!isResumen && visibleMeta.length ? (
        <div className="ds-task__meta">
          {visibleMeta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      {isDefault && hasDetails ? (
        <div className="ds-task__details">
          {creator ? <span>{creator}</span> : null}
          {startDate ? <span>{startDate}</span> : null}
          {endDate ? <span>{endDate}</span> : null}
        </div>
      ) : null}
    </article>
  );
}
