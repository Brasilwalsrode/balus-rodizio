import { asc, sql } from "drizzle-orm";
import { db } from "@/db";
import { ensureDatabase } from "@/db/ensure";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";

/** GET /api/products?category=Geburtstag – alle Angebote, optional nach Bereich oder Anlass gefiltert. */
export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const category = new URL(request.url).searchParams.get("category");
    const rows = category
      ? await db
          .select()
          .from(products)
          .where(sql`${category} = ANY(${products.categories})`)
          .orderBy(asc(products.sortOrder))
      : await db.select().from(products).orderBy(asc(products.sortOrder));
    return Response.json({ products: rows });
  } catch {
    return Response.json({ products: [], error: "Datenbank nicht verfügbar" }, { status: 500 });
  }
}
