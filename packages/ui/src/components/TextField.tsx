import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  iconLeft?: ReactNode;
  action?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      hint,
      error,
      iconLeft,
      action,
      className,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("ds-field", error && "ds-field--invalid", className)}>
        <div className="ds-field__label-row">
          <label className="ds-field__label" htmlFor={fieldId}>
            {label}
          </label>
          {action ? <div className="ds-field__action">{action}</div> : null}
        </div>
        <div className="ds-field__control">
          {iconLeft ? <span className="ds-field__icon">{iconLeft}</span> : null}
          <input
            ref={ref}
            id={fieldId}
            className="ds-field__input"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            {...props}
          />
        </div>
        {hint ? (
          <p className="ds-field__hint" id={hintId}>
            {hint}
          </p>
        ) : null}
        {error ? (
          <p className="ds-field__error" id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";
