"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Maximize2,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MedicalReport() {
  const { report } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const isOpen = openIndex !== null;
  const currentPage = openIndex ?? 0;

  function openPage(index: number) {
    setOpenIndex(index);
    setZoomed(false);
  }

  function goTo(direction: -1 | 1) {
    setOpenIndex((current) => {
      if (current === null) return null;
      const next = current + direction;
      if (next < 0 || next >= report.pageImages.length) return current;
      return next;
    });
    setZoomed(false);
  }

  return (
    <section id="report" className="section bg-report">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Transparency
          </p>
          <h2 className="section-title">The proof, in full</h2>
          <p className="section-lede">{report.disclaimer}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 rounded-2xl border border-teal-100 bg-white/70 p-3 sm:p-5">
            <Tabs defaultValue="pages">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="pages" className="flex-1 sm:flex-none">
                    <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                    View pages
                  </TabsTrigger>
                  <TabsTrigger value="download" className="flex-1 sm:flex-none">
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Download PDF
                  </TabsTrigger>
                </TabsList>
                <p className="text-xs font-medium text-gray-500">
                  {report.pageCount} pages · scanned discharge summary · 31 Aug 2026
                </p>
              </div>

              <TabsContent value="pages">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {report.pageImages.map((src, index) => (
                    <li key={src}>
                      <button
                        type="button"
                        onClick={() => openPage(index)}
                        className="group relative block w-full overflow-hidden rounded-xl border border-rose-100 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2"
                      >
                        <span className="relative block aspect-[595/842] overflow-hidden bg-rose-50">
                          <Image
                            src={src}
                            alt=""
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 210px"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-gray-950/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span className="rounded-full bg-white/95 px-2 py-1 text-[0.6rem] font-bold text-gray-700">
                              Page {index + 1}
                            </span>
                            <Maximize2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                          </span>
                        </span>
                        <span className="flex items-center justify-between border-t border-rose-100 px-2.5 py-2 text-[0.68rem] font-semibold text-gray-500">
                          Page {index + 1}
                          <span className="text-hope">View</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-hope" aria-hidden="true" />
                  Tap any page to read it full screen. The family&apos;s home
                  address is visible on the original hospital document; it has
                  been withheld from text on this website.
                </p>
              </TabsContent>

              <TabsContent value="download">
                <div className="grid gap-5 rounded-xl border border-rose-100 bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-coral">
                    <FileText className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink">
                      {report.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Original scanned PDF · {report.pageCount} pages · 3.8 MB.
                      Download and verify the doctor&apos;s signature and hospital
                      details.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button asChild>
                        <a href={report.pdfPath} download>
                          <Download className="h-4 w-4" aria-hidden="true" />
                          Download the report
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a
                          href={report.pdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open PDF in new tab
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Reveal>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setOpenIndex(null);
            setZoomed(false);
          }
        }}
      >
        <DialogContent className="max-w-5xl gap-3 p-2 sm:p-4">
          <DialogTitle className="sr-only">
            Discharge summary page {currentPage + 1} of {report.pageCount}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full screen view of Hania Anam&apos;s hospital discharge summary.
          </DialogDescription>

          <div className="flex items-center justify-between gap-2 pr-10">
            <p className="text-xs font-semibold text-gray-500">
              Page {currentPage + 1} of {report.pageCount}
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoomed((value) => !value)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
              >
                {zoomed ? (
                  <ZoomOut className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(-1)}
                disabled={currentPage === 0}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => goTo(1)}
                disabled={currentPage === report.pageCount - 1}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="Download PDF">
                <a href={report.pdfPath} download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="max-h-[78vh] overflow-auto rounded-lg bg-rose-50">
            <div
              className={cn(
                "mx-auto transition-[width] duration-200",
                zoomed ? "w-[180%] max-w-none" : "w-full max-w-2xl",
              )}
            >
              <Image
                src={report.pageImages[currentPage]}
                alt={`Discharge summary page ${currentPage + 1} of ${report.pageCount} for Baby Hania Anam`}
                width={1200}
                height={1698}
                className="h-auto w-full bg-white"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
