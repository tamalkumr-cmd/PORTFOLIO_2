// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import CommandMenu from '@/components/CommandMenu';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Tamal Kumbhakar — Software Engineer & Builder',
    template: '%s | Tamal Kumbhakar',
  },
  description: 'Full-stack developer portfolio, case studies, and real-time telemetry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tamal Kumbhakar',
    url: 'https://yourdomain.com',
    jobTitle: 'Full-Stack Developer & Software Engineer',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Vellore Institute of Technology, Chennai',
    },
    sameAs: ['https://github.com', 'https://linkedin.com'],
    knowsAbout: [
      'Full-Stack Development',
      'Next.js',
      'TypeScript',
      'React',
      'PostgreSQL',
      'Redis',
      'Kotlin',
      'C++',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-black text-zinc-100 min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden flex flex-col justify-between`}
      >
        {/* Glow ambients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-[60%] right-0 w-[450px] h-[300px] bg-cyan-500/5 blur-[160px] rounded-full" />
        </div>

        <Navbar />

        <div className="relative z-10 pt-28 flex-1">
          {children}
        </div>

        {/* Global Utilities */}
        <Footer />
      
        <CommandMenu />
      </body>
    </html>
  );
}