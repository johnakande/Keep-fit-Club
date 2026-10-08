import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#24324F',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/crest-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
