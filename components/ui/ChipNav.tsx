import styles from './ChipNav.module.css'

// Frosted pill links inside a page hero, jumping to sections of the page.
export default function ChipNav({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <nav aria-label={label} className={styles.nav}>
      {items.map((i) => (
        <a key={i.href} href={i.href} className={styles.chip}>
          {i.label}
        </a>
      ))}
    </nav>
  )
}
