import type { Metadata } from 'next'
import EventCard from '@/components/cards/EventCard'
import PillarCard from '@/components/cards/PillarCard'
import PostCard from '@/components/cards/PostCard'
import HomeHero from '@/components/home/HomeHero'
import SponsorStrip from '@/components/home/SponsorStrip'
import StatsBar from '@/components/home/StatsBar'
import CtaBand from '@/components/ui/CtaBand'
import Grid from '@/components/ui/Grid'
import JsonLd from '@/components/ui/JsonLd'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import { pillars, sponsors, stats } from '@/lib/content/club'
import { upcomingEvents } from '@/lib/content/events'
import { closingCta } from '@/lib/content/home'
import { sortedPosts } from '@/lib/content/posts'
import { pageMetadata } from '@/lib/metadata'
import { eventSchema, graph, webPageSchema } from '@/lib/schema'
import { site } from '@/lib/site'
import styles from './page.module.css'

// Re-render hourly so finished events drop off the page and out of the schema.
export const revalidate = 3600

const title = `${site.name} | Fitness & Fellowship Club, Awka`
const description =
  'A fitness and fellowship club in Awka, Anambra State. Weekly training, savings circles, eco projects and civic voice for 312 members. Join in two minutes.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/', absoluteTitle: true })

export default function HomePage() {
  // Schema covers exactly the events shown; the Events page lists them all.
  const next = upcomingEvents().slice(0, 3)

  return (
    <>
      <JsonLd data={graph(webPageSchema('/', title, description), ...next.map(eventSchema))} />

      <HomeHero />
      <StatsBar stats={stats} />

      <Section labelledBy="pillars-title">
        <SectionHead id="pillars-title" eyebrow="Five pillars" title="What the club offers" cta={{ label: 'All programs', href: '/programs' }} spaced />
        <Grid min={210}>
          {pillars.map((p) => (
            <li key={p.id}>
              <PillarCard pillar={p} />
            </li>
          ))}
        </Grid>
      </Section>

      <Section tone="band" labelledBy="events-title">
        <SectionHead id="events-title" eyebrow="Coming up" title="Upcoming events" cta={{ label: 'Full calendar', href: '/events' }} spaced />
        {next.length > 0 ? (
          <Grid min={300}>
            {next.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </Grid>
        ) : (
          <p className={styles.empty}>No events are scheduled right now. Check the full calendar for new dates.</p>
        )}
      </Section>

      <Section labelledBy="blog-title">
        <SectionHead id="blog-title" eyebrow="Blog and news" title="Latest from the club" cta={{ label: 'Read the blog', href: '/blog' }} spaced />
        <Grid min={300}>
          {sortedPosts.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </Grid>
      </Section>

      <SponsorStrip sponsors={sponsors} />

      <CtaBand title={closingCta.title} text={closingCta.text} />
    </>
  )
}
