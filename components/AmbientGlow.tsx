'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AmbientGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />

      {/* Static Atmospheric Gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute top-[60%] right-[-10%] w-[500px] h-[350px] bg-cyan-500/5 blur-[160px] rounded-full" />
    </div>
  );
}