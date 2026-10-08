import Icon from './Icon'
import styles from './Checklist.module.css'

export default function Checklist({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" size={20} strokeWidth={1.8} className={styles.icon} />
          {item}
        </li>
      ))}
    </ul>
  )
}
