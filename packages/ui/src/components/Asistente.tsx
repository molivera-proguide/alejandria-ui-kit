import type { ReactElement } from "react";
import { Mic } from "lucide-react";
import { Button } from "./Button";
import { TextField } from "./TextField";

/**
 * @description Sugerencia de acción rápida del asistente (AP13: set abierto).
 */
export interface AsistenteSuggestion {
  /**
   * @description Texto visible de la sugerencia.
   * @type {string}
   */
  label: string;
  /**
   * @description Handler opcional al activar la sugerencia.
   * @type {() => void}
   */
  onClick?: () => void;
}

/**
 * @description Props del shell estático del asistente IA (ASISTENTE, PDF p.12).
 */
export interface AsistenteProps {
  /**
   * @description Saludo personalizado encima del panel.
   * @type {string}
   */
  greeting: string;
  /**
   * @description Texto del prompt / placeholder del campo de intención.
   * @type {string}
   */
  prompt: string;
  /**
   * @description Etiqueta del botón principal de ejecución.
   * @type {string}
   */
  executeLabel: string;
  /**
   * @description Etiqueta de la affordance de adjuntar archivos.
   * @type {string}
   */
  attachLabel: string;
  /**
   * @description Sugerencias de acción debajo del panel (estáticas; dinámicas son concern de app).
   * @type {AsistenteSuggestion[]}
   */
  suggestions: AsistenteSuggestion[];
  /**
   * @description Valor controlado del campo de prompt (passthrough a TextField).
   * @type {string}
   */
  promptValue?: string;
  /**
   * @description Callback cuando cambia el valor del prompt.
   * @param {string} value - Nuevo valor del campo.
   * @returns {void}
   */
  onPromptChange?: (value: string) => void;
  /**
   * @description Handler de la acción fija EJECUTAR (AP13).
   * @returns {void}
   */
  onExecute?: () => void;
  /**
   * @description Handler de la affordance Adjuntar archivos.
   * @returns {void}
   */
  onAttach?: () => void;
  /**
   * @description Handler del botón de entrada por voz (mic).
   * @returns {void}
   */
  onMicClick?: () => void;
}

/**
 * @description Shell estático del asistente IA (saludo + prompt + adjuntar + ejecutar + sugerencias).
 * @param {AsistenteProps} props - Props planas del asistente.
 * @returns {ReactElement} Superficie de asistente según PDF p.12 (landing/empty state).
 */
export function Asistente({
  greeting,
  prompt,
  executeLabel,
  attachLabel,
  suggestions,
  promptValue,
  onPromptChange,
  onExecute,
  onAttach,
  onMicClick
}: AsistenteProps): ReactElement {
  return (
    <div className="ds-asistente">
      <h1 className="ds-asistente__greeting">{greeting}</h1>

      <div className="ds-asistente__shell" role="dialog" aria-label={greeting}>
        <div className="ds-asistente__top">
          <TextField
            appearance="pdf"
            className="ds-asistente__prompt"
            label={prompt}
            placeholder={prompt}
            value={promptValue}
            onChange={(e) => onPromptChange?.(e.target.value)}
          />
          <button
            type="button"
            className="ds-asistente__mic"
            aria-label="Entrada por voz"
            onClick={onMicClick}
          >
            <Mic aria-hidden="true" strokeWidth={1.25} />
          </button>
        </div>

        <button type="button" className="ds-asistente__attach" onClick={onAttach}>
          <span className="ds-asistente__attach-plus" aria-hidden="true" />
          <span className="ds-asistente__attach-label">{attachLabel}</span>
        </button>

        <Button
          type="button"
          variant="pdf"
          className="ds-asistente__execute"
          onClick={onExecute}
        >
          {executeLabel}
        </Button>
      </div>

      <ul className="ds-asistente__suggestions" aria-label="Sugerencias">
        {suggestions.map((suggestion) => (
          <li key={suggestion.label}>
            <button
              type="button"
              className="ds-asistente__suggestion"
              onClick={suggestion.onClick}
            >
              {suggestion.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
