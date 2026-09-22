import { TrendingUp } from "lucide-react";
import { Counter, Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { Rich, useT } from "@/i18n/LocaleContext";

/**
 * "Telemetría" — el informe mensual.
 *
 * Es la sección que sostiene a la de los planes: sin esto, el cliente paga el
 * mes dos sin saber qué compró y se va en el tres. El bloque enseña el
 * entregable recurrente ANTES de pedir la firma.
 *
 * Las métricas son las que él entiende —llamadas, formularios, cómo llegar—,
 * no posiciones de palabras clave. Los números cuentan hacia arriba al entrar
 * en pantalla: es un panel de datos y así se lee como uno.
 */
export function Telemetria({ kicker }: { kicker?: string }) {
  const t = useT();
  const m = t.telemetry;
  return (
    <section
      id={t.anchors.telemetry}
      aria-labelledby="telemetria-titulo"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pb-20 md:px-8 md:pb-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading id="telemetria-titulo" kicker={kicker ?? m.kicker} title={m.title}>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.7] text-mute">
              <Rich text={m.intro} />
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="tag tag--neb mt-6">
              <TrendingUp className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {m.badge}
            </div>
          </Reveal>
        </SectionHeading>

        <Reveal delay={0.16}>
          <div className="relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60">
            <div className="scan-line-y" aria-hidden="true" />

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-faint">
                {m.report}
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neb">{m.sample}</span>
            </div>

            <dl className="m-0 grid grid-cols-2 sm:grid-cols-3">
              {m.metrics.map((x, i) => (
                <div
                  key={x.k}
                  /* Los filetes se dibujan con la rejilla y no con `divide-*`:
                     al envolver a dos columnas en móvil, `divide-x` deja
                     cortes sueltos en el borde. */
                  className={`px-5 py-5 ${i % 2 === 0 ? "border-r border-white/10" : ""} sm:border-r sm:[&:nth-child(3n)]:border-r-0 ${
                    i < m.metrics.length - 2 ? "border-b border-white/10" : ""
                  }`}
                >
                  <dt className="font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-faint">
                    {x.k}
                  </dt>
                  <dd className="m-0 mt-2 flex items-baseline gap-2">
                    <span className="display text-[clamp(25.5px,3.2vw,34.5px)] leading-none tabular-nums text-ink">
                      <Counter value={x.value} />
                    </span>
                    {x.delta && (
                      <span className="font-mono text-[11px] font-semibold text-neb">{x.delta}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="border-t border-white/10 px-6 py-3.5 font-mono text-[9.5px] leading-[1.6] tracking-[0.1em] uppercase text-faint">
              {m.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
