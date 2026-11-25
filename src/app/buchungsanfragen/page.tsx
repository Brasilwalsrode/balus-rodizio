import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { getMenuItems } from "@/data/load-menu";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Buchungsanfragen | Balus Rodizio Walsrode",
  description:
    "Wunschtermin und Menü für Rodizio-Catering, Partyservice oder mobile Cocktailbar bei Balus Rodizio in Walsrode anfragen – wir prüfen den Termin und bestätigen persönlich.",
};

export type BuchungsanfragenSearchParams = Promise<{
  item?: string;
  message?: string;
  eventType?: string;
  rodizio?: string;
}>;

export default async function BuchungsanfragenPage({
  searchParams,
}: {
  searchParams: BuchungsanfragenSearchParams;
}) {
  const [params, items] = await Promise.all([searchParams, getMenuItems()]);
  const item = params.item ?? "";
  const initialMessage = params.message ?? "";

  return (
    <>
      <section className="relative overflow-hidden bg-deep py-16 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/balu-grill.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/90 to-deep/40" />
        <div className="container-wide relative">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">
            Wunschtermin anfragen · Verbindlich nach Bestätigung
          </p>
          <h1 className="display-font text-4xl font-bold text-white md:text-6xl">Buchungsanfragen</h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            {item ? `Sie haben „${item}“ vorausgewählt. ` : ""}Fragen Sie hier Ihren Wunschtermin samt Uhrzeit und Menü
            oder mobiler Cocktailbar unverbindlich an (Catering für 25 bis 5.000 Personen · Lieferung im Umkreis von
            200 km ab Walsrode). Wir prüfen anschließend in unserem Kalender, ob der Termin bei uns noch passt, und
            bestätigen Ihnen die Buchung persönlich.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <InquiryForm
            items={items}
            initialItem={item}
            initialMessage={initialMessage}
            initialEventType={params.eventType ?? ""}
            initialRodizio={params.rodizio === "1"}
          />

          <aside className="space-y-6">
            <div className="rounded-2xl bg-forest p-7 text-white card-shadow">
              <h2 className="display-font mb-4 text-2xl font-bold text-gold">So läuft Ihre Buchungsanfrage ab</h2>
              <ol className="space-y-3.5 text-sm text-white/85">
                <li>
                  <span className="font-bold text-gold">1.</span> Gewünschte Menüs, Beilagen, Cocktailbar oder
                  Ausstattung direkt im Formular auswählen (Mehrfachauswahl möglich)
                </li>
                <li>
                  <span className="font-bold text-gold">2.</span> Wunschtermin, Uhrzeit, Anlass, Gästezahl (25 – 5.000
                  Personen) & Veranstaltungsort eingeben – die Kilometer-/Ressourceneinsatz-Pauschale (5 km kostenlos,
                  ab 6 km 1,00 € einfache Fahrt) wird direkt berechnet
                </li>
                <li>
                  <span className="font-bold text-gold">3.</span>{" "}
                  <span className="font-semibold text-white">Terminprüfung durch uns:</span> Wir prüfen unseren Kalender
                  und bestätigen Ihre Buchung, wenn der Termin bei uns noch passt
                </li>
                <li>
                  <span className="font-bold text-gold">4.</span> Am bestätigten Termin feiern – wir kümmern uns um den
                  Rest
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-forest/10 bg-white p-7 card-shadow">
              <h2 className="display-font mb-3 text-2xl font-bold text-forest">Wichtiger Hinweis zum Termin</h2>
              <p className="text-sm leading-relaxed text-ink/70">
                Das Absenden einer Buchungsanfrage reserviert noch keinen festen Termin, sondern dient der
                Verfügbarkeitsprüfung. Erst mit unserer persönlichen Rückmeldung ist Ihr Termin verbindlich bestätigt.
              </p>
              <div className="mt-5 border-t border-forest/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-forest/70">Telefonische Rückfragen</p>
                <a href="tel:051619495396" className="mt-1.5 block text-lg font-extrabold text-forest hover:underline">
                  05161 / 94 95 396
                </a>
                <a
                  href="mailto:info@balus-rodizio.de"
                  className="mt-1 block text-sm font-bold text-leaf hover:underline"
                >
                  info@balus-rodizio.de
                </a>
                <p className="mt-3 text-xs text-ink/55">
                  Silberweg 6 · 29664 Walsrode · Nach telefonischer Terminzusage reservieren wir Ihren Wunschtermin 7
                  Tage.
                </p>
              </div>
            </div>

            <Link
              href="/speisekarte"
              className="block text-center text-sm font-bold text-forest underline underline-offset-4 hover:text-leaf"
            >
              Alle Menüs und Preise in der Speisekarte ansehen
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
