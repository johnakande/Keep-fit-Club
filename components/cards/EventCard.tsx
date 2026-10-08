import Card from '@/components/ui/Card'
import DateBadge from '@/components/ui/DateBadge'
import Icon from '@/components/ui/Icon'
import Tag from '@/components/ui/Tag'
import EventInterest from '@/components/forms/EventInterest'
import type { ClubEvent } from '@/lib/content/events'
import { eventWhen } from '@/lib/format'
import styles from './EventCard.module.css'

export default function EventCard({ event, ended = false, bordered = false }: { event: ClubEvent; ended?: boolean; bordered?: boolean }) {
  const when = eventWhen(event.start)
  return (
    <Card as="article" hover bordered={bordered} stack="md">
      <div className={styles.top}>
        <DateBadge month={when.badgeMonth} day={when.badgeDay} />
        <div className={styles.heading}>
          <Tag>{event.category}</Tag>
          <h3 className={styles.title}>{event.title}</h3>
        </div>
      </div>
      <p className={styles.text}>{event.description}</p>
      <ul className={styles.meta}>
        <li>
          <Icon name="clock" size={16} className={styles.metaIcon} />
          <time dateTime={event.start}>{when.label}</time>
        </li>
        <li>
          <Icon name="pin" size={16} className={styles.metaIcon} />
          {event.venue.label}
        </li>
      </ul>
      {ended ? <p className={styles.ended}>This event has ended.</p> : <EventInterest slug={event.slug} title={event.title} />}
    </Card>
  )
}
