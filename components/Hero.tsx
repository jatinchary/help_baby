import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const trustBadges = [
  {
    icon: ShieldCheck,
    label: "Verified Hospital Report",
    detail: "Original discharge summary",
  },
  {
    icon: HeartHandshake,
    label: "Direct to Family",
    detail: "No middlemen, no fees",
  },
  {
    icon: FileCheck2,
    label: "100% Transparent",
    detail: "UHID & IP number visible",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl"
      />

      <div className="container-narrow relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-24">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-[22rem] sm:max-w-[24rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-white/70 shadow-soft"
            />
            <figure className="relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-rose-50 shadow-2xl shadow-rose-200/60">
              <div className="relative aspect-[4/5]">
                <Image
                  src={siteConfig.patient.photo}
                  alt={siteConfig.patient.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/75 via-gray-950/25 to-transparent p-4 pt-12 text-white">
                <p className="font-heading text-base font-bold leading-tight">
                  {siteConfig.patient.name}
                </p>
                <p className="text-xs text-white/85">
                  {siteConfig.patient.age} · {siteConfig.patient.city.split(",")[0]}
                </p>
              </figcaption>
            </figure>

            <div className="absolute -right-3 top-5 flex items-center gap-1.5 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-[0.7rem] font-bold text-hope-dark shadow-lg shadow-teal-900/10 sm:-right-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hope" />
              </span>
              Treatment in progress
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div>
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              A little girl needs your help
            </p>
            <h1 className="font-heading text-[2.55rem] font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-[4.1rem]">
              Help Hania
              <span className="block text-hope">Fight Cancer</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Hania is {siteConfig.patient.age} old. She has been diagnosed with{" "}
              <strong className="font-semibold text-ink">
                B-Cell Acute Lymphoblastic Leukemia (B-ALL)
              </strong>{" "}
              and is in the middle of chemotherapy at Rainbow Children&apos;s
              Hospital, Hyderabad.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Her family is fighting for her life — and they need your help to
              keep her treatment going.
            </p>
          </div>

          <div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#donate">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  Donate Now
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href="#report">
                  View Medical Report
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustBadges.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-start gap-2.5 rounded-2xl border border-rose-100 bg-white/70 p-3 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-hope">
                    <badge.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold leading-tight text-ink">
                      {badge.label}
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] leading-snug text-gray-500">
                      {badge.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mt-5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <BadgeCheck className="h-4 w-4 text-hope" aria-hidden="true" />
              UHID {siteConfig.hospital.uhidMasked} · IP{" "}
              {siteConfig.hospital.ipNoMasked} · Rainbow Children&apos;s Hospital
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
