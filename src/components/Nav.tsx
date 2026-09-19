import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackContact } from "@/lib/analytics";
import { contact } from "@/data/site";

/* El menú deja de ser una lista plana y pasa a tener dos funciones separadas:
   arriba se navega, abajo se contacta. Mezcladas, el enlace de contacto se
   perdía entre los otros cuatro. */
const links = [
  { label: "Inicio", to: "/" },
  { label: "Planes", to: "/planes" },
  { label: "Muestrario", to: "/proyectos" },
  { label: "Seguridad", to: "/#escudo" },
  { label: "Servicios", to: "/servicios" },
  { label: "Sobre mí", to: "/sobre-mi" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-space/80 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      {/* A los bordes de la pantalla, sin contenedor centrado */}
      <div className="flex w-full items-center justify-between gap-3 px-[clamp(0.6rem,1.6vw,1.6rem)] py-3">
        <Link to="/" className="group flex items-center gap-3 md:gap-4">
          <img
            src="/brand/isotipo.webp"
            alt=""
            aria-hidden="true"
            width="64"
            height="64"
            className="h-12 w-12 rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14"
          />
          {/* Por debajo de 480 px se queda solo el isotipo. Con el botón de
              diagnóstico al lado no caben los tres: el wordmark envolvía a dos
              líneas y el botón se le montaba encima. De los dos, el que se va
              es el nombre — la marca ya la lleva el isotipo, y el wordmark
              vuelve a aparecer en el hero y en el pie, mientras que el botón es
              lo único que convierte. */}
          <span className="hidden font-astro text-[clamp(24px,3vw,39px)] leading-none whitespace-nowrap tracking-[0.06em] text-ink transition-colors group-hover:text-neb min-[480px]:block">
            DOX DESIGNS
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {/* ── El CTA vive FUERA del panel ──
              Hasta ahora el desplegable era la navegación entera en todos los
              tamaños, así que no había un solo botón de contacto visible sin
              abrir el menú: para escribir había que abrir, entrar a /contacto y
              buscar el enlace. Tres pasos justo cuando ya te querían escribir.
              En móvil se queda en "Diagnóstico" a secas — con la palabra
              completa no caben isotipo, botón y disparador a 360 px. */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp")}
            className="hidden items-center gap-2 rounded-full bg-neb px-4 py-2.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-space transition-colors hover:bg-neb/85 min-[380px]:flex md:px-5"
          >
            Diagnóstico
            <span className="hidden md:inline">gratis</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-space/70 text-ink backdrop-blur-sm transition-colors hover:border-neb/50 hover:text-neb"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mb-4 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-space/95 p-1.5 backdrop-blur-md md:mx-8 md:ml-auto md:max-w-xs">
          <span className="px-4 pb-1 pt-2.5 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-faint">
            Navegación
          </span>
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-xl px-4 py-2.5 font-elnath text-[13px] tracking-[0.14em] uppercase text-mute transition-colors hover:bg-white/5 hover:text-neb"
            >
              {l.label}
            </Link>
          ))}

          <span className="mt-2 border-t border-white/10 px-4 pb-1 pt-3.5 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-faint">
            Contacto directo
          </span>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp")}
            className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-elnath text-[13px] tracking-[0.14em] uppercase text-mute transition-colors hover:bg-white/5 hover:text-neb"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <Link
            to="/contacto"
            className="rounded-xl px-4 py-2.5 font-elnath text-[13px] tracking-[0.14em] uppercase text-mute transition-colors hover:bg-white/5 hover:text-neb"
          >
            Formulario
          </Link>
        </div>
      )}
    </header>
  );
}
