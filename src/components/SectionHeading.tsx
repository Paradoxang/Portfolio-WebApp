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
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <Reveal>
        <div className="kicker">{kicker}</div>
      </Reveal>
      <h2 className="display mt-3 text-[clamp(34px,5.5vw,58px)] leading-[0.94]">
        <RevealLine delay={0.06}>{title}</RevealLine>
      </h2>
      {children}
    </div>
  );
}
