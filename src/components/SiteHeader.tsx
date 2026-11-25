"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/mobile-cocktails", label: "Mobile Cocktails" },
  { href: "/#ablauf", label: "So funktioniert's" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep/95 backdrop-blur-md">
      <div className="container-wide flex h-[84px] items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Balus Rodizio – Startseite"
          className="flex shrink-0 items-center py-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-balus-rodizio.png"
            alt="Balus Rodizio – ein brasilianisches Erlebnis!"
            width={458}
            height={286}
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:051619495396"
            className="hidden text-sm font-bold text-white/90 transition hover:text-gold xl:block"
          >
            05161 / 94 95 396
          </a>
          <Link
            href="/buchungsanfragen"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-extrabold text-deep transition hover:bg-amber md:inline-block"
          >
            Buchungsanfragen
          </Link>
          <button
            type="button"
            aria-label="Menü öffnen"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
          >
            <span className="text-xl">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-deep px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/buchungsanfragen"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-4 py-3 text-center text-sm font-extrabold text-deep"
            >
              Buchungsanfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
