import { Reveal, RevealLine } from "@/lib/anim";
import { Rich } from "@/i18n/LocaleContext";
import type { ReactNode } from "react";

/**
 * Encabezado de sección: kicker mono numerado + H2 en caja alta.
 *
 * El título admite la marca `**palabra**` del contenido: lo marcado sale con
 * el brillo de nebulosa. Con `lines`, lo de antes de la marca es la primera
 * línea y lo marcado la segunda —"Security / First"—, cada una con su propia
 * máscara escalonada; es lo que antes hacían a mano Security y Cta con dos
 * `RevealLine`.
 *
 * Con `id` el título queda referenciable desde el `aria-labelledby` de la
 * sección, que es lo que le da nombre a la región para un lector de pantalla.
 */
export function SectionHeading({
  kicker,
  title,
  id,
  as: Tag = "h2",
  lines = false,
  titleClass = "text-[clamp(39px,6.5vw,75px)] leading-[0.94]",
  className = "",
  children,
}: {
  /** Opcional: hay secciones donde el titular va solo. */
  kicker?: string;
  title: string;
  id?: string;
  as?: "h1" | "h2";
  /** Parte el título en dos líneas por la marca `**`. */
  lines?: boolean;
  /** Tamaño del título, por si la sección lo necesita más contenido. */
  titleClass?: string;
  className?: string;
  children?: ReactNode;
}) {
  const [antes, brillo] = lines ? partir(title) : [title, null];
  return (
    <div className={className}>
      {kicker && (
        <Reveal>
          <div className="kicker">{kicker}</div>
        </Reveal>
      )}
      <Tag id={id} className={`display ${titleClass}${kicker ? " mt-3" : ""}`}>
        {brillo === null ? (
          <RevealLine delay={0.06}>
            <Rich text={antes} strong="text-shimmer" as="span" />
          </RevealLine>
        ) : (
          <>
            <RevealLine delay={0.06}>{antes.trim()}</RevealLine>
            <RevealLine delay={0.14}>
              <span className="text-shimmer">{brillo}</span>
            </RevealLine>
          </>
        )}
      </Tag>
      {children}
    </div>
  );
}

/** "Security **First**" → ["Security", "First"]; sin marca → [texto, null]. */
function partir(texto: string): [string, string | null] {
  const m = texto.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (!m) return [texto, null];
  return [m[1], m[2] + m[3]];
}
