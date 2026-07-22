import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Sobre mí", to: "/sobre-mi" },
  { label: "Contacto", to: "/#contacto" },
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
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-8">
        <Link
          to="/"
          className="font-mono text-[12px] font-semibold tracking-[0.26em] text-ink transition-colors hover:text-neb"
        >
          DOX DESIGNS<span className="text-neb">*</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 sm:flex">
          {links.map((l) =>
            l.to.includes("#") ? (
              <Link
                key={l.label}
                to={l.to}
                className="link-underline font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-mute transition-colors hover:text-neb"
              >
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline font-mono text-[11px] font-medium tracking-[0.14em] uppercase transition-colors hover:text-neb ${
                    isActive ? "text-neb" : "text-mute"
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
          <span className="pill gap-2 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-mute">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neb opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neb" />
            </span>
            Disponible
          </span>
        </nav>

        {/* Mobile */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-space/70 text-ink backdrop-blur-sm sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-6 mb-4 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-space/95 p-1.5 backdrop-blur-md sm:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-xl px-4 py-3 font-mono text-[12px] tracking-[0.14em] uppercase text-mute transition-colors hover:bg-white/5 hover:text-neb"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
