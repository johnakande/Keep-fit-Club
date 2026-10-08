import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PersonCard from '@/components/cards/PersonCard'
import ChallengeCard from '@/components/programs/ChallengeCard'
import CoachTipCard from '@/components/programs/CoachTipCard'
import PollCard from '@/components/programs/PollCard'
import StatusTag from '@/components/programs/StatusTag'
import ChipNav from '@/components/ui/ChipNav'
import CtaBand from '@/components/ui/CtaBand'
import Grid from '@/components/ui/Grid'
import JsonLd from '@/components/ui/JsonLd'
import ListCard, { ListRow } from '@/components/ui/ListCard'
import PageHero from '@/components/ui/PageHero'
import ResponsiveTable, { type Column } from '@/components/ui/ResponsiveTable'
import Section from '@/components/ui/Section'
import SplitFeature, { FeatureText } from '@/components/ui/SplitFeature'
import Tag from '@/components/ui/Tag'
import { type PillarId, pillars } from '@/lib/content/club'
import {
  campaigns,
  ecoProjects,
  fixtures,
  honourees,
  opportunities,
  pillarIntros,
  programsCta,
  programsHero,
  savingsGroups,
  schedule,
  stillAhead,
  voterEducation,
  webinars,
  wellness,
} from '@/lib/content/programs'
import { dayTime, eventWhen } from '@/lib/format'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'
import styles from './programs.module.css'

// Fixtures and webinars drop off once they've happened.
export const revalidate = 3600

const title = 'KeepFit Programs: Fitness, Savings, Eco & Civic Voice'
const description =
  'Five club pillars in Awka: coached training five days a week, savings circles holding ₦2.1M, 22 eco projects, non-partisan voter education and monthly awards.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/programs', absoluteTitle: true })

type ScheduleRow = (typeof schedule)[number]
const scheduleColumns: Column<ScheduleRow>[] = [
  { key: 'day', header: 'Day', mobile: 'title' },
  { key: 'session', header: 'Session', mobile: 'row', mobileWeight: 'strong' },
  { key: 'time', header: 'Time', weight: 'muted', mobile: 'aside' },
  { key: 'venue', header: 'Venue', weight: 'muted', mobile: 'row', mobileWeight: 'muted' },
]

function Pillar({ id, index, children }: { id: PillarId; index: number; children: ReactNode }) {
  const pillar = pillars.find((p) => p.id === id)!
  const intro = pillarIntros[id]
  return (
    <Section id={id} tone={index % 2 ? 'band' : 'plain'} gap="md" labelledBy={`${id}-title`}>
      <SplitFeature image={intro.image} icon={id} reverse={index % 2 === 1}>
        <FeatureText id={`${id}-title`} eyebrow={`Pillar ${pillar.number}`} title={pillar.title} paragraphs={[intro.text]} />
      </SplitFeature>
      {children}
    </Section>
  )
}

export default function ProgramsPage() {
  const nextFixtures = stillAhead(fixtures)
  const nextWebinars = stillAhead(webinars)

  return (
    <>
      <JsonLd data={graph(webPageSchema('/programs', title, description), breadcrumbSchema([{ name: 'Programs', path: '/programs' }]))} />

      <PageHero eyebrow={programsHero.eyebrow} title={programsHero.title} lead={programsHero.lead}>
        <ChipNav label="Pillars" items={pillars.map((p) => ({ label: p.title, href: `#${p.id}` }))} />
      </PageHero>

      <Pillar id="fitness" index={0}>
        <div className={styles.stack}>
          <h3 className={styles.subTitle}>Weekly training schedule</h3>
          <ResponsiveTable caption="Weekly training schedule" columns={scheduleColumns} rows={schedule} rowKey="day" />
        </div>
        <Grid min={300}>
          <li>
            <ListCard title="Match fixtures">
              {nextFixtures.length ? (
                nextFixtures.map((f) => <ListRow key={f.start} title={f.opponent} meta={eventWhen(f.start).label} aside={<Tag>{f.venue}</Tag>} />)
              ) : (
                <ListRow title="No fixtures are scheduled right now." stacked />
              )}
            </ListCard>
          </li>
          <li>
            <ChallengeCard />
          </li>
          <li>
            <CoachTipCard />
          </li>
        </Grid>
      </Pillar>

      <Pillar id="wealth" index={1}>
        <Grid min={300}>
          <li>
            <ListCard title="Savings and investment groups">
              {savingsGroups.map((g) => (
                <ListRow key={g.name} title={g.name} meta={`${g.members} · ${g.dues}`} aside={<span className={styles.pool}>{g.pool}</span>} />
              ))}
            </ListCard>
          </li>
          <li>
            <ListCard title="Financial literacy webinars">
              {nextWebinars.length ? (
                nextWebinars.map((w) => <ListRow key={w.title} title={w.title} meta={`${dayTime(w.start)} · ${w.host}`} stacked />)
              ) : (
                <ListRow title="No webinars are scheduled right now." stacked />
              )}
            </ListCard>
          </li>
          <li>
            <ListCard title="Mentorship and opportunity board">
              {opportunities.map((o) => (
                <ListRow
                  key={o.title}
                  badge={
                    <Tag tone="navy" size="sm">
                      {o.type}
                    </Tag>
                  }
                  title={o.title}
                  meta={o.by}
                  stacked
                />
              ))}
            </ListCard>
          </li>
        </Grid>
      </Pillar>

      <Pillar id="lifestyle" index={2}>
        <Grid min={340} mode="fit">
          <li>
            <ListCard title="Eco-projects">
              {ecoProjects.map((e) => (
                <ListRow key={e.title} title={e.title} meta={e.meta} aside={<StatusTag status={e.status} />} />
              ))}
            </ListCard>
          </li>
          <li>
            <ListCard title="Wellness and mental health">
              {wellness.map((w) => (
                <ListRow key={w.title} title={w.title} meta={w.meta} stacked />
              ))}
            </ListCard>
          </li>
        </Grid>
      </Pillar>

      <Pillar id="civic" index={3}>
        <Grid min={300}>
          <li>
            <ListCard title="Voter education">
              {voterEducation.map((v) => (
                <ListRow key={v.title} title={v.title} meta={v.meta} href={v.href} />
              ))}
            </ListCard>
          </li>
          <li>
            <PollCard />
          </li>
          <li>
            <ListCard title="Advocacy campaigns">
              {campaigns.map((c) => (
                <ListRow key={c.title} title={c.title} meta={c.text} extra={c.meta} stacked />
              ))}
            </ListCard>
          </li>
        </Grid>
      </Pillar>

      <Pillar id="awards" index={4}>
        <Grid min={170}>
          {honourees.map((h) => (
            <li key={h.name + h.award}>
              <PersonCard name={h.name} badge={h.award} note={h.note} badgeFirst />
            </li>
          ))}
        </Grid>
      </Pillar>

      <CtaBand title={programsCta.title} text={programsCta.text} />
    </>
  )
}
