'use client'

import { useState } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import styles from './ShareButtons.module.css'

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <div className={styles.share}>
      <span className={styles.label}>Share this post</span>
      <ButtonLink href={`https://wa.me/?text=${t}%20${u}`} variant="dark" size="sm" icon="whatsapp" iconSize={16} aria-label="Share on WhatsApp" {...ext}>
        WhatsApp
      </ButtonLink>
      <ButtonLink href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} variant="secondary" size="sm" aria-label="Share on Facebook" {...ext}>
        Facebook
      </ButtonLink>
      <ButtonLink href={`https://x.com/intent/post?text=${t}&url=${u}`} variant="secondary" size="sm" aria-label="Share on X" {...ext}>
        X
      </ButtonLink>
      <Button variant="secondary" size="sm" icon="link" iconSize={16} onClick={copy}>
        <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
      </Button>
    </div>
  )
}
