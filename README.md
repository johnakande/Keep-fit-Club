# KeepFit Noble Friends Club website

Next.js 16 site for KeepFit Noble Friends Club, a fitness and fellowship club in Awka, Anambra State. Built from the Claude Design project "Six pages built with interactions".

**Pages:** Home, About, Programs, Events and gallery, Blog (plus one page per post), Member marketplace, and Join / Donate / Contact.

## See the site on this computer

Double-click **`Start KeepFit site.bat`**. It builds the site and opens http://localhost:3100. Close the black window to stop it.

The launcher runs in **preview mode**: every form shows its success screen, but nothing is emailed. The screen says "Preview mode: nothing was sent."

## Change the content

All text and numbers live in `lib/`. Edit a file, then restart the site.

| What | File |
|---|---|
| Club name, address, phone, email, dues, ANSFA number, bank account, social links, payment page, web address | `lib/site.ts` |
| Stats, five pillars, sponsors | `lib/content/club.ts` |
| Homepage hero and closing banner | `lib/content/home.ts` |
| About: story, values, constitution, ANSFA, executives, committees | `lib/content/about.ts` |
| Programs: schedule, fixtures, challenge, savings groups, webinars, eco projects, poll, awards | `lib/content/programs.ts` |
| Events calendar and gallery | `lib/content/events.ts` |
| Blog posts | `lib/content/posts.ts` |
| Marketplace businesses | `lib/content/marketplace.ts` |
| Join page: benefits, form options, donation amounts, sponsor tiers | `lib/content/join.ts` |

Things that update themselves (pages refresh hourly):
- Events drop off the homepage and out of the structured data 3 hours after they start. On the calendar, past events show "This event has ended".
- Fixtures and webinars on Programs disappear once they've happened. The poll and the 100km challenge switch to "Closed"/"Ended" after their end dates.
- Blog read times are worked out from the real text.

**Photos and files:** put them in `public/images/` (or `public/docs/` for PDFs) and set the matching field: `hero.image.src`, `story.image.src`, `pillarIntros.<pillar>.image.src`, a post's `coverSrc`, a gallery item's `src` (photo, YouTube link or MP4), an executive's `photo`, a sponsor's or business's `logoSrc`, `ansfa.crestSrc`, `constitution.pdf.href`. Until then each slot shows a quiet branded placeholder.

**Social links:** fill in `social` in `lib/site.ts`. Each one then appears in the footer and on the Contact section, and joins the structured data (`sameAs`).

## Going live

1. Set the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`, the real address (defaults to `https://keepfitnoble.ng`).
   - `RESEND_API_KEY` and `FORMS_FROM_EMAIL`, so registrations, messages and event sign-ups are emailed to `FORMS_TO_EMAIL` (defaults to hello@keepfitnoble.ng). Get a free key at resend.com and verify the sending domain. Without these, live forms tell visitors to call or email instead, so nothing is silently lost.
   - Do **not** set `FORMS_PREVIEW` on the live site.
2. Card and mobile-money donations: create a hosted payment page (Paystack or Flutterwave) and put its link in `donations.paymentUrl` in `lib/site.ts`. Card numbers are never typed into this site. Bank transfer works now.
3. Deploy anywhere that runs Next.js (Vercel is the simplest).
4. Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
5. Test the homepage, Events page and one blog post in Google's Rich Results Test (https://search.google.com/test/rich-results).

## For developers

- `npm run dev` / `npm run build` / `npm run lint`
- Components:
  - `components/ui/`: primitives (Button, Card, Tag, Section, SectionHead, Grid, PageHero, ChipNav, SectionTabs, MediaFrame, SplitFeature, ListCard, ResponsiveTable, ProgressBar, SegmentedControl, FilterChips, Checklist, CtaBand, DateBadge, Portrait, Icon, JsonLd)
  - `components/cards/`: content cards
  - `components/layout/`: header and footer
  - `components/forms/`: fields, the four forms, donate panel, contact details
  - `components/{home,about,programs,events,blog,marketplace}/`: page-specific pieces
- Design tokens and button styles: `app/globals.css`. Each component has its own CSS module.
- Forms post to server actions in `app/actions.ts` (validated on the server, with a honeypot spam trap). Delivery is in `lib/deliver.ts`.
- Page metadata goes through `lib/metadata.ts`. Next.js replaces nested `openGraph` and `twitter` objects instead of merging them, so the helper re-adds the site-wide fields.
- JSON-LD builders: `lib/schema.ts`. The site-wide Organization and WebSite are in `app/layout.tsx`; each page adds its own nodes.
- New page: add it to `lib/pages.ts` (feeds the sitemap and llms.txt).
- GEO notes and next steps: `docs/GEO-ANALYSIS.md`.
