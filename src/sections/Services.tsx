import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/site";

export function Services() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <SectionHeading kicker="01 — Qué hago" title="What I Do" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="card card-hover h-full p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-neb/30 bg-neb/10">
                <s.icon className="h-4.5 w-4.5 text-neb" strokeWidth={1.6} />
              </div>
              <div className="mt-5 text-[16px] font-bold leading-snug text-ink">
                {s.title}
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-faint">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
