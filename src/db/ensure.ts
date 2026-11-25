import { notInArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { menuItems } from "@/data/menu";

let ready: Promise<void> | null = null;

async function setup() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS products (
      id serial PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name text NOT NULL,
      category text NOT NULL,
      categories text[] NOT NULL DEFAULT '{}',
      price_cents integer,
      price_unit text,
      description text NOT NULL DEFAULT '',
      image text,
      badge text,
      sort_order integer NOT NULL DEFAULT 0
    )
  `);

  // Spalten nachziehen, falls die Tabelle aus einer früheren Version stammt (idempotent)
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS categories text[] NOT NULL DEFAULT '{}'`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS price_unit text`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN price_cents DROP NOT NULL`);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id serial PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL DEFAULT '',
      selected_menu text NOT NULL DEFAULT '',
      event_type text NOT NULL DEFAULT '',
      event_date text NOT NULL DEFAULT '',
      event_time text NOT NULL DEFAULT '',
      guests text NOT NULL DEFAULT '',
      event_location text NOT NULL DEFAULT '',
      distance_km integer NOT NULL DEFAULT 0,
      travel_fee_cents integer NOT NULL DEFAULT 0,
      message text NOT NULL DEFAULT '',
      status text NOT NULL DEFAULT 'offen',
      admin_note text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  // Neue Pflichtspalten in bestehenden Datenbanken nachziehen (idempotent)
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS selected_menu text NOT NULL DEFAULT ''`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS event_time text NOT NULL DEFAULT ''`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS event_location text NOT NULL DEFAULT ''`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS distance_km integer NOT NULL DEFAULT 0`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS travel_fee_cents integer NOT NULL DEFAULT 0`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'offen'`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS admin_note text NOT NULL DEFAULT ''`);
  await db.execute(sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now()`);

  // Katalog synchronisieren: vorhandene Angebote aktualisieren, neue anlegen
  await db
    .insert(products)
    .values(menuItems)
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        name: sql`excluded.name`,
        category: sql`excluded.category`,
        categories: sql`excluded.categories`,
        priceCents: sql`excluded.price_cents`,
        priceUnit: sql`excluded.price_unit`,
        description: sql`excluded.description`,
        image: sql`excluded.image`,
        badge: sql`excluded.badge`,
        sortOrder: sql`excluded.sort_order`,
      },
    });

  // Angebote entfernen, die nicht mehr im Katalog stehen
  await db.delete(products).where(notInArray(products.slug, menuItems.map((item) => item.slug)));
}

/** Idempotent: legt Tabellen an, ergänzt Spalten und synchronisiert den Katalog. */
export function ensureDatabase() {
  if (!ready) {
    ready = setup().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}
