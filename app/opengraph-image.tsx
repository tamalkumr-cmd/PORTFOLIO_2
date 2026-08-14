// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tamal Kumbhakar — Full-Stack Developer & Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '80px',
          fontFamily: 'sans-serif',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.15)',
            filter: 'blur(100px)',
          }}
        />

        {/* Top Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#18181b',
            border: '1px solid #27272a',
            padding: '10px 20px',
            borderRadius: '9999px',
            color: '#10b981',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: '#10b981',
            }}
          />
          <span>tamal.dev — Available for Projects & Engineering</span>
        </div>

        {/* Center Title & Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Tamal Kumbhakar
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              margin: 0,
              maxWidth: '850px',
            }}
          >
            Full-Stack Software Engineer • Next.js, TypeScript, PostgreSQL, Upstash Redis & IoT Systems
          </p>
        </div>

        {/* Bottom Tech Bar */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          {['Next.js (App Router)', 'TypeScript', 'Supabase', 'Redis Telemetry', 'Embedded C++'].map((t) => (
            <div
              key={t}
              style={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                color: '#d4d4d8',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}