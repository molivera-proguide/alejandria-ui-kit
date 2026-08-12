import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FiltroIcon } from "../Icons";
import { cn } from "../utils/cn";

/**
 * @description Props públicas del componente `FilterField`
 */
export type FilterFieldProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * @description Campo compuesto filtro+búsqueda (PDF "FILTER" p.23): ícono de filtro+
 * chevron afuera a la izquierda (decorativo — el PDF deja el desplegable sin definir,
 * "me falta desarrollar el desplegable del funnel") + input oscuro con lupa adentro a
 * la derecha, sin label flotante. Medida 400×50px final — única excepción de esta
 * feature a la convención `@2×÷2` (ver DECISIONS.md).
 * @param {FilterFieldProps} props - Props nativas de `<input>` (placeholder, value, onChange, etc.)
 * @returns {JSX.Element} Campo de filtro del Design System
 */
export const FilterField = forwardRef<HTMLInputElement, FilterFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("ds-filter-field", className)}>
        <span className="ds-filter-field__toggle" aria-hidden="true">
          <img src={FiltroIcon} alt="" />
          <ChevronDown size={12} />
        </span>
        <div className="ds-filter-field__input-wrap">
          <input ref={ref} className="ds-filter-field__input" {...props} />
          <Search className="ds-filter-field__search-icon" aria-hidden="true" />
        </div>
      </div>
    );
  }
);

FilterField.displayName = "FilterField";
