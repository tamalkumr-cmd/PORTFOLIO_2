// app/(public)/projects/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowUpRight, FolderGit2, MessageSquare } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate cached data every 60 seconds

// GitHub SVG Component
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

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, project_comments(count)')
    .order('created_at', { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" /> Featured Works & Case Studies
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering & Builds
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          A showcase of full-stack platforms, hardware logic systems, distributed applications, and open-source explorations.
        </p>
      </div>

      {/* Projects Grid */}
      {error || !projects || projects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-3">
          <p className="text-zinc-400 text-sm">No projects found in Supabase yet.</p>
          <p className="text-zinc-600 text-xs font-mono">Run the sample SQL insert or publish via /admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const commentCount = project.project_comments?.[0]?.count || 0;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="space-y-4">
                  {/* Top Bar: Tags + Comment Count */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-500 shrink-0">
                      <MessageSquare className="w-3.5 h-3.5" /> {commentCount}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    Read Case Study & Discussion &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}