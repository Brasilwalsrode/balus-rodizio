"use client";

import { useState } from "react";

const items = [
  {
    q: "Werden die Speisen als Buffet angeboten oder vom Spieß auf den Teller geschnitten?",
    a: "Standardmäßig bieten wir unsere Speisen als reichhaltiges Buffet an. Sollten Sie sich ein Traditionelles Rodizio wünschen – bei dem das frisch gegrillte Fleisch direkt vom Spieß auf die Teller Ihrer Gäste geschnitten wird –, berechnen wir hierfür einen Aufpreis von 5,00 € pro Person.",
  },
  {
    q: "Ist das Geschirr bei den Menüs dabei?",
    a: "Bei unseren Komplett-Sparmenüs werden Teller und Besteck kostenfrei zur Verfügung gestellt. Bei den Beispielmenüs sowie wenn Sie Ihr Menü selbst zusammenstellen, ist das Geschirr nicht dabei – Sie können Geschirr und Besteck (inklusive Endreinigung) gerne für 2,50 € pro Person dazubuchen.",
  },
  {
    q: "Was kostet Catering bei Balus Rodizio und kann ich ein Individuelles Menü zusammenstellen?",
    a: "Die Beispielmenüs kosten 20,00 bis 33,50 € pro Person, die Komplett-Sparmenüs 26,90 bis 48,90 € (unser meistgewähltes Menü C liegt bei 34,90 € pro Person). Wenn Sie sich ein Individuelles Menü selbst zusammenstellen, beträgt der Grundpreis 10,00 € pro Person zuzüglich der gewählten Spezialitäten – hierbei müssen mindestens 3 Fleischsorten ausgewählt werden. Alle Preise inklusive MwSt.",
  },
  {
    q: "Gibt es vegetarische und vegane Menüs?",
    a: "Ja. Vegetarische Menüs mit Hirtenkäse, Halloumi und Gemüse gibt es ab 26,90 € pro Person, das Beispielmenü Frutos Vegetais kostet 29,50 €. Menü E5 enthält vegane Falafel-Bols. Allergien und Unverträglichkeiten besprechen Sie bitte vorab direkt mit uns.",
  },
  {
    q: "Wie läuft eine Buchungsanfrage ab und wie früh sollte ich anfragen?",
    a: "Bitte planen Sie mindestens eine Woche Vorlauf ein – bei Hochzeiten und großen Feiern gerne früher. Über unser Formular „Buchungsanfragen“ fragen Sie Ihren Wunschtermin samt Menü, Gästezahl und Veranstaltungsort an. Wir prüfen anschließend in unserem Kalender, ob der Termin bei uns noch passt, und bestätigen Ihnen die Buchung persönlich.",
  },
  {
    q: "Für wie viele Personen ist Catering möglich und wie wird die Kilometerpauschale berechnet?",
    a: "Unser Catering ist ab 25 Personen bis maximal 5.000 Personen buchbar. Wir liefern im Umkreis von bis zu 200 km ab Walsrode (Silberweg 6, 29664 Walsrode). Für die Kilometerpauschale / Ressourceneinsatz-Pauschale sind bis 5 km kostenlos, ab dem 6. km berechnen wir 1,00 € pro Kilometer (einfache Fahrt). Eine Selbstabholung gibt es nicht. Nach telefonischer Terminzusage reservieren wir Ihren Wunschtermin 7 Tage.",
  },
  {
    q: "Kann ich eine mobile Cocktailmaschine oder den Cocktail-Anhänger mieten?",
    a: "Ja, Sie haben beide Möglichkeiten: Unseren komplett ausgestatteten mobilen Cocktail-Anhänger (inkl. Barkeeper-Team, hochwertigen Spirituosen, Säften, Gläsern und Bar-Equipment – individuelles Paket nach Beratung) sowie unsere mobile Cocktailmaschine für 50 € Tagespreis inklusive Auf- und Abbau (Mindestabnahme 100 Cocktails für 600 €, jeder weitere 5 €, Bartender 3 Stunden kostenfrei). Einsatzgebiet jeweils bis 200 km ab Walsrode (bis 5 km kostenlos, ab 6 km 1,00 € je km einfache Fahrt).",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item, index) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between gap-5 py-5 text-left"
            aria-expanded={open === index}
          >
            <span className="text-base font-bold text-forest md:text-lg">{item.q}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/20 text-lg text-forest">
              {open === index ? "−" : "+"}
            </span>
          </button>
          {open === index && <p className="pb-6 pr-12 text-sm leading-relaxed text-ink/70 md:text-base">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
