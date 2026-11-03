import Image from "next/image";
import { Camera, Heart, Lock, MessageCircleHeart } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function PhotoGallery() {
  const photos = siteConfig.gallery;
  const isSingle = photos.length === 1;

  return (
    <section id="photos" className="section border-y border-rose-100 bg-white">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            A little fighter
          </p>
          <h2 className="section-title">Meet Hania</h2>
          <p className="section-lede">
            A happy little girl who loves dressing up, playing and being
            surrounded by her family. This is who your kindness is helping.
          </p>
        </Reveal>

        <div
          className={cn(
            "mt-10 grid gap-5",
            isSingle
              ? "lg:grid-cols-[1.4fr_1fr] lg:items-start"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {photos.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 0.06}
              className={isSingle ? "lg:sticky lg:top-28" : undefined}
            >
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-3xl border-4 border-white bg-rose-50 shadow-xl shadow-rose-100/70",
                  isSingle ? "aspect-[4/5] max-h-[36rem]" : "aspect-square",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes={isSingle ? "(max-width: 1024px) 92vw, 640px" : "(max-width: 640px) 92vw, 30vw"}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/70 to-transparent px-4 pb-4 pt-14 text-xs font-medium text-white">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <div className={cn("grid gap-4", isSingle && "lg:mt-2")}>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-rose-100 bg-cream/80 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-coral">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-ink">
                  Every photo is a good day
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Between hospital visits, Hania is still a three-year-old who
                  loves dressing up and making her parents smile. Your support
                  protects these ordinary, precious moments.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-hope">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-ink">
                  Shared with care
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  The family has chosen to share only a small number of photos
                  and no home address — enough to show you who Hania is, while
                  protecting her privacy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <a
                href="#contact"
                className="flex items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-white p-5 transition-colors hover:border-teal-200 hover:bg-teal-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
              >
                <span>
                  <span className="flex items-center gap-2 font-heading text-sm font-bold text-ink">
                    <MessageCircleHeart className="h-4 w-4 text-coral" aria-hidden="true" />
                    Send Hania some love
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    A message of support means a lot to her parents.
                  </span>
                </span>
                <span className="text-sm font-bold text-hope" aria-hidden="true">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
