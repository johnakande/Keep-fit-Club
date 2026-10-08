import styles from './ArticleList.module.css'

// Numbered constitution articles: "Art. 3 | Membership — Open to residents...".
export default function ArticleList({ articles }: { articles: { number: string; title: string; text: string }[] }) {
  return (
    <ol className={styles.list}>
      {articles.map((a) => (
        <li key={a.number} className={styles.item}>
          <span className={styles.number}>{a.number}</span>
          <span className={styles.body}>
            <span className={styles.title}>{a.title}</span>
            <span className={styles.text}>{a.text}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
