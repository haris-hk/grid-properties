# GRID Property Advisors — website

A single-page React site (Vite + TypeScript + Tailwind v4) with one serverless
function for inquiry emails. Built to deploy to Vercel with no configuration.

---

## Deploy to Vercel

**Option A — from the Vercel dashboard**

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, **Add New → Project** and import that repository.
3. Vercel detects Vite automatically. Leave every build setting as-is and click
   **Deploy**.

If you push the whole `GRID-Property-Advisors` folder rather than this one, set
**Root Directory** to `grid-website` in the import screen.

**Option B — from your terminal**

```bash
npm i -g vercel
cd grid-website
vercel        # preview deployment
vercel --prod # production deployment
```

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

`npm run dev` serves the site but not `/api/inquiry` — Vite has no serverless
runtime. To exercise the form end to end locally, run `vercel dev` instead.

---

## Making the inquiry forms deliver email

Every form on the site posts to `/api/inquiry`. Until you give that function an
inbox it answers `503`, and the site tells the visitor plainly that the message
was not sent rather than showing a fake confirmation.

To turn delivery on:

1. Create a free account at [resend.com](https://resend.com) and generate an API
   key.
2. In Vercel → your project → **Settings → Environment Variables**, add:

   | Name             | Value                                              | Required |
   | ---------------- | -------------------------------------------------- | -------- |
   | `RESEND_API_KEY` | Your Resend API key                                | Yes      |
   | `INQUIRY_TO`     | Where inquiries land, e.g. `sales@yourdomain.com`. Comma-separate for several. | Yes      |
   | `INQUIRY_FROM`   | A verified sender on your domain, e.g. `website@yourdomain.com` | No       |

3. Redeploy.

Without `INQUIRY_FROM`, the function sends from `onboarding@resend.dev`, which
Resend allows without domain verification but which will **only deliver to the
address that owns the Resend account**. Verify your own domain in Resend before
launch.

Prefer a different provider (SendGrid, Postmark, a CRM webhook)? Only the
`fetch` call near the bottom of `api/inquiry.ts` needs changing.

---

## Putting your real content on the site

Almost everything you need to edit lives in **`src/content/site.ts`**.

Fields left as an empty string are treated as "not supplied yet" and the site
hides that element rather than showing a broken link or a visible placeholder.
So the site looks finished at every stage of filling it in.

| What                                      | Where                             |
| ----------------------------------------- | --------------------------------- |
| Phone, WhatsApp, email, address, map, hours | `contact` object                |
| Instagram / LinkedIn / YouTube / Facebook | `socials` object                  |
| Company name, taglines, legal footer text | `company` object                  |
| Property listings and payment plans       | `properties` array                |
| Shared page imagery                       | `images` object                   |
| Brand logo files                          | `logos` object                    |

**Contact details.** Fill in `contact.phone` and `contact.whatsapp` and the site
grows a clickable phone link, a WhatsApp button on every listing, a floating
WhatsApp button, and footer contact lines — all of which stay hidden while those
fields are empty.

**Listings.** The three live listings are the Emaar Oceanfront units from the
supplied brochures: Panorama Tower 2B.5 (30th floor), Panorama Tower 4B.1 (38th
floor) and The Views Tower 2 4B.1 (30th floor). Each carries its real price,
area breakdown, developer reference and full installment schedule.

To add a listing, copy an existing entry in the `properties` array and give it a
unique `id` — that becomes its URL at `/properties/<id>`. The filter dropdowns
(type, purpose, location, developer, bedrooms, status and price band) are all
built from the array, so a new listing becomes searchable with no other changes.

Two fields deserve care:

- `priceValue` is the plain number in PKR. It drives both the displayed price
  (shown as crore, with the exact figure beneath) and the price-band filter. If
  your new listings fall outside the current bands, edit `priceBands` lower down
  the file.
- `paymentPlan` is optional. Supply it and the detail page renders the full
  installment table with a checked total; omit it and the page says a schedule
  is available on request.

`purpose` is currently set to `Investment` on all three units, since they are
being marketed as chance deals with a payment plan running to handover. Change
it per listing to `Buy` or `Rent` if that reads better for a given unit.

**Photography.** Every image on the site is served from `public/`, extracted
from the developer brochures — project renders, the Oceanfront aerial and the
three floor plans. Nothing is hotlinked from a third party, so the site has no
external image dependency. Add new images to `public/listings/` and reference
them as `/listings/your-file.jpg`. Any image path containing `floorplan` is
rendered contained on white rather than cropped to fill, so drop new floor plans
in with that word in the filename.

**Logo.** `public/logo*.png` were generated from your logo file. The dark
version is used on light backgrounds and the cream version on the dark green
header and footer; `icon-512.png` and `apple-touch-icon.png` are the browser and
phone icons.

---

## Project layout

```
api/inquiry.ts            Serverless function: validates and emails inquiries
src/content/site.ts       ← all business content, listings and payment plans
src/App.tsx               Routes, page titles/meta, scroll handling
src/components/
  layout.tsx              Header, footer, shell, shared link styles
  inquiry-form.tsx        The form used on every page, and its field sets
  error-boundary.tsx      Catches render errors without blanking the page
src/pages/                One file per route
src/lib/use-favorites.ts  Saved properties, persisted to the browser
public/listings/          Project renders and floor plans
public/logo*.png          Brand marks, light and dark variants
src/index.css             Design tokens, typography, motion
vercel.json               SPA routing + asset caching
```

---

## Notes on how this differs from the original build

- The old Vite config threw unless `PORT` and `BASE_PATH` were set, and pulled
  in Replit-only plugins and pnpm workspace `catalog:` versions. All removed —
  the project now installs and builds anywhere with plain `npm install`.
- Forms previously ran a 550ms timer and showed a success panel that admitted no
  message had been sent. They now post to a real endpoint.
- Navigating between pages kept your old scroll position, so opening a listing
  from halfway down the Properties page dropped you halfway down the detail
  page. Fixed, with in-page `#anchor` links still working.
- Saved properties were kept in component state and lost on every reload,
  despite the page promising they would be there. They now persist in the
  browser and sync across tabs.
- An unknown property URL silently rendered the *first* listing instead. It now
  shows a proper not-found page.
- The financing form asked for CNIC. Identity documents should not be collected
  through a website form and emailed onward, so that field is gone and the page
  says an advisor will explain how to share documents securely.
- Unused dependencies (react-query, ~25 Radix packages, recharts, embla,
  react-hook-form and the rest of the unused shadcn set) were dropped. The
  production bundle is ~274 kB, 83 kB gzipped.

## Known limitation: link previews

Page titles and descriptions update per route in the browser, but this is a
single-page app: a social or WhatsApp link preview scraper does not run
JavaScript, so every URL previews with the homepage title and the default
share image. If per-listing link previews matter for how GRID shares
properties, that needs prerendering or server rendering, which is a change of
approach rather than a setting. Worth raising before a big share campaign.

## Before you launch

- [ ] Real contact details in `src/content/site.ts`
- [ ] Listings reviewed against the developer's current price list before launch
- [ ] `RESEND_API_KEY` and `INQUIRY_TO` set in Vercel, with a test submission received
- [ ] Approved legal/disclaimer wording in `company.legalNote`
- [ ] Social profile URLs, or leave them blank to keep the icons hidden
- [ ] Custom domain attached in Vercel
