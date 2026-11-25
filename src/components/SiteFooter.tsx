import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-deep text-white/70">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="Balus Rodizio – Startseite" className="mb-4 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-balus-rodizio.png"
              alt="Balus Rodizio – ein brasilianisches Erlebnis!"
              width={458}
              height={286}
              className="h-24 w-auto object-contain"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Rodizio-Catering, Partyservice und mobile Cocktailbar ab 25 Personen – im Umkreis von 200 km ab Walsrode.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">Entdecken</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gold">Startseite</Link></li>
            <li><Link href="/speisekarte" className="hover:text-gold">Speisekarte</Link></li>
            <li><Link href="/mobile-cocktails" className="hover:text-gold">Mobile Cocktails</Link></li>
            <li><Link href="/buchungsanfragen" className="hover:text-gold">Buchungsanfragen</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">Kontakt</h3>
          <address className="space-y-2 text-sm not-italic">
            <p>Silberweg 6 · 29664 Walsrode</p>
            <p><a href="tel:051619495396" className="hover:text-gold">05161 / 94 95 396</a></p>
            <p><a href="mailto:info@balus-rodizio.de" className="hover:text-gold">info@balus-rodizio.de</a></p>
            <p className="pt-2 text-xs text-white/50">Di–Mi 09–13 & 15–20 Uhr · Do–Fr 09–13 Uhr</p>
          </address>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gold">Weiterführend & Rechtliches</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/impressum" className="hover:text-gold">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-gold">Datenschutzerklärung</Link></li>
            <li><Link href="/buchungsanfragen/verwalten" className="hover:text-gold">Team: Termine bestätigen</Link></li>
            <li>
              <a
                href="https://www.instagram.com/balusrodizio/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=52.8681171%2C9.6369093"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                Route planen
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Balus Rodizio · Walsrode · Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/impressum" className="hover:text-gold">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
            <span className="text-white/45">Mit Liebe für gute Feiern im Heidekreis.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
