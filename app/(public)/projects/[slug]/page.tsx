// app/(public)/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProjectComments from '@/components/ProjectComments';
import { ArrowLeft, ArrowUpRight, Calendar, Eye, FolderGit2 } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

// Inline SVG to avoid lucide-react brand icon issues
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export const revalidate = 60; // ISR: Revalidate cached data every 60 seconds

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: project } = await supabase
    .from('projects')
    .select('title, tagline')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  };
}

export default async function SingleProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const { data: project } = await supabase
    .from('projects')
    .select('*, project_comments(*)')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!project) {
    notFound();
  }

  // Sort comments newest first
  const comments = (project.project_comments || []).sort(
    (a: { created_at: string }, b: { created_at: string }) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Back to Gallery Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
      </Link>

      {/* Case Study Header */}
      <header className="space-y-4 pb-8 border-b border-zinc-800">
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg text-zinc-300 leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {new Date(project.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              {project.views_count || 1} views
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Body (Markdown/Case Study Text) */}
      <article className="prose prose-invert prose-emerald max-w-none text-zinc-300 leading-relaxed space-y-6">
        <div className="whitespace-pre-line text-sm sm:text-base">
          {project.description}
        </div>
      </article>

      {/* Interactive Comments Section */}
      <ProjectComments
        projectId={project.id}
        initialComments={comments}
        slug={project.slug}
      />
    </main>
  );
}