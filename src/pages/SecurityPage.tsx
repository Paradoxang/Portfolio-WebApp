import { ArrowRight, Check, FileText, MessageCircle, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { OrbitRings } from "@/components/Cosmic";
import { Acordeon } from "@/components/Acordeon";
import { Magnetic, Reveal, RevealLine } from "@/lib/anim";
import { useStaggerReveal } from "@/lib/scroll";
import { trackContact, trackViewContent } from "@/lib/analytics";
import { securityIcons } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { faqPage } from "@/lib/schema";
import { partirH1 } from "@/pages/Plans";
import { useEffect } from "react";

/**
 * `/seguridad` — el escudo, desarrollado.
 *
 * La sección 05 de la portada es la promesa en una tarjeta; esta página es el
 * detalle: los cuatro frentes de seguridad, las cabeceras reales con las que
 * corre este mismo sitio (que es la prueba más barata y más honesta que se
 * puede dar), qué lleva cada plan, la Ley 1581 y las dudas típicas.
 *
 * Es también la página que sostiene el plan Blindaje: de aquí sale el "por
 * qué" del precio más alto.
 */
export function SecurityPage() {
  const { t, href, whatsapp } = useLocale();
  const s = t.pages.security;
  const [antes, brillo] = partirH1(s.h1);

  useEffect(() => {
    trackViewContent("seguridad", "crecimiento_digital");
  }, []);

  const pilaresRef = useRef<HTMLElement>(null);
  const cabecerasRef = useRef<HTMLElement>(null);
  useStaggerReveal(pilaresRef, ".pilar");
  useStaggerReveal(cabecerasRef, ".cabecera", { y: 16, each: 0.05 });

  return (
    <div className="pagina">
      <PaginaFx semilla={21} />

      <Seo route="security" title={s.seo.title} description={s.seo.description} jsonLd={faqPage(s.faq.items)} />

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
          {/* Un punto más pequeño que las otras cabeceras: "Seguridad desde el" es
              más largo que "Elige tu" y a 8.4vw partía en tres líneas con un
              "el" suelto. */}
          <h1 className="display mt-4 text-[clamp(40px,6.6vw,88px)] leading-[0.9]">
            <RevealLine delay={0.08} mount>
              {antes}
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">{brillo}</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.24} mount>
            <p className="mt-7 max-w-[62ch] text-[16px] leading-[1.75] text-mute">{s.intro}</p>
            {/* La frase citable: quién, qué, cómo, en una línea. */}
            <p className="mt-5 max-w-[62ch] border-l-2 border-neb/40 pl-4 text-[13.5px] leading-[1.7] text-faint">
              {s.summary}
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
                  {s.final.cta}
                  <span className="btn__disco">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </Magnetic>
              <Link to={`${href("plans")}#shield`} className="btn btn--ghost">
                {s.final.secondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Los cuatro frentes */}
      <section ref={pilaresRef} aria-label={s.kicker} className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2" role="list">
          {s.pillars.map((p, i) => {
            const Icono = securityIcons[i];
            return (
              <li key={p.title} className="pilar h-full">
                <article className="card card-hover shine-hover group h-full p-7 md:p-8">
                  <div className="icon-plate icon-plate--lg">
                    <Icono className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h2 className="display mt-5 text-[clamp(21px,2.4vw,28.5px)] leading-[1.05]">{p.title}</h2>
                  <p className="mt-2 text-[14px] leading-[1.6] text-faint">{p.desc}</p>
                  <ul className="mt-5 flex list-none flex-col gap-2 p-0" role="list">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-mute">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-neb" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Este sitio es la prueba */}
      <section ref={cabecerasRef} aria-labelledby="prueba-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">{s.proof.kicker}</div>
        </Reveal>
        <h2 id="prueba-titulo" className="display mt-3 text-[clamp(30px,5.2vw,58.5px)] leading-[0.96]">
          <RevealLine delay={0.06}>{s.proof.title}</RevealLine>
        </h2>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.75] text-mute">{s.proof.intro}</p>
        </Reveal>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-neb/20 bg-space/60">
          <div className="scan-line-y" aria-hidden="true" />
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-faint">
              HTTP/2 200 · doxdesigns.dev
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neb">vercel.json</span>
          </div>
          <dl className="m-0">
            {s.proof.headers.map((h) => (
              <div key={h.name} className="cabecera grid gap-2 border-b border-white/5 px-6 py-4 last:border-b-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-8">
                <dt className="font-mono text-[12px] font-semibold tracking-[0.04em] text-neb">{h.name}</dt>
                <dd className="m-0 text-[13.5px] leading-[1.65] text-mute">{h.why}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
            <p className="font-mono text-[10px] leading-[1.6] tracking-[0.08em] uppercase text-faint">{s.proof.check}</p>
            <a href="/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className="link-flecha group">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              {s.proof.securityTxt}
              <span className="sr-only"> {t.a11y.newTab}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Qué lleva cada plan */}
      <section aria-labelledby="planes-seguridad-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">{s.plans.kicker}</div>
        </Reveal>
        <h2 id="planes-seguridad-titulo" className="display mt-3 text-[clamp(30px,5.2vw,58.5px)] leading-[0.96]">
          <RevealLine delay={0.06}>{s.plans.title}</RevealLine>
        </h2>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.75] text-mute">{s.plans.intro}</p>
        </Reveal>
        <ol className="m-0 mt-10 grid list-none gap-4 p-0 lg:grid-cols-3" role="list">
          {s.plans.tiers.map((tier, i) => (
            <li key={tier.name} className="h-full">
              <Reveal delay={0.08 + i * 0.07} className="h-full">
                <div className={`card card-hover h-full p-6${i === 2 ? " plan--destacado" : ""}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="display text-[clamp(21px,2.4vw,27px)] leading-[1]">{tier.name}</h3>
                    <span className="display text-[27px] leading-none text-white/10" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <ul className="mt-5 flex list-none flex-col gap-2 p-0" role="list">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-mute">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${i === 2 ? "text-cosmo" : "text-neb"}`}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <Link to={href("plans")} className="btn btn--ghost">
              {s.plans.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Cumplimiento */}
      <section aria-labelledby="cumplimiento-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="glow-quote relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60 p-8 md:p-10">
            <OrbitRings className="absolute -right-24 -top-24 h-[300px] w-[300px] opacity-40" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
              <div className="icon-plate icon-plate--xl shrink-0">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div>
                <div className="kicker">{s.compliance.kicker}</div>
                <h2 id="cumplimiento-titulo" className="display mt-3 text-[clamp(22.5px,3vw,33px)] leading-[1.05]">
                  {s.compliance.title}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[14.5px] leading-[1.7] text-mute">{s.compliance.text}</p>
                <p className="mt-3 max-w-[70ch] text-[13px] leading-[1.65] text-faint">
                  <Rich text={s.compliance.note} strong="text-mute" />
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-seguridad-titulo" className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <Reveal>
          <div className="kicker">{s.faq.kicker}</div>
        </Reveal>
        <h2 id="faq-seguridad-titulo" className="display mt-3 text-[clamp(33px,5.6vw,63px)] leading-[0.94]">
          <RevealLine delay={0.06}>{s.faq.title}</RevealLine>
        </h2>
        <Acordeon items={s.faq.items} idBase="faq-seguridad" className="mt-10 max-w-[820px]" />
      </section>

      {/* CTA final */}
      <section aria-labelledby="final-seguridad-titulo" className="mx-auto max-w-[1200px] px-6 pb-28 pt-8 md:px-8">
        <Reveal>
          <div className="glow-cta relative overflow-hidden rounded-2xl border border-white/10 bg-space/60 p-8 text-center md:p-14">
            <h2 id="final-seguridad-titulo" className="display text-[clamp(30px,4.7vw,52.5px)] leading-[0.98]">
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
              <Link to={`${href("plans")}#shield`} className="btn btn--ghost">
                {s.final.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
