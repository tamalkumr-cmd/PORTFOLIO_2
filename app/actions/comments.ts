// app/actions/comments.ts
'use server';

import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addComment(formData: FormData) {
  const projectId = formData.get('projectId') as string;
  const authorName = formData.get('authorName') as string;
  const content = formData.get('content') as string;
  const slug = formData.get('slug') as string;

  if (!projectId || !authorName?.trim() || !content?.trim()) {
    return { error: 'Name and comment message are required.' };
  }

  const supabaseAdmin = getServiceSupabase();

  const { data, error } = await supabaseAdmin
    .from('project_comments')
    .insert([
      {
        project_id: projectId,
        author_name: authorName.trim(),
        content: content.trim(),
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: 'Failed to post comment. Please try again.' };
  }

  // Revalidate the dynamic project route cache to show the new comment instantly
  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }

  return { success: true, comment: data };
}