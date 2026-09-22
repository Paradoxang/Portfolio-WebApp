import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { muestrario, type Project } from "@/data/site";
import { useLocale } from "@/i18n/LocaleContext";

/**
 * El carrusel que corre dentro de la tableta.
 *
 * Es DOM real, no una textura: se ve a través del hueco del marco y los clics
 * lo alcanzan porque el marco va con `pointer-events: none`.
 *
 * ── Por qué CSS y no Framer Motion ──
 * Va con `@keyframes` y `animation-play-state`, y no es capricho:
 *
 *  · **La pausa en hover tiene que ser exacta.** Un tween de Framer no se
 *    detiene en su sitio: al cambiar el `animate` reinterpola desde el valor
 *    actual y la fila da un tirón justo cuando el visitante se acerca a leer.
 *    `animation-play-state: paused` congela el fotograma tal cual.
 *  · **Parar fuera de pantalla también.** Pausada, la animación CSS deja de
 *    existir para el compositor; un bucle de JS sigue costando aunque no se
 *    vea.
 *  · La pausa también entra por teclado: `:focus-within` en el carril (CSS)
 *    la congela cuando el foco cae en una tarjeta.
 *
 * ── El vídeo solo corre dentro del agujero ──
 * Cada tarjeta lleva su propio `IntersectionObserver` **con el hueco de la
 * tableta como raíz**: el vídeo se pide y arranca cuando la tarjeta entra en
 * la pantalla, y se para cuando sale por el otro lado. Con `preload="none"`
 * tampoco se descarga nada hasta que le toca.
 *
 * ── La lista va duplicada, pero solo una vez para el teclado ──
 * El bucle infinito necesita la lista dos veces. La segunda mitad va
 * `aria-hidden` y sin tabulación: antes un lector recorría doce enlaces para
 * seis proyectos, todos con el mismo nombre.
 */

/**
 * El carrusel sirve las previews de 480 px, no las de 960: las tarjetas se
 * pintan a 199x183 CSS y a 480 px son nítidas en retina, con el conjunto
 * bajando de 11,8 MB a 4,3. Las de 960 se quedan para la página de proyectos.
 */
const mini = (ruta: string) => ruta.replace(/-960\.(webm|mp4)$/, "-480.$1");

/** Las dos filas, repartidas para que ninguna repita proyecto de la otra. */
function repartir<T>(xs: T[]): [T[], T[]] {
  const mitad = Math.ceil(xs.length / 2);
  return [xs.slice(0, mitad), xs.slice(mitad)];
}

function Tarjeta({ p, activo, duplicada = false }: { p: Project; activo: boolean; duplicada?: boolean }) {
  const { t, href } = useLocale();
  const ref = useRef<HTMLAnchorElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [enPantalla, setEnPantalla] = useState(false);
  const poster = p.preview?.poster.replace(/\.jpg$/, ".webp") ?? "";
  const nombre = t.pages.projects.items[p.slug].name;

  /* La raíz del observador es el hueco de la tableta —o la pantalla suelta en
     móvil—, no la ventana: lo que importa no es si la tarjeta está en el
     viewport del navegador sino si se ve POR EL AGUJERO. */
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
      to={`${href("projects")}#${p.slug}`}
      className="carrusel__tarjeta"
      aria-label={t.showcase.cardAria(nombre)}
      aria-hidden={duplicada || undefined}
      tabIndex={duplicada ? -1 : undefined}
    >
      {/* El póster va SIEMPRE como imagen propia, además de como atributo del
          vídeo: el `poster` de un <video> con `preload="none"` no siempre se
          pinta antes de que el vídeo arranque. Misma URL: sale de la caché. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        /* Carga inmediata, no perezosa: dentro del hueco transformado el
           aplazamiento no es fiable. Prioridad baja para no quitarle ancho de
           banda a lo que el visitante está mirando. En minúsculas: React 18
           no conoce `fetchPriority` y avisaba en cada tarjeta. */
        {...{ fetchpriority: "low" }}
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
        {nombre}
      </span>
    </Link>
  );
}

/**
 * Una fila. La lista va **duplicada** y se anima de 0 a -50 %: es la única
 * forma de que el bucle no tenga salto en la costura.
 *
 * La separación entre tarjetas va como `margin-inline-end` de la tarjeta y no
 * como `gap` del carril: con `gap` el -50 % se queda medio hueco corto de la
 * vuelta exacta y cada ciclo pega un salto.
 */
function Fila({
  items,
  hacia,
  activo,
}: {
  items: Project[];
  hacia: "izq" | "der";
  /** Con la sección fuera de pantalla no se reproduce ni la que asoma. */
  activo: boolean;
}) {
  const [pausa, setPausa] = useState(false);
  return (
    <div
      className="carrusel__fila"
      onPointerEnter={() => setPausa(true)}
      onPointerLeave={() => setPausa(false)}
    >
      <div className={`carrusel__carril carrusel__carril--${hacia}${pausa ? " esta-pausado" : ""}`}>
        {/* `activo` NO se cruza con `pausa`: el hover para el carril para que
            puedas mirar un proyecto, y pararle el vídeo justo entonces sería lo
            contrario de lo que se busca. */}
        {items.map((p) => (
          <Tarjeta key={p.slug} p={p} activo={activo} />
        ))}
        {items.map((p) => (
          <Tarjeta key={`${p.slug}-dup`} p={p} activo={activo} duplicada />
        ))}
      </div>
    </div>
  );
}

/**
 * Columna vertical, para el móvil. Pausa al TOCAR, no en hover: en un móvil
 * no hay hover.
 */
function Columna({ items, activo }: { items: Project[]; activo: boolean }) {
  const [pausa, setPausa] = useState(false);
  return (
    <div
      className="carrusel__fila carrusel__fila--v"
      onTouchStart={() => setPausa(true)}
      onTouchEnd={() => setPausa(false)}
      onTouchCancel={() => setPausa(false)}
    >
      <div className={`carrusel__columna${pausa ? " esta-pausado" : ""}`}>
        {items.map((p) => (
          <Tarjeta key={p.slug} p={p} activo={activo} />
        ))}
        {items.map((p) => (
          <Tarjeta key={`${p.slug}-dup`} p={p} activo={activo} duplicada />
        ))}
      </div>
    </div>
  );
}

/**
 * @param vertical En móvil los proyectos bajan por la pantalla del teléfono.
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
  /* El muestrario, no la lista entera: lo que no tiene enlace vivo no cuenta. */
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
      <Fila items={arriba} hacia="izq" activo={activo} />
      <Fila items={abajo} hacia="der" activo={activo} />
    </div>
  );
}
