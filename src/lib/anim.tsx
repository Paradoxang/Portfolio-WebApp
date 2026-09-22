import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** En el build SSG renderizamos el estado final (contenido visible) para que
 * el HTML prerenderizado no dependa de JS; las animaciones corren en cliente. */
export const SSR = import.meta.env.SSR;

/* Dispara al montar (`mount`, para contenido sobre el pliegue — robusto
   tras hidratación SSG) o al entrar en viewport (por defecto). */
type Trigger = { mount?: boolean };

/* ── Reveal: fade + translateY ── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  mount = false,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
} & Trigger) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const show = SSR || mount || inView;
  const hidden = { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.div
      ref={ref}
      initial={reduced || SSR ? false : hidden}
      animate={reduced ? shown : show ? shown : hidden}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── RevealLine: título con máscara, sube desde abajo.
   El padding/margen negativo evita que la máscara recorte tildes
   y bordes de la tipografía (Mí, Educación…). ── */
export function RevealLine({
  children,
  delay = 0,
  mount = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
} & Trigger) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = SSR || mount || inView;
  return (
    <span
      ref={ref}
      className={`block overflow-hidden ${className}`}
      style={{
        padding: "0.16em 0.06em 0.14em",
        margin: "-0.16em -0.06em -0.14em",
      }}
    >
      <motion.span
        className="block"
        initial={reduced || SSR ? false : { y: "120%" }}
        animate={{ y: reduced || show ? 0 : "120%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Counter: count-up al entrar en vista.
   Solo cuenta lo que es un número; "3.º" u "OK" se pintan tal cual. ── */
export function Counter({
  value,
  duration = 1.4,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const numero = /^\d+$/.test(value) ? Number(value) : null;
  const [val, setVal] = useState(reduced || SSR || numero === null ? value : "0");

  useEffect(() => {
    if (!inView || reduced || numero === null) return;
    const controls = animate(0, numero, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, reduced, numero, duration]);

  return <span ref={ref}>{numero === null ? value : val}</span>;
}

/* ── Magnetic: el hijo sigue sutilmente el puntero ── */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Lenis smooth scroll (cliente, respeta reduced-motion) ── */
let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05 });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/**
 * Scroll programático compatible con Lenis (los scrollIntoView nativos
 * pelean con su raf). `target`: 0 para top o un elemento; offset para
 * compensar el nav fijo.
 */
export function scrollToTarget(
  target: number | HTMLElement,
  { immediate = false, offset = -96 }: { immediate?: boolean; offset?: number } = {}
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      immediate,
      offset: typeof target === "number" ? 0 : offset,
    });
  } else if (typeof target === "number") {
    window.scrollTo(0, target);
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Para el panel del menú: con él abierto la página de detrás no se desplaza.
 * Lenis escucha la rueda en `window`, así que `overflow: hidden` a secas no
 * lo pararía; hay que decírselo a él. Sin Lenis (reduced-motion) basta la
 * clase, que el CSS traduce a `overflow: hidden`.
 */
export function pausarScroll(pausar: boolean) {
  if (pausar) lenisInstance?.stop();
  else lenisInstance?.start();
  document.documentElement.classList.toggle("scroll-pausado", pausar);
}
