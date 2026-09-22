import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useModoLigero } from "@/lib/perf";

/**
 * Cursor de mirilla. Global: se monta una sola vez en el layout raíz.
 *
 * Tres cosas que hacen que este patrón se rompa y aquí no:
 *
 *  1. **Solo con `(pointer: fine)`.** En táctil el componente ni se monta: no
 *     hay cursor que sustituir.
 *
 *  2. **`cursor: none` vive dentro de ese mismo media query**, en el CSS, y
 *     solo se activa con la clase `mirilla-on`, que se pone **al primer
 *     movimiento del puntero**, no al montar. Antes se ponía al montar y el
 *     visitante que aún no había movido el ratón se quedaba sin cursor nativo
 *     y sin mirilla dibujada: nada. Ahora el cursor nativo no desaparece hasta
 *     que la mirilla ya está en pantalla.
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

/* Solo lo que de verdad se puede pulsar. Antes incluía `.card` y `.pill`, que
   son contenedores, y la mirilla decía "clicable" sobre cosas que no lo eran.
   `.wdid` se queda: la tarjeta entera reacciona al hover y lleva su enlace. */
const SELECTOR_ACTIVO =
  'a, button, [role="button"], summary, label[for], select, input[type="submit"], .wdid';
const SELECTOR_TEXTO = 'input:not([type="submit"]), textarea, [contenteditable="true"]';

export function Mirilla() {
  /* En modo ligero, cursor nativo. La mirilla son dos capas que se repintan en
     cada movimiento del puntero; sin aceleración eso se nota más que cualquier
     otra cosa que haga el sitio. */
  const ligero = useModoLigero();
  const fino = usePunteroFino() && !ligero;
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
  /** El primer movimiento ya ocurrió: solo entonces se retira el cursor nativo. */
  const activada = useRef(false);

  useEffect(() => {
    if (!fino) return;

    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!activada.current) {
        activada.current = true;
        document.documentElement.classList.add("mirilla-on");
      }
      setDentro(true);
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
      activada.current = false;
      document.documentElement.classList.remove("mirilla-on");
    };
  }, [fino, x, y]);

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
            /* Sobre texto editable el anillo se colapsa en una barra. */
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
