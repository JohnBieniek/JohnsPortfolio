# Whimsy case-study sources

## September 18, 2026 redesign

The redesigned case study uses selected original assets alongside a focused
desktop/mobile presentation and one switchable project example. It replaces the
long screenshot gallery and adds implementation details verified against
`JohnBieniek/WhimsyUI` commit `521338d35c8de73d4256683418e3bc6decfb27d9`
(the current `develop` and `master` heads when reviewed).

| Added asset | Source |
| --- | --- |
| campaign-art.webp | WhimsyUI `public/work/1000952755392342.jpg` |
| farm-identity.webp | WhimsyUI `public/work/archive/708070294680591.jpg` |
| food-photography.webp | WhimsyUI `public/spnach spankies.jpg`, replaced September 19, 2026 to match the Fetch work-gallery card |
| contact.webp | Public contact page screenshot captured September 18, 2026 at 1348 × 926 |

Original images were resized and encoded as WebP. The selected screenshots below
are retained from the September 16 capture. Creative assets are attributed to
Whimsy; the portfolio narrative concerns website design and engineering.

Technical references: `next.config.ts`, `src/app/contact-form.tsx`,
`src/app/work/work-gallery.tsx`, `src/app/work/portfolio-selection.ts`,
`src/app/work/[slug]/page.tsx`, the Ingendahl and Fetch project components,
and `whimsy-contact-form/src/index.ts` / `wrangler.jsonc`.
Package presence alone was not used to claim that a library powers a feature.
The case study describes the checked-in implementation, not a production
delivery guarantee. No inquiry was submitted during review.

## Original screenshot collection

Screenshots captured from the public https://experiencewhimsy.com site on
September 16, 2026, using Chromium at 1440 × 1050 CSS pixels. The mobile
homepage uses a 390 × 844 viewport. Images are stored locally as WebP.
`home-card.webp` is an 800 × 486 crop of the homepage capture, ending just below
the featured campaign cards, before the featured partners section.
`holiday-campaign.webp` captures the full `.holiday-partners` section.

| Image | Live page |
| --- | --- |
| home, home-card, home-mobile | https://experiencewhimsy.com/ |
| work | https://experiencewhimsy.com/work |
| holiday, holiday-campaign | https://experiencewhimsy.com/work/holiday-in-the-halls |
| harvest | https://experiencewhimsy.com/work/happy-harvest |
| valentines | https://experiencewhimsy.com/work/valentines-at-jackson-crossing |
| ingendahl | https://experiencewhimsy.com/work/ingendahl-acres-branding |
| fetch | https://experiencewhimsy.com/work/fetch-market-launch |
| humane-society | https://experiencewhimsy.com/work/cascades-ribbon-cutting |
| heavenly-bakes | https://experiencewhimsy.com/work/heavenly-bakes-and-cakes |
| back-to-school | https://experiencewhimsy.com/work/back-to-school-bash |
| team-hope | https://experiencewhimsy.com/work/team-hope-walk |
| advertising | https://experiencewhimsy.com/services/ad-campaign |

## Live-link audit — September 16, 2026

Counts come from a browser crawl starting at the live homepage and following
visible rendered links on the same domain. No local route definitions, generated
pages, sitemap, or guessed URLs were used to discover pages. Repeated links,
fragments, and trailing slashes were deduplicated; image and other file links were
excluded. Every discovered page returned HTTP 200.

The crawl found **34 linked destinations**: **33 content pages** and the separate
Warden monitoring dashboard. The case study reports the 33 content pages.

| Type | Count | Linked pages |
| --- | --- | --- |
| Core destinations | 5 | Home, About, Work, Services & Pricing, Contact |
| Project case studies | 20 | The twenty cards in the live `/work` gallery |
| Service details | 8 | Ad Campaign, Business Consulting Session, Brand & Advertising Plan, Photography, Website Support, Website Transfer, Single-Page Website, Five-Page Website |
| Monitoring dashboard (counted separately) | 1 | `/warden/`, linked from `/work/whimsy-warden` |

### Live work gallery

The headline count includes all **20 featured projects and case studies**. They
span campaigns, community events, business work, and software; it is not a count
of twenty advertising campaigns.

| Visible gallery category | Linked case studies |
| --- | --- |
| Businesses | Cascades Humane Society Grand Opening; Ingendahl Acres Branding; Serenity Consulting & Community Support; Welcome Home Organization |
| Community Events | Back to School Bash; Jackson County Student Art Show; Miss Crossroads & Teen; Team Hope Walk |
| Restaurants | Alpha Koney Islands Story; Fetch Market Launch; Heavenly Bakes & Cakes Advertising; Sisters Smoothies Feature |
| Seasonal Events | Happy Harvest; Holiday in the Halls; Malloween at Jackson Crossing; Valentine’s at Jackson Crossing |
| Software | Lakeland Cabaret; Multiverse Adventurers Guild; Sonic Shielding; Whimsy’s Warden |

`live-pages.json` records all discovered paths, titles, HTTP statuses, and the
pages linking to them. This replaces the earlier count based on the local static
export, which included unlinked routes and did not describe the active site.
Captions describe the website presentation; campaign production is attributed
to Whimsy.
