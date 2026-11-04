import {
  Activity,
  ClipboardList,
  Stethoscope,
  Syringe,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { TreatmentTimeline } from "@/components/TreatmentTimeline";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

const cards = [
  {
    icon: Stethoscope,
    eyebrow: "Diagnosis",
    title: "B-Cell Acute Lymphoblastic Leukemia",
    body: "A type of blood cancer. B-ALL is CALLA-positive and CNS-negative, with FISH negative / standard cytogenetics.",
    points: [
      "CALLA-positive",
      "CNS-negative",
      "FISH negative / standard cytogenetics",
    ],
  },
  {
    icon: Activity,
    eyebrow: "Current stage",
    title: "Induction Week 4",
    body: "A good prednisolone response has been noted. Hania was admitted for chemotherapy and discharged in a stable condition.",
    points: [
      "Good prednisolone response",
      "Admitted 30 August 2026",
  
    ],
  },
  {
    icon: Syringe,
    eyebrow: "Treatment plan",
    title: "Chemotherapy & close monitoring",
    body: "Daunorubicin and Vincristine given in Week 4, plus triple intrathecal chemotherapy. Bone marrow aspiration was sent for MRD.",
    points: [
      "Inj. Daunorubicin 12 mg",
      "Inj. Vincristine 0.8 mg",
      "Triple intrathecal chemotherapy",
    ],
  },
];

export function Diagnosis() {
  return (
    <section
      id="diagnosis"
      className="section border-y border-rose-100 bg-white"
    >
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
            Diagnosis &amp; treatment
          </p>
          <h2 className="section-title">What Hania is facing</h2>
          <p className="section-lede">
            Everything below is taken directly from her initial discharge
            summary. Both hospital reports are available to read further down
            the page.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.eyebrow} delay={index * 0.08}>
              <Card className="h-full border-rose-100/80 transition-shadow hover:shadow-soft">
                <CardHeader className="pb-3">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-hope">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rose-700">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-heading text-lg font-extrabold leading-snug text-ink">
                    {card.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {card.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm font-medium text-gray-700"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hope"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="grid gap-3 rounded-2xl border border-rose-100 bg-cream/70 p-4 text-sm sm:grid-cols-3 sm:p-5">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                Weight on admission
              </p>
              <p className="mt-1 font-semibold text-ink">
                {siteConfig.diagnosis.weightOnAdmission}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                Procedures
              </p>
              <p className="mt-1 font-semibold text-ink">
                Bone marrow aspiration &amp; lumbar puncture
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                Next review
              </p>
              <p className="mt-1 font-semibold text-ink">
                {siteConfig.diagnosis.nextReview} · Dr. Sirisha Rani
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">
              The road ahead
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
              Blood cancer treatment is a marathon, not a sprint. Hania is at
              the beginning of a journey that will take many months.
            </p>
          </Reveal>
          <TreatmentTimeline />
        </div>
      </div>
    </section>
  );
}
