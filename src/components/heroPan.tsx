import { useEffect, useRef, useState, type RefObject } from "react";
import { usePerf } from "@/lib/perf";
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
/**
 * Cuánto de la pila está montado.
 *
 *   0 · solo `pan_00`  ·  1 · los tres centrales  ·  2 · los siete
 *
 * Antes se pasaba de uno a siete de golpe en el primer hueco tras pintar, y
 * eran catorce imágenes de 1792x2398 —siete por set— descargándose y
 * decodificándose antes de que el visitante pudiera tocar nada. Los ángulos
 * extremos solo hacen falta si el cursor llega a los bordes de la ventana, así
 * que esperan a que haya un puntero de verdad moviéndose.
 */
const NUCLEO = [CENTER - 1, CENTER, CENTER + 1];

export function useHeroPan(containerRef: RefObject<HTMLElement>) {
  /* En modo ligero la pila no crece nunca: un solo fotograma, sin decodificar
     los demás y sin listener de puntero. Es el punto 3 del presupuesto —unos
     19 MB de RAM por set y todos los repintados de una imagen enorme. */
  const ligero = usePerf() === "low";
  const [etapa, setEtapa] = useState(0);
  /** Seguimiento activo solo cuando todos están decodificados. */
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(CENTER);

  const currentRef = useRef(CENTER);
  currentRef.current = current;

  // 1) Montar el resto de frames después del primer pintado. El temporizador es
  //    el respaldo: en una pestaña en segundo plano el rAF queda en pausa y sin
  //    él el retrato se quedaría congelado en pan_00.
  useEffect(() => {
    if (ligero) return;
    const raf = requestAnimationFrame(() => setEtapa(1));
    const timer = window.setTimeout(() => setEtapa(1), 300);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [ligero]);

  /* Los cuatro ángulos extremos, bajo demanda: al primer movimiento real del
     puntero. Sin cursor fino no se piden nunca — el barrido automático usa
     solo los del núcleo. */
  useEffect(() => {
    if (ligero || etapa !== 1) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const abrir = () => setEtapa(2);
    window.addEventListener("pointermove", abrir, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", abrir);
  }, [ligero, etapa]);

  // 2) Decodificar todo; solo entonces se habilita el seguimiento. `decode()`
  //    puede no resolver nunca en un documento que no se está rasterizando, así
  //    que la carrera contra el temporizador evita que el efecto quede muerto.
  useEffect(() => {
    if (!etapa) return;
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
  }, [etapa, containerRef]);

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
      /* Solo los ángulos del núcleo: sin cursor fino los extremos no llegan a
         montarse, así que barrer hacia ellos dejaría el retrato en blanco. */
      const ruta = SWEEP.filter((i) => NUCLEO.includes(i));
      let k = 0;
      sweepTimer = window.setInterval(
        () => show((ruta.length ? ruta : NUCLEO)[k++ % (ruta.length || NUCLEO.length)]),
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

  return { etapa, current };
}

interface PanStackProps {
  /** Carpeta bajo /hero: "" para la fotografía, "astro" para el astronauta. */
  set?: string;
  /** Texto alternativo del frame central; vacío deja la pila entera decorativa. */
  alt: string;
  /** 0 solo el central, 1 los tres del núcleo, 2 los siete. */
  etapa: number;
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
  etapa,
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
      {/* Solo el frame central se precarga desde el head: es el LCP. Los dos
          vecinos entran ya pasado el primer pintado, y los cuatro extremos al
          primer movimiento del puntero. Las dos entradas replican el <picture>
          de abajo para no descargar dos veces. */}
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
        if (etapa === 0 && i !== CENTER) return null;
        if (etapa === 1 && !NUCLEO.includes(i)) return null;
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
