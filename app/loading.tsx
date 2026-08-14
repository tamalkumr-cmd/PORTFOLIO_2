// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      {/* Animated Glowing Ring */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
      </div>
      <p className="text-xs font-mono text-zinc-500 tracking-wider">
        FETCHING_SYSTEM_DATA...
      </p>
    </div>
  );
}