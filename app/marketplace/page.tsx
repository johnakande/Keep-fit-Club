import type { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import MarketplaceBrowser from '@/components/marketplace/MarketplaceBrowser'
import { ButtonLink } from '@/components/ui/Button'
import JsonLd from '@/components/ui/JsonLd'
import Section from '@/components/ui/Section'
import { businesses, marketplaceIntro } from '@/lib/content/marketplace'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, graph, marketplaceSchema, webPageSchema } from '@/lib/schema'
import { site } from '@/lib/site'
import styles from './marketplace.module.css'

const title = 'Member Business Marketplace'
const description =
  'Buy from the people you train with: food, fitness gear, logistics, wellness, printing, auto care and solar businesses run by KeepFit club members in Awka.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/marketplace' })

export default function MarketplacePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema('/marketplace', `${title} | ${site.name}`, description, 'CollectionPage'),
          marketplaceSchema(businesses),
          breadcrumbSchema([{ name: 'Marketplace', path: '/marketplace' }]),
        )}
      />

      <BlogHero active="market" titleAs="p" />

      <Section space="xs" gap="sm" label={title}>
        <div className={styles.intro}>
          <div className={styles.introText}>
            <h1 className={styles.title}>{marketplaceIntro.title}</h1>
            <p className={styles.text}>{marketplaceIntro.text}</p>
          </div>
          <div className={styles.introCta}>
            <ButtonLink href="/join#contact" variant="dark" size="lg" icon="plus">
              {marketplaceIntro.cta}
            </ButtonLink>
            <span className={styles.note}>{marketplaceIntro.note}</span>
          </div>
        </div>
        <MarketplaceBrowser businesses={businesses} />
      </Section>
    </>
  )
}
