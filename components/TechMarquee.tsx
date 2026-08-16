'use client';

import { motion } from 'framer-motion';

const skills = [
  'Next.js 15',
  'TypeScript',
  'React',
  'PostgreSQL',
  'Tailwind CSS',
  'Redis',
  'Framer Motion',
  'C++',
  'Embedded Systems',
  'REST APIs',
  'Docker',
  'Git',
];

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <div className="flex w-max">
        <motion.div
          className="flex gap-4 pr-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {[...skills, ...skills].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400 transition cursor-default shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}