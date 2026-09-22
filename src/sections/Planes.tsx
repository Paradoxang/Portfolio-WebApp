import { Check, ArrowRight, Rocket } from "lucide-react";
import { useRef } from "react";
import { Magnetic, Reveal } from "@/lib/anim";
import { useParallax } from "@/lib/scroll";
import { SectionHeading } from "@/components/SectionHeading";
import { OrbitRings } from "@/components/Cosmic";
import { trackContact } from "@/lib/analytics";
import { planes } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";

/**
 * "Planes de vuelo" — el bloque que cobra.
 *
 * Se deja de vender el proyecto y se pasa a vender la cuota. El número en
 * pantalla filtra a quien no puede pagarlo antes de gastar una hora
 * cotizándole, y cambia la conversación de "cuánto me cobras" a "cuál me
 * sirve".
 *
 * ── El del medio ──
 * Lleva `destacado` y es el que se quiere vender: borde de nebulosa, fondo
 * `panel-hi` y las órbitas por detrás. Las órbitas van dentro de la tarjeta y
 * no en la sección para que el realce siga a la tarjeta si cambia el orden.
 *
 * ── Cada botón dice qué plan ──
 * Los tres CTAs llevaban al mismo WhatsApp con el mismo "me interesa un
 * proyecto": quien elegía Blindaje llegaba diciendo lo mismo que quien no
 * había elegido nada. Ahora el mensaje nombra el plan y el evento de
 * analítica también.
 */
export function Planes({ kicker, titulo }: { kicker?: string; titulo?: string }) {
  const { t, whatsapp } = useLocale();
  const ref = useRef<HTMLElement>(null);
  // Las órbitas decorativas se deslizan con el scroll; el texto no.
  useParallax(ref, ".plan__orbitas", { distancia: 28 });

  return (
    <section
      ref={ref}
      id={t.anchors.plans}
      aria-labelledby="planes-titulo"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 py-20 md:px-8 md:py-28"
    >
      <SectionHeading id="planes-titulo" kicker={kicker ?? t.plans.kicker} title={titulo ?? t.plans.title}>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.7] text-mute">{t.plans.intro}</p>
        </Reveal>
      </SectionHeading>

      <ul className="mt-12 grid list-none items-start gap-5 p-0 lg:grid-cols-3" role="list">
        {planes.map((p, i) => {
          const plan = t.plans.items[p.id];
          return (
            <li key={p.id} className="h-full">
              <Reveal delay={0.1 + i * 0.09} className="h-full">
                <article
                  id={p.id}
                  aria-label={p.destacado ? `${plan.name} — ${t.plans.featuredAria}` : plan.name}
                  className={`card card-hover shine-hover group relative h-full overflow-hidden p-7 md:p-8${
                    p.destacado ? " plan--destacado" : ""
                  }`}
                >
                  {/* Solo en el destacado, y por detrás de todo su contenido. */}
                  {p.destacado && (
                    <OrbitRings
                      className="plan__orbitas pointer-events-none absolute -right-20 -top-24 h-[280px] w-[280px] opacity-30"
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative">
                    <div className={`kicker !text-[10px] ${p.destacado ? "!text-cosmo" : ""}`}>{plan.label}</div>

                    <h3 className="display mt-4 text-[clamp(27px,3.4vw,37.5px)] leading-[1]">{plan.name}</h3>

                    <p className="mt-3 text-[13.5px] leading-[1.6] text-faint">{plan.who}</p>

                    {/* La moneda va delante y pequeña, y la cifra manda.
                        `tabular-nums` para que los tres precios alineen sus
                        dígitos en la comparación, que es lo que hace el bloque. */}
                    <div className="mt-6 border-y border-white/10 py-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-faint">
                          {t.plans.currency}
                        </span>
                        <span className="display text-[clamp(27px,3.1vw,37.5px)] leading-none tabular-nums text-ink">
                          {plan.price}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-[10.5px] tracking-[0.12em] uppercase text-faint">
                        {plan.period}
                      </div>
                    </div>

                    <ul className="mt-6 flex list-none flex-col gap-2.5 p-0" role="list">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-mute">
                          <Check
                            className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${p.destacado ? "text-cosmo" : "text-neb"}`}
                            strokeWidth={2.4}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={whatsapp(plan.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact("whatsapp", { plan: plan.name })}
                      className={`btn btn--sm mt-8 w-full ${p.destacado ? "btn--accent" : "btn--ghost"}`}
                    >
                      {t.plans.cta(plan.name)}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* ── Programa fundador ──
          El puente honesto entre "no tengo clientes" y "tengo cifras". Va
          debajo y no encima a propósito: primero se ve el precio normal, para
          que el cupo se lea como una oportunidad y no como que el trabajo vale
          menos. Los tres cupos van dibujados como indicador —el idioma del
          sitio— y dicen literalmente lo que el kicker promete. */}
      <Reveal delay={0.2}>
        <aside
          aria-labelledby="fundador-titulo"
          className="fundador relative mt-6 overflow-hidden rounded-2xl border border-cosmo/25 p-6 md:p-8"
        >
          <OrbitRings
            className="plan__orbitas pointer-events-none absolute -left-24 -bottom-32 h-[300px] w-[300px] opacity-[0.22]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="icon-plate icon-plate--cosmo icon-plate--lg">
              <Rocket className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 id="fundador-titulo" className="kicker !text-cosmo">
                {t.plans.founder.kicker}
              </h3>
              <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.7] text-mute">
                <Rich text={t.plans.founder.text} strong="text-ink" />
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
              <div className="flex items-center gap-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="fundador__cupo" />
                  <span className="fundador__cupo" />
                  <span className="fundador__cupo" />
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-faint">
                  {t.plans.founder.slots}
                </span>
              </div>
              <Magnetic>
                <a
                  href={whatsapp(t.plans.founder.kicker)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp", { plan: "founder" })}
                  className="btn btn--accent btn--sm"
                >
                  {t.plans.founder.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
