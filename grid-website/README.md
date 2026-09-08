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
| Property listings                         | `properties` array                |
| Photography                               | `images` object                   |

**Contact details.** Fill in `contact.phone` and `contact.whatsapp` and the site
grows a clickable phone link, a WhatsApp button on every listing, a floating
WhatsApp button, and footer contact lines — all of which stay hidden while those
fields are empty.

**Listings.** The three entries currently in `properties` are samples, there to
show that search, filtering and detail pages work. Replace them with real
listings and set `SHOW_SAMPLE_NOTICE` to `false` to remove the banner on the
Properties page. The filter dropdowns (type, purpose, location, developer,
bedrooms, status) build themselves from whatever is in the array, so new
listings become searchable with no other changes. `priceValue` is the plain
number in PKR used for the price-band filter; `price` is the text shown to
visitors.

**Photography.** The site currently uses hotlinked Pexels stock images. Replace
`images` with GRID's own photography before launch — put files in `public/` and
reference them as `/your-photo.jpg`, or use an image CDN. Hotlinking a third
party in production is fragile.

---

## Project layout

```
api/inquiry.ts            Serverless function: validates and emails inquiries
src/content/site.ts       ← all business content and listings
src/App.tsx               Routes, page titles/meta, scroll handling
src/components/
  layout.tsx              Header, footer, shell, shared link styles
  inquiry-form.tsx        The form used on every page, and its field sets
  error-boundary.tsx      Catches render errors without blanking the page
src/pages/                One file per route
src/lib/use-favorites.ts  Saved properties, persisted to the browser
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
  production bundle is ~270 kB, 82 kB gzipped.

## Before you launch

- [ ] Real contact details in `src/content/site.ts`
- [ ] Real listings, and `SHOW_SAMPLE_NOTICE = false`
- [ ] `RESEND_API_KEY` and `INQUIRY_TO` set in Vercel, with a test submission received
- [ ] GRID's own photography replacing the stock images
- [ ] Approved legal/disclaimer wording in `company.legalNote`
- [ ] Social profile URLs, or leave them blank to keep the icons hidden
- [ ] Custom domain attached in Vercel
