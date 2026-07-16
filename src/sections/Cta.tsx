import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { OrbitRings } from "@/components/Cosmic";
import { contact } from "@/data/site";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="contacto"
      ref={ref}
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-24 pt-8 md:px-8"
    >
      <div className="glow-cta relative overflow-hidden rounded-2xl border border-white/10 bg-space/60">
        <img
          src="/cosmic-orb.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="float-y pointer-events-none absolute -right-16 -top-28 h-[360px] w-[360px] opacity-50 mix-blend-screen sm:h-[440px] sm:w-[440px]"
        />
        <OrbitRings className="absolute -right-20 -top-20 h-[320px] w-[320px] opacity-40" />
        <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Reveal>
              <div className="kicker">05 — Contacto</div>
            </Reveal>
            <h2 className="display mt-4 text-[clamp(40px,6vw,64px)] leading-[0.92]">
              <RevealLine delay={0.06}>Let's Work</RevealLine>
              <RevealLine delay={0.14}>
                <span className="text-transparent [-webkit-text-stroke:1.5px_#8fa2ff]">
                  Together
                </span>
              </RevealLine>
            </h2>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 font-mono text-[12.5px] font-medium text-mute">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <Mail className="h-4 w-4 text-neb" /> {contact.email}
                </a>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <Phone className="h-4 w-4 text-neb" /> {contact.phone}
                </a>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <Instagram className="h-4 w-4 text-neb" />{" "}
                  {contact.instagramHandle}
                </a>
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-neb" /> {contact.location}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-9">
                <Magnetic>
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn-neb px-7 py-3.5 text-sm"
                  >
                    Disponible para freelance
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-space opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-space" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Mockup laptop con el propio sitio en pantalla */}
          <motion.div
            style={reduced ? undefined : { y: mockY }}
            className="mx-auto w-full max-w-[440px]"
          >
            <Reveal delay={0.2}>
              <div>
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-panel-hi p-1.5 shadow-[0_30px_60px_rgba(0,0,0,.5)]">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src="/og-image.jpg"
                      alt="Vista del portafolio doxdesigns.dev"
                      loading="lazy"
                      className="block w-full"
                    />
                  </div>
                </div>
                <div className="h-3 rounded-b-xl border border-white/15 bg-gradient-to-b from-panel-hi to-panel" />
                <div className="mx-auto h-1 w-1/3 rounded-b-lg bg-panel" />
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
