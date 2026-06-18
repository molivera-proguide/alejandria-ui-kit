import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface SegmentItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange" | "children"> {
  items: SegmentItem[];
  value: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

export function SegmentedControl({
  items,
  value,
  label,
  onValueChange,
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <div className={cn("ds-segmented", className)} role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          className="ds-segmented__item"
          type="button"
          aria-pressed={item.value === value}
          disabled={item.disabled}
          onClick={() => onValueChange?.(item.value)}
          {...props}
        >
          {item.icon ? <span className="ds-segmented__icon">{item.icon}</span> : null}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
