// Self-hosted fonts (no external Google Fonts request) — same family names as index.css
import "@fontsource/anton/400.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";

export const createRoot = ViteReactSSG({ routes });
