import Link from 'next/link'
import styles from './SectionTabs.module.css'

// Folder-style tabs at the foot of a hero. Each tab is its own page, so they
// are links (crawlable, shareable) rather than JavaScript tabs.
export default function SectionTabs({ label, items, active }: { label: string; items: { id: string; label: string; href: string }[]; active: string }) {
  return (
    <nav aria-label={label} className={styles.tabs}>
      {items.map((t) => (
        <Link key={t.id} href={t.href} className={styles.tab} aria-current={t.id === active ? 'page' : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
