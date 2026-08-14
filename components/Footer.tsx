// components/Footer.tsx
import Link from 'next/link';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-900/80 bg-zinc-950/60 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400">All Systems Operational</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <Link href="/projects" className="hover:text-emerald-400 transition">Projects</Link>
          <Link href="/career" className="hover:text-emerald-400 transition">Career</Link>
          <Link href="/about" className="hover:text-emerald-400 transition">About</Link>
          <Link href="/analytics" className="hover:text-emerald-400 transition">Telemetry</Link>
          <Link href="/admin/login" className="hover:text-emerald-400 transition">Admin</Link>
        </div>

        <p className="text-zinc-600">
          &copy; {new Date().getFullYear()} Tamal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}