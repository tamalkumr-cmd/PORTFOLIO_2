// components/ProjectComments.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader2, AlertCircle } from 'lucide-react';
import { addComment } from '@/app/actions/comments';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function ProjectComments({
  projectId,
  initialComments,
  slug,
}: {
  projectId: string;
  initialComments: Comment[];
  slug?: string;
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('authorName', name);
    formData.append('content', content);
    if (slug) formData.append('slug', slug);

    const res = await addComment(formData);

    if (res.success && res.comment) {
      setComments([res.comment, ...comments]);
      setContent('');
      setName('');
    } else {
      setError(res.error || 'Failed to post comment.');
    }

    setIsSubmitting(false);
  }

  return (
    <section className="mt-16 pt-10 border-t border-zinc-800 space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Thoughts & Discussion ({comments.length})</h3>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <input
          type="text"
          placeholder="Your Name (e.g. Alex)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
        />
        <textarea
          placeholder="Drop a comment, feedback, or suggestion..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition resize-none"
        />

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </>
          )}
        </button>
      </form>

      {/* Comments Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-zinc-200">{comment.author_name}</span>
                <span className="text-xs text-zinc-500">{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-zinc-400 text-sm">{comment.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}