import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { muestrario, type Project } from "@/data/site";

/**
 * El carrusel que corre dentro de la tableta.
 *
 * Es DOM real, no una textura: se ve a través del hueco del marco y los clics
 * lo alcanzan porque el marco va con `pointer-events: none`.
 *
 * ── Por qué CSS y no Framer Motion ──
 * El brief propone `<motion.div animate={{x:['0%','-50%']}}>`. Aquí va con
 * `@keyframes` y `animation-play-state`, y no es capricho:
 *
 *  · **La pausa en hover tiene que ser exacta.** Un tween de Framer no se
 *    detiene en su sitio: al cambiar el `animate` reinterpola desde el valor
 *    actual y la fila da un tirón justo cuando el visitante se acerca a leer.
 *    `animation-play-state: paused` congela el fotograma tal cual.
 *  · **Parar fuera de pantalla también.** El criterio del brief pide que el
 *    carrusel no anime con la sección fuera de vista, verificable en el
 *    perfilador. Pausada, la animación CSS deja de existir para el compositor;
 *    un bucle de JS sigue costando aunque no se vea.
 *  · Y no hay un `requestAnimationFrame` por fila corriendo en el hilo
 *    principal mientras la página hace scroll.
 *
 * ── El vídeo solo corre dentro del agujero ──
 * Los proyectos tienen que verse moverse mientras el carrusel avanza, así que
 * las tarjetas llevan vídeo y no solo el póster. Pero el carrusel duplica la
 * lista para que el bucle sea infinito: son dieciocho tarjetas y once megas de
 * WebM entre los nueve proyectos. Reproducirlas todas sería tener dieciocho
 * decodificadores vivos para enseñar tres.
 *
 * Así que cada tarjeta lleva su propio `IntersectionObserver` **con el hueco de
 * la tableta como raíz**: el vídeo se pide y arranca cuando la tarjeta entra en
 * la pantalla, y se para cuando sale por el otro lado. Dentro del agujero caben
 * unas 2.9 por fila, así que en cualquier instante hay seis reproduciéndose, no
 * dieciocho. Con `preload="none"` tampoco se descarga nada hasta que le toca.
 *
 * El póster sigue puesto como `poster` del vídeo: es lo que se ve mientras el
 * archivo llega, y evita el parpadeo en negro al entrar por el borde.
 */

/**
 * El carrusel sirve las previews de 480 px, no las de 960.
 *
 * Precargarlas no era una opción: la precarga no ahorra un solo byte, solo
 * adelanta los 11,8 MB para que compitan con el hero, y con `preload="auto"` en
 * dieciocho elementos el navegador se traería los nueve archivos nada más
 * cargar la portada. Lo que sí sobraba era resolución: las tarjetas se pintan a
 * 199x183 CSS —399 en una pantalla de doble densidad— y el vídeo venía a 960 de
 * ancho, un sobremuestreo de 4,8x. A 480 px es nítido en retina y el conjunto
 * baja de 11,8 MB a 4,3.
 *
 * Las de 960 se quedan donde están: `/proyectos` las pinta a tamaño grande y
 * ahí sí hacen falta.
 */
const mini = (ruta: string) => ruta.replace(/-960\.(webm|mp4)$/, "-480.$1");

/** Las dos filas, repartidas para que ninguna repita proyecto de la otra. */
function repartir<T>(xs: T[]): [T[], T[]] {
  const mitad = Math.ceil(xs.length / 2);
  return [xs.slice(0, mitad), xs.slice(mitad)];
}

function Tarjeta({ p, activo }: { p: Project; activo: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [enPantalla, setEnPantalla] = useState(false);
  const poster = p.preview?.poster.replace(/\.jpg$/, ".webp") ?? "";

  /* La raíz del observador es el hueco de la tableta —o la pantalla suelta en
     móvil—, no la ventana: lo que importa no es si la tarjeta está en el
     viewport del navegador sino si se ve POR EL AGUJERO. Sin esa raíz, las
     dieciocho contarían como visibles a la vez, que es justo lo que hay que
     evitar. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raiz = el.closest(".projects__viewport, .phone__viewport");
    const io = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), {
      root: raiz instanceof Element ? raiz : null,
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Arranca al asomar y para al salir. `play()` es lo que dispara la descarga,
     porque el elemento va con `preload="none"`. */
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (activo && enPantalla) {
      v.play().catch(() => {
        /* autoplay bloqueado: se queda el póster, que ya está puesto */
      });
    } else {
      v.pause();
    }
  }, [activo, enPantalla]);

  return (
    <Link
      ref={ref}
      to={`/proyectos#${p.slug}`}
      className="carrusel__tarjeta"
      aria-label={`Ver caso: ${p.name}`}
    >
      {/* El póster va SIEMPRE como imagen propia, además de como atributo del
          vídeo. El `poster` de un <video> con `preload="none"` no siempre se
          pinta antes de que el vídeo arranque, y en la columna del móvil eso
          dejaba media pantalla del teléfono en negro mientras las tarjetas de
          abajo esperaban su turno. Es la misma URL, así que no son bytes de
          más: la segunda petición sale de la caché. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        /* Carga inmediata, no perezosa. Dentro del hueco del telefono las
           tarjetas van en un contenedor recortado y transformado, y ahi el
           aplazamiento no es fiable: se quedaban siete de dieciocho sin pedir y
           media pantalla del movil en negro. Son nueve WebP distintos, de 7 a
           76 KB, y con prioridad baja no le quitan ancho de banda a lo que el
           visitante esta mirando. */
        fetchPriority="low"
        decoding="async"
        draggable={false}
        className="carrusel__medio"
      />
      {p.preview && (
        <video
          ref={vid}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          className="carrusel__medio carrusel__medio--video"
        >
          <source src={mini(p.preview.webm)} type="video/webm" />
          <source src={mini(p.preview.mp4)} type="video/mp4" />
        </video>
      )}
      <span className="carrusel__rotulo">
        <span className="carrusel__num">{p.num}</span>
        {p.name}
      </span>
    </Link>
  );
}

/**
 * Una fila. La lista va **duplicada** y se anima de 0 a -50 %: es la única
 * forma de que el bucle no tenga salto en la costura.
 *
 * La separación entre tarjetas va como `margin-inline-end` de la tarjeta y no
 * como `gap` del carril. Con `gap`, el carril mide `2n·T + (2n-1)·G` y el
 * -50 % se queda medio hueco corto de la vuelta exacta: cada ciclo pega un
 * salto de medio hueco. Con el margen dentro de la tarjeta cada una ocupa
 * `T+G`, el carril mide `2n·(T+G)` y el -50 % cae clavado.
 */
function Fila({
  items,
  hacia,
  indice,
  activo,
}: {
  items: Project[];
  hacia: "izq" | "der";
  indice: number;
  /** Con la sección fuera de pantalla no se reproduce ni la que asoma. */
  activo: boolean;
}) {
  const [pausa, setPausa] = useState(false);
  const doble = [...items, ...items];
  return (
    <div
      className="carrusel__fila"
      onPointerEnter={() => setPausa(true)}
      onPointerLeave={() => setPausa(false)}
    >
      <div
        className={`carrusel__carril carrusel__carril--${hacia}${pausa ? " esta-pausado" : ""}`}
      >
        {/* `activo` NO se cruza con `pausa`: el hover para el carril para que
            puedas mirar un proyecto, y pararle el vídeo justo entonces sería lo
            contrario de lo que se busca. */}
        {doble.map((p, i) => (
          <Tarjeta key={`${p.slug}-${indice}-${i}`} p={p} activo={activo} />
        ))}
      </div>
    </div>
  );
}

/**
 * Columna vertical, para el móvil.
 *
 * En una pantalla casi tres veces más alta que ancha un carril horizontal
 * enseña un proyecto y medio. Bajando, entran unas 3.7 tarjetas y la última
 * queda cortada por el borde inferior, que es lo que hace que se lea como
 * bucle y no como lista.
 *
 * Pausa al TOCAR, no en hover: en un móvil no hay hover, así que la pausa del
 * carril horizontal aquí no existiría.
 */
function Columna({ items, activo }: { items: Project[]; activo: boolean }) {
  const [pausa, setPausa] = useState(false);
  const doble = [...items, ...items];
  return (
    <div
      className="carrusel__fila carrusel__fila--v"
      onTouchStart={() => setPausa(true)}
      onTouchEnd={() => setPausa(false)}
      onTouchCancel={() => setPausa(false)}
    >
      <div className={`carrusel__columna${pausa ? " esta-pausado" : ""}`}>
        {doble.map((p, i) => (
          <Tarjeta key={`${p.slug}-v-${i}`} p={p} activo={activo} />
        ))}
      </div>
    </div>
  );
}

/**
 * @param vertical En móvil los proyectos bajan por la pantalla del teléfono,
 *                 que es lo único que cabe en una pantalla tres veces más alta
 *                 que ancha.
 * @param quieto   Con `prefers-reduced-motion` no se elimina el carrusel: se
 *                 detiene y pasa a ser una fila con scroll manual y
 *                 `scroll-snap`. Los proyectos siguen siendo accesibles.
 */
export function CarruselProyectos({
  vertical = false,
  quieto = false,
  activo = true,
}: {
  vertical?: boolean;
  quieto?: boolean;
  /** La sección está en pantalla y en marcha. */
  activo?: boolean;
}) {
  /* El muestrario, no la lista entera. Son seis y no nueve porque la sección
     dejó de ser un portafolio: su argumento es "entra y muévete por él", así
     que lo que no tiene enlace vivo no cuenta. Con seis, `repartir()` deja
     tres por fila y la columna del móvil respira mejor. */
  const conPreview = muestrario.filter((p) => p.preview);

  if (quieto) {
    return (
      <div className="carrusel carrusel--manual" role="list">
        {conPreview.map((p) => (
          <div key={p.slug} role="listitem" className="carrusel__hueco">
            {/* Con movimiento reducido tampoco se reproduce el vídeo: se queda
                el póster y el visitante recorre los proyectos a mano. */}
            <Tarjeta p={p} activo={false} />
          </div>
        ))}
      </div>
    );
  }

  if (vertical) {
    return (
      <div className="carrusel carrusel--columna">
        <Columna items={conPreview} activo={activo} />
      </div>
    );
  }

  const [arriba, abajo] = repartir(conPreview);
  return (
    <div className="carrusel">
      {/* Las dos filas van en sentidos opuestos y con duraciones distintas
          —42 s y 55 s—, que es lo que hace que nunca se acompasen. */}
      <Fila items={arriba} hacia="izq" indice={0} activo={activo} />
      <Fila items={abajo} hacia="der" indice={1} activo={activo} />
    </div>
  );
}
