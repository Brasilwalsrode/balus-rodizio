/** Standort Balus Rodizio: Silberweg 6, 29664 Walsrode */
export const ORIGIN_ADDRESS = "Silberweg 6, 29664 Walsrode";
export const ORIGIN_LAT = 52.8681171;
export const ORIGIN_LON = 9.6369093;

export const FREE_DISTANCE_KM = 5;
export const MAX_DISTANCE_KM = 200;
export const RATE_PER_KM_CENTS = 100; // 1,00 € je km (einfache Fahrt) ab dem 6. km

export type TravelFeeBreakdown = {
  distanceKm: number;
  freeKm: number;
  chargeableKm: number;
  feeCents: number;
  withinRadius: boolean;
};

/**
 * Berechnet die Kilometerpauschale / Ressourceneinsatz-Pauschale:
 * - Bis einschließlich 5 km (einfache Fahrt ab Walsrode): 0,00 € (kostenlos)
 * - Ab 6 km: 1,00 € pro berechnetem Kilometer einfacher Fahrt (erste 5 km kostenlos)
 */
export function calculateTravelFee(rawDistanceKm: number): TravelFeeBreakdown {
  const distanceKm = Math.max(0, Math.round(rawDistanceKm));
  const chargeableKm = distanceKm <= FREE_DISTANCE_KM ? 0 : distanceKm - FREE_DISTANCE_KM;
  const feeCents = chargeableKm * RATE_PER_KM_CENTS;
  return {
    distanceKm,
    freeKm: Math.min(distanceKm, FREE_DISTANCE_KM),
    chargeableKm,
    feeCents,
    withinRadius: distanceKm <= MAX_DISTANCE_KM,
  };
}

export function formatEuroCents(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Luftlinie nach Haversine in km (Fallback, falls Routing-Dienst nicht erreichbar ist). */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
