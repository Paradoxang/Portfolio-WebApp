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
 * ── La sección va a sangre ──
 * El brief propone `width:100vw; margin-inline:calc(50% - 50vw)`. Aquí no hace
 * falta y además sería peor: las secciones cuelgan directamente del `<main>`
 * del layout, que **no tiene `max-width`** —el tope lo pone cada sección por
 * dentro—, así que basta con no ponérselo. Y `100vw` incluye el ancho de la
 * barra de desplazamiento: en escritorio la sección quedaría unos 15 px más
 * ancha que el hueco disponible, que es exactamente el scroll horizontal que
 * el criterio 2 prohíbe. Mismo patrón que ya usa "What I Do".
 *
 * ── Dos sistemas de coordenadas ──
 * Las seis piezas gráficas están medidas sobre el montaje de 1920x1080, así
 * que viven dentro de `.projects__escena`, que es 16:9. El titular y el enlace
 * se quedan en la rejilla normal del sitio, en `.projects__inner`.
 */
export function SelectedProjects() {
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
     eco, ni las dos filas del carrusel. Con dos carriles corriendo fuera de
     vista se nota en el frame rate de toda la página. 200 px de margen para
     que arranquen justo antes de entrar y nunca se vea el momento. */
  const [enPantalla, setEnPantalla] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* La interseccion se guarda aparte y las dos senales se recombinan en cada
       cambio. Antes el manejador de visibilidad era
       `setEnPantalla(v => v && !document.hidden)`, que solo sabia APAGAR: si el
       navegador disparaba `visibilitychange` con la seccion ya visible —al
       restaurar la pestana, al volver de otra app en el movil— quedaba en
       falso, y el observador no volvia a disparar porque la interseccion no
       habia cambiado. El carrusel se quedaba parado para siempre. */
    let intersecta = false;
    const revisar = () => setEnPantalla(intersecta && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      intersecta = e.isIntersecting;
      revisar();
    }, {
      threshold: 0,
      rootMargin: "200px 0px",
    });
    io.observe(el);
    const onVis = revisar;
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const corriendo = enPantalla && !quieto;

  /* ── La entrada NO va con `whileInView` ──
     El brief la propone así, pero este sitio se prerenderiza: con
     `initial="hidden"` el HTML estático se queda con la sección entera a
     `opacity: 0` y solo se ve si el observador de Framer llega a dispararse
     tras la hidratación. Es el patrón que ya usa `Reveal` en `lib/anim`: el
     prerender pinta el estado final y la animación es cosa del cliente. Así,
     si algo falla, lo que se ve de más es la sección, no un hueco negro. */
  const visto = useInView(ref, { once: true, margin: "-80px" });
  const mostrar = SSR || quieto || visto;

  return (
    <section
      ref={ref}
      id="proyectos-destacados"
      /* `no-corre` para las dos filas del carrusel: la animacion es CSS y se
         para con `animation-play-state`, que es lo que hace que el compositor
         deje de trabajar de verdad con la seccion fuera de vista. */
      className={`projects relative w-full${corriendo ? "" : " no-corre"}`}
    >
      {/* z1 · mide contra la sección entera, incluida la banda del titular. */}
      <ProjectsEco tramo={tramo} corriendo={corriendo} />

      {/* Mismo tope y mismo sangrado lateral que "What I Do": los dos
          titulares caen sobre la misma vertical, que es lo que hace que la
          portada se lea como una rejilla y no como dos secciones sueltas. */}
      <div className="projects__inner relative z-[6] mx-auto w-full max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Deja de ser "Trabajo seleccionado". Todo lo que hay dentro son
              demostraciones propias, y llamarlas de otra forma es exactamente
              lo que un comprador detecta en diez segundos. Declararlo primero
              convierte la debilidad en argumento: se puede entrar a todas. */}
          <SectionHeading kicker="04 — Muestrario" title="Así se vería el tuyo">
            <Reveal delay={0.12}>
              {/* La variedad de sectores no es casualidad, es el argumento:
                  cada pieza se diseñó para un negocio distinto y ninguna se
                  parece a la otra. Es lo que sostiene el "a medida". */}
              <p className="mt-5 max-w-[52ch] text-[14.5px] leading-[1.7] text-mute">
                Demostraciones que construí para probar ideas — un estudio
                creativo, una marca de café, una joyería, un hotel, un
                consultorio. Ninguna se parece a la otra, y esa es la idea.
              </p>
            </Reveal>
          </SectionHeading>
          <Reveal delay={0.15}>
            <Link
              to="/proyectos"
              className="group flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-neb transition-colors hover:text-ink"
            >
              Ver los seis
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>

      {movil ? (
        /* ── Móvil: sin tableta ──
           El marco con las manos ocupa demasiado por debajo de 768 px. El
           carrusel se muestra a ancho completo con esquinas redondeadas y un
           borde hairline, para que siga leyéndose como una pantalla. */
        <>
          {/* El velo sustituye a los tres fondos grandes. Los escombros son una
              banda horizontal que en vertical no dice nada —y es la pieza más
              pesada del set—, y el cono y el brazo estaban compuestos para una
              escena apaisada.
              Va por alfa y no con `screen`: la pieza ya se convirtió a RGBA en
              su día, y el blend además es lo primero que se cae en modo ligero. */}
          <img
            src={`/wdid/fx/${carpeta}/wdid_11_velo_izq.webp`}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="lazy"
            className="projects__velo"
          />

          <div className="projects__movil">
            {/* El teléfono: marco con el hueco ya perforado y la columna
                corriendo por detrás. Los dedos del guante entran por delante
                del borde derecho del hueco, y eso es lo que se busca — el marco
                va encima, así que las tarjetas pasan tras ellos. */}
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

            {/* De las piezas pequeñas sobreviven dos, al 45 %. */}
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
              continua. En un solo elemento no caben: un `animate` explícito
              anula la propagación de variantes del padre, así que la tableta
              se quedaría sin entrada, y el `y` del hover pelearía con los
              fotogramas clave de la flotación. Separados, las dos
              transformaciones se componen. */}
          <motion.div
            className="projects__tableta"
            variants={ENTRADA}
            custom={1}
            whileHover={{ scale: 1.015, y: 2 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* La flotación va en el contenedor COMÚN de hueco y marco, no en
                el marco solo: si el marco flota y el hueco no, el carrusel se
                descuadra respecto al bisel y se ve en el filo. */}
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
