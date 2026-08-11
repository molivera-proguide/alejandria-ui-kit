import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../Icons";
import { SideBar, type SideBarItem } from "../../components/SideBar";
import { FormTextInput } from "../../components/FormTextInput";
import { FormSelect, type FormSelectOption } from "../../components/FormSelect";
import { FormCheckable, FormCheckableGroup } from "../../components/FormCheckable";
import { FormFileUpload } from "../../components/FormFileUpload";
import { FormDatePicker } from "../../components/FormDatePicker";
import { BackgroundTextureDots } from "../../utils/backgroundTexture";
import "./carga-de-formulario.css";

/**
 * @description "CARGA DE FORMULARIO" — PDF de pantallas compuestas "Alejandria - Agosto
 * 2026" (no en el repo, ver knowledge/component-roadmap.md § "Screens triage"), p.19.
 * El propio PDF funciona como field gallery de referencia (muestra alternativas de UI
 * para el mismo campo — select vs. radio, checkbox vs. switch — más el estado de error,
 * multiselect y archivo-cargado, no un único formulario de producto), así que esta
 * composición reproduce esa misma variedad de campos en reposo (sin desplegables
 * abiertos simultáneos, que no son un estado real de reposo del componente) en vez de
 * "limpiarla" a un formulario hipotético más simple.
 */

const menuIcon = (src: string) => <img src={src} alt="" />;

const primaryItems: SideBarItem[] = [
  { icon: menuIcon(Icons.MenuBandejaIcon), label: "Mis tareas", selected: true },
  { icon: menuIcon(Icons.HistorialIcon), label: "Historial" },
  { icon: menuIcon(Icons.ReportsIcon), label: "Reportes" },
  { icon: menuIcon(Icons.CatastrofesIcon), label: "Catástrofes" }
];

const secondaryItems: SideBarItem[] = [
  { icon: menuIcon(Icons.NotificacionesIcon), label: "Notificaciones", badge: 2 },
  { icon: menuIcon(Icons.UsuarioIcon), label: "Mi cuenta" },
  { icon: menuIcon(Icons.ConfiguracionIcon), label: "Configuración" },
  { icon: menuIcon(Icons.AyudaIcon), label: "Ayuda" },
  { icon: menuIcon(Icons.CerrarSesionIcon), label: "Cerrar sesión" }
];

const sidebarLogo = (
  <img
    src={Icons.AlejandriaLogoIcon}
    alt="Alejandría"
    style={{ display: "block", filter: "invert(1)", height: 24, width: "auto" }}
  />
);

const TIPO_USUARIO_OPTIONS: FormSelectOption[] = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "General", value: "general" }
];

const MODULO_DESCRIPTIONS = {
  admin: "Este usuario tendrá accesos ilimitados a todas las funcionalidades de la plataforma",
  editor: "Este usuario solo podrá editar el contenido pero no aprobarlo",
  general: "Acceso restringido"
};

function fakeFile(name: string, sizeMb: number, type = "") {
  return new File([new Uint8Array(sizeMb * 1024 * 1024)], name, { type });
}

function CargaDeFormularioScreen() {
  return (
    <div className="screen-carga-formulario">
      <BackgroundTextureDots />
      <SideBar
        logo={sidebarLogo}
        menuIcon={<img src={Icons.HamburguesaIcon} alt="" />}
        menuLabel="Menú"
        items={primaryItems}
        secondaryItems={secondaryItems}
        collapsed
        onToggleCollapsed={() => undefined}
      />

      <main className="screen-carga-formulario__main">
        <h1 className="screen-carga-formulario__title">Carga de formulario</h1>

        <div className="screen-carga-formulario__grid">
          <div className="screen-carga-formulario__column">
            <FormTextInput label="NOMBRE" defaultValue="Juan Cruz" />
            <FormTextInput label="APELLIDO" defaultValue="Aramburu Blanch" />
            <FormTextInput label="DNI" />
            <FormSelect label="TIPO DE USUARIO" options={TIPO_USUARIO_OPTIONS} defaultValue="admin" />
            <FormCheckableGroup title="TIPO DE USUARIO" layout="horizontal">
              <FormCheckable type="radio" name="tipo-usuario-simple" label="Admin" defaultChecked />
              <FormCheckable type="radio" name="tipo-usuario-simple" label="Editor" />
              <FormCheckable type="radio" name="tipo-usuario-simple" label="General" />
            </FormCheckableGroup>
            <FormCheckableGroup title="TIPO DE USUARIO">
              <FormCheckable
                type="radio"
                name="tipo-usuario-descripcion"
                label="Admin"
                description={MODULO_DESCRIPTIONS.admin}
              />
              <FormCheckable
                type="radio"
                name="tipo-usuario-descripcion"
                label="Editor"
                description={MODULO_DESCRIPTIONS.editor}
                defaultChecked
              />
              <FormCheckable
                type="radio"
                name="tipo-usuario-descripcion"
                label="General"
                description={MODULO_DESCRIPTIONS.general}
              />
            </FormCheckableGroup>
            <FormCheckableGroup title="ACCESO A MÓDULOS">
              <FormCheckable type="checkbox" label="Admin" description={MODULO_DESCRIPTIONS.admin} />
              <FormCheckable
                type="checkbox"
                label="Editor"
                description={MODULO_DESCRIPTIONS.editor}
                defaultChecked
              />
              <FormCheckable type="checkbox" label="General" description={MODULO_DESCRIPTIONS.general} />
            </FormCheckableGroup>
          </div>

          <div className="screen-carga-formulario__column">
            <FormTextInput label="DNI" defaultValue="12.345.678" error="Ingresá un DNI válido." />
            <FormSelect label="TIPO DE USUARIO" options={TIPO_USUARIO_OPTIONS} defaultValue="admin" />
            <FormSelect
              label="TIPO DE USUARIO"
              options={TIPO_USUARIO_OPTIONS}
              multiple
              defaultValue={["admin", "editor"]}
            />
            <FormDatePicker defaultValue={new Date(2026, 6, 20, 14, 10)} />
            <div>
              <p className="screen-carga-formulario__section-title">Acceso a módulos</p>
              <p className="screen-carga-formulario__section-copy">
                Los siguientes accesos sirven para saber el nivel de seguridad del usuario.
              </p>
              <div className="screen-carga-formulario__checkbox-list">
                <FormCheckable type="checkbox" label="Admin" />
                <FormCheckable type="checkbox" label="Editor" defaultChecked />
                <FormCheckable type="checkbox" label="General" />
              </div>
            </div>
            <FormTextInput label="DESCRIPCIÓN" multiline />
          </div>

          <div className="screen-carga-formulario__column">
            <FormCheckableGroup title="ACCESO A MÓDULOS">
              <FormCheckable type="switch" label="Admin" description={MODULO_DESCRIPTIONS.admin} />
              <FormCheckable
                type="switch"
                label="Editor"
                description={MODULO_DESCRIPTIONS.editor}
                defaultChecked
              />
              <FormCheckable type="switch" label="General" description={MODULO_DESCRIPTIONS.general} />
            </FormCheckableGroup>
            <FormFileUpload
              label="ADJUNTAR ARCHIVOS"
              defaultFiles={[
                fakeFile("Archivo_1.doc", 2.4),
                fakeFile("Archivo2.pdf", 2.4),
                fakeFile("Foto1.jpg", 2.4, "image/jpeg"),
                fakeFile("Foto1.jpg", 2.4, "image/jpeg"),
                fakeFile("Foto1.jpg", 2.4, "image/jpeg")
              ]}
            />
            <FormTextInput
              label="DESCRIPCIÓN"
              multiline
              defaultValue="El usuario generado se encargará de gestionar la plataforma y sus accesos"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

const meta = {
  title: "Alejandria/Screens/CargaDeFormulario",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Ficha completa — PDF "Alejandria - Agosto 2026" p.19. */
export const Default: Story = {
  render: () => <CargaDeFormularioScreen />
};
