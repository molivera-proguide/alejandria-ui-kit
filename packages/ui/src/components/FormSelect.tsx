import { useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "../utils/cn";

/**
 * @description Opción seleccionable de un FormSelect
 */
export interface FormSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * @description Propiedades del componente FormSelect
 */
export interface FormSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: FormSelectOption[];
  error?: string;
  disabled?: boolean;
  /**
   * @description `true` habilita selección múltiple (ver PDF p.18: "Select único o multiselect")
   */
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
}

/**
 * @description Select/dropdown con desplegable que se superpone al input sin empujar
 * layout, y que al abrirse centra el scroll en la opción ya seleccionada (PDF v3 p.18
 * "FORM - INPUT" § Select). No es un `<select>` nativo — el overlay + auto-centrado que
 * pide el PDF no son estilizables sobre el `<select>` del navegador.
 * @param {FormSelectProps} props - Propiedades del select
 * @returns {JSX.Element} Select del Design System (familia Form)
 */
export function FormSelect({
  id,
  label,
  options,
  error,
  disabled,
  multiple = false,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: FormSelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    value ?? defaultValue ?? (multiple ? [] : "")
  );
  const selected = value ?? internalValue;
  const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  useEffect(() => {
    // "al seleccionar una opción el desplegable se centra en esa opción" — al abrir,
    // centrar el scroll en la opción ya elegida (si hay una)
    if (!open || !listRef.current) return;
    const activeOption = listRef.current.querySelector('[aria-selected="true"]');
    activeOption?.scrollIntoView({ block: "center" });
  }, [open]);

  function commit(nextValue: string | string[]) {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  function selectOption(optionValue: string) {
    if (multiple) {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((entry) => entry !== optionValue)
        : [...selectedValues, optionValue];
      commit(next);
      return;
    }
    commit(optionValue);
    setOpen(false);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") setOpen(false);
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
    }
  }

  const displayLabel = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label)
    .join(", ");
  const hasValue = selectedValues.length > 0;

  return (
    <div
      ref={rootRef}
      className={cn(
        "ds-form-field",
        "ds-form-select",
        error && "ds-form-field--invalid",
        disabled && "ds-form-field--disabled",
        className
      )}
      {...props}
    >
      <div className="ds-form-field__control">
        <button
          type="button"
          id={fieldId}
          className="ds-form-field__input ds-form-select__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={onTriggerKeyDown}
        >
          {hasValue ? displayLabel : " "}
        </button>
        <label
          className={cn("ds-form-field__label", hasValue && "ds-form-field__label--active")}
          htmlFor={fieldId}
        >
          {label}
        </label>
        <span className="ds-form-field__chevron" aria-hidden="true" />
        {open ? (
          <ul
            className="ds-form-select__menu ds-scroll-area ds-scroll-area--y"
            role="listbox"
            aria-multiselectable={multiple}
            ref={listRef}
          >
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    className={cn(
                      "ds-form-select__option",
                      isSelected && "ds-form-select__option--selected"
                    )}
                    onClick={() => selectOption(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      {error ? (
        <p className="ds-form-field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
