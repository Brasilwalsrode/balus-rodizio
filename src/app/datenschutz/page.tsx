import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Balus Rodizio Walsrode",
  description:
    "Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO bei Balus Rodizio in Walsrode.",
};

const toc = [
  { href: "#ueberblick", label: "1. Datenschutz auf einen Blick" },
  { href: "#hosting", label: "2. Hosting & Bereitstellung" },
  { href: "#pflichtinformationen", label: "3. Allgemeine Hinweise & Pflichtinformationen" },
  { href: "#datenerfassung", label: "4. Datenerfassung auf dieser Website" },
  { href: "#plugins", label: "5. Plugins und Tools" },
];

export default function DatenschutzPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-forest/90 to-deep" />
        <div className="container-wide relative">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Rechtliches · DSGVO</p>
          <h1 className="display-font text-4xl font-bold text-white md:text-6xl">Datenschutzerklärung</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Informationen darüber, wie wir Ihre personenbezogenen Daten beim Besuch unserer Website und bei
            Catering-Anfragen verarbeiten und schützen.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12 rounded-2xl border border-forest/10 bg-white p-7 card-shadow md:p-10">
            {/* 1. Datenschutz auf einen Blick */}
            <section id="ueberblick" className="scroll-mt-24 space-y-5">
              <h2 className="display-font text-2xl font-bold text-forest md:text-3xl">
                1. Datenschutz auf einen Blick
              </h2>

              <div>
                <h3 className="text-base font-bold text-forest">Allgemeine Hinweise</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie der unter diesem Text
                  aufgeführten Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">
                  Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  finden Sie im Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung sowie im{" "}
                  <Link href="/impressum" className="font-semibold text-forest underline underline-offset-4">
                    Impressum
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Wie erfassen wir Ihre Daten?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, zum Beispiel über das
                  Anfrageformular oder per E-Mail und Telefon. Andere Daten werden automatisch oder nach Ihrer
                  Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische
                  Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Wofür nutzen wir Ihre Daten?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten nutzen wir, um Ihre Catering- oder Veranstaltungsanfrage zu bearbeiten, ein individuelles
                  Angebot zu erstellen und Ihre Veranstaltung zuverlässig durchzuführen.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                  Löschung dieser Daten zu verlangen. Eine erteilte Einwilligung können Sie jederzeit für die Zukunft
                  widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
                  Verarbeitung zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen
                  Aufsichtsbehörde zu.
                </p>
              </div>
            </section>

            {/* 2. Hosting */}
            <section id="hosting" className="scroll-mt-24 space-y-5 border-t border-forest/10 pt-10">
              <h2 className="display-font text-2xl font-bold text-forest md:text-3xl">
                2. Hosting & Bereitstellung
              </h2>
              <p className="text-sm leading-relaxed text-ink/80 md:text-base">
                Unsere Website wird bei einem externen Dienstleister gehostet. Wenn Sie unsere Website besuchen,
                verarbeitet die Infrastruktur personenbezogene Daten wie IP-Adressen, Seitenaufrufe und technische
                Angaben zu Ihrem Endgerät in Server-Logfiles. Der Einsatz erfolgt zum Zwecke der Vertragserfüllung
                gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) sowie im Interesse
                einer sicheren, schnellen und zuverlässigen Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f
                DSGVO).
              </p>
              <div>
                <h3 className="text-base font-bold text-forest">Auftragsverarbeitung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Soweit Dienstleister personenbezogene Daten in unserem Auftrag verarbeiten, erfolgt dies auf Grundlage
                  eines Vertrags über Auftragsverarbeitung gemäß Art. 28 DSGVO. Dadurch ist sichergestellt, dass die
                  personenbezogenen Daten unserer Websitebesucher ausschließlich nach unseren Weisungen und unter
                  Einhaltung der DSGVO verarbeitet werden.
                </p>
              </div>
            </section>

            {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
            <section id="pflichtinformationen" className="scroll-mt-24 space-y-5 border-t border-forest/10 pt-10">
              <h2 className="display-font text-2xl font-bold text-forest md:text-3xl">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>

              <div>
                <h3 className="text-base font-bold text-forest">Datenschutz</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wir weisen darauf hin, dass die
                  Datenübertragung im Internet (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
                  kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
              </div>

              <div className="rounded-xl border border-forest/15 bg-cream p-5">
                <h3 className="text-base font-bold text-forest">Hinweis zur verantwortlichen Stelle</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="mt-3 space-y-1 text-sm text-ink/85 md:text-base">
                  <p className="font-bold text-forest">Josué Kalsing · Balus Rodizio</p>
                  <p>Silberweg 6, 29664 Walsrode</p>
                  <p>
                    Telefon:{" "}
                    <a href="tel:051619495396" className="underline underline-offset-4 hover:text-leaf">
                      05161 / 94 95 3 96
                    </a>
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:info@balus-rodizio.de" className="underline underline-offset-4 hover:text-leaf">
                      info@balus-rodizio.de
                    </a>
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink/65">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
                  anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Speicherdauer</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre
                  personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                  berechtigtes Löschersuchen geltend machen oder eine Einwilligung widerrufen, werden Ihre Daten
                  gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben (z.&nbsp;B.
                  steuer- oder handelsrechtliche Aufbewahrungsfristen). In diesem Fall erfolgt die Löschung nach
                  Fortfall dieser Gründe.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Rechtsgrundlagen der Datenverarbeitung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre Daten auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art.
                  9 Abs. 1 DSGVO verarbeitet werden (z.&nbsp;B. freiwillige Angaben zu Allergien oder
                  Unverträglichkeiten). Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen
                  in Ihrem Endgerät eingewilligt haben, erfolgt die Verarbeitung zusätzlich auf Grundlage von § 25 Abs.
                  1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur
                  Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir sie auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO. Zur Erfüllung rechtlicher Verpflichtungen verarbeiten wir Daten auf Grundlage von
                  Art. 6 Abs. 1 lit. c DSGVO. Die Verarbeitung kann ferner auf Grundlage unseres berechtigten Interesses
                  nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Empfänger von personenbezogenen Daten</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Wir arbeiten mit externen Dienstleistern zusammen, etwa für Hosting, Kundenverwaltung und
                  E-Mail-Kommunikation. Dabei geben wir personenbezogene Daten nur weiter, wenn dies für die
                  Vertragserfüllung erforderlich ist, wir gesetzlich dazu verpflichtet sind, wir ein berechtigtes
                  Interesse haben oder eine andere Rechtsgrundlage besteht.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Datenübermittlung in Drittstaaten</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Soweit einzelne Dienstleister ihren Sitz in den USA haben, erfolgt eine etwaige Übermittlung auf
                  Grundlage des Angemessenheitsbeschlusses der EU-Kommission zum EU-US Data Privacy Framework, sofern
                  der Anbieter danach zertifiziert ist, oder auf Grundlage von Standardvertragsklauseln der
                  EU-Kommission.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                  eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
                  erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-forest bg-cream p-5">
                <h3 className="text-base font-bold text-forest">
                  Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21
                  DSGVO)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/85 md:text-sm">
                  WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE
                  JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
                  VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE
                  BESTIMMUNGEN GESTÜTZTES PROFILING. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
                  PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE
                  FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
                  VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH
                  NACH ART. 21 ABS. 1 DSGVO).
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink/85 md:text-sm">
                  WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS
                  RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM
                  ZWECKE DERARTIGER WERBUNG EINZULEGEN. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
                  ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2
                  DSGVO).
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">
                  Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu,
                  insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts
                  des mutmaßlichen Verstoßes. Für uns zuständig ist:{" "}
                  <span className="font-semibold text-forest">
                    Die Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover
                  </span>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Recht auf Datenübertragbarkeit</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                  automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
                  aushändigen zu lassen.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">
                  Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                  Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
                  der Datenverarbeitung sowie ein Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung
                  dieser Daten. Hierzu können Sie sich jederzeit unter den angegebenen Kontaktdaten an uns wenden.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">SSL- bzw. TLS-Verschlüsselung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
                  Beispiel Anfragen über das Kontaktformular, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
                  Verbindung erkennen Sie an „https://“ und dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </section>

            {/* 4. Datenerfassung auf dieser Website */}
            <section id="datenerfassung" className="scroll-mt-24 space-y-5 border-t border-forest/10 pt-10">
              <h2 className="display-font text-2xl font-bold text-forest md:text-3xl">
                4. Datenerfassung auf dieser Website
              </h2>

              <div>
                <h3 className="text-base font-bold text-forest">Cookies</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Technisch notwendige Cookies oder lokale Speichermechanismen setzen wir ausschließlich soweit
                  erforderlich auf Grundlage von § 25 Abs. 2 TDDDG und Art. 6 Abs. 1 lit. f DSGVO ein. Analyse- oder
                  Marketing-Cookies setzen wir derzeit nicht ein. Sollten wir künftig optionale Cookies verwenden,
                  geschieht dies nur mit Ihrer ausdrücklichen Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a
                  DSGVO), die Sie jederzeit widerrufen können.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Server-Logfiles</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Der Hosting-Anbieter erhebt und speichert automatisch Informationen in Server-Logfiles, die Ihr
                  Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des
                  zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit
                  anderen Datenquellen findet nicht statt. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
                  DSGVO.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Buchungsanfragen und Kundenverwaltung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Wenn Sie uns über das Formular „Buchungsanfragen“ einen Wunschtermin senden, speichern wir Ihre
                  Angaben (Name, E-Mail-Adresse, Telefonnummer, gewählte Menüs bzw. Leistungen, Anlass, Wunschtermin,
                  Uhrzeit, Gästezahl, Veranstaltungsort, Entfernung/Kilometerpauschale, Status der Terminprüfung sowie
                  Ihre Nachricht zu Wünschen oder Allergien) in unserer Datenbank, um die Verfügbarkeit des Termins zu
                  prüfen, Ihre Buchung zu bestätigen und Ihre Veranstaltung durchzuführen.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, da Ihre Anfrage der
                  Vorbereitung eines Vertrags dient, oder auf unserem berechtigten Interesse an der effizienten
                  Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Freiwillige Angaben zu Allergien oder
                  Unverträglichkeiten verarbeiten wir ausschließlich auf Grundlage Ihrer Einwilligung (Art. 9 Abs. 2
                  lit. a DSGVO), um Speisen entsprechend vorzubereiten. Die Daten verbleiben bei uns, bis Sie uns zur
                  Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck entfällt; gesetzliche
                  Aufbewahrungsfristen bleiben unberührt.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Anfrage per E-Mail oder Telefon</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Wenn Sie uns per E-Mail oder Telefon kontaktieren, speichern und verarbeiten wir Ihre Anfrage
                  inklusive der daraus hervorgehenden personenbezogenen Daten zur Bearbeitung Ihres Anliegens.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag zusammenhängt,
                  sonst Art. 6 Abs. 1 lit. f DSGVO. Die Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-forest">Bitte um eine Bewertung nach der Veranstaltung</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80 md:text-base">
                  Sofern Sie bei Ihrer Anfrage oder Buchung ausdrücklich eingewilligt haben, senden wir Ihnen nach Ihrer
                  Veranstaltung eine E-Mail mit der Bitte um eine Bewertung. Rechtsgrundlage ist Ihre Einwilligung (Art.
                  6 Abs. 1 lit. a DSGVO, § 7 Abs. 2 UWG), die Sie jederzeit widerrufen können.
                </p>
              </div>
            </section>

            {/* 5. Plugins und Tools */}
            <section id="plugins" className="scroll-mt-24 space-y-4 border-t border-forest/10 pt-10">
              <h2 className="display-font text-2xl font-bold text-forest md:text-3xl">5. Plugins und Tools</h2>
              <p className="text-sm leading-relaxed text-ink/80 md:text-base">
                Auf dieser Website setzen wir keine externen Analyse-Dienste, Tracking-Pixel oder automatisch nachladende
                Karten- und Video-Embeds ein. Externe Angebote (wie Routenplanung über Google Maps oder Instagram)
                werden ausschließlich über normale Links geöffnet, sodass erst beim aktiven Anklicken
                eine Verbindung zum jeweiligen Anbieter aufgebaut wird. Verwendete Systemschriften werden ohne Verbindung
                zu externen Schriftservern dargestellt.
              </p>
              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-ink/50">Stand: 2026</p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="Inhaltsverzeichnis Datenschutz"
              className="rounded-2xl border border-forest/10 bg-white p-6 card-shadow"
            >
              <h2 className="display-font text-lg font-bold text-forest">Inhalt</h2>
              <ul className="mt-4 space-y-2.5 text-sm font-medium text-ink/75">
                {toc.map((entry) => (
                  <li key={entry.href}>
                    <a href={entry.href} className="block transition hover:text-forest hover:underline">
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-2xl bg-forest p-6 text-white card-shadow">
              <h2 className="display-font text-lg font-bold text-gold">Fragen zum Datenschutz?</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                Wenden Sie sich jederzeit direkt an uns:
              </p>
              <p className="mt-3 text-sm font-bold text-white">Josué Kalsing · Balus Rodizio</p>
              <a href="mailto:info@balus-rodizio.de" className="mt-1 block text-sm text-gold hover:underline">
                info@balus-rodizio.de
              </a>
              <div className="mt-5 border-t border-white/15 pt-4 text-xs">
                <Link href="/impressum" className="font-bold text-white hover:text-gold">
                  → Zum Impressum
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
