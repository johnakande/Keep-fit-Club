'use client'

import { useState } from 'react'
import BusinessCard from '@/components/cards/BusinessCard'
import FilterChips from '@/components/ui/FilterChips'
import Grid from '@/components/ui/Grid'
import Icon from '@/components/ui/Icon'
import { type Business, businessCategories } from '@/lib/content/marketplace'
import styles from './MarketplaceBrowser.module.css'

const categories = ['All', ...businessCategories] as const
type Category = (typeof categories)[number]

export default function MarketplaceBrowser({ businesses }: { businesses: Business[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')

  const term = query.trim().toLowerCase()
  const shown = businesses.filter(
    (b) => (category === 'All' || b.category === category) && (!term || `${b.name} ${b.owner} ${b.category} ${b.description}`.toLowerCase().includes(term)),
  )

  return (
    <div className={styles.browser}>
      <label className={styles.search}>
        <span className="sr-only">Search businesses</span>
        <Icon name="search" size={20} strokeWidth={1.8} className={styles.searchIcon} />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search businesses, owners or services" className={styles.input} />
      </label>
      <FilterChips label="Filter by category" options={categories} value={category} onChange={setCategory} />
      <p className={styles.count} aria-live="polite">
        {shown.length} {shown.length === 1 ? 'business' : 'businesses'}
      </p>
      {shown.length > 0 ? (
        <Grid min={280}>
          {shown.map((b) => (
            <li key={b.name}>
              <BusinessCard business={b} headingLevel="h2" />
            </li>
          ))}
        </Grid>
      ) : (
        <div className={styles.empty}>No businesses match that search. Try another name or category.</div>
      )}
    </div>
  )
}
