import { Counter, Reveal } from "@/lib/anim";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 md:px-8">
      <Reveal>
        <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group px-4 text-center sm:px-8 sm:text-left"
            >
              <div className="mb-3 flex justify-center sm:justify-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-neb/30 bg-neb/10 transition-all duration-300 group-hover:scale-110 group-hover:border-neb/60 group-hover:bg-neb/20">
                  <s.icon className="h-4 w-4 text-neb" strokeWidth={1.6} />
                </div>
              </div>
              <div className="display text-[clamp(44px,7vw,84px)] leading-none text-neb">
                {"display" in s ? (
                  s.display
                ) : (
                  <Counter to={s.value} suffix={s.suffix} />
                )}
              </div>
              <div className="mt-2 font-mono text-[10px] font-medium leading-[1.5] tracking-[0.14em] uppercase text-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
