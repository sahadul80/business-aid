# Business Aid — Website

A responsive Next.js + TypeScript homepage for Business Aid, serving e-commerce/F-commerce owners, entrepreneurs, individuals seeking income-tax support, and businesses needing RJSC registration or compliance assistance.

## Homepage structure

1. **Header** — one-line desktop navigation, brand, and consultation CTA.
2. **Hero** — clear business positioning, a short audience-focused description, and the featured 8× growth result from the supplied client-work brief.
3. **Services** — the selected service detail is on the left; the E-commerce and Legal Aid categories and the active category's service submenu are on the right on desktop. On smaller screens the layout stacks for readability.
   - **E-commerce:** SEO & AEO, Content Creation, Media Buying, and Business Strategy.
   - **Legal Aid:** Income Tax, RJSC Registration & Compliance, and Audit Assistance.
4. **EZsell** — an embedded, scrollable EZsell website preview on the left. The product introduction, key benefits, and links to the EZsell website and Facebook page appear on the right.
5. **Selected Work** — restored client references, filterable by service, with a continuously moving partner-logo marquee at the bottom; positioned between EZsell and Contact.
6. **Contact Us** — phone and email links, office address, WhatsApp link, and an inquiry form that prepares a message in WhatsApp.
7. **Footer** — Business Aid contact details and utility links.

Section headings are kept to one line on desktop where space permits. All descriptions render in full without CSS line-clamping; concise copy generally occupies two lines on desktop and wraps naturally on small screens to avoid clipping.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Main files

- `app/page.tsx` — homepage section order.
- `app/layout.tsx` — metadata, fonts, and root layout.
- `app/globals.css` — design tokens, responsive layouts, animations, typography, and iframe styling.
- `components/Sections.tsx` — header, hero, services, EZsell, selected work, contact, footer, and WhatsApp action.
- `components/Scenes.tsx` — SVG illustrations.
- `lib/data.ts` — service names, client-work data, filters, and contact information.

## Editing content

Edit `SERVICES`, `WORK_TAGS`, `CLIENTS`, and `CONTACT` in `lib/data.ts`. Service descriptions and EZsell benefit copy are in `components/Sections.tsx`.

## Notes

- The contact form opens WhatsApp with a prefilled message; it does not submit to a server or CRM.
- The header and footer use the Business Aid logo stored at `public/busines-aid-logo.png`. Partner logos are loaded first from the supplied files in `public/client-logo/`; remote site icons are only fallbacks. The Selected Work marquee reuses the same local marks and pauses on hover/focus; reduced-motion preferences disable the animation.
- The EZsell iframe relies on `ezsell.xyz` allowing embedding via its security headers. If embedding is blocked, visitors can use the visible link to open the full site in a new tab.
- Client names and results are reference content from the supplied framework. Confirm permission and the accuracy of specific outcomes before publication.

## Selected Work cards

Each Selected Work card uses a horizontal split layout: a tinted brand-logo panel on the left and business information on the right. The right panel presents the website link, a plain-language business type description, and service-category pills. Desktop cards use a 3:1 width-to-height ratio; on narrow screens the same left-logo/right-details layout is retained with a taller card for readability. Partner logos use the supplied local image assets first and retain remote icon and readable text fallbacks if a local image cannot be loaded. Koya Bazar is included and marked as receiving all seven Business Aid service categories.
