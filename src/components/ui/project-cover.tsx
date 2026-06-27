/**
 * Branded, generated cover for a project card.
 * Renders a deterministic gradient + monospace mark instead of a real
 * screenshot, so every card has a clean, consistent preview with no assets.
 */
interface ProjectCoverProps {
  /** Short mark shown big (e.g. project initials). */
  mark: string;
  /** Primary tech label shown small. */
  label: string;
  /** 0..n index used to vary the hue between cards. */
  variant?: number;
  className?: string;
}

const THEMES = [
  { from: "#f0b357", to: "#5b7a99" }, // gold → slate
  { from: "#6fb3c9", to: "#1a2433" }, // cyan → deep slate
  { from: "#e8c98a", to: "#3a2a1f" }, // champagne → warm brown
  { from: "#5b7a99", to: "#0c1018" }, // slate → ink
  { from: "#f0b357", to: "#2a1a3a" }, // gold → violet ink
];

export const ProjectCover = ({
  mark,
  label,
  variant = 0,
  className = "",
}: ProjectCoverProps) => {
  const t = THEMES[variant % THEMES.length];
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 20% 10%, ${t.from} 0%, ${t.to} 65%)`,
      }}
      aria-hidden="true"
    >
      {/* dotted grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* soft sheen */}
      <div className="absolute -inset-x-10 -top-16 h-32 rotate-12 bg-white/10 blur-2xl" />

      {/* big mark */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span
          className="font-display font-bold leading-none text-white/90"
          style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", letterSpacing: "-0.04em" }}
        >
          {mark}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/80">
          {label}
        </span>
      </div>
    </div>
  );
};
