import { Reveal, RevealLine } from "@/lib/anim";
import type { ReactNode } from "react";

/**
 * Encabezado de sección: kicker mono numerado + H2 Anton uppercase.
 */
export function SectionHeading({
  kicker,
  title,
  children,
}: {
  /** Opcional: hay secciones donde el titular va solo. */
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div>
      {kicker && (
        <Reveal>
          <div className="kicker">{kicker}</div>
        </Reveal>
      )}
      <h2
        className={`display text-[clamp(39px,6.5vw,75px)] leading-[0.94]${
          kicker ? " mt-3" : ""
        }`}
      >
        <RevealLine delay={0.06}>{title}</RevealLine>
      </h2>
      {children}
    </div>
  );
}
