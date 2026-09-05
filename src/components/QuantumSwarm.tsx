import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Enjambre cuántico del hero: adaptación del componente `QuantumSwarm`.
 *
 * Qué cambió respecto al original y por qué:
 *  - Lienzo transparente. El original abre el contexto con `alpha: false` y
 *    repinta un rectángulo opaco cada frame; sobre el hero eso taparía la
 *    nebulosa, el marquee y la figura. Aquí la estela se hace borrando con
 *    `destination-out`.
 *  - Sin cromo (botones PULSE/FREEZE, titular y tagline) ni marco redondeado:
 *    esto es una capa de fondo de sección, no una demo con controles.
 *  - Paleta del proyecto (azul-violeta) y sin rama de tema claro: el sitio es
 *    oscuro siempre, así que sobra el sondeo de `.dark` en cada frame.
 *  - Los eventos van en `window`, no en el contenedor: la capa es
 *    `pointer-events: none` para no robarle clics a los botones del hero.
 *  - Densidad proporcional al área: 280 partículas eran para una caja de demo
 *    de 600 px, no para una sección entera.
 *  - El bucle se detiene con la pestaña oculta o el hero fuera de pantalla, y
 *    no arranca con `prefers-reduced-motion`.
 *  - Sin `clsx`/`tailwind-merge`: no están en el proyecto y una clase no
 *    justifica dos dependencias.
 *
 * Se conserva del original lo que le da carácter: la espiral por ángulo áureo,
 * el muelle hacia la órbita, la repulsión del cursor (atracción al pulsar), las
 * ondas de choque del clic, las líneas de constelación y la excitación.
 */

interface SwarmParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  /** Posición en la espiral, 0 en el centro y 1 en el borde de la elipse. */
  norm: number;
  size: number;
  excitation: number;
  /** Desplazamiento del estallido. Lo escribe GSAP, no el bucle. */
  imp: { x: number; y: number };
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

interface QuantumSwarmProps {
  /** Fusión activa: el enjambre gana energía. */
  energetic?: boolean;
  /** Partículas por cada 10 000 px². */
  density?: number;
}

/** Distancia de conexión entre partículas, en píxeles. */
const LINK = 70;
const LINK_SQ = LINK * LINK;
/** Vecinos que se comprueban por partícula: el original limita así el O(N²). */
const NEIGHBOURS = 15;
const MAX_PARTICLES = 900;
/** Suelo para pantallas pequeñas: por área pura un móvil sacaba ~97 partículas
 *  y la constelación no llegaba a formarse. */
const MIN_PARTICLES = 190;
/**
 * Semiejes en fracción del ancho y del alto. El original reparte en un círculo
 * de `max(w, h) * 0.45`, que en un monitor ancho ni siquiera alcanza los
 * laterales. Una elipse proporcional al viewport llega a los bordes pero deja
 * las esquinas vacías y se lee como un óvalo, así que el reparto usa una
 * superelipse |x/rx|⁴ + |y/ry|⁴ = 1: una forma acuadrada que abraza el
 * rectángulo. Con exponente 4, para que el borde contenga la esquina hace falta
 * un semieje de 0.595; 0.63 deja margen y saca la frontera fuera de pantalla.
 */
const SPREAD = 0.63;
/** Cuánto desborda la superelipse el área visible, para calcular la densidad. */
const OVERFLOW = 1.38;
/** Velocidad de giro. */
const SPIN = 0.0015;

/**
 * Radio de la superelipse unitaria |u|⁴ + |v|⁴ = 1 en un ángulo dado: va de 1
 * sobre los ejes a 2^(1/4) ≈ 1.19 en las diagonales.
 *
 * Se calcula en espacio normalizado y el estirado a `rx`/`ry` se aplica después,
 * por separado en cada eje. Multiplicar las dos coordenadas por un radio ya
 * escalado sería un mapeo polar, y ahí la densidad cae con el cuadrado del
 * radio: en una pantalla ancha los laterales quedarían vacíos aunque la forma
 * los alcance. El estirado afín, en cambio, conserva la densidad.
 *
 * Con `cos²` y `sin²` y dos raíces se evita el `pow`, que se llamaría por
 * partícula y frame.
 */
function rhoUnidad(angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const c2 = c * c;
  const s2 = s * s;
  return 1 / Math.sqrt(Math.sqrt(c2 * c2 + s2 * s2));
}

export function QuantumSwarm({
  energetic = false,
  density = 3.2,
}: QuantumSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SwarmParticle[]>([]);
  const dimsRef = useRef({ w: 0, h: 0, cx: 0, cy: 0 });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const energyRef = useRef(0);
  const energeticRef = useRef(energetic);
  const runningRef = useRef(false);
  const rafRef = useRef(0);
  const pointerRef = useRef({
    x: -2000,
    y: -2000,
    dentro: false,
    pulsando: false,
    radius: 165,
    /** Marca del último toque real; el vagabundeo espera a que se enfríe. */
    ultimoToque: -1e9,
  });
  const gruesoRef = useRef(false);

  const buildSwarm = useCallback(() => {
    const { w, h, cx, cy } = dimsRef.current;
    if (!w || !h) return;
    // La cuenta se calcula sobre el área de la superelipse, no la del lienzo,
    // para que la densidad en pantalla no baje por lo que cae fuera.
    const count = Math.max(
      MIN_PARTICLES,
      Math.min(
        MAX_PARTICLES,
        Math.round(((w * h) / 10000) * density * OVERFLOW)
      )
    );
    // Ángulo áureo: reparto orgánico tipo girasol, sin anillos visibles.
    const inc = Math.PI * 2 * ((1 + Math.sqrt(5)) / 2);
    const particles: SwarmParticle[] = [];
    for (let i = 0; i < count; i++) {
      // Raíz cuadrada: reparto uniforme por área, sin acumular en el centro.
      const norm = Math.sqrt(i / (count - 1 || 1));
      const angle = i * inc;
      const rho = norm * rhoUnidad(angle);
      particles.push({
        x: cx + Math.cos(angle) * rho * w * SPREAD,
        y: cy + Math.sin(angle) * rho * h * SPREAD,
        vx: 0,
        vy: 0,
        angle,
        norm,
        size: Math.random() * 1.5 + 0.5,
        excitation: 0,
        imp: { x: 0, y: 0 },
      });
    }
    particlesRef.current = particles;
  }, [density]);

  /** Ajusta el buffer al tamaño CSS. La medida directa es el respaldo: sin una
   *  primera entrada del observer el lienzo se quedaría en 300×150. */
  const medir = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (dimsRef.current.w === rect.width && dimsRef.current.h === rect.height)
      return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dimsRef.current = {
      w: rect.width,
      h: rect.height,
      cx: rect.width / 2,
      cy: rect.height / 2,
    };
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    buildSwarm();
  }, [buildSwarm]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => medir());
    ro.observe(canvas);
    medir();
    return () => ro.disconnect();
  }, [medir]);

  // Cursor y ondas de choque. En `window` porque la capa no recibe punteros.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        dentro:
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom,
      };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y, dentro } = local(e);
      const p = pointerRef.current;
      p.x = dentro ? x : -2000;
      p.y = dentro ? y : -2000;
      p.dentro = dentro;
    };
    /**
     * Estallido con física real: las partículas cercanas salen despedidas con
     * velocidad, ángulo y gravedad, y vuelven luego a su órbita. Sustituye a la
     * onda de choque que integraba yo a mano en el bucle.
     */
    const onDown = (e: PointerEvent) => {
      const { x, y, dentro } = local(e);
      if (!dentro) return;
      pointerRef.current.pulsando = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const RADIO = 150;
      let alcanzadas = 0;
      for (const p of particlesRef.current) {
        const dx = p.x - x, dy = p.y - y;
        const d = Math.hypot(dx, dy);
        if (d > RADIO || alcanzadas > 90) continue;
        alcanzadas++;
        const fuerza = 1 - d / RADIO;
        gsap.killTweensOf(p.imp);
        gsap
          .timeline()
          .to(p.imp, {
            duration: 0.7,
            physics2D: {
              // Contenido a propósito: con más velocidad el centro se vaciaba
              // entero y se leía como una evacuación, no como un impulso.
              velocity: 40 + fuerza * 120,
              angle: (Math.atan2(dy, dx) * 180) / Math.PI,
              gravity: 90,
            },
            ease: "none",
          })
          .to(p.imp, {
            duration: 1.3,
            x: 0,
            y: 0,
            ease: "power2.out",
          });
      }
    };
    const onUp = () => (pointerRef.current.pulsando = false);
    const salir = () => {
      const p = pointerRef.current;
      p.x = -2000;
      p.y = -2000;
      p.dentro = false;
      p.pulsando = false;
    };
    // En táctil los eventos de puntero se cancelan en cuanto arranca el scroll;
    // `touchmove` sigue llegando, así que el dedo mueve el enjambre igual.
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = canvas.getBoundingClientRect();
      const p = pointerRef.current;
      p.x = t.clientX - r.left;
      p.y = t.clientY - r.top;
      p.dentro =
        t.clientX >= r.left &&
        t.clientX <= r.right &&
        t.clientY >= r.top &&
        t.clientY <= r.bottom;
      p.ultimoToque = performance.now();
    };

    gruesoRef.current = window.matchMedia("(pointer: coarse)").matches;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("pointerleave", salir);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("pointerleave", salir);
    };
  }, []);

  energeticRef.current = energetic;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let time = 0;
    let ultimaOnda = 0;

    const loop = () => {
      const { w, h, cx, cy } = dimsRef.current;
      if (!w || !h) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      energyRef.current += ((energeticRef.current ? 1 : 0) - energyRef.current) * 0.08;
      const energy = energyRef.current;
      time += SPIN * (1 + energy * 0.6);

      // Estela: se borra lo anterior en vez de repintar un fondo opaco.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.20)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const waves = shockwavesRef.current;

      // Sin cursor y sin dedo reciente, un atractor pasea solo por la sección
      // (Lissajous) y suelta una onda de vez en cuando: así en un móvil el
      // enjambre nunca se queda quieto.
      const ahora = performance.now();
      if (gruesoRef.current && ahora - pointer.ultimoToque > 2500) {
        pointer.x = w * (0.5 + 0.34 * Math.sin(time * 3.1));
        pointer.y = h * (0.5 + 0.28 * Math.sin(time * 4.7 + 1.1));
        pointer.dentro = true;
        if (ahora - ultimaOnda > 6500) {
          ultimaOnda = ahora;
          waves.push({
            x: pointer.x,
            y: pointer.y,
            radius: 8,
            maxRadius: 130,
            strength: 0.32,
          });
        }
      }

      for (let s = waves.length - 1; s >= 0; s--) {
        const sw = waves[s];
        // Más lenta y de menor alcance que en el original: allí la onda barría
        // media pantalla de golpe y aquí se lee como una explosión.
        sw.radius += 8;
        sw.strength *= 0.9;
        if (sw.radius > sw.maxRadius || sw.strength < 0.01) waves.splice(s, 1);
      }

      const rx = w * SPREAD;
      const ry = h * SPREAD;
      const radioMedio = (rx + ry) / 2;

      for (const p of particles) {
        // La espiral entera gira; las partículas interiores, algo más rápido.
        const dist = p.norm * radioMedio;
        const a = p.angle + time * (1 + 100 / (dist + 100));
        // El radio se recalcula en el ángulo actual: la formación se queda
        // quieta como superelipse y son las partículas las que la recorren.
        const rho = p.norm * rhoUnidad(a);
        const baseX = cx + Math.cos(a) * rho * rx;
        const baseY = cy + Math.sin(a) * rho * ry;

        p.vx += (baseX - p.x) * 0.02;
        p.vy += (baseY - p.y) * 0.02;

        if (pointer.dentro) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < pointer.radius && d > 0) {
            const force = (pointer.radius - d) / pointer.radius;
            // Al pulsar atrae en vez de repeler: tensa el enjambre.
            const dir = pointer.pulsando ? -0.5 : 1.5;
            p.vx += (dx / d) * force * dir;
            p.vy += (dy / d) * force * dir;
            p.excitation = Math.max(p.excitation, force);
          }
        }

        for (const sw of waves) {
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const delta = Math.abs(d - sw.radius);
          if (delta < 24) {
            const impulse = (1 - delta / 24) * sw.strength * 7;
            p.vx += (dx / d) * impulse;
            p.vy += (dy / d) * impulse;
            p.excitation = 1;
          }
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;
        p.excitation *= 0.95;
      }

      // Constelación. Solo se miran los vecinos inmediatos del array: por el
      // reparto áureo son los espacialmente cercanos, así el coste no es O(N²).
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const limit = Math.min(particles.length, i + NEIGHBOURS);
        for (let j = i + 1; j < limit; j++) {
          const p2 = particles[j];
          const dx = p1.x + p1.imp.x - (p2.x + p2.imp.x);
          const dy = p1.y + p1.imp.y - (p2.y + p2.imp.y);
          const dsq = dx * dx + dy * dy;
          if (dsq >= LINK_SQ) continue;
          const cercania = 1 - Math.sqrt(dsq) / LINK;
          const exc = Math.max(p1.excitation, p2.excitation);
          // Al fundirse la malla se tensa visiblemente: más del doble de alfa.
          const alpha = Math.min(
            1,
            cercania * (0.15 + energy * 0.32) + exc * 0.5
          );
          ctx.strokeStyle = `rgba(143,162,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x + p1.imp.x, p1.y + p1.imp.y);
          ctx.lineTo(p2.x + p2.imp.x, p2.y + p2.imp.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const radius = p.size + p.excitation * 2.5;
        // Las excitadas viran de lavanda a blanco.
        const l = 78 + p.excitation * 22;
        if (p.excitation > 0.3) {
          ctx.fillStyle = `hsla(230, 100%, ${l}%, ${p.excitation * 0.28})`;
          ctx.beginPath();
          ctx.arc(p.x + p.imp.x, p.y + p.imp.y, radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `hsla(230, 100%, ${l}%, ${
          0.45 + energy * 0.25 + p.excitation * 0.5
        })`;
        ctx.beginPath();
        ctx.arc(p.x + p.imp.x, p.y + p.imp.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const arrancar = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    };
    const parar = () => {
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting && !document.hidden ? arrancar() : parar()),
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? parar() : arrancar());
    document.addEventListener("visibilitychange", onVis);
    arrancar();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      parar();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-quantum" />;
}
