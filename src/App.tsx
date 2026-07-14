import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import type { RouteRecord } from "vite-react-ssg";
import { Hero } from "@/components/ui/hero";
import { About } from "@/components/ui/about";

function Layout() {
  return (
    <>
      <Outlet />
      <Analytics />
    </>
  );
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "sobre-mi", element: <About /> },
    ],
  },
];
