// components/ProjectCard.tsx
"use client";
import Image from "next/image";

export default function ProjectCard({
  title,
  desc,
  tags,
  thumb,
}: {
  title: string;
  desc: string;
  tags?: string[];
  thumb?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white shadow hover:shadow-lg transition">
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-3">{desc}</p>
        {tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="absolute inset-0 ring-0 ring-black/0 group-hover:ring-4 group-hover:ring-black/5 transition" />
    </div>
  );
}
