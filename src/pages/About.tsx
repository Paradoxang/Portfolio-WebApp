import { Languages, Award, ArrowRight, Github } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { Reveal, RevealLine } from "@/lib/anim";
import { useParallax, useStaggerReveal } from "@/lib/scroll";
import { Constellation, GlowOrb } from "@/components/Cosmic";
import { skillGroups, timeline, collage, contact } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { partirH1 } from "@/pages/Plans";

/**
 * `/sobre-mi` — quién firma.
 *
 * Es la página que sostiene la credibilidad de todo lo demás: la
 * especialización en Ciberseguridad que justifica el plan Blindaje vive aquí.
 * El texto presenta la oferta actual —webs a medida sostenidas cada mes— y no
 * la anterior de "desarrollador .NET/Angular", que era la que se vendía antes
 * del pivote y ya no cuadraba con la portada.
 *
 * El párrafo `summary` va en el HTML aunque no se vea grande: es la frase que
 * un buscador o una IA puede citar tal cual —quién, qué, dónde—.
 */
export function About() {
  const { t, href } = useLocale();
  const a = t.pages.about;
  const [antes, brillo] = partirH1(a.h1);
  const collageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  useParallax(collageRef, ".photo-frame", { distancia: 22 });
  useStaggerReveal(skillsRef, ".skill");

  return (
    <div className="pagina">
      <PaginaFx semilla={6} />

      <Seo route="about" title={a.seo.title} description={a.seo.description} pageType="AboutPage" />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-16">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(130px,25vw,320px)] leading-[0.8]"
        >
          {a.word}
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">{a.kicker}</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(50px,12.1vw,157.5px)] leading-[0.86]">
            <RevealLine delay={0.08} mount>
              {antes}
            </RevealLine>
            <RevealLine delay={0.16} mount>
              <span className="text-shimmer">{brillo}</span>
            </RevealLine>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.22} mount className="lg:col-span-7">
              <p className="max-w-2xl text-[15.5px] leading-[1.75] text-mute">
                <Rich text={a.bio} />
              </p>
              <p className="mt-4 max-w-2xl border-l-2 border-neb/40 pl-4 text-[13.5px] leading-[1.7] text-faint">
                {a.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="tag tag--lg">
                  <Languages className="h-3.5 w-3.5 text-neb" aria-hidden="true" /> {a.pills.english}
                </span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="tag tag--lg tag--link">
                  <Github className="h-3.5 w-3.5 text-neb" aria-hidden="true" />
                  {a.pills.github} · {contact.githubHandle}
                  <span className="sr-only"> {t.a11y.newTab}</span>
                </a>
                <span className="tag tag--lg">{t.contact.location}</span>
              </div>
            </Reveal>

            {/* Collage editorial: las tres fotos se deslizan a distinta
                velocidad con el scroll. */}
            <Reveal delay={0.3} className="relative lg:col-span-5">
              <div ref={collageRef} className="relative">
                <GlowOrb className="absolute -right-16 -top-16 h-64 w-64" color="#8fa2ff" />
                <div className="relative grid grid-cols-3 gap-3">
                  {collage.map((f, i) => (
                    <div key={f.src} className="photo-frame aspect-[3/4]">
                      <img
                        src={f.src}
                        alt={a.photoAlt(i)}
                        loading="lazy"
                        decoding="async"
                        width={950}
                        height={Math.round(950 * (4 / 3))}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section ref={skillsRef} aria-labelledby="habilidades-titulo" className="mx-auto max-w-[1200px] px-6 py-16 md:px-8">
        <Reveal>
          <div className="kicker">{a.skills.kicker}</div>
        </Reveal>
        <h2 id="habilidades-titulo" className="display mt-3 text-[clamp(39px,6.5vw,75px)] leading-[0.94]">
          <RevealLine delay={0.06}>{a.skills.title}</RevealLine>
        </h2>
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {skillGroups.map((g) => {
            const grupo = a.skills.groups[g.id];
            return (
              <li key={g.id} className="skill h-full">
                <div className="card card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <div className="icon-plate icon-plate--sm">
                      <g.icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 className="text-[15px] font-bold text-ink">{grupo.label}</h3>
                  </div>
                  <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0" role="list">
                    {grupo.items.map((item) => (
                      <li key={item} className="tag tag--sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Experiencia & educación */}
      <section aria-labelledby="trayectoria-titulo" className="relative mx-auto max-w-[1200px] px-6 py-16 md:px-8">
        <Constellation className="absolute right-6 top-10 hidden h-[180px] w-[240px] opacity-70 md:block" />
        <Reveal>
          <div className="kicker">{a.timeline.kicker}</div>
        </Reveal>
        <h2 id="trayectoria-titulo" className="display mt-3 text-[clamp(39px,6.5vw,75px)] leading-[0.94]">
          <RevealLine delay={0.06}>{a.timeline.title}</RevealLine>
        </h2>
        <ol className="relative m-0 mt-12 flex list-none flex-col gap-10 border-l border-white/10 p-0 pl-8" role="list">
          {timeline.map((x, i) => {
            const it = a.timeline.items[x.id];
            return (
              <li key={x.id}>
                <Reveal delay={i * 0.08}>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 h-[11px] w-[11px] rounded-full border-2 border-neb bg-space" aria-hidden="true" />
                    <div className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-neb">
                      {it.kind} · {it.period}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <x.icon className="h-4.5 w-4.5 text-mute" strokeWidth={1.6} aria-hidden="true" />
                      <h3 className="m-0 text-[18px] font-bold text-ink">{it.title}</h3>
                    </div>
                    <div className="mt-1 text-[13.5px] text-faint">{it.place}</div>
                    {it.points.length > 0 && (
                      <ul className="mt-3 flex list-none flex-col gap-1.5 p-0" role="list">
                        {it.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-mute">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neb" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Otros logros + CTA */}
      <section aria-labelledby="logros-titulo" className="mx-auto max-w-[1200px] px-6 pb-28 pt-16 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <div className="card-flat h-full p-8">
              <h2 id="logros-titulo" className="kicker">
                {a.achievements.kicker}
              </h2>
              <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0" role="list">
                {a.achievements.items.map((x) => (
                  <li key={x} className="flex gap-3 text-[14px] leading-[1.6] text-mute">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-neb" strokeWidth={1.6} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card-flat glow-quote flex h-full flex-col justify-between p-8">
              <div>
                <div className="kicker">{a.together.kicker}</div>
                <p className="display mt-4 text-[clamp(21px,2.8vw,28.5px)] leading-[1.15]">{a.together.text}</p>
              </div>
              <Link to={href("contact")} className="btn btn--primary btn--sm mt-8 self-start">
                {a.together.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
