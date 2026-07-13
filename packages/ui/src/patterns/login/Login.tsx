import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "./login.css";

/**
 * @description Variante visual del módulo de login según la referencia PDF (página 6)
 */
export type LoginVariant = "pattern" | "credentials";

/**
 * @description Propiedades del patrón Login
 */
export interface LoginProps {
  /**
   * @description Variantes a mostrar. Por defecto ambas, como en la página 6 del PDF.
   */
  variants?: LoginVariant[];
}

/**
 * @description Cantidad de círculos del patrón de acceso (rejilla 3×3)
 * @type {number}
 */
const PATTERN_DOT_COUNT = 9;

/**
 * @description Composición del patrón Login a partir de componentes existentes del Design System
 * @param {LoginProps} props - Variantes visibles del módulo de login
 * @returns {JSX.Element} Superficie de autenticación según la referencia PDF — página 6
 */
export function Login({ variants = ["pattern", "credentials"] }: LoginProps) {
  return (
    <div className="login-screen" aria-label="Módulo de login">
      <div className="login-screen__variants">
        {variants.includes("pattern") ? <LoginPatternCard /> : null}
        {variants.includes("credentials") ? <LoginCredentialsCard /> : null}
      </div>
    </div>
  );
}

/**
 * @description Tarjeta de login con círculos de patrón (sin primitivo DS equivalente)
 * @returns {JSX.Element} Variante de acceso por patrón
 */
function LoginPatternCard() {
  return (
    <article className="login-card" aria-label="Login por patrón">
      <div className="login-card__body login-card__body--pattern">
        <div className="login-card__pattern" aria-hidden="true">
          {Array.from({ length: PATTERN_DOT_COUNT }, (_, index) => (
            <span key={index} className="login-card__pattern-dot" />
          ))}
        </div>
      </div>
      <LoginSubmitButton />
    </article>
  );
}

/**
 * @description Tarjeta de login con campos de usuario y contraseña
 * @returns {JSX.Element} Variante de acceso por credenciales
 */
function LoginCredentialsCard() {
  return (
    <article className="login-card" aria-label="Login por credenciales">
      <div className="login-card__body login-card__body--credentials">
        <div className="login-card__fields">
          <TextField
            appearance="pdf"
            className="login-card__field"
            label="USUARIO"
            placeholder="USUARIO"
            autoComplete="username"
          />
          <TextField
            appearance="pdf"
            className="login-card__field"
            label="CONTRASEÑA"
            placeholder="CONTRASEÑA"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </div>
      <LoginSubmitButton />
    </article>
  );
}

/**
 * @description Botón de envío del login con variante PDF del Design System
 * @returns {JSX.Element} Control Button del Design System
 */
function LoginSubmitButton() {
  return (
    <Button type="button" variant="pdf" className="login-card__submit">
      INGRESAR
    </Button>
  );
}
