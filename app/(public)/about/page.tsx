// app/(public)/about/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { 
  Terminal as TerminalIcon, 
  Code2, 
  Cpu, 
  Layers, 
  Globe2, 
  Sparkles, 
  Compass, 
  Wrench,
  Check
} from 'lucide-react';
import ContactSection from '@/components/ContactSection';

const techStack = {
  Languages: ['TypeScript', 'JavaScript', 'Java', 'C++', 'Python', 'SQL'],
  Frontend: ['React', 'Next.js (App Router)', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3'],
  Backend: ['Node.js', 'Express', 'Supabase (PostgreSQL)', 'REST APIs', 'Server Actions'],
  Infrastructure: ['Upstash Redis', 'Vercel Edge', 'Git', 'GitHub Actions', 'GCP Basics'],
  Systems: ['Embedded C++', 'Microcontroller Sensors (Ultrasonic/PIR)', 'LCD I2C Logic'],
};

const terminalOutputs: Record<string, string> = {
  whoami: 'Tamal Kumbhakar — Full-stack developer & CS undergrad building reactive web platforms, IoT systems, and high-performance serverless apps.',
  skills: 'TypeScript, Next.js, Java, C++, PostgreSQL, Upstash Redis, Tailwind CSS, Framer Motion.',
  education: 'B.Tech in Computer Science & Engineering @ VIT Chennai (2024–2028).',
  interests: 'Low-latency serverless backends, animated kinetic UIs, micro-robotics/IoT logic, and Turing machine simulations.',
  contact: 'Drop a message via the form below or reach out directly on GitHub/LinkedIn.',
  help: 'Available commands: whoami, skills, education, interests, contact, clear',
};

export default function AboutPage() {
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: terminalOutputs.whoami },
  ]);
  const [commandInput, setCommandInput] = useState('');

  function handleTerminalSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanCmd = commandInput.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    }

    const output = terminalOutputs[cleanCmd] || `zsh: command not found: ${cleanCmd}. Type "help" for a list of commands.`;
    setTerminalHistory((prev) => [...prev, { cmd: cleanCmd, output }]);
    setCommandInput('');
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Philosophy & Tooling
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Behind the Code
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          I design and engineer end-to-end software solutions—balancing micro-interaction aesthetics with resilient serverless systems.
        </p>
      </div>

      {/* Bento Grid: Terminal + Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Terminal Window (2 Columns wide on desktop) */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-md font-mono text-xs flex flex-col justify-between min-h-[300px]">
          <div>
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <TerminalIcon className="w-3.5 h-3.5" /> terminal — zsh
              </span>
            </div>

            {/* Terminal Content Stream */}
            <div className="pt-4 space-y-3 text-zinc-300 max-h-[220px] overflow-y-auto pr-2">
              <p className="text-zinc-500">Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to see interactive commands.</p>
              {terminalHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-200">
                    <span className="text-emerald-400">❯</span>
                    <span>{item.cmd}</span>
                  </div>
                  <p className="text-zinc-400 whitespace-pre-line pl-4 border-l border-zinc-800">{item.output}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Input */}
          <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">❯</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="type a command (e.g. skills, whoami)..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none text-xs"
            />
          </form>
        </div>

        {/* Quick Highlights Card (1 Column wide) */}
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Engineering Focus</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Obsessed with eliminating latency, crafting seamless UX interactions, and building production-grade web applications from scratch.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-900 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Location:</span>
              <span className="text-zinc-200 font-medium">Chennai / West Bengal, India</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Primary Stack:</span>
              <span className="text-emerald-400 font-mono">Next.js / TS / Postgres</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Tech Stack Showcase */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Skills & Technical Repertoire</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(techStack).map(([category, items]) => (
            <div 
              key={category} 
              className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3"
            >
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Contact Section */}
      <div className="pt-8">
        <ContactSection />
      </div>
    </main>
  );
}