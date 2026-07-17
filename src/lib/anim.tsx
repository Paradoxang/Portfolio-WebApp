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

/* ── Letters: revelado letra a letra con blur — para titulares "boom" ── */
export function Letters({
  text,
  delay = 0,
  stagger = 0.05,
  mount = false,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
} & Trigger) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true });
  const show = SSR || mount || inView;
  const hidden = { y: "0.4em", opacity: 0, filter: "blur(14px)", scale: 1.18 };
  const shown = { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 };
  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ padding: "0.14em 0.04em", margin: "-0.14em -0.04em" }}
      aria-label={text}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={reduced || SSR ? false : hidden}
          animate={reduced ? shown : show ? shown : hidden}
          transition={{
            duration: 0.75,
            delay: delay + i * stagger,
            ease: EASE,
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
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

/* ── Tilt: inclinación 3D que sigue al puntero ── */
export function Tilt({
  children,
  max = 9,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
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
