import {
  calculateTravelFee,
  haversineKm,
  ORIGIN_LAT,
  ORIGIN_LON,
} from "@/lib/travel-fee";

export const dynamic = "force-dynamic";

type NominatimHit = {
  lat: string;
  lon: string;
  display_name: string;
};

async function geocodeAddress(query: string): Promise<NominatimHit | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=de&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "BalusRodizioWalsrode/1.0 (info@balus-rodizio.de)",
      "Accept-Language": "de",
    },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) return null;
  const results = (await response.json()) as NominatimHit[];
  return Array.isArray(results) && results.length > 0 ? results[0] : null;
}

async function fetchDrivingDistanceKm(destLat: number, destLon: number): Promise<{ km: number; source: "route" | "air" }> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${ORIGIN_LON},${ORIGIN_LAT};${destLon},${destLat}?overview=false`;
    const response = await fetch(url, {
      headers: { "User-Agent": "BalusRodizioWalsrode/1.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (response.ok) {
      const data = (await response.json()) as { routes?: { distance?: number }[] };
      const meters = data.routes?.[0]?.distance;
      if (typeof meters === "number" && Number.isFinite(meters)) {
        return { km: Math.max(1, Math.round(meters / 1000)), source: "route" };
      }
    }
  } catch {
    // Fallback auf Luftlinie × Straßenfaktor 1,25
  }

  const airKm = haversineKm(ORIGIN_LAT, ORIGIN_LON, destLat, destLon);
  return { km: Math.max(0, Math.round(airKm * 1.25)), source: "air" };
}

export async function GET(request: Request) {
  const address = (new URL(request.url).searchParams.get("address") ?? "").trim();
  if (address.length < 3) {
    return Response.json(
      { ok: false, error: "Bitte geben Sie Straße, PLZ und Ort ein." },
      { status: 400 },
    );
  }

  try {
    let hit = await geocodeAddress(address);

    // Fallback: Falls Hausnummer/Straße nicht gefunden wurde, nach PLZ + Ort suchen
    if (!hit) {
      const plzCityMatch = /\b(\d{5}\s+[A-Za-zÄÖÜäöüß\-\s]+)/.exec(address);
      if (plzCityMatch) {
        hit = await geocodeAddress(plzCityMatch[1].trim());
      }
    }

    if (!hit) {
      return Response.json(
        {
          ok: false,
          error:
            "Adresse konnte nicht automatisch verortet werden. Bitte prüfen Sie PLZ & Ort oder tragen Sie die einfachen Kilometer manuell ein.",
        },
        { status: 404 },
      );
    }

    const destLat = Number(hit.lat);
    const destLon = Number(hit.lon);
    if (!Number.isFinite(destLat) || !Number.isFinite(destLon)) {
      return Response.json({ ok: false, error: "Ungültige Koordinaten für diesen Ort." }, { status: 422 });
    }

    // Identischer Ort in unmittelbarer Nähe (< 0,4 km Luftlinie) = 0–1 km
    const airCheck = haversineKm(ORIGIN_LAT, ORIGIN_LON, destLat, destLon);
    const driving = airCheck < 0.4 ? { km: 0, source: "route" as const } : await fetchDrivingDistanceKm(destLat, destLon);
    const breakdown = calculateTravelFee(driving.km);

    return Response.json({
      ok: true,
      matchedAddress: hit.display_name,
      source: driving.source,
      ...breakdown,
    });
  } catch {
    return Response.json(
      {
        ok: false,
        error: "Entfernungsberechnung momentan nicht erreichbar. Bitte tragen Sie die Kilometer (einfache Fahrt) direkt ein.",
      },
      { status: 502 },
    );
  }
}
