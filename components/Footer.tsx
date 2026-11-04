"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Check,
  ExternalLink,
  FileWarning,
  Heart,
  Share2,
  Shield,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "#story", label: "Her Story" },
  { href: "#diagnosis", label: "Diagnosis" },
  { href: "#report", label: "Medical Report" },
  { href: "#donate", label: "Donate" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [shared, setShared] = useState<"idle" | "copied" | "shared">("idle");

  async function share() {
    const shareData = {
      title: siteConfig.seo.title,
      text: "Help 3-year-old Hania fight B-ALL leukemia (blood cancer). Her verified hospital reports and family donation details are here.",
      url: typeof window !== "undefined" ? window.location.href : siteConfig.siteUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared("shared");
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setShared("copied");
      window.setTimeout(() => setShared("idle"), 2500);
    } catch {
      setShared("idle");
    }
  }

  return (
    <footer className="border-t border-rose-100 bg-cream">
      <div className="container-narrow py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md shadow-rose-200/60">
                <Image
                  src={siteConfig.patient.avatar}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold text-ink">
                  Baby Hania Anam
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hope">
                  Help her fight cancer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
              This website is maintained by Hania&apos;s family. All medical
              information is shared with consent. Her home address is not
              published.
            </p>

            <nav aria-label="Footer" className="mt-5">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-gray-500 transition-colors hover:text-hope-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white p-5">
            <p className="flex items-center gap-2 font-heading text-sm font-bold text-ink">
              <Heart className="h-4 w-4 text-coral" aria-hidden="true" />
              Built with love for Hania
            </p>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              A small, static website with one purpose: to help a little girl
              get the treatment she needs, transparently.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-hope-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
              >
                {shared === "idle" ? (
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {shared === "copied"
                  ? "Link copied"
                  : shared === "shared"
                    ? "Shared"
                    : "Share"}
              </button>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
              >
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                Privacy
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
              >
                <FileWarning className="h-3.5 w-3.5" aria-hidden="true" />
                Report a problem
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rose-100 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hania&apos;s family. Built with love for
            Hania.
          </p>
          <p className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            No tracking. No payment processing. Direct to family.
          </p>
        </div>
      </div>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="font-heading text-xl font-extrabold">
            Privacy &amp; consent
          </DialogTitle>
          <DialogDescription>
            How Hania&apos;s information is handled on this website.
          </DialogDescription>
          <div className="space-y-3 text-sm leading-relaxed text-gray-600">
            <p>
              Hania&apos;s parents, Mr. &amp; Mrs. Shareef, have given permission
              to publish her medical information and photographs on this website
              to raise funds for her treatment.
            </p>
            <p>
              We publish her city and state, but not her home address. The UHID
              and IP number are partially masked in summary sections; the full
              numbers appear only on the original hospital report, which is the
              proof of her admission.
            </p>
            <p>
              The phone number is loaded in the browser and is not included in
              search-engine metadata. This site does not process payments, store
              donation details, or use advertising trackers. Donations happen
              directly in your UPI app.
            </p>
            <p>
              If you believe any information here is inaccurate, please use the
              contact section to reach the family.
            </p>
          </div>
          <a
            href={siteConfig.hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-hope underline underline-offset-2"
          >
            Verify the hospital independently
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
