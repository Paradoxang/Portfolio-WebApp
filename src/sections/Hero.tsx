import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Letters, Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { HeroComparison } from "@/components/HeroComparison";
import { HeroFusion } from "@/components/HeroFusion";
import { HeroPortrait } from "@/components/HeroPortrait";
import { QuantumSwarm } from "@/components/QuantumSwarm";
import { contact } from "@/data/site";
import { trackContact } from "@/lib/analytics";

/**
 * Modo aislado: solo nav + fondo + figura. Temporal, para evaluar la animación
 * sin ruido visual. A `false` vuelve la Hero completa, sin tocar nada más.
 */
const HERO_ISOLATED: boolean = true;
/** Qué se muestra en modo aislado: la capa 3 fundida o la comparativa apilada. */
const ISOLATED_VIEW: "fusion" | "comparativa" = "fusion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  /** La figura ancla el disco de acreción sobre el rostro. */
  const figureRef = useRef<HTMLElement>(null);
  const [fused, setFused] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // El retrato sube más despacio que el scroll
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="glow-hero hero-cursor relative flex min-h-screen flex-col overflow-hidden pt-20"
    >
      {/* Nebulosa de fondo (glow a la derecha, oscuro a la izquierda para el texto) */}
      <img
        src="/nebula-banner.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base via-base/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      {/* Enjambre cuántico: cubre toda la sección. Va por encima con `screen`,
          así solo suma luz y nunca tapa el contenido. */}
      <QuantumSwarm energetic={fused} />

      {/* Los raíles cuelgan de la sección, no del contenedor centrado: así se
          pegan al borde real de la pantalla y no al del ancho máximo. */}
      {HERO_ISOLATED && ISOLATED_VIEW === "fusion" && (
        <>
          {/* Izquierda: el "01" solo en escritorio; en móvil queda la etiqueta
              con su flecha, como enlace a servicios. */}
          <Link to="/servicios" className="hero-rail hero-rail--left">
            {/* El número a la izquierda de la etiqueta; la flecha, debajo. */}
            <span className="hero-index-group">
              <span className="hero-index-box hero-solo-escritorio">
                <span className="hero-index">01</span>
              </span>
              <span className="hero-rail__vertical font-elnath text-[clamp(10px,1.1vw,14px)]">
                Especialidades
              </span>
            </span>
            <ChevronDown className="hero-arrow" aria-hidden="true" />
          </Link>

          <div className="hero-rail hero-rail--right">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="hero-disponible hero-solo-escritorio"
            >
              <span className="hero-disponible__punto" aria-hidden="true" />
              <span className="hero-rail__vertical font-elnath text-[clamp(10px,1.1vw,14px)]">
                Disponible para misiones
              </span>
            </a>

            {/* En móvil el lado derecho lleva a proyectos, como en el esquema. */}
            <Link to="/proyectos" className="hero-rail__enlace hero-solo-movil">
              <ChevronDown className="hero-arrow" aria-hidden="true" />
              <span className="hero-rail__vertical font-elnath text-[13px]">
                Proyectos
              </span>
            </Link>
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 items-center px-6 md:px-8">
        <div
          className={
            HERO_ISOLATED
              ? // la fusión ocupa 88vh: sin padding vertical para que quepa
                `grid w-full place-items-center${
                  ISOLATED_VIEW === "fusion" ? "" : " py-14"
                }`
              : "grid w-full items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr]"
          }
        >
          {/* Texto — protagonista absoluto */}
          {!HERO_ISOLATED && (
          <div>
            <Reveal mount>
              <div className="kicker flex items-center gap-3 !text-[12px]">
                <span className="inline-block h-px w-10 bg-neb/70" />
                Desarrollador &amp; Diseñador Web
              </div>
            </Reveal>
            <h1
              className="display mt-6 text-[clamp(52px,11vw,150px)] leading-[0.86]"
              aria-label="Santiago Miranda"
            >
              <span className="block whitespace-nowrap">
                <Letters text="SANTIAGO" delay={0.1} stagger={0.05} mount />
              </span>
              <RevealLine delay={0.45} mount className="whitespace-nowrap">
                <span className="text-shimmer">MIRANDA</span>
              </RevealLine>
            </h1>
            <Reveal delay={0.65} mount>
              <p className="mt-8 max-w-[44ch] text-[clamp(17px,1.6vw,21px)] leading-[1.6] text-mute">
                Diseño y construyo experiencias digitales donde el{" "}
                <strong className="font-extrabold text-ink">código</strong> y el{" "}
                <strong className="font-extrabold text-ink">diseño</strong> se
                encuentran.
              </p>
            </Reveal>
            <Reveal delay={0.78} mount>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <Link
                    to="/proyectos"
                    className="btn-neb group py-2 pl-8 pr-2 text-[15px]"
                  >
                    Ver proyectos
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-space transition-transform group-hover:scale-110">
                      <ArrowRight className="h-4.5 w-4.5 text-neb" />
                    </span>
                  </Link>
                </Magnetic>
                <Link
                  to="/sobre-mi"
                  className="pill px-7 py-3.5 font-mono text-[12px] font-semibold tracking-[0.14em] uppercase text-mute"
                >
                  Sobre mí
                </Link>
              </div>
            </Reveal>
          </div>
          )}

          {/* Retrato recortado que panea siguiendo el cursor. Sin marco: la
              figura se funde con el fondo mediante la máscara inferior. */}
          <motion.div
            style={reduced || HERO_ISOLATED ? undefined : { y: portraitY }}
            className={
              HERO_ISOLATED
                ? // w-full para que el max-width de las figuras mida contra la
                  // celda y no contra sí mismas: si no, en móvil se desbordan.
                  "flex w-full min-w-0 justify-center"
                : "order-first flex justify-center lg:order-none"
            }
          >
            {!HERO_ISOLATED ? (
              <HeroPortrait figureRef={figureRef} />
            ) : ISOLATED_VIEW === "fusion" ? (
              <div className="hero-stage">
                <HeroFusion figureRef={figureRef} onFusedChange={setFused} />

                {/* Dos líneas como en el esquema: Astro es muy ancha y en una
                    sola no cabe sin encogerla hasta perder presencia. */}
                <h1 className="hero-name" aria-label="Santiago Miranda">
                  <span className="block" aria-hidden="true">
                    SANTIAGO
                  </span>
                  <span className="block" aria-hidden="true">
                    MIRANDA
                  </span>
                </h1>
              </div>
            ) : (
              <HeroComparison />
            )}
          </motion.div>
        </div>
      </div>

      {/* Cintillo inferior + indicador de scroll */}
      {!HERO_ISOLATED && (
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-8">
        <Reveal delay={0.9} mount>
          <div className="relative flex items-center justify-between border-t border-white/10 py-5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-faint">
            <span>{contact.location} — Ingeniero Informático · Full-stack</span>
            <div className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex">
              <span className="text-[9px] tracking-[0.3em] text-faint">
                Scroll
              </span>
              <span className="scroll-line block h-8 w-px bg-gradient-to-b from-neb to-transparent" />
            </div>
            <span className="hidden sm:block">{contact.domain}</span>
          </div>
        </Reveal>
      </div>
      )}
    </section>
  );
}
