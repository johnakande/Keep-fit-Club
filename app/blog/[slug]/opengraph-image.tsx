import { getPost, posts } from '@/lib/content/posts'
import { ogCard, ogFooter } from '@/lib/og'
import { postDate } from '@/lib/format'
import { site } from '@/lib/site'

export const alt = `Blog post from ${site.name}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  return ogCard({
    eyebrow: post ? `${post.category} · ${postDate(post.date)}` : site.name,
    title: post?.title ?? site.name,
    footer: post ? `By ${post.author} · ${site.name}` : ogFooter,
  })
}
