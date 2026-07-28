import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Unión de tonos semánticos disponibles para la prop `tone` de `TaskCard`
 */
export type TaskTone = "neutral" | "success" | "warning" | "danger";

/**
 * @description Variantes visuales de `TaskCard` definidas en PDF TARJETAS (p. 1)
 */
export type TaskVariant = "default" | "kanban";

/**
 * @description Props públicas del componente `TaskCard`
 */
export interface TaskCardProps extends HTMLAttributes<HTMLElement> {
  code: string;
  title: string;
  status?: string;
  description?: string;
  meta?: string[];
  progress?: number;
  tone?: TaskTone;
  variant?: TaskVariant;
}

/**
 * @description Presenta una tarea operativa según PDF TARJETAS (`default` completa o `kanban` compacta)
 * @param {TaskCardProps} props - Propiedades de la tarjeta de tarea
 * @returns {JSX.Element} Artículo semántico con la estructura fija de la tarjeta
 */
export function TaskCard({
  code,
  title,
  status = "En espera",
  description,
  meta = [],
  progress: _progress = 0,
  tone = "neutral",
  variant = "default",
  className,
  style,
  ...props
}: TaskCardProps) {
  const isKanban = variant === "kanban";
  const kanbanMeta = meta.slice(0, 2);
  // width/maxWidth dropped from an incoming style prop: TaskCard's own calibrated
  // max-width (.ds-task--kanban) is fidelity, not a default — a consumer stretching
  // a wide grid column shouldn't be able to silently override it via inline style.
  const { width: _width, maxWidth: _maxWidth, ...safeStyle } = style ?? {};

  return (
    <article
      className={cn("ds-task", `ds-task--${tone}`, `ds-task--${variant}`, className)}
      style={safeStyle}
      {...props}
    >
      {isKanban ? (
        <>
          <header className="ds-task__header">
            <span className="ds-task__code">{code}</span>
          </header>
          <span className="ds-task__status">{status}</span>
          <h3 className="ds-task__title">{title}</h3>
          {kanbanMeta.length ? (
            <div className="ds-task__meta">
              {kanbanMeta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <header className="ds-task__header">
            <span className="ds-task__code">{code}</span>
          </header>
          <span className="ds-task__status">{status}</span>
          <h3 className="ds-task__title">{title}</h3>
          {description ? <p className="ds-task__description">{description}</p> : null}
          {meta.length ? (
            <div className="ds-task__meta">
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </>
      )}
    </article>
  );
}
