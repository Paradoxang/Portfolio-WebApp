import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/lib/anim";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/data/site";

export function SelectedProjects() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker="02 — Trabajo seleccionado" title="Selected Projects" />
        <Reveal delay={0.15}>
          <Link
            to="/proyectos"
            className="group flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-neb transition-colors hover:text-ink"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
