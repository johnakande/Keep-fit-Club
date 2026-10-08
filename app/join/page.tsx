import type { Metadata } from 'next'
import ContactDetails from '@/components/forms/ContactDetails'
import ContactForm from '@/components/forms/ContactForm'
import DonatePanel from '@/components/forms/DonatePanel'
import JoinForm from '@/components/forms/JoinForm'
import SponsorCard from '@/components/forms/SponsorCard'
import Card from '@/components/ui/Card'
import Checklist from '@/components/ui/Checklist'
import ChipNav from '@/components/ui/ChipNav'
import JsonLd from '@/components/ui/JsonLd'
import PageHero from '@/components/ui/PageHero'
import Section from '@/components/ui/Section'
import SectionHead from '@/components/ui/SectionHead'
import { FeatureText } from '@/components/ui/SplitFeature'
import { contact, donate, joinHero, membership } from '@/lib/content/join'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema'
import { site } from '@/lib/site'
import styles from './join.module.css'

const title = 'Join, Donate or Contact'
const description =
  'Join KeepFit Noble Friends Club in Awka: open to anyone 18+ in Anambra, ₦12,000 a year. Register online, donate, become a sponsor or contact the Secretariat.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/join' })

export default function JoinPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema('/join', `${title} | ${site.name}`, description, 'ContactPage'), breadcrumbSchema([{ name: 'Join', path: '/join' }]))} />

      <PageHero eyebrow={joinHero.eyebrow} title={joinHero.title} lead={joinHero.lead}>
        <ChipNav label="On this page" items={joinHero.chips} />
      </PageHero>

      <Section id="join" labelledBy="join-title">
        <div className={styles.joinGrid}>
          <FeatureText id="join-title" eyebrow={membership.eyebrow} title={membership.title} paragraphs={[membership.text]}>
            <Checklist items={membership.benefits} />
          </FeatureText>
          <Card elevation="panel" padding="lg" bordered stack="none">
            <JoinForm />
          </Card>
        </div>
      </Section>

      <Section id="donate" tone="band" labelledBy="donate-title">
        <div className={styles.donateGrid}>
          <Card elevation="panel" padding="lg" stack="lg">
            <div className={styles.donateHead}>
              <h2 id="donate-title" className={styles.donateTitle}>
                {donate.title}
              </h2>
              <p className={styles.donateText}>{donate.text}</p>
            </div>
            <DonatePanel />
          </Card>
          <SponsorCard />
        </div>
      </Section>

      <Section id="contact" gap="md" labelledBy="contact-title">
        <SectionHead id="contact-title" eyebrow={contact.eyebrow} title={contact.title} />
        <div className={styles.contactGrid}>
          <Card elevation="panel" padding="lg" bordered stack="none">
            <ContactForm />
          </Card>
          <ContactDetails />
        </div>
      </Section>
    </>
  )
}
