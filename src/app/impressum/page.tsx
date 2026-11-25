import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Balus Rodizio Walsrode",
  description:
    "Impressum und gesetzliche Pflichtangaben gemäß § 5 DDG für Balus Rodizio – Josué (Balu) Kalsing, Silberweg 6, 29664 Walsrode.",
};

export default function ImpressumPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-forest/90 to-deep" />
        <div className="container-wide relative">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Rechtliches</p>
          <h1 className="display-font text-4xl font-bold text-white md:text-6xl">Impressum</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Gesetzliche Anbieterkennzeichnung und Pflichtangaben für Balus Rodizio in Walsrode.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8 rounded-2xl border border-forest/10 bg-white p-7 card-shadow md:p-10">
            <div>
              <h2 className="display-font text-2xl font-bold text-forest">Angaben gemäß § 5 DDG</h2>
              <div className="mt-3 space-y-1 text-sm leading-relaxed text-ink/80 md:text-base">
                <p className="font-bold text-forest">Balus Rodizio</p>
                <p>Inhaber: Josué (Balu) Kalsing</p>
                <p>Silberweg 6</p>
                <p>29664 Walsrode (Honerdingen)</p>
                <p>Deutschland</p>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">Rechnungsadresse</h2>
              <div className="mt-3 space-y-1 text-sm leading-relaxed text-ink/80 md:text-base">
                <p className="font-bold text-forest">Balus Rodizio</p>
                <p>An der Gänseweide 13</p>
                <p>29664 Walsrode</p>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">Kontakt</h2>
              <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/80 md:text-base">
                <p>
                  <span className="font-semibold text-forest">Telefon:</span>{" "}
                  <a href="tel:051619495396" className="underline decoration-forest/30 underline-offset-4 hover:text-leaf">
                    05161 / 94 95 3 96
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-forest">E-Mail:</span>{" "}
                  <a
                    href="mailto:info@balus-rodizio.de"
                    className="underline decoration-forest/30 underline-offset-4 hover:text-leaf"
                  >
                    info@balus-rodizio.de
                  </a>
                </p>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">Umsatzsteuer-ID</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80 md:text-base">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                <span className="font-bold text-forest">DE 287 256 766</span>
              </p>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <div className="mt-3 space-y-1 text-sm leading-relaxed text-ink/80 md:text-base">
                <p>Josué Kalsing</p>
                <p>Silberweg 6</p>
                <p>29664 Walsrode</p>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">Verbraucherstreitbeilegung</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80 md:text-base">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="border-t border-forest/10 pt-7">
              <h2 className="display-font text-2xl font-bold text-forest">Bildnachweise</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80 md:text-base">
                Eigene Aufnahmen von Balus Rodizio Walsrode sowie Fotolia.com | #103368207 | Urheber: litchi cyril.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-forest p-7 text-white card-shadow">
              <h2 className="display-font text-2xl font-bold text-gold">Direkter Kontakt</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Haben Sie Fragen zu unserem Catering, unseren Menüs oder Ihrer geplanten Veranstaltung?
              </p>
              <div className="mt-5 space-y-2 text-sm">
                <a href="tel:051619495396" className="block font-bold text-gold hover:underline">
                  05161 / 94 95 3 96
                </a>
                <a href="mailto:info@balus-rodizio.de" className="block text-white/85 hover:text-gold">
                  info@balus-rodizio.de
                </a>
              </div>
              <Link
                href="/buchungsanfragen"
                className="mt-6 inline-block w-full rounded-full bg-gold px-5 py-3 text-center text-sm font-extrabold text-deep transition hover:bg-amber"
              >
                Buchungsanfragen →
              </Link>
            </div>

            <div className="rounded-2xl border border-forest/10 bg-white p-7 card-shadow">
              <h2 className="display-font text-xl font-bold text-forest">Weitere Informationen</h2>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-forest">
                <li>
                  <Link href="/datenschutz" className="hover:text-leaf hover:underline">
                    → Datenschutzerklärung
                  </Link>
                </li>
                <li>
                  <Link href="/speisekarte" className="hover:text-leaf hover:underline">
                    → Speisekarte & Preise
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-leaf hover:underline">
                    → Zurück zur Startseite
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
