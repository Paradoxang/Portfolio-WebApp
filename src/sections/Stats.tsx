import { Counter, Reveal } from "@/lib/anim";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 md:px-8">
      <Reveal>
        <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-10">
          {stats.map((s) => (
            <div key={s.label} className="px-4 text-center sm:px-8 sm:text-left">
              <div className="display text-[clamp(34px,5vw,52px)] leading-none text-neb">
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
