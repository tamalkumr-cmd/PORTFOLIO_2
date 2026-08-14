import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tamal.online'),
  title: {
    default: 'Tamal Kumbhakar — Software Engineer & Builder',
    template: '%s | Tamal Kumbhakar',
  },
  description: 'Full-stack developer portfolio, case studies, and real-time telemetry.',
  openGraph: {
    title: 'Tamal Kumbhakar — Software Engineer & Builder',
    description: 'Full-stack developer portfolio, case studies, and real-time telemetry.',
    url: 'https://tamal.online',
    siteName: 'Tamal Kumbhakar',
    locale: 'en_US',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tamal Kumbhakar',
  url: 'https://tamal.online',
  jobTitle: 'Full-Stack Developer & Software Engineer',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Vellore Institute of Technology, Chennai',
  },
  sameAs: [
    'https://github.com/tamalkumr-cmd', // Update with your actual handle
    'https://linkedin.com/in/tamal-kumbhakar-87a8a7233',
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-zinc-100 min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}