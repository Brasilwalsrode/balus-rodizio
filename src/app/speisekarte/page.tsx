import Link from "next/link";
import MenuGallery from "@/components/MenuGallery";
import { getMenuItems } from "@/data/load-menu";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Speisekarte & Preise | Balus Rodizio Walsrode",
  description:
    "Alle Menüs, Salate, Saucen, Ausstattung und mobilen Cocktails von Balus Rodizio Walsrode – mit Preisen für 2026.",
};

const notes = [
  [
    "Ab 25 Personen · 200 km Umkreis",
    "Lieferung ab 25 Personen bis 200 km ab Walsrode. Kilometer-/Ressourceneinsatz-Pauschale: bis 5 km kostenlos, ab 6 km 1,00 € je km (einfache Fahrt).",
  ],
  [
    "Geschirr & Besteck",
    "Bei Komplett-Sparmenüs gratis inklusive. Bei Beispielmenüs sowie wenn Sie Ihr Menü selbst zusammenstellen, ist Geschirr nicht enthalten und kann für 2,50 € p. P. dazugebucht werden.",
  ],
  ["Vegetarisch & vegan", "Vegetarische Menüs mit Halloumi und Hirtenkäse sowie Menü E5 mit veganen Falafel-Bols."],
];

export default async function SpeisekartePage() {
  const items = await getMenuItems();

  return (
    <>
      <section className="relative overflow-hidden bg-deep py-16 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/party.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/90 to-deep/40" />
        <div className="container-wide relative">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Unsere Speisekarte</p>
          <h1 className="display-font max-w-3xl text-4xl font-bold text-white md:text-6xl">Menüs & Preise 2026</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            Catering ab 25 Personen · Lieferung im Umkreis von 200 km ab Walsrode. Alle Preise inklusive MwSt. Hier
            finden Sie alle {items.length} Angebote aus unserem Katalog – nach Bereich, Anlass oder Suchbegriff.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-wide">
          {/* Hinweis Buffet vs. Traditionelles Rodizio */}
          <div className="mb-10 rounded-2xl border-2 border-gold/60 bg-white p-6 card-shadow md:flex md:items-center md:justify-between md:gap-8 md:p-7">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-forest px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-gold">
                  Buffet inklusive
                </span>
                <span className="rounded-full bg-gold/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-deep">
                  Traditionelles Rodizio + 5,00 € p. P.
                </span>
              </div>
              <h2 className="display-font mt-3 text-2xl font-bold text-forest">
                Unsere Speisen als Buffet – oder als Traditionelles Rodizio vom Spieß
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                Wir bieten unsere Speisen und Menüs standardmäßig als reichhaltiges{" "}
                <strong className="font-bold text-forest">Buffet</strong> zur Selbstbedienung an. Sollten Sie sich ein{" "}
                <strong className="font-bold text-forest">Traditionelles Rodizio</strong> wünschen – bei dem das Fleisch
                frisch vom Spieß direkt auf die Teller Ihrer Gäste geschnitten wird –, berechnen wir hierfür{" "}
                <strong className="font-bold text-forest">5,00 € Aufpreis pro Person</strong>.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                <strong className="font-bold text-forest">Hinweis zum Geschirr:</strong> Bei unseren{" "}
                <strong className="font-bold text-forest">Beispielmenüs</strong> sowie wenn Sie sich Ihr{" "}
                <strong className="font-bold text-forest">Menü selbst zusammenstellen</strong>, ist das Geschirr nicht
                dabei – Teller & Besteck (inkl. Reinigung) können gerne für{" "}
                <strong className="font-bold text-forest">2,50 € pro Person</strong> dazugebucht werden (bei den
                Komplett-Sparmenüs gratis inklusive).
              </p>
            </div>
            <Link
              href="/buchungsanfragen?item=Men%C3%BC%20C&rodizio=1"
              className="mt-4 inline-block shrink-0 rounded-full bg-gold px-5 py-3 text-xs font-extrabold text-deep transition hover:bg-amber md:mt-0"
            >
              Mit Traditionellem Rodizio anfragen →
            </Link>
          </div>

          <MenuGallery items={items} />

          <div className="mt-14 grid gap-6 rounded-2xl bg-forest p-8 text-white md:grid-cols-3 md:p-10">
            {notes.map(([title, text]) => (
              <div key={title}>
                <h2 className="display-font mb-2 text-xl font-bold text-gold">{title}</h2>
                <p className="text-sm leading-relaxed text-white/75">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/buchungsanfragen"
              className="inline-block rounded-full bg-gold px-8 py-4 text-sm font-extrabold text-deep transition hover:bg-amber"
            >
              Zur Buchungsanfrage →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
