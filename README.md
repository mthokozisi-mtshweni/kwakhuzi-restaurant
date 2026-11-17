# Kwa’Khuzi Traditional Restaurant

A local, frontend-only React + TypeScript + Vite website by Bendalo Technology & Innovation.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm run build
npm run lint
npm run preview
```

## Implementation

- Six routes: Home, Menu, About, Gallery, Reviews and Contact; custom 404.
- Responsive black, gold and cream styling using Cormorant Garamond and Manrope (Google Fonts with system fallbacks).
- Six-scene cinematic hero using the supplied `src/assets/images/Hero/` collection with crossfades, thumbnail navigation, previous/next controls, counter, progress, pause/play, next-image preloading, reduced-motion support and hidden-tab pause. Starts on the Entrance scene (02/06).
- Fixed header with transparent homepage gradient, scrolled dark backdrop and mobile navigation.
- Experience dialog plays the supplied restaurant-exterior video on demand; native video controls, Escape dismissal and focus restoration.
- Shared premium dark-and-gold homepage preview and full `/menu` page: nine category filters, four/two/one-column food cards, dish-detail dialogs, search, URL category selection, drink subcategory filters and original printed menus.
- Dish photos are assigned only where identifiable; other items use clearly labelled neutral placeholders. Add verified image/imageAlt fields in `src/data/menu.ts` to replace them.
- Filtered photo gallery with keyboard arrows, Escape, focus containment, restored focus and scroll lock.
- Mobile navigation, click-to-call, WhatsApp and Google Maps venue search.
- Route-specific titles, descriptions and Open Graph text. No unverified structured data.
- No backend, accounts, orders, payments or automatic reservation processing. Enquiries are prepared locally for the visitor to send in WhatsApp.

## Source files

- `src/App.tsx`: shared layout, reusable sections, page components and interactions.
- `src/App.css`: design tokens, layout, components and responsive/reduced-motion rules.
- `src/data/site.ts`: central business details and navigation.
- `src/data/menu.ts`: typed menu, prices, categories, drink groups and verified dish image mappings.
- `src/components/PremiumMenu.tsx` and `PremiumMenu.css`: shared menu presentation, category navigation, search and accessible details dialogs.
- `src/data/gallery.ts`: authentic photo metadata.
- `src/data/reviews.ts`: empty approved-testimonial collection.
- `public/images/`: WebP copies of supplied photos; originals preserved in `src/assets/images/`.
- `index.html`: base metadata and favicon.

## Management checklist before publication

1. Verify every food and drink name, price, description, special and availability against the current menu. The supplied menu photos were used for transcription. Only clearly readable soft drinks/mixers are digitised; the full drinks photograph is linked for reference. Confirm remaining beers, ciders, wines and spirits before transcribing.
2. Confirm `060 522 2038` and whether it accepts WhatsApp. These supplied details power preview contact links.
3. Supply exact verified Google Maps listing and address. The current link searches for the venue; no coordinates or street address have been invented.
4. Supply confirmed opening hours and official social links. Hours and social links from the design mockups are not treated as verified.
5. Supply approved customer reviews and any permission for customer portraits. No invented testimonials are shown.
6. Confirm image publication rights. Customer group photographs are deliberately excluded pending consent. All other original photo assets remain preserved.
7. Supply approved business history before expanding the neutral About copy.
8. The actual venue differs from the conceptual UI references. Only genuine supplied venue and food photos are used; the original logo is displayed unmodified.
9. Both original videos remain preserved. The Experience dialog uses the verified exterior footage from `WhatsApp Video 2026-11-15 at 20.42.26.mp4`; it loads only when the dialog is opened. The other video begins inside a car and is not used. The hero backgrounds and thumbnails use the six user-selected images in `src/assets/images/Hero/`, with optimized WebP copies in `public/images/hero/`. Originals are preserved.

## Hosting and SEO

No deployment has been performed. The requested work is in this local project; publication awaits management content verification.

Serve `dist/` on a static host with an SPA fallback to `index.html` for all app routes. `public/_redirects` supplies this for compatible hosts; configure equivalent rewrites elsewhere.

`public/robots.txt` currently blocks indexing of this unverified preview. Before launch, replace it with an allow policy and the production sitemap URL. `sitemap.template.xml` lists all routes using `PRODUCTION_ORIGIN`; replace that placeholder with the approved absolute HTTPS origin and save as `sitemap.xml`. Do not publish the template as a sitemap. Add canonical and absolute Open Graph URL/image tags after the domain is confirmed.

Client-side metadata is a foundation, not a guarantee of crawler indexing. Static prerendering can be evaluated separately if needed without introducing a backend.

## Verification

Build/typechecking and lint pass. Local headless Chromium checks covered all six hero scenes, automatic advance, pause, fixed-header scrolling, mobile navigation, and page-heading offsets across all existing routes. No browser runtime exceptions were recorded. Desktop/mobile screenshots were inspected. No horizontal overflow or hero-content overlap was found at 320/375/390/430/768/1024/1440px.

Live phone/WhatsApp availability and the Maps destination still need management/device confirmation before launch. Google Fonts use system fallbacks if unavailable.

## Premium menu verification

The shared menu uses all 41 transcribed entries with existing prices. Homepage previews show up to four items per category; the dedicated page exposes all entries, search and URL category selection. Soft drinks, mixers and water are grouped separately. Other drink entries remain in the linked original photograph pending exact transcription/confirmation.

Local Chromium checks covered all nine preview categories, full-menu links, search and reset, drink groups, modal contents, Escape/focus restoration, and one/two/four-column layouts at 320/375/390/430/768/1024/1440px. No horizontal overflow or browser runtime exceptions were found. The hero still contains its six backgrounds and no visible slider controls. Header, hero and other section implementations were preserved.

Most individual dish photographs are not yet identified. Neutral placeholders are intentional; supply labelled photographs before replacing them. The supplied dagwood photo is low resolution and would benefit from a sharper original.

## Supplied menu images

Menu cards and detail dialogs now use the ten images supplied in `src/assets/images/Menu/`, with optimized WebP copies in `public/images/menu/`. Original PNGs are preserved. `src/data/menu.ts` centralizes dish-specific and category image mappings. The artwork is labelled as menu/category illustration; it does not assert an exact photographed portion or serving for each item. Menu names, prices, descriptions and filtering are unchanged.

## Premium gallery

`src/components/PremiumGallery.tsx` and `PremiumGallery.css` provide a shared white-and-gold gallery preview and `/gallery` page. `src/data/gallery.ts` remains the single source for 32 original restaurant photographs. The homepage shows eight selected photographs in two desktop rows; the full page includes the complete collection. Five filters group All, The Venue, Food & Drinks, Events and Atmosphere. No approved event photos are supplied, so Events has an honest empty state.

The fullscreen native-dialog lightbox supports previous/next buttons, arrow keys, Escape, touch swipe, image titles/counters, filtered navigation, scroll locking, focus containment and restored focus. Motion respects reduced-motion settings. Images reserve their proportions and load lazily.

Build and lint pass. Local Chromium checks passed all filters, keyboard/button/swipe navigation, filtered counters, scroll/focus restoration and `/gallery` navigation. Layouts were checked at 320/375/390/430/768/1024/1440px with no horizontal overflow or runtime exceptions. Desktop/mobile screenshots were inspected. Hero and menu markers remain intact. Several original meal/aerial photos are low resolution; higher-resolution originals are still desirable. No illustrative Hero/Menu artwork was substituted for authentic gallery photographs.

## Premium guest reviews

`src/components/PremiumReviews.tsx` and `PremiumReviews.css` provide the ivory-and-gold homepage section and `/reviews` page. They reuse the official logo, a neutral summary panel, one/two/three-card responsive carousel, pagination, keyboard arrows, touch swipe and reduced-motion support. Decorative patterns and a small Lucide cooking-pot illustration are secondary to the content.

`src/data/reviews.ts` stores approved reviews (currently empty), optional summary statistics and clearly labelled development samples. Sample names, text and star ratings are illustrative and appear only under Vite development mode; production shows a feedback invitation until approved reviews exist. No sample dates, customer portraits, verified badges, aggregate rating or review counts are fabricated. Review entries support IDs, optional avatars, ratings, text, ISO dates and substantiated verification status. Summary highlights describe design themes, not verified customer findings.

Set `site.googleReviewUrl` in `src/data/site.ts` only when management supplies a confirmed Google review URL. Until then, Share Your Experience opens `/contact`, with an explanatory line. There is no review-submission form, backend or saved-feedback claim.

Build and lint pass. Local Chromium checks passed previous/next, pagination, keyboard arrows, touch swipe and Contact navigation. Both homepage and `/reviews` were checked at 320/375/390/430/768/1024/1440px with no horizontal overflow or runtime exceptions. Production-preview checks confirmed the exclusion of sample reviews, invented rating statistics and verified badges. Hero, menu and gallery markers remain intact. Desktop/mobile screenshots were inspected.

## Premium contact and WhatsApp enquiries

`src/components/PremiumContact.tsx` and `PremiumContact.css` now serve the homepage contact section and `/contact`. The white three-column contact area contains an authentic original venue photo, official logo, phone/WhatsApp details, email/hours placeholders and configurable Google Maps area. The separate dark venue-photo enquiry section contains an accessible white form.

The user confirmed `060 522 2038` for WhatsApp enquiries. `site.whatsappConfirmed` enables submission; set it to false to disable form handoff if confirmation is revoked. `site.email`, `site.openingHours` and `site.googleMapsEmbedUrl` remain null until supplied. A real iframe appears only after a confirmed embed URL is configured. Until then, the clearly labelled location placeholder links to the existing Google venue search. No exact coordinates, address, email or hours are invented.

Required name, phone, enquiry type and message are validated, as is optional email. A valid form prepares an encoded WhatsApp URL with the enquiry details, opens WhatsApp and offers a manual continuation link if the popup is blocked. The visitor must review and send the message there. No server request, email service, localStorage, logging of personal information or automatic booking confirmation is introduced.

Build and lint passed. Local Chromium checks covered 320/375/390/430/768/1024/1440px on the homepage and `/contact`, with no overflow or header overlap. Tests passed required-field validation, error focus, malformed phone/email rejection, optional email omission, international phone acceptance, correct recipient/URL encoding and the ready-message status. WhatsApp opening was intercepted in tests; no enquiry was sent. Phone/WhatsApp links and current map/email placeholder state were checked. Existing hero/menu/gallery/reviews markers remain intact; desktop and mobile screenshots were inspected.

## Premium About page

`src/pages/AboutPage.tsx` and `AboutPage.css` implement the dedicated `/about` experience: a 70svh cinematic hero, alternating story/food/team/experience rows, proposed vision/values/promise and a menu CTA. Photographs are original venue/food images, not the illustrative Hero/Menu artwork. A caption identifies the venue photograph used in place of an approved team portrait.

`src/data/about.ts` centralizes editable story and team draft copy, section photos and proposed values. Management must supply the founding history, meaning behind the name, approved staff information/portrait and official vision/values/promise. Unconfirmed content is explicitly labelled draft/proposed; no founders, dates or staff biographies were invented.

`src/data/site.ts` now supplies Home ? About Us ? Menu ? Gallery ? Reviews ? Contact to the existing shared desktop/mobile navigation and footer. Header dimensions and logo remain unchanged. The existing metadata implementation gives `/about` the title `About Kwa?Khuzi | Traditional Restaurant in KwaMhlanga`, a page-specific description and matching Open Graph text.

Build and lint pass. Chromium checks passed `/about` at 320/375/390/430/768/1024/1440px, one H1, image decoding, mobile image-first stacking, fixed-header clearance, exact title, active About link, desktop/mobile navigation order, navigation from every other route, mobile-menu closure and menu CTA. No overflow or runtime exceptions were observed. Desktop full-page and mobile screenshots were inspected. Homepage hero/menu/gallery/reviews/contact markers remain intact.

## Shared footer redesign

The existing `Footer` in `src/App.tsx` now uses four solid-black columns with the original `src/assets/images/Logo.png`, description, social icons, quick links, contact information and operating-hours area. Styles are scoped to `.restaurant-footer` in `src/App.css`. No replacement logo, background imagery or patterns were added.

`site.socialLinks` in `src/data/site.ts` holds confirmed Facebook/Instagram/TikTok URLs when supplied. Until then those icons are labelled non-interactive pending indicators; confirmed WhatsApp is active. Email and operating hours remain honestly unconfirmed. The location links to the existing labelled venue search until an exact Maps listing is supplied.

The bottom bar contains one developer credit with the complete gold company name linking to `https://bendalotech.co.za` using `_blank` and `noopener noreferrer`. Build and lint passed. Local Chromium checks verified all six footer routes, original logo loading/source, contact links, pending social/email/hours handling, exact developer-credit text/URL/security attributes, and 4/2/1-column layouts at 320/375/390/430/768/1024/1440px. No overflow or runtime exceptions were observed. Existing main-page section markers remain intact.

## Latest hero image replacement

The hero now uses the nine currently supplied PNG images in `src/assets/images/Hero/`, via full-resolution lossless WebP copies named `public/images/hero/updated-*.webp`. Originals and older assets are preserved. The existing hero layout, header, text, buttons, gradients, image grading, zoom and responsive rules remain unchanged.

Background rotation is now every five seconds with a one-second crossfade. Only the initial scene and decoded upcoming scenes are mounted, deferring later image downloads; the next image is preloaded and decoded before activation. Reduced-motion, hidden-page and open-video pause behaviour remain. A failed next image retains the current background rather than exposing a blank frame.
## Reversible Earthy theme

Earthy is now the shared default for development **and production builds**. The previous `import.meta.env.DEV` guard forced every deployed build to Original even when the Earthy CSS was present. That guard has been removed locally; the hosted site cannot change until the fix is approved, committed, pushed and deployed.

Run `npm run dev` or build/serve with `npm run build` and `npm run preview` to see Earthy. To restore Original, set `VITE_COLOR_THEME=original` before starting Vite or building. For development, use `.env.development.local`; for Vercel, set the build-time environment variable and rebuild. Setting `VITE_COLOR_THEME=earthy` explicitly is also supported. No customer-facing switch or stored browser preference is added.

The original component stylesheets remain unchanged. `src/styles/theme.ts` centralizes selection; `src/styles/themes.css` applies component-scoped color rules only when `data-color-theme="earthy"` is present. Hero photographs/overlays, layout, typography, images, animation, map, Elfsight integration and floating socials are preserved.

Palette: Warm Cream `#F5EBDD`, Soft Ivory `#FFFCF5`, Sand Beige `#DCC7A8`, Earthy Brown `#795548`, Deep Brown `#38291F`, Muted Gold `#B89556`.
