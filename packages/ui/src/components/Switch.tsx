import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id, label, description, className, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    return (
      <label className={cn("ds-switch", className)} htmlFor={switchId}>
        <span className="ds-switch__copy">
          <span className="ds-switch__label">{label}</span>
          {description ? <span className="ds-switch__description">{description}</span> : null}
        </span>
        <input ref={ref} id={switchId} className="ds-switch__input" type="checkbox" {...props} />
        <span className="ds-switch__track" aria-hidden="true">
          <span className="ds-switch__thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
