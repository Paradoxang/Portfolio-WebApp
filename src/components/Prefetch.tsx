import { useEffect } from "react";
import { FRAMES } from "@/components/heroPan";
import { modoActual } from "@/lib/perf";
import { routeFromPath } from "@/i18n/locales";

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
/** Los tres ángulos del núcleo. Los otros cuatro no se precargan: solo se
 *  piden si el visitante lleva el cursor a los bordes de la ventana, y
 *  adelantarlos costaba ocho descargas de 1792x2398 antes de poder interactuar. */
const NUCLEO = FRAMES.filter((k) => k === "pan_l30" || k === "pan_00" || k === "pan_r30");

function fuentesDelHero(): string[] {
  const ancho = window.innerWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const chico = ancho < 1024 || dpr < 2;
  const ruta = (set: string, key: string) =>
    chico ? `/hero/${set}w896/${key}.webp` : `/hero/${set}${key}.webp`;
  return [
    ...NUCLEO.map((k) => ruta("", k)),
    ...NUCLEO.map((k) => ruta("astro/", k)),
    "/nebula-banner.webp",
  ];
}

/**
 * Segunda tanda: "What I Do".
 *
 * Son once piezas gráficas, cuatro objetos de tarjeta y cuatro fotogramas del
 * visor, y todas iban con `loading="lazy"`. Eso significa que empezaban a
 * descargarse y a decodificarse justo cuando el visitante llegaba a la sección
 * — o sea, en mitad del scroll, que es cuando peor sienta. Calentadas antes, al
 * llegar ya están decodificadas y el scroll no tropieza.
 *
 * Solo en la portada: la sección no existe en las otras rutas y esto es un
 * megabyte que no hay por qué gastar donde no se va a usar.
 */
const PIEZAS_WDID = [
  "wdid_01_nodo", "wdid_02_destello", "wdid_03_sello", "wdid_04_fibra",
  "wdid_05_guijarro", "wdid_06_cinta", "wdid_07_diagrama", "wdid_08_esfera",
  "wdid_09_lente", "wdid_10_nebulosa", "wdid_11_velo_izq",
];
const ECO_WDID = [
  "elem_02_reticula", "elem_04_esfera_b", "elem_04_esfera_c",
  "elem_05_fragmento_a", "elem_05_fragmento_b", "elem_05_fragmento_c",
];
const OBJETOS_TARJETA = [
  "wdid_01_modulo", "wdid_02_astrolabio", "wdid_03_cristal", "wdid_04_vela",
];

function fuentesDeWdid(): string[] {
  // Mismo criterio que `useNitidez` en la sección: por debajo de 2 dppx, x1.
  const n = (window.devicePixelRatio || 1) >= 2 ? "x2" : "x1";
  const visor =
    window.innerWidth < 1024 || (window.devicePixelRatio || 1) < 2
      ? (k: string) => `/hero/visor/w896/${k}.webp`
      : (k: string) => `/hero/visor/${k}.webp`;
  return [
    ...PIEZAS_WDID.map((k) => `/wdid/fx/${n}/${k}.webp`),
    ...ECO_WDID.map((k) => `/hero/fx/${n}/${k}.webp`),
    ...OBJETOS_TARJETA.map((k) => `/wdid/${n}/${k}.webp`),
    ...["visor_0", "visor_1", "visor_2", "visor_3"].map(visor),
  ];
}

export function Prefetch() {
  useEffect(() => {
    let cancelado = false;
    let idle = 0;
    let respaldo = 0;

    const pedir = (urls: string[]) => {
      for (const url of urls) {
        const img = new Image();
        // Baja prioridad: esto es adelanto de trabajo, no camino crítico.
        img.fetchPriority = "low";
        img.decoding = "async";
        img.onload = () => void img.decode().catch(() => undefined);
        img.src = url;
      }
    };

    const calentar = () => {
      if (cancelado) return;
      /* En modo ligero no se calienta nada. La precarga es trabajo adelantado,
         y en una máquina que va justa el adelanto se le quita a lo que el
         visitante está mirando ahora mismo. */
      if (modoActual() === "low") return;
      pedir(fuentesDelHero());
      /* La sección va en una segunda tanda, en el siguiente hueco ocioso: si
         entrara con la primera competiría con el hero, que es lo que el
         visitante está mirando. */
      if (routeFromPath(window.location.pathname)?.key === "home") {
        const seguir = () => {
          if (!cancelado) pedir(fuentesDeWdid());
        };
        const ric = window.requestIdleCallback;
        if (ric) ric(seguir, { timeout: 6000 });
        else window.setTimeout(seguir, 1200);
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
