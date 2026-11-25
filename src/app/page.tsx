import Link from "next/link";
import { formatPrice } from "@/data/menu";
import { getMenuItems } from "@/data/load-menu";
import InquiryForm from "@/components/InquiryForm";
import Faq from "@/components/Faq";

export const dynamic = "force-dynamic";

const services = [
  {
    title: "Unsere Speisen als Buffet",
    text: "Wir bieten unsere frisch gegrillten Spezialitäten, Beilagen und Salate standardmäßig als reichhaltiges Buffet an – für Feiern ab 25 Personen im Umkreis von 200 km ab Walsrode.",
    image: "/images/party.jpg",
    tag: "Standard · ab 25 Personen",
  },
  {
    title: "Traditionelles Rodizio",
    text: "Sie wünschen das klassische Erlebnis, bei dem das Fleisch frisch vom Spieß direkt auf die Teller Ihrer Gäste geschnitten wird? Gerne für 5,00 € Aufpreis pro Person.",
    image: "/images/lamm.jpg",
    tag: "Optional + 5,00 € p. P.",
  },
  {
    title: "Mobile Cocktailbar & Anhänger",
    text: "Wahlweise mit unserer mobilen Cocktailmaschine oder unserem komplett ausgestatteten Cocktail-Anhänger inklusive erfahrenem Barkeeper-Team.",
    image: "/images/cocktail-anhaenger-04.jpg",
    tag: "2 Optionen buchbar",
  },
];

const steps = [
  { number: "01", title: "Menü aussuchen", text: "Wählen Sie ein Beispielmenü, Sparmenü oder stellen Sie sich Ihr Menü selbst zusammen." },
  { number: "02", title: "Wunschtermin anfragen", text: "Senden Sie uns Ihren Wunschtermin, Anlass, Gästezahl und Veranstaltungsort über unsere Buchungsanfrage." },
  { number: "03", title: "Terminbestätigung", text: "Wir prüfen in unserem Kalender, ob der Termin bei uns noch passt, und bestätigen Ihnen die Buchung persönlich." },
  { number: "04", title: "Feiern & genießen", text: "Am bestätigten Termin kümmern wir uns um Grill, Salate, Geschirr und Cocktails – Sie um Ihre Gäste." },
];

const testimonials = [
  {
    quote:
      "Zum 30. Geburtstag hatten wir das Team von Balus Rodizio gebucht. 40 Personen, alle waren mega begeistert von Qualität und Service. Es war super!",
    name: "Felix",
    context: "30. Geburtstag · 40 Gäste",
  },
  {
    quote:
      "Service sowie Menge und Qualität des Essens waren bestens. Für 28 hungrige Gäste eine gelungene Veranstaltung – wir buchen wieder!",
    name: "Matthias Brand",
    context: "Firmenfeier · 28 Gäste",
  },
  {
    quote:
      "Uns wurde alles gut erklärt und geschmacklich war es sehr gut. Nette, zuvorkommende Angestellte – man merkt, dass ihr die Gastronomie lebt.",
    name: "Andrea Heuer",
    context: "Restaurantbesuch",
  },
];

export default async function Home() {
  const items = await getMenuItems();
  const featured = items.filter(
    (item) => item.category === "Komplett-Sparmenüs" && ["Menü C", "Menü D", "Menü E"].includes(item.name),
  );

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[720px] items-center overflow-hidden bg-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-grill.jpg" alt="Balus Rodizio Grillmeister mit Fleischspießen in Walsrode" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/75 to-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/50" />
        <div className="container-wide relative z-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold" /> Ab 25 Personen · 200 km Umkreis ab Walsrode
            </div>
            <h1 className="display-font text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Feiern, wie <span className="text-gold">Brasilien</span> schmeckt.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Rodizio-Catering, Partyservice und mobile Cocktailbar aus Walsrode für Hochzeit, Firmenfeier und
              Geburtstag im Umkreis von 200 km ab Walsrode. Catering ab 25 Personen, Menüs ab 20 € pro Person.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/buchungsanfragen" className="rounded-full bg-gold px-7 py-4 text-sm font-extrabold text-deep transition hover:bg-amber">
                Buchungsanfragen →
              </Link>
              <Link href="/speisekarte" className="rounded-full border border-white/40 px-7 py-4 text-sm font-extrabold text-white transition hover:border-gold hover:text-gold">
                Menüs & Preise ansehen
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/75">
              <span><span className="font-extrabold text-gold">4,4 ★</span> aus 349 Google-Bewertungen</span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span>Im Umkreis von 200 km ab Walsrode</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-deep/60 backdrop-blur">
          <div className="container-wide grid grid-cols-2 divide-x divide-white/10 py-5 text-center md:grid-cols-4">
            {[
              ["Ab 20 €", "pro Person"],
              ["25 – 5.000", "Personen möglich"],
              ["200 km", "Umkreis ab Walsrode"],
              ["365 Tage", "im Jahr"],
            ].map(([big, small]) => (
              <div key={big} className="px-2">
                <p className="display-font text-xl font-bold text-gold md:text-2xl">{big}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/60">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Was wir bieten</p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Alles für ein Fest, das bleibt.</h2>
            <p className="mt-4 text-ink/65">
              Vom Grillspieß bis zum letzten Cocktail: Wir liefern nicht nur Essen, sondern ein rundes
              Veranstaltungserlebnis – persönlich, zuverlässig und mit Liebe zum Detail.
            </p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="group overflow-hidden rounded-2xl bg-white card-shadow">
                <div className="relative h-60 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-deep/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-gold">
                    {service.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="display-font mb-2 text-2xl font-bold text-forest">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/65">{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENUS */}
      <section className="bg-[#f2eee2] py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Menüs & Preise</p>
              <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Unsere beliebtesten Menüs</h2>
              <p className="mt-4 text-ink/65">
                Komplett-Sparmenüs inklusive Teller & Besteck – oder Beispielmenüs und individuell zusammengestellte
                Menüs (ohne Geschirr, auf Wunsch für 2,50 € p. P. dazubuchbar). Alle Preise inklusive MwSt., gültig für
                2026.
              </p>
            </div>
            <Link href="/speisekarte" className="shrink-0 self-start rounded-full border-2 border-forest px-6 py-3 text-sm font-extrabold text-forest transition hover:bg-forest hover:text-white">
              Alle Menüs ansehen →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((item) => {
              const isTopChoice = item.badge === "Meistgewählt";
              return (
                <article
                  key={item.slug}
                  className={`flex flex-col overflow-hidden rounded-2xl bg-white card-shadow ${
                    isTopChoice ? "border-2 border-gold ring-2 ring-gold/40" : "border border-forest/10"
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image ?? "/images/hero-grill.jpg"}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {item.badge && (
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide shadow-sm ${
                          isTopChoice ? "bg-gold text-deep ring-2 ring-deep/20" : "bg-deep/85 text-gold"
                        }`}
                      >
                        {isTopChoice ? `★ ${item.badge}` : item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-leaf/60">{item.category}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <h3 className="display-font text-2xl font-bold text-forest">{item.name}</h3>
                      {isTopChoice && (
                        <span className="rounded-full bg-gold/35 px-2.5 py-0.5 text-[11px] font-extrabold uppercase text-forest">
                          Meistgewählt
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 line-clamp-4">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-4">
                      <span className="text-xl font-extrabold text-forest">
                        {formatPrice(item.priceCents)} <span className="text-xs font-normal text-ink/50">p. P.</span>
                      </span>
                      <Link
                        href={`/buchungsanfragen?item=${encodeURIComponent(item.name)}`}
                        className="text-sm font-bold text-leaf underline underline-offset-4 hover:text-forest"
                      >
                        Termin anfragen
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Hinweis Buffet & Traditionelles Rodizio */}
          <div className="mt-10 rounded-2xl border border-forest/15 bg-white p-6 card-shadow md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-leaf">
                Servier-Konzept · Buffet oder vom Spieß
              </p>
              <h3 className="display-font mt-1 text-2xl font-bold text-forest">
                Unsere Speisen als Buffet – Traditionelles Rodizio auf Wunsch (+ 5,00 € p. P.)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                Standardmäßig bieten wir unsere Speisen für Ihre Veranstaltung als reichhaltiges{" "}
                <strong className="font-bold text-forest">Buffet</strong> an. Sollten Sie ein{" "}
                <strong className="font-bold text-forest">Traditionelles Rodizio</strong> wünschen, bei dem das Fleisch
                frisch vom Spieß direkt auf die Teller Ihrer Gäste geschnitten wird, berechnen wir hierfür{" "}
                <strong className="font-bold text-forest">5,00 € Aufpreis pro Person</strong>.
              </p>
            </div>
            <Link
              href="/buchungsanfragen?item=Men%C3%BC%20C&rodizio=1"
              className="mt-5 inline-block shrink-0 rounded-full bg-forest px-6 py-3.5 text-xs font-extrabold text-gold transition hover:bg-leaf md:mt-0"
            >
              Mit Traditionellem Rodizio anfragen →
            </Link>
          </div>
        </div>
      </section>

      {/* COCKTAILS */}
      <section className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cocktail-machine.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-forest/95 to-forest/60" />
        <div className="container-wide relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Mobile Cocktails · 2 Optionen</p>
            <h2 className="display-font text-4xl font-bold leading-tight md:text-5xl">Cocktailmaschine oder Cocktail-Anhänger.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/75">
              Für Hochzeiten, Geburtstage, Straßenfeste und Firmenfeiern bieten wir zwei starke Möglichkeiten: unseren
              komplett ausgestatteten <strong className="font-bold text-white">mobilen Cocktail-Anhänger</strong> mit
              Barkeeper-Team oder unsere <strong className="font-bold text-white">mobile Cocktailmaschine</strong>.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-white/85">
              {[
                "Mobiler Cocktail-Anhänger inkl. Barkeeper, Spirituosen, Säften, Gläsern & Bar-Equipment",
                "Mobile Cocktailmaschine: 50 € Tagespreis + 100 Cocktails für 600 € (jeder weitere 5 €)",
                "Bartender bei der Cocktailmaschine 3 Stunden inklusive (Verlängerung 24,90 €/Std.)",
              ].map((line) => (
                <li key={line} className="flex gap-3"><span className="text-gold">✦</span>{line}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/mobile-cocktails" className="rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-deep transition hover:bg-amber">
                Beide Optionen ansehen →
              </Link>
              <Link
                href="/buchungsanfragen?item=550-mobiler-cocktail-anhaenger"
                className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-extrabold text-white transition hover:border-gold hover:text-gold"
              >
                Cocktail-Anhänger anfragen
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cocktail-anhaenger-04.jpg"
            alt="Mobiler Cocktail-Anhänger von Balus Rodizio"
            loading="lazy"
            className="h-[420px] w-full rounded-3xl object-cover shadow-2xl lg:h-[520px]"
          />
        </div>
      </section>

      {/* STEPS */}
      <section id="ablauf" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">In 4 Schritten</p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">So einfach geht&apos;s.</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/65">Von der ersten Idee bis zum letzten Spieß – wir begleiten Sie durch die gesamte Planung.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative rounded-2xl border border-forest/10 bg-white p-6 card-shadow">
                <span className="display-font text-4xl font-bold text-gold">{step.number}</span>
                <h3 className="display-font mt-3 text-xl font-bold text-forest">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.text}</p>
                {index < steps.length - 1 && <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-gold md:block">›</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-forest py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Gäste-Stimmen</p>
            <h2 className="display-font text-4xl font-bold text-white md:text-5xl">Das sagen unsere Gäste.</h2>
            <p className="mt-3 text-sm text-white/60">4,4 Sterne aus 349 Google-Bewertungen</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="mb-3 text-2xl text-gold">“</span>
                <blockquote className="flex-1 text-sm leading-relaxed text-white/85">{item.quote}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs text-white/50">{item.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Gut zu wissen</p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Häufige Fragen</h2>
          </div>
          <Faq />
          <p className="mt-8 text-center text-sm text-ink/60">
            Weitere Fragen? Rufen Sie uns an: <a href="tel:051619495396" className="font-bold text-forest underline underline-offset-4">05161 / 94 95 396</a>
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="scroll-mt-24 bg-[#f2eee2] py-20 md:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-leaf">Buchungsanfragen & Kontakt</p>
            <h2 className="display-font text-4xl font-bold text-forest md:text-5xl">Wunschtermin für Ihre Feier anfragen.</h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              Fragen Sie über das Formular Ihren Wunschtermin samt Menü unverbindlich an. Wir prüfen in unserem
              Kalender, ob der Termin bei uns noch passt, und bestätigen Ihnen die Buchung persönlich.
            </p>
            <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 card-shadow">
              <p className="text-sm"><span className="font-bold text-forest">Einsatzgebiet & Gästezahl:</span><br />Bis 200 km ab Walsrode · 25 bis 5.000 Personen<br /><span className="text-xs text-ink/65">Kilometer-/Ressourceneinsatz-Pauschale: bis 5 km kostenlos, ab 6 km 1,00 € je km (einfache Fahrt)</span></p>
              <p className="text-sm"><span className="font-bold text-forest">Adresse:</span><br />Silberweg 6, 29664 Walsrode</p>
              <p className="text-sm"><span className="font-bold text-forest">Telefon:</span><br /><a href="tel:051619495396" className="hover:underline">05161 / 94 95 396</a></p>
              <p className="text-sm"><span className="font-bold text-forest">E-Mail:</span><br /><a href="mailto:info@balus-rodizio.de" className="hover:underline">info@balus-rodizio.de</a></p>
              <p className="border-t border-forest/10 pt-4 text-xs text-ink/55">
                Öffnungszeiten: Di–Mi 09–13 & 15–20 Uhr, Do–Fr 09–13 Uhr. Auch nach Vereinbarung.
              </p>
            </div>
          </div>
          <InquiryForm items={items} />
        </div>
      </section>
    </>
  );
}
