// app/(admin)/admin/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServiceSupabase } from '@/lib/supabase';
import { createProject, deleteProject } from '@/app/actions/projects';
import { PlusCircle, Trash2, FolderGit2, MessageSquare, Shield } from 'lucide-react';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;

  if (!process.env.ADMIN_SECRET_PASSWORD || sessionToken !== process.env.ADMIN_SECRET_PASSWORD) {
    redirect('/admin/login');
  }

  // Fetch all projects for moderation
  const supabaseAdmin = getServiceSupabase();
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('*, project_comments(count)')
    .order('created_at', { ascending: false });

  // Type-safe form action returning Promise<void>
  async function handleCreateProject(formData: FormData): Promise<void> {
    'use server';
    await createProject(formData);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" /> Authenticated Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white">CMS Project Studio</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Project Creation Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" /> Publish New Project / Case Study
            </h2>

            <form action={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">Project Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Distributed Consensus Visualizer"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">Tagline (One Liner)</label>
                <input
                  name="tagline"
                  required
                  placeholder="High-throughput state replication engine"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">GitHub Repo URL</label>
                  <input
                    name="github_url"
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">Live Demo URL</label>
                  <input
                    name="live_url"
                    placeholder="https://demo.example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">Tags (Comma-separated)</label>
                <input
                  name="tags"
                  placeholder="Next.js, TypeScript, PostgreSQL, Redis"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase font-mono">Markdown Case Study Body</label>
                <textarea
                  name="description"
                  required
                  rows={8}
                  placeholder="Write the full problem statement, system architecture, benchmarks, and learnings..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white mt-1 font-mono focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition cursor-pointer"
              >
                Publish Project to Live Site
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Existing Projects List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" /> Existing Builds ({projects?.length || 0})
          </h2>

          <div className="space-y-3">
            {projects?.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3 text-sm"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{project.title}</h3>
                  <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
                    <MessageSquare className="w-3 h-3" /> {project.project_comments?.[0]?.count || 0} comments
                  </span>
                </div>

                <form
                  action={async (): Promise<void> => {
                    'use server';
                    await deleteProject(project.id);
                  }}
                >
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}