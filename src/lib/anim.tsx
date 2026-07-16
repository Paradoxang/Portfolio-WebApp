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

/* ── Reveal: fade + translateY al entrar en viewport ── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced || SSR ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── RevealLine: título con máscara, sube desde abajo ── */
export function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduced || SSR ? false : { y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── Counter: count-up al entrar en vista ── */
export function Counter({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced || SSR ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
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
