import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/anim";
import type { Faq } from "@/content/types";

/**
 * Acordeón de preguntas, accesible de verdad.
 *
 *  · Cada pregunta es un `<button>` dentro de un `<h3>`, con `aria-expanded` y
 *    `aria-controls` hacia su panel; el panel es un `region` nombrado por el
 *    botón. Es el patrón de la WAI-ARIA, sin inventos.
 *  · Las respuestas NUNCA salen del DOM: el panel cerrado mide cero de alto y
 *    va `aria-hidden`, pero el texto está en el HTML prerenderizado. Google y
 *    las IA lo leen; el `FAQPage` de la página lo repite en JSON-LD.
 *  · La altura se anima con Framer entre 0 y `auto`; con reduced-motion el
 *    cambio es instantáneo.
 */
export function Acordeon({
  items,
  idBase,
  abierto = 0,
  className = "",
}: {
  items: Faq[];
  idBase: string;
  /** Índice abierto al cargar; `null` para todos plegados. */
  abierto?: number | null;
  className?: string;
}) {
  const [activo, setActivo] = useState<number | null>(abierto);
  const reduced = useReducedMotion();

  return (
    <div className={`acordeon ${className}`}>
      {items.map((it, i) => {
        const open = activo === i;
        const idBoton = `${idBase}-b-${i}`;
        const idPanel = `${idBase}-p-${i}`;
        return (
          <div key={it.q} className={`acordeon__item${open ? " esta-abierto" : ""}`}>
            <h3 className="m-0">
              <button
                type="button"
                id={idBoton}
                aria-expanded={open}
                aria-controls={idPanel}
                onClick={() => setActivo(open ? null : i)}
                className="acordeon__boton"
              >
                <span className="acordeon__pregunta">{it.q}</span>
                <ChevronDown className="acordeon__icono" aria-hidden="true" />
              </button>
            </h3>
            <motion.div
              id={idPanel}
              role="region"
              aria-labelledby={idBoton}
              aria-hidden={!open}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.34, ease: EASE }}
              className="acordeon__panel"
            >
              <p className="acordeon__respuesta">{it.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
