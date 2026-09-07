import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Capa gráfica de "What I Do".
 *
 * El orden de apilado es lo que hace que funcione, y va en la sección, no aquí:
 *
 *   z0 velo lateral · z1 eco del hero · z2 fondos · z3 sueltas
 *   z4 astronauta · z5 velo de nebulosa · z6 tarjetas y texto
 *
 * **Aquí no hay `mix-blend-mode`.** El brief entregaba ocho piezas sobre negro
 * para componerlas con `screen`, pero eso obliga a que el blend alcance un
 * fondo, y el `<main>` del layout lleva `z-index` y transiciones de Framer:
 * ya es un contexto de apilado y lo atrapa. La salida habría sido darle fondo
 * propio a la sección, tapando el campo de estrellas global. Se pasaron a RGBA
 * de verdad —alfa = canal máximo, RGB intacto—, la receta del brief 6, y la
 * composición vuelve a ser normal. Las once piezas van por alfa.
 */

export type Tramo = "movil" | "medio" | "ancho";

interface Pieza {
  id: string;
  /** Centro, en % del ancho y del alto de la sección. */
  x: number;
  y: number;
  /** Ancho en % del ancho de la sección. */
  w: number;
  o: number;
  /** Recorrido del parallax, en px. */
  prof: number;
  /** Tramo más estrecho en el que aparece. */
  desde: Tramo;
  /** Se centra en el casco del astronauta en vez de en x/y. */
  anclaCasco?: boolean;
  /* Posición y tamaño propios para el tramo estrecho.
     No es un ajuste fino de la misma composición: en móvil la sección cambia
     de forma —pasa de apaisada a una columna de unos 880 px de alto— y un
     porcentaje que en escritorio caía en el margen derecho aquí cae encima de
     la figura. El tamaño también sube: el 2 % del nodo son 8 px en un teléfono
     y a ese tamaño la pieza no se lee, se ensucia. */
  movil?: { x: number; y: number; w: number };
  /** Bucle propio. Solo lo llevan las siete piezas del presupuesto. */
  bucle?: {
    animate: Record<string, number[]>;
    transition: Record<string, unknown>;
  };
}

const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };
const visible = (p: { desde: Tramo }, t: Tramo) => NIVEL[t] >= NIVEL[p.desde];

/* ── z2 · fondos ──
   Las posiciones salen del brief, pero cuatro están corridas a la derecha. La
   razón, medida: el corredor central que el brief define va de 55 a 63 %, y su
   propia regla exige 40 px de holgura contra la zona B, que empieza en 55. Con
   la posición y el tamaño originales, la lente invadía la rejilla de tarjetas
   en 54x553 px y el destello en 66x25. Las dos reglas del brief no caben
   juntas; manda la que protege el texto.
   Al pasar la sección a sangre completa el corredor se ensanchó de 73 a 269 px,
   pero las piezas se quedan donde están: sobran holguras y no hay motivo para
   volver a apurarlas. */
const FONDOS: Pieza[] = [
  {
    /* Centrada en el CASCO, no en la caja de la figura ni en el centro de la
       sección. El lienzo del visor es 1792x2398 y el casco ocupa su tercio
       superior: su centroide está en el 52.9 / 35.1 % del archivo, que sobre la
       sección cae en el 82.4 / 49.4 %. Centrarla en la caja la dejaba visiblemente
       descolgada arriba y a la derecha.
       Gira 360 grados, así que su huella real es el círculo circunscrito: al
       seguir al casco se acerca a las tarjetas en pantallas medianas, y a 32 %
       de ancho se quedaba a 4 px del texto. A 26 % vuelve a haber holgura. */
    id: "wdid_09_lente", x: 82.4, y: 49.4, w: 26, o: 0.26, prof: 5, desde: "movil", anclaCasco: true,
    bucle: {
      animate: { rotate: [0, -360] },
      transition: { duration: 60, repeat: Infinity, ease: "linear" },
    },
  },
  {
    // x 68 y no 64.5: a 64.5 quedaban 9 px de holgura, no 40.
    id: "wdid_08_esfera", x: 68, y: 13, w: 11.5, o: 0.3, prof: 11, desde: "movil",
    /* En móvil baja a la banda inferior y se lee como un planeta. A 79 % de
       alto quedaba dentro del bloque de la composición y salía tapada al 87 %. */
    movil: { x: 62, y: 91, w: 15 },
    bucle: {
      animate: { rotate: [0, 360] },
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    },
  },
  { id: "wdid_07_diagrama", x: 80, y: 90, w: 24, o: 0.34, prof: 11, desde: "medio" },
  // x 68 y no 60: cruzaba la esquina superior derecha de la rejilla.
  { id: "wdid_02_destello", x: 68, y: 24.5, w: 17, o: 0.7, prof: 16, desde: "ancho" },
  { id: "wdid_04_fibra", x: 96.5, y: 72, w: 11, o: 0.55, prof: 16, desde: "medio" },
];

/* ── z3 · sueltas. Periodos primos entre sí y `delay` distinto en cada una: si
   dos comparten periodo se sincronizan y el conjunto deja de leerse como
   objetos independientes — se lee como que la sección entera vibra. ── */
const NODO: Pieza = {
  /* Sale del margen izquierdo y sube a la banda superior derecha.
     El brief da ese margen como corredor libre de 0 a 9 %, pero eso asumía que
     la rejilla empezaba en el 10 %. En esta sección —más ancha desde una
     ronda anterior— las tarjetas arrancan en el 5.1 %, así que el corredor
     real mide la mitad y, descontando los 40 px de holgura, no le queda sitio
     a ninguna pieza con su recorrido. */
  id: "wdid_01_nodo", x: 48, y: 8, w: 2.0, o: 0.8, prof: 14, desde: "movil",
  movil: { x: 87, y: 11, w: 5.5 },
  bucle: {
    animate: { opacity: [0.55, 0.85], rotate: [0, 360] },
    transition: {
      opacity: { duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0 },
      rotate: { duration: 50, repeat: Infinity, ease: "linear" },
    },
  },
};

const SUELTAS_ALFA: Pieza[] = [
  {
    // Baja a la franja inferior, por el mismo motivo que el nodo.
    id: "wdid_03_sello", x: 30, y: 97, w: 2.4, o: 0.9, prof: 14, desde: "movil",
    movil: { x: 11, y: 91, w: 6.5 },
    bucle: {
      animate: { y: [-12, 12], rotate: [-5, 5] },
      transition: { duration: 13, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.4 },
    },
  },
  {
    /* Las dos del corredor central bajan el parallax de 26 a 18 px. No es
       cosmético: con 26 px de deriva más el recorrido del bucle no caben en los
       73 px que deja la holgura de 40 px contra la rejilla, y a 58.5 invadían
       la esquina de las tarjetas en 21x136 px. */
    id: "wdid_05_guijarro", x: 64.5, y: 71, w: 3.4, o: 0.85, prof: 18, desde: "movil",
    movil: { x: 7, y: 23, w: 8 },
    bucle: {
      animate: { rotate: [-8, 8], y: [-16, 16], x: [-8, 8] },
      transition: { duration: 17, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2.9 },
    },
  },
  {
    // Gira 360 grados: su huella es el círculo circunscrito, no el rectángulo.
    id: "wdid_06_cinta", x: 63.5, y: 44, w: 4.6, o: 0.85, prof: 18, desde: "movil",
    movil: { x: 89, y: 88, w: 10 },
    bucle: {
      animate: { rotate: [0, 360] },
      transition: { duration: 34, repeat: Infinity, ease: "linear", delay: 4.1 },
    },
  },
];

/* ── z1 · eco del hero ──
   Diez instancias de seis archivos que ya están en `/hero/fx/`. No se copia ni
   se genera nada: mismos archivos, mismo sitio, cero peso añadido.
   `orden` sirve para recortar la lista por tramo: a 768-1279 se quitan las
   cuatro más pequeñas. En móvil vuelven las diez, agrandadas — ahí no tapan
   nada y son lo que puebla los márgenes alrededor de la figura. */
interface Eco {
  src: string;
  x: number;
  y: number;
  w: number;
  o: number;
  rot: number;
  orden: number;
  /* Posición para el tramo estrecho. En móvil la composición ocupa la banda
     del 25 al 82 % del alto de la sección y va por encima de toda la capa
     gráfica, así que ahí un eco se pinta y no se ve: cinco de los diez salían
     tapados al 100 %. Estas coordenadas los reparten por las dos bandas que
     quedan libres, arriba y abajo. */
  movil: { x: number; y: number };
}
const ECO: Eco[] = [
  { src: "elem_04_esfera_b", x: 7.5, y: 17, w: 3.0, o: 0.55, rot: 0, orden: 1, movil: { x: 6, y: 21.5 } },
  { src: "elem_05_fragmento_b", x: 30, y: 62, w: 2.6, o: 0.5, rot: 18, orden: 2, movil: { x: 44, y: 87 } },
  { src: "elem_04_esfera_c", x: 45.5, y: 19, w: 2.2, o: 0.5, rot: 0, orden: 3, movil: { x: 78, y: 4 } },
  { src: "elem_05_fragmento_a", x: 18.5, y: 93, w: 2.4, o: 0.45, rot: -24, orden: 4, movil: { x: 22, y: 96.5 } },
  { src: "elem_02_reticula", x: 71, y: 15, w: 2.0, o: 0.45, rot: 0, orden: 5, movil: { x: 68, y: 19 } },
  { src: "elem_04_esfera_b", x: 88.5, y: 34, w: 1.7, o: 0.4, rot: 0, orden: 6, movil: { x: 95, y: 15 } },
  { src: "elem_05_fragmento_c", x: 66, y: 62, w: 2.2, o: 0.45, rot: 32, orden: 7, movil: { x: 88, y: 96 } },
  { src: "elem_04_esfera_c", x: 39.5, y: 44, w: 1.4, o: 0.38, rot: 0, orden: 8, movil: { x: 52, y: 2.5 } },
  { src: "elem_05_fragmento_b", x: 92.5, y: 88, w: 2.0, o: 0.42, rot: -14, orden: 9, movil: { x: 4, y: 84 } },
  { src: "elem_02_reticula", x: 13.5, y: 44, w: 1.3, o: 0.35, rot: 0, orden: 10, movil: { x: 33, y: 22.5 } },
];
/** A 768-1279 se van las cuatro más pequeñas. En móvil vuelven las diez. */
const ECO_POR_TRAMO: Record<Tramo, number[]> = {
  ancho: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  medio: [1, 2, 4, 5, 6, 7],
  movil: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

/* En móvil el eco entero se agranda. Los anchos son porcentajes de la sección,
   y la sección pasa de 1700 px a 340: el 3 % que en escritorio es una esfera de
   50 px aquí sale a 10, que no se lee como una pieza sino como suciedad. A 2.6
   vuelven al tamaño aparente que tienen en el diseño ancho.
   Van las diez y no cuatro porque en móvil el eco no puede tapar nada: la
   composición lleva `z-4` con `isolation: isolate`, así que la figura y las
   tarjetas quedan por encima de toda la capa gráfica pase lo que pase. */
const ESCALA_ECO: Record<Tramo, number> = { ancho: 1, medio: 1, movil: 2.6 };

/** `x1` por debajo de 2 dppx. Se resuelve tras montar: en el prerender no hay
 *  `window`, y a estos tamaños servir `x2` a todo el mundo es desperdicio. */
export function useNitidez() {
  const [x2, setX2] = useState(false);
  useEffect(() => {
    setX2((window.devicePixelRatio || 1) >= 2);
  }, []);
  return x2 ? "x2" : "x1";
}

export function useTramo(): Tramo {
  const [tramo, setTramo] = useState<Tramo>("ancho");
  useEffect(() => {
    const ancho = window.matchMedia("(min-width: 1280px)");
    const medio = window.matchMedia("(min-width: 768px)");
    const leer = () => setTramo(ancho.matches ? "ancho" : medio.matches ? "medio" : "movil");
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

interface Props {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  tramo: Tramo;
  /** Los bucles solo corren con la seccion en pantalla. */
  corriendo: boolean;
}

function PiezaFx({
  p, sx, sy, quieto, carpeta, tramo,
}: {
  p: Pieza;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  quieto: boolean;
  carpeta: string;
  tramo: Tramo;
}) {
  /* El ancla del casco manda sobre la variante móvil: la lente se centra en la
     figura en los dos tramos, y en móvil la figura está en el centro. */
  const v = tramo === "movil" && p.movil ? p.movil : p;
  const d = quieto ? 0 : p.prof;
  const px = useTransform(sx, [-1, 1], [-d, d]);
  const py = useTransform(sy, [-1, 1], [-d * 0.6, d * 0.6]);
  const bucle = quieto ? undefined : p.bucle;

  return (
    <motion.img
      src={`/wdid/fx/${carpeta}/${p.id}.webp`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="lazy"
      className="wdid-fx__pieza"
      style={{
        left: p.anclaCasco ? `var(--casco-x, ${v.x}%)` : `${v.x}%`,
        top: p.anclaCasco ? `var(--casco-y, ${v.y}%)` : `${v.y}%`,
        width: `${v.w}%`,
        opacity: p.o,
        x: px,
        y: py,
      }}
      animate={bucle?.animate}
      transition={bucle?.transition}
    />
  );
}

export function WdidFx({ mx, my, tramo, corriendo }: Props) {
  /* Se paran los bucles igual con reduced-motion que fuera de pantalla: en los
     dos casos las piezas se quedan donde estan, que es lo que se quiere. */
  const quieto = !!useReducedMotion() || !corriendo;
  const carpeta = useNitidez();
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });

  const fondos = FONDOS.filter((p) => visible(p, tramo));
  const sueltasAlfa = SUELTAS_ALFA.filter((p) => visible(p, tramo));
  const hayNodo = visible(NODO, tramo);
  const escalaEco = ESCALA_ECO[tramo];
  const ecos = ECO.filter((e) => ECO_POR_TRAMO[tramo].includes(e.orden));

  /* Los tres contenedores que derivan —velo lateral, eco y nebulosa— lo hacen
     con una sola transformación cada uno. No cuentan contra el presupuesto de
     bucles porque mueven la capa entera, no cada pieza. */
  const derivaVelo = quieto
    ? undefined
    : { y: [0, -22, 0], transition: { duration: 60, repeat: Infinity, ease: "easeInOut" as const } };
  const derivaEco = quieto
    ? undefined
    : { y: [0, -26, 0], x: [0, 12, 0], transition: { duration: 70, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <>
      {/* z0 · velo lateral izquierdo. Sangra por la izquierda a propósito; la
          máscara solo cierra por la derecha. */}
      <motion.div className="wdid-fx wdid-fx--velo-izq" aria-hidden="true" animate={derivaVelo}>
        <img src={`/wdid/fx/${carpeta}/wdid_11_velo_izq.webp`} alt="" decoding="async" loading="lazy" />
      </motion.div>

      {/* z1 · eco del hero. Alfa, sin blend: los seis archivos ya son RGBA. */}
      <motion.div className="wdid-fx wdid-fx--eco" aria-hidden="true" animate={derivaEco}>
        {ecos.map((e, i) => (
          <img
            key={`${e.src}-${i}`}
            src={`/hero/fx/${carpeta}/${e.src}.webp`}
            alt=""
            decoding="async"
            loading="lazy"
            style={{
              left: `${tramo === "movil" ? e.movil.x : e.x}%`,
              top: `${tramo === "movil" ? e.movil.y : e.y}%`,
              width: `${+(e.w * escalaEco).toFixed(2)}%`,
              opacity: e.o,
              rotate: `${e.rot}deg`,
            }}
          />
        ))}
      </motion.div>

      {/* z2 · fondos, todos por `screen`. */}
      <div className="wdid-fx wdid-fx--fondos" aria-hidden="true">
        {fondos.map((p) => (
          <PiezaFx key={p.id} p={p} sx={sx} sy={sy} quieto={quieto} carpeta={carpeta} tramo={tramo} />
        ))}
      </div>

      {/* z3 · sueltas. El nodo va en capa aparte por herencia del reparto por
          pipeline del brief; ahora que todo es alfa daría igual juntarlas, pero
          separadas se recortan por tramo con menos ruido. */}
      {hayNodo && (
        <div className="wdid-fx wdid-fx--sueltas-screen" aria-hidden="true">
          <PiezaFx p={NODO} sx={sx} sy={sy} quieto={quieto} carpeta={carpeta} tramo={tramo} />
        </div>
      )}
      <div className="wdid-fx wdid-fx--sueltas" aria-hidden="true">
        {sueltasAlfa.map((p) => (
          <PiezaFx key={p.id} p={p} sx={sx} sy={sy} quieto={quieto} carpeta={carpeta} tramo={tramo} />
        ))}
      </div>
    </>
  );
}

/**
 * z5 · velo de nebulosa. Va aparte porque su sitio en el apilado depende de la
 * composición: por encima del astronauta y por debajo de las tarjetas, y en
 * móvil eso significa colocarlo dentro del bloque superpuesto.
 *
 * La máscara vive en el elemento que solo contiene la imagen: `mask-clip` es
 * `border-box` y en un contenedor con más cosas dentro las recortaría todas.
 */
export function WdidNebulosa({
  clase = "",
  corriendo = true,
}: {
  clase?: string;
  corriendo?: boolean;
}) {
  const quieto = !!useReducedMotion() || !corriendo;
  const carpeta = useNitidez();
  return (
    <motion.img
      src={`/wdid/fx/${carpeta}/wdid_10_nebulosa.webp`}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="lazy"
      className={`wdid-fx__nebulosa${clase ? ` ${clase}` : ""}`}
      animate={
        quieto
          ? undefined
          : {
              /* La deriva va SIMÉTRICA respecto al ancla. Con `[0, -18, 0]` el
                 gas solo se iba hacia un lado: pasaba los 45 s del ciclo entre
                 el casco y 18 px a su izquierda, así que de media quedaba
                 descentrado. El mismo recorrido, repartido, se queda en el
                 casco de media y el vaivén sigue leyéndose igual. */
              x: [-9, 9, -9],
              scale: [1, 1.05, 1],
              transition: { duration: 45, repeat: Infinity, ease: "easeInOut" },
            }
      }
    />
  );
}
