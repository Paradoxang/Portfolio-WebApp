import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Las cuatro piezas de geometría pura, rehechas como SVG.
 *
 * Venían como bitmap sobre negro y se componían con `screen`. En SVG no hay
 * fondo que fundir, así que desaparece el recuadro negro; además quedan nítidas
 * a cualquier escala, pesan una fracción y —lo que importa aquí— se vuelven
 * contenedores elásticos capaces de alojar texto.
 *
 * Acabado según el original: trazo lavanda con halo (dos trazos superpuestos,
 * más barato que un `filter`) y acentos naranjas en las esquinas.
 */

interface Contenedor {
  children?: React.ReactNode;
  /** Dispara el dibujado de los trazos al entrar la capa. */
  dibujar?: boolean;
}

const LAVANDA = "#C9B8FF";
const NARANJA = "#FF9A5A";

/** Halo sin `filter`: un trazo ancho y translúcido debajo del fino. */
function Trazo({ d, ancho = 1.5 }: { d: string; ancho?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={LAVANDA} strokeWidth={ancho * 3} opacity={0.18} />
      <path d={d} fill="none" stroke={LAVANDA} strokeWidth={ancho} />
    </>
  );
}

/**
 * Dibuja los trazos del contenedor al entrar, en vez de aparecer de golpe.
 * Es lo que pedía el brief y que un bitmap no permitía: `drawSVG` recorre el
 * `stroke-dasharray` de cada `path` de 0 a su longitud.
 */
function useDibujarTrazos(activo: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!activo || !ref.current) return;
      const trazos = ref.current.querySelectorAll("path");
      if (!trazos.length) return;
      gsap.from(trazos, {
        drawSVG: "0%",
        duration: 1.1,
        stagger: 0.07,
        ease: "power2.out",
      });
    },
    { scope: ref, dependencies: [activo] }
  );
  return ref;
}

/* ── 02 · Retícula ── */
export function FxReticula() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="34" stroke={LAVANDA} strokeWidth="4.5" opacity="0.16" />
      <circle cx="50" cy="50" r="34" stroke={LAVANDA} strokeWidth="1.4" />
      <circle cx="50" cy="50" r="19" stroke={LAVANDA} strokeWidth="1" opacity="0.75" />
      <circle cx="50" cy="50" r="3.2" fill={NARANJA} />
      {[
        "M50 2 V16", "M50 84 V98", "M2 50 H16", "M84 50 H98",
      ].map((d) => (
        <path key={d} d={d} stroke={LAVANDA} strokeWidth="1.2" />
      ))}
      <path d="M50 26 V40 M50 60 V74 M26 50 H40 M60 50 H74" stroke={LAVANDA} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/* ── 03 · Corchetes de esquina ── */
export function FxCorchetes({ children, dibujar = false }: Contenedor) {
  const ref = useDibujarTrazos(dibujar);
  const L = 26; // largo del brazo, en unidades del viewBox
  const brazos = [
    `M2 ${L} V2 H${L}`,
    `M${100 - L} 2 H98 V${L}`,
    `M98 ${100 - L} V98 H${100 - L}`,
    `M${L} 98 H2 V${100 - L}`,
  ];
  return (
    <div className="fx-svg" ref={ref}>
      <svg viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {brazos.map((d) => (
          <Trazo key={d} d={d} ancho={1.6} />
        ))}
        {/* acentos naranjas en las esquinas */}
        <rect x="1" y="1" width="4" height="4" fill={NARANJA} />
        <rect x="95" y="95" width="4" height="4" fill={NARANJA} />
      </svg>
      <div className="fx-svg__texto">{children}</div>
    </div>
  );
}

/* ── 07 · Marco HUD ── */
export function FxMarcoHud({ children, dibujar = false }: Contenedor) {
  const ref = useDibujarTrazos(dibujar);
  return (
    <div className="fx-svg" ref={ref}>
      <svg viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {/* marco con esquinas achaflanadas */}
        <Trazo d="M12 2 H88 L98 12 V88 L88 98 H12 L2 88 V12 Z" ancho={1.4} />
        {/* muescas laterales */}
        <path d="M2 40 H10 M2 60 H10 M90 40 H98 M90 60 H98" stroke={LAVANDA} strokeWidth="1.2" opacity="0.8" />
        <rect x="14" y="4.5" width="9" height="2.2" fill={NARANJA} opacity="0.9" />
      </svg>
      <div className="fx-svg__texto fx-svg__texto--bloque">{children}</div>
    </div>
  );
}

/* ── 06 · Tira de datos ── */
export function FxTiraDatos({ children, dibujar = false }: Contenedor) {
  const marcas = Array.from({ length: 41 }, (_, i) => i * 2.5);
  const ref = useDibujarTrazos(dibujar);
  return (
    <div className="fx-svg fx-svg--tira" ref={ref}>
      <svg viewBox="0 0 100 18" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 17 H100" stroke={LAVANDA} strokeWidth="0.5" opacity="0.55" />
        {marcas.map((x, i) => (
          <path
            key={x}
            d={`M${x} 17 V${i % 4 === 0 ? 10 : 13.5}`}
            stroke={i % 4 === 0 ? LAVANDA : LAVANDA}
            strokeWidth={i % 4 === 0 ? 0.5 : 0.3}
            opacity={i % 4 === 0 ? 0.9 : 0.45}
          />
        ))}
        <rect x="0" y="15.6" width="14" height="1.4" fill={NARANJA} opacity="0.85" />
      </svg>
      <div className="fx-svg__texto fx-svg__texto--tira">{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Texto de los contenedores: telemetría que va y viene.
   Son datos reales del proyecto —stack, ubicación, rutas— no
   relleno: la estética es de consola, pero lo que dice es cierto.
   ──────────────────────────────────────────────────────────── */

/**
 * Filas del marco HUD. Se muestran **todas a la vez** —el panel se llena de
 * arriba abajo— y cada una tiene su propio repertorio de valores. En cada
 * latido solo se redescifra una fila, por turnos: si cambiaran las seis a la
 * vez el bloque parpadearía entero y dejaría de leerse como telemetría.
 */
const FILAS: { clave: string; valores: string[] }[] = [
  { clave: "SYS", valores: ["DOX//DESIGNS", "SM · 01", "NUCLEO OK"] },
  { clave: "STACK", valores: ["REACT 18.3", ".NET 8.0", "NODE 20"] },
  { clave: "ORIGEN", valores: ["CALI · CO", "3.4516 N", "76.5320 W"] },
  { clave: "ENLACE", valores: ["DOXDESIGNS.DEV", "TLS 1.3", "HSTS ON"] },
  { clave: "BUILD", valores: ["SSG · PRERENDER", "CLS 0.00", "TTFB 42MS"] },
  { clave: "ESTADO", valores: ["DISPONIBLE", "ACEPTANDO", "PARA MISIONES"] },
];

const LINEAS_CORCHETE = ["ESPECIALIDADES", "FULL-STACK", "UI · UX", "SEGURIDAD"];

const TIRA =
  "SYS://DOX · UPLINK ESTABLE · LAT 3.4516 N · LON 76.5320 W · REACT 18.3 · .NET 8.0 · NODE 20 · TTFB 42MS · CLS 0.00 · ESTADO: DISPONIBLE PARA MISIONES · ";

/** Rota una lista con un intervalo. Se detiene si `corriendo` es falso. */
function useRotacion(largo: number, ms: number, corriendo: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!corriendo || largo < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % largo), ms);
    return () => window.clearInterval(id);
  }, [largo, ms, corriendo]);
  return i;
}

/**
 * Panel del marco HUD: cabecera, seis filas y pie, ocupando la caja entera.
 *
 * Los valores no se cambian de golpe: se descifran carácter a carácter con
 * `scrambleText`, que es lo que le da la lectura de consola. En el primer
 * pintado se descifran los siete campos a la vez (el panel se enciende); a
 * partir de ahí solo el de turno, para que el bloque respire sin parpadear.
 */

const CANALES = ["CANAL 07", "CANAL 12", "CANAL 24", "CANAL 03"];

export function TelemetriaMarco({ corriendo }: { corriendo: boolean }) {
  /* Un contador continuo, no un índice de fila: de él salen tanto la fila que
     toca redescifrar como la vuelta de valores de cada una. */
  const t = useRotacion(FILAS.length * 3, 1700, corriendo);
  const ref = useRef<HTMLDivElement>(null);
  const primera = useRef(true);

  const turno = t % FILAS.length;
  const valor = (fila: (typeof FILAS)[number], k: number) =>
    fila.valores[Math.floor((t + k) / FILAS.length) % fila.valores.length];

  useGSAP(
    () => {
      const nodos = ref.current?.querySelectorAll<HTMLElement>("[data-valor]");
      if (!nodos?.length) return;
      const arranque = primera.current;
      primera.current = false;

      nodos.forEach((n) => {
        const fila = Number(n.dataset.fila);
        // -1 es la cabecera: se refresca solo al arrancar y al cerrar la vuelta.
        const suyo = arranque || (fila < 0 ? turno === 0 : fila === turno);
        if (!suyo) return;
        gsap.to(n, {
          duration: 0.8,
          delay: arranque ? Math.max(0, fila) * 0.07 + 0.1 : 0,
          scrambleText: {
            text: n.dataset.valor ?? "",
            chars: "01ABCDEF/·<>",
            speed: 0.55,
            revealDelay: 0.12,
          },
        });
      });
    },
    { scope: ref, dependencies: [t] }
  );

  return (
    <div className="fx-datos" ref={ref}>
      <div className="fx-datos__cabecera">
        <span
          className="fx-datos__valor"
          data-valor={CANALES[t % CANALES.length]}
          data-fila={-1}
        />
        <span className="fx-datos__pulso" />
      </div>

      <div className="fx-datos__rejilla">
        {FILAS.map((fila, k) => (
          <div className="fx-datos__fila" key={fila.clave}>
            <span className="fx-datos__clave">{fila.clave}</span>
            <span
              className="fx-datos__valor"
              data-valor={valor(fila, k)}
              data-fila={k}
            />
          </div>
        ))}
      </div>

      {/* Pie: barra de carga que avanza con el contador. No es un bucle nuevo,
          se mueve con los mismos latidos que los valores. */}
      <div className="fx-datos__pie">
        <span className="fx-datos__barra">
          <span style={{ width: `${((t % 8) + 1) * 12.5}%` }} />
        </span>
        <span className="fx-datos__pie-txt">SYNC</span>
      </div>
    </div>
  );
}

/** Etiqueta única de los corchetes, también descifrándose. */
export function TelemetriaCorchete({ corriendo }: { corriendo: boolean }) {
  const i = useRotacion(LINEAS_CORCHETE.length, 3200, corriendo);
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        duration: 1,
        scrambleText: {
          text: LINEAS_CORCHETE[i],
          chars: "01ABCDEF/·<>",
          speed: 0.5,
          revealDelay: 0.2,
        },
      });
    },
    { dependencies: [i] }
  );
  return <span className="fx-datos__etiqueta" ref={ref} />;
}

/** Cinta continua de la tira de datos. */
export function TelemetriaTira({ corriendo }: { corriendo: boolean }) {
  return (
    <motion.div
      className="fx-datos__cinta"
      animate={corriendo ? { x: ["0%", "-50%"] } : { x: "0%" }}
      transition={
        corriendo
          ? { duration: 26, repeat: Infinity, ease: "linear" }
          : { duration: 0 }
      }
    >
      <span>{TIRA}</span>
      <span aria-hidden="true">{TIRA}</span>
    </motion.div>
  );
}
