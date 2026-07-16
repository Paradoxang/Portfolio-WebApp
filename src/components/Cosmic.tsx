/* Adornos cósmicos a medida (SVG/CSS) — on-brand, sin dependencias ni peso.
   Todos son decorativos: pointer-events-none + aria-hidden. */

/** Sistema orbital: anillos concéntricos punteados que rotan + puntos en órbita. */
export function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8fa2ff" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#8fa2ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#orbGlow)" />
      <g className="spin-slow" style={{ transformBox: "fill-box" }}>
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="rgba(143,162,255,0.28)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle cx="200" cy="50" r="4" fill="#8fa2ff" />
      </g>
      <g className="spin-slow-rev" style={{ transformBox: "fill-box" }}>
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="rgba(255,143,189,0.22)"
          strokeWidth="1"
          strokeDasharray="1 10"
        />
        <circle cx="310" cy="200" r="3" fill="#ff8fbd" />
      </g>
      <circle
        cx="200"
        cy="200"
        r="70"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Constelación: nodos conectados con líneas y twinkle sutil. */
export function Constellation({ className = "" }: { className?: string }) {
  const nodes = [
    [20, 30],
    [90, 18],
    [150, 60],
    [70, 90],
    [130, 120],
    [40, 130],
    [185, 100],
  ] as const;
  const links = [
    [0, 1],
    [1, 2],
    [2, 4],
    [3, 4],
    [0, 3],
    [3, 5],
    [2, 6],
  ] as const;
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <g stroke="rgba(143,162,255,0.25)" strokeWidth="0.7">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 2.4 : 1.6}
          fill={i % 4 === 0 ? "#ff8fbd" : "#8fa2ff"}
          className="twinkle"
          style={{ animationDelay: `${(i * 0.5).toFixed(1)}s` }}
        />
      ))}
    </svg>
  );
}

/** Orbe de nebulosa borroso para fondos. */
export function GlowOrb({
  color = "#8fa2ff",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}33 0%, ${color}00 70%)`,
        filter: "blur(30px)",
      }}
    />
  );
}
