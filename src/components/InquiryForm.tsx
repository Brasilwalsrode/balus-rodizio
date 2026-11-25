"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CUSTOM_BASE_PRICE_SLUG,
  formatPrice,
  getMeatSubgroup,
  isMeatItem,
  menuItems,
  MIN_CUSTOM_MEAT_COUNT,
  type MenuItem,
} from "@/data/menu";
import {
  calculateTravelFee,
  FREE_DISTANCE_KM,
  MAX_DISTANCE_KM,
  ORIGIN_ADDRESS,
} from "@/lib/travel-fee";

type Props = {
  items?: MenuItem[];
  initialItem?: string;
  initialMessage?: string;
  initialEventType?: string;
  initialRodizio?: boolean;
};

const TRADITIONAL_RODIZIO_SLUG = "237-traditionelles-rodizio-erlebnis-aufschlag-pro-person";
const GESCHIRR_SLUG = "270-geschirr-fur-hauptmenu";

const MEAT_SUBGROUPS = [
  "Alle",
  "Geflügel",
  "Schwein",
  "Rind & Kalb",
  "Lamm",
  "Bratwurst & Wurst",
  "Im Speckmantel",
] as const;

const GROUP_ORDER: { category: string; shortLabel: string; label: string }[] = [
  {
    category: "Komplett-Sparmenüs",
    shortLabel: "Sparmenüs",
    label: "Komplett-Sparmenüs (inkl. Salate, Dips, Brot & Geschirr)",
  },
  {
    category: "Beispielmenüs",
    shortLabel: "Beispielmenüs",
    label: "Beispielmenüs (ohne Geschirr – Geschirr optional dazubuchbar)",
  },
  {
    category: "Menü selber gestalten",
    shortLabel: "Individuelles Menü",
    label: "Individuelles Menü / Menü selber gestalten (mind. 3 Fleischsorten, ohne Geschirr)",
  },
  {
    category: "Mobile Cocktails",
    shortLabel: "Mobile Cocktails",
    label: "Mobile Cocktails: Cocktail-Anhänger & Cocktailmaschine",
  },
  {
    category: "Salate und Delikatessen",
    shortLabel: "Salate & Delikatessen",
    label: "Salate und Delikatessen",
  },
  {
    category: "Ausstattung, Verleih & Eventbedarf",
    shortLabel: "Ausstattung & Verleih",
    label: "Ausstattung, Verleih & Eventbedarf",
  },
  {
    category: "Einschulung",
    shortLabel: "Einschulung",
    label: "Einschulung",
  },
  {
    category: "Weitere Gerichte",
    shortLabel: "Extras",
    label: "Weitere Gerichte & Extras",
  },
];

const inputClass =
  "w-full rounded-xl border border-forest/20 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-leaf focus:ring-2 focus:ring-leaf/15";

function formatGermanDate(iso: string): string {
  if (!iso) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  return `${match[3]}.${match[2]}.${match[1]}`;
}

function resolveInitialSlugs(items: MenuItem[], initialItem: string): string[] {
  const parts = initialItem
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return [];

  const slugs: string[] = [];
  for (const part of parts) {
    const lower = part.toLowerCase();
    if (lower === "mobile cocktails") {
      const cocktailPkg = items.find((item) => item.name.includes("Cocktails Mindestabnahme"));
      if (cocktailPkg && !slugs.includes(cocktailPkg.slug)) slugs.push(cocktailPkg.slug);
      continue;
    }
    if (lower === "cocktail-anhänger" || lower === "cocktailanhaenger" || lower === "cocktailanhänger") {
      const trailer = items.find((item) => item.slug === "550-mobiler-cocktail-anhaenger");
      if (trailer && !slugs.includes(trailer.slug)) slugs.push(trailer.slug);
      continue;
    }
    if (lower === "individuelles menü" || lower === "menü selber gestalten") {
      if (!slugs.includes(CUSTOM_BASE_PRICE_SLUG)) slugs.push(CUSTOM_BASE_PRICE_SLUG);
      continue;
    }
    const exact = items.find(
      (item) => item.slug === part || item.name.toLowerCase() === lower,
    );
    if (exact && !slugs.includes(exact.slug)) {
      slugs.push(exact.slug);
      if (isMeatItem(exact) && !slugs.includes(CUSTOM_BASE_PRICE_SLUG)) {
        slugs.push(CUSTOM_BASE_PRICE_SLUG);
      }
    }
  }
  return slugs;
}

type SubmittedSummary = {
  id?: number;
  selectedMenu: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  guests: string;
  eventLocation: string;
  distanceKm: number;
  travelFeeCents: number;
  name: string;
  email: string;
  phone: string;
};

export default function InquiryForm({
  items = menuItems,
  initialItem = "",
  initialMessage = "",
  initialEventType = "",
  initialRodizio = false,
}: Props) {
  const initialSlugs = useMemo(() => {
    const resolved = resolveInitialSlugs(items, initialItem);
    if (initialRodizio && !resolved.includes(TRADITIONAL_RODIZIO_SLUG)) {
      resolved.push(TRADITIONAL_RODIZIO_SLUG);
    }
    return resolved;
  }, [items, initialItem, initialRodizio]);

  // Echte Mehrfachauswahl für „Menü / Leistung auswählen *“
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(initialSlugs);
  const [selectorCategory, setSelectorCategory] = useState<string>(() => {
    if (initialSlugs.includes(CUSTOM_BASE_PRICE_SLUG)) return "Individuelles Menü";
    if (initialSlugs.length > 0) {
      const first = items.find((item) => item.slug === initialSlugs[0]);
      if (first) return first.category === "Menü selber gestalten" ? "Individuelles Menü" : first.category;
    }
    return "Komplett-Sparmenüs";
  });
  const [meatSubgroupFilter, setMeatSubgroupFilter] = useState<(typeof MEAT_SUBGROUPS)[number]>("Alle");
  const [selectorQuery, setSelectorQuery] = useState("");
  const [dropdownAddSlug, setDropdownAddSlug] = useState("");

  const [form, setForm] = useState({
    eventType: initialEventType,
    eventDate: "",
    eventTime: "",
    guests: "",
    eventLocation: "",
    distanceKm: "",
    name: "",
    email: "",
    phone: "",
    message: initialMessage,
  });

  const [distanceState, setDistanceState] = useState<{
    status: "idle" | "loading" | "resolved" | "manual" | "error";
    matchedAddress?: string;
    note?: string;
  }>({ status: "idle" });
  const lastLookedUpRef = useRef<string>("");

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedSummary | null>(null);

  const itemBySlug = useMemo(() => new Map(items.map((item) => [item.slug, item])), [items]);

  const allMeatItems = useMemo(() => items.filter((item) => isMeatItem(item)), [items]);

  const nonMeatCustomItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.category === "Menü selber gestalten" &&
          item.slug !== CUSTOM_BASE_PRICE_SLUG &&
          !isMeatItem(item),
      ),
    [items],
  );

  const groupedOptions = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        ...group,
        items: items.filter((item) => item.category === group.category),
      })).filter((group) => group.items.length > 0),
    [items],
  );

  const selectedItems = useMemo(
    () =>
      selectedSlugs
        .map((slug) => itemBySlug.get(slug))
        .filter((item): item is MenuItem => Boolean(item)),
    [selectedSlugs, itemBySlug],
  );

  const selectedMeatItems = useMemo(
    () => selectedItems.filter((item) => isMeatItem(item)),
    [selectedItems],
  );

  const hasCompletePresetMenu = useMemo(
    () =>
      selectedItems.some(
        (item) =>
          item.category === "Komplett-Sparmenüs" ||
          item.category === "Beispielmenüs" ||
          item.category === "Einschulung",
      ),
    [selectedItems],
  );

  // Individuelles Menü ist aktiv, wenn der Grundpreis „Individuelles Menü“ gewählt wurde
  // ODER wenn Fleischsorten aus „Menü selber gestalten“ ohne fertiges Komplett-/Beispielmenü gewählt wurden
  const isCustomMenuSelected = useMemo(
    () =>
      selectedSlugs.includes(CUSTOM_BASE_PRICE_SLUG) ||
      (!hasCompletePresetMenu && selectedMeatItems.length > 0),
    [selectedSlugs, hasCompletePresetMenu, selectedMeatItems.length],
  );

  const remainingMeatNeeded = isCustomMenuSelected
    ? Math.max(0, MIN_CUSTOM_MEAT_COUNT - selectedMeatItems.length)
    : 0;

  const combinedMenuSummary = useMemo(() => {
    const parts: string[] = [];
    for (const item of selectedItems) {
      parts.push(`${item.name} (${formatPrice(item.priceCents)}${item.priceUnit ? ` ${item.priceUnit}` : ""})`);
    }
    return parts.join(" + ");
  }, [selectedItems]);

  const hasMenuWithoutGeschirr = useMemo(
    () =>
      isCustomMenuSelected ||
      selectedItems.some(
        (item) => item.category === "Beispielmenüs" || item.category === "Menü selber gestalten",
      ),
    [isCustomMenuSelected, selectedItems],
  );

  const hasAllMenusWithGeschirr = useMemo(
    () =>
      selectedItems.length > 0 &&
      !hasMenuWithoutGeschirr &&
      selectedItems.some(
        (item) => item.category === "Komplett-Sparmenüs" || item.category === "Einschulung",
      ),
    [selectedItems, hasMenuWithoutGeschirr],
  );

  const travelBreakdown = useMemo(() => {
    const trimmed = form.distanceKm.trim();
    if (trimmed === "") return null;
    const numeric = Number(trimmed);
    if (!Number.isFinite(numeric) || numeric < 0) return null;
    return calculateTravelFee(numeric);
  }, [form.distanceKm]);

  const estimatedMenuCents = useMemo(() => {
    const guestsNum = Number(form.guests);
    if (selectedItems.length === 0) return null;
    let total = 0;
    let hasCalculable = false;
    for (const item of selectedItems) {
      if (item.priceCents === null) continue;
      if (item.priceUnit === "pro Person") {
        if (Number.isFinite(guestsNum) && guestsNum >= 1) {
          total += item.priceCents * guestsNum;
          hasCalculable = true;
        }
      } else {
        total += item.priceCents;
        hasCalculable = true;
      }
    }
    return hasCalculable ? total : null;
  }, [form.guests, selectedItems]);

  const estimatedGrandTotalCents = useMemo(() => {
    if (estimatedMenuCents === null && !travelBreakdown) return null;
    return (estimatedMenuCents ?? 0) + (travelBreakdown?.feeCents ?? 0);
  }, [estimatedMenuCents, travelBreakdown]);

  const filteredMeatItems = useMemo(() => {
    const term = selectorQuery.trim().toLowerCase();
    return allMeatItems.filter((item) => {
      if (meatSubgroupFilter !== "Alle" && getMeatSubgroup(item.name) !== meatSubgroupFilter) return false;
      if (!term) return true;
      return `${item.name} ${item.description}`.toLowerCase().includes(term);
    });
  }, [allMeatItems, meatSubgroupFilter, selectorQuery]);

  const visibleSelectorGroups = useMemo(() => {
    const term = selectorQuery.trim().toLowerCase();
    if (term === "" && selectorCategory === "Individuelles Menü") {
      return [
        {
          category: "Menü selber gestalten",
          shortLabel: "Weitere Komponenten",
          label: "Optional: Vorspeisen, Gemüse, Käse, Beilagen & Desserts zum Individuellen Menü",
          items: nonMeatCustomItems,
        },
      ];
    }
    return groupedOptions
      .filter((group) => term !== "" || selectorCategory === "Alle" || group.category === selectorCategory)
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!term) return true;
          return `${item.name} ${item.description}`.toLowerCase().includes(term);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [groupedOptions, nonMeatCustomItems, selectorCategory, selectorQuery]);

  async function lookupDistanceForAddress(rawAddress: string): Promise<number | null> {
    const trimmed = rawAddress.trim();
    if (trimmed.length < 4) return null;
    lastLookedUpRef.current = trimmed;
    setDistanceState({ status: "loading" });
    try {
      const response = await fetch(`/api/distance?address=${encodeURIComponent(trimmed)}`);
      const result = await response.json();
      if (!response.ok || !result.ok || typeof result.distanceKm !== "number") {
        setDistanceState({
          status: "error",
          note:
            result.error ??
            "Entfernung konnte nicht automatisch ermittelt werden – bitte Kilometer (einfache Fahrt) direkt eintragen.",
        });
        return null;
      }
      setForm((current) => ({ ...current, distanceKm: String(result.distanceKm) }));
      setDistanceState({
        status: "resolved",
        matchedAddress: result.matchedAddress,
        note:
          result.source === "route"
            ? "Fahrtstrecke ab Walsrode automatisch berechnet"
            : "Entfernung ab Walsrode geschätzt",
      });
      return result.distanceKm as number;
    } catch {
      setDistanceState({
        status: "error",
        note: "Bitte tragen Sie die Entfernung ab Walsrode (einfache Fahrt in km) direkt ein.",
      });
      return null;
    }
  }

  useEffect(() => {
    const trimmed = form.eventLocation.trim();
    if (trimmed.length < 5 || trimmed === lastLookedUpRef.current) return;
    const timer = setTimeout(() => {
      void lookupDistanceForAddress(trimmed);
    }, 850);
    return () => clearTimeout(timer);
  }, [form.eventLocation]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleCustomMenuMode() {
    if (selectedSlugs.includes(CUSTOM_BASE_PRICE_SLUG)) {
      // Individuelles Menü samt gewählter Fleischsorten abwählen, falls kein Komplettmenü aktiv ist
      const meatSlugSet = new Set(allMeatItems.map((m) => m.slug));
      setSelectedSlugs((current) =>
        current.filter((slug) => slug !== CUSTOM_BASE_PRICE_SLUG && (hasCompletePresetMenu || !meatSlugSet.has(slug))),
      );
    } else {
      setSelectedSlugs((current) => [...current, CUSTOM_BASE_PRICE_SLUG]);
      setSelectorCategory("Individuelles Menü");
    }
  }

  function toggleSelection(slug: string) {
    if (slug === CUSTOM_BASE_PRICE_SLUG) {
      toggleCustomMenuMode();
      return;
    }
    const target = itemBySlug.get(slug);
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((entry) => entry !== slug);
      }
      const next = [...current, slug];
      // Wenn der Kunde im Reiter „Individuelles Menü“ ohne Komplettmenü eine Fleischsorte anklickt,
      // wird der Grundpreis für das Individuelle Menü (10,00 € p. P.) automatisch mit aktiviert
      if (
        target &&
        isMeatItem(target) &&
        !hasCompletePresetMenu &&
        !next.includes(CUSTOM_BASE_PRICE_SLUG)
      ) {
        return [CUSTOM_BASE_PRICE_SLUG, ...next];
      }
      return next;
    });
  }

  function addSelectionFromDropdown(slug: string) {
    if (!slug) return;
    if (slug === CUSTOM_BASE_PRICE_SLUG) {
      if (!selectedSlugs.includes(CUSTOM_BASE_PRICE_SLUG)) {
        setSelectedSlugs((current) => [...current, CUSTOM_BASE_PRICE_SLUG]);
      }
      setSelectorCategory("Individuelles Menü");
      setDropdownAddSlug("");
      return;
    }
    toggleSelection(slug);
    setDropdownAddSlug("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    if (selectedSlugs.length === 0) {
      setStatus("error");
      setError("Bitte wählen Sie unter „Menü / Leistung auswählen *“ mindestens eine Option aus.");
      return;
    }

    if (isCustomMenuSelected && selectedMeatItems.length < MIN_CUSTOM_MEAT_COUNT) {
      setStatus("error");
      setSelectorCategory("Individuelles Menü");
      setError(
        `Wenn Sie „Individuelles Menü“ auswählen, müssen Sie mindestens ${MIN_CUSTOM_MEAT_COUNT} Fleischsorten auswählen (aktuell ausgewählt: ${selectedMeatItems.length}).`,
      );
      return;
    }

    let distanceValue = form.distanceKm.trim();
    if (distanceValue === "" && form.eventLocation.trim().length >= 4) {
      const resolved = await lookupDistanceForAddress(form.eventLocation);
      if (resolved !== null) {
        distanceValue = String(resolved);
      }
    }

    const numericDistance = Number(distanceValue);
    if (distanceValue === "" || !Number.isFinite(numericDistance) || numericDistance < 0) {
      setStatus("error");
      setError("Bitte geben Sie die einfache Entfernung ab Walsrode in Kilometern an (0–200 km).");
      return;
    }
    if (numericDistance > MAX_DISTANCE_KM) {
      setStatus("error");
      setError(
        `Der Veranstaltungsort liegt mit ${Math.round(numericDistance)} km außerhalb unseres Liefergebiets von maximal ${MAX_DISTANCE_KM} km ab Walsrode.`,
      );
      return;
    }

    const breakdown = calculateTravelFee(numericDistance);
    const payload = {
      ...form,
      distanceKm: breakdown.distanceKm,
      selectedMenu: combinedMenuSummary,
      selectedSlugs,
      isCustomMenu: isCustomMenuSelected,
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Bitte überprüfen Sie Ihre Eingaben.");
      }
      setSubmitted({
        id: typeof result.id === "number" ? result.id : undefined,
        selectedMenu: payload.selectedMenu,
        eventType: form.eventType,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        guests: form.guests,
        eventLocation: form.eventLocation,
        distanceKm: breakdown.distanceKm,
        travelFeeCents: breakdown.feeCents,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      setStatus("done");
      setSelectedSlugs([]);
      setSelectorQuery("");
      setDropdownAddSlug("");
      setDistanceState({ status: "idle" });
      lastLookedUpRef.current = "";
      setForm({
        eventType: "",
        eventDate: "",
        eventTime: "",
        guests: "",
        eventLocation: "",
        distanceKm: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bitte versuchen Sie es später erneut.");
    }
  }

  if (status === "done" && submitted) {
    return (
      <div className="rounded-2xl border border-leaf/20 bg-white p-8 card-shadow md:p-10">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl font-black text-deep">
          ✓
        </div>
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-extrabold text-amber-900">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Terminprüfung ausstehend {submitted.id ? `· Anfrage #${submitted.id}` : ""}
          </span>
        </div>
        <h3 className="display-font text-center text-2xl font-bold text-forest md:text-3xl">
          Vielen Dank für Ihre Buchungsanfrage!
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-ink/75">
          Ihre Terminanfrage für den{" "}
          <span className="font-bold text-forest">
            {formatGermanDate(submitted.eventDate)} um {submitted.eventTime} Uhr
          </span>{" "}
          ist bei uns eingegangen. Wir prüfen jetzt in unserem Kalender, ob der Termin bei uns noch passt, und melden
          uns zeitnah telefonisch oder per E-Mail mit unserer{" "}
          <span className="font-bold text-forest">Terminbestätigung</span> bei Ihnen.
        </p>

        <dl className="mt-6 divide-y divide-forest/10 rounded-xl border border-forest/10 bg-cream p-5 text-sm">
          <div className="flex flex-col gap-1 pb-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Status</dt>
            <dd className="font-semibold text-amber-800">Wartet auf Terminbestätigung durch Balus Rodizio</dd>
          </div>
          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Angefragter Termin, Uhrzeit & Anlass</dt>
            <dd className="text-ink/80">
              {formatGermanDate(submitted.eventDate)} um {submitted.eventTime} Uhr · {submitted.eventType} (
              {submitted.guests} Gäste)
            </dd>
          </div>
          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Gewählte Menüs / Leistungen</dt>
            <dd className="text-ink/80 sm:max-w-xs sm:text-right">{submitted.selectedMenu}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Veranstaltungsort & Strecke</dt>
            <dd className="text-ink/80 sm:max-w-xs sm:text-right">
              {submitted.eventLocation} ({submitted.distanceKm} km einfache Fahrt ab Walsrode)
            </dd>
          </div>
          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Kilometer- / Ressourceneinsatz-Pauschale</dt>
            <dd className="font-semibold text-forest sm:text-right">
              {submitted.travelFeeCents === 0
                ? `${formatPrice(0)} (bis ${FREE_DISTANCE_KM} km kostenlos)`
                : `${formatPrice(submitted.travelFeeCents)} (${submitted.distanceKm - FREE_DISTANCE_KM} km × 1,00 €, erste ${FREE_DISTANCE_KM} km kostenlos)`}
            </dd>
          </div>
          <div className="flex flex-col gap-1 pt-3 sm:flex-row sm:justify-between">
            <dt className="font-bold text-forest">Kontakt</dt>
            <dd className="text-ink/80 sm:text-right">
              {submitted.name} · {submitted.phone}
            </dd>
          </div>
        </dl>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-full border border-forest/25 px-6 py-2.5 text-sm font-bold text-forest transition hover:bg-forest hover:text-white"
          >
            Weitere Buchungsanfrage stellen
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-forest/10 bg-white p-6 card-shadow md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-forest/10 pb-4">
        <h3 className="display-font text-2xl font-bold text-forest">Buchungsanfragen</h3>
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-forest">
          Alle Felder mit * sind Pflichtfelder
        </span>
      </div>

      {/* Hinweis auf Terminprüfung, Personenspanne (25–5.000) & 200-km-Umkreis */}
      <div className="mb-5 rounded-xl border border-forest/15 bg-forest/5 px-4 py-3.5 text-xs leading-relaxed text-ink/80">
        <span className="font-extrabold text-forest">Termin anfragen – Bestätigung durch uns:</span> Wir bieten unser
        Catering für <strong className="font-bold text-forest">25 bis 5.000 Personen</strong> im{" "}
        <strong className="font-bold text-forest">Umkreis von 200 km ab Walsrode</strong> an. Mit diesem Formular fragen
        Sie Ihren Wunschtermin samt Uhrzeit unverbindlich an – wir prüfen in unserem Kalender, ob der Termin noch passt,
        und bestätigen Ihnen die Buchung persönlich.
      </div>

      {/* 1. Menü / Leistung auswählen * (Mehrfachauswahl möglich) */}
      <fieldset className="rounded-2xl border border-forest/15 bg-cream/70 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <legend className="text-xs font-bold uppercase tracking-wider text-forest">
            Menü / Leistung auswählen *{" "}
            <span className="font-semibold normal-case text-leaf">(Mehrfachauswahl möglich)</span>
          </legend>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${
              selectedSlugs.length > 0 && remainingMeatNeeded === 0
                ? "bg-forest text-gold"
                : "border border-amber-300 bg-amber-50 text-amber-900"
            }`}
          >
            {selectedSlugs.length === 0
              ? "Mindestens 1 Option wählen *"
              : remainingMeatNeeded > 0
                ? `Individuelles Menü: noch ${remainingMeatNeeded} Fleischsorte${remainingMeatNeeded === 1 ? "" : "n"} wählen *`
                : `${selectedSlugs.length} ${selectedSlugs.length === 1 ? "Option" : "Optionen"} ausgewählt`}
          </span>
        </div>

        <p className="mt-1.5 text-xs text-ink/65">
          Wählen Sie beliebig viele Sparmenüs, Beispielmenüs, Cocktails oder Salate aus – oder stellen Sie sich ein{" "}
          <strong className="text-forest">Individuelles Menü (mindestens {MIN_CUSTOM_MEAT_COUNT} Fleischsorten Pflicht)</strong>{" "}
          selbst zusammen.
        </p>

        {/* Direkt-Schalter: Individuelles Menü zusammenstellen */}
        <div
          className={`mt-3 rounded-xl border p-3.5 transition ${
            isCustomMenuSelected
              ? remainingMeatNeeded > 0
                ? "border-2 border-amber-400 bg-amber-50/80"
                : "border-2 border-forest bg-white"
              : "border-forest/15 bg-white"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={isCustomMenuSelected}
                onChange={toggleCustomMenuMode}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest/35 accent-[#14361f]"
              />
              <div>
                <span className="text-xs font-extrabold text-forest">
                  Individuelles Menü selbst zusammenstellen (Grundpreis 10,00 € p. P. + mind. {MIN_CUSTOM_MEAT_COUNT}{" "}
                  Fleischsorten Pflicht)
                </span>
                <p className="mt-0.5 text-[11px] text-ink/65">
                  Wenn Sie ein Individuelles Menü auswählen, müssen mindestens {MIN_CUSTOM_MEAT_COUNT} Fleischsorten
                  ausgewählt werden.
                </p>
              </div>
            </label>

            {isCustomMenuSelected && (
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                  selectedMeatItems.length >= MIN_CUSTOM_MEAT_COUNT
                    ? "bg-emerald-700 text-white"
                    : "bg-amber-500 text-deep"
                }`}
              >
                {selectedMeatItems.length >= MIN_CUSTOM_MEAT_COUNT
                  ? `✓ ${selectedMeatItems.length} Fleischsorten gewählt`
                  : `${selectedMeatItems.length} / ${MIN_CUSTOM_MEAT_COUNT} Fleischsorten gewählt *`}
              </span>
            )}
          </div>
        </div>

        {/* Aktuell ausgewählte Optionen als übersichtliche Chips */}
        {selectedSlugs.length > 0 && (
          <div className="mt-3 rounded-xl border border-forest/15 bg-white p-3.5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-forest/75">
                Ihre aktuelle Auswahl ({selectedSlugs.length}):
              </p>
              <button
                type="button"
                onClick={() => setSelectedSlugs([])}
                className="text-[11px] font-bold text-ink/50 underline hover:text-red-700"
              >
                Auswahl zurücksetzen
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item) => {
                const meat = isMeatItem(item);
                return (
                  <span
                    key={item.slug}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${
                      meat
                        ? "border-emerald-300 bg-emerald-50 text-forest"
                        : "border-forest/25 bg-cream text-forest"
                    }`}
                  >
                    <span>
                      {item.badge === "Meistgewählt" ? "★ " : meat ? "🥩 " : ""}
                      {item.name}{" "}
                      <span className="font-normal text-ink/65">
                        ({formatPrice(item.priceCents)}
                        {item.priceUnit ? ` ${item.priceUnit}` : ""})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSelection(item.slug)}
                      aria-label={`${item.name} abwählen`}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-forest/15 text-forest hover:bg-forest hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Pflicht-Auswahlblock für mindestens 3 Fleischsorten bei Individuellem Menü */}
        {(isCustomMenuSelected || selectorCategory === "Individuelles Menü") && (
          <div className="mt-3 rounded-xl border-2 border-forest/25 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-forest">
                  Fleischsorten für Ihr Individuelles Menü auswählen (mindestens {MIN_CUSTOM_MEAT_COUNT} Pflicht) *
                </h4>
                <p className="mt-0.5 text-[11px] text-ink/65">
                  Wählen Sie mindestens {MIN_CUSTOM_MEAT_COUNT} Fleischsorten aus unseren 42 Grill-Spezialitäten
                  (aktuell: <strong className="text-forest">{selectedMeatItems.length}</strong> ausgewählt).
                </p>
              </div>
              {remainingMeatNeeded > 0 ? (
                <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold text-red-700">
                  Noch {remainingMeatNeeded} Fleischsorte{remainingMeatNeeded === 1 ? "" : "n"} erforderlich *
                </span>
              ) : (
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-800">
                  ✓ Mindestanzahl ({MIN_CUSTOM_MEAT_COUNT} Fleischsorten) erfüllt
                </span>
              )}
            </div>

            {/* Untergruppen-Filter für die Fleischsorten */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {MEAT_SUBGROUPS.map((sub) => {
                const countInSub =
                  sub === "Alle"
                    ? allMeatItems.length
                    : allMeatItems.filter((m) => getMeatSubgroup(m.name) === sub).length;
                const chosenInSub =
                  sub === "Alle"
                    ? selectedMeatItems.length
                    : selectedMeatItems.filter((m) => getMeatSubgroup(m.name) === sub).length;
                const activeSub = meatSubgroupFilter === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setMeatSubgroupFilter(sub)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                      activeSub
                        ? "bg-forest text-gold"
                        : "border border-forest/15 bg-cream text-forest hover:border-forest/40"
                    }`}
                  >
                    {sub} ({countInSub}){chosenInSub > 0 ? ` · ✓ ${chosenInSub}` : ""}
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 max-h-60 divide-y divide-forest/10 overflow-y-auto rounded-lg border border-forest/10 p-2">
              {filteredMeatItems.map((meat) => {
                const checked = selectedSlugs.includes(meat.slug);
                return (
                  <label
                    key={meat.slug}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition ${
                      checked ? "bg-gold/25" : "hover:bg-cream/70"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelection(meat.slug)}
                        className="h-4 w-4 shrink-0 rounded border-forest/35 accent-[#14361f]"
                      />
                      <div className="min-w-0">
                        <span className="block truncate text-xs font-bold text-forest">{meat.name}</span>
                        <span className="text-[10px] text-ink/55">{getMeatSubgroup(meat.name)}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-extrabold text-forest">
                      {formatPrice(meat.priceCents)}{" "}
                      <span className="text-[10px] font-normal text-ink/55">{meat.priceUnit ?? ""}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Schnell-Dropdown zum Hinzufügen weiterer Optionen + Suchfeld */}
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <select
            aria-label="Menü oder Leistung schnell hinzufügen"
            value={dropdownAddSlug}
            onChange={(event) => addSelectionFromDropdown(event.target.value)}
            className="rounded-xl border border-forest/20 bg-white px-3.5 py-2.5 text-xs font-semibold text-forest outline-none focus:border-leaf"
          >
            <option value="">+ Schnell aus Gesamtliste hinzufügen ...</option>
            <optgroup label="Individuelles Menü (mind. 3 Fleischsorten Pflicht)">
              <option value={CUSTOM_BASE_PRICE_SLUG}>
                {isCustomMenuSelected ? "✓ " : ""}
                Individuelles Menü selbst zusammenstellen — 10,00 € Grundpreis p. P. + mind. 3 Fleischsorten
              </option>
            </optgroup>
            {groupedOptions.map((group) => (
              <optgroup key={group.category} label={group.label}>
                {group.items.map((item) => {
                  const already = selectedSlugs.includes(item.slug);
                  const badge =
                    item.badge === "Meistgewählt"
                      ? " (★ Meistgewählt)"
                      : item.badge
                        ? ` (${item.badge})`
                        : "";
                  return (
                    <option key={item.slug} value={item.slug}>
                      {already ? "✓ " : ""}
                      {item.name}
                      {badge} — {formatPrice(item.priceCents)}
                      {item.priceUnit ? ` ${item.priceUnit}` : ""}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>

          <input
            type="search"
            aria-label="Menüs und Leistungen durchsuchen"
            value={selectorQuery}
            onChange={(event) => setSelectorQuery(event.target.value)}
            placeholder="In allen Menüs, Fleischsorten & Extras suchen ..."
            className="rounded-xl border border-forest/20 bg-white px-3.5 py-2.5 text-xs text-ink outline-none placeholder:text-ink/40 focus:border-leaf"
          />
        </div>

        {/* Kategorie-Reiter für die Mehrfachauswahl */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1.5">
          {[
            { key: "Komplett-Sparmenüs", label: "Sparmenüs" },
            { key: "Beispielmenüs", label: "Beispielmenüs" },
            { key: "Individuelles Menü", label: "Individuelles Menü" },
            { key: "Mobile Cocktails", label: "Mobile Cocktails" },
            { key: "Salate und Delikatessen", label: "Salate & Dips" },
            { key: "Ausstattung, Verleih & Eventbedarf", label: "Geschirr & Verleih" },
            { key: "Einschulung", label: "Einschulung" },
            { key: "Weitere Gerichte", label: "Extras" },
            { key: "Alle", label: "Alle anzeigen" },
          ].map((tab) => {
            const activeTab = selectorQuery.trim() === "" && selectorCategory === tab.key;
            const selectedInTab =
              tab.key === "Alle"
                ? selectedItems.length
                : tab.key === "Individuelles Menü"
                  ? selectedItems.filter((item) => item.category === "Menü selber gestalten").length
                  : selectedItems.filter((item) => item.category === tab.key).length;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setSelectorQuery("");
                  setSelectorCategory(tab.key);
                }}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition ${
                  activeTab
                    ? "bg-forest text-gold"
                    : "border border-forest/15 bg-white text-forest hover:border-forest/40"
                }`}
              >
                {tab.label}
                {selectedInTab > 0 ? ` (${selectedInTab})` : ""}
              </button>
            );
          })}
        </div>

        {/* Checkbox-Mehrfachauswahl-Liste */}
        <div className="mt-2.5 max-h-72 space-y-3 overflow-y-auto rounded-xl border border-forest/15 bg-white p-3">
          {visibleSelectorGroups.map((group) => (
            <div key={group.category}>
              {(selectorCategory === "Alle" ||
                selectorCategory === "Individuelles Menü" ||
                selectorQuery.trim() !== "") && (
                <p className="mb-1.5 border-b border-forest/10 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-leaf">
                  {group.label}
                </p>
              )}
              <div className="divide-y divide-forest/10">
                {group.items.map((item) => {
                  const checked = selectedSlugs.includes(item.slug);
                  const isTopChoice = item.badge === "Meistgewählt";
                  return (
                    <label
                      key={item.slug}
                      className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg px-2.5 py-2.5 transition ${
                        checked ? "bg-gold/20" : "hover:bg-cream/70"
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSelection(item.slug)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest/35 accent-[#14361f]"
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-forest">{item.name}</span>
                            {item.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                                  isTopChoice ? "bg-gold text-deep" : "bg-forest/10 text-forest"
                                }`}
                              >
                                {isTopChoice ? `★ ${item.badge}` : item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink/60">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="block text-xs font-extrabold text-forest">{formatPrice(item.priceCents)}</span>
                        {item.priceUnit && (
                          <span className="block text-[10px] text-ink/55">{item.priceUnit}</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {visibleSelectorGroups.length === 0 && (
            <p className="py-4 text-center text-xs text-ink/50">Kein passendes Menü zu Ihrer Suche gefunden.</p>
          )}
        </div>

        {/* Hinweis Buffet-Standard & Direkt-Checkbox Traditionelles Rodizio (+ 5,00 € p. P.) */}
        <div className="mt-3 rounded-xl border border-forest/15 bg-white p-3.5">
          <p className="text-xs leading-relaxed text-ink/75">
            <strong className="font-bold text-forest">Servier-Hinweis:</strong> Wir bieten unsere Speisen standardmäßig
            als <strong className="font-bold text-forest">Buffet</strong> an. Sollten Sie ein{" "}
            <strong className="font-bold text-forest">Traditionelles Rodizio</strong> wünschen (Fleisch frisch vom Spieß
            auf die Teller geschnitten), berechnen wir{" "}
            <strong className="font-bold text-forest">5,00 € Aufpreis pro Person</strong>.
          </p>
          <label className="mt-2.5 flex cursor-pointer items-start gap-2.5 text-xs font-bold text-forest">
            <input
              type="checkbox"
              checked={selectedSlugs.includes(TRADITIONAL_RODIZIO_SLUG)}
              onChange={() => toggleSelection(TRADITIONAL_RODIZIO_SLUG)}
              className="mt-0.5 h-4 w-4 rounded border-forest/30 accent-[#14361f]"
            />
            <span>
              Traditionelles Rodizio dazubuchen – Fleisch vom Spieß auf den Teller geschnitten (+ 5,00 € pro Person)
            </span>
          </label>
        </div>

        {/* Hinweis Geschirr bei Beispielmenüs & Individuellem Menü */}
        {hasAllMenusWithGeschirr ? (
          <div className="mt-3 rounded-xl border border-forest/15 bg-white p-3 text-xs leading-relaxed text-ink/75">
            <strong className="font-bold text-forest">✓ Geschirr inklusive:</strong> Bei Ihren gewählten
            Komplett-Sparmenüs werden Teller und Besteck bereits kostenfrei zur Verfügung gestellt.
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-amber-300/80 bg-amber-50/70 p-3.5">
            <p className="text-xs leading-relaxed text-ink/80">
              <strong className="font-bold text-forest">Hinweis zum Geschirr:</strong> Bei unseren{" "}
              <strong className="font-bold text-forest">Beispielmenüs</strong> sowie wenn Sie Ihr{" "}
              <strong className="font-bold text-forest">Individuelles Menü selbst zusammenstellen</strong>, ist das
              Geschirr nicht im Preis enthalten. Teller & Besteck (inklusive Reinigung) können Sie gerne dazubuchen.
            </p>
            <label className="mt-2.5 flex cursor-pointer items-start gap-2.5 text-xs font-bold text-forest">
              <input
                type="checkbox"
                checked={selectedSlugs.includes(GESCHIRR_SLUG)}
                onChange={() => toggleSelection(GESCHIRR_SLUG)}
                className="mt-0.5 h-4 w-4 rounded border-forest/30 accent-[#14361f]"
              />
              <span>
                Geschirr für Hauptmenü dazubuchen – Teller & Besteck inkl. Reinigung (+ 2,50 € pro Person)
              </span>
            </label>
          </div>
        )}

        {estimatedMenuCents !== null && (
          <p className="mt-3 text-right text-xs font-semibold text-forest">
            Zwischensumme gewählte Menüs/Leistungen:{" "}
            <span className="font-extrabold">{formatPrice(estimatedMenuCents)}</span>
          </p>
        )}
      </fieldset>

      {/* 2. Wunschtermin, Uhrzeit & Veranstaltungsdaten (alle Pflichtfelder) */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          Wunschtermin (Veranstaltungsdatum) *
          <input
            className={`${inputClass} mt-2`}
            type="date"
            required
            value={form.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          Uhrzeit (Essenszeit / Veranstaltungsbeginn) *
          <input
            className={`${inputClass} mt-2`}
            type="time"
            required
            value={form.eventTime}
            onChange={(event) => update("eventTime", event.target.value)}
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          Anlass *
          <select
            className={`${inputClass} mt-2`}
            required
            value={form.eventType}
            onChange={(event) => update("eventType", event.target.value)}
          >
            <option value="">Bitte Anlass wählen ...</option>
            <option value="Hochzeit">Hochzeit</option>
            <option value="Geburtstag">Geburtstag</option>
            <option value="Firmenfeier">Firmenfeier / Business-Event</option>
            <option value="Einschulung">Einschulung</option>
            <option value="Konfirmation / Kommunion">Konfirmation / Kommunion</option>
            <option value="Vereinsfest">Vereinsfest</option>
            <option value="Weihnachtsfeier">Weihnachtsfeier</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          Gästezahl (25 – 5.000 Personen) *
          <input
            className={`${inputClass} mt-2`}
            type="number"
            min={25}
            max={5000}
            required
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            placeholder="25 – 5.000 Personen (z. B. 60)"
          />
        </label>
      </div>

      {/* 3. Veranstaltungsort & Kilometerpauschale / Ressourceneinsatz-Pauschale */}
      <div className="mt-4 rounded-2xl border border-forest/15 bg-cream/70 p-4 md:p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_210px]">
          <label className="text-xs font-bold uppercase tracking-wider text-forest">
            Veranstaltungsort (bis 200 km ab Walsrode) *
            <div className="mt-2 flex gap-2">
              <input
                className={inputClass}
                type="text"
                required
                minLength={3}
                value={form.eventLocation}
                onChange={(event) => update("eventLocation", event.target.value)}
                onBlur={() => {
                  if (form.eventLocation.trim().length >= 4 && form.eventLocation.trim() !== lastLookedUpRef.current) {
                    void lookupDistanceForAddress(form.eventLocation);
                  }
                }}
                placeholder="Straße, PLZ, Ort (z. B. Marktstraße 1, 29614 Soltau)"
              />
              <button
                type="button"
                onClick={() => void lookupDistanceForAddress(form.eventLocation)}
                disabled={distanceState.status === "loading" || form.eventLocation.trim().length < 3}
                className="shrink-0 rounded-xl border border-forest/25 bg-white px-3.5 py-2 text-xs font-extrabold text-forest transition hover:bg-forest hover:text-white disabled:opacity-45"
              >
                {distanceState.status === "loading" ? "Prüft ..." : "km berechnen"}
              </button>
            </div>
          </label>

          <label className="text-xs font-bold uppercase tracking-wider text-forest">
            Einfache Fahrt (km) *
            <input
              className={`${inputClass} mt-2 font-semibold`}
              type="number"
              min={0}
              max={MAX_DISTANCE_KM}
              step={1}
              required
              value={form.distanceKm}
              onChange={(event) => {
                update("distanceKm", event.target.value);
                setDistanceState({ status: "manual", note: "Manuell eingetragene Entfernung (einfache Fahrt)" });
              }}
              placeholder="0 – 200 km"
            />
          </label>
        </div>

        {/* Live-Berechnung Kilometerpauschale / Ressourceneinsatz-Pauschale */}
        <div className="mt-3 rounded-xl border border-forest/15 bg-white p-3.5 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-extrabold text-forest">Kilometerpauschale / Ressourceneinsatz-Pauschale</p>
              <p className="mt-0.5 text-ink/65">
                Startpunkt {ORIGIN_ADDRESS}: <strong className="text-forest">bis 5 km kostenlos</strong> ·{" "}
                <strong className="text-forest">ab 6 km 1,00 € je km (einfache Fahrt)</strong>
              </p>
            </div>

            {travelBreakdown && travelBreakdown.withinRadius && (
              <div className="rounded-lg bg-cream px-3 py-1.5 text-right">
                <span className="block text-sm font-extrabold text-forest">
                  {travelBreakdown.feeCents === 0 ? "0,00 € (Kostenlos)" : formatPrice(travelBreakdown.feeCents)}
                </span>
                <span className="text-[11px] text-ink/60">
                  {travelBreakdown.distanceKm <= FREE_DISTANCE_KM
                    ? `${travelBreakdown.distanceKm} km einfache Fahrt · bis 5 km frei`
                    : `${travelBreakdown.distanceKm} km einfache Fahrt − 5 km frei = ${travelBreakdown.chargeableKm} km × 1,00 €`}
                </span>
              </div>
            )}
          </div>

          {travelBreakdown && !travelBreakdown.withinRadius && (
            <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-semibold text-red-700">
              Hinweis: {travelBreakdown.distanceKm} km liegt außerhalb unseres Liefergebiets von maximal{" "}
              {MAX_DISTANCE_KM} km ab Walsrode.
            </p>
          )}

          {distanceState.status === "resolved" && distanceState.matchedAddress && (
            <p className="mt-2 text-[11px] text-leaf">✓ Erkannte Zieladresse: {distanceState.matchedAddress}</p>
          )}

          {distanceState.status === "error" && distanceState.note && (
            <p className="mt-2 text-[11px] font-medium text-amber-800">{distanceState.note}</p>
          )}
        </div>

        {/* Gesamter unverbindlicher Richtwert inkl. Kilometerpauschale */}
        {estimatedGrandTotalCents !== null && travelBreakdown?.withinRadius !== false && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-forest px-4 py-3 text-xs text-white">
            <span>
              Unverbindlicher Richtwert gesamt{" "}
              <span className="text-white/70">
                (Menüs/Leistungen {formatPrice(estimatedMenuCents ?? 0)} + Kilometer-/Ressourceneinsatz-Pauschale{" "}
                {formatPrice(travelBreakdown?.feeCents ?? 0)})
              </span>
            </span>
            <span className="display-font text-lg font-bold text-gold">{formatPrice(estimatedGrandTotalCents)}</span>
          </div>
        )}
      </div>

      {/* 4. Kontaktdaten */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          Ihr Name *
          <input
            className={`${inputClass} mt-2`}
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Vor- und Nachname"
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-forest/80">
          E-Mail-Adresse *
          <input
            className={`${inputClass} mt-2`}
            type="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@beispiel.de"
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-forest/80 sm:col-span-2">
          Telefonnummer *
          <input
            className={`${inputClass} mt-2`}
            type="tel"
            required
            minLength={5}
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="z. B. 05161 / 94 95 396 oder Mobilnummer für Rückfragen"
          />
        </label>
      </div>

      <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-forest/80">
        Ihre Nachricht & Wünsche *
        <textarea
          className={`${inputClass} mt-2 min-h-[120px] resize-y`}
          required
          minLength={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Beschreiben Sie kurz Ihre Feier, Aufteilung bei mehreren Menüs (z. B. 50× Menü C + 10× vegetarisch), Allergien oder besondere Wünsche ..."
        />
      </label>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-ink/60">
          Unverbindliche Terminanfrage – Ihre Buchung wird erst nach unserer Prüfung und Bestätigung verbindlich.
          Hinweise zum Datenschutz in unserer{" "}
          <Link href="/datenschutz" className="font-semibold text-forest underline underline-offset-4 hover:text-leaf">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-deep transition hover:bg-amber disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Wird gesendet ..." : "Buchungsanfrage absenden →"}
        </button>
      </div>
    </form>
  );
}
