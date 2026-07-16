import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { process } from "@/data/site";

export function Process() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <SectionHeading kicker="03 — Cómo trabajo" title="Work Process" />
      <div className="relative mt-12">
        {/* Línea conectora (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[5px] hidden h-px bg-gradient-to-r from-neb/40 via-white/10 to-transparent md:block"
        />
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
          {process.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative">
                <div className="mb-5 hidden h-[11px] w-[11px] rounded-full border-2 border-neb bg-space md:block" />
                <div className="display text-[26px] text-neb">{step.num}</div>
                <div className="mt-2 text-[15px] font-bold text-ink">
                  {step.title}
                </div>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-faint">
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
