import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Letters, Magnetic, Reveal, RevealLine, EASE, SSR } from "@/lib/anim";
import { contact } from "@/data/site";

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
              className="display mt-6 text-[clamp(68px,15.5vw,215px)] leading-[0.84]"
              aria-label="Santiago Miranda"
            >
              <span className="block">
                <Letters text="SANTIAGO" delay={0.1} stagger={0.05} mount />
              </span>
              <RevealLine delay={0.45} mount>
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
            <motion.div
              initial={
                reduced || SSR
                  ? false
                  : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.6 }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
              className="float-y"
            >
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
            </motion.div>
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
