import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
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
        <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Reveal>
              <div className="kicker">05 — Contacto</div>
            </Reveal>
            <h2 className="display mt-4 text-[clamp(40px,6vw,64px)] leading-[0.92]">
              <RevealLine delay={0.06}>Let's Work</RevealLine>
              <RevealLine delay={0.14}>
                <span className="text-shimmer">Together</span>
              </RevealLine>
            </h2>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 font-mono text-[12.5px] font-medium text-mute">
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <MessageCircle className="h-4 w-4 text-neb" /> WhatsApp ·{" "}
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <Mail className="h-4 w-4 text-neb" /> {contact.email}
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
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-neb"
                >
                  <Facebook className="h-4 w-4 text-neb" /> Facebook
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
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neb px-7 py-3.5 text-sm"
                  >
                    Disponible para proyectos
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-space opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-space" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Mockup laptop emergiendo del orbe cósmico */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <img
              src="/cosmic-orb.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="float-y pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-45 mix-blend-screen"
            />
            <motion.div
              style={reduced ? undefined : { y: mockY }}
              className="relative"
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
      </div>
    </section>
  );
}
