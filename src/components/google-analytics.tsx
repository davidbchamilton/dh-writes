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
    }

    // Queue measurement immediately, but keep the tag's download and execution
    // out of the hero image's loading window. A tracked click flushes it early.
    let idleId: number | undefined;
    let timerId: ReturnType<typeof globalThis.setTimeout> | undefined;
    function loadTag() {
      if (document.getElementById("google-analytics-tag")) return;
      const script = document.createElement("script");
      script.id = "google-analytics-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
    function scheduleTag() {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadTag, { timeout: 2000 });
      } else {
        timerId = globalThis.setTimeout(loadTag, 0);
      }
    }
    if (document.readyState === "complete") scheduleTag();
    else window.addEventListener("load", scheduleTag, { once: true });

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
        loadTag();
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
      window.removeEventListener("load", scheduleTag);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) globalThis.clearTimeout(timerId);
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, []);

  return null;
}
