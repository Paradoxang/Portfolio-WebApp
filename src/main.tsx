// Self-hosted fonts (no external Google Fonts request) — same family names as index.css
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";

export const createRoot = ViteReactSSG({ routes });
