// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderGit2, 
  Briefcase, 
  User, 
  Activity, 
  Menu, 
  X,
  Code2
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Career', href: '/career', icon: Briefcase },
  { name: 'About', href: '/about', icon: User },
  { name: 'Analytics', href: '/analytics', icon: Activity },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        className={`w-full max-w-4xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/80 border-zinc-800 shadow-2xl backdrop-blur-xl shadow-black/40'
            : 'bg-zinc-950/50 border-zinc-800/60 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-white tracking-tight group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-mono text-zinc-100 group-hover:text-emerald-400 transition-colors">
            tamal<span className="text-emerald-400">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Status Pill & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Online</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-2xl flex flex-col space-y-1 font-mono text-xs z-50"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}