import { useRef } from "react";
import { PanStack, useHeroPan } from "@/components/heroPan";

/**
 * Comparativa temporal de las dos capas del hero: la fotografía arriba y el
 * astronauta debajo, paneando a la vez con un único cursor. Es una ayuda de
 * trabajo para juzgar si el personaje aguanta el paneo — no el diseño final.
 *
 * Un solo `useHeroPan` alimenta las dos pilas: mismo índice, mismo listener.
 * El ref envuelve ambas para que la decodificación espere a las 14 imágenes.
 */

const rows = [
  { set: "", label: "Capa 1 · Fotografía", alt: "Santiago Miranda", preload: true },
  { set: "astro", label: "Capa 2 · Astro", alt: "Astronauta", preload: false },
];

export function HeroComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const { mounted, current } = useHeroPan(ref);

  return (
    <div ref={ref} className="flex w-full min-w-0 flex-col gap-10">
      {rows.map((row) => (
        <div key={row.label} className="w-full">
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-faint">
            {row.label}
          </span>
          <div className="mt-3 flex w-full min-w-0 justify-center">
            <figure className="hero-fig hero-fig--par">
              <PanStack
                set={row.set}
                alt={row.alt}
                mounted={mounted}
                current={current}
                preload={row.preload}
              />
            </figure>
          </div>
        </div>
      ))}
    </div>
  );
}
