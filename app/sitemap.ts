// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tamal.online';;

  const { data: projects } = await supabase.from('projects').select('slug, created_at');

  const projectUrls: MetadataRoute.Sitemap = (projects || []).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/career`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/analytics`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
  ];

  return [...staticUrls, ...projectUrls];
}