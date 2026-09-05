import { useEffect, useRef, useState } from "react";

/**
 * Bucle del visor: cuatro frames que se alternan a corte seco.
 *
 * Es ambiente, no interacción: corre solo, no depende del cursor y no lleva
 * fundido — el crossfade emborrona el disco y le quita la rotación.
 *
 * Los cuatro comparten lienzo (1792×2398) y canal alfa idéntico, así que se
 * apilan con la misma geometría y solo se conmuta cuál está visible.
 */

const FRAMES = ["visor_0", "visor_1", "visor_2", "visor_3"] as const;
const BASE = 0;
/** 150 ms: más rápido se vuelve nervioso, más lento se ve a saltos. */
const PASO_MS = 150;
/** Techo de espera a la decodificación: `decode()` puede no resolver nunca en
 *  un documento que no se está rasterizando. */
const DECODE_TIMEOUT_MS = 2000;

export function VisorLoop() {
  /** Los otros tres se montan tras el primer pintado, para no competir con el
   *  primer render de la sección. */
  const [montado, setMontado] = useState(false);
  const [listo, setListo] = useState(false);
  const [actual, setActual] = useState(BASE);
  const figRef = useRef<HTMLElement>(null);

  // 1) Montar el resto de frames después del primer pintado. El temporizador es
  //    el respaldo: en una pestaña en segundo plano el rAF queda en pausa.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMontado(true));
    const timer = window.setTimeout(() => setMontado(true), 300);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  // 2) Decodificar los cuatro antes de arrancar: si uno se decodifica al vuelo,
  //    el bucle da un tirón en la primera vuelta.
  useEffect(() => {
    if (!montado) return;
    let cancelado = false;
    const imgs = Array.from(figRef.current?.querySelectorAll("img") ?? []);
    const fin = () => {
      if (!cancelado) setListo(true);
    };
    const timer = window.setTimeout(fin, DECODE_TIMEOUT_MS);
    Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(
      () => {
        window.clearTimeout(timer);
        fin();
      }
    );
    return () => {
      cancelado = true;
      window.clearTimeout(timer);
    };
  }, [montado]);

  // 3) El bucle. Se detiene con la pestaña oculta y con la sección fuera de
  //    pantalla: son cuatro imágenes grandes cambiando cuatro veces por
  //    segundo, dejarlo corriendo sin verse es gasto puro.
  useEffect(() => {
    if (!listo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fig = figRef.current;
    if (!fig) return;

    let intervalo = 0;
    /** Se asume visible y el observer corrige: si esperásemos a su primera
     *  entrada, un observer que no la entregue dejaría el bucle sin arrancar. */
    let visible = true;

    const arrancar = () => {
      if (intervalo || !visible || document.hidden) return;
      intervalo = window.setInterval(
        () => setActual((i) => (i + 1) % FRAMES.length),
        PASO_MS
      );
    };
    const parar = () => {
      window.clearInterval(intervalo);
      intervalo = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        visible ? arrancar() : parar();
      },
      { threshold: 0 }
    );
    io.observe(fig);
    const onVis = () => (document.hidden ? parar() : arrancar());
    document.addEventListener("visibilitychange", onVis);
    arrancar();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      parar();
    };
  }, [listo]);

  return (
    <figure ref={figRef} className="visor">
      {/* La máscara vive aquí dentro, nunca en la figura: `mask-clip` es
          `border-box` y recortaría cualquier otro elemento del contenedor. */}
      <div className="visor__stack">
        {FRAMES.map((key, i) => {
          if (!montado && i !== BASE) return null;
          const esBase = i === BASE;
          return (
            <picture key={key}>
              {/* Bajo 1024px siempre el set ligero; por encima decide el DPR. */}
              <source
                media="(max-width: 1023px)"
                srcSet={`/hero/visor/w896/${key}.webp`}
              />
              <img
                src={`/hero/visor/${key}.webp`}
                srcSet={`/hero/visor/w896/${key}.webp 896w, /hero/visor/${key}.webp 1792w`}
                sizes="460px"
                width={1792}
                height={2398}
                alt={esBase ? "Casco con un agujero negro girando en el visor" : ""}
                aria-hidden={esBase ? undefined : true}
                draggable={false}
                className={`visor__f${i === actual ? " is-on" : ""}`}
              />
            </picture>
          );
        })}
      </div>
    </figure>
  );
}
