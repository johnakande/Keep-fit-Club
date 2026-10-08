import Image from 'next/image'
import Link from 'next/link'
import { cardClass } from '@/components/ui/Card'
import Icon, { type IconName } from '@/components/ui/Icon'
import Tag from '@/components/ui/Tag'
import { type Post, type PostCategory, readMinutes } from '@/lib/content/posts'
import { postDate } from '@/lib/format'
import styles from './PostCard.module.css'

export const postIcon: Record<PostCategory, IconName> = {
  Fitness: 'fitness',
  Wealth: 'wealth',
  Sustainability: 'lifestyle',
  'Civic Voice': 'civic',
  Matches: 'shield',
  Wellbeing: 'lifestyle',
}

export default function PostCard({ post, bordered = false, headingLevel = 'h3' }: { post: Post; bordered?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <Link href={`/blog/${post.slug}`} className={cardClass({ hover: true, padding: 'none', stack: 'none', bordered })}>
      <div className={styles.cover}>
        {post.coverSrc ? (
          <Image src={post.coverSrc} alt={post.coverAlt} fill sizes="(min-width: 960px) 400px, 100vw" className={styles.img} />
        ) : (
          <Icon name={postIcon[post.category]} size={36} strokeWidth={1.4} className={styles.icon} />
        )}
      </div>
      <div className={styles.body}>
        <Tag tone="red">{post.category}</Tag>
        <Heading className={styles.title}>{post.title}</Heading>
        <p className={styles.meta}>
          <time dateTime={post.date}>{postDate(post.date)}</time> · {readMinutes(post)} min read
        </p>
      </div>
    </Link>
  )
}
