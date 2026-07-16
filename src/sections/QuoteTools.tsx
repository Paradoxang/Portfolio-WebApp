import { Reveal } from "@/lib/anim";
import { quote, tools } from "@/data/site";

export function QuoteTools() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Cita destacada con glow magenta */}
        <Reveal>
          <blockquote className="card-flat glow-quote relative m-0 h-full rounded-2xl p-8 md:p-10">
            <div className="display text-[44px] leading-[0.6] text-neb">“</div>
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
                  className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-panel-hi/60 px-1 text-center font-mono text-[10px] font-medium text-faint transition-colors duration-300 hover:border-neb/40 hover:text-neb"
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
