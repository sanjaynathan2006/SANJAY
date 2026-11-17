import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { thumbnailFor } from "@/lib/video";
import ProjectView from "@/components/sections/ProjectView";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const thumb = thumbnailFor(p);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title}: ${site.name}`,
      description: p.description,
      url: `/work/${p.slug}`,
      ...(thumb ? { images: [{ url: thumb }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  return <ProjectView project={p} next={next} index={idx} />;
}
