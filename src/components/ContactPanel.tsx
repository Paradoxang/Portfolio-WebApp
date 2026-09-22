import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Magnetic, Reveal } from "@/lib/anim";
import { trackContact } from "@/lib/analytics";
import { contact } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

/**
 * El panel de contacto: vías directas a la izquierda, el portátil emergiendo
 * del orbe a la derecha.
 *
 * Lo comparten la sección 07 de la portada y la página de contacto; antes eran
 * dos copias del mismo JSX que se desalineaban solas. La cabecera la pone
 * quien lo monta —H2 en la portada, H1 en la página—, y `mount` dispara las
 * entradas al montar en vez de al hacer scroll, para lo que está sobre el
 * pliegue.
 */
export function ContactPanel({ heading, mount = false }: { heading: ReactNode; mount?: boolean }) {
  const { t, whatsapp } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mockY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const vias = [
    {
      icono: MessageCircle,
      etiqueta: `${t.cta.whatsapp} · ${contact.phone}`,
      href: whatsapp(),
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
      etiqueta: t.cta.facebook,
      href: contact.facebook,
      externo: true,
      evento: "facebook" as const,
    },
  ];

  return (
    <div ref={ref} className="glow-cta relative overflow-hidden rounded-2xl border border-white/10 bg-space/60">
      <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          {heading}
          <Reveal delay={0.24} mount={mount}>
            <ul className="mt-8 flex list-none flex-col gap-3 p-0 font-mono text-[12.5px] font-medium text-mute" role="list">
              {vias.map((v) => (
                <li key={v.etiqueta}>
                  <a
                    href={v.href}
                    {...(v.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => v.evento && trackContact(v.evento)}
                    className="inline-flex min-h-[44px] items-center gap-3 transition-colors hover:text-neb"
                  >
                    <v.icono className="h-4 w-4 text-neb" aria-hidden="true" />
                    {v.etiqueta}
                    {v.externo && <span className="sr-only"> {t.a11y.newTab}</span>}
                  </a>
                </li>
              ))}
              <li className="flex min-h-[44px] items-center gap-3">
                <MapPin className="h-4 w-4 text-neb" aria-hidden="true" /> {t.contact.location}
              </li>
              <li className="flex min-h-[44px] items-center gap-3">
                <Clock className="h-4 w-4 text-neb" aria-hidden="true" /> {t.contact.timezone}
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.34} mount={mount}>
            <div className="mt-9">
              <Magnetic>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn btn--primary"
                >
                  {t.contact.available}
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="latido absolute inline-flex h-full w-full rounded-full bg-space opacity-50" />
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
            decoding="async"
            width={1024}
            height={1024}
            className="float-y pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-45 mix-blend-screen"
          />
          <motion.div style={reduced ? undefined : { y: mockY }} className="relative">
            <Reveal delay={0.2} mount={mount}>
              <div>
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-panel-hi p-1.5 shadow-[0_30px_60px_rgba(0,0,0,.5)]">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src="/og-image.jpg"
                      alt={t.cta.mockAlt}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={630}
                      className="block h-auto w-full"
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
  );
}
