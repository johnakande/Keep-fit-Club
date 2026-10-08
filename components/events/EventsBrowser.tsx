'use client'

import { useState } from 'react'
import EventCard from '@/components/cards/EventCard'
import Grid from '@/components/ui/Grid'
import Icon from '@/components/ui/Icon'
import SegmentedControl from '@/components/ui/SegmentedControl'
import type { CalendarItem } from '@/lib/content/events'
import { longDay, monthName } from '@/lib/format'
import styles from './EventsBrowser.module.css'


const DOW = [
  ['Mon', 'M'],
  ['Tue', 'T'],
  ['Wed', 'W'],
  ['Thu', 'T'],
  ['Fri', 'F'],
  ['Sat', 'S'],
  ['Sun', 'S'],
]

type Cell = { day: string; date: number; items: CalendarItem[] } | null

function buildCells(month: string, items: CalendarItem[]): Cell[] {
  const [y, m] = month.split('-').map(Number)
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7
  const cells: Cell[] = Array.from({ length: lead }, () => null)
  for (let d = 1; d <= days; d++) {
    const day = `${month}-${String(d).padStart(2, '0')}`
    cells.push({ day, date: d, items: items.filter((i) => i.day === day) })
  }
  while (cells.length % 7) cells.push(null)
  return cells
}

// Month calendar + list of the club's events. Server-rendered with the current
// month selected; the schema on the page lists every upcoming event regardless.
export default function EventsBrowser({ items, today }: { items: CalendarItem[]; today: string }) {
  const months = [...new Set(items.map((i) => i.day.slice(0, 7)))].sort()
  const startMonth = months.find((m) => m >= today.slice(0, 7)) ?? months[months.length - 1]

  const firstDayIn = (month: string) => {
    const inMonth = items.filter((i) => i.day.startsWith(month))
    return (inMonth.find((i) => i.day >= today) ?? inMonth[0])?.day ?? null
  }

  const [month, setMonth] = useState(startMonth)
  const [selected, setSelected] = useState<string | null>(() => firstDayIn(startMonth))
  const [view, setView] = useState<'month' | 'list'>('month')

  const index = months.indexOf(month)
  const go = (step: number) => {
    const next = months[index + step]
    if (!next) return
    setMonth(next)
    setSelected(firstDayIn(next))
  }

  const monthItems = items.filter((i) => i.day.startsWith(month))
  const shown = view === 'month' ? monthItems.filter((i) => i.day === selected) : monthItems
  const [y, m] = month.split('-').map(Number)

  return (
    <div className={styles.browser}>
      <div className={styles.toolbar}>
        <div className={styles.monthNav}>
          <button type="button" className={styles.navButton} onClick={() => go(-1)} disabled={index <= 0} aria-label="Previous month">
            <Icon name="chevronLeft" size={18} strokeWidth={1.8} />
          </button>
          <h2 className={styles.monthLabel} aria-live="polite">
            {monthName(m - 1)} {y}
          </h2>
          <button type="button" className={styles.navButton} onClick={() => go(1)} disabled={index >= months.length - 1} aria-label="Next month">
            <Icon name="chevron" size={18} strokeWidth={1.8} />
          </button>
        </div>
        <SegmentedControl
          label="View"
          value={view}
          onChange={setView}
          options={[
            { value: 'month', label: 'Month', icon: 'calendar' },
            { value: 'list', label: 'List', icon: 'list' },
          ]}
        />
      </div>

      {view === 'month' && (
        <>
          <div className={styles.calendar}>
            <div className={styles.dows} aria-hidden="true">
              {DOW.map(([long, short], i) => (
                <div key={i}>
                  <span className={styles.long}>{long}</span>
                  <span className={styles.short}>{short}</span>
                </div>
              ))}
            </div>
            <div className={styles.cells}>
              {buildCells(month, items).map((c, i) =>
                c ? (
                  <button
                    key={c.day}
                    type="button"
                    className={styles.cell}
                    aria-pressed={c.day === selected}
                    aria-label={`${longDay(c.day)}${c.items.length ? `, ${c.items.length} event${c.items.length > 1 ? 's' : ''}` : ''}`}
                    onClick={() => setSelected(c.day)}
                  >
                    <span className={styles.date}>{c.date}</span>
                    {c.items.map((it) => (
                      <span key={it.event.slug} className={styles.pill}>
                        {it.event.title}
                      </span>
                    ))}
                    {c.items.length > 0 && <span className={styles.dot} aria-hidden="true" />}
                  </button>
                ) : (
                  <div key={`empty-${i}`} className={styles.empty} aria-hidden="true" />
                ),
              )}
            </div>
          </div>
          <p className={styles.selected}>{selected ? longDay(selected) : 'Select a date'}</p>
          {shown.length === 0 && <div className={styles.none}>No events on this day. Pick a date marked on the calendar.</div>}
        </>
      )}

      {shown.length > 0 && (
        <Grid min={300}>
          {shown.map((i) => (
            <li key={i.event.slug}>
              <EventCard event={i.event} ended={i.ended} bordered />
            </li>
          ))}
        </Grid>
      )}
    </div>
  )
}
