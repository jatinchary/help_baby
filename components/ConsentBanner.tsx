"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, X } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "hania-consent-banner-dismissed";

export function ConsentBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // localStorage can be unavailable in private mode; banner stays visible.
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors.
    }
  }

  if (dismissed) return null;

  return (
    <div
      className="relative z-40 border-b border-teal-700/20 bg-teal-800 text-white"
      role="region"
      aria-label="Consent notice"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 pr-12 sm:items-center sm:px-6">
        <HeartHandshake
          className="mt-0.5 h-5 w-5 shrink-0 text-teal-200 sm:mt-0"
          aria-hidden="true"
        />
        <p className="text-[0.8rem] leading-relaxed text-teal-50 sm:text-sm">
          {siteConfig.consent}{" "}
          <span className="text-teal-200">
            Her home address is not published.
          </span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-teal-100 transition-colors hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80"
          aria-label="Dismiss consent notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
