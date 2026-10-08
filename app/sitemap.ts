import type { MetadataRoute } from 'next'
import { posts } from '@/lib/content/posts'
import { pages } from '@/lib/pages'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: p.updated,
      changeFrequency: 'weekly' as const,
      priority: p.priority,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
