import styles from './FilterChips.module.css'

// Single-choice pill filter (gallery categories, marketplace categories).
// Use inside a client component.
export default function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="group" aria-label={label} className={styles.group}>
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={o === value} className={styles.chip} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  )
}
