import { useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Magnetic, Reveal } from "@/lib/anim";
import { HeroFusion } from "@/components/HeroFusion";
import { QuantumSwarm } from "@/components/QuantumSwarm";
import { HeroFx } from "@/components/HeroFx";
import { HeroNombre } from "@/components/HeroNombre";
import { trackContact } from "@/lib/analytics";
import { Rich, useLocale } from "@/i18n/LocaleContext";

/** Flecha de descenso alargada: un icono cuadrado no da la proporción. */
function FlechaLarga() {
  return (
    <svg
      className="hero-arrow"
      viewBox="0 0 12 68"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 0 V60" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.2 54 L6 65.4 L10.8 54"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * El hero: retrato fundido con el astronauta, el nombre descifrándose, los dos
 * raíles numerados y, debajo, la banda de promesa con el titular y los dos
 * botones.
 *
 * Durante meses convivió con una segunda rama —titular a la izquierda,
 * retrato con chips a la derecha— detrás de un interruptor "temporal". Esta
 * es la única que se ve y la única que queda.
 */
export function Hero() {
  const { t, href, whatsapp } = useLocale();
  const ref = useRef<HTMLElement>(null);
  /** La figura ancla el disco de acreción sobre el rostro. */
  const figureRef = useRef<HTMLElement>(null);
  const [fused, setFused] = useState(false);

  /* ── Capa decorativa ──
     Un solo par de motion values para las doce piezas, alimentado desde el
     `pointermove` que HeroFusion ya escucha. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onPointer = useCallback(
    (nx: number, ny: number) => {
      mx.set(nx);
      my.set(ny);
    },
    [mx, my]
  );
  /** La decoración nunca entra antes que el sujeto. */
  const [fxListo, setFxListo] = useState(false);
  /** Bucles solo con el hero en pantalla y la pestaña delante. */
  const [fxCorriendo, setFxCorriendo] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setFxListo(true), 700);
    const seccion = ref.current;
    if (!seccion) return () => window.clearTimeout(t);
    let enPantalla = true;
    const revisar = () => setFxCorriendo(enPantalla && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        enPantalla = e.isIntersecting;
        revisar();
      },
      { threshold: 0 }
    );
    io.observe(seccion);
    document.addEventListener("visibilitychange", revisar);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
      document.removeEventListener("visibilitychange", revisar);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      /* `min-h-dvh` y no `min-h-screen`: en móvil `100vh` incluye la barra
         del navegador y el hero se pasaba de la primera pantalla. */
      className="glow-hero hero-cursor relative flex min-h-dvh flex-col overflow-hidden pt-20"
    >
      {/* Nebulosa de fondo (glow a la derecha, oscuro a la izquierda para el
          texto). Es lo primero que se ve: prioridad alta, decodificación
          asíncrona y nunca perezosa. */}
      <img
        src="/nebula-banner.webp"
        alt=""
        aria-hidden="true"
        decoding="async"
        {...{ fetchpriority: "high" }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base via-base/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      {/* Enjambre cuántico: cubre toda la sección. Va por encima con `screen`,
          así solo suma luz y nunca tapa el contenido. */}
      <QuantumSwarm energetic={fused} />

      {/* Piezas decorativas. Nunca reciben punteros y no las lee un lector de
          pantalla. */}
      <HeroFx mx={mx} my={my} listo={fxListo} corriendo={fxCorriendo} />

      {/* Los raíles cuelgan de la sección, no del contenedor centrado: así se
          pegan al borde real de la pantalla y no al del ancho máximo. */}
      {/* Izquierda: el "01" solo en escritorio; en móvil queda la etiqueta
          con su flecha, como enlace a servicios. */}
      <Link to={href("home", "services")} className="hero-rail hero-rail--left hero-indice">
        <span className="hero-index-group">
          <span className="hero-index-box hero-solo-escritorio">
            <span className="hero-index">01</span>
          </span>
          <span className="hero-rail__vertical font-elnath text-[clamp(10px,1.1vw,14px)]">
            {t.hero.railServices}
          </span>
          <FlechaLarga />
        </span>
      </Link>

      <div className="hero-rail hero-rail--right">
        {/* Gemelo del "01", en espejo: la flecha y la etiqueta van primero y
            el número queda pegado al borde derecho, que es lo que hace que los
            dos raíles se lean como un par. Apunta al bloque que cobra. */}
        <Link
          to={href("plans")}
          className="hero-indice hero-solo-escritorio"
          aria-label={t.hero.railPlansAria}
        >
          <span className="hero-index-group hero-index-group--espejo">
            <FlechaLarga />
            <span className="hero-rail__vertical font-elnath text-[clamp(10px,1.1vw,14px)]">
              {t.hero.railPlans}
            </span>
            <span className="hero-index-box">
              <span className="hero-index">02</span>
            </span>
          </span>
        </Link>

        {/* En móvil el número no entra: queda la etiqueta con su flecha,
            espejo de la izquierda. */}
        <Link to={href("plans")} className="hero-rail__enlace hero-rail__enlace--espejo hero-solo-movil">
          <FlechaLarga />
          <span className="hero-rail__vertical font-elnath text-[13px]">
            {t.hero.railPlans}
          </span>
        </Link>
      </div>

      {/* La disponibilidad, abajo y en horizontal: es un indicador de estado
          y no compite con los raíles. */}
      <a
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact("whatsapp")}
        className="hero-disponible"
      >
        <span className="hero-disponible__punto" aria-hidden="true" />
        <span className="font-elnath">{t.hero.available}</span>
      </a>

      {/* z-30 deja la figura (y el nombre, que va sobre ella dentro de este
          mismo contexto) por encima del enjambre cuántico, que está en 20: el
          retrato ya no se lee lavado por las partículas. */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1240px] flex-1 items-center px-6 md:px-8">
        <div className="grid w-full place-items-center">
          {/* w-full para que el max-width de las figuras mida contra la celda
              y no contra sí mismas: si no, en móvil se desbordan. */}
          <div className="flex w-full min-w-0 justify-center">
            <div className="hero-stage">
              <HeroFusion figureRef={figureRef} onFusedChange={setFused} onPointer={onPointer} />
              {/* Dos líneas como en el esquema: Astro es muy ancha y en una
                  sola no cabe sin encogerla hasta perder presencia. */}
              <HeroNombre listo={fxListo} />
            </div>
          </div>
        </div>
      </div>

      {/* z-55: por encima de la capa DELANTERA de la decoración, que va en 50,
          y por debajo del nav. Ninguna pieza tapa texto. */}
      <div className="relative z-[55] mx-auto w-full max-w-[1240px] px-6 pb-8 md:px-8">
        <Reveal delay={0.85} mount>
          <div className="hero-promesa">
            <div className="hero-promesa__titular">
              <p className="kicker !text-[11px]">{t.hero.kicker}</p>
              <h1 id="hero-titulo" className="hero-promesa__h1">
                <Rich text={t.hero.h1} strong="text-shimmer" as="span" />
              </h1>
              {/* Quién firma. Sin clientes todavía es la única prueba que no
                  depende de haber trabajado para alguien, y es lo que un
                  buscador usa para saber que hay una persona real detrás. */}
              <p className="hero-promesa__firma">{t.hero.credential}</p>
            </div>

            <div className="hero-promesa__acciones">
              {/* El primario sale del sitio: es una conversación, no otra
                  página. El secundario lleva a la página que cobra, igual que
                  el raíl de la derecha. */}
              <Magnetic>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn btn--primary btn--flecha"
                >
                  {t.hero.ctaPrimary}
                  <span className="btn__disco">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </Magnetic>
              <Link to={href("plans")} className="btn btn--ghost">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
