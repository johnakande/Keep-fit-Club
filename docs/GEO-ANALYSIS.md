# GEO Analysis: KeepFit Noble Friends Club website (pre-launch)

**Date:** 2026-10-08
**Scope:** All 8 page types (Home, About, Programs, Events, Blog, a blog post, Marketplace, Join) on a local production build. Checked with a GPTBot user agent, a no-JavaScript browser and a scripted crawl. The site isn't live yet, so off-site brand signals and real AI citations weren't checked.
**Framing:** Google's position is that optimizing for AI search is still SEO ([AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). The scores are heuristics, not Google data.

## 1. GEO readiness: 71/100 (homepage alone was 61)

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Citability | 25 | 17 | Specific, dated, quotable facts throughout: founding story (eleven friends, 2022, Alex Ekwueme Square), 312 members, ₦12,000 dues, the weekly schedule, ANSFA registration no., savings totals, poll results. The About story paragraphs are self-contained answers. Still missing: a Q&A block in the "Who can join? How much? Where?" pattern. |
| Structural readability | 20 | 18 | One H1 per page, no skipped heading levels on any page. Real `<table>`s (training schedule, committees), `<dl>` stats, `<ol>` constitution articles, `<time datetime>` on every date, `<address>` for contact details. |
| Multi-modal | 15 | 4 | No real photos or videos yet. Every image slot, gallery tile and portrait is a placeholder. |
| Authority and brand | 20 | 13 | Named bylines and dates on every post, named officials and committees, ANSFA affiliation and registration number, a published constitution summary. Missing: `sameAs` (no social URLs yet) and any off-site presence. |
| Technical access | 20 | 19 | 29 static routes, all server-rendered (the 12 events, 8 businesses and 6 posts are in the raw HTML). AI search crawlers explicitly allowed. Per-page canonical, Open Graph and X cards, per-post share images, sitemap with 13 URLs, llms.txt generated from the same content. |

## 2. Structured data by page

| Page | Types |
|---|---|
| All pages | SportsOrganization (address, phone hours, founding date and place, ANSFA `memberOf` and registration `identifier`, membership `Offer` at ₦12,000/year), WebSite |
| Home | WebPage + the 3 events shown |
| About | AboutPage, BreadcrumbList |
| Programs | WebPage, BreadcrumbList |
| Events | CollectionPage, BreadcrumbList, every upcoming Event (matches as SportsEvent with home and away teams; the webinar as an online event) |
| Blog | CollectionPage, Blog, BreadcrumbList |
| Blog post | WebPage, BlogPosting (author, date, section, word count, image), BreadcrumbList |
| Marketplace | CollectionPage, ItemList of 8 LocalBusiness, BreadcrumbList |
| Join | ContactPage, BreadcrumbList |

Event schema only ever lists events that haven't happened. Pages refresh hourly.

## 3. Top 5 next steps

1. **Real photos with descriptive alt text.** This is the biggest gap. The suggested alt text for each slot is already written in the content files (e.g. "Founding members at Alex Ekwueme Square, 2022"). A few short YouTube clips (match highlights, the Saturday walk) in the gallery would help most: YouTube mentions correlate most strongly with AI visibility.
2. **Social profile URLs** in `lib/site.ts`. They become footer and contact links and `sameAs` in the schema, which is how AI systems connect the website to the club's other profiles.
3. **An FAQ on About or Join** (needs approval, as it isn't in the design): "Who can join KeepFit?", "How much does membership cost?", "Where does Saturday training start?", "Is the club affiliated with ANSFA?". Each answer in 2 to 3 sentences, taken from facts already on the site.
4. **One page per event**, so each event can win Google's event rich result and be linked to directly. Add `endDate`, and `offers` or `isAccessibleForFree` once those facts are known.
5. **Off-site presence:**
   - a Google Business Profile for the Secretariat at 14 Zik Avenue
   - identical name, address and phone everywhere
   - a listing or link from ANSFA
   - coverage in local Anambra media

   These mentions need to be real; Google discounts manufactured ones.

## 4. Copy suggestion (not applied, needs approval)

The homepage H1 doesn't name the club or the town. Changing the eyebrow to "KeepFit Noble Friends Club · Awka · Est. 2022" would put both above the fold without touching the headline.
