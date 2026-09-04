import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Sobre mí", to: "/sobre-mi" },
  { label: "Contacto", to: "/contacto" },
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
      <div className="flex w-full items-center justify-between px-[clamp(0.6rem,1.6vw,1.6rem)] py-3">
        <Link to="/" className="group flex items-center gap-3 md:gap-4">
          <img
            src="/brand/isotipo.webp"
            alt=""
            aria-hidden="true"
            width="64"
            height="64"
            className="h-12 w-12 rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14"
          />
          <span className="font-astro text-[clamp(16px,2vw,26px)] leading-none tracking-[0.06em] text-ink transition-colors group-hover:text-neb">
            DOX DESIGNS
          </span>
        </Link>

        {/* Un único disparador en todos los tamaños: el nav vive en el panel. */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-space/70 text-ink backdrop-blur-sm transition-colors hover:border-neb/50 hover:text-neb"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-6 mb-4 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-space/95 p-1.5 backdrop-blur-md md:mx-8 md:ml-auto md:max-w-xs">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-xl px-4 py-3 font-elnath text-[13px] tracking-[0.14em] uppercase text-mute transition-colors hover:bg-white/5 hover:text-neb"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
