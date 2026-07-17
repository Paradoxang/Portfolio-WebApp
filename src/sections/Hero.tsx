import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Atom, Braces, Palette, Zap } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Letters, Magnetic, Reveal, RevealLine, Tilt, EASE, SSR } from "@/lib/anim";
import { contact } from "@/data/site";

/* Chips de tecnología flotando alrededor del retrato */
const floatChips = [
  { icon: Atom, label: "React", pos: "-left-6 top-8 lg:-left-14", delay: "0s" },
  { icon: Braces, label: ".NET", pos: "-right-4 top-24 lg:-right-10", delay: "1.4s" },
  { icon: Palette, label: "UI/UX", pos: "-left-4 bottom-24 lg:-left-10", delay: "2.6s" },
  { icon: Zap, label: "Next.js", pos: "-right-6 bottom-10 lg:-right-14", delay: "3.5s" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // La palabra de fondo y el retrato se mueven a velocidades distintas
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="glow-hero relative flex min-h-screen flex-col overflow-hidden pt-20"
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

      {/* Marquee gigante de fondo con parallax */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: wordY }}
        className="absolute left-0 top-[6%] z-0 w-full overflow-hidden"
      >
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="outline-word pr-10 text-[clamp(150px,27vw,360px)] leading-[0.85]"
            >
              PORTFOLIO ✦ DOX DESIGNS ✦{" "}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 items-center px-6 md:px-8">
        <div className="grid w-full items-center gap-12 py-14 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Texto — protagonista absoluto */}
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

          {/* Retrato editorial con glow pulsante y flotación */}
          <motion.div
            style={reduced ? undefined : { y: portraitY }}
            className="mx-auto w-[min(70vw,300px)] lg:w-full lg:max-w-[400px]"
          >
            <div className="float-y relative">
              {/* El clip-path del reveal vive en su propio wrapper: si envolviera
                 también a los chips, los recortaría (clip-path recorta todo lo
                 que sobresale del cuadro, incluso tras terminar la animación). */}
              <motion.div
                initial={
                  reduced || SSR
                    ? false
                    : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.6 }
                }
                animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
              >
                <Tilt max={7}>
                  <div
                    className="glow-pulse relative overflow-hidden rounded-2xl border border-white/10"
                    style={{ aspectRatio: "1100 / 1287" }}
                  >
                    <img
                      src="/perfil.webp"
                      alt="Santiago Miranda"
                      draggable={false}
                      className="h-full w-full select-none object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space/50 via-transparent to-transparent" />
                  </div>
                </Tilt>
              </motion.div>

              {/* Chips de tecnología flotando (fuera del clip-path) */}
              {floatChips.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={reduced || SSR ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.15, ease: EASE }}
                  className={`absolute z-10 ${c.pos}`}
                >
                  <div className="float-y" style={{ animationDelay: c.delay }}>
                    <span className="pill gap-2 border-white/20 bg-space/80 px-3.5 py-2 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-mute backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,.45)]">
                      <c.icon
                        className="h-3.5 w-3.5 text-neb"
                        strokeWidth={1.8}
                      />
                      {c.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cintillo inferior + indicador de scroll */}
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
    </section>
  );
}
