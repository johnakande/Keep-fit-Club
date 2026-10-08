import type { Metadata } from 'next'
import EventsBrowser from '@/components/events/EventsBrowser'
import Gallery from '@/components/events/Gallery'
import JsonLd from '@/components/ui/JsonLd'
import PageHero from '@/components/ui/PageHero'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import { calendarItems, clubToday, gallery, upcomingEvents } from '@/lib/content/events'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, eventSchema, graph, webPageSchema } from '@/lib/schema'
import { site } from '@/lib/site'

// Hourly, so "today", ended events and the schema stay current.
export const revalidate = 3600

const title = 'Events and Gallery'
const description =
  'KeepFit Noble Friends Club calendar in Awka: training, ANSFA veterans matches, eco projects, meetings and socials. Visitors welcome at public events.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/events' })

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema('/events', `${title} | ${site.name}`, description, 'CollectionPage'),
          breadcrumbSchema([{ name: 'Events', path: '/events' }]),
          ...upcomingEvents().map(eventSchema),
        )}
      />

      <PageHero
        eyebrow="Events and gallery"
        title="See you at the next session."
        lead="Training, matches, eco projects, meetings and socials. Visitors are welcome at any public event."
      />

      <Section space="sm" label="Club calendar">
        <EventsBrowser items={calendarItems()} today={clubToday()} />
      </Section>

      <Section id="gallery" tone="band" gap="sm" labelledBy="gallery-title">
        <SectionHead id="gallery-title" eyebrow="Gallery" title="Photos and videos" />
        <Gallery items={gallery} />
      </Section>
    </>
  )
}
