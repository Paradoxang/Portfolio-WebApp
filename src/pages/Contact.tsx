import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { Seo } from "@/components/seo";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { trackContact } from "@/lib/analytics";
import { contact } from "@/data/site";

const SITE = "https://doxdesigns.dev";

/** Vías de contacto, en el orden en que suelen usarse. */
const vias = [
  {
    icono: MessageCircle,
    etiqueta: `WhatsApp · ${contact.phone}`,
    href: contact.whatsapp,
    externo: true,
    evento: "whatsapp" as const,
  },
  {
    icono: Mail,
    etiqueta: contact.email,
    href: `mailto:${contact.email}`,
    externo: false,
    evento: "email" as const,
  },
  {
    icono: Instagram,
    etiqueta: contact.instagramHandle,
    href: contact.instagram,
    externo: true,
    evento: null,
  },
  {
    icono: Facebook,
    etiqueta: "Facebook",
    href: contact.facebook,
    externo: true,
    evento: "facebook" as const,
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <>
      <Seo
        title="Contacto · Santiago Miranda | Dox Designs"
        description="Hablemos de tu proyecto. WhatsApp, correo y redes de Santiago Miranda (Dox Designs), desarrollador full-stack y diseñador web en Cali, Colombia."
        path="/contacto"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto · Dox Designs",
          url: `${SITE}/contacto`,
          mainEntity: {
            "@type": "Person",
            name: "Santiago Miranda",
            email: contact.email,
            telephone: contact.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Cali",
              addressCountry: "CO",
            },
          },
        }}
      />

      <section
        id="contacto"
        ref={ref}
        className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-24 pt-32 md:px-8 md:pt-40"
      >
        <Reveal mount>
          <div className="kicker">Contacto</div>
        </Reveal>
        <h1 className="display mt-4 text-[clamp(34px,5.58vw,74px)] leading-[0.92]">
          <RevealLine delay={0.06} mount>
            Let&apos;s Work
          </RevealLine>
          <RevealLine delay={0.14} mount>
            <span className="text-shimmer">Together</span>
          </RevealLine>
        </h1>
        <Reveal delay={0.2} mount>
          <p className="mt-6 max-w-[52ch] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-mute">
            Cuéntame qué necesitas y te respondo con un plan y un presupuesto.
            Lo más rápido es WhatsApp; si prefieres el correo, también funciona.
          </p>
        </Reveal>

        <div className="glow-cta relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-space/60">
          <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <Reveal delay={0.06} mount>
                <ul className="flex flex-col gap-3 font-mono text-[12.5px] font-medium text-mute">
                  {vias.map((v) => (
                    <li key={v.etiqueta}>
                      <a
                        href={v.href}
                        {...(v.externo
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        onClick={() => v.evento && trackContact(v.evento)}
                        className="flex items-center gap-3 transition-colors hover:text-neb"
                      >
                        <v.icono className="h-4 w-4 text-neb" />
                        {v.etiqueta}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-neb" /> {contact.location}
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.16} mount>
                <div className="mt-9">
                  <Magnetic>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact("whatsapp")}
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
                <Reveal delay={0.2} mount>
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
    </>
  );
}
