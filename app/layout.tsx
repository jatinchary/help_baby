import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import "@/app/globals.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
});

const description =
  "3-year-old Hania has B-ALL leukemia, a type of blood cancer. See her verified Rainbow Children's Hospital reports and donate directly to her family via UPI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.seo.title,
  description,
  keywords: [
    "Hania Anam",
    "Baby Hania",
    "B-ALL leukemia",
    "blood cancer",
    "fundraising Hyderabad",
    "Rainbow Children's Hospital",
    "donate UPI",
    "childhood cancer India",
  ],
  authors: [{ name: "Hania's family" }],
  creator: "Hania's family",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: "Help Hania Anam",
    title: siteConfig.seo.title,
    description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Help Hania Anam fight blood cancer — a three-year-old girl from Hyderabad with B-ALL leukemia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description,
    images: [siteConfig.seo.ogImage],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  category: "nonprofit",
};

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/#hania`,
      name: siteConfig.patient.name,
      gender: "Female",
      description: `${siteConfig.patient.age} old girl from ${siteConfig.patient.city}, diagnosed with B-Cell Acute Lymphoblastic Leukemia, a type of blood cancer.`,
      image: `${siteConfig.siteUrl}${siteConfig.patient.photo}`,
    },
    {
      "@type": "MedicalCondition",
      "@id": `${siteConfig.siteUrl}/#condition`,
      name: "B-Cell Acute Lymphoblastic Leukemia (blood cancer)",
      alternateName: ["B-ALL", "ALL", "Blood cancer"],
      associatedAnatomy: {
        "@type": "AnatomicalStructure",
        name: "Bone marrow and blood",
      },
      signOrSymptom: {
        "@type": "MedicalSignOrSymptom",
        name: "Leukemia (blood cancer) affecting B-cell lymphocytes",
      },
    },
    {
      "@type": "Hospital",
      "@id": `${siteConfig.siteUrl}/#hospital`,
      name: siteConfig.hospital.name,
      url: siteConfig.hospital.website,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      telephone: siteConfig.hospital.emergencyPhones,
    },
    {
      "@type": "Physician",
      "@id": `${siteConfig.siteUrl}/#doctor`,
      name: siteConfig.hospital.primaryDoctor.name,
      medicalSpecialty: "Pediatric Hematology-Oncology",
      worksFor: {
        "@type": "Hospital",
        name: siteConfig.hospital.name,
      },
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${siteConfig.siteUrl}/#page`,
      url: siteConfig.siteUrl,
      name: siteConfig.seo.title,
      description,
      about: { "@id": `${siteConfig.siteUrl}/#condition` },
      mainEntity: { "@id": `${siteConfig.siteUrl}/#hania` },
      significantLink: `${siteConfig.siteUrl}#donate`,
      lastReviewed: "2026-11-04",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-hope px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ConsentBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <noscript>
          <div className="border-t border-rose-100 bg-white px-4 py-6 text-center text-sm text-gray-600">
            <p>
              JavaScript is needed for the UPI QR code, countdown and contact
              details. You can still read the{" "}
              <a
                href={siteConfig.report.documents[0].pdfPath}
                className="font-semibold text-hope underline"
              >
                latest hospital report
              </a>{" "}
              and the{" "}
              <a
                href={siteConfig.report.documents[1].pdfPath}
                className="font-semibold text-hope underline"
              >
                initial hospital report
              </a>{" "}
              (PDF), and donate using the UPI ID shown in the site source.
            </p>
          </div>
        </noscript>
        <Script
          id="hania-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {siteConfig.analyticsEndpoint ? (
          <Script
            defer
            data-domain={new URL(siteConfig.siteUrl).hostname}
            src={siteConfig.analyticsEndpoint}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
