import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureDatabase } from "@/db/ensure";
import { desc } from "drizzle-orm";
import { calculateTravelFee, MAX_DISTANCE_KM } from "@/lib/travel-fee";
import {
  CUSTOM_BASE_PRICE_SLUG,
  isMeatItem,
  menuItems,
  MIN_CUSTOM_MEAT_COUNT,
} from "@/data/menu";

export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_GUESTS = 25;
export const MAX_GUESTS = 5000;

const menuBySlug = new Map(menuItems.map((item) => [item.slug, item]));
const meatItemsList = menuItems.filter((item) => isMeatItem(item));

export async function GET() {
  try {
    await ensureDatabase();
    const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(200);
    return Response.json({ inquiries: rows });
  } catch {
    return Response.json({ inquiries: [], error: "Datenbank nicht verfügbar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawDistance = String(body.distanceKm ?? "").trim();
    const parsedDistance = rawDistance === "" ? NaN : Number(rawDistance);

    const data = {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      selectedMenu: String(body.selectedMenu ?? "").trim(),
      eventType: String(body.eventType ?? "").trim(),
      eventDate: String(body.eventDate ?? "").trim(),
      eventTime: String(body.eventTime ?? "").trim(),
      guests: String(body.guests ?? "").trim(),
      eventLocation: String(body.eventLocation ?? "").trim(),
      message: String(body.message ?? "").trim(),
    };

    const rawSlugs: string[] | null = Array.isArray(body.selectedSlugs)
      ? Array.from(new Set(body.selectedSlugs.map((entry: unknown) => String(entry).trim()).filter(Boolean)))
      : null;

    // Prüfen, ob ein Individuelles Menü ausgewählt wurde
    let isCustomMenu = Boolean(body.isCustomMenu);
    if (!isCustomMenu && rawSlugs) {
      const hasExplicitCustom =
        rawSlugs.includes("__custom_beratung__") || rawSlugs.includes(CUSTOM_BASE_PRICE_SLUG);
      const resolvedItems = rawSlugs
        .map((slug) => menuBySlug.get(slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
      const hasCompletePresetMenu = resolvedItems.some(
        (item) =>
          item.category === "Komplett-Sparmenüs" ||
          item.category === "Beispielmenüs" ||
          item.category === "Einschulung",
      );
      const hasMeatOrCustomComponent = resolvedItems.some((item) => isMeatItem(item));
      if (hasExplicitCustom || (!hasCompletePresetMenu && hasMeatOrCustomComponent)) {
        isCustomMenu = true;
      }
    }
    if (
      !isCustomMenu &&
      (data.selectedMenu.includes("Individuelles Menü") ||
        data.selectedMenu.includes("Grundpreis Menü selber gestalten"))
    ) {
      isCustomMenu = true;
    }

    if (isCustomMenu) {
      const selectedMeatCount = rawSlugs
        ? rawSlugs.filter((slug) => {
            const found = menuBySlug.get(slug);
            return found ? isMeatItem(found) : false;
          }).length
        : meatItemsList.filter((meat) => data.selectedMenu.includes(meat.name)).length;

      if (selectedMeatCount < MIN_CUSTOM_MEAT_COUNT) {
        return Response.json(
          {
            ok: false,
            error: `Wenn Sie „Individuelles Menü“ auswählen, müssen Sie mindestens ${MIN_CUSTOM_MEAT_COUNT} Fleischsorten auswählen (aktuell ausgewählt: ${selectedMeatCount}).`,
          },
          { status: 400 },
        );
      }
    }

    const guestsNum = Number(data.guests);
    const missing: string[] = [];

    if (data.selectedMenu.length < 2) missing.push("Menüauswahl");
    if (data.eventType.length < 2) missing.push("Anlass");
    if (!data.eventDate) missing.push("Wunschtermin");
    if (!/^\d{2}:\d{2}$/.test(data.eventTime)) missing.push("Uhrzeit");
    if (!data.guests || !Number.isFinite(guestsNum) || guestsNum < MIN_GUESTS) {
      missing.push(`Gästezahl (mindestens ${MIN_GUESTS} Personen)`);
    } else if (guestsNum > MAX_GUESTS) {
      missing.push("Gästezahl (maximal 5.000 Personen)");
    }
    if (data.eventLocation.length < 3) missing.push("Veranstaltungsort");
    if (!Number.isFinite(parsedDistance) || parsedDistance < 0) {
      missing.push("Entfernung ab Walsrode in km");
    } else if (parsedDistance > MAX_DISTANCE_KM) {
      return Response.json(
        {
          ok: false,
          error: `Der Veranstaltungsort liegt mit ${Math.round(parsedDistance)} km außerhalb unseres Liefergebiets von maximal ${MAX_DISTANCE_KM} km ab Walsrode.`,
        },
        { status: 400 },
      );
    }
    if (data.name.length < 2) missing.push("Name");
    if (!emailPattern.test(data.email)) missing.push("gültige E-Mail-Adresse");
    if (data.phone.length < 5) missing.push("Telefonnummer");
    if (data.message.length < 5) missing.push("Nachricht");

    if (missing.length > 0) {
      return Response.json(
        {
          ok: false,
          error: `Bitte füllen Sie alle Pflichtfelder vollständig aus (fehlend/ungültig: ${missing.join(", ")}).`,
        },
        { status: 400 },
      );
    }

    const travel = calculateTravelFee(parsedDistance);

    await ensureDatabase();
    const [created] = await db
      .insert(inquiries)
      .values({
        ...data,
        distanceKm: travel.distanceKm,
        travelFeeCents: travel.feeCents,
        status: "offen",
        adminNote: "",
      })
      .returning({
        id: inquiries.id,
        status: inquiries.status,
        distanceKm: inquiries.distanceKm,
        travelFeeCents: inquiries.travelFeeCents,
      });

    return Response.json({
      ok: true,
      id: created.id,
      status: created.status,
      distanceKm: created.distanceKm,
      travelFeeCents: created.travelFeeCents,
    });
  } catch {
    return Response.json(
      { ok: false, error: "Die Buchungsanfrage konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }
}
