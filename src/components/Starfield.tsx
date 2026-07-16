import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number; // base alpha
  tw: number; // twinkle phase
  depth: number; // 0..1 — parallax layer
  vx: number;
  vy: number;
}

/**
 * Campo de estrellas cósmico: drift muy lento + twinkle sutil.
 * Los glows/parallax reaccionan levemente al puntero (por capa de profundidad).
 * Con prefers-reduced-motion pinta un frame estático.
 */
export function Starfield({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: 0, y: 0 }; // -1..1 desde el centro

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(160, (width * height) / 12000));
      stars = Array.from({ length: n }, () => {
        const depth = 0.3 + Math.random() * 0.7;
        const ang = Math.random() * Math.PI * 2;
        const speed = 0.008 + Math.random() * 0.02; // drift muy lento
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (0.4 + Math.random() * 1.1) * depth,
          a: 0.25 + Math.random() * 0.5,
          tw: Math.random() * Math.PI * 2,
          depth,
          vx: Math.cos(ang) * speed * depth,
          vy: Math.sin(ang) * speed * depth,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = reduced ? 1 : 0.75 + 0.25 * Math.sin(t / 1600 + s.tw);
        const px = s.x + mouse.x * 8 * s.depth;
        const py = s.y + mouse.y * 8 * s.depth;
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = "#eef2fb";
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (t: number) => {
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -4) s.x = width + 4;
        if (s.x > width + 4) s.x = -4;
        if (s.y < -4) s.y = height + 4;
        if (s.y > height + 4) s.y = -4;
      }
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      build();
      if (reduced) draw(0);
    };

    build();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
      window.addEventListener("mousemove", onMove);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
}
