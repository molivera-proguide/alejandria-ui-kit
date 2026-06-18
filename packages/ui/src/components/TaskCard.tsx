import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type TaskTone = "neutral" | "success" | "warning" | "danger";

export interface TaskCardProps extends HTMLAttributes<HTMLElement> {
  code: string;
  title: string;
  status?: string;
  description?: string;
  meta?: string[];
  progress?: number;
  tone?: TaskTone;
}

export function TaskCard({
  code,
  title,
  status = "En espera",
  description,
  meta = [],
  progress = 0,
  tone = "neutral",
  className,
  style,
  ...props
}: TaskCardProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const progressStyle = {
    ...style,
    "--task-progress": `${clampedProgress}%`
  } as CSSProperties;

  return (
    <article className={cn("ds-task", `ds-task--${tone}`, className)} style={progressStyle} {...props}>
      <header className="ds-task__header">
        <span className="ds-task__code">{code}</span>
        <span className="ds-task__status">{status}</span>
      </header>
      <h3 className="ds-task__title">{title}</h3>
      {description ? <p className="ds-task__description">{description}</p> : null}
      {meta.length ? (
        <div className="ds-task__meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      <footer className="ds-task__footer">
        <span className="ds-task__progress-track" aria-hidden="true">
          <span className="ds-task__progress-fill" />
        </span>
        <span className="ds-task__progress-label">{clampedProgress}% avance</span>
      </footer>
    </article>
  );
}
