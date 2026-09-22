import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackContact } from "@/lib/analytics";
import { pausarScroll } from "@/lib/anim";
import { useLocale } from "@/i18n/LocaleContext";
import { LangSwitch } from "@/components/LangSwitch";

/**
 * La navegación.
 *
 * ── Dos navegaciones, una lista ──
 * De 1024 px en adelante los enlaces van a la vista, en una fila: es la única
 * puerta a cuatro de las siete páginas y no puede vivir detrás de un botón en
 * un escritorio. Por debajo, el disparador abre un panel con la misma lista
 * más el contacto directo. Los dos salen del mismo `t.nav.links`.
 *
 * ── El panel es un diálogo de verdad ──
 * `aria-controls` en el disparador, `Escape` para cerrar, foco al primer
 * enlace al abrir y de vuelta al botón al cerrar, `Tab` que da la vuelta
 * dentro del panel y clic fuera que lo cierra. Antes era un `div` condicional
 * y el teclado se salía por debajo hacia la página, que seguía activa.
 *
 * ── El CTA vive FUERA del panel ──
 * Sin un botón de contacto visible sin abrir el menú había que dar tres pasos
 * justo cuando ya te querían escribir. En móvil se queda en "Diagnóstico" a
 * secas — con la palabra completa no caben isotipo, botón y disparador.
 */
const FOCUSABLE = 'a[href], button:not([disabled])';

export function Nav() {
  const { t, href, whatsapp } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al navegar se cierra solo.
  useEffect(() => setOpen(false), [location]);

  const cerrar = useCallback(() => {
    setOpen(false);
    botonRef.current?.focus();
  }, []);

  /* Con el panel abierto: foco dentro, Escape cierra, clic fuera cierra y la
     página no se desplaza por debajo. */
  useEffect(() => {
    if (!open) return;
    pausarScroll(true);
    const primero = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    primero?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cerrar();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodos = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodos.length) return;
      const [a, z] = [nodos[0], nodos[nodos.length - 1]];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      pausarScroll(false);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, cerrar]);

  const enlaces = t.nav.links.map((l) => ({
    ...l,
    to: href(l.key, l.anchor),
    // Los enlaces a un ancla nunca son "la página actual".
    actual: !l.anchor && location.pathname === href(l.key),
  }));

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-space/85 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      {/* A los bordes de la pantalla, sin contenedor centrado. En escritorio
          es una rejilla de tres columnas con las dos laterales iguales: así la
          fila de enlaces cae en el centro exacto de la ventana, y no en el
          hueco que dejan el logotipo y los botones, que miden distinto. */}
      <div className="flex w-full items-center justify-between gap-3 px-[clamp(0.6rem,1.6vw,1.6rem)] py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link to={href("home")} className="group flex shrink-0 items-center gap-3 md:gap-4 lg:justify-self-start" aria-label="Dox Designs">
          <img
            src="/brand/isotipo.webp"
            alt=""
            aria-hidden="true"
            width="64"
            height="64"
            className="h-12 w-12 rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14"
          />
          {/* Por debajo de 480 px se queda solo el isotipo: con el botón de
              diagnóstico al lado no caben los tres, y de los dos el que se va
              es el nombre — la marca ya la lleva el isotipo. */}
          {/* Entre 1024 y 1399 px tampoco: ahí la fila de enlaces ya está a la
              vista y con el wordmark no cabían las dos cosas más el botón. De
              1400 en adelante vuelve, a 30 px: a 39 se comía la columna y se
              montaba sobre el primer enlace. */}
          <span className="hidden font-astro text-[clamp(24px,3vw,39px)] leading-none whitespace-nowrap tracking-[0.06em] text-ink transition-colors group-hover:text-neb min-[480px]:max-lg:block min-[1400px]:block min-[1400px]:text-[30px]">
            DOX DESIGNS
          </span>
        </Link>

        {/* Escritorio: la lista a la vista. */}
        <nav aria-label={t.nav.navigation} className="nav-escritorio hidden lg:flex lg:justify-self-center">
          {enlaces.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              aria-current={l.actual ? "page" : undefined}
              className="nav-enlace"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-2.5 lg:justify-self-end">
          <LangSwitch />
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp")}
            className="btn btn--primary btn--sm hidden min-[380px]:inline-flex"
          >
            {/* Corto por debajo de 768 y entre 1024 y 1399: ahí la fila de
                enlaces se lleva el ancho y con "gratis" la columna derecha
                pesaba más que la izquierda y la lista dejaba de estar
                centrada. */}
            <span className="md:max-lg:hidden min-[1400px]:hidden">{t.nav.ctaShort}</span>
            <span className="hidden md:max-lg:inline min-[1400px]:inline">{t.nav.cta}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            ref={botonRef}
            type="button"
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-space/70 text-ink backdrop-blur-sm transition-colors hover:border-neb/50 hover:text-neb lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="menu-movil"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-4 mb-4 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-space/95 p-1.5 backdrop-blur-md md:mx-8 md:ml-auto md:max-w-xs lg:hidden"
          >
            <nav aria-label={t.nav.navigation} className="flex flex-col">
              <span className="px-4 pb-1 pt-2.5 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-faint">
                {t.nav.navigation}
              </span>
              {enlaces.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  aria-current={l.actual ? "page" : undefined}
                  className="nav-enlace nav-enlace--panel"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <span className="mt-2 border-t border-white/10 px-4 pb-1 pt-3.5 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-faint">
              {t.nav.directContact}
            </span>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="nav-enlace nav-enlace--panel"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {t.nav.whatsapp}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
