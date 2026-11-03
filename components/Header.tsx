"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#story", label: "Her Story" },
  { href: "#diagnosis", label: "Diagnosis" },
  { href: "#report", label: "Medical Report" },
  { href: "#photos", label: "Photos" },
  { href: "#donate", label: "Donate" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-100/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[4.5rem]">
        <Link
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2"
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md shadow-rose-200/60">
            <Image
              src={siteConfig.patient.avatar}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-heading text-sm font-extrabold leading-tight text-ink sm:text-base">
              Hania Anam
            </span>
            <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] text-hope sm:block">
              Help her fight cancer
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-rose-50 hover:text-hope-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#donate">
              <Heart className="h-4 w-4" aria-hidden="true" />
              Donate Now
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle className="font-heading text-xl">
                  Help Hania
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <a
                          href={link.href}
                          className="block rounded-xl px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-hope-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <SheetClose asChild>
                <Button asChild size="lg" className="mt-6 w-full">
                  <a href="#donate">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    Donate Now
                  </a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
