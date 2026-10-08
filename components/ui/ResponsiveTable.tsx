import type { ReactNode } from 'react'
import styles from './ResponsiveTable.module.css'

export type Column<Row> = {
  key: keyof Row & string
  header: string
  align?: 'left' | 'right'
  weight?: 'strong' | 'muted'
  // How the cell shows on phones, where each row becomes a small card:
  // title = navy card header, aside = right side of that header, row = body line.
  mobile: 'title' | 'aside' | 'row'
  // Body line shows "Header ... value".
  mobileLabel?: boolean
  mobileWeight?: 'strong' | 'muted'
}

// One real <table> (readable by crawlers and screen readers) that restyles into
// stacked cards under 600px, matching the design's narrow layout.
export default function ResponsiveTable<Row extends Record<string, ReactNode>>({
  caption,
  columns,
  rows,
  rowKey,
}: {
  caption: string
  columns: Column<Row>[]
  rows: Row[]
  rowKey: keyof Row & string
}) {
  const hasAside = columns.some((c) => c.mobile === 'aside')
  const bodyCols = columns.filter((c) => c.mobile === 'row')
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.align === 'right' ? styles.right : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={String(r[rowKey])} className={i % 2 ? undefined : styles.zebra}>
              {columns.map((c) => {
                const bodyIndex = bodyCols.indexOf(c)
                const cls = [
                  styles[`m-${c.mobile}`],
                  c.mobile === 'title' && !hasAside && styles.fullTitle,
                  c.mobile === 'row' && bodyIndex === 0 && styles.shaded,
                  c.mobileLabel && styles.labeled,
                  c.weight && styles[c.weight],
                  c.mobileWeight && styles[`m-${c.mobileWeight}`],
                  c.align === 'right' && styles.right,
                ]
                  .filter(Boolean)
                  .join(' ')
                const content = c.mobileLabel ? (
                  <>
                    <span className={styles.label} aria-hidden="true">
                      {c.header}
                    </span>
                    <span className={styles.value}>{r[c.key]}</span>
                  </>
                ) : (
                  r[c.key]
                )
                return c.mobile === 'title' ? (
                  <th key={c.key} scope="row" className={cls}>
                    {content}
                  </th>
                ) : (
                  <td key={c.key} className={cls}>
                    {content}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
