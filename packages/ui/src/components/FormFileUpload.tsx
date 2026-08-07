import { useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/**
 * @description Formatos admitidos por defecto (PDF v3 p.20: "Formatos admitidos: PDF, JPG, PNG, DOC")
 */
const DEFAULT_ACCEPT = ".pdf,.jpg,.jpeg,.png,.doc,.docx";

export interface FormFileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  error?: string;
  disabled?: boolean;
  /**
   * @description Permite más de un archivo a la vez (PDF p.20: "Opción de sumar más de
   * un archivo"). Default `true`.
   */
  multiple?: boolean;
  accept?: string;
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
}

/**
 * @description Formatea el tamaño de un archivo como "2.4 Mb", igual que el ejemplo del PDF
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} Tamaño formateado en MB con 1 decimal
 */
function formatSizeMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mb`;
}

/**
 * @description Extrae una etiqueta de formato en mayúsculas a partir del nombre de archivo
 * (ej. "Archivo_1.doc" → "DOC"), igual que el PDF ("WORD" para .doc, "PDF" para .pdf)
 * @param {string} fileName - Nombre del archivo
 * @returns {string} Extensión en mayúsculas
 */
function formatLabel(fileName: string): string {
  const extension = fileName.split(".").pop() ?? "";
  return extension.toUpperCase();
}

/**
 * @description Upload de archivos con drag&drop básico y click-to-upload (PDF v3 p.20
 * "FORM - ADJUNTOS"). Cuando el input está activo (drag-hover), el estado "empty" se
 * superpone a la lista de archivos ya cargados, en vez de reemplazarla — mismo overlay
 * que usa `FormSelect`. Drag&drop es intencionalmente básico (sin preview, progreso ni
 * reorder): el PDF no especifica esa interacción, ver DECISIONS.md.
 * @param {FormFileUploadProps} props - Propiedades del uploader
 * @returns {JSX.Element} Upload de archivos del Design System (familia Form)
 */
export function FormFileUpload({
  id,
  label,
  error,
  disabled,
  multiple = true,
  accept = DEFAULT_ACCEPT,
  defaultFiles = [],
  onFilesChange,
  className,
  ...props
}: FormFileUploadProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;

  const [files, setFiles] = useState<File[]>(defaultFiles);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function commitFiles(nextFiles: File[]) {
    const merged = multiple ? [...files, ...nextFiles] : nextFiles;
    setFiles(merged);
    onFilesChange?.(merged);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) commitFiles(Array.from(event.target.files));
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (disabled) return;
    commitFiles(Array.from(event.dataTransfer.files));
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!disabled) setDragActive(true);
  }

  const showEmpty = files.length === 0 || dragActive;

  return (
    <div
      className={cn(
        "ds-form-field",
        "ds-form-file",
        error && "ds-form-field--invalid",
        disabled && "ds-form-field--disabled",
        className
      )}
      {...props}
    >
      <label className="ds-form-field__label ds-form-field__label--static" htmlFor={fieldId}>
        {label}
      </label>
      <div
        className={cn("ds-form-field__control", "ds-form-file__zone", dragActive && "ds-form-file__zone--drag")}
        onDragOver={onDragOver}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
      >
        {files.length > 0 ? (
          <ul className="ds-form-file__list">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="ds-form-file__item">
                <span className="ds-form-file__name">{file.name}</span>
                <span className="ds-form-file__meta">
                  {formatLabel(file.name)} - {formatSizeMb(file.size)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {showEmpty ? (
          <div className="ds-form-file__empty">
            <p className="ds-form-file__empty-line">Arrastra un archivo</p>
            <p className="ds-form-file__empty-line">o haz click para subir.</p>
            <p className="ds-form-file__formats">Formatos admitidos: PDF, JPG, PNG, DOC</p>
          </div>
        ) : null}
        <input
          ref={inputRef}
          id={fieldId}
          className="ds-form-file__input"
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={onInputChange}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
        />
      </div>
      {error ? (
        <p className="ds-form-field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
