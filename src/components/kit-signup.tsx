"use client";

import { useEffect, useRef, useState } from "react";

const formUrl = "https://david-hamilton-2.kit.com/1f64be7eb2";

export function KitSignup() {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    // Kit replaces this script with its live form. Keep the vendor-owned DOM
    // inside an otherwise empty host so React never reconciles its fields.
    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = "1f64be7eb2";
    script.src = `${formUrl}/index.js`;
    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("error");
    host.appendChild(script);
    return () => {
      script.onload = null;
      script.onerror = null;
      script.remove();
      host.replaceChildren();
    };
  }, []);

  return (
    <div className={status === "error" ? "kit-signup kit-signup--error" : "kit-signup"}>
      <div className="kit-embed" ref={container} data-kit-embed="1f64be7eb2" />
      {status !== "ready" && (
        <p className="small-note" role="status">
          {status === "error" ? "The signup form could not load." : "Loading the signup form…"}
        </p>
      )}
      <p className="small-note kit-fallback">
        You can also <a href={formUrl} data-analytics="kit">open the signup form directly</a>.
      </p>
    </div>
  );
}
