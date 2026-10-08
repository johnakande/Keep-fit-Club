'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import FilterChips from '@/components/ui/FilterChips'
import Icon from '@/components/ui/Icon'
import { eventCategories, type GalleryItem } from '@/lib/content/events'
import styles from './Gallery.module.css'

const filters = ['All', ...eventCategories] as const
type Filter = (typeof filters)[number]

function youtubeId(src: string) {
  const m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/)
  return m?.[1]
}

function Media({ item }: { item: GalleryItem }) {
  if (!item.src) {
    return (
      <div className={styles.placeholder}>
        <Icon name={item.type === 'video' ? 'play' : 'image'} size={36} strokeWidth={1.4} />
        <span>{item.title}</span>
      </div>
    )
  }
  if (item.type === 'video') {
    const id = youtubeId(item.src)
    return id ? (
      <iframe
        className={styles.frame}
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={item.title}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <video className={styles.frame} src={item.src} controls preload="metadata" />
    )
  }
  return <Image src={item.src} alt={item.title} fill sizes="(min-width: 1040px) 1000px, 100vw" className={styles.photo} />
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)

  const visible = filter === 'All' ? items : items.filter((g) => g.category === filter)
  const current = open !== null ? visible[open] : null

  // Native <dialog>: focus trap, Escape and an inert page come for free.
  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (current && !d.open) d.showModal()
    if (!current && d.open) d.close()
  }, [current])

  const step = (delta: number) => setOpen((i) => (i === null ? i : (i + delta + visible.length) % visible.length))

  return (
    <div className={styles.gallery}>
      <FilterChips label="Filter gallery" options={filters} value={filter} onChange={(f) => setFilter(f)} />
      <ul className={styles.grid}>
        {visible.map((g, i) => (
          <li key={g.title}>
            <button
              type="button"
              className={styles.tile}
              aria-label={`Open ${g.type}: ${g.title}`}
              onClick={(e) => {
                opener.current = e.currentTarget
                setOpen(i)
              }}
            >
              {g.src && g.type === 'photo' && <Image src={g.src} alt="" fill sizes="(min-width: 960px) 240px, 50vw" className={styles.photo} />}
              {g.type === 'video' && (
                <span className={styles.play} aria-hidden="true">
                  <Icon name="play" size={18} strokeWidth={1.8} />
                </span>
              )}
              <span className={styles.caption}>
                <span className={styles.tag}>{g.category}</span>
                <span className={styles.title}>{g.title}</span>
                <span className={styles.kind}>{g.type === 'video' ? 'Video' : 'Photo'}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={current?.title}
        onClose={() => {
          setOpen(null)
          opener.current?.focus()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {current && (
          <div className={styles.inner}>
            <div className={styles.bar}>
              <span className={styles.counter}>
                {(open ?? 0) + 1} of {visible.length}
              </span>
              <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
                <Icon name="close" size={20} strokeWidth={1.8} />
              </button>
            </div>
            <div className={styles.media}>
              <Media item={current} />
            </div>
            <div className={styles.foot}>
              <div className={styles.info}>
                <span className={styles.infoTitle}>{current.title}</span>
                <span className={styles.infoMeta}>
                  {current.category} · {current.date}
                </span>
              </div>
              <div className={styles.steps}>
                <button type="button" className={styles.stepButton} onClick={() => step(-1)} aria-label="Previous">
                  <Icon name="chevronLeft" size={18} strokeWidth={1.8} />
                </button>
                <button type="button" className={styles.stepButton} onClick={() => step(1)} aria-label="Next">
                  <Icon name="chevron" size={18} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
