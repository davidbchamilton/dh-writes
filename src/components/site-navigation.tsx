"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";

export function SiteNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div
      ref={panel}
      className="navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={open ? "nav-links is-open" : "nav-links"}
      >
        {navigation.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === "/" ? pathname === href : pathname.startsWith(href))
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          className="mobile-updates"
          href="/newsletter"
          onClick={() => setOpen(false)}
        >
          Get Book Updates <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  );
}
