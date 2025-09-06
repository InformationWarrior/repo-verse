import { notFound } from "next/navigation";
import { findProject, slugs } from "@/lib/projects.registry";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export async function generateStaticParams() {
  return slugs();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const proj = findProject(params.slug);
  if (!proj) return {};
  return {
    title: `${proj.title} • Repoverse`,
    description: proj.description,
    ...proj.metadata,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const proj = findProject(params.slug);
  if (!proj) return notFound();
  const Comp = (await proj.loader()).default;
  return (
    <>
      <Comp />
      <Link
        href="/"
        aria-label="Back to home"
        className="fixed bottom-10 right-10 z-50 rounded-full bg-orange-300 p-4 shadow-lg hover:bg-green-300 transition"
      >
        <FaHome className="h-7 w-7" />
      </Link>
    </>
  );
}
