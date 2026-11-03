# Help Hania Anam — Fundraising Website

A single-page, fully static fundraising website for **Baby Hania Anam**, a
three-year-old girl receiving treatment for **B-Cell Acute Lymphoblastic Leukemia
(B-ALL)** at Rainbow Children's Hospital, Banjara Hills, Hyderabad.

Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn-style Radix
primitives, lucide-react, framer-motion and qrcode.react.

## What is included

- Hero with Hania's photo, diagnosis summary and donation CTAs
- Her story and an honest treatment timeline
- Diagnosis and treatment cards sourced from the discharge summary
- Hospital/doctor verification section with masked UHID and IP number
- Full 5-page medical report gallery with zoom + PDF download
- Photo gallery (currently one consented photo)
- Donate section: client-rendered UPI QR code, preset/custom amounts, UPI ID
  copy button, copy-safe bank-transfer guidance, and an "I've donated" form that
  opens WhatsApp
- Contact section (phone number rendered in the browser only)
- FAQ, consent banner, privacy dialog, share button and footer

There is **no backend, database, API route or payment processing**. Everything
is exported to plain HTML/CSS/JS in `out/`.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build        # runs the placeholder check first, then exports to out/
npx serve out        # preview the static build
```

Deploy the `out/` directory to Vercel, Netlify, Cloudflare Pages or GitHub
Pages. No environment variables are required.

## Edit the content

Everything editable lives in [`lib/site-config.ts`](./lib/site-config.ts):

| What | Field |
| --- | --- |
| Patient, photo, city | `patient` |
| Diagnosis, dates, chemo | `diagnosis` |
| Hospital, doctors, UHID/IP | `hospital` |
| Report images and PDF | `report` |
| UPI ID, payee name, presets | `donation` |
| Family phone / WhatsApp | `contact` |
| Story paragraphs and quote | `story` |
| Gallery photos | `gallery` |
| FAQ entries | `faqs` |

The site URL used for canonical links, Open Graph and JSON-LD is
`siteConfig.siteUrl`. Change it when you attach the final domain.

### Values currently configured

- **UPI ID:** `8142099682@axl`
- **Payee name:** `SHAREEF MOHD`
- **Family contact / WhatsApp:** `+91 81420 99682`
  (this is the number linked to the supplied UPI QR; confirm it with the family)
- **Site URL:** `https://help-hania-anam.vercel.app` (update before launch)

> **Important — check the UPI handle before sharing the site.** The official QR
> image supplied by the family decodes to `8142099682@axl` (confirmed with
> three independent QR decoders), while the text printed under the screenshot
> reads `8142099682@ybl`. The site uses the value encoded in the QR itself. Have
> the family scan a test payment of ₹1 from another phone before publishing.

Bank transfer details are intentionally **not published** (`donation.bank` is
`null`). To show them, fill in the object:

```ts
bank: {
  holder: "Mohd Shareef",
  number: "XXXXXXXXXXXX",
  ifsc: "ICIC000XXXX",
  name: "ICICI Bank",
},
```

## Replace the photos and report

The site currently uses the supplied assets:

```
public/photos/hania.webp        # hero + gallery (900px wide, WebP)
public/photos/hania.jpg         # original JPG master (not loaded by the site)
public/photos/hania-avatar.jpg  # 96px header avatar
public/photos/hania-og.jpg      # 1200×630 social preview
public/docs/discharge-summary.pdf
public/docs/page-1.webp … page-5.webp
```

To swap the photo, replace `hania.webp` and `hania-avatar.jpg` with the same
file names. To swap the report, replace the PDF and the five page images. If
you only have JPG pages, keep the file names in `siteConfig.report.pageImages`
in sync. The PDF is linked directly and is not converted at build time.

## Placeholder safety check

The build is wired to `scripts/check-placeholders.mjs` via `prebuild`. It scans
the app, components, lib, scripts, public and `out/` directories for the
configured placeholder token and exits non-zero if anything is still unfilled.

```bash
npm run check:placeholders
```

All placeholder values in this build are filled, so the check passes and
`npm run build` produces a deployable `out/` folder.

## Privacy and ethics

- A dismissible consent banner appears above the header.
- UHID and IP numbers are masked in summary UI; the original report remains
  unedited (including the address printed on it).
- The family's home address is not published in any text or metadata.
- The phone number is **not** rendered in the initial HTML; the Contact section
  loads it in the browser after hydration. It is also absent from meta tags.
- No analytics are enabled. Set `analyticsEndpoint` only if you intentionally
  add Plausible/Umami.
- No payment is processed by the site. Donations happen directly in the user's
  UPI app.
- The "I've donated" form does not store anything; it opens a pre-filled
  WhatsApp message to the family.

## Removed per owner request

The fundraising progress bar, goal amount and deadline countdown are **not**
part of this build. The Donate section still shows preset/custom amounts and
the family updates supporters personally via WhatsApp.

## Verification done

- `npm run build` succeeds; `out/` contains no placeholder tokens
- TypeScript passes
- Mobile QA at 390px and desktop QA at 1280px with no console errors and no
  broken images
- QR codes scanned with `zbar` for blank, INR 1,000 and INR 2,500 amounts
- Report page dialog and PDF download verified
- Accessibility audit (axe, WCAG 2.1 AA + best practice): 0 violations
- Lighthouse (mobile, local static server): Performance 90, Accessibility 100,
  Best Practices 100, SEO 100

## Project structure

```
app/                  layout, page, global styles, icon
components/           page sections and UI primitives
lib/site-config.ts    single source of truth for all content
lib/utils.ts          class merge helper
public/               photos, report pages/PDF, icons, manifest
scripts/              placeholder check
```

## Notes

- Fonts: Inter (body) and Plus Jakarta Sans (headings) via `next/font/google`,
  with `display: optional` to keep first paint fast on slow connections.
- The site is intentionally warm and hopeful: cream/rose surfaces, teal CTAs
  and no sensational imagery.
- If you change `siteUrl`, also update the absolute Open Graph image URL.
