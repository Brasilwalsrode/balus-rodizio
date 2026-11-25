import Link from "next/link";
import CocktailCalculator from "@/components/CocktailCalculator";
import Faq from "@/components/Faq";
import MenuGallery from "@/components/MenuGallery";
import { formatPrice } from "@/data/menu";
import { getMenuItems } from "@/data/load-menu";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mobile Cocktails: Cocktailmaschine & Cocktail-Anhänger | Balus Rodizio",
  description:
    "Mobile Cocktailmaschine und komplett ausgestatteter Cocktail-Anhänger für Hochzeit, Geburtstag, Straßenfest und Firmenfeier – im Umkreis von 200 km ab Walsrode.",
};

const machineFacts = [
  ["50,00 €", "Tagespreis Cocktailmaschine", "Inklusive Programmierung, Ausleihe, Reinigung, Gläser, Strohhalme, Eiswürfel und Servietten."],
  ["600,00 €", "100 Cocktails Mindestabnahme", "Abrechnung erfolgt nach Verbrauch. Jeder weitere Cocktail kostet 5,00 €."],
  ["3 Std.", "Bartender kostenfrei", "Auf- und Abbau, Auffüllen, Servieren, Abräumen und Reinigung des Arbeitsortes."],
  ["24,90 €", "Verlängerung pro Stunde", "Gerne verlängern wir den Bartender-Service auf Wunsch um einzelne Stunden."],
];

const trailerHighlights = [
  [
    "Vielfalt der Cocktails",
    "Von klassischen Cocktails (mit und ohne Alkohol) bis hin zu kreativen Eigenkreationen – frisch gemixt, um jeden Ihrer Gäste zu begeistern.",
  ],
  [
    "Komplett ausgestatteter Anhänger",
    "Unser Cocktail-Anhänger kommt mit allem, was eine professionelle Bar benötigt: hochwertige Spirituosen, frische Säfte, edle Gläser, Kühlung und Bar-Equipment.",
  ],
  [
    "Professionelles Barkeeper-Team",
    "Unsere erfahrenen Barkeeper mixen nicht nur mit Leidenschaft, sondern sorgen für eine herzliche Atmosphäre, in der sich jeder Gast willkommen fühlt.",
  ],
  [
    "Personalisierter Service & flexibel mobil",
    "Ob in der Innenstadt, auf dem Land, beim Straßenfest oder im eigenen Garten – unser Anhänger ist nahezu überall aufstellbar und wird individuell auf Ihr Event abgestimmt.",
  ],
];

export default async function MobileCocktailsPage() {
  const cocktailItems = (await getMenuItems()).filter((item) => item.categories.includes("Mobile Cocktails"));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep py-20 md:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cocktail-anhaenger-04.jpg"
          alt="Mobiler Cocktail-Anhänger von Balus Rodizio"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/90 to-deep/45" />
        <div className="container-wide relative">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">
            Mobile Cocktails · 2 Optionen für Ihr Event
          </p>
          <h1 className="display-font max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Cocktailmaschine oder <span className="text-gold">Cocktail-Anhänger.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Egal ob Hochzeit, Geburtstag, Straßenfest, Vereinsfest oder Firmenfeier – mit unserer mobilen
            Cocktailmaschine und unserem komplett ausgestatteten Cocktail-Anhänger bringen wir das Bar-Erlebnis direkt
            zu Ihnen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cocktailanhaenger"
              className="rounded-full bg-gold px-7 py-4 text-sm font-extrabold text-deep transition hover:bg-amber"
            >
              Cocktail-Anhänger entdecken ↓
            </a>
            <a
              href="#cocktailmaschine"
              className="rounded-full border border-white/40 px-7 py-4 text-sm font-extrabold text-white transition hover:border-gold hover:text-gold"
            >
              Mobile Cocktailmaschine ↓
            </a>
          </div>
        </div>
      </section>

      {/* SCHNELLWAHL: 2 OPTIONEN */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Wählen Sie Ihr Highlight</p>
            <h2 className="display-font text-3xl font-bold text-forest md:text-5xl">
              Zwei Möglichkeiten für perfekte Drinks
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Karte 1: Cocktail-Anhänger */}
            <article className="flex flex-col overflow-hidden rounded-3xl border-2 border-gold bg-white card-shadow">
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cocktail-anhaenger-04.jpg"
                  alt="Mobiler Cocktail-Anhänger von Balus Rodizio in Walsrode"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-deep">
                  Option 1 · Cocktail-Anhänger
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="display-font text-2xl font-bold text-forest md:text-3xl">
                  Mobiler Cocktail-Anhänger
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75 md:text-base">
                  Die vollwertige rollende Cocktailbar für Hochzeiten, Firmenfeiern, Geburtstage und Straßenfeste –
                  komplett ausgestattet mit Theke, Kühlung, hochwertigen Spirituosen, frischen Säften und erfahrenem
                  Barkeeper-Team.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-5">
                  <span className="text-sm font-extrabold text-forest">
                    Individuelles Paket · Preis nach Beratung
                  </span>
                  <Link
                    href="/buchungsanfragen?item=550-mobiler-cocktail-anhaenger"
                    className="rounded-full bg-forest px-5 py-2.5 text-xs font-extrabold text-gold transition hover:bg-leaf"
                  >
                    Cocktail-Anhänger anfragen →
                  </Link>
                </div>
              </div>
            </article>

            {/* Karte 2: Mobile Cocktailmaschine */}
            <article className="flex flex-col overflow-hidden rounded-3xl border border-forest/15 bg-white card-shadow">
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cocktail-machine.jpg"
                  alt="Mobile Cocktailmaschine von Balus Rodizio"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-deep/85 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-gold">
                  Option 2 · Cocktailmaschine
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="display-font text-2xl font-bold text-forest md:text-3xl">
                  Mobile Cocktailmaschine
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75 md:text-base">
                  Kompakt, schnell und nach Verbrauch abgerechnet: 50,00 € Tagespreis, 100 Cocktails für 600,00 €
                  Mindestabnahme (jeder weitere 5,00 €) – inklusive Gläsern, Eis, Zutaten und 3 Stunden Bartender
                  kostenfrei.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-5">
                  <span className="text-sm font-extrabold text-forest">
                    Ab 650,00 € (inkl. 100 Cocktails & Tagespreis)
                  </span>
                  <Link
                    href="/buchungsanfragen?item=Mobile%20Cocktails"
                    className="rounded-full border border-forest/25 px-5 py-2.5 text-xs font-extrabold text-forest transition hover:bg-forest hover:text-white"
                  >
                    Cocktailmaschine anfragen →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* DETAILSEKTION: COCKTAIL-ANHÄNGER */}
      <section id="cocktailanhaenger" className="scroll-mt-24 bg-[#f2eee2] py-16 md:py-24">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">
                Ihr mobiler Cocktail-Anhänger
              </p>
              <h2 className="display-font text-4xl font-bold leading-tight text-forest md:text-5xl">
                Das komplette Bar-Erlebnis auf Rädern.
              </h2>
              <p className="mt-5 leading-relaxed text-ink/75">
                Träumen Sie von einer Veranstaltung, bei der stilvolle Drinks und eine unvergessliche Atmosphäre im
                Mittelpunkt stehen? Ob Firmenfeiern, Hochzeiten, Geburtstage oder Straßenfeste – unser
                Cocktail-Anhänger macht Ihr Event zum Highlight.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {trailerHighlights.map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-forest/10 bg-white p-5 card-shadow">
                    <h3 className="text-sm font-extrabold text-forest">{title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/70">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-forest/15 bg-white p-5">
                <p className="text-xs leading-relaxed text-ink/75">
                  <strong className="font-bold text-forest">Persönliche Beratung zu Paketen & Preisen:</strong> Wir
                  gestalten das Angebot für den Cocktail-Anhänger individuell nach Ihren Wünschen, Ihrer Gästezahl und
                  der thematischen Ausrichtung Ihrer Veranstaltung (Lieferung im Umkreis von 200 km ab Walsrode · bis
                  5 km kostenlos, ab 6 km 1,00 € je km einfache Fahrt).
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/buchungsanfragen?item=550-mobiler-cocktail-anhaenger"
                    className="rounded-full bg-gold px-6 py-3 text-xs font-extrabold text-deep transition hover:bg-amber"
                  >
                    Cocktail-Anhänger jetzt anfragen →
                  </Link>
                  <a
                    href="tel:051619495396"
                    className="rounded-full border border-forest/25 px-5 py-3 text-xs font-extrabold text-forest transition hover:bg-forest hover:text-white"
                  >
                    Direkt anrufen: 05161 / 94 95 396
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cocktail-anhaenger-04.jpg"
                alt="Mobiler Cocktail-Anhänger von Balus Rodizio im Einsatz"
                loading="lazy"
                className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-80"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cocktail-anhaenger-01.jpg"
                alt="Innenansicht und Theke des Cocktail-Anhängers von Balus Rodizio"
                loading="lazy"
                className="h-64 w-full rounded-3xl object-cover shadow-xl sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILSEKTION: MOBILE COCKTAILMASCHINE */}
      <section id="cocktailmaschine" className="scroll-mt-24 py-16 md:py-24">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">
              Mobile Cocktailmaschine · Preise & Leistungen
            </p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Transparent und fair.</h2>
            <p className="mt-4 text-ink/65">
              Die Abrechnung bei der Cocktailmaschine erfolgt nach Verbrauch. Die Cocktails gestalten wir immer
              gemeinsam mit Ihnen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {machineFacts.map(([price, title, text]) => (
              <div key={title} className="rounded-2xl bg-white p-6 card-shadow">
                <p className="display-font text-3xl font-bold text-forest">{price}</p>
                <h3 className="mt-2 text-sm font-extrabold uppercase tracking-wide text-leaf">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16 md:py-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">
              Ablauf Cocktailmaschine
            </p>
            <h2 className="display-font text-4xl font-bold text-white md:text-5xl">Wir kümmern uns um alles.</h2>
            <div className="mt-8 space-y-6">
              {[
                ["Cocktails aussuchen", "Gemeinsam stellen wir Ihre Lieblingssorten zusammen und programmieren die Maschine entsprechend."],
                ["Wir liefern & bauen auf", "Einsatzgebiet bis 200 km ab Walsrode (Kilometerpauschale: bis 5 km kostenlos, ab 6 km 1,00 € einfache Fahrt). Auf- und Abbau übernimmt unser Team."],
                ["Bartender vor Ort", "Drei Stunden ist ein Bartender kostenfrei dabei – für einen sorgenfreien Ablauf auf Ihrer Feier."],
                ["Sie feiern", "Gläser, Eis, Zutaten und Reinigung: An alles ist gedacht. Sie genießen mit Ihren Gästen."],
              ].map(([title, text], index) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-deep">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CocktailCalculator />
        </div>
      </section>

      {/* ALLE COCKTAIL-BAUSTEINE */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Im Überblick</p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Unsere Cocktail-Optionen</h2>
            <p className="mt-4 text-ink/65">
              Alle buchbaren Bausteine – vom komplett ausgestatteten Cocktail-Anhänger bis zur mobilen Cocktailmaschine.
            </p>
          </div>
          <MenuGallery items={cocktailItems} showTabs={false} />
          <p className="mt-8 text-center text-sm text-ink/60">
            Cocktailmaschine: {formatPrice(5000)} Tagespreis · {formatPrice(60000)} für 100 Cocktails ·{" "}
            {formatPrice(500)} je weiterem Cocktail · Cocktail-Anhänger: individuelles Paket auf Anfrage
          </p>
        </div>
      </section>

      <section className="bg-[#f2eee2] py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <h2 className="display-font text-3xl font-bold text-forest md:text-4xl">Fragen zur Cocktailbar?</h2>
          </div>
          <Faq />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/buchungsanfragen?item=550-mobiler-cocktail-anhaenger"
              className="inline-block rounded-full bg-gold px-8 py-4 text-sm font-extrabold text-deep transition hover:bg-amber"
            >
              Cocktail-Anhänger anfragen →
            </Link>
            <Link
              href="/buchungsanfragen?item=Mobile%20Cocktails"
              className="inline-block rounded-full bg-forest px-8 py-4 text-sm font-extrabold text-gold transition hover:bg-leaf"
            >
              Cocktailmaschine anfragen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
