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
/** Rescoldo de la fotografía cuando la fusión está completa (0 = sustitución). */
const FOTO_RESTO = 0.28;
const BLUR_PX = 16;
const FUSION_MS = 480;

interface HeroFusionProps {
  /** La Hero lo usa para anclar el campo de partículas sobre el rostro. */
  figureRef: RefObject<HTMLElement>;
  onFusedChange?: (fused: boolean) => void;
}

export function HeroFusion({ figureRef, onFusedChange }: HeroFusionProps) {
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
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      cambiar(cerca(e.clientX, e.clientY));
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      cambiar(false);
    };
    const salir = () => cambiar(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", salir, { passive: true });
    document.addEventListener("pointerleave", salir);
    return () => {
      window.clearInterval(ciclo);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", salir);
      document.removeEventListener("pointerleave", salir);
    };
  }, [figureRef]);

  return (
    <figure
      ref={figureRef}
      className={`hero-fig hero-fig--fusion${fused ? " is-fused" : ""}`}
      style={
        {
          "--fusion-ms": `${FUSION_MS}ms`,
          "--fusion-blur": `${BLUR_PX}px`,
          "--fusion-foto-resto": FOTO_RESTO,
        } as React.CSSProperties
      }
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
