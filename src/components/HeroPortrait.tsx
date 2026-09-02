import { motion } from "framer-motion";
import { Atom, Braces, Palette, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Head } from "vite-react-ssg";
import { EASE, SSR } from "@/lib/anim";

/**
 * Retrato del hero: 7 frames apilados que panean de perfil a perfil siguiendo
 * el cursor.
 *
 * Los tres invariantes que sostienen el efecto:
 *  1. Los 7 frames comparten lienzo (1792×2398) y el sujeto ya pivota en el
 *     sitio, así que se apilan con geometría idéntica y solo cambia la opacidad.
 *     Nada de encuadres por frame: la figura "nadaría" entre ángulos.
 *  2. La máscara de degradado vive en `.hero-fig__stack`, nunca en `.hero-fig`:
 *     `mask-clip` es `border-box` y recortaría también los chips.
 *  3. Los 7 se decodifican antes de activar el seguimiento, para que ningún
 *     ángulo parpadee la primera vez que se alcanza.
 */

const FRAMES = [
  "pan_l90",
  "pan_l60",
  "pan_l30",
  "pan_00",
  "pan_r30",
  "pan_r60",
  "pan_r90",
] as const;

const CENTER = 3; // pan_00, mirada al lente
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

const chips = [
  { icon: Atom, label: "React", pos: "top-[6%] -left-[9%] max-lg:left-0", delay: "0s" },
  { icon: Braces, label: ".NET", pos: "top-[24%] -right-[9%] max-lg:right-0", delay: "-1.6s" },
  { icon: Palette, label: "UI/UX", pos: "top-[54%] -left-[12%] max-lg:left-0", delay: "-3.2s" },
  { icon: Zap, label: "Next.js", pos: "top-[70%] -right-[7%] max-lg:right-0", delay: "-4.8s" },
];

export function HeroPortrait() {
  /** Los otros 6 frames se montan tras el primer render para no competir con el LCP. */
  const [mounted, setMounted] = useState(false);
  /** Seguimiento activo solo cuando los 7 están decodificados. */
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(CENTER);

  const stackRef = useRef<HTMLDivElement>(null);
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

  // 2) Decodificar los 7; solo entonces se habilita el seguimiento. `decode()`
  //    puede no resolver nunca en un documento que no se está rasterizando, así
  //    que la carrera contra el temporizador evita que el efecto quede muerto.
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const imgs = Array.from(stackRef.current?.querySelectorAll("img") ?? []);
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
  }, [mounted]);

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

  return (
    <figure className="hero-fig">
      {/* Solo pan_00 se precarga desde el head: es el LCP. Los otros seis los
          monta el efecto 1, ya pasado el primer pintado. Las dos entradas
          replican el <picture> de abajo para no descargar dos veces. */}
      <Head>
        <link
          rel="preload"
          as="image"
          media="(max-width: 1023px)"
          href="/hero/w896/pan_00.webp"
        />
        <link
          rel="preload"
          as="image"
          media="(min-width: 1024px)"
          href="/hero/pan_00.webp"
          imageSrcSet="/hero/w896/pan_00.webp 896w, /hero/pan_00.webp 1792w"
          imageSizes="493px"
        />
      </Head>

      {/* La máscara vive aquí dentro; los chips quedan fuera a propósito. */}
      <div className="hero-fig__stack" ref={stackRef}>
        {FRAMES.map((key, i) => {
          if (!mounted && i !== CENTER) return null;
          const isCenter = i === CENTER;
          return (
            <picture key={key}>
              {/* Bajo 1024px siempre el set ligero; por encima decide el DPR. */}
              <source
                media="(max-width: 1023px)"
                srcSet={`/hero/w896/${key}.webp`}
              />
              <img
                src={`/hero/${key}.webp`}
                srcSet={`/hero/w896/${key}.webp 896w, /hero/${key}.webp 1792w`}
                sizes="493px"
                width={1792}
                height={2398}
                alt={isCenter ? "Santiago Miranda" : ""}
                aria-hidden={isCenter ? undefined : true}
                draggable={false}
                className={`hero-fig__f${i === current ? " is-on" : ""}`}
              />
            </picture>
          );
        })}
      </div>

      {/* Chips de tecnología — fuera del stack para que la máscara no los corte. */}
      {chips.map((c, i) => (
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
