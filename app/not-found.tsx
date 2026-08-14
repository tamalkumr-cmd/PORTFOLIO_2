// app/not-found.tsx
import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-xl">
        <Terminal className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-black text-white tracking-tight">404</h1>
        <h2 className="text-xl font-semibold text-zinc-300">Route Not Found</h2>
        <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
          The requested system pathway does not exist or has been relocated.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition shadow-lg shadow-emerald-500/10 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Main System
      </Link>
    </main>
  );
}