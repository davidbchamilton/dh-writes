"use client";

import { useEffect } from "react";
import { analyticsLinkEvent, isAnalyticsHost, measurementId } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (!isAnalyticsHost(window.location.hostname)) return;

    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      // Enhanced Measurement handles history changes; do not also send manual page views.
      window.gtag("config", measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }

    function onClick(event: MouseEvent) {
      if (event.type === "auxclick" && event.button !== 1) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const tracked = analyticsLinkEvent(
        link.href,
        window.location.href,
        link.dataset.analytics,
        link.dataset.bookTitle,
      );
      if (tracked) {
        window.gtag?.("event", tracked.name, {
          ...tracked.params,
          page_path: window.location.pathname,
          transport_type: "beacon",
        });
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, []);

  return null;
}
