import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/site";

/**
 * Miniatura de proyecto: cover estilizada navy con monograma,
 * numeración Anton y overlay al hover que revela el stack + flecha.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/proyectos#${project.slug}`}
      className="group block"
      aria-label={`Ver caso: ${project.name}`}
    >
      <div className="project-cover shine-hover relative aspect-[4/3] overflow-hidden rounded-xl">
        {/* Monograma */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
          <span className="display text-[clamp(48px,7vw,84px)] text-neb/25 transition-colors duration-400 group-hover:text-neb/40">
            {project.mark}
          </span>
        </div>
        <div className="absolute left-4 top-4 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-faint">
          {project.tipo} · {project.year}
        </div>

        {/* Overlay hover: stack + flecha */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-space/95 via-space/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-neb/30 bg-neb/10 px-2.5 py-1 font-mono text-[9px] font-medium tracking-[0.08em] uppercase text-neb"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-neb text-space opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="display text-[26px] text-neb">{project.num}</span>
        <div>
          <div className="text-[15px] font-bold text-ink transition-colors group-hover:text-neb">
            {project.name}
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-faint">
            {project.tag}
          </div>
        </div>
      </div>
    </Link>
  );
}
