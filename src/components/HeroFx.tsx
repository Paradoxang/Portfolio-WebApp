import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";
import { useModoLigero } from "@/lib/perf";
import { EASE } from "@/lib/anim";
import { useTramo, type Tramo } from "@/components/WdidFx";
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
  /** Capa a sangre: cubre el hero entero con `object-fit: cover` en vez de
   *  medir por su ancho. La proporción del archivo no tiene por qué coincidir
   *  con la de la pantalla, y recortar es mejor que dejar franjas. */
  lleno?: boolean;
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
  /* Polvo de estrellas. Ya no son cúmulos sueltos repartidos a mano: el asset
     nuevo es una capa entera, densa en las esquinas y con un corredor vacío en
     diagonal por el centro — justo por donde pasan la figura y el wordmark. Va
     al fondo del todo (z-4), por debajo del enjambre, de la figura y de
     cualquier texto, así que no puede tapar nada.

     La capa entera es de tablet en adelante. En un móvil vertical no funciona:
     al ser 16:9, o se recorta y se pierden las esquinas —que es donde está toda
     la densidad— o se estira tanto que el grano se diluye. Ahí vuelven los
     cúmulos sueltos del asset viejo, uno por esquina. */
  { id: "polvo", src: "elem_11_polvo", x: 50, y: 50, w: "108%", o: 0.55, capa: "fondo", desde: "medio", lleno: true },
  { id: "part_sup_izq", src: "elem_01_particulas", x: 8, y: 5, w: "50vw", o: 0.5, capa: "fondo", desde: "movil", hasta: "movil" },
  { id: "part_inf_der", src: "elem_01_particulas", x: 92, y: 96, w: "46vw", o: 0.45, capa: "fondo", desde: "movil", hasta: "movil", giro: 165 },
  // — por delante, contenedores en SVG —
  {
    // Bajado: a 64% se metía en la franja del raíl "ESPECIALIDADES".
    // Algo más grande que antes: ahora lleva el panel de telemetría completo.
    id: "marco_hud", x: 17, y: 79, w: "clamp(178px, 20vw, 280px)", o: 1,
    capa: "contenedor", desde: "medio", ratio: "1 / 1", detras: true,
    svg: (c) => <FxMarcoHud dibujar><TelemetriaMarco corriendo={c} /></FxMarcoHud>,
  },
  {
    // A todo lo ancho y pegada al borde inferior: es una cinta de datos, y
    // cortada a media pantalla parecía un recorte. También en móvil: el nombre
    // acaba en el 88% de la altura y los 100 px de debajo estaban mudos.
    id: "tira_datos", x: 50, y: 98.5, w: "100%", o: 0.92,
    capa: "contenedor", desde: "movil", ratio: "100 / 6", detras: true,
    svg: (c) => <FxTiraDatos dibujar><TelemetriaTira corriendo={c} /></FxTiraDatos>,
  },
  {
    id: "corchetes", x: 82, y: 22, w: "clamp(130px, 15vw, 205px)", o: 0.95,
    capa: "contenedor", desde: "medio", ratio: "1 / 1",
    svg: (c) => <FxCorchetes dibujar><TelemetriaCorchete corriendo={c} /></FxCorchetes>,
  },
  {
    id: "reticula", x: 33, y: 13, w: "clamp(44px, 5vw, 66px)", o: 0.85,
    capa: "acento", desde: "ancho", ratio: "1 / 1",
    svg: () => <FxReticula />,
  },
  // — acentos sólidos —
  /* La esfera va partida por tramo. En escritorio el raíl izquierdo está a
     media altura y x=11 queda libre; en móvil el raíl sube al 15% y ahí la
     esfera se plantaba sobre "ESPECIALIDADES" —855 px² medidos, y por delante,
     que es lo peor—. La versión de móvil se aparta a la derecha lo justo para
     que ni el radio de la órbita la devuelva. */
  { id: "elem_04_esfera_a", x: 11, y: 27, w: "clamp(64px, 7.5vw, 104px)", o: 0.95, capa: "acento", desde: "medio", orbita: { r: 16, dur: 18 } },
  { id: "esfera_a_movil", src: "elem_04_esfera_a", x: 26, y: 22, w: "64px", o: 0.95, capa: "acento", desde: "movil", hasta: "movil", orbita: { r: 16, dur: 18 } },
  /* Sube por encima del raíl derecho. El 86 valía cuando ese raíl era solo
     una etiqueta fina; al entrar el "02" el grupo pasó a medir 242 px y llega
     hasta el 79 % del ancho, así que la esfera quedó dentro y por delante:
     114x103 px sobre el número y 16x132 sobre la etiqueta, medidos contra la
     tinta y no contra la caja.
     El pasillo del raíl va del 35 al 65 % de alto; a y=22, sumando su radio de
     órbita y los 30 px de parallax, la envolvente termina 34 px por encima. */
  { id: "elem_04_esfera_c", x: 90, y: 22, w: "clamp(48px, 5.4vw, 74px)", o: 0.9, capa: "acento", desde: "medio", orbita: { r: 12, dur: 23 } },
  /* Los dos cristales bajan a móvil: eran lo que más se echaba en falta ahí.
     Uno sobre el hombro izquierdo y otro en el hueco de arriba a la derecha,
     los dos por delante de la figura, que es donde se leen como esquirlas
     flotando y no como parches. */
  /* Apartado a la derecha del raíl: a x=10 caía justo sobre el "01" —72x41 px
     de solape medidos, y la órbita lo empeoraba. A x=24 entra en el pasillo
     que queda entre el raíl y la figura, que estaba vacío. */
  { id: "elem_05_fragmento_c", x: 24, y: 56, w: "clamp(50px, 5.2vw, 72px)", o: 0.85, capa: "acento", desde: "movil", orbita: { r: 14, dur: 26 } },
  /* En móvil baja fuera de la banda superior. Del 0 al 18 % del alto es zona
     prohibida: ahí va la píldora de estado, y a y=15 este cristal le pisaba el
     final de la palabra —17x7 px medidos—. La regla del brief 8 es que ninguna
     pieza estética tape texto, y vale también en móvil. */
  { id: "elem_05_fragmento_a", x: 76, y: 15, w: "clamp(46px, 4.4vw, 60px)", o: 0.8, capa: "acento", desde: "medio", orbita: { r: 10, dur: 20 } },
  { id: "frag_a_movil", src: "elem_05_fragmento_a", x: 84, y: 30, w: "46px", o: 0.8, capa: "acento", desde: "movil", hasta: "movil", orbita: { r: 10, dur: 20 } },
  /* Esquina inferior derecha. Es la única zona del hero que quedaba muda: el
     wordmark acaba antes, el raíl va más arriba y la cinta de datos empieza
     más abajo. Los dos van de tablet en adelante — en móvil ese rincón es del
     nombre, que ocupa el ancho entero. */
  /* Baja del 70 al 75: a 70 su envolvente subía hasta el 63.7 % y rozaba la
     etiqueta del raíl —13x37 px—. La esfera sirve igual en móvil: a esa altura
     cae entre el raíl y el nombre. */
  { id: "elem_12_esfera_d", x: 89, y: 75, w: "clamp(70px, 8vw, 115px)", o: 0.92, capa: "acento", desde: "movil", orbita: { r: 13, dur: 21 } },
  // x 82 y no 79: a 79 quedaba a 5 px del wordmark y la órbita se le echaba encima.
  { id: "elem_13_fragmento_d", x: 82, y: 84, w: "clamp(58px, 6.4vw, 92px)", o: 0.82, capa: "acento", desde: "medio", giro: -12, orbita: { r: 11, dur: 24 } },
  /* El cristal nuevo sí necesita sitio propio en móvil: en el 82/84 del
     escritorio se plantaría justo encima del nombre, que ahí ocupa casi todo
     el ancho. Se va al flanco izquierdo, sobre el pecho de la figura. */
  { id: "frag_d_movil", src: "elem_13_fragmento_d", x: 14, y: 72, w: "58px", o: 0.82, capa: "acento", desde: "movil", hasta: "movil", giro: 18, orbita: { r: 11, dur: 24 } },
];

const DETRAS: Capa[] = ["fondo", "medio"];
const ORDEN: Capa[] = ["fondo", "medio", "contenedor", "acento"];

/* Los tramos son un rango, no una lista: una pieza puede existir solo en móvil
   (la franja de partículas sobre la cabeza no cabe en escritorio) igual que
   otra existe solo de tablet para arriba. */
const NIVEL: Record<Tramo, number> = { movil: 0, medio: 1, ancho: 2 };
const enTramo = (p: Pieza, t: Tramo) =>
  NIVEL[t] >= NIVEL[p.desde] && (!p.hasta || NIVEL[t] <= NIVEL[p.hasta]);


/**
 * Los dos bucles continuos de los bitmaps, ahora como clases CSS.
 *
 * Iban con `animate` de Framer y el problema era el mismo que en las órbitas:
 * al salir el hero de pantalla se quitaban las claves del bucle y la pieza
 * volvía de golpe a su estado base. Como `@keyframes` se congelan donde estén.
 * El anillo gira lineal a propósito —es un objeto girando, no una transición de
 * interfaz— y el vórtice respira con ida y vuelta.
 */
const BUCLES_CSS: Record<string, string> = {
  elem_09_anillo: "fx__pieza--gira",
  elem_10_vortice: "fx__pieza--respira",
};

interface HeroFxProps {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  listo: boolean;
  corriendo: boolean;
}

export function HeroFx({ mx, my, listo, corriendo }: HeroFxProps) {
  /* El modo ligero entra por la misma puerta que reduced-motion. */
  const ligero = useModoLigero();
  const quieto = useReducedMotion() || ligero;
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
  /* `fx-parado` es el interruptor de toda la decoración: órbitas, los dos
     bucles de bitmap y la cinta de datos son animaciones CSS, y esta clase las
     congela donde estén en vez de devolverlas al principio. Antes se les
     quitaba el `animate` de Framer y por eso saltaban al salir el hero de
     pantalla. */
  const parado = !corriendo || !!quieto ? " fx-parado" : "";

  return (
    <>
      {capa(detras, `hero__fx hero__fx--detras${parado}`)}
      {capa(delante, `hero__fx hero__fx--delante${parado}`)}
    </>
  );
}

/**
 * Recorrido elíptico continuo.
 *
 * Va en un nodo propio, anidado dentro del que mueve Framer: los dos escriben
 * transformaciones y compartir elemento sería una pelea. Framer lleva el
 * parallax fuera; la órbita va dentro, ahora con `@keyframes`.
 *
 * **Ya no usa GSAP.** El `motionPath` recorría una lista de puntos que empezaba
 * y acababa en el origen, pero GSAP no sabía que era cerrada: la tangente del
 * final no casaba con la del principio y cada vuelta se veía un cambio de
 * dirección en seco. Y `useGSAP` revierte su animación al cambiar una
 * dependencia —una de ellas era «el hero está en pantalla»—, así que al volver
 * de otra sección la pieza saltaba a su origen.
 *
 * La elipse está muestreada en el CSS a partir de x = r·sen0, y = -0.55r·(1-cos0),
 * que es exactamente la misma figura. El fotograma final coincide con el
 * inicial en posición y en velocidad, y parar es `animation-play-state`, que
 * congela donde esté.
 */

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

  const entrada = { opacity: p.o, scale: 1 };
  /* Sin entrada cuando esta quieto: la pieza se pinta ya en su sitio.
     No es solo ahorrarse la animacion — es que la VISIBILIDAD dependia de que
     esa animacion llegase a correr. Si algo la impide, la decoracion entera se
     queda a opacidad cero, y que desaparezca la visualizacion es justo lo que
     no puede pasar en el modo que existe para las maquinas que van justas. */
  const curva = quieto
    ? { duration: 0 }
    : { duration: 0.8, delay: orden * 0.07, ease: EASE };

  return (
    <motion.div
      className={[
        "fx__pieza",
        p.src === "elem_08_malla" || p.id === "elem_08_malla" ? "fx__pieza--malla" : "",
        p.lleno ? "fx__pieza--lleno" : "",
        // Los dos bucles de bitmap son CSS: se pausan, no se desmontan.
        BUCLES_CSS[p.id] ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.w,
        // A sangre la altura la marca el hero, no la proporción del archivo.
        height: p.lleno ? "108%" : undefined,
        aspectRatio: p.ratio,
        rotate: p.giro,
        x,
        y,
      }}
      initial={quieto ? false : { opacity: 0, scale: 0.94 }}
      animate={quieto || listo ? entrada : { opacity: 0, scale: 0.94 }}
      transition={curva}
    >
      <div
        className={`fx__orbita${p.orbita ? " fx__orbita--activa" : ""}`}
        style={
          p.orbita
            ? ({ "--orb-r": `${p.orbita.r}px`, "--orb-dur": `${p.orbita.dur}s` } as React.CSSProperties)
            : undefined
        }
      >
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
