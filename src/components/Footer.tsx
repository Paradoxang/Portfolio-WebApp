import { Facebook, Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { contact } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";
import { ROUTE_KEYS } from "@/i18n/locales";
import { trackContact } from "@/lib/analytics";
import { ModoLigero } from "@/components/ModoLigero";
import { LangSwitch } from "@/components/LangSwitch";

/**
 * El año va como constante y no como `new Date().getFullYear()`.
 * El sitio se prerenderiza: el HTML estático llevaría el año del build y el
 * cliente pintaría el actual, que es exactamente la discrepancia de hidratación
 * que React avisa por consola cada 1 de enero. Se actualiza a mano, una vez al
 * año, y a cambio el prerender y el cliente dicen siempre lo mismo.
 */
const ANIO = 2026;

/**
 * El pie, en cuatro columnas.
 *
 * Antes era una fila con tres redes y el conmutador de modo ligero. Ahora es
 * la segunda navegación del sitio —la que Google y quien llega al final de una
 * página usan para seguir—: marca, páginas, contacto, y legal con los ajustes.
 * Todo sigue en mono y en caja alta: es el mismo idioma del resto del cromo.
 */
export function Footer() {
  const { t, href, whatsapp } = useLocale();
  const paginas = ROUTE_KEYS.filter((k) => k !== "privacy");

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-10 pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        {/* Marca */}
        <div>
          <Link to={href("home")} className="inline-flex items-center gap-2.5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-ink">
            <img
              src="/brand/isotipo.webp"
              alt=""
              aria-hidden="true"
              width="24"
              height="24"
              className="h-6 w-6 rounded-md ring-1 ring-white/10"
            />
            DOX DESIGNS<span className="text-neb">*</span> — Santiago Miranda
          </Link>
          <p className="mt-4 max-w-[36ch] text-[13.5px] leading-[1.65] text-mute">{t.footer.tagline}</p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.14em] uppercase text-faint">
            {t.contact.location} · {t.contact.timezone}
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label={t.footer.navigation}>
          <h2 className="pie__titulo">{t.footer.navigation}</h2>
          <ul className="mt-4 flex flex-col gap-1" role="list">
            {paginas.map((k) => (
              <li key={k}>
                <Link to={href(k)} className="pie__enlace">
                  {t.routes[k].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h2 className="pie__titulo">{t.footer.contact}</h2>
          <ul className="mt-4 flex flex-col gap-1" role="list">
            <li>
              <a
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="pie__enlace"
              >
                <MessageCircle className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} onClick={() => trackContact("email")} className="pie__enlace">
                <Mail className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> Email
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="pie__enlace">
                <Instagram className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> Instagram
              </a>
            </li>
            <li>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("facebook")}
                className="pie__enlace"
              >
                <Facebook className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> Facebook
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="pie__enlace">
                <Github className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Legal y ajustes */}
        <div>
          <h2 className="pie__titulo">{t.footer.legal}</h2>
          <ul className="mt-4 flex flex-col gap-1" role="list">
            <li>
              <Link to={href("privacy")} className="pie__enlace">
                {t.routes.privacy.label}
              </Link>
            </li>
            <li>
              <a
                href="/.well-known/security.txt"
                className="pie__enlace"
                target="_blank"
                rel="noopener noreferrer"
              >
                security.txt
              </a>
            </li>
            <li className="pt-2">
              <LangSwitch className="lang-switch--pie" />
            </li>
            <li className="pt-1">
              <ModoLigero />
            </li>
          </ul>
        </div>
      </div>

      {/* ── Derechos reservados ──
          En una fila propia y no pegada a la marca: la de arriba es
          navegación y esta es jurídica. Mezcladas, el aviso se lee como un
          enlace más. */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-center font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-faint sm:flex-row sm:text-left md:px-8">
          <p>
            © {ANIO} Santiago Miranda · {t.footer.rights}
          </p>
          <p>
            {t.footer.madeBy} <span className="text-mute">Dox Designs</span>
            <span className="text-neb">*</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
