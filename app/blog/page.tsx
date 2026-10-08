import type { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import PostCard from '@/components/cards/PostCard'
import Grid from '@/components/ui/Grid'
import JsonLd from '@/components/ui/JsonLd'
import Section from '@/components/ui/Section'
import { sortedPosts } from '@/lib/content/posts'
import { pageMetadata } from '@/lib/metadata'
import { absoluteUrl, site } from '@/lib/site'
import { breadcrumbSchema, graph, ids, webPageSchema } from '@/lib/schema'

const title = 'Club Blog and News'
const description =
  'News from KeepFit Noble Friends Club in Awka: training tips, match reports, savings circle updates, eco projects and voter education, written by club members.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/blog' })

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema('/blog', `${title} | ${site.name}`, description, 'CollectionPage'),
          {
            '@type': 'Blog',
            '@id': absoluteUrl('/blog#blog'),
            name: `${site.name} blog`,
            url: absoluteUrl('/blog'),
            publisher: { '@id': ids.organization },
            blogPost: sortedPosts.map((p) => ({ '@id': absoluteUrl(`/blog/${p.slug}#article`) })),
          },
          breadcrumbSchema([{ name: 'Blog', path: '/blog' }]),
        )}
      />

      <BlogHero active="blog" />

      <Section space="xs" label="All posts">
        <Grid min={300}>
          {sortedPosts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} bordered headingLevel="h2" />
            </li>
          ))}
        </Grid>
      </Section>
    </>
  )
}
