import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { Reveal, RevealLine } from "@/lib/anim";
import { Planes } from "@/sections/Planes";
import { Telemetria } from "@/sections/Telemetria";
import { Objeciones } from "@/sections/Objeciones";
import { Cta } from "@/sections/Cta";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { faqPage, plansSchema } from "@/lib/schema";

/**
 * `/planes` — la oferta con su propia página.
 *
 * Los tres bloques comerciales son los mismos componentes que monta la
 * portada, no una copia: si mañana cambia un precio o una respuesta, cambia en
 * los dos sitios a la vez. Lo único que se les pasa distinto es el kicker — la
 * numeración 02/03/06 pertenece a la secuencia de la portada y aquí no
 * significa nada.
 */
export function Plans() {
  const { t, locale } = useLocale();
  const p = t.pages.plans;
  const [antes, brillo] = partirH1(p.h1);
  return (
    <div className="pagina">
      <PaginaFx semilla={12} />

      <Seo
        route="plans"
        title={p.seo.title}
        description={p.seo.description}
        jsonLd={[plansSchema(t, locale), faqPage(t.faq.items)]}
      />

      {/* Misma cabecera que servicios y proyectos: palabra gigante de fondo,
          kicker y titular a dos líneas. Es lo que hace que las páginas se lean
          como del mismo sitio. */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-14">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          {p.word}
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">{p.kicker}</div>
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
              <Rich text={p.intro} />
            </p>
          </Reveal>
        </div>
      </section>

      <Planes kicker={p.plansKicker} titulo={p.plansTitle} />
      <Telemetria kicker={p.telemetryKicker} />
      <Objeciones kicker={p.faqKicker} />
      <Cta />
    </div>
  );
}

/** "Elige tu **órbita**" → ["Elige tu", "órbita"]. */
export function partirH1(texto: string): [string, string] {
  const m = texto.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  return m ? [m[1].trim(), m[2] + m[3]] : [texto, ""];
}
