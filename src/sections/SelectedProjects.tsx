import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SSR } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { CarruselProyectos } from "@/components/CarruselProyectos";
import { ProjectsFondo, ProjectsDelanteras, ProjectsEco, ENTRADA } from "@/components/ProjectsFx";
import { useNitidez, useTramo } from "@/components/WdidFx";
import { useModoLigero } from "@/lib/perf";
import { useLocale } from "@/i18n/LocaleContext";

/**
 * "Selected Projects".
 *
 * Deja de ser una rejilla de tarjetas: es **una tableta sostenida por dos
 * guantes**, con los proyectos corriendo dentro en dos filas que se desplazan
 * en sentidos opuestos.
 *
 * La tableta no lleva pantalla puesta. Es un marco con un agujero, y lo que se
 * ve por él es DOM real —el carrusel—, no una textura. El marco va por encima
 * con `pointer-events: none`, así que los clics lo atraviesan y llegan a los
 * proyectos.
 *
 * ── Dos sistemas de coordenadas ──
 * Las seis piezas gráficas están medidas sobre el montaje de 1920x1080, así
 * que viven dentro de `.projects__escena`, que es 16:9. El titular y el enlace
 * se quedan en la rejilla normal del sitio, en `.projects__inner`.
 */
export function SelectedProjects() {
  const { t, href } = useLocale();
  const tramo = useTramo();
  const movil = tramo === "movil";
  const carpeta = useNitidez();
  /* El modo ligero entra por la misma puerta que `prefers-reduced-motion`: el
     carrusel se para y pasa a ser una fila con scroll manual y `scroll-snap`.
     Los proyectos siguen siendo accesibles, que es la línea que no se cruza. */
  const ligero = useModoLigero();
  const quieto = !!useReducedMotion() || ligero;
  const ref = useRef<HTMLElement>(null);

  /* Nada se anima con la sección fuera de pantalla: ni las seis piezas, ni el
     eco, ni las dos filas del carrusel. Las dos señales —intersección y
     visibilidad de la pestaña— se guardan aparte y se recombinan en cada
     cambio; si no, al volver de otra app el carrusel se quedaba parado. */
  const [enPantalla, setEnPantalla] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let intersecta = false;
    const revisar = () => setEnPantalla(intersecta && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        intersecta = e.isIntersecting;
        revisar();
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", revisar);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", revisar);
    };
  }, []);

  const corriendo = enPantalla && !quieto;

  /* ── La entrada NO va con `whileInView` ──
     Este sitio se prerenderiza: con `initial="hidden"` el HTML estático se
     quedaría con la sección entera a `opacity: 0`. El prerender pinta el
     estado final y la animación es cosa del cliente. */
  const visto = useInView(ref, { once: true, margin: "-80px" });
  const mostrar = SSR || quieto || visto;

  return (
    <section
      ref={ref}
      id={t.anchors.showcase}
      aria-labelledby="muestrario-titulo"
      /* `no-corre` para las dos filas del carrusel: la animación es CSS y se
         para con `animation-play-state`. */
      className={`projects relative w-full scroll-mt-24${corriendo ? "" : " no-corre"}`}
    >
      {/* z1 · mide contra la sección entera, incluida la banda del titular. */}
      <ProjectsEco tramo={tramo} corriendo={corriendo} />

      {/* Mismo tope y mismo sangrado lateral que "What I Do". */}
      <div className="projects__inner relative z-[6] mx-auto w-full max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Todo lo que hay dentro son demostraciones propias. Declararlo
              primero convierte la debilidad en argumento: se puede entrar a
              todas. */}
          <SectionHeading id="muestrario-titulo" kicker={t.showcase.kicker} title={t.showcase.title}>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[52ch] text-[14.5px] leading-[1.7] text-mute">{t.showcase.intro}</p>
            </Reveal>
          </SectionHeading>
          <Reveal delay={0.15}>
            <Link
              to={href("projects")}
              className="link-flecha group"
            >
              {t.showcase.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>

      {movil ? (
        /* ── Móvil: sin tableta ──
           El marco con las manos ocupa demasiado por debajo de 768 px. El
           carrusel baja por la pantalla de un teléfono. */
        <>
          <img
            src={`/wdid/fx/${carpeta}/wdid_11_velo_izq.webp`}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="lazy"
            className="projects__velo"
          />

          <div className="projects__movil">
            <div className="phone">
              <div className="phone__viewport">
                <CarruselProyectos vertical quieto={quieto} activo={corriendo} />
              </div>
              <img
                src={`/projects/${carpeta}/sp_phone.webp`}
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                className="phone__frame"
              />
            </div>

            <img
              src={`/projects/${carpeta}/sp_21_cartucho.webp`}
              alt=""
              aria-hidden="true"
              decoding="async"
              loading="lazy"
              className="projects__suelta projects__suelta--cartucho"
            />
            <img
              src={`/wdid/fx/${carpeta}/wdid_05_guijarro.webp`}
              alt=""
              aria-hidden="true"
              decoding="async"
              loading="lazy"
              className="projects__suelta projects__suelta--guijarro"
            />
          </div>
        </>
      ) : (
        <motion.div
          className="projects__escena"
          initial={SSR || quieto ? false : "hidden"}
          animate={mostrar ? "show" : "hidden"}
        >
          <ProjectsFondo tramo={tramo} corriendo={corriendo} />

          {/* Dos envoltorios y no uno. El de fuera lleva la entrada por
              variantes y el agarre del hover; el de dentro, la flotación
              continua. En un solo elemento no caben. */}
          <motion.div
            className="projects__tableta"
            variants={ENTRADA}
            custom={1}
            whileHover={{ scale: 1.015, y: 2 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <motion.div
              className="projects__tableta__flota"
              animate={
                corriendo
                  ? { y: [-6, 6], transition: { duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }
                  : undefined
              }
            >
              {/* z3 · el carrusel, visto a través del agujero. */}
              <div className="projects__viewport">
                <CarruselProyectos quieto={quieto} activo={corriendo} />
              </div>
              {/* z4 · el marco. `pointer-events:none` para que los clics pasen. */}
              <img
                src={`/projects/${carpeta}/sp_tablet.webp`}
                alt=""
                aria-hidden="true"
                draggable={false}
                decoding="async"
                className="projects__frame"
              />
            </motion.div>
          </motion.div>

          <ProjectsDelanteras tramo={tramo} corriendo={corriendo} />
        </motion.div>
      )}
    </section>
  );
}
