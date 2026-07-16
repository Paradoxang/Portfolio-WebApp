import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Magnetic, Reveal, RevealLine, EASE, SSR } from "@/lib/anim";
import { contact } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // La palabra de fondo y el retrato se mueven a velocidades distintas
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      className="glow-hero relative flex min-h-screen flex-col overflow-hidden pt-24"
    >
      {/* Palabra gigante de fondo con parallax lento */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: wordY }}
        className="outline-word absolute left-[-2%] top-[16%] z-0 text-[clamp(110px,21vw,250px)] leading-[0.8]"
      >
        PORTFOLIO
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 items-center px-6 md:px-8">
        <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Texto */}
          <div>
            <Reveal>
              <div className="kicker">Desarrollador &amp; Diseñador Web</div>
            </Reveal>
            <h1 className="display mt-5 text-[clamp(64px,11vw,132px)] leading-[0.86]">
              <RevealLine delay={0.08}>Santiago</RevealLine>
              <RevealLine delay={0.16}>
                <span className="text-transparent [-webkit-text-stroke:1.5px_#8fa2ff]">
                  Miranda
                </span>
              </RevealLine>
            </h1>
            <Reveal delay={0.28}>
              <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.65] text-mute">
                Diseño y construyo experiencias digitales donde el{" "}
                <strong className="font-bold text-ink">código</strong> y el{" "}
                <strong className="font-bold text-ink">diseño</strong> se
                encuentran.
              </p>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    to="/proyectos"
                    className="btn-neb group py-1.5 pl-6 pr-1.5 text-sm"
                  >
                    Ver proyectos
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-space transition-transform group-hover:scale-110">
                      <ArrowRight className="h-4 w-4 text-neb" />
                    </span>
                  </Link>
                </Magnetic>
                <Link
                  to="/sobre-mi"
                  className="pill px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-mute"
                >
                  Sobre mí
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Retrato editorial — presencia moderada, con glow */}
          <motion.div
            style={reduced ? undefined : { y: portraitY }}
            className="mx-auto w-[min(72vw,320px)] lg:w-full lg:max-w-[380px]"
          >
            <motion.div
              initial={
                reduced || SSR
                  ? false
                  : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.6 }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className="relative overflow-hidden rounded-2xl border border-white/10"
              style={{
                aspectRatio: "1100 / 1287",
                boxShadow:
                  "0 30px 70px rgba(0,0,0,.55), 0 0 90px rgba(143,162,255,.16)",
              }}
            >
              <img
                src="/perfil.webp"
                alt="Santiago Miranda"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cintillo inferior */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-8">
        <Reveal delay={0.5}>
          <div className="flex items-center justify-between border-t border-white/10 py-5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-faint">
            <span>
              {contact.location} — Ingeniero Informático · Full-stack
            </span>
            <span className="hidden sm:block">{contact.domain}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
