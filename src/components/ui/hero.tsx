import { motion, useInView } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ParticlesBackground } from "@/components/ui/particles-background";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  /** Class applied to each word span (e.g. a gradient text helper). */
  wordClassName?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  wordClassName = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block relative ${wordClassName}`}
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const MotionLink = motion(Link);

const navItems: { label: string; to: string }[] = [
  { label: "Sobre mí", to: "/sobre-mi" },
  { label: "Proyectos", to: "/sobre-mi#proyectos" },
  { label: "Habilidades", to: "/sobre-mi#habilidades" },
  { label: "Experiencia", to: "/sobre-mi#experiencia" },
  { label: "Contacto", to: "/sobre-mi#contacto" },
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className="h-screen w-full p-2 sm:p-3 md:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Animated vibrant gradient backdrop */}
        <div className="aurora-bg absolute inset-0" />

        {/* Interactive particle network (replaces the original background video) */}
        <div className="absolute inset-0">
          <ParticlesBackground />
        </div>

        {/* Warm luminic spotlight that lifts the centered portrait */}
        <div className="spotlight-glow pointer-events-none z-[3]" />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

        {/* Gradient overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

        {/* ── Giant wordmark: DOX top-left, DESIGNS bottom-right, flanking the portrait ── */}
        <div className="pointer-events-none absolute inset-0 z-[4]">
          <h1 className="absolute left-[5%] top-[4%] sm:left-[4%] sm:top-[6%] xl:left-[13%] xl:top-[22%] font-display font-bold leading-[0.8] tracking-[-0.04em] text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw]">
            <WordsPullUp text="DOX" wordClassName="text-gradient" />
          </h1>
          <h1 className="absolute left-[14%] top-[15%] sm:left-auto sm:top-auto sm:bottom-[4%] sm:right-[4%] xl:bottom-[20%] font-display font-bold leading-[0.8] tracking-[-0.04em] text-[14vw] sm:text-[11vw] md:text-[8vw] lg:text-[7vw]">
            <WordsPullUp text="DESIGNS" showAsterisk wordClassName="text-gradient" />
          </h1>
        </div>

        {/* ── Centered, animated portrait card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="portrait-card float-portrait">
            <img
              src="/perfil.webp"
              alt="Santiago Miranda"
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
            {/* slow light sweep */}
            <div className="portrait-shine" />
          </div>
        </motion.div>

        {/* Navbar — top right */}
        <nav className="absolute right-3 top-3 z-30 sm:right-5 sm:top-5">
          {/* Desktop / tablet: inline links */}
          <div className="hidden items-center gap-3 rounded-2xl bg-black/70 px-4 py-2 backdrop-blur-sm sm:flex sm:gap-5 md:gap-8 md:px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="whitespace-nowrap text-xs transition-colors md:text-sm"
                style={{ color: "rgba(238, 242, 248, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0b357")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(238, 242, 248, 0.7)")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile: hamburger button */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/70 text-primary backdrop-blur-sm sm:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile: dropdown panel */}
          {menuOpen && (
            <div className="absolute right-0 top-12 flex w-48 flex-col overflow-hidden rounded-2xl bg-black/90 p-1.5 backdrop-blur-md sm:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm text-primary/80 transition-colors hover:bg-white/5 hover:text-accent-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Top-left wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-none absolute left-4 top-4 z-20 hidden text-xs font-medium tracking-[0.3em] text-accent-1/80 sm:block sm:left-6 sm:top-6 md:text-sm"
        >
          SANTIAGO · 2026
        </motion.div>

        {/* Intro + CTA — bottom left, in front of the portrait */}
        <div className="absolute bottom-0 left-0 z-10 max-w-xs px-4 pb-5 sm:max-w-sm sm:px-6 md:px-10 md:pb-8">
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs text-primary/85 sm:text-sm"
              style={{ lineHeight: 1.35 }}
            >
              Soy Santiago Miranda, desarrollador y creativo. Diseño y construyo
              experiencias digitales donde el código y el diseño se encuentran.
            </motion.p>

            <MotionLink
              to="/sobre-mi#proyectos"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 self-start rounded-full bg-accent-1 py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3"
            >
              Ver proyectos
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4 text-accent-1" />
              </span>
            </MotionLink>
          </div>
        </div>

        {/* Location — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pointer-events-none absolute bottom-5 right-4 z-10 text-right text-[10px] font-medium tracking-[0.25em] text-primary/60 sm:bottom-7 sm:right-6 sm:text-xs md:right-10"
        >
          CALI · CO
        </motion.div>
      </div>
    </section>
  );
};

export { Hero };
