"use client";

import { useMemo, useState } from "react";
import type { Inquiry } from "@/db/schema";
import { formatEuroCents, FREE_DISTANCE_KM } from "@/lib/travel-fee";

type StatusFilter = "alle" | "offen" | "bestaetigt" | "abgelehnt";

function formatGermanDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso || "Kein Datum angegeben";
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatCreatedAt(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function statusBadge(status: string) {
  if (status === "bestaetigt") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
        Termin bestätigt
      </span>
    );
  }
  if (status === "abgelehnt") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-extrabold text-red-700">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Termin nicht verfügbar / abgelehnt
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-900">
      <span className="h-2 w-2 rounded-full bg-amber-500" />
      Offen – Termin prüfen
    </span>
  );
}

function buildConfirmationMailto(item: Inquiry): string {
  const dateStr = formatGermanDate(item.eventDate);
  const timeSuffix = item.eventTime ? ` um ${item.eventTime} Uhr` : "";
  const subject = `Terminbestätigung – Ihre Buchungsanfrage am ${dateStr}${timeSuffix} bei Balus Rodizio`;
  const body = [
    `Hallo ${item.name},`,
    "",
    `vielen Dank für Ihre Buchungsanfrage bei Balus Rodizio!`,
    `Gute Nachrichten: Ihr Wunschtermin am ${dateStr}${timeSuffix} passt bei uns und wir bestätigen Ihnen den Termin gerne.`,
    "",
    `Zusammenfassung Ihrer Anfrage:`,
    `- Termin: ${dateStr}${timeSuffix}`,
    `- Anlass: ${item.eventType}`,
    `- Gästezahl: ${item.guests}`,
    `- Veranstaltungsort: ${item.eventLocation} (${item.distanceKm} km einfache Fahrt ab Walsrode)`,
    `- Kilometer- / Ressourceneinsatz-Pauschale: ${item.travelFeeCents === 0 ? "0,00 € (bis 5 km kostenlos)" : formatEuroCents(item.travelFeeCents)}`,
    `- Gewähltes Menü / Leistung: ${item.selectedMenu}`,
    "",
    `Bei Rückfragen erreichen Sie uns jederzeit unter 05161 / 94 95 396.`,
    "",
    `Herzliche Grüße`,
    `Ihr Team von Balus Rodizio Walsrode`,
  ].join("\n");
  return `mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildDeclineMailto(item: Inquiry): string {
  const dateStr = formatGermanDate(item.eventDate);
  const subject = `Rückmeldung zu Ihrer Buchungsanfrage am ${dateStr} – Balus Rodizio`;
  const body = [
    `Hallo ${item.name},`,
    "",
    `vielen Dank für Ihre Buchungsanfrage bei Balus Rodizio für den ${dateStr}.`,
    `Leider sind wir an diesem Termin bereits ausgebucht und können den Wunschtermin nicht mehr annehmen.`,
    `Falls für Ihre Feier auch ein Ausweichtermin infrage kommt, melden Sie sich sehr gerne telefonisch unter 05161 / 94 95 396 oder per Antwort auf diese E-Mail.`,
    "",
    `Herzliche Grüße`,
    `Ihr Team von Balus Rodizio Walsrode`,
  ].join("\n");
  return `mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function BookingsManager({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [entries, setEntries] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<StatusFilter>("alle");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<number, string>>(() =>
    Object.fromEntries(initialInquiries.map((entry) => [entry.id, entry.adminNote ?? ""])),
  );
  const [feedback, setFeedback] = useState<string>("");

  const counts = useMemo(() => {
    const summary = { alle: entries.length, offen: 0, bestaetigt: 0, abgelehnt: 0 };
    for (const item of entries) {
      if (item.status === "bestaetigt") summary.bestaetigt += 1;
      else if (item.status === "abgelehnt") summary.abgelehnt += 1;
      else summary.offen += 1;
    }
    return summary;
  }, [entries]);

  // Zählt bestätigte und offene Termine pro Datum, damit Überschneidungen sofort auffallen
  const dateStats = useMemo(() => {
    const map = new Map<string, { confirmed: number; open: number }>();
    for (const item of entries) {
      if (!item.eventDate) continue;
      const stat = map.get(item.eventDate) ?? { confirmed: 0, open: 0 };
      if (item.status === "bestaetigt") stat.confirmed += 1;
      else if (item.status !== "abgelehnt") stat.open += 1;
      map.set(item.eventDate, stat);
    }
    return map;
  }, [entries]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return entries.filter((item) => {
      const normalizedStatus = item.status === "bestaetigt" || item.status === "abgelehnt" ? item.status : "offen";
      if (filter !== "alle" && normalizedStatus !== filter) return false;
      if (!term) return true;
      const haystack = `${item.name} ${item.email} ${item.phone} ${item.eventDate} ${item.eventTime} ${item.eventLocation} ${item.eventType} ${item.selectedMenu} ${item.message}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [entries, filter, search]);

  async function updateEntry(id: number, patch: { status?: string; adminNote?: string }) {
    setBusyId(id);
    setFeedback("");
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Änderung fehlgeschlagen.");
      }
      setEntries((current) => current.map((item) => (item.id === id ? (result.inquiry as Inquiry) : item)));
      setFeedback(
        patch.status === "bestaetigt"
          ? `Anfrage #${id} wurde als „Termin bestätigt“ gespeichert.`
          : patch.status === "abgelehnt"
            ? `Anfrage #${id} wurde als „Abgelehnt“ markiert.`
            : `Anfrage #${id} wurde aktualisiert.`,
      );
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Fehler beim Speichern.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Kennzahlen */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-200 bg-white p-5 card-shadow">
          <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Offen (zu prüfen)</p>
          <p className="display-font mt-2 text-4xl font-bold text-forest">{counts.offen}</p>
          <p className="mt-1 text-xs text-ink/55">Warten auf Terminprüfung</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 card-shadow">
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Bestätigte Termine</p>
          <p className="display-font mt-2 text-4xl font-bold text-forest">{counts.bestaetigt}</p>
          <p className="mt-1 text-xs text-ink/55">Termin passt & zugesagt</p>
        </div>
        <div className="rounded-2xl border border-red-200 bg-white p-5 card-shadow">
          <p className="text-xs font-extrabold uppercase tracking-wider text-red-700">Abgelehnt / Belegt</p>
          <p className="display-font mt-2 text-4xl font-bold text-forest">{counts.abgelehnt}</p>
          <p className="mt-1 text-xs text-ink/55">Termin war nicht mehr frei</p>
        </div>
        <div className="rounded-2xl border border-forest/10 bg-white p-5 card-shadow">
          <p className="text-xs font-extrabold uppercase tracking-wider text-forest/70">Alle Buchungsanfragen</p>
          <p className="display-font mt-2 text-4xl font-bold text-forest">{counts.alle}</p>
          <p className="mt-1 text-xs text-ink/55">Gesamtübersicht</p>
        </div>
      </div>

      {/* Filter & Suche */}
      <div className="flex flex-col gap-4 rounded-2xl border border-forest/10 bg-white p-5 card-shadow md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["alle", `Alle (${counts.alle})`],
              ["offen", `Offen (${counts.offen})`],
              ["bestaetigt", `Bestätigt (${counts.bestaetigt})`],
              ["abgelehnt", `Abgelehnt (${counts.abgelehnt})`],
            ] as [StatusFilter, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                filter === key
                  ? "bg-forest text-gold"
                  : "border border-forest/15 bg-cream text-forest hover:border-forest/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Nach Datum, Name, Ort oder Menü suchen ..."
          className="w-full rounded-full border border-forest/20 bg-cream/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-leaf md:max-w-xs"
        />
      </div>

      {feedback && (
        <div className="rounded-xl border border-forest/20 bg-forest/5 px-4 py-3 text-sm font-semibold text-forest">
          {feedback}
        </div>
      )}

      {/* Liste der Buchungsanfragen */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-forest/10 bg-white p-12 text-center card-shadow">
          <p className="display-font text-2xl font-bold text-forest">Keine Buchungsanfragen in dieser Ansicht</p>
          <p className="mt-2 text-sm text-ink/60">
            Sobald Kunden über das Formular „Buchungsanfragen“ einen Wunschtermin senden, erscheinen die Einträge hier
            zur Bestätigung.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {visible.map((item) => {
            const stat = dateStats.get(item.eventDate);
            const otherConfirmed =
              stat && (item.status === "bestaetigt" ? stat.confirmed - 1 : stat.confirmed) > 0;
            const otherOpen = stat && (item.status === "offen" ? stat.open - 1 : stat.open) > 0;
            const noteVal = notesDraft[item.id] ?? "";

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-forest/10 bg-white p-6 card-shadow md:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-forest/10 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-leaf">
                        Anfrage #{item.id}
                      </span>
                      {statusBadge(item.status)}
                      {otherConfirmed && (
                        <span className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                          ⚠ Bereits bestätigter Termin an diesem Datum!
                        </span>
                      )}
                      {!otherConfirmed && otherOpen && (
                        <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">
                          Hinweis: Weitere offene Anfrage am selben Datum
                        </span>
                      )}
                    </div>
                    <h2 className="display-font mt-2 text-2xl font-bold text-forest">
                      Wunschtermin: {formatGermanDate(item.eventDate)}
                      {item.eventTime ? ` um ${item.eventTime} Uhr` : ""} · {item.eventType || "Veranstaltung"} (
                      {item.guests} Gäste)
                    </h2>
                    <p className="mt-1 text-xs text-ink/50">Eingegangen am {formatCreatedAt(item.createdAt)}</p>
                  </div>

                  {/* Schnell-Aktionen zur Terminbestätigung */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busyId === item.id || item.status === "bestaetigt"}
                      onClick={() => updateEntry(item.id, { status: "bestaetigt", adminNote: noteVal })}
                      className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-emerald-800 disabled:opacity-45"
                    >
                      ✓ Termin bestätigen
                    </button>
                    <button
                      type="button"
                      disabled={busyId === item.id || item.status === "abgelehnt"}
                      onClick={() => updateEntry(item.id, { status: "abgelehnt", adminNote: noteVal })}
                      className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-100 disabled:opacity-45"
                    >
                      ✕ Termin passt nicht / Ablehnen
                    </button>
                    {item.status !== "offen" && (
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => updateEntry(item.id, { status: "offen", adminNote: noteVal })}
                        className="rounded-full border border-forest/20 px-3.5 py-2 text-xs font-bold text-forest hover:bg-cream disabled:opacity-45"
                      >
                        ↺ Auf „Offen“ setzen
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <div className="rounded-xl bg-cream p-4 text-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-forest/70">Kunde & Kontakt</p>
                    <p className="mt-1.5 font-bold text-forest">{item.name}</p>
                    <p className="mt-1">
                      <a href={`tel:${item.phone}`} className="font-semibold text-leaf hover:underline">
                        {item.phone}
                      </a>
                    </p>
                    <p className="mt-0.5 break-all">
                      <a href={`mailto:${item.email}`} className="text-ink/80 underline hover:text-forest">
                        {item.email}
                      </a>
                    </p>
                  </div>

                  <div className="rounded-xl bg-cream p-4 text-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-forest/70">
                      Veranstaltungsort & Kilometerpauschale
                    </p>
                    <p className="mt-1.5 font-semibold text-forest">{item.eventLocation}</p>
                    <p className="mt-1.5 text-xs font-semibold text-leaf">
                      Einfache Fahrt: {item.distanceKm} km · Pauschale:{" "}
                      {item.travelFeeCents === 0
                        ? `0,00 € (bis ${FREE_DISTANCE_KM} km kostenlos)`
                        : `${formatEuroCents(item.travelFeeCents)} (${item.distanceKm - FREE_DISTANCE_KM} km × 1,00 €)`}
                    </p>
                    <p className="mt-1.5 text-xs text-ink/65">
                      Uhrzeit:{" "}
                      <span className="font-semibold text-ink">{item.eventTime ? `${item.eventTime} Uhr` : "–"}</span> ·
                      Anlass: <span className="font-semibold text-ink">{item.eventType}</span> · Gäste:{" "}
                      <span className="font-semibold text-ink">{item.guests}</span>
                    </p>
                  </div>

                  <div className="rounded-xl bg-cream p-4 text-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-forest/70">Gewähltes Menü / Leistung</p>
                    <p className="mt-1.5 font-semibold leading-relaxed text-forest">{item.selectedMenu}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-forest/10 bg-white p-4 text-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest/70">Nachricht & Wünsche</p>
                  <p className="mt-1.5 whitespace-pre-line leading-relaxed text-ink/80">{item.message}</p>
                </div>

                {/* Interne Notiz + E-Mail-Antwortvorlagen */}
                <div className="mt-4 flex flex-col gap-3 border-t border-forest/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={noteVal}
                      onChange={(event) =>
                        setNotesDraft((current) => ({ ...current, [item.id]: event.target.value }))
                      }
                      placeholder="Interne Notiz (z. B. Lieferzeit 17:30 Uhr, Rückruf erfolgt ...)"
                      className="flex-1 rounded-xl border border-forest/20 bg-cream/40 px-3.5 py-2 text-xs text-ink outline-none focus:border-leaf"
                    />
                    <button
                      type="button"
                      disabled={busyId === item.id || noteVal === (item.adminNote ?? "")}
                      onClick={() => updateEntry(item.id, { adminNote: noteVal })}
                      className="rounded-full border border-forest/25 px-4 py-2 text-xs font-bold text-forest transition hover:bg-forest hover:text-white disabled:opacity-40"
                    >
                      Notiz speichern
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <a
                      href={buildConfirmationMailto(item)}
                      className="rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-2 font-bold text-emerald-800 hover:bg-emerald-100"
                    >
                      ✉ Bestätigungs-E-Mail öffnen
                    </a>
                    <a
                      href={buildDeclineMailto(item)}
                      className="rounded-full border border-forest/20 px-3.5 py-2 font-bold text-ink/75 hover:bg-cream"
                    >
                      ✉ Absage-E-Mail öffnen
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
