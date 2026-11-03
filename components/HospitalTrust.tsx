import {
  BadgeCheck,
  Building2,
  ExternalLink,
  Phone,
  Rainbow,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export function HospitalTrust() {
  const { hospital } = siteConfig;

  return (
    <section id="hospital" className="section">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified care
          </p>
          <h2 className="section-title">In trusted hands</h2>
          <p className="section-lede">
            Hania is being treated at one of Hyderabad&apos;s leading children&apos;s
            hospitals. You can verify every detail on this page directly with the
            hospital.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="mt-10 overflow-hidden border-rose-100">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-[1fr_1.15fr]">
                <div className="border-b border-rose-100 bg-gradient-to-br from-teal-50 via-white to-rose-50 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-hope shadow-md shadow-teal-900/10">
                      <Rainbow className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-extrabold leading-tight text-ink">
                        {hospital.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-gray-500">
                        {hospital.branch}
                      </p>
                      <p className="mt-2 text-sm italic text-hope-dark">
                        &ldquo;{hospital.tagline}&rdquo;
                      </p>
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white bg-white/80 p-3">
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                        UHID
                      </dt>
                      <dd className="mt-1 font-mono text-sm font-semibold text-ink">
                        {hospital.uhidMasked}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-white bg-white/80 p-3">
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gray-500">
                        IP No.
                      </dt>
                      <dd className="mt-1 font-mono text-sm font-semibold text-ink">
                        {hospital.ipNoMasked}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-3 text-[0.7rem] leading-relaxed text-gray-500">
                    Only the middle digits are masked here. The full UHID and IP
                    number appear on the original report below.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3.5 py-2 text-xs font-semibold text-hope-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                    >
                      Verify on hospital website
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={`tel:${hospital.emergencyPhones[0].replace(/[^+\d]/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {hospital.emergencyPhones[0]}
                    </a>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-hope">
                    <Stethoscope className="h-4 w-4" aria-hidden="true" />
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em]">
                      Treating consultant
                    </p>
                  </div>
                  <h3 className="mt-2 font-heading text-xl font-extrabold text-ink">
                    {hospital.primaryDoctor.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-hope-dark">
                    {hospital.primaryDoctor.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {hospital.primaryDoctor.qualifications}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[0.7rem] font-semibold text-gray-600">
                    <BadgeCheck className="h-3.5 w-3.5 text-hope" aria-hidden="true" />
                    License No. {hospital.primaryDoctor.licenseNo}
                  </p>

                  <div className="mt-6 border-t border-rose-100 pt-5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gray-500">
                      Co-consultants
                    </p>
                    <ul className="mt-3 space-y-3">
                      {hospital.coConsultants.map((doctor) => (
                        <li key={doctor.name} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              {doctor.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doctor.qualifications} · {doctor.role}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-xl bg-cream p-4">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                      <Building2 className="h-3.5 w-3.5 text-hope" aria-hidden="true" />
                      How to verify Hania&apos;s admission
                    </p>
                    <p className="mt-1.5 text-[0.72rem] leading-relaxed text-gray-500">
                      Call Rainbow Children&apos;s Hospital, Banjara Hills, on{" "}
                      {hospital.emergencyPhones.join(" / ")} or toll-free{" "}
                      {hospital.tollFree}, and quote the UHID and IP number
                      printed on the original report.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
