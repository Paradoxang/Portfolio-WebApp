import { motion } from "framer-motion";
import { Atom, Braces, Palette, Zap } from "lucide-react";
import { useRef, type RefObject } from "react";
import { PanStack, useHeroPan } from "@/components/heroPan";
import { EASE, SSR } from "@/lib/anim";

const chips = [
  { icon: Atom, label: "React", pos: "top-[6%] -left-[9%] max-lg:left-0", delay: "0s" },
  { icon: Braces, label: ".NET", pos: "top-[24%] -right-[9%] max-lg:right-0", delay: "-1.6s" },
  { icon: Palette, label: "UI/UX", pos: "top-[54%] -left-[12%] max-lg:left-0", delay: "-3.2s" },
  { icon: Zap, label: "Next.js", pos: "top-[70%] -right-[7%] max-lg:right-0", delay: "-4.8s" },
];

interface HeroPortraitProps {
  /** Modo aislado de la Hero: figura sola, centrada y más grande, sin chips. */
  solo?: boolean;
  /** La Hero lo usa para anclar el campo de partículas sobre el rostro. */
  figureRef?: RefObject<HTMLElement>;
}

/** Retrato del hero en la maqueta completa: una sola capa, con chips alrededor. */
export function HeroPortrait({ solo = false, figureRef }: HeroPortraitProps) {
  const propio = useRef<HTMLElement>(null);
  const figRef = figureRef ?? propio;
  const { mounted, current } = useHeroPan(figRef);

  return (
    <figure ref={figRef} className={`hero-fig${solo ? " hero-fig--solo" : ""}`}>
      {/* La máscara vive dentro de la pila; los chips quedan fuera a propósito. */}
      <PanStack alt="Santiago Miranda" mounted={mounted} current={current} preload />

      {/* Chips de tecnología — fuera del stack para que la máscara no los corte. */}
      {!solo &&
        chips.map((c, i) => (
          <motion.div
            key={c.label}
            initial={SSR ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: EASE }}
            className={`absolute z-30 ${c.pos}`}
          >
            <div className="float-y" style={{ animationDelay: c.delay }}>
              <span className="pill gap-2 border-white/20 bg-space/80 px-3.5 py-2 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-mute shadow-[0_8px_26px_rgba(0,0,0,.45)] backdrop-blur-sm">
                <c.icon className="h-3.5 w-3.5 text-neb" strokeWidth={1.8} />
                {c.label}
              </span>
            </div>
          </motion.div>
        ))}
    </figure>
  );
}
