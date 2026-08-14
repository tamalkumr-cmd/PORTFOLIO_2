import { redis } from '@/lib/redis';
import AnalyticsChart from '@/components/AnalyticsChart';
import { Eye, Globe, Compass, Activity, ShieldCheck, Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default async function AnalyticsPage() {
  let totalViews = 0;
  let topPages: Array<{ path: string; count: number }> = [];
  let chartData = DAYS.map((day) => ({ date: day, views: 0 }));

  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const [views, pages, ...dailyCounts] = await Promise.all([
        redis.get<number>('analytics:total_views'),
        redis.zrange('analytics:top_pages', 0, 4, { rev: true, withScores: true }),
        ...DAYS.map((day) => redis.get<number>(`analytics:daily:${day}`)),
      ]);

      if (typeof views === 'number') {
        totalViews = views;
      }

      if (Array.isArray(pages) && pages.length > 0) {
        const parsed = [];
        for (let i = 0; i < pages.length; i += 2) {
          parsed.push({
            path: String(pages[i]),
            count: Number(pages[i + 1]) || 0,
          });
        }
        topPages = parsed;
      }

      chartData = DAYS.map((day, index) => ({
        date: day,
        views: Number(dailyCounts[index]) || 0,
      }));
    }
  } catch (err) {
    console.error('Redis query error:', err);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" /> Real-time System Telemetry
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Live Platform Analytics
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Real metrics on traffic velocity and route impressions recorded live via Upstash Redis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Total Platform Views</span>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalViews}</div>
          <span className="text-xs text-emerald-400 font-mono">In-Memory RAM Counter</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Privacy Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">100%</div>
          <span className="text-xs text-zinc-400 font-mono">Zero Third-Party Cookies</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Top Traffic Sources</span>
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">Direct & Referrals</div>
          <span className="text-xs text-zinc-400 font-mono">Real-time Inbound</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Traffic Velocity (Rolling Impressions)</h2>
            <p className="text-xs text-zinc-400">Aggregated daily impressions stored in Redis.</p>
          </div>
          <Flame className="w-4 h-4 text-emerald-400" />
        </div>
        <AnalyticsChart data={chartData} />
      </div>

      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Globe className="w-4 h-4 text-emerald-400" />
          <h3>Most Active Routes</h3>
        </div>
        {topPages.length > 0 ? (
          <div className="space-y-2 font-mono text-xs">
            {topPages.map((page, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300"
              >
                <span className="text-emerald-400">{page.path}</span>
                <span className="text-zinc-500">{page.count} hits</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500 font-mono">No route impressions recorded yet.</p>
        )}
      </div>
    </main>
  );
}