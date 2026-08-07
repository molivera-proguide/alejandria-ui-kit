import { useId, useMemo, useRef, useState } from "react";
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

function formatSizeMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mb`;
}

function formatLabel(fileName: string): string {
  const extension = fileName.split(".").pop() ?? "";
  return extension.toUpperCase();
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * @description Ícono genérico de documento (PDF p.20: badge circular #494949 con ícono
 * #8a8b87 dentro, ~61.5×66.5pt @2× → ~31×33px)
 */
function DocumentIcon() {
  return (
    <svg className="ds-form-file__icon" viewBox="0 0 20 22" fill="none">
      <path
        d="M3 1h9l5 5v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 1v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg className="ds-form-file__remove-icon" viewBox="0 0 12 12" fill="none">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * @description Upload de archivos (PDF v3 p.20 "FORM - ADJUNTOS"). Renderizado real de la
 * página vía PyMuPDF confirmó una estructura distinta de la primera pasada: cuando hay
 * archivos, se ve una lista con header "ADJUNTAR ARCHIVOS" — filas simples para
 * documentos (nombre + tipo/tamaño + botón quitar) y tarjetas con thumbnail para
 * imágenes — y el estado vacío/drop-zone ("ADJUNTAR") es una tarjeta separada con ícono,
 * texto en negrita y un botón "SUBIR ARCHIVO" real, no solo un placeholder de texto.
 * Sin archivos, la drop-zone es el contenido principal; con archivos, se superpone sobre
 * la lista solo mientras se arrastra un archivo nuevo por encima (PDF: "al estar activo,
 * el empty se superpone al input"). Drag&drop es intencionalmente básico (sin preview de
 * progreso): el PDF no especifica esa interacción, ver DECISIONS.md.
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

  const previews = useMemo(
    () => files.map((file) => (isImageFile(file) ? URL.createObjectURL(file) : null)),
    [files]
  );

  function commitFiles(nextFiles: File[]) {
    const merged = multiple ? [...files, ...nextFiles] : nextFiles;
    setFiles(merged);
    onFilesChange?.(merged);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) commitFiles(Array.from(event.target.files));
    event.target.value = "";
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

  const hasFiles = files.length > 0;
  const showEmptyCard = !hasFiles || dragActive;

  return (
    <div
      className={cn("ds-form-file", error && "ds-form-field--invalid", disabled && "ds-form-field--disabled", className)}
      onDragOver={onDragOver}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      {...props}
    >
      {hasFiles ? (
        <div className="ds-form-file__list-panel">
          <div className="ds-form-file__list-header">
            <span className="ds-form-file__list-label">{label}</span>
            <button
              type="button"
              className="ds-form-file__add"
              aria-label="Adjuntar más archivos"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              +
            </button>
          </div>
          <ul className="ds-form-file__list">
            {files.map((file, index) =>
              previews[index] ? (
                <li key={`${file.name}-${index}`} className="ds-form-file__thumb">
                  <button
                    type="button"
                    className="ds-form-file__remove ds-form-file__remove--thumb"
                    aria-label={`Quitar ${file.name}`}
                    onClick={() => removeFile(index)}
                  >
                    <RemoveIcon />
                  </button>
                  <img className="ds-form-file__thumb-image" src={previews[index] ?? undefined} alt="" />
                  <span className="ds-form-file__name">{file.name}</span>
                  <span className="ds-form-file__meta">
                    {formatLabel(file.name)} - {formatSizeMb(file.size)}
                  </span>
                </li>
              ) : (
                <li key={`${file.name}-${index}`} className="ds-form-file__row">
                  <span className="ds-form-file__row-copy">
                    <span className="ds-form-file__name">{file.name}</span>
                    <span className="ds-form-file__meta">
                      {formatLabel(file.name)} - {formatSizeMb(file.size)}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="ds-form-file__remove"
                    aria-label={`Quitar ${file.name}`}
                    onClick={() => removeFile(index)}
                  >
                    <RemoveIcon />
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      ) : null}
      {showEmptyCard ? (
        <div
          className={cn(
            "ds-form-file__empty",
            dragActive && "ds-form-file__empty--drag",
            hasFiles && "ds-form-file__empty--overlay"
          )}
        >
          <span className="ds-form-file__empty-label">{label}</span>
          <span className="ds-form-file__empty-icon">
            <DocumentIcon />
          </span>
          <p className="ds-form-file__empty-line">Arrastra un archivo</p>
          <p className="ds-form-file__empty-line">o haz click para subir.</p>
          <p className="ds-form-file__formats">Formatos admitidos: PDF, JPG, PNG, DOC</p>
          <button
            type="button"
            className="ds-form-file__upload-button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            SUBIR ARCHIVO
          </button>
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
      {error ? (
        <p className="ds-form-field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
