import { Languages, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { Reveal, RevealLine } from "@/lib/anim";
import { skillGroups, timeline, achievements, collage, contact } from "@/data/site";

export function About() {
  return (
    <>
      <Seo
        title="Sobre mí · Santiago Miranda | Dox Designs"
        description="Conoce a Santiago Miranda (Dox Designs): experiencia, habilidades y formación — React, Next.js, .NET, Angular y Electron. Desarrollador full-stack y diseñador web en Cali, Colombia."
        path="/sobre-mi"
      />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-16">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[8%] z-0 text-[clamp(100px,19vw,230px)] leading-[0.8]"
        >
          ABOUT
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal>
            <div className="kicker">Sobre mí — Full-stack · .NET / Angular</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(52px,9vw,110px)] leading-[0.86]">
            <RevealLine delay={0.08}>Sobre</RevealLine>
            <RevealLine delay={0.16}>
              <span className="text-transparent [-webkit-text-stroke:1.5px_#8fa2ff]">
                Mí
              </span>
            </RevealLine>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.22} className="lg:col-span-7">
              <p className="max-w-2xl text-[15.5px] leading-[1.75] text-mute">
                Soy{" "}
                <strong className="font-bold text-ink">
                  Santiago Alejandro Miranda Ortiz
                </strong>
                , Ingeniero en Informática centrado en el desarrollo de software
                y con especialización en Ciberseguridad. Construyo aplicaciones
                con <span className="text-neb">.NET 8</span>,{" "}
                <span className="text-neb">Angular 19</span> y{" "}
                <span className="text-neb">SQL Server</span>, con experiencia
                académica y personal en desarrollo web, bases de datos
                relacionales e integración de inteligencia artificial. Me defino
                por la adaptabilidad, la comunicación clara y el compromiso con
                la calidad.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="pill gap-2 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-mute">
                  <Languages className="h-3.5 w-3.5 text-neb" /> Inglés C1
                </span>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill gap-2 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-mute"
                >
                  Dox Desings
                </a>
                <span className="pill gap-2 px-4 py-2 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-mute">
                  {contact.location}
                </span>
              </div>
            </Reveal>

            {/* Collage editorial */}
            <Reveal delay={0.3} className="lg:col-span-5">
              <div className="grid grid-cols-3 items-start gap-3">
                {collage.map((f, i) => (
                  <div
                    key={f.src}
                    className={`photo-frame ${i === 1 ? "mt-6" : i === 2 ? "mt-12" : ""}`}
                    style={{ aspectRatio: f.ratio }}
                  >
                    <img
                      src={f.src}
                      alt="Santiago Miranda"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-8">
        <Reveal>
          <div className="kicker">01 — Habilidades técnicas</div>
        </Reveal>
        <h2 className="display mt-3 text-[clamp(34px,5.5vw,58px)] leading-[0.94]">
          <RevealLine delay={0.06}>Habilidades</RevealLine>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.06}>
              <div className="card card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-neb/30 bg-neb/10">
                    <g.icon className="h-4 w-4 text-neb" strokeWidth={1.6} />
                  </div>
                  <div className="text-[15px] font-bold text-ink">{g.label}</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-panel-hi/50 px-2.5 py-1 font-mono text-[10px] text-mute"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experiencia & educación */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-8">
        <Reveal>
          <div className="kicker">02 — Trayectoria</div>
        </Reveal>
        <h2 className="display mt-3 text-[clamp(34px,5.5vw,58px)] leading-[0.94]">
          <RevealLine delay={0.06}>Experiencia &amp; Educación</RevealLine>
        </h2>
        <div className="relative mt-12 flex flex-col gap-10 border-l border-white/10 pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="relative">
                <div className="absolute -left-[37px] top-1 h-[11px] w-[11px] rounded-full border-2 border-neb bg-space" />
                <div className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-neb">
                  {t.kind} · {t.period}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <t.icon className="h-4.5 w-4.5 text-mute" strokeWidth={1.6} />
                  <h3 className="m-0 text-[18px] font-bold text-ink">{t.title}</h3>
                </div>
                <div className="mt-1 text-[13.5px] text-faint">{t.place}</div>
                {t.points.length > 0 && (
                  <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
                    {t.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13.5px] leading-[1.6] text-mute"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neb" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Otros logros + CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-16 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <div className="card-flat h-full rounded-2xl p-8">
              <div className="kicker">03 — Otros logros</div>
              <ul className="mt-6 flex list-none flex-col gap-3 p-0">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-[14px] leading-[1.6] text-mute">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-neb" strokeWidth={1.6} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card-flat glow-quote flex h-full flex-col justify-between rounded-2xl p-8">
              <div>
                <div className="kicker">¿Trabajamos juntos?</div>
                <p className="display mt-4 text-[clamp(22px,3vw,30px)] leading-[1.15]">
                  Siempre abierto a nuevos proyectos y colaboraciones.
                </p>
              </div>
              <Link
                to="/#contacto"
                className="btn-neb mt-8 self-start px-6 py-3 text-[13px]"
              >
                Contacto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
