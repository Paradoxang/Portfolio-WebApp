import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { trackContact } from "@/lib/analytics";
import { contact, planes, whatsappUrl } from "@/data/site";
import { useT } from "@/i18n/LocaleContext";
import type { FormData } from "@/content/types";

/**
 * El formulario de contacto.
 *
 * No hay servidor detrás, y es a propósito: el sitio es estático y el canal
 * real es WhatsApp. El formulario ordena lo que el visitante quiere decir
 * —quién es, qué negocio, qué plan, qué necesita— y lo abre ya escrito en su
 * WhatsApp o en su aplicación de correo. Nada se guarda aquí, que es lo que
 * dice la política de privacidad.
 *
 * Etiquetas visibles, error junto al campo y `aria-describedby`: lo mínimo
 * para que un lector de pantalla sepa qué falta.
 */
const VACIO: FormData = { name: "", business: "", plan: "", message: "" };

export function ContactForm() {
  const t = useT();
  const f = t.form;
  const [datos, setDatos] = useState<FormData>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (k: keyof FormData) => (e: { target: { value: string } }) =>
    setDatos((d) => ({ ...d, [k]: e.target.value }));

  const validar = (): boolean => {
    const e: typeof errores = {};
    if (!datos.name.trim()) e.name = f.errors.name;
    if (!datos.message.trim()) e.message = f.errors.message;
    setErrores(e);
    if (e.name) document.getElementById("form-nombre")?.focus();
    else if (e.message) document.getElementById("form-mensaje")?.focus();
    return Object.keys(e).length === 0;
  };

  const porWhatsapp = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validar()) return;
    trackContact("form", { plan: datos.plan || undefined });
    window.open(whatsappUrl(f.compose(datos)), "_blank", "noopener,noreferrer");
  };

  const porCorreo = () => {
    if (!validar()) return;
    trackContact("email", { plan: datos.plan || undefined });
    const cuerpo = encodeURIComponent(f.compose(datos));
    const asunto = encodeURIComponent(f.subject);
    window.location.href = `mailto:${contact.email}?subject=${asunto}&body=${cuerpo}`;
  };

  return (
    <form onSubmit={porWhatsapp} noValidate className="formulario">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="campo">
          <label htmlFor="form-nombre">{f.name}</label>
          <input
            id="form-nombre"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={datos.name}
            onChange={set("name")}
            aria-invalid={errores.name ? true : undefined}
            aria-describedby={errores.name ? "form-nombre-error" : undefined}
          />
          {errores.name && (
            <p id="form-nombre-error" className="campo__error" role="alert">
              {errores.name}
            </p>
          )}
        </div>
        <div className="campo">
          <label htmlFor="form-negocio">{f.business}</label>
          <input
            id="form-negocio"
            name="business"
            type="text"
            autoComplete="organization"
            value={datos.business}
            onChange={set("business")}
          />
        </div>
      </div>

      <div className="campo mt-5">
        <label htmlFor="form-plan">{f.plan}</label>
        <select id="form-plan" name="plan" value={datos.plan} onChange={set("plan")}>
          <option value="">{f.planPlaceholder}</option>
          {planes.map((p) => (
            <option key={p.id} value={t.plans.items[p.id].name}>
              {t.plans.items[p.id].name} · {t.plans.currency} {t.plans.items[p.id].price}
              {t.plans.items[p.id].period.split("·")[0].trim()}
            </option>
          ))}
          <option value={f.planNone}>{f.planNone}</option>
        </select>
      </div>

      <div className="campo mt-5">
        <label htmlFor="form-mensaje">{f.message}</label>
        <textarea
          id="form-mensaje"
          name="message"
          rows={5}
          required
          placeholder={f.messagePlaceholder}
          value={datos.message}
          onChange={set("message")}
          aria-invalid={errores.message ? true : undefined}
          aria-describedby={errores.message ? "form-mensaje-error" : "form-nota"}
        />
        {errores.message && (
          <p id="form-mensaje-error" className="campo__error" role="alert">
            {errores.message}
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn--primary">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {f.submitWhatsapp}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={porCorreo} className="btn btn--ghost">
          <Mail className="h-4 w-4 text-neb" aria-hidden="true" />
          {f.submitEmail}
        </button>
      </div>
      <p id="form-nota" className="mt-4 max-w-[60ch] text-[12.5px] leading-[1.6] text-faint">
        {f.note}
      </p>
    </form>
  );
}
