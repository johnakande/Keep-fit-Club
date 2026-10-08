import type { Metadata } from 'next'
import { site } from './site'

// Next.js replaces nested metadata objects instead of merging them, so a page
// that sets openGraph/twitter must repeat the site-wide fields. Every page
// builds its metadata here to keep them complete.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url: path,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
