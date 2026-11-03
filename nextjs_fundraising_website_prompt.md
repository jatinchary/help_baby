# Prompt: Build a Static Next.js Fundraising Website for Baby Hania Anam

> Copy everything below this line and paste it to your coding agent (e.g. Cursor, Claude Code, Copilot, v0, etc.).

---

## 1. Project Overview

Build a **static, single-page fundraising website** using **Next.js (App Router, `output: 'export'`)** to help raise funds for a 2-year-old girl, **Baby Hania Anam**, who has been diagnosed with **B-Cell Acute Lymphoblastic Leukemia (B-ALL)**. The site's purpose is to transparently share her medical diagnosis, show her picture, build trust through the real hospital report, and make it frictionless for visitors to donate via UPI QR code and contact the family by phone.

The site MUST be **fully static** (no server, no database). It will be deployed to Vercel / Netlify / GitHub Pages.

## 2. Tech Stack (use exactly these)

- **Next.js 14+ (App Router)** with `output: 'export'` in `next.config.mjs`
- **TypeScript**
- **Tailwind CSS v3** for styling
- **shadcn/ui** for accessible primitives (Button, Card, Dialog, Sheet, Tabs)
- **lucide-react** for icons
- **next-optimized-images** OR plain `<Image>` from `next/image` (unoptimized for static export)
- **qrcode.react** (`qrcode.react` npm package) to render a UPI QR code **client-side**
- **react-pdf** OR `next/image` for displaying the report PDF pages as images
- **framer-motion** for subtle, tasteful animations (fade-in on scroll only — no autoplay carousels)
- Font: **Inter** (body) + **Plus Jakarta Sans** or **Poppins** (headings) via `next/font/google`

## 3. Known Facts About the Patient (use these verbatim — they come from the real discharge summary)

| Field | Value |
|---|---|
| Patient name | Baby Hania Anam |
| Age | 2 years 11 months |
| Gender | Female |
| Father / Guardian | Mr. Mohd Shareef |
| City | Hyderabad, Telangana, India |
| Hospital | Rainbow Children's Hospital, Banjara Hills, Hyderabad |
| Hospital tagline | "It takes a lot to treat the little." |
| UHID | BAH-00662657 |
| IP No | IP5-00178621 |
| Date of admission | 30-08-2026 |
| Date of discharge | 31-08-2026 |
| Weight on admission | 14.5 kg |
| Diagnosis | **B-Cell Acute Lymphoblastic Leukemia (B-ALL)** — CALLA-positive, CNS-negative, FISH negative / standard cytogenetics, good prednisolone response, Induction Week 4 |
| Treating doctor | **Dr. Sirisha Rani** — MD Peds (PGIMER), DNB, MRCPCH (UK), Fellow Ped Hemato-Oncology & BMT (UK), Senior Consultant Haemato-Oncologist / BMT, License No. 40525 |
| Co-consultants | Dr. Sandhya V. (MD Pediatrics, FNB PHO), Dr. Nalla Anuraag Reddy (MD Pediatrics, FIAP PHO) |
| Chemotherapy given this admission | Inj. Daunorubicin 12 mg (Week 4), Inj. Vincristine 0.8 mg (Week 4), Triple Intrathecal (Methotrexate 10 mg + Cytarabine 10 mg + Hydrocortisone 25 mg) on 31-08-2026 |
| Procedures done | Bone Marrow Aspiration (sample sent for MRD — report awaited), Lumbar Puncture |
| Condition at discharge | Active, afebrile, hemodynamically stable |
| Next review | 05-09-2026 with Dr. Sirisha Rani at Banjara Hills OPD |
| Hospital emergency phone | 040-44665555 / 040-23551555 / +91-9100925516 |
| Hospital toll-free | 1800 2122 |
| Hospital website | www.rainbowhospitals.in |

## 4. Things the Site Owner Will Fill In (leave clean, clearly-marked placeholders)

Use this exact placeholder convention so the owner can find-and-replace:

```
__FILL: family_contact_phone__        e.g. +91-XXXXXXXXXX
__FILL: upi_id__                        e.g. mohdshareef@okhdfcbank
__FILL: upi_payee_name__               e.g. Mohd Shareef
__FILL: fundraising_goal_inr__          e.g. 1500000  (15 lakh)
__FILL: amount_raised_so_far_inr__      e.g. 320000
__FILL: campaign_deadline__             e.g. 2027-02-28
__FILL: bank_account_holder__
__FILL: bank_account_number__
__FILL: bank_ifsc__
__FILL: bank_name__
__FILL: family_story_paragraph_1__      (2-3 sentences — how Hania was diagnosed, the day the family found out)
__FILL: family_story_paragraph_2__      (2-3 sentences — current treatment stage, what the funds will pay for)
__FILL: family_story_paragraph_3__      (2-3 sentences — message of hope / gratitude)
__FILL: hania_photo_path__              (path to her photo, place in /public/photos/hania.jpg)
__FILL: family_photo_path__             (optional — family photo for trust)
__FILL: report_pdf_path__               (path to the scanned discharge summary, /public/docs/discharge-summary.pdf)
__FILL: report_page_images__            (array of 5 page images in /public/docs/page-1.jpg … page-5.jpg)
```

Render the placeholders as actual visible content in dev (so the owner sees what to replace), but **do not ship with `__FILL:` visible in production** — fail the build if any placeholder is still present. Add a simple pre-build check script (`scripts/check-placeholders.mjs`) that greps for `__FILL:` and exits non-zero if found.

## 5. Page Structure (single page, anchor-scrolled)

The site is ONE page (`app/page.tsx`) with sticky nav. Sections, in order:

1. **Sticky Header** — Hania's name + small avatar, nav links (Story, Diagnosis, Report, Donate, Contact), a primary "Donate Now" button that scrolls to `#donate`.
2. **Hero** — Full-width, soft gradient background (warm cream `#FFF8F3` → soft pink `#FFE9E0`). Left: Hania's photo in a rounded card with a soft shadow. Right: H1 "Help Hania Fight Cancer", sub-headline with her age + diagnosis, a one-line emotional hook, two CTAs: "Donate Now" (primary, scrolls to donate) and "View Medical Report" (ghost, scrolls to report). Below: small trust badges — "Verified Hospital Report", "Direct to Family", "100% Transparent".
3. **Progress Bar** — A horizontal bar showing `amount_raised / goal` with the INR figures on both ends and the % in the middle. Use a hopeful green `#22C55E` fill. Include a countdown to `campaign_deadline`.
4. **Hania's Story** — 3 paragraphs (the `__FILL: family_story_paragraph_N__` values). Add a pull-quote in a colored card: a short, hopeful sentence in larger type.
5. **Diagnosis & Treatment** — A clean card grid (3 cards):
   - **Diagnosis**: B-Cell Acute Lymphoblastic Leukemia (B-ALL), CALLA-positive, CNS-negative.
   - **Current Stage**: Induction Week 4, good prednisolone response.
   - **Treatment Plan**: Chemotherapy (Daunorubicin, Vincristine, Intrathecal triple therapy), Bone Marrow Aspiration done, next review 05-09-2026.
   Below the cards, a "Treatment Timeline" section (vertical timeline component) showing: Diagnosis → Induction Chemo (current) → Consolidation → Maintenance → Follow-up. Mark "current" with a pulsing dot.
6. **Hospital & Doctors (Trust Section)** — Card with Rainbow Children's Hospital logo placeholder, hospital name + tagline, address (Banjara Hills, Hyderabad), treating doctor Dr. Sirisha Rani with her full qualifications, and a "Verify on hospital website" link to www.rainbowhospitals.in.
7. **Medical Report (Transparency Section)** — This is the centerpiece of trust. Two viewing modes via Tabs:
   - **"View Pages"** — A gallery of the 5 report page images (`/public/docs/page-1.jpg` … `page-5.jpg`). Click any image to open a full-screen Dialog with zoom.
   - **"Download PDF"** — A button to download the original `/public/docs/discharge-summary.pdf`.
   Add a small disclaimer above: "This is the authentic, unedited discharge summary from Rainbow Children's Hospital. Shared with the family's consent."
8. **Photo Gallery** — 3-6 photos of Hania (happy moments, with family, in hospital). Use a masonry/grid layout with hover-zoom.
9. **Donate Section** — The most important section. Contains:
   - Large QR code (rendered client-side via `qrcode.react`) encoding a UPI deep link: `upi://pay?pa=__FILL:upi_id__&pn=__FILL:upi_payee_name__&am=&cu=INR&tn=Hania%20Cancer%20Fund` (leave amount blank so donor chooses, OR offer preset amount buttons ₹500 / ₹1,000 / ₹2,000 / ₹5,000 / Custom).
   - When a preset is clicked, update the QR to include `&am=<amount>`.
   - Below QR: payee name, UPI ID (with copy button), and a note "Scan with any UPI app — Google Pay, PhonePe, Paytm, BHIM".
   - Alternative bank-transfer details in a collapsible `<details>`: Account holder, Account number, IFSC, Bank name — each with a copy-to-clipboard button.
   - After donating, a "I've Donated" button that opens a small form (name + amount + message) — submissions POST to a Google Form or Formspree endpoint (`__FILL: donation_form_endpoint__`) so the family can update the progress bar.
10. **Contact** — Phone number (`__FILL: family_contact_phone__`) as a large clickable `tel:` link with a phone icon, plus WhatsApp link (`https://wa.me/<number>`), plus email if provided. Below: hospital contact info (Rainbow emergency numbers) for verification.
11. **FAQ** — 5-6 questions: "Is this real?", "Where does my money go?", "Can I donate from outside India?", "How will I know my donation was received?", "Can I visit Hania?", "How is the report verified?".
12. **Footer** — Hania's name, "Built with love for Hania", year, links: Privacy, Report a Problem, Share (Web Share API button). Small line: "This website is maintained by Hania's family. All medical information is shared with consent."

## 6. Design Direction

- **Tone**: Hopeful, warm, dignified, trustworthy. NOT pitying, NOT desperate, NOT flashy.
- **Color palette**:
  - Background: warm cream `#FFF8F3`
  - Surface: white `#FFFFFF`
  - Primary (CTA / progress): hopeful teal-green `#0D9488` (Tailwind teal-600)
  - Accent (warmth): soft coral `#FB7185` (Tailwind rose-400)
  - Text: `#1F2937` (gray-800), muted `#6B7280` (gray-500)
  - Success / progress fill: `#22C55E`
- **Typography**: Headings in Plus Jakarta Sans (700/800), body in Inter (400/500). Generous line-height (1.7) for readability.
- **Spacing**: Lots of whitespace. Sections have `py-20 md:py-28`. Container `max-w-6xl mx-auto px-4`.
- **Imagery**: Rounded corners (`rounded-2xl`), soft shadows (`shadow-lg shadow-rose-100/50`), subtle 1px borders (`border border-rose-100`).
- **Animations**: Fade-up on scroll using framer-motion's `whileInView`. Respect `prefers-reduced-motion`.
- **Mobile-first**: Must look perfect on a 360px phone. Test at 360 / 390 / 768 / 1024 / 1280.
- **Accessibility**: WCAG AA. All images have descriptive alt text. QR code has a text fallback (UPI ID + phone) right next to it. Color contrast ≥ 4.5:1. Buttons have focus rings.

## 7. Technical Requirements

### 7.1 `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

### 7.2 Folder structure
```
app/
  layout.tsx          # root layout, fonts, metadata
  page.tsx            # the single-page site
  globals.css         # Tailwind + design tokens
components/
  Header.tsx
  Hero.tsx
  ProgressBar.tsx
  Story.tsx
  Diagnosis.tsx
  TreatmentTimeline.tsx
  HospitalTrust.tsx
  MedicalReport.tsx   # Tabs: page images + PDF download
  PhotoGallery.tsx
  Donate.tsx          # QR + presets + bank details
  Contact.tsx
  FAQ.tsx
  Footer.tsx
  ui/                 # shadcn primitives
lib/
  site-config.ts      # ALL the __FILL__ values live here as a typed object
  placeholder-check.ts
public/
  photos/             # Hania's photos
  docs/               # report PDF + 5 page images
  hospital/           # hospital logo
scripts/
  check-placeholders.mjs
```

### 7.3 `lib/site-config.ts` — single source of truth
```ts
export const siteConfig = {
  patient: {
    name: "Baby Hania Anam",
    age: "2 years 11 months",
    gender: "Female",
    guardian: "Mr. Mohd Shareef",
    city: "Hyderabad, Telangana, India",
    photo: "/photos/hania.jpg",
  },
  diagnosis: {
    primary: "B-Cell Acute Lymphoblastic Leukemia (B-ALL)",
    details: "CALLA-positive, CNS-negative, FISH negative / standard cytogenetics, good prednisolone response",
    stage: "Induction Week 4",
    nextReview: "05 September 2026",
    chemotherapy: [
      { drug: "Inj. Daunorubicin", dose: "12 mg", week: "Week 4", date: "30-08-2026" },
      { drug: "Inj. Vincristine", dose: "0.8 mg", week: "Week 4", date: "30-08-2026" },
      { drug: "Triple Intrathecal (Methotrexate + Cytarabine + Hydrocortisone)", dose: "10 / 10 / 25 mg", week: "Week 3", date: "31-08-2026" },
    ],
  },
  hospital: {
    name: "Rainbow Children's Hospital",
    branch: "Banjara Hills, Hyderabad",
    tagline: "It takes a lot to treat the little.",
    website: "https://www.rainbowhospitals.in",
    emergencyPhones: ["040-44665555", "040-23551555", "+91-9100925516"],
    tollFree: "1800 2122",
    uhid: "BAH-00662657",
    ipNo: "IP5-00178621",
    primaryDoctor: {
      name: "Dr. Sirisha Rani",
      qualifications: "MD Peds (PGIMER), DNB, MRCPCH (UK), Fellow Ped Hemato-Oncology & BMT (UK)",
      role: "Senior Consultant Haemato-Oncologist / BMT",
      licenseNo: "40525",
    },
  },
  report: {
    pdfPath: "/docs/discharge-summary.pdf",
    pageImages: ["/docs/page-1.jpg","/docs/page-2.jpg","/docs/page-3.jpg","/docs/page-4.jpg","/docs/page-5.jpg"],
  },
  donation: {
    upiId: "__FILL: upi_id__",
    payeeName: "__FILL: upi_payee_name__",
    goalInr: 0, // __FILL: fundraising_goal_inr__
    raisedInr: 0, // __FILL: amount_raised_so_far_inr__
    deadline: "", // __FILL: campaign_deadline__  ISO date
    bank: {
      holder: "__FILL: bank_account_holder__",
      number: "__FILL: bank_account_number__",
      ifsc: "__FILL: bank_ifsc__",
      name: "__FILL: bank_name__",
    },
    formEndpoint: "__FILL: donation_form_endpoint__",
    presets: [500, 1000, 2000, 5000],
  },
  contact: {
    phone: "__FILL: family_contact_phone__",
    whatsapp: "__FILL: family_contact_phone__",
  },
  story: [
    "__FILL: family_story_paragraph_1__",
    "__FILL: family_story_paragraph_2__",
    "__FILL: family_story_paragraph_3__",
  ],
} as const;
```

### 7.4 QR code generation (in `Donate.tsx`)
```tsx
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

function buildUpiUri(amount?: number) {
  const base = `upi://pay?pa=${encodeURIComponent(siteConfig.donation.upiId)}&pn=${encodeURIComponent(siteConfig.donation.payeeName)}&tn=${encodeURIComponent("Hania Cancer Fund")}&cu=INR`;
  return amount ? `${base}&am=${amount}` : base;
}

// Usage:
<QRCodeSVG value={buildUpiUri(selectedAmount)} size={256} level="M" includeMargin bgColor="#FFFFFF" fgColor="#1F2937" />
```

### 7.5 SEO + Social (in `app/layout.tsx`)
- `<title>Help Hania Anam Fight Leukemia | Support Her Treatment</title>`
- Meta description (≤160 chars) with diagnosis + hospital + donate CTA.
- Open Graph image: `/photos/hania-og.jpg` (1200×630).
- Twitter card: `summary_large_image`.
- `robots: 'index, follow'`.
- JSON-LD `MedicalCondition` + `Person` schema with the diagnosis, hospital, and doctor.
- Canonical URL `__FILL: site_url__`.
- Add a `site.webmanifest` and theme-color `#0D9488`.

### 7.6 Performance
- All photos compressed with `next/image` `unoptimized` + manual `sharp` pre-processing in a `scripts/optimize-images.mjs`.
- Lazy-load images below the fold (`loading="lazy"`).
- Inline critical CSS, defer non-critical JS.
- Target Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.

### 7.7 Analytics (optional, static-friendly)
- Plausible or Umami via a single `<script>` tag. Endpoint: `__FILL: analytics_endpoint__` (leave empty to disable).

## 8. Privacy & Ethics (IMPORTANT — implement these)

- Add a prominent, dismissible banner at the very top: **"This website shares Hania's medical information with the full consent of her parents, Mr. & Mrs. Shareef, to raise funds for her cancer treatment."**
- Mask the UHID and IP No. partially in the public view (e.g. `BAH-00****57`) but show them in full in the downloadable report — the report is the proof; the masked version is for the quick-glance public view.
- Do NOT publish the family's home address (only city + state).
- Do NOT publish the phone number in plain meta tags (to avoid scraping) — render it via JS only.
- Add a "Report this page" link in the footer pointing to a form where someone can flag if the information is inaccurate.

## 9. Build & Deploy

- `npm run build` produces `out/` directory.
- Deploy `out/` to Vercel (static), Netlify, Cloudflare Pages, or GitHub Pages.
- Add a `README.md` with: how to fill the `__FILL__` placeholders, how to replace photos, how to run `npm run check:placeholders`, and how to deploy.

## 10. Acceptance Checklist (the agent must verify all before finishing)

- [ ] `npm run build` succeeds and produces `out/` with no `__FILL:` strings remaining.
- [ ] `npm run check:placeholders` passes.
- [ ] Lighthouse score ≥ 90 on all four axes for mobile.
- [ ] QR code scans correctly in Google Pay, PhonePe, and Paytm (test all three).
- [ ] Phone number `tel:` link works on iOS and Android.
- [ ] WhatsApp link opens a pre-filled chat.
- [ ] All 5 report page images render and the PDF downloads.
- [ ] Progress bar and countdown render correctly.
- [ ] Mobile layout perfect at 360px width.
- [ ] No console errors.
- [ ] OG preview looks correct when shared on WhatsApp.
- [ ] Reduced-motion users see no animation.
- [ ] All images have alt text.

## 11. Deliverable

A complete, runnable Next.js project in a single directory, ready to `npm install && npm run build && npx serve out`. Include the README with setup instructions. Do NOT include the actual photos or the report PDF in the repo — leave clear instructions in the README for where the owner must place `public/photos/hania.jpg`, `public/docs/discharge-summary.pdf`, and `public/docs/page-1.jpg … page-5.jpg`.

---

**End of prompt.** Build exactly this. If any `__FILL__` value is still a placeholder when the owner runs `npm run build`, fail the build with a clear error listing every unfilled placeholder.
