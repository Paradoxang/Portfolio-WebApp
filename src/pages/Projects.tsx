import {
  ArrowUpRight,
  Bot,
  FileText,
  Github,
  Globe,
  LayoutTemplate,
  Monitor,
  Server,
  Target,
  User,
  type LucideIcon,
} from "lucide-react";
import { Seo } from "@/components/seo";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Reveal, RevealLine, scrollToTarget } from "@/lib/anim";
import { projects } from "@/data/site";

const tipoIcons: Record<string, LucideIcon> = {
  Frontend: LayoutTemplate,
  "Full-stack": Server,
  Web: Globe,
  Desktop: Monitor,
  "Chat-bot": Bot,
};

export function Projects() {
  return (
    <>
      <Seo
        title="Proyectos · Santiago Miranda | Dox Designs"
        description="Casos de estudio de Santiago Miranda (Dox Designs): Aurora Video Hero, Hotel Marea, CRUD Clientes, Vitalis, Automatizador y más — React, Next.js, .NET, Angular y Electron."
        path="/proyectos"
      />

      {/* Header */}
      <section className="glow-hero relative overflow-hidden pt-32 pb-14">
        <div
          aria-hidden="true"
          className="outline-word absolute left-[-2%] top-[6%] z-0 text-[clamp(110px,22vw,290px)] leading-[0.8]"
        >
          PROJECTS
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal mount>
            <div className="kicker">Proyectos — {String(projects.length).padStart(2, "0")}</div>
          </Reveal>
          <h1 className="display mt-4 text-[clamp(64px,13vw,170px)] leading-[0.86]">
            <RevealLine delay={0.08} mount>
              Proyec<span className="text-shimmer">tos</span>
            </RevealLine>
          </h1>
          <Reveal delay={0.2} mount>
            <p className="mt-6 max-w-[62ch] text-[15.5px] leading-[1.7] text-mute">
              Académicos y personales: cada caso con su contexto, mi rol, el
              stack y el resultado. Los que tienen demo en vivo están
              desplegados en Vercel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Índice numerado */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-faint">
                  <th className="border-b border-white/10 px-4 py-3">#</th>
                  <th className="border-b border-white/10 px-4 py-3">Proyecto</th>
                  <th className="border-b border-white/10 px-4 py-3">Tipo</th>
                  <th className="border-b border-white/10 px-4 py-3">Stack</th>
                  <th className="border-b border-white/10 px-4 py-3">Año</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr
                    key={p.slug}
                    className="group cursor-pointer transition-colors hover:bg-neb/5"
                    onClick={() => {
                      const el = document.getElementById(p.slug);
                      if (el) scrollToTarget(el);
                    }}
                  >
                    <td
                      className={`px-4 py-3.5 font-mono text-[12px] ${
                        p.featured ? "text-neb" : "text-faint"
                      } ${i < projects.length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      {p.num}
                    </td>
                    <td
                      className={`px-4 py-3.5 text-[14px] font-bold text-ink transition-colors group-hover:text-neb ${
                        i < projects.length - 1 ? "border-b border-white/5" : ""
                      }`}
                    >
                      {p.name}
                      {p.featured && <span className="ml-2 text-neb">★</span>}
                    </td>
                    <td
                      className={`px-4 py-3.5 text-[13px] text-mute ${
                        i < projects.length - 1 ? "border-b border-white/5" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {(() => {
                          const TipoIcon = tipoIcons[p.tipo] ?? Globe;
                          return (
                            <TipoIcon
                              className="h-3.5 w-3.5 text-neb"
                              strokeWidth={1.6}
                            />
                          );
                        })()}
                        {p.tipo}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3.5 font-mono text-[11px] text-faint ${
                        i < projects.length - 1 ? "border-b border-white/5" : ""
                      }`}
                    >
                      {p.stack.slice(0, 3).join(" · ")}
                    </td>
                    <td
                      className={`px-4 py-3.5 font-mono text-[11px] text-faint ${
                        i < projects.length - 1 ? "border-b border-white/5" : ""
                      }`}
                    >
                      {p.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Casos */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-20 md:px-8">
        <div className="flex flex-col gap-20">
          {projects.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 border-t border-white/10 pt-14"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
                <div>
                  <Reveal>
                    <div className="flex items-baseline gap-4">
                      <span className="display text-[clamp(38px,5vw,56px)] text-neb">
                        {p.num}
                      </span>
                      <div>
                        <h2 className="display text-[clamp(26px,3.6vw,40px)] leading-[0.95]">
                          {p.name}
                        </h2>
                        <div className="mt-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-faint">
                          {p.tipo} · {p.tag} · {p.year}
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <dl className="mt-8 flex flex-col gap-5">
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
                          Contexto
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">
                          {p.desc}
                        </dd>
                      </div>
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <User className="h-3.5 w-3.5" strokeWidth={1.6} />
                          Rol
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">
                          {p.rol}
                        </dd>
                      </div>
                      <div>
                        <dt className="kicker flex items-center gap-2 !text-[10px]">
                          <Target className="h-3.5 w-3.5" strokeWidth={1.6} />
                          Resultado
                        </dt>
                        <dd className="mt-2 ml-0 text-[14.5px] leading-[1.7] text-mute">
                          {p.resultado}
                        </dd>
                      </div>
                    </dl>
                  </Reveal>

                  <Reveal delay={0.14}>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/12 bg-panel/70 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.06em] uppercase text-mute"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Reveal>

                  {(p.demo || p.link) && (
                    <Reveal delay={0.2}>
                      <div className="mt-8 flex flex-wrap gap-3">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-neb px-6 py-3 text-[13px]"
                          >
                            Demo en vivo <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pill px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-mute"
                          >
                            <Github className="h-4 w-4 text-neb" /> Código
                          </a>
                        )}
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Cover */}
                <Reveal delay={0.12}>
                  <div
                    className={`project-cover shine-hover relative flex items-center justify-center overflow-hidden rounded-2xl lg:sticky lg:top-28 ${
                      p.preview ? "aspect-[1896/888]" : "aspect-[4/3]"
                    }`}
                  >
                    {p.preview ? (
                      <div className="absolute inset-0">
                        <ProjectPreview
                          preview={p.preview}
                          alt={`Teaser de ${p.name}`}
                        />
                      </div>
                    ) : (
                      <span className="display text-[clamp(64px,9vw,110px)] text-neb/22">
                        {p.mark}
                      </span>
                    )}
                    <div className="absolute left-5 top-5 rounded-full bg-space/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-mute backdrop-blur-sm">
                      {p.tipo}
                    </div>
                    <div className="absolute bottom-5 right-5 rounded-full bg-space/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-mute backdrop-blur-sm">
                      {p.year}
                    </div>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
