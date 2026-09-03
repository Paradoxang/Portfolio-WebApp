import { useEffect } from "react";
import { FRAMES } from "@/components/heroPan";

/**
 * Precarga en segundo plano, sin tapar nada.
 *
 * El hero pinta 14 retratos y dos tipografías propias; en un móvil modesto eso
 * se nota como tirones. Aquí se descargan y **decodifican** cuando el navegador
 * ya no tiene trabajo, así están listos antes de que hagan falta:
 *  - en la home, para cuando el visitante interactúe con la figura;
 *  - en el resto de rutas, para que volver al inicio sea instantáneo.
 *
 * Nada de velo: taparlo convertía la propia pantalla de carga en el LCP.
 * Por eso arranca después de `load` y en tiempo ocioso, y pide las imágenes con
 * prioridad baja: no compite con lo que la página necesita para pintarse.
 */

/** Si el navegador nunca queda ocioso, se arranca igualmente. */
const RESPALDO_MS = 2500;

/** Solo el set que este dispositivo vaya a usar de verdad. */
function fuentesDelHero(): string[] {
  const ancho = window.innerWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const ligero = ancho < 1024 || dpr < 2;
  const ruta = (set: string, key: string) =>
    ligero ? `/hero/${set}w896/${key}.webp` : `/hero/${set}${key}.webp`;
  return [
    ...FRAMES.map((k) => ruta("", k)),
    ...FRAMES.map((k) => ruta("astro/", k)),
    "/nebula-banner.webp",
  ];
}

export function Prefetch() {
  useEffect(() => {
    let cancelado = false;
    let idle = 0;
    let respaldo = 0;

    const calentar = () => {
      if (cancelado) return;
      for (const url of fuentesDelHero()) {
        const img = new Image();
        // Baja prioridad: esto es adelanto de trabajo, no camino crítico.
        img.fetchPriority = "low";
        img.decoding = "async";
        img.onload = () => void img.decode().catch(() => undefined);
        img.src = url;
      }
    };

    const programar = () => {
      if (cancelado) return;
      const ric = window.requestIdleCallback;
      if (ric) idle = ric(calentar, { timeout: 3000 });
      else respaldo = window.setTimeout(calentar, 300);
    };

    // Después de `load`: primero que la página termine de pintarse.
    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });
    const tope = window.setTimeout(programar, RESPALDO_MS);

    return () => {
      cancelado = true;
      window.removeEventListener("load", programar);
      window.clearTimeout(tope);
      window.clearTimeout(respaldo);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
    };
  }, []);

  return null;
}
