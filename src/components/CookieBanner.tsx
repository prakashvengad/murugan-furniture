"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CookieConsentValue = "accepted" | "rejected";

const CONSENT_STORAGE_KEY = "cookie_consent";
const CONSENT_COOKIE_NAME = "cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setConsentCookie(value: CookieConsentValue) {
  if (typeof document === "undefined") return;

  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(
        CONSENT_STORAGE_KEY
      ) as CookieConsentValue | null;

      if (!existing) setIsVisible(true);
    } catch {
      // If storage is blocked, show banner anyway.
      setIsVisible(true);
    }
  }, []);

  const saveChoice = (value: CookieConsentValue) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // ignore
    }

    setConsentCookie(value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-white/95 p-6 shadow-xl backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="text-base text-gray-900">
            <div className="text-lg font-semibold text-amber-900">We use cookies</div>
            <div className="mt-1 text-gray-700">
              We use cookies and similar technologies to:
            </div>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              <li>Remember your preferences</li>
              <li>Improve site performance and user experience</li>
              <li>Understand how visitors use our website</li>
            </ul>
            <div className="mt-3 text-gray-700">
              You can accept or reject cookies. Read our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-amber-900 underline underline-offset-2 hover:text-amber-800"
              >
                Privacy Policy
              </Link>
              {" "}for more details.
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => saveChoice("rejected")}
              className="rounded-xl border border-amber-800 px-6 py-3 text-base font-semibold text-amber-900 hover:bg-amber-50 transition"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => saveChoice("accepted")}
              className="rounded-xl bg-amber-800 px-6 py-3 text-base font-semibold text-white hover:bg-amber-700 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
