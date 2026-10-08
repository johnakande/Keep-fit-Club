import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/ui/JsonLd'
import { site } from '@/lib/site'
import { graph, organizationSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

// `subsets` only picks what gets preloaded. The latin-ext face (which carries
// the naira sign ₦) is still declared and loads on demand, so keep this lean.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Fitness & Fellowship Club, Awka`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#24324F',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang={site.language} className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
