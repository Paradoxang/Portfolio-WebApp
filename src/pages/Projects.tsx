import { ArrowUpRight, FileText, Github, Target, User } from "lucide-react";
import { useRef } from "react";
import { Seo } from "@/components/seo";
import { PaginaFx } from "@/components/PaginaFx";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Reveal, RevealLine, scrollToTarget } from "@/lib/anim";
import { useStaggerReveal } from "@/lib/scroll";
import { projects, tipoIcons } from "@/data/site";
import { Rich, useLocale } from "@/i18n/LocaleContext";
import { projectsSchema } from "@/lib/schema";

/**
 * `/proyectos` — el muestrario completo.
 *
 * Un índice numerado arriba y los nueve casos debajo, cada uno con su
 * contexto, rol, stack y resultado. Las filas del índice son enlaces de
 * verdad al ancla del caso —antes eran `<tr onClick>`, invisibles para el
 * teclado— y el desplazamiento suave lo pone Lenis.
 */
export function Projects() {
  const { t, locale } = useLocale();
  const p = t.pages.projects;
  const casosRef = useRef<HTMLElement>(null);
  useStaggerReveal(casosRef, ".caso", { y: 32, each: 0.05, start: "top 92%" });

  const irA = (slug: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(slug);
    if (!el) return;
    e.preventDefault();
    history.replaceState(null, "", `#${slug}`);
    scrollToTarget(el);
  };

  return (
    <div className="pagina">
      <PaginaFx semilla={3} />

      <Seo
        route="projects"
        title={p.seo.title}
        description={p.seo.description}
        pageType="CollectionPage"
        jsonLd={projectsSchema(t, locale)}
      />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-14">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          {p.word}
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">
              {p.kicker} — {String(projects.length).padStart(2, "0")}
            </div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(50px,12.1vw,157.5px)] leading-[0.86]">
            <RevealLine delay={0.08} mount>
              <Rich text={p.h1} strong="text-shimmer" as="span" />
            </RevealLine>
          </h1>
          <Reveal delay={0.2} mount>
            <p className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.7] text-mute">{p.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Índice numerado */}
      <section aria-label={p.table.caption} className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">{p.table.caption}</caption>
              <thead>
                <tr className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-faint">
                  <th scope="col" className="border-b border-white/10 px-4 py-3">{p.table.num}</th>
                  <th scope="col" className="border-b border-white/10 px-4 py-3">{p.table.project}</th>
                  <th scope="col" className="border-b border-white/10 px-4 py-3">{p.table.type}</th>
                  <th scope="col" className="border-b border-white/10 px-4 py-3">{p.table.stack}</th>
                  <th scope="col" className="border-b border-white/10 px-4 py-3">{p.table.year}</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((pr, i) => {
                  const txt = p.items[pr.slug];
                  const TipoIcon = tipoIcons[pr.tipo];
                  const filete = i < projects.length - 1 ? "border-b border-white/5" : "";
                  return (
                    <tr key={pr.slug} className="group transition-colors hover:bg-neb/5">
                      <td className={`px-4 py-3.5 font-mono text-[12px] ${pr.featured ? "text-neb" : "text-faint"} ${filete}`}>
                        {pr.num}
                      </td>
                      <td className={`px-4 py-3.5 text-[14px] font-bold text-ink ${filete}`}>
                        <a
                          href={`#${pr.slug}`}
                          onClick={irA(pr.slug)}
                          className="inline-flex min-h-[44px] items-center transition-colors group-hover:text-neb focus-visible:text-neb"
                        >
                          {txt.name}
                          {pr.featured && (
                            <span className="ml-2 text-neb" title={p.table.featured}>
                              ★<span className="sr-only"> {p.table.featured}</span>
                            </span>
                          )}
                        </a>
                      </td>
                      <td className={`px-4 py-3.5 text-[13px] text-mute ${filete}`}>
                        <span className="flex items-center gap-2">
                          <TipoIcon className="h-3.5 w-3.5 text-neb" strokeWidth={1.6} aria-hidden="true" />
                          {p.types[pr.tipo]}
                        </span>
                      </td>
                      <td className={`px-4 py-3.5 font-mono text-[11px] text-faint ${filete}`}>
                        {pr.stack.slice(0, 3).join(" · ")}
                      </td>
                      <td className={`px-4 py-3.5 font-mono text-[11px] text-faint ${filete}`}>{pr.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Casos */}
      <section ref={casosRef} aria-label={p.kicker} className="mx-auto max-w-[1200px] px-6 pb-28 pt-20 md:px-8">
        <div className="flex flex-col gap-20">
          {projects.map((pr) => {
            const txt = p.items[pr.slug];
            return (
              <article
                key={pr.slug}
                id={pr.slug}
                aria-labelledby={`caso-${pr.slug}`}
                className="caso scroll-mt-28 border-t border-white/10 pt-14"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="display text-[clamp(36px,4.7vw,52.5px)] text-neb" aria-hidden="true">
                        {pr.num}
                      </span>
                      <div>
                        <h2 id={`caso-${pr.slug}`} className="display text-[clamp(24px,3.3vw,37.5px)] leading-[0.95]">
                          {txt.name}
                        </h2>
                        <div className="mt-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-faint">
                          {p.types[pr.tipo]} · {txt.tag} · {pr.year}
                        </div>
                      </div>
                    </div>

                    <dl className="mt-8 flex flex-col gap-5">
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <FileText className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                          {p.labels.context}
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">{txt.desc}</dd>
                      </div>
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <User className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                          {p.labels.role}
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">{txt.role}</dd>
                      </div>
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <Target className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                          {p.labels.result}
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">{txt.result}</dd>
                      </div>
                    </dl>

                    <ul className="mt-7 flex list-none flex-wrap gap-2 p-0" role="list" aria-label={p.table.stack}>
                      {pr.stack.map((s) => (
                        <li key={s} className="tag">
                          {s}
                        </li>
                      ))}
                    </ul>

                    {(pr.demo || pr.link) && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {pr.demo && (
                          <a href={pr.demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                            {p.labels.demo} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only"> {t.a11y.newTab}</span>
                          </a>
                        )}
                        {pr.link && (
                          <a href={pr.link} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                            <Github className="h-4 w-4 text-neb" aria-hidden="true" /> {p.labels.code}
                            <span className="sr-only"> {t.a11y.newTab}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Cover */}
                  <div
                    className={`project-cover shine-hover relative flex items-center justify-center overflow-hidden rounded-2xl lg:sticky lg:top-28 ${
                      pr.preview ? "" : "aspect-[4/3]"
                    }`}
                    style={pr.preview ? { aspectRatio: pr.previewAspect ?? "1896/888" } : undefined}
                  >
                    {pr.preview ? (
                      <div className="absolute inset-0">
                        <ProjectPreview preview={pr.preview} alt={p.labels.teaserAlt(txt.name)} />
                      </div>
                    ) : (
                      <span className="display text-[clamp(44px,8.4vw,102px)] text-neb/22" aria-hidden="true">
                        {pr.mark}
                      </span>
                    )}
                    <div className="absolute left-5 top-5 rounded-full bg-space/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-mute backdrop-blur-sm">
                      {p.types[pr.tipo]}
                    </div>
                    <div className="absolute bottom-5 right-5 rounded-full bg-space/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-mute backdrop-blur-sm">
                      {pr.year}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
