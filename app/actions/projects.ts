// app/actions/projects.ts
'use server';

import { getServiceSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Helper to verify admin session
async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;
  return sessionToken === process.env.ADMIN_SECRET_PASSWORD;
}

export async function createProject(formData: FormData) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return { error: 'Unauthorized. Please sign in as admin.' };
  }

  const title = formData.get('title') as string;
  const tagline = formData.get('tagline') as string;
  const description = formData.get('description') as string;
  const tagsRaw = formData.get('tags') as string;
  const github_url = formData.get('github_url') as string;
  const live_url = formData.get('live_url') as string;

  if (!title?.trim() || !tagline?.trim() || !description?.trim()) {
    return { error: 'Title, tagline, and markdown case study are required.' };
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const supabaseAdmin = getServiceSupabase();

  const { error } = await supabaseAdmin.from('projects').insert([
    {
      title: title.trim(),
      slug,
      tagline: tagline.trim(),
      description: description.trim(),
      github_url: github_url?.trim() || null,
      live_url: live_url?.trim() || null,
      tags,
    },
  ]);

  if (error) {
    return { error: `Database error: ${error.message}` };
  }

  // Instantly revalidate public projects cache
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  revalidatePath('/analytics');

  return { success: true };
}

export async function deleteProject(id: string) {
  const isAuthorized = await verifyAdminAuth();
  if (!isAuthorized) {
    return { error: 'Unauthorized.' };
  }

  const supabaseAdmin = getServiceSupabase();
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/projects');
  return { success: true };
}