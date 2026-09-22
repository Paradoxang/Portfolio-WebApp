import { motion, useReducedMotion } from "framer-motion";
import { useNitidez, type Tramo } from "@/components/WdidFx";
import { EASE } from "@/lib/anim";

/**
 * Capa gráfica de "Selected Projects".
 *
 * El apilado, que es lo que hace que la tableta se lea como un objeto y no
 * como un PNG pegado:
 *
 *   z0 fondo (escombros, proyección) · z1 eco de secciones anteriores
 *   z2 maquinaria (brazo) · z3 carrusel · z4 marco · z5 piezas delanteras
 *   z6 texto
 *
 * **Dos sistemas de coordenadas, a propósito.**
 *
 *  · Las seis piezas del brief vienen medidas sobre una composición de
 *    1920x1080, así que viven dentro de un escenario de 16:9 —`.projects__escena`—
 *    y sus porcentajes son exactamente los del montaje de referencia. Si se
 *    midieran contra la sección entera, que incluye el titular y crece con él,
 *    cada porcentaje significaría algo distinto en cada pantalla.
 *
 *  · El eco sí mide contra la sección completa: su trabajo es poblar los
 *    márgenes, incluido el que rodea al titular.
 *
 * **Aquí tampoco hay `mix-blend-mode`.** El brief entrega la proyección y los
 * escombros sobre negro para componerlos con `screen`, pero el `<main>` del
 * layout lleva `z-index` y transiciones de Framer: ya es un contexto de
 * apilado y atrapa el blend, así que las dos piezas saldrían como rectángulos
 * negros. Se convirtieron a RGBA de verdad —alfa = canal máximo, RGB intacto—,
 * la misma receta del brief 6 que ya se usó en "What I Do".
 */

interface Pieza {
  id: string;
  /** Centro, en % del ancho y del alto del ESCENARIO 16:9. */
  x: number;
  y: number;
  /** Ancho en % del ancho del escenario. */
  w: number;
  o: number;
  /** Giro base, en grados. Los bucles oscilan alrededor de él. */
  rot: number;
  /** Tramo más estrecho en el que aparece. */
  desde: Tramo;
  clase?: string;
  bucle?: {
    animate: Record<string, number[]>;
    transition: Record<string, unknown>;
  };
}

const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };
const visible = (p: { desde: Tramo }, t: Tramo) => NIVEL[t] >= NIVEL[p.desde];

/* Periodos primos entre sí y delays escalonados, como en el brief 8: si dos
   piezas comparten periodo se acompasan y la sección entera parece vibrar en
   vez de leerse como objetos independientes. */

/** z0 · fondo. */
const FONDO: Pieza[] = [
  {
    /* Sangra un 5 % por los dos lados: es la pieza que exige que la sección
       vaya a pantalla completa. La deriva va hacia el lado CONTRARIO al de la
       fila superior del carrusel —que corre hacia la izquierda—, y eso es lo
       que multiplica la sensación de profundidad sin añadir ninguna capa. */
    id: "sp_25_escombros", x: 50, y: 60, w: 128, o: 0.55, rot: 0, desde: "movil",
    clase: "projects__escombros",
    bucle: {
      animate: { x: [-34, 34] },
      transition: { duration: 31, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0 },
    },
  },
  {
    /* El cono se abre hacia arriba y su parte ancha llega a la altura del
       titular. La máscara vive en el CSS y lo desvanece antes de llegar. */
    id: "sp_24_proyeccion", x: 50, y: 30, w: 62, o: 0.4, rot: 0, desde: "medio",
    clase: "projects__cono",
    bucle: {
      animate: { opacity: [0.32, 0.46], scaleY: [1, 1.03] },
      transition: { duration: 19, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.8 },
    },
  },
];

/** z2 · maquinaria de fondo. Entra desde el borde derecho. */
const MAQUINARIA: Pieza[] = [
  {
    id: "sp_23_brazo", x: 90, y: 44, w: 42, o: 0.85, rot: 8, desde: "medio",
    bucle: {
      animate: { x: [-18, 18], rotate: [6.5, 9.5] },
      transition: { duration: 23, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 3.1 },
    },
  },
];

/** z5 · piezas delanteras, por encima del marco. */
const DELANTERAS: Pieza[] = [
  {
    id: "sp_22_stylus", x: 73.5, y: 23.5, w: 11.5, o: 0.95, rot: -6, desde: "medio",
    bucle: {
      animate: { y: [-10, 10], rotate: [-9, -3] },
      transition: { duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.7 },
    },
  },
  {
    id: "sp_21_cartucho", x: 24.5, y: 30, w: 5.5, o: 0.95, rot: -10, desde: "ancho",
    bucle: {
      animate: { y: [-14, 14], rotate: [-16, -4] },
      transition: { duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0 },
    },
  },
];

/* ── z1 · eco de secciones anteriores ──
   Ocho instancias de archivos que ya están en `/hero/fx/` y `/wdid/fx/`. No se
   copia ni se genera nada: mismas rutas, cero peso añadido. Las ocho ya son
   RGBA de rondas anteriores, así que las dos que el brief marca como `screen`
   —retícula y nodo— entran por alfa como las demás.
   Las coordenadas van sobre la SECCIÓN, no sobre el escenario. */
interface Eco {
  src: string;
  x: number;
  y: number;
  w: number;
  o: number;
  rot: number;
  orden: number;
}
const ECO: Eco[] = [
  { src: "/hero/fx/x1/elem_04_esfera_b", x: 8, y: 22, w: 2.6, o: 0.5, rot: 0, orden: 1 },
  { src: "/hero/fx/x1/elem_05_fragmento_c", x: 93, y: 20, w: 2.4, o: 0.45, rot: 22, orden: 2 },
  { src: "/wdid/fx/x1/wdid_05_guijarro", x: 15.5, y: 80, w: 2.6, o: 0.5, rot: 0, orden: 3 },
  { src: "/hero/fx/x1/elem_04_esfera_c", x: 88.5, y: 78, w: 2.0, o: 0.45, rot: 0, orden: 4 },
  { src: "/wdid/fx/x1/wdid_03_sello", x: 4.5, y: 52, w: 2.2, o: 0.55, rot: 0, orden: 5 },
  { src: "/hero/fx/x1/elem_02_reticula", x: 77.5, y: 11.5, w: 1.8, o: 0.4, rot: 0, orden: 6 },
  { src: "/wdid/fx/x1/wdid_01_nodo", x: 23.5, y: 13.5, w: 1.6, o: 0.45, rot: 0, orden: 7 },
  { src: "/hero/fx/x1/elem_05_fragmento_a", x: 60, y: 93, w: 2.0, o: 0.4, rot: -16, orden: 8 },
];
const ECO_POR_TRAMO: Record<Tramo, number[]> = {
  ancho: [1, 2, 3, 4, 5, 6, 7, 8],
  medio: [1, 2, 3, 4, 5],
  movil: [1, 3, 8],
};
/* Los anchos son porcentajes de la sección, y la sección pasa de 1900 px a
   340: el 2 % que en escritorio es una esfera de 38 px en un teléfono sale a
   7 y no se lee como pieza. Mismo criterio que en "What I Do". */
const ESCALA_ECO: Record<Tramo, number> = { ancho: 1, medio: 1.3, movil: 2.8 };

/* Entrada de la sección: fondo, luego marco, luego piezas sueltas. La
   decoración nunca aparece antes que el sujeto.
   Va aquí y no en la sección porque cada capa tiene que llevarla puesta ella
   misma: un envoltorio común con `scale` sería un contexto de apilado y se
   llevaría por delante el orden z0/z1/z2 — el eco, que mide contra la sección
   y vive fuera del escenario, dejaría de poder colarse entre el fondo y la
   maquinaria. */
export const ENTRADA = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.09, ease: EASE },
  }),
};

function PiezaFx({ p, quieto, carpeta }: { p: Pieza; quieto: boolean; carpeta: string }) {
  return (
    <motion.img
      src={`/projects/${carpeta}/${p.id}.webp`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="lazy"
      className={`projects__pieza${p.clase ? ` ${p.clase}` : ""}`}
      style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, opacity: p.o, rotate: p.rot }}
      animate={quieto ? undefined : p.bucle?.animate}
      transition={quieto ? undefined : p.bucle?.transition}
    />
  );
}

/**
 * Fondo y maquinaria: todo lo que va DETRÁS de la tableta.
 * El eco se saca aparte porque mide contra la sección y no contra el escenario.
 */
export function ProjectsFondo({ tramo, corriendo }: { tramo: Tramo; corriendo: boolean }) {
  const quieto = !!useReducedMotion() || !corriendo;
  const carpeta = useNitidez();
  return (
    <>
      <motion.div
        className="projects__capa projects__capa--fondo"
        aria-hidden="true"
        variants={ENTRADA}
        custom={0}
      >
        {FONDO.filter((p) => visible(p, tramo)).map((p) => (
          <PiezaFx key={p.id} p={p} quieto={quieto} carpeta={carpeta} />
        ))}
      </motion.div>
      <motion.div
        className="projects__capa projects__capa--maquinaria"
        aria-hidden="true"
        variants={ENTRADA}
        custom={0}
      >
        {MAQUINARIA.filter((p) => visible(p, tramo)).map((p) => (
          <PiezaFx key={p.id} p={p} quieto={quieto} carpeta={carpeta} />
        ))}
      </motion.div>
    </>
  );
}

/** z5 · las dos piezas que van por delante del marco. */
export function ProjectsDelanteras({ tramo, corriendo }: { tramo: Tramo; corriendo: boolean }) {
  const quieto = !!useReducedMotion() || !corriendo;
  const carpeta = useNitidez();
  const piezas = DELANTERAS.filter((p) => visible(p, tramo));
  if (!piezas.length) return null;
  return (
    <motion.div
      className="projects__capa projects__capa--delanteras"
      aria-hidden="true"
      variants={ENTRADA}
      custom={2}
    >
      {piezas.map((p) => (
        <PiezaFx key={p.id} p={p} quieto={quieto} carpeta={carpeta} />
      ))}
    </motion.div>
  );
}

/**
 * z1 · eco. Ninguna pieza se anima por separado: **una sola transformación
 * sobre el contenedor**, como en el brief 8. Ocho bucles más reventarían el
 * presupuesto y, a 65 segundos, lo que se percibe no es movimiento sino
 * profundidad. Por eso no cuenta contra los siete.
 */
export function ProjectsEco({ tramo, corriendo }: { tramo: Tramo; corriendo: boolean }) {
  const quieto = !!useReducedMotion() || !corriendo;
  const escala = ESCALA_ECO[tramo];
  const ecos = ECO.filter((e) => ECO_POR_TRAMO[tramo].includes(e.orden));
  return (
    <motion.div
      className="projects__capa projects__capa--eco"
      aria-hidden="true"
      animate={
        quieto
          ? undefined
          : {
              y: [0, -22, 0],
              x: [0, 10, 0],
              transition: { duration: 65, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      {ecos.map((e) => (
        <img
          key={`${e.src}-${e.orden}`}
          src={`${e.src}.webp`}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            width: `${+(e.w * escala).toFixed(2)}%`,
            opacity: e.o,
            rotate: `${e.rot}deg`,
          }}
        />
      ))}
    </motion.div>
  );
}
