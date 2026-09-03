import { useEffect, useRef, useState, type RefObject } from "react";
import { Head } from "vite-react-ssg";

/**
 * Motor del paneo del hero: 7 frames apilados que van de perfil a perfil
 * siguiendo el cursor.
 *
 * Los invariantes que sostienen el efecto:
 *  1. Los frames comparten lienzo (1792×2398) y el sujeto ya pivota en el
 *     sitio, así que se apilan con geometría idéntica y solo cambia la opacidad.
 *     Nada de encuadres por frame: la figura "nadaría" entre ángulos.
 *  2. La máscara de degradado vive en `.hero-fig__stack`, nunca en `.hero-fig`:
 *     `mask-clip` es `border-box` y recortaría también los chips.
 *  3. Todos se decodifican antes de activar el seguimiento, para que ningún
 *     ángulo parpadee la primera vez que se alcanza.
 *
 * `useHeroPan` es deliberadamente único aunque haya varias pilas en pantalla:
 * un listener, un índice, todas las capas cambiando a la vez.
 */

export const FRAMES = [
  "pan_l90",
  "pan_l60",
  "pan_l30",
  "pan_00",
  "pan_r30",
  "pan_r60",
  "pan_r90",
] as const;

export const CENTER = 3; // pan_00, mirada al lente
const LAST = FRAMES.length - 1;
const STEP = 1 / LAST;
/** Hay que rebasar el umbral un 18% del paso para cambiar: sin esto, un cursor
 *  parado justo en la frontera entre dos ángulos tiembla sin parar. */
const HYST = STEP * 0.18;
const IDLE_MS = 4000;
/** Techo de espera a la decodificación antes de activar el seguimiento igual. */
const DECODE_TIMEOUT_MS = 2000;
/** Sin cursor fino: barrido lento de ida y vuelta. */
const SWEEP = [3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2];
const SWEEP_MS = 1400;

/**
 * Devuelve el frame activo. `containerRef` debe envolver *todas* las pilas:
 * la decodificación se espera sobre el conjunto, no capa por capa.
 */
export function useHeroPan(containerRef: RefObject<HTMLElement>) {
  /** El resto de frames se montan tras el primer render para no competir con el LCP. */
  const [mounted, setMounted] = useState(false);
  /** Seguimiento activo solo cuando todos están decodificados. */
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(CENTER);

  const currentRef = useRef(CENTER);
  currentRef.current = current;

  // 1) Montar el resto de frames después del primer pintado. El temporizador es
  //    el respaldo: en una pestaña en segundo plano el rAF queda en pausa y sin
  //    él el retrato se quedaría congelado en pan_00.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const timer = window.setTimeout(() => setMounted(true), 300);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  // 2) Decodificar todo; solo entonces se habilita el seguimiento. `decode()`
  //    puede no resolver nunca en un documento que no se está rasterizando, así
  //    que la carrera contra el temporizador evita que el efecto quede muerto.
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const imgs = Array.from(containerRef.current?.querySelectorAll("img") ?? []);
    const done = () => {
      if (!cancelled) setReady(true);
    };
    const timer = window.setTimeout(done, DECODE_TIMEOUT_MS);
    Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(
      () => {
        window.clearTimeout(timer);
        done();
      }
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mounted, containerRef]);

  // 3) Seguimiento del cursor (o barrido automático sin cursor fino).
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const show = (i: number) => setCurrent(Math.max(0, Math.min(LAST, i)));

    let raf = 0;
    let idle = 0;
    let sweepTimer = 0;

    const fromX = (clientX: number) => {
      const cur = currentRef.current;
      // Ventana de ancho 0 (pestaña restaurándose): la división daría NaN y
      // ningún frame quedaría visible.
      if (!window.innerWidth) return cur;
      const exact = (clientX / window.innerWidth) * LAST;
      if (Math.abs(exact - cur) < 0.5 + HYST * LAST) return cur;
      return Math.round(exact);
    };

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        show(fromX(x));
        window.clearTimeout(idle);
        idle = window.setTimeout(() => show(CENTER), IDLE_MS);
      });
    };

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
    } else {
      let k = 0;
      sweepTimer = window.setInterval(
        () => show(SWEEP[k++ % SWEEP.length]),
        SWEEP_MS
      );
    }

    const onVisibility = () => {
      if (document.hidden) show(CENTER);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.clearInterval(sweepTimer);
    };
  }, [ready]);

  return { mounted, current };
}

interface PanStackProps {
  /** Carpeta bajo /hero: "" para la fotografía, "astro" para el astronauta. */
  set?: string;
  /** Texto alternativo del frame central; vacío deja la pila entera decorativa. */
  alt: string;
  mounted: boolean;
  current: number;
  /** Solo la capa que hace de LCP declara el preload en el head. */
  preload?: boolean;
  /** Clases extra del envoltorio (la fusión las usa para opacidad y desenfoque). */
  className?: string;
}

/** Las 7 imágenes de un set, apiladas y enmascaradas. */
export function PanStack({
  set = "",
  alt,
  mounted,
  current,
  preload = false,
  className = "",
}: PanStackProps) {
  const dir = set ? `/hero/${set}` : "/hero";
  return (
    <div
      className={`hero-fig__stack${
        set === "astro" ? " hero-fig__stack--astro" : ""
      }${className ? ` ${className}` : ""}`}
      aria-hidden={alt ? undefined : true}
    >
      {/* Solo el frame central se precarga desde el head: es el LCP. Los otros
          seis los monta el efecto 1, ya pasado el primer pintado. Las dos
          entradas replican el <picture> de abajo para no descargar dos veces. */}
      {preload && (
        <Head>
          <link
            rel="preload"
            as="image"
            media="(max-width: 1023px)"
            href={`${dir}/w896/pan_00.webp`}
          />
          <link
            rel="preload"
            as="image"
            media="(min-width: 1024px)"
            href={`${dir}/pan_00.webp`}
            imageSrcSet={`${dir}/w896/pan_00.webp 896w, ${dir}/pan_00.webp 1792w`}
            imageSizes="493px"
          />
        </Head>
      )}

      {FRAMES.map((key, i) => {
        if (!mounted && i !== CENTER) return null;
        const isCenter = i === CENTER;
        return (
          <picture key={key}>
            {/* Bajo 1024px siempre el set ligero; por encima decide el DPR. */}
            <source
              media="(max-width: 1023px)"
              srcSet={`${dir}/w896/${key}.webp`}
            />
            <img
              src={`${dir}/${key}.webp`}
              srcSet={`${dir}/w896/${key}.webp 896w, ${dir}/${key}.webp 1792w`}
              sizes="493px"
              width={1792}
              height={2398}
              alt={isCenter ? alt : ""}
              aria-hidden={isCenter ? undefined : true}
              draggable={false}
              className={`hero-fig__f${i === current ? " is-on" : ""}`}
            />
          </picture>
        );
      })}
    </div>
  );
}
