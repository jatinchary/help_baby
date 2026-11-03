import { Check, Dot, Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function TreatmentTimeline() {
  return (
    <ol className="relative ml-3 mt-8 border-l-2 border-dashed border-rose-200 pl-7 sm:ml-4 sm:pl-9">
      {siteConfig.timeline.map((stage, index) => {
        const isCurrent = stage.status === "current";
        const isComplete = stage.status === "complete";

        return (
          <Reveal as="li" key={stage.title} delay={index * 0.05}>
            <div className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[2.6rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 sm:-left-[3.35rem]",
                  isCurrent &&
                    "animate-pulse-soft border-hope bg-hope text-white motion-reduce:animate-none",
                  isComplete && "border-hope bg-hope text-white",
                  stage.status === "upcoming" &&
                    "border-rose-200 bg-white text-rose-300",
                )}
              >
                {isComplete ? (
                  <Check className="h-3.5 w-3.5" />
                ) : isCurrent ? (
                  <Sparkles className="h-3.5 w-3.5" />
                ) : (
                  <Dot className="h-5 w-5" />
                )}
              </span>

              <div
                className={cn(
                  "rounded-2xl border p-4 sm:p-5",
                  isCurrent
                    ? "border-teal-200 bg-teal-50/60 shadow-sm"
                    : "border-rose-100 bg-white",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-heading text-base font-bold text-ink">
                    {stage.title}
                  </h4>
                  {isCurrent && (
                    <span className="rounded-full bg-hope px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                      Current
                    </span>
                  )}
                  <span className="ml-auto text-[0.68rem] font-semibold uppercase tracking-wider text-gray-500">
                    {stage.date}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {stage.description}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
