import type { Metadata } from 'next'
import AnsfaCard from '@/components/about/AnsfaCard'
import ArticleList from '@/components/about/ArticleList'
import PersonCard from '@/components/cards/PersonCard'
import ValueCard from '@/components/cards/ValueCard'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Grid from '@/components/ui/Grid'
import JsonLd from '@/components/ui/JsonLd'
import PageHero from '@/components/ui/PageHero'
import ResponsiveTable, { type Column } from '@/components/ui/ResponsiveTable'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import SplitFeature, { FeatureText } from '@/components/ui/SplitFeature'
import Tag from '@/components/ui/Tag'
import { aboutHero, committees, constitution, executiveTerms, mission, story, values, vision } from '@/lib/content/about'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'
import { site } from '@/lib/site'
import styles from './about.module.css'

const title = 'About the Club'
const description =
  'Founded in Awka in 2022 by eleven friends, KeepFit Noble Friends Club now has 312 members and ANSFA partner status. Our story, values, constitution and leaders.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/about' })

type CommitteeRow = { name: string; chair: string; members: number }
const committeeColumns: Column<CommitteeRow>[] = [
  { key: 'name', header: 'Committee', mobile: 'title' },
  { key: 'chair', header: 'Chair', weight: 'muted', mobile: 'row', mobileLabel: true },
  { key: 'members', header: 'Members', align: 'right', weight: 'strong', mobile: 'row', mobileLabel: true },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema('/about', `${title} | ${site.name}`, description, 'AboutPage'), breadcrumbSchema([{ name: 'About', path: '/about' }]))} />

      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} lead={aboutHero.lead} />

      <Section labelledBy="story-title">
        <SplitFeature image={story.image} icon="fitness">
          <FeatureText id="story-title" eyebrow={story.eyebrow} title={story.title} paragraphs={story.paragraphs} />
        </SplitFeature>
      </Section>

      <Section tone="band" gap="lg" label="Vision, mission and values">
        <Grid min={340} mode="fit" as="div">
          <Card elevation="panel" padding="xl" stack="sm">
            <Tag tone="navy">Vision</Tag>
            <p className={styles.statement}>{vision}</p>
          </Card>
          <Card elevation="panel" padding="xl" stack="sm">
            <Tag tone="navy">Mission</Tag>
            <p className={styles.statement}>{mission}</p>
          </Card>
        </Grid>
        <div className={styles.stack}>
          <h2 className="section-title">Core values</h2>
          <Grid min={240}>
            {values.map((v) => (
              <li key={v.number}>
                <ValueCard {...v} />
              </li>
            ))}
          </Grid>
        </div>
      </Section>

      <Section labelledBy="constitution-title">
        <div className={styles.governance}>
          <FeatureText id="constitution-title" eyebrow={constitution.eyebrow} title={constitution.title} paragraphs={[constitution.text]}>
            {constitution.pdf.href ? (
              <>
                <ButtonLink href={constitution.pdf.href} variant="dark" size="lg" icon="download" className={styles.download}>
                  Download Constitution (PDF)
                </ButtonLink>
                <span className={styles.fileMeta}>
                  {constitution.pdf.pages} pages · {constitution.pdf.size} · Last amended {constitution.pdf.amended}
                </span>
              </>
            ) : (
              <ButtonLink href={`mailto:${site.email}?subject=Constitution%20copy`} variant="dark" size="lg" icon="mail" className={styles.download}>
                Request the full constitution
              </ButtonLink>
            )}
          </FeatureText>
          <ArticleList articles={constitution.articles} />
        </div>
      </Section>

      <Section space="md" noTop label="ANSFA affiliation">
        <AnsfaCard />
      </Section>

      <Section tone="band" gap="md" labelledBy="leadership-title">
        <SectionHead id="leadership-title" eyebrow="Leadership" title="Past Administrative Executives" />
        {executiveTerms.map((term) => (
          <div key={term.title} className={styles.term}>
            <div className={styles.termHead}>
              <h3 className={styles.termTitle}>{term.title}</h3>
              <Tag tone="navy">{term.years}</Tag>
            </div>
            <Grid min={170}>
              {term.people.map((p) => (
                <li key={`${term.title}-${p.role}`}>
                  <PersonCard name={p.name} badge={p.role} note={term.years} photo={p.photo} headingLevel="h4" />
                </li>
              ))}
            </Grid>
          </div>
        ))}
      </Section>

      <Section gap="sm" labelledBy="committees-title">
        <SectionHead id="committees-title" eyebrow={committees.eyebrow} title={committees.title} />
        <ResponsiveTable caption={`${committees.title}, ${committees.eyebrow}`} columns={committeeColumns} rows={committees.rows} rowKey="name" />
      </Section>
    </>
  )
}
