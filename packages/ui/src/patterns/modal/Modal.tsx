import { Mic } from "lucide-react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "./modal.css";

/**
 * @description Sugerencia de acción mostrada bajo el modal asistente
 */
export interface ModalSuggestion {
  /**
   * @description Texto visible de la sugerencia según la referencia PDF
   */
  label: string;
}

/**
 * @description Contenido estático del modal asistente (PDF — página 11 MODALES)
 */
export interface ModalContent {
  /**
   * @description Saludo personalizado encima del panel
   */
  greeting: string;
  /**
   * @description Texto del prompt / placeholder del campo de intención
   */
  prompt: string;
  /**
   * @description Etiqueta del botón principal de ejecución
   */
  executeLabel: string;
  /**
   * @description Etiqueta de la affordance de adjuntar archivos
   */
  attachLabel: string;
  /**
   * @description Sugerencias de acción debajo del panel
   */
  suggestions: ModalSuggestion[];
}

/**
 * @description Propiedades del patrón Modal
 */
export interface ModalProps {
  /**
   * @description Datos estáticos que componen el modal asistente
   */
  content: ModalContent;
}

/**
 * @description Composición del patrón Modal a partir de componentes existentes del Design System
 * @param {ModalProps} props - Contenido estático y estructura del modal (PDF p.11)
 * @returns {JSX.Element} Superficie de modal asistente según la referencia
 */
export function Modal({ content }: ModalProps) {
  return (
    <div className="modal-screen" aria-label="Modal asistente">
      <div className="modal-assistant">
        <h1 className="modal-assistant__greeting">{content.greeting}</h1>

        <div className="modal-assistant__shell" role="dialog" aria-label={content.greeting}>
          <div className="modal-assistant__top">
            <TextField
              appearance="pdf"
              className="modal-assistant__prompt"
              label={content.prompt}
              placeholder={content.prompt}
            />
            <button
              type="button"
              className="modal-assistant__mic"
              aria-label="Entrada por voz"
            >
              <Mic aria-hidden="true" strokeWidth={1.25} />
            </button>
          </div>

          <button type="button" className="modal-assistant__attach">
            <span className="modal-assistant__attach-plus" aria-hidden="true" />
            <span className="modal-assistant__attach-label">{content.attachLabel}</span>
          </button>

          <Button type="button" variant="pdf" className="modal-assistant__execute">
            {content.executeLabel}
          </Button>
        </div>

        <ul className="modal-assistant__suggestions" aria-label="Sugerencias">
          {content.suggestions.map((suggestion) => (
            <li key={suggestion.label}>
              <button type="button" className="modal-assistant__suggestion">
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
