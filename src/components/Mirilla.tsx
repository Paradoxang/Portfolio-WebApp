import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Cursor de mirilla. Global: se monta una sola vez en el layout raíz.
 *
 * Tres cosas que hacen que este patrón se rompa y aquí no:
 *
 *  1. **Solo con `(pointer: fine)`.** En táctil el componente ni se monta: no
 *     hay cursor que sustituir.
 *
 *  2. **`cursor: none` vive dentro de ese mismo media query**, en el CSS. Si
 *     fuera global y el componente no montara —JS caído, JS desactivado,
 *     táctil— el usuario se quedaría sin cursor ninguno. Es el fallo clásico
 *     de esta técnica y deja el sitio inusable.
 *
 *  3. **Un solo listener de `pointermove` en `window`**, y el movimiento por
 *     motion values sobre `transform`. Con `left`/`top` habría cálculo de
 *     maquetación en cada fotograma.
 *
 * El punto ámbar va pegado al cursor real, sin muelle; el anillo lo persigue
 * con inercia. Ese desfase de unos píxeles es lo que hace que se sienta una
 * mirilla y no un puntero dibujado.
 */

const LAVANDA = "rgba(214,201,255,.55)";
const LAVANDA_FUERTE = "rgba(214,201,255,.8)";
const AMBAR = "#FF9C4A";

type Estado = "reposo" | "activo" | "texto";

/** Coincide con `cursor: none` del CSS: si cambia uno, cambia el otro. */
function usePunteroFino() {
  const [fino, setFino] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const leer = () => setFino(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);
  return fino;
}

const SELECTOR_ACTIVO =
  'a, button, [role="button"], summary, label[for], select, .wdid, .card, .pill';
const SELECTOR_TEXTO = "input, textarea, [contenteditable=\"true\"]";

export function Mirilla() {
  const fino = usePunteroFino();
  const quieto = !!useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  /* Con reduced-motion la mirilla no desaparece: se queda sin muelle y sigue
     al cursor 1:1. */
  const muelle = { stiffness: 420, damping: 34, mass: 0.4 };
  const rx = useSpring(x, quieto ? { stiffness: 10000, damping: 100, mass: 0.01 } : muelle);
  const ry = useSpring(y, quieto ? { stiffness: 10000, damping: 100, mass: 0.01 } : muelle);

  const [estado, setEstado] = useState<Estado>("reposo");
  const [pulsado, setPulsado] = useState(false);
  const [dentro, setDentro] = useState(false);

  /* `cursor: none` se activa desde aquí, no desde el CSS a secas.
     Con la regla puesta solo tras el media query bastaba con que el componente
     no montara —JS caído o desactivado— para que el usuario se quedara sin
     cursor ninguno: el media query se aplica igual, el componente no. Colgando
     la clase del propio montaje, si no hay JS no hay clase y el cursor nativo
     sigue ahí. */
  useEffect(() => {
    if (!fino) return;
    document.documentElement.classList.add("mirilla-on");
    return () => document.documentElement.classList.remove("mirilla-on");
  }, [fino]);

  useEffect(() => {
    if (!fino) return;

    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!dentro) setDentro(true);
      const el = e.target as Element | null;
      if (!el || !el.closest) return;
      setEstado(
        el.closest(SELECTOR_TEXTO)
          ? "texto"
          : el.closest(SELECTOR_ACTIVO)
            ? "activo"
            : "reposo"
      );
    };
    const abajo = () => setPulsado(true);
    const arriba = () => setPulsado(false);
    const salir = () => setDentro(false);
    const entrar = () => setDentro(true);

    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerdown", abajo, { passive: true });
    window.addEventListener("pointerup", arriba, { passive: true });
    document.addEventListener("pointerleave", salir);
    document.addEventListener("pointerenter", entrar);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerdown", abajo);
      window.removeEventListener("pointerup", arriba);
      document.removeEventListener("pointerleave", salir);
      document.removeEventListener("pointerenter", entrar);
    };
  }, [fino, x, y, dentro]);

  // En táctil no se monta. Es la condición que hace segura la regla `cursor: none`.
  if (!fino) return null;

  const activo = estado === "activo";
  const texto = estado === "texto";
  const anillo = pulsado ? 22 : activo ? 46 : 28;
  const salto = quieto ? { duration: 0 } : { type: "spring" as const, stiffness: 380, damping: 26 };

  return (
    <>
      {/* Anillo: persigue con inercia. */}
      <motion.div
        className="mirilla mirilla--anillo"
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        animate={{ opacity: dentro ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          animate={{
            width: texto ? 12 : anillo,
            height: texto ? 26 : anillo,
            rotate: activo && !texto ? 45 : 0,
          }}
          transition={salto}
        >
          {texto ? (
            /* Sobre texto seleccionable el anillo se colapsa en una barra. */
            <rect x="44" y="6" width="12" height="88" rx="5" fill={LAVANDA_FUERTE} />
          ) : (
            <>
              <circle cx="50" cy="50" r="44" fill="none" stroke={LAVANDA} strokeWidth="3.2" />
              {/* Cuatro marcas a las 12, 3, 6 y 9, separadas del anillo. */}
              {[
                "M50 0 V16",
                "M100 50 H84",
                "M50 100 V84",
                "M0 50 H16",
              ].map((d) => (
                <path key={d} d={d} stroke={LAVANDA_FUERTE} strokeWidth="3.2" strokeLinecap="round" />
              ))}
            </>
          )}
        </motion.svg>
      </motion.div>

      {/* Punto ámbar: pegado al cursor real, sin muelle. El desfase con el
          anillo es lo que da la sensación de mirilla. */}
      <motion.div
        className="mirilla mirilla--punto"
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: dentro && !texto ? 1 : 0, scale: activo ? 1.66 : 1 }}
        transition={{ opacity: { duration: 0.18 }, scale: salto }}
      >
        <span style={{ background: AMBAR }} />
      </motion.div>
    </>
  );
}
