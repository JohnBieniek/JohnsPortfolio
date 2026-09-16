# Whimsy case-study sources

Screenshots captured from the public https://experiencewhimsy.com site on
September 16, 2026, using Chromium at 1440 × 1050 CSS pixels. The mobile
homepage uses a 390 × 844 viewport. Images are stored locally as WebP.
`home-card.webp` is an 800-pixel-wide version of the homepage capture.
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

## Scope snapshot

Verified against the adjacent `WhimsyUI` repository and its static export:

- `src/app/work-data.ts`: 41 work entries.
- `src/app/work/software-projects.ts`: 4 additional software entries.
- `src/app/work/[slug]/page.tsx`: static params from the union of those entries,
  producing 45 work-detail routes.
- `src/app/content.ts` and `src/app/services/[slug]/page.tsx`: 7 service routes.
- `src/app/services/photography/page.tsx`: 1 additional service route.
- Home, about, work, services, and contact: 5 core routes.
- Total: **58 content pages**, excluding `404` and `_not-found` error pages.
- `src/app/work/portfolio-selection.ts`: 20 featured entries, split into five
  collections of four. Four collections contain 16 campaign, business, and
  community stories; the fifth contains four software projects.

The page count describes the broader generated site. It is not a claim of
58 unique campaigns or 58 entries in the curated work gallery. Captions describe
the website presentation; campaign production is attributed to Whimsy.
