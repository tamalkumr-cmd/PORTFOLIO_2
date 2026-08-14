// app/(public)/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  FolderGit2,
  Activity
} from 'lucide-react';

export const revalidate = 60;

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function HomePage() {
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
      <section className="space-y-6 pt-4 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-zinc-400">Available for Engineering Roles & Projects</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Engineering software with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              precision & velocity.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Full-Stack Software Engineer specializing in low-latency serverless architectures, responsive interfaces, and embedded systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wide transition shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-xs transition cursor-pointer"
          >
            <span>Read Bio & Tooling</span>
          </Link>
        </div>
      </section>

      {/* Featured Works */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Featured Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Recent Builds</h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-emerald-400 transition"
          >
            <span>All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects && featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md shadow-xl"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-zinc-900 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center text-zinc-400 text-sm">
              No projects published yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}