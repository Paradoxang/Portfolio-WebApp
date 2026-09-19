import { TrendingUp } from "lucide-react";
import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { telemetria } from "@/data/site";

/**
 * "Telemetría" — el informe mensual.
 *
 * La segunda sección nueva, y la que sostiene a la anterior: sin esto, el
 * cliente paga el mes dos sin saber qué compró y se va en el tres. El bloque
 * enseña el entregable recurrente ANTES de pedir la firma.
 *
 * ── Las métricas son las que él entiende ──
 * Llamadas, formularios, "cómo llegar", citas. No posiciones de palabras clave
 * ni impresiones: eso es vocabulario de agencia y no se parece a nada que el
 * dueño de un negocio reconozca como un cliente.
 *
 * ── Por qué encaja sin assets nuevos ──
 * El lenguaje visual ya estaba inventado en esta casa: la tira de datos del
 * hero y la línea de escaneo de "Security First" son exactamente esto. Aquí
 * solo se usa para decir algo que le importa a quien paga.
 * `scan-line-y` se para sola en modo ligero y con movimiento reducido, porque
 * ya está en la lista del bloque `[data-perf="low"]`.
 */
export function Telemetria({ kicker = "03 — Telemetría" }: { kicker?: string }) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-8 md:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading kicker={kicker} title="Qué recibes">
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.7] text-mute">
              Un reporte con las cifras que de verdad importan:{" "}
              <strong className="font-bold text-ink">cuánta gente te llamó</strong>,
              cuánta escribió y cuánta buscó cómo llegar. Sin jerga y sin
              capturas de paneles que no dicen nada.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-neb/30 bg-neb/10 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-neb">
              <TrendingUp className="h-4 w-4" strokeWidth={1.8} />
              Comparado contra el mes anterior
            </div>
          </Reveal>
        </SectionHeading>

        <Reveal delay={0.16}>
          <div className="relative overflow-hidden rounded-2xl border border-neb/20 bg-space/60">
            <div className="scan-line-y" />

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-faint">
                Reporte de misión
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-neb">
                Muestra
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3">
              {telemetria.map((m, i) => (
                <div
                  key={m.k}
                  /* Los filetes se dibujan con la rejilla y no con `divide-*`:
                     al envolver a dos columnas en móvil, `divide-x` deja
                     cortes sueltos en el borde. */
                  className={`px-5 py-5 ${i % 2 === 0 ? "border-r border-white/10" : ""} sm:border-r sm:[&:nth-child(3n)]:border-r-0 ${
                    i < telemetria.length - 2 ? "border-b border-white/10" : ""
                  }`}
                >
                  <div className="font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-faint">
                    {m.k}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="display text-[clamp(25.5px,3.2vw,34.5px)] leading-none tabular-nums text-ink">
                      {m.valor}
                    </span>
                    {m.delta && (
                      <span className="font-mono text-[11px] font-semibold text-neb">
                        {m.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="border-t border-white/10 px-6 py-3.5 font-mono text-[9.5px] leading-[1.6] tracking-[0.1em] uppercase text-faint">
              Cifras de ejemplo · tu reporte lleva tus propios datos
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
