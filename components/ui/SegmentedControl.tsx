import Icon, { type IconName } from './Icon'
import styles from './SegmentedControl.module.css'

// Inset two-or-more-way toggle (Month/List, One-time/Monthly). Use inside a client component.
export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string; icon?: IconName }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="group" aria-label={label} className={styles.group}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} className={styles.option} onClick={() => onChange(o.value)}>
          {o.icon && <Icon name={o.icon} size={16} strokeWidth={1.8} />}
          {o.label}
        </button>
      ))}
    </div>
  )
}
