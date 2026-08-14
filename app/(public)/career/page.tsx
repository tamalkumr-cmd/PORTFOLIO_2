// app/(public)/career/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Code2, Download, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'hackathon' | 'project';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
  link?: string;
}

const careerData: TimelineItem[] = [
  {
    id: '1',
    type: 'hackathon',
    title: 'Hackathon Competitor & Team Lead',
    organization: 'DevsHouse Hackathon',
    location: 'Collegiate Hackathon',
    period: '2026',
    description: 'Spearheaded full-stack product development under high-pressure 36-hour sprint constraints.',
    achievements: [
      'Engineered decentralized application components and backend state synchronization.',
      'Designed responsive UI architecture utilizing Next.js, TypeScript, and modern animation primitives.',
      'Pitched system architecture and live interactive demo to technical jury panels.'
    ],
    skills: ['Next.js', 'Web3 / Smart Contracts', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: '2',
    type: 'experience',
    title: 'Full-Stack Software Developer',
    organization: 'Independent Engineering & Builds',
    location: 'Remote',
    period: '2025 — Present',
    description: 'Designing and deploying performant serverless web applications, IoT firmware, and developer productivity tools.',
    achievements: [
      'Built a custom portfolio & CMS platform with real-time in-memory Redis telemetry and Supabase PostgreSQL.',
      'Engineered an Android productivity task application (PadhaiKaro) using Kotlin and Gradle modularization.',
      'Constructed dual ultrasonic + PIR IoT smart lighting firmware with sub-millisecond C++ state detection logic.'
    ],
    skills: ['React', 'Next.js', 'Kotlin', 'C++', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
  },
  {
    id: '3',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science & Engineering',
    organization: 'Vellore Institute of Technology',
    location: 'Chennai Campus, India',
    period: '2024 — 2028',
    description: 'Undergraduate engineering studies specializing in core computer science, systems design, and algorithms.',
    achievements: [
      'Deep study of Database Functional Dependencies, Link State Routing Mechanisms, and Automata / Turing Machines.',
      'Active contributor in developer clubs, technical project exhibitions, and hackathons.'
    ],
    skills: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Turing Machines'],
  },
];

const typeIcons = {
  experience: Briefcase,
  education: GraduationCap,
  hackathon: Trophy,
  project: Code2,
};

export default function CareerPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Header & Resume Trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" /> Career & Milestones
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Journey & Experience
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
            A chronological trace through academic foundations, hackathon sprints, full-stack engineering, and systems development.
          </p>
        </div>

        {/* Download Resume Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 text-zinc-100 font-semibold text-xs tracking-wide transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          Download Resume (PDF)
        </a>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500/40 before:to-zinc-800">
        {careerData.map((item, index) => {
          const Icon = typeIcons[item.type];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[30px] sm:-left-[43px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-400 transition-transform">
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              </div>

              {/* Card Body */}
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 backdrop-blur-md shadow-xl space-y-4">
                {/* Meta Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 capitalize font-mono">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {item.location}
                    </span>
                  </div>
                </div>

                {/* Title & Organization */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h2>
                  <div className="text-sm font-medium text-zinc-400 mt-0.5">
                    {item.organization}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Key Bullet Achievements */}
                <ul className="space-y-1.5 pt-1">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                <div className="pt-3 border-t border-zinc-900/80 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}