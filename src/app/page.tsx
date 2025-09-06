import Link from "next/link";
import { PROJECTS } from "@/lib/projects.registry";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Repoverse</h1>
        <p className="mt-2 text-neutral-500">
          All my practice builds, clones, and UI experiments in one place.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`}>
              <ProjectCard
                title={p.title}
                desc={p.description}
                tags={p.tags}
                thumb={p.thumb}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
