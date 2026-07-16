import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import type { RouteRecord } from "vite-react-ssg";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useLenis, scrollToTarget, EASE } from "@/lib/anim";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Projects } from "@/pages/Projects";

function Layout() {
  useLenis();
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  // Scroll: al ancla si hay hash, arriba si no (vía Lenis)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector<HTMLElement>(location.hash);
      if (el) {
        setTimeout(() => scrollToTarget(el), 120);
        return;
      }
    }
    scrollToTarget(0, { immediate: true });
  }, [location]);

  return (
    <div className="relative min-h-screen bg-base font-sans text-ink">
      {/* Fondo cósmico global */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Starfield />
      </div>
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0 opacity-[0.3] mix-blend-overlay" />

      <Nav />

      {/* Transición de página: fade-through al cambiar de ruta */}
      <motion.main
        key={location.pathname}
        className="relative z-10"
        initial={firstRender.current ? false : { opacity: 0, y: 14 }}
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

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "proyectos", element: <Projects /> },
      { path: "sobre-mi", element: <About /> },
    ],
  },
];
