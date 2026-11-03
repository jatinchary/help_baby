"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Building2,
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { contact, hospital } = siteConfig;

  return (
    <section id="contact" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Contact
          </p>
          <h2 className="section-title">Talk to Hania&apos;s family</h2>
          <p className="section-lede">
            Have a question, want to visit, or need help completing a donation?
            The family is happy to hear from you. If a call is missed, a WhatsApp
            message is the quickest way to reach them.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-card">
              <div className="border-b border-rose-100 bg-gradient-to-br from-teal-50 to-white p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hope text-white shadow-lg shadow-teal-200">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-extrabold text-ink">
                  Mr. Mohd Shareef
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Hania&apos;s father · {siteConfig.patient.city}
                </p>

                {mounted ? (
                  <div className="mt-5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="group flex items-center gap-3 rounded-2xl border border-teal-100 bg-white p-4 transition-colors hover:border-hope hover:bg-teal-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-hope transition-colors group-hover:bg-white">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                          Call the family
                        </span>
                        <span className="block truncate font-heading text-xl font-extrabold text-ink sm:text-2xl">
                          {contact.displayPhone}
                        </span>
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-teal-100 bg-white p-4">
                    <p className="text-sm text-gray-500">
                      Loading contact details…
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                {mounted ? (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a
                      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                        contact.whatsappMessage,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#075E54] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-200/60 transition-colors hover:bg-[#054C44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Message on WhatsApp
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-hope-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call now
                    </a>
                  </div>
                ) : (
                  <div className="h-[3.25rem] rounded-full bg-rose-50" aria-hidden="true" />
                )}

                {contact.email ? (
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Email:{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold text-hope underline underline-offset-2"
                    >
                      {contact.email}
                    </a>
                  </p>
                ) : null}

                <p className="mt-4 rounded-xl bg-cream p-3 text-[0.72rem] leading-relaxed text-gray-500">
                  Please do not send money to anyone who contacts you claiming to
                  be collecting on Hania&apos;s behalf. Only use the UPI ID and QR
                  code on this page, or call the number above to confirm.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-3xl border border-rose-100 bg-white p-6 shadow-card sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-coral">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-extrabold text-ink">
                {hospital.name}
              </h3>
              <p className="text-sm text-gray-500">{hospital.branch}</p>

              <div className="mt-4 space-y-2">
                {hospital.emergencyPhones.map((number) => (
                  <a
                    key={number}
                    href={`tel:${number.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 rounded-xl border border-rose-100 bg-cream/60 px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-200 hover:bg-teal-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                  >
                    <Phone className="h-3.5 w-3.5 text-hope" aria-hidden="true" />
                    {number}
                  </a>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-2 text-[0.72rem] leading-relaxed text-gray-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-hope" aria-hidden="true" />
                Call the hospital switchboard and quote the UHID or IP number
                printed on the discharge summary to verify Hania&apos;s admission.
              </p>

              <div className="mt-auto pt-5">
                <div className="flex items-start gap-2 rounded-xl bg-rose-50 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                  <p className="text-[0.7rem] leading-relaxed text-gray-600">
                    For medical emergencies, always contact the hospital
                    directly. For donation questions, contact the family.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
