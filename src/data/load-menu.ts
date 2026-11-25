import { asc } from "drizzle-orm";
import { db } from "@/db";
import { ensureDatabase } from "@/db/ensure";
import { products } from "@/db/schema";
import { menuItems, type MenuItem } from "@/data/menu";

/** Alle Angebote aus PostgreSQL. Fällt bei Datenbankproblemen auf den übernommenen Katalog zurück. */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    await ensureDatabase();
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder), asc(products.id));
    if (rows.length > 0) return rows;
  } catch (error) {
    console.error("Speisekarte: Datenbank nicht verfügbar, verwende Fallback.", error);
  }
  return menuItems;
}
