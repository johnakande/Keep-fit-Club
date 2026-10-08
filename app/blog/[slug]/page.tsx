import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogHero from '@/components/blog/BlogHero'
import ShareButtons from '@/components/blog/ShareButtons'
import PostCard from '@/components/cards/PostCard'
import { ButtonLink } from '@/components/ui/Button'
import Grid from '@/components/ui/Grid'
import JsonLd from '@/components/ui/JsonLd'
import MediaFrame from '@/components/ui/MediaFrame'
import Portrait from '@/components/ui/Portrait'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import Tag from '@/components/ui/Tag'
import { postIcon } from '@/components/cards/PostCard'
import { getPost, posts, readMinutes, sortedPosts } from '@/lib/content/posts'
import { postDate } from '@/lib/format'
import { pageMetadata } from '@/lib/metadata'
import { blogPostingSchema, breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'
import { absoluteUrl, site } from '@/lib/site'
import styles from './article.module.css'

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const meta = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` })
  return {
    ...meta,
    authors: [{ name: post.author }],
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.date, authors: [post.author], section: post.category },
  }
}

export default async function ArticlePage({ params }: PageProps<'/blog/[slug]'>) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const path = `/blog/${post.slug}`
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema(path, `${post.title} | ${site.name}`, post.excerpt),
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: 'Blog', path: '/blog' },
            { name: post.title, path },
          ]),
        )}
      />

      <BlogHero active="blog" titleAs="p" />

      <article className={styles.article} aria-labelledby="post-title">
        <div className={styles.inner}>
          <ButtonLink href="/blog" variant="secondary" size="sm" icon="chevronLeft" iconSize={16} className={styles.back}>
            All posts
          </ButtonLink>

          <header className={styles.header}>
            <Tag tone="red">{post.category}</Tag>
            <h1 id="post-title" className={styles.title}>
              {post.title}
            </h1>
            <div className={styles.byline}>
              <Portrait name={post.author} shape="avatar" size={36} />
              <span className={styles.author}>{post.author}</span>
              <span>
                <time dateTime={post.date}>{postDate(post.date)}</time> · {readMinutes(post)} min read
              </span>
            </div>
          </header>

          <MediaFrame src={post.coverSrc} alt={post.coverAlt} aspect="16/9" icon={postIcon[post.category]} preload sizes="(min-width: 840px) 760px, 100vw" />

          <div className={styles.body}>
            {post.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <ShareButtons url={absoluteUrl(path)} title={post.title} />
        </div>
      </article>

      <Section tone="band" labelledBy="more-title">
        <SectionHead id="more-title" eyebrow="Keep reading" title="More from the club" cta={{ label: 'All posts', href: '/blog' }} spaced />
        <Grid min={300}>
          {more.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </Grid>
      </Section>
    </>
  )
}
