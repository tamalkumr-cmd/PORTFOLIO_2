// components/CommandMenu.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  Briefcase, 
  FolderGit2, 
  User, 
  BarChart3, 
  Download, 
  Mail, 
  X, 
  Command 
} from 'lucide-react';

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { name: 'Home', href: '/', icon: Home, section: 'Navigation' },
    { name: 'Projects & Case Studies', href: '/projects', icon: FolderGit2, section: 'Navigation' },
    { name: 'Career & Experience', href: '/career', icon: Briefcase, section: 'Navigation' },
    { name: 'About & Tooling', href: '/about', icon: User, section: 'Navigation' },
    { name: 'System Analytics', href: '/analytics', icon: BarChart3, section: 'Navigation' },
    { 
      name: 'Download Resume (PDF)', 
      action: () => {
        window.open('/resume.pdf', '_blank');
      }, 
      icon: Download, 
      section: 'Actions' 
    },
    { 
      name: 'Copy Contact Email', 
      action: () => {
        navigator.clipboard.writeText('your-email@gmail.com');
        alert('Email copied to clipboard!');
      }, 
      icon: Mail, 
      section: 'Actions' 
    },
  ];

  const filtered = actions.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  function execute(item: typeof actions[0]) {
    setIsOpen(false);
    setSearch('');
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
  }

  return (
    <>
      {/* Subtle trigger hint for desktop */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 fixed bottom-6 left-6 z-40 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 text-xs backdrop-blur-md transition shadow-lg cursor-pointer font-mono"
      >
        <Command className="w-3.5 h-3.5 text-emerald-400" />
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300">⌘K</kbd>
      </button>

      {/* Modal Backdrop & Command Bar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-900/40">
                <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Type a command or jump to page..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-72 overflow-y-auto p-2 space-y-1 text-xs font-mono">
                {filtered.length > 0 ? (
                  filtered.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => execute(item)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
                          {item.section}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-zinc-500">
                    No actions matching &quot;{search}&quot;
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}