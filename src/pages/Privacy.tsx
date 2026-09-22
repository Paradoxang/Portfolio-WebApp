import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { Reveal, RevealLine } from "@/lib/anim";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { partirH1 } from "@/pages/Plans";

/**
 * `/privacidad` — la política de tratamiento de datos.
 *
 * Un sitio que vende "acompañamiento en la Ley 1581" y carga GA4 y el píxel de
 * Meta tiene que decir qué hace con los datos. Es texto, sin decoración de
 * más: aquí lo que cuenta es que se pueda leer y encontrar.
 */
export function Privacy() {
  const { t } = useLocale();
  const p = t.pages.privacy;
  const [antes, brillo] = partirH1(p.h1);

  return (
    <div className="pagina">
      <PaginaFx semilla={15} />

      <Seo route="privacy" title={p.seo.title} description={p.seo.description} />

      <section className="glow-hero relative overflow-hidden pt-32 pb-10">
        <div className="relative z-10 mx-auto max-w-[840px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">{p.kicker}</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(38px,7vw,88px)] leading-[0.9]">
            <RevealLine delay={0.08} mount>
              {antes}
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">{brillo}</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.22} mount>
            <p className="mt-5 font-mono text-[10.5px] tracking-[0.14em] uppercase text-faint">{p.updated}</p>
            <p className="mt-6 text-[15.5px] leading-[1.75] text-mute">{p.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[840px] px-6 pb-28 md:px-8">
        <div className="flex flex-col gap-10">
          {p.sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <article className="border-t border-white/10 pt-7">
                <h2 className="display text-[clamp(20px,2.4vw,27px)] leading-[1.1]">{s.title}</h2>
                {s.body.map((parrafo) => (
                  <p key={parrafo} className="mt-4 text-[14.5px] leading-[1.75] text-mute">
                    <Rich text={parrafo} />
                  </p>
                ))}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
