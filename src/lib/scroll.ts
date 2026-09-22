import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useModoLigero } from "@/lib/perf";

/**
 * Movimiento atado al scroll, con GSAP + ScrollTrigger.
 *
 * Dos herramientas y una regla común: **el HTML prerenderizado ya está en su
 * estado final**. Ninguna de las dos pone `opacity: 0` en el servidor; el
 * `gsap.from` corre en cliente, después de hidratar, así que si algo lo impide
 * lo que se ve de más es el contenido, nunca un hueco. Es el mismo contrato
 * que `Reveal` en `lib/anim`.
 *
 * Las dos se apagan solas con `prefers-reduced-motion` y en modo ligero.
 */

/** ¿Hay que quedarse quieto? Reduced-motion o modo ligero. */
function useQuieto(): boolean {
  const reduced = !!useReducedMotion();
  const ligero = useModoLigero();
  return reduced || ligero;
}

/**
 * Parallax de scrub: el elemento se desplaza `distancia` píxeles a lo largo
 * del recorrido de `scope` por la ventana. Solo para capas DECORATIVAS —nunca
 * texto ni controles—, con distancias cortas (20–80 px) para que fondo y
 * frente no se desincronicen de forma molesta.
 */
export function useParallax(
  scope: RefObject<HTMLElement>,
  selector: string,
  { distancia = 40, scrub = 0.8 }: { distancia?: number; scrub?: number } = {}
) {
  const quieto = useQuieto();
  useGSAP(
    () => {
      if (quieto || !scope.current) return;
      const capas = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      capas.forEach((capa, i) => {
        // Capas alternas en sentido contrario: vende la profundidad sin que
        // todo el fondo se mueva en bloque.
        const sentido = i % 2 === 0 ? 1 : -0.6;
        gsap.fromTo(
          capa,
          { y: distancia * sentido },
          {
            y: -distancia * sentido,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          }
        );
      });
    },
    { scope, dependencies: [quieto, selector, distancia, scrub] }
  );
}

/**
 * Entrada escalonada de una lista: cada hijo que cumpla `selector` sube y
 * aparece cuando entra en pantalla, con `ScrollTrigger.batch` para que una
 * fila entera se mueva junta y no haya un observador por tarjeta.
 */
export function useStaggerReveal(
  scope: RefObject<HTMLElement>,
  selector: string,
  { y = 24, each = 0.08, start = "top 88%" }: { y?: number; each?: number; start?: string } = {}
) {
  const quieto = useQuieto();
  useGSAP(
    () => {
      if (quieto || !scope.current) return;
      const items = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y });
      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (lote) =>
          gsap.to(lote, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: each,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      // Lo que ya está en pantalla al hidratar no espera al scroll.
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [quieto, selector] }
  );
}
