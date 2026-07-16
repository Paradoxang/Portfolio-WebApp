import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { process } from "@/data/site";

export function Process() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <SectionHeading kicker="03 — Cómo trabajo" title="Work Process" />
      <div className="relative mt-12">
        {/* Línea conectora que cruza los iconos (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-[24px] right-[24px] top-[24px] hidden h-px bg-gradient-to-r from-neb/50 via-neb/20 to-transparent md:block"
        />
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
          {process.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="group relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neb/30 bg-neb/10 transition-colors duration-300 group-hover:border-neb/60 group-hover:bg-neb/20">
                    <step.icon className="h-5 w-5 text-neb" strokeWidth={1.6} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-space font-mono text-[9px] font-semibold text-neb ring-1 ring-neb/40">
                      {step.num}
                    </span>
                  </div>
                  <div className="display text-[22px] leading-none text-ink md:mt-1">
                    {step.title}
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-faint">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
