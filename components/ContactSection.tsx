// components/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '@/app/actions/contact';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await sendContactMessage(formData);

    if (res.success) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Something went wrong.');
    }
  }

  return (
    <section className="max-w-xl mx-auto p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-2xl backdrop-blur-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Let&apos;s Connect</h2>
        <p className="text-sm text-zinc-400 mt-1">Have a project, role, or idea in mind? Drop a message below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 font-mono">
            Your Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Name or handle"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 font-mono">
            Your Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 font-mono">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell me about what you're working on or want to discuss..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition resize-none"
          />
        </div>

        {/* Status Feedback */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Message delivered successfully! I&apos;ll get back to you soon.</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Dispatching message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}