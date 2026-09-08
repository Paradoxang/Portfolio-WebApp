import { useSyncExternalStore } from "react";

/**
 * Modo de rendimiento del sitio.
 *
 * Un solo atributo, `data-perf` en `<html>`, con dos valores: `high` y `low`.
 * **Todo lo que se apaga cuelga de ahí**, sobre todo desde el CSS. La regla es
 * deliberada: condicionales de rendimiento repartidas por los componentes son
 * imposibles de auditar a los dos meses, y hace falta poder comprobar en el
 * inspector, elemento por elemento, que en modo bajo no queda ni un blend ni un
 * `backdrop-filter` vivo.
 *
 * ── Quién decide qué ──
 * La detección está partida en dos sitios a propósito, y ninguna señal se
 * evalúa dos veces:
 *
 *  · **`index.html`, en línea y antes del primer pintado**: la preferencia
 *    guardada y las señales que no cuestan nada —núcleos, memoria, `saveData`—.
 *    Ahí porque si esperásemos a React, el primer frame saldría en modo alto y
 *    se vería el salto al degradar.
 *  · **Aquí**: lo que no se puede hacer antes de pintar. El rasterizador —si el
 *    navegador está en software, el renderer de WebGL lo dice por su nombre— y
 *    la cuenta real de fotogramas, que corre con la página ya viva.
 *
 * La sonda solo puede **degradar**, nunca subir a `high`: subir cambiaría el
 * aspecto del sitio a mitad de scroll, que es peor que quedarse sobrio.
 *
 * Y por encima de todo, la elección manual guardada en `localStorage`: hay
 * máquinas que no detectamos bien y hay gente que prefiere el modo sobrio.
 */

export type Perf = "high" | "low";

const CLAVE = "dox:perf";

/** Nombres de renderer que delatan pintado por software. */
const SOFTWARE = /swiftshader|llvmpipe|software|basic render|microsoft basic|paravirtual/;

function rasterizadorPorSoftware(): boolean {
  try {
    const lienzo = document.createElement("canvas");
    const gl = (lienzo.getContext("webgl") ||
      lienzo.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    // Sin WebGL casi siempre significa sin aceleración.
    if (!gl) return true;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return false;
    const nombre = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)).toLowerCase();
    return SOFTWARE.test(nombre);
  } catch {
    return true;
  }
}

/** Cuenta fotogramas reales durante ~900 ms. */
function sondaFps(cb: (fps: number) => void) {
  let n = 0;
  const t0 = performance.now();
  const tic = () => {
    n++;
    const dt = performance.now() - t0;
    if (dt < 900) requestAnimationFrame(tic);
    else cb(n / (dt / 1000));
  };
  requestAnimationFrame(tic);
}

/* ── Estado compartido ─────────────────────────────────────────────────── */

/* El valor se lee del DOM al cargar el modulo, no en un efecto.
   Los efectos de los componentes hijos corren ANTES que el del layout, asi que
   cuando la mirilla, el enjambre o la pila del paneo preguntaban por el modo,
   la respuesta todavia era "high" y se montaban igual. El script en linea de
   index.html ya dejo el atributo puesto antes de que cargue este bundle, asi
   que aqui ya esta disponible. */
function desdeElDom(): Perf {
  if (typeof document === "undefined") return "high";
  return document.documentElement.dataset.perf === "low" ? "low" : "high";
}

let actual: Perf = desdeElDom();
let manual = false;
let arrancado = false;
const oyentes = new Set<(p: Perf) => void>();

function aplicar(p: Perf) {
  if (p === actual && document.documentElement.dataset.perf === p) return;
  actual = p;
  document.documentElement.dataset.perf = p;
  oyentes.forEach((f) => f(p));
}

export function modoActual(): Perf {
  return actual;
}

/** La preferencia guardada, si la hay. */
export function preferencia(): Perf | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "low" || v === "high" ? v : null;
  } catch {
    return null;
  }
}

/** Elección manual: gana sobre la detección y sobre la sonda. */
export function elegirModo(p: Perf) {
  try {
    localStorage.setItem(CLAVE, p);
  } catch {
    /* modo privado: vale para esta sesion y no se guarda */
  }
  manual = true;
  aplicar(p);
}

/**
 * Termina la detección que no cabía antes de pintar. Idempotente: se llama una
 * sola vez, desde el layout.
 */
export function arrancarPerf() {
  if (arrancado || typeof document === "undefined") return;
  arrancado = true;

  if (preferencia()) {
    manual = true;
    return;
  }
  if (actual === "low") return;

  if (rasterizadorPorSoftware()) {
    aplicar("low");
    return;
  }
  sondaFps((fps) => {
    if (!manual && fps < 45) aplicar("low");
  });
}

/**
 * Lee el modo desde un componente y se entera de los cambios.
 *
 * Con `useSyncExternalStore` y no con estado propio: durante la hidratacion
 * devuelve lo mismo que renderizo el servidor —"high", porque el prerender no
 * ejecuta el script en linea— y React reconcilia despues sin avisar de
 * discrepancia. Con `useState` habria que elegir entre un aviso de hidratacion
 * o un render de mas en cada componente.
 */
export function usePerf(): Perf {
  return useSyncExternalStore(
    (f) => {
      oyentes.add(f);
      return () => {
        oyentes.delete(f);
      };
    },
    () => actual,
    () => "high" as Perf
  );
}

/** Atajo: `true` en modo ligero. */
export function useModoLigero(): boolean {
  return usePerf() === "low";
}
