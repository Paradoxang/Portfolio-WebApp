import { useEffect, useRef, useState, type RefObject } from "react";
import { PanStack, useHeroPan } from "@/components/heroPan";

/**
 * Capa 3: la fotografía y el astronauta en la misma caja.
 *
 * Los dos sets comparten lienzo y el agujero negro está registrado sobre el
 * rostro, así que fundirlos no requiere transformar nada: las dos pilas se
 * apilan y solo se mueve la opacidad. El paneo sigue siendo uno solo — un
 * `useHeroPan`, un índice — así que las dos capas cambian de ángulo a la vez
 * tanto en reposo como fundidas.
 */

/** Margen alrededor de la figura que también funde, en píxeles. La caja mide
 *  ~590 px de ancho, así que esto la convierte en una zona de ~1000 px: no hace
 *  falta estar encima. */
const MARGEN_HOVER = 220;
/** Sin cursor no hay hover: la fusión se alterna sola para que se vea. */
const CICLO_MS = 3600;
/* El rescoldo de la fotografía, el desenfoque y la duración viven en el CSS
 * (`--fusion-*`): en móvil el rescoldo sube mucho para que Santiago nunca
 * desaparezca, y una variable en línea impediría esa anulación. */

interface HeroFusionProps {
  /** La Hero lo usa para anclar el campo de partículas sobre el rostro. */
  figureRef: RefObject<HTMLElement>;
  onFusedChange?: (fused: boolean) => void;
  /** Posición del cursor normalizada a −1…1 dentro del hero. La capa
   *  decorativa se alimenta de aquí para no abrir un segundo listener. */
  onPointer?: (nx: number, ny: number) => void;
}

export function HeroFusion({
  figureRef,
  onFusedChange,
  onPointer,
}: HeroFusionProps) {
  const { mounted, current } = useHeroPan(figureRef);
  const [fused, setFused] = useState(false);
  const fusedRef = useRef(false);

  useEffect(() => {
    onFusedChange?.(fused);
  }, [fused, onFusedChange]);

  // Zona de fusión por proximidad en lugar de `:hover`: el cursor solo tiene
  // que acercarse a la figura, no pisarla. En táctil no hay hover, así que el
  // toque mantenido hace de disparador y, sin tocar, la fusión se alterna sola.
  useEffect(() => {
    const cambiar = (v: boolean) => {
      if (fusedRef.current === v) return;
      fusedRef.current = v;
      setFused(v);
    };

    const fino = window.matchMedia("(pointer: fine)").matches;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ciclo = 0;
    if (!fino && !quieto) {
      ciclo = window.setInterval(() => cambiar(!fusedRef.current), CICLO_MS);
    }

    const cerca = (x: number, y: number) => {
      const r = figureRef.current?.getBoundingClientRect();
      if (!r) return false;
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      return Math.hypot(dx, dy) <= MARGEN_HOVER;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cambiar(cerca(e.clientX, e.clientY));
      // Mismo evento alimenta el parallax de la capa decorativa: un solo
      // listener para el paneo, la fusión y las doce piezas.
      const hero = figureRef.current?.closest(".glow-hero");
      if (onPointer && hero) {
        const r = hero.getBoundingClientRect();
        onPointer(
          ((e.clientX - r.left) / r.width - 0.5) * 2,
          ((e.clientY - r.top) / r.height - 0.5) * 2
        );
      }
    };
    // Sin disparador táctil a propósito: tocar la pantalla hacía desaparecer la
    // fotografía de golpe. En táctil manda el ciclo lento y nada más.
    const salir = () => cambiar(false);

    if (fino) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", salir);
    }
    return () => {
      window.clearInterval(ciclo);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", salir);
    };
  }, [figureRef, onPointer]);

  return (
    <figure
      ref={figureRef}
      className={`hero-fig hero-fig--fusion${fused ? " is-fused" : ""}`}
    >
      <PanStack
        alt="Santiago Miranda"
        mounted={mounted}
        current={current}
        preload
        className="hero-fusion__capa hero-fusion__capa--foto"
      />
      <PanStack
        set="astro"
        alt=""
        mounted={mounted}
        current={current}
        className="hero-fusion__capa hero-fusion__capa--astro"
      />
    </figure>
  );
}
