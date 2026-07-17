import { Reveal } from "@/lib/anim";
import { OrbitRings } from "@/components/Cosmic";
import { quote, tools } from "@/data/site";

export function QuoteTools() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Cita destacada con glow magenta */}
        <Reveal>
          <blockquote className="card-flat glow-quote relative m-0 h-full overflow-hidden rounded-2xl p-8 md:p-10">
            <OrbitRings className="absolute -bottom-28 -right-16 h-[300px] w-[300px] opacity-50" />
            <div className="relative display text-[44px] leading-[0.6] text-neb">“</div>
            <p className="display mt-4 text-[clamp(22px,3vw,32px)] leading-[1.25]">
              {quote.text}
            </p>
            <footer className="mt-6 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-mute">
              — {quote.author}
            </footer>
          </blockquote>
        </Reveal>

        {/* Tools I use */}
        <Reveal delay={0.12}>
          <div className="card-flat h-full rounded-2xl p-8">
            <div className="kicker">04 — Herramientas · Tools I Use</div>
            <div className="mt-6 grid grid-cols-4 gap-2.5">
              {tools.map((t) => (
                <div
                  key={t}
                  className="flex aspect-square cursor-default items-center justify-center rounded-lg border border-white/10 bg-panel-hi/60 px-1 text-center font-mono text-[10px] font-medium text-faint transition-all duration-300 hover:-translate-y-1 hover:border-neb/50 hover:text-neb hover:shadow-[0_8px_20px_rgba(143,162,255,.2)]"
                >
                  {t}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12.5px] leading-[1.6] text-faint">
              Del backend en .NET al frontend en React/Angular, con SQL Server
              como base y Git en el flujo diario.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
