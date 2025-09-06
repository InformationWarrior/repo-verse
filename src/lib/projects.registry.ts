// lib/projects.registry.ts
import type { Metadata } from "next";

export type ProjectDef = {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  thumb?: string;
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  metadata?: Metadata;
};

export const PROJECTS: ProjectDef[] = [
  {
    slug: "css-card",
    title: "CSS Card",
    description: "Small card with hover glassmorphism & shadow.",
    tags: ["css", "html", "ui"],
    thumb: "/logo.png",
    loader: () => import("@/components/Projects/CssCard"),
  },
  {
    slug: "page-layout",
    title: "Page Layout",
    description: "Small card with hover glassmorphism & shadow.",
    tags: ["css", "html", "ui"],
    thumb: "/logo.png",
    loader: () => import("@/components/Layouts/PageLayout"),
  },
  {
    slug: "grid-layout",
    title: "Grid Layout",
    description: "Small card with hover glassmorphism & shadow.",
    tags: ["css", "html", "ui"],
    thumb: "/logo.png",
    loader: () => import("@/components/Layouts/GridLayout"),
  },
  {
    slug: "yolo-blast-game-layout",
    title: "Yolo Blast Game Layout",
    description: "Small card with hover glassmorphism & shadow.",
    tags: ["css", "html", "ui"],
    thumb: "/logo.png",
    loader: () => import("@/components/Layouts/YoloBlastGameLayout"),
  },
  // add more as you learn: "microsoft-clone", "spotify-clone", etc.
];

export const findProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const slugs = () => PROJECTS.map((p) => ({ slug: p.slug }));
