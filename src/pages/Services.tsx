import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { OrbitRings } from "@/components/Cosmic";
import { Acordeon } from "@/components/Acordeon";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { useStaggerReveal } from "@/lib/scroll";
import { trackContact, trackViewContent } from "@/lib/analytics";
import { cycleIcons, frontIcons } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { faqPage } from "@/lib/schema";
import { partirH1 } from "@/pages/Plans";

/**
 * `/servicios` — qué hago, no cuánto cuesta.
 *
 * ── El reparto con /planes ──
 *   · `/planes`    → CUÁNTO CUESTA. Los tres planes, la telemetría y las
 *                    cuatro preguntas que frenan una suscripción.
 *   · `/servicios` → QUÉ HAGO. Los cuatro frentes desarrollados, el ciclo de
 *                    trabajo mensual y las dudas operativas.
 *
 * De ahí que aquí no haya ni un precio y allí no haya un listado de tareas.
 *
 * ── Los cuatro frentes son los mismos que en la portada ──
 * Son las cuatro tarjetas del bloque 01, desarrolladas. Viven en el mismo
 * fichero de contenido, uno debajo del otro, para que no se desalineen.
 */
export function Services() {
  const { t, href, whatsapp } = useLocale();
  const s = t.pages.services;
  const [antes, brillo] = partirH1(s.h1);

  // Señal de interés: quien llega aquí está evaluando contratar. Sirve para
  // crear públicos de remarketing en Meta. La clave es estable entre idiomas.
  useEffect(() => {
    trackViewContent("servicios", "crecimiento_digital");
  }, []);

  /* Las dos rejillas entran escalonadas con ScrollTrigger: una animación por
     fila en vez de un observador de Framer por tarjeta. */
  const frentesRef = useRef<HTMLElement>(null);
  const cicloRef = useRef<HTMLElement>(null);
  useStaggerReveal(frentesRef, ".frente");
  useStaggerReveal(cicloRef, ".ciclo");

  return (
    <div className="pagina">
      <PaginaFx semilla={0} />

      <Seo route="services" title={s.seo.title} description={s.seo.description} jsonLd={faqPage(s.faq.items)} />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-16">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          {s.word}
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">{s.kicker}</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(43.5px,8.4vw,111px)] leading-[0.88]">
            <RevealLine delay={0.08} mount>
              {antes}
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">{brillo}</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.24} mount>
            <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.75] text-mute">
              <Rich text={s.intro} strong="text-ink" />
            </p>
          </Reveal>
          <Reveal delay={0.34} mount>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn btn--primary btn--flecha"
                >
                  {s.ctaPrimary}
                  <span className="btn__disco">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </Magnetic>
              <Link to={href("plans")} className="btn btn--ghost">
                {s.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Los cuatro frentes */}
      <section ref={frentesRef} aria-label={t.services.kicker} className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-2" role="list">
          {s.fronts.map((f, i) => {
            const Icono = frontIcons[i];
            return (
              <li key={f.title} className="frente h-full">
                <article className="card card-hover shine-hover group h-full p-7 md:p-8">
                  <div className="icon-plate icon-plate--lg icon-plate--gira">
                    <Icono className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h2 className="display mt-5 text-[clamp(21px,2.4vw,28.5px)] leading-[1.05]">{f.title}</h2>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">{f.desc}</p>
                  <ul className="mt-5 flex list-none flex-col gap-2 p-0" role="list">
                    {f.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-faint">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-neb" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Cada frente dice cómo se comprueba. Sin esta línea, los
                      cinco puntos de arriba son cinco promesas. */}
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <h3 className="font-mono text-[9.5px] font-medium tracking-[0.16em] uppercase text-faint">
                      {s.measureLabel}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-mute">{f.measure}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* El ciclo de trabajo */}
      <section ref={cicloRef} aria-labelledby="ciclo-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">{s.cycle.kicker}</div>
        </Reveal>
        <h2 id="ciclo-titulo" className="display mt-3 text-[clamp(30px,5.2vw,58.5px)] leading-[0.96]">
          <RevealLine delay={0.06}>{s.cycle.title}</RevealLine>
        </h2>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.75] text-mute">{s.cycle.intro}</p>
        </Reveal>

        <ol className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {s.cycle.steps.map((p, i) => {
            const Icono = cycleIcons[i];
            return (
              <li key={p.num} className="ciclo h-full">
                <div className="card card-hover group h-full p-6">
                  <div className="flex items-center justify-between">
                    <div className="icon-plate">
                      <Icono className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <span className="display text-[27px] leading-none text-white/10" aria-hidden="true">
                      {p.num}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-bold text-ink">
                    <span className="sr-only">{p.num} · </span>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-faint">{p.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Seguridad */}
      <section aria-labelledby="seguridad-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="glow-quote relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60 p-8 md:p-10">
            <div className="scan-line-y" aria-hidden="true" />
            <OrbitRings className="absolute -right-24 -top-24 h-[300px] w-[300px] opacity-40" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
              <div className="icon-plate icon-plate--xl shrink-0">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div>
                <h2 id="seguridad-titulo" className="display text-[clamp(22.5px,3vw,33px)] leading-[1.05]">
                  {s.security.title}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[14.5px] leading-[1.7] text-mute">{s.security.text}</p>
                <p className="mt-3 max-w-[70ch] text-[13px] leading-[1.65] text-faint">
                  <Rich text={s.security.note} strong="text-mute" />
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Preguntas frecuentes */}
      <section aria-labelledby="faq-servicios-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">{s.faq.kicker}</div>
        </Reveal>
        <h2 id="faq-servicios-titulo" className="display mt-3 text-[clamp(33px,5.6vw,63px)] leading-[0.94]">
          <RevealLine delay={0.06}>{s.faq.title}</RevealLine>
        </h2>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-[60ch] text-[14.5px] leading-[1.7] text-faint">
            {s.faq.introPre}
            <Link to={href("plans")} className="link-underline text-neb">
              {s.faq.introLink}
            </Link>
            {s.faq.introPost}
          </p>
        </Reveal>
        <Acordeon items={s.faq.items} idBase="faq-servicios" className="mt-10 max-w-[820px]" />
      </section>

      {/* CTA final */}
      <section aria-labelledby="final-titulo" className="mx-auto max-w-[1200px] px-6 pb-28 pt-8 md:px-8">
        <Reveal>
          <div className="glow-cta relative overflow-hidden rounded-2xl border border-white/10 bg-space/60 p-8 text-center md:p-14">
            <h2 id="final-titulo" className="display text-[clamp(30px,4.7vw,52.5px)] leading-[0.98]">
              {s.final.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] leading-[1.7] text-mute">{s.final.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="btn btn--primary"
                >
                  {s.final.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <Link to={href("plans")} className="btn btn--ghost">
                {s.final.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
