import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

// Search and AI-answer crawlers are welcome: being quotable in ChatGPT,
// Perplexity, Claude and Google AI results is part of how people find the club.
const aiSearchBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiSearchBots, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
