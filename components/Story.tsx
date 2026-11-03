import { Heart, Hospital, Quote, Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export function Story() {
  return (
    <section id="story" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            Hania&apos;s story
          </p>
          <h2 className="section-title">A three-year-old with a long fight ahead</h2>
          <p className="section-lede">
            Behind every medical report is a little girl who loves to play, and a
            family doing everything they can to bring her home healthy.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <Reveal className="prose-soft">
            {siteConfig.story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-rose-100 bg-white p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Age
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-ink">
                  {siteConfig.patient.age}
                </p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Diagnosis
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-ink">
                  B-ALL leukemia
                </p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white p-4">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                  Hospital
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-ink">
                  Rainbow, Banjara Hills
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:pt-2">
            <figure className="relative overflow-hidden rounded-3xl bg-hope p-6 text-white shadow-xl shadow-teal-900/15 sm:p-8">
              <Quote
                className="absolute -right-4 -top-4 h-28 w-28 text-white/10"
                aria-hidden="true"
              />
              <Sparkles className="h-7 w-7 text-teal-200" aria-hidden="true" />
              <blockquote className="mt-5 font-heading text-xl font-bold leading-snug sm:text-2xl">
                &ldquo;{siteConfig.story.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-2 border-t border-white/20 pt-5 text-sm text-teal-50">
                <Heart className="h-4 w-4" aria-hidden="true" />
                With love, Hania&apos;s family
              </figcaption>
            </figure>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-100 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-coral">
                <Hospital className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-xs leading-relaxed text-gray-500">
                Hania is being treated by{" "}
                <strong className="font-semibold text-gray-700">
                  {siteConfig.hospital.primaryDoctor.name}
                </strong>{" "}
                at {siteConfig.hospital.name}, {siteConfig.hospital.branch}.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
