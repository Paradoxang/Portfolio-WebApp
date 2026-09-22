import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import type { RouteRecord } from "vite-react-ssg";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Prefetch } from "@/components/Prefetch";
import { Starfield } from "@/components/Starfield";
import { Mirilla } from "@/components/Mirilla";
import { useLenis, scrollToTarget, EASE } from "@/lib/anim";
import { loadAnalytics, trackPageView } from "@/lib/analytics";
import { arrancarPerf } from "@/lib/perf";
import { LocaleProvider, useT } from "@/i18n/LocaleContext";
import { ROUTE_SLUGS, type Locale } from "@/i18n/locales";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Projects } from "@/pages/Projects";
import { Services } from "@/pages/Services";
import { Plans } from "@/pages/Plans";
import { Privacy } from "@/pages/Privacy";
import { SecurityPage } from "@/pages/SecurityPage";

/**
 * El armazón común a todas las páginas de un idioma.
 *
 * Hay un `Layout` por idioma —uno bajo `/` y otro bajo `/en`— y cada uno
 * monta su `LocaleProvider`. Todo lo que cuelga de aquí lee el idioma del
 * contexto; ningún componente sabe en qué subárbol vive.
 */
function Shell() {
  useLenis();
  const t = useT();
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  /* El modo de rendimiento. El script en línea de index.html ya dejó puesto
     `data-perf` antes de pintar; esto termina la detección —el rasterizador y
     la sonda de fotogramas— y solo puede degradar a `low`. */
  useEffect(() => {
    arrancarPerf();
  }, []);

  // Google Analytics: carga el tag una vez y registra cada cambio de ruta
  useEffect(() => {
    loadAnalytics();
  }, []);
  useEffect(() => {
    trackPageView(location.pathname + location.hash);
  }, [location]);

  /* Scroll: al ancla si hay hash, arriba si no (vía Lenis).
     `getElementById` y no `querySelector(hash)`: un hash que empiece por
     dígito no es un selector válido y `querySelector` lanzaría. El
     temporizador se limpia: dos navegaciones en 120 ms dejaban una llamada
     pendiente sobre un nodo ya desmontado. */
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) {
        const t = window.setTimeout(() => scrollToTarget(el), 120);
        return () => window.clearTimeout(t);
      }
    }
    scrollToTarget(0, { immediate: true });
    return undefined;
  }, [location]);

  return (
    <div className="relative min-h-screen bg-base font-sans text-ink">
      {/* Primer elemento enfocable de la página: quien navega con teclado
          salta el nav y la decoración de un solo Tab. */}
      <a href="#contenido" className="skip-link">
        {t.nav.skip}
      </a>

      {/* Calienta los assets del hero en tiempo ocioso. No pinta nada: un velo
          de carga se convertiría en el LCP y penalizaría el SEO. */}
      <Prefetch />

      {/* Mirilla global: una sola instancia para todo el sitio, y solo con
          puntero fino. Vive aquí y no por sección para que no haya dos. */}
      <Mirilla />

      {/* Barra de progreso de scroll */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-neb via-cosmo to-neb"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Fondo cósmico global */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Starfield />
      </div>
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0 opacity-[0.3] mix-blend-overlay" />

      <Nav />

      {/* Transición de página: fade-through al cambiar de ruta. Con
          `prefers-reduced-motion` la página nueva aparece sin desplazarse. */}
      <motion.main
        id="contenido"
        tabIndex={-1}
        key={location.pathname}
        className="relative z-10 outline-none"
        initial={firstRender.current || reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Outlet />
      </motion.main>

      <div className="relative z-10">
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}

function Layout({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Shell />
    </LocaleProvider>
  );
}

/** Las páginas de un idioma, con los slugs de ese idioma. */
function paginas(locale: Locale): RouteRecord[] {
  const s = ROUTE_SLUGS[locale];
  return [
    { index: true, element: <Home /> },
    { path: s.plans, element: <Plans /> },
    { path: s.services, element: <Services /> },
    { path: s.security, element: <SecurityPage /> },
    { path: s.projects, element: <Projects /> },
    { path: s.about, element: <About /> },
    { path: s.contact, element: <Contact /> },
    { path: s.privacy, element: <Privacy /> },
  ];
}

export const routes: RouteRecord[] = [
  { path: "/", element: <Layout locale="es" />, children: paginas("es") },
  { path: "/en", element: <Layout locale="en" />, children: paginas("en") },
];
