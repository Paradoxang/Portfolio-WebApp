import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  FxCorchetes,
  FxMarcoHud,
  FxReticula,
  FxTiraDatos,
  TelemetriaCorchete,
  TelemetriaMarco,
  TelemetriaTira,
} from "@/components/HeroFxSvg";

/**
 * Capa decorativa del hero.
 *
 * Tres decisiones la gobiernan:
 *
 *  1. **Un solo par de motion values.** `mx`/`my` llegan del `pointermove` que
 *     el hero ya escucha para el paneo; aquí no se abre un segundo listener.
 *     Cada pieza deriva su recorrido con su propia profundidad, y eso es lo que
 *     crea la sensación de espacio.
 *
 *  2. **Sin modos de mezcla.** Los assets venían sobre negro puro para
 *     componerse con `screen`, pero ese negro seguía viéndose: el `z-index` de
 *     la capa crea un contexto de apilado que aísla el blend, y depender de eso
 *     era frágil. Se convirtieron a RGBA de verdad —alfa = brillo del píxel—,
 *     así que ya no hay fondo que ocultar.
 *
 *  3. **Cuatro piezas son SVG.** Retícula, corchetes, marco y tira eran
 *     geometría pura; en SVG quedan nítidas, pesan una fracción y admiten
 *     texto dentro.
 */

type Capa = "fondo" | "medio" | "contenedor" | "acento";
type Tramo = "movil" | "medio" | "ancho";

interface Pieza {
  /** Clave de React. Varias piezas pueden compartir asset con ids distintos. */
  id: string;
  /** Archivo, si difiere del id (para repetir un asset en varios sitios). */
  src?: string;
  x: number;
  y: number;
  w: string;
  o: number;
  /** Giro fijo, para que un asset repetido no se lea como copia. */
  giro?: number;
  capa: Capa;
  /** Tramo más estrecho en el que aparece. */
  desde: Tramo;
  /** Tramo más ancho en el que aparece. Sin él, llega hasta el más ancho. */
  hasta?: Tramo;
  /** Fuerza el lado de la capa. Por defecto lo decide `capa`; los contenedores
   *  grandes lo llevan a `true` para pasar por detrás del texto legible. */
  detras?: boolean;
  /** Si viene, la pieza se dibuja en SVG en vez de con un bitmap. */
  svg?: (corriendo: boolean) => ReactNode;
  /** Proporción de la caja SVG, que no la impone una imagen. */
  ratio?: string;
  /** Órbita del acento: radio en px y vuelta en segundos. */
  orbita?: { r: number; dur: number };
}

const PROFUNDIDAD: Record<Capa, number> = {
  fondo: 6,
  medio: 12,
  contenedor: 18,
  acento: 30,
};

/**
 * Zonas prohibidas: el wordmark ocupa el centro inferior y los raíles los dos
 * bordes verticales. Las piezas de la tabla original caían encima y tapaban
 * texto legible, así que están recolocadas fuera de esas franjas.
 */
const PIEZAS: Pieza[] = [
  // — detrás del contenido —
  { id: "elem_08_malla", x: 50, y: 97, w: "clamp(700px, 92vw, 1250px)", o: 0.34, capa: "fondo", desde: "medio" },
  { id: "elem_10_vortice", x: 95, y: 30, w: "clamp(300px, 40vw, 560px)", o: 0.42, capa: "fondo", desde: "medio" },
  { id: "elem_09_anillo", x: 50.5, y: 45, w: "clamp(420px, 62vw, 820px)", o: 0.52, capa: "medio", desde: "movil" },
  /* Polvo de estrellas. Tres apariciones, no cuatro, y ninguna en la esquina
     superior izquierda: ahí era donde se leía como una mancha pegada. Van a los
     dos huecos vacíos de los flancos y, en móvil, a la franja sobre la cabeza
     —el único sitio donde la figura, que va a sangre, no las tapa. */
  // 72vw y no 86: a lo ancho el cúmulo se salía por arriba de la pantalla.
  { id: "part_movil", src: "elem_01_particulas", x: 52, y: 16, w: "72vw", o: 0.42, capa: "fondo", desde: "movil", hasta: "movil" },
  // y 24 y no 29: más abajo el cúmulo mordía el texto vertical del raíl.
  { id: "part_izq", src: "elem_01_particulas", x: 27, y: 24, w: "clamp(180px, 22vw, 320px)", o: 0.46, capa: "fondo", desde: "medio", giro: 24 },
  { id: "part_der", src: "elem_01_particulas", x: 80, y: 40, w: "clamp(170px, 21vw, 300px)", o: 0.4, capa: "fondo", desde: "medio", giro: 148 },
  // — por delante, contenedores en SVG —
  {
    // Bajado: a 64% se metía en la franja del raíl "ESPECIALIDADES".
    // Algo más grande que antes: ahora lleva el panel de telemetría completo.
    id: "marco_hud", x: 17, y: 79, w: "clamp(178px, 20vw, 280px)", o: 0.88,
    capa: "contenedor", desde: "medio", ratio: "1 / 1", detras: true,
    svg: (c) => <FxMarcoHud dibujar><TelemetriaMarco corriendo={c} /></FxMarcoHud>,
  },
  {
    // A todo lo ancho y pegada al borde inferior: es una cinta de datos, y
    // cortada a media pantalla parecía un recorte.
    id: "tira_datos", x: 50, y: 98.5, w: "100%", o: 0.7,
    capa: "contenedor", desde: "medio", ratio: "100 / 6", detras: true,
    svg: (c) => <FxTiraDatos dibujar><TelemetriaTira corriendo={c} /></FxTiraDatos>,
  },
  {
    id: "corchetes", x: 82, y: 22, w: "clamp(130px, 15vw, 205px)", o: 0.72,
    capa: "contenedor", desde: "medio", ratio: "1 / 1",
    svg: (c) => <FxCorchetes dibujar><TelemetriaCorchete corriendo={c} /></FxCorchetes>,
  },
  {
    id: "reticula", x: 33, y: 13, w: "clamp(44px, 5vw, 66px)", o: 0.85,
    capa: "acento", desde: "ancho", ratio: "1 / 1",
    svg: () => <FxReticula />,
  },
  // — acentos sólidos —
  { id: "elem_04_esfera_a", x: 11, y: 27, w: "clamp(64px, 7.5vw, 104px)", o: 0.95, capa: "acento", desde: "movil", orbita: { r: 16, dur: 18 } },
  // Apartada del raíl derecho: a 92% se le montaba encima al texto vertical.
  { id: "elem_04_esfera_c", x: 86, y: 46, w: "clamp(48px, 5.4vw, 74px)", o: 0.9, capa: "acento", desde: "medio", orbita: { r: 12, dur: 23 } },
  /* Los dos cristales bajan a móvil: eran lo que más se echaba en falta ahí.
     Uno sobre el hombro izquierdo y otro en el hueco de arriba a la derecha,
     los dos por delante de la figura, que es donde se leen como esquirlas
     flotando y no como parches. */
  // Subido: sobre el marco HUD se plantaba encima de la telemetría y la tapaba.
  { id: "elem_05_fragmento_c", x: 10, y: 57, w: "clamp(50px, 5.2vw, 72px)", o: 0.85, capa: "acento", desde: "movil", orbita: { r: 14, dur: 26 } },
  { id: "elem_05_fragmento_a", x: 76, y: 15, w: "clamp(46px, 4.4vw, 60px)", o: 0.8, capa: "acento", desde: "movil", orbita: { r: 10, dur: 20 } },
];

const DETRAS: Capa[] = ["fondo", "medio"];
const ORDEN: Capa[] = ["fondo", "medio", "contenedor", "acento"];

/* Los tramos son un rango, no una lista: una pieza puede existir solo en móvil
   (la franja de partículas sobre la cabeza no cabe en escritorio) igual que
   otra existe solo de tablet para arriba. */
const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };
const enTramo = (p: Pieza, t: Tramo) =>
  NIVEL[t] >= NIVEL[p.desde] && (!p.hasta || NIVEL[t] <= NIVEL[p.hasta]);

function useTramo(): Tramo {
  const [tramo, setTramo] = useState<Tramo>("ancho");
  useEffect(() => {
    const ancho = window.matchMedia("(min-width: 1280px)");
    const medio = window.matchMedia("(min-width: 768px)");
    const leer = () =>
      setTramo(ancho.matches ? "ancho" : medio.matches ? "medio" : "movil");
    leer();
    ancho.addEventListener("change", leer);
    medio.addEventListener("change", leer);
    return () => {
      ancho.removeEventListener("change", leer);
      medio.removeEventListener("change", leer);
    };
  }, []);
  return tramo;
}

/** Los bucles continuos de los bitmaps. */
const BUCLES: Record<
  string,
  { animate: Record<string, number[]>; transition: Record<string, unknown> }
> = {
  elem_09_anillo: {
    animate: { rotate: [0, 360] },
    // lineal a propósito: es un objeto girando, no una transición de interfaz
    transition: { duration: 28, repeat: Infinity, ease: "linear" },
  },
  elem_10_vortice: {
    animate: { rotate: [0, 8], scale: [1, 1.04] },
    transition: { duration: 34, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

interface HeroFxProps {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  listo: boolean;
  corriendo: boolean;
}

export function HeroFx({ mx, my, listo, corriendo }: HeroFxProps) {
  const quieto = useReducedMotion();
  const tramo = useTramo();
  const dpr2 =
    typeof window !== "undefined" && (window.devicePixelRatio || 1) >= 2;

  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });

  const piezas = PIEZAS.filter((p) => enTramo(p, tramo));

  const capa = (grupo: Pieza[], clase: string) =>
    grupo.length > 0 && (
      <div className={clase} aria-hidden="true">
        {grupo.map((p) => (
          <PiezaFx
            key={p.id}
            p={p}
            sx={sx}
            sy={sy}
            quieto={!!quieto}
            listo={listo}
            corriendo={corriendo && !quieto}
            dpr2={dpr2}
            orden={ORDEN.indexOf(p.capa)}
          />
        ))}
      </div>
    );

  const vaDetras = (p: Pieza) => p.detras ?? DETRAS.includes(p.capa);
  const detras = piezas.filter(vaDetras);
  const delante = piezas.filter((p) => !vaDetras(p));

  /* Dos capas, no cuatro: al pasar los assets a RGBA desapareció la necesidad
     de separar por modo de mezcla. */
  return (
    <>
      {capa(detras, "hero__fx hero__fx--detras")}
      {capa(delante, "hero__fx hero__fx--delante")}
    </>
  );
}

/**
 * Recorrido elíptico continuo con `motionPath`.
 *
 * Va en un nodo propio, anidado dentro del que mueve Framer: los dos motores
 * escriben `transform`, y compartir elemento sería una pelea. Framer lleva el
 * parallax fuera; GSAP, la órbita dentro.
 */
function useOrbita(orbita: Pieza["orbita"], activa: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!orbita || !activa || !ref.current) return;
      const { r, dur } = orbita;
      gsap.to(ref.current, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: r, y: -r * 0.55 },
            { x: 0, y: -r * 1.1 },
            { x: -r, y: -r * 0.55 },
            { x: 0, y: 0 },
          ],
          curviness: 1.7,
        },
        duration: dur,
        repeat: -1,
        ease: "none",
      });
    },
    { dependencies: [activa, orbita?.r, orbita?.dur] }
  );
  return ref;
}

interface PiezaProps {
  p: Pieza;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  quieto: boolean;
  listo: boolean;
  corriendo: boolean;
  dpr2: boolean;
  orden: number;
}

function PiezaFx({ p, sx, sy, quieto, listo, corriendo, dpr2, orden }: PiezaProps) {
  const d = PROFUNDIDAD[p.capa];
  // Con reduced-motion la pieza se queda: solo se congela el recorrido.
  const x = useTransform(sx, [-1, 1], quieto ? [0, 0] : [-d, d]);
  const y = useTransform(sy, [-1, 1], quieto ? [0, 0] : [-d * 0.6, d * 0.6]);

  const bucle = corriendo ? BUCLES[p.id] : undefined;
  const orbitaRef = useOrbita(p.orbita, corriendo);
  const entrada = { opacity: p.o, scale: 1 };
  const curva = { duration: 0.8, delay: orden * 0.07, ease: [0.16, 1, 0.3, 1] };

  return (
    <motion.div
      className={`fx__pieza${p.src === "elem_08_malla" || p.id === "elem_08_malla" ? " fx__pieza--malla" : ""}`}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.w,
        aspectRatio: p.ratio,
        rotate: p.giro,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={listo ? (bucle ? { ...entrada, ...bucle.animate } : entrada) : { opacity: 0, scale: 0.94 }}
      transition={
        bucle
          ? { opacity: curva, scale: curva, ...bucle.transition }
          : curva
      }
    >
      <div ref={orbitaRef} className="fx__orbita">
        {p.svg ? (
          p.svg(corriendo)
        ) : (
          <img
            src={`/hero/fx/${dpr2 ? "x2" : "x1"}/${p.src ?? p.id}.webp`}
            alt=""
            aria-hidden="true"
            draggable={false}
            // en minúsculas: el renderizador de servidor de esta versión no
            // reconoce `fetchPriority` y avisa en cada build
            {...{ fetchpriority: "low" }}
            decoding="async"
          />
        )}
      </div>
    </motion.div>
  );
}
