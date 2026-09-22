// Fuente de cuerpo autoalojada (sin petición a Google Fonts). Anton y JetBrains
// Mono se fueron: Kenney Future, en /public/fonts, manda en todo el cromo y
// las dos quedaban como respaldo que nunca se usaba — 100 KB de fuentes por
// página para nada.
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";

export const createRoot = ViteReactSSG({ routes });
